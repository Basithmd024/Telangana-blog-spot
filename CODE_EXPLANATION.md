# Telangana Blog Spot - Code Explanation

## Project Overview
**Telangana Blog Spot** is a full-stack blogging application focused on Telangana tourism content. It includes user authentication (email/password and Google OAuth), blog management with image uploads to Cloudinary, and admin controls.

**Tech Stack:**
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript
- **Authentication:** JWT + BCrypt + Google OAuth
- **File Storage:** Cloudinary CDN
- **Containerization:** Docker

---

## Architecture Overview

```
client/                    (Frontend - Static HTML/CSS/JS)
├── index.html            (Home page)
├── login.html            (Login page)
├── register.html         (Registration page)
├── blogs.html            (Blog listing page)
├── add-blog.html         (Blog creation form)
├── admin.html            (Admin dashboard)
├── app.js                (Shared JavaScript logic)
└── style.css             (Global styles)

server/                    (Backend - Express.js)
├── server.js             (Main entry point)
├── middleware/
│   └── authMiddleware.js (JWT verification & admin check)
├── models/
│   ├── User.js           (User schema)
│   ├── Blog.js           (Blog schema)
│   └── Comment.js        (Comment schema)
└── routes/
    ├── authRoutes.js     (Authentication endpoints)
    ├── blogRoutes.js     (Blog CRUD endpoints)
    └── commentRoutes.js  (Comment endpoints)
```

---

## Database Models

### 1. User Model (`server/models/User.js`)
Stores user information with support for both email/password and Google OAuth authentication.

```javascript
const userSchema = {
  name: String (required, trimmed),
  email: String (required, unique, lowercase),
  password: String (optional, for email/password auth),
  googleId: String (for Google OAuth users),
  role: Enum ['user', 'admin'] (default: 'user'),
  timestamps: { createdAt, updatedAt }
}
```

**Key Features:**
- Email-based user registration
- Google OAuth integration
- Role-based access control (user/admin)
- Automatic timestamps

---

### 2. Blog Model (`server/models/Blog.js`)
Represents a blog post about Telangana tourism.

```javascript
const blogSchema = {
  title: String (required),
  description: String (required),
  category: Enum ['Historical', 'Temples', 'Waterfalls', 'Culture & Festivals', 'Food Places'] (required),
  image: String (URL from Cloudinary, optional),
  author: ObjectId (Reference to User model),
  createdAt: Date (auto-generated)
}
```

**Key Features:**
- Categorized blog posts
- Author association
- Image support via Cloudinary
- Automatic creation timestamp

---

### 3. Comment Model (`server/models/Comment.js`)
Allows users to comment on blog posts.

```javascript
const commentSchema = {
  user: ObjectId (Reference to User model, required),
  blogId: ObjectId (Reference to Blog model, required),
  comment: String (required, trimmed),
  createdAt: Date (auto-generated)
}
```

---

## Authentication & Middleware

### Authentication Middleware (`server/middleware/authMiddleware.js`)

#### 1. **protect() - JWT Verification**
```javascript
Verify JWT token from Authorization header:
1. Extract token from "Bearer <token>" format
2. Verify token with JWT_SECRET
3. Fetch user from database and attach to req.user
4. Pass control to next middleware
5. Return 401 error if token is missing or invalid
```

**Usage:** Protects routes that require authentication.

#### 2. **adminOnly() - Role-Based Access**
```javascript
Check if req.user.role === 'admin':
1. If admin: allow access (call next())
2. If not admin: return 403 Forbidden error
```

**Usage:** Restricts operations to admin users only.

---

## Backend Routes

### Authentication Routes (`server/routes/authRoutes.js`)

#### 1. **POST /api/auth/register - User Registration**
```
Input: { name, email, password }

Process:
1. Check if email already registered
2. Hash password using bcrypt (10 salt rounds)
3. Create new user document
4. Generate JWT token (expires in 7 days)
5. Return user data + token

Output: { _id, name, email, role, token }
Error: 400 if email exists, 500 for other errors
```

#### 2. **POST /api/auth/login - User Login**
```
Input: { email, password }

Process:
1. Find user by email
2. Compare password using bcrypt.compare()
3. If match: Generate JWT token
4. Return user data + token

Output: { _id, name, email, role, token }
Error: 400 for invalid credentials, 500 for server errors
```

#### 3. **POST /api/auth/google - Google OAuth Sign-In**
```
Input: { credential } (Google ID token)

Process:
1. Verify Google ID token using OAuth2Client
2. Extract email, name, googleId from token payload
3. Check if user exists (by googleId or email)
4. If exists: Link googleId if needed
5. If not: Create new user from Google profile
6. Generate JWT token

Output: { _id, name, email, role, token }
Error: 401 if verification fails
```

---

### Blog Routes (`server/routes/blogRoutes.js`)

#### 1. **GET /api/blogs - Fetch All Blogs (Public)**
```
Query Parameters: { category } (optional)

Process:
1. If category provided & not "All": filter by category
2. Fetch blogs from database
3. Populate author details (name, email)
4. Sort by creation date (newest first)

Output: Array of blog objects
```

#### 2. **POST /api/blogs - Create Blog (Protected)**
```
Input: { title, description, category, image (file) }
Auth: Bearer token required

Process:
1. Verify JWT token (middleware)
2. If image uploaded:
   a. Convert file buffer to base64 data URI
   b. Upload to Cloudinary (folder: 'telangana_blogs')
   c. Store secure URL
3. Create blog document with author = current user
4. Populate author details before response

Output: Created blog object with author details
Error: 401 if not authenticated, 500 for upload/DB errors
```

#### 3. **PUT /api/blogs/:id - Update Blog (Admin Only)**
```
Input: { title, description, category, image (optional) }
Auth: Bearer token + Admin role required

Process:
1. Find blog by ID
2. Update fields if provided
3. If new image: upload to Cloudinary and update URL
4. Save and return updated blog

Output: Updated blog object
Error: 403 if not admin, 404 if blog not found
```

#### 4. **DELETE /api/blogs/:id - Delete Blog (Admin Only)**
```
Params: { id }
Auth: Bearer token + Admin role required

Process:
1. Find and verify blog exists
2. Delete blog document
3. Return success message

Output: { message: 'Blog deleted successfully' }
Error: 403 if not admin, 404 if blog not found
```

---

## Frontend Logic

### Main Application Script (`client/app.js`)

#### 1. **Authentication Helpers**
```javascript
getToken() - Retrieves JWT from localStorage
getUser() - Parses and returns user object from localStorage
logout() - Removes tokens and redirects to home
```

#### 2. **Navbar State Management - updateNav()**
```
Logic:
1. Check if token and user exist in localStorage
2. If authenticated:
   - Hide: Login/Register links
   - Show: Logout, User menu, Add Blog
   - Show: Admin link ONLY if user.role === 'admin'
   - Display: Username in navbar
3. If not authenticated:
   - Show: Login/Register links
   - Hide: Logout, User menu, Add Blog, Admin link
```

#### 3. **Blog Card Generation - createBlogCard()**
```
Creates HTML card for each blog with:
1. Placeholder image (if no image URL provided)
2. Category badge
3. Blog title
4. Truncated description (max 120 chars)
5. Author name and creation date
6. Click handler to open blog modal
7. Accessibility attributes (role, aria-label, keyboard support)
```

#### 4. **Notifications - showToast()**
```
Displays toast notifications with:
1. Auto-dismiss after 3 seconds
2. Icon based on type (success/error/info)
3. Fade out animation
4. Auto-remove from DOM
```

#### 5. **Skeleton Loading - createBlogSkeletonCards()**
```
Generates loading skeleton UI while fetching blogs:
1. Creates placeholder cards
2. Animates loading state
3. Improves UX during API calls
```

#### 6. **Navbar Scroll Effect - syncNavbarState()**
```
Updates navbar styling when scrolling:
1. Adds 'scrolled' class when scrollY > 24px
2. Creates shadow/highlight effect
3. Attached to scroll and DOMContentLoaded events
```

---

## Server Setup (`server/server.js`)

### Middleware Stack
```javascript
1. CORS - Enable cross-origin requests
2. express.json() - Parse JSON request bodies
3. express.urlencoded() - Parse form data
4. Static file serving - Uploads folder
5. Static file serving - Client folder (HTML/CSS/JS)
```

### Routes
```
/api/auth   → Authentication endpoints (register, login, Google OAuth)
/api/blogs  → Blog CRUD operations
/api/comments → Comment operations
/healthz   → Health check (for load balancers)
/           → Serve index.html (SPA fallback)
```

### Database Connection
```javascript
Connects to MongoDB via MONGO_URI environment variable.
On success: Server starts on PORT (default: 5001)
On failure: Process exits with error message
```

---

## Key Features & Logic

### 1. **JWT-Based Authentication**
- Tokens expire in 7 days
- Tokens stored in `Authorization: Bearer <token>` header
- Payload contains user ID and role
- Verified on protected routes

### 2. **Password Security**
- Passwords hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Compared using bcrypt.compare() during login

### 3. **Google OAuth Integration**
- Uses Google-auth-library for token verification
- Auto-creates users from Google profiles
- Links Google ID to existing email-based accounts

### 4. **Image Upload Management**
- Uses Multer for file handling (5MB limit)
- Only accepts: JPEG, JPG, PNG, GIF, WebP
- Memory storage (no server disk usage)
- Uploaded to Cloudinary CDN for reliable hosting

### 5. **Role-Based Access Control (RBAC)**
```
User Role: Can create blogs, view all blogs, comment
Admin Role: Can create, update, delete any blog, manage users
```

### 6. **Frontend State Management**
- localStorage for user data & JWT token
- Dynamic navbar based on auth state
- Toast notifications for user feedback
- Skeleton loading for better UX

---

## Data Flow Examples

### User Registration Flow
```
1. User fills registration form in register.html
2. Form submission → POST /api/auth/register
3. Server: Hash password, create user, generate JWT
4. Response: { user data + token }
5. Client: Store token & user in localStorage
6. Client: updateNav() → Show authenticated UI
7. Redirect to blogs page
```

### Blog Creation Flow
```
1. Authenticated user fills add-blog.html form
2. Select image file + enter title, description, category
3. Form submission with FormData → POST /api/blogs (with JWT in header)
4. Server: protect middleware validates JWT
5. Server: Upload image to Cloudinary
6. Server: Create blog document in MongoDB
7. Response: Created blog object
8. Client: Show success toast & redirect to blogs
```

### Blog Viewing Flow
```
1. User visits blogs.html
2. On page load: GET /api/blogs?category=<selected>
3. Server: Query MongoDB, filter by category if provided
4. Server: Populate author details, sort by date
5. Response: Array of blog objects
6. Client: Generate HTML cards using createBlogCard()
7. Display blogs grid on page
```

---

## Environment Variables Required

```
# Backend Server
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=your_secret_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Deployment & Docker

### Dockerfile
```dockerfile
Uses Node.js image
Copies application files
Installs dependencies
Exposes port 5001
Runs: node server/server.js
```

### docker-compose.yml
```yaml
Orchestrates app container
Exposes port 5001 to host
Sets environment variables
```

---

## Summary

This application demonstrates a complete full-stack blogging platform with:

✅ **Secure authentication** (JWT + Google OAuth)  
✅ **Database modeling** (Users, Blogs, Comments)  
✅ **API design** (RESTful endpoints)  
✅ **File uploads** (Cloudinary integration)  
✅ **Access control** (Admin & user roles)  
✅ **Frontend interactivity** (Dynamic UI, notifications)  
✅ **Production-ready** (Docker, error handling, validation)


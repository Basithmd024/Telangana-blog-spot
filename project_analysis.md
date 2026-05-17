# Telangana Tourism Blog - Updated Project Analysis

This document provides an overview and analysis of the current folder structure, architecture, and files in the Telangana Tourism Blog project.

## Directory Structure

The project follows a standard client-server architecture with a clear separation of concerns between the frontend UI and backend API.

```text
Telangana Blog/
├── client/                 # Frontend static files
│   ├── add-blog.html       # UI for creating new blog posts (requires auth)
│   ├── admin.html          # Admin dashboard for managing blogs and users (admin only)
│   ├── app.js              # Shared frontend JavaScript (auth logic, UI helpers, API calls)
│   ├── blogs.html          # Public page for viewing and filtering all blogs
│   ├── index.html          # Main landing/home page with hero section
│   ├── login.html          # User login page
│   ├── register.html       # User registration page
│   └── style.css           # Global application stylesheet
├── package.json            # Node.js dependencies and run scripts
├── package-lock.json       # Dependency lockfile
└── server/                 # Backend Node.js/Express application
    ├── .env                # Environment variables (DB URI, Ports, JWT Secret)
    ├── server.js           # Main Express server entry point
    ├── middleware/         
    │   └── authMiddleware.js # JWT authentication & role-based access control (admin)
    ├── models/             # Mongoose database schemas
    │   ├── Blog.js         # Schema for blog posts
    │   ├── Comment.js      # Schema for comments on blogs
    │   └── User.js         # Schema for user accounts
    ├── routes/             # Express REST API routes
    │   ├── authRoutes.js   # User registration and login endpoints
    │   ├── blogRoutes.js   # CRUD endpoints for blogs (with Multer file upload)
    │   └── commentRoutes.js# Endpoints for comments
    └── uploads/            # Local directory to store uploaded blog images
```

## Architecture & Overview

### 1. Frontend (`/client`)
The client is a vanilla web application using HTML, CSS, and plain JavaScript, enhanced with Bootstrap 5 for responsive design.
- **Pages:** Standard views for home, blogs listing, single blog details (via modals), and authentication.
- **Logic (`app.js`):** We recently added a centralized `app.js` that handles JWT token management via `localStorage`, updates the navigation bar dynamically based on login state, formats blog cards, and shows toast notifications.
- **Admin Panel:** An `admin.html` was created to allow users with the `admin` role to manage all blogs, comments, and view users.
- **Auth Flow:** `login.html` and `register.html` communicate directly with the backend API and store JWTs locally to protect `add-blog.html` and `admin.html`.

### 2. Backend (`/server`)
The backend is a monolithic Express API connected to a MongoDB database.
- **Entry (`server.js`):** Bootstraps the application, sets up CORS, serves the static frontend files and `uploads` directory, and defines the root API endpoints (`/api/auth`, `/api/blogs`, `/api/comments`).
- **Database (`models/`):** Utilizes Mongoose ORM. Relationships are established between Users, Blogs, and Comments using ObjectIds.
- **Authentication:** Custom JWT-based authentication in `authRoutes.js`. Passwords are encrypted with `bcryptjs`.
- **Authorization (`middleware/authMiddleware.js`):** Includes `protect` to ensure a user is logged in, and `adminOnly` to restrict endpoints (like deleting blogs) to administrators.
- **File Uploads:** Managed by `multer` in `blogRoutes.js`. Images are validated and stored locally in `server/uploads/`, then served statically by Express.

## Recent Updates
- Created missing frontend functionality including the shared `app.js`, `login.html`, and `admin.html`.
- NPM dependencies have been successfully installed (`npm install`).

## How to Run
1. Ensure MongoDB is running locally on port `27017` or update the `.env` `MONGO_URI`.
2. From the project root, start the server: `npm start` (or `npm run dev` for auto-reloading).
3. Access the application at `http://localhost:5000`.

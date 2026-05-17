// ===== Telangana Tourism Blog - Shared App JS =====

const API_BASE = '';

// ===== Auth Helpers =====
function getToken() {
  return localStorage.getItem('token');
}

function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  showToast('Logged out successfully', 'success');
  setTimeout(() => window.location.href = 'index.html', 800);
}

// ===== Update Navbar Based on Auth State =====
function updateNav() {
  const user = getUser();
  const token = getToken();

  const navLogin = document.getElementById('navLogin');
  const navRegister = document.getElementById('navRegister');
  const navLogout = document.getElementById('navLogout');
  const navUser = document.getElementById('navUser');
  const navAddBlog = document.getElementById('navAddBlog');
  const navAdmin = document.getElementById('navAdmin');
  const navUserName = document.getElementById('navUserName');

  if (token && user) {
    // Logged in
    if (navLogin) navLogin.style.display = 'none';
    if (navRegister) navRegister.style.display = 'none';
    if (navLogout) navLogout.style.display = 'block';
    if (navUser) navUser.style.display = 'block';
    if (navAddBlog) navAddBlog.style.display = 'block';
    if (navUserName) navUserName.textContent = user.name;

    // Show admin link only for admins
    if (navAdmin) {
      navAdmin.style.display = user.role === 'admin' ? 'block' : 'none';
    }
  } else {
    // Not logged in
    if (navLogin) navLogin.style.display = 'block';
    if (navRegister) navRegister.style.display = 'block';
    if (navLogout) navLogout.style.display = 'none';
    if (navUser) navUser.style.display = 'none';
    if (navAddBlog) navAddBlog.style.display = 'none';
    if (navAdmin) navAdmin.style.display = 'none';
  }
}

// ===== Create Blog Card HTML =====
function createBlogCard(blog, index) {
  const imgSrc = blog.image
    ? blog.image
    : `https://placehold.co/600x400/1c2333/e85d04?text=${encodeURIComponent(blog.category)}`;

  const authorName = blog.author?.name || 'Unknown';
  const date = new Date(blog.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const truncatedDesc = blog.description.length > 120
    ? blog.description.substring(0, 120) + '...'
    : blog.description;

  return `
    <div class="col-md-6 col-lg-4 fade-in-up" style="animation-delay: ${index * 0.1}s;">
      <div class="blog-card" onclick="openBlogModal('${blog._id}')" style="cursor:pointer;">
        <div class="card-img-wrapper">
          <img src="${imgSrc}" alt="${blog.title}" loading="lazy">
          <span class="category-badge">${blog.category}</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">${blog.title}</h5>
          <p class="card-text">${truncatedDesc}</p>
        </div>
        <div class="card-footer">
          <span class="author"><i class="bi bi-person-fill me-1"></i>${authorName}</span>
          <span class="date"><i class="bi bi-calendar3 me-1"></i>${date}</span>
        </div>
      </div>
    </div>
  `;
}

// ===== Toast Notification =====
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;

  const icon = type === 'success' ? 'bi-check-circle-fill'
    : type === 'error' ? 'bi-exclamation-triangle-fill'
    : 'bi-info-circle-fill';

  toast.innerHTML = `<i class="bi ${icon} me-2"></i>${message}`;
  container.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('mainNavbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(13, 17, 23, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.background = 'rgba(13, 17, 23, 0.85)';
      navbar.style.boxShadow = 'none';
    }
  }
});

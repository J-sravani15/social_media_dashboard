// Dashboard functionality
document.addEventListener('DOMContentLoaded', function () {
  // Check if user is logged in
  checkAuthStatus();

  // Initialize dashboard components
  initializeSidebar();
  initializeUserProfile();
  initializeNotifications();
  initializeResponsiveFeatures();

  // Logout functionality
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      logout();
    });
  }
});

// Check authentication status
function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username');

  if (!isLoggedIn || isLoggedIn !== 'true') {
    // Redirect to login if not authenticated
    window.location.href = 'index.html';
    return;
  }

  // Update user profile with stored username
  if (username) {
    const profileName = document.querySelector('.profile-name');
    if (profileName) {
      profileName.textContent = username.charAt(0).toUpperCase() + username.slice(1);
    }
  }
}

// Initialize sidebar functionality
function initializeSidebar() {
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sidebar toggle for mobile
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove('active');
        }
      }
    });
  }

  // Navigation link interactions
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Don't prevent default for logout link
      if (!this.closest('.logout')) {
        e.preventDefault();

        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
          item.classList.remove('active');
        });

        // Add active class to clicked item
        this.closest('.nav-item').classList.add('active');

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
        }

        // Here you could add routing logic for different pages
        console.log('Navigating to:', this.textContent.trim());
      }
    });
  });
}

// Initialize user profile dropdown
function initializeUserProfile() {
  const userProfile = document.querySelector('.user-profile');

  if (userProfile) {
    userProfile.addEventListener('click', function () {
      // Toggle dropdown menu (you can implement this)
      console.log('User profile clicked');

      // For demo, show a simple alert
      const dropdown = document.createElement('div');
      dropdown.className = 'profile-dropdown';
      dropdown.innerHTML = `
                <div style="
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: #1e1e3f;
                    border: 1px solid #2d2d5f;
                    border-radius: 8px;
                    padding: 10px 0;
                    min-width: 150px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                    z-index: 1000;
                ">
                    <a href="#" style="display: block; padding: 8px 15px; color: #e2e8f0; text-decoration: none; font-size: 0.9rem;">
                        <i class="fas fa-user" style="margin-right: 8px;"></i>Profile
                    </a>
                    <a href="#" style="display: block; padding: 8px 15px; color: #e2e8f0; text-decoration: none; font-size: 0.9rem;">
                        <i class="fas fa-cog" style="margin-right: 8px;"></i>Settings
                    </a>
                    <hr style="border: none; border-top: 1px solid #2d2d5f; margin: 5px 0;">
                    <a href="#" onclick="logout()" style="display: block; padding: 8px 15px; color: #ef4444; text-decoration: none; font-size: 0.9rem;">
                        <i class="fas fa-sign-out-alt" style="margin-right: 8px;"></i>Logout
                    </a>
                </div>
            `;

      // Remove existing dropdown
      const existingDropdown = document.querySelector('.profile-dropdown');
      if (existingDropdown) {
        existingDropdown.remove();
      } else {
        userProfile.style.position = 'relative';
        userProfile.appendChild(dropdown);

        // Close dropdown when clicking outside
        setTimeout(() => {
          document.addEventListener('click', function closeDropdown(e) {
            if (!userProfile.contains(e.target)) {
              dropdown.remove();
              document.removeEventListener('click', closeDropdown);
            }
          });
        }, 100);
      }
    });
  }
}

// Initialize notifications
function initializeNotifications() {
  const notificationBtns = document.querySelectorAll('.nav-icon');

  notificationBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);

      // Here you could show notification panel
      console.log('Notification clicked');
    });
  });
}

// Initialize responsive features
function initializeResponsiveFeatures() {
  // Handle window resize
  window.addEventListener('resize', function () {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 768) {
      sidebar.classList.remove('active');
    }
  });

  // Add smooth scrolling to cards
  const cards = document.querySelectorAll('.card, .chart-card, .analytics-card');

  // Intersection Observer for card animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Initially hide cards and observe them
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
}

// Logout function
function logout() {
  // Show confirmation
  if (confirm('Are you sure you want to logout?')) {
    // Clear authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    // Show logout message
    const logoutMessage = document.createElement('div');
    logoutMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(15, 15, 35, 0.95);
                border: 1px solid #2d2d5f;
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
            ">
                <i class="fas fa-sign-out-alt" style="font-size: 2rem; color: #667eea; margin-bottom: 15px;"></i>
                <h3 style="color: #ffffff; margin-bottom: 10px;">Logging out...</h3>
                <p style="color: #94a3b8;">Thank you for using SocialMetrics!</p>
            </div>
        `;

    document.body.appendChild(logoutMessage);

    // Redirect after delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function () {
  // Animate numbers on page load
  animateNumbers();

  // Add hover effects to table rows
  const tableRows = document.querySelectorAll('.activity-table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function () {
      this.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
    });

    row.addEventListener('mouseleave', function () {
      this.style.backgroundColor = 'transparent';
    });
  });
});

// Animate numbers counting up
function animateNumbers() {
  const numberElements = document.querySelectorAll('.card-number');

  numberElements.forEach(element => {
    const finalNumber = element.textContent;
    const numericValue = parseFloat(finalNumber.replace(/[^\d.]/g, ''));
    const suffix = finalNumber.replace(/[\d.]/g, '');

    let currentNumber = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= numericValue) {
        currentNumber = numericValue;
        clearInterval(timer);
      }

      if (suffix === 'K') {
        element.textContent = (currentNumber).toFixed(1) + 'K';
      } else {
        element.textContent = Math.floor(currentNumber) + suffix;
      }
    }, 30);
  });
}
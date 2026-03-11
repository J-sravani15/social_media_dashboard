// Login functionality
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  // Demo credentials (in real app, this would be handled by backend)
  const validCredentials = {
    username: 'admin',
    password: 'password'
  };

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (!username || !password) {
      showError('Please fill in all fields');
      return;
    }

    // Simulate login process
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;

    // Show loading state
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    loginBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials (demo purposes)
      if (username === validCredentials.username && password === validCredentials.password) {
        // Success - store login state and redirect
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        showSuccess('Login successful! Redirecting...');

        // Redirect to dashboard after short delay
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        // Failed login
        showError('Invalid username or password');
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
      }
    }, 1500);
  });

  // Show error message
  function showError(message) {
    removeExistingMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorDiv.style.cssText = `
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid #ef4444;
            color: #ef4444;
            padding: 12px 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
    loginForm.insertBefore(errorDiv, loginForm.firstChild);

    // Remove error after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }

  // Show success message
  function showSuccess(message) {
    removeExistingMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successDiv.style.cssText = `
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid #22c55e;
            color: #22c55e;
            padding: 12px 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
    loginForm.insertBefore(successDiv, loginForm.firstChild);
  }

  // Remove existing messages
  function removeExistingMessages() {
    const existingMessages = loginForm.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
  }

  // Add input focus effects
  const inputs = document.querySelectorAll('.input-wrapper input');
  inputs.forEach(input => {
    input.addEventListener('focus', function () {
      this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
      this.parentElement.style.transform = 'scale(1)';
    });
  });

  // Add demo credentials hint
  const demoHint = document.createElement('div');
  demoHint.innerHTML = `
        <div style="
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid #667eea;
            color: #667eea;
            padding: 12px 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 0.85rem;
            text-align: center;
        ">
            <i class="fas fa-info-circle"></i> Demo: Use <strong>admin</strong> / <strong>password</strong>
        </div>
    `;
  loginForm.insertBefore(demoHint, loginForm.firstChild);
});
// admin-dashboard.js
// Adds small interactive behaviors for the admin dashboard.

document.addEventListener('DOMContentLoaded', function () {
  // Toggle sidebar on small screens when .sidebar has class 'active'
  const sidebar = document.querySelector('.sidebar');
  const userProfile = document.querySelector('.user-profile');

  // Example: clicking user profile toggles sidebar on small screens
  if (userProfile && sidebar) {
    userProfile.addEventListener('click', function () {
      sidebar.classList.toggle('active');
    });
  }

  // Wire up action buttons in the recent requests table
  document.querySelectorAll('.btn-approve').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const row = e.target.closest('tr');
      if (!row) return;
      const status = row.querySelector('.status-badge');
      if (status) {
        status.classList.remove('status-pending', 'status-rejected');
        status.classList.add('status-approved');
        status.textContent = 'Approved';
      }
    });
  });

  document.querySelectorAll('.btn-reject').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const row = e.target.closest('tr');
      if (!row) return;
      const status = row.querySelector('.status-badge');
      if (status) {
        status.classList.remove('status-pending', 'status-approved');
        status.classList.add('status-rejected');
        status.textContent = 'Rejected';
      }
    });
  });

  document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const row = e.target.closest('tr');
      if (!row) return;
      // For now, just highlight the row briefly
      row.style.transition = 'background 0.3s ease, transform 0.3s ease';
      row.style.background = 'rgba(102,126,234,0.15)';
      row.style.transform = 'scale(1.01)';
      setTimeout(() => {
        row.style.background = '';
        row.style.transform = '';
      }, 600);
    });
  });

});

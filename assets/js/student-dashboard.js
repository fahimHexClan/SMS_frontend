// Student Dashboard JS extracted from student-dashboard.html

// Mobile menu toggle
const sidebar = document.getElementById('sidebar');
const menuToggle = document.createElement('button');
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
menuToggle.style.cssText = `
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    color: white;
    cursor: pointer;
    display: none;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
`;

if (window.innerWidth <= 768) {
    document.body.appendChild(menuToggle);
    menuToggle.style.display = 'flex';
    menuToggle.style.alignItems = 'center';
    menuToggle.style.justifyContent = 'center';
}

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.body.contains(menuToggle)) {
            document.body.appendChild(menuToggle);
        }
        menuToggle.style.display = 'flex';
    } else {
        menuToggle.style.display = 'none';
        sidebar.classList.remove('active');
    }
});

// Sidebar menu active state
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Button actions (Payment History, Download Receipts)
document.querySelectorAll('.btn-primary-custom').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Payment history feature coming soon!');
    });
});
document.querySelectorAll('.btn-secondary-custom').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Download receipts feature coming soon!');
    });
});

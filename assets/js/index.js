// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;
  if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
  else navbar.classList.remove('navbar-scrolled');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Intersection observer to reveal feature/role/payment cards
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'all 0.6s ease';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.feature-card, .role-card, .payment-feature').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  revealObserver.observe(card);
});

// Animate numeric stat counters when visible
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const targetAttr = el.getAttribute('data-target') || el.textContent;
      const digitsOnly = (targetAttr + '').replace(/[^\d]/g, '');
      const target = parseInt(digitsOnly || '0', 10);
      if (!isNaN(target) && target > 0) {
        animateNumber(el, target, targetAttr);
      }
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

function animateNumber(el, target, originalText) {
  // Choose a friendly duration
  const duration = 1200;
  const start = performance.now();
  const startVal = 0;

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.floor(progress * (target - startVal) + startVal);

    // format based on original text
    if (originalText.includes('₹')) {
      el.textContent = '₹' + formatNumber(current);
    } else if (originalText.toLowerCase().includes('k')) {
      const kVal = Math.floor(current / 1000);
      el.textContent = (kVal > 0 ? kVal : 0) + 'K+';
    } else if (originalText.includes('%')) {
      el.textContent = current + '%';
    } else {
      el.textContent = formatNumber(current);
    }

    if (progress < 1) requestAnimationFrame(step);
    else {
      // Final text fallback (preserve original formatting like '50K+' or '99.9%')
      if (originalText && originalText.trim()) el.textContent = originalText;
    }
  }

  requestAnimationFrame(step);
}

function formatNumber(n) {
  if (n >= 10000000) return (n / 10000000).toFixed(0) + 'Cr';
  if (n >= 1000) return n.toLocaleString();
  return String(n);
}

document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

// small accessibility: allow Enter on nav links (bootstrap mostly handles)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('keydown', e => {
    if (e.key === 'Enter') link.click();
  });
});

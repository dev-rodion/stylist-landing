// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('.nav').offsetHeight;
    window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    // close mobile menu if open
    document.querySelector('.nav__links').classList.remove('open');
  });
});

// "Мне интересно" buttons scroll to #contact
document.querySelectorAll('.js-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector('#contact');
    const navH = document.querySelector('.nav').offsetHeight;
    window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
  });
});

// Nav shadow on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile burger
document.querySelector('.nav__burger').addEventListener('click', () => {
  document.querySelector('.nav__links').classList.toggle('open');
});

// Scroll-reveal via IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos]').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

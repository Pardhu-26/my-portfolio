/* ============================================================
   PARDHA SAI – PORTFOLIO JS
   ============================================================ */

/* NAVBAR */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* MOBILE MENU */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* SCROLL REVEAL */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
    siblings.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80));
    entry.target.classList.add('visible');
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* TYPED TEXT */
const phrases = [
  'AI & ML Enthusiast',
  'Building Intelligent Systems',
  'Deep Learning Explorer',
  'Computer Vision Student',
  'Open to ML Internships'
];
const typedEl = document.getElementById('typed');
let phraseIdx = 0, charIdx = 0, isDeleting = false, speed = 80;

function typeWriter() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    speed = 40;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    speed = 80;
  }
  if (!isDeleting && charIdx === current.length) { isDeleting = true; speed = 1600; }
  else if (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; speed = 400; }
  setTimeout(typeWriter, speed);
}
setTimeout(typeWriter, 800);

/* BACK TO TOP */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 400));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ACTIVE NAV HIGHLIGHT */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const secObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id ? 'var(--clr-accent)' : '';
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => secObs.observe(s));

/* CONTACT FORM */
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const msg = form.querySelector('#message').value.trim();
    if (!name || !email || !msg) {
      note.style.color = '#f87171';
      note.textContent = 'Please fill in all fields.';
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    setTimeout(() => {
      note.style.color = 'var(--clr-green)';
      note.textContent = 'Message sent! I\'ll get back to you soon.';
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      setTimeout(() => { note.textContent = ''; }, 5000);
    }, 1200);
  });
}

/* COUNT-UP ANIMATION */
function animateNumber(el, target, suffix) {
  let cur = 0;
  const step = target / 40;
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { clearInterval(t); el.textContent = target + suffix; }
    else { el.textContent = Math.floor(cur) + suffix; }
  }, 30);
}
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  const so = new IntersectionObserver((e) => {
    if (e[0].isIntersecting) {
      const nums = statsSection.querySelectorAll('.stat-number');
      animateNumber(nums[0], 8.57, '');
      animateNumber(nums[1], 3, '+');
      so.disconnect();
    }
  }, { threshold: 0.5 });
  so.observe(statsSection);
}

/* CARD TILT */
document.querySelectorAll('.project-card, .cert-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height/2) / (r.height/2)) * -5;
    const ry = ((e.clientX - r.left - r.width/2)  / (r.width/2))  *  5;
    card.style.transform = 'perspective(600px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

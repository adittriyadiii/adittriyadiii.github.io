// Navbar scroll effect + hide scroll indicator after hero section
const navbar = document.querySelector('.navbar');
const scrollIndicator = document.querySelector('.scroll-indicator');
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  if (scrollIndicator) {
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
      const contactTop = contactSection.getBoundingClientRect().top;
      scrollIndicator.classList.toggle('hidden', contactTop <= window.innerHeight);
    }
  }
});

// Mobile hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Counter animation for stat numbers
      const numEl = entry.target.querySelector('.stat-number');
      if (numEl && !numEl.dataset.counted) {
        numEl.dataset.counted = true;
        const target = +numEl.dataset.target;
        const duration = 1600;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          numEl.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 16);
      }

      // Counter animation for highlight numbers
      const hlNum = entry.target.querySelector('.hl-number');
      if (hlNum && !hlNum.dataset.counted) {
        hlNum.dataset.counted = true;
        const target = +hlNum.dataset.target;
        const duration = 1200;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          hlNum.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 16);
      }
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// Typing effect for hero title
(function typeEffect() {
  const el    = document.querySelector('.hero-title');
  const text  = el.textContent;
  el.textContent = '';
  el.style.visibility = 'visible';

  let i = 0;
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.cssText = 'animation: blink 0.7s step-end infinite; color: #c0392b;';
  el.appendChild(cursor);

  const style = document.createElement('style');
  style.textContent = '@keyframes blink { 50% { opacity: 0; } }';
  document.head.appendChild(style);

  function type() {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      setTimeout(type, 60);
    } else {
      setTimeout(() => cursor.remove(), 1200);
    }
  }

  setTimeout(type, 700);
})();

// Project search
const projSearch = document.getElementById('projSearch');
const projClear  = document.getElementById('projClear');
const projCount  = document.getElementById('projCount');

if (projSearch) {
  projSearch.addEventListener('input', () => {
    const q = projSearch.value.trim().toLowerCase();
    const cards = document.querySelectorAll('#projectsGrid .proj-card');
    let visible = 0;

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const match = q === '' || text.includes(q);
      card.classList.toggle('hidden', !match);
      if (match) visible++;
    });

    projClear.classList.toggle('visible', q.length > 0);
    projCount.textContent = q.length > 0 ? `${visible} project${visible !== 1 ? 's' : ''} found` : '';
  });

  projClear.addEventListener('click', () => {
    projSearch.value = '';
    projSearch.dispatchEvent(new Event('input'));
    projSearch.focus();
  });
}

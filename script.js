/**
 * Namrata Ingale — Personal Developer Portfolio Script
 * Pure Vanilla JavaScript (Zero external libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyrightYear();
  initMobileNav();
  initTypingEffect();
  initNavbarScroll();
  initActiveNavLink();
  initScrollTop();
  initLightboxModal();
});

/**
 * 1. Set Dynamic Current Year in Footer
 */
function initCopyrightYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * 2. Mobile Navigation Toggle & Accessibility
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(forceClose = false) {
    const isOpen = forceClose ? false : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', isOpen);
    toggleBtn.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(true);
    }
  });
}

/**
 * 3. Typewriter Animation for Hero Subtitle
 */
function initTypingEffect() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;

  const roles = [
    'Aspiring Software Developer',
    'Web Development Enthusiast',
    'IT Student @ RCPIT Shirpur',
    'Problem Solver (500+ on CodeChef)'
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;
  let typingSpeed = 100;

  // Initial delay before backspacing first phrase
  setTimeout(typeStep, 2400);

  function typeStep() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      textElement.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 35;
    } else {
      charIndex++;
      textElement.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 2200;
    } else if (isDeleting && charIndex === 0) {
      // Advance to next phrase
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeStep, typingSpeed);
  }
}

/**
 * 4. Navbar Elevation Shadow on Scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 15) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
}

/**
 * 5. Active Section Indicator in Navigation
 */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
  highlightNavOnScroll();
}

/**
 * 6. Floating Scroll-To-Top Button
 */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (!scrollTopBtn) return;

  function toggleScrollBtn() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleScrollBtn, { passive: true });
  toggleScrollBtn();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 7. Lightbox Modal Controller for Screenshots & Certificates
 */
function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');
  const imageElement = document.getElementById('lightbox-image');
  const captionElement = document.getElementById('lightbox-caption');

  if (!modal || !imageElement || !captionElement) return;

  // Static target configurations
  const targetMap = {
    'project-lightbox': {
      src: 'assets/visitor-pass-qr.png',
      caption: 'Digital Visitor Pass with Dynamic QR Code Token (Pass #VIS-2026-010) — Digital Visitor Management System'
    },
    'cert-1-lightbox': {
      src: 'assets/certificate-iic-2025.png',
      caption: 'IIC Competition 2025 Second Rank Certificate — R. C. Patel Institute of Technology, Shirpur'
    },
    'cert-2-lightbox': {
      src: 'assets/certificate-cybersecurity.png',
      caption: 'Cybersecurity Certificate of Participation — Tech Mahindra Foundation & Skill India Digital Hub'
    }
  };

  function openLightbox(src, caption) {
    imageElement.src = src;
    imageElement.alt = caption;
    captionElement.textContent = caption;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Reset src after transition
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        imageElement.src = '';
      }
    }, 250);
  }

  // Attach click listeners to all triggers
  const triggers = document.querySelectorAll('.lightbox-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetKey = trigger.getAttribute('data-target');

      if (targetKey && targetMap[targetKey]) {
        openLightbox(targetMap[targetKey].src, targetMap[targetKey].caption);
      } else {
        const childImg = trigger.querySelector('img');
        if (childImg) {
          openLightbox(childImg.src, childImg.alt || 'Certificate / Screenshot Preview');
        }
      }
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

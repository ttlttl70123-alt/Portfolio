/**
 * Portfolio Main Page - Interactive Scripts
 * - Header scroll effects (light/dark mode switching)
 * - Mobile menu toggle
 * - Scroll reveal animations
 * - Smooth section-aware header styling
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('main-nav');
  const darkSections = document.querySelectorAll('.dark-section, .inquiries, .footer');

  // ===== MOBILE MENU TOGGLE =====
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('header__menu-btn--open');
      nav.classList.toggle('header__nav--open');
    });

    // Close menu on link click
    nav.querySelectorAll('.header__link').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('header__menu-btn--open');
        nav.classList.remove('header__nav--open');
      });
    });
  }

  // ===== HEADER SCROLL EFFECTS =====
  function updateHeader() {
    const scrollY = window.scrollY;
    const headerRect = header.getBoundingClientRect();
    const headerCenter = headerRect.top + headerRect.height / 2;

    // Add scrolled class for blur background
    if (scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    // Check if header is over a dark section
    let isOverDark = false;
    darkSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (headerCenter >= rect.top && headerCenter <= rect.bottom) {
        isOverDark = true;
      }
    });

    if (isOverDark) {
      header.classList.add('header--dark');
      header.classList.remove('header--scrolled');
    } else {
      header.classList.remove('header--dark');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll(
    '.service-card, .project-card, .dark-section__quote, .inquiries__card, .projects__header, .footer__brand'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    // Stagger delay within groups
    const delay = index % 4;
    if (delay > 0) {
      el.classList.add(`reveal--delay-${delay}`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(el => observer.observe(el));

  // ===== PRELOADER & HERO TEXT ANIMATION =====
  const preloader = document.getElementById('preloader');
  const counterElement = document.getElementById('preloader-counter');
  let currentCount = 0;
  const targetCount = 100;
  
  // Animate counter
  const updateCounter = setInterval(() => {
    currentCount += Math.floor(Math.random() * 5) + 2; // Random increment for realistic feel
    if (currentCount >= targetCount) {
      currentCount = targetCount;
      clearInterval(updateCounter);
      
      counterElement.innerText = currentCount;
      
      // Complete loading
      setTimeout(() => {
        preloader.classList.add('is-hidden');
        document.body.classList.remove('is-loading');
        
        // Trigger hero animations after loader hides
        setTimeout(() => {
          const heroLines = document.querySelectorAll('.hero__line, .hero__subtitle');
          heroLines.forEach((line, i) => {
            line.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
          });
        }, 300);
      }, 300); // short delay after hitting 100
    } else {
      counterElement.innerText = currentCount;
    }
  }, 20); // Fast interval

  // Initially hide hero texts
  const heroLines = document.querySelectorAll('.hero__line, .hero__subtitle');
  heroLines.forEach((line) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(20px)';
  });

  // ===== CUSTOM CURSOR & CANVAS TRAIL =====
  const cursor = document.querySelector('.custom-cursor');
  const canvas = document.querySelector('.cursor-canvas');
  const ctx = canvas.getContext('2d');
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  const trail = [];
  const maxAge = 180; // ~3 seconds at 60fps
  const mouse = { x: width / 2, y: height / 2 };

  // Track mouse movement
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Move the gray circle (stays fixed to viewport)
    cursor.style.left = mouse.x + 'px';
    cursor.style.top = mouse.y + 'px';

    // Add point to trail using absolute document coordinates
    trail.push({ x: e.pageX, y: e.pageY, age: 0 });
  });

  // Draw trail exactly and fade out over maxAge
  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    const currentScrollY = window.scrollY;
    
    if (trail.length > 1) {
      for (let i = 1; i < trail.length; i++) {
        const p1 = trail[i - 1];
        const p2 = trail[i];
        p1.age++;
        
        const opacity = Math.max(0, 1 - (p1.age / maxAge));
        
        ctx.beginPath();
        // Shift drawing Y by current scroll to make it stick to the page
        ctx.moveTo(p1.x, p1.y - currentScrollY);
        ctx.lineTo(p2.x, p2.y - currentScrollY);
        ctx.strokeStyle = `rgba(120, 120, 120, ${opacity * 0.8})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      trail[trail.length - 1].age++;
      
      // Remove dead points
      while (trail.length > 0 && trail[0].age > maxAge) {
        trail.shift();
      }
    } else if (trail.length === 1) {
      trail[0].age++;
      if (trail[0].age > maxAge) trail.shift();
    }
    
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  // Add hover effect to clickable elements
  const clickables = document.querySelectorAll('a, button, input, select, textarea');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('custom-cursor--hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('custom-cursor--hover');
    });
  });
});

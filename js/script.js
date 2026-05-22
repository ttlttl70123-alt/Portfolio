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

  // ===== GEO GREETING (IP 기반 국가 감지) =====
  const geoGreeting = document.getElementById('geo-greeting');
  const heroCountry = document.getElementById('hero-country');
  
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      const country = (data.country_name || '').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      // 국기 이미지 매핑 (이미지 폴더의 파일명과 매칭)
      const flagMap = {
        'South Korea': 'KOREA',
        'Canada': 'CANADA'
      };
      if (country) {
        if (geoGreeting) geoGreeting.textContent = `HI, ${country}`;
        if (heroCountry) heroCountry.textContent = country;
        
        // 국기 이미지 표시
        const heroFlag = document.getElementById('hero-flag');
        const flagKey = flagMap[country];
        if (heroFlag && flagKey) {
          heroFlag.src = `images/${flagKey}.png`;
          heroFlag.alt = `${country} flag`;
          heroFlag.style.display = 'inline-block';
        }
      }
    })
    .catch(() => {
      // API 실패 시 기본값 유지
      if (geoGreeting) geoGreeting.textContent = 'HI, THERE';
      if (heroCountry) heroCountry.textContent = 'welcome';
    });

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

  // ===== HERO ARROW SCROLL =====
  const heroArrows = document.querySelectorAll('.hero__arrow');
  const aboutSection = document.getElementById('about');
  
  if (heroArrows.length > 0 && aboutSection) {
    heroArrows.forEach(arrow => {
      arrow.style.cursor = 'pointer';
      arrow.addEventListener('click', () => {
        const sectionRect = aboutSection.getBoundingClientRect();
        const absoluteTop = sectionRect.top + window.scrollY;
        // 화면 정중앙에 오도록 계산 (요소의 절대 좌표 - 화면 절반 + 요소 높이 절반)
        const centerPos = absoluteTop - (window.innerHeight / 2) + (aboutSection.offsetHeight / 2);
        
        window.scrollTo({
          top: centerPos,
          behavior: 'smooth'
        });
      });
    });
  }

  // ===== DARK SECTION CLICK & BOUNCE =====
  if (aboutSection) {
    // 클릭 시 중앙으로 이동
    aboutSection.style.cursor = 'pointer';
    aboutSection.addEventListener('click', () => {
      const sectionRect = aboutSection.getBoundingClientRect();
      const absoluteTop = sectionRect.top + window.scrollY;
      const centerPos = absoluteTop - (window.innerHeight / 2) + (aboutSection.offsetHeight / 2);
      
      window.scrollTo({
        top: centerPos,
        behavior: 'smooth'
      });
      aboutSection.classList.remove('is-bouncing');
    });

    // 스크롤 위치에 따라 애니메이션 멈춤/재시작
    window.addEventListener('scroll', () => {
      const rect = aboutSection.getBoundingClientRect();
      // 검은색 영역이 화면의 중앙보다 아래에 있을 때만 동동거림 (즉, 메인 화면을 보고 있을 때)
      if (rect.top > window.innerHeight * 0.5) {
        if (!aboutSection.classList.contains('is-bouncing')) {
          aboutSection.classList.add('is-bouncing');
        }
      } else {
        if (aboutSection.classList.contains('is-bouncing')) {
          aboutSection.classList.remove('is-bouncing');
        }
      }
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
    '.dark-section__philosophy, .stat-card, .services-list__item, .dark-section__tools, .project-card, .dark-section__quote, .inquiries__card, .projects__header, .footer__brand'
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

  // ===== PROJECT PAGE TRANSITION =====
  const projectTransition = document.getElementById('project-transition');
  const projectPage = document.getElementById('project-page');
  const projectBack = document.getElementById('project-back');
  const projectCards = document.querySelectorAll('.project-card[data-project]');
  const moreProjectsLink = document.querySelector('.projects__more-link');

  function openProjectPage() {
    // 1) Black screen slides up
    projectTransition.classList.remove('project-transition--down');
    projectTransition.classList.add('project-transition--up');

    // 2) After black covers everything, show white page behind it
    setTimeout(() => {
      projectPage.classList.add('project-page--open');
      document.body.style.overflow = 'hidden';
      projectPage.scrollTop = 0;
    }, 400);

    // 3) Then slide black screen away upward to reveal white page
    setTimeout(() => {
      projectTransition.classList.remove('project-transition--up');
      projectTransition.classList.add('project-transition--down');
    }, 500);

    // 4) Reset transition div after animation
    setTimeout(() => {
      projectTransition.classList.remove('project-transition--down');
    }, 1000);
  }

  function closeProjectPage() {
    // Reverse: black slides up to cover white page
    projectTransition.classList.remove('project-transition--down');
    projectTransition.classList.add('project-transition--up');

    setTimeout(() => {
      projectPage.classList.remove('project-page--open');
      document.body.style.overflow = '';
    }, 400);

    setTimeout(() => {
      projectTransition.classList.remove('project-transition--up');
      projectTransition.classList.add('project-transition--down');
    }, 500);

    setTimeout(() => {
      projectTransition.classList.remove('project-transition--down');
    }, 1000);
  }

  projectCards.forEach(card => {
    card.addEventListener('click', openProjectPage);
  });

  if (moreProjectsLink) {
    moreProjectsLink.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectPage();
    });
  }

  projectBack.addEventListener('click', closeProjectPage);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectPage.classList.contains('project-page--open')) {
      closeProjectPage();
    }
  });


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
  const maxAge = 90; // ~1.5 seconds at 60fps
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
        // Base soft stroke (half thickness: 6)
        ctx.strokeStyle = `rgba(58, 58, 244, ${opacity * 0.4})`;
        ctx.lineWidth = 6;
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.stroke();

        // Core solid stroke
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y - currentScrollY);
        ctx.lineTo(p2.x, p2.y - currentScrollY);
        ctx.strokeStyle = `rgba(58, 58, 244, ${opacity * 0.8})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Offset stroke 1 (chisel texture)
        ctx.beginPath();
        ctx.moveTo(p1.x + 1.5, p1.y - currentScrollY + 1.5);
        ctx.lineTo(p2.x + 1.5, p2.y - currentScrollY + 1.5);
        ctx.strokeStyle = `rgba(58, 58, 244, ${opacity * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Offset stroke 2 (chisel texture)
        ctx.beginPath();
        ctx.moveTo(p1.x - 1, p1.y - currentScrollY - 1);
        ctx.lineTo(p2.x - 1, p2.y - currentScrollY - 1);
        ctx.strokeStyle = `rgba(58, 58, 244, ${opacity * 0.6})`;
        ctx.lineWidth = 1.5;
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

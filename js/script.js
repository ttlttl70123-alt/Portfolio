/**
 * Portfolio Main Page - Interactive Scripts
 * - Header scroll effects (light/dark mode switching)
 * - Mobile menu toggle
 * - Scroll reveal animations
 * - Smooth section-aware header styling
 */

// Force scroll to top on main page reload (unless URL has a hash link)
if ((window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) && !window.location.hash) {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('main-nav');
  const darkSections = document.querySelectorAll('.dark-section, .inquiries, .footer');

  // ===== GEO GREETING (IP 기반 국가 감지) =====
  const geoGreeting = document.getElementById('geo-greeting');
  const heroCountry = document.getElementById('hero-country');
  
  fetch('https://get.geojs.io/v1/ip/geo.json')
    .then(res => res.json())
    .then(data => {
      const country = (data.country || '').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      // 국기 이미지 매핑 (이미지 폴더의 파일명과 확장자 매칭)
      const flagMap = {
        'South Korea': 'KOREA.webp',
        'Canada': 'CANADA.png',
        'United States': 'usa.png'
      };
      if (country) {
        if (heroCountry) heroCountry.textContent = country;
        
        // 국기 이미지 표시
        const heroFlag = document.getElementById('hero-flag');
        const flagKey = flagMap[country];
        if (heroFlag && flagKey) {
          heroFlag.src = `images/${flagKey}`;
          heroFlag.alt = `${country} flag`;
          heroFlag.style.display = 'inline-block';
        }
      }
    })
    .catch(() => {
      // API 실패 시 기본값 유지
      if (geoGreeting) geoGreeting.textContent = 'HELLO,';
      if (heroCountry) heroCountry.textContent = 'there';
    });

  // ===== MOBILE MENU TOGGLE =====
  if (menuBtn && nav) {
    // Clean up any inline styles on menu button toggle to fix the bug where menu doesn't open
    menuBtn.addEventListener('click', () => {
      nav.style.transition = '';
      nav.style.right = '';
      nav.style.visibility = '';
      menuBtn.classList.toggle('header__menu-btn--open');
      nav.classList.toggle('header__nav--open');
    });

    // Close menu on link click — hide instantly to avoid white flash during page transition
    nav.querySelectorAll('.header__link, .pp-header__link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If clicking CONTACT and we are on the page with "Just Get In Touch"
        if ((href === '#contact' || href === 'index.html#contact') && document.getElementById('btn-get-in-touch')) {
          e.preventDefault();
          const targetElement = document.getElementById('btn-get-in-touch');
          const rect = targetElement.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          const targetCenter = absoluteTop + (rect.height / 2);
          const scrollPos = targetCenter - (window.innerHeight / 2);
          
          window.scrollTo({
            top: scrollPos,
            behavior: 'smooth'
          });
        }

        nav.style.transition = 'none';
        nav.style.right = '-100%';
        nav.style.visibility = 'hidden';
        menuBtn.classList.remove('header__menu-btn--open');
        nav.classList.remove('header__nav--open');
      });
    });
  }

  // ===== SCROLL TO PROJECTS AREA =====
  function scrollToProjectsArea() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const rect = projectsSection.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const targetCenter = absoluteTop + (rect.height / 2);
      const scrollPos = targetCenter - (window.innerHeight / 2);
      
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    }
  }

  // ===== SCROLL TO PHILOSOPHY AREA =====
  function scrollToPhilosophyArea() {
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const targetCenter = absoluteTop + (rect.height / 2);
      const scrollPos = targetCenter - (window.innerHeight / 2);
      
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
      
      if (aboutSection && aboutSection.classList.contains('is-bouncing')) {
        aboutSection.classList.remove('is-bouncing');
      }
    }
  }

  // ===== HERO ARROW SCROLL =====
  const heroArrows = document.querySelectorAll('.hero__arrow');
  const aboutSection = document.getElementById('about');
  
  if (heroArrows.length > 0) {
    heroArrows.forEach(arrow => {
      arrow.style.cursor = 'pointer';
      arrow.addEventListener('click', scrollToPhilosophyArea);
    });
  }

  // ===== DARK SECTION CLICK & BOUNCE =====
  if (aboutSection) {
    const topClickableArea = aboutSection.querySelector('.dark-section__top-clickable');
    if (topClickableArea) {
      topClickableArea.style.cursor = 'pointer';
      topClickableArea.addEventListener('click', scrollToPhilosophyArea);
    }

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
    if (!header) return;
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

  // ===== SMART HIDE FLOATING BUTTON ON SCROLL =====
  const floatingBtn = document.querySelector('.floating-back-btn');
  if (floatingBtn) {
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    
    window.addEventListener('scroll', () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // If scrolling down and past 150px
      if (currentScrollTop > lastScrollTop && currentScrollTop > 150) {
        floatingBtn.classList.add('floating-back-btn--hidden');
      } 
      // If scrolling up
      else {
        floatingBtn.classList.remove('floating-back-btn--hidden');
      }
      
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }, { passive: true });
  }

    function navigateToProject(card) {
    const url = card.dataset.url || card.getAttribute('href');
    if (url && url !== '#') {
      window.location.href = url;
    }
  }

  // ===== PROJECT PAGE TRANSITION =====
  const projectPage = document.getElementById('project-page');
  const projectBack = document.getElementById('project-back');
  const projectCards = document.querySelectorAll('.project-card[data-project], .projects-list__item.has-lock');
  const moreProjectsLink = document.querySelector('.projects__header-right .projects__more-link');
  const ppHeader = document.querySelector('.pp-header');

  if (ppHeader) {
    const scrollHandler = () => {
      // Body scroll (for modal) or window scroll (for standalone page)
      const scrollTop = (projectPage && projectPage.scrollTop > 0) ? projectPage.scrollTop : window.scrollY;
      const threshold = (window.innerHeight * 0.89) - 80; // 헤더 높이 여유분 약 80px
      if (scrollTop > threshold) {
        ppHeader.classList.add('pp-header--scrolled');
      } else {
        ppHeader.classList.remove('pp-header--scrolled');
      }
    };
    
    if (projectPage) projectPage.addEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', scrollHandler);
  }



  projectCards.forEach(card => {
    const authOverlay = card.querySelector('.project-card__auth');
    if (authOverlay) {
      card.addEventListener('click', (e) => {
        if (card.tagName.toLowerCase() === 'a') e.preventDefault();
        if (e.target.closest('.project-card__submit')) {
          const pwInput = card.querySelector('.project-card__password');
          const pw = pwInput.value;
          if (pw === '4598') {
            navigateToProject(card);
          } else {
            pwInput.classList.add('is-error');
              setTimeout(() => {
                pwInput.classList.remove('is-error');
              pwInput.value = '';
                pwInput.focus();
              }, 280);
          }
        } else if (e.target.closest('.project-card__pw-container')) {
          e.stopPropagation();
          return; // Ignore clicks inside the input container
        } else {
          e.stopPropagation();
          authOverlay.classList.toggle('is-active');
          if (authOverlay.classList.contains('is-active')) {
            const input = card.querySelector('.project-card__password');
            if (input) input.focus();
          }
        }
      });
      // Allow pressing Enter in the password field
      const inputField = card.querySelector('.project-card__password');
      if (inputField) {
        inputField.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            const btn = card.querySelector('.project-card__submit');
            if (btn) btn.click();
          }
        });
      }
    } else {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.project-card__info')) return;
        navigateToProject(card);
      });
    }
  });

  if (moreProjectsLink) {
    // Let the default anchor link behavior take over (navigates to projects.html)
  }

  


  // ===== PRELOADER & HERO TEXT ANIMATION =====
  const preloader = document.getElementById('preloader');
  const counterElement = document.getElementById('preloader-counter');
  let currentCount = 0;
  const targetCount = 100;
  
  // Animate counter
  if (preloader && counterElement) {
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
          }, 500); // short delay after hitting 100
      } else {
        counterElement.innerText = currentCount;
      }
    }, 20); // Fast interval
  }

  // Hero texts are now visible by default since we removed the fade-in effect

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
  const maxAge = 16; // increased by 20%
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
        // Base soft stroke (half thickness: 7.2)
        ctx.strokeStyle = `rgba(58, 58, 244, ${opacity * 0.4})`;
        ctx.lineWidth = 7.2;
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.stroke();

        // Core solid stroke
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y - currentScrollY);
        ctx.lineTo(p2.x, p2.y - currentScrollY);
        ctx.strokeStyle = `rgba(58, 58, 244, ${opacity * 0.8})`;
        ctx.lineWidth = 3.6;
        ctx.stroke();

        // Offset stroke 1 (chisel texture)
        ctx.beginPath();
        ctx.moveTo(p1.x + 1.8, p1.y - currentScrollY + 1.8);
        ctx.lineTo(p2.x + 1.8, p2.y - currentScrollY + 1.8);
        ctx.strokeStyle = `rgba(58, 58, 244, ${opacity * 0.5})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Offset stroke 2 (chisel texture)
        ctx.beginPath();
        ctx.moveTo(p1.x - 1.2, p1.y - currentScrollY - 1.2);
        ctx.lineTo(p2.x - 1.2, p2.y - currentScrollY - 1.2);
        ctx.strokeStyle = `rgba(58, 58, 244, ${opacity * 0.6})`;
        ctx.lineWidth = 1.8;
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



  // ===== TOOLS HOVER (JS-based to bypass any CSS z-index/pointer-events blocking) =====
  const toolsTags = document.querySelectorAll('.tools-tag');
  toolsTags.forEach(function(tag) {
    const logo = tag.querySelector('.tools-logo');
    const text = tag.querySelector('.tools-text');
    if (!text) return;

    tag.addEventListener('mouseenter', function() {
      tag.classList.add('is-hovered');
      if (logo) { logo.style.opacity = '0'; logo.style.transform = 'translateY(-20px)'; }
      text.style.opacity = '1';
      text.style.transform = 'translateY(0)';
    });
    tag.addEventListener('mouseleave', function() {
      tag.classList.remove('is-hovered');
      if (logo) { logo.style.opacity = '1'; logo.style.transform = 'translateY(0)'; }
      text.style.opacity = '0';
      text.style.transform = 'translateY(20px)';
    });
  });

  // ===== NEW HORIZONTAL SERVICE TAGS (about.html) =====
  const serviceTagsContainer = document.querySelector('.service-tags-h');
  if (serviceTagsContainer) {
    const tagsH       = serviceTagsContainer.querySelectorAll('.service-tag-h');
    const overlay     = serviceTagsContainer.querySelector('.service-tags-h__overlay');
    const overlayText = serviceTagsContainer.querySelector('.service-tags-h__overlay-text');
    let leaveTimer = null;
    let rafId = null;

    // 60fps rAF 루프로 카드 위치를 실시간 추적 → 스크롤해도 딱 붙음
    function trackLoop() {
      const rect = serviceTagsContainer.getBoundingClientRect();
      const expandedHeight = rect.height * 1.44;
      const topOffset = (expandedHeight - rect.height) / 2;
      overlay.style.top = (rect.top - topOffset) + 'px';
      overlay.style.height = expandedHeight + 'px';
      // overlayText.style.fontSize removed to match main page CSS size
      rafId = requestAnimationFrame(trackLoop);
    }

    let stopTimer = null;

    function startTracking() {
      clearTimeout(stopTimer);
      if (!rafId) trackLoop();
    }
    function stopTracking() {
      clearTimeout(stopTimer);
      // 닫히는 CSS 트랜지션(0.55s)이 끝난 뒤에 루프 정지 → 닫히는 동안도 고정 유지
      stopTimer = setTimeout(function() {
        if (!serviceTagsContainer.classList.contains('is-hovering')) {
          if (rafId) { cancelAnimationFrame(rafId); rafId = null; } overlay.style.top = ''; overlay.style.height = ''; overlay.style.left = ''; overlay.style.width = '';
        }
      }, 550);
    }

    tagsH.forEach(function(tag) {
      tag.addEventListener('mouseenter', function() {
        clearTimeout(leaveTimer);
        if (!serviceTagsContainer.classList.contains('is-open')) {
          const rawTitle = tag.getAttribute('data-title').toLowerCase();
          overlayText.innerHTML = `<span class="thumb-paren" style="margin-right: 0.05em; font-weight: 400;">(</span>${rawTitle}<span class="thumb-paren" style="margin-left: 0.05em; font-weight: 400;">)</span>`;
          serviceTagsContainer.classList.add('is-hovering');
          startTracking();
        }
      });
      tag.addEventListener('mouseleave', function() {
        if (!serviceTagsContainer.classList.contains('is-open')) {
          leaveTimer = setTimeout(function() {
            serviceTagsContainer.classList.remove('is-hovering');
            stopTracking();
          }, 60);
        }
      });
    });

    serviceTagsContainer.addEventListener('mouseleave', function() {
      if (!serviceTagsContainer.classList.contains('is-open')) {
        clearTimeout(leaveTimer);
        serviceTagsContainer.classList.remove('is-hovering');
        stopTracking();
      }
    });
    serviceTagsContainer.addEventListener('mouseenter', function() {
      clearTimeout(leaveTimer);
    });
  }

  // ===== SERVICE MODAL =====

  const serviceTags = document.querySelectorAll('.service-tag-h'); // 신규 태그
  const serviceModal = document.getElementById('serviceModal');
  const modalServiceTagsContainer = document.querySelector('.service-tags-h');
  
  if (serviceModal && serviceTags.length > 0) {
    const modalTitle = document.getElementById('serviceModalTitle');
    const modalBody = document.getElementById('serviceModalDesc');
    const modalClose = serviceModal.querySelector('.service-modal__close');
    const modalOverlay = serviceModal.querySelector('.service-modal__overlay');

    let galleryImages = [];
    let galleryCaptions = [];
    let centerImageIndex = 0;

    const openModal = (title, desc, images, captions, layout) => {
      if (modalTitle) modalTitle.textContent = title;
      if (modalBody) modalBody.innerHTML = desc;
      
      if (layout === 'horizontal') {
        serviceModal.classList.add('service-modal--horizontal');
      } else {
        serviceModal.classList.remove('service-modal--horizontal');
      }
      
      serviceModal.classList.remove('service-modal--3d');
      if (title === '3D VISUALIZATION') {
        serviceModal.classList.add('service-modal--3d');
      }

      galleryImages = images || [];
      galleryCaptions = captions || [];
      centerImageIndex = 0;
      updateCarousel();

      if (modalServiceTagsContainer) {
        modalServiceTagsContainer.classList.add('is-animating');
        modalServiceTagsContainer.classList.add('is-open');
      }
      serviceModal.classList.add('is-active');
    };

    const closeModal = () => {
      if (modalServiceTagsContainer) {
        modalServiceTagsContainer.classList.remove('is-open');
        setTimeout(() => { modalServiceTagsContainer.classList.remove('is-animating'); }, 550);
        modalServiceTagsContainer.classList.remove('is-hovering');
      }
      serviceModal.classList.remove('is-active');
    };

    serviceTags.forEach((tag, index) => {
      tag.addEventListener('click', () => {
        const title = tag.getAttribute('data-title');
        const desc = tag.getAttribute('data-desc');
        const layout = tag.getAttribute('data-layout');
        let images = [];
        let captions = [];
        try {
          images = JSON.parse(tag.getAttribute('data-images') || '[]');
          captions = JSON.parse(tag.getAttribute('data-captions') || '[]');
        } catch (e) { console.error("Error parsing modal data", e); }
        openModal(title, desc, images, captions, layout);
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }
    
    // --- Gallery navigation logic (vertical carousel) ---
    const sideThumbs = document.querySelectorAll('.gallery-side-thumb');
    const mainImageContainer = document.querySelector('.gallery-image-container');
    const prevBtn = document.querySelector('.gallery-nav--prev');
    const nextBtn = document.querySelector('.gallery-nav--next');

    function updateCarousel() {
      // 가운데 썸네일은 항상 활성(밝게)
      sideThumbs.forEach((thumb, i) => {
        thumb.classList.toggle('is-active', i === 1); // 항상 가운데(1번)만 밝게
      });

      // 각 슬롯에 이미지 배정: [위 = center-1, 가운데 = center, 아래 = center+1]
      const topIdx = centerImageIndex - 1;
      const bottomIdx = centerImageIndex + 1;

      sideThumbs.forEach((thumb, slotIndex) => {
        const img = thumb.querySelector('img');
        if (!img) return;
        let imgIdx;
        if (slotIndex === 0) imgIdx = topIdx;
        else if (slotIndex === 1) imgIdx = centerImageIndex;
        else imgIdx = bottomIdx;

        if (imgIdx >= 0 && imgIdx < galleryImages.length) {
          img.src = galleryImages[imgIdx];
          thumb.style.visibility = 'visible';
        } else {
          thumb.style.visibility = 'hidden'; // 범위 밖이면 숨김
        }
      });

      // 메인 이미지 업데이트
      if (mainImageContainer) {
        const mainImg = mainImageContainer.querySelector('img');
        if (mainImg) {
          mainImg.src = galleryImages[centerImageIndex] || '';
        }
        
        // 캡션 업데이트 및 위치 계산
        const captionEl = document.getElementById('galleryCaption');
        if (captionEl) {
          captionEl.textContent = galleryCaptions[centerImageIndex] || '';

          // 사진 렌더링 후 테두리 위치 계산 및 캡션 배치
          mainImg.onload = () => {
            let topOffset = 0;
            let leftOffset = 0;

            if (!serviceModal.classList.contains('service-modal--horizontal')) {
              const containerRatio = mainImg.clientWidth / mainImg.clientHeight;
              const imageRatio = mainImg.naturalWidth / mainImg.naturalHeight;
              let renderedWidth, renderedHeight;

              if (containerRatio > imageRatio) {
                renderedHeight = mainImg.clientHeight;
                renderedWidth = renderedHeight * imageRatio;
              } else {
                renderedWidth = mainImg.clientWidth;
                renderedHeight = renderedWidth / imageRatio;
              }

              topOffset = (mainImg.clientHeight - renderedHeight) / 2;
              leftOffset = (mainImg.clientWidth - renderedWidth) / 2;
            }

            captionEl.style.top = `calc(${topOffset}px - 22px)`;
            captionEl.style.left = `${leftOffset}px`;
          };
          
          if (mainImg.complete) {
            mainImg.onload();
          }
          
          window.addEventListener('resize', mainImg.onload);
        }
      }

      // 화살표 비활성화
      if (prevBtn) prevBtn.classList.toggle('disabled', centerImageIndex <= 0);
      if (nextBtn) nextBtn.classList.toggle('disabled', centerImageIndex >= galleryImages.length - 1);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (centerImageIndex > 0) {
          centerImageIndex--;
          updateCarousel();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (centerImageIndex < galleryImages.length - 1) {
          centerImageIndex++;
          updateCarousel();
        }
      });
    }
    // 썸네일 클릭으로도 이동
    sideThumbs.forEach((thumb, slotIndex) => {
      thumb.addEventListener('click', () => {
        if (slotIndex === 0 && centerImageIndex > 0) {
          centerImageIndex--;
          updateCarousel();
        } else if (slotIndex === 2 && centerImageIndex < galleryImages.length - 1) {
          centerImageIndex++;
          updateCarousel();
        }
      });
    });
    // Initialize
    updateCarousel();

    // ── 모바일 전용: 스와이프로 이미지 넘기기 ──
    // (데스크톱에는 영향 없음)
    if (mainImageContainer) {
      let touchStartX = 0;
      let touchStartY = 0;

      mainImageContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      mainImageContainer.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        // 가로 스와이프가 세로보다 명확할 때만 이미지 전환 (50px 이상)
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
          if (dx < 0 && centerImageIndex < galleryImages.length - 1) {
            // 왼쪽 스와이프 → 다음 이미지
            centerImageIndex++;
            updateCarousel();
          } else if (dx > 0 && centerImageIndex > 0) {
            // 오른쪽 스와이프 → 이전 이미지
            centerImageIndex--;
            updateCarousel();
          }
        }
      }, { passive: true });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && serviceModal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  // Handle email click to copy to clipboard (Fallback for mailto)
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const email = link.getAttribute('href').replace('mailto:', '');
      navigator.clipboard.writeText(email).then(() => {
        const originalText = link.getAttribute('data-text') || link.textContent;
        const originalColor = link.style.color;
        link.textContent = 'COPIED!';
        link.style.color = '#3A3AF4'; // Changed to brand blue color
        setTimeout(() => {
          link.textContent = originalText;
          link.style.color = originalColor; // Restore original color
        }, 1500);
      });
    });
  });



  // ===== HASH NAVIGATION =====
  // If navigating from another page with #project-name (e.g. #commercial), open it automatically
  window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const targetCard = document.querySelector(`.project-card[data-project="${hash}"]`);
      if (targetCard) {
        navigateToProject(targetCard);
      }
    }
  });

  // ===== FLOATING BACK BUTTON DYNAMIC TEXT =====
  const backBtn = document.getElementById("floating-back-btn");
  if (backBtn) {
    if (document.referrer.includes("index.html") || document.referrer.endsWith("/")) {
      const btnText = backBtn.querySelector(".btn-text");
      if (btnText) {
        btnText.textContent = "MORE PROJECTS";
      }
    }
  }



document.addEventListener('DOMContentLoaded', () => {
  // ===== IMAGE LIGHTBOX MODAL =====
  const imageModal = document.getElementById('imageModal');
  const imageModalImg = document.getElementById('imageModalImg');
  const imageModalClose = document.querySelector('.image-modal__close');
  
  if (imageModal && imageModalImg && imageModalClose) {
    document.querySelectorAll('.pp-gallery img').forEach(img => {
      img.addEventListener('click', () => {
        imageModalImg.src = img.src;
        imageModal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-zoom-active');
        document.documentElement.classList.add('modal-zoom-active');
      });
    });

    const closeImageModal = () => {
      imageModal.classList.remove('is-active');
      document.body.style.overflow = '';
      document.body.classList.remove('modal-zoom-active');
      document.documentElement.classList.remove('modal-zoom-active');
      setTimeout(() => { imageModalImg.src = ''; }, 300);
    };

    // Allow pinch zoom INSIDE the modal by stopping propagation
    // (document-level handlers won't fire, so browser handles zoom naturally)
    ['touchstart', 'touchmove', 'gesturestart'].forEach(type => {
      imageModal.addEventListener(type, (e) => {
        e.stopPropagation();
      }, { passive: false });
    });

    imageModalClose.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) closeImageModal();
    });
  }

  // ===== FIX NAVIGATION HANG ON PROJECT PAGES =====
  // iOS Safari sometimes hangs on a white screen when navigating from a heavy page to a dark page.
  // We fade to black first, then explicitly trigger navigation.
  const navLinksToDarkPage = document.querySelectorAll('.pp-header__logo, .floating-back-btn');
  navLinksToDarkPage.forEach(link => {
    link.addEventListener('click', (e) => {
      if (e.ctrlKey || e.shiftKey || e.metaKey || e.button !== 0) return; // Allow new tabs naturally
      e.preventDefault();
      const targetUrl = link.href;
      document.body.style.transition = 'opacity 0.3s ease, background-color 0.3s ease';
      document.body.style.backgroundColor = '#131313';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 300);
    });
  });
});

// ===== DISABLE PINCH ZOOM (unconditionally on document) =====
// Modal uses stopPropagation so its touches never reach here
document.addEventListener('gesturestart', (e) => {
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) {
    // Stop any ongoing momentum scroll immediately, then block zoom
    window.scrollTo(window.scrollX, window.scrollY);
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });


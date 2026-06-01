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
          heroFlag.src = `images/${flagKey}.webp`;
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
  const moreProjectsLink = document.querySelector('.projects__header-right .projects__more-link');
  const ppHeader = document.querySelector('.pp-header');

  if (projectPage) {
    projectPage.addEventListener('scroll', () => {
      // .pp-hero 높이(89vh)를 기준으로, 스크롤이 헤더 영역을 지나 흰색 배경에 닿으면 클래스 추가
      const threshold = (window.innerHeight * 0.89) - 80; // 헤더 높이 여유분 약 80px
      if (projectPage.scrollTop > threshold) {
        ppHeader.classList.add('pp-header--scrolled');
      } else {
        ppHeader.classList.remove('pp-header--scrolled');
      }
    });
  }

  function openProjectPage() {
    projectPage.classList.add('project-page--open');
    document.body.style.overflow = 'hidden';
    projectPage.scrollTop = 0;
    // 브라우저 히스토리에 상태 추가 (뒤로가기 지원)
    history.pushState({ isProjectOpen: true }, '', '#project');
  }

  function closeProjectPage(isPopState) {
    projectPage.classList.remove('project-page--open');
    document.body.style.overflow = '';
    // 직접 닫기 버튼/ESC를 누른 경우 히스토리에서도 뒤로가기 실행
    if (isPopState !== true && window.location.hash === '#project') {
      history.back();
    }
  }

  // 브라우저 뒤로가기 버튼 감지
  window.addEventListener('popstate', (e) => {
    if (projectPage.classList.contains('project-page--open')) {
      closeProjectPage(true); // 히스토리 변경으로 인한 호출임을 표시
    }
  });

  projectCards.forEach(card => {
    card.addEventListener('click', openProjectPage);
  });

  if (moreProjectsLink) {
    // Let the default anchor link behavior take over (navigates to projects.html)
  }

  if (projectBack) {
    projectBack.addEventListener('click', closeProjectPage);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectPage && projectPage.classList.contains('project-page--open')) {
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

  // ===== SERVICE MODAL =====
  const serviceTags = document.querySelectorAll('.service-tag');
  const serviceModal = document.getElementById('serviceModal');
  
  if (serviceModal && serviceTags.length > 0) {
    const modalTitle = document.getElementById('serviceModalTitle');
    const modalBody = document.getElementById('serviceModalDesc');
    const modalClose = serviceModal.querySelector('.service-modal__close');
    const modalOverlay = serviceModal.querySelector('.service-modal__overlay');

    const openModal = (title, desc, index) => {
      if (modalTitle) modalTitle.textContent = title;
      if (modalBody) modalBody.innerHTML = desc; /* <br> 태그 인식을 위해 innerHTML 사용 */
      
      // 탭 인덱스에 따라 이미지 및 레이아웃 설정
      if (index === 1) { // 02번 탭 (Spatial Strategy Planning)
        serviceModal.classList.add('service-modal--horizontal');
        galleryImages = [
          'images/02_Spatial_Strategy_Planning/20260527_104840.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104850.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104859.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104902.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104904.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104910.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104912.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104914.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104916.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104918.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104920.webp',
          'images/02_Spatial_Strategy_Planning/20260527_104922.webp'
        ];
      } else if (index === 2) { // 03번 탭 (Industrial design)
        serviceModal.classList.add('service-modal--horizontal');
        galleryImages = [
          'images/03_Product_design1/1.webp',
          'images/03_Product_design1/2.webp',
          'images/03_Product_design1/3.webp',
          'images/03_Product_design1/4.webp',
          'images/03_Product_design1/5.webp'
        ];
      } else { // 01번 탭 (Interior design)
        serviceModal.classList.remove('service-modal--horizontal');
        galleryImages = [
          'images/01_Interior desgin/Interior design_03_2.webp',
          'images/01_Interior desgin/Interior design_07_2.webp',
          'images/01_Interior desgin/Interior design_05_2.webp',
          'images/01_Interior desgin/Interior design_01.webp',
          'images/01_Interior desgin/Interior design_06_2.webp',
          'images/01_Interior desgin/Interior design_02.webp',
          'images/01_Interior desgin/Interior design_04_2.webp'
        ];
      }
      centerImageIndex = 0; // 초기 화면에서 첫 번째 이미지가 활성화되도록 0으로 설정 (좌측/상단 썸네일 비움)
      currentTabIndex = index;
      updateCarousel();

      serviceModal.classList.add('is-active');
    };

    const closeModal = () => {
      serviceModal.classList.remove('is-active');
    };

    serviceTags.forEach((tag, index) => {
      tag.addEventListener('click', () => {
        const title = tag.getAttribute('data-title');
        const desc = tag.getAttribute('data-desc');
        openModal(title, desc, index);
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

    // 이미지 목록 (나중에 동적으로 변경 가능)
    let galleryImages = [
      'images/01_Interior desgin/Interior design_02.webp',
      'images/01_Interior desgin/Interior design_02.webp',
      'images/01_Interior desgin/Interior design_02.webp',
    ];
    let centerImageIndex = 0; // 초기 화면에서 첫 번째 이미지가 활성화되도록 0으로 설정
    let currentTabIndex = 0;

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
          mainImg.src = galleryImages[centerImageIndex];
        }
        
        // 캡션 업데이트
        const captionEl = document.getElementById('galleryCaption');
        if (captionEl) {
          if (currentTabIndex === 1) {
            // 02번 탭일 경우 모든 사진에 동일한 캡션 유지
            captionEl.textContent = '* Selected pages to ensure project confidentiality.';
          } else if (currentTabIndex === 2) {
            // 03번 탭일 경우 캡션
            const captions03 = [
              '* Maserati Snowmobile Designed During Associate Degree',
              '* From the Graduation Exhibition',
              '* Automotive Exterior Sketches for Study Abroad Portfolio',
              '* Automotive Interior Sketches for Study Abroad Portfolio',
              '* “The Familiar Seat” – Zero Waste Furniture Design'
            ];
            captionEl.textContent = captions03[centerImageIndex] || '';
          } else {
            // 01번 탭일 경우 각각 지정된 캡션 표시
            const captions = [
              '* After second project shoot with Director and team',
              '* At the site in China (It was so hot)',
              '* At the workshop in Jeju, Korea',
              '* At the project site in China',
              '* At the ski resort',
              '* Alone at the office on the weekend',
              '* At the workshop in Japan'
            ];
            
            if (captions[centerImageIndex]) {
              captionEl.textContent = captions[centerImageIndex];
            } else {
              captionEl.textContent = ''; // 문구가 지정되지 않은 남은 사진은 빈 텍스트
            }
          }
          
          // 사진 렌더링 후 테두리 위치 계산 및 캡션 배치
          mainImg.onload = () => {
            let topOffset = 0;
            let leftOffset = 0;

            // 1번 탭(세로형 컨테인)일 때만 실제 렌더링 영역 계산 (2번 탭은 꽉 차있으므로 0유지)
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

            captionEl.style.top = `calc(${topOffset}px - 18px)`; // 24px과 12px의 중간값 18px 적용
            captionEl.style.left = `${leftOffset}px`;
          };
          
          // 만약 이미 캐시된 이미지라면 onload가 안 불릴 수 있으므로 강제 실행
          if (mainImg.complete) {
            mainImg.onload();
          }
          
          // 창 크기 조절 시에도 캡션 위치 업데이트
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

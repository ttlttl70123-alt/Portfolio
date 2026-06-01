document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('archive-gallery');
  // Remove sentinel if it exists
  const sentinel = document.getElementById('archive-sentinel');
  if (sentinel) sentinel.remove();

  // Configuration
  const isMobile = window.innerWidth <= 600;
  const numColumns = isMobile ? 2 : 5;
  const itemsPerColumn = 10; // Original set size
  const autoScrollSpeed = 0.15; // 70% slower (was 0.5)

  const columns = [];
  let targetScrollY = 0;
  let currentScrollY = 0;
  let isDragging = false;
  let startY = 0;

  // Create columns
  for (let i = 0; i < numColumns; i++) {
    const col = document.createElement('div');
    col.className = 'archive-column';
    gallery.appendChild(col);
    columns.push({
      el: col,
      originalHeight: 0
    });
  }

  // Generate a random gallery item
  const createGalleryItem = () => {
    const item = document.createElement('div');
    item.className = 'archive-item';
    
    const imgContainer = document.createElement('div');
    imgContainer.className = 'archive-item__img-wrapper';
    
    const randomHeight = Math.floor(Math.random() * 300) + 150; 
    imgContainer.style.height = `${randomHeight}px`;
    imgContainer.style.backgroundColor = '#d3d3d3'; 
    
    const textArea = document.createElement('div');
    textArea.className = 'archive-item__text-area';
    
    const titleRow = document.createElement('div');
    titleRow.className = 'archive-item__title-row';
    
    const title = document.createElement('h3');
    title.className = 'archive-item__title';
    title.textContent = 'Untitled Sketch';
    
    const heartIcon = document.createElement('img');
    heartIcon.className = 'archive-item__heart';
    heartIcon.src = 'images/heart.png';
    heartIcon.alt = 'Like';
    
    heartIcon.addEventListener('click', function() {
      this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff3b30"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
      this.style.opacity = '1';
      this.style.transform = 'scale(1.4)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    }, { once: true });
    
    titleRow.appendChild(title);
    titleRow.appendChild(heartIcon);
    textArea.appendChild(titleRow);
    item.appendChild(imgContainer);
    item.appendChild(textArea);
    
    return item;
  };

  // Populate columns and measure original heights
  columns.forEach(colData => {
    // Generate original set
    for (let i = 0; i < itemsPerColumn; i++) {
      colData.el.appendChild(createGalleryItem());
    }
  });

  // We need to wait a tiny bit for the browser to render and calculate heights
  setTimeout(() => {
    columns.forEach(colData => {
      // Calculate height of the original block including gaps (approximate by scrolling height)
      colData.originalHeight = colData.el.scrollHeight;

      // Clone the items 2 times to ensure we always have enough content to fill the screen while looping
      const children = Array.from(colData.el.children);
      for(let cloneSet = 0; cloneSet < 2; cloneSet++) {
        children.forEach(child => {
          colData.el.appendChild(child.cloneNode(true));
          // Note: cloneNode(true) does not copy event listeners. 
          // For the heart icon on clones, we'd need to re-attach or use event delegation.
          // For simplicity and performance, we'll re-attach it to clones.
          const lastChild = colData.el.lastChild;
          const heart = lastChild.querySelector('.archive-item__heart');
          if (heart) {
            heart.addEventListener('click', function() {
              this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff3b30"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
              this.style.opacity = '1';
              this.style.transform = 'scale(1.4)';
              setTimeout(() => { this.style.transform = 'scale(1)'; }, 200);
            }, { once: true });
          }
        });
      }
    });

    // Start Animation Loop
    requestAnimationFrame(renderLoop);
  }, 100);

  function renderLoop() {
    targetScrollY += autoScrollSpeed;
    
    // Lerp (Linear Interpolation) for buttery smooth scrolling on notched mouse wheels
    currentScrollY += (targetScrollY - currentScrollY) * 0.08;

    // Apply transforms
    columns.forEach(colData => {
      if (colData.originalHeight > 0) {
        const h = colData.originalHeight;
        let y = (currentScrollY % h + h) % h;
        colData.el.style.transform = `translateY(-${y}px)`;
      }
    });

    requestAnimationFrame(renderLoop);
  }

  const mainContainer = document.querySelector('.archive-main');

  // Handle Mouse Wheel for manual scrolling without walls
  mainContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetScrollY += e.deltaY;
  }, { passive: false });

  // Handle Touch for manual scrolling
  let lastTouchY = 0;
  mainContainer.addEventListener('touchstart', (e) => {
    lastTouchY = e.touches[0].clientY;
  }, { passive: true });

  mainContainer.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const currentY = e.touches[0].clientY;
    const deltaY = lastTouchY - currentY;
    targetScrollY += deltaY * 2; 
    lastTouchY = currentY;
  }, { passive: false });

});

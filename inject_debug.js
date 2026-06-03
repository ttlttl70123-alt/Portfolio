const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

const debugScript = `
  <script>
    // Highlight all fixed and absolute elements that can receive pointer events
    window.addEventListener('load', () => {
      const allElements = document.querySelectorAll('*');
      let found = false;
      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if ((style.position === 'fixed' || style.position === 'absolute') && style.pointerEvents !== 'none' && style.opacity !== '0' && style.visibility !== 'hidden') {
          // Add a red outline to it
          el.style.outline = '3px solid red';
          el.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
          console.log('Found overlapping element:', el.tagName, el.className, el.id, style.position);
          found = true;
        }
      });
      if (found) {
        alert('발견! 화면에 빨간색 테두리와 배경으로 표시된 요소를 확인해주세요.');
      } else {
        alert('fixed 요소 중 클릭을 막을만한 요소를 찾지 못했습니다.');
      }
    });
  </script>
</body>`;

html = html.replace('</body>', debugScript);
fs.writeFileSync('about.html', html, 'utf8');
console.log('Debug script injected.');

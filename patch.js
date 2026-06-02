const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace('transform: translateY(10%); /* 우측 이미지가 scale(1.2)로 아래로 10% 튀어나오는 것과 동일선상에 맞추기 위해 이동 */', '/* transform: translateY(10%); */');
css = css.replace('transform: translateY(10%); /* 우측 이미지가 scale(1.2)로 아래로 10% 튀어나오는 것과 동일선상에 맞추기 위해 이동 */\r\n', '/* transform: translateY(10%); */\n');

css = css.replace('transform: scale(1.2) translateX(16px); /* 모달 크기는 유지한 채 이미지만 20% 확대, 전체적으로 우측으로 살짝 이동 */\n  transform-origin: center right; /* 우측을 기준으로 확대하여 텍스트 침범 최소화 */', 'transform: scale(0.96);\n  transform-origin: bottom right;');
css = css.replace('transform: scale(1.2) translateX(16px); /* 모달 크기는 유지한 채 이미지만 20% 확대, 전체적으로 우측으로 살짝 이동 */\r\n  transform-origin: center right; /* 우측을 기준으로 확대하여 텍스트 침범 최소화 */', 'transform: scale(0.96);\n  transform-origin: bottom right;');

css = css.replace('font-size: 2rem;\n  color: var(--color-text-light);', 'font-size: 3.38rem;\n  color: var(--color-text-light);');
css = css.replace('font-size: 2rem;\r\n  color: var(--color-text-light);', 'font-size: 3.38rem;\n  color: var(--color-text-light);');

css = css.replace('max-width: 1400px;\n  width: 90vw;\n  height: 52vh;', 'max-width: 1700px;\n  width: 96vw;\n  height: 70vh;');
css = css.replace('max-width: 1400px;\r\n  width: 90vw;\r\n  height: 52vh;', 'max-width: 1700px;\n  width: 96vw;\n  height: 70vh;');

css = css.replace('width: 80px; /* 메인 이미지 축소에 맞춰 썸네일 너비도 약 20% 축소 */', 'width: 120px;');

css = css.replace('font-size: 0.684rem;\n  letter-spacing: 0.02em;', 'font-size: 0.88rem;\n  font-weight: 200;\n  letter-spacing: 0.02em;');
css = css.replace('font-size: 0.684rem;\r\n  letter-spacing: 0.02em;', 'font-size: 0.88rem;\n  font-weight: 200;\n  letter-spacing: 0.02em;');

css = css.replace('.service-modal--horizontal .service-modal__right {\n  flex-direction: column;', '.service-modal--horizontal .service-modal__right {\n  transform: scale(0.8);\n  transform-origin: center right;\n  flex-direction: column;');
css = css.replace('.service-modal--horizontal .service-modal__right {\r\n  flex-direction: column;', '.service-modal--horizontal .service-modal__right {\n  transform: scale(0.8);\n  transform-origin: center right;\n  flex-direction: column;');

if(!css.includes('.service-modal:not(.service-modal--horizontal) .service-modal__left { padding-left: 4vw; }')) {
  css += '\n/* 1번 전용 */\n.service-modal:not(.service-modal--horizontal) .service-modal__left { padding-left: 4vw; }\n.service-modal:not(.service-modal--horizontal) .service-modal__right { margin-right: 4vw; }\n';
}

fs.writeFileSync('css/style.css', css);


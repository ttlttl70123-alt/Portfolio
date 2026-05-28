const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const oldBlock = `/* ── PP HERO (full-bleed image with overlay title) ── */
.pp-hero {
  position: relative;
  width: 100%;
  height: 88vh; /* 붉은선: 헤더 top부터 88vh */
  overflow: hidden;
}

.pp-hero__img-placeholder {
  width: 100%;
  height: 100%;
  background-color: #c0c0c0;
  object-fit: cover;
}

.pp-hero__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: clamp(32px, 5vw, 64px) clamp(24px, 5vw, 80px);
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pp-hero__title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8vw, 9rem);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 0.95;
  color: #ffffff;
  margin: 0;
}

.pp-hero__subtitle {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-weight: 300;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.03em;
  margin: 0;
}

/* Year tag: top-right corner of hero image */
.pp-hero__year {
  position: absolute;
  top: calc(var(--header-height) + 20px);
  right: clamp(24px, 5vw, 80px);
  font-family: var(--font-script);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  color: rgba(255, 255, 255, 0.75);
  z-index: 2;
  pointer-events: none;
}

/* ── PP CONTENT (3-col reference layout) ── */
.pp-content {
  display: grid;
  grid-template-columns: 220px 1fr 1fr;
  gap: clamp(32px, 4vw, 60px);
  padding: clamp(48px, 7vw, 96px) clamp(24px, 5vw, 80px);
  border-bottom: 1px solid #e8e8e8;
}

.pp-content__left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 2px;
}

.pp-content__label {
  font-family: var(--font-display);
  font-size: clamp(3rem, 4.8vw, 4.2rem);
  font-weight: 400;
  color: #111;
  letter-spacing: 0.02em;
  line-height: 1;
  margin: 0;
}

.pp-content__body {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: #444;
  margin: 0;
}

/* ── PP GALLERY ── */
.pp-gallery {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: clamp(24px, 4vw, 48px) clamp(24px, 5vw, 80px) clamp(80px, 10vw, 120px);
}`;

const newBlock = `/* ── PP HERO (full-bleed: covers from very top, header floats above) ── */
.pp-hero {
  position: relative;
  width: 100%;
  height: 88vh; /* 상단 끝(0)부터 88vh - 헤더는 fixed로 그 위에 떠있음 */
  margin-top: calc(-1 * var(--header-height)); /* 헤더 높이만큼 위로 당겨 완전 풀블리드 */
  overflow: hidden;
}

.pp-hero__img-placeholder {
  width: 100%;
  height: 100%;
  background-color: #c0c0c0;
  object-fit: cover;
}

.pp-hero__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: clamp(32px, 5vw, 64px) 8vw; /* 붉은 박스 좌우 여백 */
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pp-hero__title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8vw, 9rem);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 0.95;
  color: #ffffff;
  margin: 0;
}

.pp-hero__subtitle {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-weight: 300;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.03em;
  margin: 0;
}

/* Year tag: top-right corner of hero image (below header) */
.pp-hero__year {
  position: absolute;
  top: calc(var(--header-height) + 20px);
  right: 8vw; /* 붉은 박스 우측 여백과 동일 */
  font-family: var(--font-script);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  color: rgba(255, 255, 255, 0.75);
  z-index: 2;
  pointer-events: none;
}

/* ── PP CONTENT (3-col layout matching reference image) ── */
.pp-content {
  display: grid;
  /* 좌: 라벨 | 가운데: 큰 본문 | 우: 일반 본문 */
  grid-template-columns: auto 1fr 1fr;
  gap: clamp(40px, 5vw, 80px);
  padding: clamp(48px, 7vw, 96px) 8vw; /* 붉은 박스 좌우 여백 동일 */
  border-bottom: 1px solid #e8e8e8;
  align-items: start;
}

.pp-content__left {
  display: flex;
  flex-direction: column;
  gap: 0;
  white-space: nowrap;
}

/* 좌측 라벨: 메인페이지 TOOLS I USE와 동일한 폰트·크기 */
.pp-content__label {
  font-family: var(--font-display);
  font-size: clamp(3rem, 4.8vw, 4.2rem);
  font-weight: 400;
  color: #111;
  letter-spacing: 0.02em;
  line-height: 1.05;
  margin: 0;
}

/* 가운데 본문: experience__desc 크기 (RESIDENTIAL 영역 폰트·크기) */
.pp-content__center .pp-content__body {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: #222;
  margin: 0;
}

/* 우측 본문: 일반 body 사이즈 */
.pp-content__right .pp-content__body {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: #444;
  margin: 0;
}

.pp-content__body {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: #444;
  margin: 0;
}

/* ── PP GALLERY ── */
.pp-gallery {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: clamp(24px, 4vw, 48px) 8vw clamp(80px, 10vw, 120px); /* 붉은 박스 좌우 여백 동일 */
}`;

if (!css.includes(oldBlock)) {
  console.error('Old block not found! Check CSS manually.');
  process.exit(1);
}

css = css.replace(oldBlock, newBlock);
fs.writeFileSync('css/style.css', css);
console.log('CSS updated successfully');

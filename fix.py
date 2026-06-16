import sys
import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

broken_pattern = r'  \.hero__paren:first-of-type \{\s*\}\s*\.footer__top-links > div:nth-child\(3\) \{'
replacement = r'''  .hero__paren:first-of-type {
    margin-right: -0.15em; /* 왼쪽 괄호 우측 여백 줄임 */
  }
  .hero__paren--right {
    margin-left: -0.05em; /* 오른쪽 괄호 좌측 여백 살짝 줌 */
  }
  .hero__flag {
    height: clamp(4.3rem, 18.9vw, 6.0rem);
    margin-right: -0.9em; /* 텍스트를 좌측으로 살짝 더 이동 */
  }
  .hero__line--script-row {
    margin-top: 0.05em;
    margin-bottom: 0.25em;
    position: relative;
  }
  .hero {
    padding-top: calc(var(--header-height) + 48px);
  }
  .hero__line--arrow-row {
    line-height: 0.95;
  }
  .hero__bottom {
    bottom: -10px;
  }
  .dark-section {
    margin-top: 24px;
  }

  .footer__brand-tagline span {
    font-size: clamp(1.8rem, 8.4vw, 3rem); /* 20% 확대 */
  }
  .projects__subtitle {
    white-space: normal;
    font-size: 2.11rem; /* 2.34rem에서 10% 축소 */
    line-height: 1.2;
  }
  .projects__more-link,
  .projects__more-link--white {
    font-size: 1.18rem; /* 1.07rem에서 10% 한 번 더 키움 */
  }
  .philosophy__row--gap-small {
    margin-top: calc(clamp(3.73rem, 15.70vw, 14.65rem) * -0.15);
  }
  .philosophy__row--gap-large {
    margin-top: calc(clamp(3.73rem, 15.70vw, 14.65rem) * -0.50);
  }
  .philosophy__row--gap-xlarge {
    margin-top: calc(clamp(3.73rem, 15.70vw, 14.65rem) * -0.80);
  }
  .footer__top-links {
    grid-template-columns: 1fr;
    gap: 32px; /* 16px에서 2배로 간격 늘림 */
  }
  .footer__top-links > div:nth-child(2) {
    display: none; /* 모바일에서 빈 컬럼 숨김 (간격 너무 벌어지는 문제 방지) */
  }
  .footer__top-links > div:nth-child(3) {'''

if re.search(broken_pattern, content):
    content = re.sub(broken_pattern, replacement, content)
    print('Fixed broken section!')
else:
    print('Broken section not found! Need manual inspect.')

end_pattern = r'  \.page-about \.experience__content \{\s*margin-left: 0 !important;\s*\}\s*\}'
end_replacement = r'''  .page-about .experience__content {
    margin-left: 0 !important;
  }

  /* 본문 줄바꿈 모바일에 맞게 자연스럽게 흐르도록 설정 */
  .experience__desc br {
    display: none !important; /* 데스크톱용 강제 줄바꿈 태그 숨김 */
  }
  .projects__description-highlight {
    display: block !important;
    margin-top: 1.5rem !important; /* 삭제된 br을 대신해 새로운 문단 여백 제공 */
  }
}'''

if re.search(end_pattern, content):
    content = re.sub(end_pattern, end_replacement, content)
    print('Fixed <br> at the end!')
else:
    print('End pattern not found!')

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(content)

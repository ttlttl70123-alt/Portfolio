import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Hero
hero_old = '''    <section class="pp-hero">
      <img src="images/opt_Thumnail_02.webp" alt="" class="pp-hero__img-placeholder">

      <span class="pp-hero__year"><span class="pp-hero__paren">(</span><span class="pp-hero__num">'25</span><span class="pp-hero__paren">)</span></span>
      <div class="pp-hero__overlay">
        <h1 class="pp-hero__title">PROJECT NAME</h1>
        <p class="pp-hero__subtitle">TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</p>
      </div>
    </section>'''
hero_new = '''    <section class="pp-hero">
      <img src="images/1_Cerruti/0.jpg" alt="" class="pp-hero__img-placeholder">

      <span class="pp-hero__year"><span class="pp-hero__paren">(</span><span class="pp-hero__num">'25</span><span class="pp-hero__paren">)</span></span>
      <div class="pp-hero__overlay">
        <h1 class="pp-hero__title">CERRUTI1881</h1>
        <p class="pp-hero__subtitle">TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</p>
      </div>
    </section>'''
content = content.replace(hero_old, hero_new)

# Replace Gallery
gallery_old = '''    <!-- ── GALLERY ── -->
    <div class="pp-gallery">
      <!-- 1 -->
      <div class="pp-gallery__img-placeholder landscape"></div>
      
      <!-- 2 -->
      <div class="pp-gallery__img-placeholder portrait"></div>
      <div class="pp-gallery__empty">
        <div class="pp-gallery__caption">THIS IS<br>A SAMPLE<br>DESCRIPTION<br>TEXT BOX</div>
      </div>
      
      <!-- 3 -->
      <div class="pp-gallery__empty"></div>
      <div class="pp-gallery__img-placeholder portrait"></div>
      
      <!-- 4 -->
      <div class="pp-gallery__img-placeholder landscape"></div>
      
      <!-- 5 -->
      <div class="pp-gallery__empty">
        <div class="pp-gallery__caption">HERE IS<br>ANOTHER<br>FOUR LINE<br>EXAMPLE</div>
      </div>
      <div class="pp-gallery__img-placeholder portrait"></div>
      
      <!-- 6 -->
      <div class="pp-gallery__img-placeholder landscape"></div>
      
      <!-- 7 -->
      <div class="pp-gallery__img-placeholder portrait"></div>
      <div class="pp-gallery__empty"></div>
      
      <!-- 8 -->
      <div class="pp-gallery__img-placeholder portrait"></div>
      <div class="pp-gallery__empty"></div>
      
      <!-- 9 -->
      <div class="pp-gallery__img-placeholder landscape"></div>
      
      <!-- 10 -->
      <div class="pp-gallery__empty"></div>
      <div class="pp-gallery__img-placeholder portrait"></div>
      
      <!-- 11 -->
      <div class="pp-gallery__img-placeholder portrait"></div>
      <div class="pp-gallery__empty"></div>
      
      <!-- 12 -->
      <div class="pp-gallery__img-placeholder landscape"></div>
      
      <!-- 13 -->
      <div class="pp-gallery__empty"></div>
      <div class="pp-gallery__img-placeholder portrait"></div>
      
      <!-- 14 -->
      <div class="pp-gallery__empty"></div>
      <div class="pp-gallery__img-placeholder portrait"></div>
      
      <!-- 15 -->
      <div class="pp-gallery__img-placeholder landscape"></div>
    </div>'''

gallery_new = '''    <!-- ── GALLERY ── -->
    <div class="pp-gallery">
      <!-- 1 -->
      <img src="images/1_Cerruti/11.png" alt="" class="pp-gallery__img-placeholder landscape">
      
      <!-- 2 -->
      <img src="images/1_Cerruti/10.png" alt="" class="pp-gallery__img-placeholder portrait">
      <div class="pp-gallery__empty">
        <div class="pp-gallery__caption">THIS IS<br>A SAMPLE<br>DESCRIPTION<br>TEXT BOX</div>
      </div>
      
      <!-- 3 -->
      <div class="pp-gallery__empty"></div>
      <img src="images/1_Cerruti/9.png" alt="" class="pp-gallery__img-placeholder portrait">
      
      <!-- 4 -->
      <img src="images/1_Cerruti/8.png" alt="" class="pp-gallery__img-placeholder landscape">
      
      <!-- 5 -->
      <div class="pp-gallery__empty">
        <div class="pp-gallery__caption">HERE IS<br>ANOTHER<br>FOUR LINE<br>EXAMPLE</div>
      </div>
      <img src="images/1_Cerruti/7.png" alt="" class="pp-gallery__img-placeholder portrait">
      
      <!-- 6 -->
      <img src="images/1_Cerruti/6.png" alt="" class="pp-gallery__img-placeholder landscape">
      
      <!-- 7 -->
      <img src="images/1_Cerruti/5.png" alt="" class="pp-gallery__img-placeholder portrait">
      <div class="pp-gallery__empty"></div>
      
      <!-- 8 -->
      <img src="images/1_Cerruti/4.png" alt="" class="pp-gallery__img-placeholder portrait">
      <div class="pp-gallery__empty"></div>
      
      <!-- 9 -->
      <img src="images/1_Cerruti/3.png" alt="" class="pp-gallery__img-placeholder landscape">
      
      <!-- 10 -->
      <div class="pp-gallery__empty"></div>
      <img src="images/1_Cerruti/2.png" alt="" class="pp-gallery__img-placeholder portrait">
      
      <!-- 11 -->
      <img src="images/1_Cerruti/1.png" alt="" class="pp-gallery__img-placeholder portrait">
      <div class="pp-gallery__empty"></div>
    </div>'''

content = content.replace(gallery_old, gallery_new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")

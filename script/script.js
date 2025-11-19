/* ============================
   ハンバーガーメニュー
============================ */
const menuBtn = document.querySelector('.menu-btn');
const menuClose = document.getElementById('menuCloseBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

menuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});


/* ============================
   FAQ カテゴリ切り替え
============================ */
const catBtns = document.querySelectorAll(".faq-cat-btn");
const faqItems = document.querySelectorAll(".faq-item");

catBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    // active切り替え
    catBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.category;

    // 該当カテゴリのみ表示
    faqItems.forEach(item => {
      item.style.display =
        item.dataset.category === cat ? "block" : "none";
      item.classList.remove("open");
      item.querySelector(".faq-answer").style.maxHeight = null;
      item.querySelector(".faq-toggle").textContent = "＋";
    });
  });
});

// ============================
// アコーディオン
// ============================
faqItems.forEach(item => {
  const q = item.querySelector(".faq-question");

  q.addEventListener("click", () => {
    const answer = item.querySelector(".faq-answer");
    const toggle = item.querySelector(".faq-toggle");

    // 他を閉じる
    faqItems.forEach(other => {
      if (other !== item) {
        other.classList.remove("open");
        other.querySelector(".faq-answer").style.maxHeight = null;
        other.querySelector(".faq-toggle").textContent = "＋";
      }
    });

    // 開閉トグル
    if (item.classList.contains("open")) {
      item.classList.remove("open");
      answer.style.maxHeight = null;
      toggle.textContent = "＋";
    } else {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
      toggle.textContent = "ー";
    }
  });
});

/* ============================
   FAQ：カテゴリ別もっと見る
============================ */
const moreBtn = document.getElementById("faq-more-btn");
let expanded = false;

function updateMoreButton(category) {
  const items = [...faqItems].filter(i => i.dataset.category === category);

  // 11件以上 → ボタン出す
  if (items.length > 10) {
    moreBtn.style.display = "block";
  } else {
    moreBtn.style.display = "none";
  }

  // 初期状態（10件だけ）
  if (!expanded) {
    items.forEach((item, index) => {
      item.style.display = index < 10 ? "block" : "none";
    });
  }
}

// 初期ロード：basic カテゴリの件数確認
updateMoreButton("basic");

// カテゴリクリック時に「もっと見る」判定更新
catBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    expanded = false;
    moreBtn.textContent = "もっと見る";
    updateMoreButton(btn.dataset.category);
  });
});

// ボタン押下
moreBtn.addEventListener("click", () => {
  const currentCat = document.querySelector(".faq-cat-btn.active").dataset.category;
  const items = [...faqItems].filter(i => i.dataset.category === currentCat);

  if (!expanded) {
    // 全件表示
    items.forEach(item => item.style.display = "block");
    moreBtn.textContent = "閉じる";
    expanded = true;
  } else {
    // 10件に戻す
    items.forEach((item, index) => {
      item.style.display = index < 10 ? "block" : "none";
    });
    moreBtn.textContent = "もっと見る";
    expanded = false;
  }
});


/* ============================
   Fade-in（全要素自動付与）
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(
    "section, .flow-item, .voice-card, .menu-card, .service-block, .faq-item, .company-row"
  );

  targets.forEach(el => el.classList.add("fadein-up"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15,
  });

  targets.forEach(el => observer.observe(el));
});

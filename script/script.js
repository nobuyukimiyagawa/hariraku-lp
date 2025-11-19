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
   FAQ：カテゴリ切り替え + もっと見る制御
============================ */
const catBtns = document.querySelectorAll(".faq-cat-btn");
const faqItems = document.querySelectorAll(".faq-item");
const moreBtn = document.getElementById("faq-more-btn");

// ▼ カテゴリごとに現在表示している件数を管理
let currentCategory = "basic";
let expanded = false; // もっと見る状態

// =========================================
// ▼ 共通：表示更新（10件 + もっと見る）
// =========================================
function updateFaqView() {
  const items = [...faqItems].filter(
    item => item.dataset.category === currentCategory
  );

  // いったん全部非表示
  faqItems.forEach(i => (i.style.display = "none"));

  if (!expanded) {
    // ▼ 最初の10件だけ表示
    items.forEach((item, index) => {
      if (index < 10) item.style.display = "block";
    });

    // ▼ 10件以上なら「もっと見る」表示
    moreBtn.style.display = items.length > 10 ? "block" : "none";
    moreBtn.textContent = "もっと見る";

  } else {
    // ▼ 全件表示
    items.forEach(item => (item.style.display = "block"));
    moreBtn.style.display = items.length > 10 ? "block" : "none";
    moreBtn.textContent = "閉じる";
  }

  // 開いたアコーディオンを一旦リセット
  faqItems.forEach(item => {
    item.classList.remove("open");
    item.querySelector(".faq-answer").style.maxHeight = null;
    item.querySelector(".faq-toggle").textContent = "＋";
  });
}

// =========================================
// ▼ カテゴリ切り替え
// =========================================
catBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    catBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentCategory = btn.dataset.category;
    expanded = false; // 切り替え時はリセット

    updateFaqView();
  });
});

// =========================================
// ▼ もっと見る（開閉）
/**
 * クリックすると expanded を反転して、
 * updateFaqView() を再実行するだけでOK
 */
moreBtn.addEventListener("click", () => {
  expanded = !expanded;
  updateFaqView();
});

// =========================================
// ▼ ページロード直後も即座に適用
// =========================================
updateFaqView();

// =========================================
// ▼ アコーディオン動作
// =========================================
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

const menuBtn = document.querySelector('.menu-btn');
const menuClose = document.getElementById('menuCloseBtn');
const mobileMenu = document.getElementById('mobileMenu');

// 開く
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

// 閉じる
menuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});

// =====================================
// FAQ アコーディオン（なめらか開閉）
// =====================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {

    // 排他式：他を閉じる
    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove("open");
        other.querySelector(".faq-answer").style.maxHeight = null;
        other.querySelector(".faq-toggle").textContent = "＋";
      }
    });

    // 開閉トグル
    const answer = item.querySelector(".faq-answer");
    const toggle = item.querySelector(".faq-toggle");

    if (item.classList.contains("open")) {
      // 閉じる
      item.classList.remove("open");
      answer.style.maxHeight = null;
      toggle.textContent = "＋";
    } else {
      // 開く
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
      toggle.textContent = "ー";
    }
  });
});

// ===============================
// FAQ：Q10 以降を非表示にする
// ===============================
const faqItemsAll = document.querySelectorAll(".faq-item");
const moreBtn = document.getElementById("faq-more-btn");

// 初期状態：Q10以降は非表示
faqItemsAll.forEach((item, index) => {
  if (index >= 9) {              // Q1〜Q9は表示、10以降を非表示
    item.style.display = "none";
  }
});

let faqExpanded = false;

// ボタン押下でトグル
moreBtn.addEventListener("click", () => {
  if (!faqExpanded) {
    faqItemsAll.forEach((item) => {
      item.style.display = "block";
    });
    moreBtn.textContent = "閉じる";
    faqExpanded = true;

  } else {
    faqItemsAll.forEach((item, index) => {
      if (index >= 9) {
        item.style.display = "none";
      }
    });
    moreBtn.textContent = "もっと見る";
    faqExpanded = false;
  }
});

/* ============================
   Fade-in（全要素自動付与）
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(
    "section, .flow-item, .voice-card, .menu-card, .service-block, .faq-item, .company-row"
  );

  targets.forEach(el => {
    el.classList.add("fadein-up");
  });

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

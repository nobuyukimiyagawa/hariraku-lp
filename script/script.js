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
// FAQ アコーディオン（排他式 ＋ スライド開閉）
// =====================================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {

    // ① 他の開いているFAQをすべて閉じる（排他式）
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("open");
        otherItem.querySelector(".faq-toggle").textContent = "＋";
      }
    });

    // ② 自分自身の開閉をトグル
    const isOpen = item.classList.contains("open");
    item.classList.toggle("open");

    // ③ ＋／ー の切り替え
    const toggle = item.querySelector(".faq-toggle");
    toggle.textContent = isOpen ? "＋" : "ー";
  });
});

  
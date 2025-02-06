document.addEventListener("DOMContentLoaded", function() {
  // --- ヘッダー・ハンバーガーメニュー ---
  const togglebtn = document.querySelector(".togglebtn");
  const navlinks = document.querySelector(".navlinks");
  if (togglebtn) {
    togglebtn.addEventListener("click", function() {
      this.classList.toggle("active");
      navlinks.classList.toggle("open");
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
    });
  }

  // --- Typed.js の初期化 ---
  if (document.querySelector(".typed-text")) {
    new Typed(".typed-text", {
      strings: ["ビデオグラファー", "マーケター", "エンジニア"],
      typeSpeed: 70,
      backSpeed: 55,
      loop: true
    });
  }

  // --- ポートフォリオフィルタ処理 ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      filterBtns.forEach(button => button.classList.remove("active"));
      this.classList.add("active");
      const filterValue = this.getAttribute("data-filter");
      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");
        if (filterValue === "all" || itemCategory === filterValue) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // --- ポートフォリオ モーダル表示 ---
  const modal = document.getElementById("portfolioModal");
  const modalClose = document.querySelector(".modal-close");
  const modalImg = document.querySelector(".modal-img");
  const modalTitle = document.querySelector(".modal-title");
  const modalDescription = document.querySelector(".modal-description");
  portfolioItems.forEach(item => {
    item.addEventListener("click", function() {
      const imgSrc = item.querySelector("img").src;
      const title = item.getAttribute("data-title");
      const description = item.getAttribute("data-description");
      modalImg.src = imgSrc;
      modalImg.alt = title;
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modal.style.display = "block";
    });
  });
  if (modalClose) {
    modalClose.addEventListener("click", function() {
      modal.style.display = "none";
    });
    window.addEventListener("click", function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // --- About セクション タブ切替 ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    const targetId = btn.getAttribute('data-tab');
    const panel = document.getElementById(targetId);
    if (btn.classList.contains('active')) {
      panel.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      panel.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(panel => panel.classList.remove('active'));
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      const tabId = this.getAttribute('data-tab');
      const targetPanel = document.getElementById(tabId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // --- Back To Top ボタン ---
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  // --- スクロール時フェードイン処理 ---
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

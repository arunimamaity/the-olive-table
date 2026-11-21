/* =====================================================
   The Olive Table - Tea House
   Plain JavaScript, no libraries
   ===================================================== */

/* ---------- 1. Menu arrows: scroll the card row ---------- */
const row = document.getElementById("menuRow");
const prevBtn = document.getElementById("menuPrev");
const nextBtn = document.getElementById("menuNext");
const slider = document.querySelector(".menu-slider");

// one card (300px) + gap (24px)
const step = 324;

nextBtn.addEventListener("click", function () {
  row.scrollBy({ left: step, behavior: "smooth" });
});

prevBtn.addEventListener("click", function () {
  row.scrollBy({ left: -step, behavior: "smooth" });
});


/* ---------- 2. Menu category tabs ---------- */
const tabs = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".menu-card");

// if all visible cards fit on screen, add class "few" (CSS centres them and hides the arrows)
function checkFit() {
  if (row.scrollWidth <= row.clientWidth) {
    slider.classList.add("few");
  } else {
    slider.classList.remove("few");
  }
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {

    // highlight only the clicked tab
    tabs.forEach(function (t) {
      t.classList.remove("active");
    });
    tab.classList.add("active");

    // show matching cards, hide the rest
    const filter = tab.dataset.filter;

    cards.forEach(function (card) {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });

    // go back to the first card, then check again
    row.scrollTo({ left: 0 });
    checkFit();
  });
});

checkFit();
window.addEventListener("resize", checkFit);


/* ---------- 3. Mobile menu (hamburger) ---------- */
const toggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// close the menu after choosing a link
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});


/* ---------- 4. Highlight the current section in the navbar ---------- */
const navAnchors = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("header[id], section[id]");

window.addEventListener("scroll", function () {
  let current = "home";

  sections.forEach(function (sec) {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });

  navAnchors.forEach(function (a) {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});


/* ---------- 5. Scroll-to-top button ---------- */
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    toTop.classList.add("show");
  } else {
    toTop.classList.remove("show");
  }
});

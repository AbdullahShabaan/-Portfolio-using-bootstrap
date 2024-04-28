let header = document.querySelector("nav");
function headerScroll(className) {
  if (this.window.scrollY > 50) {
    header.classList.add(className);
  } else {
    header.classList.remove(className);
  }
}
window.addEventListener("scroll", function () {
  headerScroll("scrolled");
});
headerScroll("scrolled");

// change links color based on section
let sections = document.querySelectorAll(".section");
let navLinks = document.querySelectorAll("nav .navbar-nav .nav-link");
window.addEventListener("scroll", function () {
  sections.forEach((s) => {
    let currecntScroll = window.scrollY;
    let offset = s.offsetTop;
    let offsetHeight = s.offsetHeight;
    let sectionId = s.getAttribute("id");
    if (
      currecntScroll >= offset - 100 &&
      currecntScroll < offset + offsetHeight
    ) {
      navLinks.forEach((e) => {
        e.classList.remove("active");
      });
      let currentLink = this.document.querySelector(
        "nav .navbar-nav  a[href*=" + sectionId + "]"
      );
      if (currentLink) {
        currentLink.classList.add("active");
      }
    }
  });
});

// Animation Text
let words = ["Freelancer", "Photographer", "Designer"];
let currentIndex = 0;
let delayTime = 100;
let animationText = document.getElementById("animation-text");
let caretCursor = document.querySelector(".caret");

function Delay(delayTime) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayTime);
  });
}
function pause(element) {
  if (element) {
    element.classList.add("paused");
  }
}
function play(element) {
  element.classList.remove("paused");
}
async function MakeAnimation() {
  if (animationText) {
    while (true) {
      if (currentIndex > words.length - 1) {
        currentIndex = 0;
      }
      // Typing char
      let currentWord = words[currentIndex];
      pause(caretCursor);
      for (let i = 0; i <= currentWord.length; i++) {
        animationText.innerText = currentWord.substring(0, i + 1);
        await Delay(delayTime);
      }
      play(caretCursor);
      await Delay(delayTime * 20);

      // remove char
      pause(caretCursor);
      for (let i = currentWord.length; i > 0; i--) {
        animationText.innerText = currentWord.substring(0, i - 1);
        await Delay(delayTime);
      }
      await Delay(delayTime * 5);
      play(caretCursor);

      currentIndex++;
    }
  }
}
MakeAnimation();

// Skills Animation
let about = document.getElementById("about");
let prog = document.querySelectorAll(".progress-bar");

window.addEventListener("scroll", function () {
  if (this.window.scrollY + 200 >= about?.offsetTop) {
    prog.forEach((e) => {
      e.style.width = e.getAttribute("aria-valuenow") + "%";
    });
  } else {
    prog.forEach((e) => {
      e.style.width = "0%";
    });
  }
});

// Stats Animation
let statSection = document.querySelector(".stats");
let statNumber = document.querySelectorAll(".stat-number");
let check = true;
window.addEventListener("scroll", function () {
  if (this.window.scrollY + 200 >= about?.offsetTop && check === true) {
    check = false;
    statNumber.forEach((e) => {
      let counter = setInterval(() => {
        e.innerText = parseInt(e.innerText) + 1;
        if (parseInt(e.innerText) >= e.getAttribute("data-number")) {
          clearInterval(counter);
        }
      }, 10);
    });
  }
});

// Up Btn
let upBtn = document.querySelector(".Up-btn");
window.addEventListener("scroll", function () {
  if (this.window.scrollY > 100) {
    upBtn?.classList.add("active");
  } else {
    upBtn?.classList.remove("active");
  }
});
upBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// navbar-toggler
let navbarToggler = document.querySelector(".navbar-toggler");
let navbarCollapse = document.querySelector(".navbar-collapse");

navbarToggler.addEventListener("click", function () {
  navbarCollapse.classList.toggle("active");
});

let closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", function () {
  navbarCollapse.classList.remove("active");
});

// Portfolio Images
let portfolioImages = document.querySelectorAll(".portfolio .card-head img");
let overlayPortfolio = document.querySelector(".overlay-portfolio");
let portfolioItems = document.querySelectorAll(".portfolio-item img");
portfolioImages.forEach((e) => {
  e.addEventListener("click", function (e) {
    let imgSrc = e.target.src;
    overlayPortfolio.classList.add("active");
    portfolioItems.forEach((e) => {
      e.parentElement.classList.remove("active");
      if (e.src == imgSrc) {
        e.parentElement.classList.add("active");
      }
    });
  });
});

let closePortfolio = document.querySelector(".close-portfolio");
if (closePortfolio != null) {
  closePortfolio.addEventListener("click", function () {
    overlayPortfolio.classList.remove("active");
  });
}
window.addEventListener("click", function (e) {
  if (e.target == overlayPortfolio) {
    overlayPortfolio.classList.remove("active");
  }
});

// Blog Details
let card = document.querySelectorAll(".blog .card .card-photo");
let blogDetails = document.querySelector(".blog-info .blog img");
card.forEach((e) => {
  e.addEventListener("click", function (e) {
    localStorage.setItem("imageCard", e.target.getAttribute("src"));
    location.href = "public/blogDetails.html";
  });
});

if (blogDetails !== null && localStorage.getItem("imageCard") !== null) {
  blogDetails.setAttribute("src", "../" + localStorage.getItem("imageCard"));
} else {
  blogDetails?.setAttribute("src", "../images/post-1.jpg");
}

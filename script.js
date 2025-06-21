/* ======================= Scroll-based Title Animations ======================= */
const titleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('animate');
      void entry.target.offsetWidth;
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.title').forEach(el => {
  titleObserver.observe(el);
});

/* ======================= Animate-on-scroll Elements (e.g. Groom, Bride) ======================= */
const imageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  imageObserver.observe(el);
});



/* ======================= Floating Nav Menu Auto-Close ======================= */
const navToggle = document.getElementById('navToggle');
const slideMenu = document.getElementById('slideMenu');

// Toggle open/close on click
navToggle.addEventListener('click', e => {
  e.stopPropagation(); // prevent bubbling to document
  slideMenu.classList.toggle('open');
});

// Close menu when a nav link is clicked
slideMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    e.stopPropagation();
    slideMenu.classList.remove('open');
  });
});

// Close when clicking outside the menu and toggle
document.addEventListener('click', e => {
  if (
    !slideMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    slideMenu.classList.remove('open');
  }
});


/* ======================= Welcome Section Slideshow ======================= */
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow .slide');

if (slides.length > 0) {
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000); // Change every 4 seconds
}

/* ======================= SCROLL DOTS ======================= */

const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = [...sections].indexOf(entry.target);
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));



/* ======================= name typewriter effects ======================= */


  const typewriterLines = {
    groom: "Alvin Hisula Dungog",
    bride: "Kimberly Justine Carin"
  };

  const typewriterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const p = entry.target.querySelector('.typewriter-text');

      if (entry.isIntersecting && p) {
        // Reset state
        p.classList.remove('typing');
        p.style.width = '0';
        p.innerText = '';

        // Force reflow before re-adding animation
        void p.offsetWidth;

        // Inject text and re-apply animation
        p.innerText = typewriterLines[id];
        p.classList.add('typing');
      } else if (p) {
        p.classList.remove('typing');
        p.style.width = '0';
        p.innerText = '';
      }
    });
  }, {
    threshold: 0.5
  });

  typewriterObserver.observe(document.getElementById('groom'));
  typewriterObserver.observe(document.getElementById('bride'));



/* ======================= Timeline Flower Animation ======================= */
/* — TIMELINE FLOWER OBSERVER — */
const timelineSection = document.getElementById('timeline');
const tlObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const flowers = entry.target.querySelectorAll('.timeline-flower');
    flowers.forEach(f => {
      if (entry.isIntersecting) {
        f.classList.add('tl-show');      // replay on every scroll-in
      } else {
        f.classList.remove('tl-show');   // reset when out of view
      }
    });
  });
},{ threshold: 0.4 }); /* trigger when ~40 % visible */

if (timelineSection) tlObserver.observe(timelineSection);




/* ─ TIMELINE BOX INTERSECTION OBSERVER (self-contained) ─ */
const tlBoxes = document.querySelectorAll('#timeline .timeline-item');

const tlBoxObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('box-show');   // play animation
    } else {
      entry.target.classList.remove('box-show'); // reset for replay
    }
  });
}, { threshold: 0.4 });   // 40 % visible

tlBoxes.forEach(box => tlBoxObserver.observe(box));


/* ======================= Copy Number Button with Popup ======================= */
document.addEventListener("DOMContentLoaded", function () {
  const copyButton = document.getElementById('copyNumberBtn');
  const popup = document.getElementById('copyPopup');

  if (copyButton && popup) {
    copyButton.addEventListener('click', function () {
      const numberToCopy = '09157241639';
      navigator.clipboard.writeText(numberToCopy).then(() => {
        popup.classList.add('show');
        setTimeout(() => {
          popup.classList.remove('show');
        }, 2000);
      });
    });
  }
});

// Wardrobe image observer – adds/removes .w-show on scroll
const wardrobeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('w-show');
    } else {
      entry.target.classList.remove('w-show'); // reset for replay
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.w-slide-left, .w-slide-right')
        .forEach(el => wardrobeObserver.observe(el));



        const carousel = document.getElementById('carousel');
const items = [...document.querySelectorAll('.item')];
const TOTAL = items.length;

/* helper: decide radius from screen width */
function getRadius () {
  return window.matchMedia("(min-width: 769px)").matches ? 350 : 270;
}

/* helper: position every card around the ring */
function positionItems (radius) {
  items.forEach((it, i) => {
    const ang = 360 / TOTAL * i;
    it.style.transform = `rotateY(${ang}deg) translateZ(${radius}px)`;
    it.querySelector('.label').style.transform = 'none';
  });
}

/* initial layout */
let RADIUS = getRadius();
positionItems(RADIUS);

/* re-layout on resize / orientation change */
window.addEventListener('resize', () => {
  const newRadius = getRadius();
  if (newRadius !== RADIUS) {
    RADIUS = newRadius;
    positionItems(RADIUS);
  }
});

/* ----------  Auto-spin + drag  ---------- */
let rotY = 0,
    isDrag = false,
    startX = 0,
    auto = true;

function spin() {
  if (!isDrag && auto) {
    rotY += 0.15;
    carousel.style.transform = `translate(-50%,-50%) rotateX(-5deg) rotateY(${rotY}deg)`;
  }
  requestAnimationFrame(spin);
}
spin();

function dragStart(e) {
  isDrag = true;
  auto = false;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function dragMove(e) {
  if (!isDrag) return;
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  rotY += (x - startX) * 0.4;
  startX = x;
  carousel.style.transform = `translate(-50%,-50%) rotateX(-5deg) rotateY(${rotY}deg)`;
}

function dragEnd() {
  isDrag = false;
  setTimeout(() => auto = true, 500);
}

// Drag events
carousel.addEventListener('mousedown', dragStart);
window.addEventListener('mousemove', dragMove);
window.addEventListener('mouseup', dragEnd);
carousel.addEventListener('touchstart', dragStart, { passive: true });
window.addEventListener('touchmove', dragMove, { passive: true });
window.addEventListener('touchend', dragEnd);

/* ----------  Full-screen single image viewer  ---------- */
const viewer = document.getElementById('viewer');
const viewerImg = document.getElementById('viewer-img');
const btnClose = document.getElementById('viewer-close');

items.forEach(it => {
  const card = it.querySelector('.card');
  const imgSrc = card.dataset.image;

  card.addEventListener('click', () => {
    viewerImg.src = imgSrc;
    viewer.classList.add('show');
  });
});

btnClose.onclick = () => viewer.classList.remove('show');
viewer.addEventListener('click', e => {
  if (e.target === viewer) viewer.classList.remove('show');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') viewer.classList.remove('show');
});

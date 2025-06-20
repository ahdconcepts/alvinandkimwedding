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

/* ======================= Gallery Modal Viewer ======================= */
const galleryImgs = Array.from(document.querySelectorAll('#galleryImages img'));
galleryImgs.forEach(img => {
  const preload = new Image();
  preload.src = img.src;
});

const modal = document.getElementById('imageViewerModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = modal.querySelector('.close-btn');
const prevBtn = modal.querySelector('.prev');
const nextBtn = modal.querySelector('.next');
const loader = modal.querySelector('.loader');
let currentIndex = 0;

function openModal(src, index) {
  currentIndex = index;
  loader.style.display = 'block';
  modalImg.style.display = 'none';
  modalImg.src = src;
  modal.classList.add('open');
}

function closeModal() {
  modal.classList.add('closing');
  modal.addEventListener(
    'transitionend',
    () => modal.classList.remove('open', 'closing'),
    { once: true }
  );
}

function showImage(index) {
  currentIndex = (index + galleryImgs.length) % galleryImgs.length;
  loader.style.display = 'block';
  modalImg.style.display = 'none';
  modalImg.src = galleryImgs[currentIndex].src;
}

galleryImgs.forEach((img, idx) => {
  img.addEventListener('click', () => openModal(img.src, idx));
});

modalImg.addEventListener('load', () => {
  loader.style.display = 'none';
  modalImg.style.display = 'block';
});

closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

let startX = 0;
modal.addEventListener('touchstart', e => (startX = e.touches[0].clientX));
modal.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextBtn.click();
  else if (endX - startX > 50) prevBtn.click();
});

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
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

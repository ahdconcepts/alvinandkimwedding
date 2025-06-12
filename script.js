// Slideshow logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow .slide');

setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 4000);

// Title animation on scroll
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

// Element animation on scroll (like groom, bride, etc.)
const imageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Trigger animation every time it comes into view
      entry.target.classList.add('visible');
    } else {
      // Reset animation when it leaves the viewport
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  imageObserver.observe(el);
});



const navToggle = document.getElementById('navToggle');
const slideMenu = document.getElementById('slideMenu');

navToggle.addEventListener('click', () => {
  slideMenu.classList.toggle('open');
});

// Optional: close menu when a nav link is clicked
slideMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    slideMenu.classList.remove('open');
  });
});

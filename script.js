document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }

  // Hero slider functionality
  const slide1 = document.getElementById('slide1');
  const slide2 = document.getElementById('slide2');
  const indicator1 = document.getElementById('indicator1');
  const indicator2 = document.getElementById('indicator2');
  
  let currentSlide = 1;
  let slideInterval;

  function showSlide(slideNumber) {
    if (slideNumber === 1) {
      slide1.classList.remove('opacity-0');
      slide1.classList.add('opacity-100');
      slide2.classList.remove('opacity-100');
      slide2.classList.add('opacity-0');
      indicator1.classList.remove('bg-white/30');
      indicator1.classList.add('bg-white/70');
      indicator2.classList.remove('bg-white/70');
      indicator2.classList.add('bg-white/30');
    } else {
      slide1.classList.remove('opacity-100');
      slide1.classList.add('opacity-0');
      slide2.classList.remove('opacity-0');
      slide2.classList.add('opacity-100');
      indicator1.classList.remove('bg-white/70');
      indicator1.classList.add('bg-white/30');
      indicator2.classList.remove('bg-white/30');
      indicator2.classList.add('bg-white/70');
    }
    currentSlide = slideNumber;
  }

  function nextSlide() {
    showSlide(currentSlide === 1 ? 2 : 1);
  }

  // Start automatic slider
  slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds

  // Manual slide control via indicators
  if (indicator1 && indicator2) {
    indicator1.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(1);
      slideInterval = setInterval(nextSlide, 4000);
    });
    
    indicator2.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(2);
      slideInterval = setInterval(nextSlide, 4000);
    });
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length === 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});



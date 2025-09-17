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

  // Scroll Animation System
  class ScrollAnimations {
    constructor() {
      this.observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
      this.animatedElements = new Set();
      this.init();
    }

    init() {
      this.setupAnimationClasses();
      this.observeElements();
      this.setupCountUpAnimations();
    }

    setupAnimationClasses() {
      // Add CSS animation classes
      const style = document.createElement('style');
      style.textContent = `
        .animate-fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        
        .animate-fade-in.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-slide-up {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        
        .animate-slide-up.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-slide-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        
        .animate-slide-left.animate-visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-slide-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        
        .animate-slide-right.animate-visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-scale-in {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        
        .animate-scale-in.animate-visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .animate-zoom-in {
          opacity: 0;
          transform: scale(0.9) translateY(20px);
          transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        
        .animate-zoom-in.animate-visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        
        .animate-stagger-1 { transition-delay: 0.1s; }
        .animate-stagger-2 { transition-delay: 0.2s; }
        .animate-stagger-3 { transition-delay: 0.3s; }
        .animate-stagger-4 { transition-delay: 0.4s; }
        .animate-stagger-5 { transition-delay: 0.5s; }
        .animate-stagger-6 { transition-delay: 0.6s; }
        
        .animate-delay-200 { transition-delay: 0.2s; }
        .animate-delay-400 { transition-delay: 0.4s; }
        .animate-delay-600 { transition-delay: 0.6s; }
        .animate-delay-800 { transition-delay: 0.8s; }
        .animate-delay-1000 { transition-delay: 1s; }
        
        .animate-parallax {
          transform: translateY(0);
          transition: transform 0.1s ease-out;
        }
      `;
      document.head.appendChild(style);
    }

    observeElements() {
      // Header elements
      this.addAnimation('header', 'animate-fade-in', 0.1);
      
      // Hero section elements
      this.addAnimation('.hero-content h1', 'animate-fade-in', 0.2);
      this.addAnimation('.hero-content .text-outline', 'animate-fade-in', 0.4);
      this.addAnimation('.hero-content p:not(.text-outline)', 'animate-fade-in', 0.6);
      this.addAnimation('.hero-content .flex.flex-wrap', 'animate-fade-in', 0.8);
      this.addAnimation('.hero-image-container', 'animate-zoom-in', 0.3);

      // Certifications section
      this.addAnimation('.grid.md\\:grid-cols-3 .flex.items-start', 'animate-slide-up', 0.1, true);
      this.addAnimation('.bg-white.rounded-full.px-6', 'animate-scale-in', 0.2);
      this.addAnimation('.grid.grid-cols-2.md\\:grid-cols-5 .text-center', 'animate-fade-in', 0.1, true);

      // Stats section
      this.addAnimation('.grid.grid-cols-2.md\\:grid-cols-4 .text-center', 'animate-scale-in', 0.1, true);

      // Core services grid
      this.addAnimation('#solutions .grid.md\\:grid-cols-2 .bg-gradient-to-br', 'animate-slide-up', 0.1, true);

      // Portfolio showcase
      this.addAnimation('.bg-slate-50 .grid .bg-white', 'animate-fade-in', 0.1, true);

      // Production categories
      this.addAnimation('#production .grid.md\\:grid-cols-2.lg\\:grid-cols-4 .group', 'animate-zoom-in', 0.1, true);
      this.addAnimation('#production .grid.md\\:grid-cols-2.lg\\:grid-cols-3 .group', 'animate-zoom-in', 0.1, true);

      // Testimonials
      this.addAnimation('#testimonials .bg-white\\/95', 'animate-slide-left', 0.2);
      this.addAnimation('#testimonials .flex.justify-end', 'animate-fade-in', 0.4);

      // Partners section
      this.addAnimation('#about .grid.grid-cols-2.sm\\:grid-cols-3.lg\\:grid-cols-6 .h-20', 'animate-scale-in', 0.1, true);
    }

    addAnimation(selector, animationClass, delay = 0, stagger = false) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        element.classList.add(animationClass);
        if (stagger) {
          element.classList.add(`animate-stagger-${Math.min(index + 1, 6)}`);
        } else if (delay > 0) {
          element.style.transitionDelay = `${delay}s`;
        }
        this.observer.observe(element);
      });
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          entry.target.classList.add('animate-visible');
          this.animatedElements.add(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }

    setupCountUpAnimations() {
      const countElements = document.querySelectorAll('.text-4xl.md\\:text-6xl.font-bold.text-primary-400');
      
      const animateCountUp = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          
          if (target === 24) {
            element.textContent = '24/7';
          } else {
            element.textContent = Math.floor(current) + '+';
          }
        }, 16);
      };

      const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const numbers = text.match(/\d+/g);
            if (numbers) {
              const target = parseInt(numbers[0]);
              animateCountUp(entry.target, target);
              countObserver.unobserve(entry.target);
            }
          }
        });
      }, { threshold: 0.5 });

      countElements.forEach(element => {
        countObserver.observe(element);
      });
    }
  }

  // Initialize scroll animations
  new ScrollAnimations();

  // Page load animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Parallax effect for hero section
  class ParallaxEffect {
    constructor() {
      this.init();
    }

    init() {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-circle');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1); // Different speeds for each circle
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
      });

      // Subtle parallax for hero image
      const heroImage = document.querySelector('.hero-image-container');
      if (heroImage) {
        const yPos = scrolled * 0.3;
        heroImage.style.transform = `translateY(${yPos}px)`;
      }
    }
  }

  // Initialize parallax effect
  new ParallaxEffect();

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

  // Solutions dropdown functionality
  const solutionsLink = document.getElementById('solutionsLink');
  const solutionsDropdown = document.getElementById('solutionsDropdown');
  const closeSolutionsDropdown = document.getElementById('closeSolutionsDropdown');
  let isDropdownOpen = false;

  function showDropdown() {
    if (solutionsDropdown) {
      solutionsDropdown.classList.remove('hidden');
      // Force reflow to ensure the element is visible before animation
      solutionsDropdown.offsetHeight;
      solutionsDropdown.classList.remove('opacity-0', 'translate-y-[-20px]');
      solutionsDropdown.classList.add('opacity-100', 'translate-y-0');
      isDropdownOpen = true;
    }
  }

  function hideDropdown() {
    if (solutionsDropdown) {
      solutionsDropdown.classList.remove('opacity-100', 'translate-y-0');
      solutionsDropdown.classList.add('opacity-0', 'translate-y-[-20px]');
      // Hide the element after animation completes
      setTimeout(() => {
        if (!isDropdownOpen && solutionsDropdown) {
          solutionsDropdown.classList.add('hidden');
        }
      }, 300);
      isDropdownOpen = false;
    }
  }
  
  if (solutionsLink && solutionsDropdown) {
    solutionsLink.addEventListener('click', (e) => {
      if (isDropdownOpen) {
        hideDropdown();
      } else {
        showDropdown();
      }
    });

    // Close button functionality
    if (closeSolutionsDropdown) {
      closeSolutionsDropdown.addEventListener('click', () => {
        hideDropdown();
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (isDropdownOpen && !solutionsLink.contains(e.target) && !solutionsDropdown.contains(e.target)) {
        hideDropdown();
      }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        hideDropdown();
      }
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
        // Close solutions dropdown when navigating
        if (solutionsDropdown && isDropdownOpen) {
          hideDropdown();
        }
      }
    });
  });
});



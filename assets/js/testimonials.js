document.addEventListener('DOMContentLoaded', () => {
  // Carousel elements
  const track = document.querySelector('.testimonials__track');
  const slides = Array.from(document.querySelectorAll('.testimonial'));
  const nextButton = document.querySelector('.testimonials__nav--next');
  const prevButton = document.querySelector('.testimonials__nav--prev');
  const indicators = Array.from(document.querySelectorAll('.testimonials__indicator'));
  
  let currentIndex = 0;
  let isAnimating = false;
  
  // Initialize the carousel
  function initCarousel() {
    // Set initial positions
    updateCarousel();
    
    // Add event listeners for navigation buttons
    nextButton.addEventListener('click', () => {
      if (!isAnimating) {
        goToSlide(currentIndex + 1);
      }
    });
    
    prevButton.addEventListener('click', () => {
      if (!isAnimating) {
        goToSlide(currentIndex - 1);
      }
    });
    
    // Add event listeners for indicators
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        if (!isAnimating) {
          const index = parseInt(indicator.dataset.index);
          goToSlide(index);
        }
      });
    });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next slide
        if (!isAnimating) goToSlide(currentIndex + 1);
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous slide
        if (!isAnimating) goToSlide(currentIndex - 1);
      }
    }
  }
  
  // Go to a specific slide
  function goToSlide(index) {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Handle circular navigation
    let targetIndex = index;
    if (index < 0) {
      targetIndex = slides.length - 1;
    } else if (index >= slides.length) {
      targetIndex = 0;
    }
    
    // Determine slide direction
    const direction = targetIndex > currentIndex ? 'next' : 'prev';
    
    // Get current and target slides
    const currentSlide = slides[currentIndex];
    const targetSlide = slides[targetIndex];
    
    // Apply appropriate animations based on direction
    if (direction === 'next') {
      currentSlide.style.animation = 'slideOutLeft 0.6s forwards';
      targetSlide.style.animation = 'slideInRight 0.6s forwards';
    } else {
      currentSlide.style.animation = 'slideOutRight 0.6s forwards';
      targetSlide.style.animation = 'slideInLeft 0.6s forwards';
    }
    
    // Update classes after animation
    setTimeout(() => {
      currentSlide.classList.remove('testimonial--active');
      targetSlide.classList.add('testimonial--active');
      
      // Reset animations
      currentSlide.style.animation = '';
      targetSlide.style.animation = '';
      
      // Update current index
      currentIndex = targetIndex;
      
      // Update indicators
      updateIndicators();
      
      isAnimating = false;
    }, 600);
  }
  
  // Update carousel state
  function updateCarousel() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('testimonial--active');
      } else {
        slide.classList.remove('testimonial--active');
      }
    });
    
    updateIndicators();
  }
  
  // Update indicator states
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('testimonials__indicator--active');
      } else {
        indicator.classList.remove('testimonials__indicator--active');
      }
    });
  }
  
  // Initialize the carousel
  initCarousel();
});
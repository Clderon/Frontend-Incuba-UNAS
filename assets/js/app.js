document.addEventListener("DOMContentLoaded", () => {
  // Elementos del carrusel
  const slides = document.querySelectorAll(".carousel__slide");
  const prevBtn = document.querySelector(".carousel__control--prev");
  const nextBtn = document.querySelector(".carousel__control--next");
  const indicators = document.querySelectorAll(".carousel__indicator");

  // Variables de control
  let currentSlide = 0;
  const totalSlides = slides.length;
  let isAnimating = false; // Evitar múltiples clics durante la animación

  // Función para actualizar el carrusel
  function updateCarousel(direction = null) {
    if (isAnimating) return;
    isAnimating = true;

    // Actualizar clases para la animación de dirección
    slides.forEach((slide, index) => {
      slide.classList.remove(
        "carousel__slide--active",
        "carousel__slide--prev",
        "carousel__slide--next"
      );

      if (index === currentSlide) {
        slide.classList.add("carousel__slide--active");
      } else if (
        (direction === "prev" && index === (currentSlide + 1) % totalSlides) ||
        (direction === "next" &&
          index === (currentSlide - 1 + totalSlides) % totalSlides)
      ) {
        slide.classList.add("carousel__slide--" + direction);
      } else if (index < currentSlide) {
        slide.classList.add("carousel__slide--prev");
      } else {
        slide.classList.add("carousel__slide--next");
      }
    });

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle(
        "carousel__indicator--active",
        index === currentSlide
      );
    });

    // Añadir animación a la imagen del producto
    const productImg = slides[currentSlide].querySelector(".carousel__product");
    productImg.style.transform = "translateY(-15px) scale(1.05)";

    // Restablecer la animación después de un tiempo
    setTimeout(() => {
      productImg.style.transform = "translateY(0) scale(1)";
      isAnimating = false; // Permitir nuevas animaciones
    }, 800);
  }

  // Función para ir al slide anterior
  function goToPrevSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel("prev");
  }

  // Función para ir al slide siguiente
  function goToNextSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel("next");
  }

  // Función para ir a un slide específico
  function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;

    const direction = index > currentSlide ? "next" : "prev";
    currentSlide = index;
    updateCarousel(direction);
  }

  // Eventos de click para los botones
  prevBtn.addEventListener("click", goToPrevSlide);
  nextBtn.addEventListener("click", goToNextSlide);

  // Eventos para los indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index));
  });

  // Inicializar el carrusel con una animación de entrada
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add("carousel__slide--active");
    } else if (index < currentSlide) {
      slide.classList.add("carousel__slide--prev");
    } else {
      slide.classList.add("carousel__slide--next");
    }

    // Retrasar ligeramente la animación de entrada para que sea visible
    setTimeout(() => {
      updateCarousel();
    }, 100);
  });

  // Cambio automático cada 5 segundos
  const autoplayInterval = 5000; // 5 segundos
  let autoplayTimer = setInterval(goToNextSlide, autoplayInterval);

  // Detener el autoplay cuando el usuario interactúa con los controles
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(goToNextSlide, autoplayInterval);
  }

  prevBtn.addEventListener("click", resetAutoplay);
  nextBtn.addEventListener("click", resetAutoplay);
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", resetAutoplay);
  });

  // Soporte para gestos táctiles (swipe)
  let touchStartX = 0;
  let touchEndX = 0;

  const carousel = document.querySelector(".carousel");

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50; // Mínima distancia para considerar un swipe

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe izquierda -> siguiente slide
      goToNextSlide();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe derecha -> slide anterior
      goToPrevSlide();
    }
  }

  // Efecto de parallax suave para las imágenes al hacer scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const activeSlide = document.querySelector(".carousel__slide--active");

    if (activeSlide) {
      const productImg = activeSlide.querySelector(".carousel__product");
      if (scrollPosition < 300) {
        productImg.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      }
    }
  });

  // Animación al cargar la página
  window.addEventListener("load", () => {
    // Añadir clase para activar animación de entrada
    document.querySelector(".carousel").classList.add("loaded");
  });

  // Función para ajustar la velocidad de la animación según el ancho de la ventana
  function adjustAnimationSpeed() {
    const track = document.querySelector(".partners__track");
    const windowWidth = window.innerWidth;

    // Ajustar la velocidad de la animación según el ancho de la ventana
    let animationDuration;

    if (windowWidth < 480) {
      animationDuration = "30s"; // Más rápido en móviles pequeños
    } else if (windowWidth < 768) {
      animationDuration = "35s"; // Velocidad media en tablets
    } else {
      animationDuration = "40s"; // Velocidad normal en escritorio
    }

    track.style.animationDuration = animationDuration;
  }

  // Ajustar la velocidad inicialmente
  adjustAnimationSpeed();

  // Ajustar la velocidad cuando cambie el tamaño de la ventana
  window.addEventListener("resize", adjustAnimationSpeed);

  // Función para reiniciar la animación cuando el usuario regresa a la pestaña
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      const track = document.querySelector(".partners__track");

      // Detener y reiniciar la animación
      track.style.animationPlayState = "paused";

      setTimeout(function () {
        track.style.animationPlayState = "running";
      }, 10);
    }
  });

  // Opcional: Detectar cuando el carrusel está en el viewport para optimizar rendimiento
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const track = document.querySelector(".partners__track");

        if (entry.isIntersecting) {
          track.style.animationPlayState = "running";
        } else {
          track.style.animationPlayState = "paused";
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(document.querySelector(".partners__carousel"));


  
});

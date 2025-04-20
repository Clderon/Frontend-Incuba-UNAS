document.addEventListener("DOMContentLoaded", () => {
  // Función para verificar si un elemento está en el viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Función para manejar la animación de entrada de los elementos
  function handleScrollAnimations() {
    const section = document.querySelector(".values");
    const title = document.querySelector(".values__title");
    const subtitle = document.querySelector(".values__subtitle");
    const items = document.querySelectorAll(".values__item");

    if (
      isElementInViewport(section) &&
      !section.classList.contains("animated")
    ) {
      section.classList.add("animated");

      // Animar título y subtítulo
      title.style.opacity = "0";
      title.style.transform = "translateY(-20px)";

      subtitle.style.opacity = "0";
      subtitle.style.transform = "translateY(-10px)";

      // Animar elementos con delay escalonado
      items.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        // Aplicar animación con delay escalonado
        setTimeout(() => {
          item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 100 + index * 100);
      });

      // Animar título y subtítulo
      setTimeout(() => {
        title.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";

        setTimeout(() => {
          subtitle.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          subtitle.style.opacity = "1";
          subtitle.style.transform = "translateY(0)";
        }, 200);
      }, 100);
    }
  }

  // Ejecutar la función al cargar la página
  handleScrollAnimations();

  // Ejecutar la función al hacer scroll
  window.addEventListener("scroll", handleScrollAnimations);

  // Añadir efecto de hover a los elementos
  const valueItems = document.querySelectorAll(".values__item");

  valueItems.forEach((item) => {
    // Obtener el color del icono para usarlo en efectos hover
    const icon = item.querySelector(".values__icon");
    const iconColor = window.getComputedStyle(icon).color;
    const valueName = item.querySelector(".values__name");

    // Aplicar el color del icono al nombre del valor en hover
    item.addEventListener("mouseenter", () => {
      valueName.style.color = iconColor;
    });

    item.addEventListener("mouseleave", () => {
      valueName.style.color = "";
    });

    // Añadir efecto de pulso al icono en hover
    icon.addEventListener("mouseenter", () => {
      icon.style.animation = "pulse 1.5s infinite";
    });

    icon.addEventListener("mouseleave", () => {
      icon.style.animation = "";
    });
  });
});

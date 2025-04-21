// Función para añadir animaciones adicionales a las tarjetas
document.addEventListener("DOMContentLoaded", () => {
  const mentorCards = document.querySelectorAll(".mentor-card");

  // Añadir efecto de entrada escalonada
  mentorCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 * index);
  });

  // Añadir efecto de hover para las tarjetas
  mentorCards.forEach((card) => {
    // Efecto de elevación al hover
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });

    // Añadir efecto de click para dispositivos móviles
    card.addEventListener("click", () => {
      const innerCard = card.querySelector(".mentor-card__inner");
      innerCard.style.transform =
        innerCard.style.transform === "rotateY(180deg)"
          ? "rotateY(0deg)"
          : "rotateY(180deg)";
    });
  });

  // Añadir estilos iniciales para la animación de entrada
  mentorCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
});

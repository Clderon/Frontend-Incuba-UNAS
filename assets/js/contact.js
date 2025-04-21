document.addEventListener("DOMContentLoaded", () => {
  // Referencias a elementos
  const contactForm = document.getElementById("contactForm");
  const formContainer = document.querySelector(".contact__form-container");
  const infoSection = document.querySelector(".contact__info");

  // Animación de entrada para elementos
  const animateElements = () => {
    const elements = [infoSection, formContainer];

    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 200 * index);
    });
  };

  // Animación para los campos de formulario
  const formInputs = document.querySelectorAll(
    ".contact__input, .contact__textarea"
  );
  formInputs.forEach((input) => {
    // Efecto de focus
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("input--focused");
    });

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("input--focused");
    });

    // Validación en tiempo real
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.classList.add("input--valid");
      } else {
        input.classList.remove("input--valid");
      }
    });
  });

  // Manejo del envío del formulario
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulación de envío
    const submitBtn = contactForm.querySelector(".contact__submit-btn");
    const btnText = submitBtn.querySelector(".contact__btn-text");
    const btnIcon = submitBtn.querySelector(".contact__btn-icon i");

    // Cambiar estado del botón
    submitBtn.disabled = true;
    btnText.textContent = "Enviando...";
    btnIcon.className = "fas fa-spinner fa-spin";

    // Simular tiempo de envío
    setTimeout(() => {
      // Crear mensaje de éxito si no existe
      let successMessage = document.querySelector(".contact__success-message");

      if (!successMessage) {
        successMessage = document.createElement("div");
        successMessage.className = "contact__success-message";
        successMessage.innerHTML = `
                    <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                    ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                `;
        contactForm.appendChild(successMessage);
      }

      // Mostrar mensaje de éxito
      successMessage.style.display = "block";

      // Restablecer formulario
      contactForm.reset();

      // Restablecer botón
      submitBtn.disabled = false;
      btnText.textContent = "Mensaje Enviado";
      btnIcon.className = "fas fa-check";

      // Ocultar mensaje después de un tiempo
      setTimeout(() => {
        successMessage.style.display = "none";
        btnText.textContent = "Enviar Mensaje";
        btnIcon.className = "fas fa-paper-plane";
      }, 5000);
    }, 2000);
  });

  // Efecto de parallax para la imagen
  // const contactImage = document.querySelector(".contact__image");
  // if (contactImage) {
  //   window.addEventListener("scroll", () => {
  //     const scrollPosition = window.scrollY;
  //     const imageContainer = document.querySelector(".contact__image-wrapper");
  //     const containerPosition =
  //       imageContainer.getBoundingClientRect().top + window.scrollY;
  //     const offset = (scrollPosition - containerPosition) * 0.;

  //     if (offset > -100 && offset < 100) {
  //       contactImage.style.transform = `translateY(${offset}px)`;
  //     }
  //   });
  // }

  // Iniciar animaciones
  animateElements();
});

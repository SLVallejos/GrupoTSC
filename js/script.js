document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
       ========================================================================== */
    const faqPreguntas = document.querySelectorAll(".faq-pregunta");

    faqPreguntas.forEach(pregunta => {
        pregunta.addEventListener("click", () => {
            const itemActual = pregunta.parentElement;
            
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== itemActual) item.classList.remove("active");
            });

            itemActual.classList.toggle("active");
        });
    });

    /* ==========================================================================
       2. ANIMACIÓN DE APARICIÓN AL HACER SCROLL
       ========================================================================== */
    const seccionesAAanimar = document.querySelectorAll("#nosotros, #servicios, #porque, .estadisticas, #tecnologias, #proyectos, #especializados, #faq, #contacto");
    
    seccionesAAanimar.forEach(sec => sec.classList.add("reveal"));

    const opcionesObserver = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, opcionesObserver);

    seccionesAAanimar.forEach(seccion => observer.observe(seccion));


    /* ==========================================================================
       3. LÓGICA DEL CARRUSEL DE PROYECTOS INTERACTIVO (FLECHAS)
       ========================================================================== */
    const track = document.querySelector('.carrusel-proyectos-track');
    const cards = document.querySelectorAll('.proyecto-card');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (track && cards.length > 0 && nextBtn && prevBtn) {
        let index = 0;

        function moverCarrusel() {
            const cardsPerView = window.innerWidth <= 768 ? 1 : 2;
            const maxIndex = cards.length - cardsPerView;

            if (index > maxIndex) index = 0;
            if (index < 0) index = maxIndex;

            const porcentajeDesplazamiento = index * (100 / cardsPerView);
            track.style.transform = `translateX(-${porcentajeDesplazamiento}%)`;
        }

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            index++;
            moverCarrusel();
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            index--;
            moverCarrusel();
        });

        window.addEventListener('resize', moverCarrusel);
    }

    /* ==========================================================================
       4. INTERACTIVIDAD DE SOLUCIONES ESPECIALIZADAS (TABS / RECUADROS)
       ========================================================================== */
    const tabBotones = document.querySelectorAll('.tab-btn');
    const tabContenidos = document.querySelectorAll('.tab-contenido');

    if (tabBotones.length > 0 && tabContenidos.length > 0) {
        tabBotones.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault(); // Evita saltos raros en la web
                
                // Quitar clase activa de todos los botones de la izquierda
                tabBotones.forEach(b => b.classList.remove('active'));
                
                // Activar solo el botón que tocaste
                boton.classList.add('active');

                // Conseguir el ID del bloque que hay que mostrar (cableado, fibra, etc.)
                const destinoTab = boton.getAttribute('data-tab');

                // Ocultar todos los bloques de contenido de la derecha
                tabContenidos.forEach(contenido => {
                    contenido.classList.remove('active');
                });

                // Mostrar el bloque que corresponde con su texto e imagen
                const contenidoActivo = document.getElementById(destinoTab);
                if (contenidoActivo) {
                    contenidoActivo.classList.add('active');
                }
            });
        });
    }

    /* ==========================================================================
       5. INTERACTIVIDAD DEL FORMULARIO DE CONTACTO (CARTEL DE ÉXITO)
       ========================================================================== */
    const formulario = document.querySelector('.formulario');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            let mensajeExistente = document.querySelector('.mensaje-exito');
            if (mensajeExistente) mensajeExistente.remove();

            const cartelExito = document.createElement('div');
            cartelExito.className = 'mensaje-exito';
            cartelExito.innerHTML = '<i class="fas fa-check-circle"></i> ¡Gracias! Tu consulta fue recibida, nos contactaremos a la brevedad.';

            formulario.appendChild(cartelExito);

            setTimeout(() => {
                cartelExito.classList.add('mostrar');
            }, 50);

            formulario.reset();

            setTimeout(() => {
                cartelExito.classList.remove('mostrar');
                setTimeout(() => cartelExito.remove(), 400);
            }, 5000);
        });
    }
});
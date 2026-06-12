document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
       ========================================================================== */
    const faqPreguntas = document.querySelectorAll(".faq-pregunta");
    const faqItems = document.querySelectorAll(".faq-item");

    faqPreguntas.forEach(pregunta => {
        pregunta.addEventListener("click", () => {
            const itemActual = pregunta.parentElement;

            faqItems.forEach(item => {
                if (item !== itemActual) {
                    item.classList.remove("active");
                }
            });

            itemActual.classList.toggle("active");
        });
    });

    /* ==========================================================================
       2. ANIMACIÓN DE APARICIÓN AL HACER SCROLL
       ========================================================================== */
    const seccionesAAnimar = document.querySelectorAll('section');
    
    seccionesAAnimar.forEach((sec, index) => {
        // Evitamos aplicar el reveal oculto a la primera sección (Hero) para mejorar la carga percibida
        if (index > 0) {
            sec.classList.add("reveal");
        }
    });

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

    // Solo observamos las secciones que requieren animación diferida
    seccionesAAnimar.forEach((seccion, index) => {
        if (index > 0) {
            observer.observe(seccion);
        }
    });


    /* ==========================================================================
       3. LÓGICA DEL CARRUSEL DE PROYECTOS INTERACTIVO (CORREGIDO CON PIXELS)
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

            // CORRECCIÓN: Medimos la tarjeta real + el espacio (gap) dinámicamente
            const estiloTrack = window.getComputedStyle(track);
            const gap = parseFloat(estiloTrack.gap) || 0;
            const tarjetaAncho = cards[0].getBoundingClientRect().width;
            
            // Calculamos el desplazamiento exacto en píxeles
            const desplazamientoTotal = index * (tarjetaAncho + gap);

            track.style.transform = `translateX(-${desplazamientoTotal}px)`;
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

        // Redimensionamiento optimizado con debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                moverCarrusel();
            }, 200);
        });
    }

    /* ==========================================================================
       4. INTERACTIVIDAD DE SOLUCIONES ESPECIALIZADAS (TABS)
       ========================================================================== */
    const tabBotones = document.querySelectorAll('.tab-btn');
    const tabContenidos = document.querySelectorAll('.tab-contenido');

    if (tabBotones.length && tabContenidos.length) {
        tabBotones.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();

                tabBotones.forEach(btn => btn.classList.remove('active'));
                tabContenidos.forEach(contenido => contenido.classList.remove('active'));

                boton.classList.add('active');

                const contenidoActivo = document.getElementById(boton.dataset.tab);
                if (contenidoActivo) {
                    contenidoActivo.classList.add('active');
                }
            });
        });
    }

    /* ==========================================================================
       5. INTERACTIVIDAD DEL FORMULARIO DE CONTACTO (MOCKUP PRE-PHP)
       ========================================================================== */
    const formulario = document.querySelector('.formulario');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            // Limpieza preventiva de alertas previas
            let mensajeExistente = document.querySelector('.mensaje-exito');
            if (mensajeExistente) mensajeExistente.remove();

            // Estructuración del cartel de estado
            const cartelExito = document.createElement('div');
            cartelExito.className = 'mensaje-exito';
            cartelExito.innerHTML = '<i class="fas fa-check-circle"></i> ¡Gracias! Tu consulta fue recibida, nos contactaremos a la brevedad.';

            formulario.appendChild(cartelExito);

            // Transición suave de entrada
            setTimeout(() => {
                cartelExito.classList.add('mostrar');
            }, 50);

            formulario.reset();

            // Cierre automatizado de la notificación
            setTimeout(() => {
                cartelExito.classList.remove('mostrar');
                setTimeout(() => cartelExito.remove(), 400);
            }, 5000);
            
            /* 💡 NOTA PARA CUANDO INTEGRES PHP:
               Aquí deberás usar un fetch() para enviar los datos mediante POST al archivo .php:
               
               const datos = new FormData(formulario);
               fetch('enviar.php', { method: 'POST', body: datos })
               .then(res => res.json())
               .then(data => { // Mostrar cartelExito aquí dentro });
            */
        });
    }

    /* ==========================================================================
       6. MENÚ DESPLEGABLE MÓVIL (TOGGLE)
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
});
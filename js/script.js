document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const faqPreguntas = document.querySelectorAll(".faq-pregunta");
    const faqItems = document.querySelectorAll(".faq-item");
    faqPreguntas.forEach((pregunta) => {
        pregunta.addEventListener("click", () => {
            const itemActual = pregunta.parentElement;
            faqItems.forEach((item) => {
                if (item !== itemActual) item.classList.remove("active");
            });
            itemActual.classList.toggle("active");
        });
    });
    const seccionesExcluidas = ['contacto', 'faq'];
    const seccionesAAnimar = document.querySelectorAll("section");
    seccionesAAnimar.forEach((sec, index) => {
        if (index > 0 && !seccionesExcluidas.includes(sec.id)) {
            sec.classList.add("reveal");
        }
    });
    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observerRef.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });
    seccionesAAnimar.forEach((seccion, index) => {
        if (index > 0 && !seccionesExcluidas.includes(seccion.id)) {
            observer.observe(seccion);
        }
    });
    const track = document.querySelector('.carrusel-proyectos-track');
    const cards = document.querySelectorAll('.proyecto-card');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    if (track && cards.length > 0 && nextBtn && prevBtn) {
        let index = 0;
        const moverCarrusel = () => {
            const cardsPerView = window.innerWidth <= 768 ? 1 : 2;
            const maxIndex = Math.max(cards.length - cardsPerView, 0);
            if (index > maxIndex) index = 0;
            if (index < 0) index = maxIndex;
            const estiloTrack = window.getComputedStyle(track);
            const gap = parseFloat(estiloTrack.gap) || 0;
            const tarjetaAncho = cards[0].getBoundingClientRect().width;
            const desplazamientoTotal = index * (tarjetaAncho + gap);
            track.style.transform = `translateX(-${desplazamientoTotal}px)`;
            prevBtn.disabled = maxIndex === 0;
            nextBtn.disabled = maxIndex === 0;
        };
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
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(moverCarrusel, 200);
        });
        moverCarrusel();
    }
    const numeroWhatsapp = '5493525536785';
    const mensajeBase = 'Hola Grupo TSC, vi su sitio web y quisiera asesoramiento.';
    const mensajesPorSeccion = {
        inicio: mensajeBase,
        nosotros: 'Hola Grupo TSC, me gustaría conocer más sobre la empresa y los servicios que ofrecen.',
        servicios: 'Hola Grupo TSC, quisiera asesoramiento sobre sus servicios de conectividad, seguridad o soporte técnico.',
        porque: mensajeBase,
        tecnologias: mensajeBase,
        proyectos: 'Hola Grupo TSC, vi sus proyectos realizados y quisiera cotizar algo similar para mi empresa.',
        especializados: 'Hola Grupo TSC, quisiera más información sobre una de sus soluciones especializadas.',
        marcas: mensajeBase,
        'casos-exito': 'Hola Grupo TSC, vi sus casos de éxito y quisiera una solución similar para mi empresa.',
        faq: 'Hola Grupo TSC, tengo una consulta que no encontré en las preguntas frecuentes del sitio.',
        contacto: mensajeBase
    };
    const mensajesPorTab = {
        cableado: 'Hola Grupo TSC, quisiera cotizar un servicio de cableado estructurado para mi empresa.',
        fibra: 'Hola Grupo TSC, quisiera cotizar un enlace de fibra óptica para mi empresa.',
        wifi: 'Hola Grupo TSC, quisiera cotizar una solución de WiFi empresarial para mi empresa.',
        cctv: 'Hola Grupo TSC, quisiera cotizar un sistema de CCTV para mi empresa.',
        acceso: 'Hola Grupo TSC, quisiera cotizar un sistema de control de acceso para mi empresa.',
        telefonia: 'Hola Grupo TSC, quisiera cotizar un servicio de telefonía IP para mi empresa.'
    };
    const botonWhatsapp = document.querySelector('.whatsapp');
    const armarLinkWhatsapp = (mensaje) => {
        return `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    };
    const actualizarWhatsappPorSeccion = (idSeccion) => {
        if (!botonWhatsapp) return;
        if (idSeccion === 'especializados') {
            const tabActiva = document.querySelector('.tab-btn.active');
            if (tabActiva && mensajesPorTab[tabActiva.dataset.tab]) {
                botonWhatsapp.href = armarLinkWhatsapp(mensajesPorTab[tabActiva.dataset.tab]);
                return;
            }
        }
        const mensaje = mensajesPorSeccion[idSeccion] || mensajeBase;
        botonWhatsapp.href = armarLinkWhatsapp(mensaje);
    };
    const actualizarWhatsappPorTab = (tabId) => {
        if (!botonWhatsapp || !mensajesPorTab[tabId]) return;
        botonWhatsapp.href = armarLinkWhatsapp(mensajesPorTab[tabId]);
    };
    if (botonWhatsapp) {
        const seccionesParaWhatsapp = document.querySelectorAll('section[id]');
        const whatsappObserver = new IntersectionObserver((entries) => {
            let seccionMasVisible = null;
            let mayorRatio = 0;
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > mayorRatio) {
                    mayorRatio = entry.intersectionRatio;
                    seccionMasVisible = entry.target;
                }
            });
            if (seccionMasVisible) {
                actualizarWhatsappPorSeccion(seccionMasVisible.id);
            }
        }, { threshold: [0.25, 0.5, 0.75] });
        seccionesParaWhatsapp.forEach((seccion) => whatsappObserver.observe(seccion));
    }
    const tabBotones = document.querySelectorAll('.tab-btn');
    const tabContenidos = document.querySelectorAll('.tab-contenido');
    if (tabBotones.length && tabContenidos.length) {
        tabBotones.forEach((boton) => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                tabBotones.forEach((btn) => btn.classList.remove('active'));
                tabContenidos.forEach((contenido) => contenido.classList.remove('active'));
                boton.classList.add('active');
                const contenidoActivo = document.getElementById(boton.dataset.tab);
                if (contenidoActivo) contenidoActivo.classList.add('active');
                actualizarWhatsappPorTab(boton.dataset.tab);
            });
        });
    }
    const formulario = document.getElementById('contactForm');
    if (formulario) {
        let formMessage = formulario.querySelector('.form-message');
        if (!formMessage) {
            formMessage = document.createElement('div');
            formMessage.className = 'form-message';
            formulario.appendChild(formMessage);
        }
        const mostrarMensaje = (tipo, texto) => {
            formMessage.className = `form-message ${tipo}`;
            formMessage.textContent = texto;
        };
        const validarEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        };
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            const endpoint = (formulario.getAttribute('action') || '').trim();
            const submitBtn = formulario.querySelector('button[type="submit"]');
            const nombreInput = formulario.querySelector('#nombre');
            const emailInput = formulario.querySelector('#email');
            const telefonoInput = formulario.querySelector('#telefono');
            const mensajeInput = formulario.querySelector('#mensaje');
            const nombre = nombreInput ? nombreInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const telefono = telefonoInput ? telefonoInput.value.trim() : '';
            const mensaje = mensajeInput ? mensajeInput.value.trim() : '';
            formMessage.className = 'form-message';
            formMessage.textContent = '';
            if (!endpoint || endpoint.includes('REEMPLAZAR_FORM_ID')) {
                mostrarMensaje('error', 'Falta configurar el endpoint real de Formspree.');
                return;
            }
            if (!nombre) {
                mostrarMensaje('error', 'Ingresá tu nombre completo.');
                nombreInput?.focus();
                return;
            }
            if (!email) {
                mostrarMensaje('error', 'Ingresá tu correo electrónico.');
                emailInput?.focus();
                return;
            }
            if (!validarEmail(email)) {
                mostrarMensaje('error', 'Ingresá un correo electrónico válido para poder enviar la consulta.');
                emailInput?.focus();
                return;
            }
            const validarTelefono = (telefono) => {
            if (!telefono) return true;
            const telefonoLimpio = telefono.replace(/[^\d]/g, '');
            return telefonoLimpio.length >= 8 && telefonoLimpio.length <= 15;
            };
            if (telefono && !validarTelefono(telefono)) {
                mostrarMensaje('error', 'Ingresá un teléfono válido. Ejemplo: 3511234567 o +54 351 1234567.');
                telefonoInput?.focus();
                return;
            }
            const originalText = submitBtn ? submitBtn.textContent : 'Enviar Consulta';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
            }
            try {
                const respuesta = await fetch(endpoint, {
                    method: 'POST',
                    body: new FormData(formulario),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await respuesta.json().catch(() => ({}));
                if (respuesta.ok) {
                    mostrarMensaje('success', 'Consulta enviada correctamente. Te responderemos a la brevedad.');
                    formulario.reset();
                } else {
                    let errorMsg =
                        data?.errors?.[0]?.message ||
                        data?.error ||
                        'No se pudo enviar la consulta. Revisá los datos e intentá nuevamente.';
                    const errorLower = errorMsg.toLowerCase();
                    if (errorLower.includes('should be an email')) {
                        errorMsg = 'Ingresá un correo electrónico válido para poder enviar la consulta.';
                    } else if (errorLower.includes('required')) {
                        errorMsg = 'Completá los campos obligatorios antes de enviar la consulta.';
                    }
                    mostrarMensaje('error', errorMsg);
                }
            } catch (error) {
                mostrarMensaje(
                    'error',
                    'No se pudo enviar la consulta. Revisá tu conexión o intentá nuevamente.'
                );
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    }
    const header = document.querySelector('header');
    const actualizarHeader = () => {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 20);
    };
    actualizarHeader();
    window.addEventListener('scroll', actualizarHeader, { passive: true });
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    if (menuToggle && menu) {
        const cerrarMenu = () => {
            menu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        };
        const toggleMenu = () => {
            const abierto = menu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
            document.body.classList.toggle('menu-open', abierto);
        };
        menuToggle.addEventListener('click', toggleMenu);
        menuLinks.forEach((link) => {
            link.addEventListener('click', cerrarMenu);
        });
    }

    // ── CONTADORES ANIMADOS ──────────────────────────────────────────────────
    const contadores = document.querySelectorAll('.contador');
    if (contadores.length > 0) {
        const animarContador = (el) => {
            const target = parseInt(el.dataset.target);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const duracion = 1800; // ms
            const pasos = 60;
            const incremento = target / pasos;
            let actual = 0;
            let paso = 0;
            // Easing: empieza rápido, termina lento
            const easing = (t) => 1 - Math.pow(1 - t, 3);
            const intervalo = setInterval(() => {
                paso++;
                const progreso = easing(paso / pasos);
                actual = Math.round(progreso * target);
                el.textContent = prefix + actual + suffix;
                if (paso >= pasos) {
                    el.textContent = prefix + target + suffix;
                    clearInterval(intervalo);
                }
            }, duracion / pasos);
        };

        // Disparar cuando el bloque de stats entra al viewport
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    contadores.forEach(animarContador);
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const statsBlock = document.querySelector('.hero-stats');
        if (statsBlock) statsObserver.observe(statsBlock);
    }
});
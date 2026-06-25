document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. VOLANTE INTERACTIVO (Acompaña Scroll y Hover de partes) ---
    const baseWheel = document.querySelector('.base-wheel');
    const wheelOverlay = document.getElementById('wheelOverlay');
    const wheelDescription = document.getElementById('wheelDescription');
    const triggers = document.querySelectorAll('.wheel-part-trigger');

    // Datos dinámicos para los hovers del volante
    const descriptions = {
        "screen": "PANTALLA LCD INTEGRADA: Muestra tiempos de vuelta, delta en vivo, reparto de frenada (bias) y estado de neumáticos en tiempo real.",
        "buttons-right": "BOTONERA SUPERIOR: Mapeo rápido para limitador de pits, activación de radio externa y ráfaga de luces (Flash).",
        "grips": "GRIPI DE ALTA PRECISIÓN: Recubiertos de goma antideslizante inyectada para soportar fuerzas de hasta 15Nm de torque continuo.",
        "encoders": "ENCODERS ROTATIVOS DE CONFIGURACIÓN: Control dinámico del mapa de motor, balance de frenos delantero/trasero y control de tracción."
    };

    // Efecto de crecimiento/escala según scroll (acompaña el scroll)
    window.addEventListener('scroll', () => {
        const rect = baseWheel.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Calcula qué tan centrado está el volante en la pantalla
            const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
            // Sutil cambio de escala de 0.95 a 1.05 basado en progreso de scroll
            const scale = 0.95 + (scrollPercent * 0.1);
            baseWheel.style.transform = `scale(${Math.min(Math.max(scale, 0.95), 1.05)})`;
        }
    });

    // Interacciones de Hover por áreas
    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', (e) => {
            const part = e.target.getAttribute('data-part');
            wheelDescription.innerText = descriptions[part];
            wheelOverlay.style.opacity = "0.7"; // Muestra la versión iluminada en verde
        });

        trigger.addEventListener('mouseleave', () => {
            wheelDescription.innerText = "Pasa el cursor sobre los componentes del volante para analizar la telemetría integrada.";
            wheelOverlay.style.opacity = "0"; // Vuelve al estado normal oscuro
        });
    });


    // --- 2. CAROUSEL DE CIRCUITOS ---
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    
    let currentIndex = 0;

    const updateCarousel = (index) => {
        // Mueve el track horizontalmente
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualiza opacidades activas
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    };

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(currentIndex);
    });
});
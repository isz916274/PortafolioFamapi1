document.addEventListener("DOMContentLoaded", () => {
    const numeros = document.querySelectorAll('.numero');
    
    // Función que hace el efecto de conteo
    const animarNumeros = (elemento) => {
        const target = +elemento.getAttribute('data-target');
        const prefix = elemento.getAttribute('data-prefix');
        const suffix = elemento.getAttribute('data-suffix');
        const duracion = 2000; // 2 segundos en total
        const incremento = target / (duracion / 16); // Cálculo para 60fps
        
        let actual = 0;
        
        const actualizar = () => {
            actual += incremento;
            if (actual < target) {
                // Actualiza el texto redondeando hacia arriba
                elemento.innerText = prefix + Math.ceil(actual) + suffix;
                requestAnimationFrame(actualizar); // Llama al siguiente frame
            } else {
                // Se asegura de terminar en el número exacto
                elemento.innerText = prefix + target + suffix;
            }
        };
        actualizar();
    };

    // IntersectionObserver: Activa la animación SÓLO cuando el usuario hace scroll y ve la sección
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarNumeros(entry.target);
                observer.unobserve(entry.target); // Deja de observar para que no se anime 2 veces
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando al menos la mitad del elemento es visible

    numeros.forEach(num => observer.observe(num));
});
document.addEventListener("DOMContentLoaded", () => {
    // 1. Base de datos de proyectos (Agrega aquí más proyectos para probar la paginación)
    const proyectos = [
        {
            titulo: "CENTRO DE DISTRIBUCIÓN NACIONAL",
            cliente: "Grupo Logístico del Norte",
            ubicacion: "Monterrey, NL",
            año: "2025",
            categoria: "Racks Selectivos",
            imagen: "img/CentroNacional.jpg", // Cambia a tus rutas reales
            descripcion: "Instalación de un sistema integral de racks selectivos de doble profundidad con pasillos elevados para maximizar el espacio."
        },
        {
            titulo: "PLANTA DE ACERO ESTRUCTURAL",
            cliente: "Aceros del Pacífico S.A.",
            ubicacion: "Guadalajara, JAL",
            año: "2024",
            categoria: "Cantilever",
            imagen: "img/PlantaAcero.png",
            descripcion: "Sistema cantilever de alta capacidad para almacenamiento de perfiles, tubería y lámina de diferentes dimensiones"
        },
        {
            titulo: "CENTRO DE OPERACIONES E-COMMERCE",
            cliente: "MegaShop Digital",
            ubicacion: "CDMX",
            año: "2024",
            categoria: "Mezzanine",
            imagen: "img/CentroOperaciones.png",
            descripcion: "Mezzanine de 3 niveles con capacidad de 500 kg/m² para operación de fulfillment de e-commerce a gran escala."
        },
        // Añadimos datos de prueba para generar más de 6 y ver la paginación
        { titulo: "ALMACÉN FRIGORÍFICO", cliente: "Carnes Finas", ubicacion: "Sonora", año: "2023", categoria: "Automatización", imagen: "img/AlmacenFrigorifico.png", descripcion: "Sistema de almacenamiento automatizado en frío." },
        { titulo: "BODEGA TEXTIL", cliente: "Telas de México", ubicacion: "Puebla", año: "2023", categoria: "Logística", imagen: "img/BodegaTextil.jpg", descripcion: "Optimización de espacio para bobinas de tela." },
        { titulo: "PARQUE INDUSTRIAL SUR", cliente: "Inmobiliaria SUR", ubicacion: "Querétaro", año: "2022", categoria: "Industria", imagen: "img/ParqueIndustrial.jpg", descripcion: "Equipamiento total de 5 naves industriales." },
        { titulo: "RACKS DINÁMICOS", cliente: "Bebidas SA", ubicacion: "Toluca", año: "2022", categoria: "Racks Selectivos", imagen: "img/RacksDinamicos.jpg", descripcion: "Sistema dinámico FIFO para control de caducidad." },
        { titulo: "SISTEMA DRIVE-IN", cliente: "Lácteos del Bajío", ubicacion: "Guanajuato", año: "2021", categoria: "Racks Selectivos", imagen: "img/SistemaDriveIn.jpg", descripcion: "Almacenamiento de alta densidad para productos homogéneos." }
    ];

    // 2. Variables de estado
    let filtroActual = "Todos";
    let paginaActual = 1;
    const itemsPorPagina = 6;

    // 3. Referencias al DOM
    const gridProyectos = document.getElementById("grid-proyectos");
    const paginacionContenedor = document.getElementById("paginacion");
    const botonesFiltro = document.querySelectorAll(".btn-filtro");

    // 4. Función principal de renderizado
    function renderizarProyectos() {
        // Filtrar
        const proyectosFiltrados = proyectos.filter(p => 
            filtroActual === "Todos" || p.categoria.toLowerCase() === filtroActual.toLowerCase()
        );

        // Paginación lógica
        const indexInicio = (paginaActual - 1) * itemsPorPagina;
        const proyectosPagina = proyectosFiltrados.slice(indexInicio, indexInicio + itemsPorPagina);
        const totalPaginas = Math.ceil(proyectosFiltrados.length / itemsPorPagina);

        // Renderizar HTML de las tarjetas
        gridProyectos.innerHTML = "";
        proyectosPagina.forEach(proyecto => {
            const cardHTML = `
                <div class="proyecto-card">
                    <div class="imagen-contenedor">
                        <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
                        <div class="categoria-tag">${proyecto.categoria}</div>
                        <div class="esquina-decorativa esquina-tl"></div>
                        <div class="esquina-decorativa esquina-bl"></div>
                        <div class="esquina-decorativa esquina-br"></div>
                    </div>
                    <div class="proyecto-info">
                        <h3>${proyecto.titulo}</h3>
                        <p class="cliente">${proyecto.cliente}</p>
                        <div class="detalles-meta">
                            <span>📍 ${proyecto.ubicacion}</span>
                            <span>📅 ${proyecto.año}</span>
                            <span>🏷️ ${proyecto.categoria}</span>
                        </div>
                        <p class="descripcion">${proyecto.descripcion}</p>
                        <a href="#" class="ver-proyecto">VER PROYECTO COMPLETO</a>
                    </div>
                </div>
            `;
            gridProyectos.innerHTML += cardHTML;
        });

        renderizarPaginacion(totalPaginas);
    }

    // 5. Generar botones de paginación
    function renderizarPaginacion(totalPaginas) {
        paginacionContenedor.innerHTML = "";
        
        if(totalPaginas <= 1) return; // Ocultar si solo hay 1 página

        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement("button");
            btn.classList.add("btn-pagina");
            if (i === paginaActual) btn.classList.add("activo");
            btn.innerText = i;
            
            btn.addEventListener("click", () => {
                paginaActual = i;
                renderizarProyectos();
                // Opcional: Hacer scroll suave hacia arriba al cambiar de página
                document.getElementById("seccion-portafolio").scrollIntoView({ behavior: 'smooth' });
            });
            
            paginacionContenedor.appendChild(btn);
        }
    }

    // 6. Eventos de los filtros
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // Quitar clase activa a todos y poner al clicado
            botonesFiltro.forEach(b => b.classList.remove("activo"));
            e.target.classList.add("activo");

            // Actualizar estado y reiniciar a página 1
            filtroActual = e.target.getAttribute("data-filtro");
            paginaActual = 1; 
            renderizarProyectos();
        });
    });

    // 7. Inicializar la primera carga
    renderizarProyectos();
});
let proyectos = [];

function agregarProyecto() {
    const nombreProyecto = document.getElementById("nombreProyecto").value;
    const descripcionProyecto = document.getElementById("descripcionProyecto").value;

    if (nombreProyecto.trim() !== "") {
        proyectos.push({
            id: proyectos.length + 1, // Generar un ID único para el proyecto
            nombre: nombreProyecto,
            descripcion: descripcionProyecto,
            tareas: []
        });

        actualizarListaProyectos();
    }
    // const tareasEncontradas = buscarTareasPorFechaVencimiento(proyectoId, fechaVencimiento);
    // console.log(tareasEncontradas);
}

function abrirModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function agregarTarea() {
    const nombreTarea = document.getElementById("nombreTareaModal").value;
    const fechaVencimiento = document.getElementById("fechaVencimientoModal").value;
    const estadoTarea = document.getElementById("estadoTareaModal").value;
    const proyectoSeleccionadoIndex = document.getElementById("proyectosModal").value;

    if (nombreTarea.trim() !== "") {
        if (proyectoSeleccionadoIndex !== "") {
            const proyectoSeleccionado = proyectos.find(proyecto => proyecto.id === parseInt(proyectoSeleccionadoIndex));
            proyectoSeleccionado.tareas.push({
                id: proyectoSeleccionado.tareas.length + 1, // Generar un ID único para la tarea
                descripcion: nombreTarea,
                fechaVencimiento: fechaVencimiento,
                estado: estadoTarea
            });

            cerrarModal();
            actualizarListaProyectos();
        } else {
            alert("Por favor, seleccione un proyecto para asignar la tarea.");
        }
    }
}

function actualizarListaProyectos() {
    const listaProyectosElement = document.getElementById("listaProyectos");
    listaProyectosElement.innerHTML = "";

    proyectos.forEach(proyecto => {
        const proyectoElement = document.createElement("div");
        proyectoElement.classList.add("project");
        proyectoElement.innerHTML = `<h2>${proyecto.nombre}</h2><p>${proyecto.descripcion}</p>`;

        const agregarTareaButton = document.createElement("button");
        agregarTareaButton.textContent = "Agregar Tarea";
        agregarTareaButton.onclick = function() {
            abrirModal();
            actualizarDropdownProyectos();
        };
        proyectoElement.appendChild(agregarTareaButton);

        proyecto.tareas.forEach(tarea => {
            const tareaElement = document.createElement("div");
            tareaElement.classList.add("task");
            tareaElement.innerHTML = `
                <span class="task-name">${tarea.descripcion}</span>
                <span class="task-description">${tarea.descripcion}</span>
                <span class="task-state">${tarea.estado}</span>
                <span class="task-due-date">${tarea.fechaVencimiento}</span>
                <button class="complete-task-button" onclick="toggleEstadoTarea(${proyecto.id}, ${tarea.id})">${tarea.estado === "pendiente" ? "Pendiente" : "Completado"}</button>
            `;
            proyectoElement.appendChild(tareaElement);
        });

        listaProyectosElement.appendChild(proyectoElement);
    });
}

function actualizarDropdownProyectos() {
    const proyectosDropdown = document.getElementById("proyectosModal");
    proyectosDropdown.innerHTML = "";

    proyectos.forEach(proyecto => {
        const option = document.createElement("option");
        option.text = proyecto.nombre;
        option.value = proyecto.id;
        proyectosDropdown.add(option);
    });
}

function toggleEstadoTarea(proyectoId, tareaId) {
    const proyectoSeleccionado = proyectos.find(proyecto => proyecto.id === proyectoId);
    const tareaSeleccionada = proyectoSeleccionado.tareas.find(tarea => tarea.id === tareaId);
    tareaSeleccionada.estado = tareaSeleccionada.estado === "pendiente" ? "completada" : "pendiente";
    actualizarListaProyectos();
}
function buscarTareasPorFechaVencimiento(proyectoId, fechaVencimiento) {
    const proyectoSeleccionado = proyectos.find(proyecto => proyecto.id === proyectoId);
    const tareasEncontradas = proyectoSeleccionado.tareas.filter(tarea => {
        const fechaTarea = new Date(tarea.fechaVencimiento);
        const fechaBuscada = new Date(fechaVencimiento);
        fechaTarea.setHours(0, 0, 0, 0);
        fechaBuscada.setHours(0, 0, 0, 0);
        return fechaTarea.getTime() === fechaBuscada.getTime();
    });
    return tareasEncontradas;
}

function buscarTareasPorFecha() {
    const fechaVencimiento = document.getElementById("fechaVencimientoBusqueda").value;
    const proyectoId = parseInt(document.getElementById("proyectoIdBusqueda").value);
    const tareasEncontradas = buscarTareasPorFechaVencimiento(proyectoId, fechaVencimiento);
    mostrarResultadosBusqueda(tareasEncontradas);
}

function mostrarResultadosBusqueda(tareasEncontradas) {
    const resultadosDiv = document.getElementById("resultadosBusqueda");
    resultadosDiv.innerHTML = "";
    if (tareasEncontradas.length === 0) {
        resultadosDiv.innerHTML = "No se encontraron tareas para la fecha seleccionada.";
    } else {
        tareasEncontradas.forEach(tarea => {
            const tareaElement = document.createElement("div");
            tareaElement.textContent = tarea.descripcion;
            resultadosDiv.appendChild(tareaElement);
        });
    }
}

// Inicializar la lista de proyectos al cargar la página
actualizarListaProyectos();

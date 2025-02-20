function actualizarReservasAutomaticamente() {

    let formActuReseGeneral = new FormData(); 
    formActuReseGeneral.append('buscar_reservas_lista', 'actualizar_estados_automaticamente');

    fetch("https://plataforma.the-bizclub.com/consultasDB.php", {
        method: 'POST',
        body: formActuReseGeneral
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.reservas_actualizadas.length > 0) {
            data.reservas_actualizadas.forEach(reserva => {
                updateReservaEstadoEnDOM(reserva.id_reserva, reserva.rese_estado);
            });
        }
    })
    .catch(error => console.error('Error en la actualización automática:', error));

}

function fetchReservas() {

    let formReservasLis = new FormData();
    formReservasLis.append('buscar_reservas_lista', 'obtener_reservas');

    fetch("https://plataforma.the-bizclub.com/consultasDB.php", {
        method: 'POST',
        body: formReservasLis
    })
    .then(response => response.json())
    .then(data => {
        window.reservasData = data.reservas; // Guardamos las reservas en una variable global
        renderReservas(data.reservas);
    })
    .catch(error => console.error('Error:', error));
    
}

function renderReservas(reservas) {
    const container = document.getElementById('reservas-container');
    container.innerHTML = '';  // Limpiamos el contenedor antes de renderizar las reservas

    reservas.forEach(reserva => {
        const li = document.createElement('li');
        li.className = `reserva ${reserva.rese_estado.toLowerCase()}`;  // Asignamos la clase basada en el estado de la reserva
        li.setAttribute('data-id', reserva.id_reserva);  // Guardamos el ID de la reserva como atributo

        const duracionFormateada = formatDuration(reserva.rese_duracion, reserva.rese_tipo);  // Formateamos la duración de la reserva

        li.innerHTML = `
            <strong>Producto:</strong> ${reserva.produNombre} (ID: ${reserva.id_producto})<br>
            <strong>Entrada:</strong> ${reserva.rese_fechaIniTex} ${reserva.rese_horaIni}<br>
            <strong>Salida:</strong> ${reserva.rese_fechaFinTex} ${reserva.rese_horaFin}<br>
            <strong>Tipo de Reserva (Duración):</strong> ${reserva.rese_tipo} (${duracionFormateada})<br>
            <strong>Cantidad de Personas:</strong> ${reserva.rese_numeroPerson}<br>
            <strong>Estado:</strong> <span class="estado-reserva">${reserva.rese_estado}</span><br>
            
            <div class="buttons">
                ${generateButtons(reserva)}  <!-- Generamos los botones según el estado de la reserva -->
            </div>

            <!-- Panel de precios oculto por defecto -->
            <div id="price-panel-${reserva.id_reserva}" class="price-panel hidden">
                <h4>Calcular Precio Final</h4>
                <label>Precio Base: <input type="number" id="precio-${reserva.id_reserva}" value="${reserva.rese_precioBase}"></label><br>
                <input type="hidden" id="cantidad-${reserva.id_reserva}" value="${reserva.rese_duracion}">
                <label>IVA (%): <input type="number" id="iva-${reserva.id_reserva}" value="${reserva.rese_iva}"></label><br>
                <label>Descuento (%): <input type="number" id="descuento-${reserva.id_reserva}" value="${reserva.rese_descuento}"></label><br>
                <label>Comisión (%): <input type="number" id="comision-${reserva.id_reserva}" value="${reserva.rese_comision}"></label><br>
                <p><strong>Precio Final:</strong> $<span id="precio-final-${reserva.id_reserva}">0</span></p>

                <!-- Botones para confirmar la reserva y cerrar el panel -->
                <button class="btn-confirmar-precio" onclick="confirmReserva('${reserva.id_reserva}')">Confirmar Reserva</button>
                <button class="btn-cerrar-panel" onclick="togglePricePanel('${reserva.id_reserva}')">Cerrar</button>
            </div>
        `;

        container.appendChild(li);
    });
}

function generateButtons(reserva) {
    
    let buttons = '';

    if (reserva.rese_estado === 'Por_Confirmar') {
        buttons += `
            <button class="btn btn-terminar" onclick="toggleConfirm('${reserva.id_reserva}')">Terminar Reserva</button>
            <div id="confirm-${reserva.id_reserva}" class="hidden">
                <button class="btn btn-confirmar" onclick="updateReserva('${reserva.id_reserva}', 'Terminada')">Sí</button>
                <button class="btn" onclick="toggleConfirm('${reserva.id_reserva}')">No</button>
            </div>
            <button class="btn btn-consultar" onclick="togglePricePanel('${reserva.id_reserva}')">Consultar Precio</button>
        `;
    } 
    else if (['Pendiente', 'Activa', 'Pausada'].includes(reserva.rese_estado)) {
        buttons += `
            <button class="btn btn-terminar" onclick="toggleConfirm('${reserva.id_reserva}')">Terminar Reserva</button>
            <div id="confirm-${reserva.id_reserva}" class="hidden">
                <button class="btn btn-confirmar" onclick="updateReserva('${reserva.id_reserva}', 'Terminada')">Sí</button>
                <button class="btn" onclick="toggleConfirm('${reserva.id_reserva}')">No</button>
            </div>
        `;
    }

    // Botón para ver detalles
    buttons += `
        <button class="btn-ver-detalles" onclick="mostrarDetalles(${reserva.id_reserva})">
            <i class="fas fa-eye"></i>
        </button>
    `;

    return buttons;

}

function toggleConfirm(id) {
    document.getElementById(`confirm-${id}`).classList.toggle('hidden');
}

function togglePricePanel(id) {
    const panel = document.getElementById(`price-panel-${id}`);
    panel.classList.toggle('hidden');  // Alternamos entre mostrar y ocultar el panel

    if (!panel.classList.contains('hidden')) {
        calculateFinalPrice(id);  // Calculamos el precio al abrir el panel
        ['precio', 'cantidad', 'iva', 'descuento', 'comision'].forEach(field => {
            document.getElementById(`${field}-${id}`).addEventListener('input', () => calculateFinalPrice(id));
        });
    }
}

function calculateFinalPrice(id) {
    const precioBase = parseFloat(document.getElementById(`precio-${id}`).value) || 0;
    const cantidad = parseFloat(document.getElementById(`cantidad-${id}`).value) || 1;
    const iva = parseFloat(document.getElementById(`iva-${id}`).value) || 0;
    const descuento = parseFloat(document.getElementById(`descuento-${id}`).value) || 0;
    const comision = parseFloat(document.getElementById(`comision-${id}`).value) || 0;

    let precioFinal = precioBase * cantidad;
    precioFinal += (precioFinal * iva) / 100;      // Agregamos IVA
    precioFinal -= (precioFinal * descuento) / 100; // Aplicamos descuento
    precioFinal += (precioFinal * comision) / 100;  // Agregamos comisión

    document.getElementById(`precio-final-${id}`).textContent = precioFinal.toFixed(2);
}

function confirmReserva(id) {
    
    const formData = new FormData();
    formData.append('buscar_reservas_lista', 'actualizar_precio');
    formData.append('id_reserva', id);
    formData.append('precio', document.getElementById(`precio-${id}`).value);
    formData.append('cantidad', document.getElementById(`cantidad-${id}`).value);
    formData.append('iva', document.getElementById(`iva-${id}`).value);
    formData.append('descuento', document.getElementById(`descuento-${id}`).value);
    formData.append('comision', document.getElementById(`comision-${id}`).value);

    fetch("https://plataforma.the-bizclub.com/consultasDB.php", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        updateReserva(id, 'Pendiente');  // Cambiar a Pendiente después de confirmar
        fetchReservas();  // Recargar la lista después de confirmar
    })
    .catch(error => console.error('Error:', error));
}

function updateReserva(id, estado) {
    const formData = new FormData();
    formData.append('buscar_reservas_lista', 'actualizar_estado');
    formData.append('id_reserva', id);
    formData.append('nuevo_estado', estado);  // Cambiamos a 'nuevo_estado' para que coincida con el PHP

    fetch("https://plataforma.the-bizclub.com/consultasDB.php", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            fetchReservas();  // Recargar las reservas si se actualiza correctamente
        } else {
            console.error('Error al actualizar:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}
 
function formatDuration(duracion, tipo) {
    // Normalizar el tipo a minúsculas para evitar errores por mayúsculas
    const tipoLower = tipo.toLowerCase();

    // Manejamos las diferentes unidades de tiempo
    if (tipoLower.includes('hora')) {
        return `${duracion} ${duracion == 1 ? 'hora' : 'horas'}`;
    } 
    else if (tipoLower.includes('día') || tipoLower.includes('dia')) {
        return `${duracion} ${duracion == 1 ? 'día' : 'días'}`;
    } 
    else if (tipoLower.includes('semana')) {
        return `${duracion} ${duracion == 1 ? 'semana' : 'semanas'}`;
    } 
    else if (tipoLower.includes('mes')) {
        return `${duracion} ${duracion == 1 ? 'mes' : 'meses'}`;
    } 
    else {
        // Si no es un tipo conocido, simplemente mostramos el número y el tipo original
        return `${duracion} ${tipo}${duracion > 1 ? 's' : ''}`;
    }
}

function updateReservaEstadoEnDOM(id_reserva, nuevo_estado) {
    const reservaElemento = document.querySelector(`.reserva[data-id="${id_reserva}"]`);
    if (reservaElemento) {
        // Actualizar el texto del estado
        const estadoElemento = reservaElemento.querySelector('.estado-reserva');
        if (estadoElemento) {
            estadoElemento.textContent = nuevo_estado;
        }

        // Actualizar la clase del contenedor para reflejar el nuevo estado visualmente
        reservaElemento.classList.remove('por_confirmar', 'activa', 'terminada');
        reservaElemento.classList.add(nuevo_estado.toLowerCase());

        // Opcional: Actualizar los botones si el estado cambia
        const buttonsContainer = reservaElemento.querySelector('.buttons');
        if (buttonsContainer) {
            buttonsContainer.innerHTML = generateButtons({ rese_estado: nuevo_estado, id_reserva });
        }
    }
}

function mostrarDetalles(id_reserva) {
    const reserva = window.reservasData.find(r => String(r.id_reserva) === String(id_reserva));

    if (reserva) {

        const detalleContainer = document.getElementById('detalles-contenido');

        detalleContainer.innerHTML = `
            <h3>Detalles de la Reserva</h3>
            <p><strong>ID de Reserva:</strong> ${reserva.id_reserva}</p>
            <p><strong>ID de Usuario:</strong> ${reserva.id_usuario}</p>
            <p><strong>Título:</strong> ${reserva.rese_titulo}</p>
            <p><strong>Producto:</strong> ${reserva.produNombre}</p>
            <p><strong>Fecha de Compra:</strong> ${reserva.rese_fechaCompra} ${reserva.rese_horaCompra}</p>
            <p><strong>Fecha de Entrada:</strong> ${reserva.rese_fechaIniTex} ${reserva.rese_horaIni}</p>
            <p><strong>Fecha de Salida:</strong> ${reserva.rese_fechaFinTex} ${reserva.rese_horaFin}</p>
            <p><strong>Tipo de Reserva:</strong> ${reserva.rese_tipo}</p>
            <p><strong>Duración:</strong> ${formatDuration(reserva.rese_duracion, reserva.rese_tipo)}</p>
            <p><strong>Cantidad de Personas:</strong> ${reserva.rese_numeroPerson}</p>
            <p><strong>Estado:</strong> ${reserva.rese_estado}</p>
            <p><strong>Precio Unitario:</strong> $${reserva.rese_precioBase}</p>
            <p><strong>Total Pagado:</strong> $${reserva.rese_precioFinal}</p>
        `;

        document.getElementById('reserva-detalles').classList.add('visible');  // Mostrar el cuadro de detalles

    } else {

        console.error(`No se encontró la reserva con ID: ${id_reserva}`);
        console.log('Reservas disponibles:', window.reservasData);

    }
}

function cerrarDetalles() {
    document.getElementById('reserva-detalles').classList.remove('visible');  // Ocultar el cuadro de detalles
}

document.getElementById('cerrar-detalles').addEventListener('click', cerrarDetalles);

document.addEventListener('DOMContentLoaded', () => {

    fetchReservas();  

    setInterval(actualizarReservasAutomaticamente, 30000);
    
});
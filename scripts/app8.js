document.addEventListener('DOMContentLoaded', function () {
    cargarFacturas();

    document.getElementById('aplicarFiltros').addEventListener('click', aplicarFiltros);
    document.getElementById('resetFiltros').addEventListener('click', cargarFacturas);
});

let facturasData = [];  // Almacena las facturas cargadas para acceder rápidamente

// Función para cargar todas las facturas
function cargarFacturas() {
    const FormCargarFacturasGene = new FormData();
    FormCargarFacturasGene.append('accion_facturas', 'obtener_facturas');

    fetch('https://plataforma.the-bizclub.com/consultasDB.php', {
        method: 'POST',
        body: FormCargarFacturasGene
    })
    .then(response => response.json())
    .then(data => {
        facturasData = data.facturas;  // Guardamos las facturas para referencia
        mostrarFacturas(data.facturas);
    })
    .catch(error => console.error('Error al cargar facturas:', error));
}

// Mostrar la lista de facturas
function mostrarFacturas(facturas) {
    const lista = document.getElementById('listaFacturas');
    lista.innerHTML = '';  // Limpiar la lista actual

    facturas.forEach((factura, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${factura.facturaCodigo}</strong> - ${factura.user_nombre} - ${factura.produNombre} - ${factura.montoFactuTotal}€</span>
            <button data-index="${index}" class="ver-detalles-btn">Ver Detalles</button>
        `;
        lista.appendChild(li);
    });

    // Añadir event listeners a los botones después de que los elementos estén en el DOM
    document.querySelectorAll('.ver-detalles-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            verDetalles(facturasData[index]);
        });
    });
}

// Ver detalles de una factura en un modal
function verDetalles(factura) {
    const detallesDiv = document.getElementById('detallesFactura');

    detallesDiv.innerHTML = `
        <p><strong>Código:</strong> ${factura.facturaCodigo}</p>
        <p><strong>Serie:</strong> ${factura.facturaSerie}</p>
        <p><strong>Fecha:</strong> ${factura.fechaFactura}</p>
        <p><strong>Hora:</strong> ${factura.horaFactura}</p>
        <p><strong>Estado:</strong> ${factura.estadoFactura}</p>
        <p><strong>Producto:</strong> ${factura.produNombre}</p>
        <p><strong>Usuario:</strong> ${factura.user_nombre} ${factura.user_apellido}</p>
        <p><strong>Precio Base:</strong> ${factura.precioFactura}€</p>
        <p><strong>Subtotal:</strong> ${factura.factuSubTotal}€</p>
        <p><strong>IVA:</strong> ${factura.ivaFactura}%</p>
        <p><strong>Descuento:</strong> ${factura.descuFactura}%</p>
        <p><strong>Total:</strong> ${factura.montoFactuTotal}€</p>
    `;

    document.getElementById('facturaModal').style.display = 'flex';
}

// Cerrar el modal
function cerrarModal() {
    document.getElementById('facturaModal').style.display = 'none';
}

// Aplicar filtros a la lista de facturas
function aplicarFiltros() {
    const fecha = document.getElementById('filtroFecha').value;
    const serie = document.getElementById('filtroSerie').value;
    const busqueda = document.getElementById('busqueda').value;

    const formAplicarFiltro = new FormData();
    formAplicarFiltro.append('accion_facturas', 'filtrar_facturas');
    formAplicarFiltro.append('fechaFactura', fecha);
    formAplicarFiltro.append('facturaSerie', serie);
    formAplicarFiltro.append('busqueda', busqueda);

    fetch('https://plataforma.the-bizclub.com/consultasDB.php', {
        method: 'POST',
        body: formAplicarFiltro
    })
    .then(response => response.json())
    .then(data => {
        facturasData = data.facturas;  // Actualizamos el almacenamiento local
        mostrarFacturas(data.facturas);
    })
    .catch(error => console.error('Error al filtrar facturas:', error));
}

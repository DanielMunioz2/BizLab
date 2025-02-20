document.addEventListener('DOMContentLoaded', function () {
    cargarUsuarios();

    document.getElementById('aplicarFiltrosUsuarios').addEventListener('click', aplicarFiltrosUsuarios);
    document.getElementById('resetFiltrosUsuarios').addEventListener('click', cargarUsuarios);
});

// Cargar todos los usuarios
function cargarUsuarios() {
    const formData = new FormData();
    formData.append('accion_usuarios', 'obtener_usuarios');

    fetch('https://plataforma.the-bizclub.com/consultasDB.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => mostrarUsuarios(data.usuarios))
    .catch(error => console.error('Error al cargar usuarios:', error));
}

// Mostrar la lista de usuarios
function mostrarUsuarios(usuarios) {
    const lista = document.getElementById('listaUsuarios');
    lista.innerHTML = '';

    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${usuario.user_nombre} ${usuario.user_apellido}</strong> - ${usuario.user_correo}</span>
            <button 
                data-nombre="${usuario.user_nombre}"
                data-apellido="${usuario.user_apellido}"
                data-correo="${usuario.user_correo}"
                data-telefono="${usuario.user_telefono}"
                data-celular="${usuario.user_celular}"
                data-documento="${usuario.user_documento}"
                data-fechaNacimiento="${usuario.user_fNacimiento}"
                data-genero="${usuario.user_genero}"
                data-direccion="${usuario.user_direc}"
                data-ciudad="${usuario.user_ciudad}"
                data-rol="${usuario.user_rol}"
                data-estado="${usuario.user_estado}"
                data-fechaUnion="${usuario.user_fechaU}"
                data-horaUnion="${usuario.user_horaU}"
                data-cargo="${usuario.user_cargo}"
                data-empresa="${usuario.user_empresa}"
                data-empresaNit="${usuario.user_empresaNit}"
                onclick="verDetallesUsuario(this)">Ver Detalles</button>
        `;
        lista.appendChild(li);
    });
}

// Ver detalles del usuario en un modal
function verDetallesUsuario(button) {
    // Obtener los datos del usuario desde los atributos 'data-*' del botón
    const nombre = button.getAttribute('data-nombre');
    const apellido = button.getAttribute('data-apellido');
    const correo = button.getAttribute('data-correo');
    const telefono = button.getAttribute('data-telefono');
    const celular = button.getAttribute('data-celular');
    const documento = button.getAttribute('data-documento');
    const fechaNacimiento = button.getAttribute('data-fechaNacimiento');
    const genero = button.getAttribute('data-genero');
    const direccion = button.getAttribute('data-direccion');
    const ciudad = button.getAttribute('data-ciudad');
    const rol = button.getAttribute('data-rol');
    const estado = button.getAttribute('data-estado');
    const fechaUnion = button.getAttribute('data-fechaUnion');
    const horaUnion = button.getAttribute('data-horaUnion');
    const cargo = button.getAttribute('data-cargo');
    const empresa = button.getAttribute('data-empresa');
    const empresaNit = button.getAttribute('data-empresaNit');

    // Mostrar los detalles en el modal
    const detallesDiv = document.getElementById('detallesUsuario');

    detallesDiv.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Celular:</strong> ${celular}</p>
        <p><strong>Documento:</strong> ${documento}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${fechaNacimiento}</p>
        <p><strong>Género:</strong> ${genero}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>Ciudad:</strong> ${ciudad}</p>
        <p><strong>Rol:</strong> ${rol}</p>
        <p><strong>Estado:</strong> ${estado}</p>
        <p><strong>Fecha de Unión:</strong> ${fechaUnion}</p>
        <p><strong>Hora de Unión:</strong> ${horaUnion}</p>
        <p><strong>Cargo:</strong> ${cargo}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>NIT Empresa:</strong> ${empresaNit}</p>
    `;

    // Asegurarse de que el modal reciba la clase 'show' para ser visible
    const modal = document.getElementById('usuarioModal');
    modal.classList.add('show');
}

// Cerrar el modal de detalles de usuario
function cerrarModalUsuario() {
    const modal = document.getElementById('usuarioModal');
    modal.classList.remove('show');
}

// Aplicar filtros para la lista de usuarios
function aplicarFiltrosUsuarios() {
    const nombre = document.getElementById('filtroNombre').value;
    const fechaUnion = document.getElementById('filtroFechaUnion').value;

    const formData = new FormData();
    formData.append('accion_usuarios', 'filtrar_usuarios');
    formData.append('nombre', nombre);
    formData.append('fecha_union', fechaUnion);

    fetch('https://plataforma.the-bizclub.com/consultasDB.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => mostrarUsuarios(data.usuarios))
    .catch(error => console.error('Error al filtrar usuarios:', error));
}
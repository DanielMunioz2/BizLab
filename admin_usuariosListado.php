<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    session_start();
    
    if(!isset($_SESSION["user_id"])){
        header('Location: https://plataforma.the-bizclub.com/inicioSesion.php');
    }
    
    if(isset($_SESSION["user_id"]) && $_SESSION["user_tipo"] != "Administrador"){
        header('Location: https://plataforma.the-bizclub.com/index.php');
    }
    
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Administra los usuarios de BizClub, una empresa de coworking en Cúcuta, Norte de Santander - Colombia">
    <meta name="keywords" content="HTML, CSS, JavaScript, PHP, SQL, Administración de Usuarios">
    <meta name="author" content="Daniel Muñoz">

    <title>Listado de Usuarios - Administración BizClub</title>

    <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
    <link rel="stylesheet" href="estilos/resetear.css">
    <link rel="stylesheet" href="estilos/admin_usuariosListado.css">

</head>
<body>

    <!-- Botón de Volver -->
    <a href="https://plataforma.the-bizclub.com/administracion.php" id="volverBtn">Volver a Administración BizClub</a>

    <h1>Administrador de Usuarios</h1>

    <!-- Filtros -->
    <div class="filtros-container">
        <label for="filtroNombre">Nombre o Apellido:</label>
        <input type="text" id="filtroNombre" placeholder="Ej: Juan Pérez">

        <label for="filtroFechaUnion">Fecha de Unión:</label>
        <input type="date" id="filtroFechaUnion">

        <button id="aplicarFiltrosUsuarios">Aplicar Filtros</button>
        <button id="resetFiltrosUsuarios">Resetear Filtros</button>
    </div>

    <!-- Lista de Usuarios -->
    <ul id="listaUsuarios"></ul>

    <!-- Modal para Detalles de Usuario -->
    <div id="usuarioModal">
        <div class="modal-content">
            <h2>Detalles del Usuario</h2>
            <div id="detallesUsuario"></div>
            <button onclick="cerrarModalUsuario()">Cerrar</button>
        </div>
    </div>

    <script src="scripts/app9.js"></script>

</body>
</html>

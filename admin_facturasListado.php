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
    <meta name="description" content="Gestión de clientes y facturación para BizClub, coworking en Cúcuta, Norte de Santander - Colombia">
    <meta name="keywords" content="HTML, CSS, JavaScript, PHP, SQL, API">
    <meta name="author" content="Daniel Muñoz">

    <title>Listado de Facturas - Administración BizClub</title>

    <link rel="shortcut icon" type="image/x-icon" href="images/favicon_bizclub.svg">
    <link rel="stylesheet" href="estilos/resetear.css">
    <link rel="stylesheet" href="estilos/admin_facturasListado.css">
    
</head>
<body>

    <!-- Botón de Volver -->
    <a href="https://plataforma.the-bizclub.com/administracion.php" id="volverBtn">Volver a Administración BizClub</a>

    <h1>Administrador de Facturas</h1>

    <!-- Filtros -->
    <div id="filtros-container">
        <div>
            <label for="filtroFecha">Fecha:</label>
            <input type="date" id="filtroFecha">
        </div>

        <div>
            <label for="filtroSerie">Serie:</label>
            <input type="text" id="filtroSerie" placeholder="Ej: enero-2025">
        </div>

        <div>
            <label for="busqueda">Buscar (Usuario o Producto):</label>
            <input type="text" id="busqueda" placeholder="Nombre de usuario o producto">
        </div>

        <div>
            <button id="aplicarFiltros">Aplicar Filtros</button>
            <button id="resetFiltros">Resetear Filtros</button>
        </div>
    </div>

    <!-- Lista de Facturas -->
    <ul id="listaFacturas"></ul>

    <!-- Modal para Detalles de Factura -->
    <div id="facturaModal">
        <div class="modal-content">
            <h2>Detalles de la Factura</h2>
            <div id="detallesFactura"></div>
            <button onclick="cerrarModal()">Cerrar</button>
        </div>
    </div>

    <script src="scripts/app8.js"></script>
</body>
</html>

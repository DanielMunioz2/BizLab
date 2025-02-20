<!DOCTYPE html>
<html lang="es">
<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page for client management and appointment scheduling in the coworking company BizClub, located in Cúcuta, Norte de Santander - Colombia">
    <meta name="keywords" content="HTML, CSS, JavaScript, PHP, SQL, API">
    <meta name="author" content="Daniel Muñoz">

    <title>Recuperar Contraseña - BizClub</title>

    <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
    <link rel="stylesheet" href="estilos/resetear.css">
    <link rel="stylesheet" href="estilos/user_recuperarContrasenia.css">

</head>
<body class="body">
    <a href="inicioSesion.php" class="back-button">Volver al Inicio de Sesión</a>
    <main class="main">

        <div class="container">
            <div id="email-panel">
                <h2>Recuperar Contraseña</h2>
                <input type="email" id="email" placeholder="Introduce tu correo" required>
                <button id="send-code">Enviar Código</button>
            </div>
            
            <div id="code-panel" style="display: none;">
                <h2>Verifica tu correo</h2>
                <input type="text" id="code" placeholder="Introduce el código recibido" required>
                <button id="verify-code">Verificar</button>
            </div>
            
            <div id="password-panel" style="display: none;">
                <h2>Restablecer Contraseña</h2>
                <input type="password" id="new-password" placeholder="Nueva contraseña" required>
                <input type="password" id="confirm-password" placeholder="Confirmar contraseña" required>
                <button id="change-password">Cambiar Contraseña</button>
            </div>
        </div>
    </main>
    <script src="scripts\app11.js"></script>    
</body>
</html>

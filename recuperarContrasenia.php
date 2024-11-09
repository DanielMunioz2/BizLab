<!DOCTYPE html>
<html lang="en" class="recuvaContraHTML">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recupera tu Contraseña</title>
        <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
        <link rel="stylesheet" href="estilos/recuperarContrasenia.css">
    </head>
    <body class="body">
        <main class="main">
            <div>
                <form action="" id="formCorreoRecuContra" name="formCorreoRecuContra">
                    <span class="spanDigiteCorreo">Digite el correo asociado a su cuenta</span>
                    <div class="divInputCorreoRecuContra">
                        <input maxlength="40" class="correoExisRecuInput" type="text">
                        <span class="spanErr spanErrCorreo1">#</span>
                    </div>
                    <div class="divBotones">
                        <button class="btnCancelar btnCan1">Cancelar</button>
                        <button class="btnEnviar btnEnv1" disabled>Enviar Código</button>
                    </div>
                </form>
                <div class="contenedorForm2 conteForm2">
                    <form action="" id="formCod" name="fomrCod">
                        <div>
                            <svg class="iconCorreo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230.88 151.94"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M115.47.06H222c.5,0,1.28-.28,1.46.26s-.63.76-1,1.08Q214.24,8,206,14.52c-4.9,3.88-9.82,7.75-14.71,11.63-4.54,3.59-9,7.21-13.58,10.8S168.6,44.1,164.07,47.7c-5.24,4.15-10.46,8.34-15.7,12.5C143.6,64,138.81,67.72,134,71.5q-8.7,6.87-17.39,13.78c-1.24,1-1.21,1-2.6-.14q-11.2-8.91-22.44-17.81L59.44,41.82Q45.72,31,32,20.09L7.89,1C7.67.79,7.25.67,7.38.31s.52-.2.81-.22.67,0,1,0H115.47Z"/><path d="M.26,151.68c1.1-.72,2-1.35,3-2L25,135.85l24.34-15.49L77,102.74C82.89,99,88.77,95.28,94.63,91.52a1,1,0,0,1,1.4.13q6.34,6.06,12.71,12.1c2.07,2,4.16,3.92,6.2,5.92.5.48.76.16,1.08-.15l9.47-9.06c3.06-2.93,6.14-5.84,9.17-8.79a1.14,1.14,0,0,1,1.67-.12c4.66,3,9.35,6,14,9l18.3,11.63,15.2,9.74c4.45,2.83,8.92,5.63,13.37,8.47s9.06,5.79,13.6,8.68,9.14,5.8,13.7,8.7c1.82,1.15,3.62,2.32,5.43,3.49.18.12.49.21.43.5s-.38.2-.6.22-.61,0-.91,0H60.45l-58.53,0A3.24,3.24,0,0,1,.26,151.68Z"/><path d="M230.83,71.07q0,34.67,0,69.32c0,.48.23,1.14-.23,1.41s-.89-.32-1.27-.6c-4.43-3.22-8.83-6.48-13.25-9.72-4.74-3.48-9.5-6.93-14.24-10.41q-11.46-8.41-22.9-16.85L158.29,89.05c-3.61-2.64-7.21-5.29-10.84-7.89-.82-.58-.78-.94-.09-1.6q9.93-9.45,19.82-19L176,52.17l19.22-18.4,14.07-13.44,13.48-12.9q3.51-3.33,7-6.65c.22-.21.42-.64.8-.45s.21.6.21.92c0,5.65,0,11.3,0,17Z"/><path d="M.08,71.14q0-34.66,0-69.33C.09,1.36-.15.72.3.51s.77.41,1.09.71Q12.7,12,24,22.82L47.19,45,74.67,71.26l8.61,8.22c1,.93,1,1-.06,1.71l-18,13.27q-12.27,9-24.55,18L17.76,129.24q-8,5.85-15.94,11.7c-.46.34-1,1.06-1.5.8s-.23-1.11-.23-1.69Q.08,105.6.08,71.14Z"/></g></g></svg>
                            <span class="spanCorreo1">Se ha enviado un correo a:</span>
                            <span class="spanCorreo2">#########</span>
                        </div>
                        <div>
                            <span>Introduzca el código de acceso</span>
                            <input class="codigoInput" type="text" maxlength = "10">
                            <span class="spanErr spanErrCodigo">#</span>
                            <div>
                                <button class="btnCambiarContra1 btnCodiVerif" disabled>Verificar Correo</button>
                            </div>
                            <span class="spanReenviar">¿No recibió el código? <a class="reenviarA" disabled>Reenvíalo Aquí</a></span>
                        </div>
                    </form>
                    <form action="recuperarContrasenia2.php" method="post" id="formCambioPassConfir" name="formCambioPassConfir">
                        <input class="esend" type="hidden" name="esend">
                    </form>
                </div>
            </div>
            <div class="divImg"><div></div></div>
        </main>
        <footer class="footer">
            <div class="footer_contenido">
                <div class="footer_redesSocialesContent">
                    
                </div>
                <svg class="footer_logoBizSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.43 39.84"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M72.55,19.72c-.51-.49-.49-.79-.1-1.27a9.71,9.71,0,0,0,1.65-3A11.54,11.54,0,0,0,63.13,0Q41.55,0,19.94,0a19.89,19.89,0,0,0-.68,39.76c7.53.15,15.07,0,22.61,0v0H64.24a12.61,12.61,0,0,0,3.91-.44C76.92,36.52,79.26,26.12,72.55,19.72ZM65.42,33.37a13.3,13.3,0,0,1-1.55.08H20.32A13.18,13.18,0,0,1,8.84,27.68,12.85,12.85,0,0,1,7.69,14.15C10,9.38,13.91,6.54,19.22,6.49c14.72-.15,29.44-.07,44.16,0a5.05,5.05,0,0,1,5,5.09,5.13,5.13,0,0,1-4.91,5.18c-.4,0-.8,0-1.2,0l-38.53,0A3.21,3.21,0,0,0,20.39,20a3.26,3.26,0,0,0,3.42,3.23q20.52,0,41-.06a5.11,5.11,0,0,1,.57,10.2Z"/></g></g></svg>
                <div class="footer_copyrightContent">
                    Copyright​ © 2024 BizLab SAS 
                </div>
            </div>
        </footer>
    </body>
    <script src="scripts\app1.js"></script>
</html>
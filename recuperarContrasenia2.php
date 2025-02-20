<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    require_once("conexion.php");

    if(isset($_POST["esend"])){
        $correo = $_POST["esend"];
    }else{
        if(isset($_POST["contra1"])){
            $contra1 = $_POST["contra1"];
            $correo = $_POST["correo"];
    
            $conn->query("UPDATE `soqkyjmy_bizclubPlataformaDb`.`usuarios` SET `usuarios`.`user_contrasenia` = '".$contra1."' WHERE `soqkyjmy_bizclubPlataformaDb`.`usuarios`.`user_correo` = '".$correo."';");
    
            $row =  $conn->insert_id;

            sleep(1);
    
            header("location: inicioSesion.php");
    
        }else{
            header("location:inicioSesion.php");
        }
    }

    

?>

<!DOCTYPE html>
<html lang="en" class="recuvaContra2HTML">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Contraseña</title>
        <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
        <link rel="stylesheet" href="estilos/recuperarContrasenia2.css">
    </head>
    <body class="body">
        <main class="main">
            <div class="contentForm">
                <form action="recuperarContrasenia2.php" method="post" id="formCambiarContra" name="formCambiarContra">
                    <span class="spanDigiteCorreo">Digite la nueva contraseña</span>
                    <div class="div1">
                        <svg title="Mostrar Contraseña" class="ojoIconA ojoAbierto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.35 290.58"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M479.67,121.22c-32-35-68.21-64.81-110-87.45C333.28,14.07,294.8,1.34,253,.11a235.2,235.2,0,0,0-84.86,12.65C105.44,34.53,54.21,73.18,9.93,121.67c-13.9,15.21-12.89,32.55,1,48a340,340,0,0,0,25.94,26c31.72,28.3,65.91,53,104.54,71.12C184.52,287,229.67,294.82,277,288.38c37.43-5.11,71.65-19.34,103.9-38.57a434.87,434.87,0,0,0,76.95-58.48c12.25-11.63,25.64-22.61,31.55-39.43V138.53A43.36,43.36,0,0,0,479.67,121.22Zm-24,28.68c-18.67,21.53-40.56,39.43-63.55,56-26.17,18.9-54,34.64-85.07,44.29-20.33,6.32-41.06,9.88-61.2,9.41-33.32.47-63.5-7.58-92.38-21-42-19.56-78.45-46.93-110.88-79.81-3.12-3.17-5.8-6.77-9-9.91-2.75-2.75-2.41-4.93-.06-7.77,11-13.31,23.71-24.83,36.76-36C101.19,78.74,135.42,58,173.47,43.65a200.39,200.39,0,0,1,98-11.19c45.16,5.89,84.4,26,121.22,51.55a369.18,369.18,0,0,1,62.7,55.56C459.82,144.47,459.89,145,455.67,149.9Z"/><path d="M245.36,51.38c-52.56,0-93.71,41.3-94.3,93.62-.55,49,39.4,93.67,94.2,93.74,54.1.07,93.85-44.88,93.58-93.4C338.56,93.21,297.25,51.39,245.36,51.38Zm0,156.92c-31.33.66-63.76-26-63.76-63.15,0-34.78,28.58-63.39,63.61-63.42s62.69,28.13,62.73,63.34C308,180.76,280.78,207.55,245.36,208.3Z"/></g></g></svg>
                        <svg title="Ocultar Contraseña" class="ojoIconC2 ojoCerrado" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.35 290.58"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M479.67,121.22C452,90.93,421.24,64.6,386.4,43.4L364.05,65.75c9.73,5.64,19.24,11.78,28.6,18.26a369.18,369.18,0,0,1,62.7,55.56c4.47,4.9,4.54,5.46.32,10.33-18.67,21.53-40.56,39.43-63.55,56-26.17,18.9-54,34.64-85.07,44.29-20.33,6.32-41.06,9.88-61.2,9.41a197.84,197.84,0,0,1-65.41-10.28l-23.91,23.91C195,288.6,235.16,294.07,277,288.38c37.43-5.11,71.65-19.34,103.9-38.57a434.87,434.87,0,0,0,76.95-58.48c12.25-11.63,25.64-22.61,31.55-39.43V138.53A43.36,43.36,0,0,0,479.67,121.22Zm-446,27.68c-2.75-2.75-2.41-4.93-.06-7.77,11-13.31,23.71-24.83,36.76-36C101.19,78.74,135.42,58,173.47,43.65a200.39,200.39,0,0,1,98-11.19,215.8,215.8,0,0,1,37.75,8.47l24.08-24.08C307.77,7,281.14.94,253,.11a235.2,235.2,0,0,0-84.86,12.65C105.44,34.53,54.21,73.18,9.93,121.67c-13.9,15.21-12.89,32.55,1,48a340,340,0,0,0,25.94,26c21,18.76,43.15,35.94,66.94,50.68l22.07-22.07c-30.66-17.78-58.18-39.94-83.3-65.41C39.47,155.64,36.79,152,33.64,148.9Z"/><path d="M328.12,101.68,304.78,125a64.9,64.9,0,0,1,3.16,20c.05,35.69-27.16,62.48-62.58,63.23a58.29,58.29,0,0,1-20.5-3.36l-23.28,23.28a94.71,94.71,0,0,0,43.68,10.52c54.1.07,93.85-44.88,93.58-93.4A95.31,95.31,0,0,0,328.12,101.68Zm-82.91-20a62.83,62.83,0,0,1,20,3.2l23.14-23.14a92.9,92.9,0,0,0-43-10.41c-52.56,0-93.71,41.3-94.3,93.62a91.34,91.34,0,0,0,10.58,43.47l23.28-23.28a61.39,61.39,0,0,1-3.32-20C181.59,110.37,210.18,81.76,245.21,81.73Z"/><path d="M373.9,36.1,142.69,267.31c-.42-.18-.85-.38-1.27-.58q-12.91-6.06-25.18-13.06l22.4-22.4,52.75-52.75,87.23-87.23,21.9-21.9L323.8,46.11l23.43-23.43q11.36,5.07,22.43,11.09C371.08,34.54,372.5,35.32,373.9,36.1Z"/></g></g></svg>
                        <input maxlength="20" class="contraNewInput" type="password" name="contra1">
                    </div>
                    <div class="div2">
                        <input maxlength="20" class="contraNewInputConfir" type="password" name="contra2">
                        <span class="spanErr spanErrCorreo1">#</span>
                    </div>
                    <div class="divBotones">
                        <button class="btnCancelar btnCan1">Cancelar</button>
                        <button class="btnEnviar btnEnv1">Cambiar Contraseña</button>
                    </div>
                    <input type="hidden" value="<?php echo $correo?>" name="correo">
                </form>
            </div>
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
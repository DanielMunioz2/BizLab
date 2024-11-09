<?php

    require("conexion.php");

    session_start();
    
    date_default_timezone_set('America/Bogota');

    if(!isset($_POST["userVerifi"])){
        header("location:index.php");
    }
    
    if(isset($_POST["correoUser"])){
        $correo = isset($_POST["correoUser"]) ? $conn->real_escape_string($_POST["correoUser"]) : null;
        $contraseña = isset($_POST["contraseñaUser"]) ? $conn->real_escape_string($_POST["contraseñaUser"]) : null;

        if($correo!==null && $contraseña!==null){
            $queryUser = "SELECT * FROM `gdrfkbmy_bizlabDB`.`usuarios` 
            WHERE `usuarios`.`user_correo` = '".$correo."';";

            $resultadoUser = $conn->query($queryUser);

            $row = $resultadoUser -> fetch_assoc();

            $datos = [0,0];

            if($row!==null){
                if($row["user_contrasenia"]==$contraseña){
                    $_SESSION['iniciado']=$row['id_usuario'];
                    $_SESSION['tipoUsuario']=$row['user_rol'];
                    $_SESSION["stdProd"]=0;
                    $datos[0] = 1; // El usuario existe y la contraseña es Correcta
                    if($row['user_rol']=="Administrador"){
                        $datos[1] = 1;
                    }else{
                        if($row['user_rol']=="Usuario" || $row['user_rol']=="Miembro"){
                            $datos[1] = 2;
                        }
                    }
                }else{
                    $datos[0] = 2; //El usuario existe y la contraseña es Incorrecta
                };
            }else{
                $datos[0] = 3; //El usuario no existe
            }
        
            echo json_encode($datos, JSON_UNESCAPED_UNICODE);

        }
    }

    if(isset($_POST["documentoExistencia"])){
        $documento = isset($_POST["documentoExistencia"]) ? $conn->real_escape_string($_POST["documentoExistencia"]) : null;
        
        if($documento!=null){
            $queryDocumento = 
            "SELECT `user_documento` FROM `gdrfkbmy_bizlabDB`.`usuarios`
            WHERE `gdrfkbmy_bizlabDB`.`usuarios`.`user_documento` = ".$documento.";";

            $resultadoDocumento = $conn->query($queryDocumento);

            $row = $resultadoDocumento -> fetch_assoc();

            if($row == null){
                $respuesta = false;
            }else{
                $respuesta = true;
            }

            echo json_encode($respuesta, JSON_UNESCAPED_UNICODE);
        }

    }

    if(isset($_POST["telefExistencia"])){
        $telef = isset($_POST["telefExistencia"]) ? $conn->real_escape_string($_POST["telefExistencia"]) : null;
    
        if($telef!=null){
            $queryTelefonoExi = 
            "SELECT `user_telefono` FROM `gdrfkbmy_bizlabDB`.`usuarios`
            WHERE `gdrfkbmy_bizlabDB`.`usuarios`.`user_telefono` = ".$telef.";";

            $resultadoTelefono = $conn->query($queryTelefonoExi);

            $row = $resultadoTelefono -> fetch_assoc();

            if($row == null){
                $respuesta = false;
            }else{
                $respuesta = true;
            }

            echo json_encode($respuesta, JSON_UNESCAPED_UNICODE);
        }
    }

    if(isset($_POST["correoExistencia"])){
        $correoMiembroExi = isset($_POST["correoExistencia"]) ? $conn->real_escape_string($_POST["correoExistencia"]) : null;
    
        if($correoMiembroExi!=null){
            $queryCorreoExi = 
            "SELECT `user_correo` FROM `gdrfkbmy_bizlabDB`.`usuarios`
            WHERE `gdrfkbmy_bizlabDB`.`usuarios`.`user_correo` = '".$correoMiembroExi."';";

            $resultadoCorreo = $conn->query($queryCorreoExi);

            $row = $resultadoCorreo -> fetch_assoc();

            if($row == null){
                $respuesta = false;
            }else{
                $respuesta = true;
            }

            echo json_encode($respuesta, JSON_UNESCAPED_UNICODE);
        }
    }

    if(isset($_POST["correoExisteAdmin"])){
        $correoMiembroExi = isset($_POST["correoExisteAdmin"]) ? $conn->real_escape_string($_POST["correoExisteAdmin"]) : null;
    
        if($correoMiembroExi!=null){
            $queryCorreoExi = 
            "SELECT `user_correo` FROM `gdrfkbmy_bizlabDB`.`usuarios`
            WHERE `gdrfkbmy_bizlabDB`.`usuarios`.`user_correo` = '".$correoMiembroExi."';";

            $resultadoCorreo = $conn->query($queryCorreoExi);

            $row = $resultadoCorreo -> fetch_assoc();

            if($row == null){
                $respuesta = false;
            }else{
                $respuesta = true;
            }

            echo json_encode($respuesta, JSON_UNESCAPED_UNICODE);
        }
    }

    if(isset($_POST["correoRecuContra"])){
        $correoMiembroExi = isset($_POST["correoRecuContra"]) ? $conn->real_escape_string($_POST["correoRecuContra"]) : null;
    
        if($correoMiembroExi!=null){
            $queryCorreoExi = 
            "SELECT `user_correo` FROM `gdrfkbmy_bizlabDB`.`usuarios`
            WHERE `gdrfkbmy_bizlabDB`.`usuarios`.`user_correo` = '".$correoMiembroExi."';";

            $resultadoCorreo = $conn->query($queryCorreoExi);

            $row = $resultadoCorreo -> fetch_assoc();

            if($row == null){
                $respuesta = false;
            }else{
                $respuesta = true;
            }

            echo json_encode($respuesta, JSON_UNESCAPED_UNICODE);
        }
    }
    
    if(isset($_POST["fechaVerificar"])){

        date_default_timezone_set('America/Bogota');

        $fechaActual = date("Y");
        $fechaActual2 = date("Y-m-d");
        $fechaActual2 = substr($fechaActual2, -5);
        $mensaje = "";


        $fechaNacimiento = isset($_POST["fechaVerificar"]) ? $conn->real_escape_string($_POST["fechaVerificar"]) : null;
        $mesDiaN = substr($fechaNacimiento, -5);
        if($fechaNacimiento!=null){
            $fechaNacimiento2 = substr($fechaNacimiento, 0, 4); 
            $añosUsuario = (intval($fechaActual)-intval($fechaNacimiento2));
            if($fechaActual2!=$mesDiaN){
                $añosUsuario--;
            }
            if($añosUsuario <= 16){
                $mensaje = false;
            }else{
                $mensaje = true;
            }
            echo json_encode($mensaje, JSON_UNESCAPED_UNICODE);
        }
        
    }
    
    if(isset($_POST["codigoAcceso"])){
        $codigoAcce = isset($_POST["codigoAcceso"]) ? $conn->real_escape_string($_POST["codigoAcceso"]) : null;
        $estado = "";
        $dato = "";
        $row = "";

        if($codigoAcce!=null){
            $queryCodAdmi = "SELECT * FROM `gdrfkbmy_bizlabDB`.`codigoadmin` 
            WHERE `codigoadmin`.`codigoAdmin` = '".$codigoAcce."';";

            $resultadoAdmiCode = $conn->query($queryCodAdmi);
            $row = $resultadoAdmiCode -> fetch_assoc();

            if($row!=null){
                $dato = $row["codigoAdmin"];
            }else{
                $dato = null;
            }

        }


        echo json_encode($dato, JSON_UNESCAPED_UNICODE);
    }

    if(isset($_POST["nombreMiembroR"])){

        $nombre = $_POST["nombreMiembroR"];
        $apellido = $_POST["apellidoMiembro"];
        $documento = $_POST["documentoMiembro"];
        $fechaNacimi = $_POST["fechaNMiembro"];
        $telefonoMiembro = $_POST["telefonoMiembro"];
        $direccMiembro = $_POST["direccMiembro"];
        $rolMiembro = $_POST["rolMiembro"];

        if($rolMiembro == "Administrador"){
            $empresaMiembro = "";
            $nitMiembro = "";
        }else if($rolMiembro == "Usuario"){
            $empresaMiembro = $_POST["empresaMiembro"];
            $nitMiembro = $_POST["nitMiembro"];
        }
        $correoMiembro = $_POST["correoMiembro"];
        $contraseniaMiembro = $_POST["contraseniaMiembro"];

        $fechaActual = date("Y-m-d");
        $horaActual = date("h:i:s");

        $queryRegisMiembro =
        "INSERT INTO `gdrfkbmy_bizlabDB`.`usuarios`(
            `user_nombre`, 
            `user_apellido`, 
            `user_correo`, 
            `user_contrasenia`, 
            `user_telefono`,
            `user_celular`, 
            `user_documento`, 
            `user_fNacimiento`, 
            `user_direc`, 
            `user_rol`, 
            `user_estado`,
            `user_imagen`,
            `user_fechaU`,
            `user_horaU`,
            `user_empresa`, 
            `user_empresaNit`)
        VALUES (
            '$nombre', 
            '$apellido',
            '$correoMiembro',
            '$contraseniaMiembro', 
            0,
            $telefonoMiembro, 
            $documento, 
            '$fechaNacimi', 
            '$direccMiembro', 
            '$rolMiembro',
            'Activo',
            'userDefaultProfileMan.webp',
            '$fechaActual',
            '$horaActual',
            '$empresaMiembro', 
            '$nitMiembro');";

        $conn->query($queryRegisMiembro);

        $row =  $conn->insert_id;

        echo json_encode($row, JSON_UNESCAPED_UNICODE);

    }

?>
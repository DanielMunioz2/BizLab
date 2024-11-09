<?php

    session_start();

    require("conexion.php");
    
    if(isset($_SESSION["iniciado"])){

        if(isset($_POST["tokenUserGuarda"])){

            $tokenTUser = $_POST["tokenUserGuarda"];
            $tokenTarjeta = $_POST["tokenTarjetaNewUser"];
            $idUser = $_POST["idUserGuardaToken"];
    
            $resultado = $conn->query(
                "UPDATE `gdrfkbmy_bizlabDB`.`usuarios` 
                SET `user_tokenTarjeta` = '$tokenTarjeta', `user_codigoEpayco` = '$tokenTUser'
                WHERE (`id_usuario` = '$idUser');");
    
            echo json_encode($tokenTUser, JSON_UNESCAPED_UNICODE);
    
        }

    }
    
?>
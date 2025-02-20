<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    session_start();

    require("conexion.php");
    
    if(isset($_SESSION["iniciado"])){

        if(isset($_POST["tokenUserGuarda"])){

            $tokenTUser = $_POST["tokenUserGuarda"];
            $tokenTarjeta = $_POST["tokenTarjetaNewUser"];
            $idUser = $_POST["idUserGuardaToken"];
    
            $resultado = $conn->query(
                "UPDATE `soqkyjmy_bizclubPlataformaDb`.`usuarios` 
                SET `user_tokenTarjeta` = '$tokenTarjeta', `user_codigoEpayco` = '$tokenTUser'
                WHERE (`id_usuario` = '$idUser');");
    
            echo json_encode($tokenTUser, JSON_UNESCAPED_UNICODE);
    
        }

    }
    
?>
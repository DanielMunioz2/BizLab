<?php

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    session_start();

    require_once("conexion.php");

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    if(isset($_SESSION["iniciado"])){

        if(isset($_POST["refEpaycoFacMem"])){

            $refeEpayco = $_POST["refEpaycoFacMem"];
            $franquiciaFac = $_POST["franquiciaFac"];
            $stdTransa = $_POST["stdTransa"];
            $subscripIdEpayco = $_POST["subscripIdEpayco"];
            $facTranId = $_POST["facTranId"];
            $bancoTransa = $_POST["bancoTransa"];
            $direcUser = $_POST["direcUser"];
            $docuUser = $_POST["docuUser"];
            $emailUser = $_POST["emailUser"];
            $codMembreEpayco = $_POST["codMembreEpayco"];
            $stdMembresia = $_POST["stdMembresia"];
            $idMembresia = $_POST["idMembresia"];
            $idUser = $_POST["idUser"];
            $ivaMembresia = $_POST["ivaMembresia"];
            $descuMembresia = $_POST["descuMembresia"];
            $precMembresia = $_POST["precMembresia"];
            $subtotalMem = $_POST["subtotalMem"];
            $totalMem = $_POST["totalMem"];
            $factuFechaCre = $_POST["factuFechaCre"];
            $factuHoraCre = $_POST["factuHoraCre"];
            $factuSerie = $_POST["factuSerie"];
            $factuCodigo = $_POST["factuCodigo"];
            $tokenUser = $_POST["tokenUser"];
            $tokenTarje = $_POST["tokenTarje"];
            $codMembrLocal = $_POST["codiMembresiaLocal"]; 
            $proximoPago = $_POST["facVencimiento"];

            $fechaCaduca = explode("-", $proximoPago);
            $fechaCaduca = $fechaCaduca[0]."-".$fechaCaduca[1]."-".$fechaCaduca[2];

            // $facTranId   $subscripIdEpayco
            // $precioTotal $direcUser $docuUser $emailUser
            // $stdMembresia

            $idSubEpayco = explode("-", $facTranId);

            $resultado = $conn->query(
                "INSERT INTO `soqkyjmy_bizclubPlataformaDb`.`facturas` 
                (`refEpayco`, `factuEpayco`, `facturaCodigo`, 
                `facturaSerie`, `fechaFactura`, `horaFactura`, 
                `fechaFacturaV`, `estadoFactura`, `precioFactura`, 
                `factuSubTotal`, ivaFactura, descuFactura,   
                montoFactuTotal, tokenCliente, tokenTarjeta, 
                tarjetaFranquicia, bancoNombre, idPlanEpayco,  
                id_producto, id_usuario, id_membresia)
                VALUES
                ('$refeEpayco', '$facTranId', '$factuCodigo',
                '$factuSerie', '$factuFechaCre', '$factuHoraCre',
                '$fechaCaduca', '$stdTransa', '$precMembresia',
                '$subtotalMem', '$ivaMembresia', '$descuMembresia',
                '$totalMem', '$tokenUser', '$tokenTarje',
                '$franquiciaFac', '$bancoTransa', '$codMembreEpayco',
                0, ".$_SESSION["iniciado"].", $idMembresia)");

            $idInsertadoFactura = $conn->insert_id;

            $conn->query(
                "INSERT INTO `soqkyjmy_bizclubPlataformaDb`.`membresiauser`
                (`membreIdEpayco`, `membreCodEpayco`, `membreCodigo`, 
                `membreFechaC`, `membreHoraC`, `membreEstado`, 
                `membreFechaPagoA`, `membreFechaPagoP`, `membreUser`, 
                `membreId`)
                VALUES
                ('".$idSubEpayco[0]."', '$codMembreEpayco', '$codMembrLocal', '$factuFechaCre',
                '$factuHoraCre', '$stdMembresia', '$factuFechaCre', 
                '$fechaCaduca', ".$_SESSION["iniciado"].", $idMembresia);
                ");
            
            $idMembreInsertId = $conn->insert_id;

            $conn->query(
                "INSERT INTO `soqkyjmy_bizclubPlataformaDb`.`historial`
                (tarea_fOrigen, tarea_hOrigen, tarea_tipo, 
                tarea_estado, tarea_usuario, tarea_membresia, 
                tarea_factura)
                VALUES
                ('$factuFechaCre', '$factuHoraCre', 'nuevoMembre',
                'Lista', ".$_SESSION["iniciado"].", $idMembresia,
                $idInsertadoFactura)");
            
            $idHistoInsertId = $conn->insert_id;

            $conn->query("UPDATE `soqkyjmy_bizclubPlataformaDb`.`usuarios` SET `usuarios`.`user_membresia` = ".$idMembresia.", `usuarios`.`user_rol` = 'Miembro' WHERE (`usuarios`.`id_usuario` = ".$_SESSION["iniciado"].");");

            echo json_encode([$idHistoInsertId, $idInsertadoFactura, $idMembreInsertId, intval($_SESSION["iniciado"])], JSON_UNESCAPED_UNICODE);

            $_SESSION["tipoUsuario"] = "Miembro";
            
        }else{
            
            header("location:index.php");

        }

    }else{

        header("location:index.php");
        
    }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

?>
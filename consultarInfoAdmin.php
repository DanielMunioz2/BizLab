<?php

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    require("conexion2.php");

    date_default_timezone_set('America/Bogota');

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    //------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------
    // <<-- Consultas SQL | INICIO -->>
    //------------------------------------
        
    // Datos del PANEL PRINCIPAL - Administración 

        if(isset($_POST["adminPanelPrin"])){

            //Consulta 1: Facturas 

            $resultadoFactuas = $conn->query(
                "SELECT * FROM `$dbname`.`facturas`;"
            );

            $numRowsFactu = $resultadoFactuas->num_rows;

            $arrayFacturas = [$numRowsFactu];

            if($numRowsFactu > 0){

                while($row = $resultadoFactuas->fetch_assoc()){
                    array_push($arrayFacturas, $row);
                }

            };

            //------------------------------------------------------------------------------------------

            //Consulta 2: Miembros

            $resultadoMiembros = $conn->query(
                "SELECT * FROM `$dbname`.`usuarios`
                WHERE `usuarios`.`user_rol` = 'Usuario';"
            );

            $numRowsMiem = $resultadoMiembros->num_rows;

            $arrayMiembros = [$numRowsMiem];

            if($numRowsMiem > 0){

                while($row = $resultadoMiembros->fetch_assoc()){
                    array_push($arrayMiembros, $row);
                }

            };

            //------------------------------------------------------------------------------------------

            //Consulta 3: Reservas

            $resultadoReservas = $conn->query(
                "SELECT * FROM `$dbname`.`reservas`
                WHERE `reservas`.`estadoReserva` = 'Pendiente' 
                OR `reservas`.`estadoReserva` = 'En Proceso';"
            );

            $numRowsRese = $resultadoReservas->num_rows;

            $arrayReservas = [$numRowsRese];
            
            if($numRowsRese > 0){

                while($row = $resultadoReservas->fetch_assoc()){
                    array_push($arrayReservas, $row);
                }

            };

            //------------------------------------------------------------------------------------------

            //Devolviendo los datos
            echo json_encode([$arrayFacturas, $arrayMiembros, $arrayReservas], JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["formReseActuGene"])){

            $resultReseActuGene = $conn->query(
                "SELECT * FROM `$dbname`.`reservas`
                WHERE `reservas`.`estadoReserva` = 'Pendiente'
                OR `reservas`.`estadoReserva` = 'En Proceso';"
            );

            $arrayReseGeneActu = [];

            $rowsReseAGene = $resultReseActuGene->num_rows;

            if($rowsReseAGene > 0){

                while($row = $resultReseActuGene->fetch_assoc()){

                    array_push($arrayReseGeneActu, $row);
                    
                }

            }

            echo json_encode($arrayReseGeneActu, JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["idReseEstado"])){

            $idRese = $_POST["idReseEstado"];
            
            $resultReseEstado = $conn->query(
                "SELECT `estadoReserva` FROM `$dbname`.`reservas`
                WHERE `reservas`.`id_reserva` = ".intval($idRese).";"
            );

            $resultado = $resultReseEstado->fetch_assoc();

            echo json_encode($resultado, JSON_UNESCAPED_UNICODE);

        }

    //--------------------------------------------------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------
    // Calendario MODO MES/DÍA | INICIO
    //----------------------------------
        
        //----------------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["unidadesPdtNRAdmin"])){

            $idUnidades= $_POST["unidadesPdtNRAdmin"];

            $resultUnidades = $conn->query(
                "SELECT * FROM `$dbname`.`unidades`
                WHERE `unidades`.`id_unidad` IN (".$idUnidades.");"
            );

            $rowUnidad = $resultUnidades->num_rows;

            $arrayUnidades = [$rowUnidad-1];

            if($rowUnidad > 0){

                while($row = $resultUnidades->fetch_assoc()){

                    array_push($arrayUnidades, $row);
                    
                }

            }

            echo json_encode($arrayUnidades, JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["nombrePdtNRAdmin"])){

            $nombre= $_POST["nombrePdtNRAdmin"];

            $resultPdt = $conn->query(
                "SELECT * FROM `$dbname`.`productos`
                WHERE `productos`.`produNombre` LIKE '%".$nombre."%';"
            );

            $rowPdt = $resultPdt->num_rows;

            $arrayPdtNRAdmin = [$rowPdt-1];

            if($rowPdt > 0){

                while($row = $resultPdt->fetch_assoc()){

                    array_push($arrayPdtNRAdmin, $row);
                    
                }

            }

            echo json_encode($arrayPdtNRAdmin, JSON_UNESCAPED_UNICODE);

        }

        //----------------------------------------------------------------------------------------------------------------------------

    //----------------------------------
    // Calendario MODO MES/DÍA | FIN
    //----------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------

    // Actualizar Perfil

        if(isset($_POST["idUserActuPerfil"])){

            $id = $_POST["idUserActuPerfil"];
            $email = $_POST["emailActuPerfil"];
            $celular = $_POST["celularActuPerfil"];
            $telefono = $_POST["telefonoActuPerfil"];
            $direcc = $_POST["direccActuPerfil"];
            $genero = $_POST["generoActuPerfil"];
            $imagen = isset($_POST["imagenNombre"]) ? $_POST["imagenNombre"] : null;

            if($imagen != null){

                $fecha=new DateTime();

                $ImagenPrin = $fecha->getTimestamp()."_".$_FILES["prodImg"]['name'];
                $ImagenPrinTemp = $_FILES["prodImg"]['tmp_name'];
                move_uploaded_file($ImagenPrinTemp, "imagesUser/".$ImagenPrin);

                $resultUpdateUser = $conn->query(
                    "UPDATE `$dbname`.`usuarios` 
                    SET 
                    `user_correo` = '".$email."',
                    `user_celular` = ".intval($celular).",
                    `user_telefono` = ".intval($telefono).",
                    `user_direc` = '".$direcc."',
                    `user_genero` = '".$genero."',
                    `user_imagen` = '".$imagen."'
                    WHERE (`usuarios`.`id_usuario` = ".intval($id).");"
                );

            }else{

                $resultUpdateUser = $conn->query(
                    "UPDATE `$dbname`.`usuarios` 
                    SET 
                    `user_correo` = '".$email."',
                    `user_celular` = ".intval($celular).",
                    `user_telefono` = ".intval($telefono).",
                    `user_direc` = '".$direcc."',
                    `user_genero` = '".$genero."'
                    WHERE (`usuarios`.`id_usuario` = ".intval($id).");"
                );

            }

            echo json_encode("User Actualizado", JSON_UNESCAPED_UNICODE);

        }

    //--------------------------------------------------------------------------------------------------------------------------------

    // Miembro Nueva Rese Admin

        if(isset($_POST["idMiembroNRA"])){

            $idMiembro = 
                isset($_POST["idMiembroNRA"]) 
                ? $conn->real_escape_string($_POST["idMiembroNRA"])
                : null;

            if(
                $idMiembro != null &&
                $idMiembro != ""
            )
            {

                $resultMiembroNRA = $conn->query(
                    "SELECT * FROM `$dbname`.`usuarios`
                    WHERE `usuarios`.`id_usuario` LIKE '%".$idMiembro."%';"
                );

                $rowsMiembro = $resultMiembroNRA->num_rows;

                $arrayMiembroNRA = [$rowsMiembro-1];

                if($rowsMiembro > 0){

                    while($row = $resultMiembroNRA->fetch_assoc()){

                        array_push($arrayMiembroNRA, $row);
                        
                    }

                }

                echo json_encode($arrayMiembroNRA, JSON_UNESCAPED_UNICODE);

            }

        }

        if(isset($_POST["nombreMiembroNRA"])){

            $nombreMiembro = 
                isset($_POST["nombreMiembroNRA"]) 
                ? $conn->real_escape_string($_POST["nombreMiembroNRA"])
                : null;

            if(
                $nombreMiembro != null &&
                $nombreMiembro != ""
            )
            {

                $resultMiembrosListaNRA = $conn->query(
                    "SELECT * FROM `$dbname`.`usuarios`
                    WHERE `usuarios`.`user_nombre` LIKE '%".$nombreMiembro."%'
                    OR `usuarios`.`user_apellido` LIKE '%".$nombreMiembro."%';"
                );

                $rowsMiembro = $resultMiembrosListaNRA->num_rows;

                $arrayMiembroNRA = [$rowsMiembro-1];

                if($rowsMiembro > 0){

                    while($row = $resultMiembrosListaNRA->fetch_assoc()){

                        array_push($arrayMiembroNRA, $row);
                        
                    }

                }

                echo json_encode($arrayMiembroNRA, JSON_UNESCAPED_UNICODE);

            }

        }

        if(isset($_POST["queryRese"])){

            $query = $_POST["queryRese"];
            
            if($_POST["queryRese"] != null){

                $resultReseFiltro = $conn->query($query);

                $rowsRese = $resultReseFiltro->num_rows;

                $arrayReservas = [$rowsRese-1];

                if($rowsRese > 0){

                    while($row = $resultReseFiltro->fetch_assoc()){

                        array_push($arrayReservas, $row);
                        
                    }

                }

                echo json_encode($arrayReservas, JSON_UNESCAPED_UNICODE);

            }

        }

        if(isset($_POST["unidadesNRA"])){

            $unidadesSele = $_POST["unidadesNRA"];

            $queryUnid = 
                "SELECT * FROM `$dbname`.`unidades` 
                WHERE `unidades`.`id_unidad` IN (".$unidadesSele.");";
            
            $resultUnidades = $conn->query($queryUnid);

            $rowsUnidNRA = $resultUnidades->num_rows;

            $arrayUnidades = [$rowsUnidNRA];

            if($rowsUnidNRA > 0){

                while($row = $resultUnidades->fetch_assoc()){

                    array_push($arrayUnidades, $row);
                    
                }

            }

            echo json_encode($arrayUnidades, JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["reservasXDiaFiltrar"])){

            $diasCant = $_POST["cantidadDias"];
            $fechaInicio = $_POST["fechaInicio"];

            $fechaFinal =  date("Y-m-d",strtotime($fechaInicio."+ ".$diasCant." days")); 

            $queryReservas = 
                "SELECT * FROM `$dbname`.`reservas`
                WHERE `reservas`.`fechaReserva` = '".$fechaInicio."'
                OR `reservas`.`reserDiaFinal` = '".$fechaInicio."'
                OR `reservas`.`reserDiaFechas` LIKE '%".$fechaInicio."%'
                OR `reservas`.`reserSemanaFechas` LIKE '%".$fechaInicio."%'
                OR `reservas`.`fechaReserva` = '".$fechaFinal."'
                OR `reservas`.`reserDiaFinal` = '".$fechaFinal."'
                OR `reservas`.`reserDiaFechas` LIKE '%".$fechaFinal."%'
                OR `reservas`.`reserSemanaFechas` LIKE '%".$fechaFinal."%';";

            $resultReservas = $conn->query($queryReservas);

            $rowsReseFiltro = $resultReservas->num_rows;

            $arrayReservas = [$rowsReseFiltro];

            if($rowsReseFiltro > 0){

                while($row = $resultReservas->fetch_assoc()){

                    array_push($arrayReservas, $row);
                    
                }

            }

            echo json_encode([$arrayReservas, $fechaInicio."_".$fechaFinal], JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["reservasXSemanaFiltrar"])){

            $fechaInicio = $_POST["fechaInicio"];
            $fechaFinal =  $_POST["fechaFinal"]; 

            $queryReservas = 
                "SELECT * FROM `$dbname`.`reservas`
                WHERE `reservas`.`fechaReserva` = '".$fechaInicio."'
                OR `reservas`.`reserDiaFinal` = '".$fechaInicio."'
                OR `reservas`.`reserDiaFechas` LIKE '%".$fechaInicio."%'
                OR `reservas`.`reserSemanaFechas` LIKE '%".$fechaInicio."%'
                OR `reservas`.`fechaReserva` = '".$fechaFinal."'
                OR `reservas`.`reserDiaFinal` = '".$fechaFinal."'
                OR `reservas`.`reserDiaFechas` LIKE '%".$fechaFinal."%'
                OR `reservas`.`reserSemanaFechas` LIKE '%".$fechaFinal."%';";

            $resultReservas = $conn->query($queryReservas);

            $rowsReseFiltro = $resultReservas->num_rows;

            $arrayReservas = [$rowsReseFiltro];

            if($rowsReseFiltro > 0){

                while($row = $resultReservas->fetch_assoc()){

                    array_push($arrayReservas, $row);
                    
                }

            }

            echo json_encode($arrayReservas, JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["reservasXMesFiltrar"])){

            $fechaIniMes = $_POST["fechaInicio"];
            $cantMeses = $_POST["cantidadMeses"];

            $diasMeses = 30 * $cantMeses;

            $fechaFinMes =  date("Y-m-d",strtotime($fechaIniMes."+ ".$diasMeses." days")); 

            $mesAñoIni = substr($fechaIniMes, 0, 7);
            $mesAñoFin = substr($fechaFinMes, 0, 7);

            $cadena = $mesAñoIni;
            $cadena2 = $mesAñoIni;
            
            for($i = 0; $i < $cantMeses; $i++){

                $cadena2 = explode("-", $cadena2);

                $año = $cadena2[0];
                $mes = intval($cadena2[1])+1;
                
                if($mes == 13){
                    $mes = "1";
                    $año = strval(intval($año)+1);
                }

                if(intval($mes) < 10){
                    $mes = "0".$mes;
                }

                $union = $año."-".$mes;

                if($union == $mesAñoFin){
                    break;
                }

                $cadena .= "_".$union;
                $cadena2 = $union;

            }

            $cadena .= "_".$mesAñoFin;
            $queryMesWhere = "";

            $arrayCadena = explode("_", $cadena); 

            for($e = 0; $e < count($arrayCadena); $e++){
                
                if($e == 0){
                    $queryMesWhere .= 
                    " `reservas`.`fechaReserva` LIKE '%".$arrayCadena[$e]."%'
                    OR `reservas`.`reserDiaFinal` LIKE '%".$arrayCadena[$e]."%'";
                }else{
                    $queryMesWhere .= 
                    " OR `reservas`.`fechaReserva` LIKE '%".$arrayCadena[$e]."%'
                    OR `reservas`.`reserDiaFinal` LIKE '%".$arrayCadena[$e]."%'";
                }

            }

            $queryMes = 
                "SELECT * FROM `$dbname`.`reservas`
                WHERE $queryMesWhere;";

            $resultFechaMes = $conn->query($queryMes);

            $rowsMesNRA = $resultFechaMes->num_rows;

            $arrayMesNRAReses = [$rowsMesNRA];

            if($rowsMesNRA > 0){

                while($row = $resultFechaMes->fetch_assoc()){

                    array_push($arrayMesNRAReses, $row);
                    
                }

            }

            echo json_encode([$arrayMesNRAReses, $fechaIniMes."_".$fechaFinMes, $cadena], JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["fechasSemana"])){

            $fechaActual = $_POST["diaSemanaFecha"];
            $fechaActualNum = $_POST["diaSemanaNum"];
            $cantSemanas = $_POST["numeroSemana"];
            $longiSemana = $_POST["longitudSemana"];
            $cantiSemanaNum = $_POST["cantiSemanas"];

            $diasHastaLunes = 8-$fechaActualNum;
            $cantSemanas = 7*$cantSemanas;
            $longiSemana2 = $longiSemana == "sabado" ? 5 : 4;
            $diasExtras = 0;
            $cantiSemanaNum2 = 0;

            $inicioSemana = date("Y-m-d",strtotime($fechaActual."+ ".$diasHastaLunes." days")); 
            $inicioSemana = date("Y-m-d",strtotime($inicioSemana."+ ".$cantSemanas." days"));  

            if($cantiSemanaNum > 1){

                $diasExtras = $longiSemana == "sabado" ? 2 : 3;
                $cantiSemanaNum2 = $cantiSemanaNum-1;

                for($i = 1; $i <= $cantiSemanaNum; $i++){
                    
                    if($i > 1){
                        $finalSemana = date("Y-m-d",strtotime($finalSemana."+ ".$longiSemana2." days"));
                    }else{
                        $finalSemana = date("Y-m-d",strtotime($inicioSemana."+ ".$longiSemana2." days"));
                    }

                    if($cantiSemanaNum2 != 0){
                        $finalSemana = date("Y-m-d",strtotime($finalSemana."+ ".$diasExtras." days"));
                        $cantiSemanaNum2--;
                    }
                    

                }

            }else{
                $finalSemana = date("Y-m-d",strtotime($inicioSemana."+ ".$longiSemana2." days"));
            }

            echo json_encode([$inicioSemana, $finalSemana], JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["regisReservaNRA"])){

            $tipoRese = $_POST["tipoRese"];
            $fechaInicio = $_POST["fechaInicio"];
            $fechaFin = $_POST["fechaFin"];
            $horaInicio = $_POST["horaInicio"];
            $horaFinal = $_POST["horaFinal"];
            $cantHoras = $_POST["cantHoras"];
            $cantDias = $_POST["cantDias"];
            $cantSemas = $_POST["cantSemas"];
            $cantMeses = $_POST["cantMeses"];
            $precioRese = $_POST["precioRese"];
            $ivaRese = $_POST["ivaRese"];
            $descuRese = $_POST["descuRese"];
            $idMiembro = $_POST["idMiembro"];
            $idUnidad = $_POST["idUnidad"];
            $idProducto = $_POST["idProducto"];
            $otrosMiembrosIds = $_POST["otrosMiembrosIds"];
            $numPersonas = $_POST["numPersonas"];
            $tituloNRA = $_POST["tituloNRA"];
            $actividadNRA = $_POST["actividadNRA"];
            $reseCodigo = $_POST["reseCodigo"];
            $reseSerie = $_POST["reseSerie"];
            $factuCod = $_POST["factuCod"];
            $precioCanti = $_POST["precioCanti"];
            $precioNormalPdt = $_POST["precioNormalPdt"];

            $fecha = date("Y-m-d");
            $hora = date("h:i A");

            $fechaV = date("Y-m-d",strtotime($fecha."+ 7 days")); 

            $resultNombre = $conn->query(
                "SELECT * FROM `$dbname`.`usuarios` 
                WHERE `usuarios`.`id_usuario` = ".intval($idMiembro).";");

            $resultNombre2 = $resultNombre->fetch_assoc();
            $nombre = $resultNombre2["user_nombre"]." ".$resultNombre2["user_apellido"];
            $membresia = $resultNombre2["user_membresia"];

            $resultadoInserReseNRA = $conn->query(
                "INSERT INTO `$dbname`.`reservas`
                (`rese_codigo`, `serieReserva`, `estadoReserva`, 
                `fechaCompraReser`, `horaCompraReser`, `reserTipo`, `fechaReserva`, 
                `horaEntradaR`, `horaSalidaR`, `reserHorasDuracion`, 
                `reserDiasDuracion`, `reserDiaFinal`, `precioReserva`, `comisionReserva`, 
                `numPersonas`, `otrosMiembros`, `reservaTitulo`, 
                `reservaActividad`, `nombreUser`, `id_unidad`, `id_usuario`, `id_producto`)
                VALUES
                ('$reseCodigo', '$reseSerie', 'Pendiente', 
                '$fecha', '$hora', '$tipoRese', '$fechaInicio',
                '$horaInicio', '$horaFinal', ".intval($cantHoras).", 
                ".intval($cantDias).", '$fechaFin', ".intval($precioRese).", 0,
                ".intval($numPersonas).", '$otrosMiembrosIds', '$tituloNRA',
                '$actividadNRA', '".$nombre."', ".intval($idUnidad).", ".intval($idMiembro).", ".intval($idProducto).");"
            );

            $ultimaReseInsertada =  $conn->insert_id;

            $resultInsertFactuNRA = $conn->query(
                "INSERT INTO `$dbname`.`facturas`
                (`facturaCodigo`, `facturaSerie`, `fechaFactura`, `horaFactura`, 
                `fechaFacturaV`, `estadoFactura`, `precioFactura`, `factuSubTotal`, 
                `ivaFactura`, `descuFactura`, `montoFactuTotal`, 
                `id_producto`, `id_usuario`, `id_membresia`, `id_unidad`, `id_reserva`)
                VALUES
                ('$factuCod', '$reseSerie', '$fecha', '$hora',
                '$fechaV', 'Pendiente', ".intval($precioNormalPdt).", ".intval($precioCanti).",
                ".intval($ivaRese).", ".intval($descuRese).", ".intval($precioRese).",
                ".intval($idProducto).", ".intval($idMiembro).", ".intval($membresia).", ".intval($idUnidad).", ".intval($ultimaReseInsertada).");"
            );

            $ultimaFactuInsertada =  $conn->insert_id;

            $resultInsertHistoNRA = $conn->query(
                "INSERT INTO `$dbname`.`historial`
                (tarea_fOrigen, tarea_hOrigen, tarea_fechaEje, tarea_fechaFEje, 
                tarea_horaEje, tarea_horaFEje, tarea_tipo, tarea_estado, 
                tarea_usuario, tarea_producto, tarea_mensaje, tarea_membresiaUser, 
                tarea_membresia, tarea_factura, tarea_reserva, tarea_unidad)
                VALUES
                ('$fecha', '$hora', '$fechaInicio', '$fechaFin', 
                '$horaInicio', '$horaFinal', 'Reserva', 'Pendiente', 
                ".intval($idMiembro).", ".intval($idProducto).", 0, 0, 
                ".intval($membresia).", ".intval($ultimaFactuInsertada).", ".intval($ultimaReseInsertada).", ".intval($idUnidad).");"
            );

            $ultimoHistorialInsertada =  $conn->insert_id;

            echo json_encode([$ultimaReseInsertada, $ultimaFactuInsertada, $ultimoHistorialInsertada], JSON_UNESCAPED_UNICODE);

        }

    //--------------------------------------------------------------------------------------------------------------------------------

    // Otros Miembros - Contenedor de Reservas, cuadro de detalles - Calendario de Reservas MODO DÍA

        if(isset($_POST["usersIdReseDiv"])){

            $idOtrosM = $_POST["usersIdReseDiv"];
            $arrayReseOMiembros = [];

            $resultOtrosM = $conn->query(
                "SELECT * FROM `$dbname`.`usuarios`
                WHERE `usuarios`.`id_usuario` IN (".$idOtrosM.");"
            );

            $rowsOtrosM = $resultOtrosM->num_rows;

            if($rowsOtrosM > 0){

                while($row = $resultOtrosM->fetch_assoc()){

                    array_push($arrayReseOMiembros, $row);
                    
                }

            }

            echo json_encode($arrayReseOMiembros, JSON_UNESCAPED_UNICODE);

        }
            
    //--------------------------------------------------------------------------------------------------------------------------------

    // Actualiza estado de la Reserva (En Proceso, Terminada, Pendiente, Cancelada)

        if(isset($_POST["actuReseEstado"])){

            $idRese = $_POST["reseEstadoID"];
            $estado = $_POST["actuReseEstado"];

            $resultadoReseActu = $conn->query(
                "UPDATE `$dbname`.`reservas` SET `estadoReserva` = '".$estado."' WHERE (`id_reserva` = '".$idRese."');"
            );

            echo json_encode("Reserva Actualizada", JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["fechaDia"])){
            
            $fecha = $_POST["fechaDia"];

            $resultado = $conn->query(
                "SELECT * FROM `$dbname`.`reservas` 
                JOIN `$dbname`.`usuarios` ON
                `usuarios`.`id_usuario` = `reservas`.`id_usuario`
                JOIN `$dbname`.`unidades` ON
                `unidades`.`id_unidad` = `reservas`.`id_unidad`
                JOIN `$dbname`.`productos` ON
                `productos`.`id_producto` = `reservas`.`id_producto`
                WHERE (`reservas`.`fechaReserva` = '".$fecha."' 
                AND `reservas`.`estadoReserva` = 'Pendiente')
                OR 
                (`reservas`.`estadoReserva` = 'En Proceso'
                AND `reservas`.`fechaReserva` = '".$fecha."')
                OR 
                (`reservas`.`estadoReserva` = 'Terminada'
                AND `reservas`.`fechaReserva` = '".$fecha."');"
            );

            $numberRows = $resultado->num_rows;

            $arrayData = [$numberRows-1];

            if($numberRows > 0){

                while($row = $resultado->fetch_assoc()){
                    array_push($arrayData, $row);
                }

            }

            echo json_encode($arrayData, JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["fechaMesReser"])){
            
            $fechaMes = $_POST["fechaMesReser"];
            $fechaMesA = $_POST["fechaMesReserA"];
            $fechaMesP = $_POST["fechaMesReserP"];
            $fechaAño = $_POST["fechaAñoReser"];
            $resultado = "";

            $meses = [1=>"enero", 
                2=>"febrero", 
                3=>"marzo", 
                4=>"abril", 
                5=>"mayo", 
                6=>"junio",
                7=>"julio",
                8=>"agosto",
                9=>"septiembre",
                10=>"octubre",
                11=>"noviembre",
                12=>"diciembre"];

            if($fechaMes == 12){
                $fechaMesP = 1;
            }

            if($fechaMes == 1){
                $fechaMesA = 12;
            }

            $mes = $meses[$fechaMes];
            $mesA = $meses[$fechaMesA];
            $mesP = $meses[$fechaMesP];

            $fecha2 = $mes."-".$fechaAño;

            if($fechaMes == 1){
                $fecha3 = $mesA."-".$fechaAño-1;
            }else{
                $fecha3 = $mesA."-".$fechaAño;
            }
            
            if($fechaMes == 12){
                $fecha4 = $mesP."-".$fechaAño+1;
            }else{
                $fecha4 = $mesP."-".$fechaAño;
            }

            $queryMesReservas = "SELECT * FROM `$dbname`.`reservas`
            INNER JOIN `$dbname`.`usuarios` 
            ON `usuarios`.`id_usuario` = `reservas`.`id_usuario`
            WHERE `reservas`.`serieReserva` = '".$fecha2."'
            OR `reservas`.`serieReserva` = '".$fecha3."'
            OR `reservas`.`serieReserva` = '".$fecha4."'
            AND (`reservas`.`estadoReserva` = 'Pendiente'
            OR `reservas`.`estadoReserva` = 'En Proceso')
            ORDER BY `reservas`.`fechaReserva` ASC;";

            $resultado = $conn->query($queryMesReservas);

            $numberRows = $resultado->num_rows;

            $arrayData = [$numberRows-1];

            if($numberRows > 0){

                while($row = $resultado->fetch_assoc()){
                    array_push($arrayData, $row);
                }

            };

            echo json_encode($arrayData, JSON_UNESCAPED_UNICODE);
        }

        if(isset($_POST["panelProd"])){

            $queryProd = "SELECT * FROM `productos`;";

            $resultado = $conn->query($queryProd);

            $numberRows = $resultado->num_rows;

            $arrayData = [$numberRows-1];

            if($numberRows > 0){

                while($row = $resultado->fetch_assoc()){
                    array_push($arrayData, $row);
                }

            };

            echo json_encode($arrayData, JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["panelUnidad"])){

            $queryUnidad = "SELECT * FROM `unidades`;";

            $resultado = $conn->query($queryUnidad);

            $numberRows = $resultado->num_rows;

            $arrayData = [$numberRows-1];

            if($numberRows > 0){

                while($row = $resultado->fetch_assoc()){
                    array_push($arrayData, $row);
                }

            };

            echo json_encode($arrayData, JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["editProd"])){
            
            $prodId = $_POST["prodId"];
            $prodNom = $_POST["prodNom"];
            $prodCatego = $_POST["prodCatego"];
            $prodTipo = $_POST["prodTipo"];
            $prodPrecio = $_POST["prodPrecio"];
            $prodPreXHora = $_POST["prodPreXHora"];
            $prodPreXDia = $_POST["prodPreXDia"];
            $prodPreXSema = $_POST["prodPreXSemana"];
            $prodDescrip = $_POST["prodDescrip"];
            $imgActual = $_POST["imgActual"];
            $imgActual2 = $_POST["imgActual2"];

            $prodPrecio = floatval($prodPrecio);
            $prodPreXHora = intval($prodPreXHora);
            $prodPreXDia = intval($prodPreXDia);
            $prodPreXSema = intval($prodPreXSema);

            $fecha=new DateTime();
    
            if
            (
            $_FILES["prodImg"]['name'] != null && 
            $_FILES["prodImg"]['name'] != ""
            )
            {
                
                $ImagenPrin = $fecha->getTimestamp()."_".$_FILES["prodImg"]['name'];
                $ImagenPrinTemp = $_FILES["prodImg"]['tmp_name'];
                move_uploaded_file($ImagenPrinTemp, "images/productosImages/".$ImagenPrin);
                
                unlink("images/productosImages/".$imgActual2);
                
            }else{
                
                $ImagenPrin = explode("/", $imgActual)[2];
                
            }
            
            $query = "UPDATE `$dbname`.`productos` SET 
            `productos`.`produNombre` = '$prodNom', 
            `productos`.`produCategoria` = '$prodCatego',
            `productos`.`produTipo` = '$prodTipo', 
            `productos`.`produPrecio` = $prodPrecio,
            `productos`.`precioXhora` = $prodPreXHora,
            `productos`.`precioXDia` = $prodPreXDia,
            `productos`.`precioXSemana` = $prodPreXSema,
            `productos`.`produDescri` = '$prodDescrip',
            `productos`.`productoImgPrin` = '$ImagenPrin'
            WHERE `$dbname`.`productos`.`id_producto` = $prodId;";

            $resultado = $conn->query($query);

            echo json_encode(
            [$prodNom,
            $prodCatego,
            $prodTipo,
            $prodPrecio,
            $prodPreXHora,
            $prodPreXDia,
            $prodPreXSema,
            $prodDescrip,
            $ImagenPrin],
            JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["editUnidad"])){

            $precios = "";
            $prodId = $_POST["prodId"];
            $prodNom = $_POST["prodNom"];
            $prodPreXHora = $_POST["prodPreXHora"];
            $prodPreXDia = $_POST["prodPreXDia"];
            $prodPreXSema = $_POST["prodPreXSemana"];
            $prodDescrip = $_POST["prodDescrip"];
            $prodCaracteris = $_POST["prodCaracte"];
            $imgActual = $_POST["imgActual"];
            $imgActual2 = $_POST["imgActual2"];

            $precios = $prodPreXHora.",".$prodPreXDia.",".$prodPreXSema;

            $fecha=new DateTime();

            if
            (
            $_FILES["prodImg"]['name'] != null && 
            $_FILES["prodImg"]['name'] != ""
            )
            {
                
                $ImagenPrin = $fecha->getTimestamp()."_".$_FILES["prodImg"]['name'];
                $ImagenPrinTemp = $_FILES["prodImg"]['tmp_name'];
                move_uploaded_file($ImagenPrinTemp, "images/productosImages/".$ImagenPrin);
                
                unlink("images/productosImages/".$imgActual2);
                
            }else{
                
                $ImagenPrin = explode("/", $imgActual)[2];
                
            }
            
            $query = "UPDATE `$dbname`.`unidades` SET 
            `unidades`.`unidad_nombre` = '$prodNom',
            `unidades`.`unidad_precios` = '$precios',
            `unidades`.`unidad_descrip` = '$prodDescrip',
            `unidades`.`unidad_imagen` = '$ImagenPrin',
            `unidades`.`unidad_caracte` = '$prodCaracteris'
            WHERE `$dbname`.`unidades`.`id_unidad` = $prodId;";

            $resultado = $conn->query($query);

            echo json_encode(
            [$prodNom,
            $prodPreXHora,
            $prodPreXDia,
            $prodPreXSema,
            $prodDescrip,
            $prodCaracteris,
            $ImagenPrin],
            JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["BEspeMiembro"])){
            
            $nombre = $_POST["BEspeMiembro"];

            $queryMiembro = "SELECT * FROM `$dbname`.`usuarios` WHERE `usuarios`.`user_nombre` LIKE '%".$nombre."%'";

            $resultMiembro = $conn->query($queryMiembro);

            $num_rows = $resultMiembro->num_rows;

            $htmlMiembro = "";

            if($num_rows > 0){
                while($row = $resultMiembro->fetch_assoc()){
                    $htmlMiembro .= '
                    <div class="miembroDiv miembroDiv'.$row["id_usuario"].'"
                    onclick="elegirMiembroRese(`'.$row["user_nombre"].' '.$row["user_apellido"].'`, `'.$row["user_cargo"].'`, `'.$row["user_empresa"].'`, `'.$row["user_imagen"].'`, `'.$row["id_usuario"].'`, `miembroSelect`)">
                        <div class="divImg">
                            <img src="imagesUser/'.$row["user_imagen"].'" alt="">
                        </div>
                        <div class="divDatos">
                            <span>'.$row["user_nombre"].' '.$row["user_apellido"].'</span>
                            <span>'.$row["user_cargo"].'</span>
                            <span>'.$row["user_empresa"].'</span>
                        </div>
                    </div>';
                }
            }else{
                $htmlMiembro = '<span class="mNOencontrado">Miembro NO Encontrado</span>';
            }
        
            echo json_encode($htmlMiembro, JSON_UNESCAPED_UNICODE);

        }

    // Consultas para Gráficas de Estadísticas

        if(isset($_POST["ingreTotaleEstadis"])){

            $dia = $_POST["diaActual"];
            $mes = $_POST["mesActual"];
            $anio = $_POST["anioActual"];

            $mesAnte = intval($mes) == 1 ? 12 : intval($mes)-1;
            $mesAnte = $mesAnte < 10 ? "0".$mesAnte : $mesAnte;
            $anioAnte = intval($mes) == 1 ? intval($anio-1) : intval($anio);

            $cadenaMesActu = "";
            $cadenaMesAnte = "";
            
            $diaEstado = "";
            $diaEstado2 = "";

            for($i = 1; $i <= intval($dia); $i++){

                $diaEstado = $i < 10 ? "0".$i : $i;

                if($i == intval($dia)){
                    
                    $cadenaMesAnte .= "'".$anioAnte."-".$mesAnte."-".$diaEstado."'";

                }else{

                    $cadenaMesAnte .= "'".$anioAnte."-".$mesAnte."-".$diaEstado."',";

                }

                if($i == intval($dia)){
                    $diaEstado2 = $i < 10 ? "0".$i : $i;
                    $cadenaMesActu .= "'".$anio."-".$mes."-".$diaEstado2."'";
                }else{
                    $diaEstado2 = $i < 10 ? "0".$i : $i;
                    $cadenaMesActu .= "'".$anio."-".$mes."-".$diaEstado2."',";
                }
                
            }

            $resultFactu = $conn->query(
                "SELECT * FROM `$dbname`.`facturas`
                WHERE `facturas`.`fechaFactura` IN ($cadenaMesActu);"
            );

            $numberRowsFac = $resultFactu->num_rows;

            $arrayDataFacMesActu = [$numberRowsFac-1];

            if($numberRowsFac > 0){

                while($row = $resultFactu->fetch_assoc()){
                    array_push($arrayDataFacMesActu, $row);
                }

            };

            $resultFactu = $conn->query(
                "SELECT * FROM `$dbname`.`facturas`
                WHERE `facturas`.`fechaFactura` IN ($cadenaMesAnte);"
            );

            $numberRowsFac = $resultFactu->num_rows;

            $arrayDataFacMesAnte = [$numberRowsFac-1];

            if($numberRowsFac > 0){

                while($row = $resultFactu->fetch_assoc()){
                    array_push($arrayDataFacMesAnte, $row);
                }

            };

            echo json_encode([$arrayDataFacMesAnte, $arrayDataFacMesActu, $mes, $anio, $mesAnte, $anioAnte], JSON_UNESCAPED_UNICODE);

        }

    //--------------------------------------------------------------------------------------------------------------------------

    // Búsqueda específica para los otros miembros

        if(isset($_POST["BEspeOMiembro"])){

            $nombre = $_POST["BEspeOMiembro"];

            $queryMiembro = "SELECT * FROM `$dbname`.`usuarios` WHERE `usuarios`.`user_nombre` LIKE '%".$nombre."%'";

            $resultMiembro = $conn->query($queryMiembro);

            $num_rows = $resultMiembro->num_rows;

            $htmlMiembro = "";

            if($num_rows > 0){
                while($row = $resultMiembro->fetch_assoc()){
                    $htmlMiembro .= '
                    <div class="miembroDiv miembroDiv'.$row["id_usuario"].'"
                    onclick="elegirMiembroRese(`'.$row["user_nombre"].' '.$row["user_apellido"].'`, `'.$row["user_cargo"].'`, `'.$row["user_empresa"].'`, `'.$row["user_imagen"].'`, `'.$row["id_usuario"].'`, `otroMiembros`)">
                        <div class="divImg">
                            <img src="imagesUser/'.$row["user_imagen"].'" alt="">
                        </div>
                        <div class="divDatos">
                            <span>'.$row["user_nombre"].' '.$row["user_apellido"].'</span>
                            <span>'.$row["user_cargo"].'</span>
                            <span>'.$row["user_empresa"].'</span>
                        </div>
                    </div>';
                }
            }else{
                $htmlMiembro = '<span class="mNOencontrado">Miembro NO Encontrado</span>';
            }
        
            echo json_encode($htmlMiembro, JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------

    // Producto a elegir en la nueva reserva

        if(isset($_POST["prodNomNewRese"])){

            $nomProd = $_POST["prodNomNewRese"];

            $queryProd = "SELECT * FROM `$dbname`.`productos` WHERE `productos`.`produNombre` LIKE '%".$nomProd."%' AND `productos`.`produCategoria` = 'Individuales'";

            $resultProd = $conn->query($queryProd);

            $num_rows = $resultProd->num_rows;

            $htmlProducto = "";

            if($num_rows > 0){
                while($row = $resultProd->fetch_assoc()){
                    $htmlProducto .= '
                    <div class="pdtSeleLi pdtSeleLi'.$row["id_producto"].'" 
                    onclick="elegirProdNewRese(
                    '.$row["id_producto"].', 
                    `'.$row["productoImgPrin"].'`, 
                    `'.$row["produNombre"].'`, 
                    '.$row["precioXhora"].',
                    '.$row["precioXDia"].',
                    '.$row["precioXSemana"].',
                    `'.$row["produDescri"].'`)
                    ">
                        <div class="imgDiv">
                            <img src="images/productosImages/'.$row["productoImgPrin"].'" alt="">
                        </div>
                        <div class="divSpan">
                            <span>'.$row["produNombre"].'</span>
                        </div>
                    </div>';
                }
            }else{
                $htmlProducto = '<span class="pNOencontrado">Producto NO Encontrado</span>';
            }
        
            echo json_encode($htmlProducto, JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------

    // Unidad a elegir en la nueva reserva

        if(isset($_POST["unidNomNewRese"])){
            
            $unidadNom = $_POST["unidNomNewRese"];

            $queryUnid = "SELECT * FROM `$dbname`.`unidades` WHERE `unidades`.`unidad_nombre` LIKE '%".$unidadNom."%'";

            $resultUnid = $conn->query($queryUnid);

            $num_rows = $resultUnid->num_rows;

            $htmlUnidad = "";

            if($num_rows > 0){

                while($row = $resultUnid->fetch_assoc()){
                    $htmlUnidad .= '
                    <div class="divUnidades divUnidades'.$row["id_unidad"].'" 
                    onclick="elegirUnidNewRese(
                    '.$row["id_unidad"].', 
                    `'.$row["unidad_imagen"].'`, 
                    `'.$row["unidad_nombre"].'`, 
                    `'.$row["unidad_precios"].'`,
                    `'.$row["unidad_caracte"].'`,
                    `'.$row["unidad_descrip"].'`)
                    ">
                        <div class="imgDiv">
                            <img src="images/productosImages/'.$row["unidad_imagen"].'" alt="">
                        </div>
                        <div class="divSpan">
                            <span>'.$row["unidad_nombre"].'</span>
                        </div>
                    </div>';
                }

            }else{

                $htmlUnidad = '<span class="unidNOencontrado">Unidad NO Encontrada</span>';

            }
        
            echo json_encode($htmlUnidad, JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------

    // Obteniendo Datos del USUARIO EN SESIÓN

        if(isset($_POST["idUserIni"])){
            
            // $array = [];

            $idUser = $_POST["idUserIni"];

            // $resultado = $conn->query("SELECT * FROM `$dbname`.`usuarios` WHERE `usuarios`.`id_usuario` = ".$idUser.";");
            
            // $resultado = $resultado->fetch_assoc();

            // array_push($array, $resultado);

            echo json_encode($idUser, JSON_UNESCAPED_UNICODE);

        }
    
    //---------------------------------------------------------------------------------------------------------------------

    // Obteniendo datos del HISTORIAL

        if(isset($_POST["panelPrinHisto"])){

            $fecha = $_POST["fechaActual"];
            $fechaAnte = $_POST["fechaActualAnte"];

            $resultadoHistorial = $conn->query(
                "SELECT * FROM `$dbname`.`historial`
                JOIN `$dbname`.`reservas` ON 
                `reservas`.`id_reserva` = `historial`.`tarea_reserva`
                JOIN `$dbname`.`usuarios` ON 
                `usuarios`.`id_usuario` = `historial`.`tarea_usuario`
                JOIN `$dbname`.`unidades` ON 
                `unidades`.`id_unidad` = `historial`.`tarea_unidad`
                JOIN `$dbname`.`productos` ON 
                `productos`.`id_producto` = `historial`.`tarea_producto`
                JOIN `$dbname`.`facturas` ON 
                `facturas`.`id_Factura` = `historial`.`tarea_factura`
                JOIN `$dbname`.`membresiauser` ON 
                `membresiauser`.`id_membreUser` = `historial`.`tarea_membresiaUser`
                JOIN `$dbname`.`membresias` ON 
                `membresias`.`id_membresia` = `historial`.`tarea_membresia`
                WHERE `historial`.`tarea_fOrigen` = '".$fecha."'
                OR `historial`.`tarea_fOrigen` = '".$fechaAnte."'
                ORDER BY `historial`.`id_historial`;"
            );

            $histoRows = $resultadoHistorial->num_rows;

            $arrayHisto = [$histoRows-1];

            if($histoRows > 0){

                while($row = $resultadoHistorial->fetch_assoc()){
                    array_push($arrayHisto, $row);
                }

            };
        
            echo json_encode($arrayHisto, JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------

    // Obteniendo Todas las Reservas para el Administrador de Reservas

        if(isset($_POST["whereReservasAdmin"])){

            $where = $_POST["whereReservasAdmin"];
            $arrayReservasAdmin = [];

            $resultReservas = $conn->query(
                "SELECT * FROM `$dbname`.`reservas` ".$where." ORDER BY `reservas`.`id_reserva` DESC;"
            );

            $rowsReservas = $resultReservas->num_rows;

            if($rowsReservas > 0){

                while($row = $resultReservas->fetch_assoc()){

                    array_push($arrayReservasAdmin, $row);
                    
                }

            }

            echo json_encode($arrayReservasAdmin, JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------

    // Datos Reserva

        if(isset($_POST["idReservaDatos"])){

            $idRese = $_POST["idReservaDatos"];

            $arrayReservasAdmin = [];

            $resultadoRese = $conn->query(
                "SELECT * FROM `$dbname`.`reservas` 
                JOIN `$dbname`.`unidades` 
                ON `$dbname`.`reservas`.`id_unidad` = `$dbname`.`unidades`.`id_unidad` 
                JOIN `$dbname`.`usuarios` 
                ON `$dbname`.`reservas`.`id_usuario` = `$dbname`.`usuarios`.`id_usuario` 
                JOIN `$dbname`.`productos` 
                ON `$dbname`.`reservas`.`id_producto` = `$dbname`.`productos`.`id_producto`
                JOIN `$dbname`.`facturas`
                ON `$dbname`.`facturas`.`id_reserva` = `$dbname`.`reservas`.`id_reserva`
                WHERE `reservas`.`id_reserva` = $idRese;");

            $row = $resultadoRese->fetch_assoc();

            array_push($arrayReservasAdmin, $row);

            echo json_encode($arrayReservasAdmin, JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------
    
    // Datos de los otros miembros en la reserva

        if(isset($_POST["otrosMiembrosData"])){

            $idOtrosMiembros = $_POST["otrosMiembrosData"];

            $arrayOtrosMimebros = [];

            $resultadoOtros = $conn->query(
                "SELECT * FROM `$dbname`.`usuarios`
                WHERE `usuarios`.`id_usuario` IN ($idOtrosMiembros);"
            );

            $rowsOtros = $resultadoOtros->num_rows;

            if($rowsOtros > 0){

                while($row = $resultadoOtros->fetch_assoc()){

                    array_push($arrayOtrosMimebros, $row);
                    
                }

            }

            echo json_encode($arrayOtrosMimebros, JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------

    // Actualizar estado de las reservas (General)

        if(isset($_POST["reseActualiGene"])){

            $arrayReservasGene = [];

            $resultReseGene = $conn->query(
                "SELECT * FROM `$dbname`.`reservas`
                WHERE `reservas`.`estadoReserva` = 'Pendiente'
                OR `reservas`.`estadoReserva` = 'En Proceso';"
            );

            $rowsRese = $resultReseGene->num_rows;

            if($rowsRese > 0){

                while($row = $resultReseGene->fetch_assoc()){

                    array_push($arrayReservasGene, $row);
                    
                }

            }

            echo json_encode($arrayReservasGene, JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------

    // Cancelar Reserva

        if(isset($_POST["idCancelarRese"])){

            $arrayCancelRese = [];

            $idRese = $_POST["idCancelarRese"];

            $resultadoResCancel = $conn->query(
                "SELECT * FROM `$dbname`.`reservas`
                WHERE `reservas`.`id_reserva` = $idRese;"
            );

            $row = $resultadoResCancel->fetch_assoc();

            $fechaAnterior = date("Y-m-d",strtotime($row["fechaReserva"]."- 1 days"));

            array_push($arrayCancelRese, $row);

            echo json_encode([$row["fechaReserva"], $fechaAnterior, $row["horaEntradaR"], $arrayCancelRese], JSON_UNESCAPED_UNICODE);

        }

        if(isset($_POST["horasRestantesCancelRese"])){

            if($_POST["horasRestantesCancelRese"] != 0){

                $horasRestantes = $_POST["horasRestantesCancelRese"];
                $idReserva = $_POST["idReseCancel"];
                $idUserRese = $_POST["idUserCancel"];
                $cargoAdicional = $_POST["cargoAdiciCancel"];
                $tipoDeuda = $_POST["tipoDeudaCancel"];
                $motivoCancel = $_POST["motivoCancelacion"];
                $horaCancelaRese = $_POST["horaCancelaRese"];
                $fechaCancelaRese = $_POST["fechaCancelaRese"];

                $resultadoReseActuCancel = $conn->query(
                    "UPDATE `$dbname`.`reservas` 
                    SET 
                    `estadoReserva` = 'Cancelada', 
                    `reservaCancel24H` = ".intval($horasRestantes).",
                    `reservaMotiCancel` = '".$motivoCancel."',
                    `reservaHcancel` = '".$horaCancelaRese."',
                    `reservaFcancel` = '".$fechaCancelaRese."',
                    `membreCancelCostoAdici` = ".intval($cargoAdicional)."
                    WHERE (`id_reserva` = ".intval($idReserva).");"
                );

                $resultadoDeudaNueva = $conn->query(
                    "INSERT INTO `$dbname`.`deudas_users` 
                    (`tipoDeuda`, `estadoDeuda`, `precioDeuda`, `id_usuario`)
                    VALUES
                    ('".$tipoDeuda."', 'Pendiente', ".intval($cargoAdicional).", ".intval($idUserRese).");"
                );

                $ultimaDeudaInsertada =  $conn->insert_id;

            }else{

                $horaCancelaRese = $_POST["horaCancelaRese"];
                $fechaCancelaRese = $_POST["fechaCancelaRese"];
                $horasRestantes = $_POST["horasRestantesCancelRese"];
                $idReserva = $_POST["idReseCancel"];
                $motivoCancel = $_POST["motivoCancelacion"];

                $resultadoReseActuCancel = $conn->query(
                    "UPDATE `$dbname`.`reservas` 
                    SET 
                    `estadoReserva` = 'Cancelada',
                    `reservaCancel24H` = ".intval($horasRestantes).",
                    `reservaMotiCancel` = '".$motivoCancel."',
                    `reservaHcancel` = '".$horaCancelaRese."',
                    `reservaFcancel` = '".$fechaCancelaRese."',
                    `membreCancelCostoAdici` = 0
                    WHERE (`id_reserva` = ".intval($idReserva).");"
                );

            }

            echo json_encode("Reserva Cancelada con Éxito", JSON_UNESCAPED_UNICODE);

        }

    //---------------------------------------------------------------------------------------------------------------------

    //------------------------------------
    // <<-- Consultas SQL | FIN -->>
    //------------------------------------
    //---------------------------------------------------------------------------------------------------------------------

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

?>
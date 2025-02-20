<?php

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
   
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    session_start();

    require("conexion.php");

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    $meses = [
        1=>"enero", 
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
        12=>"diciembre"
    ];

    if(isset($_SESSION["iniciado"])){

        // Registrar Factura Mensualidad
        if(isset($_POST["regisFactuMensualidad"])){

            $fechaCreaFac = $_POST["fechaCreaFac"];
            $horaCreaFac = $_POST["horaCreaFac"];
            $serieFac = $_POST["serieFac"];
            $codigoFac = $_POST["codigoFac"];
            $userCodEpayco = $_POST["codigoUserEpayco"];
            $mensuaMembresia = $_POST["mensuaMembresia"];
            $ivaCantMembresia = $_POST["ivaCantMembresia"];
            $descuCantMembresia = $_POST["descuCantMembresia"];
            $totalMembresia = $_POST["totalMembresia"];
            $membresiaIDEpayco = $_POST["membresiaIDEpayco"];
            $membresiaCodigoEpayco = $_POST["membresiaCodigoEpayco"];
            $codigoFac = $_POST["codigoFac"];
            $referenciaEpayco = $_POST["referenciaEpayco"];
            $franquiciaCard = $_POST["franquiciaCard"];
            $bancoCard = $_POST["bancoCard"];
            $factuEpaycoCod = $_POST["factuEpaycoCod"];
            $respuestaTransa = $_POST["respuestaTransa"];
            $motivoTransa = $_POST["motivoTransa"];
            $tokenCardEpayco = $_POST["tokenCardEpayco"];
            $idUser = $_POST["idUser"];
            $idMembresiaUser = $_POST["idMembresiaUser"];

            $membreIdEpayco = explode("-", $factuEpaycoCod);
            $membreIdEpayco = $membreIdEpayco[0];

            $resultMembresia = $conn->query(
                "SELECT `membreFechaPagoP` FROM `soqkyjmy_bizclubPlataformaDb`.`membresiauser`
                WHERE `membresiauser`.`membreIdEpayco` = '$membresiaIDEpayco';"
            );

            $resultMembresia = $resultMembresia->fetch_assoc();

            $fechaFacCaduca = date("Y-m-d",strtotime($resultMembresia["membreFechaPagoP"]."+ 30 days")); 
            
            $insertFactu = $conn->query(
                "INSERT INTO `soqkyjmy_bizclubPlataformaDb`.`facturas` 
                (`refEpayco`, `epaycoRespuesta`, `epaycoMotivo`, `factuEpayco`, 
                `facturaCodigo`, `facturaSerie`, `fechaFactura`, `horaFactura`, 
                `fechaFacturaV`, `estadoFactura`, `precioFactura`, `factuSubTotal`, 
                `ivaFactura`, `descuFactura`, `montoFactuTotal`, `tokenCliente`, 
                `tokenTarjeta`, `metodoPago`, `tarjetaFranquicia`, `bancoNombre`, 
                `idPlanEpayco`, `id_producto`, `id_usuario`, `id_membresia`, 
                `id_unidad`, `id_reserva`)
                VALUES
                ('$referenciaEpayco', '$respuestaTransa', '$motivoTransa', '$factuEpaycoCod',
                '$codigoFac', '$serieFac', '$fechaCreaFac', '$horaCreaFac', 
                '$fechaFacCaduca', 'Pagada', $mensuaMembresia, $mensuaMembresia,
                $ivaCantMembresia, $descuCantMembresia, $totalMembresia, '$userCodEpayco',
                '$tokenCardEpayco', 'TDC', '$franquiciaCard', '$bancoCard',
                '$membresiaCodigoEpayco', 0, $idUser, $idMembresiaUser,
                0, 0);"
            );

            $idinsertadoFac = $conn->insert_id;

            $updateMembreUser = $conn->query(
                "UPDATE `soqkyjmy_bizclubPlataformaDb`.`membresiauser` 
                SET `membreFechaPagoP` = '$fechaFacCaduca' 
                WHERE (`membreIdEpayco` = '$membreIdEpayco');"
            );

            echo json_encode([$fechaFacCaduca, $idinsertadoFac], JSON_UNESCAPED_UNICODE);

        }
        //--------------------------------------------------------------------------------------------------------------

        // Activar/Desactivar Membresía
        if(isset($_POST["habiliInabiliMembre"])){
            
            $idMembresiaUser = $_POST["idMembresiaUser"];
            $estadoMembre = $_POST["estadoMembre"];

            $resultUpdateMembre = $conn->query(
                "UPDATE `soqkyjmy_bizclubPlataformaDb`.`membresiauser` SET `membreEstado` = '$estadoMembre' WHERE (`membreIdEpayco` = '$idMembresiaUser');"
            );

            echo json_encode('Cuenta '.$estadoMembre, JSON_UNESCAPED_UNICODE);

        }
        //---------------------------------------------------------------------------------------------
        
        // Fecha de Pago Próxima - Mensualidad Membresía
        if(isset($_POST["fechaProxPagoMensu"])){

            $idMembresia = $_POST["idMembreEpayco"];

            $resultMembresia = $conn->query(
                "SELECT `membreFechaPagoP` FROM `soqkyjmy_bizclubPlataformaDb`.`membresiauser`
                WHERE `membresiauser`.`membreIdEpayco` = '$idMembresia';"
            );

            $resultMembresia = $resultMembresia->fetch_assoc();

            $resultFactura = $conn->query(
                "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`facturas`
                WHERE `facturas`.`fechaFactura` = '".$resultMembresia["membreFechaPagoP"]."'
                AND `facturas`.`factuEpayco` LIKE '%".$idMembresia."%';"
            );

            $resultFactura = $resultFactura->fetch_assoc();

            echo json_encode([$resultMembresia, $resultFactura], JSON_UNESCAPED_UNICODE);

        }

        //-------------------------------------------------------------------------------------------------------------------

        // Servicios - CLIENTE

        if(isset($_POST["serviciosCLIMostrar"])){

            $resultServices = $conn->query(
                "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`productos`;"
            );

            $numRowsServi = $resultServices->num_rows;

            $arrayServicios = [$numRowsServi-1];

            if($numRowsServi > 0){

                while($row = $resultServices->fetch_assoc()){

                    array_push($arrayServicios, $row);

                }

            }

            echo json_encode($arrayServicios, JSON_UNESCAPED_UNICODE);

        }

        //------------------------------------------------------------------------------------------------------------------
        
        if(isset($_POST["fechaMesReser"])){
            
            $mesNumero = $_POST["fechaMesReser"];
            $mesNumeroA = $_POST["fechaMesReserA"];
            $mesNumeroP = $_POST["fechaMesReserP"];
            $mesTexto = $_POST["fechaMesTReser"];
            $mesTextoA = $_POST["fechaMesTReserA"];
            $mesTextoP = $_POST["fechaMesTReserP"];
            $anioNumero = $_POST["fechaAñoReser"];
            $anioNumeroA = $_POST["fechaAñoReserA"];
            $anioNumeroP = $_POST["fechaAñoReserP"];
            $idProducto = $_POST["productoId"];

            $fecha = $meses[$mesNumero]."-".$anioNumero;
            $fechaA = $meses[$mesNumeroA]."-".$anioNumeroA;
            $fechaP = $meses[$mesNumeroP]."-".$anioNumeroP;
            $arrayReservas = [];

            if($idProducto == ""){

                $resultadoReservas = 
                $conn->query(
                    "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                    WHERE `reservas`.`serieReserva` = '".$fecha."'
                    AND `reservas`.`estadoReserva` = 'Pendiente'
                    $idProducto
                    OR `reservas`.`serieReserva` = '".$fechaP."'
                    AND `reservas`.`estadoReserva` = 'Pendiente'
                    $idProducto;");

            }else{

                $resultadoReservas = 
                $conn->query(
                    "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                    WHERE `reservas`.`estadoReserva` = 'Pendiente'
                    $idProducto;");

            }
            
            
            $numRowsReser = $resultadoReservas->num_rows;

            if($numRowsReser > 0){

                while($row = $resultadoReservas->fetch_assoc()){

                    array_push($arrayReservas, $row);

                }

            }
            
            echo json_encode($arrayReservas, JSON_UNESCAPED_UNICODE);

        }

        //------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["pdtSelectReseNew"])){

            $nombre = $_POST["pdtSelectReseNew"];

            $resultadoPdt = $conn->query(
                "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`productos` 
                WHERE `productos`.`produNombre` 
                LIKE '%".$nombre."%'");

            $numRowsPdt = $resultadoPdt->num_rows;

            $htmlPdtNewRese = "";

            if($numRowsPdt > 0){

                while($row = $resultadoPdt->fetch_assoc()){

                    $htmlPdtNewRese .= '
                    <div class="divProducto" onclick="selectPdtNewRese('.$row["id_producto"].')">
                        <div class="imgDiv">
                            <img src="images/productosImages/'.$row["productoImgPrin"].'" alt="">
                        </div>
                        <div class="divDato">
                            <span>'.$row["produNombre"].'</span>
                        </div>
                    </div>';

                }

            }else{

                $htmlPdtNewRese = '<span class="pdtNOencontrado">Producto NO Encontrado</span>';
                
            }
        
            echo json_encode($htmlPdtNewRese, JSON_UNESCAPED_UNICODE);

        }

        //------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["idPdtSelected"])){

            $idPdt = 
                $_POST["idPdtSelected"] != null && $_POST["idPdtSelected"] != ""
                ? $conn->real_escape_string($_POST["idPdtSelected"])
                : null;

            if($idPdt != null && is_numeric($idPdt)){

                $resultPdtSele = $conn->query(
                    "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`productos` 
                    WHERE `productos`.`id_producto` = $idPdt");
    
                $numRowsPdtSele = $resultPdtSele->num_rows;

                $htmlPdtSelected = "";
    
                if($numRowsPdtSele > 0){
    
                    while($row = $resultPdtSele->fetch_assoc()){

                        $caracteristicas = explode(",", $row["produCaracteris"]);
                        $caracterHtml = "";
                        $separador = "";

                        if($row["produCaracteris"] != ""){
                            foreach($caracteristicas as $caracte){
                                $caracterHtml .= '<div>'.$caracte.'</div>';
                            }
                        }

                        if($row["produTipo"] != ""){
                            $separador = '<span>|</span>';
                        }
    
                        $htmlPdtSelected .= '
                        <div class="pdtElegido">
                            <div class="imgDiv">
                                <img src="images/productosImages/'.$row["productoImgPrin"].'" alt="">
                            </div>
                            <div class="divDatos">
                                <span class="nombrePdt">'.$row["produNombre"].'</span>
                                <div class="categoTipoDiv">
                                    <span class="categoria" id="categoriaRese">'.$row["produCategoria"].'</span>
                                    '.$separador.'
                                    <span class="tipo">'.$row["produTipo"].'</span>
                                </div>
                                <div class="divDescriCaracte">
                                    <div class="divDescripGene">
                                        <span class="descripSpan">Descripción</span>
                                        <p class="descripcion">'.$row["produDescri"].'</p>
                                    </div>
                                    <div class="separador"></div>
                                    <div class="divCaracGene">
                                        <span class="caractSpan">Características</span>
                                        <div class="divGeneCaract">
                                            '.$caracterHtml.'
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" id="nombrePdt" value="'.$row["produNombre"].'">
                                <input type="hidden" id="idPdtSelected" value="'.$row["id_producto"].'">
                                <input type="hidden" id="precioPdt" value="'.$row["produPrecio"].'">
                                <input type="hidden" tipo="hora" class="precioXH btnTReseIn" value="'.$row["precioXhora"].'">
                                <input type="hidden" tipo="dia" class="precioXD btnTReseIn" value="'.$row["precioXDia"].'">
                                <input type="hidden" tipo="semana" class="precioXS btnTReseIn" value="'.$row["precioXSemana"].'">
                                <input type="hidden" class="maxPersoInput" value="'.$row["productoMaxPerso"].'">
                                <input type="hidden" id="descriCortaPdt" value="'.$row["produDescriCorta"].'">
                                <input type="hidden" id="ivaPdtElegido" value="'.$row["produIva"].'">
                                <input type="hidden" id="ivaDescuElegido" value="'.$row["produDescu"].'">
                                <input type="hidden" id="pdtUnidadesDispo" value="'.$row["unidDisponibles"].'">
                            </div>
                            <div class="divSvg" onclick="limpiarPdtSelect()">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.71 174.71"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M111.41,95.37a11.33,11.33,0,0,1,0-16l60-60a11.34,11.34,0,0,0,0-16h0a11.34,11.34,0,0,0-16,0l-60,60a11.33,11.33,0,0,1-16,0l-60-60a11.34,11.34,0,0,0-16,0h0a11.34,11.34,0,0,0,0,16l60,60a11.33,11.33,0,0,1,0,16l-60,60a11.34,11.34,0,1,0,16,16l60-60a11.33,11.33,0,0,1,16,0l60,60a11.34,11.34,0,1,0,16-16Z"/></g></g></svg>
                            </div>
                        </div>';
    
                    }
    
                }
            
                echo json_encode($htmlPdtSelected, JSON_UNESCAPED_UNICODE);

            }

        }

        //------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["miemSelectReseNew"])){
            
            $nomMiembro = $_POST["miemSelectReseNew"];

            $resultadoMiem = $conn->query(
                "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`usuarios` 
                WHERE `usuarios`.`user_nombre` 
                LIKE '%".$nomMiembro."%'
                OR `usuarios`.`user_apellido`
                LIKE '%".$nomMiembro."%'");

            $numRowsMiem = $resultadoMiem->num_rows;

            $htmlMiemNewRese = "";

            if($numRowsMiem > 0){

                while($row = $resultadoMiem->fetch_assoc()){

                    $htmlMiemNewRese .= '
                    <div class="divMiembro" onclick="seleMiemNewRese('.$row["id_usuario"].')">
                        <div class="div1">
                            <img src="imagesUser/'.$row["user_imagen"].'" alt="">
                        </div>
                        <div class="div2">
                            <span>'.$row["user_nombre"].' '.$row["user_apellido"].'</span>
                            <span>'.$row["user_cargo"].' - '.$row["user_empresa"].'</span>
                        </div>
                    </div>';

                }

            }else{

                $htmlMiemNewRese = '<span class="miemNOencontrado">Miembro NO Encontrado</span>';
                
            }
        
            echo json_encode($htmlMiemNewRese, JSON_UNESCAPED_UNICODE);

        }

        //------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["idMiemSelected"])){

            $idMiem = 
                $_POST["idMiemSelected"] != null && $_POST["idMiemSelected"] != ""
                ? $conn->real_escape_string($_POST["idMiemSelected"])
                : null;

            if($idMiem != null && is_numeric($idMiem)){

                $resultMiemSele = $conn->query(
                    "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`usuarios` 
                    WHERE `usuarios`.`id_usuario` = $idMiem");
    
                $numRowsMiemSele = $resultMiemSele->num_rows;

                $htmlMiemSelected = "";
    
                if($numRowsMiemSele > 0){
    
                    while($row = $resultMiemSele->fetch_assoc()){

                        $htmlMiemSelected .= '
                        <div class="divMElegido">
                            <div class="imgDiv">
                                <img src="imagesUser/'.$row["user_imagen"].'" alt="">
                            </div>
                            <div class="divSpan">
                                <span>'.$row["user_nombre"].' '.$row["user_apellido"].'</span>
                                <span>'.$row["user_cargo"].' - '.$row["user_empresa"].'</span>
                            </div>
                            <div class="divSvg">
                                <svg onclick="limpiarMiemSelect()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.71 174.71"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M111.41,95.37a11.33,11.33,0,0,1,0-16l60-60a11.34,11.34,0,0,0,0-16h0a11.34,11.34,0,0,0-16,0l-60,60a11.33,11.33,0,0,1-16,0l-60-60a11.34,11.34,0,0,0-16,0h0a11.34,11.34,0,0,0,0,16l60,60a11.33,11.33,0,0,1,0,16l-60,60a11.34,11.34,0,1,0,16,16l60-60a11.33,11.33,0,0,1,16,0l60,60a11.34,11.34,0,1,0,16-16Z"/></g></g></svg>
                            </div>
                        </div>';
    
                    }
    
                }
            
                echo json_encode($htmlMiemSelected, JSON_UNESCAPED_UNICODE);

            }

        }

        //------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["idUnidSelected"])){

            $idUnid = 
                $_POST["idUnidSelected"] != null && $_POST["idUnidSelected"] != ""
                ? $conn->real_escape_string($_POST["idUnidSelected"])
                : null;

            if($idUnid != null && is_numeric($idUnid)){

                $resultUnidSele = $conn->query(
                    "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`unidades` 
                    WHERE `unidades`.`id_unidad` = $idUnid");

                $numRowsUnidSele = $resultUnidSele->num_rows;

                $htmlUnidSelected = "";

                if($numRowsUnidSele > 0){

                    while($row = $resultUnidSele->fetch_assoc()){

                        $htmlUnidSelected .= '
                        <div class="divUnidad">
                            <div class="divImg">
                                <img src="images/productosImages/'.$row["unidad_imagen"].'" alt="">
                            </div>
                            <div class="divData">
                                <span>'.$row["unidad_nombre"].'</span>
                            </div>
                            <div class="divSvg">
                                <svg onclick="limpiarUnid()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.71 174.71"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M111.41,95.37a11.33,11.33,0,0,1,0-16l60-60a11.34,11.34,0,0,0,0-16h0a11.34,11.34,0,0,0-16,0l-60,60a11.33,11.33,0,0,1-16,0l-60-60a11.34,11.34,0,0,0-16,0h0a11.34,11.34,0,0,0,0,16l60,60a11.33,11.33,0,0,1,0,16l-60,60a11.34,11.34,0,1,0,16,16l60-60a11.33,11.33,0,0,1,16,0l60,60a11.34,11.34,0,1,0,16-16Z"/></g></g></svg>
                            </div>
                        </div>';

                    }

                }
            
                echo json_encode($htmlUnidSelected, JSON_UNESCAPED_UNICODE);
            
            }

        }

        //------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["fechaReservasLT"])){

            $fechaRese = $_POST["fechaReservasLT"];
            $arrayReservasDia = [];

            // Reserva por Día
            $resultadoReser = 
                $conn->query(
                    "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                    WHERE `reservas`.`reserDiaFechas` LIKE '%".$fechaRese."%';");
            
            $numRowsRese = $resultadoReser->num_rows;

            if($numRowsRese > 0){

                while($row = $resultadoReser->fetch_assoc()){

                    array_push($arrayReservasDia, $row);

                }

            }

            // Reservas por Semana
            $resultadoReser = 
                $conn->query(
                    "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                    WHERE `reservas`.`reserSemanaFechas` LIKE '%".$fechaRese."%';");
            
            $numRowsRese = $resultadoReser->num_rows;

            if($numRowsRese > 0){

                while($row = $resultadoReser->fetch_assoc()){

                    array_push($arrayReservasDia, $row);

                }

            }

            // Reserva por hora
            $resultadoReser = 
                $conn->query(
                    "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                    WHERE `reservas`.`fechaReserva` = '".$fechaRese."'
                    AND `reservas`.`reserTipo` = 'hora';");
            
            $numRowsRese = $resultadoReser->num_rows;

            if($numRowsRese > 0){

                while($row = $resultadoReser->fetch_assoc()){

                    array_push($arrayReservasDia, $row);

                }

            }
            
            echo json_encode($arrayReservasDia, JSON_UNESCAPED_UNICODE);

        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            //------------------------------------------------------------------------------------------------------------------
            
            // Revisando las unidades disponibles para la reserva (RESERVA X HORA)
            if(isset($_POST["unidDispoXH"])){

                $unidDispo = $_POST["unidDispoXH"];

                $htmlUnidLista = "";

                $resultadoUnidDispo = 
                    $conn->query(
                        "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`unidades`
                        WHERE `unidades`.`id_unidad` IN ($unidDispo);"
                    );

                $numRowsUnid = $resultadoUnidDispo->num_rows;    

                if($numRowsUnid > 0){

                    while($row = $resultadoUnidDispo->fetch_assoc()){

                        $htmlUnidLista .= '
                        <div class="unidad" onclick="selecUnidNewRese('.$row["id_unidad"].')">
                            <div class="div1">
                                <img src="images/productosImages/'.$row["unidad_imagen"].'" alt="">
                            </div>
                            <div class="div2">
                                <span>'.$row["unidad_nombre"].'</span>
                            </div>
                        </div>';

                    }

                }
            
                echo json_encode($htmlUnidLista, JSON_UNESCAPED_UNICODE);

            }

            //------------------------------------------------------------------------------------------------------------------

            //------------------------------------------------------------------------------------------------------------------

            // Revisando la disponibilidad del horario para la reserva (RESERVA X HORA)
            if(isset($_POST["verifiHorarioXHora"])){

                $fechaReseXHora = $_POST["fechaReservasXH"];

                $arrayReservasXH = [];
                
                // Reservas

                    // Reservas por HORA
                    $resultadoHora = $conn->query(
                        "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                        WHERE `reservas`.`reserTipo` = 'hora'
                        AND `reservas`.`fechaReserva` = '".$fechaReseXHora."';"
                    );

                    $numeroRowsXH = $resultadoHora->num_rows;

                    if($numeroRowsXH > 0){
                        
                        while($row = $resultadoHora->fetch_assoc()){

                            array_push($arrayReservasXH, $row);
                            
                        }

                    }
                    //-------------------------------------------------------------------------------------

                    // Reservas por DÍA
                    $resultadoDia = $conn->query(
                        "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                        WHERE `reservas`.`reserDiaFechas` LIKE '%".$fechaReseXHora."%';"
                    );

                    $numeroRowsXD = $resultadoDia->num_rows;

                    if($numeroRowsXD > 0){
                        
                        while($row = $resultadoDia->fetch_assoc()){

                            array_push($arrayReservasXH, $row);
                            
                        }

                    }
                    //-------------------------------------------------------------------------------------

                    // Reservas por SEMANA
                    $resultadoSema = $conn->query(
                        "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                        WHERE `reservas`.`reserSemanaFechas` LIKE '%".$fechaReseXHora."%';"
                    );

                    $numeroRowsXS = $resultadoSema->num_rows;

                    if($numeroRowsXS > 0){
                        
                        while($row = $resultadoSema->fetch_assoc()){

                            array_push($arrayReservasXH, $row);
                            
                        }

                    }
                    //-------------------------------------------------------------------------------------

                //-----------------------------------------------------------------------------------------
                
                echo json_encode($arrayReservasXH, JSON_UNESCAPED_UNICODE);

            }
            //------------------------------------------------------------------------------------------------------------------

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            // Revisando la disponibilidad del horario para la reserva (RESERVA X DÍA)
            if(isset($_POST["fechaDiaElegidaXD"])){

                $diasElegidos = $_POST["fechaDiaElegidaXD"];

                $diaSemana = explode(",", $_POST["fechaDiaElegidaXD"]);
                $likeWhereDia = "";
                $likeWhereDia2 = "";
                $likeWhereSema = "";

                for($i = 0; $i < count($diaSemana); $i++){

                    if($i == (count($diaSemana)-1)){

                        $likeWhereDia .= "`reservas`.`reserDiaFechas` LIKE '%".$diaSemana[$i]."%'";
                        $likeWhereDia2 .= "'".$diaSemana[$i]."'";
                        $likeWhereSema .= "`reservas`.`reserSemanaFechas` LIKE '%".$diaSemana[$i]."%'";

                    }else{

                        $likeWhereDia .= "`reservas`.`reserDiaFechas` LIKE '%".$diaSemana[$i]."%' OR ";
                        $likeWhereDia2 .= "'".$diaSemana[$i]."',";
                        $likeWhereSema .= "`reservas`.`reserSemanaFechas` LIKE '%".$diaSemana[$i]."%' OR ";

                    }

                }

                // Consulta por día

                    $arrayReservasXD = null;
                    $arrayReservasXD = [];

                    // Reservas Existentes

                        // Reservs por Semana

                        $resultadoHora = $conn->query(
                            "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                            WHERE `reservas`.`reserTipo` = 'semana'
                            AND ".$likeWhereSema.";"
                        );

                        $numRowsXD = $resultadoHora->num_rows;

                        if($numRowsXD > 0){

                            while($row = $resultadoHora->fetch_assoc()){

                                array_push($arrayReservasXD, $row);
                                
                            }

                        }

                        //---------------------------------------------------------------

                        // Reservas por Día

                        $resultadoHora = $conn->query(
                            "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                            WHERE ".$likeWhereDia.";"
                        );

                        $numRowsXD = $resultadoHora->num_rows;

                        if($numRowsXD > 0){

                            while($row = $resultadoHora->fetch_assoc()){

                                array_push($arrayReservasXD, $row);
                                
                            }

                        }

                        //-----------------------------------------------------------------------------------

                        // Reservas por Hora

                        $resultadoHora = $conn->query(
                            "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                            WHERE `reservas`.`reserTipo` = 'hora'
                            AND `reservas`.`fechaReserva` IN (".$likeWhereDia2.");"
                        );

                        $numRowsXD = $resultadoHora->num_rows;

                        if($numRowsXD > 0){

                            while($row = $resultadoHora->fetch_assoc()){

                                array_push($arrayReservasXD, $row);
                                
                            }

                        } 

                        //--------------------------------------------------------------------------------------

                    //----------------------------------------------------------------------------------------------------------------

                //-----------------------------------------------------------------------------------

                echo json_encode($arrayReservasXD, JSON_UNESCAPED_UNICODE);
                
            }
            //------------------------------------------------------------------------------------------------------------------

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        //------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["tituloReseResFac"])){

            $tituloRese = $_POST["tituloReseResFac"];

            echo json_encode($tituloRese, JSON_UNESCAPED_UNICODE);

        }

        //------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["diaInicioDiasAdd"])){
            
            $diasInicio = $_POST["diaInicioDiasAdd"];
            $diasFinal = $_POST["diaFinalDiasAdd"];
            $fecha = $_POST["diaFecha"];
            $posicionSemana = $_POST["posicionSemana"];
            $fechaCadena = "";
            $estadoSemana = "";

            $semanaPosSuma = 7*intval($posicionSemana);

            $fechaNuevaI = date("Y-m-d",strtotime($fecha."+ ".$diasInicio." days"));
            $fechaNuevaI = date("Y-m-d",strtotime($fechaNuevaI."+ ".$semanaPosSuma." days"));
            $fechaNuevaF = date("Y-m-d",strtotime($fechaNuevaI."+ ".$diasFinal." days"));
            $fechaCadenaMuestra = $fechaNuevaI."_".$fechaNuevaF;
            $fechaCompletaDiaHora =  "'".$fechaNuevaI."',";
            $fechaCadenaCompleta = $fechaNuevaI.",";
            $likeWhereSema = "`reservas`.`reserSemanaFechas` LIKE '%".$fechaNuevaI."%' OR";
            $likeWhereDia = "`reservas`.`reserDiaFechas` LIKE '%".$fechaNuevaI."%' OR";

            for($i = 0; $i < intval($diasFinal); $i++){

                if($i == intval($diasFinal)-1){
                    $date = date("Y-m-d",strtotime($fechaNuevaI."+ ".($i+1)." days"));
                    $fechaCadenaCompleta .= $date;
                    $fechaCompletaDiaHora .= "'".$date."'";
                    $likeWhereDia .= "`reservas`.`reserDiaFechas` LIKE '%".$date."%'";
                    $likeWhereSema .= "`reservas`.`reserSemanaFechas` LIKE '%".$date."%'";
                }else{
                    $date = date("Y-m-d",strtotime($fechaNuevaI."+ ".($i+1)." days"));
                    $fechaCadenaCompleta .= $date.",";
                    $fechaCompletaDiaHora .= "'".$date."',";
                    $likeWhereDia .= "`reservas`.`reserDiaFechas` LIKE '%".$date."%' OR ";
                    $likeWhereSema .= "`reservas`.`reserSemanaFechas` LIKE '%".$date."%' OR";
                }
                
            }

            // Disponibilidad
            $arrayReservasXS = null;
            $arrayReservasXS = [];

            // Reservas Existentes

                // Reservas por Hora

                    $resultadoHora = $conn->query(
                        "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                        WHERE `reservas`.`reserTipo` = 'hora'
                        AND `reservas`.`fechaReserva` IN (".$fechaCompletaDiaHora.");"
                    );

                    $numRowsXD = $resultadoHora->num_rows;

                    if($numRowsXD > 0){

                        while($row = $resultadoHora->fetch_assoc()){

                            array_push($arrayReservasXS, $row);
                            
                        }

                    } 

                //--------------------------------------------------------------------------------------

                // Reservas por Día

                    $resultadoHora = $conn->query(
                        "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                        WHERE ".$likeWhereDia.";"
                    );

                    $numRowsXD = $resultadoHora->num_rows;

                    if($numRowsXD > 0){

                        while($row = $resultadoHora->fetch_assoc()){

                            array_push($arrayReservasXS, $row);
                            
                        }

                    }

                //-----------------------------------------------------------------------------------

                // Reservs por Semana

                    $resultadoHora = $conn->query(
                        "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`reservas`
                        WHERE ".$likeWhereSema.";"
                    );

                    $numRowsXD = $resultadoHora->num_rows;

                    if($numRowsXD > 0){

                        while($row = $resultadoHora->fetch_assoc()){

                            array_push($arrayReservasXS, $row);
                            
                        }

                    }

                //---------------------------------------------------------------

            //----------------------------------------------------------------------------------------------------------------

            echo json_encode([$arrayReservasXS, $fechaNuevaI, $fechaNuevaF, $fechaCadenaCompleta], JSON_UNESCAPED_UNICODE);
            

            // echo json_encode([$fechaNuevaI, $fechaNuevaF, $fechaCadenaCompleta], JSON_UNESCAPED_UNICODE);

        }

        //------------------------------------------------------------------------------------------------------------------

        if(isset($_POST["fechaSuma"])){
            
            $fecha = $_POST["fechaSuma"];
            $dias = $_POST["dias"];
            $fechaCadena = "";

            if(intval($dias) > 0){

                $fechaNueva = date("Y-m-d",strtotime($fecha."+ ".$dias." days"));
                $fechaCadena = $fecha.",";

                for($i = 0; $i < intval($dias); $i++){

                    if($i == intval($dias)-1){
                        $date = date("Y-m-d",strtotime($fecha."+ ".($i+1)." days"));
                        $fechaCadena .= $date;
                    }else{
                        $date = date("Y-m-d",strtotime($fecha."+ ".($i+1)." days"));
                        $fechaCadena .= $date.",";
                    }
                    
                }

            }else{

                $fechaNueva = $fecha;
                $fechaCadena = $fecha.",".$fecha;
            }

            echo json_encode([$fechaNueva, $fechaCadena], JSON_UNESCAPED_UNICODE);

        }

        //--------------------------------------------------------------------------------------------------------------------
    
    }else{

        header("location: inicioSesion.php");

    }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

?>
<?php

    session_start();

    require("conexion.php");

    // Buscando USER INCIADO
    
    $userId = $_SESSION["iniciado"];

    $resultUserIni = $conn->query(
        "SELECT * FROM `bizlabDB`.`usuarios` 
        WHERE `usuarios`.`id_usuario` = $userId;"
    );

    $numRowsUserI = $resultUserIni->num_rows;
    $resultUserIni = $resultUserIni->fetch_assoc();

    //------------------------------------------------------

    $usuarios = [];
    if (isset($_GET['query'])) {
        $query = $conn->real_escape_string($_GET['query']);

        $result = $conn->query(
            "SELECT u.*, m.membre_nombre 
            FROM `bizlabDB`.`usuarios` u
            LEFT JOIN `bizlabDB`.`membresias` m ON u.user_membresia = m.id_membresia
            WHERE u.`user_nombre` LIKE '%$query%' 
            OR u.`user_apellido` LIKE '%$query%'"
        );

        if (!$result) {
            die("Error en la consulta: " . $conn->error);
        }

        while ($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($usuarios);
        exit; 
    }
?>


<!DOCTYPE html>
<html lang="en" class="administracionHTML">
    <head>
        
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BizClub Administración</title>
        <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
        <link rel="stylesheet" href="estilos/administracion.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

        <input type="hidden" value="<?php echo($datosString); ?>" id="arrayNombresInput" name="arrayNombresInput">
        <input type="hidden" value="<?php echo $_SESSION["stdProd"];?>" class="stdProd">
        
        <form id="formIdIniciado" name="formIdIniciado" method="post" action="usuarioPerfil.php">
            <input type="hidden" value="<?php echo $_SESSION["iniciado"]; ?>" id="idIniciadoUser" name="idIniciadoU">
        </form>
        
        <form id="formCreProd" name="formCreProd" method="post" action="crearProd.php">
            <input value="producto" id="tipoInputCreP" name="productoCrear" type="hidden">
        </form>
    
        <form id="formCreUnid" name="formCreUnid" method="post" action="crearProd.php">
            <input value="unidad" id="tipoInputCreP" name="productoCrear" type="hidden">
        </form>

        <!-- Datos Nueva Reserva -->
        
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_idPdtSelecNR" name="inO_idPdtSelecNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_tipoReseNR" name="inO_tipoReseNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_idUserNR" name="inO_idUserNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_idUnidNR" name="inO_idUnidNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_idOtrosUsersNR" name="inO_idOtrosUsersNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_fechaInicioNR" name="inO_fechaInicioNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_fechaFinalNR" name="inO_fechaFinalNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_horaInicioNR" name="inO_horaInicioNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_horaFinalNR" name="inO_horaFinalNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_cadenaFechasNR" name="inO_cadenaFechasNR" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_numPersonasNRA" name="inO_numPersonasNRA" value="">

        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_maxPersoNum" name="inO_maxPersoNum" value="">

        <!-- Por Hora -->
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_cantHorasNR" name="inO_cantHorasNR" value="">

        <!-- Por Día -->
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_cantDiasNR" name="inO_cantDiasNR" value="">

        <!-- Por Semana -->
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_iniSemanaFecha" name="inO_iniSemanaFecha" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_finSemanaFecha" name="inO_finSemanaFecha" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_cantSemanas" name="inO_cantSemanas" value="">

        <!-- Por Mes -->
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_iniMesFecha" name="inO_iniMesFecha" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_finMesFecha" name="inO_finMesFecha" value="">
        <input type="hidden" style="font-size: 1.8rem; padding-left: 1rem" id="inO_cantMeses" name="inO_cantMeses" value="">

        <!------------------------------------------------------------------------------------------------>
        
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    </head>
    <body class="body">
        <div id="fondoNegroNewRese" class="fondoNegroNewRese fondoNegroNewRese-O">
            <div class="baseBotones baseBotones-O">
                <span class="stdRegistroRese stdRegistroRese-O"></span>
                <button 
                    id = "btn_cancelar"
                    class="btn_cancelar btn_cancelar-D"
                >
                Cancelar
                </button>
                <button 
                    id = "btn_reservar"
                    class="btn_reservar btn_reservar-B" 
                    disabled
                >
                Reservar Ahora
                </button>
            </div>
            <div class="baseReseGeneral">
                <div class="dataReseBaseGene">
                    <span class="spanGeneral">Datos de la Reserva</span>
                    <div class="divReseProduBaseGene">
                        <span class="spanPdt">Producto</span>
                        <div class="divInputPdt">
                            <div id="div_pdtSeleContainer" class="pdtSeleContainer pdtSeleContainer-O">
                            </div>
                            <input
                                type="text" 
                                id="in_pdtNomAdminNR"
                                class="in_pdtNomAdminNR-V"
                                placeholder="¿Qué quiere reservar?"
                            >
                            <div id="div_listaPdt" class="listaPdt-O">
                            </div>
                        </div>
                    </div>
                    <div class="divGeneBaseInput">
                        <div class="divFacturaGeneDiv">
                        </div>
                        <div class="divInputsDivGene">
                            <div id="div_tipoReseYTiempoGene" class="div_tipoReseYTiempoGene div_tipoReseYTiempoGene-O">
                                <div class="separador"></div>
                                <div class="base1">
                                    <div class="div_tipoReseBase">
                                        <span>Tipo de Reserva</span>
                                        <button tipo="hora" id="btnReseXH" class="btnTipoRese" onclick="limpiarUnidadaTipoRese()" disabled>Por Hora</button>
                                        <button tipo="dia" id="btnReseXD" class="btnTipoRese" onclick="limpiarUnidadaTipoRese()" disabled>Por Día</button>
                                        <button tipo="semana" id="btnReseXS" class="btnTipoRese" onclick="limpiarUnidadaTipoRese()" disabled>Por Semana</button>
                                        <button tipo="mes" id="btnReseXM" class="btnTipoRese" onclick="limpiarUnidadaTipoRese()">Por Mes</button>
                                    </div>
                                    <div id="div_tiempoReseBase" class="div_tiempoReseBase div_tiempoReseBase-O">
                                    </div>
                                </div>
                                <div class="separador"></div>
                                <div class="miembroDivGene">
                                    <div class="miembroDiv">
                                        <span class="miembroSpan">Miembro (Requerido)</span>
                                        <div class="miembroDiv2">
                                            <div id="div_miemElegidoNRA" class="div_miemElegidoNRA div_miemElegidoNRA-O">
                                            </div>
                                            <input 
                                                class="in_miembroNombreNRA in_miembroNombreNRA-D" 
                                                id="in_miembroNombreNRA"
                                                placeholder="Escriba el nombre del solicitante"
                                            >
                                            <div id="div_listaMiembroNRA" class="div_listaMiembroNRA div_listaMiembroNRA-O">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="miembrosDiv">
                                        <div class="miembrosSpan">Otros Miembros (Opcional)</div>
                                        <div class="miembrosDiv2">
                                            <div id="div_miembrosElegiNRA" class="div_miembrosElegiNRA div_miembrosElegiNRA-O">
                                            </div>
                                            <input 
                                                class="in_otrosMiembrosNRA in_otrosMiembrosNRA-D" 
                                                id="in_otrosMiembrosNRA"
                                                placeholder="Escriba el nombre de los invitados"
                                            >
                                            <div class="div_lisOMiembrosNRA div_lisOMiembrosNRA-O" id="div_lisOMiembrosNRA">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="separador"></div>
                                <div class="divNumPerso">
                                    <span class="numPersoSpan">Número de Personas (Requerido)</span>
                                    <div class="divNumPerso2">
                                        <input 
                                            min="1" 
                                            type="number" 
                                            id="in_numPersonasNRA"
                                            class="in_numPersonasNRA in_numPersonasNRA-D" 
                                            value="1"
                                        >
                                        <span class="maxPersoSpan">Máximo <b class="numPersoBold"></b> Personas</span>
                                    </div>
                                </div>
                                <div class="tituloReservaDiv">
                                    <span>Título de la Reserva (Requerido)</span>
                                    <input
                                        maxlength="56"
                                        id="in_tituloReseNRA"
                                        class="in_tituloReseNRA in_tituloReseNRA-D"
                                        placeholder="Ejemplo: Reunión Logística 1"
                                    >
                                    <span class="actiSpan">Actividad de la Reserva (Requerido)</span>
                                    <textarea 
                                        id="in_actividadReseNRA" 
                                        class="in_actividadReseNRA in_actividadReseNRA-D"
                                        name="in_actividadReseNRA" 
                                        rows="5" 
                                        cols="33"
                                        placeholder="Labores a realizar en la reserva"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <header class="header">
            <div class="header_div1">
                <div class="divPerfilContaint">
                    <div class="divImgCont">
                        <div>
                            <img src="imagesUser\userDefaultProfileMan.webp" alt="Imágen de Perfil">
                        </div>
                    </div>
                    <div class="divNombreCont">
                        <span class="nombrePerfil"><?php echo $resultUserIni["user_nombre"]." ".$resultUserIni["user_apellido"]; ?></span>
                        <span class="carreraUPerfil"><?php echo $resultUserIni["user_cargo"]; ?></span>
                        <div class="divTipo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312.57 425.95"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M312.5,361.84a41.53,41.53,0,0,1-6.35,19.76,39.76,39.76,0,0,1-6.51,7.89,50.8,50.8,0,0,1-7.36,5.54c-2.73,1.72-5.46,3.44-8.29,5-3.08,1.69-6.18,3.36-9.37,4.86-4.13,1.95-8.33,3.73-12.58,5.38-5.46,2.11-11,3.92-16.67,5.5-6.64,1.86-13.36,3.38-20.14,4.64-4.1.76-8.21,1.45-12.34,2-2.8.36-5.6.76-8.4,1.08-2.36.28-4.74.47-7.1.69-1.83.17-3.65.37-5.48.51s-3.95.25-5.93.37l-9,.52-.75,0c-6.64,0-13.28.53-19.23.31-3.13,0-5.56,0-8,0-4.21,0-8.42-.25-12.64-.35-2.07-.05-4.16-.07-6.23-.28s-4.36-.16-6.53-.44c-1.81-.23-3.65-.25-5.48-.39-1.68-.13-3.36-.3-5-.47-1.24-.12-2.47-.24-3.7-.39-3.54-.42-7.09-.8-10.62-1.3q-7.51-1.06-15-2.56A225.53,225.53,0,0,1,61.44,414q-7.19-2.25-14.15-5A164.38,164.38,0,0,1,31,401.35a146.86,146.86,0,0,1-13.1-8A39.53,39.53,0,0,1,5.54,380.12,41.2,41.2,0,0,1,.75,367.05a26.61,26.61,0,0,1-.51-4.28,12,12,0,0,0-.14-1.33,14.79,14.79,0,0,1,0-3.12c.14-1.67.3-3.35.49-5,.32-2.76.62-5.52,1-8.27.64-4.62,1.51-9.19,2.5-13.75,1-4.75,2.27-9.45,3.65-14.11a164.4,164.4,0,0,1,6-16.67q1.52-3.63,3.2-7.2a161.83,161.83,0,0,1,9.27-17,150.11,150.11,0,0,1,9.06-12.9c2.29-2.93,4.73-5.74,7.15-8.56.23-.26.48-.5.72-.75,1.19-1.26,2.43-2.48,3.56-3.8a18.63,18.63,0,0,1,2.68-2.57,10.13,10.13,0,0,0,.77-.7,135.1,135.1,0,0,1,14.5-12.31A150.18,150.18,0,0,1,81.3,223.93a162,162,0,0,1,19.2-9.12,159.43,159.43,0,0,1,23.61-7.17c4.8-1.07,9.64-1.86,14.51-2.48,2.65-.34,5.32-.51,8-.73,5.2-.43,10.41-.25,15.61-.22,2.28,0,4.55.28,6.82.48,2,.17,4,.41,6.06.64,3.45.4,6.86,1,10.27,1.66a150.43,150.43,0,0,1,21.79,6q6.93,2.47,13.63,5.57a154.94,154.94,0,0,1,15.22,8.1,151.51,151.51,0,0,1,17,12c2.59,2.09,5.07,4.29,7.53,6.53,2,1.8,3.89,3.68,5.77,5.58a145.66,145.66,0,0,1,9.75,11A157.76,157.76,0,0,1,285.65,275c1.93,3,3.73,6.09,5.47,9.21,1.45,2.6,2.79,5.25,4.09,7.93a165.66,165.66,0,0,1,6.73,16,186,186,0,0,1,9.15,37.35c.37,2.76.77,5.5,1.06,8.26A45.75,45.75,0,0,1,312.5,361.84Z"/><path d="M245.23,89.17c-.5,24.3-9,45.34-26.24,62.54-17.44,17.36-38.67,25.91-63.23,26a85.9,85.9,0,0,1-42.57-11.13,87.89,87.89,0,0,1-34-33.52C71.33,119.36,67.46,104.6,67.48,87A85.17,85.17,0,0,1,77.87,47.11,88.81,88.81,0,0,1,219.27,26.2C236.45,43.69,244.87,64.76,245.23,89.17Z"/></g></g></svg>
                            <span><?php echo $resultUserIni["user_rol"]; ?></span>
                        </div>
                    </div>
                    <div class="divFlecha" id="divFlecha">
                        <svg class="flecha1 flechaIconPerfil" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78.51 116.5"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M78.11,60.28a4.29,4.29,0,0,0,.19-.5,4.64,4.64,0,0,0,.11-.51,4.37,4.37,0,0,0,.09-.5c0-.18,0-.35,0-.52s0-.35,0-.52a4.37,4.37,0,0,0-.09-.5,4.82,4.82,0,0,0-.11-.52,4.14,4.14,0,0,0-.19-.49,3.9,3.9,0,0,0-.2-.47,5.29,5.29,0,0,0-.32-.5,2.36,2.36,0,0,0-.2-.31l-.07-.08c-.12-.14-.25-.27-.38-.4a4.75,4.75,0,0,0-.4-.38L76.46,54,8.7,1.14A5.39,5.39,0,0,0,2.07,9.63L64.39,58.25,2.07,106.86a5.39,5.39,0,1,0,6.63,8.5L76.46,62.49h0a6.31,6.31,0,0,0,.7-.67l.13-.15.09-.11c.08-.1.13-.21.2-.31a5.43,5.43,0,0,0,.32-.51A3.76,3.76,0,0,0,78.11,60.28Z"/></g></g></svg>
                    </div>
                    <div id="cuadroPOculto" class="cuadroOPerfil1 cuadroPOculto">
                        <div class="div1">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312.57 425.95"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M312.5,361.84a41.53,41.53,0,0,1-6.35,19.76,39.76,39.76,0,0,1-6.51,7.89,50.8,50.8,0,0,1-7.36,5.54c-2.73,1.72-5.46,3.44-8.29,5-3.08,1.69-6.18,3.36-9.37,4.86-4.13,1.95-8.33,3.73-12.58,5.38-5.46,2.11-11,3.92-16.67,5.5-6.64,1.86-13.36,3.38-20.14,4.64-4.1.76-8.21,1.45-12.34,2-2.8.36-5.6.76-8.4,1.08-2.36.28-4.74.47-7.1.69-1.83.17-3.65.37-5.48.51s-3.95.25-5.93.37l-9,.52-.75,0c-6.64,0-13.28.53-19.23.31-3.13,0-5.56,0-8,0-4.21,0-8.42-.25-12.64-.35-2.07-.05-4.16-.07-6.23-.28s-4.36-.16-6.53-.44c-1.81-.23-3.65-.25-5.48-.39-1.68-.13-3.36-.3-5-.47-1.24-.12-2.47-.24-3.7-.39-3.54-.42-7.09-.8-10.62-1.3q-7.51-1.06-15-2.56A225.53,225.53,0,0,1,61.44,414q-7.19-2.25-14.15-5A164.38,164.38,0,0,1,31,401.35a146.86,146.86,0,0,1-13.1-8A39.53,39.53,0,0,1,5.54,380.12,41.2,41.2,0,0,1,.75,367.05a26.61,26.61,0,0,1-.51-4.28,12,12,0,0,0-.14-1.33,14.79,14.79,0,0,1,0-3.12c.14-1.67.3-3.35.49-5,.32-2.76.62-5.52,1-8.27.64-4.62,1.51-9.19,2.5-13.75,1-4.75,2.27-9.45,3.65-14.11a164.4,164.4,0,0,1,6-16.67q1.52-3.63,3.2-7.2a161.83,161.83,0,0,1,9.27-17,150.11,150.11,0,0,1,9.06-12.9c2.29-2.93,4.73-5.74,7.15-8.56.23-.26.48-.5.72-.75,1.19-1.26,2.43-2.48,3.56-3.8a18.63,18.63,0,0,1,2.68-2.57,10.13,10.13,0,0,0,.77-.7,135.1,135.1,0,0,1,14.5-12.31A150.18,150.18,0,0,1,81.3,223.93a162,162,0,0,1,19.2-9.12,159.43,159.43,0,0,1,23.61-7.17c4.8-1.07,9.64-1.86,14.51-2.48,2.65-.34,5.32-.51,8-.73,5.2-.43,10.41-.25,15.61-.22,2.28,0,4.55.28,6.82.48,2,.17,4,.41,6.06.64,3.45.4,6.86,1,10.27,1.66a150.43,150.43,0,0,1,21.79,6q6.93,2.47,13.63,5.57a154.94,154.94,0,0,1,15.22,8.1,151.51,151.51,0,0,1,17,12c2.59,2.09,5.07,4.29,7.53,6.53,2,1.8,3.89,3.68,5.77,5.58a145.66,145.66,0,0,1,9.75,11A157.76,157.76,0,0,1,285.65,275c1.93,3,3.73,6.09,5.47,9.21,1.45,2.6,2.79,5.25,4.09,7.93a165.66,165.66,0,0,1,6.73,16,186,186,0,0,1,9.15,37.35c.37,2.76.77,5.5,1.06,8.26A45.75,45.75,0,0,1,312.5,361.84Z"/><path d="M245.23,89.17c-.5,24.3-9,45.34-26.24,62.54-17.44,17.36-38.67,25.91-63.23,26a85.9,85.9,0,0,1-42.57-11.13,87.89,87.89,0,0,1-34-33.52C71.33,119.36,67.46,104.6,67.48,87A85.17,85.17,0,0,1,77.87,47.11,88.81,88.81,0,0,1,219.27,26.2C236.45,43.69,244.87,64.76,245.23,89.17Z"/></g></g></svg>
                                <span>Cuenta</span>
                            </div>
                            <a id="ajustesCuentaBtn"><button class="btnConfig">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382.81 384.23"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M343.11,79.39c.09,4.4-1.93,8.08-4.25,11.53-4.64,6.9-9.35,13.77-14.31,20.45-2.5,3.35-2.87,6.58-1.16,10.22,4.34,9.19,8.12,18.6,11.67,28.11,1.36,3.63,4.06,5.44,7.79,6.18,9.45,1.89,18.86,3.94,28.3,5.88,6,1.24,9.62,4.41,10.4,10.92a150.81,150.81,0,0,1-.52,42.75c-.61,3.7-2.62,5.82-6.25,6.89-9.76,2.86-19.82,4.23-29.78,6-5.76,1-9.3,3.59-11.33,9.54-3.05,8.95-7.15,17.55-11.08,26.18-1.49,3.28-1.21,5.77.88,8.7,6.36,8.94,12.88,17.78,17.94,27.6,2.29,4.45,2,8.16-1,12a180.63,180.63,0,0,1-25.09,26.33c-6.29,5.45-13,5.86-20.25,1.63-8.35-4.88-16.05-10.71-23.8-16.45-2.91-2.15-5.27-2.56-8.54-.75a148.15,148.15,0,0,1-26.13,11.12c-5.42,1.76-8.5,5.11-9.42,11a240,240,0,0,1-4.92,23.93c-3.12,11.76-7.86,15.07-20,15.07-9.64,0-19.28-.08-28.9-1-8.43-.82-10.44-2.23-13-10.48-3.14-10-4.76-20.4-6.35-30.74-.58-3.76-1.93-5.88-5.7-7.07A157.29,157.29,0,0,1,119.82,323c-2.77-1.51-4.76-1.17-7.21.62-7.39,5.39-14.8,10.79-22.47,15.75-10,6.45-15.35,5.87-24.2-1.89A205.32,205.32,0,0,1,42.39,312.4c-3.29-4-3.46-7.85-1-12.35,5-9.09,11.13-17.38,17.27-25.66,2.81-3.78,3.37-6.86,1.21-11.26A217.44,217.44,0,0,1,48.08,234c-1-3.09-2.6-4.48-5.87-5-10.33-1.67-20.57-3.88-30.9-5.56-5.18-.85-8.18-3.79-9.11-8.58a134.89,134.89,0,0,1-.66-44.69c.67-4.72,3.74-7.14,8.1-8.43,9.11-2.72,18.51-4,27.83-5.6,6.34-1.09,9.78-4.08,11.9-10.23,3.08-8.94,7.1-17.58,11-26.2,1.38-3,1.11-5.11-.84-7.69C53.65,104.19,47.78,96.3,43,87.71c-5-8.9-4.87-11.91,2-19.59A308.71,308.71,0,0,1,71.77,42c3.58-3.15,6.94-3.33,10.87-1.15,6.41,3.56,12.86,7.3,18.14,12.28,9,8.48,17.45,11.14,28.58,3.26,5.79-4.1,13.44-5.61,20.32-8.09A6,6,0,0,0,154.07,43c1.72-10,3.51-20,5.77-29.87C161.94,4,165,1.84,174.3,1A191.44,191.44,0,0,1,210.13.74c6.33.59,9.54,3.88,11.41,9.4a101.64,101.64,0,0,1,4.65,23.94c.73,8.66,4.44,14.09,13.05,16.61a110.34,110.34,0,0,1,26.18,10.93c2.32,1.4,4,.59,5.87-.73,8-5.61,15.88-11.55,24.42-16.44,9.37-5.37,11.92-5.22,20,1.72a190.76,190.76,0,0,1,22.94,22.89C341.09,72,343.09,75.31,343.11,79.39ZM282.68,190.91c1.58-41.58-34.62-90.48-92-91.36-43.58-.67-92.74,39.68-91.11,94.73,1.34,45,39.75,89.34,91.66,89.4C242.74,283.74,282.62,243.28,282.68,190.91Z"/></g></g></svg>
                                Ajustes de la Cuenta
                            </button></a>
                        </div>
                        <div class="div3">
                            <button class="btnCerrar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 538.14 531.53"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M178.42,265.55V6.61c0-7.63-.17-7.73-7.47-4.91Q117.37,22.42,63.78,43.13C46.27,49.9,28.84,56.88,11.26,63.47c-13.34,5-11,2.2-11.06,16.39Q.07,234.33.13,388.79c0,23.15.08,46.3-.13,69.46,0,4.37,1.48,6.51,5.53,8.05Q56,485.48,106.25,505c21.75,8.4,43.44,16.93,65.21,25.25,6.67,2.55,7.65,1.6,7.31-5.78-.17-3.66-.34-7.32-.34-11Q178.4,389.52,178.42,265.55Z"/><path d="M351.11,219.9h-58.5c-7.28,0-7.37.07-7.38,7.12q0,41.25,0,82.5c0,6.83.53,7.4,7.42,7.4q58.5,0,117,0c7.57,0,7.83.06,7.58,7.43-.34,10.32,1.14,20.63.09,30.94a15.77,15.77,0,0,0,.19,3.49c.62,4.79,1.24,5.13,5,2.26,6.34-4.86,12.57-9.88,18.84-14.84,31.32-24.82,62.59-49.71,94-74.38,3.83-3,3.58-4.54,0-7.34C518,251,500.79,237.37,483.55,223.75Q453,199.62,422.38,175.47c-1.09-.85-2.05-2.82-3.66-1.94-1.34.73-1.22,2.71-1.23,4.15-.13,11.81-.14,23.61-.19,35.42,0,6.6-.2,6.79-6.69,6.8Z"/><path d="M380.2,115.12c.38-22.14-.56-49.3.41-76.45.15-4.19-2.48-4.85-5.9-4.83-11.82.08-23.65.06-35.47.06h-122c-6.86,0-7,.15-7,7,0,6.66,0,13.33,0,20,0,6.1.33,6.39,6.6,6.39H337.33c8.83,0,8.85,0,8.85,8.8q0,61.49,0,123c0,7.87.13,8,8.2,8,6.5,0,13-.17,19.49.08,4.77.18,6.43-1.71,6.41-6.45C380.13,173.78,380.2,147,380.2,115.12Z"/><path d="M295.39,498.11h78c6.56,0,6.81-.23,6.82-6.7q0-50.73,0-101.47,0-26.7,0-53.42c0-6.36-.29-6.59-6.9-6.61H352.8c-6.27,0-6.6.27-6.61,6.38q0,42.48,0,85,0,18,0,36c0,6.5-.26,6.78-6.74,6.78q-60.49,0-121,0c-8,0-8.18.16-8.18,8,0,6.5,0,13,0,19.5.05,6,.6,6.54,6.63,6.55Q256.15,498.14,295.39,498.11Z"/></g></g></svg>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="header_nav">
                <ul class="nav_ul">
                </ul>
            </nav>
        </header>
        <main class="main">
            <div class="main_divAside">
                <button class="btnAside btnAsidePrimero">
                    <svg class="adminIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 676.7 694.7"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M515.26,694.58c4,.1,8,.12,11.79.12h0c1.14,0,2.25,0,3.33-.1Z"/><path d="M501.33,693.76c4.7.46,9.36.7,13.93.82q-25,0-50,.09a15.93,15.93,0,0,1-1.63-.07H90.15c-27.62,0-55.23-.1-82.84.1-5,0-6.7-1.39-6.64-6.49.21-17.81,0-35.62-.07-53.44,0-2.14-.39-4.28-.6-6.42V562.42c.93-2.75.66-5.6.64-8.42a244.38,244.38,0,0,1,3.49-42.71c4.39-25.26,18.84-44,39-58.75,21.39-15.69,44.68-28.28,67.8-41.13,17.59-9.77,35.37-19.2,53.09-28.75,2.19-1.19,4.46-2.24,6.71-3.31,8-3.76,8.2-3.8,11,4.75,9.79,29.71,19.4,59.47,29.15,89.19,6,18.18,12.06,36.31,18.13,54.45.94,2.83,2.1,5.58,3.11,8.25,1.72.21,1.86-1,2.2-1.82C244.08,509,252.46,483.4,261.57,458c1.06-3-.5-4.78-1.85-6.81-7.7-11.58-14.17-23.73-17.31-37.4-4.75-20.74,2.52-32.13,23.3-36.86a53,53,0,0,1,31.84,2.16c13.23,5.21,19.24,16.3,16.79,30.33s-9.06,26.43-17.12,37.91c-3.78,5.39-4.11,9.93-1.85,16,8.6,23.07,16.66,46.34,24.94,69.53.6,1.68,1.35,3.31,2.24,5.48,2.15-2.92,2.71-5.86,3.59-8.61Q349.12,458,372,386.2c3.06-9.55,4.09-10.22,12.85-5.83q6.79,3.4,13.58,6.83c-5.88,5.48-10.77,10.44-15.26,15.47-10.76,12.06-11.89,22.78-3.92,37a158.17,158.17,0,0,0,10.91,16.59c-2.05,4.55-4.08,9.23-5.88,14.12l-1.05.17a168.26,168.26,0,0,0-21,4.44c-10.83,3.23-17.89,11.14-19.39,21.72a128.43,128.43,0,0,0,.69,43c2.23,11.52,10.58,19.55,22.33,21.46,4,.65,8,1.41,12.17,2.2,2.11.4,4.26.81,6.43,1.2,1.78,4.86,3.78,9.73,6,14.57a173.62,173.62,0,0,0-12.53,19.12c-5.63,10.26-4.67,21.29,2.64,30.26a187.18,187.18,0,0,0,21.61,23c4.75,4.16,12.24,9.7,22.36,9.7,8.25,0,15-3.73,19.34-6.55,4.65-3,9.09-6.12,13.41-9.23,4.13,2,8.44,3.72,13,5.36a157.77,157.77,0,0,0,4.88,21.79C479.4,686.21,487,692.36,501.33,693.76Z"/><path d="M675.66,501.34c-.65-5.4-3.64-8-8.63-9.06-7.82-1.61-15.62-3.31-23.46-4.87-3.09-.62-5.33-2.12-6.45-5.13-3-7.88-6.08-15.68-9.67-23.3a7.58,7.58,0,0,1,.95-8.47c4.12-5.54,8-11.23,11.86-16.95,1.93-2.87,3.6-5.92,3.53-9.56,0-3.39-1.67-6.09-3.71-8.56a157.86,157.86,0,0,0-19-19c-6.68-5.75-8.79-5.88-16.56-1.43-7.08,4.06-13.57,9-20.25,13.63-1.57,1.1-2.94,1.76-4.87.61a91.83,91.83,0,0,0-21.69-9.07c-7.14-2.08-10.22-6.58-10.83-13.76A83.91,83.91,0,0,0,543,366.59c-1.55-4.57-4.21-7.3-9.46-7.79a158.42,158.42,0,0,0-29.7.18c-7.74.73-10.25,2.49-12,10.13-1.87,8.19-3.36,16.47-4.78,24.75a5,5,0,0,1-3.64,4.39c-5.7,2.06-12,3.31-16.84,6.71-9.23,6.53-16.24,4.33-23.69-2.7-4.38-4.13-9.73-7.23-15.05-10.19-3.25-1.8-6-1.65-9,1q-1.65,1.44-3.28,2.92a237.4,237.4,0,0,0-19,18.71c-5.68,6.36-5.78,8.86-1.64,16.24A178.07,178.07,0,0,0,408.74,451a5.46,5.46,0,0,1,.7,6.38c-3.27,7.15-6.6,14.31-9.15,21.72-1.76,5.1-4.61,7.58-9.86,8.48-7.73,1.33-15.53,2.39-23.08,4.64-3.61,1.08-6.15,3.08-6.71,7a111.57,111.57,0,0,0,.55,37c.76,4,3.25,6.41,7.55,7.11,8.56,1.4,17.05,3.23,25.61,4.61a5.32,5.32,0,0,1,4.86,4.15A180.67,180.67,0,0,0,409,576.31c1.79,3.65,1.33,6.2-1,9.34-5.09,6.86-10.19,13.74-14.32,21.27-2,3.73-1.9,6.89.82,10.24A171.3,171.3,0,0,0,414,637.94c7.34,6.43,11.79,6.91,20.06,1.57,6.37-4.12,12.5-8.59,18.63-13.06,2-1.49,3.68-1.76,6-.51a131,131,0,0,0,23.62,9.88c3.12,1,4.24,2.74,4.72,5.85,1.32,8.58,2.67,17.18,5.27,25.49,2.14,6.84,3.8,8,10.79,8.69,8,.78,16,.85,24,.85,10,0,14-2.75,16.56-12.49a197.07,197.07,0,0,0,4.07-19.84c.75-4.71,3.17-7.46,7.42-8.94l.39-.14a122.41,122.41,0,0,0,21.66-9.22c2.71-1.5,4.68-1.16,7.09.62A219.57,219.57,0,0,0,604,640.33c6,3.5,11.57,3.16,16.78-1.36a149.69,149.69,0,0,0,20.81-21.82c2.44-3.2,2.72-6.27.82-10-4.2-8.14-9.6-15.46-14.87-22.88a6.43,6.43,0,0,1-.73-7.21c3.26-7.15,6.66-14.28,9.18-21.7,1.68-4.93,4.62-7,9.4-7.91,8.26-1.5,16.59-2.63,24.68-5a6.57,6.57,0,0,0,5.18-5.71A125.16,125.16,0,0,0,675.66,501.34Zm-82,15.11c0,29.59-15.4,54.59-38.7,67.5a75.92,75.92,0,0,1-37.09,9.4c-43-.05-74.88-36.79-76-74.11-1.12-37.73,26.56-67.14,56.6-75.87a64.27,64.27,0,0,1,18.93-2.66C565,441.44,595,482,593.69,516.45Z"/><path d="M555.16,689.17c0,4.08-1.43,5.52-5.55,5.5l-19.2-.07c11.07-.68,19.25-4.82,24.7-12.56C555.12,684.42,555.14,686.79,555.16,689.17Z"/><path d="M164.45,261.09c9.1,21.64,21.14,41.38,41.12,54.66,26.56,17.65,55.94,24.66,87.77,21.29,30.46-3.23,56.07-15.79,76.06-39.19,17.14-20.07,26.92-43.8,33.12-69.11,8.11-33,7.23-66.65,5.65-100.25-.6-12.78-2.05-25.49-5.69-37.88C390.25,49,365.4,19.38,323.21,5.93,313.83,3,304.1,1.71,294.47,0H257.54c-1,.23-1.92.52-2.9.67-22.1,3.47-42.32,11.48-59.89,25.48-24.34,19.4-37.18,45.6-43.3,75.44-5.54,27.07-6.06,54.46-4.21,82C149,210.28,154,236.31,164.45,261.09Z"/><path d="M578,211.52a7.85,7.85,0,0,1-1.68,4.56c-1.84,2.73-3.7,5.45-5.66,8.09a3.63,3.63,0,0,0-.46,4c1.72,3.63,3.21,7.36,4.62,11.12a3.76,3.76,0,0,0,3.08,2.44c3.74.75,7.46,1.56,11.19,2.33,2.38.49,3.81,1.74,4.12,4.32a60.17,60.17,0,0,1-.21,16.9,3.16,3.16,0,0,1-2.47,2.73,115.37,115.37,0,0,1-11.78,2.39,5.14,5.14,0,0,0-4.48,3.77c-1.21,3.54-2.83,6.94-4.38,10.36a3.08,3.08,0,0,0,.34,3.44,90.23,90.23,0,0,1,7.1,10.91,4,4,0,0,1-.4,4.75A70.29,70.29,0,0,1,567,314.08c-2.49,2.16-5.15,2.32-8,.65a105,105,0,0,1-9.41-6.51,2.73,2.73,0,0,0-3.38-.29,58,58,0,0,1-10.33,4.39,5,5,0,0,0-3.73,4.34,92.25,92.25,0,0,1-1.95,9.46c-1.23,4.65-3.1,6-7.9,6-3.81,0-7.62,0-11.43-.4-3.33-.33-4.13-.89-5.15-4.15a82.78,82.78,0,0,1-2.51-12.16,3,3,0,0,0-2.25-2.79,62.86,62.86,0,0,1-11.27-4.71,2.32,2.32,0,0,0-2.85.24c-2.93,2.13-5.85,4.27-8.89,6.23-4,2.55-6.07,2.32-9.57-.75a82.53,82.53,0,0,1-9.32-9.92,4,4,0,0,1-.39-4.88,92.81,92.81,0,0,1,6.83-10.15,3.72,3.72,0,0,0,.48-4.45,86.51,86.51,0,0,1-4.67-11.52,2.54,2.54,0,0,0-2.32-2c-4.08-.66-8.13-1.53-12.21-2.2a4,4,0,0,1-3.61-3.39,53.53,53.53,0,0,1-.26-17.68,4,4,0,0,1,3.2-3.33,94.54,94.54,0,0,1,11-2.22,5.41,5.41,0,0,0,4.71-4c1.22-3.54,2.8-7,4.36-10.36a2.61,2.61,0,0,0-.33-3.05,85.34,85.34,0,0,1-6.57-9.61c-2-3.52-1.92-4.71.79-7.75a123.11,123.11,0,0,1,10.61-10.32,3.34,3.34,0,0,1,4.29-.45,35.13,35.13,0,0,1,7.18,4.86c3.55,3.35,6.9,4.4,11.3,1.28,2.29-1.62,5.32-2.21,8-3.19a2.37,2.37,0,0,0,1.73-2.1c.68-3.95,1.39-7.9,2.29-11.81.83-3.64,2-4.48,5.72-4.83a76.22,76.22,0,0,1,14.17-.09,4.84,4.84,0,0,1,4.51,3.72,40,40,0,0,1,1.84,9.47c.29,3.42,1.76,5.57,5.16,6.57a43.27,43.27,0,0,1,10.35,4.32,1.9,1.9,0,0,0,2.33-.29c3.18-2.22,6.28-4.57,9.65-6.5,3.71-2.12,4.72-2.06,7.91.68a76,76,0,0,1,9.07,9.05A6.47,6.47,0,0,1,578,211.52Zm-23.9,44.11c.63-16.45-13.69-35.79-36.38-36.14-17.24-.26-36.68,15.7-36,37.47.53,17.8,15.72,35.33,36.25,35.36C538.34,292.34,554.11,276.34,554.13,255.63Z"/></g></g></svg>
                    <span>Panel Principal</span>
                </button>
                <button class="btnAside btnCalenda">
                    <svg class="calendaIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 486.21"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M428.15,72.21h-28.5V15a15,15,0,0,0-15-15h0a15,15,0,0,0-15,15V72.21H116.35V15a15,15,0,0,0-30,0V72.21H57.86A57.86,57.86,0,0,0,0,130.07V428.35a57.86,57.86,0,0,0,57.86,57.86H428.15A57.85,57.85,0,0,0,486,428.35V130.07A57.85,57.85,0,0,0,428.15,72.21Zm-275.6,384H57.86A27.89,27.89,0,0,1,30,428.35V393.22H152.55Zm0-91.33H30V300.24H152.55Zm0-93H30V207.25H152.55ZM305.1,456.21H180.9v-63H305.1Zm0-91.33H180.9V300.24H305.1Zm0-93H180.9V207.25H305.1ZM456,428.35a27.89,27.89,0,0,1-27.85,27.86h-94.7v-63H456Zm0-63.47H333.45V300.24H456Zm0-93H333.45V207.25H456Zm0-93H30V130.07a27.89,27.89,0,0,1,27.86-27.86H428.15A27.89,27.89,0,0,1,456,130.07Z"/></g></g></svg>
                    <span>Calendario</span>        
                </button>
                <button class="btnAside btnEstadis">
                    <svg class="estadisIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.88 521.05"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M119.7,521.05H10.82A10.82,10.82,0,0,1,0,510.23V101.37A10.81,10.81,0,0,1,10.82,90.55H119.7a10.82,10.82,0,0,1,10.82,10.82V510.23A10.83,10.83,0,0,1,119.7,521.05ZM21.64,499.41h87.24V112.19H21.64Z"/><path d="M272.38,521.05H163.5a10.82,10.82,0,0,1-10.82-10.82V10.82A10.81,10.81,0,0,1,163.5,0H272.38A10.82,10.82,0,0,1,283.2,10.82V510.23A10.83,10.83,0,0,1,272.38,521.05Zm-98.06-21.64h87.24V21.64H174.32Z"/><path d="M425.06,521.05H316.18a10.82,10.82,0,0,1-10.82-10.82V120.66a10.81,10.81,0,0,1,10.82-10.82H425.06a10.82,10.82,0,0,1,10.82,10.82V510.23A10.83,10.83,0,0,1,425.06,521.05ZM327,499.41h87.24V131.47H327Z"/></g></g></svg>
                    <span>Estadísticas</span>
                </button>
                <button class="btnAside btnAsideUltimo" id="btnProductos">
                    <svg class="productoIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.9 398.8"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M393.94,354.61,338.29,115.52A36,36,0,0,0,303.2,87.66H255.12V56.74C255.12,25.45,229.25,0,197.44,0s-57.67,25.45-57.67,56.74V87.66H91.68a36,36,0,0,0-35.09,27.86L1,354.61A36,36,0,0,0,36,398.8H358.85A36,36,0,0,0,393.94,354.61ZM152.4,56.74c0-24.43,20.21-44.31,45-44.31s45.05,19.88,45.05,44.31V87.66H152.4ZM376.1,376.47a21.9,21.9,0,0,1-17.25,8.33h-9.29l-52.05-37.42H97.39l-52,37.42H36a22,22,0,0,1-21.45-27L70.23,118.7a21.94,21.94,0,0,1,21.45-17h48.09v17.2a22.46,22.46,0,1,0,12.63,0v-17.2h90.09v17.2a22.45,22.45,0,1,0,12.63,0v-17.2H303.2a22,22,0,0,1,21.46,17L380.3,357.78A21.92,21.92,0,0,1,376.1,376.47Zm-230-247.18A11.11,11.11,0,1,1,135,140.4,11.12,11.12,0,0,1,146.09,129.29Zm102.72,0A11.11,11.11,0,1,1,237.7,140.4,11.12,11.12,0,0,1,248.81,129.29Z"/><path d="M252.26,235.38l-34.91-5.07-15.61-31.63a4.79,4.79,0,0,0-8.59,0l-15.6,31.63-34.91,5.07a4.79,4.79,0,0,0-2.65,8.17l25.25,24.62-6,34.76a4.79,4.79,0,0,0,6.95,5.05l31.22-16.41L228.67,308a4.74,4.74,0,0,0,2.22.55,4.79,4.79,0,0,0,4.73-5.6l-6-34.76,25.26-24.62a4.79,4.79,0,0,0-2.65-8.17Zm-31.1,27.69a4.79,4.79,0,0,0-1.37,4.24L224.53,295l-24.85-13.07a4.76,4.76,0,0,0-4.46,0L170.36,295l4.75-27.68a4.77,4.77,0,0,0-1.38-4.24l-20.11-19.6,27.79-4a4.8,4.8,0,0,0,3.61-2.62l12.43-25.18,12.43,25.18a4.78,4.78,0,0,0,3.6,2.62l27.79,4Z"/></g></g></svg>
                    <span>Productos</span>
                </button>
            </div>
            <div class="main_divPrincipal">
                <div class="divContaint">
                    <div class="divRecientes">
                        <div class="titulo">
                            <span>Comprueba la Actividad Reciente</span>
                        </div>
                        <div id="divTareasHistoBase" class="divTareasHistoBase">
                        </div>
                    </div>
                    <div class="divExtras">
                        <div class="divExtraA">
                            <div>
                                <span>Miembros Totales</span>
                                <span class="miembrosTSpan">0</span>
                                <div>
                                    <span>Menbresías recientes</span>
                                    <span class="miembrosRecienSpan">0</span>
                                </div>
                                <span></span>
                                <a href="listaMiembros.php" class="todosMiembrosEnlace">Todos los Miembros</a>
                            </div>
                            <div>
                                <span>Facturas por Pagar</span>
                                <span class="factuTSpan">0</span>
                                <div>
                                    <span>Facturas recientes</span>
                                    <span class="factuRecienSpan">0</span>
                                </div>
                                <span></span>
                                <a href="listaFacturas.php">Administrar Facturas</a>
                            </div>
                        </div>
                        <div class="divExtraB">
                            <div>
                                <span>Reservas Totales</span>
                                <span class="reservasTSpan">0</span>
                                <div>
                                    <span>Reservas del Día</span>
                                    <span class="reserRecienSpan">0</span>
                                </div>
                                <span></span>
                                <a href="reservas.php">Administrar Reservas</a>
                            </div>
                        </div>
                    </div>
                </div>
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
        <script src="scripts\app2.js"></script>
        <script src="scripts\app6.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    </body>
</html>
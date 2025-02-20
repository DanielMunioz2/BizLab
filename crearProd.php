<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    require_once("conexion.php");

    session_start();

    if(isset($_POST["productoCrear"])){

        $htmlCrearNewPoU = "";
        $crear = "";

        if($_POST["productoCrear"] == "producto"){

            $crear = "Crear Nuevo Producto";

            $htmlCrearNewPoU = '
            <div class="divPrin" tipo="producto">
                <input type="hidden" value="producto" name="productoNuevo">
                <input type="hidden" value="mensuales" name="categoriaInputOculto" id="categoriaInputOculto">
                <div class="divDatosGene">
                    <span class="spanPrinDatos">Datos del Nuevo Producto</span>
                    <div class="divDatosPrimarios">
                        <span class="nomSpan">Nombre del producto</span>
                        <input type="text" id="nomCreaPInput" name="nomCreaPInput">
                        <span class="spanCatego">Categoría del producto</span>
                        <select name="selectCatego" id="selectCatego">
                            <option value="Mensuales" selected>Mensuales</option>
                            <option value="Individuales">Individuales</option>
                        </select>   
                        <span class="preSpan">Precio del producto (Mensuales)</span>
                        <input type="text" id="precioCreaPInput" name="precioCreaPInput">
                        <div class="divOtrosPrecios">
                            <span class="otrosSpan">Otros precios (0 = N/A | 1 = A consultar)</span>
                            <span class="precioXHspan">Precio X Hora</span>
                            <input type="text" id="preXHora" name="preXHora">
                            <span class="precioXDspan">Precio X Día</span>
                            <input type="text" id="preXDia" name="preXDia">
                            <span class="precioXSspan">Precio X Semana</span>
                            <input type="text" id="preXSema" name="preXSema">
                        </div>
                    </div>
                    <span class="spanDescri">Descripción del Producto</span>
                    <textarea id="descripcionProd" name="descripcionProd" rows="20" cols="50"></textarea>
                </div>
                <div class="divImgGene">
                    <div class="divImagen">
                        <figure id="contenedorImagen">
                            <img id="imagenSelected" src="images\imagenDefaultProd.jpg" alt="">
                            <figcaption id="imagenNombre">
                            </figcaption>
                        </figure>
                        <span class="spanImagenTamanio">Imagen de muestra del producto (tamaño máximo 2 megabytes, de preferencia imágenes cuadradas)</span>
                        <div class="divBtnSubirImg">
                            <input type="file" id="subirImagenBtn" name="subirImagenBtn" accept="image/*">
                            <label for="subirImagenBtn" class="labelSubirImg labelSubirImg2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.73 457.83"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M475.7,339.4c0-17.18-11.66-28.83-28.8-28.84-38.41,0-76.82.07-115.24-.11-4.49,0-6.62,1.5-8.71,5.44-10.31,19.4-26.07,30.66-48.66,30.74q-36.41.14-72.83,0c-22.55-.11-38.38-11.29-48.68-30.72-2.08-3.93-4.2-5.49-8.7-5.46-38.41.18-76.83.08-115.24.11C11.7,310.57.05,322.22,0,339.38Q0,384,0,428.68a31.41,31.41,0,0,0,.5,6.43c2.91,14,14.12,22.69,29.29,22.7q103.77,0,207.53,0,104.27,0,208.53,0c18,0,29.81-11.77,29.82-29.6Q475.76,383.8,475.7,339.4ZM346.94,419.58c-9.77-.13-17.09-7.73-17-17.64.09-9.74,7.69-17.07,17.62-17,9.62.07,17.62,8,17.55,17.4C365,412,356.88,419.71,346.94,419.58Zm72.88,0a17.09,17.09,0,0,1-17-17.73c.13-9.58,7.94-17,17.81-16.91,9.52.08,17.57,8.15,17.43,17.48C437.94,412.06,429.76,419.74,419.82,419.58Z"/><path d="M111.34,165.5c20.61,0,41.23,0,61.85,0,10.6,0,9.4-1.24,9.43,9.18,0,19.12,0,38.25,0,57.37q0,29.18,0,58.36c0,13.2,6.61,21,19.75,21.25q35.42.74,70.83,0c13.16-.26,19.86-8,19.87-21.15,0-39.74.07-79.48-.09-119.22,0-4.63,1.36-5.95,5.94-5.91,21.78.22,43.56.11,65.34.09,9.79,0,15.16-3.52,18.77-11.88,3.53-8.15,1.23-14.72-4.8-20.73Q315,69.82,251.94,6.65c-8.87-8.86-19.29-8.85-28.07-.07Q160.7,69.69,97.55,132.82c-6,6-8.43,12.52-4.93,20.7C96.21,161.89,101.65,165.49,111.34,165.5Z"/></g></g></svg>
                                Cargar Imagen
                            </lable>
                        </div>
                    </div>
                    <div class="divBotonesGene">
                        <button class="btnCrear btnCrear2" form="formCrear">+ Crear Producto</button>
                        <button class="btnCancelar">Volver</button>
                    </div>
                </div>
            </div>
            ';

        }else{

            if($_POST["productoCrear"] == "unidad"){

                $crear = "Crear Nueva Unidad";

                $htmlCrearNewPoU = '
                <div class="divPrin" tipo="unidad">
                    <input type="hidden" value="unidad" name="productoNuevo">
                    <div class="divDatosGene">
                        <span class="spanPrinDatos">Datos de la Nueva Unidad</span>
                        <div class="divDatosPrimarios">
                            <span class="nomSpan">Nombre de la Unidad</span>
                            <input type="text" id="nomCreaPInput" name="nomCreaPInput">
                            <div class="divOtrosPrecios">
                                <span class="otrosSpan">Precios Unidad (0 = N/A | 1 = A consultar)</span>
                                <span class="precioXHspan">Precio X Hora</span>
                                <input type="text" id="preXHora" name="preXHora">
                                <span class="precioXDspan">Precio X Día</span>
                                <input type="text" id="preXDia" name="preXDia">
                                <span class="precioXSspan">Precio X Semana</span>
                                <input type="text" id="preXSema" name="preXSema">
                            </div>
                        </div>
                        <span class="spanDescri">Descripción de la Unidad</span>
                        <textarea id="descripcionProd" name="descripcionProd" rows="20" cols="50"></textarea>
                        <div class="divCaracter">
                            <span class="spanCaracteris">Características de la Unidad</span>
                            <textarea id="caracterProd" name="caracterProd" rows="6" cols="50" placeholder="Ejemplo: (Característica 1,Característica 2,Característica 3,...)"></textarea>
                            <span class="spanCaracInstru">Digite cada característica separada por una coma. Procure no dejar espacios entre las comas.</span>
                        </div>
                    </div>
                    <div class="divImgGene">
                        <div class="divImagen">
                            <figure id="contenedorImagen">
                                <img id="imagenSelected" src="images\imagenDefaultProd.jpg" alt="">
                                <figcaption id="imagenNombre">
                                </figcaption>
                            </figure>
                            <span class="spanImagenTamanio">Imagen de muestra de la unidad (tamaño máximo 2 megabytes, de preferencia imágenes cuadradas)</span>
                            <div class="divBtnSubirImg">
                                <input type="file" id="subirImagenBtn" name="subirImagenBtn" accept="image/*">
                                <label for="subirImagenBtn" class="labelSubirImg labelSubirImg2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.73 457.83"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M475.7,339.4c0-17.18-11.66-28.83-28.8-28.84-38.41,0-76.82.07-115.24-.11-4.49,0-6.62,1.5-8.71,5.44-10.31,19.4-26.07,30.66-48.66,30.74q-36.41.14-72.83,0c-22.55-.11-38.38-11.29-48.68-30.72-2.08-3.93-4.2-5.49-8.7-5.46-38.41.18-76.83.08-115.24.11C11.7,310.57.05,322.22,0,339.38Q0,384,0,428.68a31.41,31.41,0,0,0,.5,6.43c2.91,14,14.12,22.69,29.29,22.7q103.77,0,207.53,0,104.27,0,208.53,0c18,0,29.81-11.77,29.82-29.6Q475.76,383.8,475.7,339.4ZM346.94,419.58c-9.77-.13-17.09-7.73-17-17.64.09-9.74,7.69-17.07,17.62-17,9.62.07,17.62,8,17.55,17.4C365,412,356.88,419.71,346.94,419.58Zm72.88,0a17.09,17.09,0,0,1-17-17.73c.13-9.58,7.94-17,17.81-16.91,9.52.08,17.57,8.15,17.43,17.48C437.94,412.06,429.76,419.74,419.82,419.58Z"/><path d="M111.34,165.5c20.61,0,41.23,0,61.85,0,10.6,0,9.4-1.24,9.43,9.18,0,19.12,0,38.25,0,57.37q0,29.18,0,58.36c0,13.2,6.61,21,19.75,21.25q35.42.74,70.83,0c13.16-.26,19.86-8,19.87-21.15,0-39.74.07-79.48-.09-119.22,0-4.63,1.36-5.95,5.94-5.91,21.78.22,43.56.11,65.34.09,9.79,0,15.16-3.52,18.77-11.88,3.53-8.15,1.23-14.72-4.8-20.73Q315,69.82,251.94,6.65c-8.87-8.86-19.29-8.85-28.07-.07Q160.7,69.69,97.55,132.82c-6,6-8.43,12.52-4.93,20.7C96.21,161.89,101.65,165.49,111.34,165.5Z"/></g></g></svg>
                                    Cargar Imagen
                                </lable>
                            </div>
                        </div>
                        <div class="divBotonesGene">
                            <button class="btnCrear btnCrear2" form="formCrear">+ Crear Unidad</button>
                            <button class="btnCancelar">Volver</button>
                        </div>
                    </div>
                </div>
                ';

            }

        }

    }

    if(isset($_POST["productoNuevo"])){

        if($_POST["productoNuevo"] == "producto"){

            date_default_timezone_set('America/Bogota');

            $fechaActual = date("Y-m-d");
            $horaActual = date("h:i:s A");

            if($_POST["categoriaInputOculto"] == "mensuales"){

                $nombre = $_POST["nomCreaPInput"];
                $categoria = $_POST["selectCatego"];
                $precioMes = $_POST["precioCreaPInput"];
                $precioHora = 0;
                $precioDia = 0;
                $precioSema = 0;
                $descripProd = $_POST["descripcionProd"];

            }else{

                if($_POST["categoriaInputOculto"] == "individuales"){

                    $nombre = $_POST["nomCreaPInput"];
                    $categoria = $_POST["selectCatego"];
                    $precioMes = 0;
                    $precioHora = $_POST["preXHora"];
                    $precioDia = $_POST["preXDia"];
                    $precioSema = $_POST["preXSema"];
                    $descripProd = $_POST["descripcionProd"];

                }

            }

            $fecha = new DateTime();
        
            $ImagenPrin = $fecha->getTimestamp()."_".$_FILES["subirImagenBtn"]['name'];
            $ImagenPrinTemp = $_FILES["subirImagenBtn"]['tmp_name'];
            move_uploaded_file($ImagenPrinTemp, "images/productosImages/".$ImagenPrin);

            $query = "INSERT INTO `soqkyjmy_bizclubPlataformaDb`.`productos` 
            (produNombre, 
            produCategoria, 
            produPrecio, 
            precioXhora, 
            precioXDia, 
            precioXSemana, 
            produDescri, 
            producFechaCrea, 
            producHoraCrea, 
            productoImgPrin) 
            VALUES 
            ('$nombre',
            '$categoria',
            $precioMes,
            $precioHora,
            $precioDia,
            $precioSema,
            '$descripProd',
            '$fechaActual',
            '$horaActual',
            '$ImagenPrin')";

            $resultado = $conn->query($query);

            $_SESSION["stdProd"]=4;
            header("location:administracion.php");

        }else{

            if($_POST["productoNuevo"] == "unidad"){

                date_default_timezone_set('America/Bogota');

                $fechaActual = date("Y-m-d");
                $horaActual = date("h:i:s A");

                $nombre = $_POST["nomCreaPInput"];
                $precioHora = $_POST["preXHora"];
                $precioDia = $_POST["preXDia"];
                $precioSema = $_POST["preXSema"];
                $descripProd = $_POST["descripcionProd"];
                $caracteristicas = $_POST["caracterProd"];

                $precios = $precioHora.",".$precioDia.",".$precioSema;

                $fecha = new DateTime();
        
                $ImagenPrin = $fecha->getTimestamp()."_".$_FILES["subirImagenBtn"]['name'];
                $ImagenPrinTemp = $_FILES["subirImagenBtn"]['tmp_name'];
                move_uploaded_file($ImagenPrinTemp, "images/productosImages/".$ImagenPrin);

                $query = "INSERT INTO `soqkyjmy_bizclubPlataformaDb`.`unidades` 
                (unidad_nombre, 
                unidad_descrip, 
                unidad_imagen, 
                unidad_caracte, 
                unidad_precios, 
                unidad_fechaCre, 
                unidad_horaCre) 
                VALUES 
                ('$nombre',
                '$descripProd',
                '$ImagenPrin',
                '$caracteristicas',
                '$precios',
                '$fechaActual',
                '$horaActual')";

                $resultado = $conn->query($query);

                $_SESSION["stdProd"]=5;
                header("location:administracion.php");

            }

        }

    }

?>

<!DOCTYPE html>
<html lang="en" class="crearProdHTML">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $crear?></title>
        <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
        <link rel="stylesheet" href="estilos/crearProd.css">
    </head>
    <body class="body">
        <header class="header">
            <div class="header_div1">
                <div class="divPerfilContaint">
                    <div class="divImgCont">
                        <div>
                            <img src="imagesUser\userDefaultProfileMan.webp" alt="Imágen de Perfil">
                        </div>
                    </div>
                    <div class="divNombreCont">
                        <span class="nombrePerfil">Jose Daniel Muñoz</span>
                        <span class="carreraUPerfil">Programador en la Nube</span>
                        <div class="divTipo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312.57 425.95"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M312.5,361.84a41.53,41.53,0,0,1-6.35,19.76,39.76,39.76,0,0,1-6.51,7.89,50.8,50.8,0,0,1-7.36,5.54c-2.73,1.72-5.46,3.44-8.29,5-3.08,1.69-6.18,3.36-9.37,4.86-4.13,1.95-8.33,3.73-12.58,5.38-5.46,2.11-11,3.92-16.67,5.5-6.64,1.86-13.36,3.38-20.14,4.64-4.1.76-8.21,1.45-12.34,2-2.8.36-5.6.76-8.4,1.08-2.36.28-4.74.47-7.1.69-1.83.17-3.65.37-5.48.51s-3.95.25-5.93.37l-9,.52-.75,0c-6.64,0-13.28.53-19.23.31-3.13,0-5.56,0-8,0-4.21,0-8.42-.25-12.64-.35-2.07-.05-4.16-.07-6.23-.28s-4.36-.16-6.53-.44c-1.81-.23-3.65-.25-5.48-.39-1.68-.13-3.36-.3-5-.47-1.24-.12-2.47-.24-3.7-.39-3.54-.42-7.09-.8-10.62-1.3q-7.51-1.06-15-2.56A225.53,225.53,0,0,1,61.44,414q-7.19-2.25-14.15-5A164.38,164.38,0,0,1,31,401.35a146.86,146.86,0,0,1-13.1-8A39.53,39.53,0,0,1,5.54,380.12,41.2,41.2,0,0,1,.75,367.05a26.61,26.61,0,0,1-.51-4.28,12,12,0,0,0-.14-1.33,14.79,14.79,0,0,1,0-3.12c.14-1.67.3-3.35.49-5,.32-2.76.62-5.52,1-8.27.64-4.62,1.51-9.19,2.5-13.75,1-4.75,2.27-9.45,3.65-14.11a164.4,164.4,0,0,1,6-16.67q1.52-3.63,3.2-7.2a161.83,161.83,0,0,1,9.27-17,150.11,150.11,0,0,1,9.06-12.9c2.29-2.93,4.73-5.74,7.15-8.56.23-.26.48-.5.72-.75,1.19-1.26,2.43-2.48,3.56-3.8a18.63,18.63,0,0,1,2.68-2.57,10.13,10.13,0,0,0,.77-.7,135.1,135.1,0,0,1,14.5-12.31A150.18,150.18,0,0,1,81.3,223.93a162,162,0,0,1,19.2-9.12,159.43,159.43,0,0,1,23.61-7.17c4.8-1.07,9.64-1.86,14.51-2.48,2.65-.34,5.32-.51,8-.73,5.2-.43,10.41-.25,15.61-.22,2.28,0,4.55.28,6.82.48,2,.17,4,.41,6.06.64,3.45.4,6.86,1,10.27,1.66a150.43,150.43,0,0,1,21.79,6q6.93,2.47,13.63,5.57a154.94,154.94,0,0,1,15.22,8.1,151.51,151.51,0,0,1,17,12c2.59,2.09,5.07,4.29,7.53,6.53,2,1.8,3.89,3.68,5.77,5.58a145.66,145.66,0,0,1,9.75,11A157.76,157.76,0,0,1,285.65,275c1.93,3,3.73,6.09,5.47,9.21,1.45,2.6,2.79,5.25,4.09,7.93a165.66,165.66,0,0,1,6.73,16,186,186,0,0,1,9.15,37.35c.37,2.76.77,5.5,1.06,8.26A45.75,45.75,0,0,1,312.5,361.84Z"/><path d="M245.23,89.17c-.5,24.3-9,45.34-26.24,62.54-17.44,17.36-38.67,25.91-63.23,26a85.9,85.9,0,0,1-42.57-11.13,87.89,87.89,0,0,1-34-33.52C71.33,119.36,67.46,104.6,67.48,87A85.17,85.17,0,0,1,77.87,47.11,88.81,88.81,0,0,1,219.27,26.2C236.45,43.69,244.87,64.76,245.23,89.17Z"/></g></g></svg>
                            <span>Administrador</span>
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
                            <a href="usuarioPerfil.php"><button class="btnConfig">
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
                    <li class="li liAdminis"><a href="administracion.php">Administración</a></li>
                </ul>
            </nav>
        </header>
        <main class="main">
            <form id="formCrear" enctype="multipart/form-data" name="formCrear" method="post" action="crearProd.php">
                <?php echo $htmlCrearNewPoU; ?>
            </form>
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
    </body>
</html>
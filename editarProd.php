<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    require_once("conexion.php");

    date_default_timezone_set('America/Bogota');

    $fechaActual = date("d-m-y");

    if(isset($_POST["tipo"])){
    //
        $id = $_POST["id"];
        $tipo = $_POST["tipo"];
        $catego = "";
        $tipo2 = "";
        $precioH = "";
        $precioD = "";
        $precioS = "";
        $htmlProductoEdit = "";
        $htmlEstadis = "";
        $estadisSTD = false;
        $imgPdt = "";

        if($tipo=="producto"){
        //

            $query = "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`productos` WHERE `productos`.`id_producto` = $id";

            $resultado = $conn->query($query); 

            $numberRows = $resultado->num_rows;

            $arrayData = [$numberRows-1];

            if($numberRows > 0){

                while($row = $resultado->fetch_assoc()){
                    array_push($arrayData, $row);
                }

            };

            if(isset($_POST["productoEstadis"])){

                $estadisSTD = true;

            }

            if($arrayData[1]["produCategoria"]=="Grupal"){
                
                //

                $catego = "Grupal";
                $tipo2 = "Sin Dato";
                $precioM = $arrayData[1]["produPrecio"];
                $precioH = $arrayData[1]["precioXhora"];
                $precioD = $arrayData[1]["precioXDia"];
                $precioS = $arrayData[1]["precioXSemana"];

                //

                $htmlEstadis = '
                <div class="divEstadistiGene">
                    <span class="spanDatosPrin SpanTitu1">'.$arrayData[1]["produNombre"].' ('.$catego.') - Datos Recientes</span>
                    <span class="spanTitu2 spanMiembrosPrin">Miembros</span>
                    <div class="divDatos divDatosCantM">
                        <span class="spanTitu2 spanCantM">Cantidad total de miembros</span>
                        <span class="spanDato spanCantMNum">'.$arrayData[1]["cantidadMiembros"].'</span>  
                    </div>
                    <div class="divNewMiembrosM-A">
                        <div class="divDatos divNuevosMMEs">
                            <div class="divPorcentaje"> 
                                <div class="divSpan">
                                    <span class="spanMiembrosNM">Miembros nuevos este mes</span>
                                    <span class="spanNum">5</span>
                                </div>
                                <div class="divPorcen">
                                    <span>15%</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                                </div>    
                            </div>
                            <div class="divGraficoEstadi1 graficasDiv">
                                <canvas class="graficaMiembrosNM" id="graficaMiembrosNM"></canvas>
                            </div>
                        </div>
                        <div class="divDatos divDatosNMAnio">
                            <div class="divDatoCabeza">    
                                <div class="divCantidad">
                                    <span class="spanMiembrosNA">Miembros nuevos este año</span>
                                    <span class="spanNum">8</span>
                                </div>
                                <div class="divPorcentaje">
                                    <span>15%</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                                </div>
                            </div>  
                            <div class="divGrafica">
                                <canvas class="graficaMiembrosNA" id="graficaMiembrosNA"></canvas>
                            </div>  
                        </div>
                    </div>
                    <div class="divRetenGene">
                        <div class="retenCabezera">
                            <span class="retenMiemSpan">Retención de miembros</span>
                            <span class="porcenSpan">Fluctuaciones</span>
                        </div>
                        <div class="divRetencionM">
                            <div>
                                <span class="spanTitu2">Mensual:</span>
                                <span class="spanDato">70,5%</span>
                            </div>
                            <div>
                                <span>15%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                            </div>
                        </div>
                        <div class="divRetencionA">
                            <div>
                                <span class="spanTitu2">Anual:</span>
                                <span class="spanDato">80,5%</span>
                            </div>
                            <div>
                                <span>15%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                            </div>        
                        </div>
                    </div>
                    <span class="spanTitu2 spanIngrePrin">Ingresos</span>
                    <div class="divIngreTotales">
                        <div class="spanCantDiv">
                            <span class="spanTitu2">Ingresos totales:</span>
                            <span class="spanDato">$'.$arrayData[1]["ingresosTotales"].'</span>
                        </div>
                        <div class="porcenDivIT">
                            <span>15%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                        </div>
                    </div>
                    <div class="divIngreXMes" id="divIngreXMes">
                        <div class="spanCantDiv">
                            <span>Ingresos por mes:</span>
                            <span>$4000000</span>
                        </div>
                        <div class="porcenDivIM">
                            <span>15%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                        </div>
                    </div> 
                    <div class="divIngreXAnio">
                        <div class="spanCantDiv">
                            <span>Ingresos por año:</span>
                            <span>$40000000</span>
                        </div>
                        <div class="porcenDivIM">
                            <span>15%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                        </div>
                    </div>     
                </div>';


                //

            }else{

                //

                $catego = "Individual";
                $tipo2 = "Sin Dato";
                $precioM = $arrayData[1]["produPrecio"];
                $precioH = $arrayData[1]["precioXhora"];
                $precioD = $arrayData[1]["precioXDia"];
                $precioS = $arrayData[1]["precioXSemana"];

                //

                $htmlEstadis = '
                <div class="divEstadistiGene">
                    <span class="spanDatosPrin SpanTitu1">'.$arrayData[1]["produNombre"].' ('.$catego.') - Datos Recientes</span>
                    <div class="divRetenGene">
                        <div class="retenCabezera">
                            <span class="retenMiemSpan">Retención de miembros</span>
                            <span class="porcenSpan">Fluctuaciones</span>
                        </div>
                        <div class="divRetencionM">
                            <div>
                                <span class="spanTitu2">Mensual:</span>
                                <span class="spanDato">70,5%</span>
                            </div>
                            <div>
                                <span>15%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                            </div>
                        </div>
                        <div class="divRetencionA">
                            <div>
                                <span class="spanTitu2">Anual:</span>
                                <span class="spanDato">80,5%</span>
                            </div>
                            <div>
                                <span>15%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                            </div>        
                        </div>
                    </div>
                    <span class="spanTitu2 spanIngrePrin">Ingresos</span>
                    <div class="divIngreTotales">
                        <div class="spanCantDiv">
                            <span class="spanTitu2">Ingresos totales:</span>
                            <span class="spanDato">$'.$arrayData[1]["ingresosTotales"].'</span>
                        </div>
                        <div class="porcenDivIT">
                            <span>15%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                        </div>
                    </div>
                    <div class="divIngreXMes" id="divIngreXMes">
                        <div class="spanCantDiv">
                            <span>Ingresos por mes:</span>
                            <span>$4000000</span>
                        </div>
                        <div class="porcenDivIM">
                            <span>15%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                        </div>
                    </div> 
                    <div class="divIngreXAnio">
                        <div class="spanCantDiv">
                            <span>Ingresos por año:</span>
                            <span>$40000000</span>
                        </div>
                        <div class="porcenDivIM">
                            <span>15%</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                        </div>
                    </div>     
                </div>';

                //

            }    

            $imagen = $arrayData[1]["productoImgPrin"];
            $imgPdt = $arrayData[1]["productoImgPrin"];

            $htmlProductoEdit = '
            <div class="divPrin" tipo="producto">
                <div class="cubiertaPanelEdit"></div>
                <div class="divBotones">
                    <button class="btnPanelEditor selectedBtn">Editar Producto</button>
                    <!--<button class="btnPanelEstadis">Estadísticas del Producto</button>-->
                </div>
                <div class="divDataEditGene">
                    <div class="divDatos">
                        <span class="datosProdTitu">Datos del Producto</span>
                        <div class="divNom">
                            <span class="nombreSpan">Nombre</span>
                            <input type="text" class="inputNombre" value="'.$arrayData[1]["produNombre"].'" disabled>
                            <div class="divFechaHCre">
                                <span>Creado en:</span>
                                <span>'.$arrayData[1]["producFechaCrea"].'</span>|
                                <span>'.$arrayData[1]["producHoraCrea"].'</span>
                            </div>
                        </div>
                        <div class="divCategoTipo">
                            <div class="divCatego">
                                <span>Categoría</span>
                                <select name="selectCatego" id="selectCatego" disabled>
                                    <option value="Individual" selected>'.$catego.'</option>
                                </select>
                            </div>
                            <div class="divTipo">
                                <span>Tipo</span>
                                <select name="selectTipo" id="selectTipo" disabled>
                                    <option value="" selected>'.$tipo2.'</option>
                                </select>
                            </div>
                        </div>
                        <span class="preciosSpanPrin">Precios</span>
                        <div class="divMembrePrecio">
                            <span>Precio Membresia (0 = N/A | 1 = A consultar)</span>
                            <input type="text" class="precioMembresia" value="'.$precioM.'" disabled>
                        </div>
                        <div class="divOPreciosGene">
                            <span class="preciosOSpan">Otros Precios (0 = N/A | 1 = A consultar)</span>
                            <div class="preciosXDiv">
                                <div>
                                    <span>Precio X Hora</span>
                                    <input type="text" class="precioXHora" value="'.$precioH.'" disabled>
                                </div>
                                <div>
                                    <span>Precio X Día</span>
                                    <input type="text" class="precioXDia" value="'.$precioD.'" disabled>
                                </div>
                                <div>
                                    <span>Precio X Semana</span>
                                    <input type="text" class="precioXSemana" value="'.$precioS.'" disabled>
                                </div>
                            </div>
                        </div>
                        <span class="descriSpan">Descripción del producto <span>(Máximo de 250 caracteres)</span></span>
                        <textarea id="descripcionProd" name="descripcionProd" rows="8" cols="50" disabled>'.$arrayData[1]["produDescri"].'
                        </textarea>  
                    </div>
                    <div class="divImgGene">
                        <figure id="contenedorImagen">
                            <img id="imagenSelected" src="images/productosImages/'.$arrayData[1]["productoImgPrin"].'" alt="">
                            <figcaption id="imagenNombre">
                            </figcaption>
                        </figure>
                        <span class="spanImagenTamanio">Imagen de muestra del producto (tamaño máximo 2 megabytes, de preferencia imágenes cuadradas)</span>
                        <div class="divBtnSubirImg">
                            <input type="file" id="subirImagenBtn" accept="image/*" disabled>
                            <label for="subirImagenBtn" class="labelSubirImg labelSubirImg1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.73 457.83"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M475.7,339.4c0-17.18-11.66-28.83-28.8-28.84-38.41,0-76.82.07-115.24-.11-4.49,0-6.62,1.5-8.71,5.44-10.31,19.4-26.07,30.66-48.66,30.74q-36.41.14-72.83,0c-22.55-.11-38.38-11.29-48.68-30.72-2.08-3.93-4.2-5.49-8.7-5.46-38.41.18-76.83.08-115.24.11C11.7,310.57.05,322.22,0,339.38Q0,384,0,428.68a31.41,31.41,0,0,0,.5,6.43c2.91,14,14.12,22.69,29.29,22.7q103.77,0,207.53,0,104.27,0,208.53,0c18,0,29.81-11.77,29.82-29.6Q475.76,383.8,475.7,339.4ZM346.94,419.58c-9.77-.13-17.09-7.73-17-17.64.09-9.74,7.69-17.07,17.62-17,9.62.07,17.62,8,17.55,17.4C365,412,356.88,419.71,346.94,419.58Zm72.88,0a17.09,17.09,0,0,1-17-17.73c.13-9.58,7.94-17,17.81-16.91,9.52.08,17.57,8.15,17.43,17.48C437.94,412.06,429.76,419.74,419.82,419.58Z"/><path d="M111.34,165.5c20.61,0,41.23,0,61.85,0,10.6,0,9.4-1.24,9.43,9.18,0,19.12,0,38.25,0,57.37q0,29.18,0,58.36c0,13.2,6.61,21,19.75,21.25q35.42.74,70.83,0c13.16-.26,19.86-8,19.87-21.15,0-39.74.07-79.48-.09-119.22,0-4.63,1.36-5.95,5.94-5.91,21.78.22,43.56.11,65.34.09,9.79,0,15.16-3.52,18.77-11.88,3.53-8.15,1.23-14.72-4.8-20.73Q315,69.82,251.94,6.65c-8.87-8.86-19.29-8.85-28.07-.07Q160.7,69.69,97.55,132.82c-6,6-8.43,12.52-4.93,20.7C96.21,161.89,101.65,165.49,111.34,165.5Z"/></g></g></svg>
                                Cargar Imagen
                            </lable>
                        </div>
                        <div class="divBtnsGene">
                            <div class="divBtnsGuardar">
                                <button class="btnGuardar btnGuardar1" disabled>
                                    Guardar Cambios
                                </button>
                                <button class="btnCancelCambio btnCancelCambio1" disabled>    
                                    Cancelar
                                </button>
                                <button class="btnHabilitar btnHabilitar1">    
                                    Habilitar Edición
                                </button>
                            </div>
                            <div class="divOOpcionesBtn">
                                <span>Otras Opciones</span>
                                <button class="eliminarProd">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301.97 383.52"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M300.75,92Q288,62.94,258,52.08c-10.44-3.79-21.24-4-32.1-3.64-3.09.1-4.6-.7-5.44-4a59.08,59.08,0,0,0-14.31-25.91C196.84,8.47,185.25,2.67,171.93,0H130c-25.47,5.54-42,20.63-49,45.9-.53,1.92-1.66,2.55-3.54,2.51-3.62-.07-7.24,0-10.85,0A71.14,71.14,0,0,0,1.18,92c-3.66,8.71,1.55,16.77,11,16.77q138.81,0,277.63,0C299.15,108.78,304.53,100.61,300.75,92ZM193.55,48.42c-14.21-.06-28.42,0-42.64,0H108.65c-3.94,0-4.2-.36-2.45-4,6.83-14.24,18.48-21.19,34-21.57,9.08-.22,18.2-.7,27.26.56,13.63,1.9,22.94,9.49,28.7,21.79C197.56,48.17,196,48.43,193.55,48.42Z"/><path d="M269.76,130.74H33.64c-7.88,0-7.69,0-7,8,1.31,15.38,2.45,30.77,3.54,46.17,1.13,15.9,2,31.81,3.2,47.71,1.62,22.47,3.38,44.93,5,67.41,1.29,17.63,2.44,35.27,3.78,52.9,1.28,16.9,16,30.58,33,30.59q75.78,0,151.55,0c16.39,0,31.26-12.94,32.83-29.14,1.65-17.1,2.64-34.26,3.86-51.4.85-11.92,1.55-23.86,2.41-35.78,1.15-15.89,2.42-31.78,3.57-47.67.86-12,1.54-24.11,2.41-36.15,1.13-15.65,2.42-31.28,3.53-46.93C275.78,130.75,275.63,130.74,269.76,130.74ZM116.11,322c-5,.69-10-2.83-11.36-8.19-1.48-5.74-.78-11.65-1.25-17.47-1-12.15-1.13-24.36-1.74-36.54q-1.65-33.37-3.48-66.73a11.2,11.2,0,0,1,9.35-12.06c5.08-1,10.42,2.52,11.69,8.11,1.49,6.58,1,13.38,1.38,20.07,1.22,19.12,2.08,38.27,3,57.41.71,14.79,1.31,29.59,2,44.39A10.71,10.71,0,0,1,116.11,322Zm87.38-129.76q-1.69,36.74-3.41,73.47c-.69,14.66-1.5,29.33-2.2,44-.4,8.63-6.49,13.93-13.8,11.9a11.17,11.17,0,0,1-8-11.67c.74-11.92,1.36-23.85,2-35.78q1.47-28.32,2.88-56.66c.37-7.71.65-15.42.91-23.13a21.87,21.87,0,0,1,.74-5.53c1.52-5.12,6.48-8.63,11.24-7.93C199.77,181.8,203.88,186.55,203.49,192.28Z"/></g></g></svg>
                                    Eliminar Producto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>'
            .$htmlEstadis.'';

        //

        }else{

        //
        
            $precioH = "";
            $precioD = "";
            $precioS = "";

            $query = "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`unidades` WHERE `unidades`.`id_unidad` = $id";

            $resultado = $conn->query($query); 

            $numberRows = $resultado->num_rows;

            $arrayData = [$numberRows-1];

            if($numberRows > 0){

                while($row = $resultado->fetch_assoc()){
                    array_push($arrayData, $row);
                }

            };

            if(isset($_POST["unidadEstadis"])){

                $estadisSTD = true;

            }

            $preciosUnidad = explode(",", $arrayData[1]["unidad_precios"]);

            $catego = "Sin Dato";
            $tipo2 = "Sin Dato";

            $imagen = $arrayData[1]["unidad_imagen"];
            $imgPdt = $arrayData[1]["unidad_imagen"];

            $htmlProductoEdit = '
            <div class="divPrin" tipo="unidad">
                <div class="cubiertaPanelEdit"></div>
                <div class="divBotones">
                    <button class="btnPanelEditor2 selectedBtn" id="btnEditUnid">Editar Unidad</button>
                    <!--<button class="btnPanelEstadis2" id="btnEstadisUnid">Estadísticas Unidad</button>-->
                </div>
                <div class="divDataEditGene">
                    <div class="divDatos">
                        <span class="datosProdTitu">Datos de la Unidad</span>
                        <div class="divNom">
                            <span class="nombreSpan">Nombre</span>
                            <input type="text" class="inputNombre" value="'.$arrayData[1]["unidad_nombre"].'" disabled>
                            <div class="divFechaHCre">
                                <span>Creado en:</span>
                                <span>'.$arrayData[1]["unidad_fechaCre"].'</span>|
                                <span>'.$arrayData[1]["unidad_horaCre"].'</span>
                            </div>
                        </div>
                        <div class="divCategoTipo">
                            <div class="divCatego">
                                <span>Categoría</span>
                                <select name="selectCatego" id="selectCatego" disabled>
                                    <option value="Individual" selected>'.$catego.'</option>
                                </select>
                            </div>
                            <div class="divTipo">
                                <span>Tipo</span>
                                <select name="selectTipo" id="selectTipo" disabled>
                                    <option value="" selected>'.$tipo2.'</option>
                                </select>
                            </div>
                        </div>
                        <span class="preciosSpanPrin">Precios</span>
                        <div class="divOPreciosGene">
                            <span class="preciosOSpan">Precios (0 = N/A | 1 = A consultar)</span>
                            <div class="preciosXDiv">
                                <div>
                                    <span>Precio X Hora</span>
                                    <input type="text" class="precioXHora" value="'.$preciosUnidad[0].'" disabled>
                                </div>
                                <div>
                                    <span>Precio X Día</span>
                                    <input type="text" class="precioXDia" value="'.$preciosUnidad[1].'" disabled>
                                </div>
                                <div>
                                    <span>Precio X Semana</span>
                                    <input type="text" class="precioXSemana" value="'.$preciosUnidad[2].'" disabled>
                                </div>
                            </div>
                        </div>
                        <span class="descriSpan">Descripción de la Unidad <span>(Máximo de 250 caracteres)</span></span>
                        <textarea id="descripcionProd" name="descripcionProd" rows="8" cols="50" disabled>'.$arrayData[1]["unidad_descrip"].'
                        </textarea>  
                        <div class="divCaracteristicas">
                            <span>Características de la Unidad (Opcional)</span>
                            <textarea id="caracterisProd" name="caracterisProd" placeholder="Ejemplo: (Característica 1,Característica 2,Característica 3,...)" rows="6" cols="50" disabled>'.$arrayData[1]["unidad_caracte"].'</textarea>
                            <span class="spanInstruCarac">Digite cada característica separada por una coma. Procure no dejar espacios entre las comas.</span>
                        </div>
                    </div>
                    <div class="divImgGene">
                        <figure id="contenedorImagen">
                            <img id="imagenSelected" src="images/productosImages/'.$arrayData[1]["unidad_imagen"].'" alt="">
                            <figcaption id="imagenNombre">
                            </figcaption>
                        </figure>
                        <span class="spanImagenTamanio">Imagen de muestra de la unidad (tamaño máximo 2 megabytes, de preferencia imágenes cuadradas)</span>
                        <div class="divBtnSubirImg">
                            <input type="file" id="subirImagenBtn" accept="image/*" disabled>
                            <label for="subirImagenBtn" class="labelSubirImg labelSubirImg1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.73 457.83"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M475.7,339.4c0-17.18-11.66-28.83-28.8-28.84-38.41,0-76.82.07-115.24-.11-4.49,0-6.62,1.5-8.71,5.44-10.31,19.4-26.07,30.66-48.66,30.74q-36.41.14-72.83,0c-22.55-.11-38.38-11.29-48.68-30.72-2.08-3.93-4.2-5.49-8.7-5.46-38.41.18-76.83.08-115.24.11C11.7,310.57.05,322.22,0,339.38Q0,384,0,428.68a31.41,31.41,0,0,0,.5,6.43c2.91,14,14.12,22.69,29.29,22.7q103.77,0,207.53,0,104.27,0,208.53,0c18,0,29.81-11.77,29.82-29.6Q475.76,383.8,475.7,339.4ZM346.94,419.58c-9.77-.13-17.09-7.73-17-17.64.09-9.74,7.69-17.07,17.62-17,9.62.07,17.62,8,17.55,17.4C365,412,356.88,419.71,346.94,419.58Zm72.88,0a17.09,17.09,0,0,1-17-17.73c.13-9.58,7.94-17,17.81-16.91,9.52.08,17.57,8.15,17.43,17.48C437.94,412.06,429.76,419.74,419.82,419.58Z"/><path d="M111.34,165.5c20.61,0,41.23,0,61.85,0,10.6,0,9.4-1.24,9.43,9.18,0,19.12,0,38.25,0,57.37q0,29.18,0,58.36c0,13.2,6.61,21,19.75,21.25q35.42.74,70.83,0c13.16-.26,19.86-8,19.87-21.15,0-39.74.07-79.48-.09-119.22,0-4.63,1.36-5.95,5.94-5.91,21.78.22,43.56.11,65.34.09,9.79,0,15.16-3.52,18.77-11.88,3.53-8.15,1.23-14.72-4.8-20.73Q315,69.82,251.94,6.65c-8.87-8.86-19.29-8.85-28.07-.07Q160.7,69.69,97.55,132.82c-6,6-8.43,12.52-4.93,20.7C96.21,161.89,101.65,165.49,111.34,165.5Z"/></g></g></svg>
                                Cargar Imagen
                            </lable>
                        </div>
                        <div class="divBtnsGene">
                            <div class="divBtnsGuardar">
                                <button class="btnGuardar btnGuardar1" disabled>
                                    Guardar Cambios
                                </button>
                                <button class="btnCancelCambio btnCancelCambio1" disabled>    
                                    Cancelar
                                </button>
                                <button class="btnHabilitar btnHabilitar1">    
                                    Habilitar Edición
                                </button>
                            </div>
                            <div class="divOOpcionesBtn">
                                <span>Otras Opciones</span>
                                <button class="eliminarProd">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301.97 383.52"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M300.75,92Q288,62.94,258,52.08c-10.44-3.79-21.24-4-32.1-3.64-3.09.1-4.6-.7-5.44-4a59.08,59.08,0,0,0-14.31-25.91C196.84,8.47,185.25,2.67,171.93,0H130c-25.47,5.54-42,20.63-49,45.9-.53,1.92-1.66,2.55-3.54,2.51-3.62-.07-7.24,0-10.85,0A71.14,71.14,0,0,0,1.18,92c-3.66,8.71,1.55,16.77,11,16.77q138.81,0,277.63,0C299.15,108.78,304.53,100.61,300.75,92ZM193.55,48.42c-14.21-.06-28.42,0-42.64,0H108.65c-3.94,0-4.2-.36-2.45-4,6.83-14.24,18.48-21.19,34-21.57,9.08-.22,18.2-.7,27.26.56,13.63,1.9,22.94,9.49,28.7,21.79C197.56,48.17,196,48.43,193.55,48.42Z"/><path d="M269.76,130.74H33.64c-7.88,0-7.69,0-7,8,1.31,15.38,2.45,30.77,3.54,46.17,1.13,15.9,2,31.81,3.2,47.71,1.62,22.47,3.38,44.93,5,67.41,1.29,17.63,2.44,35.27,3.78,52.9,1.28,16.9,16,30.58,33,30.59q75.78,0,151.55,0c16.39,0,31.26-12.94,32.83-29.14,1.65-17.1,2.64-34.26,3.86-51.4.85-11.92,1.55-23.86,2.41-35.78,1.15-15.89,2.42-31.78,3.57-47.67.86-12,1.54-24.11,2.41-36.15,1.13-15.65,2.42-31.28,3.53-46.93C275.78,130.75,275.63,130.74,269.76,130.74ZM116.11,322c-5,.69-10-2.83-11.36-8.19-1.48-5.74-.78-11.65-1.25-17.47-1-12.15-1.13-24.36-1.74-36.54q-1.65-33.37-3.48-66.73a11.2,11.2,0,0,1,9.35-12.06c5.08-1,10.42,2.52,11.69,8.11,1.49,6.58,1,13.38,1.38,20.07,1.22,19.12,2.08,38.27,3,57.41.71,14.79,1.31,29.59,2,44.39A10.71,10.71,0,0,1,116.11,322Zm87.38-129.76q-1.69,36.74-3.41,73.47c-.69,14.66-1.5,29.33-2.2,44-.4,8.63-6.49,13.93-13.8,11.9a11.17,11.17,0,0,1-8-11.67c.74-11.92,1.36-23.85,2-35.78q1.47-28.32,2.88-56.66c.37-7.71.65-15.42.91-23.13a21.87,21.87,0,0,1,.74-5.53c1.52-5.12,6.48-8.63,11.24-7.93C199.77,181.8,203.88,186.55,203.49,192.28Z"/></g></g></svg>
                                    Eliminar Unidad
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="divEstadisUnidGene">
                <span class="spanPrinEstadisUnid">'.$arrayData[1]["unidad_nombre"].' - Datos Recientes</span>
                <span class="spanResePrin">Reservas</span>
                <div class="divReserTotal">
                    <span>Reservas totales de la unidad</span>
                    <span>45</span>
                </div>
                <div class="divGraReserGene">
                    <div class="divGrafi1Unid">
                        <div class="divSpanGene">
                            <div class="divSpan">
                                <span>Reservas del mes</span>
                                <span>5</span>
                            </div>
                            <div class="divPorcen">
                                <span>15%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                            </div>
                        </div>
                        <div class="divGraficaUnid1">
                            <canvas class="GraficaUnid1" id="GraficaUnidRM"></canvas>
                        </div>
                    </div>
                    <div class="divGrafi2Unid">
                        <div class="divSpanGene">
                            <div class="divSpan">
                                <span>Reservas del año</span>
                                <span>5</span>
                            </div>
                            <div class="divPorcen">
                                <span>15%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                            </div>
                        </div>
                        <div class="divGraficaUnid2">
                            <canvas class="GraficaUnid2" id="GraficaUnidRA"></canvas>
                        </div>
                    </div>
                </div>
                <span class="spanUtilizaPrin">Tasa de utilización</span>
                <div class="divUtilidadGene">
                    <span class="spanPorcen1">50%</span>
                    <div class="divFluctua">
                        <span class="spanPorcen2">15%</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                    </div>
                </div>
                <span class="spanRendiPrin">Rendimiento</span>
                <div class="divRendimientoGene">
                    <span class="spanPorcen1">50%</span>
                    <div class="divFluctua">
                        <span>15%</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                    </div>
                </div>
            </div>';
        }

    //    
    }
    
?>

<!DOCTYPE html>
<html lang="en" class="editarProdHTML">
<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Producto</title>
    <input type="hidden" id="idprod" value="<?php echo $id?>">
    <input type="hidden" id="estadisSTD" value="<?php echo $estadisSTD?>">
    <input type="hidden" id="inO_imgPdt" value="<?php echo $imgPdt?>">
    <form id="formEliminarProd" method="post" action="eliminarProd.php">
        <input type="hidden" value="<?php echo $id?>" name="idEliminarProdEdit">
        <input type="hidden" value="<?php echo $tipo?>" name="tipoEditEli">
        <input id="inO_imgPdtElimi" type="hidden" value="<?php echo $imagen?>" name="imagen">
    </form>
    
    <link rel="stylesheet" href="estilos/editarProd.css">
    <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
        <?php echo $htmlProductoEdit;?>
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
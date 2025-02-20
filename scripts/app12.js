//--------------------------------------------------------------------------------------------------------------------------------------------------------
// Variables y Funciones Globales

import 
{
diaGeneNum, mesGeneNum, anioGeneNum, diaGeneTex, mesGeneTex, anioGeneTex, cadenaFechaActual, cadenaFechaActualP,
obtenerDiaSemana, obtenerFechasExtremos, obtenerExtremosDelMes, url_consultasDB, sumarRestarDias, obtenerRangoDeFechas,
fechaANumero, mesesABREVI, moverEntreMeses, quitarAcentos, actuCopyAnio
} 
from "https://plataforma.the-bizclub.com/scripts/vyfGlobales.js";

// Variables y Funciones Globales
//--------------------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------------
if(document.querySelector("#admin_ReseCalendaHTML") != null){

    //----------------------------------------------------------------------------------------------------------------------------------------------------
    // DOM Elementos
    
    const div_baseCalendaRender = document.querySelector("#div_baseCalendaRender");

    const div_calendaMesBasePrin = document.querySelector("#div_calendaMesBasePrin");
    const div_baseDiasCalendaMesGene = document.querySelector("#div_baseDiasCalendaMesGene");

    const div_baseListaRese = document.querySelector("#div_baseListaRese");

    const div_calendaSemaBasePrin = document.querySelector("#div_calendaSemaBasePrin");
    const div_calendaDiaBasePrin = document.querySelector("#div_calendaDiaBasePrin");

    const span_mesMuestra = document.querySelector("#span_mesMuestra");
    const span_anioMuestra = document.querySelector("#span_anioMuestra");

    const b_numResesFind = document.querySelector("#b_numResesFind");

    // DOM Elementos
    //----------------------------------------------------------------------------------------------------------------------------------------------------
   
    //----------------------------------------------------------------------------------------------------------------------------------------------------
    // Variables

    let fechaActual = cadenaFechaActual;

    let cantReseFind = 0;

    // Objetos 
    let objetoReservas_calendaModoMes;
    let objetoReservas_calendaModoSema;
    let objetoReservas_calendaModoDia;

    let casillaDiasConReservas = [];
    let casillaDiasSinReservas = [];

    // Fragments

    // Intervalos 
    let intervalActuAutoReservas = null;

    // Filtros
    let filtro_tipoReseCalenM = "";
    let filtro_estadoReseCalenM = "";

    // Rangos
    const rangeDiasCalenMesAnte = document.createRange();
    const rangeDiasCalenMesActu = document.createRange();
    const rangeDiasCalenMesProx = document.createRange();

    const rangeListaDeReservas = document.createRange();
    const rangeDatosReservaMues = document.createRange();
    const rangeOpcionesReservaMues = document.createRange();

    // Variables
    //----------------------------------------------------------------------------------------------------------------------------------------------------
        
    //----------------------------------------------------------------------------------------------------------------------------------------------------
    // Calendario MODO MES - Funciones
    function actuAutomaticaReservas(){

        let formActuReseAuto = new FormData();
        formActuReseAuto.append("actuAutomaticaReseCalenda", "true");
    
        fetch(url_consultasDB, {
            method: "POST",
            body: formActuReseAuto
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {

            if (data.success) {

                calendaMes_buscarReservas(fechaActual);

            } else {

                alert(data.message);

            }

        })
        .catch((error) => {

            console.error("Error:", error);

        });

    };

    function opcionReservaAccion(opcion, idRese){

        let formOpcionEjecutar = new FormData(); 
        formOpcionEjecutar.append('opcion_reservaLista', opcion);
        formOpcionEjecutar.append('idReservaOpcion', idRese);

        fetch(url_consultasDB, {
            method: 'POST',
            body: formOpcionEjecutar
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            
            clearInterval(intervalActuAutoReservas);
            intervalActuAutoReservas = null;

            if (data.success) {

                // console.log(data.idCambiado);

            } else {

                alert(data.message);

            }

            actuAutomaticaReservas();
            intervalActuAutoReservas = setInterval(actuAutomaticaReservas, 10000);

        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    function insertarReservasLista(){

        let htmlListaReservas = ``;
        let datos = objetoReservas_calendaModoMes;

        if(datos.length != 0){

            cantReseFind = 0;

            let datosNuevo = datos.filter(item => 
                (filtro_estadoReseCalenM === "" || item.rese_estado === filtro_estadoReseCalenM) &&
                (filtro_tipoReseCalenM === "" || item.rese_tipo === filtro_tipoReseCalenM)
            );

            if(datosNuevo.length != 0){

                for(let i = 0; i < datosNuevo.length; i++){

                    cantReseFind++;
    
                    htmlListaReservas += `
                    <div
                    id="btn_reservaDatos${datosNuevo[i]["rese_codigo"]}"
                    class="btn_reservaDatos btn_reservaDatos-A btn_reservaDatos-A-1"
                    title="Ver Reserva"
                    tipo="${datosNuevo[i]["rese_estado"]}"
                    codigo="${datosNuevo[i]["rese_codigo"]}" 
                    >
                        <div
                        class="div_datoEstadoYCodigo div_datoEstadoYCodigo-1"
                        >
                            <span class="span_codigoRese span_codigoRese-1">${datosNuevo[i]["rese_codigo"]}</span>
                            <span class="span_tipoRese span_tipoRese-1">${datosNuevo[i]["rese_tipo"]}</span>
                            <span class="span_estadoRese span_estadoRese-1">${datosNuevo[i]["rese_estado"]}</span>
                        </div>
                        <div
                        class="div_baseDatos div_baseDatos-1"
                        >
                            <div
                            class="div_baseSpansData div_baseSpansData-1"
                            >
                                <div
                                class="div_spanFechas div_spanFechas-1"
                                >
                                    <span>Fechas</span>
                                    <span>Inicio: ${datosNuevo[i]["rese_fechaIniTex"]}</span>
                                    <span>Final: ${datosNuevo[i]["rese_fechaFinTex"]}</span>
                                </div>
                                <div
                                class="div_spanHoras div_spanHoras-1"
                                >
                                    <span>Horario</span>
                                    <span>Inicio: ${datosNuevo[i]["rese_horaIni"]}</span>
                                    <span>Final: ${datosNuevo[i]["rese_horaFin"]}</span>
                                </div>
                            </div>
                            <div
                            class="div_baseImagenData div_baseImagenData-1"
                            >
                                <div
                                id="div_baseUser"
                                class="div_baseUser div_baseUser-1"
                                >
                                    <div
                                    class="div_imgBase div_imgBase-1"
                                    >
                                        <img src="imagesUser/${datosNuevo[i]["user_imagen"]}" alt="Perfil del Usuario">
                                    </div>
                                    <span>${datosNuevo[i]["user_nombre"]+" "+datosNuevo[i]["user_apellido"]}</span>
                                </div>
                            </div>
                            <div
                            class="div_basePdtSelected div_basePdtSelected-1"
                            >
                                <span
                                class="span_pdtSelectedRese span_pdtSelectedRese-1"
                                >${datosNuevo[i]["produNombre"]}</span>
                            </div>
                        </div>
                    </div>
                    `;
                    
                }

            }

            if(htmlListaReservas == ""){

                htmlListaReservas = `
                <div
                id="div_baseReservasNOEncontradas"
                class="div_baseReservasNOEncontradas div_baseReservasNOEncontradas-1"
                >
                    <span>No se encontraron las Reservas Especificadas</span>
                    <svg class="svg_reservaNOEncontrada" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.77 511.57"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M489.17,422.32c-29.91-29.59-59.47-59.54-89.42-89.09-4.14-4.09-4.32-6.88-1.47-11.75,25.25-43.13,34.35-89.56,27-139-8.15-54.69-34-99.72-76.62-134.58C302,9.77,248-5.1,188.39,1.53,142.54,6.62,102.08,25,68.8,57,9.4,114-12,183.79,6.38,263.86,30.07,367.24,129.17,439.79,241.71,425.74a202.19,202.19,0,0,0,80.88-28.07c4.16-2.53,6.62-2.32,10.11,1.2,29.85,30.13,60,60,89.83,90.1,9.69,9.79,19.56,19,33.35,22.6h19c6.47-2.43,13.09-4.45,18.67-8.83,8.32-6.52,14.16-14.65,16.95-24.9a25.91,25.91,0,0,1,1.31-3.2v-19C508.15,441.9,499,432,489.17,422.32Zm1.45,47.55c-3.22,18.64-25.75,27.48-40.69,15.8a71.78,71.78,0,0,1-6.22-5.75Q392.35,428.6,341,377.25c-8.54-8.53-11.69-8.92-21.62-2.46-28.6,18.62-59.82,29.18-94,30.93C171.23,408.49,124,391.86,83.86,355.4,51.7,326.19,32.43,289.81,24.43,247.3c-2.09-11.13-2.72-22.41-2.94-33.76,1.77-67.18,29.63-120.74,84.8-159.39,24.88-17.43,52.91-27.68,83.17-31.31,46.8-5.6,90.35,3.88,129.78,29.77,37.22,24.44,63.07,58.06,77.4,100.37a186.51,186.51,0,0,1,9.91,62.7c-.5,36-10.11,69.51-29.38,100.09-1,1.55-2,3.08-3,4.63-5.23,8.27-4.8,12.36,2.16,19.33q52.54,52.59,105.16,105.12C488.56,451.85,492.37,459.69,490.62,469.87Z"/><path d="M270.1,67.47a104.63,104.63,0,0,0-20.51-6.15c-6-1.15-11.11,2-12.47,7.28-1.47,5.7,1,10.46,6.77,12.74a58,58,0,0,0,5.71,1.75c59.43,16.6,99.38,69,99.51,135.57.24,22.56-7.06,48.16-22.92,70.57-31.88,45.07-75.85,64.6-130.75,58.35-30.33-3.45-56.4-16.76-77.56-38.49C87.41,277.82,74.12,239.9,80,196.52c7.07-52.15,36.17-88.05,84.37-108.72,3.2-1.37,6.59-2.46,9.51-4.3a9.45,9.45,0,0,0,4.45-10.77,10.22,10.22,0,0,0-9.06-8.14c-2.86-.4-5.57.72-8.23,1.65C102.38,86.82,60.09,143.51,57.56,205.64c-1.72,42.19,11.09,79.55,38.89,111.55,43.44,50,116.39,66.92,177.45,41.21,68.27-28.74,107.71-99.79,93.94-172.48C357.08,129.08,323.62,89.65,270.1,67.47Z"/><path d="M166.16,151.9a10.3,10.3,0,0,0-15.67,7.78c-.49,4.37,2,7.53,4.91,10.42q19.59,19.58,39.15,39.18c5,5,5.06,3.76-.17,9q-19.55,19.62-39.14,39.18c-3,3-5.53,6.35-4.61,11a10.42,10.42,0,0,0,7.16,8.26c4.52,1.56,8.16-.19,11.28-3.31q20-19.89,39.9-39.83c5.71-5.68,4.13-5.71,9.69-.18q19.64,19.53,39.17,39.16c3.32,3.34,6.95,5.78,12,4.25,8.36-2.54,10.14-11.84,3.39-18.67q-20.34-20.58-41-40.88c-2.77-2.71-2.95-4.21-.06-7C245.72,197,259,183.47,272.45,170.07c2.64-2.63,5-5.39,5-9.86a10.43,10.43,0,0,0-6.77-9.16c-5.58-2.3-9.6.55-13.28,4.22C244,168.67,230.53,182,217.25,195.55c-2.59,2.64-4,2.77-6.68,0-13-13.31-26.26-26.41-39.47-39.55A26.61,26.61,0,0,0,166.16,151.9Z"/><path d="M207.16,78.15a10.23,10.23,0,0,0,10.48-10.33,10.29,10.29,0,1,0-20.57-.34A10.17,10.17,0,0,0,207.16,78.15Z"/></g></g></svg>
                </div>
                `;

            }

        }else if(datos.length == 0){

            cantReseFind = 0;

            htmlListaReservas = `
            <div
            id="div_baseReservasNOEncontradas"
            class="div_baseReservasNOEncontradas div_baseReservasNOEncontradas-1"
            >
                <span>No se encontraron Reservas en estas fechas</span>
                <svg class="svg_reservaNOEncontrada" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.77 511.57"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M489.17,422.32c-29.91-29.59-59.47-59.54-89.42-89.09-4.14-4.09-4.32-6.88-1.47-11.75,25.25-43.13,34.35-89.56,27-139-8.15-54.69-34-99.72-76.62-134.58C302,9.77,248-5.1,188.39,1.53,142.54,6.62,102.08,25,68.8,57,9.4,114-12,183.79,6.38,263.86,30.07,367.24,129.17,439.79,241.71,425.74a202.19,202.19,0,0,0,80.88-28.07c4.16-2.53,6.62-2.32,10.11,1.2,29.85,30.13,60,60,89.83,90.1,9.69,9.79,19.56,19,33.35,22.6h19c6.47-2.43,13.09-4.45,18.67-8.83,8.32-6.52,14.16-14.65,16.95-24.9a25.91,25.91,0,0,1,1.31-3.2v-19C508.15,441.9,499,432,489.17,422.32Zm1.45,47.55c-3.22,18.64-25.75,27.48-40.69,15.8a71.78,71.78,0,0,1-6.22-5.75Q392.35,428.6,341,377.25c-8.54-8.53-11.69-8.92-21.62-2.46-28.6,18.62-59.82,29.18-94,30.93C171.23,408.49,124,391.86,83.86,355.4,51.7,326.19,32.43,289.81,24.43,247.3c-2.09-11.13-2.72-22.41-2.94-33.76,1.77-67.18,29.63-120.74,84.8-159.39,24.88-17.43,52.91-27.68,83.17-31.31,46.8-5.6,90.35,3.88,129.78,29.77,37.22,24.44,63.07,58.06,77.4,100.37a186.51,186.51,0,0,1,9.91,62.7c-.5,36-10.11,69.51-29.38,100.09-1,1.55-2,3.08-3,4.63-5.23,8.27-4.8,12.36,2.16,19.33q52.54,52.59,105.16,105.12C488.56,451.85,492.37,459.69,490.62,469.87Z"/><path d="M270.1,67.47a104.63,104.63,0,0,0-20.51-6.15c-6-1.15-11.11,2-12.47,7.28-1.47,5.7,1,10.46,6.77,12.74a58,58,0,0,0,5.71,1.75c59.43,16.6,99.38,69,99.51,135.57.24,22.56-7.06,48.16-22.92,70.57-31.88,45.07-75.85,64.6-130.75,58.35-30.33-3.45-56.4-16.76-77.56-38.49C87.41,277.82,74.12,239.9,80,196.52c7.07-52.15,36.17-88.05,84.37-108.72,3.2-1.37,6.59-2.46,9.51-4.3a9.45,9.45,0,0,0,4.45-10.77,10.22,10.22,0,0,0-9.06-8.14c-2.86-.4-5.57.72-8.23,1.65C102.38,86.82,60.09,143.51,57.56,205.64c-1.72,42.19,11.09,79.55,38.89,111.55,43.44,50,116.39,66.92,177.45,41.21,68.27-28.74,107.71-99.79,93.94-172.48C357.08,129.08,323.62,89.65,270.1,67.47Z"/><path d="M166.16,151.9a10.3,10.3,0,0,0-15.67,7.78c-.49,4.37,2,7.53,4.91,10.42q19.59,19.58,39.15,39.18c5,5,5.06,3.76-.17,9q-19.55,19.62-39.14,39.18c-3,3-5.53,6.35-4.61,11a10.42,10.42,0,0,0,7.16,8.26c4.52,1.56,8.16-.19,11.28-3.31q20-19.89,39.9-39.83c5.71-5.68,4.13-5.71,9.69-.18q19.64,19.53,39.17,39.16c3.32,3.34,6.95,5.78,12,4.25,8.36-2.54,10.14-11.84,3.39-18.67q-20.34-20.58-41-40.88c-2.77-2.71-2.95-4.21-.06-7C245.72,197,259,183.47,272.45,170.07c2.64-2.63,5-5.39,5-9.86a10.43,10.43,0,0,0-6.77-9.16c-5.58-2.3-9.6.55-13.28,4.22C244,168.67,230.53,182,217.25,195.55c-2.59,2.64-4,2.77-6.68,0-13-13.31-26.26-26.41-39.47-39.55A26.61,26.61,0,0,0,166.16,151.9Z"/><path d="M207.16,78.15a10.23,10.23,0,0,0,10.48-10.33,10.29,10.29,0,1,0-20.57-.34A10.17,10.17,0,0,0,207.16,78.15Z"/></g></g></svg>
            </div>
            `;

        }

        div_baseListaRese.innerHTML = "";

        let fragListaReservas = rangeListaDeReservas.createContextualFragment(htmlListaReservas);

        div_baseListaRese.append(fragListaReservas);

        b_numResesFind.textContent = cantReseFind;

        // Agregando eventos a las reservas
        let lista_btnReservas = document.querySelectorAll(".btn_reservaDatos");

        lista_btnReservas.forEach((reservaBtn) => {

            reservaBtn.addEventListener("click", (e) => {
                
                let codigoRese = reservaBtn.getAttribute("codigo");

                let datosRese = datos.filter(item => codigoRese === item.rese_codigo);

                // Definiendo Duración
                let duracionUnidad = "";

                if(datosRese[0]["rese_tipo"] == "hora"){

                    duracionUnidad = (Number(datosRese[0]["rese_duracion"])>1) ? "Horas" : "Hora"

                }else if(datosRese[0]["rese_tipo"] == "dia"){

                    duracionUnidad = (Number(datosRese[0]["rese_duracion"])>1) ? "Días" : "Día"

                }else if(datosRese[0]["rese_tipo"] == "semana"){

                    duracionUnidad = (Number(datosRese[0]["rese_duracion"])>1) ? "Semanas" : "Semana"

                }else if(datosRese[0]["rese_tipo"] == "mes"){

                    duracionUnidad = (Number(datosRese[0]["rese_duracion"])>1) ? "Meses" : "Mes"

                }

                // Codigo de la Reserva
                document.querySelector("#b_codigoReservaTitulo").textContent = datosRese[0]["rese_codigo"];

                // HTML con los datos de la reserva
                let htmlDatos = `
                <li class="li_datoReseMuestra li_datoReseMuestra-serie li_datoReseMuestra-serie-1">
                    <span>Serie:</span>
                    <span>${datosRese[0]["rese_serie"]}</span>
                </li>
                <li class="li_datoReseMuestra li_datoReseMuestra-tipo li_datoReseMuestra-tipo-1">
                    <span>Tipo:</span>
                    <span>${datosRese[0]["rese_tipo"]}</span>
                </li>
                <li class="li_datoReseMuestra li_datoReseMuestra-estado li_datoReseMuestra-estado-1">
                    <span>Estado:</span>
                    <span id="span_estadoReseMuestra" tipo="${datosRese[0]["rese_estado"]}">${datosRese[0]["rese_estado"]}</span>
                </li>
                <div
                class="div_contDatosHorarios div_contDatosHorarios-1"
                >
                    <li class="li_datoReseMuestra li_datoReseMuestra-fechaC li_datoReseMuestra-fechaC-1">
                        <span>Fecha Registro:</span>
                        <span>${datosRese[0]["rese_fechaCompra"]}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-horaC li_datoReseMuestra-horaC-1">
                        <span>Hora Registro:</span>
                        <span>${datosRese[0]["rese_horaCompra"]}</span>
                    </li>
                    <div class="separador-1"></div>
                    <li class="li_datoReseMuestra li_datoReseMuestra-fechaI li_datoReseMuestra-fechaI-1">
                        <span>Fecha Inicio:</span>
                        <span>${datosRese[0]["rese_fechaIniTex"]}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-fechaF li_datoReseMuestra-fechaF-1">
                        <span>Fecha Final:</span>
                        <span>${datosRese[0]["rese_fechaFinTex"]}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-horario li_datoReseMuestra-horario-1">
                        <span>Horario:</span>
                        <span>${datosRese[0]["rese_horaIni"]} => ${datosRese[0]["rese_horaFin"]}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-duracion li_datoReseMuestra-duracion-1">
                        <span>Duración:</span>
                        <span>${duracionUnidad}</span>
                    </li>
                </div>
                <div
                class="div_contPreciosDatos div_contPreciosDatos-1"
                >
                    <li class="li_datoReseMuestra li_datoReseMuestra-precioU li_datoReseMuestra-precioU-1">
                        <span>Precio Unitario:</span>
                        <span>${datosRese[0]["rese_precioBase"]+" COP"}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-iva li_datoReseMuestra-iva-1">
                        <span>IVA:</span>
                        <span>${datosRese[0]["rese_precioIVA"]+" COP "+"("+datosRese[0]["rese_iva"]+"%)"}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-descu li_datoReseMuestra-descu-1">
                        <span>Descuento:</span>
                        <span>${datosRese[0]["rese_precioDescu"]+" COP "+"("+datosRese[0]["rese_descuento"]+"%)"}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-comisi li_datoReseMuestra-comisi-1">
                        <span>Comisión:</span>
                        <span>${datosRese[0]["rese_precioDescu"]+" COP "+"("+datosRese[0]["rese_comision"]+"%)"}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-precioF li_datoReseMuestra-precioF-1">
                        <span>Precio Final:</span>
                        <span>${datosRese[0]["rese_precioFinal"]}</span>
                    </li>
                </div>
                <div
                class="div_contOtrosDatos div_contOtrosDatos-1"
                >
                    <li class="li_datoReseMuestra li_datoReseMuestra-numPer li_datoReseMuestra-numPer-1">
                        <span>Número de Personas:</span>
                        <span>${datosRese[0]["rese_numeroPerson"]}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-titu li_datoReseMuestra-titu-1">
                        <span>Título:</span>
                        <span>${datosRese[0]["rese_titulo"]}</span>
                    </li>
                    <li class="li_datoReseMuestra li_datoReseMuestra-acti li_datoReseMuestra-acti-1">
                        <span>Actividad:</span>
                        <p>${datosRese[0]["rese_actividad"]}</p>
                    </li>
                </div>
                <div
                class="div_contDatosUnidad div_contDatosUnidad-1"
                >
                    <span>Unidad:</span>
                    <div class="div_datos">
                        <div class="div_img">
                            <img src="images/productosImages/${datosRese[0]["unidad_imagen"]}" alt="">
                        </div>
                        <div class="div_nombre">
                            <span>${datosRese[0]["unidad_nombre"]}</span>
                        </div>
                    </div>
                </div>
                <div
                class="div_contDatosProducto div_contDatosProducto-1"
                >
                    <span>Producto:</span>
                    <div class="div_datos">
                        <div class="div_img">
                            <img src="images/productosImages/${datosRese[0]["productoImgPrin"]}" alt="">
                        </div>
                        <div class="div_nombre">
                            <span>${datosRese[0]["produNombre"]}</span>
                        </div>
                    </div>
                </div>
                <div
                class="div_contDatosUsuario div_contDatosUsuario-1"
                >
                    <span>Usuario:</span>
                    <div class="div_datos">
                        <div class="div_img">
                            <img src="imagesUser/${datosRese[0]["user_imagen"]}" alt="">
                        </div>
                        <div class="div_nombre">
                            <span>${datosRese[0]["user_nombre"]+" "+datosRese[0]["user_apellido"]}</span>
                        </div>
                    </div>
                </div>
                `;

                // HTML con los botones de opción para la reserva
                let htmlOpciones = "";

                if(datosRese[0]["rese_estado"] != "Cancelada"){

                    htmlOpciones = `
                    <div
                    id="div_opcionReseBtnBase"
                    class="div_opcionReseBtnBase div_opcionReseBtnBase-1"
                    tipo="div_cancelarReseBase${datosRese[0]["id_reserva"]}"
                    >
                        <div
                        id="div_opcionReseCancel"
                        class="div_opcionReserva div_opcionReseCancel div_opcionReseCancel-1"
                        tipo="btnOpcion-cancelar"
                        >
                            <button 
                            id="btn_eliminar${datosRese[0]["id_reserva"]}"
                            class="btn_opcionRese btn_eliminar btn_eliminar-1"
                            dato="div_confirmarOpcionBaseBtn${datosRese[0]["id_reserva"]}">Cancelar Reserva</button>
                        </div>
                        <div
                        id="div_confirmarOpcionBaseBtn${datosRese[0]["id_reserva"]}"
                        class="div_confirmarOpcionBaseBtn div_confirmarOpcionBaseBtn-1"
                        >
                            <span class="span_estaSeguro">¿Está seguro de proseguir?</span>
                            <div class="div_baseBotones">
                                <button 
                                class="btn_confirmarOpcion btn_confirmarOpcion-1"
                                tipo="Cancelar"
                                dato="${datosRese[0]["id_reserva"]}"
                                dato2="div_cancelarReseBase${datosRese[0]["id_reserva"]}"
                                >Si</button>
                                <button 
                                class="btn_cancelarOpcion btn_cancelarOpcion-1"
                                dato="div_confirmarOpcionBaseBtn${datosRese[0]["id_reserva"]}">No</button>
                            </div>
                        </div>
                    </div>
                    `;

                }

                // Insertar Datos de Muestra de la Reserva
                document.querySelector("#div_baseDatosReseMuestra").innerHTML="";
                let fragDatosReserva = rangeDatosReservaMues.createContextualFragment(htmlDatos);
                document.querySelector("#div_baseDatosReseMuestra").append(fragDatosReserva);

                // Insertar Opciones Disponibles de la Reserva
                document.querySelector("#div_opcionReservaBasePrin").innerHTML="";
                let fragOpcionesReserva = rangeOpcionesReservaMues.createContextualFragment(htmlOpciones);
                document.querySelector("#div_opcionReservaBasePrin").append(fragOpcionesReserva);

                // Dando evento a los botones de opción de la reserva
                let lista_btnsOpciReservas = document.querySelectorAll(".btn_opcionRese");

                lista_btnsOpciReservas.forEach((reservaBtnOpci) => {

                    reservaBtnOpci.addEventListener("click", (e)=>{

                        document.querySelector("#"+reservaBtnOpci.getAttribute("dato"))
                        .classList.replace("div_confirmarOpcionBaseBtn-1", "div_confirmarOpcionBaseBtn-2");

                    });

                });

                // Dando evento a los botones NO de la confirmación de cada opción
                let lista_btnsNOOpciRese = document.querySelectorAll(".btn_cancelarOpcion");

                lista_btnsNOOpciRese.forEach((reservaBtnOpciNO) => {

                    reservaBtnOpciNO.addEventListener("click", (e)=>{

                        document.querySelector("#"+reservaBtnOpciNO.getAttribute("dato"))
                        .classList.replace("div_confirmarOpcionBaseBtn-2", "div_confirmarOpcionBaseBtn-1");

                    });

                });

                // Dando evento a los botones SI de la confirmación de cada opción
                let lista_btnsSIOpciRese = document.querySelectorAll(".btn_confirmarOpcion");

                lista_btnsSIOpciRese.forEach((reservaBtnOpciSI) => {

                    reservaBtnOpciSI.addEventListener("click", (e)=>{

                        opcionReservaAccion(
                        reservaBtnOpciSI.getAttribute("tipo"),
                        reservaBtnOpciSI.getAttribute("dato")
                        );

                        if(reservaBtnOpciSI.getAttribute("tipo") == "Cancelar"){

                            document.querySelector("#div_opcionReservaBasePrin").innerHTML = "";

                        }

                        document.querySelector("#div_opcionReservaBasePrin").classList.replace("div_opcionReservaBasePrin-2", "div_opcionReservaBasePrin-1");
                        document.querySelector("#div_baseDatosReseMuestra").classList.replace("div_baseDatosReseMuestra-1", "div_baseDatosReseMuestra-2");

                    });

                });

                document.querySelector("#div_baseDatosReseMuestra").classList.replace("div_baseDatosReseMuestra-1", "div_baseDatosReseMuestra-2");

                document.querySelector("#div_baseDatosDeReseSelected")
                .classList.replace("div_baseDatosDeReseSelected-1", "div_baseDatosDeReseSelected-2");

            });

        });

    }

    function calendaMes_renderDias
    (
    reservasLista, mesAnteMyA, mesActuMyA, mesProxMyA, mesAnteFechaFinTex, mesAnteUltiDiaSema, mesActuDiaIniTex,
    mesActuDiaFinTex, mesActuDiaFinNumSema, mesProxFechaIniTex, mesProxFechaIniNumSema
    ){

        if (!div_calendaMesBasePrin) return; 
        if (!div_calendaSemaBasePrin) return; 
        if (!div_calendaDiaBasePrin) return;

        div_baseDiasCalendaMesGene.innerHTML = "";

        // Marcando el mes y el año en las flechas
        let mesMuestra = mesesABREVI[(Number(fechaActual.split("-")[1])-1)];
        let anioMuestra = fechaActual.split("-")[0];

        span_mesMuestra.textContent = mesMuestra;
        span_anioMuestra.textContent = anioMuestra;

        let diasAntes_HTML = "";
        let diasActuales_HTML = "";
        let diasProximos_HTML = "";

        //------------------------------------------------------------------------------------------------------------------------------------------------
        // Calendario MODO MES - Renderizar Días del Mes Anterior
        
        let cantidadDiasMesAnteVisi = 7-(mesAnteUltiDiaSema+1);
        let restaDiasMesAnteRango = (7-(7-(mesAnteUltiDiaSema+1)));
        let primerDiaAnteriorVisible = sumarRestarDias(mesAnteFechaFinTex, restaDiasMesAnteRango-1, "restar");
        let rangoFechasDiasAnteriores = obtenerRangoDeFechas(primerDiaAnteriorVisible, mesAnteFechaFinTex);

        if(cantidadDiasMesAnteVisi != 0){

            for (let i = 0; i < restaDiasMesAnteRango; i++) {
            
                let diaDomingo = obtenerDiaSemana(rangoFechasDiasAnteriores[i]);
                let claseLi = "li_diaMesAnte-1";
                let estadoLi = "";
                let estadoSpan = "";

                let htmlDatosReseNumeros = `
                <div
                id="div_baseDatosDiaMesRese"
                class="div_baseDatosDiaMesRese div_baseDatosDiaMesRese-1"
                >
                    <span
                    id="span_cantReseDelDia${rangoFechasDiasAnteriores[i]}"
                    class="span_cantReseDelDia span_cantReseDelDiaAnte span_cantReseDelDiaAnte-1"
                    tipo="${estadoSpan}"
                    >
                        <span
                        id="span_haberRese${rangoFechasDiasAnteriores[i]}"
                        class="span_haberRese span_haberRese-mAnte span_haberRese-mAnte-1"
                        >Hubo</span> 
                        <b class="b_cantReseTotal b_cantReseTotal-1">
                            <span 
                            id="span_contReseTotalDia${rangoFechasDiasAnteriores[i]}"
                            class="span_contReseTotalDia span_contReseTotalDia-mAnte span_contReseTotalDia-mAnte-1"
                            >0</span> 
                            <span
                            id="span_contResesTexto${rangoFechasDiasAnteriores[i]}"
                            class="span_contResesTexto span_contResesTexto-mAnte span_contResesTexto-mAnte-1"
                            >Reservas</span>
                        </b>
                    </span>
                </div>
                <div
                id="div_reseDelDiaCantidadesBase"
                class="div_reseDelDiaCantidadesBase div_reseDelDiaCantidadesBase-1"
                >
                    <span 
                    id="span_reseActivasCant${rangoFechasDiasAnteriores[i]}" 
                    class="span_reseActivasCant span_reseActivasCant-mAnte span_reseActivasCant-1"
                    tipo="span_reseActivasCant-ante">0</span>
                    <span 
                    id="span_resePendientesCant${rangoFechasDiasAnteriores[i]}" 
                    class="span_resePendientesCant span_resePendientesCant-mAnte span_resePendientesCant-1"
                    tipo="span_resePendientesCant-ante">0</span>
                    <span 
                    id="span_reseTerminadasCant${rangoFechasDiasAnteriores[i]}"
                    class="span_reseTerminadasCant span_reseTerminadasCant-mAnte span_reseTerminadasCant-1"
                    tipo="span_reseTerminadasCant-ante">0</span>
                    <span 
                    id="span_resePausadasCant${rangoFechasDiasAnteriores[i]}"
                    class="span_resePausadasCant span_resePausadasCant-mAnte span_resePausadasCant-1"
                    tipo="span_resePausadasCant-ante">0</span>
                    <span 
                    id="span_reseCanceladasCant${rangoFechasDiasAnteriores[i]}"
                    class="span_reseCanceladasCant span_reseCanceladasCant-mAnte span_reseCanceladasCant-1"
                    tipo="span_reseCanceladasCant-ante">0</span>
                </div>
                `;
    
                if(diaDomingo == 0){
                    claseLi = "li_diaMesBloq";
                    estadoLi = "disabled";
                    estadoSpan = "bloqueadoSpan";
                    htmlDatosReseNumeros = "";
                }
    
                if(rangoFechasDiasAnteriores[i] == cadenaFechaActual){
                    claseLi = "li_diaMes-Hoy";
                }  
    
                diasAntes_HTML += `
                <li
                id="li_diaMes${rangoFechasDiasAnteriores[i]}" 
                class="li_diaMes li_diaMesAnte ${claseLi}"
                fecha="${rangoFechasDiasAnteriores[i]}"
                ${estadoLi}
                tipo="${claseLi}"
                >
                    <!--<div
                    id="div_baseSvgOjo${rangoFechasDiasAnteriores[i]}"
                    class="div_baseSvgOjo div_baseSvgOjo-1"
                    >
                        <svg class="svg_ojoVerDiaCalenMes svg_ojoVerDiaCalenMesAnte-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 343.09 205.35"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M343.09,95.39c-4.21-1.85-6.87-5.59-10.21-8.48-32.8-28.45-70.42-46.93-113.11-55a262.32,262.32,0,0,0-41.22-4.23C141.17,26.58,105.24,33,71,48A240,240,0,0,0,4.66,91.7C3.39,92.88,2.38,94.43.19,95.17,1.19,92,3,89.6,4.7,87.24,36.59,42.3,79.16,13.47,133.61,3.59c39.73-7.2,78.77-3.73,116.28,11.84C282.46,28.94,309.4,50,331.19,77.7c4.3,5.45,8,11.28,11.9,17Z"/><path d="M343.09,110.81a201.52,201.52,0,0,1-33.61,40.72C279.29,179.46,244,197,203.22,202.92c-37.78,5.47-74.61,1.92-110-12.73-32.69-13.52-59.74-34.61-81.57-62.44A129.68,129.68,0,0,1,0,110.67c1.66-.24,2.25.86,3,1.54,31.8,29.9,68.89,50,111.48,59.66a254.62,254.62,0,0,0,49.4,6A254.35,254.35,0,0,0,239.66,169c34.69-9.6,65.48-26.46,92.72-50,3.52-3,6.32-6.95,10.71-8.93Z"/><path d="M232.11,102.83a60.69,60.69,0,1,1-121.37-.3c.27-33.87,27.2-60.63,60.84-60.45A60.39,60.39,0,0,1,232.11,102.83Zm-36.1.07a24.59,24.59,0,1,0-24.63,24.46A24.81,24.81,0,0,0,196,102.9Z"/></g></g></svg>
                    </div>-->
                    <span
                    class="spanFechaNum span_fechaDiaMesAnte span_fechaDiaMesAnte-1"
                    >${rangoFechasDiasAnteriores[i].substring(8,10)}</span>
                    <div
                    id="div_liDiaMes${rangoFechasDiasAnteriores[i]}"
                    class="div_liDiaMes div_datosLiDiaAnte div_datosLiDiaAnte-1"
                    >
                    ${htmlDatosReseNumeros}
                    </div>
                </li>
                `;
                
            }
    
            let fragDiasCalenMesAnte = rangeDiasCalenMesAnte.createContextualFragment(diasAntes_HTML);
    
            div_baseDiasCalendaMesGene.append(fragDiasCalenMesAnte);

        }
        
        // Calendario MODO MES - Renderizar Días del Mes Anterior
        //------------------------------------------------------------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------------------------------------------------------------
        // Calendario MODO MES - Renderizar Días del Mes Actual

        let rangoFechasDiasActuales = obtenerRangoDeFechas(mesActuDiaIniTex, mesActuDiaFinTex);

        for (let i = 0; i < rangoFechasDiasActuales.length; i++) {

            let diaDomingo = obtenerDiaSemana(rangoFechasDiasActuales[i]);
            let claseLi = "li_diaMesActu-1";
            let estadoLi = "";
            let estadoSpan = "";

            let htmlDatosReseNumeros = `
            <div
            id="div_baseDatosDiaMesRese"
            class="div_baseDatosDiaMesRese div_baseDatosDiaMesRese-1"
            >
                <span
                id="span_cantReseDelDia${rangoFechasDiasActuales[i]}"
                class="span_cantReseDelDia span_cantReseDelDiaActu span_cantReseDelDiaActu-1"
                tipo="${estadoSpan}"
                >   
                    <span 
                    id="span_haberRese${rangoFechasDiasActuales[i]}" 
                    class="span_haberRese span_haberRese-mActu span_haberRese-mActu-1"
                    >Hay</span> 
                    <b class="b_cantReseTotal b_cantReseTotal-1"> 
                        <span
                        id="span_contReseTotalDia${rangoFechasDiasActuales[i]}"
                        class="span_contReseTotalDia span_contReseTotalDia-mActu span_contReseTotalDia-mActu-1"
                        >
                        0</span>
                        <span
                        id="span_contResesTexto${rangoFechasDiasActuales[i]}"
                        class="span_contResesTexto span_contResesTexto-mActu span_contResesTexto-mActu-1"
                        >
                        Reservas</span>
                    </b>
                </span>
            </div>
            <div
            id="div_reseDelDiaCantidadesBase"
            class="div_reseDelDiaCantidadesBase div_reseDelDiaCantidadesBase-1"
            >
                <span 
                id="span_reseActivasCant${rangoFechasDiasActuales[i]}" 
                class="span_reseActivasCant span_reseActivasCant-mActu span_reseActivasCant-1"
                tipo="span_reseActivasCant-actu">0</span>
                <span 
                id="span_resePendientesCant${rangoFechasDiasActuales[i]}" 
                class="span_resePendientesCant span_resePendientesCant-mActu span_resePendientesCant-1"
                tipo="span_resePendientesCant-actu">0</span>
                <span 
                id="span_reseTerminadasCant${rangoFechasDiasActuales[i]}"
                class="span_reseTerminadasCant span_reseTerminadasCant-mActu span_reseTerminadasCant-1"
                tipo="span_reseTerminadasCant-actu">0</span>
                <span 
                id="span_resePausadasCant${rangoFechasDiasActuales[i]}"
                class="span_resePausadasCant span_resePausadasCant-mActu span_resePausadasCant-1"
                tipo="span_resePausadasCant-actu">0</span>
                <span 
                id="span_reseCanceladasCant${rangoFechasDiasActuales[i]}"
                class="span_reseCanceladasCant span_reseCanceladasCant-mActu span_reseCanceladasCant-1"
                tipo="span_reseCanceladasCant-actu">0</span>
            </div>
            `;

            if(diaDomingo == 0){
                claseLi = "li_diaMesBloq";
                estadoLi = "disabled";
                estadoSpan = "bloqueadoSpan";
                htmlDatosReseNumeros = "";
            }

            if(rangoFechasDiasActuales[i] == cadenaFechaActual){
                claseLi = "li_diaMes-Hoy";
            }   

            diasActuales_HTML += `
            <li
            id="li_diaMes${rangoFechasDiasActuales[i]}" 
            class="li_diaMes li_diaMesActu ${claseLi}"
            fecha="${rangoFechasDiasActuales[i]}"
            ${estadoLi}
            tipo="${claseLi}"
            >
                <!--<div
                id="div_baseSvgOjo${rangoFechasDiasActuales[i]}"
                class="div_baseSvgOjo div_baseSvgOjo-1"
                >
                    <svg class="svg_ojoVerDiaCalenMes svg_ojoVerDiaCalenMesAnte-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 343.09 205.35"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M343.09,95.39c-4.21-1.85-6.87-5.59-10.21-8.48-32.8-28.45-70.42-46.93-113.11-55a262.32,262.32,0,0,0-41.22-4.23C141.17,26.58,105.24,33,71,48A240,240,0,0,0,4.66,91.7C3.39,92.88,2.38,94.43.19,95.17,1.19,92,3,89.6,4.7,87.24,36.59,42.3,79.16,13.47,133.61,3.59c39.73-7.2,78.77-3.73,116.28,11.84C282.46,28.94,309.4,50,331.19,77.7c4.3,5.45,8,11.28,11.9,17Z"/><path d="M343.09,110.81a201.52,201.52,0,0,1-33.61,40.72C279.29,179.46,244,197,203.22,202.92c-37.78,5.47-74.61,1.92-110-12.73-32.69-13.52-59.74-34.61-81.57-62.44A129.68,129.68,0,0,1,0,110.67c1.66-.24,2.25.86,3,1.54,31.8,29.9,68.89,50,111.48,59.66a254.62,254.62,0,0,0,49.4,6A254.35,254.35,0,0,0,239.66,169c34.69-9.6,65.48-26.46,92.72-50,3.52-3,6.32-6.95,10.71-8.93Z"/><path d="M232.11,102.83a60.69,60.69,0,1,1-121.37-.3c.27-33.87,27.2-60.63,60.84-60.45A60.39,60.39,0,0,1,232.11,102.83Zm-36.1.07a24.59,24.59,0,1,0-24.63,24.46A24.81,24.81,0,0,0,196,102.9Z"/></g></g></svg>
                </div>-->
                <span
                class="spanFechaNum span_fechaDiaMesActu span_fechaDiaMesActu-1"
                >${rangoFechasDiasActuales[i].substring(8,10)}</span>
                <div
                id="div_liDiaMes${rangoFechasDiasActuales[i]}"
                class="div_liDiaMes div_datosLiDiaActu div_datosLiDiaActu-1"
                >
                ${htmlDatosReseNumeros}
                </div>
            </li>
            `;

        };

        let fragDiasCalenMesActu = rangeDiasCalenMesActu.createContextualFragment(diasActuales_HTML);

        div_baseDiasCalendaMesGene.append(fragDiasCalenMesActu);

        // Calendario MODO MES - Renderizar Días del Mes Actual
        //------------------------------------------------------------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------------------------------------------------------------
        // Calendario MODO MES - Renderizar Días del Mes Próximo

        if(cantidadDiasMesAnteVisi == 0){
            restaDiasMesAnteRango = 0;
        }

        let cantiDiasMesProx = 42-((restaDiasMesAnteRango)+rangoFechasDiasActuales.length);
        
        let ultimoDiaMesProxTex = sumarRestarDias(mesProxFechaIniTex, cantiDiasMesProx-1, "sumar");
        let rangoFechasDiasProximos = obtenerRangoDeFechas(mesProxFechaIniTex, ultimoDiaMesProxTex); 
        
        for(let i = 0; i < cantiDiasMesProx; i++){

            let diaDomingo = obtenerDiaSemana(rangoFechasDiasProximos[i]);
            let claseLi = "li_diaMesProx-1";
            let estadoLi = "";
            let estadoSpan = "";

            let htmlDatosReseNumeros = `
            <div
            id="div_baseDatosDiaMesRese"
            class="div_baseDatosDiaMesRese div_baseDatosDiaMesRese-1"
            >
                <span
                id="span_cantReseDelDia${rangoFechasDiasProximos[i]}"
                class="span_cantReseDelDia span_cantReseDelDiaProx span_cantReseDelDiaProx-1"
                tipo="${estadoSpan}"
                >   
                    <span
                    id="span_haberRese${rangoFechasDiasProximos[i]}"
                    class="span_haberRese span_haberRese-mProx span_haberRese-mProx-1"
                    >
                    Habrá</span>
                    <b class="b_cantReseTotal b_cantReseTotal-1">
                        <span
                        id="span_contReseTotalDia${rangoFechasDiasProximos[i]}"
                        class="span_contReseTotalDia span_contReseTotalDia-mProx span_contReseTotalDia-mProx-1"
                        >
                        0</span>
                        <span
                        id="span_contResesTexto${rangoFechasDiasProximos[i]}"
                        class="span_contResesTexto span_contResesTexto-mProx span_contResesTexto-mProx-1"
                        >
                        Reservas</span>
                    </b>
                </span>
            </div>
            <div
            id="div_reseDelDiaCantidadesBase"
            class="div_reseDelDiaCantidadesBase div_reseDelDiaCantidadesBase-1"
            >
                <span 
                id="span_reseActivasCant${rangoFechasDiasProximos[i]}" 
                class="span_reseActivasCant span_reseActivasCant-mProx span_reseActivasCant-1"
                tipo="span_reseActivasCant-prox">0</span>
                <span 
                id="span_resePendientesCant${rangoFechasDiasProximos[i]}" 
                class="span_resePendientesCant span_resePendientesCant-mProx span_resePendientesCant-1"
                tipo="span_resePendientesCant-prox">0</span>
                <span 
                id="span_reseTerminadasCant${rangoFechasDiasProximos[i]}"
                class="span_reseTerminadasCant span_reseTerminadasCant-mProx span_reseTerminadasCant-1"
                tipo="span_reseTerminadasCant-prox">0</span>
                <span 
                id="span_resePausadasCant${rangoFechasDiasProximos[i]}"
                class="span_resePausadasCant span_resePausadasCant-mProx span_resePausadasCant-1"
                tipo="span_resePausadasCant-prox">0</span>
                <span 
                id="span_reseCanceladasCant${rangoFechasDiasProximos[i]}"
                class="span_reseCanceladasCant span_reseCanceladasCant-mProx span_reseCanceladasCant-1"
                tipo="span_reseCanceladasCant-prox">0</span>
            </div>
            `;

            if(diaDomingo == 0){
                claseLi = "li_diaMesBloq";
                estadoLi = "disabled";
                estadoSpan = "bloqueadoSpan"
                htmlDatosReseNumeros = "";
            }

            if(rangoFechasDiasProximos[i] == cadenaFechaActual){
                claseLi = "li_diaMes-Hoy";
            }   

            diasProximos_HTML += `
            <li
            id="li_diaMes${rangoFechasDiasProximos[i]}" 
            class="li_diaMes li_diaMesProx ${claseLi}"
            fecha="${rangoFechasDiasProximos[i]}"
            ${estadoLi}
            tipo="${claseLi}"
            >
                <!--<div
                id="div_baseSvgOjo${rangoFechasDiasProximos[i]}"
                class="div_baseSvgOjo div_baseSvgOjo-1"
                >
                    <svg class="svg_ojoVerDiaCalenMes svg_ojoVerDiaCalenMesProx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 343.09 205.35"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M343.09,95.39c-4.21-1.85-6.87-5.59-10.21-8.48-32.8-28.45-70.42-46.93-113.11-55a262.32,262.32,0,0,0-41.22-4.23C141.17,26.58,105.24,33,71,48A240,240,0,0,0,4.66,91.7C3.39,92.88,2.38,94.43.19,95.17,1.19,92,3,89.6,4.7,87.24,36.59,42.3,79.16,13.47,133.61,3.59c39.73-7.2,78.77-3.73,116.28,11.84C282.46,28.94,309.4,50,331.19,77.7c4.3,5.45,8,11.28,11.9,17Z"/><path d="M343.09,110.81a201.52,201.52,0,0,1-33.61,40.72C279.29,179.46,244,197,203.22,202.92c-37.78,5.47-74.61,1.92-110-12.73-32.69-13.52-59.74-34.61-81.57-62.44A129.68,129.68,0,0,1,0,110.67c1.66-.24,2.25.86,3,1.54,31.8,29.9,68.89,50,111.48,59.66a254.62,254.62,0,0,0,49.4,6A254.35,254.35,0,0,0,239.66,169c34.69-9.6,65.48-26.46,92.72-50,3.52-3,6.32-6.95,10.71-8.93Z"/><path d="M232.11,102.83a60.69,60.69,0,1,1-121.37-.3c.27-33.87,27.2-60.63,60.84-60.45A60.39,60.39,0,0,1,232.11,102.83Zm-36.1.07a24.59,24.59,0,1,0-24.63,24.46A24.81,24.81,0,0,0,196,102.9Z"/></g></g></svg>
                </div>-->
                <span
                class="spanFechaNum span_fechaDiaMesProx span_fechaDiaMesProx-1"
                >${rangoFechasDiasProximos[i].substring(8,10)}</span>
                <div
                id="div_liDiaMes${rangoFechasDiasProximos[i]}"
                class="div_liDiaMes div_datosLiDiaProx div_datosLiDiaProx-1"
                >
                ${htmlDatosReseNumeros}
                </div>
            </li>
            `;

        };

        let fragDiasCalenMesProx = rangeDiasCalenMesProx.createContextualFragment(diasProximos_HTML);

        div_baseDiasCalendaMesGene.append(fragDiasCalenMesProx);

        // Calendario MODO MES - Renderizar Días del Mes Próximo
        //------------------------------------------------------------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------------------------------------------------------------
        // Calendario MODO MES - Llenando días con las Reservas
        
        for(let i = 0; i < reservasLista.length; i++){

            let { 
            id_reserva, rese_codigo, rese_serie, rese_estado, rese_fechaCompra, 
            rese_fechaCompraNum, rese_horaCompra, rese_tipo, rese_fechaIniTex, 
            rese_fechaIniNum, rese_fechaFinTex, rese_fechaFinNum, rese_horaIni, 
            rese_horaFin, rese_duracion, rese_precioBase, rese_iva, rese_descuento, 
            rese_comision, rese_precioIVA, rese_precioDescu, rese_precioFinal, 
            rese_numeroPerson, rese_otrosMiembros, rese_titulo, rese_actividad, 
            rese_fechaCancel, rese_horaCancel, rese_motivoCancel, rese_horasPrevCancel, 
            rese_costoAdicCancel, rese_nombreUser, id_unidad, id_usuario, id_producto } = reservasLista[i]; // Extraer propiedades
            
            if(rese_fechaIniNum == rese_fechaFinNum){

                let reseTotalesDelDia = 0;
                let reseActivasNum = 0;
                let resePendientesNum = 0;
                let reseTerminadasNum = 0;
                let resePausadasNum = 0;
                let reseCanceladasNum = 0;

                if(document.querySelector("#li_diaMes"+rese_fechaIniTex) != null){
    
                    reseTotalesDelDia = Number(document.querySelector("#span_contReseTotalDia"+rese_fechaIniTex).textContent)+1;
                    document.querySelector("#span_contReseTotalDia"+rese_fechaIniTex).textContent = reseTotalesDelDia;
                
                    if(rese_estado == "Activa"){
                        // Reservas Activas Totales
                        reseActivasNum = Number(document.querySelector("#span_reseActivasCant"+rese_fechaIniTex).textContent)+1;
                        document.querySelector("#span_reseActivasCant"+rese_fechaIniTex).textContent = reseActivasNum;
                    }

                    if(rese_estado == "Pendiente"){
                        // Reservas Pendientes Totales
                        resePendientesNum = Number(document.querySelector("#span_resePendientesCant"+rese_fechaIniTex).textContent)+1;
                        document.querySelector("#span_resePendientesCant"+rese_fechaIniTex).textContent = resePendientesNum;
                    }

                    if(rese_estado == "Terminada"){
                        // Reservas Terminadas Totales
                        reseTerminadasNum = Number(document.querySelector("#span_reseTerminadasCant"+rese_fechaIniTex).textContent)+1;
                        document.querySelector("#span_reseTerminadasCant"+rese_fechaIniTex).textContent = reseTerminadasNum;
                    }

                    if(rese_estado == "Pausada"){
                        resePausadasNum = Number(document.querySelector("#span_resePausadasCant"+rese_fechaIniTex).textContent)+1;
                        document.querySelector("#span_resePausadasCant"+rese_fechaIniTex).textContent = resePausadasNum;
                    }
                    
                    if(rese_estado == "Cancelada"){
                        // Reservas Canceladas Totales
                        reseCanceladasNum = Number(document.querySelector("#span_reseCanceladasCant"+rese_fechaIniTex).textContent)+1;
                        document.querySelector("#span_reseCanceladasCant"+rese_fechaIniTex).textContent = reseCanceladasNum;
                    }

                    if(
                        reseTotalesDelDia > 1
                    ){

                        document.querySelector("#span_contResesTexto"+rese_fechaIniTex).textContent = "Reservas";

                    }else{

                        document.querySelector("#span_contResesTexto"+rese_fechaIniTex).textContent = "Reserva";

                    }
    
                    let fechaDiaReseNum = fechaANumero(rese_fechaIniTex);
                    let fechaActuDiaReseNum = fechaANumero(cadenaFechaActual);
    
                    if(
                        fechaDiaReseNum < fechaActuDiaReseNum
                    ){
    
                        document.querySelector("#span_haberRese"+rese_fechaIniTex).textContent = "Hubo";
    
                    }else if(fechaDiaReseNum > fechaActuDiaReseNum){
    
                        document.querySelector("#span_haberRese"+rese_fechaIniTex).textContent = "Habrá";
    
                    }

                    casillaDiasConReservas.push("div_liDiaMes"+rese_fechaIniTex);
        
                }

            }else if(rese_fechaIniNum < rese_fechaFinNum){

                let cadenaDeDias = obtenerRangoDeFechas(rese_fechaIniTex, rese_fechaFinTex);
                
                for(let i = 0; i < cadenaDeDias.length; i++){

                    let reseTotalesDelDiaVarios = 0;
                    let reseActivasNum = 0;
                    let resePendientesNum = 0;
                    let reseTerminadasNum = 0;
                    let resePausadasNum = 0;
                    let reseCanceladasNum = 0;

                    if(document.querySelector("#li_diaMes"+cadenaDeDias[i]) != null){
        
                        reseTotalesDelDiaVarios = Number(document.querySelector("#span_contReseTotalDia"+cadenaDeDias[i]).textContent)+1;
                        document.querySelector("#span_contReseTotalDia"+cadenaDeDias[i]).textContent = reseTotalesDelDiaVarios;
        
                        if(
                            reseTotalesDelDiaVarios > 1
                        ){

                            document.querySelector("#span_contResesTexto"+cadenaDeDias[i]).textContent = "Reservas";

                        }else{

                            document.querySelector("#span_contResesTexto"+cadenaDeDias[i]).textContent = "Reserva";

                        }
        
                        let fechaDiaReseNum = fechaANumero(cadenaDeDias[i]);
                        let fechaActuDiaReseNum = fechaANumero(cadenaFechaActual);
        
                        if(
                            fechaDiaReseNum < fechaActuDiaReseNum
                        ){
        
                            document.querySelector("#span_haberRese"+cadenaDeDias[i]).textContent = "Hubo";
        
                        }else if(fechaDiaReseNum > fechaActuDiaReseNum){
        
                            document.querySelector("#span_haberRese"+cadenaDeDias[i]).textContent = "Habrá";
        
                        }

                        if(rese_estado == "Activa"){
                            // Reservas Activas Totales
                            reseActivasNum = Number(document.querySelector("#span_reseActivasCant"+cadenaDeDias[i]).textContent)+1;
                            document.querySelector("#span_reseActivasCant"+cadenaDeDias[i]).textContent = reseActivasNum;
                        }
    
                        if(rese_estado == "Pendiente"){
                            // Reservas Pendientes Totales
                            resePendientesNum = Number(document.querySelector("#span_resePendientesCant"+cadenaDeDias[i]).textContent)+1;
                            document.querySelector("#span_resePendientesCant"+cadenaDeDias[i]).textContent = resePendientesNum;
                        }
    
                        if(rese_estado == "Terminada"){
                            // Reservas Terminadas Totales
                            reseTerminadasNum = Number(document.querySelector("#span_reseTerminadasCant"+cadenaDeDias[i]).textContent)+1;
                            document.querySelector("#span_reseTerminadasCant"+cadenaDeDias[i]).textContent = reseTerminadasNum;
                        }

                        if(rese_estado == "Pausada"){
                            resePausadasNum = Number(document.querySelector("#span_resePausadasCant"+cadenaDeDias[i]).textContent)+1;
                            document.querySelector("#span_resePausadasCant"+cadenaDeDias[i]).textContent = resePausadasNum;
                        }
                        
                        if(rese_estado == "Cancelada"){
                            // Reservas Canceladas Totales
                            reseCanceladasNum = Number(document.querySelector("#span_reseCanceladasCant"+cadenaDeDias[i]).textContent)+1;
                            document.querySelector("#span_reseCanceladasCant"+cadenaDeDias[i]).textContent = reseCanceladasNum;
                        }
            
                    }

                    casillaDiasConReservas.push("div_liDiaMes"+cadenaDeDias[i]);

                }

            }

        }

        //// Limpiando casillas de días sin reservas

            let lista_diasCasillas = document.querySelectorAll(".div_liDiaMes");
            let lista_diasCasillas2 = document.querySelectorAll(".li_diaMes");

            for(let i = 0; i < lista_diasCasillas.length; i++){

                if(!lista_diasCasillas2[i].classList.contains("li_diaMesBloq")){
                    casillaDiasSinReservas.push(lista_diasCasillas[i].getAttribute("id"));
                }

            }
            
            casillaDiasSinReservas = casillaDiasSinReservas.filter(item => !casillaDiasConReservas.includes(item));
            
            for(let i = 0; i < casillaDiasSinReservas.length; i++){
                document.querySelector("#"+casillaDiasSinReservas[i]).innerHTML = "";
            }

        //// Limpiando casillas de días sin reservas

        // Calendario MODO MES - Llenando días con las Reservas
        //------------------------------------------------------------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------------------------------------------------------------
        // Calendario MODO MES - Agregando funciones a las casillas de días

        let diasCasillas_calendaModoMes = document.querySelectorAll(".li_diaMes");

        diasCasillas_calendaModoMes.forEach((dia) => {

            dia.addEventListener("click", () => {

                //funcion inactiva calendaDia_buscarReservas(dia.getAttribute("fecha"));

            });

        });

        // Calendario MODO MES - Agregando funciones a las casillas de días
        //------------------------------------------------------------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------------------------------------------------------------
        // Calendario MODO MES - Insertando Lista de Reservas

        insertarReservasLista();

        // Calendario MODO MES - Insertando Lista de Reservas
        //------------------------------------------------------------------------------------------------------------------------------------------------

    };

    function calendaMes_buscarReservas(mesElegido){

        fechaActual = mesElegido;

        let mesAyP_Fechas = obtenerFechasExtremos(fechaActual);
        let mesActu_PyUDia = obtenerExtremosDelMes(fechaActual);

        let mesAnte_fechaFinNumSema = obtenerDiaSemana(mesAyP_Fechas[0]);
        let mesActu_diaInicioTex = mesActu_PyUDia[0];
        let mesActu_diaFinalTex = mesActu_PyUDia[1];
        let mesActu_diaFinalNumSema = obtenerDiaSemana(mesActu_PyUDia[1]);
        let mesProx_fechaIniTex = mesAyP_Fechas[1];
        let mesProx_fechaIniNumSema = obtenerDiaSemana(mesAyP_Fechas[1]);
        let mesAnte_mesAnioTex = mesAyP_Fechas[0].substring(0,7);
        let mesActu_mesAnioTex = fechaActual.substring(0,7);
        let mesProx_mesAnioTex = mesAyP_Fechas[1].substring(0,7);

        // Buscar Reservas
        let formReseTipoMes = new FormData();
        formReseTipoMes.append('accion_buscarReseCalenda', 'reservas_tipoMes');
        formReseTipoMes.append('mesAnteriorFecha', mesAnte_mesAnioTex);
        formReseTipoMes.append('mesActualFecha', mesActu_mesAnioTex);
        formReseTipoMes.append('mesProximoFecha', mesProx_mesAnioTex);

        fetch(url_consultasDB, {
            method: 'POST',
            body: formReseTipoMes
        })
        .then(response => response.json())
        .then(data => {

            if (data.success) {

                // Guardando las Reservas en Local Storage
                objetoReservas_calendaModoMes = data.resesCalendaMes;

                calendaMes_renderDias(
                data.resesCalendaMes,
                mesAnte_mesAnioTex,
                mesActu_mesAnioTex,
                mesProx_mesAnioTex,
                mesAyP_Fechas[0],
                mesAnte_fechaFinNumSema,
                mesActu_diaInicioTex,
                mesActu_diaFinalTex,
                mesActu_diaFinalNumSema,
                mesProx_fechaIniTex,
                mesProx_fechaIniNumSema);

            } else {

                alert(data.message);

            }

        })
        .catch(error => {

            alert('Error en el servidor: ' + error.message);

        });

    };
    // Calendario MODO MES - Funciones
    //----------------------------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------------------------
    // Eventos

    // EVENTO PRINCIPAL
    document.addEventListener("DOMContentLoaded", (e)=>{

        // Renderizar Calendario al Cargar la Página (MODO MES por defecto)
        calendaMes_buscarReservas(fechaActual);

        actuAutomaticaReservas();

        intervalActuAutoReservas = setInterval(actuAutomaticaReservas, 10000);

        window.addEventListener("beforeunload", () => {
            clearInterval(intervalActuAutoReservas);
            intervalActuAutoReservas=null;
        });

        // FILTRO - Tipo de Reserva 
        document.querySelector("#in_selectTipoReseFiltro").addEventListener("input", (e)=>{

            filtro_tipoReseCalenM = document.querySelector("#in_selectTipoReseFiltro").value.toLowerCase();
            filtro_tipoReseCalenM = quitarAcentos(filtro_tipoReseCalenM);
            filtro_tipoReseCalenM = filtro_tipoReseCalenM == "general" ? "" : filtro_tipoReseCalenM;

            insertarReservasLista();

        });

        // FILTRO - Estado de Reserva 
        document.querySelector("#in_selectEstadoReseFiltro").addEventListener("input", (e)=>{

            filtro_estadoReseCalenM = document.querySelector("#in_selectEstadoReseFiltro").value;
            filtro_estadoReseCalenM = filtro_estadoReseCalenM == "General" ? "" : filtro_estadoReseCalenM;

            insertarReservasLista();

        });
        
        // BOTON - Fecha Atras Flecha - Calendario MODO MES
        document.querySelector("#btn_fechaAtras").addEventListener("click", (e)=>{

            casillaDiasSinReservas = null;
            casillaDiasSinReservas = [];
            fechaActual = moverEntreMeses(fechaActual, 1, "restar");
            calendaMes_buscarReservas(fechaActual);

        });

        // BOTON - Fecha Adelante Flecha - Calendario MODO MES
        document.querySelector("#btn_fechaAdelante").addEventListener("click", (e)=>{

            casillaDiasSinReservas = null;
            casillaDiasSinReservas = [];
            fechaActual = moverEntreMeses(fechaActual, 1, "sumar");
            calendaMes_buscarReservas(fechaActual);

        });

        // INPUT - Botón HOY - Calendario MODO MES
        document.querySelector("#btn_botonHoy").addEventListener("click", (e)=>{

            casillaDiasSinReservas = null;
            casillaDiasSinReservas = [];
            fechaActual = cadenaFechaActual;
            calendaMes_buscarReservas(fechaActual);

        });

        // INPUT - Mes para Búsqueda Específica - Calendario MODO MES
        document.querySelector("#in_bespeMes").addEventListener("input", (e)=>{

            if(e.target.value != ""){

                let mes = document.querySelector("#in_bespeMes").value.padStart(2, '0');
                let anio = document.querySelector("#in_bespeAnio").value;

                if(
                Number(anio) >= 2000 &&
                Number(anio) < 3000 
                )
                {

                    casillaDiasSinReservas = null;
                    casillaDiasSinReservas = [];

                    fechaActual = `${anio}-${mes}-01`;

                    calendaMes_buscarReservas(fechaActual);

                }

            }

        });

        // INPUT - Año para Búsqueda Específica - Calendario MODO MES
        document.querySelector("#in_bespeAnio").addEventListener("input", (e)=>{

            if (e.target.value.length > 4) {

                e.target.value = e.target.value.substring(0, 4);

            }else if(Number(e.target.value) < 3000 && Number(e.target.value) >= 2000){

                if(document.querySelector("#in_bespeMes").value != ""){

                    casillaDiasSinReservas = null;
                    casillaDiasSinReservas = [];

                    let mes = document.querySelector("#in_bespeMes").value.padStart(2, '0');
                    let anio = e.target.value;

                    fechaActual = `${anio}-${mes}-01`;

                    calendaMes_buscarReservas(fechaActual);

                }

            }

        });

        // BOTÓN - Mostrar Detalles de la Reserva
        document.querySelector("#btn_mostrarDetallesRese").addEventListener("click", (e)=>{

            document.querySelector("#div_opcionReservaBasePrin").classList.replace("div_opcionReservaBasePrin-2", "div_opcionReservaBasePrin-1");
            document.querySelector("#div_baseDatosReseMuestra").classList.replace("div_baseDatosReseMuestra-1", "div_baseDatosReseMuestra-2");

        });

        // BOTÓN - Mostrar Opciones de la Reserva
        document.querySelector("#btn_mostrarOptionsRese").addEventListener("click", (e)=>{

            document.querySelector("#div_baseDatosReseMuestra").classList.replace("div_baseDatosReseMuestra-2", "div_baseDatosReseMuestra-1");
            document.querySelector("#div_opcionReservaBasePrin").classList.replace("div_opcionReservaBasePrin-1", "div_opcionReservaBasePrin-2");

        });

        // BOTÓN - X Cerrar Cuadro con detalles reserva
        document.querySelector(".svg_xCerrarDatosReseCalenda").addEventListener("click", (e)=>{

            document.querySelector("#div_baseDatosDeReseSelected")
            .classList.replace("div_baseDatosDeReseSelected-2", "div_baseDatosDeReseSelected-1");

            document.querySelector("#div_baseDatosReseMuestra")
            .classList.replace("div_baseDatosReseMuestra-2", "div_baseDatosReseMuestra-1");

            document.querySelector("#div_opcionReservaBasePrin")
            .classList.replace("div_opcionReservaBasePrin-2", "div_opcionReservaBasePrin-1");

            document.querySelector("#div_baseDatosReseMuestra").innerHTML = "";
            document.querySelector("#div_opcionReservaBasePrin").innerHTML = "";

        }); 

    });

    // Eventos
    //----------------------------------------------------------------------------------------------------------------------------------------------------

}
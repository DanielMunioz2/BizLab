// VARIABLES Y FUNCIONES GLOBALES //

/* Local - (Localhost, XAMPP) */
// import {urlBuscarInfoAdminDB} from "http://localhost/BizClub/scripts/vyfGlobales.js";

/* Producción - (Bluehost) */
import {urlBuscarInfoAdminDB} from "https://plataforma.the-bizclub.com/scripts/vyfGlobales.js";
    
//--------------------------------------------------------------------------------------------------


// Verificar Estado de la Membresía
function verificarMembresiaStd(){

    document.querySelector("#form_btnPagarMensu").submit();

}

// Realizar Reserva Nueva
function nuevaReserva(){
    
    document.querySelector("#form_btnRealizaRese").submit();

}

//------------------------------------------------------------
// RESERVAS ADMINISTRACIÓN.PHP | INICIO
//------------------------------------------------------------

if(document.querySelector("#reservasAdminHTML") != null){

    // Tomando elementos del DOM

        // CONTENEDORES
        const reservasDivGene = document.querySelector("#divReservasGene");
        const divReservaData = document.querySelector(".divDataReserva");
        const cuadroOPerfil = document.querySelector(".cuadroPOculto");

        // INPUTS
        const filtroRese_TipoRese = document.querySelector("#filTipoRese");
        const filtroRese_EstadoRese = document.querySelector("#filEstadoRese");
        const filtroRese_DiaRese = document.querySelector("#filDiaRese");
        const filtroRese_MesRese = document.querySelector("#filMesRese");
        const filtroRese_AnioRese = document.querySelector("#filAnioRese");
        const inBusquedaEspecifi = document.querySelector("#inBusquedaEspecifi");
        const limpiarFiltrosInput = document.querySelector("#limpiarFiltros");

        const userId = document.querySelector("#idUserIniciado");
        const userNombre = document.querySelector("#nombreUserIniciado");

        // Botones
        const btnHoy_Reservas = document.querySelector("#btnHoy_Reservas");
        
        const flechaPerfilDiv = document.querySelector(".divFlecha");
        const flechaPerfil = document.querySelector(".flechaIconPerfil");
        const btnCerrarSesion = document.querySelector(".btnCerrar");
        const ajustesCuentaBtn = document.querySelector("#ajustesCuentaBtn");

        const buttonAtrasReseC = document.querySelector("#buttonAtrasC");
        const buttonAtrasRese = document.querySelector("#buttonAtras");
        const buttonAdelanteRese = document.querySelector("#buttonAdelante");
        const buttonAdelanteReseC = document.querySelector("#buttonAdelanteC");
    
    //-------------------------------------------------------------------------------------------------------------------------

    // Variables globales

        // Fechas y Tiempo

            var diaGeneFijoNum = new Date().getDate();
            var mesGeneFijoNum = new Date().getMonth()+1;
            var anioGeneFijoNum = new Date().getFullYear();

            var diaGeneFijoTex = 
                new Date().getDate() < 10
                ? "0"+(new Date().getDate())
                : String(new Date().getDate());
            var mesGeneFijoTex = 
                new Date().getMonth()+1 < 10 
                ? "0"+(new Date().getMonth()+1) 
                : String(new Date().getMonth()+1);
            var anioGeneFijoTex = new Date().getFullYear();
            
            var cadenaFechaActual = anioGeneFijoTex+"-"+mesGeneFijoTex+"-"+diaGeneFijoTex;

        //-------------------------------------------------------------------------------------

        var mesesNumero = {
            "Enero" : "01",
            "Febrero" : "02",
            "Marzo" : "03",
            "Abril" : "04",
            "Mayo" : "05",
            "Junio" : "06",
            "Julio" : "07",
            "Agosto" : "08",
            "Septiembre" : "09",
            "Octubre" : "10",
            "Noviembre" : "11",
            "Diciembre" : "12",
        }

        filtrosFechaCuenta = null;
        
        var posicionPaginaGene = 0;
        var paginaCantGene = 0;

    //-------------------------------------------------------------------------------------------------------------------------

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    //-------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------
    // Funciones - INICIO
    //------------------------------------------

        // FUNCIÓN: crear hora

            function crearHoraTexto24a12(hora, minutos){

                let horaTexto = hora > 12 ? hora - 12 : hora;
                let meridiano = hora < 12 ? "AM" : "PM";
                let minutosTex = minutos < 10 ? "0"+minutos : minutos;

                horaTexto = horaTexto < 10 ?  "0"+horaTexto : horaTexto;

                let horaCompleta = horaTexto+":"+minutosTex+" "+meridiano;

                return horaCompleta;

            }

        //---------------------------------------------------------------------------------------------------------------------

        // FUNCIÓN: convertir hora a minutos

            function horasAMinutos(hora){

                let horaMinusFinal = 0;

                if(hora.includes("AM") || hora.includes("PM")){

                    let horaMinutos = hora.split(":");
                    let minutos = horaMinutos[1].split(" ");
                    let meridiano = minutos[1];
                    minutos = Number(minutos[0]);
                    horaMinutos = 
                        Number(horaMinutos[0]) < 12 && meridiano == "PM" 
                        ? ((Number(horaMinutos[0])*60)+720)
                        : (Number(horaMinutos[0])*60);
                    horaMinusFinal = horaMinutos+minutos;

                }else{
                    
                    let horaMinutos = hora.split(":");
                    horaMinusFinal = ((Number(horaMinutos[0])*60)+Number(horaMinutos[1]));

                }

                return horaMinusFinal;

            }

        //---------------------------------------------------------------------------------------------------------------------

        // FUNCIÓN: converitr fecha a número

            function fechaANumero(fecha){

                let fechaSeparada = fecha.split("-");

                let fechaNumero = 
                    Number(fechaSeparada[2])+
                    (Number(fechaSeparada[1])*30)+
                    Number(fechaSeparada[0]);

                return fechaNumero;

            }

        //---------------------------------------------------------------------------------------------------------------------

        // FUNCIÓN: flecha botón - Mostrar y ocultar PANEL PERFIL

            if(document.querySelector("#cuadroPOculto") != null){

                window.addEventListener('click', function mostrarCuadroPerfil(e) {

                    if (document.getElementById('divFlecha').contains(e.target)) {
                        
    
                    } else {
                            
                        document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
                        flechaPerfil.classList.replace("flecha2", "flecha1");

                    }
    
                });

            }
        
            flechaPerfilDiv.addEventListener("click", () => {
                if (flechaPerfil.classList.contains("flecha1")) {
                flechaPerfil.classList.replace("flecha1", "flecha2");
                cuadroOPerfil.classList.replace("cuadroOPerfil1", "cuadroOPerfil2");
                } else {
                if (flechaPerfil.classList.contains("flecha2")) {
                    flechaPerfil.classList.replace("flecha2", "flecha1");
                    cuadroOPerfil.classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
                }
                }
            });
        
            // Botón AJUSTES DE LA CUENTA - PANEL PERFIL
            ajustesCuentaBtn.addEventListener("click", (e) => {
            
            e.preventDefault();
            window.location.href = "usuarioPerfil.php";
    
            })
            //-----------------------------------------------------------------------------
    
            //
            
            // Botón Cerrar Sesión - PANEL PERFIL
            btnCerrarSesion.addEventListener("click", (e) => {
    
            window.location.href = "cerrar.php";
    
            });
            //-----------------------------------------------------------------------------
    
        //---------------------------------------------------------------------------------------------------------------------

        // FUNCIÓN: cambiar a otras opciones reserva

            var erroresInputCancelRese = [1, 1];

            // Función secundaria

                //Función terciaria
                function cancelRese2(horasRes, userId, reseId, cargoAdic){

                    let formCancelarRese2 = new FormData();
                    let motivoCancelacion = document.querySelector("#motivoCancelReseInput").value;
                    let horaActual = crearHoraTexto24a12(new Date().getHours(), new Date().getMinutes());

                    if(cargoAdic == true){

                        let valorAdicional = document.querySelector("#cargoAdicionalInput").value;
                        
                        formCancelarRese2.append("horasRestantesCancelRese", horasRes);
                        formCancelarRese2.append("motivoCancelacion", motivoCancelacion);
                        formCancelarRese2.append("idReseCancel", reseId);
                        formCancelarRese2.append("idUserCancel", userId);
                        formCancelarRese2.append("horaCancelaRese", horaActual);
                        formCancelarRese2.append("fechaCancelaRese", cadenaFechaActual);
                        formCancelarRese2.append("cargoAdiciCancel", valorAdicional);
                        formCancelarRese2.append("tipoDeudaCancel", "reservaCancelaPrecioAdicional");

                    }else{  

                        formCancelarRese2.append("horasRestantesCancelRese", horasRes);
                        formCancelarRese2.append("motivoCancelacion", motivoCancelacion);
                        formCancelarRese2.append("horaCancelaRese", horaActual);
                        formCancelarRese2.append("fechaCancelaRese", cadenaFechaActual);
                        formCancelarRese2.append("idReseCancel", reseId);
                        formCancelarRese2.append("idUserCancel", userId);

                    }

                    fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formCancelarRese2,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            
                            document.querySelector(".spanErrorConfir").textContent = data;

                        })
                        .catch((err) => console.log(err));

                    document.querySelector(".opcionBaseDiv").innerHTML = "";
                    document.querySelector(".opcionBaseDiv").classList.replace("opcionBaseDiv-A", "opcionBaseDiv-C");

                    document.querySelector(".botonCancelar").setAttribute("disabled", "");
                    document.querySelector(".botonCancelar").removeAttribute("onclick");
                    document.querySelector(".botonCancelar").classList.replace("botonCancelar-D", "botonCancelar-B");

                    document.querySelector(".btnOtrasOpciones").removeAttribute("onclick");

                }
                //------------------------------------------------------------------------

                // Función terciaria
                function revisar24horasMargen(){

                    if(document.querySelector("#cargoAdicionalInput") == null){

                        erroresInputCancelRese[0] = 0;

                    }

                    let sumaErrores = 0

                    for(let i = 0; i < erroresInputCancelRese.length; i++){

                        sumaErrores += erroresInputCancelRese[i];

                    }

                    if(sumaErrores == 0){
                        
                        document.querySelector(".buttonCance").removeAttribute("disabled");
                        document.querySelector(".buttonCance").classList.replace("buttonCance-B", "buttonCance-D");

                    }else{

                        document.querySelector(".buttonCance").classList.replace("buttonCance-D", "buttonCance-B");
                        document.querySelector(".buttonCance").setAttribute("disabled", "");

                    }

                }
                //------------------------------------------------------------------------

            const rangoCancelReseBase = document.createRange();

            function cancelarReservaBase(id){

                document.querySelector(".botonCancelar").classList.replace("botonCancelar-D", "botonCancelar-B");
                document.querySelector(".botonCancelar").setAttribute("disabled", "");

                // Consulta Fetch

                    let form24horas = new FormData();

                    form24horas.append("idCancelarRese", id);

                    fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: form24horas,
                    })
                        .then((response) => response.json())
                        .then((data) => {

                            if(data.length != 0){

                                let fechaEntrada = data[0]; 
                                let fechaAnterior = data[1]; 
                                let horaEntrada = data[2]; 
                                let restantes24horas = 0;
                                let html24Horas = `
                                `;
                                let cargoAdicional = false;

                                if(fechaAnterior == cadenaFechaActual){

                                    let horaActual = new Date().getHours()+":"+new Date().getMinutes();
                                    let horasEntrada = horasAMinutos(horaEntrada);
                                    let horaActualSuma = horasAMinutos(horaActual);
                                    restantes24horas = 1440-horaActualSuma;
                                    restantes24horas = restantes24horas + horasEntrada;

                                    restantes24horas = parseInt(restantes24horas/60);

                                }else{

                                    if(fechaEntrada == cadenaFechaActual){

                                        let horasEntrada = horasAMinutos(horaEntrada);
                                        restantes24horas = 1440-horasEntrada;
                                        restantes24horas = 1440-restantes24horas;

                                        restantes24horas = parseInt(restantes24horas/60);

                                    }

                                }

                                if(restantes24horas <= 24 && restantes24horas != 0){
                                    
                                    html24Horas = `
                                    <div class="divIcono">
                                        <div class="div1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.49 452.25"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M492.28,284.85c-28.94-45.84-57.46-91.93-86.17-137.91-21-33.56-41.37-67.5-63.11-100.55C311.86-1,247.39-14,199.68,16.32c-16.43,10.45-28.07,25-38.21,41.35Q89.26,174,16.56,290c-14,22.35-19,46.49-15.46,72.52C8,412.94,52.66,452.18,103.37,452.2q152.43.06,304.85-.05c33.23-.06,60-14.17,80.93-39.55,12.38-15,19-32.58,22.34-51.56V333.1C508.6,315.61,501.75,299.83,492.28,284.85ZM422.86,419.44a93.5,93.5,0,0,1-20.78,2.12q-73.09,0-146.17,0-73.33,0-146.67,0c-15.19,0-29.78-2.92-42.79-11.31-20.7-13.36-32.63-32.12-34.92-56.87C30,336.5,34,321.07,42.9,306.83q49.62-79.56,99.29-159.09C159,120.8,175.75,93.82,192.64,66.93c14.6-23.24,36-35.4,63.18-35.49,26.74-.09,48.35,11.53,62.75,34.39,34.65,55,68.91,110.24,103.32,165.39,15.41,24.68,30.65,49.46,46.27,74,8.19,12.86,13,26.81,12.78,41.86C480.33,384.78,455.06,412.12,422.86,419.44Z"/><path d="M295.61,83a48.46,48.46,0,0,0-9.81-11.87c-22.15-18.53-53.49-13.46-69.08,11.34-17.42,27.73-34.68,55.57-52,83.36q-49,78.51-97.9,157c-9.36,15.09-9.73,31-1.07,46.43S88.1,392.36,106,392.34q75.09-.06,150.17,0t150.18,0a44.32,44.32,0,0,0,8.93-.6c32.1-6.71,46.93-41.69,29.52-69.63Q370.24,202.49,295.61,83ZM421,348c-.66,7.81-6.57,13-15.28,13.63-2.48.17-5,.06-7.48.06H112.29c-1.66,0-3.32,0-5,0-13.82-.18-20.33-12.74-13.17-24,18.72-29.47,37-59.2,55.52-88.83,30.19-48.38,60.79-96.52,90.34-145.3,9.52-15.71,22.29-15.76,32,0,47.55,77.33,95.88,154.19,143.94,231.21C418.47,338.84,421.38,342.86,421,348Z"/><path d="M271.3,218.85c0-16.29-.08-32.57.05-48.86,0-3.61-1.14-5.07-4.87-5-7.14.2-14.29.15-21.43,0-3.19-.05-4.41,1.17-4.41,4.38q.11,48.85,0,97.72c0,3.64,1.63,4.51,4.85,4.45,6.65-.14,13.31-.27,19.94,0,4.56.22,6-1.34,6-5.93C271.15,250.1,271.3,234.47,271.3,218.85Z"/><path d="M267.43,300.82q-11.44.09-22.9,0c-2.74,0-3.88,1.14-3.86,3.86q.11,11.46,0,22.91c0,2.73,1.14,3.91,3.87,3.85,4-.08,8,0,12,0,14.82,0,14.82,0,14.78-14.83,0-4-.06-8,0-11.95C271.35,301.94,270.16,300.79,267.43,300.82Z"/></g></g></svg>
                                        </div>
                                        <div class="div2">
                                            <span> ATENCIÓN: esta reserva tiene menos de 24 horas para comenzar, la cancelación llevará un cargo adicional</span>
                                        </div>
                                    </div>
                                    <div class="divCargoAdi">
                                        <span>Cargo Adicional</span>
                                        <input id="cargoAdicionalInput" name="cargoAdicionalInput" type="text" value="">
                                    </div>
                                    `;

                                    cargoAdicional = true;
                                    
                                }

                                let cancelarReseHTML = `
                                <span class="cancelarSpan">Cancelar la Reserva ${data[3][0]["codigoReserva"]}</span>
                                <div class="divCancelReseBase">
                                    <div class="inputsDivCargoAdicio">
                                        ${html24Horas}
                                    </div>
                                    <div class="motivoCancelDiv">
                                        <span class="motivoSpan">Motivo</span>
                                        <textarea id="motivoCancelReseInput" name="motivoCancelReseInput" rows="10" cols="50"></textarea>
                                    </div>
                                    <div class="btnDivs">
                                        <button class="buttonCance buttonCance-B" onclick="cancelRese2(${restantes24horas}, ${data[3][0]["id_usuario"]}, ${data[3][0]["id_reserva"]}, ${cargoAdicional})">Cancelar Reserva</button>
                                    </div>
                                </div>
                                `;

                                document.querySelector(".opcionBaseDiv").innerHTML = "";

                                rangoCancelReseBase.selectNode(document.getElementsByTagName("div").item(0));
                                const baseCancelRese =
                                    rangoCancelReseBase.createContextualFragment(cancelarReseHTML);
                                document.querySelector(".opcionBaseDiv").appendChild(baseCancelRese);

                                document.querySelector(".opcionBaseDiv").classList.replace("opcionBaseDiv-C", "opcionBaseDiv-A");
                                document.querySelector(".opcionBaseDiv").style.border = "1px solid #56000044";

                                revisar24horasMargen();

                                document.querySelector("#motivoCancelReseInput").addEventListener("input", (e)=>{

                                    let valor = e.target.value;

                                    if(valor != ""){
                                        erroresInputCancelRese[1] = 0;
                                    }else{
                                        erroresInputCancelRese[1] = 1;
                                    }

                                    revisar24horasMargen();

                                });

                                if(document.querySelector("#cargoAdicionalInput") != null){

                                    document.querySelector("#cargoAdicionalInput").addEventListener("input", (e)=>{
                                        
                                        let valor = e.target.value;

                                        if(valor != ""){
                                            
                                            if(isNaN(Number(valor))){
                                                
                                                erroresInputCancelRese[0] = 1
                                            }else{
                                                erroresInputCancelRese[0] = 0
                                            }

                                        }else{

                                            erroresInputCancelRese[0] = 1;

                                        }

                                        revisar24horasMargen();

                                    });

                                }

                            }

                        })
                        .catch((err) => console.log(err));

                //------------------------------------------------------------------

            }
            //-------------------------------------------------------------------------------------

            const rangoOtrasOpciones = document.createRange();  

            let otrasOpcionesHTML = "";

            function otrasOpcionesRese(id, estadoRese){

                let disabledEstadoCancel = "";
                let claseBotonClase = "botonCancelar-D";
                let onclikBtnCancelar = `onclick="cancelarReservaBase(${id})"`;

                if(estadoRese == "Cancelada" || estadoRese == "Terminada"){
                    disabledEstadoCancel = "disabled"
                    claseBotonClase = "botonCancelar-B";
                    onclikBtnCancelar = "";
                }

                if(document.querySelector("datosReseSpan") == null){

                    otrasOpcionesHTML = `
                    <div class="btnDivGene">
                        <button class="" onclick="verDetallesReserva(${id})">Reserva</button>
                        <button class="btnOtrasOpciones" onclick="otrasOpcionesRese(${id}, '${estadoRese}')">Otras Opciones</button>
                    </div>
                    <div class="otrasOpcionesDivGene">
                        <div class="divBtnsOpciones">
                            <!--<button class="botonPosponer-D" onclick="posponerReservaBase(${id})">Posponer Reserva</button>-->
                            <button class="botonCancelar ${claseBotonClase}" ${onclikBtnCancelar} ${disabledEstadoCancel}>Cancelar Reserva</button>
                        </div>
                        <div class="opcionBaseDiv opcionBaseDiv-C">
                        </div>
                        <span class="spanErrorConfir spanErrorConfir-A"></span>
                    </div>
                    `;

                    divReservaData.innerHTML = ""

                    rangoOtrasOpciones.selectNode(document.getElementsByTagName("div").item(0));
                    const otrasOpcionesHtml =
                        rangoOtrasOpciones.createContextualFragment(otrasOpcionesHTML);
                    divReservaData.appendChild(otrasOpcionesHtml);

                }

            }

        //---------------------------------------------------------------------------------------------------------------------

        // INTERVALO: actualizar reservas al cargar la página

            var intervalReseActualiGene = null;

            function actualizarReservas(){
                
                if(intervalReseActualiGene == null){

                    intervalReseActualiGene = setInterval(()=>{

                        let formActuReseGene = new FormData();

                        formActuReseGene.append("reseActualiGene", true);
        
                        fetch(urlBuscarInfoAdminDB, {
                            method: "POST",
                            body: formActuReseGene,
                        })
                            .then((response) => response.json())
                            .then((data) => {

                                if(data.length != 1){
        
                                    for(let i = 0; i < data.length; i++){
        
                                        let idRese = data[i]["id_reserva"];
        
                                        let fechaInicioRese = data[i]["fechaReserva"];
                                        let fechaFinalRese = data[i]["reserDiaFinal"];
                                        let horaInicioRese = data[i]["horaEntradaR"];
                                        let horaFinalRese = data[i]["horaSalidaR"];
        
                                        let horaEntradaSuma = horasAMinutos(horaInicioRese);
                                        let horaSalidaSuma = horasAMinutos(horaFinalRese);
                                        let horaActualSuma = 
                                            ((new Date().getHours())*60)+
                                            (new Date().getMinutes())
                                        let fechaEntraSuma = fechaANumero(fechaInicioRese);
                                        let fechaSaleSuma = fechaANumero(fechaFinalRese);
                                        let fechaActualSuma = fechaANumero(cadenaFechaActual);
        
                                        // Reservas por hora (reservas de un solo día)
                                        if(fechaEntraSuma == fechaSaleSuma){
        
                                            // La fecha debe ser igual a la actual
                                            if(fechaActualSuma == fechaEntraSuma){
        
                                                // La hora actual debe estar entre la hora de entrada y salida
                                                if(
                                                    horaActualSuma >= horaEntradaSuma && 
                                                    horaActualSuma < horaSalidaSuma
                                                ){
        
                                                    let formActualiRese = new FormData();
        
                                                    formActualiRese.append("reseEstadoID", idRese);
                                                    formActualiRese.append("actuReseEstado", "En Proceso");
        
                                                    fetch(urlBuscarInfoAdminDB, {
                                                        method: "POST",
                                                        body: formActualiRese,
                                                    })
                                                        .then((response) => response.json())
                                                        .then((data) => {
            
                                                        })
                                                        .catch((err) => console.log(err));
        
                                                }else{
        
                                                    // La hora fue completada
                                                    if(horaActualSuma >= horaSalidaSuma){
        
                                                        let formActualiRese = new FormData();
        
                                                        formActualiRese.append("reseEstadoID", idRese);
                                                        formActualiRese.append("actuReseEstado", "Terminada");
        
                                                        fetch(urlBuscarInfoAdminDB, {
                                                            method: "POST",
                                                            body: formActualiRese,
                                                        })
                                                            .then((response) => response.json())
                                                            .then((data) => {
                
                                                            })
                                                            .catch((err) => console.log(err));
        
                                                    }
        
                                                }
                                                
                                            }else{
        
                                                // Fecha superada, reserva completada
                                                if(fechaActualSuma > fechaSaleSuma){
        
                                                    let formActualiRese = new FormData();
        
                                                    formActualiRese.append("reseEstadoID", idRese);
                                                    formActualiRese.append("actuReseEstado", "Terminada");
        
                                                    fetch(urlBuscarInfoAdminDB, {
                                                        method: "POST",
                                                        body: formActualiRese,
                                                    })
                                                        .then((response) => response.json())
                                                        .then((data) => {
            
                                                        })
                                                        .catch((err) => console.log(err));
        
                                                }
        
                                            }
        
                                        }else{
        
                                            // Reservas por día o por semana (reservas de más de un día)
                                            if(fechaEntraSuma < fechaSaleSuma){
        
                                                // Si la fecha actual se encuentra dentro del rango de la fecha de inicio y final
                                                if(
                                                    (fechaActualSuma > fechaEntraSuma &&
                                                    fechaActualSuma < fechaSaleSuma) ||
                                                    fechaActualSuma == fechaEntraSuma ||
                                                    fechaActualSuma == fechaSaleSuma
                                                ){
        
                                                    // La hora actual debe estar en el rango de la hora de entrada y salida
                                                    if(
                                                        horaActualSuma >= horaEntradaSuma && 
                                                        horaActualSuma < horaSalidaSuma
                                                    ){
            
                                                        let formActualiRese = new FormData();
            
                                                        formActualiRese.append("reseEstadoID", idRese);
                                                        formActualiRese.append("actuReseEstado", "En Proceso");
            
                                                        fetch(urlBuscarInfoAdminDB, {
                                                            method: "POST",
                                                            body: formActualiRese,
                                                        })
                                                            .then((response) => response.json())
                                                            .then((data) => {
                
                                                            })
                                                            .catch((err) => console.log(err));
            
                                                    }else{
                                                        
                                                        // Hora superada
                                                        if(horaActualSuma > horaSalidaSuma){
            
                                                            let formActualiRese = new FormData();
            
                                                            formActualiRese.append("reseEstadoID", idRese);
                                                            formActualiRese.append("actuReseEstado", "Terminada");
            
                                                            fetch(urlBuscarInfoAdminDB, {
                                                                method: "POST",
                                                                body: formActualiRese,
                                                            })
                                                                .then((response) => response.json())
                                                                .then((data) => {
                    
                                                                })
                                                                .catch((err) => console.log(err));
            
                                                        }
            
                                                    }
        
                                                }else{
        
                                                    // Fecha superada, reserva completada
                                                    if(fechaActualSuma > fechaSaleSuma){
        
                                                        let formActualiRese = new FormData();
        
                                                        formActualiRese.append("reseEstadoID", idRese);
                                                        formActualiRese.append("actuReseEstado", "Terminada");
        
                                                        fetch(urlBuscarInfoAdminDB, {
                                                            method: "POST",
                                                            body: formActualiRese,
                                                        })
                                                            .then((response) => response.json())
                                                            .then((data) => {
                
                                                            })
                                                            .catch((err) => console.log(err));
        
                                                    }
        
                                                }
        
                                            }
        
                                        }
        
                                    }
        
                                }else{

                                    clearInterval(intervalReseActualiGene);
                                    intervalReseActualiGene = null;

                                }
        
                            })
                            .catch((err) => console.log(err));

                    }, 500);

                }else{

                    clearInterval(intervalReseActualiGene);
                    intervalReseActualiGene = null;

                    actualizarReservas();

                }

            }

            actualizarReservas();

        //---------------------------------------------------------------------------------------------------------------------

        // INTERVALO: actualizar estado de la reserva al ver sus detalles

            const rangoEstadoReseDiv = document.createRange();
            
            var intervalTiempoRestante = null;
            var actuEstadoDiv = 0;
            var actualizaEnProceso = 0;

            function intervaloTiempoRestanteRese(){

                // Debe haber una reserva seleccionada
                if(document.querySelector(".divCodigos") != null){

                    // Si no existe un intervalo previo, crear el primero
                    if(intervalTiempoRestante == null){

                        intervalTiempoRestante = setInterval(()=>{
                            
                            let horaActualSuma = ((new Date().getHours()*60)+new Date().getMinutes());
                            let horaEntraReseSuma = 0;
                            let horaSaleReseSuma = 0;
                            let estadoReseOriginal = "";
                            let claseEstiloDivEstado = "";
                            let fechaInicioRese = "";
                            let fechaFinalRese = "";
                            let idRese = 0;

                            if(document.querySelector(".horaEntraReseOculta") != null){

                                horaEntraReseSuma = horasAMinutos(document.querySelector(".horaEntraReseOculta").value);
                                horaSaleReseSuma = horasAMinutos(document.querySelector(".horaSaleReseOculta").value);
                                estadoReseOriginal = document.querySelector(".estadoReseOculto").value;
                                claseEstiloDivEstado = document.querySelector(".claseEstadoDivOculto").value;
                                fechaInicioRese = document.querySelector(".fechaIniReseOculto").value;
                                fechaFinalRese = document.querySelector(".fechaFinReseOculto").value;
                                idRese = document.querySelector(".idReseOculto").value;

                            }

                            let fechaIniSuma = fechaANumero(fechaInicioRese);
                            let fechaFinSuma = fechaANumero(fechaFinalRese);
                            let fechaActuSuma = diaGeneFijoNum+(mesGeneFijoNum*30)+anioGeneFijoNum;
                            
                            let estadoReseActuali = "";

                            if(fechaIniSuma == fechaFinSuma){

                                if(
                                    fechaActuSuma == fechaIniSuma &&
                                    estadoReseOriginal == "Pendiente" || 
                                    estadoReseOriginal == "En Proceso"
                                ){
    
                                    if(horaActualSuma >= horaEntraReseSuma && horaActualSuma < horaSaleReseSuma){
    
                                        estadoReseActuali = "En Proceso";
    
                                        if(actualizaEnProceso == 0){
    
                                            let formActuEstadoRese = new FormData();
        
                                            formActuEstadoRese.append("actuReseEstado", estadoReseActuali);
                                            formActuEstadoRese.append("reseEstadoID", idRese);
    
                                            fetch(urlBuscarInfoAdminDB, {
                                                method: "POST",
                                                body: formActuEstadoRese,
                                            })
                                                .then((response) => response.json())
                                                .then((data) => {
    
                                                })
                                                .catch((err) => console.log(err));
    
                                            actualizaEnProceso = 1;
    
                                        }
                                        
                                    }else{
            
                                        if(horaActualSuma >= horaSaleReseSuma){
            
                                            estadoReseActuali = "Terminada";
                                            
                                            let formActuEstadoRese = new FormData();
        
                                            formActuEstadoRese.append("actuReseEstado", estadoReseActuali);
                                            formActuEstadoRese.append("reseEstadoID", idRese);
    
                                            fetch(urlBuscarInfoAdminDB, {
                                                method: "POST",
                                                body: formActuEstadoRese,
                                            })
                                                .then((response) => response.json())
                                                .then((data) => {
    
                                                })
                                                .catch((err) => console.log(err));
        
                                        }
            
                                    }
    
                                    if(horaActualSuma >= horaEntraReseSuma && horaActualSuma < horaSaleReseSuma){
    
                                        let sumaMinutosMuestra = horaSaleReseSuma-horaActualSuma;
                                        let horas = parseInt(sumaMinutosMuestra/60); 
                                        let minutos = parseInt(sumaMinutosMuestra-(horas*60));
    
                                        if(actuEstadoDiv == 0){
    
                                            estadoActualReseHTML = `
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 751.37 753.42"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M749.32,339.27c-.7-10.93-1.61-22-4.17-32.61-4.9-20.2-10.35-40.32-16.84-60.06a298.92,298.92,0,0,0-38.18-76.34C678.92,154,667.06,138,654,123.24a348,348,0,0,0-56.9-51.34C566.15,49.6,533,31.52,496.72,19.77c-17.59-5.7-35.79-9.64-53.86-13.72-20.61-4.65-41.6-6.32-62.71-6C369.22.2,358.27.3,347.38,1.11,334.79,2,322.12,3,309.75,5.26a382.61,382.61,0,0,0-64.4,17.66c-26.08,9.77-51,21.75-74,37.41-14.71,10-28.2,21.8-42.68,32.17-5.14,3.68-3.07,6-.38,9.13,1.42,1.63,3.12,3,4.55,4.63,3.81,4.31,7.46,8.75,11.3,13,7.28,8.12,14.58,16.21,22.09,24.12.74.78,3.46.81,4.41.07,6-4.6,11.59-9.68,17.55-14.3a302.47,302.47,0,0,1,50.15-31.33c21.93-10.94,44.79-19.59,68.82-24.42,16.47-3.32,33.19-6.28,49.92-7.2C378,65.07,399.13,64.67,419.87,69c18,3.75,36.1,7.28,53.65,12.58,19.2,5.8,37.28,14.67,54.82,24.54a314.5,314.5,0,0,1,63.81,48c8.76,8.43,16.54,17.93,24.41,27.24,13.86,16.41,25.21,34.52,35,53.6a309,309,0,0,1,22.23,56.26,292.21,292.21,0,0,1,11.49,67c1,20.45,1.21,41.06-2.82,61.33-3,15.31-6,30.67-10,45.75-6,22.66-15.91,43.76-27.32,64.2a278,278,0,0,1-45.3,60.9C586.8,603.55,572.42,615.52,558,627.3c-7.95,6.51-17.1,11.55-25.74,17.27l-22.88-42.41c-24.9,38.17-49.44,75.8-74.34,114l155.27,37.3-26.93-50.54c4.84-3,9.42-5.83,13.93-8.73,25.93-16.66,50.08-35.53,70.51-58.7,12.68-14.38,25.09-29.09,36.45-44.53,17-23.09,29.94-48.54,40.6-75.18,8.49-21.22,15.39-43,19.29-65.43a481.87,481.87,0,0,0,6.93-58.5C752,374.36,750.44,356.76,749.32,339.27Z"/><path d="M345.9,350.86c-13.71,7.43-20.64,19.07-20.08,34.92.86,24.59,21.4,37.32,40.94,36.65a37.48,37.48,0,0,0,28-13.38c2.21-2.61,4.7-3.5,8.17-3.5q69.66.19,139.32.09h6.1V362.71h-6.26q-70.16,0-140.32.06a8.29,8.29,0,0,1-6.61-2.89,63,63,0,0,0-12-9.18c-3.09-1.87-4.53-3.57-4.52-7.5q.24-106.11.12-212.22v-5.66H349.81v6.4q0,106.11,0,212.22C349.86,347.19,349.18,349.08,345.9,350.86Z"/><path d="M12.68,296.92c18.74,4.73,37.37,9.93,56,15.17,2.83.8,3.8.47,4.4-2.45A257.75,257.75,0,0,1,93.68,247.8c8.66-17.65,18.73-34.61,28.31-52.12L68.72,157.93C60.83,170.88,53,182.86,46,195.36c-16.79,30.2-28.67,62.36-36.69,96C8.68,294,8.75,295.93,12.68,296.92Z"/><path d="M98,514.25c-3.57-7.09-6.68-14.41-10.16-22L32.72,530.58a377.12,377.12,0,0,0,56.19,89.35l7.7-6.58c6.74-5.76,13.53-11.46,20.21-17.3,6.46-5.63,12.78-11.41,19.19-17.11,1.84-1.63,2.62-3,.61-5.35A298,298,0,0,1,98,514.25Z"/><path d="M73.58,445.65C69,426.47,66.14,407.05,66,387.29c0-7.42,0-14.85,0-22.19L.36,362.69a364.91,364.91,0,0,0,13.84,117c19.15-9.26,37.8-18.35,56.53-27.27C74,450.82,74.35,448.91,73.58,445.65Z"/><path d="M261.46,665.14a111.75,111.75,0,0,1-14.79-6.34c-19.33-9.22-38-19.5-54.9-32.84-2.13-1.68-4-2.22-6.3,1.14-8.65,12.65-17.95,24.85-26.89,37.3-3,4.19-5.7,8.61-8.54,12.93,4.28,3.18,8.5,6.43,12.84,9.52,20.81,14.84,43.41,26.44,66.72,36.76,3.66,1.63,7.52,2.83,11.39,4.28,7.9-19.53,15.34-38.07,22.91-56.57C265.17,668.24,265.56,666.41,261.46,665.14Z"/><path d="M321.52,683.53c-3.83,20.4-7.83,41.75-12,63.78,33.12,5.45,65.85,7.71,99.71,4.06L389.21,688.5Z"/></g></g></svg>
                                            <span class="estadoReseDataMuestra">En Proceso</span>
                                            <div class="tiempoRestanteDiv">
                                                <span class="tiempoRestaSpan">Tiempo Restante:</span>
                                                <div class="divRestante">
                                                    <span class="spanHorasRestantes">0</span>
                                                    <span>H</span>
                                                    <span class="spanMinusRestantes">0</span>
                                                    <span>m</span>
                                                </div>
                                            </div>
                                            `;
    
                                            document.querySelector(".divEstadoGene").innerHTML="";
                                            document.querySelector(".divEstadoGene").classList.replace(claseEstiloDivEstado, "divEstado");
    
                                            document.querySelector(".claseDivOcul").value = "divEstado";
    
                                            rangoEstadoReseDiv.selectNode(document.getElementsByTagName("div").item(0));
                                            const estadoDivGeneInfo =
                                                rangoEstadoReseDiv.createContextualFragment(estadoActualReseHTML);
                                            document.querySelector(".divEstadoGene").appendChild(estadoDivGeneInfo);
    
                                            actuEstadoDiv = 1;
    
                                        }
                                        
                                        document.querySelector(".spanHorasRestantes").textContent = horas;
                                        document.querySelector(".spanMinusRestantes").textContent = minutos;
                                        
                                    }else{
    
                                        if(horaActualSuma >= horaSaleReseSuma){
    
                                            estadoActualReseHTML = `
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.1 471.25"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M310.78,145.6C288,174,264.6,202,241.5,230.13c-5.22,6.36-10.64,7-16.54,1.18-4.16-4.1-8.6-7.85-12.88-11.78Q184.33,194,156.78,168.3a13.27,13.27,0,0,0-7.47-3.69c-5.87.25-9,4.65-12.43,8.41-7.89,8.55-15.91,17-23.5,25.79-4.33,5-9.66,9.14-13.25,14.89-2.8,4.5-2.12,8,1.52,11.54,5.75,5.55,11.47,11.12,17.41,16.48,17.18,15.48,34.08,31.28,51.1,47l63.44,58.49c6,5.54,10.43,5.14,15.5-1.1q21.24-26.13,42.65-52.11c13.51-16.45,27.14-32.81,40.59-49.31,16-19.6,31.39-39.67,47.81-58.89,20-23.41,38.91-47.71,58.59-71.38,4.81-5.77,4.37-9.37-.83-14.9a44.58,44.58,0,0,0-4.42-4c-13.39-10.94-26.84-21.8-40.2-32.78C387.39,57.81,383,58,377.9,63.84c-7.83,9.07-15.94,17.94-23.12,27.5C340.77,110,325.34,127.42,310.78,145.6Z"/><path d="M471.2,238.34c-1.58-1-2.79.55-3.93,1.38q-9.11,6.59-18.09,13.34c-2.22,1.68-4.14,1.58-6.31-.07-4.1-3.12-8.29-6.12-12.46-9.15-2.35-1.72-4.75-5.56-7.19-4.35s-1.93,5.66-2.06,8.74c-.76,18-5,35.26-11.08,52.06-6.6,18.31-16.44,34.92-28.38,50.27-1.58,2-2.94,4.06-2.65,6.8,1.26,8.22,2.54,16.44,3.78,24.66.44,3,2.36,4.27,5.06,4.69,7.88,1.24,15.77,2.41,23.65,3.68,1.92.3,3.11-.54,4.25-1.93a271.71,271.71,0,0,0,23.9-33.8c11-18.6,18.52-38.61,24.41-59.37,4.95-17.45,6.34-35.33,7.86-53.23C472.07,240.77,472.44,239.12,471.2,238.34Z"/><path d="M74.5,69.23Q84.6,70.85,94.73,72.3c3.85.55,6.17,1.89,6.57,6.49A151.25,151.25,0,0,0,105.37,103c2.69-2.2,4.95-3.88,7-5.76,29.09-26.36,63.44-41,102.12-46.08a7.83,7.83,0,0,0,5.79-3.33c4.54-6.16,9.07-12.34,13.92-18.26,2.34-2.86,2.39-5.1.21-8C229.7,15.37,225.12,9,220.5,2.72c-1.05-1.43-2.21-2.35-4.15-2.16a252.4,252.4,0,0,0-53.67,10.92A232.91,232.91,0,0,0,115,33.09,229.79,229.79,0,0,0,73.11,65.2c-.82.8-2,1.6-1.63,2.87C71.88,69.51,73.43,69.06,74.5,69.23Z"/><path d="M395.8,402.23c-7.06-1.09-14.13-2.22-21.22-3.13-2.81-.36-4.1-1.73-4.46-4.43-1-7.59-2.07-15.16-3.11-22.74-.13-1,.08-2.16-1-2.66-1.37-.65-2.1.61-2.93,1.34-3.25,2.85-6.38,5.85-9.71,8.6-13.67,11.34-28.56,21-45,27.53s-33.32,11.6-51,13.26a8.26,8.26,0,0,0-6.31,3.5c-4.8,6.6-9.6,13.2-14.49,19.73-1.77,2.35-1.77,4.4,0,6.74,3.84,5,7.72,10,11.26,15.29,2.5,3.71,5.49,5.72,10.06,5,4.79-.59,9.59-1.08,14.36-1.78a229.83,229.83,0,0,0,75.36-25.25,226.9,226.9,0,0,0,49.61-35.87c1-1,2.87-1.84,2.41-3.49S397.23,402.45,395.8,402.23Z"/><path d="M5.39,231.26c5.5-4,11.06-8,16.48-12.12,2.73-2.09,4.92-1.81,7.55.3,5.45,4.38,11.2,8.38,16.66,12.74,3.21,2.56,4,1.44,4.3-2,.58-7.46,1-15,2.1-22.35a187.11,187.11,0,0,1,37.57-87.13,9.33,9.33,0,0,0,2.09-6c-1.33-8.38-2.7-16.76-3.94-25.15-.46-3.09-2.37-4-5.15-4.39-6.92-.9-13.88-1.7-20.72-3.07-3.45-.7-5.46,0-7.65,2.76a247.14,247.14,0,0,0-41.23,73.14C5.32,181,1.68,204.66.17,228.83c-.09,1.43-.64,3.3.9,4.13C2.87,233.93,4.08,232.21,5.39,231.26Z"/><path d="M103,365.73c.33-1.26-1.09-1.9-1.85-2.75-16.54-18.3-30.06-38.4-38.62-61.77a203.07,203.07,0,0,1-10.53-42,12.74,12.74,0,0,0-5.49-9.05c-5.78-4.21-11.66-8.29-17.24-12.76-3-2.42-5.5-2.43-8.45-.14-5.39,4.18-10.88,8.23-16.37,12.28-2.17,1.6-3.52,3.52-3.23,6.32A223.53,223.53,0,0,0,5,282.51a250.19,250.19,0,0,0,19.54,57,220.8,220.8,0,0,0,40,57.53c1.08,1.11,2,3.34,3.85,2.51,1.5-.68,1.49-2.93,1.49-4.53,0-6,1.79-11.85,2.2-17.82.28-4.14,2.14-6.34,6.34-6.89,7.09-.93,14.14-2.12,21.2-3.21C100.82,366.88,102.54,367.4,103,365.73Z"/><path d="M232,425.12c.72-1,2.37-2,1.39-3.35-.48-.66-2.12-.54-3.25-.65-8.28-.79-16.66-1-24.82-2.41a188.35,188.35,0,0,1-84.11-37.18,9.21,9.21,0,0,0-7.83-2c-7.71,1.32-15.44,2.53-23.2,3.58-3.15.42-4.71,1.91-5.14,5-1,7.09-1.93,14.17-3.15,21.21-.5,2.87.47,4.77,2.46,6.58a181.94,181.94,0,0,0,29,21.09c21.82,13.05,45,22.86,70,28.42,14.2,3.16,28.55,4.66,43,5.69,2.07-.43,5,1.07,6.07-.86s-1.56-3.7-2.77-5.38c-3.49-4.87-7.08-9.65-10.64-14.46-2.06-2.77-2.08-5.26.19-8.12C223.61,436.7,227.78,430.89,232,425.12Z"/><path d="M251.62,20.88c2.59,3.39,2.75,6.16-.31,9.68-4.34,5-8,10.62-11.89,16-1.75,2.4-1.21,3.59,1.84,3.54a123.16,123.16,0,0,1,13.43.81c25.92,2.42,50,10.53,72.64,23.13,3.07,1.71,5.1,1.68,7.29-1,8.82-10.82,17.61-21.68,26.61-32.34,2.25-2.67,2-4.08-.88-5.72-11-6.29-22.06-12.33-33.76-17.15a261.41,261.41,0,0,0-43.8-13.25A209.8,209.8,0,0,0,236.48,0c.9,1.5,1.27,2.23,1.74,2.87C242.67,8.88,247.09,14.93,251.62,20.88Z"/><path d="M416.17,191.41c1.82,7.94,4.1,15.82,4.06,24.08a5.94,5.94,0,0,0,2.79,5q9.87,7.17,19.63,14.53c2.11,1.59,4.11,2,6.37.36,6.41-4.77,12.85-9.5,19.27-14.25a6.26,6.26,0,0,0,2.78-5.59c-.31-2.14-.75-4.27-.92-6.42-1.71-21.63-7.63-42.19-15.63-62.22-2.09-5.25-2.88-5.25-6.35-1-9.86,12.14-19.71,24.28-29.72,36.3A9.75,9.75,0,0,0,416.17,191.41Z"/></g></g></svg>
                                            <span class="estadoReseDataMuestra">Terminada</span>
                                            `;
    
                                            document.querySelector(".divEstadoGene").innerHTML="";
                                            document.querySelector(".divEstadoGene").classList.replace(claseEstiloDivEstado, "estadoDivTerminada");
    
                                            rangoEstadoReseDiv.selectNode(document.getElementsByTagName("div").item(0));
                                            const estadoDivGeneInfo =
                                                rangoEstadoReseDiv.createContextualFragment(estadoActualReseHTML);
                                            document.querySelector(".divEstadoGene").appendChild(estadoDivGeneInfo);
    
                                            actuEstadoDiv = 0;
                                            actualizaEnProceso = 0;
    
                                            clearInterval(intervalTiempoRestante);
                                            
                                            intervalTiempoRestante = null;
    
                                        }
    
                                    }
    
                                }else{
    
                                    clearInterval(intervalTiempoRestante);
                                    intervalTiempoRestante = null;
    
                                    actuEstadoDiv = 0;
                                    actualizaEnProceso = 0;
    
                                }

                            }else{

                                if(
                                    (
                                        fechaActuSuma > fechaIniSuma &&
                                        fechaActuSuma < fechaFinSuma ||
                                        fechaActuSuma == fechaIniSuma ||
                                        fechaActuSuma == fechaFinSuma
                                    ) &&
                                    estadoReseOriginal == "Pendiente" || 
                                    estadoReseOriginal == "En Proceso"
                                ){
    
                                    if(horaActualSuma >= horaEntraReseSuma && horaActualSuma < horaSaleReseSuma){
    
                                        estadoReseActuali = "En Proceso";

                                        if(actualizaEnProceso == 0){
    
                                            let formActuEstadoRese = new FormData();
        
                                            formActuEstadoRese.append("actuReseEstado", estadoReseActuali);
                                            formActuEstadoRese.append("reseEstadoID", idRese);
    
                                            fetch(urlBuscarInfoAdminDB, {
                                                method: "POST",
                                                body: formActuEstadoRese,
                                            })
                                                .then((response) => response.json())
                                                .then((data) => {
    
                                                })
                                                .catch((err) => console.log(err));
    
                                            actualizaEnProceso = 1;
    
                                        }
                                        
                                    }else{
            
                                        if(horaActualSuma >= horaSaleReseSuma){
            
                                            estadoReseActuali = "Terminada";
                                            
                                            let formActuEstadoRese = new FormData();
        
                                            formActuEstadoRese.append("actuReseEstado", estadoReseActuali);
                                            formActuEstadoRese.append("reseEstadoID", idRese);
    
                                            fetch(urlBuscarInfoAdminDB, {
                                                method: "POST",
                                                body: formActuEstadoRese,
                                            })
                                                .then((response) => response.json())
                                                .then((data) => {
    
                                                })
                                                .catch((err) => console.log(err));
        
                                        }
            
                                    }
    
                                    if(horaActualSuma >= horaEntraReseSuma && horaActualSuma < horaSaleReseSuma){
    
                                        let sumaMinutosMuestra = horaSaleReseSuma-horaActualSuma;
                                        let horas = parseInt(sumaMinutosMuestra/60); 
                                        let minutos = parseInt(sumaMinutosMuestra-(horas*60));
    
                                        if(actuEstadoDiv == 0){
    
                                            estadoActualReseHTML = `
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 751.37 753.42"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M749.32,339.27c-.7-10.93-1.61-22-4.17-32.61-4.9-20.2-10.35-40.32-16.84-60.06a298.92,298.92,0,0,0-38.18-76.34C678.92,154,667.06,138,654,123.24a348,348,0,0,0-56.9-51.34C566.15,49.6,533,31.52,496.72,19.77c-17.59-5.7-35.79-9.64-53.86-13.72-20.61-4.65-41.6-6.32-62.71-6C369.22.2,358.27.3,347.38,1.11,334.79,2,322.12,3,309.75,5.26a382.61,382.61,0,0,0-64.4,17.66c-26.08,9.77-51,21.75-74,37.41-14.71,10-28.2,21.8-42.68,32.17-5.14,3.68-3.07,6-.38,9.13,1.42,1.63,3.12,3,4.55,4.63,3.81,4.31,7.46,8.75,11.3,13,7.28,8.12,14.58,16.21,22.09,24.12.74.78,3.46.81,4.41.07,6-4.6,11.59-9.68,17.55-14.3a302.47,302.47,0,0,1,50.15-31.33c21.93-10.94,44.79-19.59,68.82-24.42,16.47-3.32,33.19-6.28,49.92-7.2C378,65.07,399.13,64.67,419.87,69c18,3.75,36.1,7.28,53.65,12.58,19.2,5.8,37.28,14.67,54.82,24.54a314.5,314.5,0,0,1,63.81,48c8.76,8.43,16.54,17.93,24.41,27.24,13.86,16.41,25.21,34.52,35,53.6a309,309,0,0,1,22.23,56.26,292.21,292.21,0,0,1,11.49,67c1,20.45,1.21,41.06-2.82,61.33-3,15.31-6,30.67-10,45.75-6,22.66-15.91,43.76-27.32,64.2a278,278,0,0,1-45.3,60.9C586.8,603.55,572.42,615.52,558,627.3c-7.95,6.51-17.1,11.55-25.74,17.27l-22.88-42.41c-24.9,38.17-49.44,75.8-74.34,114l155.27,37.3-26.93-50.54c4.84-3,9.42-5.83,13.93-8.73,25.93-16.66,50.08-35.53,70.51-58.7,12.68-14.38,25.09-29.09,36.45-44.53,17-23.09,29.94-48.54,40.6-75.18,8.49-21.22,15.39-43,19.29-65.43a481.87,481.87,0,0,0,6.93-58.5C752,374.36,750.44,356.76,749.32,339.27Z"/><path d="M345.9,350.86c-13.71,7.43-20.64,19.07-20.08,34.92.86,24.59,21.4,37.32,40.94,36.65a37.48,37.48,0,0,0,28-13.38c2.21-2.61,4.7-3.5,8.17-3.5q69.66.19,139.32.09h6.1V362.71h-6.26q-70.16,0-140.32.06a8.29,8.29,0,0,1-6.61-2.89,63,63,0,0,0-12-9.18c-3.09-1.87-4.53-3.57-4.52-7.5q.24-106.11.12-212.22v-5.66H349.81v6.4q0,106.11,0,212.22C349.86,347.19,349.18,349.08,345.9,350.86Z"/><path d="M12.68,296.92c18.74,4.73,37.37,9.93,56,15.17,2.83.8,3.8.47,4.4-2.45A257.75,257.75,0,0,1,93.68,247.8c8.66-17.65,18.73-34.61,28.31-52.12L68.72,157.93C60.83,170.88,53,182.86,46,195.36c-16.79,30.2-28.67,62.36-36.69,96C8.68,294,8.75,295.93,12.68,296.92Z"/><path d="M98,514.25c-3.57-7.09-6.68-14.41-10.16-22L32.72,530.58a377.12,377.12,0,0,0,56.19,89.35l7.7-6.58c6.74-5.76,13.53-11.46,20.21-17.3,6.46-5.63,12.78-11.41,19.19-17.11,1.84-1.63,2.62-3,.61-5.35A298,298,0,0,1,98,514.25Z"/><path d="M73.58,445.65C69,426.47,66.14,407.05,66,387.29c0-7.42,0-14.85,0-22.19L.36,362.69a364.91,364.91,0,0,0,13.84,117c19.15-9.26,37.8-18.35,56.53-27.27C74,450.82,74.35,448.91,73.58,445.65Z"/><path d="M261.46,665.14a111.75,111.75,0,0,1-14.79-6.34c-19.33-9.22-38-19.5-54.9-32.84-2.13-1.68-4-2.22-6.3,1.14-8.65,12.65-17.95,24.85-26.89,37.3-3,4.19-5.7,8.61-8.54,12.93,4.28,3.18,8.5,6.43,12.84,9.52,20.81,14.84,43.41,26.44,66.72,36.76,3.66,1.63,7.52,2.83,11.39,4.28,7.9-19.53,15.34-38.07,22.91-56.57C265.17,668.24,265.56,666.41,261.46,665.14Z"/><path d="M321.52,683.53c-3.83,20.4-7.83,41.75-12,63.78,33.12,5.45,65.85,7.71,99.71,4.06L389.21,688.5Z"/></g></g></svg>
                                            <span class="estadoReseDataMuestra">En Proceso</span>
                                            <div class="tiempoRestanteDiv">
                                                <span class="tiempoRestaSpan">Tiempo Restante:</span>
                                                <div class="divRestante">
                                                    <span class="spanHorasRestantes">0</span>
                                                    <span>H</span>
                                                    <span class="spanMinusRestantes">0</span>
                                                    <span>m</span>
                                                </div>
                                            </div>
                                            `;
    
                                            document.querySelector(".divEstadoGene").innerHTML="";
                                            document.querySelector(".divEstadoGene").classList.replace(claseEstiloDivEstado, "divEstado");
    
                                            document.querySelector(".claseDivOcul").value = "divEstado";
    
                                            rangoEstadoReseDiv.selectNode(document.getElementsByTagName("div").item(0));
                                            const estadoDivGeneInfo =
                                                rangoEstadoReseDiv.createContextualFragment(estadoActualReseHTML);
                                            document.querySelector(".divEstadoGene").appendChild(estadoDivGeneInfo);
    
                                            actuEstadoDiv = 1;
    
                                        }
                                        
                                        document.querySelector(".spanHorasRestantes").textContent = horas;
                                        document.querySelector(".spanMinusRestantes").textContent = minutos;
                                        
                                    }else{
    
                                        if(horaActualSuma >= horaSaleReseSuma){
    
                                            estadoActualReseHTML = `
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.1 471.25"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M310.78,145.6C288,174,264.6,202,241.5,230.13c-5.22,6.36-10.64,7-16.54,1.18-4.16-4.1-8.6-7.85-12.88-11.78Q184.33,194,156.78,168.3a13.27,13.27,0,0,0-7.47-3.69c-5.87.25-9,4.65-12.43,8.41-7.89,8.55-15.91,17-23.5,25.79-4.33,5-9.66,9.14-13.25,14.89-2.8,4.5-2.12,8,1.52,11.54,5.75,5.55,11.47,11.12,17.41,16.48,17.18,15.48,34.08,31.28,51.1,47l63.44,58.49c6,5.54,10.43,5.14,15.5-1.1q21.24-26.13,42.65-52.11c13.51-16.45,27.14-32.81,40.59-49.31,16-19.6,31.39-39.67,47.81-58.89,20-23.41,38.91-47.71,58.59-71.38,4.81-5.77,4.37-9.37-.83-14.9a44.58,44.58,0,0,0-4.42-4c-13.39-10.94-26.84-21.8-40.2-32.78C387.39,57.81,383,58,377.9,63.84c-7.83,9.07-15.94,17.94-23.12,27.5C340.77,110,325.34,127.42,310.78,145.6Z"/><path d="M471.2,238.34c-1.58-1-2.79.55-3.93,1.38q-9.11,6.59-18.09,13.34c-2.22,1.68-4.14,1.58-6.31-.07-4.1-3.12-8.29-6.12-12.46-9.15-2.35-1.72-4.75-5.56-7.19-4.35s-1.93,5.66-2.06,8.74c-.76,18-5,35.26-11.08,52.06-6.6,18.31-16.44,34.92-28.38,50.27-1.58,2-2.94,4.06-2.65,6.8,1.26,8.22,2.54,16.44,3.78,24.66.44,3,2.36,4.27,5.06,4.69,7.88,1.24,15.77,2.41,23.65,3.68,1.92.3,3.11-.54,4.25-1.93a271.71,271.71,0,0,0,23.9-33.8c11-18.6,18.52-38.61,24.41-59.37,4.95-17.45,6.34-35.33,7.86-53.23C472.07,240.77,472.44,239.12,471.2,238.34Z"/><path d="M74.5,69.23Q84.6,70.85,94.73,72.3c3.85.55,6.17,1.89,6.57,6.49A151.25,151.25,0,0,0,105.37,103c2.69-2.2,4.95-3.88,7-5.76,29.09-26.36,63.44-41,102.12-46.08a7.83,7.83,0,0,0,5.79-3.33c4.54-6.16,9.07-12.34,13.92-18.26,2.34-2.86,2.39-5.1.21-8C229.7,15.37,225.12,9,220.5,2.72c-1.05-1.43-2.21-2.35-4.15-2.16a252.4,252.4,0,0,0-53.67,10.92A232.91,232.91,0,0,0,115,33.09,229.79,229.79,0,0,0,73.11,65.2c-.82.8-2,1.6-1.63,2.87C71.88,69.51,73.43,69.06,74.5,69.23Z"/><path d="M395.8,402.23c-7.06-1.09-14.13-2.22-21.22-3.13-2.81-.36-4.1-1.73-4.46-4.43-1-7.59-2.07-15.16-3.11-22.74-.13-1,.08-2.16-1-2.66-1.37-.65-2.1.61-2.93,1.34-3.25,2.85-6.38,5.85-9.71,8.6-13.67,11.34-28.56,21-45,27.53s-33.32,11.6-51,13.26a8.26,8.26,0,0,0-6.31,3.5c-4.8,6.6-9.6,13.2-14.49,19.73-1.77,2.35-1.77,4.4,0,6.74,3.84,5,7.72,10,11.26,15.29,2.5,3.71,5.49,5.72,10.06,5,4.79-.59,9.59-1.08,14.36-1.78a229.83,229.83,0,0,0,75.36-25.25,226.9,226.9,0,0,0,49.61-35.87c1-1,2.87-1.84,2.41-3.49S397.23,402.45,395.8,402.23Z"/><path d="M5.39,231.26c5.5-4,11.06-8,16.48-12.12,2.73-2.09,4.92-1.81,7.55.3,5.45,4.38,11.2,8.38,16.66,12.74,3.21,2.56,4,1.44,4.3-2,.58-7.46,1-15,2.1-22.35a187.11,187.11,0,0,1,37.57-87.13,9.33,9.33,0,0,0,2.09-6c-1.33-8.38-2.7-16.76-3.94-25.15-.46-3.09-2.37-4-5.15-4.39-6.92-.9-13.88-1.7-20.72-3.07-3.45-.7-5.46,0-7.65,2.76a247.14,247.14,0,0,0-41.23,73.14C5.32,181,1.68,204.66.17,228.83c-.09,1.43-.64,3.3.9,4.13C2.87,233.93,4.08,232.21,5.39,231.26Z"/><path d="M103,365.73c.33-1.26-1.09-1.9-1.85-2.75-16.54-18.3-30.06-38.4-38.62-61.77a203.07,203.07,0,0,1-10.53-42,12.74,12.74,0,0,0-5.49-9.05c-5.78-4.21-11.66-8.29-17.24-12.76-3-2.42-5.5-2.43-8.45-.14-5.39,4.18-10.88,8.23-16.37,12.28-2.17,1.6-3.52,3.52-3.23,6.32A223.53,223.53,0,0,0,5,282.51a250.19,250.19,0,0,0,19.54,57,220.8,220.8,0,0,0,40,57.53c1.08,1.11,2,3.34,3.85,2.51,1.5-.68,1.49-2.93,1.49-4.53,0-6,1.79-11.85,2.2-17.82.28-4.14,2.14-6.34,6.34-6.89,7.09-.93,14.14-2.12,21.2-3.21C100.82,366.88,102.54,367.4,103,365.73Z"/><path d="M232,425.12c.72-1,2.37-2,1.39-3.35-.48-.66-2.12-.54-3.25-.65-8.28-.79-16.66-1-24.82-2.41a188.35,188.35,0,0,1-84.11-37.18,9.21,9.21,0,0,0-7.83-2c-7.71,1.32-15.44,2.53-23.2,3.58-3.15.42-4.71,1.91-5.14,5-1,7.09-1.93,14.17-3.15,21.21-.5,2.87.47,4.77,2.46,6.58a181.94,181.94,0,0,0,29,21.09c21.82,13.05,45,22.86,70,28.42,14.2,3.16,28.55,4.66,43,5.69,2.07-.43,5,1.07,6.07-.86s-1.56-3.7-2.77-5.38c-3.49-4.87-7.08-9.65-10.64-14.46-2.06-2.77-2.08-5.26.19-8.12C223.61,436.7,227.78,430.89,232,425.12Z"/><path d="M251.62,20.88c2.59,3.39,2.75,6.16-.31,9.68-4.34,5-8,10.62-11.89,16-1.75,2.4-1.21,3.59,1.84,3.54a123.16,123.16,0,0,1,13.43.81c25.92,2.42,50,10.53,72.64,23.13,3.07,1.71,5.1,1.68,7.29-1,8.82-10.82,17.61-21.68,26.61-32.34,2.25-2.67,2-4.08-.88-5.72-11-6.29-22.06-12.33-33.76-17.15a261.41,261.41,0,0,0-43.8-13.25A209.8,209.8,0,0,0,236.48,0c.9,1.5,1.27,2.23,1.74,2.87C242.67,8.88,247.09,14.93,251.62,20.88Z"/><path d="M416.17,191.41c1.82,7.94,4.1,15.82,4.06,24.08a5.94,5.94,0,0,0,2.79,5q9.87,7.17,19.63,14.53c2.11,1.59,4.11,2,6.37.36,6.41-4.77,12.85-9.5,19.27-14.25a6.26,6.26,0,0,0,2.78-5.59c-.31-2.14-.75-4.27-.92-6.42-1.71-21.63-7.63-42.19-15.63-62.22-2.09-5.25-2.88-5.25-6.35-1-9.86,12.14-19.71,24.28-29.72,36.3A9.75,9.75,0,0,0,416.17,191.41Z"/></g></g></svg>
                                            <span class="estadoReseDataMuestra">Terminada</span>
                                            `;
    
                                            document.querySelector(".divEstadoGene").innerHTML="";
                                            document.querySelector(".divEstadoGene").classList.replace(claseEstiloDivEstado, "estadoDivTerminada");
    
                                            rangoEstadoReseDiv.selectNode(document.getElementsByTagName("div").item(0));
                                            const estadoDivGeneInfo =
                                                rangoEstadoReseDiv.createContextualFragment(estadoActualReseHTML);
                                            document.querySelector(".divEstadoGene").appendChild(estadoDivGeneInfo);
    
                                            actuEstadoDiv = 0;
                                            actualizaEnProceso = 0;
    
                                            clearInterval(intervalTiempoRestante);
                                            
                                            intervalTiempoRestante = null;
    
                                        }
    
                                    }
    
                                }else{
    
                                    clearInterval(intervalTiempoRestante);
                                    intervalTiempoRestante = null;
    
                                    actuEstadoDiv = 0;
                                    actualizaEnProceso = 0;
    
                                }

                            }
    
                        }, 500);
    
                    }else{
                        
                        // Si existe un intervalo previo, limpiar y reiniciarlo
                        clearInterval(intervalTiempoRestante);
                        intervalTiempoRestante = null;
                        actuEstadoDiv = 0;
                        actualizaEnProceso = 0;

                        intervaloTiempoRestanteRese();
    
                    }

                }else{

                    // Si existe un intervalo en ese momento, se elimina
                    if(intervalTiempoRestante != null){

                        clearInterval(intervalTiempoRestante);
                        intervalTiempoRestante = null;
                        actuEstadoDiv = 0;
                        actualizaEnProceso = 0;

                    }

                }

            };

            intervaloTiempoRestanteRese();

        //---------------------------------------------------------------------------------------------------------------------

        // FUNCIÓN: ver detalles de la reserva al dar click en el ojo

            const rangoInfoReserva = document.createRange();

            var otrosMiembrosHtml = ``; 

            function verDetallesReserva(id){
                
                if(document.querySelector(".spanErrorConfir") != null){
                    document.querySelector(".spanErrorConfir").textContent = "";
                }

                let idRese = id;

                let formReserva = new FormData();

                formReserva.append("idReservaDatos", idRese);

                fetch(urlBuscarInfoAdminDB, {
                    method: "POST",
                    body: formReserva,
                })
                    .then((response) => response.json())
                    .then((data) => {

                        if(data.length != 0){

                            let estadoHTML = "";

                            let precioHora = 0;
                            let iva = 0;
                            let descuento = 0;
                            let comision = 0;
                            let precioHoraT = 0;

                            let iva2 = "";
                            let descuento2 = "";
                            let comision2 = "";

                            if(data[0]["reserTipo"] == "hora"){

                                precioHora = Number(data[0]["factuSubTotal"]);
                                iva = (Number(precioHora)*(Number(data[0]["ivaFactura"])/100));
                                descuento = (Number(precioHora)*(Number(data[0]["descuFactura"])/100));
                                comision = (Number(precioHora)*(Number(data[0]["comisionReserva"])/100));
                                precioHoraT = ((precioHora+iva)-descuento);

                                iva2 = data[0]["ivaFactura"]+"% - ("+iva+" COP)";
                                descuento2 = data[0]["descuFactura"]+"% - ("+descuento+" COP)";
                                comision2 = data[0]["comisionReserva"]+"% - ("+comision+" COP)";

                            }

                            if(data[0]["estadoReserva"] == "En Proceso"){

                                claseEstadoDiv = "divEstado";
                                estadoHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 751.37 753.42"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M749.32,339.27c-.7-10.93-1.61-22-4.17-32.61-4.9-20.2-10.35-40.32-16.84-60.06a298.92,298.92,0,0,0-38.18-76.34C678.92,154,667.06,138,654,123.24a348,348,0,0,0-56.9-51.34C566.15,49.6,533,31.52,496.72,19.77c-17.59-5.7-35.79-9.64-53.86-13.72-20.61-4.65-41.6-6.32-62.71-6C369.22.2,358.27.3,347.38,1.11,334.79,2,322.12,3,309.75,5.26a382.61,382.61,0,0,0-64.4,17.66c-26.08,9.77-51,21.75-74,37.41-14.71,10-28.2,21.8-42.68,32.17-5.14,3.68-3.07,6-.38,9.13,1.42,1.63,3.12,3,4.55,4.63,3.81,4.31,7.46,8.75,11.3,13,7.28,8.12,14.58,16.21,22.09,24.12.74.78,3.46.81,4.41.07,6-4.6,11.59-9.68,17.55-14.3a302.47,302.47,0,0,1,50.15-31.33c21.93-10.94,44.79-19.59,68.82-24.42,16.47-3.32,33.19-6.28,49.92-7.2C378,65.07,399.13,64.67,419.87,69c18,3.75,36.1,7.28,53.65,12.58,19.2,5.8,37.28,14.67,54.82,24.54a314.5,314.5,0,0,1,63.81,48c8.76,8.43,16.54,17.93,24.41,27.24,13.86,16.41,25.21,34.52,35,53.6a309,309,0,0,1,22.23,56.26,292.21,292.21,0,0,1,11.49,67c1,20.45,1.21,41.06-2.82,61.33-3,15.31-6,30.67-10,45.75-6,22.66-15.91,43.76-27.32,64.2a278,278,0,0,1-45.3,60.9C586.8,603.55,572.42,615.52,558,627.3c-7.95,6.51-17.1,11.55-25.74,17.27l-22.88-42.41c-24.9,38.17-49.44,75.8-74.34,114l155.27,37.3-26.93-50.54c4.84-3,9.42-5.83,13.93-8.73,25.93-16.66,50.08-35.53,70.51-58.7,12.68-14.38,25.09-29.09,36.45-44.53,17-23.09,29.94-48.54,40.6-75.18,8.49-21.22,15.39-43,19.29-65.43a481.87,481.87,0,0,0,6.93-58.5C752,374.36,750.44,356.76,749.32,339.27Z"/><path d="M345.9,350.86c-13.71,7.43-20.64,19.07-20.08,34.92.86,24.59,21.4,37.32,40.94,36.65a37.48,37.48,0,0,0,28-13.38c2.21-2.61,4.7-3.5,8.17-3.5q69.66.19,139.32.09h6.1V362.71h-6.26q-70.16,0-140.32.06a8.29,8.29,0,0,1-6.61-2.89,63,63,0,0,0-12-9.18c-3.09-1.87-4.53-3.57-4.52-7.5q.24-106.11.12-212.22v-5.66H349.81v6.4q0,106.11,0,212.22C349.86,347.19,349.18,349.08,345.9,350.86Z"/><path d="M12.68,296.92c18.74,4.73,37.37,9.93,56,15.17,2.83.8,3.8.47,4.4-2.45A257.75,257.75,0,0,1,93.68,247.8c8.66-17.65,18.73-34.61,28.31-52.12L68.72,157.93C60.83,170.88,53,182.86,46,195.36c-16.79,30.2-28.67,62.36-36.69,96C8.68,294,8.75,295.93,12.68,296.92Z"/><path d="M98,514.25c-3.57-7.09-6.68-14.41-10.16-22L32.72,530.58a377.12,377.12,0,0,0,56.19,89.35l7.7-6.58c6.74-5.76,13.53-11.46,20.21-17.3,6.46-5.63,12.78-11.41,19.19-17.11,1.84-1.63,2.62-3,.61-5.35A298,298,0,0,1,98,514.25Z"/><path d="M73.58,445.65C69,426.47,66.14,407.05,66,387.29c0-7.42,0-14.85,0-22.19L.36,362.69a364.91,364.91,0,0,0,13.84,117c19.15-9.26,37.8-18.35,56.53-27.27C74,450.82,74.35,448.91,73.58,445.65Z"/><path d="M261.46,665.14a111.75,111.75,0,0,1-14.79-6.34c-19.33-9.22-38-19.5-54.9-32.84-2.13-1.68-4-2.22-6.3,1.14-8.65,12.65-17.95,24.85-26.89,37.3-3,4.19-5.7,8.61-8.54,12.93,4.28,3.18,8.5,6.43,12.84,9.52,20.81,14.84,43.41,26.44,66.72,36.76,3.66,1.63,7.52,2.83,11.39,4.28,7.9-19.53,15.34-38.07,22.91-56.57C265.17,668.24,265.56,666.41,261.46,665.14Z"/><path d="M321.52,683.53c-3.83,20.4-7.83,41.75-12,63.78,33.12,5.45,65.85,7.71,99.71,4.06L389.21,688.5Z"/></g></g></svg>
                                <span class="estadoReseDataMuestra">En Proceso</span>
                                <div class="tiempoRestanteDiv">
                                    <span class="tiempoRestaSpan">Tiempo Restante:</span>
                                    <div class="divRestante">
                                        <span class="spanHorasRestantes">0</span>
                                        <span>H</span>
                                        <span class="spanMinusRestantes">0</span>
                                        <span>m</span>
                                    </div>
                                </div>
                                `;

                            }else{

                                if(data[0]["estadoReserva"] == "Pendiente"){

                                    claseEstadoDiv = "estadoDivPendiente";
                                    estadoHTML = `
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 287.68 323.5"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M269.67,216.3C288,181.19,292.16,144.24,283,105.91c-7.89-33-24.92-60.27-52.69-80.21C204.75,7.36,175.7.2,144.64,0a161.36,161.36,0,0,0-37.06,3.8c-33.38,7.46-60.9,24.27-80.42,52.6C-.19,96.11-6.15,139.8,6,186c8.35,31.73,25.76,57.7,52.87,76.65C82.31,279,108.77,286.08,137,287.2c2.72.11,4.06,1,5.41,3.32a65.64,65.64,0,0,0,30.08,26.92c15.09,6.9,30.78,7.15,46.74,4.49,15.63-2.61,29.12-9.55,39.08-21.92,19.16-23.78,21.92-50.25,11.38-78.48C269,219.72,268.65,218.24,269.67,216.3Zm-68.23,83.22c-25.72-.84-45.88-21.76-45.79-49.06-.34-24.17,19.75-47.47,49.31-47,26.62.46,46.66,21.62,46.9,49.66C252.07,276.52,232.6,300.53,201.44,299.52Zm58.78-155.74c-6.73-.17-13.47-.09-20.2-.05-7.29,0-12.42,5-12.4,12s5.2,11.88,12.53,11.92c6,0,12,.17,18-.07,2.67-.1,2.85.88,2.35,3a136.69,136.69,0,0,1-8.57,25.77c-9.84-8.26-20.7-13.61-32.93-15.58-40.12-6.45-77.72,12-86.08,57.65a65.69,65.69,0,0,0-.41,21.94c.34,2.2-.29,2.51-2.24,2.38a103.29,103.29,0,0,1-36.32-8.85c-35.83-16.24-57.59-43.77-65.72-82.21-.66-3.12-.18-4.35,3.42-4.11,5.34.36,10.72.13,16.08.09,7.12-.06,12.5-5.34,12.42-12.13-.07-6.61-5.42-11.75-12.37-11.8-6.36,0-12.72-.08-19.07,0-2.23,0-3.27-.25-3.18-2.95,1.17-35.44,13.21-66,40.26-89.8C81.24,37.4,99.56,29.55,119.85,26.2c3.19-.53,6.4-.94,9.6-1.45,1.91-.3,2.57.33,2.53,2.37-.13,6.85-.07,13.71,0,20.57,0,7.2,5.15,12.6,11.92,12.63s12-5.39,12-12.54c0-6.86.06-13.72,0-20.58,0-1.89.33-2.59,2.45-2.36,30.55,3.26,57.14,14.55,77.5,38.34,13.72,16.06,21.83,34.77,25.58,55.46a182.69,182.69,0,0,1,2.18,21.9C263.71,143.28,262.75,143.84,260.22,143.78Z" /><path d="M155.87,85.07c0-7.78-5-13.25-12.11-13.18-6.91.06-11.82,5.46-11.82,13.07,0,18.58-.05,37.15.05,55.73,0,2.41-.58,3.12-3.06,3.09-10.72-.14-21.44-.08-32.16-.05-7.3,0-12.65,5-12.72,11.8s5.35,12.12,12.79,12.13q23,0,46,0c8.07,0,13-4.95,13-13,0-11.6,0-23.19,0-34.79S155.88,96.67,155.87,85.07Z" /><path d="M204.69,217c-5.49-.19-8.31,3.14-8.32,9.43.64,8.79,1.16,17.1,1.88,25.4.28,3.33,0,6.73,1.09,10,.68,2,1.75,3.71,4.07,3.75s3.59-1.48,4.14-3.61a24,24,0,0,0,.71-3.63c.73-7.18,1.46-14.35,2.09-21.53.47-5.31,1.27-10.6-.49-15.88A5.07,5.07,0,0,0,204.69,217Z"/><path d="M203.56,273.85a6.62,6.62,0,0,0-6.7,6.9,6.9,6.9,0,1,0,6.7-6.9Z" /></g></g></svg>
                                    <span class="estadoReseDataMuestra">Pendiente</span>
                                    `;

                                }else{

                                    if(data[0]["estadoReserva"] == "Terminada"){

                                        claseEstadoDiv = "estadoDivTerminada";
                                        estadoHTML = `
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.1 471.25"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M310.78,145.6C288,174,264.6,202,241.5,230.13c-5.22,6.36-10.64,7-16.54,1.18-4.16-4.1-8.6-7.85-12.88-11.78Q184.33,194,156.78,168.3a13.27,13.27,0,0,0-7.47-3.69c-5.87.25-9,4.65-12.43,8.41-7.89,8.55-15.91,17-23.5,25.79-4.33,5-9.66,9.14-13.25,14.89-2.8,4.5-2.12,8,1.52,11.54,5.75,5.55,11.47,11.12,17.41,16.48,17.18,15.48,34.08,31.28,51.1,47l63.44,58.49c6,5.54,10.43,5.14,15.5-1.1q21.24-26.13,42.65-52.11c13.51-16.45,27.14-32.81,40.59-49.31,16-19.6,31.39-39.67,47.81-58.89,20-23.41,38.91-47.71,58.59-71.38,4.81-5.77,4.37-9.37-.83-14.9a44.58,44.58,0,0,0-4.42-4c-13.39-10.94-26.84-21.8-40.2-32.78C387.39,57.81,383,58,377.9,63.84c-7.83,9.07-15.94,17.94-23.12,27.5C340.77,110,325.34,127.42,310.78,145.6Z"/><path d="M471.2,238.34c-1.58-1-2.79.55-3.93,1.38q-9.11,6.59-18.09,13.34c-2.22,1.68-4.14,1.58-6.31-.07-4.1-3.12-8.29-6.12-12.46-9.15-2.35-1.72-4.75-5.56-7.19-4.35s-1.93,5.66-2.06,8.74c-.76,18-5,35.26-11.08,52.06-6.6,18.31-16.44,34.92-28.38,50.27-1.58,2-2.94,4.06-2.65,6.8,1.26,8.22,2.54,16.44,3.78,24.66.44,3,2.36,4.27,5.06,4.69,7.88,1.24,15.77,2.41,23.65,3.68,1.92.3,3.11-.54,4.25-1.93a271.71,271.71,0,0,0,23.9-33.8c11-18.6,18.52-38.61,24.41-59.37,4.95-17.45,6.34-35.33,7.86-53.23C472.07,240.77,472.44,239.12,471.2,238.34Z"/><path d="M74.5,69.23Q84.6,70.85,94.73,72.3c3.85.55,6.17,1.89,6.57,6.49A151.25,151.25,0,0,0,105.37,103c2.69-2.2,4.95-3.88,7-5.76,29.09-26.36,63.44-41,102.12-46.08a7.83,7.83,0,0,0,5.79-3.33c4.54-6.16,9.07-12.34,13.92-18.26,2.34-2.86,2.39-5.1.21-8C229.7,15.37,225.12,9,220.5,2.72c-1.05-1.43-2.21-2.35-4.15-2.16a252.4,252.4,0,0,0-53.67,10.92A232.91,232.91,0,0,0,115,33.09,229.79,229.79,0,0,0,73.11,65.2c-.82.8-2,1.6-1.63,2.87C71.88,69.51,73.43,69.06,74.5,69.23Z"/><path d="M395.8,402.23c-7.06-1.09-14.13-2.22-21.22-3.13-2.81-.36-4.1-1.73-4.46-4.43-1-7.59-2.07-15.16-3.11-22.74-.13-1,.08-2.16-1-2.66-1.37-.65-2.1.61-2.93,1.34-3.25,2.85-6.38,5.85-9.71,8.6-13.67,11.34-28.56,21-45,27.53s-33.32,11.6-51,13.26a8.26,8.26,0,0,0-6.31,3.5c-4.8,6.6-9.6,13.2-14.49,19.73-1.77,2.35-1.77,4.4,0,6.74,3.84,5,7.72,10,11.26,15.29,2.5,3.71,5.49,5.72,10.06,5,4.79-.59,9.59-1.08,14.36-1.78a229.83,229.83,0,0,0,75.36-25.25,226.9,226.9,0,0,0,49.61-35.87c1-1,2.87-1.84,2.41-3.49S397.23,402.45,395.8,402.23Z"/><path d="M5.39,231.26c5.5-4,11.06-8,16.48-12.12,2.73-2.09,4.92-1.81,7.55.3,5.45,4.38,11.2,8.38,16.66,12.74,3.21,2.56,4,1.44,4.3-2,.58-7.46,1-15,2.1-22.35a187.11,187.11,0,0,1,37.57-87.13,9.33,9.33,0,0,0,2.09-6c-1.33-8.38-2.7-16.76-3.94-25.15-.46-3.09-2.37-4-5.15-4.39-6.92-.9-13.88-1.7-20.72-3.07-3.45-.7-5.46,0-7.65,2.76a247.14,247.14,0,0,0-41.23,73.14C5.32,181,1.68,204.66.17,228.83c-.09,1.43-.64,3.3.9,4.13C2.87,233.93,4.08,232.21,5.39,231.26Z"/><path d="M103,365.73c.33-1.26-1.09-1.9-1.85-2.75-16.54-18.3-30.06-38.4-38.62-61.77a203.07,203.07,0,0,1-10.53-42,12.74,12.74,0,0,0-5.49-9.05c-5.78-4.21-11.66-8.29-17.24-12.76-3-2.42-5.5-2.43-8.45-.14-5.39,4.18-10.88,8.23-16.37,12.28-2.17,1.6-3.52,3.52-3.23,6.32A223.53,223.53,0,0,0,5,282.51a250.19,250.19,0,0,0,19.54,57,220.8,220.8,0,0,0,40,57.53c1.08,1.11,2,3.34,3.85,2.51,1.5-.68,1.49-2.93,1.49-4.53,0-6,1.79-11.85,2.2-17.82.28-4.14,2.14-6.34,6.34-6.89,7.09-.93,14.14-2.12,21.2-3.21C100.82,366.88,102.54,367.4,103,365.73Z"/><path d="M232,425.12c.72-1,2.37-2,1.39-3.35-.48-.66-2.12-.54-3.25-.65-8.28-.79-16.66-1-24.82-2.41a188.35,188.35,0,0,1-84.11-37.18,9.21,9.21,0,0,0-7.83-2c-7.71,1.32-15.44,2.53-23.2,3.58-3.15.42-4.71,1.91-5.14,5-1,7.09-1.93,14.17-3.15,21.21-.5,2.87.47,4.77,2.46,6.58a181.94,181.94,0,0,0,29,21.09c21.82,13.05,45,22.86,70,28.42,14.2,3.16,28.55,4.66,43,5.69,2.07-.43,5,1.07,6.07-.86s-1.56-3.7-2.77-5.38c-3.49-4.87-7.08-9.65-10.64-14.46-2.06-2.77-2.08-5.26.19-8.12C223.61,436.7,227.78,430.89,232,425.12Z"/><path d="M251.62,20.88c2.59,3.39,2.75,6.16-.31,9.68-4.34,5-8,10.62-11.89,16-1.75,2.4-1.21,3.59,1.84,3.54a123.16,123.16,0,0,1,13.43.81c25.92,2.42,50,10.53,72.64,23.13,3.07,1.71,5.1,1.68,7.29-1,8.82-10.82,17.61-21.68,26.61-32.34,2.25-2.67,2-4.08-.88-5.72-11-6.29-22.06-12.33-33.76-17.15a261.41,261.41,0,0,0-43.8-13.25A209.8,209.8,0,0,0,236.48,0c.9,1.5,1.27,2.23,1.74,2.87C242.67,8.88,247.09,14.93,251.62,20.88Z"/><path d="M416.17,191.41c1.82,7.94,4.1,15.82,4.06,24.08a5.94,5.94,0,0,0,2.79,5q9.87,7.17,19.63,14.53c2.11,1.59,4.11,2,6.37.36,6.41-4.77,12.85-9.5,19.27-14.25a6.26,6.26,0,0,0,2.78-5.59c-.31-2.14-.75-4.27-.92-6.42-1.71-21.63-7.63-42.19-15.63-62.22-2.09-5.25-2.88-5.25-6.35-1-9.86,12.14-19.71,24.28-29.72,36.3A9.75,9.75,0,0,0,416.17,191.41Z"/></g></g></svg>
                                        <span class="estadoReseDataMuestra">Terminada</span>
                                        `;

                                    }else{

                                        if(data[0]["estadoReserva"] == "Cancelada"){

                                            claseEstadoDiv = "estadoDivCancelada";
                                            estadoHTML = `
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320.17 319.97"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M160.16,0C71.19-.06.1,70.77,0,159.82c-.1,88.7,70.49,160,159.83,160.15,88.81.14,159.3-70.59,160.34-159.82C319.38,71.22,249.16.06,160.16,0ZM224.8,259.62a118.74,118.74,0,0,1-63.09,19.23c-57.71,0-106.93-39.78-118-94.6-6.45-31.87-.69-61.66,16.75-89.18,1.82-2.86,3-2.73,5.27-.46q79.8,80,159.77,159.76C227.91,256.81,227.44,257.92,224.8,259.62Zm34.77-34.75c-1.82,2.88-3,2.73-5.25.46Q174.61,145.47,94.73,65.76c-2.51-2.5-2.29-3.64.59-5.49a118.43,118.43,0,0,1,62.57-19.14c61.25,0,111.16,43.4,119.63,102.26C281.75,172.74,275.36,199.85,259.57,224.87Z"/></g></g></svg>
                                            <span class="estadoReseDataMuestra">Cancelada</span>
                                            `;

                                        }

                                    }

                                }

                            }

                            let reservaInfoHTML = `
                            <div class="btnDivGene">
                                <button class="" onclick="verDetallesReserva(${id})">Reserva</button>
                                <button class="btnOtrasOpciones" onclick="otrasOpcionesRese(${id}, '${data[0]["estadoReserva"]}')">Otras Opciones</button>
                            </div>
                            <div class="divBaseGene">
                                <input type="hidden" value="${data[0]["id_reserva"]}" class="idReseOculto">
                                <input type="hidden" value="${data[0]["horaEntradaR"]}" class="horaEntraReseOculta">
                                <input type="hidden" value="${data[0]["horaSalidaR"]}" class="horaSaleReseOculta">
                                <input type="hidden" value="${data[0]["estadoReserva"]}" class="estadoReseOculto">
                                <input type="hidden" value="${data[0]["fechaReserva"]}" class="fechaIniReseOculto">
                                <input type="hidden" value="${data[0]["reserDiaFinal"]}" class="fechaFinReseOculto">
                                <div class="divCodigos">
                                    <div>
                                        <span>Código:</span>
                                        <span>${data[0]["codigoReserva"]}</span>
                                    </div>
                                    <div>
                                        <span>Id:</span>
                                        <span>${id}</span>
                                    </div>
                                </div>
                                <div class="divTipoRese">
                                    <span>Tipo de Reserva:</span>
                                    <span>${data[0]["reserTipo"].toUpperCase()}</span>
                                </div>
                                <div class="divFechasCompra">
                                    <div>
                                        <span>Fecha de Compra:</span>
                                        <span>${data[0]["fechaCompraReser"]} | ${data[0]["horaCompraReser"]}</span>
                                    </div>
                                </div>
                                <div class="separador"></div>
                                <div class="divFechasEjecucion">
                                    <span class="ejecuTitulo">Ejecución</span>
                                    <div class="divInicioEjecu">
                                        <span>Inicio:</span>
                                        <span>${data[0]["fechaReserva"]} | ${data[0]["horaEntradaR"]}</span>
                                    </div>
                                    <div class="divFinalEjecu">
                                        <span>Final:</span>
                                        <span>${data[0]["reserDiaFinal"]} | ${data[0]["horaSalidaR"]}</span>
                                    </div>
                                    <div class="cantidadDiasHorasDiv">
                                        <span>Duración</span>
                                        <span>${data[0]["reserHorasDuracion"]}</span>
                                        <span>${data[0]["reserHorasDuracion"] > 1 || data[0]["reserHorasDuracion"] == 0 ? "horas" : "hora"}</span>
                                        <span>con</span>
                                        <span>${data[0]["reserMinusDuracion"]}</span>
                                        <span>minutos</span>
                                    </div>
                                    <div class="${claseEstadoDiv} divEstadoGene">
                                        ${estadoHTML}
                                    </div>
                                    <input type="hidden" value="${claseEstadoDiv}" class="claseEstadoDivOculto claseDivOcul">
                                </div>
                                <div class="separador"></div>
                                <div class="userDiv">
                                    <span class="spanMiembro">Miembro</span>
                                    <div class="contenedorUser">
                                        <div class="userBase">
                                            <div class="imgDiv">
                                                <img src="imagesUser/${data[0]["user_imagen"]}" alt="">
                                            </div>
                                            <div class="dataDiv">
                                                <span>${data[0]["user_nombre"]+" "+data[0]["user_apellido"]}</span>
                                                <span>${data[0]["user_empresa"]} | ${data[0]["user_empresaNit"]}</span>
                                                <span>${data[0]["user_cargo"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="productoDiv">
                                    <span class="spanPdt">Producto</span>
                                    <div class="contenedorProd">
                                        <div class="prodBase">
                                            <div class="imgDiv">
                                                <img src="images/productosImages/${data[0]["productoImgPrin"]}" alt="">
                                            </div>
                                            <div class="dataDiv">
                                                <span>${data[0]["produNombre"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="unidadDiv">
                                    <span class="spanUnidad">Unidad</span>
                                    <div class="contenedorUnid">
                                        <div class="unidBase">
                                            <div class="imgDiv">
                                                <img src="images/productosImages/${data[0]["unidad_imagen"]}" alt="">
                                            </div>
                                            <div class="dataDiv">
                                                <span>${data[0]["unidad_nombre"]}</span>
                                                <span>Ocupada</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="separador"></div>
                                <div class="preciosDivGene">
                                    <span class="precioSpan">Precio</span>
                                    <div class="divPrecio">
                                        <div class="precioIndividualDiv">
                                            <span>Precio x Hora</span>
                                            <span>${precioHora} COP</span>
                                        </div>
                                        <div class="ivaDescuDiv">
                                            <div class="divIva">
                                                <span>Iva</span>
                                                <span>${iva2}</span>
                                            </div>
                                            <div class="divDescu">
                                                <span>Descuento</span>
                                                <span>${descuento2}</span>
                                            </div>
                                        </div>
                                        <div class="divComision">
                                            <span>Comisión</span>
                                            <span>${comision2}</span>
                                        </div>
                                        <div class="totalDiv">
                                            <span>TOTAL:</span>
                                            <span>${precioHoraT} COP</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="separador"></div>
                                <div class="divOtrosMiembros">
                                    <span class="spanOtrosMiem">Otros Miembros en la Reserva</span>
                                    <div class="contOtrosMiembros">
                                    </div>
                                </div>
                                <div class="separador"></div>
                                <div class="divOtrosDatos">
                                    <span class="spanOtrosDatos">Otros Datos</span>
                                    <div class="divNumPerso">
                                        <span>Número de Personas:</span>
                                        <span>${data[0]["numPersonas"]}</span>
                                    </div>
                                    <div class="tituloActiDiv">
                                        <div class="divTitulo">
                                            <span>Título</span>
                                            <span>${data[0]["reservaTitulo"]}</span>
                                        </div>
                                        <div class="divActividad">
                                            <span class="actividadSpan">Actividades de la Reservas</span>
                                            <div class="activiContent">
                                                ${data[0]["reservaActividad"]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="separador"></div>
                            </div>
                            `;

                            divReservaData.innerHTML = ""

                            rangoInfoReserva.selectNode(document.getElementsByTagName("div").item(0));
                            const reservaInfo =
                                rangoInfoReserva.createContextualFragment(reservaInfoHTML);
                            divReservaData.appendChild(reservaInfo);

                            //---------------------------------------------------------------------------------------------------------

                            const rangoInfoOMRese = document.createRange();

                            if(data[0]["otrosMiembros"] != ""){

                                let formOtroMiembro = new FormData();

                                formOtroMiembro.append("otrosMiembrosData", data[0]["otrosMiembros"]);

                                fetch(urlBuscarInfoAdminDB, {
                                    method: "POST",
                                    body: formOtroMiembro,
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        
                                        for(let i = 0; i < data.length; i++){

                                            otrosMiembrosHtml += `
                                            <div class="divOMiembro">
                                                <div class="divImg">
                                                    <img src="imagesUser/${data[i]["user_imagen"]}" alt="">
                                                </div>
                                                <div class="divData">
                                                    <span>${data[i]["user_nombre"]+" "+data[i]["user_apellido"]}</span>
                                                    <span>${data[i]["user_empresa"]+" | "+data[i]["user_cargo"]}</span>
                                                </div>
                                            </div>
                                            `;

                                        }

                                        rangoInfoOMRese.selectNode(document.getElementsByTagName("div").item(0));
                                        const otrosMiembrosInfo =
                                            rangoInfoOMRese.createContextualFragment(otrosMiembrosHtml);
                                        document.querySelector(".contOtrosMiembros").appendChild(otrosMiembrosInfo);
                                    
                                    })
                                    .catch((err) => console.log(err));

                            }

                            //---------------------------------------------------------------------------------------------------------

                            intervaloTiempoRestanteRese();

                        }
                    
                    })
                    .catch((err) => console.log(err));

            }

        //---------------------------------------------------------------------------------------------------------------------

        // INTERVALO: llenar la lista de las reservas

            const rangoReservasLista = document.createRange();

            var arrayReservas = [];
            var intervalReservasLista = null;
            var elegidosInputsWhere = "";

            function llenarListReservas(hoy, general){

                if(intervalReservasLista == null){

                    intervalReservasLista = setInterval(()=>{
                        
                        elegidosInputsWhere = 
                        " JOIN `gdrfkbmy_bizlabDB`.`unidades` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_unidad` = `gdrfkbmy_bizlabDB`.`unidades`.`id_unidad` JOIN `gdrfkbmy_bizlabDB`.`usuarios` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_usuario` = `gdrfkbmy_bizlabDB`.`usuarios`.`id_usuario` JOIN `gdrfkbmy_bizlabDB`.`productos` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_producto` = `gdrfkbmy_bizlabDB`.`productos`.`id_producto` WHERE ";
                        let filtrosFechaWhere = "";

                        if(inBusquedaEspecifi.value == "" && hoy == "" && general == ""){

                        // Filtros Tipo/Estado

                            if(
                                filtroRese_TipoRese.options[filtroRese_TipoRese.selectedIndex].text != "" && 
                                filtroRese_TipoRese.options[filtroRese_TipoRese.selectedIndex].text != "Sin Dato"
                            ){

                                let valorTipo = filtroRese_TipoRese.options[filtroRese_TipoRese.selectedIndex].text.toLowerCase();
                                valorTipo = valorTipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                                elegidosInputsWhere += "`reservas`.`reserTipo` = '"+valorTipo+"' AND ";

                            }

                            if(
                                filtroRese_EstadoRese.options[filtroRese_EstadoRese.selectedIndex].text != "" && 
                                filtroRese_EstadoRese.options[filtroRese_EstadoRese.selectedIndex].text != "Sin Dato"
                            ){

                                let valorEstado = filtroRese_EstadoRese.options[filtroRese_EstadoRese.selectedIndex].text;
                                elegidosInputsWhere += "`reservas`.`estadoReserva` = '"+valorEstado+"' AND ";

                            }

                        //---------------------------------------------------------------------------------------------

                        // Filtros por Fecha
                            
                            filtrosFechaCuenta = null;
                            filtrosFechaCuenta = [];

                            if(filtroRese_DiaRese.value == ""){

                                if(filtrosFechaCuenta[0] != ""){
                                    filtrosFechaCuenta.splice(0, 1); 
                                }
                                
                            }

                            if(
                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text == "" ||
                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text == "Mes"
                            ){

                                if(filtrosFechaCuenta[1] != ""){
                                    filtrosFechaCuenta.splice(1, 1); 
                                }

                            }

                            if(filtroRese_AnioRese.value == ""){

                                if(filtrosFechaCuenta[2] != ""){
                                    filtrosFechaCuenta.splice(2, 1); 
                                }

                            }

                            if(filtroRese_DiaRese.value != ""){

                                filtrosFechaCuenta.push(1); 

                            }

                            if(
                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "" && 
                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "Mes"
                            ){

                                filtrosFechaCuenta.push(2); 

                            }

                            if(filtroRese_AnioRese.value != ""){

                                filtrosFechaCuenta.push(3); 

                            }

                            for(let i = 0; i < filtrosFechaCuenta.length; i++){

                                if(filtrosFechaCuenta.length == 1){

                                    if(filtrosFechaCuenta[i] == 1){

                                        if(filtroRese_DiaRese.value != ""){

                                            let valorDia = 
                                                Number(filtroRese_DiaRese.value) < 10 
                                                ? "0"+filtroRese_DiaRese.value
                                                : filtroRese_DiaRese.value;
                
                                            filtrosFechaWhere = "`reservas`.`fechaReserva` LIKE '%"+valorDia+"' ";
                
                                        }

                                    }
        
                                    if(filtrosFechaCuenta[i] == 2){

                                        if(
                                            filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "" && 
                                            filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "Mes"
                                        ){

                                            let valorMes = filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text;
                                            valorMes = mesesNumero[valorMes];
                
                                            filtrosFechaWhere = "`reservas`.`fechaReserva` LIKE '%-"+valorMes+"-%' ";
                
                                        }

                                    }
        
                                    if(filtrosFechaCuenta[i] == 3){

                                        if(filtroRese_AnioRese.value != "" && filtroRese_AnioRese.value.length == 4){

                                            let valorAnio = filtroRese_AnioRese.value;
                                            filtrosFechaWhere += "`reservas`.`fechaReserva` LIKE '"+valorAnio+"%' ";
                
                                        }

                                    }

                                }else{

                                    if(filtrosFechaCuenta.length == 2){

                                        if(filtrosFechaCuenta[i] == 1 && filtrosFechaCuenta[i+1] == 2){

                                            if(
                                                filtroRese_DiaRese.value != "" && 
                                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "" && 
                                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "Mes"
                                            ){

                                                let valorDia = 
                                                    Number(filtroRese_DiaRese.value) < 10 
                                                    ? "0"+filtroRese_DiaRese.value
                                                    : filtroRese_DiaRese.value;

                                                let valorMes = filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text;

                                                let valorDiaMes = mesesNumero[valorMes]+"-"+valorDia;
                    
                                                filtrosFechaWhere += "`reservas`.`fechaReserva` LIKE '%"+valorDiaMes+"'";
                    
                                            }
        
                                        }
            
                                        if(filtrosFechaCuenta[i] == 1 && filtrosFechaCuenta[i+1] == 3){
        
                                            if(
                                                filtroRese_DiaRese.value != "" && 
                                                filtroRese_AnioRese.value != ""
                                            ){
        
                                                let valorAnio = filtroRese_AnioRese.value;
                                                let valorDia = 
                                                    Number(filtroRese_DiaRese.value) < 10 
                                                    ? "0"+filtroRese_DiaRese.value
                                                    : filtroRese_DiaRese.value;
                    
                                                filtrosFechaWhere += "`reservas`.`fechaReserva` LIKE '"+valorAnio+"%"+valorDia+"'";
                    
                                            }
        
                                        }
            
                                        if(filtrosFechaCuenta[i] == 2 && filtrosFechaCuenta[i+1] == 3){
        
                                            if(
                                                filtroRese_AnioRese.value != "" &&
                                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "" && 
                                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "Mes"
                                            ){
                                                
                                                let valorMes = filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text;
                                                valorMes = mesesNumero[valorMes];
                                                let valorAnioMes = filtroRese_AnioRese.value+"-"+valorMes;
                                                filtrosFechaWhere += "`reservas`.`fechaReserva` LIKE '"+valorAnioMes+"%'";
                    
                                            }
        
                                        }

                                    }else{

                                        if(filtrosFechaCuenta.length == 3){

                                            if(
                                                filtroRese_DiaRese.value != "" && 
                                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "" && 
                                                filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text != "Mes" &&
                                                filtroRese_AnioRese.value != ""
                                            ){

                                                let valorDia = 
                                                    Number(filtroRese_DiaRese.value) < 10 
                                                    ? "0"+filtroRese_DiaRese.value
                                                    : filtroRese_DiaRese.value;

                                                let valorMes = filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text;

                                                let valorDiaMesAnio = filtroRese_AnioRese.value+"-"+mesesNumero[valorMes]+"-"+valorDia;

                                                filtrosFechaWhere = "`reservas`.`fechaReserva` = '"+valorDiaMesAnio+"'";

                                            }

                                        }

                                    }

                                }
                                
                            }

                            elegidosInputsWhere += filtrosFechaWhere;

                        //---------------------------------------------------------------------------------------------

                        cuenta = elegidosInputsWhere.length-1;
                        if(elegidosInputsWhere.substring(cuenta-3, cuenta) == "AND"){
                            elegidosInputsWhere = elegidosInputsWhere.substring(0, cuenta-3);
                        }else{
                            if(elegidosInputsWhere.substring(cuenta-6, cuenta) == " WHERE"){
                                elegidosInputsWhere = elegidosInputsWhere.substring(0, cuenta-6);
                            }
                        }

                    }else{

                        if(inBusquedaEspecifi.value){

                            let valorEspecifi = inBusquedaEspecifi.value;
                            elegidosInputsWhere = 
                                " JOIN `gdrfkbmy_bizlabDB`.`unidades` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_unidad` = `gdrfkbmy_bizlabDB`.`unidades`.`id_unidad` JOIN `gdrfkbmy_bizlabDB`.`usuarios` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_usuario` = `gdrfkbmy_bizlabDB`.`usuarios`.`id_usuario` JOIN `gdrfkbmy_bizlabDB`.`productos` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_producto` = `gdrfkbmy_bizlabDB`.`productos`.`id_producto` WHERE `reservas`.`codigoReserva` LIKE '%"+valorEspecifi+"%' OR `reservas`.`nombreUser` LIKE '%"+valorEspecifi+"%'";

                        }else{

                            if(hoy != ""){

                                elegidosInputsWhere = 
                                    " JOIN `gdrfkbmy_bizlabDB`.`unidades` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_unidad` = `gdrfkbmy_bizlabDB`.`unidades`.`id_unidad` JOIN `gdrfkbmy_bizlabDB`.`usuarios` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_usuario` = `gdrfkbmy_bizlabDB`.`usuarios`.`id_usuario` JOIN `gdrfkbmy_bizlabDB`.`productos` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_producto` = `gdrfkbmy_bizlabDB`.`productos`.`id_producto` WHERE `reservas`.`fechaReserva` = '"+cadenaFechaActual+"'";

                            }else{

                                if(general != ""){

                                    elegidosInputsWhere = 
                                    " JOIN `gdrfkbmy_bizlabDB`.`unidades` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_unidad` = `gdrfkbmy_bizlabDB`.`unidades`.`id_unidad` JOIN `gdrfkbmy_bizlabDB`.`usuarios` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_usuario` = `gdrfkbmy_bizlabDB`.`usuarios`.`id_usuario` JOIN `gdrfkbmy_bizlabDB`.`productos` ON `gdrfkbmy_bizlabDB`.`reservas`.`id_producto` = `gdrfkbmy_bizlabDB`.`productos`.`id_producto` ";
                                
                                }

                            }

                        }

                    }

                    let formReservasLista = new FormData();

                    formReservasLista.append("whereReservasAdmin", elegidosInputsWhere);

                    fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formReservasLista,
                    })
                        .then((response) => response.json())
                        .then((data) => {

                            let listaReservasHTML = ``;

                            if(data.length != 0){

                                let paginasCant = data.length/10;
                                paginasCant = Math.ceil(paginasCant);

                                paginaCantGene = paginasCant;

                                document.querySelector(".spanPagina").textContent = (posicionPaginaGene+1)+" - "+paginasCant; 

                                if(posicionPaginaGene == 0){
                                    document.querySelector(".buttonAtrasC").setAttribute("disabled", "");
                                    document.querySelector(".buttonAtras").setAttribute("disabled", "");
                                    document.querySelector(".buttonAtrasC").classList.replace("buttonAtrasC-D", "buttonAtrasC-B");
                                    document.querySelector(".buttonAtras").classList.replace("buttonAtras-D", "buttonAtras-B");
                                }else{
                                    document.querySelector(".buttonAtrasC").removeAttribute("disabled");
                                    document.querySelector(".buttonAtras").removeAttribute("disabled");
                                    document.querySelector(".buttonAtrasC").classList.replace("buttonAtrasC-B", "buttonAtrasC-D");
                                    document.querySelector(".buttonAtras").classList.replace("buttonAtras-B", "buttonAtras-D");
                                }

                                if(posicionPaginaGene == (paginasCant-1)){
                                    document.querySelector(".buttonAdelante").setAttribute("disabled", "");
                                    document.querySelector(".buttonAdelanteC").setAttribute("disabled", "");
                                    document.querySelector(".buttonAdelante").classList.replace("buttonAdelante-D", "buttonAdelante-B");
                                    document.querySelector(".buttonAdelanteC").classList.replace("buttonAdelanteC-D", "buttonAdelanteC-B");
                                }else{
                                    document.querySelector(".buttonAdelante").removeAttribute("disabled");
                                    document.querySelector(".buttonAdelanteC").removeAttribute("disabled");
                                    document.querySelector(".buttonAdelante").classList.replace("buttonAdelante-B", "buttonAdelante-D");
                                    document.querySelector(".buttonAdelanteC").classList.replace("buttonAdelanteC-B", "buttonAdelanteC-D");
                                }

                                let i = posicionPaginaGene * 10;
                                let final = i+10;
                                i = i > 0 ? i - 1: i;

                                for1:
                                for(i; i < final; i++){
                                    
                                    if(data[i] != undefined){

                                        let tipoRese = "";
                                        let estadoReseBase = "";
                                        let estadoReseSpan = "";
                                        let textoEstadoRese = "";
                                        let textoTipoRese = "";
            
                                        if(data[i]["reserTipo"] == "hora"){
                                            tipoRese = "divReservaXH";
                                            textoTipoRese = "Reserva x Hora";
                                        }else{
                                            if(data[i]["reserTipo"] == "dia"){
                                                tipoRese = "divReservaXD";
                                                textoTipoRese = "Reserva x Día";
                                            }else{
                                                if(data[i]["reserTipo"] == "semana"){
                                                    tipoRese = "divReservaXS";
                                                    textoTipoRese = "Reserva x Semana";
                                                }
                                            }
                                        }
            
                                        if(data[i]["estadoReserva"] == "Pendiente"){
                                            estadoReseBase = "estadoDivP";
                                            estadoReseSpan = "estadoSpanP";
                                            textoEstadoRese = "Pendiente";
                                        }else{
                                            if(data[i]["estadoReserva"] == "En Proceso"){
                                                estadoReseBase = "estadoDivEP";
                                                estadoReseSpan = "estadoSpanEP";
                                                textoEstadoRese = "En Proceso";
                                            }else{
                                                if(data[i]["estadoReserva"] == "Terminada"){
                                                    estadoReseBase = "estadoDivT";
                                                    estadoReseSpan = "estadoSpanT";
                                                    textoEstadoRese = "Terminada";
                                                }else{
                                                    if(data[i]["estadoReserva"] == "Cancelada"){
                                                        estadoReseBase = "estadoDivC";
                                                        estadoReseSpan = "estadoSpanC";
                                                        textoEstadoRese = "Cancelada";
                                                    }
                                                }
                                            }
                                        }
            
                                        listaReservasHTML += `
                                        <div class="${tipoRese}">
                                            <div class="divUnidTipoRese">
                                                <div class="divSpanUnidad">
                                                    <span>${data[i]["unidad_nombre"]}</span>
                                                </div>
                                                <span class="tipoReseSpan">${textoTipoRese}</span>
                                                <div class="estadoDiv ${estadoReseBase}">
                                                    <span class="estadoSpan ${estadoReseSpan}">${textoEstadoRese}</span>
                                                </div>
                                            </div>
                                            <div class="dataReseGene">
                                                <div class="divCodigoRese">
                                                    <span class="spanCod">COD: ${data[i]["codigoReserva"]}</span>
                                                    <span class="spanId">| ID: ${data[i]["id_reserva"]}</span>
                                                </div>
                                                <div class="divInicioFinal">
                                                    <div class="divInicio">
                                                        <span class="span1">Inicio:</span><span class="span2">${data[i]["horaEntradaR"]} | ${data[i]["fechaReserva"]}</span>
                                                    </div>
                                                    <div class="divFinal">
                                                        <span class="span1">Final:</span><span class="span2">${data[i]["horaSalidaR"]} | ${data[i]["reserDiaFinal"]}</span>
                                                    </div>
                                                    <div class="ojoDiv" title="Ver Detalles" onclick="verDetallesReserva(${data[i]["id_reserva"]})">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.35 290.58"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M479.67,121.22c-32-35-68.21-64.81-110-87.45C333.28,14.07,294.8,1.34,253,.11a235.2,235.2,0,0,0-84.86,12.65C105.44,34.53,54.21,73.18,9.93,121.67c-13.9,15.21-12.89,32.55,1,48a340,340,0,0,0,25.94,26c31.72,28.3,65.91,53,104.54,71.12C184.52,287,229.67,294.82,277,288.38c37.43-5.11,71.65-19.34,103.9-38.57a434.87,434.87,0,0,0,76.95-58.48c12.25-11.63,25.64-22.61,31.55-39.43V138.53A43.36,43.36,0,0,0,479.67,121.22Zm-24,28.68c-18.67,21.53-40.56,39.43-63.55,56-26.17,18.9-54,34.64-85.07,44.29-20.33,6.32-41.06,9.88-61.2,9.41-33.32.47-63.5-7.58-92.38-21-42-19.56-78.45-46.93-110.88-79.81-3.12-3.17-5.8-6.77-9-9.91-2.75-2.75-2.41-4.93-.06-7.77,11-13.31,23.71-24.83,36.76-36C101.19,78.74,135.42,58,173.47,43.65a200.39,200.39,0,0,1,98-11.19c45.16,5.89,84.4,26,121.22,51.55a369.18,369.18,0,0,1,62.7,55.56C459.82,144.47,459.89,145,455.67,149.9Z"/><path d="M245.36,51.38c-52.56,0-93.71,41.3-94.3,93.62-.55,49,39.4,93.67,94.2,93.74,54.1.07,93.85-44.88,93.58-93.4C338.56,93.21,297.25,51.39,245.36,51.38Zm0,156.92c-31.33.66-63.76-26-63.76-63.15,0-34.78,28.58-63.39,63.61-63.42s62.69,28.13,62.73,63.34C308,180.76,280.78,207.55,245.36,208.3Z"/></g></g></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        `;

                                    }else{
                                        
                                        break for1;

                                    } 
        
                                }

                            }else{

                                listaReservasHTML = `
                                <div class="divReseNOEncontrada">
                                    <span>Reservas NO Encontradas</span>
                                    <span>No se reconoce ningún parámetro elegido</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.77 511.57"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M489.17,422.32c-29.91-29.59-59.47-59.54-89.42-89.09-4.14-4.09-4.32-6.88-1.47-11.75,25.25-43.13,34.35-89.56,27-139-8.15-54.69-34-99.72-76.62-134.58C302,9.77,248-5.1,188.39,1.53,142.54,6.62,102.08,25,68.8,57,9.4,114-12,183.79,6.38,263.86,30.07,367.24,129.17,439.79,241.71,425.74a202.19,202.19,0,0,0,80.88-28.07c4.16-2.53,6.62-2.32,10.11,1.2,29.85,30.13,60,60,89.83,90.1,9.69,9.79,19.56,19,33.35,22.6h19c6.47-2.43,13.09-4.45,18.67-8.83,8.32-6.52,14.16-14.65,16.95-24.9a25.91,25.91,0,0,1,1.31-3.2v-19C508.15,441.9,499,432,489.17,422.32Zm1.45,47.55c-3.22,18.64-25.75,27.48-40.69,15.8a71.78,71.78,0,0,1-6.22-5.75Q392.35,428.6,341,377.25c-8.54-8.53-11.69-8.92-21.62-2.46-28.6,18.62-59.82,29.18-94,30.93C171.23,408.49,124,391.86,83.86,355.4,51.7,326.19,32.43,289.81,24.43,247.3c-2.09-11.13-2.72-22.41-2.94-33.76,1.77-67.18,29.63-120.74,84.8-159.39,24.88-17.43,52.91-27.68,83.17-31.31,46.8-5.6,90.35,3.88,129.78,29.77,37.22,24.44,63.07,58.06,77.4,100.37a186.51,186.51,0,0,1,9.91,62.7c-.5,36-10.11,69.51-29.38,100.09-1,1.55-2,3.08-3,4.63-5.23,8.27-4.8,12.36,2.16,19.33q52.54,52.59,105.16,105.12C488.56,451.85,492.37,459.69,490.62,469.87Z"/><path d="M270.1,67.47a104.63,104.63,0,0,0-20.51-6.15c-6-1.15-11.11,2-12.47,7.28-1.47,5.7,1,10.46,6.77,12.74a58,58,0,0,0,5.71,1.75c59.43,16.6,99.38,69,99.51,135.57.24,22.56-7.06,48.16-22.92,70.57-31.88,45.07-75.85,64.6-130.75,58.35-30.33-3.45-56.4-16.76-77.56-38.49C87.41,277.82,74.12,239.9,80,196.52c7.07-52.15,36.17-88.05,84.37-108.72,3.2-1.37,6.59-2.46,9.51-4.3a9.45,9.45,0,0,0,4.45-10.77,10.22,10.22,0,0,0-9.06-8.14c-2.86-.4-5.57.72-8.23,1.65C102.38,86.82,60.09,143.51,57.56,205.64c-1.72,42.19,11.09,79.55,38.89,111.55,43.44,50,116.39,66.92,177.45,41.21,68.27-28.74,107.71-99.79,93.94-172.48C357.08,129.08,323.62,89.65,270.1,67.47Z"/><path d="M166.16,151.9a10.3,10.3,0,0,0-15.67,7.78c-.49,4.37,2,7.53,4.91,10.42q19.59,19.58,39.15,39.18c5,5,5.06,3.76-.17,9q-19.55,19.62-39.14,39.18c-3,3-5.53,6.35-4.61,11a10.42,10.42,0,0,0,7.16,8.26c4.52,1.56,8.16-.19,11.28-3.31q20-19.89,39.9-39.83c5.71-5.68,4.13-5.71,9.69-.18q19.64,19.53,39.17,39.16c3.32,3.34,6.95,5.78,12,4.25,8.36-2.54,10.14-11.84,3.39-18.67q-20.34-20.58-41-40.88c-2.77-2.71-2.95-4.21-.06-7C245.72,197,259,183.47,272.45,170.07c2.64-2.63,5-5.39,5-9.86a10.43,10.43,0,0,0-6.77-9.16c-5.58-2.3-9.6.55-13.28,4.22C244,168.67,230.53,182,217.25,195.55c-2.59,2.64-4,2.77-6.68,0-13-13.31-26.26-26.41-39.47-39.55A26.61,26.61,0,0,0,166.16,151.9Z"/><path d="M207.16,78.15a10.23,10.23,0,0,0,10.48-10.33,10.29,10.29,0,1,0-20.57-.34A10.17,10.17,0,0,0,207.16,78.15Z"/></g></g></svg>
                                </div>
                                `;

                                clearInterval(intervalReservasLista);
                                intervalReservasLista = null;

                            }

                            reservasDivGene.innerHTML = "";

                            rangoReservasLista.selectNode(document.getElementsByTagName("div").item(0));
                            const reservasLista =
                                rangoReservasLista.createContextualFragment(listaReservasHTML);
                            reservasDivGene.appendChild(reservasLista);

                            let loader = document.querySelector("#baseSpinnerCargaRese");

                            if(loader != null){

                                loader.classList.add("baseSpinnerCargaRese-C");
                                
                                loader.addEventListener("transitionend", (e)=>{
                                    loader.remove();
                                });

                            }

                        })
                        .catch((err) => console.log(err));

                    }, 500);

                }else{

                    clearInterval(intervalReservasLista);
                    intervalReservasLista = null;

                    llenarListReservas(hoy, general);

                }

            }

            llenarListReservas("", true);

        //---------------------------------------------------------------------------------------------------------------------
    
    //------------------------------------------
    // Funciones - FIN
    //------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    //-------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------
    // Eventos - INICIO
    //------------------------------------------

        // Rangos
        const rangoSpinnerCarga = document.createRange();
        //----------------------------------------------------------------------------------

        // Input - Limpiar Filtros
        limpiarFiltrosInput.addEventListener("click", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            filtroRese_TipoRese.value = "Sin Dato";
            filtroRese_EstadoRese.value = "Sin Dato";
            filtroRese_MesRese.value = "Mes";
            filtroRese_DiaRese.value = "";
            filtroRese_AnioRese.value = "";
            inBusquedaEspecifi.value = "";

            llenarListReservas("", true);

        });
        //-------------------------------------------------------------------------------------------

        // Input - Filtro: Tipo de Reserva 
        filtroRese_TipoRese.addEventListener("input", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            let valor = filtroRese_TipoRese.options[filtroRese_TipoRese.selectedIndex].text;

            if(
                valor != "Sin Dato"
            ){
                llenarListReservas("", "");
            }
            
        });
        //--------------------------------------------------------------------------------------------------
        
        // Input - Filtro: Estado de la Reserva
        filtroRese_EstadoRese.addEventListener("input", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            let valor = filtroRese_EstadoRese.options[filtroRese_EstadoRese.selectedIndex].text;

            if(
                valor != "Sin Dato"
            ){
                llenarListReservas("", "");
            }
            
        });
        //--------------------------------------------------------------------------------------------------

        // Input - Filtro Fecha: DÍA
        filtroRese_DiaRese.addEventListener("input", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            let valor = filtroRese_DiaRese.value;

            if(!isNaN(Number(valor))){
                if(valor.substring(0, 1) != "0"){
                    llenarListReservas("", "");
                }
            }

        });
        //--------------------------------------------------------------------------------------------------

        // Input - Filtro Fecha: MES
        filtroRese_MesRese.addEventListener("input", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            let valor = filtroRese_MesRese.options[filtroRese_MesRese.selectedIndex].text;

            if(
                valor != "Mes"
            ){
                llenarListReservas("", "");
            }

        });
        //--------------------------------------------------------------------------------------------------

        // Input - Filtro Fecha: AÑO
        filtroRese_AnioRese.addEventListener("input", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            let valor = filtroRese_AnioRese.value;

            if(!isNaN(Number(valor))){
                if(valor.length == 4 || valor == ""){
                    llenarListReservas("", "");
                }
            }

        });
        //--------------------------------------------------------------------------------------------------

        // Input - Filtro Fecha: BOTÓN HOY
        btnHoy_Reservas.addEventListener("click", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            llenarListReservas(true, "");

        });
        //--------------------------------------------------------------------------------------------------

        // Input - Filtro: Búsqueda Específica
        inBusquedaEspecifi.addEventListener("input", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            llenarListReservas("", "");

        });
        //--------------------------------------------------------------------------------------------------

        // Botón Atras Reservas Completo
        buttonAtrasReseC.addEventListener("click", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);
            
            if(posicionPaginaGene != 0){

                posicionPaginaGene = 0;
                llenarListReservas("", "");

            }
            
        });
        //--------------------------------------------------------------------------------------------------

        // Botón Atras Reservas
        buttonAtrasRese.addEventListener("click", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            if(posicionPaginaGene != 0){

                posicionPaginaGene--;
                llenarListReservas("", "");

            }
            
        });
        //--------------------------------------------------------------------------------------------------

        // Botón Adelante Reservas 
        buttonAdelanteRese.addEventListener("click", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            if(posicionPaginaGene != (paginaCantGene-1)){

                posicionPaginaGene++;
                llenarListReservas("", "");

            }
            
        });
        //--------------------------------------------------------------------------------------------------

        // Botón Adelante Reservas Completo 
        buttonAdelanteReseC.addEventListener("click", (e)=>{

            if(document.querySelector("#baseSpinnerCargaRese") != null){
                document.querySelector("#baseSpinnerCargaRese").remove();
            }

            let htmlCarga = `
            <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
            </div>
            `;

            rangoSpinnerCarga.selectNode(document.getElementsByTagName("div").item(0));
            const spinnerBaseCarga =
                rangoSpinnerCarga.createContextualFragment(htmlCarga);
            document.querySelector(".divDataGene").appendChild(spinnerBaseCarga);

            if(posicionPaginaGene != (paginaCantGene-1)){

                posicionPaginaGene = paginaCantGene-1;
                llenarListReservas("", "");

            }
            
        });
        //--------------------------------------------------------------------------------------------------

    //------------------------------------------
    // Eventos - FINAL
    //------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------
    
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

}

//------------------------------------------------------------
// RESERVAS ADMINISTRACIÓN.PHP | FINAL
//------------------------------------------------------------

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
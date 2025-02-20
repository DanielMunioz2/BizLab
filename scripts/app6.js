// VARIABLES Y FUNCIONES GLOBALES //

/* Local - (Localhost, XAMPP) */
// import {urlBuscarInfoAdminDB} from "http://localhost/BizClub/scripts/vyfGlobales.js";

/* Producción - (Bluehost) */
import {urlBuscarInfoAdminDB} from "https://plataforma.the-bizclub.com/scripts/vyfGlobales.js";
    
//--------------------------------------------------------------------------------------------------

    // Fechas

    var diaGeneActualNum = new Date().getDate(); 
    var mesGeneActualNum = new Date().getMonth()+1; 
    var anioGeneActualNum = new Date().getFullYear(); 
    var diaGeneSemanaActual = 
      new Date(anioGeneActualNum, (mesGeneActualNum-1), diaGeneActualNum).getDay();
    var diaGeneActualTex = diaGeneActualNum < 10 ? "0"+diaGeneActualNum : String(diaGeneActualNum);
    var mesGeneActualTex = mesGeneActualNum < 10 ? "0"+mesGeneActualNum : String(mesGeneActualNum);
    var anioGeneActualTex = String(anioGeneActualNum); 

    var cadenaFechaActual = anioGeneActualTex+"-"+mesGeneActualTex+"-"+diaGeneActualTex;

    //-------------------------------------------------------------------------------------------------


    // Errores Arrays
    var erroresNRA = [0,1,0,0,0,0,0,0,0,0,0,0];
    var erroresDatosNRA = [0,0,0,0];

    // Arrays
    var arrayMiembrosElegidos = [];

    var mesesFactura = {
        1 : "enero",
        2 : "febrero",
        3 : "marzo",
        4 : "abril",
        5 : "mayo",
        6 : "junio",
        7 : "julio",
        8 : "agosto",
        9 : "septiembre",
        10 : "octubre",
        11 : "noviembre",
        12 : "diciembre"
    };

    var mesesFacturaCod = {
        "enero" : "EN",
        "febrero" : "FE",
        "marzo" : "MR",
        "abril" : "AB",
        "mayo" : "MY",
        "junio" : "JN",
        "julio" : "JL",
        "agosto" : "AG",
        "septiembre" : "SP",
        "octubre" : "OC",
        "noviembre" : "NV",
        "diciembre" : "DI"
    };

    // Verificar Estado de la Membresía
    function verificarMembresiaStd(){

        document.querySelector("#form_btnPagarMensu").submit();

    }

    // Realizar Reserva Nueva
    function nuevaReserva(){
        
        document.querySelector("#form_btnRealizaRese").submit();

    }

//---------------------------------------
// <<-- VARIABLES GLOBALES | FINAL -->>
//---------------------------------------

//

//---------------------------------------------------
// <<-- ADMINISTRACIÓN - NUEVA RESERVA | INICIO -->>
//---------------------------------------------------

    //--------------------------------------------------------------------------
    // Elementos del DOM

    // BOTONES
    const btn_reservar = document.querySelector("#btn_reservar");
    const btn_cancelar = document.querySelector("#btn_cancelar");

    const btnReseXS = document.querySelector("#btnReseXS");

    // CONTENEDORES 
    const div_miemElegidoNRA = document.querySelector("#div_miemElegidoNRA");
    const div_miembrosElegiNRA = document.querySelector("#div_miembrosElegiNRA");
    const div_listaMiembroNRA = document.querySelector("#div_listaMiembroNRA");
    const div_lisOMiembrosNRA = document.querySelector("#div_lisOMiembrosNRA");

    // INPUTS

    const in_miembroNombreNRA = document.querySelector("#in_miembroNombreNRA");
    const in_otrosMiembrosNRA = document.querySelector("#in_otrosMiembrosNRA");
    const in_numPersonasNRA = document.querySelector("#in_numPersonasNRA");
    const in_tituloReseNRA = document.querySelector("#in_tituloReseNRA");
    const in_actividadReseNRA = document.querySelector("#in_actividadReseNRA");

    const inO_idUserNR = document.querySelector("#inO_idUserNR");
    const inO_idOtrosUsersNR = document.querySelector("#inO_idOtrosUsersNR");
    const inO_idUnidNR = document.querySelector("#inO_idUnidNR");
    const inO_tipoReseNR = document.querySelector("#inO_tipoReseNR");
    const inO_fechaInicioNR = document.querySelector("#inO_fechaInicioNR");
    const inO_fechaFinalNR = document.querySelector("#inO_fechaFinalNR");
    const inO_horaIncioNR = document.querySelector("#inO_horaInicioNR");
    const inO_horaFinalNR = document.querySelector("#inO_horaFinalNR");
    const inO_cadenaFechasNR = document.querySelector("#inO_cadenaFechasNR");
    const inO_iniMesFecha = document.querySelector("#inO_iniMesFecha");
    const inO_finMesFecha = document.querySelector("#inO_finMesFecha");
    const inO_iniSemanaFecha = document.querySelector("#inO_iniSemanaFecha");
    const inO_finSemanaFecha = document.querySelector("#inO_finSemanaFecha");

    const inO_cantHorasNR = document.querySelector("#inO_cantHorasNR");
    const inO_cantDiasNR = document.querySelector("#inO_cantDiasNR");
    const inO_cantSemanas = document.querySelector("#inO_cantSemanas");
    const inO_cantMeses = document.querySelector("#inO_cantMeses");
    

    // SPANS
    const span_fechaIniSemana = document.querySelector(".span_fechaIniSemana");
    const span_fechaFinSemana = document.querySelector(".span_fechaFinSemana");
    //--------------------------------------------------------------------------

    //

    //--------------------------------------------------------------------------
    // Rangos

    const range_miembroElegidoNRA = document.createRange();
    const range_oMiembrosElegidosNRA = document.createRange();
    const range_listaMiembrosNRA = document.createRange();
    const range_listaOMiembrosNRA = document.createRange();
    const range_unidadSelectedNRA = document.createRange();
    const range_listaUnidadesNRA = document.createRange();

    //--------------------------------------------------------------------------

    //

    //--------------------------------------------------------------------------
    // Funciones - Inicio

    window.addEventListener("click", (e)=>{
      
        if(document.getElementById("div_listaMiembroNRA").contains(e.target)){


        }else{
            
            div_listaMiembroNRA.classList.replace("div_listaMiembroNRA-V", "div_listaMiembroNRA-O");

        }

    });

    window.addEventListener("click", (e)=>{
      
        if(document.getElementById("div_lisOMiembrosNRA").contains(e.target)){


        }else{
            
            div_lisOMiembrosNRA.classList.replace("div_lisOMiembrosNRA-V", "div_lisOMiembrosNRA-O");

        }

    });

    function crearHoraActual(){

        let hora = new Date().getHours();
        let minutos = new Date().getMinutes();
  
        let horaTexto = hora > 12 ? hora - 12 : hora;
        horaTexto = horaTexto < 10 ? "0"+horaTexto : String(horaTexto);
        let minutosTexto = minutos < 10 ? "0"+minutos : String(minutos);
        let meridiano = hora < 12 ? "AM" : "PM";
  
        let horaCompleta = horaTexto+":"+minutosTexto+" "+meridiano; 
  
        return [horaCompleta, horaTexto, minutosTexto, meridiano, hora, minutos];
  
    }

    function creaFechaCodFac(){

        // Fecha y hora de creación de la factura
        let dia = new Date().getDate()<10 ? "0"+new Date().getDate(): new Date().getDate();
        let mes = new Date().getMonth()+1 < 10 ? "0"+(new Date().getMonth()+1): new Date().getMonth()+1;
        let anio = new Date().getFullYear();
        let minutos = new Date().getMinutes();
        let segundos = new Date().getSeconds();
        let hora = new Date().getHours() < 13 ? new Date().getHours() : new Date().getHours()-12;
        hora = hora<10 ? "0"+hora: hora;
        let meridiano = new Date().getHours() < 12 ? "AM" : "PM";
        let horaSuma =  
            new Date().getHours() <= 12
            ? hora+""+minutos+""+segundos+"000"
            : hora+""+minutos+""+segundos+"720";

        let fechaCreacion = anio+"-"+mes+"-"+dia;
        let anioPeque = String(anio).substring(2,4);

        let horaCreacion = hora+":"+minutos+" "+meridiano;
        let serieFactura = mesesFactura[new Date().getMonth()+1]+"-"+anio;
        let codFactura = 
            "FAC"+(mesesFacturaCod[mesesFactura[new Date().getMonth()+1]])+anioPeque+"-"+dia+horaSuma;
        let codMembre =
            "MEM"+(mesesFacturaCod[mesesFactura[new Date().getMonth()+1]])+anioPeque+"-"+dia+horaSuma;
        let codRese =
            "RES"+(mesesFacturaCod[mesesFactura[new Date().getMonth()+1]])+anioPeque+"-"+dia+horaSuma;

        return [fechaCreacion, horaCreacion, serieFactura, codFactura, codMembre, codRese];

    }

    function numeroDiaSemana(fecha){

        let fechaSeparada = fecha.split("-");
        
        let dia = Number(fechaSeparada[2]);
        let mes = Number(fechaSeparada[1])-1;
        let anio = Number(fechaSeparada[0]);
  
        let diaSemana = new Date(anio, mes, dia).getDay();
  
        return diaSemana;
  
    }

    function fechaANumero(fecha){

        let fechaNumero = new Date(fecha);
        fechaNumero = fechaNumero.getTime();

        return fechaNumero;

    }

    function minutosAHora(minutos){

        let hora = parseInt(Number(minutos/60));
        let meri = hora < 12 ? "AM" : "PM";
        let minu = Number(minutos)-((parseInt(Number(minutos/60)))*60);
        hora = hora > 12 ? hora - 12 : hora;
        
        let minuTexto = minu < 10 ? "0"+minu : minu;
        let horaFinalSinCero = hora+":"+minuTexto+" "+meri;

        return horaFinalSinCero; 

    }

    function horaAMinutos(hora){

        let horaEnMinutos = 0;
        let horaSeparada = "";
        let minutos = "";
        let meridiano = "";
  
        if(hora.includes("PM") || hora.includes("AM")){
  
          horaSeparada = hora.split(":")[0];
          minutos = hora.split(":")[1].split(" ")[0];
          meridiano = hora.split(":")[1].split(" ")[1];
  
          horaEnMinutos = (Number(horaSeparada)*60)+(Number(minutos));
          horaEnMinutos = meridiano == "PM" ? horaEnMinutos + 720 : horaEnMinutos;
          
        }else{
  
          horaSeparada = hora.split(":")[0];
          minutos = hora.split(":")[1];
  
          horaEnMinutos = (Number(horaSeparada)*60)+(Number(minutos));
  
        }
        
        return horaEnMinutos;
  
    }

    function revisarErrores(){

        // Verificaciones iniciales
        if(
            document.querySelector("#inO_idPdtSelecNR").value == "" ||
            document.querySelector("#inO_idPdtSelecNR").value == null
        ){
            erroresNRA[0] = 1;
        }else{
            erroresNRA[0] = 0;
        }

        if(document.querySelector("#in_precioACRese") != null){

            if(
                document.querySelector("#in_precioACRese").value != "" &&
                document.querySelector("#in_ivaPrecioACRese").value != "" &&
                document.querySelector("#in_descuPrecioACRese").value != "" &&
                document.querySelector("#in_precioACRese").value != null &&
                document.querySelector("#in_ivaPrecioACRese").value != null &&
                document.querySelector("#in_descuPrecioACRese").value != null 
            ){

                erroresNRA[7] = 0;

            }else{

                erroresNRA[7] = 1;

            }

        }else{

            erroresNRA[7] = 0;

        }

        if(
            document.querySelector("#inO_idUnidNR").value == "" ||
            document.querySelector("#inO_idUnidNR").value == null
        ){
            erroresNRA[1] = 1;
        }else{
            erroresNRA[1] = 0;
        }

        if(
            inO_idUserNR.value == "" ||
            in_miembroNombreNRA.value == "" ||
            inO_idUserNR.value == null ||
            in_miembroNombreNRA.value == null
        ){
            erroresNRA[2] = 1;
        }else{
            erroresNRA[2] = 0;
        }

        if(
            in_numPersonasNRA.value == "" ||
            in_numPersonasNRA.value == null ||
            in_numPersonasNRA.value < 1 || 
            in_numPersonasNRA.value > document.querySelector("#inO_maxPersoNum").value
        ){
            erroresNRA[4] = 1;
        }else{
            erroresNRA[4] = 0;
        }

        if(
            in_tituloReseNRA.value == "" ||
            in_tituloReseNRA.value == null
        ){
            erroresNRA[5] = 1;
        }else{
            erroresNRA[5] = 0;
        }

        if(
            in_actividadReseNRA.value == "" ||
            in_actividadReseNRA.value == null
        ){
            erroresNRA[6] = 1;
        }else{
            erroresNRA[6] = 0;
        }
        //------------------------------------------------------------------------------------

        let sumaErrores = 0;
        let sumaErrores2 = 0;

        for(let i = 0; i < erroresNRA.length; i++){

            sumaErrores += erroresNRA[i];

        }

        for(let i = 0; i < erroresDatosNRA.length; i++){

            sumaErrores2 += erroresDatosNRA[i];

        }

        if(sumaErrores == 0){

            btn_reservar.classList.replace("btn_reservar-B", "btn_reservar-D");
            btn_reservar.removeAttribute("disabled");

        }else{

            btn_reservar.setAttribute("disabled", "");
            btn_reservar.classList.replace("btn_reservar-D", "btn_reservar-B");

        }

        return [sumaErrores, sumaErrores2];

    }

    function limpiarUnidadaTipoRese(){
        document.querySelector("#inO_idUnidNR").value = "";
        revisarErrores();
    }

    function eliminarUnidSelected(idUnid){

        document.querySelector(".divUnidadElegida"+idUnid).remove();

        document.querySelector("#in_unidadTocaElige").classList.replace("in_unidadTocaElige-O", "in_unidadTocaElige-V");

        document.querySelector("#div_unidSeleBase").classList.replace("div_unidSeleBase-V", "div_unidSeleBase-O");

        document.querySelector("#inO_idUnidNR").value = "";

        revisarErrores();

    }

    function selecionarUnidNRA(id, imagen, nombre){

        document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");
        document.querySelector("#in_unidadTocaElige").classList.replace("in_unidadTocaElige-V", "in_unidadTocaElige-O");

        let htmlUnidSelected = `
        <div class="divUnidadElegida divUnidadElegida${id}">
            <div class="divImg">
                <img src="images/productosImages/${imagen}" alt="Imagen">
            </div>
            <div class="divDatos">
                <span>${nombre}</span>
            </div>
            <div 
                class="div_svgXUnid" 
                title="Eliminar Unidad" 
                onclick="eliminarUnidSelected(${id})"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.71 174.71"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M111.41,95.37a11.33,11.33,0,0,1,0-16l60-60a11.34,11.34,0,0,0,0-16h0a11.34,11.34,0,0,0-16,0l-60,60a11.33,11.33,0,0,1-16,0l-60-60a11.34,11.34,0,0,0-16,0h0a11.34,11.34,0,0,0,0,16l60,60a11.33,11.33,0,0,1,0,16l-60,60a11.34,11.34,0,1,0,16,16l60-60a11.33,11.33,0,0,1,16,0l60,60a11.34,11.34,0,1,0,16-16Z"/></g></g></svg>
            </div>
        </div>
        `;

        range_unidadSelectedNRA.selectNode(document.getElementsByTagName("div").item(0));
        const unidSelected =
            range_unidadSelectedNRA.createContextualFragment(htmlUnidSelected);
        document.querySelector("#div_unidSeleBase").appendChild(unidSelected);

        document.querySelector("#div_unidSeleBase").classList.replace("div_unidSeleBase-O", "div_unidSeleBase-V");

        document.querySelector("#inO_idUnidNR").value = id;

        revisarErrores();

    }

    function revisarDispoReserva(tipoRese){

        const in_fechaIniRese = document.querySelector("#in_fechaIniRese");
        const in_horaIniRese = document.querySelector("#in_horaIniRese");
        const in_cantHorasRese = document.querySelector("#in_cantHorasRese"); 
        const in_numeroSemanasCant = document.querySelector("#in_numeroSemanasCant");
        const span_errorReseH = document.querySelector(".span_errorReseH");
        const in_precioACRese = document.querySelector("#in_precioACRese");
        const in_ivaPrecioACRese = document.querySelector("#in_ivaPrecioACRese");
        const in_descuPrecioACRese = document.querySelector("#in_descuPrecioACRese");

        if(tipoRese == "hora"){

            let fechaInicio = fechaANumero(in_fechaIniRese.value);
            let fechaActual = fechaANumero(cadenaFechaActual);
            let horaEntrada = horaAMinutos(in_horaIniRese.value);
            let horaSalida = horaAMinutos(in_horaIniRese.value)+(in_cantHorasRese.value*60);
            let horaActual = crearHoraActual();
            let minutosHoraActu = horaAMinutos(horaActual[0]);

            if(
                in_fechaIniRese.value != "" &&
                in_horaIniRese.value != "" &&
                in_cantHorasRese.value != ""
            ){
                
                if(
                    fechaInicio < fechaActual ||
                    (fechaInicio == fechaActual &&
                    minutosHoraActu > 1020)
                ){
                    in_fechaIniRese.style.outline = "1px solid red";
                    span_errorReseH.style.color = "#ce2727";
                    span_errorReseH.textContent = "Elija una fecha inicial válida";
                    span_errorReseH.classList.replace("span_errorReseH-O", "span_errorReseH-V");
                    erroresDatosNRA[0] = 1;
                    revisarErrores();
                }else{
                    in_fechaIniRese.style.outline = "none";
                    span_errorReseH.classList.replace("span_errorReseH-V", "span_errorReseH-O");
                    erroresDatosNRA[0] = 0;
                    revisarErrores();
                    if(horaEntrada < 420 || horaEntrada > 1080){
                        in_horaIniRese.style.outline = "1px solid red";
                        span_errorReseH.style.color = "#ce2727";
                        span_errorReseH.textContent = "Elija una hora de entrada válida";
                        span_errorReseH.classList.replace("span_errorReseH-O", "span_errorReseH-V");
                        erroresDatosNRA[1] = 1;
                        revisarErrores();
                    }else{
                        in_horaIniRese.style.outline = "none";
                        span_errorReseH.classList.replace("span_errorReseH-V", "span_errorReseH-O");
                        erroresDatosNRA[1] = 0;
                        revisarErrores();
                        if(horaSalida < 420 || horaSalida > 1140 || horaSalida == horaEntrada){
                            in_cantHorasRese.style.outline = "1px solid red";
                            span_errorReseH.style.color = "#ce2727";
                            span_errorReseH.textContent = "Elija una hora de salida válida";
                            span_errorReseH.classList.replace("span_errorReseH-O", "span_errorReseH-V");
                            erroresDatosNRA[2] = 1;
                            revisarErrores();
                        }else{
                            in_cantHorasRese.style.outline = "none";
                            span_errorReseH.classList.replace("span_errorReseH-V", "span_errorReseH-O");
                            erroresDatosNRA[2] = 0;
                            revisarErrores();
                            if(in_cantHorasRese.value < 1){
                                in_cantHorasRese.style.outline = "1px solid red";
                                span_errorReseH.style.color = "#ce2727";
                                span_errorReseH.textContent = "Mínimo una hora para la reserva";
                                span_errorReseH.classList.replace("span_errorReseH-O", "span_errorReseH-V");
                                erroresDatosNRA[3] = 1;
                                revisarErrores();
                            }else{
                                in_cantHorasRese.style.outline = "none";
                                span_errorReseH.classList.replace("span_errorReseH-V", "span_errorReseH-O");
                                erroresDatosNRA[3] = 0;
                                revisarErrores();
                            }
                        }
                    }
                }  

            }

        }else if(tipoRese == "dia"){

            let fechaInicio = fechaANumero(in_fechaIniRese.value);
            let fechaActual = fechaANumero(cadenaFechaActual);
            let horaActual = crearHoraActual();
            let minutosHoraActu = horaAMinutos(horaActual[0]);

            if(
                in_fechaIniRese.value != "" &&
                in_cantHorasRese.value != ""
            ){

                if(
                    fechaInicio < fechaActual ||
                    (fechaInicio == fechaActual &&
                    minutosHoraActu > 1020)
                ){  
                    in_fechaIniRese.style.outline = "1px solid red";
                    span_errorReseH.style.color = "#ce2727";
                    span_errorReseH.textContent = "Elija una fecha inicial válida";
                    span_errorReseH.classList.replace("span_errorReseH-O", "span_errorReseH-V");
                    erroresDatosNRA[0] = 1;
                    revisarErrores();
                }else{
                    in_fechaIniRese.style.outline = "none";
                    span_errorReseH.classList.replace("span_errorReseH-V", "span_errorReseH-O");
                    erroresDatosNRA[0] = 0;
                    revisarErrores();
                    if(in_cantHorasRese.value < 1){
                        in_cantHorasRese.style.outline = "1px solid red";
                        span_errorReseH.style.color = "#ce2727";
                        span_errorReseH.textContent = "Mínimo un día para la reserva";
                        span_errorReseH.classList.replace("span_errorReseH-O", "span_errorReseH-V");
                        erroresDatosNRA[1] = 1;
                        revisarErrores();
                    }else{
                        in_cantHorasRese.style.outline = "none";
                        span_errorReseH.classList.replace("span_errorReseH-V", "span_errorReseH-O");
                        erroresDatosNRA[1] = 0;
                        revisarErrores();
                    }
                }

            }

        }else if(tipoRese == "semana"){
            
            if(in_numeroSemanasCant.value != ""){

                if(in_numeroSemanasCant.value < 1){
                    in_numeroSemanasCant.style.outline = "1px solid red";
                    span_errorReseH.style.color = "#ce2727";
                    span_errorReseH.textContent = "Mínimo una semana para la reserva";
                    span_errorReseH.classList.replace("span_errorReseH-O", "span_errorReseH-V");
                    erroresDatosNRA[0] = 1;
                    revisarErrores();
                }else{
                    in_numeroSemanasCant.style.outline = "none";
                    span_errorReseH.classList.replace("span_errorReseH-V", "span_errorReseH-O");
                    erroresDatosNRA[0] = 0;
                    revisarErrores();
                }

            }

        }else if(tipoRese == "mes"){

            let fechaInicio = fechaANumero(in_fechaIniRese.value);
            let fechaActual = fechaANumero(cadenaFechaActual);
            let horaActual = crearHoraActual();
            let minutosHoraActu = horaAMinutos(horaActual[0]);

            if(
                in_fechaIniRese.value != "" &&
                in_cantHorasRese.value != ""
            ){

                if(
                    fechaInicio < fechaActual ||
                    (fechaInicio == fechaActual &&
                    minutosHoraActu > 1020)
                ){  
                    in_fechaIniRese.style.outline = "1px solid red";
                    span_errorReseH.style.color = "#ce2727";
                    span_errorReseH.textContent = "Elija una fecha inicial válida";
                    span_errorReseH.classList.replace("span_errorReseH-O", "span_errorReseH-V");
                    erroresDatosNRA[0] = 1;
                    revisarErrores();
                }else{
                    in_fechaIniRese.style.outline = "none";
                    span_errorReseH.classList.replace("span_errorReseH-V", "span_errorReseH-O");
                    erroresDatosNRA[0] = 0;
                    revisarErrores();
                    if(in_cantHorasRese.value < 1){
                        in_cantHorasRese.style.outline = "1px solid red";
                        span_errorReseH.style.color = "#ce2727";
                        span_errorReseH.textContent = "Mínimo un mes para la reserva";
                        span_errorReseH.classList.replace("span_errorReseH-O", "span_errorReseH-V");
                        erroresDatosNRA[1] = 1;
                        revisarErrores();
                    }else{
                        in_cantHorasRese.style.outline = "none";
                        span_errorReseH.classList.replace("span_errorReseH-V", "span_errorReseH-O");
                        erroresDatosNRA[1] = 0;
                        revisarErrores();
                    }
                }

            }

        }

        let estadoErroresRese = revisarErrores();

        if(
            inO_tipoReseNR.value != null &&
            inO_tipoReseNR.value != "" &&
            estadoErroresRese[1] == 0
        ){

            if(inO_tipoReseNR.value == "hora"){

                if(
                    in_fechaIniRese.value != "" && 
                    in_fechaIniRese.value != null &&
                    in_horaIniRese.value != "" && 
                    in_horaIniRese.value != null &&
                    in_cantHorasRese.value != "" && 
                    in_cantHorasRese.value != null
                ){

                    // Colsulta para las reservas actuales

                    let formReseXHora = new FormData();

                    let queryReseXHora = 
                        "SELECT * FROM `gdrfkbmy_bizlabDB`.`reservas` WHERE `reservas`.`fechaReserva` = '"
                        +in_fechaIniRese.value+"' OR `reservas`.`reserDiaFechas` LIKE '%"+in_fechaIniRese.value+
                        "%' OR `reservas`.`reserSemanaFechas` LIKE '%"+in_fechaIniRese.value+"%' OR `reservas`.`reserDiaFinal` = '"
                        +in_fechaIniRese.value+"' OR `reservas`.`reserDiaFinal` LIKE '%"+in_fechaIniRese.value+
                        "%' OR `reservas`.`reserDiaFinal` LIKE '%"+in_fechaIniRese.value+"%';" 

                    formReseXHora.append("queryRese", queryReseXHora);

                    fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formReseXHora,
                      })
                        .then((response) => response.json())
                        .then((data) => {

                            let unidDispo = document.querySelector("#inO_unidDispoPdt").value.split(",");

                            let horaEntradaEnMinus = horaAMinutos(in_horaIniRese.value);
                            let horaSalidaEnMinus = horaAMinutos(in_horaIniRese.value)+(in_cantHorasRese.value*60);

                            for(let i = 1; i < data.length; i++){

                                if(data[i]["reserTipo"] == "semana"){

                                    unidDispo = unidDispo.filter(unid => unid != data[i]["id_unidad"]);

                                }

                                if(data[i]["reserTipo"] == "dia"){

                                    unidDispo = unidDispo.filter(unid => unid != data[i]["id_unidad"]);

                                }

                                if(data[i]["reserTipo"] == "hora"){

                                    let horaEntraReseDB = horaAMinutos(data[i]["horaEntradaR"]);
                                    let horaSaleReseDB = horaAMinutos(data[i]["horaSalidaR"]);

                                    if(
                                        (horaEntradaEnMinus > horaEntraReseDB && 
                                        horaEntradaEnMinus < horaSaleReseDB) ||
                                        (horaSalidaEnMinus > horaEntraReseDB && 
                                        horaSalidaEnMinus < horaSaleReseDB) ||
                                        horaEntradaEnMinus == horaEntraReseDB ||
                                        horaEntradaEnMinus == horaSaleReseDB ||
                                        horaSalidaEnMinus == horaEntraReseDB ||
                                        horaSalidaEnMinus == horaSaleReseDB
                                    ){

                                        unidDispo = unidDispo.filter(unid => unid != data[i]["id_unidad"]);

                                    }

                                }

                            }

                            let unidadesDispo = unidDispo.toString();

                            document.querySelector("#in_unidadTocaElige").addEventListener("keydown", (e)=>{
                                e.preventDefault();
                            });

                            if(unidDispo.length == 0){

                                document.querySelector(".span_errorReseH").textContent = 
                                    "El horario ("+in_fechaIniRese.value+" de "+minutosAHora(horaEntradaEnMinus)+" a "+minutosAHora(horaSalidaEnMinus)+") NO está disponible"; 
                                    
                                document.querySelector(".span_errorReseH").classList.replace("span_errorReseH-O", "span_errorReseH-V");
                                document.querySelector(".span_errorReseH").style.color = "#ce2727";

                                document.querySelector("#div_unidSeleBase").innerHTML = "";
                                document.querySelector("#div_unidSeleBase").classList.replace("div_unidSeleBase-V", "div_unidSeleBase-O");

                                document.querySelector("#in_unidadTocaElige").classList.replace("in_unidadTocaElige-O", "in_unidadTocaElige-V");

                                document.querySelector("#div_listaUnidDisponibles").innerHTML = "";
                                document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");

                                document.querySelector("#div_unidadBaseGene").classList.replace("div_unidadBaseGene-V", "div_unidadBaseGene-O");

                                inO_fechaInicioNR.value = "";
                                inO_fechaFinalNR.value = "";
                                inO_horaIncioNR.value = "";
                                inO_horaFinalNR.value = "";
                                inO_cantHorasNR.value = "";

                            }else{

                                inO_fechaInicioNR.value = in_fechaIniRese.value;
                                inO_fechaFinalNR.value = in_fechaIniRese.value;
                                inO_horaIncioNR.value = minutosAHora(horaEntradaEnMinus);
                                inO_horaFinalNR.value = minutosAHora(horaSalidaEnMinus);
                                inO_cantHorasNR.value = in_cantHorasRese.value;
                                
                                let formUnidDispoNRA = new FormData();

                                formUnidDispoNRA.append("unidadesNRA", unidadesDispo);

                                fetch(urlBuscarInfoAdminDB, {
                                    method: "POST",
                                    body: formUnidDispoNRA,
                                })
                                    .then((response) => response.json())
                                    .then((data) => {

                                        let htmlUnidadesNRA = "";

                                        for(let i = 1; i < data.length; i++){

                                            htmlUnidadesNRA += `
                                            <div 
                                                class="unidadDiv unidadDiv${data[i]["id_unidad"]}"
                                                onclick=
                                                    "selecionarUnidNRA
                                                    (   
                                                        ${data[i]["id_unidad"]},
                                                        '${data[i]["unidad_imagen"]}',
                                                        '${data[i]["unidad_nombre"]}'
                                                    )"
                                            >
                                                <div class="imgDiv">
                                                    <img src="images/productosImages/${data[i]["unidad_imagen"]}" alt="Imagen">
                                                </div>
                                                <div class="divDatos">
                                                    <span>${data[i]["unidad_nombre"]}</span>
                                                </div>
                                            </div>
                                            `;

                                        };

                                        document.querySelector(".span_errorReseH").textContent = 
                                            "El horario ("+in_fechaIniRese.value+" de "+minutosAHora(horaEntradaEnMinus)+" a "+minutosAHora(horaSalidaEnMinus)+") está disponible"; 
                                            
                                        document.querySelector(".span_errorReseH").classList.replace("span_errorReseH-O", "span_errorReseH-V");
                                        document.querySelector(".span_errorReseH").style.color = "#49a414";

                                        window.addEventListener('click', function ocultarListUnid(e) {

                                            if(document.getElementById('in_unidadTocaElige') != null){
                                                
                                                if (document.getElementById('in_unidadTocaElige').contains(e.target)) {
                                                
                                
                                                } else {
                                                    
                                                    document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");
                                    
                                                }
                                            
                                            }
                                
                                        });

                                        document.querySelector("#div_listaUnidDisponibles").innerHTML = "";
                                        
                                        range_listaUnidadesNRA.selectNode(document.getElementsByTagName("div").item(0));
                                        const lisUnidad =
                                            range_listaUnidadesNRA.createContextualFragment(htmlUnidadesNRA);
                                        document.querySelector("#div_listaUnidDisponibles").appendChild(lisUnidad);

                                        document.querySelector("#in_unidadTocaElige").addEventListener("click", (e)=>{

                                            document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-O", "div_listaUnidDisponibles-V");

                                        }); 

                                        document.querySelector("#div_unidadBaseGene").classList.replace("div_unidadBaseGene-O", "div_unidadBaseGene-V");

                                    })
                                    .catch((err) => console.log(err));

                            }

                        })
                        .catch((err) => console.log(err));

                }

            }
    
            if(inO_tipoReseNR.value == "dia"){
                
                if(
                    in_fechaIniRese.value != "" && 
                    in_fechaIniRese.value != null &&
                    in_cantHorasRese.value != "" && 
                    in_cantHorasRese.value != null
                ){

                    let formFechaSuma = new FormData();

                    formFechaSuma.append("reservasXDiaFiltrar", true);
                    formFechaSuma.append("fechaInicio", in_fechaIniRese.value);
                    formFechaSuma.append("cantidadDias", (in_cantHorasRese.value-1));

                    fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formFechaSuma,
                      })
                        .then((response) => response.json())
                        .then((data) => {

                            let unidDispo = document.querySelector("#inO_unidDispoPdt").value.split(",");

                            let fechasReserva = data[1].split("_");

                            let diaInicioNumero = fechaANumero(fechasReserva[0]);
                            let diaFinalNumero = fechaANumero(fechasReserva[1]);

                            for(let i = 1; i < data[0].length; i++){

                                let diaIniReseNumero = fechaANumero(data[0][i]["fechaReserva"]);
                                let diaFinReseNumero = fechaANumero(data[0][i]["reserDiaFinal"]);

                                if(
                                    (diaIniReseNumero > diaInicioNumero && diaIniReseNumero < diaFinalNumero) ||
                                    (diaFinReseNumero > diaInicioNumero && diaFinReseNumero < diaFinalNumero) ||
                                    diaIniReseNumero == diaInicioNumero ||
                                    diaIniReseNumero == diaFinalNumero ||
                                    diaFinReseNumero == diaInicioNumero ||
                                    diaFinReseNumero == diaFinalNumero 
                                ){

                                    unidDispo = unidDispo.filter(unid => unid != data[0][i]["id_unidad"]);

                                }

                            }

                            let unidadesDispo = unidDispo.toString();

                            document.querySelector("#in_unidadTocaElige").addEventListener("keydown", (e)=>{
                                e.preventDefault();
                            });

                            if(unidDispo.length == 0){

                                document.querySelector(".span_errorReseH").textContent = 
                                    "El horario ("+fechasReserva[0]+" hasta "+fechasReserva[1]+" de 7:00 AM a 7:00 PM) NO está disponible"; 
                                    
                                document.querySelector(".span_errorReseH").classList.replace("span_errorReseH-O", "span_errorReseH-V");
                                document.querySelector(".span_errorReseH").style.color = "#ce2727";

                                document.querySelector("#div_unidSeleBase").innerHTML = "";
                                document.querySelector("#div_unidSeleBase").classList.replace("div_unidSeleBase-V", "div_unidSeleBase-O");

                                document.querySelector("#in_unidadTocaElige").classList.replace("in_unidadTocaElige-O", "in_unidadTocaElige-V");

                                document.querySelector("#div_listaUnidDisponibles").innerHTML = "";
                                document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");

                                document.querySelector("#div_unidadBaseGene").classList.replace("div_unidadBaseGene-V", "div_unidadBaseGene-O");

                                inO_fechaInicioNR.value = "";
                                inO_fechaFinalNR.value = "";
                                inO_horaIncioNR.value = "";
                                inO_horaFinalNR.value = "";
                                inO_cantDiasNR.value = "";

                            }else{

                                inO_fechaInicioNR.value = fechasReserva[0];
                                inO_fechaFinalNR.value = fechasReserva[1];
                                inO_horaIncioNR.value = "7:00 AM";
                                inO_horaFinalNR.value = "7:00 PM";
                                inO_cantDiasNR.value = in_cantHorasRese.value;

                                let formUnidDispoNRA = new FormData();

                                formUnidDispoNRA.append("unidadesNRA", unidadesDispo);

                                fetch(urlBuscarInfoAdminDB, {
                                    method: "POST",
                                    body: formUnidDispoNRA,
                                })
                                    .then((response) => response.json())
                                    .then((data) => {

                                        let htmlUnidadesNRA = "";

                                        for(let i = 1; i < data.length; i++){

                                            htmlUnidadesNRA += `
                                            <div 
                                                class="unidadDiv unidadDiv${data[i]["id_unidad"]}"
                                                onclick=
                                                    "selecionarUnidNRA
                                                    (   
                                                        ${data[i]["id_unidad"]},
                                                        '${data[i]["unidad_imagen"]}',
                                                        '${data[i]["unidad_nombre"]}'
                                                    )"
                                            >
                                                <div class="imgDiv">
                                                    <img src="images/productosImages/${data[i]["unidad_imagen"]}" alt="Imagen">
                                                </div>
                                                <div class="divDatos">
                                                    <span>${data[i]["unidad_nombre"]}</span>
                                                </div>
                                            </div>
                                            `;

                                        };

                                        document.querySelector(".span_errorReseH").textContent = 
                                            "El horario ("+fechasReserva[0]+" hasta "+fechasReserva[1]+" de 7:00 AM a 7:00 PM) está disponible"; 
                                            
                                        document.querySelector(".span_errorReseH").classList.replace("span_errorReseH-O", "span_errorReseH-V");
                                        document.querySelector(".span_errorReseH").style.color = "#49a414";

                                        window.addEventListener('click', function ocultarListUnid(e) {

                                            if (document.getElementById('in_unidadTocaElige').contains(e.target)) {
                                                
                                
                                            } else {
                                                    
                                                document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");
                                
                                            }
                                
                                        });

                                        document.querySelector("#div_listaUnidDisponibles").innerHTML = "";
                                        
                                        range_listaUnidadesNRA.selectNode(document.getElementsByTagName("div").item(0));
                                        const lisUnidad =
                                            range_listaUnidadesNRA.createContextualFragment(htmlUnidadesNRA);
                                        document.querySelector("#div_listaUnidDisponibles").appendChild(lisUnidad);

                                        document.querySelector("#in_unidadTocaElige").addEventListener("click", (e)=>{

                                            document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-O", "div_listaUnidDisponibles-V");

                                        }); 

                                        document.querySelector("#div_unidadBaseGene").classList.replace("div_unidadBaseGene-O", "div_unidadBaseGene-V");

                                    })
                                    .catch((err) => console.log(err));

                            }

                        })
                        .catch((err) => console.log(err));

                }

            }
    
            if(inO_tipoReseNR.value == "semana"){
                
                if(
                    document.querySelector(".span_fechaIniSemana").textContent != "" &&
                    document.querySelector(".span_fechaFinSemana").textContent != "" &&
                    document.querySelector("#in_numeroSemanasCant").value != "" &&
                    document.querySelector("#in_numeroSemanasCant").value != null &&
                    document.querySelector("#in_numeroSemanasCant").value > 0
                ){

                    let formFechaSuma = new FormData();

                    formFechaSuma.append("reservasXSemanaFiltrar", true);
                    formFechaSuma.append("fechaInicio", document.querySelector(".span_fechaIniSemana").textContent);
                    formFechaSuma.append("fechaFinal", document.querySelector(".span_fechaFinSemana").textContent);

                    fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formFechaSuma,
                      })
                        .then((response) => response.json())
                        .then((data) => {

                            let unidDispo = document.querySelector("#inO_unidDispoPdt").value.split(",");

                            let diaInicioNumero = fechaANumero(document.querySelector(".span_fechaIniSemana").textContent);
                            let diaFinalNumero = fechaANumero(document.querySelector(".span_fechaFinSemana").textContent);

                            for(let i = 1; i < data.length; i++){

                                let diaIniReseNumero = fechaANumero(data[i]["fechaReserva"]);
                                let diaFinReseNumero = fechaANumero(data[i]["reserDiaFinal"]);

                                if(
                                    (diaIniReseNumero > diaInicioNumero && diaIniReseNumero < diaFinalNumero) ||
                                    (diaFinReseNumero > diaInicioNumero && diaFinReseNumero < diaFinalNumero) ||
                                    diaIniReseNumero == diaInicioNumero ||
                                    diaIniReseNumero == diaFinalNumero ||
                                    diaFinReseNumero == diaInicioNumero ||
                                    diaFinReseNumero == diaFinalNumero 
                                ){

                                    unidDispo = unidDispo.filter(unid => unid != data[i]["id_unidad"]);

                                }

                            }

                            let unidadesDispo = unidDispo.toString();

                            document.querySelector("#in_unidadTocaElige").addEventListener("keydown", (e)=>{
                                e.preventDefault();
                            });


                            if(unidDispo.length == 0){

                                document.querySelector(".span_errorReseH").textContent = 
                                    "El horario ("+document.querySelector(".span_fechaIniSemana").textContent+" hasta "+document.querySelector(".span_fechaFinSemana").textContent+" de 7:00 AM a 7:00 PM) NO está disponible"; 
                                    
                                document.querySelector(".span_errorReseH").classList.replace("span_errorReseH-O", "span_errorReseH-V");
                                document.querySelector(".span_errorReseH").style.color = "#ce2727";

                                document.querySelector("#div_unidSeleBase").innerHTML = "";
                                document.querySelector("#div_unidSeleBase").classList.replace("div_unidSeleBase-V", "div_unidSeleBase-O");

                                document.querySelector("#in_unidadTocaElige").classList.replace("in_unidadTocaElige-O", "in_unidadTocaElige-V");

                                document.querySelector("#div_listaUnidDisponibles").innerHTML = "";
                                document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");

                                document.querySelector("#div_unidadBaseGene").classList.replace("div_unidadBaseGene-V", "div_unidadBaseGene-O");

                                document.querySelector(".p_resumenDatosSemana").textContent = "";

                                document.querySelector(".div_reseSemanaResumen").classList.replace("div_reseSemanaResumen-V", "div_reseSemanaResumen-O");

                                inO_iniSemanaFecha.value = "";
                                inO_finSemanaFecha.value = "";
                                inO_horaIncioNR.value = "";
                                inO_horaFinalNR.value = "";
                                inO_cantSemanas.value = "";
                                
                            }else{

                                inO_horaIncioNR.value = "7:00 AM";
                                inO_horaFinalNR.value = "7:00 PM";
                                inO_cantSemanas.value = in_numeroSemanasCant.value;

                                let formUnidDispoNRA = new FormData();

                                formUnidDispoNRA.append("unidadesNRA", unidadesDispo);

                                fetch(urlBuscarInfoAdminDB, {
                                    method: "POST",
                                    body: formUnidDispoNRA,
                                })
                                    .then((response) => response.json())
                                    .then((data) => {

                                        let htmlUnidadesNRA = "";

                                        for(let i = 1; i < data.length; i++){

                                            htmlUnidadesNRA += `
                                            <div 
                                                class="unidadDiv unidadDiv${data[i]["id_unidad"]}"
                                                onclick=
                                                    "selecionarUnidNRA
                                                    (   
                                                        ${data[i]["id_unidad"]},
                                                        '${data[i]["unidad_imagen"]}',
                                                        '${data[i]["unidad_nombre"]}'
                                                    )"
                                            >
                                                <div class="imgDiv">
                                                    <img src="images/productosImages/${data[i]["unidad_imagen"]}" alt="Imagen">
                                                </div>
                                                <div class="divDatos">
                                                    <span>${data[i]["unidad_nombre"]}</span>
                                                </div>
                                            </div>
                                            `;

                                        };

                                        document.querySelector(".span_errorReseH").textContent = 
                                            "El horario ("+document.querySelector(".span_fechaIniSemana").textContent+" hasta "+document.querySelector(".span_fechaFinSemana").textContent+" de 7:00 AM a 7:00 PM) está disponible"; 
                                            
                                        document.querySelector(".span_errorReseH").classList.replace("span_errorReseH-O", "span_errorReseH-V");
                                        document.querySelector(".span_errorReseH").style.color = "#49a414";

                                        window.addEventListener('click', function ocultarListUnid(e) {

                                            if(document.getElementById('in_unidadTocaElige') != null){

                                                if (document.getElementById('in_unidadTocaElige').contains(e.target)) {
                                                
                                
                                                } else {
                                                        
                                                    document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");
                                    
                                                }

                                            }

                                        });

                                        document.querySelector("#div_listaUnidDisponibles").innerHTML = "";
                                        
                                        range_listaUnidadesNRA.selectNode(document.getElementsByTagName("div").item(0));
                                        const lisUnidad =
                                            range_listaUnidadesNRA.createContextualFragment(htmlUnidadesNRA);
                                        document.querySelector("#div_listaUnidDisponibles").appendChild(lisUnidad);

                                        document.querySelector("#in_unidadTocaElige").addEventListener("click", (e)=>{

                                            document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-O", "div_listaUnidDisponibles-V");

                                        }); 

                                        document.querySelector("#div_unidadBaseGene").classList.replace("div_unidadBaseGene-O", "div_unidadBaseGene-V");

                                        let diaFinSpan = "";

                                        if(numeroDiaSemana(document.querySelector(".span_fechaFinSemana").textContent) == 5){
                                            diaFinSpan = "Viernes";
                                        }else{
                                            diaFinSpan = "Sábado";
                                        }

                                        document.querySelector(".p_resumenDatosSemana").textContent = 
                                            "Fechas: "+document.querySelector(".span_fechaIniSemana").textContent+" hasta "+document.querySelector(".span_fechaFinSemana").textContent+"\n\nHorario: de Lunes a "+diaFinSpan+" de 7:00 AM a 7:00 PM";

                                        document.querySelector(".div_reseSemanaResumen").classList.replace("div_reseSemanaResumen-O", "div_reseSemanaResumen-V");

                                    })
                                    .catch((err) => console.log(err));

                            }

                        })
                        .catch((err) => console.log(err));

                }

            }
    
            if(inO_tipoReseNR.value == "mes"){
                
                if(
                    in_fechaIniRese.value != "" && 
                    in_fechaIniRese.value != null &&
                    in_cantHorasRese.value != "" && 
                    in_cantHorasRese.value != null
                ){

                    // document.querySelector("#in_precioACRese").value != null 
                    // document.querySelector("#in_precioACRese").value != "" 
                    // document.querySelector("#in_ivaPrecioACRese").value != "" 
                    // document.querySelector("#in_ivaPrecioACRese").value != null

                    let formMesFechasNRA = new FormData();

                    formMesFechasNRA.append("reservasXMesFiltrar", true);
                    formMesFechasNRA.append("fechaInicio", in_fechaIniRese.value);
                    formMesFechasNRA.append("cantidadMeses", in_cantHorasRese.value);

                    fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formMesFechasNRA,
                      })
                        .then((response) => response.json())
                        .then((data) => {

                            let unidDispo = document.querySelector("#inO_unidDispoPdt").value.split(",");

                            let fechaFinalMes = data[1].split("_")[1];

                            let diaInicioNumero = fechaANumero(in_fechaIniRese.value);
                            let diaFinalNumero = fechaANumero(fechaFinalMes);

                            for(let i = 1; i < data[0].length; i++){

                                let diaIniReseNumero = fechaANumero(data[0][i]["fechaReserva"]);
                                let diaFinReseNumero = fechaANumero(data[0][i]["reserDiaFinal"]);

                                if(
                                    (diaIniReseNumero > diaInicioNumero && diaIniReseNumero < diaFinalNumero) ||
                                    (diaFinReseNumero > diaInicioNumero && diaFinReseNumero < diaFinalNumero) ||
                                    diaIniReseNumero == diaInicioNumero ||
                                    diaIniReseNumero == diaFinalNumero ||
                                    diaFinReseNumero == diaInicioNumero ||
                                    diaFinReseNumero == diaFinalNumero 
                                ){

                                    unidDispo = unidDispo.filter(unid => unid != data[0][i]["id_unidad"]);

                                }

                            }

                            let unidadesDispo = unidDispo.toString();

                            document.querySelector("#in_unidadTocaElige").addEventListener("keydown", (e)=>{
                                e.preventDefault();
                            });


                            if(unidDispo.length == 0){

                                document.querySelector(".span_errorReseH").textContent = 
                                    "El horario ("+in_fechaIniRese.value+" hasta "+fechaFinalMes+" | Lunes a Sábado de 7:00 AM a 7:00 PM) NO está disponible por completo"; 
                                    
                                document.querySelector(".span_errorReseH").classList.replace("span_errorReseH-O", "span_errorReseH-V");
                                document.querySelector(".span_errorReseH").style.color = "#ce2727";

                                document.querySelector("#div_unidSeleBase").innerHTML = "";
                                document.querySelector("#div_unidSeleBase").classList.replace("div_unidSeleBase-V", "div_unidSeleBase-O");

                                document.querySelector("#in_unidadTocaElige").classList.replace("in_unidadTocaElige-O", "in_unidadTocaElige-V");

                                document.querySelector("#div_listaUnidDisponibles").innerHTML = "";
                                document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");

                                document.querySelector("#div_unidadBaseGene").classList.replace("div_unidadBaseGene-V", "div_unidadBaseGene-O");

                                inO_iniMesFecha.value = "";
                                inO_finMesFecha.value = "";
                                inO_horaIncioNR.value = "";
                                inO_horaFinalNR.value = "";
                                inO_cantMeses.value = "";

                            }else{

                                inO_iniMesFecha.value = in_fechaIniRese.value;
                                inO_finMesFecha.value = fechaFinalMes;
                                inO_horaIncioNR.value = "7:00 AM";
                                inO_horaFinalNR.value = "7:00 PM";
                                inO_cantMeses.value = in_cantHorasRese.value;

                                let formUnidDispoNRA = new FormData();

                                formUnidDispoNRA.append("unidadesNRA", unidadesDispo);

                                fetch(urlBuscarInfoAdminDB, {
                                    method: "POST",
                                    body: formUnidDispoNRA,
                                })
                                    .then((response) => response.json())
                                    .then((data) => {

                                        let htmlUnidadesNRA = "";

                                        for(let i = 1; i < data.length; i++){

                                            htmlUnidadesNRA += `
                                            <div 
                                                class="unidadDiv unidadDiv${data[i]["id_unidad"]}"
                                                onclick=
                                                    "selecionarUnidNRA
                                                    (   
                                                        ${data[i]["id_unidad"]},
                                                        '${data[i]["unidad_imagen"]}',
                                                        '${data[i]["unidad_nombre"]}'
                                                    )"
                                            >
                                                <div class="imgDiv">
                                                    <img src="images/productosImages/${data[i]["unidad_imagen"]}" alt="Imagen">
                                                </div>
                                                <div class="divDatos">
                                                    <span>${data[i]["unidad_nombre"]}</span>
                                                </div>
                                            </div>
                                            `;

                                        };

                                        document.querySelector(".span_errorReseH").textContent = 
                                            "El horario ("+in_fechaIniRese.value+" hasta "+fechaFinalMes+" | Lunes a Sábado de 7:00 AM a 7:00 PM) está disponible"; 
                                            
                                        document.querySelector(".span_errorReseH").classList.replace("span_errorReseH-O", "span_errorReseH-V");
                                        document.querySelector(".span_errorReseH").style.color = "#49a414";

                                        window.addEventListener('click', function ocultarListUnid(e) {

                                            if (document.getElementById('in_unidadTocaElige').contains(e.target)) {
                                                
                                
                                            } else {
                                                    
                                                document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");
                                
                                            }
                                
                                        });

                                        document.querySelector("#div_listaUnidDisponibles").innerHTML = "";
                                        
                                        range_listaUnidadesNRA.selectNode(document.getElementsByTagName("div").item(0));
                                        const lisUnidad =
                                            range_listaUnidadesNRA.createContextualFragment(htmlUnidadesNRA);
                                        document.querySelector("#div_listaUnidDisponibles").appendChild(lisUnidad);

                                        document.querySelector("#in_unidadTocaElige").addEventListener("click", (e)=>{

                                            document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-O", "div_listaUnidDisponibles-V");

                                        }); 

                                        document.querySelector("#div_unidadBaseGene").classList.replace("div_unidadBaseGene-O", "div_unidadBaseGene-V");

                                        revisarErrores();

                                    })
                                    .catch((err) => console.log(err));

                            }

                        })
                        .catch((err) => console.log(err));

                }

            }

        }else{

            document.querySelector("#div_unidSeleBase").innerHTML = "";
            document.querySelector("#div_unidSeleBase").classList.replace("div_unidSeleBase-V", "div_unidSeleBase-O");

            document.querySelector("#in_unidadTocaElige").classList.replace("in_unidadTocaElige-O", "in_unidadTocaElige-V");

            document.querySelector("#div_listaUnidDisponibles").innerHTML = "";
            document.querySelector("#div_listaUnidDisponibles").classList.replace("div_listaUnidDisponibles-V", "div_listaUnidDisponibles-O");

            document.querySelector("#div_unidadBaseGene").classList.replace("div_unidadBaseGene-V", "div_unidadBaseGene-O");

            document.querySelector(".div_reseSemanaResumen").classList.replace("div_reseSemanaResumen-V", "div_reseSemanaResumen-O");

            inO_fechaInicioNR.value = "";
            inO_fechaFinalNR.value = "";
            inO_horaIncioNR.value = "";
            inO_horaFinalNR.value = "";
            inO_cantHorasNR.value = "";

        }

    }

    function eliminarMiembroNRA(id, tipo, array){

        // Si es true, el id del usuario se eliminara del array
        if(array){
            arrayMiembrosElegidos = arrayMiembrosElegidos.filter(miembro => miembro != id);
        }

        if(tipo == 1){
            inO_idUserNR.value = "";

            div_listaMiembroNRA.innerHTML="";
            div_listaMiembroNRA.classList.replace("div_listaMiembroNRA-V", "div_listaMiembroNRA-O");

            div_miemElegidoNRA.innerHTML = "";
            div_miemElegidoNRA.classList.replace("div_miemElegidoNRA-V", "div_miemElegidoNRA-O");

            in_miembroNombreNRA.value = "";
            in_miembroNombreNRA.classList.replace("in_miembroNombreNRA-O", "in_miembroNombreNRA-D");
        }

        if(tipo == 2){

            let valorActual = inO_idOtrosUsersNR.value;

            if(
                valorActual != null && 
                valorActual != ""
            ){
                
                if(valorActual.includes(",")){

                    let arrayOMiem = valorActual.split(",");

                    if(arrayOMiem[0] == id){

                        let nuevovalor = valorActual.replace(id+",", "");
                        inO_idOtrosUsersNR.value = nuevovalor;
                        document.querySelector(".divOtroMiembro"+id).remove();

                    }else{

                        let nuevovalor = valorActual.replace(","+id, "");
                        inO_idOtrosUsersNR.value = nuevovalor;
                        document.querySelector(".divOtroMiembro"+id).remove();

                    }

                    if(div_miembrosElegiNRA.children.length == 0){
                        div_miembrosElegiNRA.innerHTML = "";
                        div_miembrosElegiNRA.classList.replace("div_miembrosElegiNRA-V", "div_miembrosElegiNRA-O");
                    }

                }else{

                    inO_idOtrosUsersNR.value = "";
                    document.querySelector(".divOtroMiembro"+id).remove();

                    if(div_miembrosElegiNRA.children.length == 0){
                        div_miembrosElegiNRA.innerHTML = "";
                        div_miembrosElegiNRA.classList.replace("div_miembrosElegiNRA-V", "div_miembrosElegiNRA-O");
                    }

                }

            }

        }

    }
    
    function elegirMiembroNRA(idMiembro, tipo){
        
        let htmlMiembroSelected = "";
        let prevRegistro = false;

        for(let i = 0; i < arrayMiembrosElegidos.length; i++){

            if(arrayMiembrosElegidos[i] == idMiembro){
                prevRegistro = true;
            }else{
                prevRegistro = false;
            }

        }

        let formMiembroNRA = new FormData();

        formMiembroNRA.append("idMiembroNRA", idMiembro);

        fetch(urlBuscarInfoAdminDB, {
            method: "POST",
            body: formMiembroNRA,
          })
            .then((response) => response.json())
            .then((data) => {

                if(data.length > 1){

                    if(tipo == 1){

                        if(prevRegistro){

                            eliminarMiembroNRA(data[1]["id_usuario"], 2, false);

                        }else{

                            if(document.querySelector(".divOtroMiembro"+idMiembro) == null){
                                arrayMiembrosElegidos.push(idMiembro);
                            }else{
                                eliminarMiembroNRA(idMiembro, 2, false);
                            }

                        }

                        inO_idUserNR.value = data[1]["id_usuario"];

                        div_listaMiembroNRA.innerHTML="";
                        div_listaMiembroNRA.classList.replace("div_listaMiembroNRA-V", "div_listaMiembroNRA-O");

                        in_miembroNombreNRA.classList.replace("in_miembroNombreNRA-D", "in_miembroNombreNRA-O");

                        let htmlMiembroSelected = `
                        <div class="divMiemElegido">
                            <div class="imgDiv">
                                <img src="imagesUser/${data[1]["user_imagen"]}" alt="Imagen">
                            </div>
                            <div class="datosDiv">
                                <span>${data[1]["user_nombre"]+" "+data[1]["user_apellido"]}</span>
                                <span>${data[1]["user_cargo"]+" - "+data[1]["user_empresa"]}</span>
                            </div>
                            <div 
                                class="div_svgX" 
                                title="Eliminar Miembro" 
                                onclick="eliminarMiembroNRA(${data[1]["id_usuario"]}, 1, true)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.71 174.71"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M111.41,95.37a11.33,11.33,0,0,1,0-16l60-60a11.34,11.34,0,0,0,0-16h0a11.34,11.34,0,0,0-16,0l-60,60a11.33,11.33,0,0,1-16,0l-60-60a11.34,11.34,0,0,0-16,0h0a11.34,11.34,0,0,0,0,16l60,60a11.33,11.33,0,0,1,0,16l-60,60a11.34,11.34,0,1,0,16,16l60-60a11.33,11.33,0,0,1,16,0l60,60a11.34,11.34,0,1,0,16-16Z"/></g></g></svg>
                            </div>
                        </div>
                        `;
                        
                        range_miembroElegidoNRA.selectNode(document.getElementsByTagName("div").item(0));
                        const miemSeleNRA =
                            range_miembroElegidoNRA.createContextualFragment(htmlMiembroSelected);
                        div_miemElegidoNRA.appendChild(miemSeleNRA);

                        div_miemElegidoNRA.classList.replace("div_miemElegidoNRA-O", "div_miemElegidoNRA-V");

                        if(document.querySelector(".divOtroMiembro"+idMiembro) != null){

                            document.querySelector(".divOtroMiembro"+idMiembro).remove();

                        }

                    }

                    if(tipo == 2){

                        if(document.querySelector(".divOtroMiembro"+idMiembro) == null){

                            if(prevRegistro){

                                eliminarMiembroNRA(data[1]["id_usuario"], 1, false);
    
                            }else{
                                
                                arrayMiembrosElegidos.push(idMiembro);
    
                            }

                            if(inO_idOtrosUsersNR.value == ""){
                                inO_idOtrosUsersNR.value = data[1]["id_usuario"];
                            }else{
                                inO_idOtrosUsersNR.value += ","+data[1]["id_usuario"];
                            }
    
                            div_lisOMiembrosNRA.innerHTML = "";
                            div_lisOMiembrosNRA.classList.replace("div_lisOMiembrosNRA-V", "div_lisOMiembrosNRA-O");
    
                            let htmlOMiembrosSelected = `
                            <div class="divOtroMiembro divOtroMiembro${data[1]["id_usuario"]}">
                                <div class="divImg">
                                    <img src="imagesUser/${data[1]["user_imagen"]}" alt="Imagen">
                                </div>
                                <div class="divDatos">
                                    <span>${data[1]["user_nombre"]+" "+data[1]["user_apellido"]}</span>
                                    <span>${data[1]["user_cargo"]+" - "+data[1]["user_empresa"]}</span>
                                </div>
                                <div 
                                    class="div_svgX" 
                                    title="Eliminar Miembro" 
                                    onclick="eliminarMiembroNRA(${data[1]["id_usuario"]}, 2, true)"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.71 174.71"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M111.41,95.37a11.33,11.33,0,0,1,0-16l60-60a11.34,11.34,0,0,0,0-16h0a11.34,11.34,0,0,0-16,0l-60,60a11.33,11.33,0,0,1-16,0l-60-60a11.34,11.34,0,0,0-16,0h0a11.34,11.34,0,0,0,0,16l60,60a11.33,11.33,0,0,1,0,16l-60,60a11.34,11.34,0,1,0,16,16l60-60a11.33,11.33,0,0,1,16,0l60,60a11.34,11.34,0,1,0,16-16Z"/></g></g></svg>
                                </div>
                            </div>
                            `;
                            
                            range_oMiembrosElegidosNRA.selectNode(document.getElementsByTagName("div").item(0));
                            const otrosMiemSeleNRA =
                                range_oMiembrosElegidosNRA.createContextualFragment(htmlOMiembrosSelected);
                            div_miembrosElegiNRA.appendChild(otrosMiemSeleNRA);
    
                            div_miembrosElegiNRA.classList.replace("div_miembrosElegiNRA-O", "div_miembrosElegiNRA-V");
                        }

                    }
                    
                }

            })
            .catch((err) => console.log(err));
        
    }

    function llenaListaMiembrosNRA(valor){

        let htmlListaMiembros = "";

        let formListaMiembros = new FormData();

        formListaMiembros.append("nombreMiembroNRA", valor);

        fetch(urlBuscarInfoAdminDB, {
            method: "POST",
            body: formListaMiembros,
          })
            .then((response) => response.json())
            .then((data) => {

                if(data.length > 1){

                    for(let i = 1; i < data.length; i++){

                        htmlListaMiembros += `
                        <div 
                            class="div_miembroLi div_miembroLi${data[i]["id_usuario"]}"
                            onclick="elegirMiembroNRA(${data[i]["id_usuario"]}, 1)"
                        >
                            <div class="imgMiemDiv">
                                <img src="imagesUser/${data[i]["user_imagen"]}" alt="Imagen">
                            </div>
                            <div class="datosDiv">
                                <span>${data[i]["user_nombre"]+" "+data[i]["user_apellido"]}</span>
                                <span>${data[i]["user_cargo"]+" - "+data[i]["user_empresa"]}</span>
                            </div>
                        </div>
                        `;

                    }

                }else{

                    htmlListaMiembros = `
                    <div class="divUserNoEncontradoNRA">
                        <span class="miembroNoEncontrado">No se encontraron los Usuarios</span>
                    </div>
                    `;

                }

                div_listaMiembroNRA.innerHTML = "";

                range_listaMiembrosNRA.selectNode(document.getElementsByTagName("div").item(0));
                const lisMiemNRA =
                    range_listaMiembrosNRA.createContextualFragment(htmlListaMiembros);
                div_listaMiembroNRA.appendChild(lisMiemNRA);

                div_listaMiembroNRA.classList.replace("div_listaMiembroNRA-O", "div_listaMiembroNRA-V");

            })
            .catch((err) => console.log(err));

    }

    function llenarListaOMiemNRA(valor){

        let htmlListaOMiembros = "";

        let formListaOMiembros = new FormData();

        formListaOMiembros.append("nombreMiembroNRA", valor);

        fetch(urlBuscarInfoAdminDB, {
            method: "POST",
            body: formListaOMiembros,
          })
            .then((response) => response.json())
            .then((data) => {

                if(data.length > 1){

                    for(let i = 1; i < data.length; i++){

                        htmlListaOMiembros += `
                        <div 
                            class="div_miembroLi div_miembroLi${data[i]["id_usuario"]}"
                            onclick="elegirMiembroNRA(${data[i]["id_usuario"]}, 2)"
                        >
                            <div class="imgMiemDiv">
                                <img src="imagesUser/${data[i]["user_imagen"]}" alt="Imagen">
                            </div>
                            <div class="datosDiv">
                                <span>${data[i]["user_nombre"]+" "+data[i]["user_apellido"]}</span>
                                <span>${data[i]["user_cargo"]+" - "+data[i]["user_empresa"]}</span>
                            </div>
                        </div>
                        `;

                    }

                }else{

                    htmlListaOMiembros = `
                    <div class="divUserNoEncontradoNRA">
                        <span class="miembroNoEncontrado">No se encontraron los Usuarios</span>
                    </div>
                    `;

                }

                div_lisOMiembrosNRA.innerHTML = "";

                range_listaOMiembrosNRA.selectNode(document.getElementsByTagName("div").item(0));
                const lisOMiemNRA =
                    range_listaMiembrosNRA.createContextualFragment(htmlListaOMiembros);
                div_lisOMiembrosNRA.appendChild(lisOMiemNRA);

                div_lisOMiembrosNRA.classList.replace("div_lisOMiembrosNRA-O", "div_lisOMiembrosNRA-V");

            })
            .catch((err) => console.log(err));

    }   

    // Funciones - Final
    //--------------------------------------------------------------------------

    //

    //--------------------------------------------------------------------------
    // Eventos - Inicio
    
    // Miembro INPUT Nueva Reserva Admin
    in_miembroNombreNRA.addEventListener("input", (e)=>{

        let valor = e.target.value;

        if(
            valor != null &&
            valor != ""
        ){
            llenaListaMiembrosNRA(valor);
        }else{
            div_listaMiembroNRA.innerHTML="";
            div_listaMiembroNRA.classList.replace("div_listaMiembroNRA-V", "div_listaMiembroNRA-O");
        }

        revisarErrores();

    });

    // Otros Miembros INPUT Nueva Reserva Admin
    in_otrosMiembrosNRA.addEventListener("input", (e)=>{

        let valor = e.target.value;

        if(
            valor != null &&
            valor != ""
        ){
            llenarListaOMiemNRA(valor);
        }else{
            div_lisOMiembrosNRA.innerHTML="";
            div_lisOMiembrosNRA.classList.replace("div_lisOMiembrosNRA-V", "div_lisOMiembrosNRA-O");
        }

        revisarErrores();

    });

    in_numPersonasNRA.addEventListener("input", (e)=>{

        revisarErrores();

    });

    in_tituloReseNRA.addEventListener("input", (e)=>{

        revisarErrores();

    });

    in_actividadReseNRA.addEventListener("input", (e)=>{

        revisarErrores();
        
    });

    // Boton Reservar
    btn_reservar.addEventListener("click", (e)=>{

        if(
            document.querySelector("#inO_tipoReseNR").value != null &&
            document.querySelector("#inO_tipoReseNR").value != ""
        ){

            let formRegistroNRA = new FormData();

            let codigoRese = creaFechaCodFac();

            formRegistroNRA.append("regisReservaNRA", true);

            if(document.querySelector("#inO_tipoReseNR").value == "hora"){

                let precio = Number(document.querySelector("#inO_precioXH").value.split(" ")[0])*Number(inO_cantHorasNR.value);
                precio = precio+(precio*(Number(document.querySelector("#inO_ivaPdt").value)/100));
                precio = precio-(precio*(Number(document.querySelector("#inO_descuPdt").value)/100));

                let precioCant = Number(document.querySelector("#inO_precioXH").value.split(" ")[0])*Number(inO_cantHorasNR.value);
                let precioNormal = Number(document.querySelector("#inO_precioXH").value.split(" ")[0]);

                formRegistroNRA.append("tipoRese", "hora");
                formRegistroNRA.append("fechaInicio", inO_fechaInicioNR.value);
                formRegistroNRA.append("fechaFin", inO_fechaFinalNR.value);
                formRegistroNRA.append("horaInicio", inO_horaIncioNR.value);
                formRegistroNRA.append("horaFinal", inO_horaFinalNR.value);
                formRegistroNRA.append("cantHoras", inO_cantHorasNR.value);
                formRegistroNRA.append("cantDias", 0);
                formRegistroNRA.append("cantSemas", 0);
                formRegistroNRA.append("cantMeses", 0);
                formRegistroNRA.append("precioRese", precio);
                formRegistroNRA.append("ivaRese", document.querySelector("#inO_ivaPdt").value);
                formRegistroNRA.append("descuRese", document.querySelector("#inO_descuPdt").value);
                formRegistroNRA.append("idMiembro", inO_idUserNR.value);
                formRegistroNRA.append("idUnidad", inO_idUnidNR.value);
                formRegistroNRA.append("idProducto", document.querySelector("#inO_idPdtSelecNR").value);
                formRegistroNRA.append("otrosMiembrosIds", inO_idOtrosUsersNR.value);
                formRegistroNRA.append("numPersonas", in_numPersonasNRA.value);
                formRegistroNRA.append("tituloNRA", in_tituloReseNRA.value);
                formRegistroNRA.append("actividadNRA", in_actividadReseNRA.value);
                formRegistroNRA.append("reseCodigo", codigoRese[5]);
                formRegistroNRA.append("reseSerie", codigoRese[2]);
                formRegistroNRA.append("factuCod", codigoRese[3]);
                formRegistroNRA.append("precioCanti", precioCant);
                formRegistroNRA.append("precioNormalPdt", precioNormal);

            } else if (document.querySelector("#inO_tipoReseNR").value == "dia"){

                let precio = Number(document.querySelector("#inO_precioXD").value.split(" ")[0])*Number(inO_cantDiasNR.value);
                precio = precio+(precio*(Number(document.querySelector("#inO_ivaPdt").value)/100));
                precio = precio-(precio*(Number(document.querySelector("#inO_descuPdt").value)/100));
                let cantHoras = inO_cantDiasNR.value*12;

                let precioCant = Number(document.querySelector("#inO_precioXD").value.split(" ")[0])*Number(inO_cantDiasNR.value);
                let precioNormal = Number(document.querySelector("#inO_precioXD").value.split(" ")[0]);

                formRegistroNRA.append("tipoRese", "dia");
                formRegistroNRA.append("fechaInicio", inO_fechaInicioNR.value);
                formRegistroNRA.append("fechaFin", inO_fechaFinalNR.value);
                formRegistroNRA.append("horaInicio", inO_horaIncioNR.value);
                formRegistroNRA.append("horaFinal", inO_horaFinalNR.value);
                formRegistroNRA.append("cantHoras", cantHoras);
                formRegistroNRA.append("cantDias", inO_cantDiasNR.value);
                formRegistroNRA.append("cantSemas", 0);
                formRegistroNRA.append("cantMeses", 0);
                formRegistroNRA.append("precioRese", precio);
                formRegistroNRA.append("ivaRese", document.querySelector("#inO_ivaPdt").value);
                formRegistroNRA.append("descuRese", document.querySelector("#inO_descuPdt").value);
                formRegistroNRA.append("idMiembro", inO_idUserNR.value);
                formRegistroNRA.append("idUnidad", inO_idUnidNR.value);
                formRegistroNRA.append("idProducto", document.querySelector("#inO_idPdtSelecNR").value);
                formRegistroNRA.append("otrosMiembrosIds", inO_idOtrosUsersNR.value);
                formRegistroNRA.append("numPersonas", in_numPersonasNRA.value);
                formRegistroNRA.append("tituloNRA", in_tituloReseNRA.value);
                formRegistroNRA.append("actividadNRA", in_actividadReseNRA.value);
                formRegistroNRA.append("reseCodigo", codigoRese[5]);
                formRegistroNRA.append("reseSerie", codigoRese[2]);
                formRegistroNRA.append("factuCod", codigoRese[3]);
                formRegistroNRA.append("precioCanti", precioCant);
                formRegistroNRA.append("precioNormalPdt", precioNormal);

            }else if (document.querySelector("#inO_tipoReseNR").value == "semana"){

                let precio = Number(document.querySelector("#inO_precioXS").value.split(" ")[0])*Number(inO_cantSemanas.value);
                precio = precio+(precio*(Number(document.querySelector("#inO_ivaPdt").value)/100));
                precio = precio-(precio*(Number(document.querySelector("#inO_descuPdt").value)/100));

                let precioCant = Number(document.querySelector("#inO_precioXS").value.split(" ")[0])*Number(inO_cantSemanas.value);
                let precioNormal = Number(document.querySelector("#inO_precioXS").value.split(" ")[0]);

                formRegistroNRA.append("tipoRese", "semana");
                formRegistroNRA.append("fechaInicio", inO_iniSemanaFecha.value);
                formRegistroNRA.append("fechaFin", inO_finSemanaFecha.value);
                formRegistroNRA.append("horaInicio", inO_horaIncioNR.value);
                formRegistroNRA.append("horaFinal", inO_horaFinalNR.value);
                formRegistroNRA.append("cantHoras", 0);
                formRegistroNRA.append("cantDias", 0);
                formRegistroNRA.append("cantSemas", inO_cantSemanas.value);
                formRegistroNRA.append("cantMeses", 0);
                formRegistroNRA.append("precioRese", precio);
                formRegistroNRA.append("ivaRese", document.querySelector("#inO_ivaPdt").value);
                formRegistroNRA.append("descuRese", document.querySelector("#inO_descuPdt").value);
                formRegistroNRA.append("idMiembro", inO_idUserNR.value);
                formRegistroNRA.append("idUnidad", inO_idUnidNR.value);
                formRegistroNRA.append("idProducto", document.querySelector("#inO_idPdtSelecNR").value);
                formRegistroNRA.append("otrosMiembrosIds", inO_idOtrosUsersNR.value);
                formRegistroNRA.append("numPersonas", in_numPersonasNRA.value);
                formRegistroNRA.append("tituloNRA", in_tituloReseNRA.value);
                formRegistroNRA.append("actividadNRA", in_actividadReseNRA.value);
                formRegistroNRA.append("reseCodigo", codigoRese[5]);
                formRegistroNRA.append("reseSerie", codigoRese[2]);
                formRegistroNRA.append("factuCod", codigoRese[3]);
                formRegistroNRA.append("precioCanti", precioCant);
                formRegistroNRA.append("precioNormalPdt", precioNormal);

            }else if(document.querySelector("#inO_tipoReseNR").value == "mes"){

                let precio = Number(document.querySelector("#in_precioACRese").value)*Number(inO_cantMeses.value);
                precio = precio+(precio*(Number(document.querySelector("#in_ivaPrecioACRese").value)/100));
                precio = precio-(precio*(Number(document.querySelector("#in_descuPrecioACRese").value)/100));

                let precioCant = Number(document.querySelector("#in_precioACRese").value)*Number(inO_cantMeses.value);
                let precioNormal = Number(document.querySelector("#in_precioACRese").value);

                formRegistroNRA.append("tipoRese", "mes");
                formRegistroNRA.append("fechaInicio", inO_iniMesFecha.value);
                formRegistroNRA.append("fechaFin", inO_finMesFecha.value);
                formRegistroNRA.append("horaInicio", inO_horaIncioNR.value);
                formRegistroNRA.append("horaFinal", inO_horaFinalNR.value);
                formRegistroNRA.append("cantHoras", 0);
                formRegistroNRA.append("cantDias", 0);
                formRegistroNRA.append("cantSemas", 0);
                formRegistroNRA.append("cantMeses", inO_cantMeses.value);
                formRegistroNRA.append("precioRese", precio);
                formRegistroNRA.append("ivaRese", document.querySelector("#in_ivaPrecioACRese").value);
                formRegistroNRA.append("descuRese", document.querySelector("#in_descuPrecioACRese").value);
                formRegistroNRA.append("idMiembro", inO_idUserNR.value);
                formRegistroNRA.append("idUnidad", inO_idUnidNR.value);
                formRegistroNRA.append("idProducto", document.querySelector("#inO_idPdtSelecNR").value);
                formRegistroNRA.append("otrosMiembrosIds", inO_idOtrosUsersNR.value);
                formRegistroNRA.append("numPersonas", in_numPersonasNRA.value);
                formRegistroNRA.append("tituloNRA", in_tituloReseNRA.value);
                formRegistroNRA.append("actividadNRA", in_actividadReseNRA.value);
                formRegistroNRA.append("reseCodigo", codigoRese[5]);
                formRegistroNRA.append("reseSerie", codigoRese[2]);
                formRegistroNRA.append("factuCod", codigoRese[3]);
                formRegistroNRA.append("precioCanti", precioCant);
                formRegistroNRA.append("precioNormalPdt", precioNormal);

            }

            fetch(urlBuscarInfoAdminDB, {
                method: "POST",
                body: formRegistroNRA,
              })
                .then((response) => response.json())
                .then((data) => {

                    document.querySelector("#div_pdtSeleContainer").innerHTML = "";
                    document.querySelector("#div_pdtSeleContainer").classList.replace("pdtSeleContainer-V", "pdtSeleContainer-O");

                    document.querySelector("#in_pdtNomAdminNR").value = "";
                    document.querySelector("#in_pdtNomAdminNR").classList.replace("in_pdtNomAdminNR-O", "in_pdtNomAdminNR-V");

                    document.querySelector("#div_tiempoReseBase").innerHTML = "";
                    document.querySelector("#div_tiempoReseBase").classList.replace("div_tiempoReseBase-V", "div_tiempoReseBase-O");

                    // Botones tipo reserva
                    document.querySelector("#btnReseXH").classList.remove("btnTipoRese-hora_select");
                    document.querySelector("#btnReseXD").classList.remove("btnTipoRese-dia_select");
                    document.querySelector("#btnReseXS").classList.remove("btnTipoRese-semana_select");
                    document.querySelector("#btnReseXM").classList.remove("btnTipoRese-mes_select");

                    // Limpiando Inputs (Unidad, Miembro, Otros Miembros, Cant. Personas, Titulo, Actividades)
                    document.querySelector("#div_miemElegidoNRA").innerHTML = "";
                    document.querySelector("#div_miemElegidoNRA").classList.replace("div_miemElegidoNRA-V", "div_miemElegidoNRA-O");
                    document.querySelector("#in_miembroNombreNRA").value = ""
                    document.querySelector("#in_miembroNombreNRA").classList.replace("in_miembroNombreNRA-O", "in_miembroNombreNRA-D");
                    document.querySelector("#div_listaMiembroNRA").innerHTML = "";
                    document.querySelector("#div_listaMiembroNRA").classList.replace("div_listaMiembroNRA-V", "div_listaMiembroNRA-O");

                    document.querySelector("#div_miembrosElegiNRA").innerHTML = "";
                    document.querySelector("#div_miembrosElegiNRA").classList.replace("div_miembrosElegiNRA-V", "div_miembrosElegiNRA-O");
                    document.querySelector("#in_otrosMiembrosNRA").value = ""
                    document.querySelector("#in_otrosMiembrosNRA").classList.replace("in_otrosMiembrosNRA-O", "in_otrosMiembrosNRA-D");
                    document.querySelector("#div_lisOMiembrosNRA").innerHTML = "";
                    document.querySelector("#div_lisOMiembrosNRA").classList.replace("div_lisOMiembrosNRA-V", "div_lisOMiembrosNRA-O");

                    inO_idUserNR.value = "";
                    inO_idOtrosUsersNR.value = "";
                    inO_idUnidNR.value = "";
                    inO_tipoReseNR.value = "";
                    inO_fechaInicioNR.value = "";
                    inO_fechaFinalNR.value = "";
                    inO_horaIncioNR.value = "";
                    inO_horaFinalNR.value = "";
                    inO_cadenaFechasNR.value = "";
                    inO_iniMesFecha.value = "";
                    inO_finMesFecha.value = "";
                    inO_iniSemanaFecha.value = "";
                    inO_finSemanaFecha.value = "";
                    inO_cantHorasNR.value = "";
                    inO_cantDiasNR.value = "";
                    inO_cantSemanas.value = "";
                    inO_cantMeses.value = "";
                    document.querySelector("#inO_maxPersoNum").value = "";
                    document.querySelector("#inO_idPdtSelecNR").value = "";

                    in_numPersonasNRA.value = 1;
                    in_tituloReseNRA.value = "";
                    in_actividadReseNRA.value = "";

                    erroresNRA[0] = 0;
                    erroresNRA[1] = 1;
                    erroresNRA[2] = 0;
                    erroresNRA[3] = 0;
                    erroresNRA[4] = 0;
                    erroresNRA[5] = 0;
                    erroresNRA[6] = 0;
                    erroresNRA[7] = 0;
                    erroresNRA[8] = 0;
                    erroresNRA[9] = 0;
                    erroresNRA[10] = 0;
                    erroresNRA[11] = 0;

                    erroresDatosNRA[0] = 0;
                    erroresDatosNRA[1] = 0;
                    erroresDatosNRA[2] = 0;
                    erroresDatosNRA[3] = 0;

                    revisarErrores();

                    document.querySelector(".baseBotones").classList.replace("baseBotones-V", "baseBotones-O");

                    document.querySelector("#div_tipoReseYTiempoGene").classList.replace("div_tipoReseYTiempoGene-V", "div_tipoReseYTiempoGene-O");

                    document.querySelector("#fondoNegroNewRese").classList.replace("fondoNegroNewRese-V", "fondoNegroNewRese-O");

                    alert("Registro de Reserva Exitoso");

                })
                .catch((err) => console.log(err));

        }

    });

    // Botón Cancelar
    btn_cancelar.addEventListener("click", (e)=>{

        document.querySelector("#div_pdtSeleContainer").innerHTML = "";
        document.querySelector("#div_pdtSeleContainer").classList.replace("pdtSeleContainer-V", "pdtSeleContainer-O");

        document.querySelector("#in_pdtNomAdminNR").value = "";
        document.querySelector("#in_pdtNomAdminNR").classList.replace("in_pdtNomAdminNR-O", "in_pdtNomAdminNR-V");

        document.querySelector("#div_tiempoReseBase").innerHTML = "";
        document.querySelector("#div_tiempoReseBase").classList.replace("div_tiempoReseBase-V", "div_tiempoReseBase-O");

        // Botones tipo reserva
        document.querySelector("#btnReseXH").classList.remove("btnTipoRese-hora_select");
        document.querySelector("#btnReseXD").classList.remove("btnTipoRese-dia_select");
        document.querySelector("#btnReseXS").classList.remove("btnTipoRese-semana_select");
        document.querySelector("#btnReseXM").classList.remove("btnTipoRese-mes_select");

        // Limpiando Inputs (Unidad, Miembro, Otros Miembros, Cant. Personas, Titulo, Actividades)
        document.querySelector("#div_miemElegidoNRA").innerHTML = "";
        document.querySelector("#div_miemElegidoNRA").classList.replace("div_miemElegidoNRA-V", "div_miemElegidoNRA-O");
        document.querySelector("#in_miembroNombreNRA").value = ""
        document.querySelector("#in_miembroNombreNRA").classList.replace("in_miembroNombreNRA-O", "in_miembroNombreNRA-D");
        document.querySelector("#div_listaMiembroNRA").innerHTML = "";
        document.querySelector("#div_listaMiembroNRA").classList.replace("div_listaMiembroNRA-V", "div_listaMiembroNRA-O");

        document.querySelector("#div_miembrosElegiNRA").innerHTML = "";
        document.querySelector("#div_miembrosElegiNRA").classList.replace("div_miembrosElegiNRA-V", "div_miembrosElegiNRA-O");
        document.querySelector("#in_otrosMiembrosNRA").value = ""
        document.querySelector("#in_otrosMiembrosNRA").classList.replace("in_otrosMiembrosNRA-O", "in_otrosMiembrosNRA-D");
        document.querySelector("#div_lisOMiembrosNRA").innerHTML = "";
        document.querySelector("#div_lisOMiembrosNRA").classList.replace("div_lisOMiembrosNRA-V", "div_lisOMiembrosNRA-O");

        inO_idUserNR.value = "";
        inO_idOtrosUsersNR.value = "";
        inO_idUnidNR.value = "";
        inO_tipoReseNR.value = "";
        inO_fechaInicioNR.value = "";
        inO_fechaFinalNR.value = "";
        inO_horaIncioNR.value = "";
        inO_horaFinalNR.value = "";
        inO_cadenaFechasNR.value = "";
        inO_iniMesFecha.value = "";
        inO_finMesFecha.value = "";
        inO_iniSemanaFecha.value = "";
        inO_finSemanaFecha.value = "";
        inO_cantHorasNR.value = "";
        inO_cantDiasNR.value = "";
        inO_cantSemanas.value = "";
        inO_cantMeses.value = "";
        document.querySelector("#inO_maxPersoNum").value = "";
        document.querySelector("#inO_idPdtSelecNR").value = "";

        in_numPersonasNRA.value = 1;
        in_tituloReseNRA.value = "";
        in_actividadReseNRA.value = "";

        erroresNRA[0] = 0;
        erroresNRA[1] = 1;
        erroresNRA[2] = 0;
        erroresNRA[3] = 0;
        erroresNRA[4] = 0;
        erroresNRA[5] = 0;
        erroresNRA[6] = 0;
        erroresNRA[7] = 0;
        erroresNRA[8] = 0;
        erroresNRA[9] = 0;
        erroresNRA[10] = 0;
        erroresNRA[11] = 0;

        erroresDatosNRA[0] = 0;
        erroresDatosNRA[1] = 0;
        erroresDatosNRA[2] = 0;
        erroresDatosNRA[3] = 0;

        revisarErrores();

        document.querySelector(".baseBotones").classList.replace("baseBotones-V", "baseBotones-O");

        document.querySelector("#div_tipoReseYTiempoGene").classList.replace("div_tipoReseYTiempoGene-V", "div_tipoReseYTiempoGene-O");

        document.querySelector("#fondoNegroNewRese").classList.replace("fondoNegroNewRese-V", "fondoNegroNewRese-O");

    });

    //------------------------------------------------------------------

    // Eventos - Final
    //--------------------------------------------------------------------------

//---------------------------------------------------
// <<-- ADMINISTRACIÓN - NUEVA RESERVA | FINAL -->>
//---------------------------------------------------
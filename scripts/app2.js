//------------------------
// Variables Globales 
//------------------------

  // URLS para consultas a la base de datos

    // var urlBuscarInfoAdminDB = "http://165.22.176.119/BizLab/consultarInfoAdmin.php";
    var urlBuscarInfoAdminDB = "http://localhost/BizLab/consultarInfoAdmin.php";

  //-------------------------------------------------------------------------------------------------

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

  // Meses Objeto

    var mesesObjetoCompletos = {
      1: "Enero",
      2: "Febrero",
      3: "Marzo",
      4: "Abril",
      5: "Mayo",
      6: "Junio",
      7: "Julio",
      8: "Agosto",
      9: "Septiembre",
      10: "Octubre",
      11: "Noviembre",
      12: "Diciembre",
    };

    var mesesObjetoAbre = {
      1: "ENE",
      2: "FEB",
      3: "MAR",
      4: "ABR",
      5: "MAY",
      6: "JUN",
      7: "JUL",
      8: "AGO",
      9: "SEP",
      10: "OCT",
      11: "NOV",
      12: "DIC",
    };

    var diasSemana = 0;
    var desdeHastaSemana = "sabado";

  //-------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------

//-----------------------
// Funciones Globales
//-----------------------

  // Verificar Estado de la Membresía
  function verificarMembresiaStd(){

    document.querySelector("#form_btnPagarMensu").submit();

  }

  // Realizar Reserva Nueva
  function nuevaReserva(){
    
    document.querySelector("#form_btnRealizaRese").submit();

  }
  
  // Día de la semana, número (domingo = 0 - sábado = 6)

    function numeroDiaSemana(fecha){

      let fechaSeparada = fecha.split("-");
      
      let dia = Number(fechaSeparada[2]);
      let mes = Number(fechaSeparada[1])-1;
      let anio = Number(fechaSeparada[0]);

      let diaSemana = new Date(anio, mes, dia).getDay();

      return diaSemana;

    }

  //--------------------------------------------------------------------------------------------------

  // Fecha a Número

    function fechaANumero(fecha){

      let fechaSeparada = fecha.split("-");

      let suma = 
        Number(fechaSeparada[2])+
        (Number(fechaSeparada[1])*30)+
        Number(fechaSeparada[0]);

      return suma;

    }

  //--------------------------------------------------------------------------------------------------

  // Sumar o Restar días a una fecha

    function sumaRestaDiasFecha(fecha, operacion, dias) {

      var date = fecha.split("-"),
      hoy = new Date(Number(date[0]), (Number(date[1])-1), Number(date[2])),
      dias = parseInt(dias),
      calculado = new Date(),
      dateResul = operacion == "sumar" ? hoy.getDate() + dias : hoy.getDate() - dias;

      calculado.setDate(dateResul);

      let diaTexto = calculado.getDate() < 10 ? "0"+calculado.getDate() : String(calculado.getDate());
      let mesTexto = (calculado.getMonth() + 1) < 10 ? "0"+(calculado.getMonth() + 1) : String((calculado.getMonth() + 1));
      let anioTexto = String(calculado.getFullYear());

      let fechaNuevaCompleta = anioTexto+"-"+mesTexto+"-"+diaTexto;

      return [fechaNuevaCompleta, calculado.getDate(), (calculado.getMonth() + 1), calculado.getFullYear()];
      
    }

  //-----------------------------------------------------------------------------------------------

  // Hora a Minutos

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
    
  //------------------------------------------------------------------------------------------------------

  // Crear HORA ACTUAL (Formato: 00:00 AM/PM)

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
    
  //------------------------------------------------------------------------------------------------------

  // Crear FECHA ACTUAL (Formato 0000-00-00)

    function crearFecha(){

      let anioNumActual = new Date().getFullYear();
      let diaNumActual = new Date().getDate();
      let mesNumActual = new Date().getMonth()+1;
      let mesNumAnterior = new Date().getMonth();
      let anioNumAnte = mesNumAnterior == 0 ? anioNumActual-1 : anioNumActual;
      mesNumAnterior = mesNumAnterior == 0 ? 12 : mesNumAnterior;
      let mesNumPosterior = new Date().getMonth()+2;
      let anioNumPoste =  mesNumPosterior == 13 ? anioNumActual+1 : anioNumActual;
      mesNumPosterior = mesNumPosterior == 13 ? 1 : mesNumPosterior;

      let diaActualTexto = diaNumActual < 10 ? "0"+diaNumActual : diaNumActual;
      let mesActualTexto = mesNumActual < 10 ? "0"+mesNumActual : mesNumActual;
      let mesAnteriorTexto = mesNumAnterior < 10 ? "0"+mesNumAnterior : mesNumAnterior;
      let mesPosteriorTexto = mesNumPosterior < 10 ? "0"+mesNumPosterior : mesNumPosterior;
      let anioActualTexto = String(anioNumActual);

      let fechaFinal = anioActualTexto+"-"+mesActualTexto+"-"+diaActualTexto;
      let sumaFechaActual = anioNumActual+(mesNumActual*30)+diaNumActual;

      let diaSemana = numeroDiaSemana(fechaFinal);

      return [
        fechaFinal, 
        diaNumActual,
        mesNumAnterior, 
        mesNumActual, 
        mesNumPosterior,
        anioNumActual, 
        diaActualTexto,
        mesActualTexto,
        mesAnteriorTexto,
        mesPosteriorTexto,
        anioActualTexto,
        anioNumAnte,
        anioNumPoste,
        diaSemana, 
        sumaFechaActual
      ];

    }

  //------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------

//

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// DOM - INICIO
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//-----------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------
//<<-- ADMINISTRACION.PHP | INICIO -->> (línea 140 - 5475)
//---------------------------------------------------------

if (document.querySelector(".administracionHTML") != null) {

  //----------------------------------------------------------------------------------------------------------------------
  //----------------------------
  // TOMANDO ELEMENTOS DEL DOM
  //----------------------------

    // BOTONES
    const flechaPerfilDiv = document.querySelector(".divFlecha");
    const flechaPerfil = document.querySelector(".flechaIconPerfil");
    const btnCerrarSesion = document.querySelector(".btnCerrar");
    const ajustesCuentaBtn = document.querySelector("#ajustesCuentaBtn");

    const btnPanelPrincipal = document.querySelector(".btnAsidePrimero");
    const btnCalendario = document.querySelector(".btnCalenda");
    const btnEstadisPanel = document.querySelector(".btnEstadis");
    const btnProductos = document.querySelector("#btnProductos");

    const btn_reseXH = document.querySelector("#btnReseXH");
    const btn_reseXD = document.querySelector("#btnReseXD");
    const btn_reseXS = document.querySelector("#btnReseXS");
    const btn_reseXM = document.querySelector("#btnReseXM");
    //------------------------------------------------------------------------

    // CONTENEDORES
    const cuadroOPerfil = document.querySelector(".cuadroPOculto");
    const mainDivPrin = document.querySelector(".main_divPrincipal");
    const navUl = document.querySelector(".nav_ul");
    const body = document.querySelector(".body");

    const fondoNegroNewRese = document.querySelector("#fondoNegroNewRese");
    const div_listaPdt = document.querySelector("#div_listaPdt");
    const div_pdtSeleContainer = document.querySelector("#div_pdtSeleContainer");
    const div_tipoReseYTiempoGene = document.querySelector("#div_tipoReseYTiempoGene");
    const div_tiempoReseBase = document.querySelector("#div_tiempoReseBase");

    const div_listaMiembroNRA = document.querySelector("#div_listaMiembroNRA");
    //-------------------------------------------------------------------------

    //INPUTS
    const in_pdtNomAdminNR = document.querySelector("#in_pdtNomAdminNR");
    

    const inO_idPdtSelecNR = document.querySelector("#inO_idPdtSelecNR");
    
    //-------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------------

    const nombreUsuario = document.querySelector("#nombreUsuario");
    const membresiaUsuario = document.querySelector("#membresiaUsuario");
    const direccionUsuario = document.querySelector("#direccionUsuario");
    const cedulaUsuario = document.querySelector("#cedulaUsuario");
    const celularUsuario = document.querySelector("#celularUsuario");
    const correoUsuario = document.querySelector("#correoUsuario");

    const nombreOtrosUsuarios = document.querySelector("#nombreOtrosUsuarios");
    // Seleccionar los elementos
    const precioCompra = document.querySelector("#precioCompra");
    const facturaFechaCompra = document.querySelector("#facturaFechaCompra");
    const facturaHoraCompra = document.querySelector("#facturaHoraCompra");
    const facturaInicio = document.querySelector("#facturaInicio");
    const facturaFinalizacion = document.querySelector("#facturaFinalizacion");
    const facturaDuracion = document.querySelector("#facturaDuracion");
    const productoElemento = document.querySelector("#producto");
    const unidadElemento = document.querySelector("#unidad");

    const subtotalCompraRE = document.querySelector("#subtotalCompraX");
    const ivaCompraRE = document.querySelector("#ivaCompraX");
    const totalCompraRE = document.querySelector("#totalCompraX");

    // Asignar valores a los campos



  //----------------------------------------------------------------------------------------------------------------------

  //-----------------------------------
  // VARIABLES GENERALES Y CONSTANTES 
  //-----------------------------------

    // Para definir los meses en el archivo según su número.

      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const mesesABRE = [
        "ENE",
        "FEB",
        "MAR",
        "ABR",
        "MAY",
        "JUN",
        "JUL",
        "AGO",
        "SEP",
        "OCT",
        "NOV",
        "DIC"
      ]

    //------------------------------------------------

    // Fecha que cambiara según se mueva el calendario (MODO MES), actualizándolo en el proceso.

      var mesCalenMGene = new Date().getMonth()+1;
      var anioCalenMGene = new Date().getFullYear();

    //------------------------------------------------

    // Tomamos la fecha actual

      const diaFijo = new Date().getDate();
      const mesFijo = new Date().getMonth()+1;
      const añoFijo = new Date().getFullYear();

    //------------------------------------------------

    // Para el Calendario MODO DÍA

      var diaFijoD = new Date().getDate();
      var mesFijoD = new Date().getMonth()+1;
      var añoFijoD = new Date().getFullYear();
      var horaFijaD = new Date().getHours();

      var redibujoCalendaDia = 0;
      var itrvalRedibujoCalendaDia = null;
      var itrvalTiempoRestaDia = null;
      var itrvalLineaTCalendaDia = null;
      var intrvalDataReseCuadro = null;

    //------------------------------------------------

    // Reservas actualización general

      var itrvalActuReseGene = null;

    //------------------------------------------------

  //---------------------------------------------------------------------------------------------------------------------------------------
  
  //---------------------------------------------------------------------------------------------------------------------------------------
  //------------
  // FUNCIONES 
  //------------

      function semanaAdelanteAtras(pos){

        if(pos == "adelante"){
          diasSemana += 1;
        }else{
          if(diasSemana > 0){
            diasSemana -= 1;
          }
        }

        definirSemanaReservaXS();

      }

      function longitudSemana(longi){

        document.querySelector(".in_lunesAViernes").classList.replace("in_lunesAViernes-A", "in_lunesAViernes-N");
        document.querySelector(".in_lunesASabado").classList.replace("in_lunesASabado-A", "in_lunesASabado-N");

        if(longi == "viernes"){
          document.querySelector(".in_lunesAViernes").classList.replace("in_lunesAViernes-N", "in_lunesAViernes-A");
        }else{
          document.querySelector(".in_lunesASabado").classList.replace("in_lunesASabado-N", "in_lunesASabado-A");
        }

        desdeHastaSemana = longi;

        definirSemanaReservaXS();

      }

      function definirSemanaReservaXS(){

        if(diasSemana == 0){
          document.querySelector(".btn_atrasSemana").setAttribute("disabled", "");
          document.querySelector(".btn_atrasSemana").classList.replace("btn_atrasSemana-D", "btn_atrasSemana-B");
        }else{
          document.querySelector(".btn_atrasSemana").removeAttribute("disabled");
          document.querySelector(".btn_atrasSemana").classList.replace("btn_atrasSemana-B", "btn_atrasSemana-D");
        }

        let diaSemanaNumero = numeroDiaSemana(cadenaFechaActual);
        let cantiSemanasNum = document.querySelector("#in_numeroSemanasCant").value;

        console.log(cantiSemanasNum);

        let formSemanaFechas = new FormData();

        formSemanaFechas.append("fechasSemana", true);
        formSemanaFechas.append("diaSemanaFecha", cadenaFechaActual);
        formSemanaFechas.append("diaSemanaNum", diaSemanaNumero);
        formSemanaFechas.append("numeroSemana", diasSemana);
        formSemanaFechas.append("longitudSemana", desdeHastaSemana);
        formSemanaFechas.append("cantiSemanas", cantiSemanasNum);

        fetch(urlBuscarInfoAdminDB, {
          method: "POST",
          body: formSemanaFechas,
        })
          .then((response) => response.json())
          .then((data) => {

            console.log(data);

            document.querySelector("#inO_iniSemanaFecha").value = data[0];
            document.querySelector("#inO_finSemanaFecha").value = data[1];

            document.querySelector(".span_fechaIniSemana").textContent = data[0];
            document.querySelector(".span_fechaFinSemana").textContent = data[1];

            revisarDispoReserva('semana');

          })
          .catch((err) => console.log(err));

      }

    //-------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------
    // Crear el Panel Principal de la Administración
    //------------------------------------------------
      
      const rangePanelPrincipal = document.createRange();
      const rangoHistorialBase = document.createRange();

      function cargarPanelPrin(){

        let formInfoPanelPrin = new FormData();

        formInfoPanelPrin.append("adminPanelPrin", true);

        fetch(urlBuscarInfoAdminDB, {
          method: "POST",
          body: formInfoPanelPrin,
        })
          .then((response) => response.json())
          .then((data) => {

            let arrayFacturas = data[0];
            let arrayMiembros = data[1];
            let arrayReservas = data[2];

            let cantidadFactuPagar = 0;
            let cantidadFactuHoy = 0;
            let cantidadMiembrosTotales = arrayMiembros.length-1;
            let cantidadMiembrosRecientes = 0;
            let cantidadReseRecientes = 0;
            let cantidadReseTotal = arrayReservas.length-1;

            // Recorrer facturas

              for(let i = 1; i < arrayFacturas.length; i++){

                if(arrayFacturas[i]["estadoFactura"] == "Pendiente"){
                  cantidadFactuPagar++;
                }

                if(arrayFacturas[i]["fechaFactura"] == cadenaFechaActual){
                  cantidadFactuHoy++;
                }

              }

            //--------------------------------------------------------------------------------------

            // Buscar Miembros Recientes

              for(let i = 1; i < arrayMiembros.length; i++){

                if(arrayMiembros[i]["user_fechaU"] == cadenaFechaActual){
                  cantidadMiembrosRecientes++;
                }

              }
            
            //---------------------------------------------------------------------------------------

            // Buscar Reservas Recientes

              for(let i = 1; i < arrayReservas.length; i++){

                if(arrayReservas[i]["fechaCompraReser"] == cadenaFechaActual){
                  cantidadReseRecientes++;
                }

              }
            
            //---------------------------------------------------------------------------------------

            let htmlPanelPrincipal = `
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
                          <span class="miembrosTSpan">${cantidadMiembrosTotales}</span>
                          <div>
                              <span>Menbresías recientes</span>
                              <span class="miembrosRecienSpan">${cantidadMiembrosRecientes}</span>
                          </div>
                          <span>${cadenaFechaActual}</span>
                          <a href="listaMiembros.php">Todos los Miembros</a>
                      </div>
                      <div>
                          <span>Facturas por Pagar</span>
                          <span class="factuTSpan">${cantidadFactuPagar}</span>
                          <div>
                              <span>Facturas recientes</span>
                              <span class="factuRecienSpan">${cantidadFactuHoy}</span>
                          </div>
                          <span>${cadenaFechaActual}</span>
                          <a href="listaFacturas.php">Administrar Facturas</a>
                      </div>
                  </div>
                  <div class="divExtraB">
                      <!--<div>
                          <span>Mensajes y Problemas</span>
                          <span class="mensajeTSpan"></span>
                          <div>
                              <span>Mensajes recientes</span>
                              <span class="mensajeRecienSpan"></span>
                          </div>
                          <span>${cadenaFechaActual}</span>
                          <a href="mensajes.php">Todos los Mensajes</a>
                      </div>-->
                      <div>
                          <span>Reservas Totales</span>
                          <span class="reservasTSpan">${cantidadReseTotal}</span>
                          <div>
                              <span>Reservas del Día</span>
                              <span class="reserRecienSpan">${cantidadReseRecientes}</span>
                          </div>
                          <span>${cadenaFechaActual}</span>
                          <a href="reservas.php">Administrar Reservas</a>
                      </div>
                  </div>
              </div>
            </div>`;

            mainDivPrin.innerHTML = "";

            rangePanelPrincipal.selectNode(document.getElementsByTagName("div").item(0));
            const datosPanelPrincipal =
              rangePanelPrincipal.createContextualFragment(htmlPanelPrincipal);
            mainDivPrin.appendChild(datosPanelPrincipal);

            // Cargando Info del Historial

              if(document.querySelector("#divTareasHistoBase") != null){
          
                let formHistoPanelPrin = new FormData();
                let fechaAnterior = sumaRestaDiasFecha(cadenaFechaActual, "restar", 1);

                let histoTareasHTML = ``;

                formHistoPanelPrin.append("panelPrinHisto", true);
                formHistoPanelPrin.append("fechaActual", cadenaFechaActual);
                formHistoPanelPrin.append("fechaActualAnte", fechaAnterior[0]);
          
                fetch(urlBuscarInfoAdminDB, {
                  method: "POST",
                  body: formHistoPanelPrin,
                })
                  .then((response) => response.json())
                  .then((data) => { 

                    if(data.length > 1){

                      arrayHistorialTareas = data;
                      
                      for(let i = 1; i < arrayHistorialTareas.length; i++){

                        if(arrayHistorialTareas[i]["tarea_tipo"] == "Reserva"){
                          
                          histoTareasHTML += `
                          <div class="divHisto divHistoNewRese divHistoNewRese${arrayHistorialTareas[i]["id_historial"]}">
                              <div class="divSvg">
                                  <div class="divSpan"><span>Nueva Reserva</span></div>
                                  <div class="divSvg2">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.54 419.26"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M383.51,82.39c0-17-13.77-31-31-31.72a21.32,21.32,0,0,0-3,0c-3,.29-4.24-1-4.19-4.08.15-8.1-.19-16.22.11-24.31.4-11-4.29-18.38-14.56-22.25H308.39c-10.34,3.62-15.12,10.33-15.18,21.42,0,8,0,16,0,23.95,0,5.23,0,5.25-5.21,5.25H106.11c-4.11,0-8.23-.1-12.35,0C91,50.73,90,49.57,90,46.87c.09-8.49.06-17,0-25.45C90,10.33,85.19,3.62,74.85,0H52.39c-10.26,3.87-15,11.25-14.56,22.24.3,8.22,0,16.46.07,24.69,0,2.13-.42,3.71-3,3.69C16.79,50.42,5.31,59.21,0,76.35V357.8c2.75,9.78,8,17.65,17.32,22.33A30.17,30.17,0,0,0,31,383.54q105.74,0,211.48,0c-3.06-2.54-6.07-5.09-9-7.57L231.16,374l-5-4.19q-94.47,0-188.94.18c-16.43.05-24.14-7.73-24-23.94.39-57.5.15-115,.16-172.51,0-1.37,0-2.75.06-4.12a2.72,2.72,0,0,1,3-3l3.74,0H363.77c6,0,6.1.06,6.1,6q0,60.5,0,121a33,33,0,0,1,7.92,17.07,33.52,33.52,0,0,1,.35,4.84q0,27,0,54.11a31.06,31.06,0,0,0,5.35-17.34Q383.58,217.25,383.51,82.39Zm-76.3-62.83c0-3.69,2-5.74,5.83-6a105.67,105.67,0,0,1,12.33-.05c4.26.23,6,2.16,6,6.49.08,10.47,0,21,0,31.42h0c0,10,0,20,0,29.93,0,5.59-1.89,7.39-7.42,7.45-3.49,0-7,.09-10.47,0-4-.15-6.3-2.34-6.32-6.37Q307.09,51,307.21,19.56ZM51.82,20.87c0-5.45,1.7-7.25,7.07-7.43a107.66,107.66,0,0,1,11.22.12c4,.28,5.92,2.33,5.93,6.28q.1,31.23,0,62.48c0,4.2-2.34,6.34-6.6,6.47-3.24.1-6.48,0-9.72,0-6.09,0-7.88-1.73-7.9-7.72,0-10,0-19.95,0-29.93S51.77,31,51.82,20.87ZM369.87,148.64c0,2.86-1.26,4.06-4.09,4-3.87-.09-7.74,0-11.6,0H20.05c-6.66,0-6.67,0-6.67-6.63q0-29.94,0-59.87c0-5.31.47-10.43,4.14-14.76C22.23,65.8,28.26,64,35.26,64.59c2.15.17,2.64,1.48,2.63,3.32q0,7.11,0,14.22C38,93,44.38,100.8,55,102.42a59.88,59.88,0,0,0,17.53,0c10.63-1.55,17.12-9.21,17.47-20.1.14-4.49.18-9,0-13.47-.13-3.25,1.12-4.38,4.36-4.36,18.33.1,36.67,0,55,0H287.43c5.76,0,5.68,0,5.79,5.85.09,5.11-.52,10.24.42,15.31,1.74,9.4,7.34,15.28,16.74,16.63a56.33,56.33,0,0,0,19.72-.29,19.28,19.28,0,0,0,15.21-18.46c.11-5,.16-10,0-15-.11-3.14,1.19-4.08,4.2-4.11,12-.11,20,6.7,20.18,18.66C370.06,105,369.81,126.82,369.87,148.64Z"/><path d="M90,193.88c0-6.58-2.74-9.17-9.46-9.22-5.61,0-11.22,0-16.83,0-5.86,0-11.72-.08-17.58,0-5.59.11-8.21,2.8-8.24,8.37q-.07,14.4,0,28.8c0,5.75,2.23,8.48,8,8.6q17.94.41,35.9,0c5.76-.12,8.18-3,8.23-8.91Q90.14,207.72,90,193.88ZM72.23,216.81c-2.74-.11-5.49,0-8.23,0-3,0-6,0-9,0-2.19,0-3.22-1-3.21-3.16,0-3.87,0-7.73,0-11.6,0-2.31.93-3.45,3.34-3.43q8.79.08,17.59,0c2.36,0,3.41,1,3.37,3.37-.07,3.74-.11,7.49,0,11.23C76.21,216,74.86,216.92,72.23,216.81Z"/><path d="M173.06,193.35c-.08-5.93-2.9-8.59-8.88-8.68-5.73-.08-11.47,0-17.2,0s-11.72-.07-17.58,0-8.38,2.71-8.41,8.54q-.06,14.21,0,28.42c0,6.16,2.25,8.76,8.47,8.87q17.58.3,35.16,0c5.82-.11,8.36-2.88,8.44-8.73Q173.26,207.57,173.06,193.35Zm-13.91,20.57c0,2.05-1.09,2.87-3.05,2.86-6.09,0-12.18,0-18.27,0-2,0-3-1-3-3,0-4.1,0-8.2,0-12.3,0-2,1.14-2.87,3.09-2.86,3.11,0,6.22,0,9.32,0,2.86,0,5.72,0,8.58,0,2.09,0,3.32.74,3.3,3C159.13,205.71,159.15,209.82,159.15,213.92Z"/><path d="M345.34,193.5c0-6.21-2.6-8.77-8.92-8.84-5.61-.06-11.22,0-16.83,0-5.86,0-11.72-.07-17.58,0s-8.71,2.78-8.77,8.76c0,.66,0,1.33,0,2a33.75,33.75,0,0,1,4.92,3.25,33.4,33.4,0,0,1,9,11.05c0-2.63,0-5.25,0-7.88,0-2.17.93-3.24,3.13-3.23q9,0,18,0c2.2,0,3.2,1,3.19,3.18,0,3.86-.05,7.73,0,11.6.05,2.64-1.28,3.49-3.73,3.42-2.86-.1-5.73,0-8.6,0h0c-3,0-6,0-9,0h-.36a33.6,33.6,0,0,1,.92,7.58v.42c0,1.62,0,3.23,0,4.84v1q13.47.15,26.93-.17c5.53-.13,7.66-2.89,7.68-8.48Q345.41,207.71,345.34,193.5Z"/><path d="M90,256.9c-.07-5.24-2.48-8.14-7.67-8.25-12.34-.27-24.69-.28-37,0-5.3.13-7.36,2.93-7.39,8.36q-.06,14.4,0,28.8c0,5.78,2.64,8.44,8.46,8.53s11.72,0,17.58,0,11.72.09,17.58,0c5.57-.11,8.37-2.76,8.45-8.29C90.13,276.35,90.11,266.63,90,256.9ZM76.07,277.52c0,2-1,2.93-3,2.92-3.1,0-6.21,0-9.31,0H54.82c-2,0-3-1-3-2.95V265.19c0-2,1.05-2.92,3-2.91q9.12,0,18.25,0c2,0,3,.94,3,3Q76.05,271.38,76.07,277.52Z"/><path d="M173,256.69c-.1-5.12-2.51-7.91-7.51-8q-18.49-.42-37,0c-5.4.13-7.48,2.82-7.5,8.23q-.07,14.4,0,28.8c0,6,2.55,8.61,8.63,8.7,5.73.08,11.47,0,17.21,0s11.72.08,17.57,0c5.62-.1,8.52-2.68,8.63-8.15Q173.3,271.47,173,256.69Zm-13.85,20.62c0,2.21-1,3.15-3.19,3.14q-8.94,0-17.89,0c-2.15,0-3.25-.95-3.24-3.13q0-6,0-11.93c0-2.17,1.07-3.15,3.23-3.12,3,0,6,0,9,0s6,0,8.95,0c2.17,0,3.22.9,3.2,3.11Q159.11,271.35,159.17,277.31Z"/><path d="M227.33,280.45c-2.12,0-3.27-.82-3.25-3.06,0-4,0-8,0-11.93,0-2.48,1.25-3.26,3.5-3.2,2.86.06,5.72,0,8.58,0,2.5,0,5,.05,7.49,0l0-13.86q-12.15-.09-24.3.09c-6.59.08-9.1,2.84-9.16,9.58q-.1,13.47,0,26.93c.05,6.65,2.74,9.31,9.33,9.38,5.61.05,11.22,0,16.83,0h7.38v-5.93c0-2.68,0-5.37,0-8.05Q235.53,280.41,227.33,280.45Z"/><path d="M345.34,257.45c0-6-2.2-8.74-8.12-8.86-8.82-.18-17.67-.23-26.5-.13v13.8c5.84,0,11.7,0,17.54,0,2.18,0,3.18,1,3.17,3.16,0,4,0,7.95,0,11.92a2.83,2.83,0,0,1-1.1,2.62l4.38.48c3.47.38,7.05.77,10.65,1.31Q345.4,269.61,345.34,257.45Z"/><path d="M173,320.14c-.13-5.18-3-7.48-8.27-7.52-5.86-.05-11.72,0-17.57,0-6.11,0-12.22-.05-18.33,0-5.29.05-7.77,2.52-7.81,7.81q-.09,14.78,0,29.54c0,5.58,2.44,8,7.93,8.07q18,.09,35.9,0c5.22,0,8-2.42,8.16-7.64Q173.33,335.29,173,320.14Zm-13.83,21.08c0,2-1,3-3,3h-9.33v0c-2.86,0-5.72,0-8.58,0-2.32,0-3.45-1.05-3.43-3.39,0-3.73,0-7.46,0-11.19,0-2.17,1.1-3.18,3.23-3.18q9,0,17.91,0c2.15,0,3.2,1,3.17,3.2C159.13,333.51,159.14,337.37,159.15,341.22Z"/><path d="M89.91,320c-.11-4.84-2.93-7.3-7.68-7.32q-18.32-.11-36.64,0c-5,0-7.62,2.62-7.66,7.63q-.12,15,0,29.91c0,5.28,2.58,7.82,7.79,7.88,6,.08,12,0,17.95,0s12.21.05,18.32,0c5-.06,7.84-2.47,7.94-7.45Q90.25,335.28,89.91,320Zm-17,24.25H55c-2.14,0-3.22-1-3.21-3.17,0-3.86,0-7.71,0-11.56a2.67,2.67,0,0,1,3-3H73.09c2,0,3,1,3,3,0,3.85,0,7.7,0,11.56C76.11,343.19,75.08,344.22,72.92,344.21Z"/><path d="M207.12,338.14a2.26,2.26,0,0,1-.52-2C206.74,336.79,206.91,337.46,207.12,338.14Z"/><path d="M268.93,93.94c0-9.38-2-11.39-11.4-11.5H191.66c-22,0-43.91,0-65.87,0-9.44,0-11.46,2.1-11.47,11.41,0,10.23,0,20.46,0,30.69,0,7.59,2.52,10.22,10.08,10.22q67.17.07,134.35,0c7.61,0,10.12-2.61,10.15-10.15C269,114.4,268.94,104.17,268.93,93.94ZM250.36,121c-15.84-.16-31.67-.06-47.5-.06H133.29c-4.92,0-5-.1-5-5s0-9.73,0-14.59c0-5.24,0-5.25,5.19-5.25H243.78c2.62,0,5.24.06,7.85,0,2.38-.07,3.39,1,3.36,3.36-.05,5.61-.18,11.23.06,16.83C255.2,119.85,254,121.08,250.36,121Z"/><path d="M263.07,194.37c-9.09,4.26-16.18,12.47-18.41,22.14q-4.22,5-8.42,10.09c-1.81,2.17-3.8,4-6.83,4a7.65,7.65,0,0,1-5.6-2.62c-5.49-5.42-10.9-10.93-16.41-16.34-1.68-1.64-1.73-2.85-.07-4.66,7.23-7.82,7.17-7.87,14.65-.4,7,7,7,7,13.4-.57,6.17-7.34,12.34-14.67,18.38-22.12,1.85-2.28,3.31-2.83,5.7-.69C267.27,190.22,268.11,188.55,263.07,194.37Z"/><path d="M307.18,209.72c0,1.36,0,2.72,0,4.09,0,1.89.84,2.86,2.61,3A32.79,32.79,0,0,0,307.18,209.72Z"/><path d="M370.13,315.35a25.13,25.13,0,0,0-19.61-24.53c-1.91-.42-3.82-.76-5.75-1.06-6.29-1-12.65-1.45-19-2.29-6.66-.89-13.35-1.64-20-2.39-2.23-.25-3.28-1.1-3.11-3.58.19-2.84.1-5.71.06-8.57,0-.51,0-1,0-1.54s0-.72,0-1V246.77c0-.32,0-.66,0-1,0-2.18,0-4.38,0-6.57v-9.55c0-1.74,0-3.48,0-5.22a25,25,0,0,0-9.53-19.46,26.42,26.42,0,0,0-14.47-5.64c-12.65-1-25.34,8.88-26.68,21.55a108.66,108.66,0,0,0-.44,12.38c0,3.83.16,7.66.14,11.47a36.57,36.57,0,0,1-.09,3.81.59.59,0,0,1,0,.14v0l0,20.72a7.1,7.1,0,0,1,.11,1.47c-.05,5.88-.06,11.76-.07,17.64v5.92q0,8.16,0,16.33a3.58,3.58,0,0,1-.5,2.69l-2.39-1.76c-13.16-9.6-32.36-5.57-39.89,8.48a23.69,23.69,0,0,0-2.32,16c.14.68.31,1.35.52,2a27.17,27.17,0,0,0,9.35,13.3c7.48,6,14.8,12.22,22.13,18.4,3.61,3.05,7.22,6.1,10.86,9.11a5.77,5.77,0,0,1,2.28,4.57c0,.16,0,.33,0,.5-.09,8.52-.06,17,0,25.56,0,6.14,3.44,9.66,9.53,9.66q49.58,0,99.16,0c6.26,0,9.73-3.56,9.73-9.78q0-15.88,0-31.75Q370.15,346.53,370.13,315.35ZM349.8,401.58c-13-.08-26,0-39,0-12.73,0-25.44-.07-38.17.06-2.74,0-3.92-.6-3.69-3.56a94.58,94.58,0,0,0,0-9.82c-.05-1.85.48-2.71,2.51-2.7q39.43.08,78.86,0c2,0,2.59.81,2.55,2.69-.1,3.45-.15,6.92,0,10.38C353,401,352.06,401.59,349.8,401.58Zm.27-33.72q-42.29-.09-84.56,0a5.28,5.28,0,0,1-3.58-1.31q-10.5-8.82-21-17.62-5.74-4.82-11.46-9.65l-3.21-2.72a6.64,6.64,0,0,1,1.84-11.46c3.82-1.58,7.68-1.52,11.09,1.36l1.49,1.26c3.51,3,7,5.95,10.56,8.88,1,.84,2,1.67,3,2.49,5.28,4.32,12.43,2.47,14.42-3.59a12.18,12.18,0,0,0,.35-3.89q0-26.13,0-52.25V226.53c0-3.7,1.09-6.84,4.58-8.68A8,8,0,0,1,284.93,223a21.39,21.39,0,0,1,.51,5.29q0,31.19,0,62.37c0,7.17,2.57,9.85,9.7,10.71q24.9,3,49.78,6.21,7.86,1,7.92,10.14c.06,10.67,0,21.35,0,32,0,5.06-.07,10.12,0,15.18C352.94,367,352.36,367.87,350.07,367.86Z"/></g></g></svg>
                                  </div>
                                  <div class="divCodigo">
                                      <span>Código Reserva</span>
                                      <span>${arrayHistorialTareas[i]["codigoReserva"]}</span>
                                  </div>
                              </div>
                              <div class="divDatos">
                                  <div class="div1"> 
                                    <span class="creadaEn">Creada en:</span>
                                    <div class="hYFCreacionDiv">${arrayHistorialTareas[i]["fechaCompraReser"]} | ${arrayHistorialTareas[i]["horaCompraReser"]}</div>
                                    <div class="userDivContent">
                                      <span class="por">Por: </span> 
                                      <div class="divUserRese">
                                          <div class="divImg">
                                              <img src="imagesUser/${arrayHistorialTareas[i]["user_imagen"]}">
                                          </div>
                                          <div class="divDatos">
                                              <span>${arrayHistorialTareas[i]["user_nombre"]+" "+arrayHistorialTareas[i]["user_apellido"]}</span>
                                              <span>${arrayHistorialTareas[i]["user_empresa"]} - ${arrayHistorialTareas[i]["user_cargo"]}</span>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="div2">
                                    <div>
                                      <span>Inicio:</span>
                                      <div class="hYFCreacionDiv">${arrayHistorialTareas[i]["tarea_fechaEje"]} | ${arrayHistorialTareas[i]["tarea_horaEje"]}</div>
                                    </div>
                                    <div>
                                      <span>Final:</span>
                                      <div class="hYFCreacionDiv">${arrayHistorialTareas[i]["tarea_fechaFEje"]} | ${arrayHistorialTareas[i]["tarea_horaFEje"]}</div>
                                    </div>
                                  </div>
                                  <span class="span1">${arrayHistorialTareas[i]["tarea_estado"]}</span>
                              </div>
                          </div>
                          `;

                        }

                        if(arrayHistorialTareas[i]["tarea_tipo"] == "cancelReserva"){

                          let $horas24 = arrayHistorialTareas[i]["reservaCancel24H"] == "0" ? "Cancelada con 24 horas de antelación" : arrayHistorialTareas[i]["reservaCancel24H"];

                          histoTareasHTML += `
                          <div class="divHisto divHistoCancelRese divHistoCancelRese${arrayHistorialTareas[i]["id_historial"]}">
                              <div class="divSvg">
                                  <span class="spanRese1">Reserva Cancelada</span>
                                  <div class="svgDiv2">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2315.2 1759.6"><g id="Capa_2" data-name="Capa 2"><g id="Layer_1" data-name="Layer 1"><path d="M2161.5,0H153.7A153.43,153.43,0,0,0,0,153.7V1605.9a153.43,153.43,0,0,0,153.7,153.7H2161.5c84.3,0,152.9-69.3,153.7-154.4V153.7A153.43,153.43,0,0,0,2161.5,0Zm74.1,1605.2a74,74,0,0,1-74.1,74.1H153.7a74,74,0,0,1-74.1-74.1V153.7a74,74,0,0,1,74.1-74.1H2161.5a74,74,0,0,1,74.1,74.1Z" style="fill-rule:evenodd"/><path d="M618.6,216.7H249a40.33,40.33,0,0,0-40.2,40.2V557.1A40.33,40.33,0,0,0,249,597.3H618.6c22.1,0,39.4-17.3,40.2-40.2V256.9A40.33,40.33,0,0,0,618.6,216.7Zm-40.1,301h-290V297.9h290Z" style="fill-rule:evenodd"/><path d="M2089.8,217.5H1720.2a40.33,40.33,0,0,0-40.2,40.2V557.1a40.33,40.33,0,0,0,40.2,40.2h369.6c22.1,0,40.2-17.3,40.2-39.4V257.7A40.33,40.33,0,0,0,2089.8,217.5Zm-39.4,300.2h-290V297.9h290Z" style="fill-rule:evenodd"/><path d="M618.6,689.5H249c-22.1,0-40.2,17.3-40.2,39.4v300.2a40.33,40.33,0,0,0,40.2,40.2H618.6c22.1,0,39.4-17.3,40.2-39.4V729.7A40.33,40.33,0,0,0,618.6,689.5ZM578.5,989.7h-290V769.9h290Z" style="fill-rule:evenodd"/><path d="M2089.8,689.5H1720.2c-22.1,0-40.2,17.3-40.2,39.4v300.2a40.33,40.33,0,0,0,40.2,40.2h369.6c22.1,0,40.2-17.3,40.2-39.4V729.7A40.33,40.33,0,0,0,2089.8,689.5Zm-39.4,300.2h-290V769.9h290Z" style="fill-rule:evenodd"/><path d="M618.6,1161.5H249a40.33,40.33,0,0,0-40.2,40.2v300.2a40.33,40.33,0,0,0,40.2,40.2H618.6c22.1,0,39.4-18.1,40.2-40.2V1201.7A40.33,40.33,0,0,0,618.6,1161.5Zm-40.1,301h-290V1242.7h290Z" style="fill-rule:evenodd"/><path d="M2089.8,1161.5H1720.2a40.33,40.33,0,0,0-40.2,40.2v300.2a40.33,40.33,0,0,0,40.2,40.2h369.6a40.33,40.33,0,0,0,40.2-40.2V1201.7A40.33,40.33,0,0,0,2089.8,1161.5Zm-39.4,301h-290V1242.7h290Z" style="fill-rule:evenodd"/><path d="M1382.2,504.32V257.7a40.33,40.33,0,0,0-40.2-40.2H972.4a40.33,40.33,0,0,0-40.2,40.2V504.8C805.32,581.44,720.3,720.69,720.3,879.4s85,298,211.9,374.6v247.9a40.33,40.33,0,0,0,40.2,40.2H1342c22.1,0,39.4-18.1,41-40.2v-248c126.66-76.66,211.44-215.87,211.9-374.53C1594.9,720.36,1509.52,580.86,1382.2,504.32ZM1012.6,297.9h289.2V466.54a437.71,437.71,0,0,0-289.2.27Zm290,1163.8h-290V1292a437.62,437.62,0,0,0,290,0ZM1329,1193.85a39.86,39.86,0,0,0-9.48,5,356.37,356.37,0,0,1-323.92,0,40.46,40.46,0,0,0-9.44-5C875.36,1133,799.9,1015.05,799.9,880.1c0-196.9,160.7-357.7,357.7-357.7a355.16,355.16,0,0,1,161.7,38.71,39.72,39.72,0,0,0,8.46,4.46A359.14,359.14,0,0,1,1515.3,880.1C1515.3,1015,1439.88,1132.93,1329,1193.85Z" style="fill-rule:evenodd"/><path d="M1212.7,879.4l146.6-146.6c15.8-14.9,15.8-40.1,0-55.9-14.9-15.8-40.1-15.8-55.9,0L1156.8,823.5,1011,677.7c-14.9-15.8-40.1-15.8-55.9,0-15.8,14.9-15.8,40.1,0,55.9l145.8,145.8L954.3,1026c-15.8,14.9-15.8,40.1,0,55.9a40.07,40.07,0,0,0,28.4,11.8c10.2,0,20.5-3.1,27.5-11.8l146.6-146.6,146.6,146.6a40.07,40.07,0,0,0,28.4,11.8c10.2,0,20.5-3.1,28.3-11,15.8-14.9,15.8-40.1,0-55.9Z"/></g></g></svg>
                                  </div>
                                  <div class="divSpanCod">
                                      <span>Código Reserva</span>
                                      <span>${arrayHistorialTareas[i]["codigoReserva"]}</span>
                                  </div>
                              </div>
                              <div class="divDataGeneCR">
                                  <div class="divFechaCancel">
                                      <div class="divFCancel">
                                        <span>Fecha y hora de cancelación:</span>
                                        <span>${arrayHistorialTareas[i]["reservaFcancel"]+" | "+arrayHistorialTareas[i]["reservaHcancel"]}</span>
                                      </div>
                                      <div class="div24Previas">
                                        <div>
                                          <span>Cancelada con:</span>
                                          <span>${$horas24}</span>
                                        </div>
                                        <div>
                                          <span>Coste adicional:</span>
                                          <span>${arrayHistorialTareas[i]["membreCancelCostoAdici"]}</span>
                                        </div>
                                      </div>
                                  </div>
                                  <span class="motivoCR">Motivos</span>
                                  <div class="divMotivoCR">${arrayHistorialTareas[i]["reservaMotiCancel"]}</div>
                                  <div class="divContaintUserGene">
                                      <span class="span1">Miembro de la Reserva</span>
                                      <div class="divMember">
                                          <div class="divImg">
                                              <img src="imagesUser/${arrayHistorialTareas[i]["user_imagen"]}" alt="">
                                          </div>
                                          <div class="divSpan">
                                              <span>${arrayHistorialTareas[i]["user_nombre"]+" "+arrayHistorialTareas[i]["user_apellido"]}</span>
                                              <span></span>    
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          `;

                        }

                        if(arrayHistorialTareas[i]["tarea_tipo"] == "nuevoMembre"){

                            histoTareasHTML += `
                            <div class="divHisto divHistoNewMember divHistoNewMember${arrayHistorialTareas[i]["id_historial"]}">
                                <div class="divSvg">
                                    <div class="spanDiv">
                                        <span>Nuevo Miembro</span>
                                    </div>
                                    <div class="svgDiv">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432.01 489.04"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M202.63,0c8.4,1.65,16.88,2.93,25,5.81,31.31,11.12,49.7,33.64,57.35,65.42,4.75,19.74,4.16,39.61,1.11,59.6-3.43,22.45-8.76,44.26-19.21,64.56-10,19.39-23.42,35.58-43.65,45A84.47,84.47,0,0,1,181,248c-40.36-2.74-63.75-27.29-78.94-62-9.45-21.6-13.93-44.45-16.3-67.81-2.13-21-.59-41.61,7.12-61.41C103.77,28.8,124.16,11.36,153,3.67c6-1.59,12.1-2.46,18.16-3.67Z"/><path d="M0,408.41c1.08-23.72,4.39-48.55,9.06-73.23,3.35-17.68,7.16-35.13,15.51-51.33a57.16,57.16,0,0,1,29.81-27.51c13.5-5.63,28.07-8.64,41-15.52,8.43-4.49,13.45-3.69,20.57,3.18,16.76,16.17,37.62,24.28,61,26.06,33.46,2.55,62.39-7.07,86.14-31.16,1.69-1.72,3.22-3.57,6.1-2,15.92,8.55,33.57,12.68,50.13,19.61a55,55,0,0,1,21.46,15.44c1,1.26,3.12,2.5,2.14,4.36-.8,1.52-2.91.78-4.43.77-19.44-.14-38,3.91-55.05,13.17-35.29,19.12-56.55,48.51-62.3,88.41-4.05,28.12,1.92,54.32,17,78.43,2.56,4.09,2.17,4.62-2.41,5.21a406.72,406.72,0,0,1-48.92,3.33,342.13,342.13,0,0,1-42.29-2.54A695,695,0,0,1,50,445.44a321.25,321.25,0,0,1-33.1-10.66C2.86,429.48-.17,425.1,0,408.41Z"/><path d="M337.16,489c-51.15.94-95.2-42.17-94.84-94.8s42.42-94.87,95-94.81A94.91,94.91,0,0,1,432,394.66C431.92,448.48,387.21,489.89,337.16,489ZM305.69,379v.17c-3.81,0-7.63-.15-11.44,0-5.78.27-9.84,3.37-12.3,8.47-4.91,10.14,1.72,21,13.6,22.34,1.73.2,3.5,0,5.25.12,6.48.3,14.85-2.67,19,1.08,4.46,4.07,1.08,12.62,1.5,19.2a53,53,0,0,0,.85,8.51,15.37,15.37,0,0,0,15.94,12.23,15,15,0,0,0,14.26-14.54c.27-6.83.32-13.68.1-20.51-.15-4.44,1.23-6.15,6-6.09,7.75.09,15.6,1.05,23.29-.64s13-8.77,12.37-15.92c-.75-8.23-6.71-14-15.09-14.31-6.83-.22-13.68-.3-20.5-.05-4.65.18-6.14-1.71-6-6.17.19-7.3.25-14.64-.22-21.93-.58-8.76-9-14.77-17.59-13.08s-13,7.45-13.25,17.22c-.16,6.51-.14,13,0,19.55.06,3.08-1.22,4.37-4.21,4.33C313.33,378.93,309.51,379,305.69,379Z"/></g></g></svg>
                                    </div>
                                    <div class="divCodNewMember">
                                        <span>Código Membresía</span>
                                        <span>${arrayHistorialTareas[i]["codigoReserva"]}</span>
                                    </div>  
                                </div>
                                <div class="divInfo">
                                    <div class="divMemberContaint">
                                        <div class="divMembre">
                                            <div class="divImg">
                                                <img src="imagesUser/${arrayHistorialTareas[i]["user_imagen"]}" alt="">
                                            </div>
                                            <div class="divDatos">
                                                <span>${arrayHistorialTareas[i]["user_nombre"]+" "+arrayHistorialTareas[i]["user_apellido"]}</span>
                                                <span>${arrayHistorialTareas[i]["user_empresa"]+" | "+arrayHistorialTareas[i]["user_cargo"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fechaHoraUDiv">
                                        <span>Se unio en:</span>
                                        <span>${arrayHistorialTareas[i]["user_fechaU"]+" a las "+arrayHistorialTareas[i]["user_horaU"]}</span>
                                    </div>
                                    <div class="tipoMembreDiv">
                                        <span>Membresía: </span>
                                        <span>${arrayHistorialTareas[i]["membre_nombre"]}</span>
                                    </div>
                                </div>
                            </div>
                            `;

                        }

                        if(arrayHistorialTareas[i]["tarea_tipo"] == "cancelMembre"){

                            histoTareasHTML += `
                            <div class="divHisto divHistoCancelMem divHistoCancelMem${arrayHistorialTareas[i]["id_historial"]}">
                                <div class="svgDivGene">
                                    <span class="span1">Membresía Cancelada</span>
                                    <div class="svgDiv2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.78 511.34"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M207.63,232.21c-53.12,6.74-93.78,49.65-95.35,105.44-.21,7.25-.31,14.49-.36,21.74q63.93-63.9,128.4-128.24l-17.07.07A131.41,131.41,0,0,0,207.63,232.21Z"/><path d="M359.67,255.57a103.6,103.6,0,0,0-45.41-21.76l-189,188.69a224.32,224.32,0,0,0,24.23,16.36q7.37,1.86,14.8,3.46c38.3,8.24,76.91,12.82,116.21,11.14a392.86,392.86,0,0,0,53.19-5.64c7.14-1.29,14.21-2.79,21.21-4.57a212.15,212.15,0,0,0,44.88-31.7c-.15-11.54,0-23.11,0-34.66,0-13.21.28-26.43-.05-39.63C398.86,304,385.28,276.71,359.67,255.57Z"/><path d="M256.88,57.55c-44.46-.59-85.09,34.52-85.2,84.1a83.66,83.66,0,0,0,74.43,83.73Q293,178.6,339.82,131.9C334.75,89.72,300,58.11,256.88,57.55Z"/><path d="M503.31,188Q458,40.79,307.9,4.67c-9.87-2.38-20-3.16-30-4.67h-44c-15.51,2-31.05,3.92-46,8.58Q37.34,55.5,3.64,209.35c-1.72,7.92-2.45,16.06-3.64,24.1v43.89c1.92,15,4.16,29.89,8.11,44.52C33.89,417.34,113,489.8,210.74,507.31,332.06,529.05,452.23,461.08,495.82,346a251.65,251.65,0,0,0,15.33-65.26c.11-1.15.42-2.28.63-3.42V233.45C509.78,218.14,507.87,202.8,503.31,188ZM82.47,395.37C55.49,361.49,39,323.3,34.16,280.19,21.51,168.32,94.15,67.26,200.07,39.62c18.28-4.77,37-6.77,56.31-7.1,51.93.59,98.72,17.09,139.78,49.79,3.81,3,3.49,4.73.25,8Q243.3,242.85,90.45,395.65C87.19,398.91,85.49,399.16,82.47,395.37Zm271.22,60.24c-27.83,13.63-57.29,21.31-88.41,22.15-3.32.09-6.64.45-10,.68q-79-1.28-140.49-50.79c-5.25-4.23-5.22-4.38-.55-9l305.28-304.7c4.48-4.47,4.7-4.51,8.73.44,27.63,34,44.41,72.64,49.33,116.3C488.41,326.3,436.88,414.85,353.69,455.61Z"/></g></g></svg>
                                    </div>
                                    <div class="divCodigo">
                                        <span>Código Membresía</span>
                                        <span>${arrayHistorialTareas[i]["membreCodigo"]}</span>
                                    </div>
                                </div>
                                <div class="datosGene">
                                    <div class="fechaYmotiDiv">
                                        <div class="div1">
                                            <span>Fecha y hora de cancelación: </span>
                                            <span>${arrayHistorialTareas[i]["membreFechaT"]+" | "}</span>
                                            <span>${arrayHistorialTareas[i]["membreHoraT"]}</span>
                                            <span>Tipo de membresía:</span>
                                            <span>${arrayHistorialTareas[i]["membre_nombre"]}</span>
                                        </div>
                                        <span class="motivoSpan">Motivos</span>
                                        <div class="motivosDiv">${arrayHistorialTareas[i]["membreMotivoCancel"]}</div>
                                    </div>
                                    <div class="userContent">
                                        <span class="miembro">Miembro Retirado</span>
                                        <div class="divUserMembreElimi">
                                            <div class="divImg">
                                              <img src="imagesUser/${arrayHistorialTareas[i]["user_imagen"]}" alt="">
                                            </div>
                                            <div class="divDatos">
                                              <span>${arrayHistorialTareas[i]["user_nombre"]+" "+arrayHistorialTareas[i]["user_apellido"]}</span>
                                              <span>${arrayHistorialTareas[i]["user_empresa"]+" | "+arrayHistorialTareas[i]["user_cargo"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `; 

                        }

                        if(arrayHistorialTareas[i]["tarea_tipo"] == "nuevaFactu"){

                            histoTareasHTML += `
                            <div class="divHisto divHistoNewFactu divHistoNewFactu${arrayHistorialTareas[i]["id_historial"]}">
                                <div class="svgDivGene">
                                    <span class="span1">Nueva Factura</span>
                                    <div class="divSvg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393.43 383.57"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M288,162q0-35.85,0-71.69a12.51,12.51,0,0,0-3.78-9.68q-38.6-38.4-77-77a11.76,11.76,0,0,0-9-3.68Q114.82.12,31.38.07A31.62,31.62,0,0,0,0,31.59Q0,191.93,0,352.25a26,26,0,0,0,.48,5.95c3.22,13.63,12,21.69,25.22,25.37H262.25c.46-.18.92-.38,1.4-.52,15.46-4.54,24.31-16.26,24.31-32.29V221.54H271.09q0,64.62,0,129.25c0,10-6.11,16.14-16,16.15q-111,0-221.92,0c-10.2,0-16.22-6.07-16.22-16.32q0-79.33,0-158.68,0-79.14-.05-158.3c0-6.41,2.06-11.42,7.64-14.78a14.78,14.78,0,0,1,7.87-1.94q77.66,0,155.31-.05c3.13,0,4.06,1.05,4,4.11-.12,14.72-.09,29.44,0,44.16a31.69,31.69,0,0,0,31.3,31.23c14.59,0,29.19.12,43.78-.06,3.52,0,4.43,1.12,4.43,4.5q0,30.62,0,61.22Zm-30.9-82-.3-.3a3.47,3.47,0,0,0-1.13-.19c-10.59,0-21.17.08-31.75,0-9-.08-15.29-6.27-15.37-15.22-.09-11.32,0-22.65,0-32.87l48.27,48.29C257.08,79.79,257.24,79.91,257.08,80Z"/><path d="M143.61,192.2q-43.4,0-86.77,0c-6,0-9.27-3.4-8.9-9,.26-3.83,2.47-6.08,6-7.3a17.65,17.65,0,0,1,5.92-.57q84.15,0,168.3,0a23.62,23.62,0,0,1,5.19.39c4.84,1.11,7.32,4.83,6.67,9.7-.54,4.08-3.77,6.74-8.49,6.74q-41.33,0-82.66,0Z"/><path d="M143.93,240.1q-43.58,0-87.14,0c-5.94,0-9.24-3.44-8.85-9,.26-3.67,2.35-5.89,5.66-7.15a17.1,17.1,0,0,1,6.28-.67h168.3a24.27,24.27,0,0,1,4.83.3c4.9,1,7.48,4.59,7,9.48-.42,4.29-3.66,7.05-8.56,7.06Q187.68,240.14,143.93,240.1Z"/><path d="M143.58,288q-43.38,0-86.77,0c-6,0-9.24-3.41-8.87-9,.24-3.67,2.33-5.9,5.64-7.17a17.09,17.09,0,0,1,6.28-.68h168.3a33.12,33.12,0,0,1,3.73.09c5.35.63,8.44,4.2,8.14,9.3-.28,4.65-3.56,7.46-8.93,7.46Q187.35,288,143.58,288Z"/><path d="M79.78,80.67c-2.62,0-5.25-.12-7.86,0a7.41,7.41,0,0,0-7.06,6.52,7.06,7.06,0,0,0,5.26,8,15.72,15.72,0,0,0,3.66.66A24.2,24.2,0,0,1,84.28,141c-2.17,1.24-3.64,2.44-4.17,5.14-.75,3.83-3.65,6-7.5,6.19a7.63,7.63,0,0,1-8.18-5.27c-.84-2.33-2.21-3-4.49-2.83a29.16,29.16,0,0,1-3.74,0c-4.46-.12-7.64-2.71-8.21-6.63-.69-4.74,1.6-8.43,6.19-9.69a17.77,17.77,0,0,1,4.43-.51c4.36-.07,8.73,0,13.09-.06,4.71-.09,7.53-2.65,7.71-6.84.2-4.54-2.33-7.39-7.14-7.78-7.23-.59-13.65-2.93-18.49-8.56C43.52,92.26,46.56,74.8,60.29,67c1.94-1.11,3.24-2.16,3.71-4.6a7.94,7.94,0,0,1,7.64-6.58c3.67-.09,6.69,1.47,8,5,.94,2.48,2.43,3.19,4.83,2.95a22.24,22.24,0,0,1,3.74,0c4.88.35,8.13,3.81,8.08,8.54a8.16,8.16,0,0,1-7.94,8.28c-2.86.18-5.74,0-8.6,0Z"/><path d="M183.84,144.29q-23.19,0-46.38,0c-6.06,0-10-3.26-10-8.22s4-8.59,9.87-8.6q46.57-.1,93.15,0c5,0,8.51,2.62,9.37,6.49,1.29,5.76-2.4,10.31-8.54,10.32C215.52,144.32,199.68,144.29,183.84,144.29Z"/><path d="M103.54,335.92q-23,0-46,0c-6.2,0-9.49-2.75-9.6-7.92s3.41-8.87,9.34-8.89q46.77-.12,93.53,0c7.79,0,12,7,8.24,13-1.85,3-4.61,3.85-8,3.84C135.22,335.88,119.38,335.92,103.54,335.92Z"/><polygon points="340.02 176.03 340.02 122.62 308.5 122.62 308.5 176.03 255.1 176.03 255.1 207.54 308.5 207.54 308.5 260.95 340.02 260.95 340.02 207.54 393.43 207.54 393.43 176.03 340.02 176.03"/></g></g></svg>
                                    </div>
                                </div>
                                <div class="datosDivGene">
                                    <div class="divHoraFCrea">
                                        <span>Fecha y hora de creación:</span>
                                        <span>${arrayHistorialTareas[i]["fechaFactura"]+" | "+arrayHistorialTareas[i]["horaFactura"]}</span>
                                        <span>Fecha de Vencimiento:</span>
                                        <span>${arrayHistorialTareas[i]["fechaFacturaV"]}</span>
                                    </div>
                                    <div class="divCodigo">
                                        <span>Código Factura</span>
                                        <span>${arrayHistorialTareas[i]["facturaCodigo"]}</span>
                                    </div>
                                </div>
                            </div>
                            `;

                        }

                        if(arrayHistorialTareas[i]["tarea_tipo"] == "nuevoMensaje"){

                            $tipoMensaje = 
                                arrayHistorialTareas[i]["tipoMensaje"] == "Mensaje C" 
                                ? "Mensaje General" 
                                : "Problema";

                            histoTareasHTML += `
                            <div class="divHisto divHistoNewMensa divHistoNewMensa${arrayHistorialTareas[i]["id_historial"]}">
                                <div class="svgDivGene">
                                    <span>Nuevo Mensaje</span>
                                    <div class="svgDiv">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.62 364.93"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M382.77,71.42C377.16,29.33,338.65-3.15,294.47.24c-22.32,1.72-41,10.81-56,27.31a11.86,11.86,0,0,1-9.9,4.32q-85.34-.18-170.66,0C39.8,31.88,24.76,39,13,52.8,6,60.88,2.27,70.42,0,80.65V252.07c.21.84.45,1.68.63,2.52C7,284.3,33.05,301.83,58.41,301c6.86-.22,13.72,0,20.59-.06,2.36,0,3.5.82,3.4,3.25-.07,1.62,0,3.24,0,4.87.24,14.71-.49,29.43.41,44.14a11.79,11.79,0,0,0,3.8,7.89c5.49,5.4,12.74,5.1,19.75-.91q32.65-28,65.2-56.18a11.74,11.74,0,0,1,8.39-3.09q59.7.13,119.39.05a60,60,0,0,0,7.1-.17c29.88-3.51,51.59-28,51.61-58.16q0-47.16-.05-94.31a10.39,10.39,0,0,1,2.86-7.69C379,121,386.28,97.84,382.77,71.42ZM308.25,286.6a59,59,0,0,1-10.44.57q-59.51,0-119,0a21.84,21.84,0,0,0-15.29,5.65c-21.32,18.63-42.86,37-64.33,55.46-.74.63-1.59,1.15-3.11,2.25V328.39c0-9.23,0-18.46,0-27.69,0-6.94-4.08-11.95-11-13-8.42-1.26-16.94-.49-25.41-.46-7.75,0-15.23-.95-22.06-4.69-14.48-7.93-23.11-19.91-24-36.68-.42-7.72-.18-15.47-.18-23.2q0-65.69,0-131.37c0-19.26,8.68-33.12,25.81-41.65a38.57,38.57,0,0,1,17.35-4q82.53,0,165.05,0c2.84,0,4.13.06,2.57,3.55A83.33,83.33,0,0,0,287.37,166c18.72,3,36.47-.4,53.11-9.52,3.75-2.06,3.78-2,3.78,2.38,0,27.7-.35,55.4.11,83.09C344.74,264.41,328.45,283,308.25,286.6Zm-8-133.52c-38.78,0-69.29-30.82-69.67-69.64C230.2,47.59,259,13.67,300.18,13.68a69.11,69.11,0,0,1,69.63,69.71A69.29,69.29,0,0,1,300.22,153.08Z"/><path d="M300.71,224.43a6.85,6.85,0,0,0-.25-13.67,37.49,37.49,0,0,0-4.11-.08h-165a33.14,33.14,0,0,0-4.11.1,6.83,6.83,0,0,0-.48,13.55,23.76,23.76,0,0,0,4.47.22H296.61A29.42,29.42,0,0,0,300.71,224.43Z"/><path d="M57.63,173.41a22.78,22.78,0,0,0,3,.12h153a15.49,15.49,0,0,0,6.24-.9,6.24,6.24,0,0,0,4.09-6.86,6.34,6.34,0,0,0-5.77-5.94,25.89,25.89,0,0,0-3.74-.09H137.74q-39.65,0-79.29,0c-4.7,0-7.53,2.39-7.74,6.32S53.18,172.82,57.63,173.41Z"/><path d="M58.81,122.07q20,0,40,0c13.83,0,27.66,0,41.49,0a6.67,6.67,0,0,0,7-6.3c.21-3.39-2.21-6.32-5.94-7a32.43,32.43,0,0,0-5.57-.43q-37,0-74,0a33,33,0,0,0-3.73.13c-4.88.59-7.56,3.27-7.35,7.28S53.77,122.06,58.81,122.07Z"/><path d="M101,210.7c-7-.06-13.95,0-20.93,0s-14.2-.05-21.3,0c-4.88.05-8.08,2.89-8,7s3.15,6.84,7.79,6.87q21.3.12,42.61,0c5,0,7.8-2.82,7.68-7.19C108.68,213.14,105.94,210.74,101,210.7Z"/><path d="M326.26,236.29c-3.84-.33-6.9,2.63-7.49,7.22-1.47,11.51-6.74,16.82-18,18.17-4.66.55-7.6,3.5-7.37,7.36s3.51,6.47,8.14,6.45c16-.07,30.89-14.85,31.07-30.93C332.62,239.87,330.14,236.62,326.26,236.29Z"/><path d="M64.34,63.92c-.27-4-3.91-6.88-8.49-6.53-1.36.1-2.7.39-4.05.59C37.57,60.1,25.41,73.82,25.25,88a20.64,20.64,0,0,0,0,2.61A6.35,6.35,0,0,0,31,96.52,6.44,6.44,0,0,0,38.3,92c.64-2.25.62-4.69,1.2-7,2-7.92,8.72-13.21,17.43-13.88C61.53,70.79,64.59,67.81,64.34,63.92Z"/><path d="M165.87,122c3.12.12,6.24,0,9.36,0h0c3.49,0,7,.12,10.47,0a6.2,6.2,0,0,0,6.14-5.89c.34-3.64-1.49-6.67-5-7.19a79.4,79.4,0,0,0-22-.06,6.41,6.41,0,0,0-5.54,7.24A6.53,6.53,0,0,0,165.87,122Z"/><path d="M337.09,76.67c-8.36,0-16.71,0-25.07,0-4.88,0-4.89,0-4.9-5,0-8.6,0-17.21,0-25.82,0-3.09-1.14-5.72-4.18-6.9a6.57,6.57,0,0,0-7.32,1.27,8.34,8.34,0,0,0-2.35,6.48c0,8.6-.14,17.21.07,25.81.08,3.37-1.1,4.37-4.33,4.2-4.36-.23-8.73-.06-13.1-.06v0c-4.74,0-9.48-.11-14.21,0A6.7,6.7,0,0,0,260.32,90a19.73,19.73,0,0,0,4.8.51c8,0,16,.15,23.95,0,3.34-.09,4.3,1.12,4.23,4.34-.18,8.36-.05,16.72-.06,25.07,0,2.71.4,5.31,2.64,7.1a6.28,6.28,0,0,0,7,1.06,7.1,7.1,0,0,0,4.23-6.91c0-8.85.12-17.71,0-26.57-.06-3.1,1-4.13,4.08-4.08q13.1.21,26.19,0c5-.09,8-3,8-7.11S342.31,76.69,337.09,76.67Z"/></g></g></svg>
                                    </div>
                                </div>
                                <div class="divDatosGene">
                                    <div class="divDatos">
                                        <span>Fecha y hora de creación:</span>
                                        <span>${arrayHistorialTareas[i]["fechaMensaje"]+" | "+arrayHistorialTareas[i]["horaMensaje"]}</span>
                                        <span>Tipo:</span>
                                        <span>${$tipoMensaje}</span>
                                    </div>
                                    <div class="divCodigo">
                                        <span>Código mensaje</span>
                                        <span>${arrayHistorialTareas[i]["mensajeCod"]}</span>
                                    </div>
                                </div>
                            </div>
                            `;

                        }
                        
                      }

                    }else{

                      histoTareasHTML = `
                      <div class="histoVacioDiv">
                          <span class="histoNOencontrado">Nada por el momento</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 344.92"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M372.35,201q-23.84-89-47.57-178.11c-1.33-5-2.93-9.82-6.06-14C314.41,3.19,308.84,0,301.47,0Q192,0,82.52,0C75,0,69.37,3.34,65.06,9.24c-3.07,4.21-4.62,9.07-6,14Q30.24,131.49,1.3,239.69C1,241,.44,242.28,0,243.58v83.84c5.07,13,11.64,17.5,25.52,17.5h333c13.89,0,20.41-4.48,25.53-17.5V243.58C380.11,229.4,376.15,215.24,372.35,201ZM309.29,28.56l.51-.07,10.59,39.63q22.1,82.7,44.2,165.41c.25,1,.46,1.94.75,2.89.65,2.13-.23,3.08-2.35,3.11-.37,0-.75,0-1.12,0-12.23-.24-9.66,2-12.77-9.59q-19.49-72.39-38.74-144.82a32,32,0,0,1-1.09-8.48C309.32,60.62,309.29,44.59,309.29,28.56Zm-214.42-13q48.75.13,97.49.06h96c5.35,0,5.36,0,5.36,5.47,0,14-.09,28,.06,41.92,0,3.49-1.2,4.55-4.59,4.48-9.12-.17-18.25-.12-27.37,0a7.44,7.44,0,0,1-5.88-2.61c-35.22-36.71-92.72-36.71-127.83,0a7.85,7.85,0,0,1-6.26,2.61c-9-.11-18-.16-27,0-3.37.07-4.66-.94-4.62-4.46q.22-21.51,0-43C90.19,16.4,91.54,15.5,94.87,15.51ZM264.44,124.65c-.76,36.78-24.26,61.92-52.28,69.91-4.86,1.39-8.13,3.83-10.37,8.25s-4.8,8.46-7.24,12.66-2.59,4.3-5,.15c-2.82-4.85-5.73-9.66-8.41-14.59a12.14,12.14,0,0,0-7.69-6c-29.24-8.81-47.38-28.09-52.67-58.17a71.31,71.31,0,0,1,57.76-82.31c41.3-7.42,78.21,19,85,60.22C264.06,118.19,264.17,121.7,264.44,124.65ZM19.22,234.15q6.66-24.93,13.33-49.85Q53.16,107.16,73.76,30c.13-.48.29-.94.44-1.41l.5,0c0,17,.24,33.92-.12,50.87-.14,6.72-3.07,13.06-4.69,19.58s-3.5,13-5.16,19.52c-1.44,5.69.56,9.7,5.32,11.07,4.47,1.28,8.43-1.45,10-7.11,3.19-11.66,6.36-23.33,9.37-35,.86-3.36,2.51-4.76,6-4.59,5,.23,10,0,15,.06,3.93,0,4,.19,2.33,3.76a88,88,0,0,0-8.84,39.4c.19,35.18,21.56,67.5,54.36,80.3,7.45,2.9,12.55,6.86,15.73,14a77.33,77.33,0,0,0,5.8,10c5.93,9.27,18.38,9.37,24.3.09,3.55-5.57,6.74-11.38,10-17.15a9.11,9.11,0,0,1,5.29-4.34c32.53-11.7,52.69-34.35,59.34-68.29,3.63-18.52.88-36.48-7.22-53.58-2-4.16-1.94-4.18,2.71-4.19s9.51.19,14.24-.07c3.73-.2,5.32,1.37,6.23,4.84,6.6,25.08,13.35,50.11,20.05,75.16q9.5,35.58,19,71.17c1.47,5.51,1.49,5.51-4.35,5.51q-22.5,0-45,0c-7.28,0-9.29,1.76-10.28,8.87-1.89,13.44-10.51,21-24.21,21.05q-57.93.07-115.85,0c-13.78,0-22.46-7.86-24.16-21.53-.79-6.3-3.12-8.37-9.59-8.38-15.62,0-31.24,0-46.86,0-4.32,0-4.55-.32-3.42-4.53q5.64-21.13,11.3-42.27c.32-1.2.69-2.4.93-3.62a7.88,7.88,0,0,0-5.73-9.54,7.55,7.55,0,0,0-9.39,5.33c-2.19,7.28-4.06,14.66-6,22-2.58,9.63-5.2,19.25-7.67,28.92-.7,2.76-2.08,4-5,3.74-1.6-.16-3.24,0-4.87,0C18,239.54,17.82,239.38,19.22,234.15Zm349.48,85.1c0,7.46-2.69,10.11-10.23,10.11q-83.22,0-166.44,0H26.72c-9.23,0-11.43-2.22-11.43-11.54,0-19.33.07-38.66-.06-58,0-3.51.94-4.83,4.65-4.81q35.43.21,70.85,0c2.79,0,4.21.84,5.15,3.6,5.78,16.82,19.36,26.38,37.24,26.38q59,0,118.07,0c17.57,0,31.18-9.65,36.9-26.31.94-2.72,2.27-3.68,5.11-3.67q35.61.13,71.22,0c3.27,0,4.36,1.1,4.34,4.35C368.65,279.35,368.72,299.3,368.7,319.25Z"/><path d="M63.21,162.28a7.7,7.7,0,0,0,7.94-7.64,7.89,7.89,0,0,0-15.77-.14A7.79,7.79,0,0,0,63.21,162.28Z"/><path d="M154.49,117.58a7.59,7.59,0,0,0-7.74,7.85,7.75,7.75,0,0,0,15.5,0A7.6,7.6,0,0,0,154.49,117.58Z"/><path d="M192.42,117.59a7.74,7.74,0,1,0,7.32,8.26A7.61,7.61,0,0,0,192.42,117.59Z"/><path d="M229.37,117.58a7.74,7.74,0,1,0,7.88,7.72A7.58,7.58,0,0,0,229.37,117.58Z"/></g></g></svg>
                      </div>
                      `;
                      
                    }

                    document.querySelector("#divTareasHistoBase").innerHTML = "";

                    rangoHistorialBase.selectNode(document.getElementsByTagName("div").item(0));
                    const datosHistorialGene =
                      rangoHistorialBase.createContextualFragment(histoTareasHTML);
                    document.querySelector("#divTareasHistoBase").appendChild(datosHistorialGene);
                    
                  })
                  .catch((err) => console.log(err));
          
              }

            //---------------------------------------------------------------------------------------------------
            
          })
          .catch((err) => console.log(err));
       
      };

      cargarPanelPrin();

    //-------------------------------------------------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------
    // INTERVALO: Actualizar Reservas General
    //------------------------------------------------

      function intervaloActuReseGeneral(){

        if(itrvalActuReseGene == null){

          itrvalActuReseGene = setInterval(()=>{

            let formActuReseGene = new FormData();

            formActuReseGene.append("formReseActuGene", true);

            fetch(urlBuscarInfoAdminDB, {
              method: "POST",
              body: formActuReseGene,
            })
              .then((response) => response.json())
              .then((data) => {
                
                for(let i = 0; i < data.length; i++){

                  let fechaActual = fechaANumero(cadenaFechaActual);
                  let horaActual = horaAMinutos(new Date().getHours()+":"+new Date().getMinutes());
                  let fechaReseEntra = fechaANumero(data[i]["fechaReserva"]);
                  let fechaReseSale = fechaANumero(data[i]["reserDiaFinal"]);
                  let horaReseEntra = horaAMinutos(data[i]["horaEntradaR"]);
                  let horaReseSale = horaAMinutos(data[i]["horaSalidaR"]);

                  let formActuRese = new FormData();
                  
                  if(fechaReseEntra == fechaReseSale){

                    if(
                      fechaReseEntra == fechaActual
                    ){

                      //----------------------------------------------------------------------------------------------

                      if(
                        (horaReseEntra > horaActual && 
                        horaReseEntra < horaReseSale) ||
                        horaReseEntra == horaActual
                      ){

                        //En Proceso

                        formActuRese.append("reseEstadoID", data[i]["id_reserva"]);
                        formActuRese.append("actuReseEstado", 'En Proceso');
                        
                        fetch(urlBuscarInfoAdminDB, {
                          method: "POST",
                          body: formActuRese,
                        })
                          .then((response) => response.json())
                          .then((data) => {

                          })
                          .catch((err) => console.log(err));

                      }
  
                      //----------------------------------------------------------------------------------------------

                      if(
                        horaReseEntra > horaActual 
                      ){

                        //Pendiente

                        formActuRese.append("reseEstadoID", data[i]["id_reserva"]);
                        formActuRese.append("actuReseEstado", 'Pendiente');
                        
                        fetch(urlBuscarInfoAdminDB, {
                          method: "POST",
                          body: formActuRese,
                        })
                          .then((response) => response.json())
                          .then((data) => {
                          
                          })
                          .catch((err) => console.log(err));

                      }
                      
                      //----------------------------------------------------------------------------------------------

                      if(
                        horaReseSale < horaActual 
                      ){

                        //Terminada

                        formActuRese.append("reseEstadoID", data[i]["id_reserva"]);
                        formActuRese.append("actuReseEstado", 'Terminada');
                        
                        fetch(urlBuscarInfoAdminDB, {
                          method: "POST",
                          body: formActuRese,
                        })
                          .then((response) => response.json())
                          .then((data) => {
                          
                          })
                          .catch((err) => console.log(err));

                      }

                      //----------------------------------------------------------------------------------------------
  
                    }

                    if(
                      fechaReseSale < fechaActual
                    ){
  
                      // Terminada
                      
                      formActuRese.append("reseEstadoID", data[i]["id_reserva"]);
                      formActuRese.append("actuReseEstado", 'Terminada');
                      
                      fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formActuRese,
                      })
                        .then((response) => response.json())
                        .then((data) => {
                        
                        })
                        .catch((err) => console.log(err));
  
                    }

                  }

                  if(fechaReseEntra < fechaReseSale){

                    if(
                      (fechaActual > fechaReseEntra && 
                      fechaActual < fechaReseSale || 
                      fechaActual == fechaReseEntra ||
                      fechaActual == fechaReseSale) &&
                      (horaActual > horaReseEntra &&
                      horaActual < horaReseSale ||
                      horaActual == horaReseEntra)
                    ){

                      //En Proceso

                      formActuRese.append("reseEstadoID", data[i]["id_reserva"]);
                      formActuRese.append("actuReseEstado", 'En Proceso');
                      
                      fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formActuRese,
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          
                        })
                        .catch((err) => console.log(err));

                    }

                    //----------------------------------------------------------------------------------------------

                    if(
                      (fechaActual > fechaReseEntra && 
                      fechaActual < fechaReseSale || 
                      fechaActual == fechaReseEntra ||
                      fechaActual == fechaReseSale) &&
                      (horaActual < horaReseEntra ||
                      horaActual >= horaReseSale) 
                    ){

                      //Pendiente

                      formActuRese.append("reseEstadoID", data[i]["id_reserva"]);
                      formActuRese.append("actuReseEstado", 'Pendiente');
                      
                      fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formActuRese,
                      })
                        .then((response) => response.json())
                        .then((data) => {
                        
                        })
                        .catch((err) => console.log(err));

                    }

                    if(
                      fechaReseSale < fechaActual
                    ){
  
                      // Terminada
                      
                      formActuRese.append("reseEstadoID", data[i]["id_reserva"]);
                      formActuRese.append("actuReseEstado", 'Terminada');
                      
                      fetch(urlBuscarInfoAdminDB, {
                        method: "POST",
                        body: formActuRese,
                      })
                        .then((response) => response.json())
                        .then((data) => {
                        
                        })
                        .catch((err) => console.log(err));
  
                    }

                  }

                }

              })
              .catch((err) => console.log(err));

          }, 600);

        }else{

          clearInterval(itrvalActuReseGene);
          itrvalActuReseGene = null;

          intervaloActuReseGeneral();

        }

      }

      intervaloActuReseGeneral();

    //-------------------------------------------------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------
    // << Calendario de Reservas - FUNCIONES - INICIO >>
    //----------------------------------------------------

      //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

      //-----------------------------------------------------------------------------------------------------------------------------------
      // < CALENDARIO MODO MES - INICIO > //

      // Func A_1 Calenda-Mes - Botones OJOS, ver día respectivo.

        function ojoDiaMes(añoOjo, mesOjo, diaOjo) {

          añoFijoD = Number(añoOjo);
          mesFijoD = Number(mesOjo);
          diaFijoD = Number(diaOjo);

          cambiarCalendaDia(diaOjo, mesOjo, añoOjo);

        }

      //----------------------------------------------------------------------------------------------

      // Func A_2 Calenda-Mes - Crear Reserva al tocar el día

      // Func A Calenda-Mes - Crear o Redibujar el calendario cada que se cambie de mes.

        const rangeDiasMes = document.createRange();
        const rangeReservas = document.createRange();

        function actualizarCalendario(headCalendario, mesN, añoN, contenedor){
          
          // Variables para definir la fecha. Si no existe cambio en los parámetros, se usará la fecha actual.

            let mesActual = mesN == "" ? mesCalenMGene : mesN;
            let añoActual = añoN == "" ? anioCalenMGene : añoN;

            mesTextoA = mesActual == 1 ? 12 : mesActual-1;
            mesTextoA = mesTextoA < 10 ? "0"+mesTextoA : mesTextoA;
            anioTextoA = mesActual == 1 ? añoActual-1 : añoActual;

            mesTexto = mesActual < 10 ? "0"+mesActual : mesActual;
            anioTexto = String(añoActual);
          
            mesTextoP = mesActual == 12 ? 1 : mesActual+1;
            anioTextoP = mesActual == 12 ? añoActual+1 : añoActual;
            mesTextoP = mesTextoP < 10 ? "0"+mesTextoP : mesTextoP;

          //------------------------------------------------------------------------------------------------------------------------------------

          const inicioDMesNum = new Date(añoActual, mesActual-1, 1).getDay(); // Primer día del mes ACTUAL en formato semana (0 - 6)
          const finalDMesNum = new Date(añoActual, mesActual, 0).getDate(); // Último día del mes ACTUAL formato día (1 - 31)
          const finalDMesSema = new Date(añoActual, mesActual-1, finalDMesNum).getDay();  // Último día del mes ACTUAL formato semana (0 - 6)
          const finalDMesPrev = new Date(añoActual, mesActual-1, 0).getDate(); // Último día DEL mes ANTERIOR formato día (1 - 31)

          //------------------------------------------------------------------------------------------------------------------------------------

          let formUserFecha = new FormData();

          formUserFecha.append("fechaMesReser", mesActual);
          formUserFecha.append("fechaMesReserA", mesActual - 1);
          formUserFecha.append("fechaMesReserP", mesActual + 1);
          formUserFecha.append("fechaAñoReser", añoActual);

          fetch(urlBuscarInfoAdminDB, {
            method: "POST",
            body: formUserFecha,
          })
            .then((response) => response.json())
            .then((data) => {

              let htmlDiasCalendaMes = ``;
              
              // Guardando la cantidad de reservas x dia del mes ANTERIOR, ACTUAL Y POSTERIOR en el objeto

                var cantidadReseXDia = new Object();

                for(let i = 1; i < data.length; i++){

                  cantidadReseXDia[data[i]["fechaReserva"]] = 0;

                }

                var reseObjectoKeys = Object.keys(cantidadReseXDia)

                for(let e = 0; e < reseObjectoKeys.length; e++){

                  let claveFecha = reseObjectoKeys[e];

                  for(let a = 1; a < data.length; a++){

                    if(claveFecha == data[a]["fechaReserva"]){
                      cantidadReseXDia[claveFecha] += 1;
                    }

                  }

                }

              //----------------------------------------------------------------------------------------------------------------------

              // Creando días del mes ANTERIOR
              
                for(let i = inicioDMesNum; i > 0; i--){

                  let diaNum = ((finalDMesPrev - i) + 1);
                  let diaTex = diaNum < 10 ? "0"+diaNum : diaNum;

                  let fechaActual = anioTextoA+"-"+mesTextoA+"-"+diaTex;
                  let claseHoy = "";

                  if(fechaActual == cadenaFechaActual){
                    claseHoy = "hoyLi";
                  }else{
                    claseHoy = "diaMesAnte";
                  }

                  htmlDiasCalendaMes += `
                  <div id="diaBaseA" class="${claseHoy}">
                    <span class="spanDiaNum">${(finalDMesPrev - i) + 1}</span>
                    <div class="divReserGene">
                      <div id="diaReseBase${fechaActual}" class="divRese">

                      </div>
                      <svg onclick="ojoDiaMes('${anioTextoA}', '${mesTextoA}', '${diaTex}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.35 290.58"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M479.67,121.22c-32-35-68.21-64.81-110-87.45C333.28,14.07,294.8,1.34,253,.11a235.2,235.2,0,0,0-84.86,12.65C105.44,34.53,54.21,73.18,9.93,121.67c-13.9,15.21-12.89,32.55,1,48a340,340,0,0,0,25.94,26c31.72,28.3,65.91,53,104.54,71.12C184.52,287,229.67,294.82,277,288.38c37.43-5.11,71.65-19.34,103.9-38.57a434.87,434.87,0,0,0,76.95-58.48c12.25-11.63,25.64-22.61,31.55-39.43V138.53A43.36,43.36,0,0,0,479.67,121.22Zm-24,28.68c-18.67,21.53-40.56,39.43-63.55,56-26.17,18.9-54,34.64-85.07,44.29-20.33,6.32-41.06,9.88-61.2,9.41-33.32.47-63.5-7.58-92.38-21-42-19.56-78.45-46.93-110.88-79.81-3.12-3.17-5.8-6.77-9-9.91-2.75-2.75-2.41-4.93-.06-7.77,11-13.31,23.71-24.83,36.76-36C101.19,78.74,135.42,58,173.47,43.65a200.39,200.39,0,0,1,98-11.19c45.16,5.89,84.4,26,121.22,51.55a369.18,369.18,0,0,1,62.7,55.56C459.82,144.47,459.89,145,455.67,149.9Z"/><path d="M245.36,51.38c-52.56,0-93.71,41.3-94.3,93.62-.55,49,39.4,93.67,94.2,93.74,54.1.07,93.85-44.88,93.58-93.4C338.56,93.21,297.25,51.39,245.36,51.38Zm0,156.92c-31.33.66-63.76-26-63.76-63.15,0-34.78,28.58-63.39,63.61-63.42s62.69,28.13,62.73,63.34C308,180.76,280.78,207.55,245.36,208.3Z"/></g></g></svg>
                    </div>
                  </div>`;
                  
                }

              //----------------------------------------------------------------------------------------------------------------------------------------

              // Creando días del mes ACTUAL

                for(let i = 1; i <= finalDMesNum; i++){
                  
                  let diaNum = i;
                  let diaTex = diaNum < 10 ? "0"+diaNum : diaNum;

                  let fechaActual = anioTexto+"-"+mesTexto+"-"+diaTex;
                  let claseHoy = "";

                  if(fechaActual == cadenaFechaActual){
                    claseHoy = "hoyLi";
                  }else{
                    claseHoy = "liDia";
                  }
                  
                  htmlDiasCalendaMes += `
                  <div id="diaBase" class="${claseHoy}">
                    <span class="spanDiaNum">${i}</span>
                    <div class="divReserGene">
                      <div id="diaReseBase${fechaActual}" class="divRese">

                      </div>
                      <svg onclick="ojoDiaMes('${anioTexto}', '${mesTexto}', '${diaTex}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.35 290.58"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M479.67,121.22c-32-35-68.21-64.81-110-87.45C333.28,14.07,294.8,1.34,253,.11a235.2,235.2,0,0,0-84.86,12.65C105.44,34.53,54.21,73.18,9.93,121.67c-13.9,15.21-12.89,32.55,1,48a340,340,0,0,0,25.94,26c31.72,28.3,65.91,53,104.54,71.12C184.52,287,229.67,294.82,277,288.38c37.43-5.11,71.65-19.34,103.9-38.57a434.87,434.87,0,0,0,76.95-58.48c12.25-11.63,25.64-22.61,31.55-39.43V138.53A43.36,43.36,0,0,0,479.67,121.22Zm-24,28.68c-18.67,21.53-40.56,39.43-63.55,56-26.17,18.9-54,34.64-85.07,44.29-20.33,6.32-41.06,9.88-61.2,9.41-33.32.47-63.5-7.58-92.38-21-42-19.56-78.45-46.93-110.88-79.81-3.12-3.17-5.8-6.77-9-9.91-2.75-2.75-2.41-4.93-.06-7.77,11-13.31,23.71-24.83,36.76-36C101.19,78.74,135.42,58,173.47,43.65a200.39,200.39,0,0,1,98-11.19c45.16,5.89,84.4,26,121.22,51.55a369.18,369.18,0,0,1,62.7,55.56C459.82,144.47,459.89,145,455.67,149.9Z"/><path d="M245.36,51.38c-52.56,0-93.71,41.3-94.3,93.62-.55,49,39.4,93.67,94.2,93.74,54.1.07,93.85-44.88,93.58-93.4C338.56,93.21,297.25,51.39,245.36,51.38Zm0,156.92c-31.33.66-63.76-26-63.76-63.15,0-34.78,28.58-63.39,63.61-63.42s62.69,28.13,62.73,63.34C308,180.76,280.78,207.55,245.36,208.3Z"/></g></g></svg>
                    </div>
                  </div>`;

                }

              //----------------------------------------------------------------------------------------------------------------------------------------

              // Creando dias del mes POSTERIOR

                for(let i = finalDMesSema; i < 6; i++){
                  
                  let diaNum = (i-finalDMesSema+1);
                  let diaTex = diaNum < 10 ? "0"+diaNum : diaNum;

                  let fechaActual = anioTextoP+"-"+mesTextoP+"-"+diaTex;
                  let claseHoy = "";

                  if(fechaActual == cadenaFechaActual){
                    claseHoy = "hoyLi";
                  }else{
                    claseHoy = "diaMesAnte";
                  }

                  htmlDiasCalendaMes += `
                  <div id="diaBaseP" class="${claseHoy}">
                    <span class="spanDiaNum">${i-finalDMesSema+1}</span>
                    <div class="divReserGene">
                      <div id="diaReseBase${fechaActual}" class="divRese">
                      
                      </div>
                      <svg onclick="ojoDiaMes('${anioTextoP}', '${mesTextoP}', '${diaTex}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.35 290.58"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M479.67,121.22c-32-35-68.21-64.81-110-87.45C333.28,14.07,294.8,1.34,253,.11a235.2,235.2,0,0,0-84.86,12.65C105.44,34.53,54.21,73.18,9.93,121.67c-13.9,15.21-12.89,32.55,1,48a340,340,0,0,0,25.94,26c31.72,28.3,65.91,53,104.54,71.12C184.52,287,229.67,294.82,277,288.38c37.43-5.11,71.65-19.34,103.9-38.57a434.87,434.87,0,0,0,76.95-58.48c12.25-11.63,25.64-22.61,31.55-39.43V138.53A43.36,43.36,0,0,0,479.67,121.22Zm-24,28.68c-18.67,21.53-40.56,39.43-63.55,56-26.17,18.9-54,34.64-85.07,44.29-20.33,6.32-41.06,9.88-61.2,9.41-33.32.47-63.5-7.58-92.38-21-42-19.56-78.45-46.93-110.88-79.81-3.12-3.17-5.8-6.77-9-9.91-2.75-2.75-2.41-4.93-.06-7.77,11-13.31,23.71-24.83,36.76-36C101.19,78.74,135.42,58,173.47,43.65a200.39,200.39,0,0,1,98-11.19c45.16,5.89,84.4,26,121.22,51.55a369.18,369.18,0,0,1,62.7,55.56C459.82,144.47,459.89,145,455.67,149.9Z"/><path d="M245.36,51.38c-52.56,0-93.71,41.3-94.3,93.62-.55,49,39.4,93.67,94.2,93.74,54.1.07,93.85-44.88,93.58-93.4C338.56,93.21,297.25,51.39,245.36,51.38Zm0,156.92c-31.33.66-63.76-26-63.76-63.15,0-34.78,28.58-63.39,63.61-63.42s62.69,28.13,62.73,63.34C308,180.76,280.78,207.55,245.36,208.3Z"/></g></g></svg>
                    </div>
                  </div>`;

                }

              //----------------------------------------------------------------------------------------------------------------------------------------

              // Insertando los días del calendario

                document.querySelector(contenedor).innerHTML = "";

                rangeDiasMes.selectNode(document.getElementsByTagName("div").item(0));
                const diasMesCalenda =
                  rangeDiasMes.createContextualFragment(htmlDiasCalendaMes);
                document.querySelector(contenedor).appendChild(diasMesCalenda);

                document.querySelector("."+headCalendario).innerHTML = `${mesesABRE[mesActual-1]+" "+añoActual}`;

              //----------------------------------------------------------------------------------------------------------------------------------------

              // Insertando la cantidad de reservas en cada día (si existen)

                if(data.length > 1){

                  for(let e = 0; e < reseObjectoKeys.length; e++){

                    if(document.querySelector("#diaReseBase"+reseObjectoKeys[e]) != null){

                      let cantRese = cantidadReseXDia[reseObjectoKeys[e]];
                      let reservaTexto = "";

                      let hubo = "";

                      let fechaSumaActual = fechaANumero(reseObjectoKeys[e]);
                      let fechaSumaFija = fechaANumero(cadenaFechaActual);

                      if(fechaSumaActual < fechaSumaFija){
                        hubo = "Hubo"
                      }
      
                      if(cantRese > 1){
                        reservaTexto = "Reservas";
                      }else{
                        reservaTexto = "Reserva";
                      }

                      let reservasDiaHTML = `<span class="spanRese">${hubo+" "+cantRese+" "+reservaTexto}</span>`
      
                      document.querySelector("#diaReseBase"+reseObjectoKeys[e]).innerHTML = "";
      
                      rangeReservas.selectNode(document.getElementsByTagName("div").item(0));
                      const reservasDia =
                        rangeReservas.createContextualFragment(reservasDiaHTML);
                      document.querySelector("#diaReseBase"+reseObjectoKeys[e]).appendChild(reservasDia);

                    }
                    
                  }

                }

              //---------------------------------------------------------------------
              
            })
            .catch((err) => console.log(err));

        }

      //----------------------------------------------------------------------------------------------

      // < CALENDARIO MODO MES - FIN > //
      //-----------------------------------------------------------------------------------------------------------------------------------

      //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

      //-----------------------------------------------------------------------------------------------------------------------------------
      // < CALENDARIO MODO DÍA - INICIO > //

      //-----------------------------------------------------------------------------------------------------------------------------------
      // Func A: Cambiar calendario a "MODO DÍA"

        const rangeCalendaD = document.createRange();
        const rangeLTReseContent = document.createRange();
        const rangeLTReseCalendaDia = document.createRange();
        const rangeOtrosMiembros = document.createRange();

        function cambiarCalendaDia(diaD, mesD, añoD) {

          //--------------------------------------------------------------------------------
          // Contenedor Calendario General

            const calendaD = document.querySelector(".calendaDivContent");
            calendaD.innerHTML = "";

          //--------------------------------------------------------------------------------
          
          let dia = diaD == "" || diaD == "p" ? new Date().getDate() : Number(diaD);
          let mes = mesD == "" || mesD == "p" ? new Date().getMonth()+1 : Number(mesD);
          let anio = añoD == "" || añoD == "p" ? new Date().getFullYear() : Number(añoD);

          let diaTex = dia < 10 ? "0"+dia : dia;
          let mesTex = mes < 10 ? "0"+mes : mes;

          let fecha = `${añoFijoD}-${mesTex}-${diaTex}`;
          
          diaFijoD = dia;
          mesFijoD = mes;

          //------------------------------------------------------------------------------------------------------------------------------------
          // Formulario Fetch para recuperar las reservas del día actual o el día elegido

            let formUserFecha = new FormData();

            formUserFecha.append("fechaDia", fecha);

            fetch(urlBuscarInfoAdminDB, {
              method: "POST",
              body: formUserFecha,
            })
              .then((response) => response.json())
              .then((data) => {

                function mostrarReservas() {

                  //------------------------------------------------------------------------------------------------------
                  // Divs tareas (En proceso, Próximas, Pendientes, Terminadas)

                    let divsTareasN = "";
                    let divsTareasProces = "";
                    let divsTareasP = "";
                    let divsTareasT = "";

                  //------------------------------------------------------------------------------------------------------

                  //------------------------------------------------------------------------------------------------------
                  // For para recorrer las reservas

                    for (let i = 1; i < data.length; i++) {

                      // Suma de fecha actual y fecha de la reserva

                        var fechaActualSuma = fechaANumero(cadenaFechaActual);
                        var fechaReservaSuma = fechaANumero(data[i]["fechaReserva"]);
                        var fechaReseFinalSuma = fechaANumero(data[i]["reserDiaFinal"]);

                      //--------------------------------------------------------------------------------------------------

                      // Definiendo Hora y Minutos Actuales

                        let horaActual = new Date().getHours();
                        let minuActual = new Date().getMinutes();
                        
                      //--------------------------------------------------------------------------------------------------

                      // Horas a Minutos

                        // Hora Actual Reserva

                        let horaActualMinus = horaAMinutos(horaActual+":"+minuActual);

                        //------------------------------------------------------------------------------------------------
                        
                        // Hora Entrada Reserva

                        let horaEntraReseMinus = horaAMinutos(data[i]["horaEntradaR"]);

                        //------------------------------------------------------------------------------------------------
                        
                        // Hora Salida Reserva

                        let horaSaleReseMinus = horaAMinutos(data[i]["horaSalidaR"]);

                        //------------------------------------------------------------------------------------------------

                      //--------------------------------------------------------------------------------------------------

                      //-------------------------------------------------------------------------------------------------------------------------------
                      // Definiendo la ubicacion de las tareas en el div de tareas según su hora de inicio

                        // Reservas Próximas
                        if (
                          data[i]["estadoReserva"] != "Terminada" &&
                          horaActualMinus < horaEntraReseMinus &&
                          (horaEntraReseMinus - horaActualMinus) <= 30 
                        ) {

                          divsTareasP += `
                            <li id="liRese${i}" class="liTareaDia liRese${i}"
                            onClick="mostrarDatosRese(
                              '${data[i]["fechaReserva"]}',
                              '${data[i]["horaEntradaR"]}',
                              '${data[i]["horaSalidaR"]}',
                              '${data[i]["numPersonas"]}',
                              '${data[i]["precioReserva"]}',
                              '${data[i]["comisionReserva"]}',
                              '${data[i]["fechaCompraReser"]}',
                              '${data[i]["horaCompraReser"]}',
                              '${data[i]["reservaActividad"]}',
                              'Proxima',
                              '${data[i]["reserTipo"]}',
                              '${data[i]["unidad_nombre"]}',
                              '${data[i]["unidad_imagen"]}',
                              'Disponible',
                              '${data[i]["Id_usuario"]}',
                              '${data[i]["user_nombre"] + " " + data[i]["user_apellido"]}',
                              '${data[i]["user_estado"]}',
                              '${data[i]["user_imagen"]}',
                              '${data[i]["user_rol"]}',
                              '${data[i]["otrosMiembros"]}',
                              '${data[i]["id_unidad"]}',
                              ${null},
                              'liRese${i}',
                              '${data[i]["codigoReserva"]}',
                              '${data[i]["reserDiaFinal"]}',
                              '${data[i]["produNombre"]}',
                              '${data[i]["productoImgPrin"]}',
                              '${data[i]["id_reserva"]}'
                            )"
                            >
                              <div class="reserNum">
                                <span>${data[i]["codigoReserva"]}</span>
                                <span>${data[i]["unidad_nombre"]}</span>
                              </div>
                              <div>
                              </div>
                              <div class="divFecha">
                                <div class="inicio">
                                  <span>Inicio:</span>
                                  <span>
                                    ${data[i]["fechaReserva"]} | ${data[i]["horaEntradaR"]}
                                  </span>
                                </div>
                                <div class="fin">
                                  <span>Fin:</span>
                                  <span>
                                    ${data[i]["reserDiaFinal"]} | ${data[i]["horaSalidaR"]}
                                  </span>
                                </div>
                              </div>
                              
                            </li>`;

                        }

                        //Reservas en Proceso
                        if (
                          (data[i]["estadoReserva"] != "Terminada" &&
                          horaActualMinus > horaEntraReseMinus &&
                          horaActualMinus < horaSaleReseMinus) ||
                          (horaActualMinus == horaEntraReseMinus &&
                          data[i]["estadoReserva"] != "Terminada")
                        ) {

                          divsTareasProces += `
                          <li id="liRese${i}" class="liTareaDia LienPro liRese${i}"
                          onClick="mostrarDatosRese(
                          '${data[i]["fechaReserva"]}',
                          '${data[i]["horaEntradaR"]}',
                          '${data[i]["horaSalidaR"]}',
                          '${data[i]["numPersonas"]}',
                          '${data[i]["precioReserva"]}',
                          '${data[i]["comisionReserva"]}',
                          '${data[i]["fechaCompraReser"]}',
                          '${data[i]["horaCompraReser"]}',
                          '${data[i]["reservaActividad"]}',
                          'En Proceso',
                          '${data[i]["reserTipo"]}',
                          '${data[i]["unidad_nombre"]}',
                          '${data[i]["unidad_imagen"]}',
                          'Ocupada',
                          '${data[i]["Id_usuario"]}',
                          '${data[i]["user_nombre"] + " " + data[i]["user_apellido"]}',
                          '${data[i]["user_estado"]}',
                          '${data[i]["user_imagen"]}',
                          '${data[i]["user_rol"]}',
                          '${data[i]["otrosMiembros"]}',
                          '${data[i]["id_unidad"]}',
                          ${null},
                          'liRese${i}',
                          '${data[i]["codigoReserva"]}',
                          '${data[i]["reserDiaFinal"]}',
                          '${data[i]["produNombre"]}',
                          '${data[i]["productoImgPrin"]}',
                          '${data[i]["id_reserva"]}'
                          )"
                          >
                            <div class="reserNum">
                              <span>${data[i]["codigoReserva"]}</span>
                              <span>${data[i]["unidad_nombre"]}</span>
                            </div>
                            <div>
                            </div>
                            <div class="divFecha">
                              <div class="inicio">
                              <span>Inicio: </span>
                              <span>${data[i]["fechaReserva"]} | ${
                            data[i]["horaEntradaR"]
                          }</span></div>
                              <div class="fin">
                              <span>Fin: </span>
                              <span>${data[i]["reserDiaFinal"]} | ${
                            data[i]["horaSalidaR"]
                          }</span></div>
                            </div>
                            
                          </li>`;

                        }
                        
                        //Reservas Terminadas
                        if (
                          data[i]["estadoReserva"] == "Terminada"
                        ) {

                          divsTareasT += `
                          <li id="liRese${i}" class="liTareaDia liRese${i}}" 
                          onClick="mostrarDatosRese(
                          '${data[i]["fechaReserva"]}',
                          '${data[i]["horaEntradaR"]}',
                          '${data[i]["horaSalidaR"]}',
                          '${data[i]["numPersonas"]}',
                          '${data[i]["precioReserva"]}',
                          '${data[i]["comisionReserva"]}',
                          '${data[i]["fechaCompraReser"]}',
                          '${data[i]["horaCompraReser"]}',
                          '${data[i]["reservaActividad"]}',
                          'Terminada',
                          '${data[i]["reserTipo"]}',
                          '${data[i]["unidad_nombre"]}',
                          '${data[i]["unidad_imagen"]}',
                          'Disponible',
                          '${data[i]["Id_usuario"]}',
                          '${data[i]["user_nombre"] + " " + data[i]["user_apellido"]}',
                          '${data[i]["user_estado"]}',
                          '${data[i]["user_imagen"]}',
                          '${data[i]["user_rol"]}',
                          '${data[i]["otrosMiembros"]}',
                          '${data[i]["id_unidad"]}',
                          ${null},
                          'liRese${i}',
                          '${data[i]["codigoReserva"]}',
                          '${data[i]["reserDiaFinal"]}',
                          '${data[i]["produNombre"]}',
                          '${data[i]["productoImgPrin"]}',
                          '${data[i]["id_reserva"]}'
                          )">
                            <div class="reserNum">
                              <span>${data[i]["codigoReserva"]}</span>
                              <span>${data[i]["unidad_nombre"]}</span>
                            </div>
                            <div>
                            </div>
                            <div class="divFecha">
                              <div class="inicio">
                              <span>Inicio: </span>
                              <span>${data[i]["fechaReserva"]} | ${
                            data[i]["horaEntradaR"]
                          }</span></div>
                              <div class="fin">
                              <span>Fin: </span>
                              <span>${data[i]["reserDiaFinal"]} | ${
                            data[i]["horaSalidaR"]
                          }</span></div>
                            </div>
                            
                          </li>`;
                        }

                        //Reservas Pendientes
                        if (
                          data[i]["estadoReserva"] != "Terminada" &&
                          horaActualMinus < horaEntraReseMinus &&
                          (horaEntraReseMinus - horaActualMinus) > 30
                        ) {

                          divsTareasN += `
                          <li id="liRese${i}" class="liTareaDia liRese${i}"
                          onClick="mostrarDatosRese(
                            '${data[i]["fechaReserva"]}',
                            '${data[i]["horaEntradaR"]}',
                            '${data[i]["horaSalidaR"]}',
                            '${data[i]["numPersonas"]}',
                            '${data[i]["precioReserva"]}',
                            '${data[i]["comisionReserva"]}',
                            '${data[i]["fechaCompraReser"]}',
                            '${data[i]["horaCompraReser"]}',
                            '${data[i]["reservaActividad"]}',
                            'Pendiente',
                            '${data[i]["reserTipo"]}',
                            '${data[i]["unidad_nombre"]}',
                            '${data[i]["unidad_imagen"]}',
                            'Disponible',
                            '${data[i]["Id_usuario"]}',
                            '${
                              data[i]["user_nombre"] + " " + data[i]["user_apellido"]
                            }',
                            '${data[i]["user_estado"]}',
                            '${data[i]["user_imagen"]}',
                            '${data[i]["user_rol"]}',
                            '${data[i]["otrosMiembros"]}',
                            '${data[i]["id_unidad"]}',
                            ${null},
                            'liRese${i}',
                            '${data[i]["codigoReserva"]}',
                            '${data[i]["reserDiaFinal"]}',
                            '${data[i]["produNombre"]}',
                            '${data[i]["productoImgPrin"]}',
                            '${data[i]["id_reserva"]}'
                            )"
                          >
                            <div class="reserNum">
                              <span>${data[i]["codigoReserva"]}</span>
                              <span>${data[i]["unidad_nombre"]}</span>
                            </div>
                            <div>
                            </div>
                            <div class="divFecha">
                              <div class="inicio">
                              <span>Inicio: </span>
                              <span>${data[i]["fechaReserva"]} | ${
                            data[i]["horaEntradaR"]
                          }</span></div>
                              <div class="fin">
                              <span>Fin: </span>
                              <span>${data[i]["reserDiaFinal"]} | ${
                            data[i]["horaSalidaR"]
                          }</span></div>
                            </div>
                          
                          </li>`;
                          
                        }
                        
                        //Reservas Terminada por ese dia (serie)
                        if (
                          data[i]["estadoReserva"] == "Pendiente" &&
                          horaActualMinus >= horaSaleReseMinus
                        ) {

                          divsTareasT += `
                          <li id="liRese${i}" class="liTareaDia liRese${i}"
                          onClick="mostrarDatosRese(
                            '${data[i]["fechaReserva"]}',
                            '${data[i]["horaEntradaR"]}',
                            '${data[i]["horaSalidaR"]}',
                            '${data[i]["numPersonas"]}',
                            '${data[i]["precioReserva"]}',
                            '${data[i]["comisionReserva"]}',
                            '${data[i]["fechaCompraReser"]}',
                            '${data[i]["horaCompraReser"]}',
                            '${data[i]["reservaActividad"]}',
                            'Pendiente',
                            '${data[i]["reserTipo"]}',
                            '${data[i]["unidad_nombre"]}',
                            '${data[i]["unidad_imagen"]}',
                            'Disponible',
                            '${data[i]["Id_usuario"]}',
                            '${
                              data[i]["user_nombre"] + " " + data[i]["user_apellido"]
                            }',
                            '${data[i]["user_estado"]}',
                            '${data[i]["user_imagen"]}',
                            '${data[i]["user_rol"]}',
                            '${data[i]["otrosMiembros"]}',
                            '${data[i]["id_unidad"]}',
                            ${null},
                            'liRese${i}',
                            '${data[i]["codigoReserva"]}',
                            '${data[i]["reserDiaFinal"]}',
                            '${data[i]["produNombre"]}',
                            '${data[i]["productoImgPrin"]}',
                            '${data[i]["id_reserva"]}'
                            )"
                          >
                            <div class="reserNum">
                              <span>${data[i]["codigoReserva"]}</span>
                              <span>${data[i]["unidad_nombre"]}</span>
                            </div>
                            <div>
                            </div>
                            <div class="divFecha">
                              <div class="inicio">
                              <span>Inicio: </span>
                              <span>${data[i]["fechaReserva"]} | ${
                            data[i]["horaEntradaR"]
                          }</span></div>
                              <div class="fin">
                              <span>Fin: </span>
                              <span>${data[i]["reserDiaFinal"]} | ${
                            data[i]["horaSalidaR"]
                          }</span></div>
                            </div>
                          
                          </li>`;
                          
                        }

                        // Reservas Terminadas por Fecha 
                        if (
                          fechaActualSuma > fechaReseFinalSuma
                        ) {

                          divsTareasT += `
                          <li id="liRese${i}" class="liTareaDia liRese${i}}" 
                          onClick="mostrarDatosRese(
                            '${data[i]["fechaReserva"]}',
                            '${data[i]["horaEntradaR"]}',
                            '${data[i]["horaSalidaR"]}',
                            '${data[i]["numPersonas"]}',
                            '${data[i]["precioReserva"]}',
                            '${data[i]["comisionReserva"]}',
                            '${data[i]["fechaCompraReser"]}',
                            '${data[i]["horaCompraReser"]}',
                            '${data[i]["reservaActividad"]}',
                            'Terminada',
                            '${data[i]["reserTipo"]}',
                            '${data[i]["unidad_nombre"]}',
                            '${data[i]["unidad_imagen"]}',
                            'Disponible',
                            '${data[i]["Id_usuario"]}',
                            '${data[i]["user_nombre"] + " " + data[i]["user_apellido"]}',
                            '${data[i]["user_estado"]}',
                            '${data[i]["user_imagen"]}',
                            '${data[i]["user_rol"]}',
                            '${data[i]["otrosMiembros"]}',
                            '${data[i]["id_unidad"]}',
                            ${null},
                            'liRese${i}',
                            '${data[i]["codigoReserva"]}',
                            '${data[i]["reserDiaFinal"]}',
                            '${data[i]["produNombre"]}',
                            '${data[i]["productoImgPrin"]}',
                            '${data[i]["id_reserva"]}'
                          )">
                            <div class="reserNum">
                              <span>${data[i]["codigoReserva"]}</span>
                              <span>${data[i]["unidad_nombre"]}</span>
                            </div>
                            <div>
                            </div>
                            <div class="divFecha">
                              <div class="inicio">
                                <span>Inicio:</span>
                                <span>
                                  ${data[i]["fechaReserva"]} | ${data[i]["horaEntradaR"]}
                                </span>
                              </div>
                              <div class="fin">
                                <span>Fin:</span>
                                <span>
                                  ${data[i]["reserDiaFinal"]} | ${data[i]["horaSalidaR"]}
                                </span>
                              </div>
                            </div>
                          </li>`;
                        }

                        // Reservas Futuras (Tambien en Pendientes)
                        if (
                          data[i]["estadoReserva"] != "Terminada" &&
                          fechaActualSuma < fechaReservaSuma
                        ) {

                          divsTareasN += `
                            <li id="liRese${i}" class="liTareaDia liRese${i}"
                            onClick="mostrarDatosRese(
                            '${data[i]["fechaReserva"]}',
                            '${data[i]["horaEntradaR"]}',
                            '${data[i]["horaSalidaR"]}',
                            '${data[i]["numPersonas"]}',
                            '${data[i]["precioReserva"]}',
                            '${data[i]["comisionReserva"]}',
                            '${data[i]["fechaCompraReser"]}',
                            '${data[i]["horaCompraReser"]}',
                            '${data[i]["reservaActividad"]}',
                            'Proxima',
                            '${data[i]["reserTipo"]}',
                            '${data[i]["unidad_nombre"]}',
                            '${data[i]["unidad_imagen"]}',
                            'Disponible',
                            '${data[i]["Id_usuario"]}',
                            '${data[i]["user_nombre"] + " " + data[i]["user_apellido"]}',
                            '${data[i]["user_estado"]}',
                            '${data[i]["user_imagen"]}',
                            '${data[i]["user_rol"]}',
                            '${data[i]["otrosMiembros"]}',
                            '${data[i]["id_unidad"]}',
                            ${null},
                            'liRese${i}',
                            '${data[i]["codigoReserva"]}',
                            '${data[i]["reserDiaFinal"]}',
                            '${data[i]["produNombre"]}',
                            '${data[i]["productoImgPrin"]}',
                            '${data[i]["id_reserva"]}'
                            )">
                              <div class="reserNum">
                                <span>${data[i]["codigoReserva"]}</span>
                                <span>${data[i]["unidad_nombre"]}</span>
                              </div>
                              <div>
                              </div>
                              <div class="divFecha">
                                <div class="inicio">
                                  <span>Inicio:</span>
                                  <span>
                                    ${data[i]["fechaReserva"]} | ${data[i]["horaEntradaR"]}
                                  </span>
                                </div>
                                <div class="fin">
                                  <span>Fin:</span>
                                  <span>
                                    ${data[i]["reserDiaFinal"]} | ${data[i]["horaSalidaR"]}
                                  </span>
                                </div>
                              </div>
                            </li>`;

                        }

                      //--------------------------------------------------------------------------------------------------

                    }

                  //------------------------------------------------------------------------------------------------------

                  //------------------------------------------------------------------------------------------------------
                  // Verificando cuales campos estan sin reservas en el día

                    //Reservas en espera
                    if (divsTareasN == "") {
                      divsTareasN = "<span class='spanVacio'>Nada</span>";
                    }
                    //Reservas Proximas
                    if (divsTareasP == "") {
                      divsTareasP = "<span class='spanVacio'>Nada</span>";
                    }
                    //Reservas en Proceso
                    if (divsTareasProces == "") {
                      divsTareasProces = "<span class='spanVacio'>Nada</span>";
                    }
                    //Reservas Terminadas
                    if (divsTareasT == "") {
                      divsTareasT = "<span class='spanVacio'>Nada</span>";
                    }

                  //------------------------------------------------------------------------------------------------------

                  //------------------------------------------------------------------------------------------------------
                  // Html reservas del dia en el div de reservas

                    const htmlDivTareas = `
                    <div class="enprocesoTareasDiv">
                      <div class="divTitulo"><span>Reservas en Proceso</span></div>
                      ${divsTareasProces}
                    </div>
                    <div class="proximasTareasDiv">
                      <div class="divTitulo"><span>Próximas Reservas</span></div>
                      ${divsTareasP}
                    </div>
                    <div class="divPendientesTareas">
                      <div class="divTitulo"><span>Reservas Pendientes</span></div>
                      ${divsTareasN}
                    </div>
                    <div class="divTerminadasT">
                      <div class="divTitulo"><span>Reservas Completadas</span></div>
                      ${divsTareasT}
                    </div>`;

                  //-----------------------------------------------------------------------------------------------------------------
                  // Dibujando el calendario MODO DÍA completo (redibujoCalendaDia = 0) 
                  // o el contenedor de las reservas únicamente (redibujoCalendaDia = 1)

                  if(redibujoCalendaDia == 0){

                    //---------------------------------------------------------------------------------------------------------------
                    // Html BASE para dibujar el calendario MODO DIA

                      const htmlCalendaDia = `
                      <div class="calendaDiaCuerpo">
                        <div class="contenedorTitulo">
                          <span class="spanAño">${añoFijoD}</span>
                          <span class="spanDM">${dia} de ${meses[Number(mes-1)]}</span>
                        </div>
                        <div class="contenedorTareasGene">
                          <div id="cuadroDrese" class="cuadroDReserva cdRese">
                          </div>
                          <div class="contenedorTareas"">
                            <div class="flechasDiv">
                              <button class="flechaDCalen" onClick="moverDi('fAtras')" id="fAtras" title="Día Anterior"><</button>
                              <button class="flechaDCalen" onClick="moverDi('fAdelante')" id="fAdelante" title="Día Siguiente">></button>
                            </div>
                            <div class="tareasDiv">
                            </div>
                          </div>
                          <div class="divContentLineaTiempo">
                            <div class="divHoraH">
                              <span class="horaSpan" hora="7:00 AM">7:00 AM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="8:00 AM">8:00 AM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="9:00 AM">9:00 AM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="10:00 AM">10:00 AM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="11:00 AM">11:00 AM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="12:00 PM">12:00 PM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="1:00 PM">1:00 PM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="2:00 PM">2:00 PM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="3:00 PM">3:00 PM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="4:00 PM">4:00 PM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="5:00 PM">5:00 PM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="6:00 PM">6:00 PM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="divHoraH">
                              <span class="horaSpan" hora="7:00 PM">7:00 PM</span>
                              <div class="dataB">
                              </div>
                            </div>
                            <div class="lineaDiaTiempo"><span class="spanHoraActu"></span></div>
                          </div> 
                        </div>
                      </div>
                      `;

                      rangeCalendaD.selectNode(document.getElementsByTagName("div").item(0));
                      const documentFragment =
                        rangeCalendaD.createContextualFragment(htmlCalendaDia);
                      calendaD.appendChild(documentFragment);

                    //---------------------------------------------------------------------------------------------------------------

                    //---------------------------------------------------------------------------------------------------------------
                    // Hora span divs 

                      const horaSpans = document.querySelectorAll(".horaSpan");
                      const dataBS = document.querySelectorAll(".dataB");

                      var divHoraAncho = document.querySelector(".divHoraH").offsetWidth;
                      var divHoraAltura =
                        document.querySelector(".divHoraH").offsetHeight;

                      var divHoraAncho2 = divHoraAncho / 59;
                      var divHoraAlto2 = divHoraAltura / 59;

                    //---------------------------------------------------------------------------------------------------------------

                    //---------------------------------------------------------------------------------------------------------------
                    // For para insertar reservas en la linea de tiempo

                      for (let i = 0; i < horaSpans.length; i++) {

                        let horaDiv = horaSpans[i].getAttribute("hora");
                        let htmlT = "";

                        let horaDivLT = horaDiv.split(":");
                        let minutosDivLT = horaDivLT[1].split(" ")[0];
                        let meridianoDivLT = horaDivLT[1].split(" ")[1];
                        horaDivLT = horaDivLT[0];

                        // Inicio de la reserva
                        for(let e = 1; e < data.length; e++) {

                          let horaIniRese = Number(data[e]["horaEntradaR"].split(":")[0]);
                          let minuIniRese = Number(data[e]["horaEntradaR"].split(":")[1].split(" ")[0]);
                          let meriIniRese = data[e]["horaEntradaR"].split(":")[1].split(" ")[1];

                          if (horaIniRese == horaDivLT && meriIniRese == meridianoDivLT) {

                            let left = divHoraAncho2 * minuIniRese;
                            left = (left * 100) / divHoraAncho;
                            left = left.toFixed(2);

                            let top = divHoraAlto2 * minuIniRese;
                            top = (top * 100) / divHoraAltura;
                            top = top.toFixed(2);

                            htmlT += `<div style="
                            left: ${left}%;
                            top: ${top}%; 
                            position:absolute; 
                            cursor: pointer;
                            width: max-content;
                            height: 2.4rem;
                            border-radius: 1.2rem;
                            background-color: #002d5644;
                            transform: translate(-${left}%, -${top}%);
                            color: #f4f3f3;
                            display: flex;
                            padding: 1rem;
                            transition: 0.3s;
                            font-size: 1.4rem;
                            align-items: center;
                            justify-content: flex-start;
                            " class="tarea">
                            ${
                              data[e]["horaEntradaR"].substring(0, 5) +
                              " " +
                              data[e]["horaEntradaR"].substring(9, 11)
                            }<span style="
                            font-size: 1.4rem; 
                            font-weight: 600; 
                            margin-left: .4rem
                            ">${data[e]["unidad_nombre"]} | INICIO</span>
                            </div>`;

                          }

                        }

                        // Final de la reserva
                        for(let a = 1; a < data.length; a++){

                          let horaFinRese = Number(data[a]["horaSalidaR"].split(":")[0]);
                          let minuFinRese = Number(data[a]["horaSalidaR"].split(":")[1].split(" ")[0]);
                          let meriFinRese = data[a]["horaSalidaR"].split(":")[1].split(" ")[1];

                          if (horaFinRese == horaDivLT && meriFinRese == meridianoDivLT) {

                            let left = divHoraAncho2 * minuFinRese;
                            left = (left * 100) / divHoraAncho;
                            left = left.toFixed(2);

                            let top = divHoraAlto2 * minuFinRese;
                            top = (top * 100) / divHoraAltura;
                            top = top.toFixed(2);

                            htmlT += `<div style="
                            left: ${left}%;
                            top: ${top}%; 
                            position:absolute; 
                            cursor: pointer;
                            width: max-content;
                            height: 2.4rem;
                            border-radius: 1.2rem;
                            background-color: #002d5644;
                            transform: translate(-${left}%, -100%);
                            color: #f4f3f3;
                            display: flex;
                            padding: 1rem;
                            transition: 0.3s;
                            font-size: 1.4rem;
                            align-items: center;
                            justify-content: flex-start;
                            " class="tarea">
                            ${
                              data[a]["horaSalidaR"].substring(0, 5) +
                              " " +
                              data[a]["horaSalidaR"].substring(9, 11)
                            }<span style="
                            font-size: 1.4rem; 
                            font-weight: 600; 
                            margin-left: .4rem
                            ">${data[a]["unidad_nombre"]} | FIN</span>
                            </div>`;

                          }

                        }

                        //Insertando las reservas en la linea de tiempo

                          rangeLTReseCalendaDia.selectNode(document.getElementsByTagName("div").item(1));
                          const reservasLTDiv =
                            rangeLTReseCalendaDia.createContextualFragment(htmlT);
                          dataBS[i].appendChild(reservasLTDiv);

                        //-----------------------------------------------------------------------------------------------------------

                      }

                    //---------------------------------------------------------------------------------------------------------------

                    //---------------------------------------------------------------------------------------------------------------
                    // Insertando las reservas en el contenedor de reservas

                      document.querySelector(".tareasDiv").innerHTML = "";

                      rangeLTReseContent.selectNode(document.getElementsByTagName("div").item(0));
                      const documentFragDivT =
                        rangeLTReseContent.createContextualFragment(htmlDivTareas);
                      document.querySelector(".tareasDiv").appendChild(documentFragDivT);

                    //---------------------------------------------------------------------------------------------------------------

                    redibujoCalendaDia = 1;

                  }else{

                    if(redibujoCalendaDia == 1){

                      //---------------------------------------------------------------------------------------------------------------
                      // Insertando las reservas en el contenedor de reservas (Calendario MODO DÍA - VUELTA 2)

                        document.querySelector(".tareasDiv").innerHTML = "";

                        rangeLTReseContent.selectNode(document.getElementsByTagName("div").item(0));
                        const documentFragDivT =
                          rangeLTReseContent.createContextualFragment(htmlDivTareas);
                        document.querySelector(".tareasDiv").appendChild(documentFragDivT);

                      //---------------------------------------------------------------------------------------------------------------

                    }

                  }

                  //-----------------------------------------------------------------------------------------------------------------

                }

                mostrarReservas();

                //------------------------------------------------------------------------------------------------------------------------------
                // Mostrar Div mes/año en el NAV del calendario

                  const divMesAño = document.querySelector(".divMesAño");
                  const AdelanteF = document.querySelector("#AdelanteF");
                  const AtrasF = document.querySelector("#AtrasF");

                  AdelanteF.style.display = "none";
                  AtrasF.style.display = "none";
                  divMesAño.style.display = "none";

                //------------------------------------------------------------------------------------------------------------------------------


                //------------------------------------------------------------------------------------------------------------------------------
                // Definiendo la posicion de la barra en la línea de tiempo

                  function lineaTBarra() {

                    if (
                      diaFijoD == new Date().getDate() &&
                      mesFijoD == new Date().getMonth()+1 &&
                      añoFijoD == new Date().getFullYear() &&
                      horaFijaD < 20 &&
                      horaFijaD >= 7
                    ) {

                      let tamañoVertical = 0;

                      const divHoraH = document.querySelectorAll(".divHoraH");
                      for (let i = 0; i < divHoraH.length; i++) {
                        tamañoVertical += divHoraH[i].offsetHeight;
                      }

                      var hora = new Date();
                      var hora2 = new Date();
                      hora = hora.getHours();
                      var minutos = hora2.getMinutes();

                      var top = 0;

                      let horasLT = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
                      let horasLT2 = [
                        0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400
                      ];

                      if (hora > 19 || hora < 7) {

                        return 0;

                      } else {

                        if (document.querySelector(".lineaDiaTiempo") != null) {
                          for (let e = 0; e < horasLT.length; e++) {
                            if (horasLT[e] == hora) {
                              let minutos2 = minutos * 3.33;
                              let meridiano = horasLT[e] > 11 ? "PM" : "AM";
                              let hora12 = horasLT[e];
                              top += horasLT2[e] + minutos2;
                              if (minutos < 10) {
                                minutos = "0" + minutos;
                              }
                              if (horasLT2[e] > 11) {
                                meridiano = "PM";

                                if (hora12 == 12) {
                                  meridiano = "PM";
                                }
                              }
                              if (hora12 > 12) {
                                hora12 -= 12;
                              }

                              if (horaFijaD > 18) {
                                document.querySelector(".spanHoraActu").style.color =
                                  "#888888dd";
                                document.querySelector(".spanHoraActu").textContent =
                                  "Jornada Terminada " +
                                  hora12 +
                                  ":" +
                                  minutos +
                                  " " +
                                  meridiano;
                              } else {
                                document.querySelector(".spanHoraActu").textContent =
                                  hora12 + ":" + minutos + " " + meridiano;
                              }

                              break;
                            } else {
                              continue;
                            }
                          }
                          if (horaFijaD > 18) {
                            document.querySelector(".lineaDiaTiempo").style.border =
                              "1px solid #888888dd";
                            document.querySelector(".lineaDiaTiempo").style.top =
                              top + "px";
                          } else {
                            document.querySelector(".lineaDiaTiempo").style.top =
                              top + "px";
                          }
                        }

                      }

                    }

                  }

                  //Intervalo de la barra de la linea de tiempo

                    if (document.querySelector(".divContentLineaTiempo") != null) {

                      itrvalLineaTCalendaDia = setInterval(() => {

                        if (
                          document.querySelector(".divContentLineaTiempo") != null &&
                          diaFijoD == new Date().getDate() &&
                          mesFijoD == new Date().getMonth()+1 &&
                          añoFijoD == new Date().getFullYear() &&
                          horaFijaD < 20 &&
                          horaFijaD >= 7
                        ) {

                          lineaTBarra();

                        } else {

                          if (
                            (document.querySelector(".divContentLineaTiempo") != null &&
                              diaFijoD != new Date().getDate() &&
                              mesFijoD != new Date().getMonth()+1 &&
                              añoFijoD != new Date().getFullYear()) ||
                            (document.querySelector(".divContentLineaTiempo") != null &&
                              horaFijaD >= 20 &&
                              horaFijaD <= 7)
                          ) {

                            document.querySelector(".lineaDiaTiempo").style.display = "none";
                            clearInterval(itrvalLineaTCalendaDia);

                          } else {

                            if (document.querySelector(".divContentLineaTiempo") == null) {

                              clearInterval(itrvalLineaTCalendaDia);

                            }

                          }

                        }

                      }, 2000);

                    }

                  //----------------------------------------------------------------------------------------------------------------------------

                //------------------------------------------------------------------------------------------------------------------------------
                
                //------------------------------------------------------------------------------------------------------------------------------
                // Intervalo Contenedor de las RESERVAS
                
                  if (
                    diaFijoD == new Date().getDate() &&
                    mesFijoD == new Date().getMonth()+1 &&
                    añoFijoD == new Date().getFullYear() &&
                    horaFijaD < 20 &&
                    horaFijaD >= 7
                  ){

                    if(itrvalRedibujoCalendaDia){

                      clearInterval(itrvalRedibujoCalendaDia);
                      itrvalRedibujoCalendaDia = null;
                      
                    }

                    itrvalRedibujoCalendaDia = setInterval(() => {

                      let diaActual = diaFijoD < 10 ? "0" + diaFijoD : diaFijoD;
                      let mesActual =
                        mesFijoD < 10 ? "0" + mesFijoD : mesFijoD;
                      let añoActual = añoFijoD;
        
                      let diaFijoa = diaFijo < 10 ? "0" + diaFijo : diaFijo;
                      let mesFijoa = mesFijo < 10 ? "0" + mesFijo : mesFijo;
                      let añoFijoa = añoFijo;
        
                      let fechaActu = añoActual + "-" + mesActual + "-" + diaActual;
                      let fechaFij = añoFijoa + "-" + mesFijoa + "-" + diaFijoa;
        
                      if (
                        document.querySelector(".divContentLineaTiempo") != null &&
                        fechaActu == fechaFij
                      ) {

                        mostrarReservas();

                      } else {

                        clearInterval(itrvalRedibujoCalendaDia);
                        itrvalRedibujoCalendaDia = null;

                      }

                    }, 3000);

                  }else{

                    clearInterval(itrvalRedibujoCalendaDia);
                    itrvalRedibujoCalendaDia = null;

                  }

                //------------------------------------------------------------------------------------------------------------------------------
                
              })
              .catch((err) => console.log(err));

              event.stopPropagation();

          //------------------------------------------------------------------------------------------------------------------------------------
            
        }

      //-----------------------------------------------------------------------------------------------------------------------------------

      //-----------------------------------------------------------------------------------------------------------------------------------
      // Func B: Cambiar el día y redibujar el calendario

        function moverDi(posicion) {

          redibujoCalendaDia = 0;

          if (posicion == "fAtras") {

            if (mesFijoD == 1 && diaFijoD == 1) {

              añoFijoD--;
              mesFijoD = 12;
              diaFijoD = new Date(añoFijoD, mesFijoD, 0).getDate();

            } else {

              if (diaFijoD == 1) {

                mesFijoD--;
                diaFijoD = new Date(añoFijoD, mesFijoD, 0).getDate();

              } else {

                diaFijoD--;

              }

            }

            if(itrvalRedibujoCalendaDia){

              clearInterval(itrvalRedibujoCalendaDia);
              itrvalRedibujoCalendaDia = null;

            }

            cambiarCalendaDia(diaFijoD, mesFijoD, añoFijoD);

          } else {

            if (
              mesFijoD == 12 &&
              diaFijoD == new Date(añoFijoD, mesFijoD, 0).getDate()
            ) {

              añoFijoD++;
              mesFijoD = 1;
              diaFijoD = new Date(añoFijoD, mesFijoD, 1).getDate();

            } else {

              if (diaFijoD == new Date(añoFijoD, mesFijoD, 0).getDate()) {
                
                mesFijoD++;
                diaFijoD = new Date(añoFijoD, mesFijoD, 1).getDate();

              } else {

                diaFijoD++;

              }

            }

            if(itrvalRedibujoCalendaDia){

              clearInterval(itrvalRedibujoCalendaDia);
              itrvalRedibujoCalendaDia = null;

            }

            cambiarCalendaDia(diaFijoD, mesFijoD, añoFijoD);

          }

          //
        }

      //-----------------------------------------------------------------------------------------------------------------------------------

      //-----------------------------------------------------------------------------------------------------------------------------------
      // Func C Calendario-Día - Desplegar cuadro con datos de la reserva al hacer click sobre esta.

      const rangoPdtSeleNRAdmin = document.createRange();
      const rangoPdtUnidades = document.createRange();
      
      function selectSetPdtNRAdmin(
        idPdtSelect,
        pdtNombre,
        precioXhora,
        precioXDia,
        precioXSemana,
        pdtMaxPerso,
        pdtDescri,
        pdtCaracteris,
        unidDisponibles,
        pdtImgPrins,
        ivaPdt,
        descuPdt
      ) {

        div_listaPdt.innerHTML = "";
        div_listaPdt.classList.replace("listaPdt-V", "listaPdt-O");
        in_pdtNomAdminNR.value = "";
        in_pdtNomAdminNR.classList.replace("in_pdtNomAdminNR-V", "in_pdtNomAdminNR-O");

        document.querySelector(".baseBotones").classList.replace("baseBotones-O", "baseBotones-V");
      
        div_pdtSeleContainer.innerHTML = "";
        
      
        //-------------------------------------------------------------------------------------------------
        // Disponibilidad tipo de Reserva
      
        let reseXH = precioXhora == 0 ? 0 : 1;
        reseXH = precioXhora == 1 ? 2 : reseXH;
      
        let reseXD = precioXDia == 0 ? 0 : 1;
        reseXD = precioXDia == 1 ? 2 : reseXD;
      
        let reseXS = precioXSemana == 0 ? 0 : 1;
        reseXS = precioXSemana == 1 ? 2 : reseXS;
      
        //-------------------------------------------------------------------------------------------------
      
        let precioXH = precioXhora == 0 ? "N/A" : precioXhora;
        precioXH = precioXhora == 1 ? "A consultar" : precioXhora + " COP";
        precioXH = precioXH == "0 COP" ? "N/A" : precioXH;
      
        let precioXD = precioXDia == 0 ? "N/A" : precioXDia;
        precioXD = precioXDia == 1 ? "A consultar" : precioXDia + " COP";
        precioXD = precioXD == "0 COP" ? "N/A" : precioXD;
      
        let precioXS = precioXSemana == 0 ? "N/A" : precioXSemana;
        precioXS = precioXSemana == 1 ? "A consultar" : precioXSemana + " COP";
        precioXS = precioXS == "0 COP" ? "N/A" : precioXS;
      
        let caracteristicas = pdtCaracteris.split(",");
        let htmlCaracteristiPdt = "";
      
        if (caracteristicas.length != 1) {
          for (let e = 0; e < caracteristicas.length; e++) {
            htmlCaracteristiPdt += `<span class="spanCaracter">${caracteristicas[e]}</span>`;
          }
        } else {
          htmlCaracteristiPdt += `<span class="spanCaracterVacio">Sin Datos</span>`;
        }

        const rangeTipoReserva = document.createRange();
        let contenedorPrecioAdicional = "";

        if (precioXS === "A consultar" || precioXS === 1) {
            contenedorPrecioAdicional = `
                <div class="div_precioAConsultar">
                    <div class="divPrecio">
                        <span>Precio (Definido por admin)</span>
                        <input max="10000000000000" min="10000" type="number" id="in_precioACRese" class="in_precioACRese in_precioACRese-V" value="">
                        <span class="spanMoneda">COP</span>
                    </div>
                    <div class="divIva">
                        <span>IVA</span>
                        <input max="1000000" min="1" type="number" id="in_ivaPrecioACRese" class="in_ivaPrecioACRese in_ivaPrecioACRese-V" value="">
                        <span class="spanMoneda">%</span>
                    </div>
                    <div class="divDescu">
                        <span>Descuento</span>
                        <input max="1000000" min="1" type="number" id="in_descuPrecioACRese" class="in_descuPrecioACRese in_descuPrecioACRese-V" value="">
                        <span class="spanMoneda">%</span>
                    </div>
                </div>
            `;
        }

        // Selecciona el input donde se guardará la fecha de inicio
        const inO_fechaInicioNR = document.querySelector("#inO_fechaInicioNR");
        const inO_fechaFinalNR = document.querySelector("#inO_fechaFinalNR");

        const inO_horaIncioNR = document.querySelector("#inO_horaInicioNR");
        const inO_horaFinalNR = document.querySelector("#inO_horaFinalNR");

        const inO_cadenaFechasNR = document.querySelector("#inO_cadenaFechasNR");

        const inO_cantHorasNR = document.querySelector("#inO_cantHorasNR");
        const inO_cantDiasNR = document.querySelector("#inO_cantDiasNR");

        // Función para abrir el cuadro de duración de reserva segun el tipo de reserva (hora, día, semana, mes)
        function abrirCuadroDuracionRese(tipoRese) {
          
            const div_tiempoReseBase = document.getElementById('div_tiempoReseBase');
            const inO_tipoReseNR = document.getElementById('inO_tipoReseNR');
            const rangeTipoReserva = document.createRange();

            div_tiempoReseBase.classList.replace("div_tiempoReseBase-O", "div_tiempoReseBase-V");

            let htmlTipoRese = "";

            if (tipoRese === "hora") {
                htmlTipoRese = `
                    <span>Agendamiento</span>
                    <div class="div_fechaInicio">
                        <span>Fecha</span>
                        <input oninput="revisarDispoReserva('hora')" type="date" id="in_fechaIniRese" class="in_fechaIniRese-V" value="">
                    </div>
                    <div class="div_horaInicio">
                        <span>Hora</span>
                        <input oninput="revisarDispoReserva('hora')" type="time" id="in_horaIniRese" class="in_horaIniRese-V" value="">
                    </div>
                    <div class="div_cantHoras">
                        <span>Duración</span>
                        <input oninput="revisarDispoReserva('hora')" type="number" min="1" max="12" id="in_cantHorasRese" class="in_cantHorasRese-V" value="">
                        <span class="spanDuracion">Horas</span>
                    </div>
                    <span class="span_errorReseH span_errorReseH-O">############ ########## ########## ###############</span>
                    <div id="div_unidadBaseGene" class="div_unidadBaseGene div_unidadBaseGene-O">
                      <span class="tituloUnid">Seleccione la <b>Unidad</b></span>
                      <div 
                        id="div_unidSeleBase" 
                        class="div_unidSeleBase div_unidSeleBase-O"
                      >
                      </div>
                      <div class="div_inYListaUnidad">
                        <input 
                          id="in_unidadTocaElige" 
                          class="in_unidadTocaElige in_unidadTocaElige-V"
                          placeholder = "Toca para ver las unidades disponibles"
                        >
                        <div 
                          id="div_listaUnidDisponibles" 
                          class="div_listaUnidDisponibles div_listaUnidDisponibles-O"
                        >
                        </div>
                      </div>
                    </div>
                `;
            } else if (tipoRese == "dia") {
                htmlTipoRese = `
                    <span>Agendamiento</span>
                    <div class="div_fechaInicio">
                        <span>Fecha</span>
                        <input type="date" id="in_fechaIniRese" class="in_fechaIniRese-V" value="" oninput="revisarDispoReserva('dia')">
                    </div>
                    <div class="div_cantHoras">
                        <span>Duración</span>
                        <input type="number" min="1" id="in_cantHorasRese" class="in_cantHorasRese-V" value="" oninput="revisarDispoReserva('dia')">
                        <span class="spanDuracion">Días</span>
                    </div>
                    <span class="span_errorReseH span_errorReseH-O">############ ########## ########## ###############</span>
                    <div id="div_unidadBaseGene" class="div_unidadBaseGene div_unidadBaseGene-O">
                      <span class="tituloUnid">Seleccione la <b>Unidad</b></span>
                      <div 
                        id="div_unidSeleBase" 
                        class="div_unidSeleBase div_unidSeleBase-O"
                      >
                      </div>
                      <div class="div_inYListaUnidad">
                        <input 
                          id="in_unidadTocaElige" 
                          class="in_unidadTocaElige in_unidadTocaElige-V"
                          placeholder = "Toca para ver las unidades disponibles"
                        >
                        <div 
                          id="div_listaUnidDisponibles" 
                          class="div_listaUnidDisponibles div_listaUnidDisponibles-O"
                        >
                        </div>
                      </div>
                    </div>
                `;
            } else if (tipoRese == "mes") {
                htmlTipoRese = `
                    <span>Agendamiento</span>
                    <div class="div_fechaInicio">
                        <span>Fecha</span>
                        <input type="date" id="in_fechaIniRese" class="in_fechaIniRese-V" value="" oninput="revisarDispoReserva('mes')">
                    </div>
                    <div class="div_cantHoras">
                        <span>Duración</span>
                        <input 
                          type="number" 
                          id="in_cantHorasRese" 
                          class="in_cantHorasRese-V"
                          min = "1"
                          value = "1"
                          oninput="revisarDispoReserva('mes')"
                        >
                        <span class="spanDuracion">Meses</span>
                    </div>
                    <div class="div_precioAConsultar">
                        <div class="divPrecio">
                            <span>Precio x Mes (Definido por admin)</span>
                            <input oninput="revisarDispoReserva('mes')" max="10000000000000" min="10000" type="number" id="in_precioACRese" class="in_precioACRese in_precioACRese-V" value="">
                            <span class="spanMoneda">COP</span>
                        </div>
                        <div class="divIva">
                            <span>IVA</span>
                            <input oninput="revisarDispoReserva('mes')" max="1000000" min="1" type="number" id="in_ivaPrecioACRese" class="in_ivaPrecioACRese in_ivaPrecioACRese-V" value="">
                            <span class="spanMoneda">%</span>
                        </div>
                        <div class="divDescu">
                            <span>Descuento</span>
                            <input oninput="revisarDispoReserva('mes')" max="1000000" min="1" type="number" id="in_descuPrecioACRese" class="in_descuPrecioACRese in_descuPrecioACRese-V" value="">
                            <span class="spanMoneda">%</span>
                        </div>
                    </div>
                    <span class="span_errorReseH span_errorReseH-O">############ ########## ########## ###############</span>
                    <div id="div_unidadBaseGene" class="div_unidadBaseGene div_unidadBaseGene-O">
                      <span class="tituloUnid">Seleccione la <b>Unidad</b></span>
                      <div 
                        id="div_unidSeleBase" 
                        class="div_unidSeleBase div_unidSeleBase-O"
                      >
                      </div>
                      <div class="div_inYListaUnidad">
                        <input 
                          id="in_unidadTocaElige" 
                          class="in_unidadTocaElige in_unidadTocaElige-V"
                          placeholder = "Toca para ver las unidades disponibles"
                        >
                        <div 
                          id="div_listaUnidDisponibles" 
                          class="div_listaUnidDisponibles div_listaUnidDisponibles-O"
                        >
                        </div>
                      </div>
                    </div>
                `;
            } else if (tipoRese == "semana") {
                htmlTipoRese = `
                    <span>Agendamiento</span>
                    <div class="div_semanaBase">
                        <span class="semanaTitulo">Semana</span>
                        <div class="div_fechasSemana">
                            <button 
                              class="btn_atrasSemana btn_atrasSemana-D"
                              onclick="semanaAdelanteAtras('atras')"
                            >
                            <
                            </button>
                            <div class="div_fechas">
                                <span class="span_fechaIniSemana"></span>
                                <span class="separadorFecha">-</span>
                                <span class="span_fechaFinSemana"></span>
                            </div>
                            <button 
                              class="btn_adelanteSemana btn_adelanteSemana-D"
                              onclick="semanaAdelanteAtras('adelante')"
                            >
                            >
                            </button>
                        </div>
                        <div class="div_btnLongiSemana">
                          <div class="divLuVi">
                            <button
                              id="in_lunesAViernes"
                              class="in_lunesAViernes in_lunesAViernes-N"
                              onclick = "longitudSemana('viernes')"
                            >V</button>
                            <span>Lunes a Viernes</span>
                          </div>
                          <div class="divLuSa">
                            <button
                              id="in_lunesASabado"
                              class="in_lunesASabado in_lunesASabado-A"
                              onclick = "longitudSemana('sabado')"
                            >S</button>
                            <span>Lunes a Sábado</span>
                          </div>
                        </div>
                        <div class="div_btnCantiSemana">
                          <input 
                            type="number" 
                            id="in_numeroSemanasCant" 
                            class="in_numeroSemanasCant in_numeroSemanasCant-D"
                            value="1"
                            min="1"
                            oninput="definirSemanaReservaXS()"
                          >
                          <span class="cantSema">Semanas</span>
                        </div>
                    </div>
                    ${contenedorPrecioAdicional} <!-- Aquí se incluye el contenedor adicional solo si corresponde -->
                    <span class="span_errorReseH span_errorReseH-O">############ ########## ########## ###############</span>
                    <div class="div_reseSemanaResumen div_reseSemanaResumen-O">
                      <p class="p_resumenDatosSemana"></p>
                    </div>
                    <div id="div_unidadBaseGene" class="div_unidadBaseGene div_unidadBaseGene-O">
                      <span class="tituloUnid">Seleccione la <b>Unidad</b></span>
                      <div 
                        id="div_unidSeleBase" 
                        class="div_unidSeleBase div_unidSeleBase-O"
                      >
                      </div>
                      <div class="div_inYListaUnidad">
                        <input 
                          id="in_unidadTocaElige" 
                          class="in_unidadTocaElige in_unidadTocaElige-V"
                          placeholder = "Toca para ver las unidades disponibles"
                        >
                        <div 
                          id="div_listaUnidDisponibles" 
                          class="div_listaUnidDisponibles div_listaUnidDisponibles-O"
                        >
                        </div>
                      </div>
                    </div>
                `;
            }

            // Incrementador de semanas
            inO_tipoReseNR.value = tipoRese;
            div_tiempoReseBase.innerHTML = "";

            rangeTipoReserva.selectNode(document.getElementsByTagName("div").item(0));
            const tipoReseSelect = rangeTipoReserva.createContextualFragment(htmlTipoRese);
            div_tiempoReseBase.appendChild(tipoReseSelect);      
            
            if(tipoRese == "semana"){
              definirSemanaReservaXS();
            }
            
        }

        // aqui se acaba el codigo para guardar la informacion en los campos "invisibles"

        const rangeReservaDatos = document.createRange();

        function mostrarDatosRese(
          fecha,
          horaEnR,
          horaSaR,
          numPerso,
          precioReser,
          comisiReser,
          fechaCompra,
          horaCompra,
          reseActivi,
          etdReser,
          tipoRese,
          unidadNom,
          unidadImg,
          unidStd,
          userId,
          userNom,
          userStd,
          userImg,
          userRol,
          userSecun,
          unidadId,
          intervalo,
          idReserDiv,
          codigoRese,
          fechaReseFin,
          nombreProducto,
          imagenProducto,
          idRese
        ) { 

          // Evento para ocultar o mostrar el cuadro con los detalles de la reserva

            window.addEventListener("click", (e)=>{
      
              if(document.getElementById(idReserDiv).contains(e.target) || document.getElementById("cuadroDrese").contains(e.target)){

                document.querySelector("#cuadroDrese").classList.replace("cuadroDReserva", "cuadroDReserva2")

              }else{
                
                document.querySelector("#cuadroDrese").classList.replace("cuadroDReserva2", "cuadroDReserva");

              }

            });

          //----------------------------------------------------------------------------------------------------------------------------------
      
          if(intrvalDataReseCuadro == null){

            intrvalDataReseCuadro = setInterval(() => {

              if(document.querySelector("#cuadroDrese").classList.contains("cuadroDReserva2")){

                let horaActuMinus = 
                  horaAMinutos((new Date().getHours())+":"+(new Date().getMinutes())); // Hora Actual en Minutos
                let horaEntraMinus = horaAMinutos(horaEnR); // Hora de Inicio de la Reserva en Minutos
                let horaSaleMinus = horaAMinutos(horaSaR); // Hora Final de la Reserva en Minutos
                let minusRestantes = 0;
                let reseTiempoResta = "";
                
                minusRestantes = horaEntraMinus-horaActuMinus; // Minutos restantes para el inicio de la reserva
              
                let stdUnidad = ""; // Disponibilidad de la Unidad
              
                //-------------------------------------------------------------------------------------------------------------------------------------
                // Obtener Estado de la reserva

                  let formEstadoRese = new FormData();

                  formEstadoRese.append("idReseEstado", idRese);

                  fetch(urlBuscarInfoAdminDB, {
                    method: "POST",
                    body: formEstadoRese,
                  })
                    .then((response) => response.json())
                    .then((data) => {

                      //--------------------------------------------------------------------------------------------------------------------------------
                      // Filtrando el Estado de la Reserva

                        // Pendientes
                        if(
                          data["estadoReserva"] == 'Pendiente' && 
                          minusRestantes > 30
                        ){
              
                          estadoDataRese = `
                          <div class="estadoReseDivSpanP">
                            <span>Pendiente</span>
                          </div>
                          `;

                          reseTiempoResta = "";

                          stdUnidad = "Disponible";
              
                        }

                        // Próximas
                        if(
                          data["estadoReserva"] == 'Pendiente' && 
                          minusRestantes <= 30
                        ){

                          estadoDataRese = `
                          <div class="estadoReseDivSpanPRO">
                            <span>Próximamente</span>
                          </div>
                          `;

                          reseTiempoResta = "";
              
                          stdUnidad = "Disponible";
              
                        }

                        // Pendientes por varios dias
                        if(
                          data["estadoReserva"] == 'Pendiente' && 
                          minusRestantes < 0
                        ){

                          estadoDataRese = `
                          <div class="estadoReseDivSpanT">
                            <span>Terminada por hoy</span>
                          </div>
                          `;

                          reseTiempoResta = "";
              
                          stdUnidad = "Disponible";
              
                        }
                        
                        // En Proceso
                        if(
                          data["estadoReserva"] == "En Proceso"
                        ){
          
                          let horasRestantesFin = parseInt((horaSaleMinus-horaActuMinus)/60)
                          let minusRestantesFin = (horaSaleMinus-horaActuMinus)-(horasRestantesFin*60);
                          
                          estadoDataRese = `
                          <div class="estadoReseDivSpanEP">
                            <span>En Proceso</span>
                          </div>
                          `;
          
                          reseTiempoResta = `
                          <div class="divTiempoRese">
                            <div class="divSvg">
                              <span>Tiempo Restante</span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 631.19 631.21"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M317.77,0C142-.82,0,140.4,0,314.73,0,489.79,141,631.22,315.64,631.21c173.46-.22,315.8-140.07,315.55-316.1C631,140.51,490.42.81,317.77,0ZM314,608.73C153.67,608.37,22.55,476.52,22.53,315.19c0-162.07,131.88-293.54,295.17-292.71,159.47.81,291.64,130,291,294.4C608,480.21,475.18,609.09,314,608.73Z"/><path d="M440.5,396.74c5-5.46,3.62-13-3.24-17.38q-47.37-30-94.79-59.94c-2.47-1.55-3.78-3.22-4.05-6.27-.53-6-2.9-11.46-7.92-15-3.36-2.38-4-5.18-4-8.92.1-28.66.06-57.33,0-86q0-43.48,0-87c0-7.13-4.16-12-10.34-12.41s-11.26,4.41-11.93,11.57c-.19,2-.11,4-.11,6q0,84,0,168c0,3.43-.38,6.18-3.49,8.69a22.58,22.58,0,0,0-5.26,28.85,23,23,0,0,0,27.58,10.33,7.35,7.35,0,0,1,7,.68q28.86,18.4,57.84,36.65c12.53,7.92,25,15.93,37.63,23.7C431.31,401.82,436.53,401.07,440.5,396.74Zm-124.61-71c-6.44-.28-10.51-4.34-10.41-10.39a10,10,0,0,1,10.23-10A10.31,10.31,0,0,1,325.92,316C325.79,321.24,321,325.94,315.89,325.71Z"/><path d="M192.88,516.76a9.88,9.88,0,0,0-8.43,4.51c-4.67,7.64-9.3,15.33-13.39,23.29-2.53,4.9,0,11,4.83,13.68s11.05,1.75,14.18-3a169.79,169.79,0,0,0,13.37-23.3C206.61,524.88,201.11,516.88,192.88,516.76Z"/><path d="M81.5,314.66c-.58-5.67-4.66-9.59-10.71-9.91-4-.22-8,0-12,0v0c-4,0-8-.1-12,0-6.4.21-10.85,4.39-11.32,10.43a10.7,10.7,0,0,0,9.11,11.39,108,108,0,0,0,27.88,0C78.55,325.77,82.07,320.43,81.5,314.66Z"/><path d="M101.4,204.25c6.45,0,10.55-2.85,12.17-7.24,1.76-4.8.71-9.3-3.22-12.14a141.18,141.18,0,0,0-24.17-13.93c-4.58-2.08-8.84-.48-12.09,3.32s-4.14,8.86-1,12.41C81.18,195.63,92.42,199.68,101.4,204.25Z"/><path d="M586.59,304.48a110.18,110.18,0,0,0-28.34.12c-5.74.82-9,6-8.45,11.75a10.49,10.49,0,0,0,10.55,9.92c4,.15,8,0,12,0,4.16,0,8.33.14,12.48,0,6-.25,10.14-4.18,10.72-9.84S592.55,305.17,586.59,304.48Z"/><path d="M98,428.62c-7.18,3.84-14.19,8-21.16,12.25a10,10,0,0,0-5,9.23A10.8,10.8,0,0,0,88,459.94c7.06-3.7,14-7.75,20.78-11.9,5.53-3.36,7.29-10,4.37-15.16A11.13,11.13,0,0,0,98,428.62Z"/><path d="M315.4,81.32c6.31,0,10.75-4.28,11.09-11,.2-3.82,0-7.65,0-11.48h0c0-3.82.1-7.65,0-11.48-.24-7.15-4.48-11.61-11-11.7s-11.09,4.07-11.36,11.26c-.3,7.81-.27,15.64,0,23.45A10.86,10.86,0,0,0,315.4,81.32Z"/><path d="M532.83,202.57c7.37-3.82,14.55-8.06,21.58-12.49a10.64,10.64,0,0,0,3.52-14.85,11.1,11.1,0,0,0-14.79-4.14c-7,3.79-13.89,7.87-20.73,12-3.66,2.2-5.74,5.48-5.52,9.94A10.74,10.74,0,0,0,532.83,202.57Z"/><path d="M554.65,440.62c-7.27-4.36-14.55-8.73-22.06-12.64-5.32-2.77-11.24-.61-14.2,4.45-2.77,4.76-1.81,11.14,3,14.23a225.85,225.85,0,0,0,23.31,13.43c7,3.4,14.88-2.41,14.88-10.22A10.09,10.09,0,0,0,554.65,440.62Z"/><path d="M447.78,522.12c-3.44-5.5-9.55-7-14.74-4.12a11,11,0,0,0-4.37,15c3.74,7,7.82,13.9,11.92,20.74a10.64,10.64,0,0,0,10,5.52,10.79,10.79,0,0,0,9.46-16C456.28,536,452.1,529,447.78,522.12Z"/><path d="M314.52,549.74A10.47,10.47,0,0,0,305,560.09c-.16,4.15,0,8.31,0,12.46h-.05q0,3.24,0,6.48c0,2.16-.11,4.33.05,6.48a10.32,10.32,0,0,0,9.49,9.83c5.74.55,10.92-2.28,11.83-7.63a90.82,90.82,0,0,0,.06-30.24C325.4,552.09,320,549.11,314.52,549.74Z"/><path d="M434.71,113.7c4.85,1.51,9.3.24,11.94-3.86,4.85-7.53,9.29-15.36,13.43-23.31,2.24-4.29.53-9.69-3.21-12.57-4-3-9.08-4-12.51-.83-8.82,8.1-13,19.26-17.41,28C427,108.16,430,112.23,434.71,113.7Z"/><path d="M184.07,110.06c2.54,4.06,7.92,5.41,12.45,3.71s7.14-5.22,7.25-10.86c-.17-.9-.11-2.55-.8-3.78-4.37-7.82-8.61-15.74-13.5-23.24-3.12-4.78-9.51-5.51-14.24-2.56s-7,8.82-4.33,13.87C175,95,179.4,102.61,184.07,110.06Z"/></g></g></svg>
                            </div>
                            <div class="divHoras">
                              <span>${horasRestantesFin}</span>
                              <span>H</span>
                            </div>
                            <div class="divMinutos">
                              <span>${minusRestantesFin}</span>
                              <span>m</span>
                            </div>
                          </div>
                          `;
          
                          stdUnidad = "Ocupada";
              
                        }
                        
                        // Terminadas
                        if(
                          data["estadoReserva"] == "Terminada"
                        ){
              
                          estadoDataRese = `
                          <div class="estadoReseDivSpanT">
                            <span>Terminada</span>
                          </div>
                          `;

                          reseTiempoResta = "";

                          stdUnidad = "Disponible";
              
                        }

                      //----------------------------------------------------------------------------------------------------------------------------------

                      //----------------------------------------------------------------------------------------------------------------------------------
                      // Form para los Otros Miembros

                        let formOtrosMiembros = new FormData();
          
                        formOtrosMiembros.append("usersIdReseDiv", userSecun);
            
                        fetch(urlBuscarInfoAdminDB, {
                          method: "POST",
                          body: formOtrosMiembros,
                        })
                          .then((response) => response.json())
                          .then((data) => {
            
                            let htmlOtrosM = "";
            
                            for(let i = 0; i < data.length; i++){
            
                              htmlOtrosM += `
                              <div class="divUserSecuI">
                                <div class="divImgUserS">
                                  <img src="imagesUser/${data[i]["user_imagen"]}" alt="">
                                </div>
                                <div class="dataDivUSecun">
                                  <span>${data[i]["user_nombre"]+" "+data[i]["user_apellido"]}</span>
                                  <span>${data[i]["user_rol"]}</span>
                                  <span>${data[i]["user_estado"]}</span>
                                </div>
                              </div>
                              `;
            
                            }

                            //----------------------------------------------------------------------------------------------------------------------------------
                            // Insertando HTML Base

                              document.querySelector("#cuadroDrese").innerHTML = "";
                          
                              let htmlRMuestraD = `
                              <div>
                                <div class="numReservaDiv">
                                  <span>${codigoRese}</span>
                                  <span>Reserva por <b>${tipoRese.toUpperCase()}</b></span>
                                </div>
                                <div class="divInfoRese">
                                  <div class="divFechaRese">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 486.21"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M428.15,72.21h-28.5V15a15,15,0,0,0-15-15h0a15,15,0,0,0-15,15V72.21H116.35V15a15,15,0,0,0-30,0V72.21H57.86A57.86,57.86,0,0,0,0,130.07V428.35a57.86,57.86,0,0,0,57.86,57.86H428.15A57.85,57.85,0,0,0,486,428.35V130.07A57.85,57.85,0,0,0,428.15,72.21Zm-275.6,384H57.86A27.89,27.89,0,0,1,30,428.35V393.22H152.55Zm0-91.33H30V300.24H152.55Zm0-93H30V207.25H152.55ZM305.1,456.21H180.9v-63H305.1Zm0-91.33H180.9V300.24H305.1Zm0-93H180.9V207.25H305.1ZM456,428.35a27.89,27.89,0,0,1-27.85,27.86h-94.7v-63H456Zm0-63.47H333.45V300.24H456Zm0-93H333.45V207.25H456Zm0-93H30V130.07a27.89,27.89,0,0,1,27.86-27.86H428.15A27.89,27.89,0,0,1,456,130.07Z"/></g></g></svg>
                                    <div class="divIniF">
                                      <span class="spanIni">Inicio:</span>
                                      <span class="fiSpan">${fecha} | ${horaEnR}</span>
                                    </div>
                                    <div class="divFinF">
                                      <span class="spanFin">Fin:</span>
                                      <span class="ffSpan">${fechaReseFin} | ${horaSaR}</span>
                                    </div>
                                  </div>
                                  <div class="divDatosRese">
                                    <div class="divReseFR">
                                      <span>Reserva realizada el:</span>
                                      <span>${fechaCompra} | ${horaCompra}</span>
                                    </div>
                                    <div class="divActiRese">
                                      <span class="actiSpan">Actividades de la reserva:</span>
                                      <textarea id="textAreaActi" cols="10" disabled>${reseActivi}</textarea>
                                    </div>
                                  </div>
                                  <div class="preciosDatosDiv">   
                                    <div class="divPrecio" title="Precio de la Reserva">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 693.2 570.47"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M686.73,169c-9.12-20.43-24-36.29-40.88-50.43C616.52,94,583.25,76.31,547.56,63c-3.62-1.35-6.23-2.68-6.94-7.23C535.54,23.21,511.44,2.61,478.54,2.1c-17.66-.27-35.31-.19-53-.7-28-.81-56-.26-82.05-1.4H328.09a79.14,79.14,0,0,0-49.61,17.06c-6.1,4.71-11.22,10.45-16.63,15.87q-122.18,122.45-244.3,245C-2.71,298.19-5.72,326.67,10,350c5.35,7.91,12.7,14.09,19.39,20.81Q106.9,448.5,184.55,526c24.31,24.28,58.1,24.28,82.35,0Q392.77,400.21,518.56,274.28c6.39-6.4,12.24-13.26,16.11-21.5,1.74-3.7,3.74-4.54,7.81-3.49,22.49,5.79,45.33,9.57,68.64,9,18-.46,35.57-3.07,51.56-12,16.82-9.42,27.75-23,30.12-42.75C694.26,191.32,691.62,179.93,686.73,169ZM338.67,277.67c-5.35,2.7-10.62,5.59-15.81,8.59-3.3,1.92-5,1.17-6.22-2.44a79,79,0,0,0-22-32.88c-3.37-3.05-7-5.64-11.46-6.89-12.76-3.58-23.29,4.93-22.51,18.15a58.22,58.22,0,0,0,4.8,18.79c4.3,10.48,8.81,20.89,11.92,31.81,6.36,22.32-1.61,45-20.25,57.8-7.43,5.09-16.65,7.67-28.68,7.7-8,.28-16.58-1.92-24.7-6.29-8.54-4.59-11.83-4-18.57,2.75-3.06,3.07-6.22,6-9.25,9.13-2.16,2.19-4.18,2.41-6.44.18-3.56-3.52-7.19-6.95-10.77-10.44-2.8-2.72-2.85-5.38,0-8.16,3.12-3,6.17-6.1,9.1-9.28,4.56-5,4.82-7.76,1-13.32-6.13-8.95-12.38-17.79-15.88-28.22-2.26-6.72-2.15-7.26,3.9-10.76,4.76-2.74,9.66-5.25,14.37-8.08,3.73-2.25,5.79-1.9,7.2,2.69,3.61,11.77,9.85,22.17,17.52,31.76a44,44,0,0,0,15.49,12.35c7.93,3.84,15.76,4.49,23.09-1.13s9-13.66,7.41-22.45c-1.46-7.93-4.84-15.21-8-22.56-5.74-13.36-11-26.79-10.69-41.76.49-20.85,17.53-40,38.21-43.3,11.92-1.87,22.78,1,33.4,5.86,9.16,4.15,10.82,3.91,18-3.15,2.74-2.68,5.47-5.37,8.21-8,2.06-2,4.08-2,6.1.08q5.26,5.34,10.55,10.65c2.34,2.35,2.22,4.64-.06,6.95-2.45,2.5-4.91,5-7.29,7.55-5.6,6-5.86,8.61-1.21,15.32,4.85,7,9.35,14.16,12.62,22.09C343.61,273,342.75,275.61,338.67,277.67Zm295.59-73.88c-11.21,3.75-22.88,4.67-34.55,3.8-53.88-4-102.11-23.64-146.36-53.9-3.23-2.21-5.05-2.65-8.24.55-11.78,11.85-26.27,15-41.87,9.77s-24.91-16.84-26.91-33.44c-3-24.56,15.37-45.18,39.89-45.25,23-.07,41,17.75,40.54,40.91-.13,6,1.88,9.27,6.66,12.38a336.64,336.64,0,0,0,74.41,36.16c4.89,1.69,5.57,1.32,5.29-4.05-.88-16.82-.44-33.64-.78-50.46-.08-3.46.71-4.57,4.23-3,29.74,13.25,57.56,29.36,80.32,53.14,5.44,5.69,10.36,11.79,13.58,19C644.07,197.53,642.62,201,634.26,203.79Z"/><path d="M594.45,301.91c0-4.05-1.5-5.79-5.49-5.8-7.35,0-14.82-.48-21.78-2.44-8.94-2.52-14.29.56-20.55,6.87Q447.93,400.11,348.53,499c-22.07,22-43,45.07-66.8,65.3-2.66,2.27-1.53,3.09,1,3.81a60.36,60.36,0,0,0,16.75,2.37q59.49,0,119,0c40,0,80,.09,120,0,30.36-.1,55.73-24.37,55.89-54.57C594.64,444.53,594.37,373.22,594.45,301.91Z"/></g></g></svg>
                                      <span>$${precioReser}</span>
                                    </div>
                                    <div class="divComision" title="Comisión de la Reserva">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1695.88 1614.71"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M1694.87,1235.78c-2.83-18.65-13.37-33.49-28.95-42.81a76.56,76.56,0,0,0-25.37-9.36c-25.4-4.71-50.08-1-74.57,5.65-18.55,5.06-35.84,13.46-53.79,20.12-36.24,13.44-72.76,26.11-109.17,39.09q-159.86,56.94-319.68,114a105.46,105.46,0,0,1-29.44,6.15c-2.35.16-4.72.22-7.12.21q-25.63-.13-51.29-.17c-47-.09-94.07,0-141.1,0h-6.1q-49.83,0-99.64,0c-13.12,0-23.26-5.78-29.59-17.17-6.42-11.55-6.15-23.44,1.12-34.62,6.79-10.44,16.68-15,28.69-15.58h0q74.55,0,149.1,0,55.49,0,111-.06c46.67,0,81.59-43,72.7-88.66-6.11-31.36-32.65-56.17-66.69-59.91a81.89,81.89,0,0,0-9.71-.49c-52.85.47-105.7.52-158.55.52q-55,0-109.93,0a43.41,43.41,0,0,1-20.58-5.19Q600.47,1087.24,484.74,1027a20.54,20.54,0,0,0-8.62-2.37c-.46,0-.93-.05-1.4-.05l-38.26,0h-3.9l-58.57,0q-36.57,0-73.15-.05,0,107.6,0,215.2v213.6c13,0,25.93,0,38.9,0a47,47,0,0,1,17.14,2.94l153,59Q636,1564,762.12,1612.73a27.73,27.73,0,0,0,10.25,1.72c36.5,0,73-.56,109.49.21,4.74.1,9.42,0,14-.24,12.91-.81,25.31-3.47,37.14-9.74a56.45,56.45,0,0,1,6.5-2.6c93.22-35.67,187.51-68.42,281-103.28,119.91-44.69,239.79-89.48,355.67-144.13,30.91-14.57,61.65-29.69,89.6-49.5C1689.51,1288.37,1699.22,1264.43,1694.87,1235.78Z"/><path d="M274.05,913.29H7.62C0,913.3,0,913.34,0,921v636.84c0,7.76,0,7.77,7.61,7.77H273.54c7.3,0,7.31,0,7.31-7.44V1239.77q0-159.7,0-319.42C280.84,913.32,280.82,913.29,274.05,913.29Z"/><path d="M542,735.29a510.75,510.75,0,0,0,120.7,158.43,505.64,505.64,0,0,0,139.15,88.14c82.26,34.89,167.94,47.09,256.75,37.47a491,491,0,0,0,154-42.37c102.62-47.42,182.06-120.39,236.88-219.33,53.09-95.81,72.47-198.63,60.13-307.32-6.82-60-24.36-116.94-51.82-170.79A515,515,0,0,0,1217.09,47,504.8,504.8,0,0,0,1070,3.84c-11.69-1.58-23.47-2.58-35.21-3.84h-67C959.48.89,951.22,1.74,943,2.67A500,500,0,0,0,777.35,51.14a511.27,511.27,0,0,0-149,110.35A502.38,502.38,0,0,0,549,272.64q-72.79,139.47-55.63,296A499.69,499.69,0,0,0,542,735.29Zm623,65.13c-69.3,0-125.48-56.29-125.51-125.79,0-69.72,56.53-126,126.6-125.93,69.08,0,125.19,56.62,125.12,126.19C1291.08,744.67,1235,800.42,1164.92,800.42ZM838.3,221.1c69-.25,125.62,57,125.59,126.16,0,69.34-56.95,126.53-126.4,125.81-74.25-.75-126.12-61-125.26-126.1C711.37,282,764,221.37,838.3,221.1ZM720.75,740.25Q806.93,654.18,893,568q167.27-167.26,334.44-334.62c8.75-8.76,17.91-15.54,31-15.18,14.29.4,25,6.89,31.61,19.28,6.9,12.88,5.85,25.75-2.32,37.88a51,51,0,0,1-6.33,7.37q-253.92,254-507.89,508c-15.65,15.65-35.59,17.51-51.55,4.48-8.72-7.11-13-16.62-13-30.47C709,756.5,713.22,747.75,720.75,740.25Z"/><path d="M1165.64,621.71a52.85,52.85,0,1,0-.6,105.7,52.85,52.85,0,0,0,.6-105.7Z"/><path d="M837.11,399.93a52.76,52.76,0,1,0,.48-105.51c-29.33.11-52.35,23.34-52.34,52.77C785.27,376.41,808.18,399.72,837.11,399.93Z"/></g></g></svg>
                                      <span>$${comisiReser}</span>
                                    </div>
                                    <div class="divPersonas" title="Cantidad de Personas">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276.47 174.23"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M103.26,97c3.29-2,3.13-3.89,1.29-6.86C89.82,66.33,58.11,56.68,33,69,9.72,80.35-.7,99.62,0,125.29c.29,10.13,5.7,15.84,15.76,16,8.67.09,17.33,0,26,0,8.5,0,17-.17,25.5.08,4,.12,5.9-1.16,7-5.17A64.57,64.57,0,0,1,103.26,97Z"/><path d="M56.44,56.41c16,.08,28.19-12,28.2-28C84.66,12.86,71.79-.15,56.52,0A28.63,28.63,0,0,0,28.31,28.5C28.33,43.69,41.07,56.34,56.44,56.41Z"/><path d="M137.92,89.35h.64a28.06,28.06,0,0,0,27.83-28.13,28.15,28.15,0,1,0-56.3,0A28.06,28.06,0,0,0,137.92,89.35Z"/><path d="M174.54,109.92c-11.23-9.29-23.5-13.8-36.3-13.57-12.8-.23-25.07,4.28-36.3,13.57C87.06,122.24,81,138.59,81.87,157.83c.49,11,5.25,16.3,16.24,16.36,13.33.07,26.66,0,40,0h.26c13.34,0,26.67.06,40,0,11-.06,15.75-5.33,16.24-16.36C195.46,138.59,189.42,122.24,174.54,109.92Z"/><path d="M243.5,69c-25.13-12.29-56.84-2.64-71.57,21.13-1.84,3-2,4.81,1.29,6.86a64.57,64.57,0,0,1,29,39.21c1.08,4,3,5.29,7,5.17,8.5-.25,17-.08,25.5-.08,8.67,0,17.33.07,26,0,10.06-.11,15.47-5.82,15.76-16C277.18,99.62,266.76,80.35,243.5,69Z"/><path d="M220,56.41c15.37-.07,28.11-12.72,28.13-27.91A28.63,28.63,0,0,0,220,0c-15.27-.15-28.14,12.86-28.12,28.43C191.85,44.41,204,56.49,220,56.41Z"/></g></g></svg>
                                      <span>${numPerso}</span>  
                                    </div>
                                  </div>
                                  <div class="divEstTRestan">
                                    <div class="divEstado">
                                    </div>
                                    <div class="divReloj">
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="divUserYUnidadGene">
                                <div class="divUserYUnidad">
                                  <div class="divUsersGene">
                                    <div class="divUserPrin">
                                      <span>Reserva por:</span>
                                      <div class="divImgUserP">
                                        <img src="imagesUser/${userImg}" alt="">
                                      </div>
                                      <div class="dataUPrin">
                                        <span>${userNom}</span>
                                        <span>${userRol}</span>
                                        <span>${userStd}</span>
                                      </div>
                                    </div>
                                    <span class="spanOtrosMiembros">Otros miembros presentes:</span>
                                    <div class="divUserSecun" onwheel="scrolearX('divUserSecun')">
                                    </div>
                                  </div>
                                  <div class="reserUnidDiv">
                                    <span class="spanStdUnid"></span>
                                    <div class="divUnidadContent">
                                      <div class="divImg"><img src="images/productosImages/${unidadImg}" alt=""></div>
                                      <div class="divDatos">
                                        <span class="unidNom">${unidadNom}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="reserPdtDiv">
                                    <span>Producto</span>
                                    <div class="divPdtContent">
                                      <div class="divImg"><img src="images/productosImages/${imagenProducto}" alt=""></div>
                                      <div class="divDatos">
                                        <span class="unidNom">${nombreProducto}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                </div>
                              </div>
                              `;
                          
                              rangeReservaDatos.selectNode(
                                document.getElementsByTagName("div").item(0)
                              );
                              const documentDatosReserva =
                                rangeReservaDatos.createContextualFragment(htmlRMuestraD);
                              document.querySelector(".cdRese").appendChild(documentDatosReserva);
                            
                            //----------------------------------------------------------------------------------------------------------------------------------
                            
                            document.querySelector(".divUserSecun").innerHTML = "";
                            
                            rangeOtrosMiembros.selectNode(document.getElementsByTagName("div").item(0));
                            const documentOtrosM =
                              rangeOtrosMiembros.createContextualFragment(htmlOtrosM);
                            document.querySelector(".divUserSecun").appendChild(documentOtrosM);

                            document.querySelector(".divEstado").innerHTML = estadoDataRese;
                            document.querySelector(".divReloj").innerHTML = reseTiempoResta;
                            document.querySelector(".spanStdUnid").textContent = stdUnidad;
            
                          })
                          .catch((err) => console.log(err));
      
                      //----------------------------------------------------------------------------------------------------------------------------------
                    
                    })
                    .catch((err) => console.log(err));

                //-------------------------------------------------------------------------------------------------------------------------------------

              }else{

                clearInterval(intrvalDataReseCuadro);
                intrvalDataReseCuadro = null;

                console.log("terminado por cuadro cerrado");

              }
              
            }, 600);

          }else{

            console.log("Intervalo Reiniciado");

            clearInterval(intrvalDataReseCuadro);
            intrvalDataReseCuadro = null;

            mostrarDatosRese(
              fecha,
              horaEnR,
              horaSaR,
              numPerso,
              precioReser,
              comisiReser,
              fechaCompra,
              horaCompra,
              reseActivi,
              etdReser,
              tipoRese,
              unidadNom,
              unidadImg,
              unidStd,
              userId,
              userNom,
              userStd,
              userImg,
              userRol,
              userSecun,
              unidadId,
              intervalo,
              idReserDiv,
              codigoRese,
              fechaReseFin,
              nombreProducto,
              imagenProducto,
              idRese
            );
            
          }
          
        }

        //////////////////
        
        //-----------------------------------------------------------------------------------------------------------------------------------

        // < CALENDARIO MODO DÍA - FIN > //
        //-----------------------------------------------------------------------------------------------------------------------------------

        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        
        // Aquí se decide si se muestra el contenedor para el precio a consultar
        // HTML para el producto seleccionado
      
      let htmlPdtSelectNRAdmin = `
      <div class="pdtSelected">
        <div class="imgDiv">
            <img src="images/productosImages/${pdtImgPrins}" alt="Imagen del Producto">
        </div>
        <div class="divDatos">
            <input type="hidden" value="${unidDisponibles}" id="inO_unidDispoPdt" class="inO_unidDispoPdt">
            <input type="hidden" value="${precioXH}" id="inO_precioXH" class="inO_precioXH">
            <input type="hidden" value="${precioXD}" id="inO_precioXD" class="inO_precioXD">
            <input type="hidden" value="${precioXS}" id="inO_precioXS" class="inO_precioXS">
            <input type="hidden" value="${ivaPdt}" id="inO_ivaPdt" class="inO_ivaPdt">
            <input type="hidden" value="${descuPdt}" id="inO_descuPdt" class="inO_descuPdt">
            <span class="nomPdt">${pdtNombre}</span>
            <div class="divDatos2">
                <div class="divDescrip">
                    <span>Descripción</span>
                    <p>${pdtDescri}</p>
                </div>
                <div class="divPrecios">
                    <span class="precioGeneSpan">Precios</span>
                    <div class="precioXH">
                        <span>Hora</span>
                        <span>${precioXH}</span>
                    </div>
                    <div class="precioXD">
                        <span>Día</span>
                        <span>${precioXD}</span>
                    </div>
                    <div class="precioXS">
                        <span>Semana</span>
                        <span>${precioXS}</span>
                    </div>
                    <div class="precioXM">
                        <span>Mes</span>
                        <span>A Consultar</span>
                    </div>
                </div>
                <div class="divOtrasCaracte">
                    <span class="otrasCaracte">Otros Datos</span>
                    <div class="cantPersoDiv" title="Máximo de Personas">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276.47 174.23"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M103.26,97c3.29-2,3.13-3.89,1.29-6.86C89.82,66.33,58.11,56.68,33,69,9.72,80.35-.7,99.62,0,125.29c.29,10.13,5.7,15.84,15.76,16,8.67.09,17.33,0,26,0,8.5,0,17-.17,25.5.08,4,.12,5.9-1.16,7-5.17A64.57,64.57,0,0,1,103.26,97Z"/><path d="M56.44,56.41c16,.08,28.19-12,28.2-28C84.66,12.86,71.79-.15,56.52,0A28.63,28.63,0,0,0,28.31,28.5C28.33,43.69,41.07,56.34,56.44,56.41Z"/><path d="M137.92,89.35h.64a28.06,28.06,0,0,0,27.83-28.13,28.15,28.15,0,1,0-56.3,0A28.06,28.06,0,0,0,137.92,89.35Z"/><path d="M174.54,109.92c-11.23-9.29-23.5-13.8-36.3-13.57-12.8-.23-25.07,4.28-36.3,13.57C87.06,122.24,81,138.59,81.87,157.83c.49,11,5.25,16.3,16.24,16.36,13.33.07,26.66,0,40,0h.26c13.34,0,26.67.06,40,0,11-.06,15.75-5.33,16.24-16.36C195.46,138.59,189.42,122.24,174.54,109.92Z"/><path d="M243.5,69c-25.13-12.29-56.84-2.64-71.57,21.13-1.84,3-2,4.81,1.29,6.86a64.57,64.57,0,0,1,29,39.21c1.08,4,3,5.29,7,5.17,8.5-.25,17-.08,25.5-.08,8.67,0,17.33.07,26,0,10.06-.11,15.47-5.82,15.76-16C277.18,99.62,266.76,80.35,243.5,69Z"/><path d="M220,56.41c15.37-.07,28.11-12.72,28.13-27.91A28.63,28.63,0,0,0,220,0c-15.27-.15-28.14,12.86-28.12,28.43C191.85,44.41,204,56.49,220,56.41Z"/></g></g></svg>
                        <span class="numeroPersoMax">${pdtMaxPerso}</span>
                    </div>
                    <div class="caracterisDiv">
                        <span>Características</span>
                        <div class="listaCaracteris">
                          ${htmlCaracteristiPdt}
                        </div>
                    </div>
                </div>
            </div>
            <div class="divDatos3">
                <span>Unidades relacionadas con el producto</span>
                <div class="divUnidadesLis">
                </div>
            </div>
        </div>
        <svg class="borrarPdtSeleIconX" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.71 174.71"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M111.41,95.37a11.33,11.33,0,0,1,0-16l60-60a11.34,11.34,0,0,0,0-16h0a11.34,11.34,0,0,0-16,0l-60,60a11.33,11.33,0,0,1-16,0l-60-60a11.34,11.34,0,0,0-16,0h0a11.34,11.34,0,0,0,0,16l60,60a11.33,11.33,0,0,1,0,16l-60,60a11.34,11.34,0,1,0,16,16l60-60a11.33,11.33,0,0,1,16,0l60,60a11.34,11.34,0,1,0,16-16Z"/></g></g></svg>
      </div>
      `;
      
      rangoPdtSeleNRAdmin.selectNode(document.getElementsByTagName("div").item(0));
      const pdtSelectedNRAd = rangoPdtSeleNRAdmin.createContextualFragment(htmlPdtSelectNRAdmin);
      div_pdtSeleContainer.appendChild(pdtSelectedNRAd);

      document.querySelector("#inO_maxPersoNum").value = document.querySelector(".numeroPersoMax").textContent;

      document.querySelector("#in_numPersonasNRA").setAttribute("max", document.querySelector(".numeroPersoMax").textContent);
      document.querySelector(".numPersoBold").textContent = document.querySelector(".numeroPersoMax").textContent;
      
      // Unidades producto seleccionado por el administrador
      let unidadesHtml = "";
      let formUnidadesDispoForm = new FormData();
      formUnidadesDispoForm.append("unidadesPdtNRAdmin", unidDisponibles);
      
      fetch(urlBuscarInfoAdminDB, {
        method: "POST",
        body: formUnidadesDispoForm,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length != 1) {
            for (let i = 1; i < data.length; i++) {
              unidadesHtml += `
              <span class="spanUnid">${data[i]["unidad_nombre"]}</span>
              `;
            }
          } else {
            unidadesHtml = `
            <span class="spanUnidVacio">Sin Datos</span>
            `;
          }
      
          document.querySelector(".divUnidadesLis").innerHTML = "";
          
          rangoPdtUnidades.selectNode(document.getElementsByTagName("div").item(0));
          const unidadesPdt = rangoPdtUnidades.createContextualFragment(unidadesHtml);
          document.querySelector(".divUnidadesLis").appendChild(unidadesPdt);
      
        })
        
        .catch((err) => console.log(err));      

        //---------------------------------------------------------------------------------------------------------------------------------
      
        div_pdtSeleContainer.classList.replace("pdtSeleContainer-O", "pdtSeleContainer-V");
      
        inO_idPdtSelecNR.value = idPdtSelect;
      
        document.addEventListener('DOMContentLoaded', () => {
          const borrarPdtSeleIconX = document.querySelector('.borrarPdtSeleIconX');
          const div_pdtSeleContainer = document.querySelector('.pdtSeleContainer');
          const div_tipoReseYTiempoGene = document.querySelector('.div_tipoReseYTiempoGene');
      
          if (borrarPdtSeleIconX) {
            borrarPdtSeleIconX.addEventListener('click', () => {
              div_pdtSeleContainer.innerHTML = ""; // Elimina el contenido del contenedor
              div_pdtSeleContainer.classList.replace("pdtSeleContainer-V", "pdtSeleContainer-O"); // Restaura la visibilidad inicial
              div_tipoReseYTiempoGene.classList.replace("div_tipoReseYTiempoGene-V", "div_tipoReseYTiempoGene-O"); // Oculta el apartado de tipo de reserva y duración
              in_pdtNomAdminNR.value = ""; // Limpiar el valor del input
              in_pdtNomAdminNR.classList.replace("in_pdtNomAdminNR-O", "in_pdtNomAdminNR-V"); // Volver a mostrar el input
              inO_idPdtSelecNR.value = ""; // Limpiar el valor del ID del producto seleccionado
            });
          }

        });
      
        // Mostrar el contenedor del producto
        div_pdtSeleContainer.classList.replace("pdtSeleContainer-O", "pdtSeleContainer-V");

      
        // Configurar el evento de borrado
        const borrarPdtSeleIconX = document.querySelector('.borrarPdtSeleIconX');
        if (borrarPdtSeleIconX) {
          borrarPdtSeleIconX.addEventListener('click', () => {
            div_pdtSeleContainer.innerHTML = ""; // Elimina el contenido del contenedor
            div_pdtSeleContainer.classList.replace("pdtSeleContainer-V", "pdtSeleContainer-O"); // Restaura la visibilidad inicial
            div_tipoReseYTiempoGene.classList.replace("div_tipoReseYTiempoGene-V", "div_tipoReseYTiempoGene-O"); // Oculta el apartado de tipo de reserva y duración
            in_pdtNomAdminNR.value = ""; // Limpiar el valor del input
            in_pdtNomAdminNR.classList.replace("in_pdtNomAdminNR-O", "in_pdtNomAdminNR-V"); // Volver a mostrar el input
            inO_idPdtSelecNR.value = ""; // Limpiar el valor del ID del producto seleccionado
          });
        }
      
      
        //---------------------------------------------------------------------------------------------------------------------------------
        // Desplegar cuadro de duración y el tipo de reserva
      
        // Verificar que tipo de reserva estan disponibles
        if (reseXH == 1 || reseXH == 2) {
          btn_reseXH.removeAttribute("disabled");
      
          btn_reseXH.addEventListener("click", (e) => {

            btn_reseXH.classList.remove("btnTipoRese-hora_select");
            btn_reseXD.classList.remove("btnTipoRese-dia_select");
            btn_reseXS.classList.remove("btnTipoRese-semana_select");
            btn_reseXM.classList.remove("btnTipoRese-mes_select");

            btn_reseXH.classList.add("btnTipoRese-hora_select");

            abrirCuadroDuracionRese("hora");

          });
      
        } else {
          btn_reseXH.removeAttribute("tipo");
          btn_reseXH.setAttribute("tipo", "bloq");
        }
      
        if (reseXD == 1 || reseXD == 2) {
          btn_reseXD.removeAttribute("disabled");
      
          btn_reseXD.addEventListener("click", (e) => {

            btn_reseXH.classList.remove("btnTipoRese-hora_select");
            btn_reseXD.classList.remove("btnTipoRese-dia_select");
            btn_reseXS.classList.remove("btnTipoRese-semana_select");
            btn_reseXM.classList.remove("btnTipoRese-mes_select");

            btn_reseXD.classList.add("btnTipoRese-dia_select");

            abrirCuadroDuracionRese("dia");

          });
      
        } else {
          btn_reseXD.removeAttribute("tipo");
          btn_reseXD.setAttribute("tipo", "bloq");
        }
      
        if (reseXS == 1 || reseXS == 2) {

          btn_reseXS.removeAttribute("disabled");
      
          btn_reseXS.addEventListener("click", (e) => {

            btn_reseXH.classList.remove("btnTipoRese-hora_select");
            btn_reseXD.classList.remove("btnTipoRese-dia_select");
            btn_reseXS.classList.remove("btnTipoRese-semana_select");
            btn_reseXM.classList.remove("btnTipoRese-mes_select");

            btn_reseXS.classList.add("btnTipoRese-semana_select");

            abrirCuadroDuracionRese("semana");

          });
      
        } else {
          btn_reseXS.removeAttribute("tipo");
          btn_reseXS.setAttribute("tipo", "bloq");
        }
      
        btn_reseXM.addEventListener("click", (e) => {

          btn_reseXH.classList.remove("btnTipoRese-hora_select");
          btn_reseXD.classList.remove("btnTipoRese-dia_select");
          btn_reseXS.classList.remove("btnTipoRese-semana_select");
          btn_reseXM.classList.remove("btnTipoRese-mes_select");

          btn_reseXM.classList.add("btnTipoRese-mes_select");

          abrirCuadroDuracionRese("mes");
        });
      
        div_tipoReseYTiempoGene.classList.replace("div_tipoReseYTiempoGene-O", "div_tipoReseYTiempoGene-V");
      
        //---------------------------------------------------------------------------------------------------------------------------------
      
      }

    //-------------------------------------------------
    // << Calendario de Reservas - FUNCIONES - FIN >>
    //-------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------

  //-------------------
  // FUNCIONES - FIN
  //-------------------
  //---------------------------------------------------------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------
  // EVENTOS PRINCIPALES - INICIO
  //------------------------------

    // Flecha botón - Mostrar y ocultar PANEL PERFIL

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

    //---------------------------------------------------------------------------------

    //

    // Botón Aside 1 - Crear Panel Principal

      btnPanelPrincipal.addEventListener("click", ()=>{

        cargarPanelPrin();

      });

    //------------------------------------------------------------------------------

    //

    // Botón Aside 2 - Crear Panel del Calendario de Reservas (MODO MES)

      btnCalendario.addEventListener(
        "click",
        (hoy = (e) => {

          // Limpiamos el DIV Contenedor del calendario y el NAV BAR
          mainDivPrin.innerHTML = "";
          navUl.innerHTML = "";
          //---------------------------------------------------------
          
          // Calendario MODO MES | HTML BASE
          const htmlCalendario = `
          <div class="contentPrinCalendaDiv">
            <div class="TituloCalendaDiv">
              <span class="calendaReserSpan">Calendario de Reservas</span>
              <div class="btnNewReserDiv">
                <button id="btnNewReserva" class="btnNewReserva btnNewReserva-V">Nueva Reserva</button>
              </div>
            </div>
            <div class="navSupeDivContent">
              <div class="btnHoyDiv">
                <button class="btnHoy btnHoy1">Hoy</button>
                <button class="flechaAtras flechaCalen" id="AtrasF"><</button>
                <div class="divMesAño">MES-AÑO</div>
                <button class="flechaAdelante flechaCalen" id="AdelanteF">></button>
              </div>
              <div class="divDiaMesAño">
                <div class="divBtns">
                  <button class="btnDia btnDi1" onClick="cambiarCalendaDia('p','p','p')">Día</button>
                  <!-- PRÓXIMAMENTE <button class="btnSema btnSema1">Semana</button> -->
                  <button class="btnMes btnMes1">Mes</button>
                </div>
              </div>
            </div>
            <div class="calendaDivContent">
              <nav class="calendaNav">
                <ul class="calendaUl">
                  <li class="calendaLi liDomingo">Domingo</li>
                  <li class="calendaLi liLunes">Lunes</li>
                  <li class="calendaLi liMartes">Martes</li>
                  <li class="calendaLi liMiercoles">Miercoles</li>
                  <li class="calendaLi liJueves">Jueves</li>
                  <li class="calendaLi liViernes">Viernes</li>
                  <li class="calendaLi liSabado">Sábado</li>
                </ul>
              </nav>
              <div class="calendaCuerpo">
                <! -- CONTENIDO DEL CALENDARIO AQUÍ  -->
              </div>
            </div>
          <div/>`;
          //--------------------------------------------------------------------

          // Creando rangos para los Document Fragments (DIV Calendario y NAV BAR) 
            const rangeCalenda = document.createRange();
            
            //Insertando Calendario
            rangeCalenda.selectNode(document.getElementsByTagName("div").item(0));
            const documentFragment =
              rangeCalenda.createContextualFragment(htmlCalendario);
            mainDivPrin.appendChild(documentFragment);

          //-----------------------------------------------------------------

          //Instancia para crear los DÍAS en el Calendario de Reservas (MODO MES)
            actualizarCalendario("divMesAño", "", "", ".calendaCuerpo");
          //----------------------------------------------------------------------

          // Tomando elementos recien creados del calendario MODO MES

            const btnLineaTiempo = document.querySelector(".liTiempoLi");
            const btnCalendarioNav = document.querySelector(".calenBtnNav");
            const btnHoy = document.querySelector(".btnHoy");

            const flechaCalendas = document.querySelectorAll(".flechaCalen");

            const calendaCuerpo = document.querySelector(".calendaCuerpo");

            const divMesAño2 = document.querySelector(".divMesAño");
            const AdelanteF2 = document.querySelector("#AdelanteF");
            const AtrasF2 = document.querySelector("#AtrasF");
            AdelanteF2.style.display = "default";
            AtrasF2.style.display = "default";
            divMesAño2.style.display = "default";

          //--------------------------------------------------------------------

          //

          //// EVENTOS Calendario de Reservas (MODO MES) - INICIO

            // Botón HOY, para marcar el dia actual en el calendario (MODO MES y MODO DÍA)
            btnHoy.addEventListener("click", () => {

              redibujoCalendaDia = 0;

              mesCalenMGene = mesFijo;
              anioCalenMGene = añoFijo;
              
              if (document.querySelector(".liDomingo") != null) {

                actualizarCalendario(
                  "divMesAño",
                  "",
                  "",
                  ".calendaCuerpo"
                );

              } else {

                if (document.querySelector(".divContentLineaTiempo") != null) {
                  
                  diaFijoD = new Date().getDate();
                  mesFijoD = new Date().getMonth()+1;
                  añoFijoD = new Date().getFullYear();

                  cambiarCalendaDia("p", "p", "p");

                }

              }

            });

            // Flechas para CAMBIAR EL MES
            flechaCalendas.forEach((nav) => {

              nav.addEventListener("click", (e) => {

                let id = e.target.id;

                if (id == "AtrasF" && mesCalenMGene == 1) {

                  anioCalenMGene--;
                  mesCalenMGene = 12;

                } else {
                  if (id == "AdelanteF" && mesCalenMGene == 12) {
                    anioCalenMGene++;
                    mesCalenMGene = 1;
                  } else {
                    mesCalenMGene = id == "AdelanteF" ? mesCalenMGene + 1 : mesCalenMGene - 1;
                  }
                }
                
                calendaCuerpo.innerHTML = "";

                actualizarCalendario(
                  "divMesAño",
                  mesCalenMGene,
                  anioCalenMGene,
                  ".calendaCuerpo"
                );

              });
            });

            // Segundo Botón para cambiar el calendario a MODO MES
            document.querySelector(".btnMes1").addEventListener("click", () => {

              redibujoCalendaDia = 0;
              hoy();

            });

            // Botón Nueva Reserva
            document.querySelector("#btnNewReserva").addEventListener("click", (e)=>{
              
              fondoNegroNewRese.classList.replace("fondoNegroNewRese-O", "fondoNegroNewRese-V");
              document.querySelector(".baseReseGeneral").addEventListener("click", (e)=>{
                e.stopPropagation();
              });
              fondoNegroNewRese.addEventListener("click", (event)=>{
            
                fondoNegroNewRese.classList.replace("fondoNegroNewRese-V", "fondoNegroNewRese-O");
                
              });

            });
          
          //// EVENTOS Calendario de Reservas (MODO MES) - FIN

        })
        
      );

    //------------------------------------------------------------------------------

    //

    // Botón Aside 3 - Crear Panel de Estadísticas

      btnEstadisPanel.addEventListener(
        "click",
        (ingresosA = () => {
          mainDivPrin.innerHTML = "";
          navUl.innerHTML = "";
          
          const rangeEstadisticas = document.createRange();

          const htmlEstadistica = `
          <div class="panelEstadiDivsGene">
            <div class="panelEstadiDiv">
              <div class="divBtnPrevistos">
                <button class="btnIngresos btnSelec">Ingresos</button>
                <button class="btnIngrePrevi">Ingresos Previstos</button>
              </div>
              <div class="divVariables">
                <div class="divI variableIngresos1">
                  <span class="spanVariable">Ingresos Totales (${mesesObjetoCompletos[new Date().getMonth()+1]})</span>
                  <div class="divGrafico">
                    <canvas class="grafica1" id="grafica1"></canvas>
                  </div>
                  <div class="divDatos divDatos1">
                  </div>
                </div>
                <!--<div class="divI variableIngresos2">
                  <span class="spanVariable">Variable Ingresos 2</span>
                  <div class="divGrafico">
                    <canvas class="grafica2" id="grafica2"></canvas>
                  </div>
                  <div class="divDatos divDatos2">
                  </div>
                </div>
                <div class="divI variableIngresos3">
                  <span class="spanVariable">Variable Ingresos 3</span>
                  <div class="divGrafico">
                    <canvas class="grafica3" id="grafica3"></canvas>
                  </div>
                  <div class="divDatos divDatos3">
                  </div>
                </div>-->
              </div>
            </div>
          <div>
        `;

          rangeEstadisticas.selectNode(
            document.getElementsByTagName("div").item(0)
          );
          const documentEstadisti =
            rangeEstadisticas.createContextualFragment(htmlEstadistica);
          mainDivPrin.appendChild(documentEstadisti);

          const divDatos1 = document.querySelector(".divDatos1");
          const divDatos2 = document.querySelector(".divDatos2");
          const divDatos3 = document.querySelector(".divDatos3");

          document.querySelector(".btnIngresos").addEventListener("click", () => {
            if (document.querySelector(".panelEstadiDivsGene") != null) {
              if (
                !document
                  .querySelector(".btnIngresos")
                  .classList.contains("btnSelec")
              ) {
                document.querySelector(".btnIngresos").classList.add("btnSelec");
                document
                  .querySelector(".btnIngrePrevi")
                  .classList.remove("btnSelec");
              }
            }
          });

          document.querySelector(".btnIngrePrevi").addEventListener("click", () => {
            if (document.querySelector(".panelEstadiDivsGene") != null) {
              if (
                !document
                  .querySelector(".btnIngrePrevi")
                  .classList.contains("btnSelec")
              ) {
                document.querySelector(".btnIngrePrevi").classList.add("btnSelec");
                document.querySelector(".btnIngresos").classList.remove("btnSelec");
              }
            }
          });

          //

          //Insertando Grafica 1

          let formGraficaIngreT = new FormData();

          formGraficaIngreT.append("ingreTotaleEstadis", true);
          formGraficaIngreT.append("diaActual", cadenaFechaActual.substring(8,10));
          formGraficaIngreT.append("mesActual", cadenaFechaActual.substring(5,7));
          formGraficaIngreT.append("anioActual", cadenaFechaActual.substring(0,4));

          fetch(urlBuscarInfoAdminDB, {
            method: "POST",
            body: formGraficaIngreT,
          })
            .then((response) => response.json())
            .then((data) => {
              
              let arrayAnteFacPrecios = data[0];
              let arrayActuFacPrecios = data[1];

              let sumaActualFac = 0;
              let sumaAnteFac = 0;

              console.log(arrayAnteFacPrecios);
              console.log(arrayActuFacPrecios);

              // For suma de ingresos Mes Actual
              for(let i = 1; i < arrayActuFacPrecios.length; i++){

                sumaActualFac += Number(arrayActuFacPrecios[i]["montoFactuTotal"]);

              }

              // For suma de ingresos Mes Actual
              for(let e = 1; e < arrayAnteFacPrecios.length; e++){

                sumaAnteFac += Number(arrayAnteFacPrecios[e]["montoFactuTotal"]);

              }

              console.log(sumaActualFac);
              console.log(sumaAnteFac);

              let porcentajeActual = sumaActualFac - sumaAnteFac;
              let porcentajeNumero = sumaActualFac - sumaAnteFac;

              console.log(porcentajeActual);
              let htmlPorcentaje = "";

              if(porcentajeNumero > 0){

                porcentajeActual = ((porcentajeActual*100)/sumaAnteFac);

                htmlPorcentaje = `
                <span class="porcentajeSpanArriba">${porcentajeActual}%</span> 
                <svg class="svgArriba" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13"/><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03" /></g></g></svg>
                `;

              }

              if(porcentajeNumero == 0){

                porcentajeActual = ((porcentajeActual*100)/sumaAnteFac);

                htmlPorcentaje = `
                <span class="porcentajeSpanNeutro">${porcentajeActual}%</span> 
                <svg class="neutroSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155.24 155.24"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M77.62,0a77.62,77.62,0,1,0,77.62,77.62A77.62,77.62,0,0,0,77.62,0Zm0,130.43a52.81,52.81,0,1,1,52.81-52.81A52.87,52.87,0,0,1,77.62,130.43Z"/></g></g></svg>
                `;

              } 

              if(porcentajeNumero < 0){

                porcentajeActual = (((porcentajeActual*1)*100)/sumaAnteFac);

                htmlPorcentaje = `
                <span class="porcentajeSpanAbajo">${porcentajeActual}%</span> 
                <svg class="svgAbajo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.97"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M115.72,100.93,57.86,181,0,100.93l31.83,5.67V35.33a152,152,0,0,0,26,2.21,152.09,152.09,0,0,0,26-2.21V106.6Z"/><path d="M83.9,0V23.51a152.09,152.09,0,0,1-26,2.21,152,152,0,0,1-26-2.21V0Z"/></g></g></svg>
                `;

              } 

              const grafica1 = document.getElementById("grafica1");
              const datos = [mesesObjetoCompletos[Number(data[4])]+"-"+data[5], mesesObjetoCompletos[Number(data[2])]+"-"+data[3]];
              const porcenCantidades = [sumaAnteFac, sumaActualFac];
    
              const chartG1 = new Chart(grafica1, {
                type: "pie",
                data: {
                  labels: datos,
                  datasets: [
                    {
                      label: "",
                      data: porcenCantidades,
                      backgroundColor: [
                        "#bb9dc744",
                        "#ffdd8844",
                        "#6370b444",
                        "#c1c4e444",
                        "#f296a044",
                      ],
                      borderColor: [
                        "#bb9dc7",
                        "#ffdd88",
                        "#6370b4",
                        "#c1c4e4",
                        "#f296a0",
                      ],
                      borderWidth: 1.5,
                    },
                  ],
                },
              });
              //
    
              const rangeGrafica1 = document.createRange();
    
              const htmlDivDatos1 = `
              <div class="divDataGene">
                <div class="divDinero">
                  <span class="abreviaSpan">COP</span>
                  <span class="dineroSpan">${porcentajeNumero}$</span>
                </div>
                <div class="porcentajeDiv">
                  <div class="divFlecha">
                    ${htmlPorcentaje}
                  </div>
                  <span class="enCompara">En comparación con el mes anterior</span>
                </div>
              </div>
              `;
    
              rangeGrafica1.selectNode(document.getElementsByTagName("div").item(0));
              const documentGra1 =
                rangeGrafica1.createContextualFragment(htmlDivDatos1);
              divDatos1.appendChild(documentGra1);

            })
            .catch((err) => console.log(err));

          

          //---------------------------------------------------------------------------------

          //Btn Ingresos
          const btnIngresos = document.querySelector(".btnIngresos");
          const btnIngrePrevi = document.querySelector(".btnIngrePrevi");

          btnIngrePrevi.addEventListener("click", () => {
            ingresosA();
          });

          btnIngresos.addEventListener("click", () => {
            ingresosA();
          });
          //

        })
      );

    //------------------------------------------------------------------------------

    //

    // Botón Aside 4 - Crear Panel de Productos

      btnProductos.addEventListener(
        "click",
        (panelProd = () => {

          //

          // Variable para cambiar el panel de productos (4 = producto/ 5 = unidad)

            estadoDivProductos = document.querySelector(".stdProd").value;
            console.log(estadoDivProductos);

          //-----------------------------------------------------------------

          //

          if (estadoDivProductos == 4 || estadoDivProductos == 0 || estadoDivProductos == 5) {

            //Buscando los datos del Panel Productos con un fetch

              let formInfoPanelProd = new FormData();

              formInfoPanelProd.append("panelProd", true);

              fetch(urlBuscarInfoAdminDB, {
                method: "POST",
                body: formInfoPanelProd,
              })
                .then((response) => response.json())
                .then((data) => {
                  //

                  // CREANDO PANEL PRODUCTOS | VUELTA 1

                  mainDivPrin.innerHTML = "";

                  const rangeProductos = document.createRange();

                  //HTML BASE PANEL PRODUCTOS | VUELTA 1
                  const htmlProducPanel = `
                    <div class="divGeneProductos">
                      <div class="divBotonesGene">
                        <button class="btnProductos btn">Productos Disponibles</button>
                        <button class="btnUnidades btn2">Unidades Disponibles</button>
                      </div>
                      <div class="divContentProductos">
                        <div class="btnNewProd">
                          <button class="btnNewProdBTN">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 908.62 896.07"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M87.35,559c0-47.82-.06-95.65.11-143.48,0-4.85-1.52-7.44-5.92-9.58C58.18,394.55,35,382.85,11.71,371.25c-13.09-6.52-15.67-20-5.37-30.38q42-42.45,84.43-84.53a34.42,34.42,0,0,1,9-6.27q85.2-42.49,170.37-85c8.2-4.09,16.33-8.32,24.62-12.21,3.78-1.78,5.14-4.24,5.5-8.44C303.55,105.4,317,70.64,345.36,43,373.5,15.58,407.85,1.8,447.05.16,475.74-1,503,4.41,528.55,17.85a143.05,143.05,0,0,1,61.08,60.64c11.08,20.77,17,43,18.89,66.32a8.5,8.5,0,0,0,5.2,7.74q51.28,25.37,102.46,51,48,24.07,95.9,48.44c3.16,1.6,5.6,4.18,8.07,6.65q40.86,40.8,81.67,81.64c10.6,10.62,8.63,23.93-4.73,30.72-22.72,11.54-45.47,23-68.43,34.1-5.69,2.74-7.52,6.07-7.51,12.27.2,94.15.08,188.3.23,282.46,0,10.32-3.84,17.14-13.26,21.83q-153.69,76.56-307.2,153.48c-12.06,6-24.23,11.88-36.16,18.17-7.15,3.77-13.76,3.6-20.92,0Q386.72,864.5,329.44,836l-177-88.47c-17.59-8.79-35.11-17.71-52.77-26.33C91.07,717,87.2,710.66,87.24,701c.21-47.32.1-94.65.1-142Zm385.7-75-1.47,1c-.07,1.49-.21,3-.21,4.45q0,177.72,0,355.44c0,6.2.08,6.25,5.61,3.49q80.71-40.3,161.41-80.66C684.87,744.5,731.26,721,778,698.2c7.19-3.52,9.22-7.44,9.2-15.12-.28-93.31-.07-186.63-.34-280,0-11.16,4.17-18.08,14.09-22.82,19.09-9.11,37.87-18.89,56.87-28.2,3.7-1.82,3.8-3.05.92-5.89Q831.15,319,803.9,291.44c-2.56-2.59-4.77-2.89-7.89-1.26q-14.18,7.41-28.5,14.5-55.25,27.54-110.51,55-84.5,42.19-169,84.43c-3.68,1.84-4.4,3-1.19,6.18q27.39,27,54.44,54.43c2.86,2.91,5.07,3.12,8.63,1.32q56.69-28.56,113.52-56.84,33.3-16.65,66.61-33.3c8.19-4.07,15.59-3.05,21.23,2.44,8.27,8.08,6.58,22.51-6.74,29.12-64.78,32.11-129.35,64.64-194,97-7.1,3.56-15.27,2.61-20.44-2.53q-16.68-16.53-33.19-33.23C488.86,500.56,481,492.25,473.05,484ZM765.1,267.26c-2.84-1.61-4.52-2.66-6.29-3.55Q685.07,226.83,611.33,190c-5.61-2.8-5.79-2.78-7.31,3.11-7.74,30.09-23.37,55.31-46.58,75.89-22.08,19.58-47.5,32.54-76.66,37.42a155.7,155.7,0,0,1-159.42-73.06c-5.38-8.9-2.89-18.8,5.56-23.86,8.85-5.29,18.41-2.64,24.18,6.24,27.57,42.37,66.36,62.62,117,57.16,36.52-3.94,66.14-20.73,86.43-52.07,14.11-21.79,19.83-45.87,19-71.79-1-29.88-10.66-56.5-31.38-77.91-32-33.08-71.77-44.16-116.19-33.94-40,9.21-67.54,34.67-83.37,72.49a104.25,104.25,0,0,0-8.28,46.82c.6,10.31-3.5,17.55-13.24,21.75-7.18,3.09-14,6.92-21,10.43L177.05,250.11q-15,7.48-30,15c-1,.48-2.59.68-2.34,2.13.13.7,1.38,1.27,2.19,1.77a29.2,29.2,0,0,0,2.68,1.35L442,416.6c12.35,6.18,12.33,6.16,24.55,0q60.75-30.5,121.53-60.95Q665.88,316.79,743.73,278C750.55,274.62,757.34,271.17,765.1,267.26ZM437,485l-1.82-1a46.49,46.49,0,0,1-3.95,5.15q-25,25.18-50.16,50.25c-8.18,8.18-14.36,9.25-24.68,4.11Q309,519.82,261.62,496.1L157,443.78c-10.43-5.22-20.91-10.35-31.29-15.68-3-1.54-4.3-1.15-4,2.4.06.83,0,1.66,0,2.5q0,127.25-.1,254.49c0,4.52,1.55,6.78,5.53,8.76,46.25,23,92.38,46.24,138.59,69.34q82.92,41.45,165.9,82.77c5.42,2.7,5.44,2.7,5.44-3.54q0-177.49,0-355Zm-12.73-37.63c-1.08-2.42-3.32-2.95-5.18-3.88q-74.67-37.32-149.37-74.58-78.28-39-156.52-78.15c-4-2-6.35-1.52-9.44,1.61-17.41,17.7-35,35.19-52.63,52.73-4.78,4.77-4.8,4.73,1.33,7.79l181.11,90.53q62.82,31.39,125.64,62.83c2.57,1.29,4.58,2.07,7.07-.44,18.64-18.8,37.41-37.47,56.13-56.2C423.11,448.89,423.67,448.08,424.29,447.34Z"/><path d="M536,110.36c-.21,5.48-1.77,9.91-5.4,13.53Q489,165.31,447.39,206.76c-9.93,9.91-19.52,10-29.4.06-13.18-13.21-26.45-26.33-39.57-39.6-7.63-7.72-8.26-15.79-2.19-23.69,6.95-9,18.54-9.31,26.92-.76s17.25,17.14,25.66,25.91c3.11,3.25,5.11,2.67,8-.26q34.5-34.74,69.26-69.2c8.69-8.58,21.42-7.13,27.52,2.56C535.38,104.59,535.74,107.69,536,110.36Z"/></g></g></svg>
                            <span>+ Nuevo Producto</span>
                          </button>
                        </div>
                        <div class="cabezaTablaProd">
                          <span>Administra tus productos aquí</span>
                        </div>
                        <div class="productos">
                        </div>
                      </div>
                    </div>
                  `;

                  //Insertando HTML BASE PANEL PRODUCTOS | VUELTA 1
                  rangeProductos.selectNode(
                    document.getElementsByTagName("div").item(0)
                  );
                  const documentProducts =
                    rangeProductos.createContextualFragment(htmlProducPanel);
                  mainDivPrin.appendChild(documentProducts);

                  //-----------------------------------------------------------------------------------------

                  //

                  //HTML para los productos | VUELTA 1
                  let htmlDivProd = "";

                  //Insertando DIVS de productos | VUELTA 1
                  for (let i = 1; i < data.length; i++) {
                    //

                    //Comprobaciones
                    let precioProd = "";
                    let ingreTotal = 0;
                    let totalMiembro = 0;

                    //------------------------------------------------------------------------------

                    if (
                      data[i]["ingresosTotales"] != null &&
                      data[i]["ingresosTotales"] != 0
                    ) {
                      ingreTotal = data[i]["ingresosTotales"];
                    } else {
                      ingreTotal = 0;
                    }

                    if (data[i]["cantidadMiembros"] != null) {
                      totalMiembro = data[i]["cantidadMiembros"];
                    } else {
                      totalMiembro = "N/A";
                    }

                    //------------------------------------------------------------------------------

                    let preXHora =
                      data[i]["precioXhora"] == 0
                        ? `<span style="
                        font-weight: 600;
                        font-size: 1.8rem;
                        color: #002d5699;">N/A</span>`
                        : data[i]["precioXhora"];
                    
                    preXHora =
                      preXHora == 1
                        ? `<span style="
                        font-weight: 600;
                        font-size: 1.8rem;
                        color: #1261ac99;">A consultar</span>`
                        : preXHora;

                    let preXDia =
                      data[i]["precioXDia"] == 0
                        ? `<span style="
                        font-weight: 600;
                        font-size: 1.8rem;
                        color: #002d5699;">N/A</span>`
                        : data[i]["precioXDia"];

                    preXDia =
                      preXDia == 1
                        ? `<span style="
                        font-weight: 600;
                        font-size: 1.8rem;
                        color: #1261ac99;">A consultar</span>`
                        : preXDia;

                    let preXSemana =
                      data[i]["precioXSemana"] == 0
                        ? `<span style="
                        font-weight: 600;
                        font-size: 1.8rem;
                        color: #002d5699;">N/A</span>`
                        : data[i]["precioXSemana"];

                    preXSemana =
                      preXSemana == 1
                        ? `<span style="
                        font-weight: 600;
                        font-size: 1.8rem;
                        color: #1261ac99;">A consultar</span>`
                        : preXSemana;

                    //------------------------------------------------------------------------------

                    if (data[i]["produTipo"] == "Membresía") {
                      precioProd =
                        "Precio de la Membresía:<span class='spanMem'>$" +
                        data[i]["produPrecio"] +
                        "</span>por mes";
                    } else {
                      precioProd =
                        "<span class='preIndiS'>Precio por Hora: <span>" +
                        preXHora +
                        "</span></span>  <span class='preIndiS'>Precio por Día: <span>" +
                        preXDia +
                        "</span></span>  <span class='preIndiS'>Precio por Semana: <span>" +
                        preXSemana +
                        "</span></span>";
                    }

                    htmlDivProd += `
                    <div class="divProducto">
                      <form action="eliminarProd.php" method="POST"  id="formElimi${i}" name="formElimi${i}">
                        <input type="hidden" value="${
                          data[i]["id_producto"]
                        }" name="id">
                        <input type="hidden" value="${data[i]["productoImgPrin"]}" name="imagen">
                        <input type="hidden" value="producto" name="tipo">
                      </form>
                      <form action="editarProd.php" method="POST"  id="formEditar${i}" name="formEditar${i}">
                        <input type="hidden" value="${
                          data[i]["id_producto"]
                        }" name="id">
                        <input type="hidden" value="producto" name="tipo">
                      </form>
                      <form action="editarProd.php" method="POST"  id="formEstadis${i}" name="formEstadis${i}">
                        <input type="hidden" value="${
                          data[i]["id_producto"]
                        }" name="id">
                        <input type="hidden" value="producto" name="tipo">
                        <input type="hidden" value="true" name="productoEstadis">
                      </form>
                      <div class="divImgProd">
                      <img src='images/productosImages/${
                        data[i]["productoImgPrin"]
                      }' alt="">
                      </div>
                      <div class="divDataProd">
                        <div class="nombreYCategoDiv">
                          <span class="nombreProd">${data[i]["produNombre"]}
                            <span class="fechaCreaProd">Creado el:${
                              " " +
                              data[i]["producFechaCrea"] +
                              " | " +
                              data[i]["producHoraCrea"]
                            }</span>
                          </span>
                          <span class="categoProd">Categoria: ${
                            data[i]["produCategoria"]
                          }
                          <span class="tipoProd">Tipo: ${data[i]["produTipo"]}</span>
                          </span>
                        </div>
                        <div class="divPrecios">
                          ${precioProd}
                        </div>
                        <div class="metricasMembresiaDiv">
                          <span class="totalMiembrosSpan">Total de Miembros: <span>${totalMiembro}</span></span>
                          <span>
                            Ingresos Totales:
                            <span>
                              $${ingreTotal}
                            </span>
                          </span>
                          <span>
                            Nuevos Miembros del Mes:
                            <span>
                              0
                            </span>
                          </span>
                          <span>
                            Nuevos Miembros del Año:
                            <span>
                              0
                            </span>
                          </span>
                        </div>
                      </div>
                      <div class="divBtnEliminar">
                        <div class="svgDiv1">
                          <div title="Eliminar Producto" tipo="formElimi${i},producto,${
                          data[i]["id_producto"]
                          },${data[i]["productoImgPrin"]}" class="eliminarBtn2"></div>
                          <svg class="eliminarBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301.97 383.52"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M300.75,92Q288,62.94,258,52.08c-10.44-3.79-21.24-4-32.1-3.64-3.09.1-4.6-.7-5.44-4a59.08,59.08,0,0,0-14.31-25.91C196.84,8.47,185.25,2.67,171.93,0H130c-25.47,5.54-42,20.63-49,45.9-.53,1.92-1.66,2.55-3.54,2.51-3.62-.07-7.24,0-10.85,0A71.14,71.14,0,0,0,1.18,92c-3.66,8.71,1.55,16.77,11,16.77q138.81,0,277.63,0C299.15,108.78,304.53,100.61,300.75,92ZM193.55,48.42c-14.21-.06-28.42,0-42.64,0H108.65c-3.94,0-4.2-.36-2.45-4,6.83-14.24,18.48-21.19,34-21.57,9.08-.22,18.2-.7,27.26.56,13.63,1.9,22.94,9.49,28.7,21.79C197.56,48.17,196,48.43,193.55,48.42Z"/><path d="M269.76,130.74H33.64c-7.88,0-7.69,0-7,8,1.31,15.38,2.45,30.77,3.54,46.17,1.13,15.9,2,31.81,3.2,47.71,1.62,22.47,3.38,44.93,5,67.41,1.29,17.63,2.44,35.27,3.78,52.9,1.28,16.9,16,30.58,33,30.59q75.78,0,151.55,0c16.39,0,31.26-12.94,32.83-29.14,1.65-17.1,2.64-34.26,3.86-51.4.85-11.92,1.55-23.86,2.41-35.78,1.15-15.89,2.42-31.78,3.57-47.67.86-12,1.54-24.11,2.41-36.15,1.13-15.65,2.42-31.28,3.53-46.93C275.78,130.75,275.63,130.74,269.76,130.74ZM116.11,322c-5,.69-10-2.83-11.36-8.19-1.48-5.74-.78-11.65-1.25-17.47-1-12.15-1.13-24.36-1.74-36.54q-1.65-33.37-3.48-66.73a11.2,11.2,0,0,1,9.35-12.06c5.08-1,10.42,2.52,11.69,8.11,1.49,6.58,1,13.38,1.38,20.07,1.22,19.12,2.08,38.27,3,57.41.71,14.79,1.31,29.59,2,44.39A10.71,10.71,0,0,1,116.11,322Zm87.38-129.76q-1.69,36.74-3.41,73.47c-.69,14.66-1.5,29.33-2.2,44-.4,8.63-6.49,13.93-13.8,11.9a11.17,11.17,0,0,1-8-11.67c.74-11.92,1.36-23.85,2-35.78q1.47-28.32,2.88-56.66c.37-7.71.65-15.42.91-23.13a21.87,21.87,0,0,1,.74-5.53c1.52-5.12,6.48-8.63,11.24-7.93C199.77,181.8,203.88,186.55,203.49,192.28Z"/></g></g></svg>
                        </div>
                        <div class="svgDiv2">
                          <div class="editarBtn2" title="Editar Producto" 
                          tipo="formEditar${i},producto,${data[i]["id_producto"]}">
                          </div>
                          <svg class="editarBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.33 375.09"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M278.85,121.57c-4.62-4.5-9.55-4.23-14.3.14-.8.75-1.56,1.54-2.33,2.32L119.94,266.39c-5.09,5.09-10.21,10.15-15.25,15.28-6,6.15-5,12.54,2.74,16.52,2.71,1.4,5.41,2.83,8.2,4.07a4.53,4.53,0,0,1,3.06,4.8c-.13,5-.14,10,0,15,.08,2.65-.94,3.91-3.51,4.63-11.27,3.12-22.5,6.38-33.73,9.68a4.14,4.14,0,0,1-4.6-1.19q-18.46-18.53-37-37a4.19,4.19,0,0,1-1.14-4.62q5-17.39,9.91-34.81c.6-2.17,1.81-2.84,4-2.79,5.12.12,10.24.13,15.36,0a4.28,4.28,0,0,1,4.52,2.85c1.64,3.54,3.33,7.07,5.3,10.43,3.16,5.38,8.75,6.41,13.72,2.68A33.2,33.2,0,0,0,95,268.69q35.28-35.37,70.53-70.76,43-43.12,86.14-86.19c6.73-6.74,6.72-10.8-.1-17.64Q238.51,81,225.43,68c-7-7-11-7-17.88,0Q150,126,92.38,184.12,65.2,211.54,38.07,239a16.89,16.89,0,0,0-4.57,7.36Q21.82,287.49,10,328.6C6.77,340,3.38,351.27,0,362.6c0,3.66.08,7.33,0,11,0,1.28.23,1.55,1.51,1.51,3.66-.12,7.32,0,11,0,1.25-.45,2.49-1,3.77-1.33q55.68-16,111.4-31.87a19.63,19.63,0,0,0,8.67-5.15q26.73-26.56,53.53-53.08,45.21-44.82,90.4-89.68c9.27-9.19,18.56-18.36,27.76-27.61,5.12-5.15,5.53-10,.86-14.76Q294.09,136.36,278.85,121.57Z"/><path d="M364.9,60.7C348.19,43.62,331.19,26.83,314.25,10A33.1,33.1,0,0,0,289.91,0c-9.2,0-16.57,2.21-23.38,8.68-11,10.49-21.7,21.39-32.28,32.36-4.28,4.45-3.69,9.35,1.14,14.19q42.09,42.21,84.28,84.33c5.24,5.24,10,5.21,15.28,0,10-9.85,20-19.65,29.8-29.69C378.76,95.51,378.92,75,364.9,60.7Z"/></g></g></svg>
                        </div>
                        <div class="divOOpciones">
                          <span>Otras Opciones</span>
                        </div>
                      </div>
                      <!--<div class="divEstadis">
                        <div class="divPopulari">
                          <span class="span1">Popularidad</span>
                          <span class="spanNum">15%</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03"/></g></g></svg>
                        </div>
                        <span>En comparación al mes anterior</span>
                      </div>
                      <button class="btnEstadis" tipo="formEstadis${i},producto,${data[i]["id_producto"]}">Ver Estadísticas</button>-->
                    </div>`;
                    
                    //----------------------------------------------------------------------------------

                    //

                  }

                  // Tomando elementos del PANEL PRODUCTOS recien creado | VUELTA 1

                  const btnProductos = document.querySelector(".btnProductos"); // Desplega PANEL PRODUCTO
                  const btnUnidades = document.querySelector(".btnUnidades"); // Desplega PANEL UNIDAD
                  const productosDiv = document.querySelector(".productos"); // Contenedor de los Productos
                  const btnCraerNProd = document.querySelector(".btnNewProdBTN"); // Botón Crear Nuevo Producto

                  //-------------------------------------------------------------------------------
                  
                  // Insertando DIVS Productos | VUELTA 1
                  const rangeProductos2 = document.createRange();

                  rangeProductos2.selectNode(
                    document.getElementsByTagName("div").item(0)
                  );
                  const documentProducts2 =
                    rangeProductos2.createContextualFragment(htmlDivProd);
                  productosDiv.appendChild(documentProducts2);

                  //------------------------------------------------------------------------

                  //

                  //BOTONES EVENTOS | VUELTA 1

                  btnProductos.addEventListener(
                    "click",
                    (btnProduc = () => {
                      //

                      //Cambiando los botones y su estilo | VUELTA 2

                        if (btnProductos.classList.contains("btn2")) {
                          btnUnidades.classList.replace("btn", "btn2");
                          btnProductos.classList.replace("btn2", "btn");
                        }

                      //-----------------------------------------------------------------------------------

                      //

                      // PANEL PRODUCTO | VUELTA 2

                      document.querySelector(".divContentProductos").innerHTML = "";

                      //Panel Productos HTML BASE | VUELTA 2
                      const htmlDivProdSV = `
                      <div class="btnNewProd">
                      <button class="btnNewProdBTN">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 908.62 896.07"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M87.35,559c0-47.82-.06-95.65.11-143.48,0-4.85-1.52-7.44-5.92-9.58C58.18,394.55,35,382.85,11.71,371.25c-13.09-6.52-15.67-20-5.37-30.38q42-42.45,84.43-84.53a34.42,34.42,0,0,1,9-6.27q85.2-42.49,170.37-85c8.2-4.09,16.33-8.32,24.62-12.21,3.78-1.78,5.14-4.24,5.5-8.44C303.55,105.4,317,70.64,345.36,43,373.5,15.58,407.85,1.8,447.05.16,475.74-1,503,4.41,528.55,17.85a143.05,143.05,0,0,1,61.08,60.64c11.08,20.77,17,43,18.89,66.32a8.5,8.5,0,0,0,5.2,7.74q51.28,25.37,102.46,51,48,24.07,95.9,48.44c3.16,1.6,5.6,4.18,8.07,6.65q40.86,40.8,81.67,81.64c10.6,10.62,8.63,23.93-4.73,30.72-22.72,11.54-45.47,23-68.43,34.1-5.69,2.74-7.52,6.07-7.51,12.27.2,94.15.08,188.3.23,282.46,0,10.32-3.84,17.14-13.26,21.83q-153.69,76.56-307.2,153.48c-12.06,6-24.23,11.88-36.16,18.17-7.15,3.77-13.76,3.6-20.92,0Q386.72,864.5,329.44,836l-177-88.47c-17.59-8.79-35.11-17.71-52.77-26.33C91.07,717,87.2,710.66,87.24,701c.21-47.32.1-94.65.1-142Zm385.7-75-1.47,1c-.07,1.49-.21,3-.21,4.45q0,177.72,0,355.44c0,6.2.08,6.25,5.61,3.49q80.71-40.3,161.41-80.66C684.87,744.5,731.26,721,778,698.2c7.19-3.52,9.22-7.44,9.2-15.12-.28-93.31-.07-186.63-.34-280,0-11.16,4.17-18.08,14.09-22.82,19.09-9.11,37.87-18.89,56.87-28.2,3.7-1.82,3.8-3.05.92-5.89Q831.15,319,803.9,291.44c-2.56-2.59-4.77-2.89-7.89-1.26q-14.18,7.41-28.5,14.5-55.25,27.54-110.51,55-84.5,42.19-169,84.43c-3.68,1.84-4.4,3-1.19,6.18q27.39,27,54.44,54.43c2.86,2.91,5.07,3.12,8.63,1.32q56.69-28.56,113.52-56.84,33.3-16.65,66.61-33.3c8.19-4.07,15.59-3.05,21.23,2.44,8.27,8.08,6.58,22.51-6.74,29.12-64.78,32.11-129.35,64.64-194,97-7.1,3.56-15.27,2.61-20.44-2.53q-16.68-16.53-33.19-33.23C488.86,500.56,481,492.25,473.05,484ZM765.1,267.26c-2.84-1.61-4.52-2.66-6.29-3.55Q685.07,226.83,611.33,190c-5.61-2.8-5.79-2.78-7.31,3.11-7.74,30.09-23.37,55.31-46.58,75.89-22.08,19.58-47.5,32.54-76.66,37.42a155.7,155.7,0,0,1-159.42-73.06c-5.38-8.9-2.89-18.8,5.56-23.86,8.85-5.29,18.41-2.64,24.18,6.24,27.57,42.37,66.36,62.62,117,57.16,36.52-3.94,66.14-20.73,86.43-52.07,14.11-21.79,19.83-45.87,19-71.79-1-29.88-10.66-56.5-31.38-77.91-32-33.08-71.77-44.16-116.19-33.94-40,9.21-67.54,34.67-83.37,72.49a104.25,104.25,0,0,0-8.28,46.82c.6,10.31-3.5,17.55-13.24,21.75-7.18,3.09-14,6.92-21,10.43L177.05,250.11q-15,7.48-30,15c-1,.48-2.59.68-2.34,2.13.13.7,1.38,1.27,2.19,1.77a29.2,29.2,0,0,0,2.68,1.35L442,416.6c12.35,6.18,12.33,6.16,24.55,0q60.75-30.5,121.53-60.95Q665.88,316.79,743.73,278C750.55,274.62,757.34,271.17,765.1,267.26ZM437,485l-1.82-1a46.49,46.49,0,0,1-3.95,5.15q-25,25.18-50.16,50.25c-8.18,8.18-14.36,9.25-24.68,4.11Q309,519.82,261.62,496.1L157,443.78c-10.43-5.22-20.91-10.35-31.29-15.68-3-1.54-4.3-1.15-4,2.4.06.83,0,1.66,0,2.5q0,127.25-.1,254.49c0,4.52,1.55,6.78,5.53,8.76,46.25,23,92.38,46.24,138.59,69.34q82.92,41.45,165.9,82.77c5.42,2.7,5.44,2.7,5.44-3.54q0-177.49,0-355Zm-12.73-37.63c-1.08-2.42-3.32-2.95-5.18-3.88q-74.67-37.32-149.37-74.58-78.28-39-156.52-78.15c-4-2-6.35-1.52-9.44,1.61-17.41,17.7-35,35.19-52.63,52.73-4.78,4.77-4.8,4.73,1.33,7.79l181.11,90.53q62.82,31.39,125.64,62.83c2.57,1.29,4.58,2.07,7.07-.44,18.64-18.8,37.41-37.47,56.13-56.2C423.11,448.89,423.67,448.08,424.29,447.34Z"/><path d="M536,110.36c-.21,5.48-1.77,9.91-5.4,13.53Q489,165.31,447.39,206.76c-9.93,9.91-19.52,10-29.4.06-13.18-13.21-26.45-26.33-39.57-39.6-7.63-7.72-8.26-15.79-2.19-23.69,6.95-9,18.54-9.31,26.92-.76s17.25,17.14,25.66,25.91c3.11,3.25,5.11,2.67,8-.26q34.5-34.74,69.26-69.2c8.69-8.58,21.42-7.13,27.52,2.56C535.38,104.59,535.74,107.69,536,110.36Z"/></g></g></svg>
                        <span>+ Nuevo Producto</span>
                      </button>
                      </div>
                      <div class="cabezaTablaProd">
                        <span>Administra tus productos aquí</span>
                      </div>
                      <div class="productos">
                      </div>`;


                      // Insertando HTML PANEL PRODUCTO BASE | VUELTA 2

                        const rangeProductosSV = document.createRange();

                        rangeProductosSV.selectNode(
                          document.getElementsByTagName("div").item(0)
                        );
                        const documentProductsSV =
                          rangeProductosSV.createContextualFragment(htmlDivProdSV);
                        document
                          .querySelector(".divContentProductos")
                          .appendChild(documentProductsSV);

                      //---------------------------------------------------------

                      //

                      // Botón Crear Producto | VUELTA 2
                      const btnCrearProd2 = document.querySelector(".btnNewProdBTN");

                      btnCrearProd2.onclick = () => {

                        document.querySelector("#formCreProd").submit();

                      }

                      //------------------------------------------------------------------

                      //

                      // DIVS PRODUCTOS | VUELTA 2 

                      let htmlDivProdSV2 = "";

                      for (let i = 1; i < data.length; i++) {
                        //

                        //Comprobaciones

                          let precioProd = "";
                          let ingreTotal = 0;
                          let totalMiembro = 0;

                          //

                          if (
                            data[i]["ingresosTotales"] != null &&
                            data[i]["ingresosTotales"] != 0
                          ) {

                            ingreTotal = data[i]["ingresosTotales"];

                          } else {

                            ingreTotal = 0;

                          }

                          if (data[i]["cantidadMiembros"] != null) {

                            totalMiembro = data[i]["cantidadMiembros"];

                          } else {

                            totalMiembro = "N/A";

                          }

                        //------------------------------------------------------------------------------

                        let preXHora =
                          data[i]["precioXhora"] == 0
                            ? `<span style="
                            font-weight: 600;
                            font-size: 1.8rem;
                            color: #002d5699;">N/A</span>`
                            : data[i]["precioXhora"];

                        preXHora =
                          preXHora == 1
                            ? `<span style="
                            font-weight: 600;
                            font-size: 1.8rem;
                            color: #1261ac99;">A consultar</span>`
                            : preXHora;

                        let preXDia =
                          data[i]["precioXDia"] == 0
                            ? `<span style="
                            font-weight: 600;
                            font-size: 1.8rem;
                            color: #002d5699;">N/A</span>`
                            : data[i]["precioXDia"];

                        preXDia =
                          preXDia == 1
                            ? `<span style="
                            font-weight: 600;
                            font-size: 1.8rem;
                            color: #1261ac99;">A consultar</span>`
                            : preXDia;

                        let preXSemana =
                          data[i]["precioXSemana"] == 0
                            ? `<span style="
                            font-weight: 600;
                            font-size: 1.8rem;
                            color: #002d5699;">N/A</span>`
                            : data[i]["precioXSemana"];

                        preXSemana =
                          preXSemana == 1
                            ? `<span style="
                            font-weight: 600;
                            font-size: 1.8rem;
                            color: #1261ac99;">A consultar</span>`
                            : preXSemana;

                        //------------------------------------------------------------------------------

                        if (data[i]["produTipo"] == "Membresía") {

                          precioProd =
                            "Precio de la Membresía:<span class='spanMem'>$" +
                            data[i]["produPrecio"] +
                            "</span>por mes";

                        } else {

                          precioProd =
                            "<span class='preIndiS'>Precio por Hora: <span>" +
                            preXHora +
                            "</span></span>  <span class='preIndiS'>Precio por Día: <span>" +
                            preXDia +
                            "</span></span>  <span class='preIndiS'>Precio por Semana: <span>" +
                            preXSemana +
                            "</span></span>";

                        }

                        htmlDivProdSV2 += `
                        <div class="divProducto">
                          <form action="eliminarProd.php" method="POST" tipo="producto" id="formElimi${i}" name="formElimi${i}">
                            <input type="hidden" value="${data[i]["id_producto"]}" name="id">
                            <input type="hidden" value="${data[i]["productoImgPrin"]}" name="imagen">
                            <input type="hidden" value="producto" name="tipo">
                          </form>
                          <form action="editarProd.php" method="POST"  id="formEditar${i}" name="formEditar${i}">
                            <input type="hidden" value="${data[i]["id_producto"]}" name="id">
                            <input type="hidden" value="producto" name="tipo">
                          </form>
                          <form action="editarProd.php" method="POST"  id="formEstadis${i}" name="formEstadis${i}">
                            <input type="hidden" value="${
                              data[i]["id_producto"]
                            }" name="id">
                            <input type="hidden" value="producto" name="tipo">
                            <input type="hidden" value="true" name="productoEstadis">
                          </form>
                          <div class="divImgProd">
                          <img src='images/productosImages/${
                            data[i]["productoImgPrin"]
                          }' alt="">
                          </div>
                          <div class="divDataProd">
                            <div class="nombreYCategoDiv">
                              <span class="nombreProd">${data[i]["produNombre"]}
                                <span class="fechaCreaProd">Creado el:${
                                  " " +
                                  data[i]["producFechaCrea"] +
                                  " | " +
                                  data[i]["producHoraCrea"]
                                }</span>
                              </span>
                              <span class="categoProd">Categoria: ${
                                data[i]["produCategoria"]
                              }
                              <span class="tipoProd">Tipo: ${data[i]["produTipo"]}</span>
                              </span>
                            </div>
                            <div class="divPrecios">
                              ${precioProd}
                            </div>
                            <div class="metricasMembresiaDiv">
                              <span class="totalMiembrosSpan">Total de Miembros: <span>${totalMiembro}</span></span>
                              <span>
                                Ingresos Totales:
                                <span>
                                  $${ingreTotal}
                                </span>
                              </span>
                              <span>
                                Nuevos Miembros del Mes:
                                <span>
                                  0
                                </span>
                              </span>
                              <span>
                                Nuevos Miembros del Año:
                                <span>
                                  0
                                </span>
                              </span>
                            </div>
                          </div>
                          <div class="divBtnEliminar">
                            <div class="svgDiv1" >
                              <div class="eliminarBtn2" title="Eliminar Producto" tipo="formElimi${i},producto,${
                                data[i]["id_producto"]
                              },${data[i]["productoImgPrin"]}"></div>
                              <svg class="eliminarBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301.97 383.52"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M300.75,92Q288,62.94,258,52.08c-10.44-3.79-21.24-4-32.1-3.64-3.09.1-4.6-.7-5.44-4a59.08,59.08,0,0,0-14.31-25.91C196.84,8.47,185.25,2.67,171.93,0H130c-25.47,5.54-42,20.63-49,45.9-.53,1.92-1.66,2.55-3.54,2.51-3.62-.07-7.24,0-10.85,0A71.14,71.14,0,0,0,1.18,92c-3.66,8.71,1.55,16.77,11,16.77q138.81,0,277.63,0C299.15,108.78,304.53,100.61,300.75,92ZM193.55,48.42c-14.21-.06-28.42,0-42.64,0H108.65c-3.94,0-4.2-.36-2.45-4,6.83-14.24,18.48-21.19,34-21.57,9.08-.22,18.2-.7,27.26.56,13.63,1.9,22.94,9.49,28.7,21.79C197.56,48.17,196,48.43,193.55,48.42Z"/><path d="M269.76,130.74H33.64c-7.88,0-7.69,0-7,8,1.31,15.38,2.45,30.77,3.54,46.17,1.13,15.9,2,31.81,3.2,47.71,1.62,22.47,3.38,44.93,5,67.41,1.29,17.63,2.44,35.27,3.78,52.9,1.28,16.9,16,30.58,33,30.59q75.78,0,151.55,0c16.39,0,31.26-12.94,32.83-29.14,1.65-17.1,2.64-34.26,3.86-51.4.85-11.92,1.55-23.86,2.41-35.78,1.15-15.89,2.42-31.78,3.57-47.67.86-12,1.54-24.11,2.41-36.15,1.13-15.65,2.42-31.28,3.53-46.93C275.78,130.75,275.63,130.74,269.76,130.74ZM116.11,322c-5,.69-10-2.83-11.36-8.19-1.48-5.74-.78-11.65-1.25-17.47-1-12.15-1.13-24.36-1.74-36.54q-1.65-33.37-3.48-66.73a11.2,11.2,0,0,1,9.35-12.06c5.08-1,10.42,2.52,11.69,8.11,1.49,6.58,1,13.38,1.38,20.07,1.22,19.12,2.08,38.27,3,57.41.71,14.79,1.31,29.59,2,44.39A10.71,10.71,0,0,1,116.11,322Zm87.38-129.76q-1.69,36.74-3.41,73.47c-.69,14.66-1.5,29.33-2.2,44-.4,8.63-6.49,13.93-13.8,11.9a11.17,11.17,0,0,1-8-11.67c.74-11.92,1.36-23.85,2-35.78q1.47-28.32,2.88-56.66c.37-7.71.65-15.42.91-23.13a21.87,21.87,0,0,1,.74-5.53c1.52-5.12,6.48-8.63,11.24-7.93C199.77,181.8,203.88,186.55,203.49,192.28Z"/></g></g></svg>
                            </div>
                            <div class="svgDiv2" title="Editar Producto">
                              <div class="editarBtn2" title="Editar Producto" 
                              tipo="formEditar${i},producto,${data[i]["id_producto"]}">
                              </div>
                              <svg class="editarBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.33 375.09"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M278.85,121.57c-4.62-4.5-9.55-4.23-14.3.14-.8.75-1.56,1.54-2.33,2.32L119.94,266.39c-5.09,5.09-10.21,10.15-15.25,15.28-6,6.15-5,12.54,2.74,16.52,2.71,1.4,5.41,2.83,8.2,4.07a4.53,4.53,0,0,1,3.06,4.8c-.13,5-.14,10,0,15,.08,2.65-.94,3.91-3.51,4.63-11.27,3.12-22.5,6.38-33.73,9.68a4.14,4.14,0,0,1-4.6-1.19q-18.46-18.53-37-37a4.19,4.19,0,0,1-1.14-4.62q5-17.39,9.91-34.81c.6-2.17,1.81-2.84,4-2.79,5.12.12,10.24.13,15.36,0a4.28,4.28,0,0,1,4.52,2.85c1.64,3.54,3.33,7.07,5.3,10.43,3.16,5.38,8.75,6.41,13.72,2.68A33.2,33.2,0,0,0,95,268.69q35.28-35.37,70.53-70.76,43-43.12,86.14-86.19c6.73-6.74,6.72-10.8-.1-17.64Q238.51,81,225.43,68c-7-7-11-7-17.88,0Q150,126,92.38,184.12,65.2,211.54,38.07,239a16.89,16.89,0,0,0-4.57,7.36Q21.82,287.49,10,328.6C6.77,340,3.38,351.27,0,362.6c0,3.66.08,7.33,0,11,0,1.28.23,1.55,1.51,1.51,3.66-.12,7.32,0,11,0,1.25-.45,2.49-1,3.77-1.33q55.68-16,111.4-31.87a19.63,19.63,0,0,0,8.67-5.15q26.73-26.56,53.53-53.08,45.21-44.82,90.4-89.68c9.27-9.19,18.56-18.36,27.76-27.61,5.12-5.15,5.53-10,.86-14.76Q294.09,136.36,278.85,121.57Z"/><path d="M364.9,60.7C348.19,43.62,331.19,26.83,314.25,10A33.1,33.1,0,0,0,289.91,0c-9.2,0-16.57,2.21-23.38,8.68-11,10.49-21.7,21.39-32.28,32.36-4.28,4.45-3.69,9.35,1.14,14.19q42.09,42.21,84.28,84.33c5.24,5.24,10,5.21,15.28,0,10-9.85,20-19.65,29.8-29.69C378.76,95.51,378.92,75,364.9,60.7Z"/></g></g></svg>
                            </div>
                            <div class="divOOpciones">
                              <span>Otras Opciones</span>
                            </div>
                          </div>
                          <!--<div class="divEstadis">
                            <div class="divPopulari">
                              <span class="span1">Popularidad</span>
                              <span class="spanNum">15%</span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03"/></g></g></svg>
                            </div>
                            <span>En comparación al mes anterior</span>
                          </div>
                          <button class="btnEstadis" tipo="formEstadis${i},producto,${data[i]["id_producto"]}">Ver Estadísticas</button>-->
                        </div>`;

                        //
                      }
                      //
                      
                      const productosDivSV2 = document.querySelector(".productos"); // Div PRODUCTOS | VUELTA 2

                      //Insertando Divs Productos | VUELTA 2

                        const rangeProductosSV2 = document.createRange();

                        rangeProductosSV2.selectNode(
                          document.getElementsByTagName("div").item(0)
                        );
                        const documentProductsSV2 =
                          rangeProductosSV2.createContextualFragment(htmlDivProdSV2);
                        productosDivSV2.appendChild(documentProductsSV2);
                      
                      //-------------------------------------------------------------------

                      
                      let btnsEliminar = document.querySelectorAll(".eliminarBtn2");
                      let btnsEditar = document.querySelectorAll(".editarBtn2");
                      let btnsEstadis = document.querySelectorAll(".btnEstadis");

                      for(let a= 0; a < btnsEditar.length; a++){
                      //

                        btnsEditar[a].addEventListener("click", (a)=>{
                        //

                          let datos = a.target.getAttribute("tipo").split(",");

                          document.querySelector("#"+datos[0]).submit();
                        
                        //
                        });

                      //
                      };

                      //for 3
                      for (let e = 0; e < btnsEliminar.length; e++) {
                        btnsEliminar[e].addEventListener("click", (e) => {
                          let datos = e.target.getAttribute("tipo").split(",");
          
                          e.preventDefault();
                          swal
                            .fire({
                              title: "Se va a eliminar un producto",
                              text: "No se podrá recuperar la información, ¿está seguro de querer continuar?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Eliminar Producto",
                              cancelButtonText: "Cancelar",
                            })
                            .then((value) => {
                              if (value.isConfirmed) {
                                //
                                document.querySelector("#" + datos[0]).submit();
                                //
                              } else {
                                return false;
                              }
                            });
                        });
                      }
                      //

                      if(btnsEstadis != null){
                        
                        for(let i = 0; i < btnsEstadis.length; i++){
            
                          btnsEstadis[i].addEventListener("click", (e)=>{
                            
                            let datos = e.target.getAttribute("tipo").split(",");
          
                            document.querySelector("#" + datos[0]).submit();
          
                          });

                        }

                      }

                    })
                  );

                  //

                  btnCraerNProd.onclick = () => {

                    document.querySelector("#formCreProd").submit();

                  }

                  //

                  //BTN Unidades Panel
                  btnUnidades.addEventListener("click", unidadPanel = () => {
                    //

                    // Cambiando estilo de los botones

                      if (btnUnidades.classList.contains("btn2")) {
                        btnUnidades.classList.replace("btn2", "btn");
                        btnProductos.classList.replace("btn", "btn2");
                      }

                    //------------------------------------------------------------------

                    document.querySelector(".divContentProductos").innerHTML = "";

                    // HTML PANEL UNIDADES BASE

                      let htmlUnidadesPanel = `
                      <div class="btnNewProd">
                      <button class="btnNewUnidBTN" onc>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.3 385.09"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M283.57,234.36c-8.43-32.39-29.7-52.56-62.21-60.57-3.8-.94-5.24-2.06-5.22-6.26.17-54.1.11-108.2.11-162.3,0-5.21,0-5.23-5.12-5.23H5.24C0,0,0,0,0,5.13V350.78C0,356,0,356,5.17,356H176.5c1.86,0,3.67-.19,5.08,1.63,7.15,9.19,14.39,18.3,21.6,27.44h1.51c20.56-25.87,41.05-51.81,61.73-77.61C283.81,285.78,290.6,261.39,283.57,234.36ZM155.49,330.91H30.37c-5.34,0-5.35,0-5.35-5.51q0-147.68,0-295.33c0-5.51,0-5.51,5.64-5.51H186.21c5.44,0,5.44,0,5.44,5.59,0,46,0,91.93.09,137.89,0,3.64-1.1,5-4.59,5.63-31.72,5.95-58.43,33.49-63.89,65.27-4.49,26.13,2.35,49,19,69.31,5.86,7.15,11.53,14.46,17.48,21.94A6.89,6.89,0,0,1,155.49,330.91Zm92.37-40.17q-20.43,25.72-40.9,51.44c-3,3.72-3,3.7-5.77.17q-20.1-25.29-40.2-50.57c-18.83-23.62-19.3-53-.26-75,15.13-17.48,34.75-23.94,57.22-18.19,22.73,5.81,36.63,21,42.09,43.88.94,3.94.9,8,1,11.94C261.27,268.23,256.29,280.12,247.86,290.74Z"/><path d="M92.85,76.39c0-4.49,0-9,0-13.49,0-2.36-1-3.42-3.35-3.41-8.75,0-17.5.06-26.24,0-2.59,0-3.61,1.14-3.61,3.6q0,13.13,0,26.25c0,2.32,1,3.41,3.41,3.4q13.13,0,26.24,0c2.53,0,3.62-1,3.55-3.6C92.78,84.89,92.86,80.64,92.85,76.39Z"/><path d="M123.5,88.86c0,2.62,1,3.91,3.73,3.89,8.63-.07,17.25,0,25.88,0,2.44,0,3.67-.87,3.65-3.51q-.12-13.12,0-26.25c0-2.61-1.15-3.55-3.64-3.51-4.25.08-8.5,0-12.75,0s-8.5.1-12.75,0c-2.84-.09-4.13,1-4.11,3.9Q123.6,76.11,123.5,88.86Z"/><path d="M89.3,123.37q-13,.09-25.92,0c-2.51,0-3.71,1-3.7,3.51q0,13.15,0,26.3c0,2.33,1,3.42,3.41,3.41q13.14,0,26.29,0c2.54,0,3.57-1.19,3.51-3.71-.1-4.25,0-8.51,0-12.77s-.06-8.77,0-13.15C92.93,124.39,91.85,123.35,89.3,123.37Z"/><path d="M153.27,123.37q-13.15.1-26.3,0c-2.4,0-3.43,1.09-3.43,3.4,0,8.76,0,17.53,0,26.29,0,2.6,1.25,3.54,3.7,3.53,8.64,0,17.29,0,25.93,0,2.47,0,3.66-1,3.6-3.61-.09-4.38,0-8.77,0-13.15s-.06-8.52,0-12.77C156.8,124.57,155.9,123.35,153.27,123.37Z"/><path d="M92.85,203.58c0-4.26-.07-8.52,0-12.77.05-2.58-1.06-3.58-3.6-3.57q-12.94.1-25.91,0c-2.53,0-3.7,1-3.69,3.52q0,13.14,0,26.29c0,2.36,1.09,3.4,3.43,3.39q13.14,0,26.29,0c2.53,0,3.55-1.19,3.49-3.71C92.78,212.34,92.85,208,92.85,203.58Z"/><path d="M204,225.59c-15.52-.24-28.13,12.57-28.16,28.17A28.19,28.19,0,0,0,204,282.33c15.41,0,28.4-12.63,28.33-28.22C232.29,238,220.14,225.83,204,225.59Z"/></g></g></svg>
                        <span>+ Nueva Unidad</span>
                      </button>
                      </div>
                      <div class="cabezaTablaProd">
                        <span>Administra tus unidades aquí</span>
                      </div>
                      <div class="productosUni">
                      </div>
                      `;

                    //---------------------------------------------------------------

                    // Insertando PANEL UNIDADES BASE

                      const rangeUnidades = document.createRange();

                      rangeUnidades.selectNode(
                        document.getElementsByTagName("div").item(0)
                      );
                      const documentUnidades =
                        rangeUnidades.createContextualFragment(htmlUnidadesPanel);
                      document
                        .querySelector(".divContentProductos")
                        .appendChild(documentUnidades);

                    //--------------------------------------------------------------------

                    //

                    // DIVS UNIDADES

                    let formInfoPanelPrin = new FormData();

                    formInfoPanelPrin.append("panelUnidad", true);

                    fetch(urlBuscarInfoAdminDB, {
                      method: "POST",
                      body: formInfoPanelPrin,
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        //

                        let htmlUnidadesDivs = "";

                        for (let i = 1; i < data.length; i++) {
                          //

                          let caractUnidad = data[i]["unidad_caracte"].split(",");
                          let caractUnidad2 = "";

                          for (let e = 0; e < caractUnidad.length; e++) {

                            caractUnidad2 += `
                            <div>
                              ${caractUnidad[e]}
                            </div>`;

                          }

                          //

                          htmlUnidadesDivs += `
                          <div class="unidadDiv">
                            <form action="eliminarProd.php" method="POST" id="formElimi${i}" name="formElimi${i}">
                              <input type="hidden" value="${data[i]["id_unidad"]}" name="id">
                              <input type="hidden" value="unidad" name="tipo">
                              <input type="hidden" value="${data[i]["unidad_imagen"]}" name="imagen">
                            </form> 
                            <form action="editarProd.php" method="POST"  id="formEditar${i}" name="formEditar${i}">
                              <input type="hidden" value="${data[i]["id_unidad"]}" name="id">
                              <input type="hidden" value="unidad" name="tipo">
                            </form>
                            <form action="editarProd.php" method="POST"  id="formEstadisU${i}" name="formEstadisU${i}">
                              <input type="hidden" value="${data[i]["id_unidad"]}" name="id">
                              <input type="hidden" value="unidad" name="tipo">
                              <input type="hidden" value="true" name="unidadEstadis">
                            </form>
                            <div class="divImgUni">
                              <img src='images/productosImages/${data[i]["unidad_imagen"]}' alt="">
                            </div>
                            <div class="divDataUni">
                              <div class="divNombreFecha">
                                <span class="nombreSpan">${data[i]["unidad_nombre"]}</span>
                                <span class="fechaSpan">Creado el: ${data[i]["unidad_fechaCre"]} | ${data[i]["unidad_horaCre"]}</span>
                              </div>
                              <span class="descrip">Descripción</span>
                              <p class="descripUnidad">${data[i]["unidad_descrip"]}</p>
                              <span class="caracteris">Características o Recursos</span>
                              <div class="divCaracteris">
                                ${caractUnidad2}
                              </div>
                            </div>
                            <div class="divBtnEliminar">
                              <div class="svgDiv1">
                                <div class="eliminarBtn2" title="Eliminar Unidad" 
                                tipo="formElimi${i},unidad,${data[i]["id_unidad"]},${data[i]["unidad_imagen"]}"></div>
                                <svg class="eliminarBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301.97 383.52"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M300.75,92Q288,62.94,258,52.08c-10.44-3.79-21.24-4-32.1-3.64-3.09.1-4.6-.7-5.44-4a59.08,59.08,0,0,0-14.31-25.91C196.84,8.47,185.25,2.67,171.93,0H130c-25.47,5.54-42,20.63-49,45.9-.53,1.92-1.66,2.55-3.54,2.51-3.62-.07-7.24,0-10.85,0A71.14,71.14,0,0,0,1.18,92c-3.66,8.71,1.55,16.77,11,16.77q138.81,0,277.63,0C299.15,108.78,304.53,100.61,300.75,92ZM193.55,48.42c-14.21-.06-28.42,0-42.64,0H108.65c-3.94,0-4.2-.36-2.45-4,6.83-14.24,18.48-21.19,34-21.57,9.08-.22,18.2-.7,27.26.56,13.63,1.9,22.94,9.49,28.7,21.79C197.56,48.17,196,48.43,193.55,48.42Z"/><path d="M269.76,130.74H33.64c-7.88,0-7.69,0-7,8,1.31,15.38,2.45,30.77,3.54,46.17,1.13,15.9,2,31.81,3.2,47.71,1.62,22.47,3.38,44.93,5,67.41,1.29,17.63,2.44,35.27,3.78,52.9,1.28,16.9,16,30.58,33,30.59q75.78,0,151.55,0c16.39,0,31.26-12.94,32.83-29.14,1.65-17.1,2.64-34.26,3.86-51.4.85-11.92,1.55-23.86,2.41-35.78,1.15-15.89,2.42-31.78,3.57-47.67.86-12,1.54-24.11,2.41-36.15,1.13-15.65,2.42-31.28,3.53-46.93C275.78,130.75,275.63,130.74,269.76,130.74ZM116.11,322c-5,.69-10-2.83-11.36-8.19-1.48-5.74-.78-11.65-1.25-17.47-1-12.15-1.13-24.36-1.74-36.54q-1.65-33.37-3.48-66.73a11.2,11.2,0,0,1,9.35-12.06c5.08-1,10.42,2.52,11.69,8.11,1.49,6.58,1,13.38,1.38,20.07,1.22,19.12,2.08,38.27,3,57.41.71,14.79,1.31,29.59,2,44.39A10.71,10.71,0,0,1,116.11,322Zm87.38-129.76q-1.69,36.74-3.41,73.47c-.69,14.66-1.5,29.33-2.2,44-.4,8.63-6.49,13.93-13.8,11.9a11.17,11.17,0,0,1-8-11.67c.74-11.92,1.36-23.85,2-35.78q1.47-28.32,2.88-56.66c.37-7.71.65-15.42.91-23.13a21.87,21.87,0,0,1,.74-5.53c1.52-5.12,6.48-8.63,11.24-7.93C199.77,181.8,203.88,186.55,203.49,192.28Z"/></g></g></svg>
                              </div>
                              <div class="svgDiv2">
                                <div class="editarBtn2" title="Editar Unidad" 
                                tipo="formEditar${i},unidad,${data[i]["id_unidad"]}"></div>
                                <svg class="editarBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.33 375.09"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M278.85,121.57c-4.62-4.5-9.55-4.23-14.3.14-.8.75-1.56,1.54-2.33,2.32L119.94,266.39c-5.09,5.09-10.21,10.15-15.25,15.28-6,6.15-5,12.54,2.74,16.52,2.71,1.4,5.41,2.83,8.2,4.07a4.53,4.53,0,0,1,3.06,4.8c-.13,5-.14,10,0,15,.08,2.65-.94,3.91-3.51,4.63-11.27,3.12-22.5,6.38-33.73,9.68a4.14,4.14,0,0,1-4.6-1.19q-18.46-18.53-37-37a4.19,4.19,0,0,1-1.14-4.62q5-17.39,9.91-34.81c.6-2.17,1.81-2.84,4-2.79,5.12.12,10.24.13,15.36,0a4.28,4.28,0,0,1,4.52,2.85c1.64,3.54,3.33,7.07,5.3,10.43,3.16,5.38,8.75,6.41,13.72,2.68A33.2,33.2,0,0,0,95,268.69q35.28-35.37,70.53-70.76,43-43.12,86.14-86.19c6.73-6.74,6.72-10.8-.1-17.64Q238.51,81,225.43,68c-7-7-11-7-17.88,0Q150,126,92.38,184.12,65.2,211.54,38.07,239a16.89,16.89,0,0,0-4.57,7.36Q21.82,287.49,10,328.6C6.77,340,3.38,351.27,0,362.6c0,3.66.08,7.33,0,11,0,1.28.23,1.55,1.51,1.51,3.66-.12,7.32,0,11,0,1.25-.45,2.49-1,3.77-1.33q55.68-16,111.4-31.87a19.63,19.63,0,0,0,8.67-5.15q26.73-26.56,53.53-53.08,45.21-44.82,90.4-89.68c9.27-9.19,18.56-18.36,27.76-27.61,5.12-5.15,5.53-10,.86-14.76Q294.09,136.36,278.85,121.57Z"/><path d="M364.9,60.7C348.19,43.62,331.19,26.83,314.25,10A33.1,33.1,0,0,0,289.91,0c-9.2,0-16.57,2.21-23.38,8.68-11,10.49-21.7,21.39-32.28,32.36-4.28,4.45-3.69,9.35,1.14,14.19q42.09,42.21,84.28,84.33c5.24,5.24,10,5.21,15.28,0,10-9.85,20-19.65,29.8-29.69C378.76,95.51,378.92,75,364.9,60.7Z"/></g></g></svg>
                              </div>
                              <div class="divOOpciones">
                                <span>Otras Opciones</span>
                              </div>
                            </div>
                            <!--<div class="divEstadis">
                              <div class="divPopulari">
                                <span class="span1">Popularidad</span>
                                <span class="spanNum">15%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.72 180.96"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon points="83.89 160.13 83.89 180.96 31.82 180.96 31.82 160.13 38.7 155.25 44.03 151.47 55.47 143.37 57.86 141.68 60.25 143.37 70.57 150.69 77.01 155.25 77.02 155.25 83.89 160.13" /><polygon points="115.72 80.03 83.89 74.37 83.89 145.55 80.81 143.37 66.45 133.19 57.86 127.11 52.47 130.93 34.9 143.37 31.82 145.55 31.82 74.37 0 80.03 57.86 0 115.72 80.03"/></g></g></svg>
                              </div>
                              <span>En comparación al mes anterior</span>
                              <button class="btnEstadis" tipo="formEstadisU${i},unidad,${data[i]["id_unidad"]}">Ver Estadísticas</button>
                            </div>-->
                          </div> `;

                        }


                        // Insertando DIVS UNIDADES

                          const rangeUnidadesDivs = document.createRange();

                          rangeUnidadesDivs.selectNode(
                            document.getElementsByTagName("div").item(0)
                          );
                          const documentUnidadesDivs =
                            rangeUnidadesDivs.createContextualFragment(
                              htmlUnidadesDivs
                            );
                          document
                            .querySelector(".productosUni")
                            .appendChild(documentUnidadesDivs);
                        
                        //--------------------------------------------------------------------------

                        //

                        let btnsEliminar = document.querySelectorAll(".eliminarBtn2");
                        let btnsEditar = document.querySelectorAll(".editarBtn2");
                        let btnsEstadisUnid = document.querySelectorAll(".btnEstadis");

                        for(let a= 0; a < btnsEditar.length; a++){
                        //

                          btnsEditar[a].addEventListener("click", (a)=>{
                          //

                            let datos = a.target.getAttribute("tipo").split(",");

                            document.querySelector("#"+datos[0]).submit();
                          
                          //
                          });

                        //
                        };

                        //for 2
                        for (let e = 0; e < btnsEliminar.length; e++) {
                          btnsEliminar[e].addEventListener("click", (e) => {
                            let datos = e.target.getAttribute("tipo").split(",");
            
                            e.preventDefault();
                            swal
                              .fire({
                                title: "Se va a eliminar un producto",
                                text: "No se podrá recuperar la información, ¿está seguro de querer continuar?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Eliminar Producto",
                                cancelButtonText: "Cancelar",
                              })
                              .then((value) => {
                                if (value.isConfirmed) {
                                  //
                                  document.querySelector("#" + datos[0]).submit();
                                  //
                                } else {
                                  return false;
                                }
                              });
                          });
                        }
                        //

                        // Botones VER ESTADÍSTICAS (UNIDADES)
                        
                          for(let d = 0; d < btnsEstadisUnid.length; d++){

                            btnsEstadisUnid[d].addEventListener("click", (e)=>{

                              let datos = e.target.getAttribute("tipo").split(",");
                              document.querySelector("#"+datos[0]).submit();

                            });

                          }

                        //-------------------------------------------------------------

                        //
                      })
                      .catch((err) => console.log(err));

                    //
                    
                    // BTNS CREAR NUEVA UNIDAD

                      const btnCrearUnid = document.querySelector(".btnNewUnidBTN");

                      btnCrearUnid.onclick = () => {

                        document.querySelector("#formCreUnid").submit();

                      }

                    //---------------------------------------------------------------------------

                    //
                  });

                  //----------------------------------------------------------------------------------------------
                  
                  let btnsEliminar = document.querySelectorAll(".eliminarBtn2");
                  let btnsEditar = document.querySelectorAll(".editarBtn2");
                  let btnsEstadis = document.querySelectorAll(".btnEstadis");

                  for(let a= 0; a < btnsEditar.length; a++){
                  //

                    btnsEditar[a].addEventListener("click", (a)=>{
                    //

                      let datos = a.target.getAttribute("tipo").split(",");

                      document.querySelector("#"+datos[0]).submit();
                    
                    //
                    });

                  //
                  };

                  //for 1
                  for (let e = 0; e < btnsEliminar.length; e++) {
                    btnsEliminar[e].addEventListener("click", (e) => {
                      let datos = e.target.getAttribute("tipo").split(",");

                      e.preventDefault();
                      swal
                        .fire({
                          title: "Se va a eliminar un producto",
                          text: "No se podrá recuperar la información, ¿está seguro de querer continuar?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Eliminar Producto",
                          cancelButtonText: "Cancelar",
                        })
                        .then((value) => {
                          if (value.isConfirmed) {
                            //
                            document.querySelector("#" + datos[0]).submit();
                            //
                          } else {
                            return false;
                          }
                        });
                    });
                  }

                  if(document.querySelector(".stdProd").value == 5){
                    unidadPanel();
                  }
                  
                  for(let i = 0; i < btnsEstadis.length; i++){
                  //

                    btnsEstadis[i].addEventListener("click", (e)=>{

                      if(document.querySelector(".cabezaTablaProd") != null){

                        let datos = e.target.getAttribute("tipo").split(",");
                        document.querySelector("#" + datos[0]).submit();

                      }

                    });

                  //
                  }

                  //
                })
                .catch((err) => console.log(err));
            
            //--------------------------------------------------------------------------------------------------------

          }

          //

          //
        })
      );

    //------------------------------------------------------------------------------

    // Input PRODUCTO | Nueva Reserva

      // Función 1

      window.addEventListener('click', function ocultarListaPdt(e) {

        if(div_listaPdt != null){
          if (document.getElementById('div_listaPdt').contains(e.target)) {
            

          } else {
                  
            div_listaPdt.classList.replace("listaPdt-V", "listaPdt-O");
  
          }
        }

      });

      const rangoLisPdtNRAdmin = document.createRange();

      function insertarListaPdtNR(data){

        let htmlLisPdtNRAdmin = "";

        if(data.length != 1){

          div_listaPdt.innerHTML = "";

          for(let i = 1; i < data.length; i++){

            htmlLisPdtNRAdmin += `
            <div 
              class="producto" 
              onclick="
              selectSetPdtNRAdmin(
                ${data[i]["id_producto"]},
                '${data[i]["produNombre"]}',
                ${data[i]["precioXhora"]},
                ${data[i]["precioXDia"]},
                ${data[i]["precioXSemana"]},
                ${data[i]["productoMaxPerso"]},
                '${data[i]["produDescri"]}',
                '${data[i]["produCaracteris"]}',
                '${data[i]["unidDisponibles"]}',
                '${data[i]["productoImgPrin"]}',
                '${data[i]["produIva"]}',
                '${data[i]["produDescu"]}'
              )
              "
            >
                <div class="imgDiv">
                    <img src="images/productosImages/${data[i]["productoImgPrin"]}" alt="Imagen del Producto">
                </div>
                <div class="divDatos">
                    <span>${data[i]["produNombre"]}</span>
                </div>
            </div>
            `;

          }

          rangoLisPdtNRAdmin.selectNode(document.getElementsByTagName("div").item(0));
          const lisPdtNRAdmin =
            rangoLisPdtNRAdmin.createContextualFragment(htmlLisPdtNRAdmin);
          div_listaPdt.appendChild(lisPdtNRAdmin);

          div_listaPdt.classList.replace("listaPdt-O", "listaPdt-V");

        }else{

          div_listaPdt.innerHTML = "";

          htmlLisPdtNRAdmin = `
          <span class="spanNOEncontrado">Producto NO Encontrado</span>
          `;

          rangoLisPdtNRAdmin.selectNode(document.getElementsByTagName("div").item(0));
          const lisPdtNRAdmin =
            rangoLisPdtNRAdmin.createContextualFragment(htmlLisPdtNRAdmin);
          div_listaPdt.appendChild(lisPdtNRAdmin);

          div_listaPdt.classList.replace("listaPdt-O", "listaPdt-V");

        }

      }

      in_pdtNomAdminNR.addEventListener("input", (e)=>{

        let nombrePdtNR = e.target.value;

        if(nombrePdtNR != null && nombrePdtNR != ""){

          let formProductosNR = new FormData();

          formProductosNR.append("nombrePdtNRAdmin", nombrePdtNR);

          fetch(urlBuscarInfoAdminDB, {
            method: "POST",
            body: formProductosNR,
          })
            .then((response) => response.json())
            .then((data) => {

              insertarListaPdtNR(data);

            })
            .catch((err) => console.log(err));

        }else{

          div_listaPdt.innerHTML = "";
          div_listaPdt.classList.replace("listaPdt-V", "listaPdt-O");

        }

      });

    //------------------------------------------------------------------------------

  //----------------------------
  // EVENTOS PRINCIPALES - FIN
  //----------------------------
  //---------------------------------------------------------------------------------------------------------------------------------------

};

//--------------------------------------------
//<<-- ADMINISTRACION.PHP | FIN -->>
//--------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//-----------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------
//<<-- EDITARPROD.PHP | INICIO -->>
//--------------------------------------

if(document.querySelector(".editarProdHTML")){

  //

  //-- Globales INICIO --//
    
    var datos = [9];
    var erroresEditProd = [7];
    erroresEditProd[0] = 0;
    erroresEditProd[1] = 0;
    erroresEditProd[2] = 0;
    erroresEditProd[3] = 0;
    erroresEditProd[4] = 0;
    erroresEditProd[5] = 0;
    erroresEditProd[6] = 0;

    var meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ]

  //-- Globales FIN --//

  //

  //

  //-- Header INICIO --//

    // ELEMENTOS DEL DOM

    const flechaPerfilDiv = document.querySelector(".divFlecha");
    const cuadroOPerfil = document.querySelector(".cuadroPOculto");

    const flechaPerfil = document.querySelector(".flechaIconPerfil");

    const btnCerrarSesion = document.querySelector(".btnCerrar");

    //--------------------------------------------------------------------------

    //

    //Mostrar y ocultar panel perfil

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

    //

    btnCerrarSesion.addEventListener("click", (e) => {
      window.location.href = "cerrar.php";
    });
    
    //

  //-- Header FIN --//

  //

  //

  //-- Main INICIO --//

    // Elementos del DOM 

    const imagenSelect = document.querySelector("#imagenSelected");
    const imagenNombre = document.querySelector("#imagenNombre");

    const btnSubir = document.querySelector("#subirImagenBtn");
    const btnHabilEdicion = document.querySelector(".btnHabilitar");
    const btnLabel = document.querySelector(".labelSubirImg");
    const btnGuardar = document.querySelector(".btnGuardar");
    const btnCancelar = document.querySelector(".btnCancelCambio");
    const btnBorrarProd = document.querySelector(".eliminarProd");

    const graficaEstadis1 = document.querySelector("#graficaMiembrosNM");
    const graficaEstadis2 = document.querySelector("#graficaMiembrosNA");
    const GraficaUnidRM = document.querySelector("#GraficaUnidRM");
    const GraficaUnidRA = document.querySelector("#GraficaUnidRA");

    const divDataEditGene = document.querySelector(".divDataEditGene");
    const divEstadisGene = document.querySelector(".divEstadistiGene");
    const divEstadisUnid = document.querySelector(".divEstadisUnidGene");

    const btnPanelEditor = document.querySelector(".btnPanelEditor");
    const btnPanelEstadis = document.querySelector(".btnPanelEstadis");

    const btnPanelEditUnid = document.querySelector("#btnEditUnid");
    const btnPanelEstadisUnid = document.querySelector("#btnEstadisUnid");

    const btnDivPrin = document.querySelector(".divPrin");

    const inputNombre = document.querySelector(".inputNombre");
    const inputCatego = document.querySelector("#selectCatego");
    const inputTipo = document.querySelector("#selectTipo");
    const inputPreXMembre = document.querySelector(".precioMembresia");
    const inputPreXHora = document.querySelector(".precioXHora");
    const inputPreXDia = document.querySelector(".precioXDia");
    const inputPreXSemana = document.querySelector(".precioXSemana");
    const inputDescrip = document.querySelector("#descripcionProd");

    //------------------------------------------------------------------

    //

    // EVENTOS

    //

      if(document.querySelector("#cuadroPOculto") != null){

        window.addEventListener('click', function mostrarCuadroPerfil(e) {

            if (document.getElementById('divFlecha').contains(e.target)) {
                

            } else {
                    
                document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
                flechaPerfil.classList.replace("flecha2", "flecha1");

            }

        });

      }

      window.onload = () => {
        
        if(document.querySelector(".divPrin").getAttribute("tipo") == "producto"){

          datos[0] = inputNombre.value;
          datos[1] = inputCatego.options[inputCatego.selectedIndex].text;
          datos[2] = inputTipo.options[inputTipo.selectedIndex].text;
          datos[3] = inputPreXMembre.value;
          datos[4] = inputPreXHora.value;
          datos[5] = inputPreXDia.value; 
          datos[6] = inputPreXSemana.value; 
          datos[7] = inputDescrip.value;
          datos[8] = imagenSelect.getAttribute("src");

        }else{

          datos[0] = inputNombre.value;
          datos[1] = inputPreXHora.value;
          datos[2] = inputPreXDia.value; 
          datos[3] = inputPreXSemana.value; 
          datos[4] = inputDescrip.value;
          datos[5] = document.querySelector("#caracterisProd").value;
          datos[6] = imagenSelect.getAttribute("src");
          console.log(datos);

        }
        
      }

      const mesActual = new Date().getMonth();
      const añoActual = new Date().getFullYear();
      const añoAnterior = new Date().getFullYear()-1;

      // GRÁFICAS

      //

      //Insertando Grafica 1 (Producto)

      if(graficaEstadis1!=null){

        const nuevosMiemMes = [meses[mesActual-2], meses[mesActual-1], meses[mesActual]];
        const cantidadNMMes = [25, 10, 20];
  
        const chartG1Esta = new Chart(graficaEstadis1, {
          type: "line",
          data: {
            labels: nuevosMiemMes,
            datasets: [
              {
                label: "Miembros x Mes",
                data: cantidadNMMes,
                backgroundColor: [
                  "#bb9dc744",
                  "#ffdd8844",
                  "#6370b444",
                  "#c1c4e444",
                  "#f296a044",
                ],
                borderColor: [
                  "#bb9dc7",
                  "#ffdd88",
                  "#6370b4",
                  "#c1c4e4",
                  "#f296a0",
                ],
                borderWidth: 1.5,
              },
            ],
          },
        });

      }

      //--------------------------------------------

      //

      //Insertando Gráfica 2 (Producto)

      if(graficaEstadis2 != null){

        const nuevosMiemAnio = [añoAnterior, añoActual];
        const cantidadNMAnio = [25, 30];
  
        const chartG2Esta = new Chart(graficaEstadis2, {
          type: "line",
          data: {
            labels: nuevosMiemAnio,
            datasets: [
              {
                label: "Miembros x Año",
                data: cantidadNMAnio,
                backgroundColor: [
                  "#bb9dc744",
                  "#ffdd8844",
                  "#6370b444",
                  "#c1c4e444",
                  "#f296a044",
                ],
                borderColor: [
                  "#bb9dc7",
                  "#ffdd88",
                  "#6370b4",
                  "#c1c4e4",
                  "#f296a0",
                ],
                borderWidth: 1.5,
              },
            ],
          },
        });

      }
      
      //---------------------------------------------

      //

      //Insertando Gráfica 3 (Unidad)

      if(GraficaUnidRM != null){

        const mesesReservas = [meses[mesActual-2], meses[mesActual-1], meses[mesActual]];
        const cantidadRMes = [8, 9, 7];
  
        const chartG1Unid = new Chart(GraficaUnidRM, {
          type: "line",
          data: {
            labels: mesesReservas,
            datasets: [
              {
                label: "Reservas x Mes",
                data: cantidadRMes,
                backgroundColor: [
                  "#bb9dc744",
                  "#ffdd8844",
                  "#6370b444",
                  "#c1c4e444",
                  "#f296a044",
                ],
                borderColor: [
                  "#bb9dc7",
                  "#ffdd88",
                  "#6370b4",
                  "#c1c4e4",
                  "#f296a0",
                ],
                borderWidth: 1.5,
              },
            ],
          },
        });

      }

      //---------------------------------------------

      //

      //Insertando Gráfica 4 (Unidad)

      if(GraficaUnidRA != null){

        const añoReserva = [añoAnterior, añoActual];
        const cantidadRAño = [18, 19];
  
        const chartG1Unid = new Chart(GraficaUnidRA, {
          type: "line",
          data: {
            labels: añoReserva,
            datasets: [
              {
                label: "Reservas x Año",
                data: cantidadRAño,
                backgroundColor: [
                  "#bb9dc744",
                  "#ffdd8844",
                  "#6370b444",
                  "#c1c4e444",
                  "#f296a044",
                ],
                borderColor: [
                  "#bb9dc7",
                  "#ffdd88",
                  "#6370b4",
                  "#c1c4e4",
                  "#f296a0",
                ],
                borderWidth: 1.5,
              },
            ],
          },

        });

      }
      
      //---------------------------------------------

    //

    // INPUTS

    //Preview de imagen al subir el archivo.

      btnSubir.onchange = () => {

        let pesoImg = (btnSubir.files[0].size/1048576).toFixed(2);

        if(Number(pesoImg)<=2){

          let reader = new FileReader();
          reader.readAsDataURL(btnSubir.files[0]);
          reader.onload = () => {
            imagenSelect.removeAttribute("src");
            imagenSelect.setAttribute("src", reader.result);
          }
          imagenNombre.textContent = btnSubir.files[0].name;
          erroresEditProd[4] = 0;
          verificarBtnGuardar();

        }else{

          erroresEditProd[4] = 1;
          verificarBtnGuardar();
          btnSubir.value = "";
          imagenNombre.innerHTML = `<span style="color:red; font-size:1.6rem;">La imagen es muy pesada (máximo 2mg)</span>`;

        }

      }

    //---------------------------------------------

    //

    function verificarBtnGuardar() {
      
      if(document.querySelector(".divPrin").getAttribute("tipo") == "producto"){

        if(datos[1]=="Mensuales"){

          let suma=0;
  
          for(let i=0; i<erroresEditProd.length; i++){
            suma = suma + erroresEditProd[i];
          }
  
          if(
            inputNombre.value != "" &&
            inputCatego.value != "" &&
            inputTipo.value != "" &&
            inputPreXMembre.value != "" && 
            inputDescrip.value != "" &&
            btnSubir.files[0] != "" &&
            suma==0
          ){
  
            btnGuardar.removeAttribute("disabled");
            btnGuardar.classList.replace("btnGuardar1", "btnGuardar2");
  
          }else{
  
            btnGuardar.setAttribute("disabled", "");
            btnGuardar.classList.replace("btnGuardar2", "btnGuardar1");
  
          }
  
        }else{
  
          if(datos[1]=="Individuales"){
  
            if(
              inputNombre.value != "" &&
              inputCatego.value != "" &&
              inputTipo.value != "" &&
              inputPreXMembre.value != "" && 
              inputPreXHora.value != "" &&
              inputPreXDia.value != "" &&
              inputPreXSemana.value != "" &&
              inputDescrip.value != "" &&
              btnSubir.files[0] != "" 
            ){
    
              btnGuardar.removeAttribute("disabled");
              btnGuardar.classList.replace("btnGuardar1", "btnGuardar2");
              
            }else{
  
              btnGuardar.setAttribute("disabled", "");
              btnGuardar.classList.replace("btnGuardar2", "btnGuardar1");
    
            }
  
          }
  
        }

      }else{

        if(document.querySelector(".divPrin").getAttribute("tipo") == "unidad"){

          let suma=0;
  
          for(let i=0; i<erroresEditProd.length; i++){
            suma = suma + erroresEditProd[i];
          }
  
          if(
            inputNombre.value != "" &&
            inputPreXHora.value != "" &&
            inputPreXDia.value != "" &&
            inputPreXSemana.value != "" &&
            inputDescrip.value != "" &&
            document.querySelector("#caracterisProd").value != "" &&
            btnSubir.files[0] != "" &&
            suma==0
          ){
  
            btnGuardar.removeAttribute("disabled");
            btnGuardar.classList.replace("btnGuardar1", "btnGuardar2");
  
          }else{
  
            btnGuardar.setAttribute("disabled", "");
            btnGuardar.classList.replace("btnGuardar2", "btnGuardar1");
  
          }

        }

      }

    }

    //

    inputNombre.oninput = () =>{
      verificarBtnGuardar ();
    }

    //

    inputCatego.addEventListener("click", ()=>{
      
      let valor = inputCatego.options[inputCatego.selectedIndex].text;

      if(valor == ""){
        erroresEditProd[5] = 1;
      }

      verificarBtnGuardar ();

    });

    //

    inputTipo.addEventListener("click", ()=>{

      let valor = inputTipo.options[inputTipo.selectedIndex].text;

      if(valor == ""){
        erroresEditProd[6] = 1;
      }

      verificarBtnGuardar ();
    
    });

    //

    if(document.querySelector(".divPrin").getAttribute("tipo") == "producto"){
      inputPreXMembre.oninput = () =>{

        let suma = inputPreXMembre.value; 
        
  
        suma = Number(suma);
        console.log(suma);
  
        if(isNaN(suma)){
  
          erroresEditProd[0] = 1;
          inputPreXMembre.style.outline = "1px solid red";
  
        }else{
  
          erroresEditProd[0] = 0;
          inputPreXMembre.style.outline = "none";
  
        }
  
        verificarBtnGuardar ();
  
      }
    }

    //
    
    inputPreXHora.oninput = () =>{
      
      let suma = inputPreXHora.value; 
      

      suma = Number(suma);
      console.log(suma);

      if(isNaN(suma)){

        erroresEditProd[1] = 1;
        inputPreXHora.style.outline = "1px solid red";

      }else{

        erroresEditProd[1] = 0;
        inputPreXHora.style.outline = "none";

      }

      verificarBtnGuardar ();

    }

    //

    inputPreXDia.oninput = () =>{

      let suma = inputPreXDia.value; 
      

      suma = Number(suma);
      console.log(suma);

      if(isNaN(suma)){

        erroresEditProd[2] = 1;
        inputPreXDia.style.outline = "1px solid red";

      }else{

        erroresEditProd[2] = 0;
        inputPreXDia.style.outline = "none";

      }

      verificarBtnGuardar ();
    
    }

    //

    inputPreXSemana.oninput = () =>{

      let suma = inputPreXSemana.value; 
      

      suma = Number(suma);
      console.log(suma);

      if(isNaN(suma)){

        erroresEditProd[3] = 1;
        inputPreXSemana.style.outline = "1px solid red";

      }else{

        erroresEditProd[3] = 0;
        inputPreXSemana.style.outline = "none";

      }

      verificarBtnGuardar ();

    }

    //

    inputDescrip.oninput = () =>{
      verificarBtnGuardar();
    }

    //--------------------------------------------------------------------

    // BOTONES

    //

    btnHabilEdicion.onclick = () =>{

      if(document.querySelector(".divPrin").getAttribute("tipo") == "producto"){

        if(datos[1]=="Mensuales"){

          inputNombre.removeAttribute("disabled"); 
          inputCatego.removeAttribute("disabled"); 
          inputTipo.removeAttribute("disabled"); 
          inputPreXMembre.removeAttribute("disabled"); 
          inputDescrip.removeAttribute("disabled"); 
  
          btnSubir.removeAttribute("disabled");
          btnLabel.classList.replace("labelSubirImg1", "labelSubirImg2");
          btnHabilEdicion.classList.replace("btnHabilitar1", "btnHabilitar2");
          btnHabilEdicion.setAttribute("disabled", "");
  
          verificarBtnGuardar();
          btnCancelar.removeAttribute("disabled");
          btnCancelar.classList.replace("btnCancelCambio1", "btnCancelCambio2");
  
        }else{
  
          if(datos[1]=="Individuales"){
  
            inputNombre.removeAttribute("disabled"); 
            inputCatego.removeAttribute("disabled"); 
            inputTipo.removeAttribute("disabled"); 
            inputPreXMembre.removeAttribute("disabled"); 
            inputPreXHora.removeAttribute("disabled"); 
            inputPreXDia.removeAttribute("disabled"); 
            inputPreXSemana.removeAttribute("disabled"); 
            inputDescrip.removeAttribute("disabled"); 
  
            btnSubir.removeAttribute("disabled");
            btnLabel.classList.replace("labelSubirImg1", "labelSubirImg2");
            btnHabilEdicion.classList.replace("btnHabilitar1", "btnHabilitar2");
            btnHabilEdicion.setAttribute("disabled", "");
  
            verificarBtnGuardar();
            btnCancelar.removeAttribute("disabled");
            btnCancelar.classList.replace("btnCancelCambio1", "btnCancelCambio2");
  
          }
          
        }

      }else{

        if(document.querySelector(".divPrin").getAttribute("tipo") == "unidad"){

          console.log("modo unidad");
          inputNombre.removeAttribute("disabled"); 
          inputPreXHora.removeAttribute("disabled"); 
          inputPreXDia.removeAttribute("disabled"); 
          inputPreXSemana.removeAttribute("disabled"); 
          inputDescrip.removeAttribute("disabled"); 
          document.querySelector("#caracterisProd").removeAttribute("disabled");
  
          btnSubir.removeAttribute("disabled");
          btnLabel.classList.replace("labelSubirImg1", "labelSubirImg2");
          btnHabilEdicion.classList.replace("btnHabilitar1", "btnHabilitar2");
          btnHabilEdicion.setAttribute("disabled", "");
  
          verificarBtnGuardar();
          btnCancelar.removeAttribute("disabled");
          btnCancelar.classList.replace("btnCancelCambio1", "btnCancelCambio2");

        }

      }
      
    }

    //
    
    btnCancelar.onclick = () => {

      if(document.querySelector(".divPrin").getAttribute("tipo") == "producto"){

        inputNombre.setAttribute("disabled", ""); 
        inputCatego.setAttribute("disabled", ""); 
        inputTipo.setAttribute("disabled", ""); 
        inputPreXMembre.setAttribute("disabled", ""); 
        inputPreXHora.setAttribute("disabled", ""); 
        inputPreXDia.setAttribute("disabled", ""); 
        inputPreXSemana.setAttribute("disabled", ""); 
        inputDescrip.setAttribute("disabled", ""); 

        inputNombre.value = datos[0]; 
        inputCatego.options[inputCatego.selectedIndex].text = datos[1]; 
        inputTipo.options[inputTipo.selectedIndex].text = datos[2]; 
        inputPreXMembre.value = datos[3]; 
        inputPreXHora.value = datos[4]; 
        inputPreXDia.value = datos[5]; 
        inputPreXSemana.value = datos[6]; 
        inputDescrip.value = datos[7];
        imagenSelect.removeAttribute("src");
        imagenSelect.setAttribute("src", datos[8]);
        imagenNombre.textContent = "";

        btnSubir.setAttribute("disabled", "");
        btnLabel.classList.replace("labelSubirImg2", "labelSubirImg1");
        btnHabilEdicion.classList.replace("btnHabilitar2", "btnHabilitar1");
        btnHabilEdicion.removeAttribute("disabled");

        btnGuardar.setAttribute("disabled", "");
        btnGuardar.classList.replace("btnGuardar2", "btnGuardar1");
        btnCancelar.setAttribute("disabled", "");
        btnCancelar.classList.replace("btnCancelCambio2", "btnCancelCambio1");

      }else{

        if(document.querySelector(".divPrin").getAttribute("tipo") == "unidad"){

          inputNombre.setAttribute("disabled", ""); 
          inputPreXHora.setAttribute("disabled", ""); 
          inputPreXDia.setAttribute("disabled", ""); 
          inputPreXSemana.setAttribute("disabled", ""); 
          inputDescrip.setAttribute("disabled", ""); 
          document.querySelector("#caracterisProd").setAttribute("disabled", "");
  
          inputNombre.value = datos[0];  
          inputPreXHora.value = datos[1]; 
          inputPreXDia.value = datos[2]; 
          inputPreXSemana.value = datos[3]; 
          inputDescrip.value = datos[4];
          document.querySelector("#caracterisProd").value = datos[5];
          imagenSelect.removeAttribute("src");
          imagenSelect.setAttribute("src", datos[6]);
          imagenNombre.textContent = "";
  
          btnSubir.setAttribute("disabled", "");
          btnLabel.classList.replace("labelSubirImg2", "labelSubirImg1");
          btnHabilEdicion.classList.replace("btnHabilitar2", "btnHabilitar1");
          btnHabilEdicion.removeAttribute("disabled");
  
          btnGuardar.setAttribute("disabled", "");
          btnGuardar.classList.replace("btnGuardar2", "btnGuardar1");
          btnCancelar.setAttribute("disabled", "");
          btnCancelar.classList.replace("btnCancelCambio2", "btnCancelCambio1");

        }

      }

    }

    //

    btnGuardar.onclick = () => {

      if(document.querySelector(".divPrin").getAttribute("tipo") == "producto"){

        let suma=0;

        for(let i=0; i<erroresEditProd.length; i++){
          suma = suma + erroresEditProd[i];
        }
  
  
        if(suma==0){
  
          let id = document.querySelector("#idprod").value;
  
          let formActuProduct = new FormData();
  
          formActuProduct.append("prodId", id);
          formActuProduct.append("prodNom", inputNombre.value);
          formActuProduct.append("prodCatego", inputCatego.value);
          formActuProduct.append("prodTipo", inputTipo.value);
          formActuProduct.append("prodPrecio", inputPreXMembre.value);
          formActuProduct.append("prodPreXHora", inputPreXHora.value);
          formActuProduct.append("prodPreXDia", inputPreXDia.value);
          formActuProduct.append("prodPreXSemana", inputPreXSemana.value);
          formActuProduct.append("prodDescrip", inputDescrip.value);
          formActuProduct.append("prodImg", btnSubir.files[0]);
          formActuProduct.append("editProd", true);
  
          fetch(urlBuscarInfoAdminDB, {
            method: "POST",
            body: formActuProduct,
          })
            .then((response) => response.json())
            .then((data) => {
              //
              
              datos[0] = data[0];
              datos[1] = data[1];
              datos[2] = data[2];
              datos[3] = data[3];
              datos[4] = data[4];
              datos[5] = data[5];
              datos[6] = data[6];
              datos[7] = data[7];
              datos[8] = data[8];
  
              inputNombre.value = data[0];
              inputCatego.value = data[1];
              inputTipo.value = data[2];
              inputPreXMembre.value = data[3];
              inputPreXHora.value = data[4];
              inputPreXDia.value = data[5]; 
              inputPreXSemana.value = data[6]; 
              inputDescrip.value = data[7];
              imagenSelect.removeAttribute("src");
              imagenSelect.setAttribute("src", "images/productosImages/"+data[8]);
              imagenNombre.textContent = "";
  
              //
            })
            .catch((err) => console.log(err));
  
        }

      }else{

        if(document.querySelector(".divPrin").getAttribute("tipo") == "unidad"){

          let suma=0;

          for(let i=0; i<erroresEditProd.length; i++){
            suma = suma + erroresEditProd[i];
          }
    
    
          if(suma==0){
    
            let id = document.querySelector("#idprod").value; 
    
            let formActuProduct = new FormData();
            
            console.log(document.querySelector("#caracterisProd").value);

            formActuProduct.append("prodId", id);
            formActuProduct.append("prodNom", inputNombre.value);
            formActuProduct.append("prodPreXHora", inputPreXHora.value);
            formActuProduct.append("prodPreXDia", inputPreXDia.value);
            formActuProduct.append("prodPreXSemana", inputPreXSemana.value);
            formActuProduct.append("prodDescrip", inputDescrip.value);
            formActuProduct.append("prodCaracte", document.querySelector("#caracterisProd").value);
            formActuProduct.append("prodImg", btnSubir.files[0]);
            formActuProduct.append("editUnidad", true);
    
            fetch(urlBuscarInfoAdminDB, {
              method: "POST",
              body: formActuProduct,
            })
              .then((response) => response.json())
              .then((data) => {
                //
                
                datos[0] = data[0];
                datos[1] = data[1];
                datos[2] = data[2];
                datos[3] = data[3];
                datos[4] = data[4];
                datos[5] = data[5];
                datos[6] = data[6];
    
                inputNombre.value = data[0];
                inputPreXHora.value = data[1];
                inputPreXDia.value = data[2]; 
                inputPreXSemana.value = data[3]; 
                inputDescrip.value = data[4];
                document.querySelector("#caracterisProd").value = data[5];
                imagenSelect.removeAttribute("src");
                imagenSelect.setAttribute("src", "images/productosImages/"+data[6]);
                imagenNombre.textContent = "";
                
                console.log(data);

                //
              })
              .catch((err) => console.log(err));
    
          }

        }

      }

    }

    //

    btnBorrarProd.onclick = (e) => {

      e.preventDefault();
      swal
        .fire({
          title: "Se va a eliminar un producto",
          text: "No se podrá recuperar la información, ¿está seguro de querer continuar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar Producto",
          cancelButtonText: "Cancelar",
        })
        .then((value) => {
          if (value.isConfirmed) {
          //

            document.querySelector("#formEliminarProd").submit();

          //
          } else {
            return false;
          }
        });

    }

    //

    if(btnPanelEditor != null){

      btnPanelEditor.addEventListener("click", ()=>{

        if(btnPanelEditor.classList.contains("selectedBtn") == false){
  
          btnPanelEstadis.classList.remove("selectedBtn");
          btnPanelEditor.classList.add("selectedBtn");
          divEstadisGene.style.opacity = "0";
          divEstadisGene.style.zIndex = "-500";
          document.querySelector(".cubiertaPanelEdit").style.zIndex = "-200";
          divDataEditGene.style.opacity = "1";
          btnDivPrin.style.boxShadow = "0.4rem 0.4rem 0.4rem #33333355";
          btnDivPrin.style.backgroundColor = "#E7E6E6";
  
        }
  
      });

    }

    //

    if(btnPanelEstadis != null){

      btnPanelEstadis.addEventListener("click", ()=>{

        if(btnPanelEstadis.classList.contains("selectedBtn") == false){
  
          btnPanelEstadis.classList.add("selectedBtn");
          btnPanelEditor.classList.remove("selectedBtn");
          divEstadisGene.style.opacity = "1";
          divEstadisGene.style.zIndex = "500";
          document.querySelector(".cubiertaPanelEdit").style.zIndex = "200";
          divDataEditGene.style.opacity = "0";
          btnDivPrin.style.boxShadow = "none";
          btnDivPrin.style.backgroundColor = "#C8D2D7";
  
        }
  
      });

    }

    //

    if(btnPanelEditUnid != null){

      btnPanelEditUnid.addEventListener("click", ()=>{

        if(btnPanelEditUnid.classList.contains("selectedBtn") == false){
  
          btnPanelEstadisUnid.classList.remove("selectedBtn");
          btnPanelEditUnid.classList.add("selectedBtn");
          divEstadisUnid.style.opacity = "0";
          divEstadisUnid.style.zIndex = "-500";
          document.querySelector(".cubiertaPanelEdit").style.zIndex = "-200";
          divDataEditGene.style.opacity = "1";
          btnDivPrin.style.boxShadow = "0.4rem 0.4rem 0.4rem #33333355";
          btnDivPrin.style.backgroundColor = "#E7E6E6";
  
        }
  
      });

    }

    //

    if(btnPanelEstadisUnid != null){

      btnPanelEstadisUnid.addEventListener("click", ()=>{

        if(btnPanelEstadisUnid.classList.contains("selectedBtn") == false){
  
          btnPanelEditUnid.classList.remove("selectedBtn");
          btnPanelEstadisUnid.classList.add("selectedBtn");
          divEstadisUnid.style.opacity = "1";
          divEstadisUnid.style.zIndex = "500";
          document.querySelector(".cubiertaPanelEdit").style.zIndex = "200";
          divDataEditGene.style.opacity = "0";
          btnDivPrin.style.boxShadow = "none";
          btnDivPrin.style.backgroundColor = "#C8D2D7";
  
        }
  
      });

    }

    if(document.querySelector("#estadisSTD").value == true){
    
      if(btnPanelEstadis != null){

        if(btnPanelEstadis.classList.contains("selectedBtn") == false){
  
          btnPanelEstadis.classList.add("selectedBtn");
          btnPanelEditor.classList.remove("selectedBtn");
          divEstadisGene.style.opacity = "1";
          divEstadisGene.style.zIndex = "500";
          document.querySelector(".cubiertaPanelEdit").style.zIndex = "200";
          divDataEditGene.style.opacity = "0";
          btnDivPrin.style.boxShadow = "none";
          btnDivPrin.style.backgroundColor = "#C8D2D7";
  
        }
  
      }else{

        if(btnPanelEstadisUnid != null){

          if(btnPanelEstadisUnid.classList.contains("selectedBtn") == false){
  
            btnPanelEditUnid.classList.remove("selectedBtn");
            btnPanelEstadisUnid.classList.add("selectedBtn");
            divEstadisUnid.style.opacity = "1";
            divEstadisUnid.style.zIndex = "500";
            document.querySelector(".cubiertaPanelEdit").style.zIndex = "200";
            divDataEditGene.style.opacity = "0";
            btnDivPrin.style.boxShadow = "none";
            btnDivPrin.style.backgroundColor = "#C8D2D7";
    
          }

        }

      }

    }

    //

    //--------------------------------------------------------------------------------

  //-- Main FIN --//

}

//--------------------------------------
//<<-- EDITARPROD.PHP | FIN -->>
//--------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//-----------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------
//<<-- CREARPROD.PHP | INICIO -->>
//--------------------------------------

if(document.querySelector(".crearProdHTML")){

  //-- Header INICIO --//

  //Mostrar y ocultar panel perfil

    const flechaPerfilDiv = document.querySelector(".divFlecha");
    const cuadroOPerfil = document.querySelector(".cuadroPOculto");

    const flechaPerfil = document.querySelector(".flechaIconPerfil");

    const btnCerrarSesion = document.querySelector(".btnCerrar");

    //--------------------------------------------------------------------------

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

    btnCerrarSesion.addEventListener("click", (e) => {
      window.location.href = "cerrar.php";
    });

    if(document.querySelector("#cuadroPOculto") != null){

      window.addEventListener('click', function mostrarCuadroPerfil(e) {

          if (document.getElementById('divFlecha').contains(e.target)) {
              

          } else {
                  
              document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
              flechaPerfil.classList.replace("flecha2", "flecha1");

          }

      });

    }

  //-- Header FIN --//

  //

  //-- Main INICIO --//

    // ELEMENTOS

    const btnCrear = document.querySelector(".btnCrear");
    const btnSubir = document.querySelector("#subirImagenBtn");
    const btnCancelar = document.querySelector(".btnCancelar");

    const divGeneral = document.querySelector(".divPrin");

    const inputNombre = document.querySelector("#nomCreaPInput");
    const inputCatego = document.querySelector("#selectCatego");
    const inputPreMensuales = document.querySelector("#precioCreaPInput");
    const inputPH = document.querySelector("#preXHora");
    const inputPD = document.querySelector("#preXDia");
    const inputPS = document.querySelector("#preXSema");
    const inputDescrip = document.querySelector("#descripcionProd");
    const inputCaracteris = document.querySelector("#caracterProd");

    const imagenSelect = document.querySelector("#imagenSelected");

    //---------------------------------------------------------

    //

    // GLOBALES

    var erroresInputs = [8];
    erroresInputs[0] = 0;
    erroresInputs[1] = 0;
    erroresInputs[2] = 0;
    erroresInputs[3] = 0;
    erroresInputs[4] = 0;
    erroresInputs[5] = 0;
    erroresInputs[6] = 0;
    erroresInputs[7] = 0;

    var stdCrear = divGeneral.getAttribute("tipo");

    //------------------------------------------------------

    //

    // FUNCIONES

    if(inputCatego!=null){

      function verificarCategoria () {

        if(selectCatego.value == "Mensuales"){

          document.querySelector("#categoriaInputOculto").value = "mensuales";
          
          if(inputPreMensuales.getAttribute("disabled") != null){
            
            inputPreMensuales.value = 0;
            inputPreMensuales.removeAttribute("disabled");
          
          }

          inputPH.value = 0;
          inputPD.value = 0;
          inputPS.value = 0;

          inputPH.setAttribute("disabled", "");
          inputPD.setAttribute("disabled", "");
          inputPS.setAttribute("disabled", "");

        }else{

          if(selectCatego.value == "Individuales"){

            document.querySelector("#categoriaInputOculto").value = "individuales";

            if(inputPreMensuales.getAttribute("disabled") == null){
              
              inputPreMensuales.value = 0;
              inputPreMensuales.setAttribute("disabled", "");
            
            }

            inputPH.value = 0;
            inputPD.value = 0;
            inputPS.value = 0;
    
            inputPH.removeAttribute("disabled");
            inputPD.removeAttribute("disabled");
            inputPS.removeAttribute("disabled");

          }

        }

      }
    
    }

    if(inputCatego!=null){
      verificarCategoria ();
    }

    function verificarBtnGuardar () {
    //

      if(stdCrear == "producto"){
        
        let suma = 0;

        for(let i=0; i<erroresInputs.length; i++){
          suma = suma + erroresInputs[i];
        }
  
        if(
          inputNombre.value != "" &&
          inputCatego.value != "" &&
          inputPreMensuales.value != "" && 
          inputPH.value != "" &&
          inputPD.value != "" &&
          inputPS.value != "" &&
          inputDescrip.value != "" &&
          btnSubir.files.length != "" &&
          suma==0
        ){
  
          btnCrear.removeAttribute("disabled");
          btnCrear.classList.replace("btnCrear1", "btnCrear2");
  
        }else{
  
          btnCrear.setAttribute("disabled", "");
          btnCrear.classList.replace("btnCrear2", "btnCrear1");
  
        }   

      }else{

        if(stdCrear == "unidad"){

          let suma = 0;

          for(let i=0; i<erroresInputs.length; i++){
            suma = suma + erroresInputs[i];
          }
    
          if(
            inputNombre.value != "" &&
            inputPH.value != "" &&
            inputPD.value != "" &&
            inputPS.value != "" &&
            inputDescrip.value != "" &&
            inputCaracteris.value != "" &&
            btnSubir.files.length != "" &&
            suma==0
          ){
    
            btnCrear.removeAttribute("disabled");
            btnCrear.classList.replace("btnCrear1", "btnCrear2");
    
          }else{
    
            btnCrear.setAttribute("disabled", "");
            btnCrear.classList.replace("btnCrear2", "btnCrear1");
    
          } 
    
        }

      }

      
    //
    }

    verificarBtnGuardar();

    //-----------------------------------------------------------

    //

    // EVENTOS

    if(btnSubir.files.length == 0){

      erroresInputs[6] = 1;
      verificarBtnGuardar();

    }else{

      erroresInputs[6] = 0;
      verificarBtnGuardar();

    }

    btnSubir.onchange = () => {

      if(btnSubir.files.length == 0){

        console.log("imagen vacia")
        erroresInputs[6] = 1;
        verificarBtnGuardar();
  
      }else{
  
        erroresInputs[6] = 0;
        verificarBtnGuardar();
  
      }

      let pesoImg = (btnSubir.files[0].size/1048576).toFixed(2);

      if(Number(pesoImg)<=2){

        let reader = new FileReader();
        reader.readAsDataURL(btnSubir.files[0]);
        reader.onload = () => {
          imagenSelect.removeAttribute("src");
          imagenSelect.setAttribute("src", reader.result);
        }
        imagenNombre.textContent = btnSubir.files[0].name;
        erroresInputs[6] = 0;
        verificarBtnGuardar();

      }else{

        erroresInputs[6] = 1;
        verificarBtnGuardar();
        btnSubir.value = "";
        imagenNombre.innerHTML = `<span style="color:red; font-size:1.6rem;">La imagen es muy pesada (máximo 2mg)</span>`;

      }

    }

    btnCancelar.addEventListener("click", (e)=>{

      e.preventDefault();

    });

    inputNombre.addEventListener("input", () => {

      verificarBtnGuardar();

    });


    if(stdCrear == "producto"){

      inputCatego.addEventListener("click", () => {

        verificarCategoria ();

        if(inputCatego.options[inputCatego.selectedIndex].text == ""){

          erroresInputs[0] = 1;
          inputCatego.style.outline = "1px solid red";

        }else{

          erroresInputs[0] = 0;
          inputCatego.style.outline = "none";

        };

        verificarBtnGuardar();

      });

    }

    if(stdCrear == "producto"){

      inputPreMensuales.addEventListener("input", () => {

        let estado = 0;

        estado = Number(inputPreMensuales.value);

        if(isNaN(estado) || inputPreMensuales.value == ""){

          erroresInputs[1] = 1;
          inputPreMensuales.style.outline = "1px solid red";

        }else{

          erroresInputs[1] = 0;
          inputPreMensuales.style.outline = "none";

        }

        verificarBtnGuardar();

      });

    }

    inputPH.addEventListener("input", () => {

      let estado = 0;

      estado = Number(inputPH.value);

      if(isNaN(estado) || inputPH.value == ""){

        erroresInputs[2] = 1;
        inputPH.style.outline = "1px solid red";

      }else{

        erroresInputs[2] = 0;
        inputPH.style.outline = "none";

      }

      verificarBtnGuardar();

    })

    inputPD.addEventListener("input", () => {

      let estado = 0;

      estado = Number(inputPD.value);

      if(isNaN(estado) || inputPD.value == ""){

        erroresInputs[3] = 1;
        inputPD.style.outline = "1px solid red";

      }else{

        erroresInputs[3] = 0;
        inputPD.style.outline = "none";

      }

      verificarBtnGuardar();

    });

    inputPS.addEventListener("input", () => {

      let estado = 0;

      estado = Number(inputPS.value);

      if(isNaN(estado) || inputPS.value == ""){

        erroresInputs[4] = 1;
        inputPS.style.outline = "1px solid red";

      }else{

        erroresInputs[4] = 0;
        inputPS.style.outline = "none";

      }

      verificarBtnGuardar();

    });

    inputDescrip.addEventListener("input", () => {

      if(inputDescrip.value == ""){

        erroresInputs[5] = 1;
        inputDescrip.style.outline = "1px solid red";

      }else{

        erroresInputs[5] = 0;
        inputDescrip.style.outline = "none";

      }

      verificarBtnGuardar();

    });

    if(stdCrear == "unidad"){

      inputCaracteris.addEventListener("input", ()=>{
      
        if(inputCaracteris.value == ""){
  
          erroresInputs[7] = 1;
          inputCaracteris.style.outline = "1px solid red";
  
        }else{
  
          erroresInputs[7] = 0;
          inputCaracteris.style.outline = "none";
  
        }
  
        verificarBtnGuardar();
    
      });

    }

    //-----------------------------------------------------------

  //
}

//--------------------------------------
//<<-- CREARPROD.PHP | FIN -->>
//--------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//-----------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------
//<<-- TRANSACCION EXITOSA.PHP | INICIO -->>
//---------------------------------------------

if(document.querySelector(".transaExitosaHTML") != null){

  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", (e)=>{
    
    document.querySelector("#tituloReseRegisFac").value = response.data.x_extra1;
    document.querySelector("#activiRese").value = response.data.x_extra2; 
    document.querySelector("#idUserRese").value = response.data.x_extra3; 
    document.querySelector("#idProdRese").value = response.data.x_extra4;
    document.querySelector("#idUnidRese").value = response.data.x_extra5;
    document.querySelector("#numPersoRese").value = response.data.x_extra6;
    document.querySelector("#tipoRese").value = response.data.x_extra7;
    document.querySelector("#cantHorasXH").value = response.data.x_extra8;
    document.querySelector("#cantMinusXH").value = response.data.x_extra9;
    document.querySelector("#diaReseXH").value = response.data.x_extra10;
    document.querySelector("#horaReseXH").value = response.data.x_extra11;
    document.querySelector("#diaReseXD").value = response.data.x_extra12;
    document.querySelector("#cantDias").value = response.data.x_extra13;
    document.querySelector("#semanaReseFechas").value = response.data.x_extra14;
    document.querySelector("#ivaPdt").value = response.data.x_extra15;
    document.querySelector("#descuPdt").value = response.data.x_extra16;
    document.querySelector("#reseCodigo").value = response.data.x_extra17;
    document.querySelector("#referenceEpaycoRese").value = response.data.x_ref_payco;
    document.querySelector("#codigoFacRese").value = response.data.x_id_factura;
    document.querySelector("#numCuotasRese").value = response.data.x_quotas;
    document.querySelector("#transaTipoPago").value = response.data.x_type_payment;
    document.querySelector("#franquicieCard").value = response.data.x_franchise;

    document.querySelector("#indexRegistroFacRese").submit();

  });

}

//---------------------------------------------
//<<-- TRANSACCION EXITOSA.PHP | FIN -->>
//---------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//-----------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------
//<<-- AJUSTES CUENTA.PHP | INICIO -->>
//------------------------------------------

if(document.querySelector(".ajustesCuentaHTML") != null){


  const flechaPerfilDivAC = document.querySelector(".divFlecha");
  const flechaPerfilAC = document.querySelector(".flechaIconPerfil");
  const btnCerrarSesionAC = document.querySelector(".btnCerrar");

  const cuadroOPerfilAC = document.querySelector(".cuadroPOculto");

  // Flecha botón - Mostrar y ocultar PANEL PERFIL
  flechaPerfilDivAC.addEventListener("click", () => {
    if (flechaPerfilAC.classList.contains("flecha1")) {
      flechaPerfilAC.classList.replace("flecha1", "flecha2");
      cuadroOPerfilAC.classList.replace("cuadroOPerfil1", "cuadroOPerfil2");
    } else {
      if (flechaPerfilAC.classList.contains("flecha2")) {
        flechaPerfilAC.classList.replace("flecha2", "flecha1");
        cuadroOPerfilAC.classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
      }
    }
  });
    
    // Botón Cerrar Sesión - PANEL PERFIL
    btnCerrarSesionAC.addEventListener("click", (e) => {

      window.location.href = "cerrar.php";

    });
    //-----------------------------------------------------------------------------

  //----------------------------------------------------------------------------

}

//------------------------------------------
//<<-- AJUSTES CUENTA.PHP | FIN -->>
//------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

const otrosUsuariosSelec = [];
let usuarioMiembroSeleccionado = null;



function mostrarInformacionMiembro(usuario) {
    const nombreUsuario = document.querySelector("#nombreUsuario");
    const membresiaUsuario = document.querySelector("#membresiaUsuario");
    const direccionUsuario = document.querySelector("#direccionUsuario");
    const cedulaUsuario = document.querySelector("#cedulaUsuario");
    const celularUsuario = document.querySelector("#celularUsuario");
    const correoUsuario = document.querySelector("#correoUsuario");
    const inO_idUserNR = document.querySelector("#inO_idUserNR");

    nombreUsuario.textContent = `${usuario.user_nombre} ${usuario.user_apellido}`;
    membresiaUsuario.textContent = usuario.membre_nombre || "Membresía no disponible"; 
    direccionUsuario.textContent = usuario.user_direc;
    correoUsuario.textContent = usuario.user_correo;
    celularUsuario.textContent = usuario.user_celular;
    cedulaUsuario.textContent = usuario.user_documento;
    inO_idUserNR.value = usuario.id_usuario;
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// DOM - FINAL
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 

// Funciones para buscar otros usuarios y mostrar la informacion de cada uno

function buscarOtrosUsuario() {
    const input = document.getElementById('inputOtrosMiembro');
    const query = input.value.toLowerCase();
    const resultadosDiv = document.getElementById('resultadosOtros');
    resultadosDiv.innerHTML = '';

    if (query) {
        fetch(`administracion.php?query=${query}`)
            .then(response => response.json())
            .then(usuarios => {
                usuarios.forEach(usuario => {
                    if (usuarioMiembroSeleccionado && usuario.user_documento === usuarioMiembroSeleccionado.user_documento) {
                        return;
                    }

                    const usuarioDiv = document.createElement('div');
                    usuarioDiv.classList.add('usuarioResultado');
                    usuarioDiv.innerHTML = `
                        <div style="display: flex; align-items: center; margin: 5px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                            <img src="${usuario.user_imagen}" alt="${usuario.user_nombre} ${usuario.user_apellido}" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
                            <div>
                                <strong>${usuario.user_nombre} ${usuario.user_apellido}</strong><br>
                                <span>${usuario.user_cargo} - ${usuario.user_empresa}</span>
                            </div>
                        </div>
                    `;

                    usuarioDiv.addEventListener('click', () => {
                        if (!otrosUsuariosSelec.find(u => u.user_documento === usuario.user_documento)) {
                            otrosUsuariosSelec.push(usuario);
                        } 

                        mostrarUsuariosSeleccionados();
                        resultadosDiv.innerHTML = ''; 
                    });

                    resultadosDiv.appendChild(usuarioDiv);
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }
}

function mostrarUsuariosSeleccionados() {
    const seleccionadosDiv = document.getElementById('resultadosOtrosSeleccionados');
    seleccionadosDiv.innerHTML = otrosUsuariosSelec.map(usuario => `
        <div class="usuarioSeleccionado" style="display: flex; align-items: center; margin: 5px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; flex-shrink: 0;">
            <img src="${usuario.user_imagen}" alt="${usuario.user_nombre} ${usuario.user_apellido}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 5px;">
            <div>
                <strong>${usuario.user_nombre} ${usuario.user_apellido}</strong>
            </div>
        </div>
    `).join('');

    const nombreOtrosUsuarios = document.querySelector("#nombreOtrosUsuarios");
    const inO_idOtrosUsersNR = document.querySelector("#inO_idOtrosUsersNR");
    nombreOtrosUsuarios.textContent = otrosUsuariosSelec.map(u => `${u.user_nombre} ${u.user_apellido}`).join(', ');
    inO_idOtrosUsersNR.value = otrosUsuariosSelec.map(u => `${u.id_usuario}`).join(', ');
}

////////////////////////////////////

function imprimirFactura() {
}
//----------------------------------------------------------------------------------------------------------------------------------------------
// FUNCIONES GLOBALES - INCIO

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Variables Globales

    // var urlInfoAdmin = "http://165.22.176.119/BizLab/consultarInfoAdmin.php";
    // var urlConfirTDC = "http://165.22.176.119/BizLab/confirTarjetaCredito.php";
    // var urlCreaFacMembre = "http://165.22.176.119/BizLab/registrarFacMembre.php";
    // var urlGuardaTokenUser = "http://165.22.176.119/BizLab/guardarMiembroEpayco.php";
    // var urlCrearSub = "http://165.22.176.119/BizLab/crearSubNueva.php";
    // var urlCrearUserToken = "http://165.22.176.119/BizLab/crearUserToken.php";
    // var urlModoCLienteData = "http://165.22.176.119/BizLab/consultarInfoCliente.php";
    var urlInfoAdmin = "http://localhost/BizLab/consultarInfoAdmin.php";
    var urlConfirTDC = "http://localhost/BizLab/confirTarjetaCredito.php";
    var urlCreaFacMembre = "http://localhost/BizLab/registrarFacMembre.php";
    var urlGuardaTokenUser = "http://localhost/BizLab/guardarMiembroEpayco.php";
    var urlCrearSub = "http://localhost/BizLab/crearSubNueva.php";
    var urlCrearUserToken = "http://localhost/BizLab/crearUserToken.php";
    var urlModoCLienteData = "http://localhost/BizLab/consultarInfoCliente.php";

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
        
    //------------------------------------------------------------------------------------------------------------------------------------------
    
    // Crear Fecha
    function crearFecha(){

        let dia = new Date().getDate();
        let diaSema = new Date().getDay();
        let mes = new Date().getMonth()+1;
        let anio = new Date().getFullYear();

        let diaTexto = dia < 10 ? "0"+dia : dia;
        let mesTexto = mes < 10 ? "0"+mes : dia;
        let anioTexto = String(anio);

        return [dia, diaSema, mes, anio, diaTexto, mesTexto, anioTexto];

    }

    // Sumar o restar dias a una fecha
    function sumaRestaFecha(fecha, operacion, dias) {

        var date = fecha.split("-"),
        hoy = new Date(Number(date[0]), Number(date[1]), Number(date[2])),
        dias = parseInt(dias),
        calculado = new Date(),
        dateResul = operacion == "sumar" ? hoy.getDate() + dias : hoy.getDate() - dias;

        calculado.setDate(dateResul);

        let diaN = calculado.getDate() < 10 ? "0"+calculado.getDate() : calculado.getDate();
        let mesN = (calculado.getMonth() + 1) < 10 ? "0"+(calculado.getMonth() + 1) : (calculado.getMonth() + 1);
        let anioN = String(calculado.getFullYear());

        let diaIntN = calculado.getDate();
        let diaSemaIntN = calculado.getDay();
        let mesIntN = calculado.getMonth() + 1;
        let anioIntN = calculado.getFullYear();
        
        let resultado =
        calculado.getFullYear() +
        "-" +
        mesN +
        "-" +
        diaN;

        return [resultado, diaN, mesN, anioN, diaIntN, diaSemaIntN, mesIntN, anioIntN];
        
    }

    // Funcion para definir que dia de la semana es tal fecha
    function diaSemanaNumero(fecha){

        let fechaElegida = fecha.split("-");

        let diaSemana = new Date(Number(fechaElegida[0]), Number(fechaElegida[1])-1, Number(fechaElegida[2])).getDay();

        return diaSemana;

    }

    // Crear HORA (Formato: 00:00 AM/PM)
    function crearHora(horaYMinu, horaMedir){

        let hora = new Date().getHours();
        let hora24 = new Date().getHours();
        let minu = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        let meridiano = "";
        let horaDevuelta = "";
        let horaMedidaDecuelta = "";

        if(horaYMinu == 1){
            
            if(hora < 12){
                meridiano = "AM";
            }else{
                meridiano = "PM"
            }
    
            if(hora > 12){
                hora = hora - 12;
            }

            if(hora < 10){
                hora = "0"+hora;
            }

            if(minu < 10){
                minu = "0"+minu;
            }

            if(hora24 < 10){
                hora24 = "0"+hora24;
            }

            if(seconds<10){
                seconds = "0"+seconds;
            }
            
            horaDevuelta = [hora, minu, seconds, meridiano, hora24];

            return horaDevuelta;

        }else{

            if(horaMedir != ""){

                // Hora Ingresada
                let horaIngre = horaMedir; 

                let horaYMinutos = (horaMedir.substring(0,5)).split(":"); 
                let meridianoIngre = horaMedir.substring(6,8);

                horaIngre = (Number(horaYMinutos[0])*60)+Number(horaYMinutos[1]);

                if(meridianoIngre == "PM" && Number(horaYMinutos[0]) != 12){
                horaIngre += 720;
                }
                //-----------------------------------------------------------------------------

                // Hora Actual
                let horaActual = new Date().getHours();
                let minusActuales = new Date().getMinutes();
                let meridianoActu = "";
                let sumaHoraActual = 0;

                if(horaActual < 12){
                meridianoActu = "AM"
                }else{
                meridianoActu = "PM"
                }

                sumaHoraActual = (horaActual*60)+minusActuales;

                if(meridianoActu == "PM" && horaActual != 12){
                sumaHoraActual += 720;
                }

                //-----------------------------------------------------------------------------

                if(horaIngre < sumaHoraActual){
                horaMedidaDecuelta = "anterior"
                }else{
                if(horaIngre == sumaHoraActual){
                    horaMedidaDecuelta = "igual"
                }else{
                    horaMedidaDecuelta = "posterior"
                }
                }

                return horaMedidaDecuelta;

            }

        }

    }

    // Crear el Código de la Factura
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

    // Convertir minutos a horas
    function minutosAHora(minutos){

        let hora = parseInt(Number(minutos/60));
        let meri = hora < 12 ? "AM" : "PM";
        let minu = Number(minutos)-((parseInt(Number(minutos/60)))*60);
        hora = hora > 12 ? hora - 12 : hora;
        
        let minuTexto = minu < 10 ? "0"+minu : minu;
        let horaFinalSinCero = hora+":"+minuTexto+" "+meri;

        return horaFinalSinCero; 

    }

    // Convertir hora a minutos
    function horaAMinutos(hora){

        let horaFinal = 0;

        if(hora.includes("AM") || hora.includes("PM")){

            let horaSeparada = hora.split(":");
            let minutos = horaSeparada[1].split(" ");
            let meridiano = minutos[1];
            minutos = Number(minutos[0]);

            horaFinal = (Number(horaSeparada[0])*60)+minutos;

            if(meridiano == "PM" && horaSeparada[0] != 12){
                horaFinal += 720;
            }

        }else{

            let horaSeparada = hora.split(":");
            
            horaFinal = Number(horaSeparada[0]*60)+Number(horaSeparada[1]);

        }

        return horaFinal;

    };

// FUNCIONES GLOBALES - FIN
//----------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------
//<<-- MEMBRESIAS CLIENTE.PHP | INICIO -->>
//------------------------------------------

if(document.querySelector(".membreClienteHTML") != null){

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Tomando Elementos del DOM

        //const btnsUnirseAhora = document.querySelectorAll(".btnUnirse");
        const cuadroOPerfil = document.querySelector(".cuadroPOculto");
        const flechaPerfilDiv = document.querySelector(".divPerfil");
        const btnCerrarSesion = document.querySelector(".btnCerrar");
        const ajustesCuentaBtn = document.querySelector("#ajustesCuentaBtn");

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    // FUNCIONES - INICIO

    function comprarMembresia(id, formId){

        event.preventDefault();
        document.querySelector("#"+formId).submit();

    }

    // FUNCIONES - FIN
    //------------------------------------------------------------------------------------------------------------------------------------------


    //------------------------------------------------------------------------------------------------------------------------------------------
    // EVENTOS - INICIO

    if(document.querySelector("#cuadroPOculto") != null){

        window.addEventListener('click', function mostrarCuadroPerfil(e) {

            if (document.getElementById('divPerfil').contains(e.target)) {
                

            } else {
                    
                document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");

            }

        });

    }

    flechaPerfilDiv.addEventListener("click", () => {
    if (cuadroOPerfil.classList.contains("cuadroOPerfil1")) {
        cuadroOPerfil.classList.replace("cuadroOPerfil1", "cuadroOPerfil2");
    } else {
        if (cuadroOPerfil.classList.contains("cuadroOPerfil2")) {
        cuadroOPerfil.classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
        }
    }
    });

    // Botón AJUSTES DE LA CUENTA - PANEL PERFIL
    ajustesCuentaBtn.addEventListener("click", (e) => {
        
        e.preventDefault();
        window.location.href = "usuarioPerfil.php";

    })
    
    // Botón Cerrar Sesión - PANEL PERFIL
    btnCerrarSesion.addEventListener("click", (e) => {

        window.location.href = "cerrar.php";

    });
    
    // EVENTOS - FIN
    //------------------------------------------------------------------------------------------------------------------------------------------

}

//---------------------------------------
//<<-- MEMBRESIAS CLIENTE.PHP | FIN -->>
//---------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------
//<<-- MEMBRESIAS CLIENTE DETAIL.PHP | INICIO -->>
//-------------------------------------------------

if(document.querySelector(".membreCliDetailHTML") != null){

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Tomando elementos del DOM

        // INPUTS
        const inputTarjeNum = document.querySelector("#numTarjetaInput");
        const inputMesVTarje = document.querySelector("#selectMesTarjeta");
        const inputAnioVTarje = document.querySelector("#añoVTarjetaInput");
        const inputCVCTarje = document.querySelector("#cvcInput");

        // CONTENEDORES
        const cuadroOPerfil = document.querySelector(".cuadroPOculto");

        // BOTONES
        const flechaPerfilDiv = document.querySelector(".divPerfil");
        const btnCerrarSesion = document.querySelector(".btnCerrar");
        const ajustesCuentaBtn = document.querySelector("#ajustesCuentaBtn");
        const btnSig = document.querySelector(".btnSig");
        const btnVol = document.querySelector(".btnVol");
        
        const spanErr = document.querySelector(".spanErr");
        
    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Variables GLOBALES Y CONSTANTES

        var erroresInput = [1,1,1,1];

        // Variables de bloqueo
        var btnSiguienteDispon = 0;

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    // FUNCIONES - INICIO

        let sumaErrores = 0;

        function comprobarErrores(){

            for(let i = 0; i < erroresInput.length; i++){

                sumaErrores += erroresInput[i];

            }

            if(sumaErrores > 0){

                btnSig.setAttribute("disabled", "");
                btnSig.classList.replace("btnSiguiente1", "btnSiguiente2");

            }else{
                
                btnSig.removeAttribute("disabled");
                btnSig.classList.replace("btnSiguiente2", "btnSiguiente1");

            }

            sumaErrores = 0;

        }

    // FUNCIONES - FIN
    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    // EVENTOS - INICIO

        // (Click fuera) Ocultar cuadro perfil opciones
        if(document.querySelector("#cuadroPOculto") != null){

            window.addEventListener('click', function mostrarCuadroPerfil(e) {

                if (document.getElementById('divPerfil').contains(e.target)) {
                    

                } else {
                        
                    document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");

                }

            });

        }

        // (Click en imagen perfil) Desplegar cuadro perfil opciones
        flechaPerfilDiv.addEventListener("click", () => {
        if (cuadroOPerfil.classList.contains("cuadroOPerfil1")) {
            cuadroOPerfil.classList.replace("cuadroOPerfil1", "cuadroOPerfil2");
        } else {
            if (cuadroOPerfil.classList.contains("cuadroOPerfil2")) {
            cuadroOPerfil.classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
            }
        }
        });

        // Botón AJUSTES DE LA CUENTA - PANEL PERFIL
        ajustesCuentaBtn.addEventListener("click", (e) => {
            
            e.preventDefault();
            window.location.href = "usuarioPerfil.php";

        })

        // Botón Cerrar Sesión - PANEL PERFIL
        btnCerrarSesion.addEventListener("click", (e) => {

            window.location.href = "cerrar.php";

        });

        // Input Número Tarjeta
        let valor = 0;

        inputTarjeNum.addEventListener("input", (e)=>{

            valor = Number(e.target.value);

            if(valor != ""){

                if(isNaN(valor)){

                    erroresInput[0] = 1;
                    spanErr.textContent = "Solo se permiten números en el campo"
                    spanErr.style.opacity = "1";
                    spanErr.classList.replace("spanErr1", "spanErr2");
                    inputTarjeNum.style.outline = "2px solid red"

                }else{

                    erroresInput[0] = 0;
                    spanErr.textContent = "#"
                    spanErr.classList.replace("spanErr2", "spanErr1");
                    inputTarjeNum.style.outline = "none"

                }

            }else{

                erroresInput[0] = 1;
                spanErr.textContent = "#"
                spanErr.classList.replace("spanErr2", "spanErr1");
                inputTarjeNum.style.outline = "none"

            }

            comprobarErrores();

        });

        // input Mes V tarjeta
        let valorMesV = 0;

        inputMesVTarje.addEventListener("input", (e)=>{

            valorMesV = Number(e.target.value);

            if(valorMesV != ""){

                if(isNaN(valorMesV)){
                
                    erroresInput[1] = 1
                    spanErr.textContent = "Valor Inválido"
                    spanErr.style.opacity = "1";
                    spanErr.classList.replace("spanErr1", "spanErr2");
                    inputMesVTarje.style.outline = "2px solid red"

                }else{

                    erroresInput[1] = 0;
                    spanErr.textContent = "#"
                    spanErr.classList.replace("spanErr2", "spanErr1");
                    inputMesVTarje.style.outline = "none"

                }

            }else{

                erroresInput[1] = 1;
                spanErr.textContent = "Valor Inválido"
                spanErr.classList.replace("spanErr1", "spanErr2");
                inputMesVTarje.style.outline = "2px solid red"

            }

            comprobarErrores();

        });

        // Input Mes V Tarjeta
        let valorAnioV = 0;

        inputAnioVTarje.addEventListener("input", (e)=>{

            valorAnioV = Number(e.target.value);

            if(valorAnioV != ""){

                if(isNaN(valorAnioV)){
                
                    erroresInput[2] = 1
                    spanErr.textContent = "Valor Inválido"
                    spanErr.style.opacity = "1";
                    spanErr.classList.replace("spanErr1", "spanErr2");
                    inputAnioVTarje.style.outline = "2px solid red"

                }else{

                    erroresInput[2] = 0;
                    spanErr.textContent = "#"
                    spanErr.classList.replace("spanErr2", "spanErr1");
                    inputAnioVTarje.style.outline = "none"

                }

            }else{

                erroresInput[2] = 1;
                spanErr.textContent = "#"
                spanErr.classList.replace("spanErr2", "spanErr1");
                inputAnioVTarje.style.outline = "none"

            }

            comprobarErrores();

        });

        // Input CVC Tarjeta
        let valorCVC = 0;

        inputCVCTarje.addEventListener("input", (e)=>{

            valorCVC = Number(e.target.value);

            if(valorCVC != ""){

                if(isNaN(valorCVC)){
                
                    erroresInput[3] = 1
                    spanErr.textContent = "Valor Inválido"
                    spanErr.style.opacity = "1";
                    spanErr.classList.replace("spanErr1", "spanErr2");
                    inputCVCTarje.style.outline = "2px solid red"

                }else{

                    erroresInput[3] = 0;
                    spanErr.textContent = "#"
                    spanErr.classList.replace("spanErr2", "spanErr1");
                    inputCVCTarje.style.outline = "none"

                }

            }else{

                erroresInput[3] = 1;
                spanErr.textContent = "#"
                spanErr.classList.replace("spanErr2", "spanErr1");
                inputCVCTarje.style.outline = "none"

            }

            comprobarErrores();

        });

        // Botón Siguiente Tarjeta de Credito Pago
        let sumaErroresBtn = 0;
        
        btnSig.addEventListener("click", ()=>{

            for(let i = 0; i < erroresInput.length; i++){
                sumaErroresBtn += erroresInput[i];
            }

            if(sumaErroresBtn == 0 && btnSiguienteDispon == 0){

                document.querySelector(".mensaje").textContent = "Espere, Procesando...";
                document.querySelector(".mensaje").style.color = "#1d61af";

                // Fetch 1: Consultar Tarjeta de Crédito
                let formTarjeta = new FormData();

                formTarjeta.append("numeroTarjeta", inputTarjeNum.value);
                formTarjeta.append("mesVTarjeta", inputMesVTarje.value);
                formTarjeta.append("anioVTarjeta", inputAnioVTarje.value);
                formTarjeta.append("cvcTarjeta", inputCVCTarje.value);
                
                btnSig.setAttribute("disabled", "");
                btnSig.classList.replace("btnSiguiente1", "btnSiguiente2");

                btnVol.setAttribute("disabled", "");
                btnVol.classList.replace("btnVolver1", "btnVolver2")

                fetch(urlConfirTDC, {
                  method: "POST",
                  body: formTarjeta,
                })
                  .then((response) => response.json())
                  .then((data) => {

                    console.log(data);

                    // Tarjeta Inexistente
                    if(data[2]["status"] == false){
                        
                        document.querySelector(".mensaje").textContent = "Tarjeta NO encontrada. Intente de nuevo";
                        document.querySelector(".mensaje").style.color = "#d42020";

                        btnSig.removeAttribute("disabled");
                        btnSig.classList.replace("btnSiguiente2", "btnSiguiente1");

                        btnVol.removeAttribute("disabled");
                        btnVol.classList.replace("btnVolver2", "btnVolver1")
                    
                    }

                    // Tarjeta Válida
                    if(data[2]["status"] == true){

                        document.querySelector(".mensaje").textContent = "Tarjeta ACEPTADA. Procesando...";
                        document.querySelector(".mensaje").style.color = "#4fb812";

                        let tarjetaToken = data[0];
                        let tokenUser = document.querySelector(".miembroCodigo").value;
                        let idUser = document.querySelector(".idUser").value;

                        //------------------------------------------------------------------------------------------------------
                        // Bloqueando Botones Siguiente y volver

                        btnSig.setAttribute("disabled", "");
                        btnSig.classList.replace("btnSiguiente1", "btnSiguiente2");

                        btnVol.setAttribute("disabled", "");
                        btnVol.classList.replace("btnVolver1", "btnVolver2");

                        // Bloqueando botón siguiente
                        btnSiguienteDispon = 1;

                        //------------------------------------------------------------------------------------------------------

                        //------------------------------------------------------------------------------------------------------
                        // Tomando elementos del DOM

                        const checkBTerminos = document.querySelector("#checkBoxTerminos");
                        const checkBInfoC = document.querySelector("#checkBoxInfoCorect");
                        const btnUnirseA = document.querySelector(".btnUniAhora");
                        const btnCancelCompra = document.querySelector(".btnVolver"); 
                        const fondoNegro = document.querySelector(".fondoN");
                        const detailMembre = document.querySelector(".detailMembreCompraGene");

                        // Spans
                        const numTarjeta = document.querySelector(".numTarjeta");
                        const fechaVTarjeta = document.querySelector(".fechaVTarjeta");
                        const codCVC = document.querySelector(".codCVC ");
                        const precioSpan = document.querySelector(".precioSpan");
                        const subtotalSpan = document.querySelector(".subtotalSpan");
                        const ivaSpan = document.querySelector(".ivaSpan");
                        const descuentoSpan = document.querySelector(".descuentoSpan");
                        const precioTotalSpan = document.querySelector(".precioTotalSpan");

                        // Inputs 
                        const membreIva = document.querySelector(".ivaMembre");
                        const descuMembre = document.querySelector(".descuMembre");
                        const precioMembre = document.querySelector(".precioMembre");

                        //------------------------------------------------------------------------------------------------------

                        //------------------------------------------------------------------------------------------------------
                        // Despleglar Cuadro Compra Membresía, Fondo Negro

                        fondoNegro.classList.replace("fondoNegroGene1", "fondoNegroGene2"); 
                        detailMembre.addEventListener("click", (e)=>{
                            e.stopPropagation();
                        });

                        //------------------------------------------------------------------------------------------------------

                        //------------------------------------------------------------------------------------------------------
                        // Evento de scroll en X
                        document.querySelector(".divBene").addEventListener("wheel", (event)=>{

                            if(event.deltaY<0){
                                document.querySelector(".divBene").scrollLeft -= 40;
                            }else{
                                document.querySelector(".divBene").scrollLeft += 40;
                            }
                          
                            event.preventDefault();

                        });

                        //------------------------------------------------------------------------------------------------------
                        // Rellenando Spans

                        let membreIva2 = 
                            membreIva.value+"% - "+(Number(membreIva.value)*(Number(membreIva.value)/100));
                        let membreDescu2 = 
                            descuMembre.value+"% - "+(Number(descuMembre.value)*(Number(descuMembre.value)/100));

                        ivaSpan.textContent = membreIva2;
                        descuentoSpan.textContent = membreDescu2;
                        precioSpan.textContent = precioMembre.value;
                        subtotalSpan.textContent = precioMembre.value;
                        numTarjeta.textContent = inputTarjeNum.value;
                        fechaVTarjeta.textContent = inputMesVTarje.value+"/"+inputAnioVTarje.value;
                        codCVC.textContent = inputCVCTarje.value;

                        let membrePreTotal = 
                            Number(subtotalSpan.textContent)+(Number(membreIva.value)*(Number(membreIva.value)/100));
                        membrePreTotal = membrePreTotal-(Number(descuMembre.value)*(Number(descuMembre.value)/100));

                        precioTotalSpan.textContent = membrePreTotal;

                        //------------------------------------------------------------------------------------------------------

                        // Input CheckBox Terminos y Condiciones
                        checkBTerminos.addEventListener("input", (e)=>{

                            if(
                                checkBTerminos.checked == true && 
                                checkBInfoC.checked == true &&
                                subtotalSpan.textContent != "" &&
                                ivaSpan.textContent != "" &&
                                descuentoSpan.textContent != "" &&
                                precioSpan.textContent != "" &&
                                precioTotalSpan.textContent != ""
                            ){
                                btnUnirseA.removeAttribute("disabled");
                                btnUnirseA.classList.replace("btnUniAhora1","btnUniAhora2");
                            }else{
                                btnUnirseA.setAttribute("disabled", "");
                                btnUnirseA.classList.replace("btnUniAhora2","btnUniAhora1");
                            }

                        })
                        //----------------------------------------------------------------------

                        // Input CheckBox Info Correcta
                        checkBInfoC.addEventListener("input", (e)=>{
                            if(
                                checkBTerminos.checked == true && 
                                checkBInfoC.checked == true &&
                                subtotalSpan.textContent != "" &&
                                ivaSpan.textContent != "" &&
                                descuentoSpan.textContent != "" &&
                                precioSpan.textContent != "" &&
                                precioTotalSpan.textContent != ""

                            ){
                                btnUnirseA.removeAttribute("disabled");
                                btnUnirseA.classList.replace("btnUniAhora1","btnUniAhora2");
                            }else{
                                btnUnirseA.setAttribute("disabled", "");
                                btnUnirseA.classList.replace("btnUniAhora2","btnUniAhora1");
                            }
                        })
                        //----------------------------------------------------------------------

                        document.querySelector(".mensaje").textContent = "";

                        fondoNegro.addEventListener("click", (e)=>{

                            btnSiguienteDispon = 0;
                            
                            btnSig.removeAttribute("disabled");
                            btnSig.classList.replace("btnSiguiente2", "btnSiguiente1");
    
                            btnVol.removeAttribute("disabled");
                            btnVol.classList.replace("btnVolver2", "btnVolver1")

                            fondoNegro.classList.replace("fondoNegroGene2", "fondoNegroGene1"); 

                            numTarjeta.textContent = "";
                            fechaVTarjeta.textContent = "";
                            codCVC.textContent = "";
                            precioSpan.textContent = "";
                            subtotalSpan.textContent = "";
                            ivaSpan.textContent = "";
                            descuentoSpan.textContent = "";
                            precioTotalSpan.textContent = "";

                            e.stopPropagation();
                            
                        })
                        
                        btnCancelCompra.addEventListener("click", (e)=>{

                            btnSiguienteDispon = 0;
                            
                            btnSig.removeAttribute("disabled");
                            btnSig.classList.replace("btnSiguiente2", "btnSiguiente1");
    
                            btnVol.removeAttribute("disabled");
                            btnVol.classList.replace("btnVolver2", "btnVolver1")

                            fondoNegro.classList.replace("fondoNegroGene2", "fondoNegroGene1"); 

                            numTarjeta.textContent = "";
                            fechaVTarjeta.textContent = "";
                            codCVC.textContent = "";
                            precioSpan.textContent = "";
                            subtotalSpan.textContent = "";
                            ivaSpan.textContent = "";
                            descuentoSpan.textContent = "";
                            precioTotalSpan.textContent = "";

                            e.stopPropagation();

                        });

                        //-------------------------------------------------------------------------------------------------------------
                        // Botón "Unirse Ahora" FUNCIONES - INICIO

                        var tokenUserNewG = "";
                        var tokenUsuarioDefini = "";

                        // Función 3: Enviar Correo Nueva Membresía
                        function enviarCorreoNuevaMem(
                            fechaCrea,
                            ivaMembre,
                            descuMem,
                            precioMem,
                            subtotalFac,
                            totalFac,
                            direccUser,
                            numPedido,
                            fCaduFac,
                            numFac,
                            nomMembre,
                            nomUser,
                            miembroCod
                        ){

                            document.querySelector(".fechaCrea").value = fechaCrea[0];
                            document.querySelector(".horaCrea").value = fechaCrea[1];
                            document.querySelector(".serieFactu").value = fechaCrea[2];
                            document.querySelector(".codFactu").value = fechaCrea[3];
                            document.querySelector(".ivaMembreFac").value = ivaMembre;
                            document.querySelector(".descuMem").value = descuMem;
                            document.querySelector(".precioMem").value = precioMem;
                            document.querySelector(".subtotalFac").value = subtotalFac;
                            document.querySelector(".totalFac").value = totalFac;
                            document.querySelector(".direccUserFac").value = direccUser;
                            document.querySelector(".numPedido").value = numPedido;
                            document.querySelector(".fCaduFac").value = fCaduFac;
                            document.querySelector(".numFac").value = numFac;
                            document.querySelector(".nomMembre").value = nomMembre;
                            document.querySelector(".nomUser").value = nomUser;
                            document.querySelector(".miembroCod").value = miembroCod;
                            
                            document.querySelector("#formCreaFacMem").submit();
                            
                        };

                        // Función 2: Registrar Factura Membresia
                        function registrarFacturaMembresia(
                            reEpay,
                            franquiTarje,
                            respuTransa,
                            subsId,
                            factTran,
                            bancTran,
                            direUser,
                            docuUser,
                            emailU,
                            idPlanN,
                            staMem,
                            idMembresia,
                            idUser,
                            ivaMembresia,
                            descuMembre,
                            precioMembresia,
                            tokenU,
                            tokenT,
                            pagoProximo
                        ){

                            let anio = new Date().getFullYear();

                            let fechaActual = crearFecha();
                            let fechaCaducaFac = pagoProximo.split("-");
                            fechaCaducaFac = fechaCaducaFac[2]+"-"+fechaCaducaFac[1]+"-"+fechaCaducaFac[0];

                            let horaNumFactu = crearHora(1, "");
                            let numberFac = "FAC"+anio+"-"+fechaActual[3]+fechaActual[4]+horaNumFactu[0]+horaNumFactu[1]+horaNumFactu[2];
                            let nombreMembre = document.querySelector(".nombreMembre").value;

                            let formCreaFacMem = new FormData();
                            let respuestaTransa = "";

                            let subtotal = subtotalSpan.textContent;
                            let total = precioTotalSpan.textContent;

                            if(respuTransa == "Aprobada"){
                                respuestaTransa = "Pagada";
                            }

                            if(staMem == "active"){
                                staMem = "Activa";
                            }else{
                                if(staMem == "inactive"){
                                    staMem = "Inactiva";
                                }
                            }

                            let datosFactura = creaFechaCodFac();

                            formCreaFacMem.append("refEpaycoFacMem", reEpay); 
                            formCreaFacMem.append("franquiciaFac", franquiTarje); 
                            formCreaFacMem.append("stdTransa", respuestaTransa); 
                            formCreaFacMem.append("subscripIdEpayco", subsId); 
                            formCreaFacMem.append("facTranId", factTran); 
                            formCreaFacMem.append("bancoTransa", bancTran); 
                            formCreaFacMem.append("direcUser", direUser); 
                            formCreaFacMem.append("docuUser", docuUser); 
                            formCreaFacMem.append("emailUser", emailU); 
                            formCreaFacMem.append("codMembreEpayco", idPlanN); 
                            formCreaFacMem.append("stdMembresia", staMem);
                            formCreaFacMem.append("idMembresia", idMembresia);
                            formCreaFacMem.append("idUser", idUser);
                            formCreaFacMem.append("ivaMembresia", ivaMembresia);
                            formCreaFacMem.append("descuMembresia", descuMembre);
                            formCreaFacMem.append("precMembresia", precioMembresia);
                            formCreaFacMem.append("subtotalMem", subtotal);
                            formCreaFacMem.append("totalMem", total);
                            formCreaFacMem.append("factuFechaCre", datosFactura[0]);
                            formCreaFacMem.append("factuHoraCre", datosFactura[1]);
                            formCreaFacMem.append("factuSerie", datosFactura[2]);
                            formCreaFacMem.append("factuCodigo", datosFactura[3]);
                            formCreaFacMem.append("tokenUser", tokenU);
                            formCreaFacMem.append("tokenTarje", tokenT);
                            formCreaFacMem.append("codiMembresiaLocal", datosFactura[4]);
                            formCreaFacMem.append("facVencimiento", fechaCaducaFac);

                            // Fetch 5: Registrar factura
                            fetch(urlCreaFacMembre, {
                                method: "POST",
                                body: formCreaFacMem,
                            })
                                .then((response) => response.json())
                                .then((data) => {

                                    let nombre = 
                                        document.querySelector(".nombreUser").value
                                        +
                                        " "
                                        +
                                        document.querySelector(".apellidoUser").value;

                                    enviarCorreoNuevaMem(
                                        [datosFactura[0],
                                        datosFactura[1],
                                        datosFactura[2],
                                        datosFactura[3]],
                                        document.querySelector("#ivaSpan2").textContent,
                                        document.querySelector(".descuentoSpan").textContent,
                                        document.querySelector(".precioSpan").textContent,
                                        document.querySelector(".subtotalSpan").textContent,
                                        document.querySelector(".precioTotalSpan").textContent,
                                        document.querySelector("#direccUser").value,
                                        data[1]+"/"+anio,
                                        fechaCaducaFac,
                                        numberFac,
                                        nombreMembre,
                                        nombre,
                                        datosFactura[4]
                                    );

                                })
                                .catch((err) => console.log(err));

                        }

                        // Función 1: Crear el token del usuario
                        function userNewToken(tokenUserEpayco, creada){

                            console.log(creada);

                            tokenUserNewG = tokenUserEpayco;

                            let membreCod = document.querySelector(".membreCodigo").value;

                            let guardaUserToken = new FormData();
                                    
                            guardaUserToken.append("tokenUserGuarda", tokenUserNewG);
                            guardaUserToken.append("tokenTarjetaNewUser", tarjetaToken);
                            guardaUserToken.append("idUserGuardaToken", idUser);

                            // Fetch 3: Guardar el Token Epayco del User (Ya sea Nuevo o Registrado)
                            fetch(urlGuardaTokenUser, {
                                method: "POST",
                                body: guardaUserToken,
                            })
                                .then((response) => response.json())
                                .then((data) => {

                                })
                                .catch((err) => console.log(err));

                            tokenUsuarioDefini = tokenUserNewG;
                        
                            // Creando la subscripcion y pagando la primera mensualidad
                            let formNewSub = new FormData();

                            let documento = document.querySelector(".userDoc").value;
                            let direcc = document.querySelector(".direccUser").value;
                            let telfFijo = document.querySelector(".telfFijoUser").value;
                            let celular = document.querySelector(".telfUser").value;
                            let ipUser = document.querySelector("#ipUserIN").value;
                            
                            if(creada == false){

                                formNewSub.append("membreCodi", membreCod);
                                formNewSub.append("userTarjeToken", tarjetaToken);
                                formNewSub.append("userToken", tokenUsuarioDefini);
                                formNewSub.append("userDocument", documento);
                                formNewSub.append("userDirecc", direcc);
                                formNewSub.append("userTelf", telfFijo);
                                formNewSub.append("userCelular", celular);
                                formNewSub.append("userIp", ipUser);

                            }else{

                                formNewSub.append("membreCodiPagoMem", membreCod);
                                formNewSub.append("userTarjeToken", tarjetaToken);
                                formNewSub.append("userToken", tokenUsuarioDefini);
                                formNewSub.append("userDocument", documento);
                                formNewSub.append("userDirecc", direcc);
                                formNewSub.append("userTelf", telfFijo);
                                formNewSub.append("userCelular", celular);
                                formNewSub.append("userIp", ipUser);
                                
                            }

                            // Fetch 4: Creando la subscripcion y pagando la primera mensualidad
                            // Si no es la primera mensualidad, pagar la siguiente (creada == true).
                            fetch(urlCrearSub, {
                                method: "POST",
                                body: formNewSub,
                            })
                                .then((response) => response.json())
                                .then((datas) => {

                                    console.log("Pago Mensualidad: ")
                                    console.log(datas);

                                    let refEpayco = datas.data.ref_payco;
                                    let franquiciaTarje = datas.data.franquicia;
                                    let respuestaTransaccion = datas.data.respuesta;
                                    let subscripcionId = datas.data.extras.extra1;
                                    let facturaTransac = datas.data.factura;
                                    let bancoTransac = datas.data.banco;
                                    let direccionUser = datas.data.direccion;
                                    let documentoUser = datas.data.documento;
                                    let emailUser = datas.data.email;
                                    let idPlan = datas.subscription.idPlan;
                                    let statusMem = datas.subscription.status;
                                    let idMembre = document.querySelector(".membreId").value;
                                    let idUser = document.querySelector(".idUser").value;
                                    let ivaMembre = document.querySelector(".ivaMembre").value;
                                    let descuMembre = document.querySelector(".descuMembre").value;
                                    let precioMembre = document.querySelector(".precioMembre").value;
                                    let tokenUser = datas.subscription.idCustomer;
                                    let tokenTarjeta = datas.subscription.tokenCard;
                                    let prxoPago = datas.subscription.nextVerificationDate;

                                    registrarFacturaMembresia(
                                        refEpayco,
                                        franquiciaTarje,
                                        respuestaTransaccion,
                                        subscripcionId,
                                        facturaTransac,
                                        bancoTransac,
                                        direccionUser,
                                        documentoUser,
                                        emailUser,
                                        idPlan,
                                        statusMem,
                                        idMembre,
                                        idUser,
                                        ivaMembre,
                                        descuMembre,
                                        precioMembre,
                                        tokenUser,
                                        tokenTarjeta,
                                        prxoPago
                                    );

                                })
                                .catch((err) => console.log(err));

                        }

                        // Botón "Unirse Ahora" EVENTO
                        btnUnirseA.addEventListener("click", (e)=>{

                            if(
                                checkBTerminos.checked == true && 
                                checkBInfoC.checked == true &&
                                subtotalSpan.textContent != "" &&
                                ivaSpan.textContent != "" &&
                                descuentoSpan.textContent != "" &&
                                precioSpan.textContent != "" &&
                                precioTotalSpan.textContent != ""
                            ){  

                                if(tokenUser == ""){
                                    
                                    let formCreaUserToken = new FormData();

                                    let nombre = document.querySelector(".nombreUser").value;
                                    let apellido = document.querySelector(".apellidoUser").value;
                                    let email = document.querySelector(".emailUser").value;
                                    let ciudad = document.querySelector(".ciudadUser").value;
                                    let direcc = document.querySelector(".direccUser").value;
                                    let telfFijo = document.querySelector(".telfFijoUser").value;
                                    let celular = document.querySelector(".telfUser").value;
                                    
                                    formCreaUserToken.append("tokenTarjetaNewUser", tarjetaToken);
                                    formCreaUserToken.append("nombreUser", nombre);
                                    formCreaUserToken.append("apellidoUser", apellido);
                                    formCreaUserToken.append("emailUser", email);
                                    formCreaUserToken.append("ciudadUser", ciudad);
                                    formCreaUserToken.append("direccUser", direcc);
                                    formCreaUserToken.append("telfFijoUser", telfFijo);
                                    formCreaUserToken.append("celularUser", celular);

                                    // Fetch 2: Crear User Token si no existe
                                    fetch(urlCrearUserToken, {
                                        method: "POST",
                                        body: formCreaUserToken,
                                    })
                                        .then((response) => response.json())
                                        .then((data) => {

                                            userNewToken(data, false);

                                        })
                                        .catch((err) => console.log(err));
                                    //-------------------------------------------------------------

                                }else{

                                    console.log("PAGO SIGUIENTE MENSUALIDAD: ");
                                    userNewToken(tokenUser, true);

                                }

                            };

                        });

                        // Botón "Unirse Ahora" FUNCIONES - FIN
                        //-------------------------------------------------------------------------------------------------------------
                        
                    }
                    
                  })
                  .catch((err) => console.log(err));
        
                //-----------------------------------------------------------

            }

            sumaErroresBtn = 0;

        });

    // EVENTOS - FIN
    //------------------------------------------------------------------------------------------------------------------------------------------

}

//----------------------------------------------
//<<-- MEMBRESIAS CLIENTE DETAIL.PHP | FIN -->>
//----------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------
//<<-- GENERAR PDF FACTURA MEMBRESÍA.PHP | INICIO -->>
//------------------------------------------------------

if(document.querySelector(".generaFacPdfHTML") != null){

    // Tomando Elementos del DOM

        // Botones
        const btnDescarFac = document.querySelector("#btnFactuDescargar");
        const btnVolver = document.querySelector("#btnVolver");
        //--------------------------------------------------------------------

        // Forms
        const formDesFac = document.querySelector("#formCrearFacturaMembre");
        //--------------------------------------------------------------------

    //----------------------------------------------------------------------------------

    // EVENTOS

        // Botón para descargar la factura
        btnDescarFac.addEventListener("click", (e)=>{

            formDesFac.submit();

        });

        // Botón para volver al inicio
        btnVolver.addEventListener("click", (e)=>{

            window.location.href = "index.php";

        });

    //-------------------------------------------------------------------------------------------

}

//------------------------------------------------------
//<<-- GENERAR PDF FACTURA MEMBRESÍA.PHP | FIN -->>
//------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------
//<<-- REALIZAR RESERVA.PHP | INICIO -->>
//------------------------------------------------------

if(document.querySelector("#realizarReseCLI-HTML") != null){

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Tomando Elementos del DOM (General)

        // CONTENEDORES
        const cuadroOPerfil = document.querySelector(".cuadroPOculto");
        
        // BOTONES
        const divPerfilFotoBtn = document.querySelector(".divPerfil");
        const ajustesCuentaBtn = document.querySelector("#ajustesCuentaBtn"); 
        const btnCerrarSesion = document.querySelector(".btnCerrar");
        const btnPagarMensualidad = document.querySelector(".btnPagarMensuali");
        // const btnRealizaRese = document.querySelector(".btnRealizaRese");

        // FORMULARIOS
        const form_btnPagarMensu = document.querySelector("#form_btnPagarMensu");
        // const form_btnRealizaRese = document.querySelector("#form_btnRealizaRese");

        // INPUTS
        const diasDisponInput = document.querySelector("#diasDisponiblesMembre").value;

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    // VARIABLES GLOBALES Y CONSTANTES

        // Conexión EPAYCO (Pasarela de Pago)
        var handler = ePayco.checkout.configure({
            key: '2748d9ab9c7041e36711c19f4802c8cf',
            test: true
        });

        // Intervalos
        var intervaloLTDispoDia = null;
        var intervaloReseDispoDia = null;
        var intervaloBotonPagar = null;

        // Errores inputs
        var erroresInput = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

        // Posición de la semana elegida
        var semanaPosicionGene = 0;

        // Factura - Meses para códigos
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
        //------------------------------------------------------------------------------------------

        // Día outline
        var diaAnterior = "";

        // Meses
        var mesesRese = {
            1:"enero", 
            2:"febrero", 
            3:"marzo", 
            4:"abril", 
            5:"mayo", 
            6:"junio",
            7:"julio",
            8:"agosto",
            9:"septiembre",
            10:"octubre",
            11:"noviembre",
            12:"diciembre",
        };

        // Meses Con Mayuscula Inicial
        var mesesReseMayuI = {
            1:"Enero", 
            2:"Febrero", 
            3:"Marzo", 
            4:"Abril", 
            5:"Mayo", 
            6:"Junio",
            7:"Julio",
            8:"Agosto",
            9:"Septiembre",
            10:"Octubre",
            11:"Noviembre",
            12:"Diciembre",
        };

        // Barra linea de tiempo posiciones base
        var lineaTRecorrido = {
            7 : 0,
            8 : 8.8,
            9 : 17.6,
            10 : 26.4,
            11 : 35.2,
            12 : 44,
            13 : 52.8,
            14 : 61.6,
            15 : 70.4,
            16 : 79.2,
            17 : 88,
            18 : 96.8,
            19 : 106
        };

        // Fecha actual fija
        var diaGene = new Date().getDate();
        var mesGene = new Date().getMonth()+1;
        var anioGene = new Date().getFullYear();
        var diaGeneTexto = diaGene < 10 ? "0"+diaGene : diaGene;
        var mesGeneTexto = mesGene < 10 ? "0"+mesGene : mesGene;
        var anioGeneTexto = String(anioGene);

        var fechaActualCadena = anioGeneTexto+"-"+mesGeneTexto+"-"+diaGeneTexto;
        
        // Fecha variable para el calendario
        var diaCalenGene = new Date().getDate();
        var mesCalenGene = new Date().getMonth()+1;
        var anioCalenGene = new Date().getFullYear();

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    // FUNCIONES - INICIO

    //------------------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------
    // FUNCIÓN: confirmar errores input y desbloquear botón "siguiente"
    //---------------------------------------------------------------------

        var erroresInputSuma = 0;

        function confirmarErrores(){

            erroresInputSuma = 0;

            for(let i = 0; i < erroresInput.length; i++){

                erroresInputSuma += erroresInput[i];

            }

            if(erroresInputSuma == 0){

                document.querySelector(".btnContinuar").classList.replace("btnContinuar-C", "btnContinuar-A");
                document.querySelector(".btnContinuar").removeAttribute("disabled");

            }else{

                document.querySelector(".btnContinuar").classList.replace("btnContinuar-A", "btnContinuar-C");
                document.querySelector(".btnContinuar").setAttribute("disabled", "");

            }

        }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------
    // FUNCIÓN: crear calendario
    //--------------------------------

        function crearCalendario(mesN, anioN, idPdt, tipoRese, primerDia){

            // Variables para definir la fecha, si no existe cambio en los parámetros, se usará la fecha actual.
            let mesActual = mesN == "" ? mesCalenGene : mesN;
            let anioActual = anioN == "" ? anioCalenGene : anioN;
            let idPdtTipoReseWhere = "";
            let tipoReserva = tipoRese;

            if(idPdt != ""){
                idPdtTipoReseWhere += "AND `reservas`.`id_producto` = "+idPdt;
            }

            if(tipoReserva != ""){
                idPdtTipoReseWhere += " AND `reservas`.`reserTipo` = '"+tipoReserva+"'";
            }

            let diaNumero = new Date().getDate();
            let mesNumero = mesActual;
            let mesNumeroA = mesActual-1;
            let mesNumeroP = mesActual+1;
            let anioNumero = anioActual;
            let anioNumeroA = anioNumero;
            let anioNumeroP = anioNumero;

            if(mesNumero == 1){
                mesNumeroA = 12;
                anioNumeroA = anioNumero-1;
            }

            if(mesNumero == 12){
                mesNumeroP = 1;
                anioNumeroP = anioNumero+1;
            }

            let diaTexto = "";
            let mesTexto = "";
            let mesTextoA = "";
            let mesTextoP = "";
            let anioTexto = String(anioNumero);

            diaTexto = diaNumero < 10 ? "0"+diaNumero : String(diaNumero);
            mesTexto = mesNumero < 10 ? "0"+mesNumero : String(mesNumero);
            mesTextoA = mesNumeroA < 10 ? "0"+mesNumeroA : String(mesNumeroA);
            mesTextoP = mesNumeroP < 10 ? "0"+mesNumeroP : String(mesNumeroP);

            const inicioDMesNum = new Date(anioNumero, mesNumero-1, 1).getDay(); // Primer día del mes ACTUAL en formato semana (0 - 6)
            const finalDMesNum = new Date(anioNumero, mesNumero, 0).getDate(); // Último día del mes ACTUAL formato día (1 - 31)
            const finalDMesSema = new Date(anioNumero, mesNumero-1, finalDMesNum).getDay();  // Último día del mes ACTUAL formato semana (0 - 6)
            const finalDMesPrev = new Date(anioNumero, mesNumero-1, 0).getDate(); // Último día DEL mes ANTERIOR formato día (1 - 31)

            document.querySelector(".spanFecha").textContent = mesesRese[mesNumero]+" "+anioNumero;

            if(diasDisponInput < 6){
                document.querySelector(".spanSabadoCabeza").style.backgroundColor = "#41688188";
                document.querySelector(".spanSabadoCabeza").style.color = "#08273888";
            }

            let formCalendario = new FormData();

            formCalendario.append("fechaMesReser", mesNumero);
            formCalendario.append("fechaMesReserA", mesNumeroA);
            formCalendario.append("fechaMesReserP", mesNumeroP);
            formCalendario.append("fechaMesTReser", mesTexto);
            formCalendario.append("fechaMesTReserA", mesTextoA);
            formCalendario.append("fechaMesTReserP", mesTextoP);
            formCalendario.append("fechaAñoReser", anioNumero);
            formCalendario.append("fechaAñoReserA", anioNumeroA);
            formCalendario.append("fechaAñoReserP", anioNumeroP);
            formCalendario.append("productoId", idPdtTipoReseWhere);

            fetch(urlModoCLienteData, {
                method: "POST",
                body: formCalendario,
            })
                .then((response) => response.json())
                .then((data) => {

                    let htmlDiasMesCalenNewR = ``;
                    let diasAnterCuenta = 0;
                    let diasActuCuenta = 0;

                    // Dibujando dias MES ANTERIOR
                    for(let i = inicioDMesNum; i > 0; i--){

                        let fechaA = anioNumeroA+"-"+mesTextoA+"-"+((finalDMesPrev - i) + 1);
                        let dia = fechaA.substring(8,10);
                        let reservas = ``;
                        let num = 0;

                        let fechaActualSuma = anioNumeroA+(Number(mesTextoA)*30)+Number(dia);
                        let fechaFijaSuma = fechaActualCadena.split("-");
                        fechaFijaSuma = 
                            Number(fechaFijaSuma[0])+
                            (Number(fechaFijaSuma[1])*30)+
                            Number(fechaFijaSuma[2]);

                        let diaDispo = diasDisponInput;
                        let diaSemana = new Date(anioNumeroA, mesNumeroA-1, (finalDMesPrev - i) + 1).getDay();

                        for2:
                        for(let e = 0; e < data.length; e++){

                            let fecha = mesesRese[mesNumeroA]+"-"+anioNumeroA;

                            if(fecha == data[e]["serieReserva"]){

                                if(fechaA == data[e]["fechaReserva"]){
                                    num++;

                                    if(num>1){
                                        reservas = `<div class="divRese"><span>${num} Reservas</span></div>`;
                                    }else{
                                        reservas = `<div class="divRese"><span>${num} Reserva</span></div>`;
                                    }
                                    
                                }

                                diasAnterCuenta++;

                            }else{

                                break for2;
                        
                            }   

                        }

                        if(fechaActualCadena == fechaA && diaSemana != 0){

                            if((diaSemana == 6 && diaDispo == 5)){

                                htmlDiasMesCalenNewR += `
                                <div class="divDia divDia-Domingo" onclick="verDisponibilidadDia('', '', true)">
                                    <span class="spanNumDia">${((finalDMesPrev - i) + 1)}</span>
                                    <div class="reservas">
                                        
                                    </div>
                                </div>
                                `;

                            }else{

                                htmlDiasMesCalenNewR += `
                                <div class="divDia divDia-Hoy" onclick="verDisponibilidadDia('${fechaA}', '', '')">
                                    <span class="spanNumDia">${((finalDMesPrev - i) + 1)}</span>
                                    <div class="reservas">
                                        ${reservas}
                                    </div>
                                </div>
                                `;

                            }

                        }else{

                            if(fechaActualCadena != fechaA && diaSemana != 0){

                                if((diaSemana == 6 && diaDispo == 5)){

                                    htmlDiasMesCalenNewR += `
                                    <div class="divDia divDia-Domingo" onclick="verDisponibilidadDia('', '', true)">
                                        <span class="spanNumDia">${((finalDMesPrev - i) + 1)}</span>
                                        <div class="reservas">
                                            
                                        </div>
                                    </div>
                                    `;

                                }else{

                                    let rese = "";
                                    let clase = "";
                                    let onclick = "";

                                    if(fechaActualSuma < fechaFijaSuma){
                                        rese = "";
                                    }else{
                                        rese = reservas;
                                    }

                                    if(fechaActualSuma < fechaFijaSuma){
                                        clase = "divDia-AnteAnte";    
                                    }else{
                                        clase = "divDia-Ante";
                                    }

                                    if(fechaActualSuma >= fechaFijaSuma){
                                        onclick = `onclick="verDisponibilidadDia('${fechaA}', '', '')"`;
                                    }

                                    htmlDiasMesCalenNewR += `
                                    <div class="divDia ${clase}" id="dia${((finalDMesPrev - i) + 1)}${mesNumeroA}${anioNumeroA}" ${onclick}>
                                        <span class="spanNumDia">${((finalDMesPrev - i) + 1)}</span>
                                        <div class="reservas">
                                            ${rese}
                                        </div>
                                    </div>
                                    `;

                                }
                                
                            }else{


                                if(diaSemana == 0){

                                    htmlDiasMesCalenNewR += `
                                    <div class="divDia divDia-Domingo" onclick="verDisponibilidadDia('', true, '')">
                                        <span class="spanNumDia">${((finalDMesPrev - i) + 1)}</span>
                                        <div class="reservas">
                                        </div>
                                    </div>
                                    `;

                                }

                            }
                            
                        }


                    }
                    //-----------------------------------------------------------------------------------------

                    diasActuCuenta = diasAnterCuenta;

                    // Dibujando días MES ACTUAL
                    for(let i = 1; i <= finalDMesNum; i++){

                        let dia = i < 10 ? "0"+String(i) : i; 

                        let fechaActu = anioTexto+"-"+mesTexto+"-"+dia;
                        let fechaActualSuma = Number(anioTexto)+(Number(mesTexto)*30)+Number(dia);
                        let fechaFijaSuma = fechaActualCadena.split("-");
                        fechaFijaSuma = 
                            Number(fechaFijaSuma[0])+
                            (Number(fechaFijaSuma[1])*30)+
                            Number(fechaFijaSuma[2]);
                        let reservas = ``;
                        let numActu = 0;

                        let diaDispo = diasDisponInput;
                        let diaSemana = new Date(anioNumero, mesNumero-1, Number(dia)).getDay();

                        for2:
                        for(let e = diasAnterCuenta; e < data.length; e++){

                            let fecha = mesesRese[mesNumero]+"-"+anioNumero;

                            if(fecha == data[e]["serieReserva"]){

                                if(fechaActu == data[e]["fechaReserva"] && fechaActualSuma >= fechaFijaSuma){
                                    diasActuCuenta++;
                                    numActu ++

                                    if(numActu>1){
                                        reservas = `<div class="divRese"><span>${numActu} Reservas</span></div>`;
                                    }else{
                                        reservas = `<div class="divRese"><span>${numActu} Reserva</span></div>`;
                                    }
                                    
                                }

                            }else{

                                break for2;
                        
                            }   

                        }

                        // Dia de Hoy
                        if(fechaActualCadena == fechaActu && diaSemana != 0){

                            if((diaSemana == 6 && diaDispo == 5)){

                                htmlDiasMesCalenNewR += `
                                <div class="divDia divDia-Domingo" onclick="verDisponibilidadDia('', '', true)">
                                    <span class="spanNumDia">${i}</span>
                                    <div class="reservas">
                                    </div>
                                </div>
                                `;

                            }else{

                                htmlDiasMesCalenNewR += `
                                <div class="divDia divDia-Hoy" onclick="verDisponibilidadDia('${fechaActu}', '', '')">
                                    <span class="spanNumDia">${i}</span>
                                    <div class="reservas">
                                        ${reservas}
                                    </div>
                                </div>
                                `;

                            }

                        }else{

                            if(fechaActualCadena != fechaActu && diaSemana != 0){

                                if((diaSemana == 6 && diaDispo == 5)){

                                    htmlDiasMesCalenNewR += `
                                    <div class="divDia divDia-Domingo" onclick="verDisponibilidadDia('', '', true)">
                                        <span class="spanNumDia">${i}</span>
                                        <div class="reservas">
                                        </div>
                                    </div>
                                    `;

                                }else{

                                    let rese = reservas;
                                    let clase = "";
                                    let onclick = "";

                                    if(fechaActualSuma < fechaFijaSuma){
                                        rese = "";
                                    }

                                    if(fechaActualSuma < fechaFijaSuma){
                                        clase = "divDia-ActuAnte";    
                                    }else{
                                        clase = "divDia-Actu";
                                    }

                                    if(fechaActualSuma >= fechaFijaSuma){
                                        onclick = `onclick="verDisponibilidadDia('${fechaActu}', '', '')"`;
                                    }

                                    htmlDiasMesCalenNewR += `
                                    <div class="divDia ${clase}" id="dia${i}${mesNumero}${anioNumero}" ${onclick}>
                                        <span class="spanNumDia">${i}</span>
                                        <div class="reservas">
                                            ${rese}
                                        </div>
                                    </div>
                                    `;

                                } 

                            }else{

                                if(diaSemana == 0){

                                    htmlDiasMesCalenNewR += `
                                    <div class="divDia divDia-Domingo" onclick="verDisponibilidadDia('', true, '')">
                                        <span class="spanNumDia">${i}</span>
                                        <div class="reservas">
                                        </div>
                                    </div>
                                    `;

                                }

                            }

                        }

                    }
                    //-----------------------------------------------------------------------------------------


                    // Dibujando días del MES POSTERIOR
                    for(let i = finalDMesSema; i < 6; i++){

                        let dia = (i-finalDMesSema+1) < 10 ? ("0"+String((i-finalDMesSema+1))) : (i-finalDMesSema+1);

                        let fechaProx = anioNumeroP+"-"+mesTextoP+"-"+dia;

                        let fechaActualSuma = anioNumeroP+(Number(mesTextoP)*30)+Number(dia);
                        let fechaFijaSuma = fechaActualCadena.split("-");
                        fechaFijaSuma = 
                            Number(fechaFijaSuma[0])+
                            (Number(fechaFijaSuma[1])*30)+
                            Number(fechaFijaSuma[2]);
                        
                        let reservasProx = ``;
                        let numProx = 0;
                        
                        let diaDispo = diasDisponInput;
                        let diaSemana = new Date(anioNumeroP, mesTextoP-1, Number(dia)).getDay();

                        for2:
                        for(let e = diasActuCuenta; e < data.length; e++){

                            let fecha = mesesRese[mesNumeroP]+"-"+anioNumeroP;

                            if(fecha == data[e]["serieReserva"]){

                                if(fechaProx == data[e]["fechaReserva"]){

                                    numProx++;

                                    if(numProx>1){
                                        reservasProx = `<div class="divRese"><span>${numProx} Reservas</span></div>`;
                                    }else{
                                        reservasProx = `<div class="divRese"><span>${numProx} Reserva</span></div>`;
                                    }
                                    

                                }

                            }else{

                                break for2;
                        
                            }   

                        }

                        if(fechaActualCadena == fechaProx && diaSemana != 0){
                            
                            if((diaSemana == 6 && diaDispo == 5)){

                                htmlDiasMesCalenNewR += `
                                <div class="divDia divDia-Domingo" onclick="verDisponibilidadDia('', '', true)">
                                    <span class="spanNumDia">${i-finalDMesSema+1}</span>
                                    <div class="reservas">
                                    </div>
                                </div>
                                `;

                            }else{

                                htmlDiasMesCalenNewR += `
                                <div class="divDia divDia-Hoy" onclick="verDisponibilidadDia('${fechaProx}', '', '')">
                                    <span class="spanNumDia">${i-finalDMesSema+1}</span>
                                    <div class="reservas">
                                        ${reservasProx}
                                    </div>
                                </div>
                                `;

                            }

                        }else{

                            if(fechaActualCadena != fechaProx && diaSemana != 0){

                                if((diaSemana == 6 && diaDispo == 5)){

                                    htmlDiasMesCalenNewR += `
                                    <div class="divDia divDia-Domingo" onclick="verDisponibilidadDia('', '', true)">
                                        <span class="spanNumDia">${i-finalDMesSema+1}</span>
                                        <div class="reservas">
                                        </div>
                                    </div>
                                    `;

                                }else{

                                    let rese = "";
                                    let clase = "";
                                    let onclick = "";

                                    if(fechaActualSuma < fechaFijaSuma){
                                        rese = "";
                                    }else{
                                        rese = reservasProx;
                                    }

                                    if(fechaActualSuma < fechaFijaSuma){
                                        clase = "divDia-ProxAnte";    
                                    }else{
                                        clase = "divDia-Prox";
                                    }

                                    if(fechaActualSuma >= fechaFijaSuma){
                                        onclick = `onclick="verDisponibilidadDia('${fechaProx}', '', '')"`;
                                    }

                                    htmlDiasMesCalenNewR += `
                                    <div class="divDia ${clase}" id="dia${(i-finalDMesSema+1)}${mesNumeroP}${anioNumeroP}" ${onclick}>
                                        <span class="spanNumDia">${i-finalDMesSema+1}</span>
                                        <div class="reservas">
                                            ${rese}
                                        </div>
                                    </div>
                                    `;

                                }

                            }else{

                                if(diaSemana == 0){

                                    htmlDiasMesCalenNewR += `
                                    <div class="divDia divDia-Domingo" onclick="verDisponibilidadDia('', true, '')">
                                        <span class="spanNumDia">${i-finalDMesSema+1}</span>
                                        <div class="reservas">
                                        </div>
                                    </div>
                                    `;

                                }

                            }

                        }

                    }
                    //-----------------------------------------------------------------------------------------

                    document.querySelector(".diasDivGene").innerHTML = "";

                    rangeCalendarioDias.selectNode(document.getElementsByTagName("div").item(0));
                    const diasCalendaHtml =
                        rangeCalendarioDias.createContextualFragment(htmlDiasMesCalenNewR);
                    document.querySelector(".diasDivGene").appendChild(diasCalendaHtml);

                    if(document.querySelector("#inputDesde-Hora") != null){

                        if(document.querySelector("#inputDesde-Hora").value != "" && primerDia == ""){

                            let fecha = document.querySelector("#inputDesde-Hora").value;
                            let fechaSeparadaGene = fecha.split("-");

                            let numeroSemana = diaSemanaNumero(fecha);

                            diaNumeroId = 
                                String(Number(fechaSeparadaGene[2]))+
                                String(Number(fechaSeparadaGene[1]))+
                                fechaSeparadaGene[0];
                            
                            console.log(diaNumeroId);

                            if(numeroSemana > 0){

                                if(numeroSemana == 6 && diasDisponInput > 5){
                                    if(fecha != fechaActualCadena){

                                        if(diaAnterior == ""){
                
                                            diaAnterior = "#dia"+diaNumeroId;
                                            document.querySelector("#dia"+diaNumeroId).style.outline = "3px solid #9e2ec399";
                
                                        }else{
                
                                            if(document.querySelector(diaAnterior) != null){
                                                document.querySelector(diaAnterior).style.outline = "none";
                                            }
                                            document.querySelector("#dia"+diaNumeroId).style.outline = "3px solid #9e2ec399";
                                            diaAnterior = "#dia"+diaNumeroId;
                
                                        }
                
                                    }else{
                
                                        if(diaAnterior != ""){
                                            if(document.querySelector(diaAnterior) != null){
                                                document.querySelector(diaAnterior).style.outline = "none";
                                            }
                                        }
                
                                    }
                                }else{
                                    if(numeroSemana > 0 && numeroSemana != 6){
                                        if(fecha != fechaActualCadena){

                                            if(diaAnterior == ""){
                    
                                                diaAnterior = "#dia"+diaNumeroId;
                                                document.querySelector("#dia"+diaNumeroId).style.outline = "3px solid #9e2ec399";
                    
                                            }else{
                    
                                                if(document.querySelector(diaAnterior) != null){
                                                    document.querySelector(diaAnterior).style.outline = "none";
                                                }
                                                document.querySelector("#dia"+diaNumeroId).style.outline = "3px solid #9e2ec399";
                                                diaAnterior = "#dia"+diaNumeroId;
                    
                                            }
                    
                                        }else{
                    
                                            if(diaAnterior != ""){
                                                if(document.querySelector(diaAnterior) != null){
                                                    document.querySelector(diaAnterior).style.outline = "none";
                                                }
                                            }
                    
                                        }
                                    }
                                }

                                if(numeroSemana == 6 && diasDisponInput == 5){
                                    if(diaAnterior != ""){
                                        if(document.querySelector(diaAnterior) != null){
                                            document.querySelector(diaAnterior).style.outline = "none";
                                        }
                                    }
                                }
                                
                            }else{
                                if(diaAnterior != ""){
                                    if(document.querySelector(diaAnterior) != null){
                                        document.querySelector(diaAnterior).style.outline = "none"; 
                                    }
                                }
                            }

                            if(numeroSemana == 0){
            
                                verDisponibilidadDia("", true, "");
            
                            }else{
            
                                if(numeroSemana == 6 && diasDisponInput == 5){
                                    verDisponibilidadDia("", "", true);
                                }else{
            
                                    if(numeroSemana == 6 && diasDisponInput > 5){
                                        verDisponibilidadDia(fecha, "", "");
                                    }else{
                                        if(numeroSemana > 0){
                                            verDisponibilidadDia(fecha, "", "");
                                        }
                                    }
            
                                }
            
                            }
                            
                        }

                    }

                })
                .catch((err) => console.log(err));

        }

        crearCalendario("", "", "", "", "");

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // FUNCIÓN: revisar la disponibilidad del horario y el día elegido (RESERVA POR DÍA)
    //-------------------------------------------------------------------------------------------
        
        let erroresPosibleXD = {

            1 : "Elija un día de inicio válido",
            2 : "El día de inicio elegido (sábado) NO está disponible para su membresía",
            3 : "El día de inicio elegido (domingo) NO es laborable", 
            4 : "El día final elegido (sábado) NO está disponible para su membresía",
            5 : "El día final elegido (domingo) NO es laborable",
            
        }

        function verDisponiHorarioXD(){

            if(
                document.querySelector("#diaInicioIN-Dia").value != "" &&
                document.querySelector("#cantDiasIN-Dia").value != 0 &&
                document.querySelector("#cantDiasIN-Dia").value != ""
            ){


                // Día Actual Suma y Fecha

                    let diaActualSuma = fechaActualCadena.split("-");
                    diaActualSuma = 
                        Number(diaActualSuma[0])+
                        (Number(diaActualSuma[1])*30)+
                        Number(diaActualSuma[2]);

                //---------------------------------------------------------------------------
                

                // Día de Inicio de la Reserva

                    let diaInicio = document.querySelector("#diaInicioIN-Dia").value;
                    let diaInicioSuma = diaInicio.split("-");
                    diaInicioSuma = 
                        Number(diaInicioSuma[0])+
                        (Number(diaInicioSuma[1])*30)+
                        Number(diaInicioSuma[2]);

                //--------------------------------------------------------------------------

                // Día Final de la Reserva

                    let numeroDias = Number(document.querySelector("#cantDiasIN-Dia").value)-1;

                    let diaFinal = "";
                    let diaFinalSuma = 0;

                    let formSumaFecha = new FormData();

                    formSumaFecha.append("fechaSuma", diaInicio);
                    formSumaFecha.append("dias", numeroDias);

                    fetch(urlModoCLienteData, {
                        method: "POST",
                        body: formSumaFecha,
                    })
                        .then((response) => response.json())
                        .then((data) => {

                            diaFinal = data[0];
                            diaFinalSuma = diaFinal.split("-");
                            diaFinalSuma = Number(diaFinalSuma[0])+(Number(diaFinalSuma[1])*30)+Number(diaFinalSuma[2]);
                            
                            let cadenaDiasDia = data[1];
        
                            console.log(cadenaDiasDia);
                            console.log(diaInicio);
                            console.log(diaFinal);
                            console.log(diaInicioSuma);
                            console.log(diaFinalSuma);
                            console.log(fechaActualCadena);
                            console.log(diaActualSuma);
        
                            //------------------------------------------------------------------------------------------
        
                            // Confirmando Errores Posibles
        
                            document.querySelector(".spanErrHorario").textContent = "";
                            
                            // Verificar que la fecha elegida sea mayor o igual a la actual
                            if(diaInicioSuma < diaActualSuma){
                                
                                document.querySelector(".spanErrHorario").style.color = "#ff2222";
                                document.querySelector(".spanErrHorario").textContent = erroresPosibleXD[1];
                                document.querySelector(".spanHorarioDias").textContent = "";

                                document.querySelector(".lisUnidad").innerHTML = "";
                                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                                document.querySelector(".divUnidElegi").innerHTML = "";
                                document.querySelector(".divUnidElegi").classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                document.querySelector(".inputUnid").classList.replace("inputUnid-C", "inputUnid-A");
                                document.querySelector(".inputUnid").setAttribute("disabled", "");
    
                            }
                            //--------------------------------------------------------------------------------------------------------
    
                            // Si la fecha de inicio es un sábado, verificar si está disponible
                            if(diaSemanaNumero(diaInicio) == 6 && diasDisponInput == 5){
                                
                                document.querySelector(".spanErrHorario").style.color = "#ff2222";
                                document.querySelector(".spanErrHorario").textContent = erroresPosibleXD[2];
                                document.querySelector(".spanHorarioDias").textContent = "";

                                document.querySelector(".lisUnidad").innerHTML = "";
                                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                                document.querySelector(".divUnidElegi").innerHTML = "";
                                document.querySelector(".divUnidElegi").classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                document.querySelector(".inputUnid").classList.replace("inputUnid-C", "inputUnid-A");
                                document.querySelector(".inputUnid").setAttribute("disabled", "");
    
                            }
                            //--------------------------------------------------------------------------------------------------------
    
                            // Si la fecha de inicio es un domingo
                            if(diaSemanaNumero(diaInicio) == 0){
                                
                                document.querySelector(".spanErrHorario").style.color = "#ff2222";
                                document.querySelector(".spanErrHorario").textContent = erroresPosibleXD[3];
                                document.querySelector(".spanHorarioDias").textContent = "";

                                document.querySelector(".lisUnidad").innerHTML = "";
                                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                                document.querySelector(".divUnidElegi").innerHTML = "";
                                document.querySelector(".divUnidElegi").classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                document.querySelector(".inputUnid").classList.replace("inputUnid-C", "inputUnid-A");
                                document.querySelector(".inputUnid").setAttribute("disabled", "");
    
                            }
                            //--------------------------------------------------------------------------------------------------------
    
                            // Si la fecha final es un sábado, verificar si está disponible
                            if(diaSemanaNumero(diaFinal) == 6 && diasDisponInput == 5){
                                
                                document.querySelector(".spanErrHorario").style.color = "#ff2222";
                                document.querySelector(".spanErrHorario").textContent = erroresPosibleXD[4];
                                document.querySelector(".spanHorarioDias").textContent = "";

                                document.querySelector(".lisUnidad").innerHTML = "";
                                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                                document.querySelector(".divUnidElegi").innerHTML = "";
                                document.querySelector(".divUnidElegi").classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                document.querySelector(".inputUnid").classList.replace("inputUnid-C", "inputUnid-A");
                                document.querySelector(".inputUnid").setAttribute("disabled", "");
    
                            }
                            //--------------------------------------------------------------------------------------------------------
    
                            // Si la fecha final es un domingo
                            if(diaSemanaNumero(diaFinal) == 0){
                                
                                document.querySelector(".spanErrHorario").style.color = "#ff2222";
                                document.querySelector(".spanErrHorario").textContent = erroresPosibleXD[5];
                                document.querySelector(".spanHorarioDias").textContent = "";

                                document.querySelector(".lisUnidad").innerHTML = "";
                                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                                document.querySelector(".divUnidElegi").innerHTML = "";
                                document.querySelector(".divUnidElegi").classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                document.querySelector(".inputUnid").classList.replace("inputUnid-C", "inputUnid-A");
                                document.querySelector(".inputUnid").setAttribute("disabled", "");
    
                            }
                            //--------------------------------------------------------------------------------------------------------
                
                            //------------------------------------------------------------------------------------------------------------
        
                            // Si no hay errores en los datos
        
                                if(document.querySelector(".spanErrHorario").textContent == ""){
        
                                    // Array de las unidades disponibles del producto
        
                                        let unidadesDispoXD = document.querySelector("#pdtUnidadesDispo").value;
                                        unidadesDispoXD = unidadesDispoXD.split(",");
        
                                    //-------------------------------------------------------------------------------
                                    
                                    const rangoUnidadesLisSema = document.createRange();

                                    console.log("Dias: "+cadenaDiasDia);

                                    let formDispoReseXD = new FormData();
        
                                    formDispoReseXD.append("fechaDiaElegidaXD", cadenaDiasDia);
        
                                    fetch(urlModoCLienteData, {
                                        method: "POST",
                                        body: formDispoReseXD,
                                    })
                                        .then((response) => response.json())
                                        .then((data) => {

                                            console.log(data);

                                            for(let i = 0; i < data.length; i++){
                                                
                                                for(let e = 0; e < unidadesDispoXD.length; e++){

                                                    if(data[i]["reserTipo"] == "semana"){

                                                        if(unidadesDispoXD[e] == data[i]["id_unidad"]){

                                                            unidadesDispoXD.splice(e, 1);

                                                        }

                                                    }

                                                    if(data[i]["reserTipo"] == "dia"){

                                                        if(unidadesDispoXD[e] == data[i]["id_unidad"]){

                                                            unidadesDispoXD.splice(e, 1);

                                                        }

                                                    }

                                                    if(data[i]["reserTipo"] == "hora"){

                                                        if(unidadesDispoXD[e] == data[i]["id_unidad"]){

                                                            unidadesDispoXD.splice(e, 1);

                                                        }

                                                    }

                                                }

                                            }

                                            let unidadesDispoXDStr = unidadesDispoXD.toString();

                                            console.log("Resultado: "+unidadesDispoXDStr);

                                            if(unidadesDispoXDStr != ""){

                                                let formUnidadesDispon = new FormData();

                                                formUnidadesDispon.append("unidDispoXH", unidadesDispoXDStr);
        
                                                fetch(urlModoCLienteData, {
                                                    method: "POST",
                                                    body: formUnidadesDispon,
                                                })
                                                    .then((response) => response.json())
                                                    .then((data) => {
            
                                                        document.querySelector("#diaInicioInputXD").value = diaInicio;
                                                        document.querySelector("#diaFinalInputXD").value = diaFinal;
                                                        document.querySelector("#cadenaDiasInputXD").value = cadenaDiasDia;
                                                        document.querySelector("#cantDiasInputXD").value = 
                                                            document.querySelector("#cantDiasIN-Dia").value;

                                                        erroresInput[7] = 0;
                                                        erroresInput[8] = 0;
                                                        erroresInput[9] = 0;
                                                        erroresInput[10] = 0;
                                                        confirmarErrores();
        
                                                        document.querySelector("#inputUnid").removeAttribute("disabled");
                                                        
                                                        document.querySelector(".lisUnidad").innerHTML = "";
                                                        document.querySelector(".spanErrHorario").style.color = "#22aa22"
                                                        document.querySelector(".spanErrHorario").textContent = "Fecha y horario disponibles";
                                                        document.querySelector(".spanHorarioDias").style.color = "#22aa22"
                                                        document.querySelector(".spanHorarioDias").textContent = "Inicio: "+diaInicio+" - Final: "+diaFinal;

                                                        if(document.querySelector("#tipoReservaIn").value == "hora"){

                                                            let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                            let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                            let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                            let cantidad = Number(document.querySelector("#cantHorasInputXH").value);
                                                            
                                                            let precioCantidad = cantidad*precio;
                                                            let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                                            let precioDescu =  precioCantidad-(precioCantidad*(descu/100));

                                                            document.querySelector(".precioTituloSpan").textContent = "Precio por Hora";
                                                            document.querySelector(".spanPrecio").textContent = precio+"$";
                                                            document.querySelector(".spanCantidad").textContent = cantidad;
                                                            document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                                            document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                            document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                            document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                                        }else{

                                                            if(document.querySelector("#tipoReservaIn").value == "dia"){

                                                                let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                                let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                                let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                                let cantidad = Number(document.querySelector("#cantDiasInputXD").value);
                                                                
                                                                let precioCantidad = cantidad*precio;
                                                                let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                                                let precioDescu =  precioCantidad-(precioCantidad*(descu/100));

                                                                document.querySelector(".precioTituloSpan").textContent = "Precio por Día";
                                                                document.querySelector(".spanPrecio").textContent = precio+"$";
                                                                document.querySelector(".spanCantidad").textContent = cantidad;
                                                                document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                                                document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                                document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                                document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                                            }else{

                                                                if(document.querySelector("#tipoReservaIn").value == "semana"){

                                                                    let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                                    let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                                    let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                                    
                                                                    let precioIva =  precio+(precio*(iva/100));
                                                                    let precioDescu =  precio-(precio*(descu/100));

                                                                    document.querySelector(".precioTituloSpan").textContent = "Precio por Semana";
                                                                    document.querySelector(".spanPrecio").textContent = precio+"$";
                                                                    document.querySelector(".spanCantidad").textContent = 1;
                                                                    document.querySelector(".spanSubtotal").textContent = precio+"$";
                                                                    document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                                    document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                                    document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                                                }

                                                            }

                                                        }
        
                                                        rangoUnidadesLisSema.selectNode(document.getElementsByTagName("div").item(0));
                                                        const listaUnidadesSema =
                                                            rangoUnidadesLisSema.createContextualFragment(data);
                                                        document.querySelector(".lisUnidad").appendChild(listaUnidadesSema);
        
                                                    })
                                                    .catch((err) => console.log(err));

                                            }else{

                                                document.querySelector("#diaInicioInputXD").value = "";
                                                document.querySelector("#diaFinalInputXD").value = "";
                                                document.querySelector("#cadenaDiasInputXD").value = "";
                                                document.querySelector("#cantDiasInputXD").value = "";
        
                                                erroresInput[7] = 1;
                                                erroresInput[8] = 1;
                                                erroresInput[9] = 1;
                                                erroresInput[10] = 1;
                                                confirmarErrores();

                                                document.querySelector(".precioTituloSpan").textContent = "Precio";
                                                document.querySelector(".spanPrecio").textContent = 0;
                                                document.querySelector(".spanCantidad").textContent = 0;
                                                document.querySelector(".spanSubtotal").textContent = 0;
                                                document.querySelector(".spanPrecioIva").textContent = 0;
                                                document.querySelector(".spanPrecioDescu").textContent = 0;
                                                document.querySelector(".spanTotalPrecio").textContent = 0;

                                                document.querySelector("#inputUnid").setAttribute("disabled", "");

                                                document.querySelector(".lisUnidad").innerHTML = "";
                                                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                                                document.querySelector(".spanErrHorario").style.color = "#ff2222"
                                                document.querySelector(".spanErrHorario").textContent = "El horario elegido ya está ocupado";
                                                document.querySelector(".spanHorarioDias").textContent = "";

                                            }
        
                                        })
                                        .catch((err) => console.log(err));
        
                                }
        
                            //------------------------------------------------------------------------------------------------------------

                        })
                        .catch((err) => console.log(err)); 

                //---------------------------------------------------------------------------

            }

        }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    // FUNCIÓN: revisar la disponibilidad de la semana elegida (RESERVA POR SEMANA)
    //--------------------------------------------------------------------------------------------

        const rangoUnidadesLisSemana = document.createRange();

        function verDisponiHorarioXS(){

            // Llenando Span horario disponibles
            let horario = "";

            if(document.querySelector("#diasDisponiblesMembre").value > 5){
                horario = "Horario Permitido: 7 AM - 7 PM | Lunes a Sábado";
            }else{
                horario = "Horario Permitido: 7 AM - 7 PM | Lunes a Viernes";
            }
            //------------------------------------------------------------------------

            // Creando la fecha actual y tomando el día de la semana
            let fecha = fechaActualCadena;
            let diaSema = diaSemanaNumero(fechaActualCadena);

            // Dias que se le sumaran a la fecha para formar la semana 
            //(5 = Lunes a Sábado | 4 = Lunes a Viernes)
            let diasDisponibles = document.querySelector("#diasDisponiblesMembre").value;
            diasDisponibles = diasDisponibles == 5 ? 4 : 5;

            // Creando la semana disponible

                //Consulta Fetch para verificar la disponibilidad de la semana.
                //(Se tomará la semana más próxima que esté completamente disponible).
                let diaAddInicio = null;
                let diaAddFinal = null;

                if(diaSema == 0){
                    
                    diaAddInicio = 1;
                    diaAddFinal = diasDisponibles;

                }else{

                    diaAddInicio = 8-diaSema;
                    diaAddFinal = diasDisponibles;

                }

                let formReseSemanaDispo = new FormData();
                
                formReseSemanaDispo.append("diaInicioDiasAdd", diaAddInicio);
                formReseSemanaDispo.append("diaFinalDiasAdd", diaAddFinal);
                formReseSemanaDispo.append("diaFecha", fecha);
                formReseSemanaDispo.append("posicionSemana", semanaPosicionGene); 
                formReseSemanaDispo.append("pdtUnidades", document.querySelector("#pdtUnidadesDispo").value);

                fetch(urlModoCLienteData, {
                    method: "POST",
                    body: formReseSemanaDispo,
                })
                    .then((response) => response.json())
                    .then((data) => {

                        if(data[0].length == 0){

                            //Insertando el contenido del DIV duración de la reserva MODO SEMANA
                            document.querySelector(".divDuracionGene").innerHTML = "";

                            let htmlDuracion = `
                            <div class="separador2"></div>
                            <div class="divDuracion1">
                                <span class="elige">Fecha y tiempo de la reserva</span>
                                <span class="horario">${horario}</span>
                            </div>
                            <div class="divDuracion2">
                                <span class="semana">Semana</span>
                                <span class="semanaF">Desde: <b class="desde">${data[1]}</b> | Hasta: <b class="hasta">${data[2]}</b></span>
                                <div class="divBtnSemanaMover">
                                    <button class="botonBloq btnAtras" disabled"><</button>
                                    <button class="botonDispo btnAdelante">></button>
                                </div>
                                <div class="divUnidadGene divUnidGene-A">   
                                    <div class="divUnidad2">
                                        <span class="unidadSpan">Unidad</span>
                                        <div class="div1">
                                            <input 
                                                disabled
                                                class = "inputUnid inputUnid-A" 
                                                placeholder = "Click para ver las unidades disponibles"
                                                id = "inputUnid"
                                            >
                                            <div class="divUnidElegi divUnidElegi-C">
                                            </div>
                                            <div class="lisUnidad lisUnid-C">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="divError">
                                    <span class="spanErr spanErrHorario"></span>
                                    <span class="spanHorarioDias"></span>
                                </div>
                            </div>
                            <div class="separador2"></div>
                            `;

                            document.querySelector(".divDuracionGene").innerHTML = "";

                            rangeDuracionDiv.selectNode(document.getElementsByTagName("div").item(0));
                            const pdtDuracionHtml =
                            rangeDuracionDiv.createContextualFragment(htmlDuracion);
                            document.querySelector(".divDuracionGene").appendChild(pdtDuracionHtml);
                            
                            document.querySelector(".spanErrHorario").style.color = "#22aa22"
                            document.querySelector(".spanErrHorario").textContent = "Esta semana está disponible";

                            document.querySelector("#diaInicioInputXS").value = data[1];
                            document.querySelector("#diaFinalInputXS").value = data[2];
                            document.querySelector("#diasSemanaInputXS").value = data[3];

                            document.querySelector("#inputUnid").removeAttribute("disabled");

                            if(document.querySelector("#inputUnid") != null){

                                window.addEventListener('click', function mostrarListaUnidad(e) {

                                    if (document.getElementById('inputUnid').contains(e.target)) {
                                        
                    
                                    } else {
                                        
                                        document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                    
                                    }
                    
                                });

                                document.querySelector("#inputUnid").addEventListener("click", (e)=>{
                                    
                                    document.querySelector(".lisUnidad").classList.replace("lisUnid-C", "lisUnid-A");
                        
                                });
                                
                            }

                            document.querySelector(".btnAtras").addEventListener("click", ()=>{

                                if(semanaPosicionGene > 0){
                                    semanaPosicionGene--;
                                    verDisponiHorarioXS();
                                }

                            });

                            document.querySelector(".btnAdelante").addEventListener("click", ()=>{

                                semanaPosicionGene++;
                                verDisponiHorarioXS();
                                
                            });

                            if(semanaPosicionGene > 0){
                                document.querySelector(".btnAtras").removeAttribute("disabled");
                                document.querySelector(".btnAtras").classList.replace("botonBloq", "botonDispo");
                            }else{
                                document.querySelector(".btnAtras").setAttribute("disabled", "");
                                document.querySelector(".btnAtras").classList.replace("botonDispo", "botonBloq");
                            }

                            let unidadDisponibleXS = document.querySelector("#pdtUnidadesDispo").value;

                            if(unidadDisponibleXS != ""){

                                let formUnidadesDispon = new FormData();

                                formUnidadesDispon.append("unidDispoXH", unidadDisponibleXS);

                                fetch(urlModoCLienteData, {
                                    method: "POST",
                                    body: formUnidadesDispon,
                                })
                                    .then((response) => response.json())
                                    .then((data) => {

                                        erroresInput[7] = 0;
                                        erroresInput[8] = 0;
                                        erroresInput[9] = 0;
                                        erroresInput[10] = 0;
                                        confirmarErrores();

                                        document.querySelector("#inputUnid").removeAttribute("disabled");
                                        
                                        document.querySelector(".lisUnidad").innerHTML = "";

                                        rangoUnidadesLisSemana.selectNode(document.getElementsByTagName("div").item(0));
                                        const listaUnidadesSema =
                                            rangoUnidadesLisSemana.createContextualFragment(data);
                                        document.querySelector(".lisUnidad").appendChild(listaUnidadesSema);

                                    })
                                    .catch((err) => console.log(err));

                            }
                            //---------------------------------------------------------------------------------------------------

                        }else{

                            // Reservas EXISTENTES

                            //Insertando el contenido del DIV duración de la reserva MODO SEMANA
                            document.querySelector(".divDuracionGene").innerHTML = "";

                            let htmlDuracion = `
                            <div class="separador2"></div>
                            <div class="divDuracion1">
                                <span class="elige">Fecha y tiempo de la reserva</span>
                                <span class="horario">${horario}</span>
                            </div>
                            <div class="divDuracion2">
                                <span class="semana">Semana</span>
                                <span class="semanaF">Desde: <b class="desde">${data[1]}</b> | Hasta: <b class="hasta">${data[2]}</b></span>
                                <div class="divBtnSemanaMover">
                                    <button class="botonBloq btnAtras"><</button>
                                    <button class="botonDispo btnAdelante">></button>
                                </div>
                                <div class="divUnidadGene divUnidGene-A">   
                                    <div class="divUnidad2">
                                        <span class="unidadSpan">Unidad</span>
                                        <div class="div1">
                                            <input 
                                                disabled
                                                class = "inputUnid inputUnid-A" 
                                                placeholder = "Click para ver las unidades disponibles"
                                                id = "inputUnid"
                                            >
                                            <div class="divUnidElegi divUnidElegi-C">
                                            </div>
                                            <div class="lisUnidad lisUnid-C">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="divError">
                                    <span class="spanErr spanErrHorario"></span>
                                    <span class="spanHorarioDias"></span>
                                </div>
                            </div>
                            <div class="separador2"></div>
                            `;

                            rangeDuracionDiv.selectNode(document.getElementsByTagName("div").item(0));
                            const pdtDuracionHtml =
                            rangeDuracionDiv.createContextualFragment(htmlDuracion);
                            document.querySelector(".divDuracionGene").appendChild(pdtDuracionHtml);

                            if(document.querySelector("#inputUnid") != null){

                                window.addEventListener('click', function mostrarListaUnidad(e) {

                                    if (document.getElementById('inputUnid').contains(e.target)) {
                                        
                    
                                    } else {
                                        
                                        document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                    
                                    }
                    
                                });

                                document.querySelector("#inputUnid").addEventListener("click", (e)=>{
                                    
                                    document.querySelector(".lisUnidad").classList.replace("lisUnid-C", "lisUnid-A");
                        
                                });
                                
                            }
                            
                            // Verificando disponibilidad de las unidades

                                let pdtUnidadesSema = document.querySelector("#pdtUnidadesDispo").value.split(",");

                                for(let i = 0; i < data[0].length; i++){

                                    for(let e = 0; e < pdtUnidadesSema.length; e++){

                                        if(pdtUnidadesSema[e] == data[0][i]["id_unidad"]){

                                            pdtUnidadesSema.splice(e, 1);

                                        }

                                    }

                                }

                                let pdtUnidadesSemaStr = pdtUnidadesSema.toString();

                                if(pdtUnidadesSemaStr != ""){

                                    erroresInput[7] = 0;
                                    erroresInput[8] = 0;
                                    erroresInput[9] = 0;
                                    erroresInput[10] = 0;
                                    confirmarErrores();

                                    let formUnidadesDispon = new FormData();

                                    formUnidadesDispon.append("unidDispoXH", pdtUnidadesSemaStr);

                                    fetch(urlModoCLienteData, {
                                        method: "POST",
                                        body: formUnidadesDispon,
                                    })
                                        .then((response) => response.json())
                                        .then((data) => {

                                            erroresInput[7] = 0;
                                            erroresInput[8] = 0;
                                            erroresInput[9] = 0;
                                            erroresInput[10] = 0;
                                            confirmarErrores();

                                            document.querySelector("#inputUnid").removeAttribute("disabled");
                                            
                                            document.querySelector(".lisUnidad").innerHTML = "";

                                            rangoUnidadesLisSemana.selectNode(document.getElementsByTagName("div").item(0));
                                            const listaUnidadesSema =
                                                rangoUnidadesLisSemana.createContextualFragment(data);
                                            document.querySelector(".lisUnidad").appendChild(listaUnidadesSema);

                                        })
                                        .catch((err) => console.log(err));

                                    document.querySelector(".spanErrHorario").style.color = "#22aa22"
                                    document.querySelector(".spanErrHorario").textContent = "Esta semana está disponible";

                                    document.querySelector("#diaInicioInputXS").value = data[1];
                                    document.querySelector("#diaFinalInputXS").value = data[2];
                                    document.querySelector("#diasSemanaInputXS").value = data[3];

                                    let precio = Number(document.querySelector("#precioIndividualIn").value);
                                    let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                    let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                    
                                    let precioIva =  precio+(precio*(iva/100));
                                    let precioDescu =  precio-(precio*(descu/100));

                                    document.querySelector(".precioTituloSpan").textContent = "Precio por Semana";
                                    document.querySelector(".spanPrecio").textContent = precio+"$";
                                    document.querySelector(".spanCantidad").textContent = 1;
                                    document.querySelector(".spanSubtotal").textContent = precio+"$";
                                    document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                    document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                    document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                }else{

                                    erroresInput[7] = 1;
                                    erroresInput[8] = 1;
                                    erroresInput[9] = 1;
                                    erroresInput[10] = 1;
                                    confirmarErrores();

                                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                                    document.querySelector(".spanPrecio").textContent = 0;
                                    document.querySelector(".spanCantidad").textContent = 0;
                                    document.querySelector(".spanSubtotal").textContent = 0;
                                    document.querySelector(".spanPrecioIva").textContent = 0;
                                    document.querySelector(".spanPrecioDescu").textContent = 0;
                                    document.querySelector(".spanTotalPrecio").textContent = 0;
                                    
                                    document.querySelector(".spanErrHorario").style.color = "#ff2222"
                                    document.querySelector(".spanErrHorario").textContent = "Esta semana NO está disponible en su totalidad. Elija otra.";

                                    document.querySelector("#diaInicioInputXS").value = "";
                                    document.querySelector("#diaFinalInputXS").value = "";
                                    document.querySelector("#diasSemanaInputXS").value = "";

                                    document.querySelector(".lisUnidad").innerHTML = "";
                                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                                    document.querySelector("#inputUnid").setAttribute("disabled", "");


                                }

                            //---------------------------------------------------------------------------------------------------
                            

                            // Fechas para selección de la semana
                            document.querySelector(".btnAtras").addEventListener("click", ()=>{

                                if(semanaPosicionGene > 0){
                                    semanaPosicionGene--;
                                    verDisponiHorarioXS();
                                }

                            });

                            document.querySelector(".btnAdelante").addEventListener("click", ()=>{

                                semanaPosicionGene++;
                                verDisponiHorarioXS();

                            });
                            //------------------------------------------------------------------------------

                            // Desactivar o Activar botón para retroceder la semana según la posición
                            if(semanaPosicionGene > 0){
                                document.querySelector(".btnAtras").removeAttribute("disabled");
                                document.querySelector(".btnAtras").classList.replace("botonBloq", "botonDispo");
                            }else{
                                document.querySelector(".btnAtras").setAttribute("disabled", "");
                                document.querySelector(".btnAtras").classList.replace("botonDispo", "botonBloq");
                            }
                            //---------------------------------------------------------------------------------------------------

                        }
                    
                    })
                    .catch((err) => console.log(err));
                //-------------------------------------------------------------------------------------------
            
            //-------------------------------------------------------------------------------------------------------

        }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------
    // FUNCIÓN: revisar la disponibilidad del día
    //--------------------------------------------------

        // Función Secundaria: intervalo para mover la barra en la línea de tiempo
        let fechaLTBarra = "";
        let fechaSeparadaLTBarra = "";
        let horaLTBarra1 = "";
        let horaLTBarra2 = "";
        let minuLTBarra = "";

        function intervaloLineaTiempoBarra(fechaParam){

            if(intervaloLTDispoDia == null){

                fechaLTBarra = fechaParam == "" ? fechaActualCadena : fechaParam;

                fechaSeparadaLTBarra = fechaLTBarra.split("-");
                
                fechaLTBarra = fechaSeparadaLTBarra[0]+"-"+fechaSeparadaLTBarra[1]+"-"+fechaSeparadaLTBarra[2];

                horaLTBarra1 = ((new Date().getHours())*60);
                
                intervaloLTDispoDia = setInterval(()=>{
                    
                    if(
                        document.querySelector(".diasDivGene") != null && 
                        fechaActualCadena == fechaLTBarra && 
                        (horaLTBarra1 >= 420 && horaLTBarra1 < 1140)
                    ){
                        
                        horaLTBarra2 = new Date().getHours();
                        minuLTBarra = new Date().getMinutes();

                        let izquierda = (minuLTBarra*0.1466)+(lineaTRecorrido[horaLTBarra2]);

                        document.querySelector(".barraLT").style.left = izquierda+"rem";
                        document.querySelector(".barraLT").style.backgroundColor = "#2e0896";

                    }else{

                        clearInterval(intervaloLTDispoDia);
                        intervaloLTDispoDia = null;

                        document.querySelector(".barraLT").style.left = "0rem";
                        document.querySelector(".barraLT").style.backgroundColor = "#00000000";

                    }

                }, 500);

            }else{

                clearInterval(intervaloLTDispoDia);
                intervaloLTDispoDia = null;
                
                intervaloLineaTiempoBarra(fechaParam);

            }
            
        }

        // Función secundaria: posicionar el tiempo ocupado por las reservas en la línea de tiempo (cuadros naranjas)
        const rangoReservasBaseLT = document.createRange();
        const rangoHorariosDisponLT = document.createRange();

        let fechaElegidaReseLT = "";
        let fechaElegidaSumaLT = 0;
        let fechaActualLT = "";
        let fechaActualSumaLT = "";
        var objetoDispoUnidad = new Object();
        var objetoDispoUnidad2 = new Object();

        function intervaloReservasPosicionar(fechaParam, posicionGene){

            if(intervaloReseDispoDia == null){

                fechaElegidaReseLT = fechaParam == "" ? fechaActualCadena : fechaParam;

                fechaElegidaSumaLT = fechaElegidaReseLT.split("-");
                fechaElegidaSumaLT = 
                    Number(fechaElegidaSumaLT[0])+
                    Number(fechaElegidaSumaLT[1]*30)+
                    Number(fechaElegidaSumaLT[2]);
                
                fechaActualLT = fechaActualCadena.split("-");
                fechaActualSumaLT = 
                    Number(fechaActualLT[0])+
                    Number(fechaActualLT[1]*30)+
                    Number(fechaActualLT[2]);

                intervaloReseDispoDia = setInterval(()=>{

                    if(
                        document.querySelector(".diasDivGene") != null && 
                        fechaElegidaSumaLT >= fechaActualSumaLT &&
                        document.querySelector(".div2").classList.contains("div2-A")
                    ){

                        let formReseLT = new FormData();

                        formReseLT.append("fechaReservasLT", fechaElegida);

                        fetch(urlModoCLienteData, {
                            method: "POST",
                            body: formReseLT,
                        })
                            .then((response) => response.json())
                            .then((data) => {

                                let unidadesPdtDispo = document.querySelector("#pdtUnidadesDispo").value.split(",");
                                var reservaHora = [];

                                if(data.length > 0){

                                    for1:
                                    for(let a = 0; a < data.length; a++){

                                        if(
                                            data[a]["reserTipo"] == "dia" ||
                                            data[a]["reserTipo"] == "semana"
                                        ){

                                            for(let e = 0; e < unidadesPdtDispo.length; e++){

                                                if(unidadesPdtDispo[e] == data[a]["id_unidad"]){

                                                    unidadesPdtDispo.splice(e,1);

                                                }

                                            }

                                        }

                                        if(unidadesPdtDispo.length == 0){
                                            break for1;
                                        }

                                        if(data[a]["reserTipo"] == "hora"){

                                            reservaHora.push(data[a]);

                                        }

                                    }

                                    for(let i = 0; i < unidadesPdtDispo.length; i++){

                                        objetoDispoUnidad2[Number(unidadesPdtDispo[i])] = [];
                                        objetoDispoUnidad[Number(unidadesPdtDispo[i])] = [];

                                    }

                                    for(let i = 0; i < reservaHora.length; i++){

                                        let horaEntraReseMinu = horaAMinutos(reservaHora[i]["horaEntradaR"]);
                                        let horaSaleReseMinu = horaAMinutos(reservaHora[i]["horaSalidaR"]);

                                        objetoDispoUnidad[Number(reservaHora[i]["id_unidad"])].push(horaEntraReseMinu);
                                        objetoDispoUnidad[Number(reservaHora[i]["id_unidad"])].push(horaSaleReseMinu);

                                    }

                                    let claves = Object.keys(objetoDispoUnidad);

                                    for(let i = 0; i < claves.length; i++){

                                        let clave = claves[i];
                                        let posicion = objetoDispoUnidad[clave];
                                        
                                        for2:
                                        for(let e = 0; e < posicion.length; e++){

                                            if(posicion.length == 0){

                                                objetoDispoUnidad2[clave].push(420, 1140);
                                                break for2;
                                                
                                            }else{

                                                objetoDispoUnidad2[clave].push(posicion[e])

                                            }

                                        };

                                    }

                                    var arrayLlenoUnidades = [];
                                    var disponibleAhora = 0;

                                    for(let a = 0; a < claves.length; a++){

                                        if(objetoDispoUnidad2[claves[a]].length == 0){
                                            
                                            arrayLlenoUnidades.push([0, claves[a], objetoDispoUnidad2[claves[a]]]);
                                            disponibleAhora++;

                                        }else{

                                            objetoDispoUnidad2[claves[a]].sort(function (a, b) {
                                            return a - b;
                                            });

                                            arrayLlenoUnidades.push([1, claves[a], objetoDispoUnidad2[claves[a]]]); 

                                        }

                                    }

                                    var arrayLlenoUnidades2 = [];

                                    for(let e = 0; e < arrayLlenoUnidades.length; e++){

                                        if(e > 0){
                                            arrayLlenoUnidades2.push("_")
                                        }

                                        for(let x = 0; x < arrayLlenoUnidades[e][2].length; x++){
                                            if(x == 0){
                                                if(arrayLlenoUnidades[e][2][x] > 420){
                                                    arrayLlenoUnidades2.push(420);
                                                    arrayLlenoUnidades2.push(arrayLlenoUnidades[e][2][x]);
                                                }
                                            }else{
                                                if(x == arrayLlenoUnidades[e][2].length-1){
                                                    if(arrayLlenoUnidades[e][2][x] < 1140){
                                                        arrayLlenoUnidades2.push(arrayLlenoUnidades[e][2][x]);
                                                        arrayLlenoUnidades2.push(1140);
                                                    }
                                                }else{
                                                    arrayLlenoUnidades2.push(arrayLlenoUnidades[e][2][x]);
                                                }
                                            }
                                        }

                                    }

                                    arrayLlenoUnidades2 = arrayLlenoUnidades2.toString();
                                    arrayLlenoUnidades2 = arrayLlenoUnidades2.split("_");

                                    var htmlHoariosDispo = "";
                                    var arrayReservasLT = [];

                                    if(disponibleAhora > 0){

                                        htmlHoariosDispo = `
                                        <span class="spanHorario">7:00 AM - 7:00 PM</span>
                                        `;

                                        arrayReservasLT.push([0, 106]);

                                    }else{

                                        let sumaActual = 100000000000;
                                        let posicion = 0;

                                        for(let e = 0; e < arrayLlenoUnidades2.length; e++){
                                            let suma = arrayLlenoUnidades2[e].length;
                                            if(suma<sumaActual){
                                                sumaActual = suma;
                                                posicion = e;
                                            }
                                        }
                                        
                                        posicion = posicionGene == "" ? posicion : posicionGene;

                                        let arraySelec = arrayLlenoUnidades2[posicion].split(",");
                                        let longitud = arraySelec.length;

                                        for(let i = 0; i < longitud-2; i+=2){
                                            
                                            let horaEntra = minutosAHora(arraySelec[i]);
                                            let horaSale = minutosAHora(arraySelec[i+1]);

                                            htmlHoariosDispo += `
                                            <span class="spanHorario">${horaEntra} - ${horaSale}</span>
                                            `;

                                        }
                                        
                                        let htmlReservasBaseLT = "";

                                        for(let x = 0; x < arrayLlenoUnidades[posicion][2].length; x+=2){
                                        
                                            let horaEntra = minutosAHora(arrayLlenoUnidades[posicion][2][x]);
                                            let horaSale = minutosAHora(arrayLlenoUnidades[posicion][2][x+1]);

                                            let hora = Number(horaEntra.split(":")[0]);
                                            hora = hora < 12 && horaEntra.split(":")[1].substring(3,5)=="PM" ? hora + 12 : hora;
                                            let minu = Number(horaEntra.split(":")[1].substring(0,2));

                                            let izquierda = (minu*0.1466)+(lineaTRecorrido[hora]);
                                            let ancho = 0.1466*(arrayLlenoUnidades[posicion][2][x+1]-arrayLlenoUnidades[posicion][2][x]);

                                            htmlReservasBaseLT += `
                                            <div class="divDisponibilidad" style="left: ${izquierda}rem; width: ${ancho}rem;"></div>
                                            `;

                                        }

                                        document.querySelector(".divDispoReserBase").innerHTML = "";
    
                                        rangoReservasBaseLT.selectNode(document.getElementsByTagName("div").item(0));
                                        const reservasBaseLT =
                                            rangoReservasBaseLT.createContextualFragment(htmlReservasBaseLT);
                                        document.querySelector(".divDispoReserBase").appendChild(reservasBaseLT);

                                    }

                                }else{
                                    
                                    // Cuando la data está vacía (Horario Disponible)
                                    document.querySelector(".divDispoReserBase").innerHTML = "";

                                }
                            
                            })
                            .catch((err) => console.log(err));

                    }else{

                        clearInterval(intervaloReseDispoDia);
                        intervaloReseDispoDia = null;

                    }

                }, 500);

            }else{

                clearInterval(intervaloReseDispoDia);
                intervaloReseDispoDia = null;

                intervaloReservasPosicionar(fechaParam, posicionGene);

            }

        }

        // Variables para el Outline de los días en el calendario al darles click
        let diaNumeroId = "";

        // Variables para la fecha elegida
        let fechaElegida = "";
        let fechaSeparadaGene = "";
        let diaActuSumaOutline = 0;
        let diaFijoSumaOutline = 0;

        // Función Principal
        function verDisponibilidadDia(fechaParam, bloq, sabado){

            fechaElegida = fechaParam == "" ? fechaActualCadena : fechaParam;

            if(document.querySelector("#inputDesde-Hora") != null){
                document.querySelector("#inputDesde-Hora").value = fechaElegida;
            }

            fechaSeparadaGene = fechaElegida.split("-");

            diaActuSumaOutline = 
                Number(fechaSeparadaGene[0])+
                (Number(fechaSeparadaGene[1])*30)+
                Number(fechaSeparadaGene[2]);

            diaFijoSumaOutline = fechaActualCadena.split("-");
            diaFijoSumaOutline = 
                Number(diaFijoSumaOutline[0])+
                (Number(diaFijoSumaOutline[1])*30)+
                Number(diaFijoSumaOutline[2]);

            // Intervalo para la barra de la linea de tiempo  

            if(bloq == "" && sabado == "" && diaActuSumaOutline >= diaFijoSumaOutline){

                //-----------------------------------------------------------------------------------------------
            
                //Marcando día al dar click en el calendario
                diaNumeroId = 
                String(Number(fechaSeparadaGene[2]))+
                String(Number(fechaSeparadaGene[1]))+
                fechaSeparadaGene[0];

                if(fechaElegida != fechaActualCadena){

                    if(diaAnterior == ""){

                        diaAnterior = "#dia"+diaNumeroId;
                        document.querySelector("#dia"+diaNumeroId).style.outline = "3px solid #9e2ec399";

                    }else{

                        if(document.querySelector(diaAnterior) != null){
                            document.querySelector(diaAnterior).style.outline = "none";
                        }
                        document.querySelector("#dia"+diaNumeroId).style.outline = "3px solid #9e2ec399";
                        diaAnterior = "#dia"+diaNumeroId;

                    }

                }else{

                    if(diaAnterior != ""){
                        if(document.querySelector(diaAnterior) != null){
                            document.querySelector(diaAnterior).style.outline = "none";
                        }
                    }

                }

                //-----------------------------------------------------------------------------------------------

                intervaloLineaTiempoBarra(fechaElegida);

            }else{

                clearInterval(intervaloLTDispoDia);
                intervaloLTDispoDia = null;

                document.querySelector(".barraLT").style.left = "0rem";
                document.querySelector(".barraLT").style.backgroundColor = "#00000000";

                if(diaAnterior != ""){
                    if(document.querySelector(diaAnterior) != null){
                        document.querySelector(diaAnterior).style.outline = "none"; 
                    }
                }

            }

            //-----------------------------------------------------------------------------------------

            // Intervalo para posicionar las reservas en la linea de tiempo

            if(bloq == "" && sabado == "" && diaActuSumaOutline >= diaFijoSumaOutline){

                document.querySelector(".diaSpanPrin").classList.replace("diaSpanPrin-B", "diaSpanPrin-D");
                document.querySelector(".diaSpanPrin").textContent = 
                    Number(fechaSeparadaGene[2])+" de "+mesesFactura[Number(fechaSeparadaGene[1])]+" de "+Number(fechaSeparadaGene[0]);
                document.querySelector(".spanInstru").textContent = " - Revise la disponibilidad del día antes de proseguir";

                intervaloReservasPosicionar(fechaElegida, "");

            }else{

                clearInterval(intervaloReseDispoDia);
                intervaloReseDispoDia = null;
                
                document.querySelector(".divDispoReserBase").innerHTML = "";

                if(bloq != ""){
                    document.querySelector(".diaSpanPrin").classList.replace("diaSpanPrin-D", "diaSpanPrin-B");
                    document.querySelector(".diaSpanPrin").textContent="Este día (domingo) NO es laboral";
                }else{
                    if(sabado != ""){
                        document.querySelector(".diaSpanPrin").classList.replace("diaSpanPrin-D", "diaSpanPrin-B");
                        document.querySelector(".diaSpanPrin").textContent = "Este día (sábado) NO está disponible para su membresía";
                        document.querySelector(".spanInstru").textContent = "";
                    }
                }

            }

            //-----------------------------------------------------------------------------------------

            if(document.querySelector("#inputDesde-Hora") != null){
                verDisponiHorarioXH2();
            }

        };

        // Ver disponibilidad del día al cargar página
        let numeroSemana = diaSemanaNumero(fechaActualCadena);

        if(numeroSemana == 0){

            verDisponibilidadDia("", true, "");

        }else{

            if(numeroSemana == 6 && diasDisponInput == 5){
                verDisponibilidadDia("", "", true);
            }else{

                if(numeroSemana == 6 && diasDisponInput > 5){
                    verDisponibilidadDia("", "", "");
                }else{
                    if(numeroSemana > 0){
                        verDisponibilidadDia("", "", "");
                    }
                }

            }

        }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // FUNCIÓN: elegir el producto de la lista desplegable al dar click (Nueva Reserva)
    //-------------------------------------------------------------------------------------------
        
        const rangePdtElegNewRese = document.createRange();
        const rangeDuracionDiv = document.createRange();
        const rangeCalendarioDias = document.createRange();

        function selectPdtNewRese(id){

            let idPdt = id;

            document.querySelector("#idPdtSelectedInput").value = idPdt;

            erroresInput[0] = 0;
            confirmarErrores();

            let formPdtSelected = new FormData();

            formPdtSelected.append("idPdtSelected", idPdt);

            fetch(urlModoCLienteData, {
                method: "POST",
                body: formPdtSelected,
            })
                .then((response) => response.json())
                .then((data) => {

                    document.querySelector("#inputSelecPdt").value = "";
                    document.querySelector(".producReserLista").innerHTML = "";
                    document.querySelector(".producReserLista").classList.replace("prodRLista-A", "prodRLista-C");

                    document.querySelector(".div1").classList.replace("div1-A", "div1-C");
                    document.querySelector(".div2").classList.replace("div2-C", "div2-A");

                    rangePdtElegNewRese.selectNode(document.getElementsByTagName("div").item(0));
                    const pdtSelected =
                    rangePdtElegNewRese.createContextualFragment(data);
                    document.querySelector(".prodContGene-A").appendChild(pdtSelected);

                    let btnsTReseIn = document.querySelectorAll(".btnTReseIn");
                    let btnsTReseCli = document.querySelectorAll(".btr");

                    for(let i=0; i < btnsTReseIn.length; i++){
                        
                        if(btnsTReseIn[i].value != 0){
                            
                            btnsTReseCli[i].classList.replace("btnBloq", "btnDispo");
                            btnsTReseCli[i].removeAttribute("disabled");

                            // Reserva por HORA - BOTÓN
                            if(btnsTReseIn[i].getAttribute("tipo") == "hora"){

                                btnsTReseCli[i].addEventListener("click", (e)=>{

                                    // Guardando el tipo de reserva en el Input Tipo Reserva
                                    document.querySelector("#tipoReservaIn").value = "hora";
                                    erroresInput[1] = 0;
                                    confirmarErrores();

                                    document.querySelector("#precioIndividualIn").value = document.querySelector(".precioXH").value;

                                    // Eliminando cubiertas del calendario y los botones
                                    document.querySelector(".cubiertaCalen").classList.replace("cubiertaCalen-A", "cubiertaCalen-C");
                                    document.querySelector(".cubiertaBtn").classList.replace("cubiertaBtn-A", "cubiertaBtn-C");

                                    // Cambio de estilo al desbloquear el Input de Miembro
                                    document.querySelector("#inputMiembro").classList.replace("inputMiembro-A-Bloq", "inputMiembro-A");
                                    //-------------------------------------------------------------------------------

                                    // Span disponibilidad 
                                    let horario = "";

                                    if(diasDisponInput > 5){
                                        horario = "Horario Permitido: 7 AM - 7 PM | Lunes a Sábado";
                                    }else{
                                        horario = "Horario Permitido: 7 AM - 7 PM | Lunes a Viernes";
                                    }
                                    //-------------------------------------------------------------------------------

                                    // Limpiando los botones Tipo de Reserva
                                    let btnDispo = document.querySelectorAll(".btr");

                                    for(let e = 0; e < btnDispo.length; e++){

                                        if(btnDispo[e].classList.contains("btnSelec")){

                                            btnDispo[e].classList.replace("btnSelec", "btnDispo");

                                        }

                                    };
                                    //-------------------------------------------------------------------------------

                                    // Cambiando clase a botón seleccionado al dar click
                                    btnsTReseCli[i].classList.replace("btnDispo", "btnSelec");
                                    //-------------------------------------------------------------------------------

                                    // Insertando el selector de horario TIPO HORA
                                    document.querySelector(".divDuracionGene").innerHTML = "";

                                    let htmlDuracion = `
                                    <div class="separador2"></div>
                                    <div class="divDuracion1">
                                        <span class="elige">Elige la fecha y el tiempo de la reserva</span>
                                        <span class="horario">${horario}</span>
                                    </div>
                                    <div class="divDuracion2">
                                        <div class="divDia">
                                            <div class="divDia2">
                                                <span>Día</span>
                                                <input class="inputDesde" id="inputDesde-Hora" type="date">
                                            </div>
                                            <div class="divHora">
                                                <span>Hora</span>
                                                <input class="inputHora" id="inputHora-Hora" type="time">
                                            </div>
                                        </div>
                                        <div class="divCantidad">
                                            <span>Duración</span>
                                            <div class="divHora">
                                                <input class="inputCantidad" id="inputHoraDur-Hora" type="number" min="1" max="12" value="1">
                                                <span class="diasSpan">H</span>
                                            </div>
                                            <div class="divMinu">
                                                <input class="inputCantidad" id="inputMinuDur-Hora" type="number" min="0" max="55" step="5" value="0">
                                                <span class="diasSpan">m</span>
                                            </div>
                                        </div>
                                        <div class="divUnidadGene divUnidGene-A">   
                                            <div class="divUnidad2">
                                                <span class="unidadSpan">Unidad</span>
                                                <div class="div1">
                                                    <input 
                                                        disabled
                                                        class = "inputUnid inputUnid-A" 
                                                        placeholder = "Click para ver las unidades disponibles"
                                                        id = "inputUnid"
                                                    >
                                                    <div class="divUnidElegi divUnidElegi-C">
                                                    </div>
                                                    <div class="lisUnidad lisUnid-C">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="divError">
                                            <span class="spanErr spanErrHorario"></span>
                                        </div>
                                    </div>
                                    <div class="separador2"></div>
                                    `;

                                    rangeDuracionDiv.selectNode(document.getElementsByTagName("div").item(0));
                                    const pdtDuracionHtml =
                                        rangeDuracionDiv.createContextualFragment(htmlDuracion);
                                    document.querySelector(".divDuracionGene").appendChild(pdtDuracionHtml);

                                    // Evitando que se pueda escribir en el input de la unidad
                                    document.querySelector("#inputUnid").addEventListener("keydown", (e)=>{

                                        e.preventDefault();

                                    });
                                    //----------------------------------------------------------------------------------

                                    //----------------------------------------------------------------------------------------------------

                                    // Desbloqueando los demas inputs
                                    document.querySelector("#inputMiembro").removeAttribute("disabled");
                                    document.querySelector("#inputNumPerso").removeAttribute("disabled");
                                    document.querySelector("#inputTitulo").removeAttribute("disabled");
                                    document.querySelector("#actividadRese").removeAttribute("disabled");
                                    //-----------------------------------------------------------------------
                                
                                    //--------------------------------------------------------------------------------

                                    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

                                    // Eventos al insertar el Div de Duración de la reserva TIPO HORA

                                        //-------------------------------------------------
                                        // Input Día de Inicio - RESERVA POR HORA - INICIO
                                        //-------------------------------------------------
                                        if(document.querySelector("#inputDesde-Hora") != null){

                                            document.querySelector("#inputDesde-Hora").addEventListener("input", (e)=>{

                                                let fechaSeparadaGene = e.target.value.split("-");

                                                if(document.querySelector("#idPdtSelected") != null){

                                                    let idProducto = document.querySelector("#idPdtSelected").value;
                                                    let tipoRese = document.querySelector("#tipoReservaIn").value;
                                
                                                    crearCalendario
                                                    (
                                                        Number(fechaSeparadaGene[1]), 
                                                        Number(fechaSeparadaGene[0]), 
                                                        idProducto, 
                                                        tipoRese,
                                                        ''
                                                    );
                                
                                                }

                                                verDisponiHorarioXH();

                                            });

                                            document.querySelector("#diaInicioInputXH").addEventListener("input", (e)=>{

                                                let fechaSeparadaGene = e.target.value.split("-");

                                                if(document.querySelector("#idPdtSelected") != null){

                                                    let idProducto = document.querySelector("#idPdtSelected").value;
                                                    let tipoRese = document.querySelector("#tipoReservaIn").value;
                                
                                                    crearCalendario
                                                    (
                                                        Number(fechaSeparadaGene[1]), 
                                                        Number(fechaSeparadaGene[0]), 
                                                        idProducto, 
                                                        tipoRese,
                                                        ''
                                                    );
                                
                                                }

                                                verDisponiHorarioXH();

                                            });

                                        }
                                        //-------------------------------------------------
                                        // Input Día de Inicio - RESERVA POR HORA - FIN
                                        //-------------------------------------------------

                                        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                                        
                                        //--------------------------------------------------
                                        // Input Hora de Inicio - RESERVA POR HORA - INICIO
                                        //--------------------------------------------------
                                        if(document.querySelector("#inputHora-Hora") != null){

                                            document.querySelector("#inputHora-Hora").addEventListener("input", (e)=>{

                                                verDisponiHorarioXH();

                                            });
                                            
                                        }
                                        //--------------------------------------------------
                                        // Input Hora de Inicio - RESERVA POR HORA - FIN
                                        //--------------------------------------------------

                                        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

                                        //-----------------------------------------------------
                                        // Input Cantidad de Horas - RESERVA POR HORA - INICIO
                                        //-----------------------------------------------------
                                        if(document.querySelector("#inputHoraDur-Hora") != null){

                                            document.querySelector("#inputHoraDur-Hora").addEventListener("input", (e)=>{
                                
                                                verDisponiHorarioXH();
                                    
                                            });

                                        }
                                        //-----------------------------------------------------
                                        // Input Cantidad de Horas - RESERVA POR HORA - FIN
                                        //-----------------------------------------------------

                                        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                                        
                                        //--------------------------------------------------------
                                        // Input Cantidad de Minutos - RESERVA POR HORA - INICIO
                                        //--------------------------------------------------------
                                        if(document.querySelector("#inputMinuDur-Hora") != null){

                                            document.querySelector("#inputMinuDur-Hora").addEventListener("input", (e)=>{
                                
                                                verDisponiHorarioXH();
                                    
                                            });

                                        }
                                        //--------------------------------------------------------
                                        // Input Cantidad de Minutos - RESERVA POR HORA - FIN
                                        //--------------------------------------------------------

                                        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

                                        //---------------------------------------------------
                                        // Input Unidad Elegida - RESERVA POR HORA - INICIO
                                        //---------------------------------------------------
                                        if(document.querySelector("#inputUnid") != null){

                                            window.addEventListener('click', function mostrarListaUnidad(e) {

                                                if(document.querySelector("#inputUnid") != null){

                                                    if (document.getElementById('inputUnid').contains(e.target)) {
                                                    
                                
                                                    } else {
                                                        
                                                        document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                    
                                                    }
                                                    
                                                }
                                
                                            });

                                            document.querySelector("#inputUnid").addEventListener("click", (e)=>{
                                                
                                                if(document.querySelector("#inputUnid") != null){

                                                    document.querySelector(".lisUnidad").classList.replace("lisUnid-C", "lisUnid-A");

                                                }

                                            });
                                            
                                        }
                                        //---------------------------------------------------
                                        // Input Unidad Elegida - RESERVA POR HORA - INICIO
                                        //---------------------------------------------------

                                        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

                                        //--------------------------------------------------------------------------------------------

                                        // Dibujando el calendario segun el producto y el tipo de reserva elegido

                                            let idPdt = document.querySelector("#idPdtSelected").value;

                                            crearCalendario('', '', idPdt, 'hora', '');

                                        //----------------------------------------------------------------------------------------
                                    
                                });

                            }else{

                                // Reserva por DÍA - BOTÓN
                                if(btnsTReseIn[i].getAttribute("tipo") == "dia"){

                                    btnsTReseCli[i].addEventListener("click", (e)=>{

                                        document.querySelector("#tipoReservaIn").value = "dia";
                                        erroresInput[1] = 0;
                                        confirmarErrores();

                                        document.querySelector("#precioIndividualIn").value = document.querySelector(".precioXD").value;

                                        document.querySelector(".cubiertaCalen").classList.replace("cubiertaCalen-A", "cubiertaCalen-C");
                                        document.querySelector(".cubiertaBtn").classList.replace("cubiertaBtn-A", "cubiertaBtn-C");

                                        // Cambio de estilo al desbloquear el Input de Miembro
                                        document.querySelector("#inputMiembro").classList.replace("inputMiembro-A-Bloq", "inputMiembro-A");
                                        //-------------------------------------------------------------------------------

                                        document.querySelector("#inputNumPerso").removeAttribute("disabled");

                                        let horario = "";

                                        if(document.querySelector("#diasDisponiblesMembre").value > 5){
                                            horario = "Horario Permitido: 7 AM - 7 PM | Lunes a Sábado";
                                        }else{
                                            horario = "Horario Permitido: 7 AM - 7 PM | Lunes a Viernes";
                                        }

                                        let btnDispo = document.querySelectorAll(".btr");

                                        for(let e = 0; e < btnDispo.length; e++){

                                            btnDispo[e].classList.replace("btnSelec", "btnDispo");

                                        };

                                        btnsTReseCli[i].classList.replace("btnDispo", "btnSelec");

                                        document.querySelector(".divDuracionGene").innerHTML = "";
    
                                        let htmlDuracion = `
                                        <div class="separador2"></div>
                                        <div class="divDuracion1">
                                            <span class="elige">Elige la fecha y el tiempo de la reserva</span>
                                            <span class="horario">${horario}</span>
                                        </div>
                                        <div class="divDuracion2">
                                            <div class="divDesde">
                                                <span>Desde</span>
                                                <input class="inputDesde inputDesdeXD" id="diaInicioIN-Dia" oninput="verDisponiHorarioXD()" type="date">
                                            </div>
                                            <div class="divCantidad">
                                                <span class="spanCant">Cantidad</span>
                                                <input oninput="verDisponiHorarioXD()" class="inputCantidad inputCantidadDias" id="cantDiasIN-Dia" type="number" min="1" value="1">
                                                <span class="diasSpan">Días</span>
                                            </div>
                                            <div class="divUnidadGene divUnidGene-A">   
                                                <div class="divUnidad2">
                                                    <span class="unidadSpan">Unidad</span>
                                                    <div class="div1">
                                                        <input 
                                                            disabled
                                                            class = "inputUnid inputUnid-A" 
                                                            placeholder = "Click para ver las unidades disponibles"
                                                            id = "inputUnid"
                                                        >
                                                        <div class="divUnidElegi divUnidElegi-C">
                                                        </div>
                                                        <div class="lisUnidad lisUnid-C">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="divError">
                                                <span class="spanErr spanErrHorario"></span>
                                                <span class="spanHorarioDias"></span>
                                            </div>
                                        </div>
                                        <div class="separador2"></div>
                                        `;
    
                                        rangeDuracionDiv.selectNode(document.getElementsByTagName("div").item(0));
                                        const pdtDuracionHtml =
                                        rangeDuracionDiv.createContextualFragment(htmlDuracion);
                                        document.querySelector(".divDuracionGene").appendChild(pdtDuracionHtml);
    
                                        document.querySelector("#inputMiembro").removeAttribute("disabled");
                                        document.querySelector("#inputTitulo").removeAttribute("disabled");
                                        document.querySelector("#actividadRese").removeAttribute("disabled");

                                        //---------------------------------------------------------------------------------------

                                        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

                                        //------------------------------------------------------
                                        // Input UNIDAD - RESERVA POR DÍA - INICIO
                                        //------------------------------------------------------

                                        if(document.querySelector("#inputUnid") != null){

                                            window.addEventListener('click', function mostrarListaUnidad(e) {

                                                if (document.getElementById('inputUnid').contains(e.target)) {
                                                    
                                
                                                } else {
                                                    
                                                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                
                                                }
                                
                                            });

                                            document.querySelector("#inputUnid").addEventListener("click", (e)=>{
                                                
                                                document.querySelector(".lisUnidad").classList.replace("lisUnid-C", "lisUnid-A");
                                    
                                            });
                                            
                                        }

                                        //------------------------------------------------------
                                        // Input UNIDAD - RESERVA POR DÍA - FIN
                                        //------------------------------------------------------

                                        //----------------------------------------------------------------------------------------------------------------------------------------------

                                        let idPdt = document.querySelector("#idPdtSelectedInput").value;

                                        crearCalendario('', '', idPdt, 'dia', '');

                                    });

                                }else{

                                    if(btnsTReseIn[i].getAttribute("tipo") == "semana"){

                                        btnsTReseCli[i].addEventListener("click", (e)=>{

                                            erroresInput[1] = 0;
                                            erroresInput[7] = 0;
                                            erroresInput[8] = 0;
                                            erroresInput[9] = 0;
                                            erroresInput[10] = 0;
                                            confirmarErrores();

                                            // Llenando el input TIPO DE RESERVA
                                            document.querySelector("#tipoReservaIn").value="semana";

                                            // Llenando el input PRECIO INDIVIDUAL
                                            document.querySelector("#precioIndividualIn").value = document.querySelector(".precioXS").value;

                                            // Ocultando la cubierta del calendario y los botones
                                            document.querySelector(".cubiertaCalen").classList.replace("cubiertaCalen-A", "cubiertaCalen-C");
                                            document.querySelector(".cubiertaBtn").classList.replace("cubiertaBtn-A", "cubiertaBtn-C"); 

                                            // Cambiando estilo del input MIEMBRO a modo activo
                                            document.querySelector("#inputMiembro").classList.replace("inputMiembro-A-Bloq", "inputMiembro-A");

                                            verDisponiHorarioXS();

                                            // Cambiando estilo de los botones "tipo de reserva" y seleccionando el último en ser clickeado
                                            let btnDispo = document.querySelectorAll(".btr");

                                            for(let e = 0; e < btnDispo.length; e++){

                                                btnDispo[e].classList.replace("btnSelec", "btnDispo");
                                                
                                            };

                                            btnsTReseCli[i].classList.replace("btnDispo", "btnSelec");
                                            //---------------------------------------------------------------------------------------------------

                                            // Desbloqueando los demas inputs al tocar el botón
                                            document.querySelector("#inputMiembro").removeAttribute("disabled");
                                            document.querySelector("#inputNumPerso").removeAttribute("disabled");
                                            document.querySelector("#inputTitulo").removeAttribute("disabled");
                                            document.querySelector("#actividadRese").removeAttribute("disabled");
                                            //---------------------------------------------------------------------------------------------------

                                            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.

                                            // Creando el calendario segun el producto y el tipo de reserva elegida
                                            let idPdt = document.querySelector("#idPdtSelectedInput").value;

                                            crearCalendario('', '', idPdt, 'semana', '');
                                            //---------------------------------------------------------------------------------------------------
        
                                        });

                                    }

                                }

                            }

                        }

                    }

                    document.querySelector(".cubierta").classList.replace("cubierta-A", "cubierta-C");
                    document.querySelector(".spanPdtHeaderCalen").textContent = document.querySelector("#nombrePdt").value;

                })
                .catch((err) => console.log(err));

            crearCalendario("", "", id, "", "");

        }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------
    // FUNCIÓN: para Limpiar el producto elegido al dar click en la X (Nueva Reserva)
    //---------------------------------------------------------------------------------
        
        function limpiarPdtSelect(){

            document.querySelector(".spanPdtHeaderCalen").textContent = "";
            document.querySelector(".cubierta").classList.replace("cubierta-C", "cubierta-A");
            document.querySelector(".cubiertaCalen").classList.replace("cubiertaCalen-C", "cubiertaCalen-A");
            document.querySelector(".cubiertaBtn").classList.replace("cubiertaBtn-C", "cubiertaBtn-A");

            document.querySelector(".prodContGene-A").innerHTML = "";

            document.querySelector(".div2").classList.replace("div2-A", "div2-C");
            document.querySelector(".div1").classList.replace("div1-C", "div1-A");

            document.querySelector(".divDatosReseGene").scrollTop = 0;

            erroresInput[0] = 1;
            erroresInput[1] = 1;
            erroresInput[2] = 1;
            erroresInput[3] = 1;
            erroresInput[4] = 1;
            erroresInput[5] = 1;
            erroresInput[6] = 1;
            erroresInput[7] = 1;
            erroresInput[8] = 1;
            erroresInput[9] = 1;
            erroresInput[10] = 1;
            confirmarErrores();

            let btns = document.querySelectorAll(".btr");

            for(let i = 0; i < btns.length; i++){

                if(btns[i].classList.contains("btnSelec")){

                    btns[i].classList.replace("btnSelec", "btnBloq");

                }else{

                    btns[i].classList.replace("btnDispo", "btnBloq");

                }

                btns[i].setAttribute("disabled", "");

            }

            document.querySelector(".divDuracionGene").innerHTML="";
            
            if(document.querySelector(".miembroSelectDiv").innerHTML != ""){

                document.querySelector(".miembroSelectDiv").innerHTML="";
                document.querySelector(".miembroSelectDiv").classList.replace("miemSeleDiv-A", "miemSeleDiv-C");
                
            }

            if(document.querySelector(".miembroLis").innerHTML != ""){

                document.querySelector(".miembroLis").innerHTML = "";
                document.querySelector(".miembroLis").classList.replace("miembroLis-A", "miembroLis-C");

            }

            if(document.querySelector("#inputMiembro").classList.contains("inputMiembro-C")){

                document.querySelector("#inputMiembro").value = "";
                document.querySelector("#inputMiembro").classList.replace("inputMiembro-C", "inputMiembro-A");

            }

            if(document.querySelector(".lisUnidad") != null){

                if(document.querySelector(".lisUnidad").classList.contains("lisUnid-A")){
                    document.querySelector(".lisUnidad").innerHTML="";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                }

            }

            if(document.querySelector(".divUnidElegi") != null){

                if(document.querySelector(".divUnidElegi").innerHTML != ""){

                    document.querySelector(".divUnidElegi").innerHTML = "";
                    document.querySelector(".divUnidElegi").classList.replace("divUnidElegi-A", "divUnidElegi-C");

                }

            }

            if(document.querySelector("#inputUnid") != null){

                if(document.querySelector("#inputUnid").classList.contains("inputUnid-C")){

                    document.querySelector("#inputUnid").value="";
                    document.querySelector("#inputUnid").classList.replace("inputUnid-C", "inputUnid-A");

                }
                
            }

            document.querySelector(".divDispoReserBase").innerHTML = "";

            if(diaAnterior != "" && diaAnterior != null){
                if(document.querySelector(diaAnterior) != null){
                    document.querySelector(diaAnterior).style.outline = "none";
                }
            }

            document.querySelector("#inputTitulo").value = "";
            document.querySelector("#actividadRese").value = "";

            document.querySelector(".precioTituloSpan").textContent = "Precio";
            document.querySelector(".spanPrecio").textContent = 0;
            document.querySelector(".spanCantidad").textContent = 0;
            document.querySelector(".spanSubtotal").textContent = 0;
            document.querySelector(".spanPrecioIva").textContent = 0;
            document.querySelector(".spanPrecioDescu").textContent = 0;
            document.querySelector(".spanTotalPrecio").textContent = 0;
            
        };

    //------------------------------------------------------------------------------------------------------------------------------------------
    
    //------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // FUNCIÓN: elegir el miembro de la lista desplegable al dar click (Nueva Reserva)
    //-------------------------------------------------------------------------------------------

        const miemElegNewRese = document.createRange();

        function seleMiemNewRese(id){

            let idMiem = id;

            document.querySelector("#miembroInId").value = idMiem;

            erroresInput[2] = 0;
            confirmarErrores();

            let formMiemSelected = new FormData();

            formMiemSelected.append("idMiemSelected", idMiem);

            fetch(urlModoCLienteData, {
                method: "POST",
                body: formMiemSelected,
            })
                .then((response) => response.json())
                .then((data) => {
                    
                    document.querySelector("#inputMiembro").value = "";
                    document.querySelector(".miembroLis").innerHTML = "";
                    document.querySelector(".miembroLis").classList.replace("miembroLis-A", "miembroLis-C");
                    document.querySelector(".miembroSelectDiv").innerHTML = "";

                    document.querySelector("#inputMiembro").classList.replace("inputMiembro-A", "inputMiembro-C")

                    document.querySelector(".miembroSelectDiv").classList.replace("miemSeleDiv-C", "miemSeleDiv-A");

                    miemElegNewRese.selectNode(document.getElementsByTagName("div").item(0));
                    const miemSelected =
                    miemElegNewRese.createContextualFragment(data);
                    document.querySelector(".miembroSelectDiv").appendChild(miemSelected);

                })
                .catch((err) => console.log(err));

        }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // FUNCIÓN: limpiar el div de miembro elegido al dar click en la X (Nueva Reserva)
    //-------------------------------------------------------------------------------------------

        function limpiarMiemSelect(){

            document.querySelector("#miembroInId").value = "";

            document.querySelector(".miembroSelectDiv").innerHTML = "";

            erroresInput[2] = 1;
            confirmarErrores();

            document.querySelector(".miembroSelectDiv").classList.replace("miemSeleDiv-A", "miemSeleDiv-C");

            document.querySelector("#inputMiembro").classList.replace("inputMiembro-C", "inputMiembro-A");
            document.querySelector("#inputMiembro").value = "";

        }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // FUNCIÓN: elegir la unidad de la lista desplegable al dar click (Nueva Reserva)
    //-------------------------------------------------------------------------------------------

        const unidElegNewRese = document.createRange();

        function selecUnidNewRese(id){

            let idUnid = id;

            if(document.querySelector("#inputDesde-Hora") != null){

                let fechaElegida = document.querySelector("#inputDesde-Hora").value;

                intervaloReservasPosicionar(fechaElegida, (idUnid-1));

            }

            document.querySelector("#unidadInId").value = idUnid;

            erroresInput[6] = 0;
            confirmarErrores();

            let formUnidSelected = new FormData();

            formUnidSelected.append("idUnidSelected", idUnid);

            fetch(urlModoCLienteData, {
                method: "POST",
                body: formUnidSelected,
            })
                .then((response) => response.json())
                .then((data) => {

                    document.querySelector(".inputUnid").value = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                    document.querySelector(".divUnidElegi").innerHTML = "";

                    document.querySelector(".inputUnid").classList.replace("inputUnid-A", "inputUnid-C")

                    document.querySelector(".divUnidElegi").classList.replace("divUnidElegi-C", "divUnidElegi-A");

                    unidElegNewRese.selectNode(document.getElementsByTagName("div").item(0));
                    const unidSelected =
                    unidElegNewRese.createContextualFragment(data);
                    document.querySelector(".divUnidElegi").appendChild(unidSelected);

                })
                .catch((err) => console.log(err));

        }

    //------------------------------------------------------------------------------------------------------------------------------------------
    
    //------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // FUNCIÓN: limpiar el div de unidad elegida al dar click en la X (Nueva Reserva)
    //-------------------------------------------------------------------------------------------

        function limpiarUnid(){

            document.querySelector("#unidadInId").value = "";

            document.querySelector(".divUnidElegi").innerHTML = "";

            document.querySelector(".divUnidElegi").classList.replace("divUnidElegi-A", "divUnidElegi-C");

            document.querySelector("#inputUnid").classList.replace("inputUnid-C", "inputUnid-A");
            document.querySelector("#inputUnid").value = "";

            erroresInput[6] = 1;
            confirmarErrores();

        }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // FUNCIÓN: revisar la disponibilidad del horario y el día elegido (RESERVA POR HORA)
    //-------------------------------------------------------------------------------------------

        let fechaReservaXH = "";
        let fechaActualXH = "";

        let horaEntraXH = "";
        let horaE = "";
        let minuE = "";
        let meriE = "";

        let horaSaleXH = "";
        let horaS = "";
        let minuS = "";
        let meriS = "";

        let horaEntraSumaXH = "";
        let horaSaleSumaXH = "";
        let sumaFechaReseXH = "";
        let sumaFechaActualXH = "";

        var intervalReserXH = null;
        
        let erroresPosibles = {

            1 : "Elija una fecha de inicio válida",
            2 : "El día elegido (sábado) NO está disponible para su membresía",
            3 : "El día elegido (domingo) NO es laboral",
            4 : "Elija una hora de entrada válida (Min: 7:00 AM - Max: 6:00 PM)",
            5 : "Elija una hora de salida válida (Max: 7:00 PM)",
            6 : "El horario elegido no está disponible (día ocupado en su totalidad). Elija otro día de inicio",
            7 : "El horario elegido no está disponible (el día pertenece a una semana ocupada). Elija otro día de inicio",
            8 : "El horario escogido ya está ocupado. Elija otro horario"

        } 

        const rangoListaUnidadXH = document.createRange();

        // Ver Disponibilidad de la Reserva - RESERVA POR HORA
        function verDisponiHorarioXH(){
            
            // Todos los Inputs deben estar llenos
            // (Fecha de Inicio, Hora de Inicio, Cantidad de Horas, Cantidad de Minutos)
            if(
                document.querySelector("#inputDesde-Hora").value != "" &&
                document.querySelector("#inputHora-Hora").value != "" &&
                (
                    document.querySelector("#inputHoraDur-Hora").value != 0 &&
                    document.querySelector("#inputHoraDur-Hora").value != ""
                ) &&
                document.querySelector("#inputMinuDur-Hora").value != ""
            ){

                // Fecha de Inicio
                fechaReservaXH = document.querySelector("#inputDesde-Hora").value;

                // Fecha Actual Cadena
                fechaActualXH = fechaActualCadena;

                // Suma fecha actual
                sumaFechaActualXH = fechaActualCadena.split("-");

                sumaFechaActualXH = 
                    Number(sumaFechaActualXH[0])+
                    Number(sumaFechaActualXH[1]*30)+
                    Number(sumaFechaActualXH[2]);
                //--------------------------------------------------------------------------------

                // Suma Fecha de Inicio de la Reserva
                sumaFechaReseXH = fechaReservaXH.split("-");

                sumaFechaReseXH = 
                    Number(sumaFechaReseXH[0])+
                    Number(sumaFechaReseXH[1]*30)+
                    Number(sumaFechaReseXH[2]);
                //--------------------------------------------------------------------------------

                // Hora de Entrada de la Reserva
                horaEntraXH = document.querySelector("#inputHora-Hora").value;
                    
                    // Suma de la hora de Entrada
                    horaEntraSumaXH = horaAMinutos(horaEntraXH);
                    //------------------------------------------------------------------------

                horaEntraXH = horaEntraXH.split(":");
                    
                meriE = Number(horaEntraXH[0]) < 12 ? "AM" : "PM";
                    
                minuE = horaEntraXH[1];

                horaE = Number(horaEntraXH[0]) > 12
                    ? Number(horaEntraXH[0]) - 12
                    : Number(horaEntraXH[0]);
                horaE = horaE < 10
                    ? "0"+horaE
                    : horaE; 

                horaEntraXH = horaE+":"+minuE+" "+meriE;
                //-----------------------------------------------------------------------------------------

                // Hora Salida Reserva
                horaSaleSumaXH = 
                    horaEntraSumaXH+
                    (Number(document.querySelector("#inputHoraDur-Hora").value)*60)+
                    Number(document.querySelector("#inputMinuDur-Hora").value);

                meriS = parseInt(Number(horaSaleSumaXH/60)) < 12
                    ? "AM"
                    : "PM";
                
                horaS = parseInt(Number(horaSaleSumaXH/60)) > 12
                    ? parseInt(Number(horaSaleSumaXH/60)) - 12
                    : parseInt(Number(horaSaleSumaXH/60));
                horaS = horaS < 10
                    ? "0"+horaS
                    : horaS;

                minuS = (Number(horaSaleSumaXH))-(parseInt(Number(horaSaleSumaXH/60))*60);
                minuS = minuS < 10
                    ? "0"+minuS
                    : minuS;

                horaSaleXH = horaS+":"+minuS+" "+meriS;
                //-----------------------------------------------------------------------------------------

                // console.log(sumaFechaReseXH);
                // console.log(sumaFechaActualXH);
                // console.log(fechaReservaXH);
                // console.log(fechaActualXH);
                // console.log(horaEntraSumaXH);
                // console.log(horaSaleSumaXH);
                // console.log(horaEntraXH);
                // console.log(horaSaleXH);

                //-------------------------------------------
                // Confirmando datos y filtrando errores
                //-------------------------------------------

                // Limpiando Span de Error
                document.querySelector(".spanErrHorario").textContent = "";

                let fechaNumeroSemana = "";

                // Fecha de inicio fuera de rango - RESERVA POR HORA
                if(sumaFechaReseXH < sumaFechaActualXH){
    
                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }

                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                    
                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222";
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[1];

                }
                //-------------------------------------------------------------------------------------

                // Fecha sábado NO disponible
                fechaNumeroSemana = diaSemanaNumero(fechaReservaXH);

                if(fechaNumeroSemana == 6 && Number(diasDisponInput) < 6){

                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }

                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222";
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[2];

                }
                //-------------------------------------------------------------------------------------

                // Fecha domingo NO disponible
                fechaNumeroSemana = diaSemanaNumero(fechaReservaXH);

                if(fechaNumeroSemana == 0){

                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }

                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222";
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[3];

                }
                //-------------------------------------------------------------------------------------

                // Hora de entrada fuera de rango
                if(
                    horaEntraSumaXH < 420 ||
                    horaEntraSumaXH > 1080
                ){

                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }

                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                    
                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222"
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[4];

                }
                //-------------------------------------------------------------------------------------

                // Hora de salida fuera de rango
                if(horaSaleSumaXH > 1140){

                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }
                    
                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                    
                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222"
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[5];

                }
                //-------------------------------------------------------------------------------------

                //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

                //------------------------------------------------
                // Si no existe ningun error con los datos
                //------------------------------------------------

                if(document.querySelector(".spanErrHorario").textContent == ""){

                    let unidadesProdDispo = ""; 
                    let unidProdDispoArray = document.querySelector("#pdtUnidadesDispo").value.split(",");

                    let formDispoHorarioXH = new FormData();

                    formDispoHorarioXH.append("fechaReservasXH", fechaReservaXH);
                    formDispoHorarioXH.append("verifiHorarioXHora", true);

                    fetch(urlModoCLienteData, {
                        method: "POST",
                        body: formDispoHorarioXH,
                    })
                        .then((response) => response.json())
                        .then((data) => {

                            // Si Existen reservas en el mismo día y en el mismo horario elegido
                            if(data.length != 0){

                                let horaDispo = true;
                                let diaDispo = true;
                                let semaDispo = true;

                                // Verificando disponibilidad de las unidades según las reservas en la DB
                                for1:
                                for(let i = 0; i < data.length; i++){

                                    // Reservas por hora
                                    if(
                                        data[i]["reserTipo"] == "hora"
                                    ){

                                        let horaEntraReseSuma = horaAMinutos(data[i]["horaEntradaR"]);
                                        let horaSaleReseSuma = horaAMinutos(data[i]["horaSalidaR"]);

                                        if(
                                            (
                                                horaEntraSumaXH > horaEntraReseSuma && 
                                                horaEntraSumaXH < horaSaleReseSuma 
                                            ) ||
                                            (
                                                horaSaleSumaXH > horaEntraReseSuma && 
                                                horaSaleSumaXH < horaSaleReseSuma 
                                            ) ||
                                            horaEntraSumaXH == horaEntraReseSuma ||
                                            horaEntraSumaXH == horaSaleReseSuma ||
                                            horaSaleSumaXH == horaEntraReseSuma ||
                                            horaSaleSumaXH == horaSaleReseSuma
                                        ){

                                            // Revisar las reservas
                                            for2:
                                            for(let e = 0; e < unidProdDispoArray.length; e++){

                                                if(unidProdDispoArray[e] == data[i]["id_unidad"]){

                                                    unidProdDispoArray.splice(e, 1);

                                                }
                                                
                                            }
                                            //--------------------------------------------------------------

                                        }

                                    }
                                    //--------------------------------------------------------------------------

                                    if(unidProdDispoArray.length == 0){
                                        horaDispo = false;
                                        break for1;
                                    }

                                    // Reserva por día
                                    if(
                                        data[i]["reserTipo"] == "dia"
                                    ){

                                        // Revisar las reservas
                                        for2:
                                        for(let e = 0; e < unidProdDispoArray.length; e++){

                                            if(unidProdDispoArray[e] == data[i]["id_unidad"]){

                                                unidProdDispoArray.splice(e, 1);

                                            }

                                        }
                                        //--------------------------------------------------------------
                                        
                                    }
                                    //--------------------------------------------------------------------------

                                    if(unidProdDispoArray.length == 0){
                                        diaDispo = false;
                                        break for1;
                                    }

                                    // Reserva por semana
                                    if(data[i]["reserTipo"] == "semana"){

                                        // Revisar las reservas
                                        for2:
                                        for(let e = 0; e < unidProdDispoArray.length; e++){

                                            if(unidProdDispoArray[e] == data[i]["id_unidad"]){

                                                unidProdDispoArray.splice(e, 1);

                                            }

                                        }
                                        //--------------------------------------------------------------

                                    }
                                    //--------------------------------------------------------------------------

                                    if(unidProdDispoArray.length == 0){
                                        semaDispo = false;
                                        break for1;
                                    }

                                }
                                
                                unidadesProdDispo = unidProdDispoArray.toString();
                                console.log("ejecutando");

                                if(
                                    horaDispo == true &&
                                    diaDispo == true &&
                                    semaDispo == true &&
                                    unidadesProdDispo != ""
                                ){

                                    let formUnidadDisponible = new FormData();

                                    formUnidadDisponible.append("unidDispoXH", unidadesProdDispo);

                                    fetch(urlModoCLienteData, {
                                        method: "POST",
                                        body: formUnidadDisponible,
                                    })
                                        .then((response) => response.json())
                                        .then((data) => {

                                            document.querySelector("#diaInicioInputXH").value = document.querySelector("#inputDesde-Hora").value;
                                            document.querySelector("#horaEntradaXH").value = horaEntraXH; 
                                            document.querySelector("#horaSalidaXH").value = horaSaleXH;
                                            document.querySelector("#cantHorasInputXH").value = document.querySelector("#inputHoraDur-Hora").value;
                                            document.querySelector("#cantMinuInputXH").value = document.querySelector("#inputMinuDur-Hora").value;
                                            
                                            erroresInput[7] = 0;
                                            erroresInput[8] = 0;
                                            erroresInput[9] = 0;
                                            erroresInput[10] = 0;
                                            confirmarErrores();
    
                                            // Activando Input de la Unidad
                                            document.querySelector("#inputUnid").removeAttribute("disabled");
                                            
                                            // Limpiando lista de unidades
                                            document.querySelector(".lisUnidad").innerHTML = "";
                                            document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                            
                                            // Mostrando respuesta en el Span
                                            document.querySelector(".spanErrHorario").style.color = "#22aa22"
                                            document.querySelector(".spanErrHorario").textContent = "Horario disponible";

                                            if(document.querySelector("#tipoReservaIn").value == "hora"){

                                                let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                let cantidad = Number(document.querySelector("#cantHorasInputXH").value);
                                                
                                                let precioCantidad = cantidad*precio;
                                                let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                                let precioDescu =  precioCantidad-(precioCantidad*(descu/100));
                                                
                                                document.querySelector(".precioTituloSpan").textContent = "Precio por hora";
                                                document.querySelector(".spanPrecio").textContent = precio+"$";
                                                document.querySelector(".spanCantidad").textContent = cantidad;
                                                document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                                document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                            }else{

                                                if(document.querySelector("#tipoReservaIn").value == "dia"){

                                                    let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                    let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                    let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                    let cantidad = Number(document.querySelector("#cantDiasInputXD").value);
                                                    
                                                    let precioCantidad = cantidad*precio;
                                                    let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                                    let precioDescu =  precioCantidad-(precioCantidad*(descu/100));
                                                    
                                                    document.querySelector(".precioTituloSpan").textContent = "Precio por día";
                                                    document.querySelector(".spanPrecio").textContent = precio+"$";
                                                    document.querySelector(".spanCantidad").textContent = cantidad;
                                                    document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                                    document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                    document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                    document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                                }else{

                                                    if(document.querySelector("#tipoReservaIn").value == "semana"){
                                                        
                                                        let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                        let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                        let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                        
                                                        let precioIva =  precio+(precio*(iva/100));
                                                        let precioDescu =  precio-(precio*(descu/100));
                                                        
                                                        document.querySelector(".precioTituloSpan").textContent = "Precio por semana";
                                                        document.querySelector(".spanPrecio").textContent = precio+"$";
                                                        document.querySelector(".spanCantidad").textContent = 1;
                                                        document.querySelector(".spanSubtotal").textContent = precio+"$";
                                                        document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                        document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                        document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                                    }

                                                }

                                            }

                                            rangoListaUnidadXH.selectNode(document.getElementsByTagName("div").item(0));
                                            const unidSelected =
                                                rangoListaUnidadXH.createContextualFragment(data);
                                            document.querySelector(".lisUnidad").appendChild(unidSelected);
                                            
                                            verDisponibilidadDia(fechaReservaXH, "", "");
                                        
                                        })
                                        .catch((err) => console.log(err));

                                }else{

                                    if(horaDispo == false){

                                        document.querySelector("#diaInicioInputXH").value = "";
                                        document.querySelector("#horaEntradaXH").value = ""; 
                                        document.querySelector("#horaSalidaXH").value = "";
                                        document.querySelector("#cantHorasInputXH").value = "";
                                        document.querySelector("#cantMinuInputXH").value = "";
                                        document.querySelector("#unidadInId").value = "";

                                        document.querySelector(".precioTituloSpan").textContent = "Precio";
                                        document.querySelector(".spanPrecio").textContent = 0;
                                        document.querySelector(".spanCantidad").textContent = 0;
                                        document.querySelector(".spanSubtotal").textContent = 0;
                                        document.querySelector(".spanPrecioIva").textContent = 0;
                                        document.querySelector(".spanPrecioDescu").textContent = 0;
                                        document.querySelector(".spanTotalPrecio").textContent = 0;
                                        
                                        erroresInput[6] = 1;
                                        erroresInput[7] = 1;
                                        erroresInput[8] = 1;
                                        erroresInput[9] = 1;
                                        erroresInput[10] = 1;
                                        confirmarErrores();

                                        // Desactivando Input de la Unidad
                                        document.querySelector("#inputUnid").setAttribute("disabled", "");
                                        
                                        // Limpiar contenedor de Unidad si hay una elegida en el momento
                                        if(
                                            document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                                        ){

                                            document.querySelector(".divUnidElegi").innerHTML = "";
                                            document.querySelector(".divUnidElegi")
                                                .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                            document.querySelector(".inputUnid")
                                                .classList.replace("inputUnid-C", "inputUnid-A");
                                            document.querySelector(".inputUnid").setAttribute("disabled", "");

                                        }

                                        // Limpiando lista de unidades
                                        document.querySelector(".lisUnidad").innerHTML = "";
                                        document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                        
                                        // Mostrando error en el Span
                                        document.querySelector(".spanErrHorario").style.color = "#ff2222"
                                        document.querySelector(".spanErrHorario").textContent = erroresPosibles[8];

                                    }else{

                                        if(diaDispo == false){

                                            document.querySelector("#diaInicioInputXH").value = "";
                                            document.querySelector("#horaEntradaXH").value = ""; 
                                            document.querySelector("#horaSalidaXH").value = "";
                                            document.querySelector("#cantHorasInputXH").value = "";
                                            document.querySelector("#cantMinuInputXH").value = "";
                                            document.querySelector("#unidadInId").value = "";

                                            document.querySelector(".precioTituloSpan").textContent = "Precio";
                                            document.querySelector(".spanPrecio").textContent = 0;
                                            document.querySelector(".spanCantidad").textContent = 0;
                                            document.querySelector(".spanSubtotal").textContent = 0;
                                            document.querySelector(".spanPrecioIva").textContent = 0;
                                            document.querySelector(".spanPrecioDescu").textContent = 0;
                                            document.querySelector(".spanTotalPrecio").textContent = 0;
                                            
                                            erroresInput[6] = 1;
                                            erroresInput[7] = 1;
                                            erroresInput[8] = 1;
                                            erroresInput[9] = 1;
                                            erroresInput[10] = 1;
                                            confirmarErrores();

                                            // Limpiar contenedor de Unidad si hay una elegida en el momento
                                            if(
                                                document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                                            ){

                                                document.querySelector(".divUnidElegi").innerHTML = "";
                                                document.querySelector(".divUnidElegi")
                                                    .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                                document.querySelector(".inputUnid")
                                                    .classList.replace("inputUnid-C", "inputUnid-A");
                                                document.querySelector(".inputUnid").setAttribute("disabled", "");

                                            }

                                            // Desactivando Input de la Unidad
                                            document.querySelector("#inputUnid").setAttribute("disabled", "");
                                            
                                            // Limpiando lista de unidades
                                            document.querySelector(".lisUnidad").innerHTML = "";
                                            document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                            
                                            // Mostrando error en el Span
                                            document.querySelector(".spanErrHorario").style.color = "#ff2222"
                                            document.querySelector(".spanErrHorario").textContent = erroresPosibles[6];

                                        }else{

                                            if(semaDispo == false){

                                                document.querySelector("#diaInicioInputXH").value = "";
                                                document.querySelector("#horaEntradaXH").value = ""; 
                                                document.querySelector("#horaSalidaXH").value = "";
                                                document.querySelector("#cantHorasInputXH").value = "";
                                                document.querySelector("#cantMinuInputXH").value = "";
                                                document.querySelector("#unidadInId").value = "";

                                                document.querySelector(".precioTituloSpan").textContent = "Precio";
                                                document.querySelector(".spanPrecio").textContent = 0;
                                                document.querySelector(".spanCantidad").textContent = 0;
                                                document.querySelector(".spanSubtotal").textContent = 0;
                                                document.querySelector(".spanPrecioIva").textContent = 0;
                                                document.querySelector(".spanPrecioDescu").textContent = 0;
                                                document.querySelector(".spanTotalPrecio").textContent = 0;
                                                
                                                erroresInput[6] = 1;
                                                erroresInput[7] = 1;
                                                erroresInput[8] = 1;
                                                erroresInput[9] = 1;
                                                erroresInput[10] = 1;
                                                confirmarErrores();

                                                // Limpiar contenedor de Unidad si hay una elegida en el momento
                                                if(
                                                    document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                                                ){

                                                    document.querySelector(".divUnidElegi").innerHTML = "";
                                                    document.querySelector(".divUnidElegi")
                                                        .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                                    document.querySelector(".inputUnid")
                                                        .classList.replace("inputUnid-C", "inputUnid-A");
                                                    document.querySelector(".inputUnid").setAttribute("disabled", "");

                                                }

                                                // Desactivando Input de la Unidad
                                                document.querySelector("#inputUnid").setAttribute("disabled", "");
                                                
                                                // Limpiando lista de unidades
                                                document.querySelector(".lisUnidad").innerHTML = "";
                                                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                                
                                                // Mostrando error en el Span
                                                document.querySelector(".spanErrHorario").style.color = "#ff2222"
                                                document.querySelector(".spanErrHorario").textContent = erroresPosibles[7];

                                            }

                                        }
                                        
                                    }

                                }

                            }else{

                                // Si la data de las reservas llega vacía (Horario Disponible)
                                unidadesProdDispo = unidProdDispoArray.toString();

                                let formUnidadDisponible = new FormData();
                                formUnidadDisponible.append("unidDispoXH", unidadesProdDispo);

                                fetch(urlModoCLienteData, {
                                    method: "POST",
                                    body: formUnidadDisponible,
                                })
                                    .then((response) => response.json())
                                    .then((data) => {

                                        document.querySelector("#diaInicioInputXH").value = document.querySelector("#inputDesde-Hora").value;
                                        document.querySelector("#horaEntradaXH").value = horaEntraXH; 
                                        document.querySelector("#horaSalidaXH").value = horaSaleXH;
                                        document.querySelector("#cantHorasInputXH").value = document.querySelector("#inputHoraDur-Hora").value;
                                        document.querySelector("#cantMinuInputXH").value = document.querySelector("#inputMinuDur-Hora").value;

                                        erroresInput[7] = 0;
                                        erroresInput[8] = 0;
                                        erroresInput[9] = 0;
                                        erroresInput[10] = 0;
                                        confirmarErrores();

                                        // Activando Input de la Unidad
                                        document.querySelector("#inputUnid").removeAttribute("disabled");
                                        
                                        // Limpiando lista de unidades
                                        document.querySelector(".lisUnidad").innerHTML = "";
                                        
                                        // Mostrando respuesta en el Span
                                        document.querySelector(".spanErrHorario").style.color = "#22aa22"
                                        document.querySelector(".spanErrHorario").textContent = "Horario disponible";

                                        if(document.querySelector("#tipoReservaIn").value == "hora"){

                                            let precio = Number(document.querySelector("#precioIndividualIn").value);
                                            let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                            let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                            let cantidad = Number(document.querySelector("#cantHorasInputXH").value);
                                            
                                            let precioCantidad = cantidad*precio;
                                            let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                            let precioDescu =  precioCantidad-(precioCantidad*(descu/100));

                                            document.querySelector(".precioTituloSpan").textContent = "Precio por Hora";
                                            document.querySelector(".spanPrecio").textContent = precio+"$";
                                            document.querySelector(".spanCantidad").textContent = cantidad;
                                            document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                            document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                            document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                            document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                        }else{

                                            if(document.querySelector("#tipoReservaIn").value == "dia"){

                                                let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                let cantidad = Number(document.querySelector("#cantDiasInputXD").value);
                                                
                                                let precioCantidad = cantidad*precio;
                                                let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                                let precioDescu =  precioCantidad-(precioCantidad*(descu/100));

                                                document.querySelector(".precioTituloSpan").textContent = "Precio por Día";
                                                document.querySelector(".spanPrecio").textContent = precio+"$";
                                                document.querySelector(".spanCantidad").textContent = cantidad;
                                                document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                                document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                            }else{

                                                if(document.querySelector("#tipoReservaIn").value == "semana"){

                                                    let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                    let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                    let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                    
                                                    let precioIva =  precio+(precio*(iva/100));
                                                    let precioDescu =  precio-(precio*(descu/100));

                                                    document.querySelector(".precioTituloSpan").textContent = "Precio por Semana";
                                                    document.querySelector(".spanPrecio").textContent = precio+"$";
                                                    document.querySelector(".spanCantidad").textContent = 1;
                                                    document.querySelector(".spanSubtotal").textContent = precio+"$";
                                                    document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                    document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                    document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                                }

                                            }

                                        }

                                        rangoListaUnidadXH.selectNode(document.getElementsByTagName("div").item(0));
                                        const unidSelected =
                                            rangoListaUnidadXH.createContextualFragment(data);
                                        document.querySelector(".lisUnidad").appendChild(unidSelected);
                                    
                                    })
                                    .catch((err) => console.log(err));

                            }
                            
                        })
                        .catch((err) => console.log(err));

                }
                //-------------------------------------------------------------------------------------

            }else{

                document.querySelector("#diaInicioInputXH").value = "";
                document.querySelector("#horaEntradaXH").value = ""; 
                document.querySelector("#horaSalidaXH").value = "";
                document.querySelector("#cantHorasInputXH").value = "";
                document.querySelector("#cantMinuInputXH").value = "";
                document.querySelector("#unidadInId").value = "";

                document.querySelector(".precioTituloSpan").textContent = "Precio";
                document.querySelector(".spanPrecio").textContent = 0;
                document.querySelector(".spanCantidad").textContent = 0;
                document.querySelector(".spanSubtotal").textContent = 0;
                document.querySelector(".spanPrecioIva").textContent = 0;
                document.querySelector(".spanPrecioDescu").textContent = 0;
                document.querySelector(".spanTotalPrecio").textContent = 0;

                erroresInput[6] = 1;
                erroresInput[7] = 1;
                erroresInput[8] = 1;
                erroresInput[9] = 1;
                erroresInput[10] = 1;
                confirmarErrores();

                // Limpiar contenedor de Unidad si hay una elegida en el momento
                if(
                    document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                ){

                    document.querySelector(".divUnidElegi").innerHTML = "";
                    document.querySelector(".divUnidElegi")
                        .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                    document.querySelector(".inputUnid")
                        .classList.replace("inputUnid-C", "inputUnid-A");
                    document.querySelector(".inputUnid").setAttribute("disabled", "");

                }

                // Desactivando Input de la Unidad
                document.querySelector("#inputUnid").setAttribute("disabled", "");
                
                // Limpiando lista de unidades
                document.querySelector(".lisUnidad").innerHTML = "";
                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                
                // Mostrando error en el Span
                document.querySelector(".spanErrHorario").style.color = "#ff2222";
                document.querySelector(".spanErrHorario").textContent = "Digite todos los campos para la fecha y duración";

            }

        }

        // Ver disponibilidad de la Reserva al tocar un día en el calendario y teniendo los inputs llenos - RESERVA POR HORA
        function verDisponiHorarioXH2(){
            
            // Todos los Inputs deben estar llenos
            // (Fecha de Inicio, Hora de Inicio, Cantidad de Horas, Cantidad de Minutos)
            if(
                document.querySelector("#inputDesde-Hora").value != "" &&
                document.querySelector("#inputHora-Hora").value != "" &&
                (
                    document.querySelector("#inputHoraDur-Hora").value != 0 &&
                    document.querySelector("#inputHoraDur-Hora").value != ""
                ) &&
                document.querySelector("#inputMinuDur-Hora").value != ""
            ){

                // Fecha de Inicio
                fechaReservaXH = document.querySelector("#inputDesde-Hora").value;

                // Fecha Actual Cadena
                fechaActualXH = fechaActualCadena;

                // Suma fecha actual
                sumaFechaActualXH = fechaActualCadena.split("-");

                sumaFechaActualXH = 
                    Number(sumaFechaActualXH[0])+
                    Number(sumaFechaActualXH[1]*30)+
                    Number(sumaFechaActualXH[2]);
                //--------------------------------------------------------------------------------

                // Suma Fecha de Inicio de la Reserva
                sumaFechaReseXH = fechaReservaXH.split("-");

                sumaFechaReseXH = 
                    Number(sumaFechaReseXH[0])+
                    Number(sumaFechaReseXH[1]*30)+
                    Number(sumaFechaReseXH[2]);
                //--------------------------------------------------------------------------------

                // Hora de Entrada de la Reserva
                horaEntraXH = document.querySelector("#inputHora-Hora").value;
                    
                    // Suma de la hora de Entrada
                    horaEntraSumaXH = horaAMinutos(horaEntraXH);
                    //------------------------------------------------------------------------

                horaEntraXH = horaEntraXH.split(":");
                    
                meriE = Number(horaEntraXH[0]) < 12 ? "AM" : "PM";
                    
                minuE = horaEntraXH[1];

                horaE = Number(horaEntraXH[0]) > 12
                    ? Number(horaEntraXH[0]) - 12
                    : Number(horaEntraXH[0]);
                horaE = horaE < 10
                    ? "0"+horaE
                    : horaE; 

                horaEntraXH = horaE+":"+minuE+" "+meriE;
                //-----------------------------------------------------------------------------------------

                // Hora Salida Reserva
                horaSaleSumaXH = 
                    horaEntraSumaXH+
                    (Number(document.querySelector("#inputHoraDur-Hora").value)*60)+
                    Number(document.querySelector("#inputMinuDur-Hora").value);

                meriS = parseInt(Number(horaSaleSumaXH/60)) < 12
                    ? "AM"
                    : "PM";
                
                horaS = parseInt(Number(horaSaleSumaXH/60)) > 12
                    ? parseInt(Number(horaSaleSumaXH/60)) - 12
                    : parseInt(Number(horaSaleSumaXH/60));
                horaS = horaS < 10
                    ? "0"+horaS
                    : horaS;

                minuS = (Number(horaSaleSumaXH))-(parseInt(Number(horaSaleSumaXH/60))*60);
                minuS = minuS < 10
                    ? "0"+minuS
                    : minuS;

                horaSaleXH = horaS+":"+minuS+" "+meriS;
                //-----------------------------------------------------------------------------------------

                // console.log(sumaFechaReseXH);
                // console.log(sumaFechaActualXH);
                // console.log(fechaReservaXH);
                // console.log(fechaActualXH);
                // console.log(horaEntraSumaXH);
                // console.log(horaSaleSumaXH);
                // console.log(horaEntraXH);
                // console.log(horaSaleXH);

                //-------------------------------------------
                // Confirmando datos y filtrando errores
                //-------------------------------------------

                // Limpiando Span de Error
                document.querySelector(".spanErrHorario").textContent = "";

                let fechaNumeroSemana = "";

                // Fecha de inicio fuera de rango - RESERVA POR HORA
                if(sumaFechaReseXH < sumaFechaActualXH){
    
                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }

                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                    
                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222";
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[1];

                }
                //-------------------------------------------------------------------------------------

                // Fecha sábado NO disponible
                fechaNumeroSemana = diaSemanaNumero(fechaReservaXH);

                if(fechaNumeroSemana == 6 && Number(diasDisponInput) < 6){

                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }

                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222";
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[2];

                }
                //-------------------------------------------------------------------------------------

                // Fecha domingo NO disponible
                fechaNumeroSemana = diaSemanaNumero(fechaReservaXH);

                if(fechaNumeroSemana == 0){

                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }

                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");

                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222";
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[3];

                }
                //-------------------------------------------------------------------------------------

                // Hora de entrada fuera de rango
                if(
                    horaEntraSumaXH < 420 ||
                    horaEntraSumaXH > 1080
                ){

                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }

                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                    
                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222"
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[4];

                }
                //-------------------------------------------------------------------------------------

                // Hora de salida fuera de rango
                if(horaSaleSumaXH > 1140){

                    document.querySelector("#diaInicioInputXH").value = "";
                    document.querySelector("#horaEntradaXH").value = ""; 
                    document.querySelector("#horaSalidaXH").value = "";
                    document.querySelector("#cantHorasInputXH").value = "";
                    document.querySelector("#cantMinuInputXH").value = "";
                    document.querySelector("#unidadInId").value = "";

                    document.querySelector(".precioTituloSpan").textContent = "Precio";
                    document.querySelector(".spanPrecio").textContent = 0;
                    document.querySelector(".spanCantidad").textContent = 0;
                    document.querySelector(".spanSubtotal").textContent = 0;
                    document.querySelector(".spanPrecioIva").textContent = 0;
                    document.querySelector(".spanPrecioDescu").textContent = 0;
                    document.querySelector(".spanTotalPrecio").textContent = 0;

                    erroresInput[6] = 1;
                    erroresInput[7] = 1;
                    erroresInput[8] = 1;
                    erroresInput[9] = 1;
                    erroresInput[10] = 1;
                    confirmarErrores();

                    // Limpiar contenedor de Unidad si hay una elegida en el momento
                    if(
                        document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                    ){

                        document.querySelector(".divUnidElegi").innerHTML = "";
                        document.querySelector(".divUnidElegi")
                            .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                        document.querySelector(".inputUnid")
                            .classList.replace("inputUnid-C", "inputUnid-A");
                        document.querySelector(".inputUnid").setAttribute("disabled", "");

                    }
                    
                    // Desactivando Input de la Unidad
                    document.querySelector("#inputUnid").setAttribute("disabled", "");
                    
                    // Limpiando lista de unidades
                    document.querySelector(".lisUnidad").innerHTML = "";
                    document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                    
                    // Mostrando error en el Span
                    document.querySelector(".spanErrHorario").style.color = "#ff2222"
                    document.querySelector(".spanErrHorario").textContent = erroresPosibles[5];

                }
                //-------------------------------------------------------------------------------------

                //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

                //------------------------------------------------
                // Si no existe ningun error con los datos
                //------------------------------------------------

                if(document.querySelector(".spanErrHorario").textContent == ""){

                    let unidadesProdDispo = ""; 
                    let unidProdDispoArray = document.querySelector("#pdtUnidadesDispo").value.split(",");

                    let formDispoHorarioXH = new FormData();

                    formDispoHorarioXH.append("fechaReservasXH", fechaReservaXH);
                    formDispoHorarioXH.append("verifiHorarioXHora", true);

                    fetch(urlModoCLienteData, {
                        method: "POST",
                        body: formDispoHorarioXH,
                    })
                        .then((response) => response.json())
                        .then((data) => {

                            // Si Existen reservas en el mismo día y en el mismo horario elegido
                            if(data.length != 0){

                                let horaDispo = true;
                                let diaDispo = true;
                                let semaDispo = true;

                                // Verificando disponibilidad de las unidades según las reservas en la DB
                                for1:
                                for(let i = 0; i < data.length; i++){

                                    // Reservas por hora
                                    if(
                                        data[i]["reserTipo"] == "hora"
                                    ){

                                        let horaEntraReseSuma = horaAMinutos(data[i]["horaEntradaR"]);
                                        let horaSaleReseSuma = horaAMinutos(data[i]["horaSalidaR"]);

                                        if(
                                            (
                                                horaEntraSumaXH > horaEntraReseSuma && 
                                                horaEntraSumaXH < horaSaleReseSuma 
                                            ) ||
                                            (
                                                horaSaleSumaXH > horaEntraReseSuma && 
                                                horaSaleSumaXH < horaSaleReseSuma 
                                            ) ||
                                            horaEntraSumaXH == horaEntraReseSuma ||
                                            horaEntraSumaXH == horaSaleReseSuma ||
                                            horaSaleSumaXH == horaEntraReseSuma ||
                                            horaSaleSumaXH == horaSaleReseSuma
                                        ){

                                            // Revisar las reservas
                                            for2:
                                            for(let e = 0; e < unidProdDispoArray.length; e++){

                                                if(unidProdDispoArray[e] == data[i]["id_unidad"]){

                                                    unidProdDispoArray.splice(e, 1);

                                                }
                                                
                                            }
                                            //--------------------------------------------------------------

                                        }

                                    }
                                    //--------------------------------------------------------------------------

                                    if(unidProdDispoArray.length == 0){
                                        horaDispo = false;
                                        break for1;
                                    }

                                    // Reserva por día
                                    if(
                                        data[i]["reserTipo"] == "dia"
                                    ){

                                        // Revisar las reservas
                                        for2:
                                        for(let e = 0; e < unidProdDispoArray.length; e++){

                                            if(unidProdDispoArray[e] == data[i]["id_unidad"]){

                                                unidProdDispoArray.splice(e, 1);

                                            }

                                        }
                                        //--------------------------------------------------------------
                                        
                                    }
                                    //--------------------------------------------------------------------------

                                    if(unidProdDispoArray.length == 0){
                                        diaDispo = false;
                                        break for1;
                                    }

                                    // Reserva por semana
                                    if(data[i]["reserTipo"] == "semana"){

                                        // Revisar las reservas
                                        for2:
                                        for(let e = 0; e < unidProdDispoArray.length; e++){

                                            if(unidProdDispoArray[e] == data[i]["id_unidad"]){

                                                unidProdDispoArray.splice(e, 1);

                                            }

                                        }
                                        //--------------------------------------------------------------

                                    }
                                    //--------------------------------------------------------------------------

                                    if(unidProdDispoArray.length == 0){
                                        semaDispo = false;
                                        break for1;
                                    }

                                }
                                
                                unidadesProdDispo = unidProdDispoArray.toString();
                                console.log("ejecutando");

                                if(
                                    horaDispo == true &&
                                    diaDispo == true &&
                                    semaDispo == true &&
                                    unidadesProdDispo != ""
                                ){

                                    let formUnidadDisponible = new FormData();

                                    formUnidadDisponible.append("unidDispoXH", unidadesProdDispo);

                                    fetch(urlModoCLienteData, {
                                        method: "POST",
                                        body: formUnidadDisponible,
                                    })
                                        .then((response) => response.json())
                                        .then((data) => {

                                            document.querySelector("#diaInicioInputXH").value = document.querySelector("#inputDesde-Hora").value;
                                            document.querySelector("#horaEntradaXH").value = horaEntraXH; 
                                            document.querySelector("#horaSalidaXH").value = horaSaleXH;
                                            document.querySelector("#cantHorasInputXH").value = document.querySelector("#inputHoraDur-Hora").value;
                                            document.querySelector("#cantMinuInputXH").value = document.querySelector("#inputMinuDur-Hora").value;
                                            
                                            erroresInput[7] = 0;
                                            erroresInput[8] = 0;
                                            erroresInput[9] = 0;
                                            erroresInput[10] = 0;
                                            confirmarErrores();
    
                                            // Activando Input de la Unidad
                                            document.querySelector("#inputUnid").removeAttribute("disabled");
                                            
                                            // Limpiando lista de unidades
                                            document.querySelector(".lisUnidad").innerHTML = "";
                                            document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                            
                                            // Mostrando respuesta en el Span
                                            document.querySelector(".spanErrHorario").style.color = "#22aa22"
                                            document.querySelector(".spanErrHorario").textContent = "Horario disponible";

                                            if(document.querySelector("#tipoReservaIn").value == "hora"){

                                                let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                let cantidad = Number(document.querySelector("#cantHorasInputXH").value);
                                                
                                                let precioCantidad = cantidad*precio;
                                                let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                                let precioDescu =  precioCantidad-(precioCantidad*(descu/100));
                                                
                                                document.querySelector(".precioTituloSpan").textContent = "Precio por hora";
                                                document.querySelector(".spanPrecio").textContent = precio+"$";
                                                document.querySelector(".spanCantidad").textContent = cantidad;
                                                document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                                document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                            }else{

                                                if(document.querySelector("#tipoReservaIn").value == "dia"){

                                                    let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                    let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                    let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                    let cantidad = Number(document.querySelector("#cantDiasInputXD").value);
                                                    
                                                    let precioCantidad = cantidad*precio;
                                                    let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                                    let precioDescu =  precioCantidad-(precioCantidad*(descu/100));
                                                    
                                                    document.querySelector(".precioTituloSpan").textContent = "Precio por día";
                                                    document.querySelector(".spanPrecio").textContent = precio+"$";
                                                    document.querySelector(".spanCantidad").textContent = cantidad;
                                                    document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                                    document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                    document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                    document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                                }else{

                                                    if(document.querySelector("#tipoReservaIn").value == "semana"){
                                                        
                                                        let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                        let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                        let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                        
                                                        let precioIva =  precio+(precio*(iva/100));
                                                        let precioDescu =  precio-(precio*(descu/100));
                                                        
                                                        document.querySelector(".precioTituloSpan").textContent = "Precio por semana";
                                                        document.querySelector(".spanPrecio").textContent = precio+"$";
                                                        document.querySelector(".spanCantidad").textContent = 1;
                                                        document.querySelector(".spanSubtotal").textContent = precio+"$";
                                                        document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                        document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                        document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                                    }

                                                }

                                            }

                                            rangoListaUnidadXH.selectNode(document.getElementsByTagName("div").item(0));
                                            const unidSelected =
                                                rangoListaUnidadXH.createContextualFragment(data);
                                            document.querySelector(".lisUnidad").appendChild(unidSelected);
                                        
                                        })
                                        .catch((err) => console.log(err));

                                }else{

                                    if(horaDispo == false){

                                        document.querySelector("#diaInicioInputXH").value = "";
                                        document.querySelector("#horaEntradaXH").value = ""; 
                                        document.querySelector("#horaSalidaXH").value = "";
                                        document.querySelector("#cantHorasInputXH").value = "";
                                        document.querySelector("#cantMinuInputXH").value = "";
                                        document.querySelector("#unidadInId").value = "";

                                        document.querySelector(".precioTituloSpan").textContent = "Precio";
                                        document.querySelector(".spanPrecio").textContent = 0;
                                        document.querySelector(".spanCantidad").textContent = 0;
                                        document.querySelector(".spanSubtotal").textContent = 0;
                                        document.querySelector(".spanPrecioIva").textContent = 0;
                                        document.querySelector(".spanPrecioDescu").textContent = 0;
                                        document.querySelector(".spanTotalPrecio").textContent = 0;
                                        
                                        erroresInput[6] = 1;
                                        erroresInput[7] = 1;
                                        erroresInput[8] = 1;
                                        erroresInput[9] = 1;
                                        erroresInput[10] = 1;
                                        confirmarErrores();

                                        // Desactivando Input de la Unidad
                                        document.querySelector("#inputUnid").setAttribute("disabled", "");
                                        
                                        // Limpiar contenedor de Unidad si hay una elegida en el momento
                                        if(
                                            document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                                        ){

                                            document.querySelector(".divUnidElegi").innerHTML = "";
                                            document.querySelector(".divUnidElegi")
                                                .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                            document.querySelector(".inputUnid")
                                                .classList.replace("inputUnid-C", "inputUnid-A");
                                            document.querySelector(".inputUnid").setAttribute("disabled", "");

                                        }

                                        // Limpiando lista de unidades
                                        document.querySelector(".lisUnidad").innerHTML = "";
                                        document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                        
                                        // Mostrando error en el Span
                                        document.querySelector(".spanErrHorario").style.color = "#ff2222"
                                        document.querySelector(".spanErrHorario").textContent = erroresPosibles[8];

                                    }else{

                                        if(diaDispo == false){

                                            document.querySelector("#diaInicioInputXH").value = "";
                                            document.querySelector("#horaEntradaXH").value = ""; 
                                            document.querySelector("#horaSalidaXH").value = "";
                                            document.querySelector("#cantHorasInputXH").value = "";
                                            document.querySelector("#cantMinuInputXH").value = "";
                                            document.querySelector("#unidadInId").value = "";

                                            document.querySelector(".precioTituloSpan").textContent = "Precio";
                                            document.querySelector(".spanPrecio").textContent = 0;
                                            document.querySelector(".spanCantidad").textContent = 0;
                                            document.querySelector(".spanSubtotal").textContent = 0;
                                            document.querySelector(".spanPrecioIva").textContent = 0;
                                            document.querySelector(".spanPrecioDescu").textContent = 0;
                                            document.querySelector(".spanTotalPrecio").textContent = 0;
                                            
                                            erroresInput[6] = 1;
                                            erroresInput[7] = 1;
                                            erroresInput[8] = 1;
                                            erroresInput[9] = 1;
                                            erroresInput[10] = 1;
                                            confirmarErrores();

                                            // Limpiar contenedor de Unidad si hay una elegida en el momento
                                            if(
                                                document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                                            ){

                                                document.querySelector(".divUnidElegi").innerHTML = "";
                                                document.querySelector(".divUnidElegi")
                                                    .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                                document.querySelector(".inputUnid")
                                                    .classList.replace("inputUnid-C", "inputUnid-A");
                                                document.querySelector(".inputUnid").setAttribute("disabled", "");

                                            }

                                            // Desactivando Input de la Unidad
                                            document.querySelector("#inputUnid").setAttribute("disabled", "");
                                            
                                            // Limpiando lista de unidades
                                            document.querySelector(".lisUnidad").innerHTML = "";
                                            document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                            
                                            // Mostrando error en el Span
                                            document.querySelector(".spanErrHorario").style.color = "#ff2222"
                                            document.querySelector(".spanErrHorario").textContent = erroresPosibles[6];

                                        }else{

                                            if(semaDispo == false){

                                                document.querySelector("#diaInicioInputXH").value = "";
                                                document.querySelector("#horaEntradaXH").value = ""; 
                                                document.querySelector("#horaSalidaXH").value = "";
                                                document.querySelector("#cantHorasInputXH").value = "";
                                                document.querySelector("#cantMinuInputXH").value = "";
                                                document.querySelector("#unidadInId").value = "";

                                                document.querySelector(".precioTituloSpan").textContent = "Precio";
                                                document.querySelector(".spanPrecio").textContent = 0;
                                                document.querySelector(".spanCantidad").textContent = 0;
                                                document.querySelector(".spanSubtotal").textContent = 0;
                                                document.querySelector(".spanPrecioIva").textContent = 0;
                                                document.querySelector(".spanPrecioDescu").textContent = 0;
                                                document.querySelector(".spanTotalPrecio").textContent = 0;
                                                
                                                erroresInput[6] = 1;
                                                erroresInput[7] = 1;
                                                erroresInput[8] = 1;
                                                erroresInput[9] = 1;
                                                erroresInput[10] = 1;
                                                confirmarErrores();

                                                // Limpiar contenedor de Unidad si hay una elegida en el momento
                                                if(
                                                    document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                                                ){

                                                    document.querySelector(".divUnidElegi").innerHTML = "";
                                                    document.querySelector(".divUnidElegi")
                                                        .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                                                    document.querySelector(".inputUnid")
                                                        .classList.replace("inputUnid-C", "inputUnid-A");
                                                    document.querySelector(".inputUnid").setAttribute("disabled", "");

                                                }

                                                // Desactivando Input de la Unidad
                                                document.querySelector("#inputUnid").setAttribute("disabled", "");
                                                
                                                // Limpiando lista de unidades
                                                document.querySelector(".lisUnidad").innerHTML = "";
                                                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                                                
                                                // Mostrando error en el Span
                                                document.querySelector(".spanErrHorario").style.color = "#ff2222"
                                                document.querySelector(".spanErrHorario").textContent = erroresPosibles[7];

                                            }

                                        }
                                        
                                    }

                                }

                            }else{

                                // Si la data de las reservas llega vacía (Horario Disponible)
                                unidadesProdDispo = unidProdDispoArray.toString();

                                let formUnidadDisponible = new FormData();
                                formUnidadDisponible.append("unidDispoXH", unidadesProdDispo);

                                fetch(urlModoCLienteData, {
                                    method: "POST",
                                    body: formUnidadDisponible,
                                })
                                    .then((response) => response.json())
                                    .then((data) => {

                                        document.querySelector("#diaInicioInputXH").value = document.querySelector("#inputDesde-Hora").value;
                                        document.querySelector("#horaEntradaXH").value = horaEntraXH; 
                                        document.querySelector("#horaSalidaXH").value = horaSaleXH;
                                        document.querySelector("#cantHorasInputXH").value = document.querySelector("#inputHoraDur-Hora").value;
                                        document.querySelector("#cantMinuInputXH").value = document.querySelector("#inputMinuDur-Hora").value;

                                        erroresInput[7] = 0;
                                        erroresInput[8] = 0;
                                        erroresInput[9] = 0;
                                        erroresInput[10] = 0;
                                        confirmarErrores();

                                        // Activando Input de la Unidad
                                        document.querySelector("#inputUnid").removeAttribute("disabled");
                                        
                                        // Limpiando lista de unidades
                                        document.querySelector(".lisUnidad").innerHTML = "";
                                        
                                        // Mostrando respuesta en el Span
                                        document.querySelector(".spanErrHorario").style.color = "#22aa22"
                                        document.querySelector(".spanErrHorario").textContent = "Horario disponible";

                                        if(document.querySelector("#tipoReservaIn").value == "hora"){

                                            let precio = Number(document.querySelector("#precioIndividualIn").value);
                                            let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                            let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                            let cantidad = Number(document.querySelector("#cantHorasInputXH").value);
                                            
                                            let precioCantidad = cantidad*precio;
                                            let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                            let precioDescu =  precioCantidad-(precioCantidad*(descu/100));

                                            document.querySelector(".precioTituloSpan").textContent = "Precio por Hora";
                                            document.querySelector(".spanPrecio").textContent = precio+"$";
                                            document.querySelector(".spanCantidad").textContent = cantidad;
                                            document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                            document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                            document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                            document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                        }else{

                                            if(document.querySelector("#tipoReservaIn").value == "dia"){

                                                let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                let cantidad = Number(document.querySelector("#cantDiasInputXD").value);
                                                
                                                let precioCantidad = cantidad*precio;
                                                let precioIva =  precioCantidad+(precioCantidad*(iva/100));
                                                let precioDescu =  precioCantidad-(precioCantidad*(descu/100));

                                                document.querySelector(".precioTituloSpan").textContent = "Precio por Día";
                                                document.querySelector(".spanPrecio").textContent = precio+"$";
                                                document.querySelector(".spanCantidad").textContent = cantidad;
                                                document.querySelector(".spanSubtotal").textContent = precioCantidad+"$";
                                                document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                            }else{

                                                if(document.querySelector("#tipoReservaIn").value == "semana"){

                                                    let precio = Number(document.querySelector("#precioIndividualIn").value);
                                                    let iva = Number(document.querySelector("#ivaPdtElegido").value);
                                                    let descu = Number(document.querySelector("#ivaDescuElegido").value);
                                                    
                                                    let precioIva =  precio+(precio*(iva/100));
                                                    let precioDescu =  precio-(precio*(descu/100));

                                                    document.querySelector(".precioTituloSpan").textContent = "Precio por Semana";
                                                    document.querySelector(".spanPrecio").textContent = precio+"$";
                                                    document.querySelector(".spanCantidad").textContent = 1;
                                                    document.querySelector(".spanSubtotal").textContent = precio+"$";
                                                    document.querySelector(".spanPrecioIva").textContent = precioIva+"$";
                                                    document.querySelector(".spanPrecioDescu").textContent = precioDescu+"$";
                                                    document.querySelector(".spanTotalPrecio").textContent = precioDescu+"$";

                                                }

                                            }

                                        }

                                        rangoListaUnidadXH.selectNode(document.getElementsByTagName("div").item(0));
                                        const unidSelected =
                                            rangoListaUnidadXH.createContextualFragment(data);
                                        document.querySelector(".lisUnidad").appendChild(unidSelected);
                                    
                                    })
                                    .catch((err) => console.log(err));

                            }
                            
                        })
                        .catch((err) => console.log(err));

                }
                //-------------------------------------------------------------------------------------

            }else{

                document.querySelector("#diaInicioInputXH").value = "";
                document.querySelector("#horaEntradaXH").value = ""; 
                document.querySelector("#horaSalidaXH").value = "";
                document.querySelector("#cantHorasInputXH").value = "";
                document.querySelector("#cantMinuInputXH").value = "";
                document.querySelector("#unidadInId").value = "";

                document.querySelector(".precioTituloSpan").textContent = "Precio";
                document.querySelector(".spanPrecio").textContent = 0;
                document.querySelector(".spanCantidad").textContent = 0;
                document.querySelector(".spanSubtotal").textContent = 0;
                document.querySelector(".spanPrecioIva").textContent = 0;
                document.querySelector(".spanPrecioDescu").textContent = 0;
                document.querySelector(".spanTotalPrecio").textContent = 0;

                erroresInput[6] = 1;
                erroresInput[7] = 1;
                erroresInput[8] = 1;
                erroresInput[9] = 1;
                erroresInput[10] = 1;
                confirmarErrores();

                // Limpiar contenedor de Unidad si hay una elegida en el momento
                if(
                    document.querySelector(".divUnidElegi").classList.contains("divUnidElegi-A")
                ){

                    document.querySelector(".divUnidElegi").innerHTML = "";
                    document.querySelector(".divUnidElegi")
                        .classList.replace("divUnidElegi-A", "divUnidElegi-C");

                    document.querySelector(".inputUnid")
                        .classList.replace("inputUnid-C", "inputUnid-A");
                    document.querySelector(".inputUnid").setAttribute("disabled", "");

                }

                // Desactivando Input de la Unidad
                document.querySelector("#inputUnid").setAttribute("disabled", "");
                
                // Limpiando lista de unidades
                document.querySelector(".lisUnidad").innerHTML = "";
                document.querySelector(".lisUnidad").classList.replace("lisUnid-A", "lisUnid-C");
                
                // Mostrando error en el Span
                document.querySelector(".spanErrHorario").style.color = "#ff2222";
                document.querySelector(".spanErrHorario").textContent = "Digite todos los campos para la fecha y duración";

            }

        }

    //------------------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // EVENTOS - INICIO

        // (Bloquear Boton CTRL, CTRL+F5)
        window.addEventListener("keypress", function(event){

            console.log(event);
            // if (event.keyCode == ){
            //     event.preventDefault();
            //     alert("Acción NO Permitida");
            // }

        }, false);

        // (Click fuera) ocultar cuadro perfil opciones
        if(document.querySelector("#cuadroPOculto") != null){

            window.addEventListener('click', function mostrarCuadroPerfil(e) {
    
            if (document.getElementById('divPerfil').contains(e.target)) {
                
    
            } else {
                    
                document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
    
            }
    
            });
    
        }
    
        // Foto Perfil Botón
        if(divPerfilFotoBtn != null){
    
            divPerfilFotoBtn.addEventListener("click", () => {
            if (cuadroOPerfil.classList.contains("cuadroOPerfil1")) {
                cuadroOPerfil.classList.replace("cuadroOPerfil1", "cuadroOPerfil2");
            } else {
                if (cuadroOPerfil.classList.contains("cuadroOPerfil2")) {
                cuadroOPerfil.classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
                }
            }
            });
    
        }
    
        // Botón Ajustes de la Cuenta
        if(ajustesCuentaBtn != null){
            
            ajustesCuentaBtn.addEventListener("click", (e) => {
            
            e.preventDefault();
            window.location.href = "usuarioPerfil.php";
        
            })
    
        }
        
        // Botón Cerrar Sesión
        if(btnCerrarSesion != null){
    
            btnCerrarSesion.addEventListener("click", (e) => {
    
            window.location.href = "cerrar.php";
        
            });
    
        }

        // Botón Pagar Mensualidad
        if(btnPagarMensualidad != null){
            btnPagarMensualidad.addEventListener("click", (e)=>{
            form_btnPagarMensu.submit();
            })
        }
    
        // Botón Realizar Reserva
        // if(btnRealizaRese != null){
        //     btnRealizaRese.addEventListener("click", (e)=>{
        //     form_btnRealizaRese.submit();
        //     })
        // }

        // Botón HOY calendario mes (Nueva Reserva)
        document.querySelector(".btnHoy").addEventListener("click", (e)=>{

            mesCalenGene = mesGene;
            anioCalenGene = anioGene; 

            let fecha = crearFecha();

            if(diaAnterior != ""){
                if(document.querySelector(diaAnterior) != null){
                    document.querySelector(diaAnterior).style.outline = "none";
                }
            }

            if(document.querySelector("#idPdtSelected") != null){

                let id = document.querySelector("#idPdtSelected").value;
                let tipoRese = document.querySelector("#tipoReservaIn").value;

                crearCalendario("", "", id, tipoRese, true);

            }else{

                crearCalendario("", "", "", "", true);

            }
            
            if(fecha[1] == 0){

                verDisponibilidadDia("", true, "");

            }else{

                if(fecha[1] == 6){

                    if(diasDisponInput > 5){
                        verDisponibilidadDia("", "", "");
                    }else{
                        verDisponibilidadDia("", "", true);
                    }

                }else{

                    if(fecha[1] != 0){
                        verDisponibilidadDia("", "", "");
                    }

                }

            }
            
        });

        // Flechas para cambiar mes en el calendario
        document.querySelector(".btnMoverMesAtras").addEventListener("click", (e)=>{

            if(mesCalenGene == 1){
                mesCalenGene = 12;
                anioCalenGene--;
            }else{
                mesCalenGene--
            }
            
            let id = document.querySelector("#idPdtSelected").value;
            let tipoRese = document.querySelector("#tipoReservaIn").value;

            crearCalendario("", "", id, tipoRese, true);

        });

        document.querySelector(".btnMoverMesDelante").addEventListener("click", (e)=>{

            if(mesCalenGene == 12){
                mesCalenGene = 1;
                anioCalenGene++;
            }else{
                mesCalenGene++
            }

            let id = document.querySelector("#idPdtSelected").value;
            let tipoRese = document.querySelector("#tipoReservaIn").value;

            crearCalendario("", "", id, tipoRese, true);

        })

        // Buscando PRODUCTOS disponibles y llenando la lista desplegable (Nueva Reserva)
        const rangePdtLisNewRese = document.createRange();

        if(document.querySelector("#inputSelecPdt") != null){

            window.addEventListener('click', function mostrarListaProductos(e) {

                if (document.getElementById('inputSelecPdt').contains(e.target)) {
                    

                } else {
                    
                    document.querySelector(".producReserLista").classList.replace("prodRLista-A", "prodRLista-C");

                }

            });

        }

        document.querySelector("#inputSelecPdt").addEventListener("input", (e)=>{

            let valor = e.target.value;

            if(valor != ""){

                let formPdtSeleNewRese = new FormData();

                formPdtSeleNewRese.append("pdtSelectReseNew", valor);

                fetch(urlModoCLienteData, {
                    method: "POST",
                    body: formPdtSeleNewRese,
                })
                    .then((response) => response.json())
                    .then((data) => {

                        document.querySelector(".producReserLista").innerHTML = "";
                        document.querySelector(".producReserLista").classList.replace("prodRLista-C", "prodRLista-A");

                        rangePdtLisNewRese.selectNode(document.getElementsByTagName("div").item(0));
                        const listaPdtNewRese =
                        rangePdtLisNewRese.createContextualFragment(data);
                        document.querySelector(".producReserLista").appendChild(listaPdtNewRese);

                    })
                    .catch((err) => console.log(err));

            }else{

                document.querySelector(".producReserLista").classList.replace("prodRLista-A", "prodRLista-C");
                
            }

        });

        // Buscando MIEMBROS disponibles y llenando la lista desplegable (Nueva Reserva)
        const rangeMiemLisNewRese = document.createRange();

        document.querySelector("#inputMiembro").addEventListener("input", (e)=>{

            window.addEventListener('click', function mostrarListaMiembro(e) {

                if (document.getElementById('inputMiembro').contains(e.target)) {
                    

                } else {
                    
                    document.querySelector(".miembroLis").classList.replace("miembroLis-A", "miembroLis-C");

                }

            });

            let valorMiem = e.target.value;

            if(valorMiem != ""){

                let formMiemSeleNewRese = new FormData();

                formMiemSeleNewRese.append("miemSelectReseNew", valorMiem);

                fetch(urlModoCLienteData, {
                    method: "POST",
                    body: formMiemSeleNewRese,
                })
                    .then((response) => response.json())
                    .then((data) => {

                        document.querySelector(".miembroLis").innerHTML = "";
                        document.querySelector(".miembroLis").classList.replace("miembroLis-C", "miembroLis-A");

                        rangeMiemLisNewRese.selectNode(document.getElementsByTagName("div").item(0));
                        const listaMiemNewRese =
                        rangeMiemLisNewRese.createContextualFragment(data);
                        document.querySelector(".miembroLis").appendChild(listaMiemNewRese);

                    })
                    .catch((err) => console.log(err));

            }else{

                document.querySelector(".miembroLis").innerHTML = "";
                document.querySelector(".miembroLis").classList.replace("miembroLis-A", "miembroLis-C");
                
            }

        });

        // Input Número de Personas
        document.querySelector("#inputNumPerso").addEventListener("input", (e)=>{

            let valor = e.target.value;

            if(valor != 0 && valor != "" && valor != null){

                document.querySelector("#numeroPersoIn").value = valor;

                erroresInput[3] = 0;
                confirmarErrores();

                document.querySelector("#inputNumPerso").style.outline = "none";

            }else{

                document.querySelector("#numeroPersoIn").value = "";

                erroresInput[3] = 1;
                confirmarErrores();

                document.querySelector("#inputNumPerso").style.outline = "3px solid #ff222244";

            }

        });

        // Input Título de la Reserva
        document.querySelector("#inputTitulo").addEventListener("input", (e)=>{

            let titulo = e.target.value;

            if(titulo != ""){

                erroresInput[4] = 0;
                confirmarErrores();
                document.querySelector("#tituloReserOcul").value = titulo;

            }else{

                erroresInput[4] = 1;
                confirmarErrores();
                document.querySelector("#tituloReserOcul").value = "";

            }

        });

        // Input Actividades de la Reserva
        document.querySelector("#actividadRese").addEventListener("input", (e)=>{

            let actividad = e.target.value;

            if(actividad != ""){

                erroresInput[5] = 0;
                confirmarErrores();
                document.querySelector("#actividadesReserOcul").value = actividad;

            }else{

                erroresInput[5] = 1;
                confirmarErrores();
                document.querySelector("#actividadesReserOcul").value = "";

            }

        });

        // Botón siguiente
        // Desplegar cuadro de la pasarela Epayco para introducir los datos del método de pago
        document.querySelector("#btnContinuar").addEventListener("click", (e)=>{

            let sumaErrores = 0;

            for(let i = 0; i < erroresInput.length; i++){

                sumaErrores += erroresInput[i]

            }

            if(
                sumaErrores == 0
            ){
                
                e.preventDefault();

                let nombrePdt = document.querySelector("#nombrePdt").value;
                let descriCorta = document.querySelector("#descriCortaPdt").value;
                let factura = creaFechaCodFac();

                let cantidad = 0;
                let precio = Number(document.querySelector("#precioIndividualIn").value);
                let precioXCant = 0;

                if(document.querySelector("#tipoReservaIn").value == "hora"){

                    cantidad = Number(document.querySelector("#cantHorasInputXH").value);

                }else{

                    if(document.querySelector("#tipoReservaIn").value == "dia"){

                        cantidad = Number(document.querySelector("#cantDiasInputXD").value);

                    }else{

                        if(document.querySelector("#tipoReservaIn").value == "semana"){

                            cantidad = 1;

                        }

                    }
                }

                precioXCant = precio*cantidad;
                let ivaPdt = Number(document.querySelector("#ivaPdtElegido").value);
                let descuPdt = Number(document.querySelector("#ivaDescuElegido").value);

                let precioTotal = precioXCant+(precioXCant*(ivaPdt/100));
                precioTotal = precioTotal-(precioXCant*(descuPdt/100));

                let nombreUser = document.querySelector("#miembroInNombre").value;
                let documenUser = document.querySelector("#documentoUserOcul").value;
                let celularUser = document.querySelector("#celularUserOcul").value;
                let direccUser = document.querySelector("#direccUserOcul").value;
                let emailUser = document.querySelector("#emailUserOcul").value;

                let titulo = document.querySelector("#tituloReserOcul").value;
                let actividades = document.querySelector("#actividadesReserOcul").value;

                let resCodigo = factura[5];
                let fechaCrea = factura[0];
                let fechaFactuVenci = sumaRestaFecha(fechaCrea, "sumar", 7);
                fechaFactuVenci = fechaFactuVenci[0];
                let horaCrea = factura[1];
                let serieReseFac = factura[2];

                let idUser = document.querySelector("#miembroInId").value;
                let idProd = document.querySelector("#idPdtSelectedInput").value;
                let idUnid = document.querySelector("#unidadInId").value;

                let numeroPersoIn = document.querySelector("#numeroPersoIn").value;

                let tipoRese = document.querySelector("#tipoReservaIn").value;

                // Reserva Tipo Hora

                    let diaInicioInputXH = document.querySelector("#diaInicioInputXH").value;

                    let horaEntradXH = document.querySelector("#horaEntradaXH").value;
                    let horaSalidaXH = document.querySelector("#horaSalidaXH").value;

                    let cantidadHorasXH = 
                        document.querySelector("#cantHorasInputXH").value != ""
                        ? document.querySelector("#cantHorasInputXH").value
                        : 0;

                    let cantidadMinusXH =
                        document.querySelector("#cantMinuInputXH").value != ""
                        ? document.querySelector("#cantMinuInputXH").value
                        : 0;

                //----------------------------------------------------------------------------------------

                // Reserva Tipo Día
                
                    let diaInicioInputXD = document.querySelector("#diaInicioInputXD").value;
                    let diaFinalInputXD = document.querySelector("#diaFinalInputXD").value;
                    let diaCadenaInputXD = document.querySelector("#cadenaDiasInputXD").value;

                    let cantDiasInputXD =
                        document.querySelector("#cantDiasInputXD").value != ""
                        ? document.querySelector("#cantDiasInputXD").value
                        : 0;

                //----------------------------------------------------------------------------------------

                // Reserva Tipo Semana
   
                    let semanaDiaI = document.querySelector("#diaInicioInputXS").value;
                    let semanaDiaF = document.querySelector("#diaFinalInputXS").value;
                    let semanaDias = document.querySelector("#diasSemanaInputXS").value;

                //----------------------------------------------------------------------------------------
                
                console.log(precioTotal);
                
                var dataReserva = {

                    //Parametros compra (obligatorio)
                    name: nombrePdt,
                    description: descriCorta,
                    invoice: factura[3],
                    currency: "cop",
                    amount: precioTotal,
                    tax_base: precio,
                    tax: ivaPdt,
                    tax_ico: "0",
                    country: "co",
                    lang: "es",
    
                    //Onpage="false" - Standard="true"
                    external: "false",
    
    
                    //Atributos opcionales
                    extra1: titulo,
                    extra2: actividades,
                    extra3: idUser,
                    extra4: idProd,
                    extra5: idUnid,
                    extra6: numeroPersoIn,
                    extra7: tipoRese,
                    extra8: diaInicioInputXH,
                    extra9: horaEntradXH,
                    extra10: horaSalidaXH,
                    extra11: cantidadHorasXH,
                    extra12: cantidadMinusXH,
                    extra13: diaInicioInputXD,
                    extra14: diaFinalInputXD,
                    extra15: diaCadenaInputXD,
                    extra16: cantDiasInputXD,
                    extra17: semanaDiaI,
                    extra18: semanaDiaF,
                    extra19: semanaDias,
                    extra20: ivaPdt,
                    extra21: descuPdt,
                    extra22: resCodigo,
                    extra23: fechaCrea,
                    extra24: horaCrea,
                    extra25: serieReseFac,
                    extra26: fechaFactuVenci,
                    extra27: precio,
                    extra28: precioXCant,
                    extra29: precioTotal,

                    // confirmation: "http://165.22.176.119/BizLab/confirmacionPage.php",
                    // response: "http://165.22.176.119/BizLab/transaccionExitosa.php",
                    confirmation: "http://127.0.0.1/BizLab/confirmacionPage.php",
                    response: "http://127.0.0.1/BizLab/transaccionExitosa.php",

                    //Atributos cliente
                    name_billing: String(nombreUser),
                    address_billing: String(direccUser),
                    type_doc_billing: "cc",
                    mobilephone_billing: String(celularUser),
                    number_doc_billing: String(documenUser),
                    email_billing: String(emailUser),
    
                    //atributo deshabilitación método de pago
                    // methodsDisable: ["TDC", "PSE","SP","CASH","DP"]
                    methodsDisable: ["PSE", "CASH"]
    
                }

                handler.open(dataReserva);

            }

        });
    
    //-----------------------------------------------------------------------------------------------

//

}

//------------------------------------------------------
//<<-- REALIZAR RESERVA.PHP | FIN -->>
//------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------
//<<-- PERFIL USUARIO.PHP | INICIO -->>
//------------------------------------------------------

if(document.querySelector("#usuarioPerfilHTML") != null){

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Tomando Elementos del DOM

    // BOTONES
    const btnPagarMensualidad = document.querySelector(".btnPagarMensuali");
    const btnRealizaRese = document.querySelector(".btnRealizaRese");
    const flechaPerfilDiv = document.querySelector(".divFlecha");
    const divPerfilFotoBtn = document.querySelector(".divPerfil");
    const flechaPerfil = document.querySelector(".flechaIconPerfil");
    const btnCerrarSesion = document.querySelector(".btnCerrar");

    // CONTENEDORES
    const cuadroOPerfil = document.querySelector(".cuadroPOculto");

    // FORMULARIOS
    const form_btnPagarMensu = document.querySelector("#form_btnPagarMensu");
    const form_btnRealizaRese = document.querySelector("#form_btnRealizaRese");

    //------------------------------------------------------------------------------------------------------------------------------------------
    
    // Cliente header
    //-----------------------------------------------------------------------

    const btnSubir = document.querySelector("#subirImagenBtn");
    const imagenSelect = document.querySelector("#imgSelectedUser");

    
    // Variables GLobales
    var erroresInputs = [0, 0, 0, 0, 0, 0];

    // Funciones

        // Revisar errores, desbloquear o bloquear botón "Guardar cambios"
        function verErrores(){

            let sumaErrores = 0; 

            for(let i = 0; i < erroresInputs.length; i++){

                sumaErrores += erroresInputs[i];

            }

            if(sumaErrores == 0){

                document.querySelector(".btnGuardar").removeAttribute("disabled");
                document.querySelector(".btnGuardar").classList.replace("btnGuardar-C", "btnGuardar-A");

            }else{

                document.querySelector(".btnGuardar").setAttribute("disabled", "");
                document.querySelector(".btnGuardar").classList.replace("btnGuardar-A", "btnGuardar-C");

            }

            return sumaErrores;

        }

    //--------------------------------------------------------------------------------------------

    // Flecha botón - Mostrar y ocultar PANEL PERFIL
    if(document.querySelector("#cuadroPOculto") != null){

        if(document.querySelector("#divFlecha") != null){

            window.addEventListener('click', function mostrarCuadroPerfil(e) {

                if (document.getElementById('divFlecha').contains(e.target)) {
                    
    
                } else {
                        
                    document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
                    flechaPerfil.classList.replace("flecha2", "flecha1");
    
                }
    
            });

        }else{

            window.addEventListener('click', function mostrarCuadroPerfil(e) {

                if (document.getElementById('divPerfil').contains(e.target)) {
                    
    
                } else {
                        
                    document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
    
                }
    
            });

        }

    }
    
    if(flechaPerfilDiv != null){
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
    }

    if(divPerfilFotoBtn != null){
        divPerfilFotoBtn.addEventListener("click", () => {
            if (cuadroOPerfil.classList.contains("cuadroOPerfil1")) {
                cuadroOPerfil.classList.replace("cuadroOPerfil1", "cuadroOPerfil2");
            } else {
                if (cuadroOPerfil.classList.contains("cuadroOPerfil2")) {
                cuadroOPerfil.classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
                }
            }
        });
    }
    //-------------------------------------------------------------------------------------------

    // Botón cerrar sesión
    if(btnCerrarSesion != null){

        btnCerrarSesion.addEventListener("click", (e) => {

            window.location.href = "cerrar.php";
    
        });

    }
    //-------------------------------------------------------------------------------------------

    // Botón Pagar Mensualidad
    if(btnPagarMensualidad != null){
        btnPagarMensualidad.addEventListener("click", (e)=>{
            form_btnPagarMensu.submit();
        });
    }

    // Botón Realizar Reserva
    if(btnRealizaRese != null){
        btnRealizaRese.addEventListener("click", (e)=>{
            form_btnRealizaRese.submit();
        });
    }

    var arrayDatos = null;

    document.querySelector(".btnActualizar").addEventListener("click", (e)=>{

        document.querySelector(".divImgCambio").classList.replace("divImgCambio-B", "divImgCambio-D");

        document.querySelector(".inputEmail").removeAttribute("disabled");
        document.querySelector(".inputTelef").removeAttribute("disabled");
        document.querySelector(".inputCelular").removeAttribute("disabled");
        document.querySelector(".inputDirecc").removeAttribute("disabled");
        document.querySelector("#generoInput").removeAttribute("disabled");
        document.querySelector("#generoInput").classList.replace("select-B", "select-D");
        btnSubir.value = "";

        document.querySelector(".btnCancelar").removeAttribute("disabled");
        document.querySelector(".divBtnGuardaCancel").classList.replace("divBtnGuardaCancel-C", "divBtnGuardaCancel-A");

        document.querySelector(".divBtnEdit").classList.replace("divBtnEdit-A", "divBtnEdit-C");
        document.querySelector(".btnActualizar").setAttribute("disabled", "");

        arrayDatos = [5];

        arrayDatos[0] = document.querySelector(".inputEmail").value;
        arrayDatos[1] = document.querySelector(".inputTelef").value;
        arrayDatos[2] = document.querySelector(".inputCelular").value;
        arrayDatos[3] = document.querySelector(".inputDirecc").value;
        arrayDatos[4] = 
            document.querySelector("#generoInput").
            options[document.querySelector("#generoInput").selectedIndex].
            text;
        arrayDatos[5] = imagenSelect.getAttribute("src");

    });

    document.querySelector(".btnCancelar").addEventListener("click", (e)=>{

        document.querySelector(".divImgCambio").classList.replace("divImgCambio-D", "divImgCambio-B");

        document.querySelector(".inputEmail").setAttribute("disabled", "");
        document.querySelector(".inputTelef").setAttribute("disabled", "");
        document.querySelector(".inputCelular").setAttribute("disabled", "");
        document.querySelector(".inputDirecc").setAttribute("disabled", "");
        document.querySelector("#generoInput").setAttribute("disabled", "");
        document.querySelector("#generoInput").classList.replace("select-D", "select-B");

        document.querySelector(".btnCancelar").setAttribute("disabled", "");
        document.querySelector(".btnGuardar").setAttribute("disabled", "");
        document.querySelector(".divBtnGuardaCancel").classList.replace("divBtnGuardaCancel-A", "divBtnGuardaCancel-C");

        document.querySelector(".divBtnEdit").classList.replace("divBtnEdit-C", "divBtnEdit-A");
        document.querySelector(".btnActualizar").removeAttribute("disabled");

        document.querySelector(".inputEmail").value = arrayDatos[0];
        document.querySelector(".inputTelef").value = arrayDatos[1]; 
        document.querySelector(".inputCelular").value = arrayDatos[2];
        document.querySelector(".inputDirecc").value = arrayDatos[3];
        document.querySelector("#generoInput").value = arrayDatos[4];
        imagenSelect.removeAttribute("src");
        imagenSelect.setAttribute("src", arrayDatos[5]);

    });


    // Evento para el Preview de la Imágen

        btnSubir.onchange = () => {

            let pesoImg = (btnSubir.files[0].size/1048576).toFixed(2);

            if(Number(pesoImg)<=2){

                let reader = new FileReader();
                reader.readAsDataURL(btnSubir.files[0]);
                reader.onload = () => {
                    imagenSelect.removeAttribute("src");
                    imagenSelect.setAttribute("src", reader.result);
                }
                
                erroresInputs[6] = 0;
                verErrores();

            }else{

                erroresInputs[6] = 1;
                verErrores();

                imagenSelect.removeAttribute("src");
                imagenSelect.setAttribute("src", arrayDatos[5]);
                btnSubir.value = "";

            }

        }

    //-----------------------------------------------------------------------------------------

    document.querySelector(".inputEmail").addEventListener("input", (e)=>{

        let valor = e.target.value;

        if(valor != ""){

            erroresInputs[0] = 0;

        }else{

            erroresInputs[0] = 1;

        }

        verErrores();

    });

    document.querySelector(".inputCelular").addEventListener("input", (e)=>{

        let valor = e.target.value;

        if(valor != ""){

            erroresInputs[2] = 0;

        }else{

            erroresInputs[2] = 1;

        }

        verErrores();

    });

    document.querySelector(".inputDirecc").addEventListener("input", (e)=>{

        let valor = e.target.value;

        if(valor != ""){

            erroresInputs[3] = 0;

        }else{

            erroresInputs[3] = 1;

        }

        verErrores();

    });

    document.querySelector("#generoInput").addEventListener("input", (e)=>{

        let valor = document.querySelector("#generoInput").options[document.querySelector("#generoInput").selectedIndex].text;

        if(valor != ""){

            erroresInputs[4] = 0;

        }else{

            erroresInputs[4] = 1;

        }

        verErrores();

    });

    //----------------------------------------------------------------------------------------------------------------
    // Botón Actualizar

        document.querySelector(".btnGuardar").addEventListener("click", ()=>{

            let errores = verErrores();

            if(errores == 0){

                let formActuPerfil = new FormData();

                let genero = 
                    document.querySelector("#generoInput").
                    options[document.querySelector("#generoInput").selectedIndex].
                    text;

                let userId = document.querySelector("#userId").value;
                let imagenNombre = "";
                let imagenPdt = "";

                if(btnSubir.value != ""){
                    imagenNombre = btnSubir.files[0].name;
                    imagenPdt = btnSubir.files[0];
                }

                console.log(userId);
                console.log(document.querySelector(".inputEmail").value);
                console.log(document.querySelector(".inputCelular").value);
                console.log(document.querySelector(".inputDirecc").value);
                console.log(imagenNombre);
                console.log(genero);

                formActuPerfil.append("idUserActuPerfil", userId);
                formActuPerfil.append("emailActuPerfil", document.querySelector(".inputEmail").value);
                formActuPerfil.append("celularActuPerfil", document.querySelector(".inputCelular").value);
                formActuPerfil.append("telefonoActuPerfil", document.querySelector(".inputTelef").value);
                formActuPerfil.append("direccActuPerfil", document.querySelector(".inputDirecc").value);
                formActuPerfil.append("generoActuPerfil", genero);
                if(btnSubir.value != ""){
                    formActuPerfil.append("imagenNombre", imagenNombre);
                    formActuPerfil.append("prodImg", imagenPdt);
                }

                fetch(urlInfoAdmin, {
                    method: "POST",
                    body: formActuPerfil,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        
                        console.log(data);

                    })
                    .catch((err) => console.log(err));

                document.querySelector(".divImgCambio").classList.replace("divImgCambio-D", "divImgCambio-B");

                document.querySelector(".inputEmail").setAttribute("disabled", "");
                document.querySelector(".inputTelef").setAttribute("disabled", "");
                document.querySelector(".inputCelular").setAttribute("disabled", "");
                document.querySelector(".inputDirecc").setAttribute("disabled", "");
                document.querySelector("#generoInput").setAttribute("disabled", "");
                document.querySelector("#generoInput").classList.replace("select-D", "select-B");

                document.querySelector(".btnCancelar").setAttribute("disabled", "");
                document.querySelector(".btnGuardar").setAttribute("disabled", "");
                document.querySelector(".divBtnGuardaCancel").classList.replace("divBtnGuardaCancel-A", "divBtnGuardaCancel-C");
        
                document.querySelector(".divBtnEdit").classList.replace("divBtnEdit-C", "divBtnEdit-A");
                document.querySelector(".btnActualizar").removeAttribute("disabled");

            }

        });

    //----------------------------------------------------------------------------------------------------------------

}

//------------------------------------------------------
//<<-- PERFIL USUARIO.PHP | FIN -->>
//------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------
// VARIABLES Y FUNCIONES GLOBALES //

/* Local - (Localhost, XAMPP) */
// import {urlInfoClienteDB, urlBuscarInfoAdminDB, urlIndex, urlConfirTDC, urlCreaFacMembre, urlGuardaTokenUser, urlCrearSub, url_consultasDB,
// urlCrearUserToken, cadenaFechaActual, url_realizaReservaNew, urlProxyEpayco, mesesFactura, mesesFacturaCod, obtenerFechaActual, minutosAFormato12h, sumarRestarDias, 
// obtenerDiaSemana, creaCodFMR, actuCopyAnio, horaAMinutos, fechaANumero, obtenerRangoDeFechas, horaAEpoch} from "http://localhost/BizClub/scripts/vyfGlobales.js";

/* Producción - (Bluehost) */
import {urlInfoClienteDB, urlBuscarInfoAdminDB, urlIndex, urlConfirTDC, urlCreaFacMembre, urlGuardaTokenUser, urlCrearSub, url_consultasDB,
urlCrearUserToken, cadenaFechaActual, url_realizaReservaNew, urlProxyEpayco, mesesFactura, mesesFacturaCod, obtenerFechaActual, minutosAFormato12h, sumarRestarDias, 
obtenerDiaSemana, creaCodFMR, actuCopyAnio, horaAMinutos, fechaANumero, obtenerRangoDeFechas, horaAEpoch} from "https://plataforma.the-bizclub.com/scripts/vyfGlobales.js";
    
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

//------------------------------------------------------------------------------------------------------------------------------------
// Tomando elementos del DOM

    // B (Bold)
    const b_numeroPersoMax = document.querySelector("#b_numeroPersoMax");

    // SPAN
    const span_camposCompleNum = document.querySelector("#span_camposCompleNum");
    const span_duracionRese = document.querySelector("#span_duracionRese");
    const span_limiteActividad = document.querySelector("#span_limiteActividad");
    const span_limiteActividadB = document.querySelector("#span_limiteActividadB");
    const span_errorDatosNR = document.querySelector("#span_errorDatosNR");

    // CONTENEDORES
    const div_lisPdtsReserva = document.querySelector("#div_lisPdtsReserva");
    const div_listaUnidades = document.querySelector("#div_listaUnidades");
    const div_baseDatosPdtSelec = document.querySelector("#div_baseDatosPdtSelec");
    const div_baseInLisPdts = document.querySelector("#div_baseInLisPdts");
    const div_pdtElegidoBase = document.querySelector("#div_pdtElegidoBase");
    const div_basePrinElegirPdt = document.querySelector("#div_basePrinElegirPdt");
    const div_cubiertaCuadro2 = document.querySelector("#div_cubiertaCuadro2");
    const div_cubiertaCuadro3 = document.querySelector("#div_cubiertaCuadro3");

    const div_duracionUnidadBase = document.querySelector("#div_duracionUnidadBase");
    const div_estadoHorarioBase = document.querySelector("#div_estadoHorarioBase");
    const div_basePrinUnidad = document.querySelector("#div_basePrinUnidad");
    const div_duracionInputsBase = document.querySelector("#div_duracionInputsBase");
    const div_unidadSelectedBase = document.querySelector("#div_unidadSelectedBase");
    const div_erroreBaseDatosNR = document.querySelector("#div_erroreBaseDatosNR");

    // BOTONES
    const btn_continuarReserva = document.querySelector("#btn_continuarReserva");
    const btn_volverAlInicio = document.querySelector("#btn_volverAlInicio");

    // INPUTS
    const in_pdtNombre = document.querySelector("#in_pdtNombre");
    const in_cantidadRese = document.querySelector("#in_cantidadRese");
    const in_mostrarLisUnidad = document.querySelector("#in_mostrarLisUnidad");
    const in_numPersoRese = document.querySelector("#in_numPersoRese");
    const in_tituloReserva = document.querySelector("#in_tituloReserva");
    const in_actividadesRese = document.querySelector("#in_actividadesRese");

// Tomando elementos del DOM
//------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------
// Variables

    // Rangos
    const rangeDatosPdtSelected = document.createRange();
    const rangeListaPdt = document.createRange();
    const rangePdtSelected = document.createRange(); 
    const rangeInputsDuracion = document.createRange();
    const rangeListaUnidades = document.createRange();

    // Datos de la Reserva
    let idUsuarioLogueado = Number(document.querySelector('[name="inO_idUsuarioRese"]').getAttribute("content"));
    document.querySelector('[name="inO_idUsuarioRese"]').remove();

    let nombreUserLogueado = document.querySelector('[name="inO_nombreUsuarioRese"]').getAttribute("content");
    document.querySelector('[name="inO_nombreUsuarioRese"]').remove();

    let idPdtSeleccionado = null;
    let tipoReservaSelected = null;

    let precioPorHoraGene = 0;
    let precioPorDiaGene = 0;
    let precioPorSemaGene = 0;
    let precioPorMesGene = 0;

    let precioEstandarPdt = 0;
    let precioReservaFinal = 0;
    let ivaReserva = 0;
    let descuentoReserva = 0;
    let comisionReserva = 0;
    let ivaReservaPrecio = 0;
    let descuentoReservaPrecio = 0;

    let fechaInicioFinal = "";
    let fechaSalidaFinal = "";
    let fechaInicioNumFinal = 0;
    let fechaSalidaNumFinal = 0;
    let horaInicioFinal = "";
    let horaSalidaFinal = "";
    let duracionReservaFinal = 0;
    
    let cantidadPersonFinal = 0;

    let unidadSeleccionada = 0; 

    let tituloReservaFinal = "";
    let actividadReservaFinal = "";

    // Unidades disponibles para el producto seleccionado
    let unidadesDispoProducGene = "";
    
    // Campos para verificar si todos los campos fueron completados 
    // (desbloquear/bloquear botón para Continuar la Reserva)
    let camposCompletados = 0;
    let seleccionTR = 0;
    let seleccionTR_AC = 0;
    let unidadLlena = 0;
    let tituloLleno = 0;
    let actividadLlena = 0;
    
    // Datos para la reserva tipo SEMANA
    let fechaSemanaActual = new Date();
    let inicioSemanaActual;
    let tamañoSemana = 5;
    let fechaMinimaPermitida;  

    // Datos para el Input de selección de productos
    let timerListaPdt;

    // Errores
    let errorreDatosNR = {
        1: "Fecha de Inicio Inválida",
        2: "Hora de Inicio Fuera de rango: mínimo 7:00 AM",
        3: "Hora de Inicio Fuera de rango: máximo 6:00 PM",
        4: "Hora de Salida Fuera de rango: mínimo 8:00 AM",
        5: "Hora de Salida Fuera de rango: mínimo 7:00 PM",
        6: "Fecha de Inicio Fuera de rango: El día Domingo no es laboral",
        7: "Fecha de Final Fuera de rango: El día Domingo no es laboral"
    };    

// Variables
//------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------
// EVENTOS //

    //Botón Volver al Inicio
    btn_volverAlInicio.addEventListener("click", (e)=>{

        window.location.href = urlIndex;

    });

    // Función para desbloquear/bloquear el botón "Continuar la Reserva"
    function desbloquearBotonContiRese(){

        if(camposCompletados == "6"){

            btn_continuarReserva.classList.replace("btn_continuarReserva-1", "btn_continuarReserva-2");
            btn_continuarReserva.removeAttribute("disabled");

        }else{

            btn_continuarReserva.classList.replace("btn_continuarReserva-2", "btn_continuarReserva-1");
            btn_continuarReserva.setAttribute("disabled", "");

        }

    }

    // Input - Número de personas, marcar como completado por defecto
    if(
    in_numPersoRese.value != "" && 
    in_numPersoRese.value != null && 
    in_numPersoRese.value != 0
    ){
        camposCompletados++;
        cantidadPersonFinal = in_numPersoRese.value;
        desbloquearBotonContiRese();
    }

    //---------------------------------------------------------------------------------------------------------------------------------
    // INPUT ELEGIR PRODUCTOS

        // Renderizar Lista de Productos en la lista desplegable
        function renderizarListaProductos(productos) {

            div_lisPdtsReserva.innerHTML = "";  

            if(productos !== "No se encontraron productos"){

                let html = 
                    productos.map(producto => `
                    <div
                    id="div_pdtLiBase-${producto.id_producto}"
                    class="div_pdtLiBase div_pdtLiBase-1"
                    >
                        <div
                        class="div_pdtLi div_pdtLi-1"
                        >
                            <div
                            class="div_imgBase div_imgBase-1"
                            >
                                <img src="images/productosImages/${producto.productoImgPrin}" alt="">
                            </div>
                            <div
                            class="div_pdtDatos div_pdtDatos-1"
                            >
                                <span
                                class="span_pdtNombre"
                                >${producto.produNombre}</span>
                            </div>
                        </div>
                    </div>
                    `).join(""); 
            
                const fragmentListaPdt = rangeListaPdt.createContextualFragment(html); 
                div_lisPdtsReserva.appendChild(fragmentListaPdt); 

                productos.forEach(producto => {

                    const elemento = document.getElementById(`div_pdtLiBase-${producto.id_producto}`);
                    if (elemento) {

                        elemento.addEventListener("click", () => {

                            let formPdtElegido = new FormData();

                            formPdtElegido.append("elegirPdtNewR", "true");
                            formPdtElegido.append("idProducto", producto.id_producto);

                            fetch(url_consultasDB, {
                                method: 'POST',
                                body: formPdtElegido
                            })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(`Error HTTP: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then((data) => {

                                let pagoXHora = (data.data[0]["precioXhora"] == 0) ? "N/A" : data.data[0]["precioXhora"];
                                pagoXHora = (pagoXHora == 1) ? "A Consultar" : pagoXHora;
                                pagoXHora = (pagoXHora == "N/A") ? pagoXHora : pagoXHora+" COP";

                                let pagoXDia = (data.data[0]["precioXDia"] == 0) ? "N/A" : data.data[0]["precioXDia"];
                                pagoXDia = (pagoXDia == 1) ? "A Consultar" : pagoXDia;
                                pagoXDia = (pagoXDia == "N/A") ? pagoXDia : pagoXDia+" COP";

                                let pagoXSema = (data.data[0]["precioXSemana"] == 0) ? "N/A" : data.data[0]["precioXSemana"];
                                pagoXSema = (pagoXSema == 1) ? "A Consultar" : pagoXSema;
                                pagoXSema = (pagoXSema == "N/A") ? pagoXSema : pagoXSema+" COP";

                                ivaReserva = Number(data.data[0]["produIva"]);
                                descuentoReserva = Number(data.data[0]["produDescu"]);

                                precioPorHoraGene = Number(data.data[0]["precioXhora"]);
                                precioPorDiaGene = Number(data.data[0]["precioXDia"]);
                                precioPorSemaGene = Number(data.data[0]["precioXSemana"]);
                                precioPorMesGene = 1;
                                unidadesDispoProducGene = data.data[0]["unidDisponibles"];

                                //------------------------------------------------------------------------------------------------------------------------------

                                div_lisPdtsReserva.innerHTML = "";
                                div_lisPdtsReserva.classList.replace("div_lisPdtsReserva-2", "div_lisPdtsReserva-1");

                                div_baseInLisPdts.classList.replace("div_baseInLisPdts-2", "div_baseInLisPdts-1");

                                let htmlPdtSelected = `
                                <div
                                id="div_pdtElegido-${data.data[0]["id_producto"]}"
                                class="div_pdtElegido div_pdtElegido-1"
                                >
                                    <div
                                    class="div_imgProducto div_imgProducto-1"
                                    >
                                        <img src="images/productosImages/${data.data[0]["productoImgPrin"]}" alt="">
                                    </div>
                                    <div
                                    class="div_datosPdtElegidoBase div_datosPdtElegidoBase-1"
                                    >
                                        <span
                                        class="span_nombrePdtElegido span_nombrePdtElegido-1"
                                        >${data.data[0]["produNombre"]}</span>
                                    </div>
                                </div>
                                `;
                                
                                div_basePrinElegirPdt.style.height = "15rem";

                                const pdtSelected = rangePdtSelected.createContextualFragment(htmlPdtSelected); 
                                div_pdtElegidoBase.appendChild(pdtSelected); 

                                div_pdtElegidoBase.classList.replace("div_pdtElegidoBase-1", "div_pdtElegidoBase-2");

                                //------------------------------------------------------------------------------------------------------------------------------

                                div_cubiertaCuadro2.classList.replace("div_cubiertaCuadro2-1", "div_cubiertaCuadro2-2");
                                div_cubiertaCuadro3.classList.replace("div_cubiertaCuadro3-1", "div_cubiertaCuadro3-2");

                                camposCompletados++;
                                span_camposCompleNum.textContent = camposCompletados;

                                let btnsTipoRese = document.querySelectorAll(".btn_tRese");

                                btnsTipoRese.forEach(btn => {
                                
                                    let btnTipo = btn.getAttribute("tipo");

                                    if(btnTipo == "hora"){
                                        
                                        if(pagoXHora != "N/A"){
                                            btn.classList.replace("btn_TipoRese-bloq", "btn_TipoRese");
                                        }else{
                                            btn.setAttribute("title", "No Disponible");
                                        }
                                        
                                        if(pagoXHora == "A Consultar"){
                                            btn.setAttribute("disponibilidad", "1");
                                        }

                                    }else if(btnTipo == "dia"){

                                        if(pagoXDia != "N/A"){
                                            btn.classList.replace("btn_TipoRese-bloq", "btn_TipoRese");
                                        }else{
                                            btn.setAttribute("title", "No Disponible");
                                        }

                                        if(pagoXDia == "A Consultar"){
                                            btn.setAttribute("disponibilidad", "1");
                                        }

                                    }else if(btnTipo == "semana"){

                                        if(pagoXSema != "N/A"){
                                            btn.classList.replace("btn_TipoRese-bloq", "btn_TipoRese");
                                        }else{
                                            btn.setAttribute("title", "No Disponible");
                                        }

                                        if(pagoXSema == "A Consultar"){
                                            btn.setAttribute("disponibilidad", "1");
                                        }

                                    }else if(btnTipo == "mes"){

                                        btn.classList.replace("btn_TipoRese-bloq", "btn_TipoRese");
                                        btn.setAttribute("disponibilidad", "1");

                                    }

                                    btn.addEventListener("click", (e)=>{
                                        tipoReservaBoton(btnTipo);
                                    });

                                });

                                //------------------------------------------------------------------------------------------------------------------------------

                                let persona = data.data[0]["productoMaxPerso"] > 1 ? "personas (Incluyéndote)" : "persona"

                                in_numPersoRese.setAttribute("max", data.data[0]["productoMaxPerso"]);
                                b_numeroPersoMax.textContent = data.data[0]["productoMaxPerso"]+" "+persona;

                                //------------------------------------------------------------------------------------------------------------------------------

                                let htmlDatosPdtSele = `
                                <span
                                class="span_descripPdt span_descripPdt-1"
                                >Descripción</span>
                                <p
                                id="p_descripPdt"
                                class="p_descripPdt p_descripPdt-1">${data.data[0]["produDescri"]}</p>
                                <div class="separador3"></div>
                                <div
                                id="div_baseTipoReseOtros"
                                class="div_baseTipoReseOtros div_baseTipoReseOtros-1"
                                >
                                    <div
                                    id="div_baseTipoReseOpciones"
                                    class="div_baseTipoReseOpciones div_baseTipoReseOpciones-1"
                                    >
                                        <span 
                                        class="span_tipoReseDatos span_tipoReseDatos-1"
                                        >Modalidades Disponibles</span>
                                        <div
                                        id="div_listaModalidades"
                                        class="div_listaModalidades div_listaModalidades-1"
                                        >
                                            <div
                                            id="div_modalidadH"
                                            class="div_modalidadH div_modalidadH-1"
                                            tipo="modaTipoHora"
                                            >
                                                <span>HORA</span>
                                                <span>${pagoXHora}</span>
                                            </div>
                                            <div
                                            id="div_modalidadD"
                                            class="div_modalidadD div_modalidadD-1"
                                            tipo="modaTipoDia"
                                            >
                                                <span>DÍA</span>
                                                <span>${pagoXDia}</span>
                                            </div>
                                            <div
                                            id="div_modalidadS"
                                            class="div_modalidadS div_modalidadS-1"
                                            tipo="modaTipoSema"
                                            >
                                                <span>SEMANA</span>
                                                <span>${pagoXSema}</span>
                                            </div>
                                            <div
                                            id="div_modalidadM"
                                            class="div_modalidadM div_modalidadM-1"
                                            tipo="modaTipoMes"
                                            >
                                                <span>MES</span>
                                                <span>A Consultar</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `
                                
                                const datosPdtSele = rangeDatosPdtSelected.createContextualFragment(htmlDatosPdtSele); 
                                div_baseDatosPdtSelec.appendChild(datosPdtSele); 

                                div_baseDatosPdtSelec.classList.replace("div_baseDatosPdtSelec-1", "div_baseDatosPdtSelec-2");

                                // DATO 1: Guardando ID del producto seleccionado 
                                idPdtSeleccionado = data.data[0]["id_producto"];

                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });

                        });

                    }

                });

            }else{

                let html = `<span class="span_pdtNOEncontrados">No se encontraron los productos</span>`; 
                
                const fragmentListaPdt = rangeListaPdt.createContextualFragment(html); // Convertimos el string en nodos reales
                div_lisPdtsReserva.appendChild(fragmentListaPdt); // Insertamos de una sola vez en el DOM

            }

            div_lisPdtsReserva.classList.replace("div_lisPdtsReserva-1", "div_lisPdtsReserva-2");
            
        }

        // Buscar Productos para la lista desplegable
        function buscarProductos(nombrePdt) {

            if (nombrePdt === "") return;

            let formPdtLista = new FormData();
            formPdtLista.append("listaProductosNewRese", "true");
            formPdtLista.append("nombrePdtNewRese", nombrePdt);

            fetch(url_consultasDB, {
                method: 'POST',
                body: formPdtLista
            })
            .then(response => {
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                return response.json();
            })
            .then(data => {
                
                renderizarListaProductos(data.data);

            })
            .catch(error => console.error('Error:', error)); 

        }  

        // Input - Elegir Producto
        in_pdtNombre.addEventListener("input", (e) => {
            
            if(
            in_pdtNombre.value !== "" &&
            in_pdtNombre.value !== null
            ){

                clearTimeout(timerListaPdt);
                timerListaPdt = setTimeout(() => {
                    buscarProductos(in_pdtNombre.value.trim());
                }, 300);

            }else{

                div_lisPdtsReserva.innerHTML = ""; 
                div_lisPdtsReserva.classList.replace("div_lisPdtsReserva-2", "div_lisPdtsReserva-1");

            }

            desbloquearBotonContiRese();

        });

    // INPUT ELEGIR PRODUCTOS
    //---------------------------------------------------------------------------------------------------------------------------------

    //Elegir la unidad para la nueva reserva
    function elegirUnidad(id, nombre, imagen){

        in_mostrarLisUnidad.classList.replace("in_mostrarLisUnidad-2", "in_mostrarLisUnidad-1");
        div_listaUnidades.classList.replace("div_listaUnidades-2", "div_listaUnidades-1");

        let htmlUnidadElegida = `
        <div
        id="div_unidadReseSele-${id}"
        class="div_unidadReseSele div_unidadReseSele-1"
        >
            <div
            class="div_imgUnidad div_imgUnidad-1"
            >
                <img src="images/productosImages/${imagen}" alt="">
            </div>
            <div
            class="div_datosUnidad div_datosUnidad-1"
            >
                <span
                id="span_nomUnidad"
                class="span_nomUnidad span_nomUnidad-1"
                >${nombre}</span>
            </div>
            <svg class="svg_xQuitarUnidSelect svg_xQuitarUnidSelect-${id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.71 174.71"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M111.41,95.37a11.33,11.33,0,0,1,0-16l60-60a11.34,11.34,0,0,0,0-16h0a11.34,11.34,0,0,0-16,0l-60,60a11.33,11.33,0,0,1-16,0l-60-60a11.34,11.34,0,0,0-16,0h0a11.34,11.34,0,0,0,0,16l60,60a11.33,11.33,0,0,1,0,16l-60,60a11.34,11.34,0,1,0,16,16l60-60a11.33,11.33,0,0,1,16,0l60,60a11.34,11.34,0,1,0,16-16Z"/></g></g></svg>
        </div>
        `;

        div_unidadSelectedBase.innerHTML = htmlUnidadElegida;

        div_unidadSelectedBase.classList.replace("div_unidadSelectedBase-1", "div_unidadSelectedBase-2");

        unidadSeleccionada = id;
        
        if(unidadLlena==0){
            unidadLlena++;
            camposCompletados++;
            span_camposCompleNum.textContent = camposCompletados;
        }

        document.querySelector(".svg_xQuitarUnidSelect-"+id).addEventListener("click", (e)=>{

            unidadSeleccionada = 0;
            document.querySelector("#div_unidadReseSele-"+id).remove();
            div_unidadSelectedBase.innerHTML = "";
            div_unidadSelectedBase.classList.replace("div_unidadSelectedBase-2", "div_unidadSelectedBase-1");

            if(unidadLlena==1){
                unidadLlena--;
                camposCompletados--;
                span_camposCompleNum.textContent = camposCompletados;
            }

            in_mostrarLisUnidad.classList.replace("in_mostrarLisUnidad-1", "in_mostrarLisUnidad-2");

        });

        desbloquearBotonContiRese();

    }

    function obtenerPreciosFinales(){
        
        let precioStd = 0;
        let precioConIVA = 0
        let precioConDescuento = 0
        let precioFinal = 0
        
        if(tipoReservaSelected == "hora"){

            precioStd = precioPorHoraGene;

            if(precioStd == 1){   

                precioEstandarPdt = 1;
                precioReservaFinal = 1;
                ivaReserva = 0;
                descuentoReserva = 0;
                comisionReserva = 0;
                ivaReservaPrecio = 0;
                descuentoReservaPrecio = 0;

            }else{

                if (precioStd < 0 || ivaReserva < 0 || descuentoReserva < 0 || comisionReserva < 0) {
                    throw new Error("Los valores no pueden ser negativos.");
                }
            
                precioConIVA = precioStd * (1 + ivaReserva / 100);
            
                precioConDescuento = precioConIVA * (1 - descuentoReserva / 100);
            
                precioFinal = precioConDescuento * (1 + comisionReserva / 100);
            
                precioFinal.toFixed(0);

                precioEstandarPdt = precioPorHoraGene;
                precioReservaFinal = precioFinal*Number(document.querySelector("#in_cantidadRese").value);
                ivaReservaPrecio = precioConIVA;
                descuentoReservaPrecio = precioConDescuento;

            }

        }else if(tipoReservaSelected == "dia"){

            precioStd = precioPorDiaGene;

            if(precioStd == 1){   

                precioEstandarPdt = 1;
                precioReservaFinal = 1;
                ivaReserva = 0;
                descuentoReserva = 0;
                comisionReserva = 0;
                ivaReservaPrecio = 0;
                descuentoReservaPrecio = 0;

            }else{

                if (precioStd < 0 || ivaReserva < 0 || descuentoReserva < 0 || comisionReserva < 0) {
                    throw new Error("Los valores no pueden ser negativos.");
                }
            
                precioConIVA = precioStd * (1 + ivaReserva / 100);
            
                precioConDescuento = precioConIVA * (1 - descuentoReserva / 100);
            
                precioFinal = precioConDescuento * (1 + comisionReserva / 100);
            
                precioFinal.toFixed(0);

                precioEstandarPdt = precioPorDiaGene;
                precioReservaFinal = precioFinal*Number(document.querySelector("#in_cantidadRese").value);
                ivaReservaPrecio = precioConIVA;
                descuentoReservaPrecio = precioConDescuento;

            }

        }else if(tipoReservaSelected == "semana"){

            precioStd = precioPorSemaGene;

            if(precioStd == 1){   

                precioEstandarPdt = 1;
                precioReservaFinal = 1;
                ivaReserva = 0;
                descuentoReserva = 0;
                comisionReserva = 0;
                ivaReservaPrecio = 0;
                descuentoReservaPrecio = 0;

            }else{

                if (precioStd < 0 || ivaReserva < 0 || descuentoReserva < 0 || comisionReserva < 0) {
                    throw new Error("Los valores no pueden ser negativos.");
                }
            
                precioConIVA = precioStd * (1 + ivaReserva / 100);
            
                precioConDescuento = precioConIVA * (1 - descuentoReserva / 100);
            
                precioFinal = precioConDescuento * (1 + comisionReserva / 100);
            
                precioFinal.toFixed(0);

                precioEstandarPdt = precioPorSemaGene;
                precioReservaFinal = precioFinal*Number(document.querySelector("#in_cantidadRese").value);
                ivaReservaPrecio = precioConIVA;
                descuentoReservaPrecio = precioConDescuento;

            }
            
        }else if(tipoReservaSelected == "mes"){

            precioStd = precioPorMesGene;

            if(precioStd == 1){   

                precioEstandarPdt = 1;
                precioReservaFinal = 1;
                ivaReserva = 0;
                descuentoReserva = 0;
                comisionReserva = 0;
                ivaReservaPrecio = 0;
                descuentoReservaPrecio = 0;
                
            }else{

                if (precioStd < 0 || ivaReserva < 0 || descuentoReserva < 0 || comisionReserva < 0) {
                    throw new Error("Los valores no pueden ser negativos.");
                }
            
                precioConIVA = precioStd * (1 + ivaReserva / 100);
            
                precioConDescuento = precioConIVA * (1 - descuentoReserva / 100);
            
                precioFinal = precioConDescuento * (1 + comisionReserva / 100);
            
                precioFinal.toFixed(0);

                precioEstandarPdt = precioPorMesGene;
                precioReservaFinal = precioFinal*Number(document.querySelector("#in_cantidadRese").value);
                ivaReservaPrecio = precioConIVA;
                descuentoReservaPrecio = precioConDescuento;

            }
            
        }

    }

    // Traer unidades disponibles para el horario elegido y llenar la lista desplegable
    function traerUnidadesDisponibles(idUnidadesDispo, fechaIni, fechaFin, horaIni, horaFin, fechaNumIni, fechaNumSalida, tipoRese){

        let htmlMensajeUnidad = "";

        if(idUnidadesDispo == ""){
            
            if(tipoRese == "hora" || tipoRese == "dia"){

                htmlMensajeUnidad = `
                <span
                class="span_estadoHorario span_estadoHorarioA-1"
                >Horario y fecha NO disponible:
                </span>
                <span
                class="span_estadoHorario span_estadoHorarioB-1"
                >Escoge un horario o fecha diferente
                </span>
                `;

            }else if(tipoRese == "semana" || tipoRese == "mes"){

                let tipoRese2 = "semana" ? "semanas" : "meses";

                htmlMensajeUnidad = `
                <span
                class="span_estadoHorario span_estadoHorarioA-1"
                >${tipoRese2} NO disponibles en su totalidad:
                </span>
                <span
                class="span_estadoHorario span_estadoHorarioB-1"
                >Escoge un horario o fechas diferentes
                </span>
                `;

            }

            if(unidadLlena==1){
                unidadLlena--;
                camposCompletados--;
                span_camposCompleNum.textContent = camposCompletados;
            }

            div_estadoHorarioBase.innerHTML = htmlMensajeUnidad;
            div_estadoHorarioBase.classList.replace("div_estadoHorarioBase-1", "div_estadoHorarioBase-2");

            document.querySelector(".span_estadoHorarioA-1").style.color="#ef2626";
            document.querySelector(".span_estadoHorarioB-1").style.color="#ef2626";

        }else{
            
            fechaInicioFinal = fechaIni;
            fechaInicioNumFinal = Number(fechaNumIni);
            fechaSalidaFinal = fechaFin;
            fechaSalidaNumFinal = Number(fechaNumSalida);

            horaInicioFinal = horaIni;
            horaSalidaFinal = horaFin;
            
            duracionReservaFinal = Number(document.querySelector("#in_cantidadRese").value);

            obtenerPreciosFinales();

            htmlMensajeUnidad = `
            <span
            class="span_estadoHorario span_estadoHorarioA-1"
            >Horario y fechas Escogidas Disponibles:
            </span>
            <span
            class="span_estadoHorario span_estadoHorarioB-1"
            >| ${fechaIni} -> ${fechaFin} | de ${horaIni} a ${horaFin}
            </span>
            `;

            div_estadoHorarioBase.innerHTML = htmlMensajeUnidad;
            div_estadoHorarioBase.classList.replace("div_estadoHorarioBase-1", "div_estadoHorarioBase-2");

            document.querySelector(".span_estadoHorarioA-1").style.color="#28a026";
            document.querySelector(".span_estadoHorarioB-1").style.color="#28a026";


            // Formulario para buscar las unidades disponibles
            let formUnidadesDisponibles = new FormData();

            formUnidadesDisponibles.append("listaUnidadesDispo", "true");
            formUnidadesDisponibles.append("unidadesIds", idUnidadesDispo);

            fetch(url_consultasDB, {
                method: 'POST',
                body: formUnidadesDisponibles
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {

                let fragUnidadesLis = document.createDocumentFragment();

                data.data.forEach(unidad => {
                    
                    let htmlUnidad = `
                    <div
                    numero="${unidad.id_unidad}"
                    imagen="${unidad.unidad_imagen}"
                    nombre="${unidad.unidad_nombre}"
                    id="div_baseUniDiv-${unidad.id_unidad}"
                    class="div_unidadLi div_unidadLi-1"
                    >
                        <div
                        class="div_baseUniDiv div_baseUniDiv-1"
                        >
                            <div
                            class="div_imgUnidadLi div_imgUnidadLi-1"
                            >
                                <img src="images/productosImages/${unidad.unidad_imagen}" alt="">
                            </div>
                            <div
                            class="div_datosUnidadLi div_datosUnidadLi-1"
                            >
                                <span 
                                class="span_unidadLiNom span_unidadLiNom-1"
                                >${unidad.unidad_nombre}</span>
                            </div>
                        </div>
                    </div>
                    `;

                    let nodoUnidadesLis = rangeListaUnidades.createContextualFragment(htmlUnidad);

                    fragUnidadesLis.appendChild(nodoUnidadesLis);

                });

                div_listaUnidades.appendChild(fragUnidadesLis);

                document.querySelectorAll('.div_unidadLi').forEach(item => {

                    item.addEventListener('click', (e)=> {
                        
                        let idUnidadSele = item.getAttribute('numero');
                        let nombre = item.getAttribute('nombre');
                        let imagen = item.getAttribute('imagen');
                        elegirUnidad(idUnidadSele, nombre, imagen);

                    });

                });

                div_basePrinUnidad.classList.replace("div_basePrinUnidad-1", "div_basePrinUnidad-2");

                in_mostrarLisUnidad.addEventListener("click", (e)=>{
                    div_listaUnidades.classList.replace("div_listaUnidades-1", "div_listaUnidades-2");
                });
                in_mostrarLisUnidad.removeAttribute("disabled");

            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
        }

    }; 

    // Filtrar reservas actuales con los horarios elegidos, Nueva Reserva
    function traerReservasYFiltrar(fechaINum, fechaFNum, fechaITex, fechaFTex, horaITex, horaFTex){

        let formFiltrosReseNR = new FormData();
        
        formFiltrosReseNR.append("filtrarReservasNewRese", "true");
        formFiltrosReseNR.append("fechaIniNewR", fechaINum);
        formFiltrosReseNR.append("fechaFinNewR", fechaFNum);
           
        fetch(url_consultasDB, {
            method: 'POST',
            body: formFiltrosReseNR
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            
            let unidadesDisponiblesArray = unidadesDispoProducGene.split(',');
            let unidadesDisponiblesFinal;
           
            let reservasResult = [
                data.data[0]
            ];

            if(reservasResult[0] != undefined){

                // Convertimos las horas de la nueva reserva a epoch
                let nuevaHoraInicioEpoch = horaAEpoch(fechaITex);
                let nuevaHoraFinEpoch = horaAEpoch(fechaFTex);

                // Recorrer las reservas existentes
                reservasResult.forEach(reserva => {

                    let tipoReserva = reserva.rese_tipo;
                    let idUnidadReserva = reserva.id_unidad.toString();

                    // 1. Filtrar reservas por día, semana y mes
                    if (['dia', 'semana', 'mes'].includes(tipoReserva)) {

                        let index = unidadesDisponiblesArray.indexOf(idUnidadReserva);
                        if (index !== -1) {
                            unidadesDisponiblesArray.splice(index, 1); 
                        }

                    }

                    // 2. Filtrar reservas por hora (sin necesidad de verificar la fecha)
                    if (tipoReserva === 'hora') {

                        let horaInicioExistenteEpoch = horaAEpoch(reserva.rese_horaIni);
                        let horaFinExistenteEpoch = horaAEpoch(reserva.rese_horaFin);

                        // Verificar si las horas se solapan
                        if (nuevaHoraInicioEpoch < horaFinExistenteEpoch && nuevaHoraFinEpoch > horaInicioExistenteEpoch) {
                            let index = unidadesDisponiblesArray.indexOf(idUnidadReserva);
                            if (index !== -1) {
                                unidadesDisponiblesArray.splice(index, 1);  // Eliminar la unidad con conflicto de horario
                            }
                        }
                        
                    }
                });

                // Convertir el array final de unidades disponibles a string
                unidadesDisponiblesFinal = unidadesDisponiblesArray.join(',');

            }else{

                unidadesDisponiblesFinal = unidadesDispoProducGene;

            }

            traerUnidadesDisponibles(unidadesDisponiblesFinal, fechaITex, fechaFTex, horaITex, horaFTex, fechaINum, fechaFNum, tipoReservaSelected);         
        
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    // Filtrar Errores en los datos de la nueva reserva
    function tirarErrorDatosNR(errorNR){

        if(errorNR == 0){

            span_errorDatosNR.textContent = ""; 

            div_erroreBaseDatosNR.classList.replace("div_erroreBaseDatosNR-2", "div_erroreBaseDatosNR-1");

        }else{

            span_errorDatosNR.textContent = errorreDatosNR[Number(errorNR)]; 

            div_erroreBaseDatosNR.classList.replace("div_erroreBaseDatosNR-1", "div_erroreBaseDatosNR-2");

        }

    }

    // Sacar datos de el horario escogido, Nueva Reserva
    function sacarDatosHorarioNR(tipoRese){

        let fechaInicioTex = "";
        let fechaFinalTex = "";
        let fechaInicioNum = 0;
        let fechaFinNum = 0;
        let fechaInicioDiaS = 0;
        let fechaFinDiaS = 0;
        let horaInicioMinu = 0;
        let horaInicioTex = "";
        let horaFinalMinu = 0;
        let horaFinalTex = "";
        let cantidadTiempo = "";
        let fechaActualNum = fechaANumero(cadenaFechaActual);
        let errorDatosNR = 0;

        if(tipoRese == "hora"){

            if(
            document.querySelector("#in_fechaIniRese").value != "" &&
            document.querySelector("#in_horaIniRese").value != "" &&
            document.querySelector("#in_cantidadRese").value != ""
            ){

                fechaInicioTex = document.querySelector("#in_fechaIniRese").value;
                fechaFinalTex = document.querySelector("#in_fechaIniRese").value;
                fechaInicioNum = fechaANumero(fechaInicioTex);
                fechaFinNum = fechaANumero(fechaFinalTex);
                fechaInicioDiaS = obtenerDiaSemana(fechaInicioTex);
                fechaFinDiaS = obtenerDiaSemana(fechaFinalTex);
                horaInicioMinu = horaAMinutos(document.querySelector("#in_horaIniRese").value)[0];
                horaInicioTex = minutosAFormato12h(horaInicioMinu);
                cantidadTiempo = document.querySelector("#in_cantidadRese").value;
                horaFinalMinu = horaInicioMinu+(cantidadTiempo*60);
                horaFinalTex = minutosAFormato12h(horaFinalMinu);

               if(
               fechaInicioNum > fechaActualNum &&
               (horaInicioMinu >= 420 && horaInicioMinu <= 1080) &&
               (horaFinalMinu > horaInicioMinu && horaFinalMinu <= 1140) &&
               fechaInicioDiaS != 0 &&
               fechaFinDiaS != 0
               ){
                
                tirarErrorDatosNR(errorDatosNR);
                traerReservasYFiltrar(fechaInicioNum, fechaFinNum, fechaInicioTex, fechaFinalTex, horaInicioTex, horaFinalTex);

               }else{

                if(fechaInicioNum < fechaActualNum ){
                    errorDatosNR = 1;
                }else if(horaInicioMinu < 420 ){
                    errorDatosNR = 2;
                }else if(horaInicioMinu > 1080 ){
                    errorDatosNR = 3;
                }else if(horaFinalMinu < horaInicioMinu){
                    errorDatosNR = 4;
                }else if(horaFinalMinu > 1140){
                    errorDatosNR = 5;
                }else if(fechaInicioDiaS == 0){
                    errorDatosNR = 6;
                }else if(fechaFinDiaS == 0){
                    errorDatosNR = 7;
                }

                tirarErrorDatosNR(errorDatosNR);

               }

            }

        }else if(tipoRese == "dia"){

            if(
            document.querySelector("#in_fechaIniRese").value != "" &&
            document.querySelector("#in_cantidadRese").value != ""
            ){

                fechaInicioTex = document.querySelector("#in_fechaIniRese").value;
                fechaFinalTex = sumarRestarDias(document.querySelector("#in_fechaIniRese").value, (Number(document.querySelector("#in_cantidadRese").value)-1), "sumar");
                fechaInicioNum = fechaANumero(fechaInicioTex);
                fechaFinNum = fechaANumero(fechaFinalTex);
                fechaInicioDiaS = obtenerDiaSemana(fechaInicioTex);
                fechaFinDiaS = obtenerDiaSemana(fechaFinalTex);
                horaInicioMinu = horaAMinutos("7:00 AM")[0];
                horaInicioTex = minutosAFormato12h(horaInicioMinu);
                cantidadTiempo = document.querySelector("#in_cantidadRese").value;
                horaFinalMinu = 1140;
                horaFinalTex = "7:00 PM";

               if(
               fechaInicioNum > fechaActualNum &&
               (horaInicioMinu >= 420 && horaInicioMinu <= 1080) &&
               (horaFinalMinu > horaInicioMinu && horaFinalMinu <= 1140) &&
               fechaInicioDiaS != 0 &&
               fechaFinDiaS != 0
               ){
                
                tirarErrorDatosNR(errorDatosNR);
                traerReservasYFiltrar(fechaInicioNum, fechaFinNum, fechaInicioTex, fechaFinalTex, horaInicioTex, horaFinalTex);

               }else{

                if(fechaInicioNum < fechaActualNum ){
                    errorDatosNR = 1;
                }else if(horaInicioMinu < 420 ){
                    errorDatosNR = 2;
                }else if(horaInicioMinu > 1080 ){
                    errorDatosNR = 3;
                }else if(horaFinalMinu < horaInicioMinu){
                    errorDatosNR = 4;
                }else if(horaFinalMinu > 1140){
                    errorDatosNR = 5;
                }else if(fechaInicioDiaS == 0){
                    errorDatosNR = 6;
                }else if(fechaFinDiaS == 0){
                    errorDatosNR = 7;
                }

                tirarErrorDatosNR(errorDatosNR);

               }

            }

        }

    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    // BOTÓN TIPO RESERVA - MODO SEMANA

        function actualizarEstadoBotones() {

            document.getElementById('btn_semanaAtras');
        
            if (inicioSemanaActual <= fechaMinimaPermitida) {
                document.getElementById('btn_semanaAtras').disabled = true;
                document.getElementById('btn_semanaAtras').classList.replace("btn_semanaAtras-1", "btn_semanaAtras-2");  
            } else {
                document.getElementById('btn_semanaAtras').disabled = false;  
                document.getElementById('btn_semanaAtras').classList.replace("btn_semanaAtras-2", "btn_semanaAtras-1"); 
            }

        }

        function formatearFechaSemana(date) {

            return date.toISOString().split('T')[0];

        }
        
        function cambiarSemana(direction) {
            
            const diasEntreSemanas = tamañoSemana === 5 ? 2 : 1;  

            if (direction === -1) {
                let fechaPrueba = new Date(inicioSemanaActual);
                fechaPrueba.setDate(fechaPrueba.getDate() - (tamañoSemana + diasEntreSemanas));

                if (fechaPrueba < fechaMinimaPermitida) {
                    return;  
                }
            }

            inicioSemanaActual.setDate(inicioSemanaActual.getDate() + direction * (tamañoSemana + diasEntreSemanas));
            
            actualizarSemanasMuestra();
            actualizarEstadoBotones(); 

        }

        function actualizarSemanasMuestra() {

            let numWeeks = parseInt(document.getElementById('in_cantidadRese').value, 10) || 1;

            const startOfReservation = new Date(inicioSemanaActual);
            const endOfReservation = new Date(startOfReservation);
        
            const diasEntreSemanas = tamañoSemana === 5 ? 2 : 1; 
            endOfReservation.setDate(startOfReservation.getDate() + (tamañoSemana - 1) + (numWeeks - 1) * (tamañoSemana + diasEntreSemanas));
        
            const displayText = `Reserva desde: <b id="b_primerDiaRSemana">${formatearFechaSemana(startOfReservation)}</b> hasta <b id="b_ultimoDiaRSemana">${formatearFechaSemana(endOfReservation)}</b>`;
        
            document.getElementById('span_semanaFechas').innerHTML = displayText;
        
            let fechaInicioNum = fechaANumero(formatearFechaSemana(startOfReservation));
            let fechaFinalNum = fechaANumero(formatearFechaSemana(endOfReservation));
        
            traerReservasYFiltrar(fechaInicioNum, fechaFinalNum, formatearFechaSemana(startOfReservation), formatearFechaSemana(endOfReservation), "7:00 AM", "7:00 PM");
        
        }

        function obtenerSiguienteLunes(date) {

            let result = new Date(date);
            result.setDate(result.getDate() + ((8 - result.getDay()) % 7 || 7));
            return result;

        }

        function inicioDeSemana(resetear = true) {
            
            let today = new Date();

            if (resetear) {
                inicioSemanaActual = obtenerSiguienteLunes(today);  
                fechaMinimaPermitida = new Date(inicioSemanaActual);  
            }

            actualizarSemanasMuestra();
            actualizarEstadoBotones();

        }

        function establecerTipoSemana(days) {
            
            tamañoSemana = days; 

            document.getElementById('btn_semanaLaV').classList.replace('btn_tipoSema-select', 'btn_tipoSema');
            document.getElementById('btn_semanaLaS').classList.replace('btn_tipoSema-select', 'btn_tipoSema');

            if (days === 5) {
                document.getElementById('btn_semanaLaV').classList.replace('btn_tipoSema', 'btn_tipoSema-select');
            } else if (days === 6) {
                document.getElementById('btn_semanaLaS').classList.replace('btn_tipoSema', 'btn_tipoSema-select');
            }

            inicioDeSemana(true);

        }

        // Boton tipo de reserva MODO SEMANA - Función principal
        function reservaModoSemanaFechas(){
        
            document.getElementById('btn_semanaLaV').classList.replace('btn_tipoSema', 'btn_tipoSema-select');
            establecerTipoSemana(5);

        }

    // BOTÓN TIPO RESERVA - MODO SEMANA
    //-----------------------------------------------------------------------------------------------------------------------------------
        
    // Botones tipo de reserva - Función Principal
    function tipoReservaBoton(tipoRese){

        div_estadoHorarioBase.innerHTML = "";
        div_estadoHorarioBase.classList.replace("div_estadoHorarioBase-2", "div_estadoHorarioBase-1");

        div_listaUnidades.innerHTML = "";
        div_listaUnidades.classList.replace("div_listaUnidades-2", "div_listaUnidades-1");

        div_unidadSelectedBase.innerHTML = "";
        div_unidadSelectedBase.classList.replace("div_unidadSelectedBase-2", "div_unidadSelectedBase-1");

        div_basePrinUnidad.classList.replace("div_basePrinUnidad-2", "div_basePrinUnidad-1");

        if(unidadLlena==1){
            unidadLlena--;
            camposCompletados--;
            span_camposCompleNum.textContent = camposCompletados;
        }

        in_mostrarLisUnidad.classList.replace("in_mostrarLisUnidad-1", "in_mostrarLisUnidad-2");
        in_mostrarLisUnidad.setAttribute("disabled", "");

        document.querySelector('[tipo="hora"]').classList.replace("btn_TipoRese-select", "btn_TipoRese");
        document.querySelector('[tipo="dia"]').classList.replace("btn_TipoRese-select", "btn_TipoRese");
        document.querySelector('[tipo="semana"]').classList.replace("btn_TipoRese-select", "btn_TipoRese");
        document.querySelector('[tipo="mes"]').classList.replace("btn_TipoRese-select", "btn_TipoRese");
        document.querySelector('[tipo="hora"]').removeAttribute("disabled");
        document.querySelector('[tipo="dia"]').removeAttribute("disabled");
        document.querySelector('[tipo="semana"]').removeAttribute("disabled");
        document.querySelector('[tipo="mes"]').removeAttribute("disabled");
        
        tipoReservaSelected = tipoRese;

        document.querySelector('[tipo="'+tipoRese+'"]').classList.replace("btn_TipoRese", "btn_TipoRese-select");
        document.querySelector('[tipo="'+tipoRese+'"]').setAttribute("disabled", "");

        let htmlDuracion = "";

        if(seleccionTR == 0){
            camposCompletados++;
            span_camposCompleNum.textContent = camposCompletados;
            seleccionTR++;
        }
        
        if(tipoRese == "hora"){
            
            precioEstandarPdt = precioPorHoraGene;

            if(precioPorHoraGene != 1 && precioPorHoraGene != 0){

                if(seleccionTR_AC == 1){
                    seleccionTR_AC--;
                    camposCompletados--;
                }

                htmlDuracion = `
                <div
                class="div_inFechaIniBase div_inFechaIniBase-1"
                >
                    <span
                    class="span_fechaIniRese span_fechaIniRese-1"
                    >
                    Fecha de Inicio
                    </span>
                    <input 
                    id="in_fechaIniRese"
                    class="in_fechaIniRese in_fechaIniRese-1"
                    type="date"
                    >
                </div>
                <div
                class="div_inHoraIniBase div_inHoraIniBase-1"
                >
                    <span
                    class="span_horaIniRese span_horaIniRese-1"
                    >
                    Hora de Inicio
                    </span>
                    <input 
                    id="in_horaIniRese"
                    class="in_horaIniRese in_horaIniRese-1"
                    type="time"
                    >
                </div>
                <div
                class="div_inCantidadBase-1 div_inCantidadBase-1"
                >
                    <span
                    class="span_duraciRese span_duraciRese-1"
                    >
                    Cantidad
                    </span>
                    <div
                    class="div_inCantiSegundaBase div_inCantiSegundaBase-1"
                    >
                        <input 
                        id="in_cantidadRese"
                        class="in_cantidadRese in_cantidadRese-1"
                        type="number"
                        min="1"
                        max="12"
                        value="1"
                        >
                        <span
                        class="span_duracionCant span_duracionCant-1"
                        >
                        (Horas)
                        </span>
                    </div>
                </div>
                `;

            }else if(precioPorHoraGene == 1){

                if(seleccionTR_AC == 0){
                    seleccionTR_AC++;
                    camposCompletados++;
                }

                htmlDuracion = `
                <div
                id="div_reseTipoAC"
                class="div_reseTipoAC div_reseTipoAC-1"
                >
                    <div 
                    id="div_baseAC"
                    class="div_baseAC div_baseAC-1"
                    >
                        <div
                        class="div_baseSvg div_baseSvg-1"
                        >
                            <svg class="svg_whatsappAC" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 348.49 355.43"><defs><linearGradient id="Degradado_sin_nombre_16" x1="174.35" y1="320.72" x2="174.35" y2="27.45" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3dab3d"/><stop offset="1" stop-color="#67b761"/></linearGradient></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M344.61,137.63c-7.94-36.51-25.54-67.63-53.37-92.49C251.21,9.38,204.19-5,150.91,1.5A165.53,165.53,0,0,0,98.93,17,174.26,174.26,0,0,0,2.7,204.6a171.93,171.93,0,0,0,23.46,61.23,3.73,3.73,0,0,1,.5,3.31Q17,303.27,7.38,337.43c-1.68,5.94-3.37,11.88-5.1,18a5.27,5.27,0,0,0,.62-.09Q48.46,342.68,94,330a3.52,3.52,0,0,1,2.77.13,174.62,174.62,0,0,0,142,5.85c60.06-24.11,101.88-79.1,108.71-142.79A173.06,173.06,0,0,0,344.61,137.63ZM221,313.1a146.64,146.64,0,0,1-118.67-11.3,3.71,3.71,0,0,0-3.3-.35Q70,310.78,41,320c-.62.2-1.42.86-1.92.34s.13-1.32.33-2Q47.66,290.65,56,263a2.92,2.92,0,0,0-.5-2.92c-13.63-18.85-22.7-39.7-25.93-62.75-7.44-53.1,8.83-97.89,48.61-133.79,19-17.12,41.44-27.83,66.47-33a146.7,146.7,0,0,1,164.6,86.38,143.88,143.88,0,0,1,11,44.71c.35,4.2.56,8.4.58,11.08C320.83,237.11,280.6,293,221,313.1Z" style="fill:#fff"/><path d="M320.3,161.58a143.88,143.88,0,0,0-11-44.71,146.7,146.7,0,0,0-164.6-86.38c-25,5.17-47.5,15.88-66.47,33-39.78,35.9-56,80.69-48.61,133.79,3.23,23.05,12.3,43.9,25.93,62.75A2.92,2.92,0,0,1,56,263q-8.37,27.69-16.63,55.42c-.2.64-.8,1.46-.33,2s1.3-.14,1.92-.34q29-9.23,58-18.54a3.71,3.71,0,0,1,3.3.35A146.64,146.64,0,0,0,221,313.1c59.65-20.06,99.88-76,99.93-140.44C320.86,170,320.65,165.78,320.3,161.58Zm-63.77,78.28a7.35,7.35,0,0,1-1.44,1.94A50,50,0,0,1,231,257.46c-4.26,1.26-8.7,1.48-14.11,1.46-7.76.18-15.94-2.19-24.11-5a165.61,165.61,0,0,1-50.59-27.19c-8.23-6.59-15.52-14.23-22.62-22a283.87,283.87,0,0,1-23.32-29.22c-5.55-7.94-8.94-16.8-11.31-26.11a54.23,54.23,0,0,1-1.77-18.76,48.77,48.77,0,0,1,9.33-23.81,55,55,0,0,1,9.82-10.28,9.58,9.58,0,0,1,5.84-2.33,80.41,80.41,0,0,1,14.22.29,3.35,3.35,0,0,1,2.43,1.93,76.64,76.64,0,0,1,5.32,10.16c4.31,9.46,8.23,19.08,11.66,28.91a7.36,7.36,0,0,1-.08,5.46,32.41,32.41,0,0,1-4.34,8.1c-2.89,3.77-5.8,7.52-8.79,11.21a2.25,2.25,0,0,0-.42,2.71,89.1,89.1,0,0,0,22,30.68c10.35,9.37,21.65,17.29,34.54,22.81a39.76,39.76,0,0,0,6.72,2.3,7.28,7.28,0,0,0,7.64-2.24A91.75,91.75,0,0,0,206.83,206c1.67-2.52,3.25-5.09,5.16-7.45s4.08-3.16,7.1-2.11a204.06,204.06,0,0,1,37.19,17.23,7.18,7.18,0,0,1,4,6.47A50,50,0,0,1,256.53,239.86Z" style="fill:url(#Degradado_sin_nombre_16)"/><path d="M216.9,258.92c-7.76.18-15.94-2.18-24.11-5-18.39-6.27-35.41-15.06-50.59-27.19-8.23-6.59-15.52-14.23-22.63-22a286.22,286.22,0,0,1-23.31-29.22c-5.55-7.94-8.94-16.8-11.31-26.11a54.23,54.23,0,0,1-1.77-18.76,48.67,48.67,0,0,1,9.33-23.81,54.9,54.9,0,0,1,9.81-10.28,9.63,9.63,0,0,1,5.84-2.33,80.5,80.5,0,0,1,14.23.29,3.35,3.35,0,0,1,2.43,1.93,76.64,76.64,0,0,1,5.32,10.16c4.31,9.46,8.23,19.08,11.67,28.91a7.46,7.46,0,0,1-.08,5.46,32.77,32.77,0,0,1-4.35,8.1c-2.89,3.77-5.8,7.52-8.79,11.21a2.26,2.26,0,0,0-.41,2.72,89,89,0,0,0,22,30.67c10.35,9.38,21.65,17.29,34.54,22.81a39.76,39.76,0,0,0,6.72,2.3,7.28,7.28,0,0,0,7.64-2.24A90,90,0,0,0,206.83,206c1.67-2.52,3.25-5.09,5.16-7.45s4.08-3.16,7.1-2.12a204.11,204.11,0,0,1,37.19,17.24,7.19,7.19,0,0,1,4,6.47,50,50,0,0,1-3.72,19.72,7.35,7.35,0,0,1-1.44,1.94A49.92,49.92,0,0,1,231,257.46C226.75,258.72,222.31,258.94,216.9,258.92Z" style="fill:#fff"/></g></g></svg>
                            <span>A Consultar</span>
                        </div>
                        <div
                        class="div_baseInfo div_baseInfo-1"
                        >
                            <span>
                                Para realizar una reserva por
                                <b 
                                id="b_tipoReseAC" 
                                class="b_tipoReseAC b_tipoReseAC-1">${tipoRese}</b> 
                                de esta unidad utilice los canales correspondientes. Realice el pre-registro, pero para confirmar el precio y otros datos deberá contactarse con un asesor justo después.
                            </span>
                        </div>
                    </div>
                </div>
                `
            }

        }else if(tipoRese == "dia"){

            precioEstandarPdt = precioPorDiaGene;

            if(precioPorDiaGene != 1 && precioPorDiaGene != 0){

                if(seleccionTR_AC == 1){
                    seleccionTR_AC--;
                    camposCompletados--;
                }

                htmlDuracion = `
                <div
                class="div_inFechaIniBase div_inFechaIniBase-1"
                >
                    <span
                    class="span_fechaIniRese span_fechaIniRese-1"
                    >
                    Fecha de Inicio
                    </span>
                    <input 
                    id="in_fechaIniRese"
                    class="in_fechaIniRese in_fechaIniRese-1"
                    type="date"
                    >
                </div>
                <div
                class="div_inCantidadBase-1 div_inCantidadBase-1"
                >
                    <span
                    class="span_duraciRese span_duraciRese-1"
                    >
                    Cantidad
                    </span>
                    <div
                    class="div_inCantiSegundaBase div_inCantiSegundaBase-1"
                    >
                        <input 
                        id="in_cantidadRese"
                        class="in_cantidadRese in_cantidadRese-1"
                        type="number"
                        min="1"
                        max="12"
                        value="1"
                        >
                        <span
                        class="span_duracionCant span_duracionCant-1"
                        >
                        (Días)
                        </span>
                    </div>
                </div>
                `;

            }else if(precioPorDiaGene == 1){

                if(seleccionTR_AC == 0){
                    seleccionTR_AC++;
                    camposCompletados++;
                }

                htmlDuracion = `
                <div
                id="div_reseTipoAC"
                class="div_reseTipoAC div_reseTipoAC-1"
                >
                    <div 
                    id="div_baseAC"
                    class="div_baseAC div_baseAC-1"
                    >
                        <div
                        class="div_baseSvg div_baseSvg-1"
                        >
                            <svg class="svg_whatsappAC" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 348.49 355.43"><defs><linearGradient id="Degradado_sin_nombre_16" x1="174.35" y1="320.72" x2="174.35" y2="27.45" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3dab3d"/><stop offset="1" stop-color="#67b761"/></linearGradient></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M344.61,137.63c-7.94-36.51-25.54-67.63-53.37-92.49C251.21,9.38,204.19-5,150.91,1.5A165.53,165.53,0,0,0,98.93,17,174.26,174.26,0,0,0,2.7,204.6a171.93,171.93,0,0,0,23.46,61.23,3.73,3.73,0,0,1,.5,3.31Q17,303.27,7.38,337.43c-1.68,5.94-3.37,11.88-5.1,18a5.27,5.27,0,0,0,.62-.09Q48.46,342.68,94,330a3.52,3.52,0,0,1,2.77.13,174.62,174.62,0,0,0,142,5.85c60.06-24.11,101.88-79.1,108.71-142.79A173.06,173.06,0,0,0,344.61,137.63ZM221,313.1a146.64,146.64,0,0,1-118.67-11.3,3.71,3.71,0,0,0-3.3-.35Q70,310.78,41,320c-.62.2-1.42.86-1.92.34s.13-1.32.33-2Q47.66,290.65,56,263a2.92,2.92,0,0,0-.5-2.92c-13.63-18.85-22.7-39.7-25.93-62.75-7.44-53.1,8.83-97.89,48.61-133.79,19-17.12,41.44-27.83,66.47-33a146.7,146.7,0,0,1,164.6,86.38,143.88,143.88,0,0,1,11,44.71c.35,4.2.56,8.4.58,11.08C320.83,237.11,280.6,293,221,313.1Z" style="fill:#fff"/><path d="M320.3,161.58a143.88,143.88,0,0,0-11-44.71,146.7,146.7,0,0,0-164.6-86.38c-25,5.17-47.5,15.88-66.47,33-39.78,35.9-56,80.69-48.61,133.79,3.23,23.05,12.3,43.9,25.93,62.75A2.92,2.92,0,0,1,56,263q-8.37,27.69-16.63,55.42c-.2.64-.8,1.46-.33,2s1.3-.14,1.92-.34q29-9.23,58-18.54a3.71,3.71,0,0,1,3.3.35A146.64,146.64,0,0,0,221,313.1c59.65-20.06,99.88-76,99.93-140.44C320.86,170,320.65,165.78,320.3,161.58Zm-63.77,78.28a7.35,7.35,0,0,1-1.44,1.94A50,50,0,0,1,231,257.46c-4.26,1.26-8.7,1.48-14.11,1.46-7.76.18-15.94-2.19-24.11-5a165.61,165.61,0,0,1-50.59-27.19c-8.23-6.59-15.52-14.23-22.62-22a283.87,283.87,0,0,1-23.32-29.22c-5.55-7.94-8.94-16.8-11.31-26.11a54.23,54.23,0,0,1-1.77-18.76,48.77,48.77,0,0,1,9.33-23.81,55,55,0,0,1,9.82-10.28,9.58,9.58,0,0,1,5.84-2.33,80.41,80.41,0,0,1,14.22.29,3.35,3.35,0,0,1,2.43,1.93,76.64,76.64,0,0,1,5.32,10.16c4.31,9.46,8.23,19.08,11.66,28.91a7.36,7.36,0,0,1-.08,5.46,32.41,32.41,0,0,1-4.34,8.1c-2.89,3.77-5.8,7.52-8.79,11.21a2.25,2.25,0,0,0-.42,2.71,89.1,89.1,0,0,0,22,30.68c10.35,9.37,21.65,17.29,34.54,22.81a39.76,39.76,0,0,0,6.72,2.3,7.28,7.28,0,0,0,7.64-2.24A91.75,91.75,0,0,0,206.83,206c1.67-2.52,3.25-5.09,5.16-7.45s4.08-3.16,7.1-2.11a204.06,204.06,0,0,1,37.19,17.23,7.18,7.18,0,0,1,4,6.47A50,50,0,0,1,256.53,239.86Z" style="fill:url(#Degradado_sin_nombre_16)"/><path d="M216.9,258.92c-7.76.18-15.94-2.18-24.11-5-18.39-6.27-35.41-15.06-50.59-27.19-8.23-6.59-15.52-14.23-22.63-22a286.22,286.22,0,0,1-23.31-29.22c-5.55-7.94-8.94-16.8-11.31-26.11a54.23,54.23,0,0,1-1.77-18.76,48.67,48.67,0,0,1,9.33-23.81,54.9,54.9,0,0,1,9.81-10.28,9.63,9.63,0,0,1,5.84-2.33,80.5,80.5,0,0,1,14.23.29,3.35,3.35,0,0,1,2.43,1.93,76.64,76.64,0,0,1,5.32,10.16c4.31,9.46,8.23,19.08,11.67,28.91a7.46,7.46,0,0,1-.08,5.46,32.77,32.77,0,0,1-4.35,8.1c-2.89,3.77-5.8,7.52-8.79,11.21a2.26,2.26,0,0,0-.41,2.72,89,89,0,0,0,22,30.67c10.35,9.38,21.65,17.29,34.54,22.81a39.76,39.76,0,0,0,6.72,2.3,7.28,7.28,0,0,0,7.64-2.24A90,90,0,0,0,206.83,206c1.67-2.52,3.25-5.09,5.16-7.45s4.08-3.16,7.1-2.12a204.11,204.11,0,0,1,37.19,17.24,7.19,7.19,0,0,1,4,6.47,50,50,0,0,1-3.72,19.72,7.35,7.35,0,0,1-1.44,1.94A49.92,49.92,0,0,1,231,257.46C226.75,258.72,222.31,258.94,216.9,258.92Z" style="fill:#fff"/></g></g></svg>
                            <span>A Consultar</span>
                        </div>
                        <div
                        class="div_baseInfo div_baseInfo-1"
                        >
                            <span>
                                Para realizar una reserva por
                                <b 
                                id="b_tipoReseAC" 
                                class="b_tipoReseAC b_tipoReseAC-1">${tipoRese}</b> 
                                de esta unidad utilice los canales correspondientes. Realice el pre-registro, pero para confirmar el precio y otros datos deberá contactarse con un asesor justo después.
                            </span>
                        </div>
                    </div>
                </div>
                `
            }

        }else if(tipoRese == "semana"){

            precioEstandarPdt = precioPorSemaGene;

            if(precioPorSemaGene != 1 && precioPorSemaGene != 0){

                if(seleccionTR_AC == 1){
                    seleccionTR_AC--;
                    camposCompletados--;
                }

                htmlDuracion = `
                <div
                id="div_duracionTipoSemana"
                class="div_duracionTipoSemana div_duracionTipoSemana-1"
                >
                    <div
                    class="div_btnsTipoSemana div_btnsTipoSemana-1"
                    >
                        <button
                        id="btn_semanaLaV"
                        class="btn_tipoSema-select btn_semanaLaV-1"
                        >Lunes a Viernes</button>
                        <button
                        id="btn_semanaLaS"
                        class="btn_tipoSema btn_semanaLaS-1"
                        >Lunes a Sábado</button>
                    </div>
                    <div
                    id="div_baseSemanaElegir"
                    class="div_baseSemanaElegir div_baseSemanaElegir-1"
                    >
                        <button
                        id="btn_semanaAtras"
                        class="btn_semanaAtras btn_semanaAtras-1"
                        ><</button>
                        <span
                        id="span_semanaFechas"
                        class="span_semanaFechas span_semanaFechas-1"
                        ></span>
                        <button
                        id="btn_semanaAdelante"
                        class="btn_semanaAdelante btn_semanaAdelante-1"
                        >></button>
                    </div>
                </div>
                <div
                class="div_inCantidadBase-1 div_inCantidadBase-1"
                >
                    <span
                    class="span_duraciRese span_duraciRese-1"
                    >
                    Cantidad
                    </span>
                    <div
                    class="div_inCantiSegundaBase div_inCantiSegundaBase-1"
                    >
                        <input 
                        id="in_cantidadRese"
                        class="in_cantidadRese in_cantidadRese-1"
                        type="number"
                        min="1"
                        max="12"
                        value="1"
                        >
                        <span
                        class="span_duracionCant span_duracionCant-1"
                        >
                        (Semanas)
                        </span>
                    </div>
                </div>
                `;

            }else if(precioPorSemaGene == 1){

                if(seleccionTR_AC == 0){
                    seleccionTR_AC++;
                    camposCompletados++;
                }

                htmlDuracion = `
                <div
                id="div_reseTipoAC"
                class="div_reseTipoAC div_reseTipoAC-1"
                >
                    <div 
                    id="div_baseAC"
                    class="div_baseAC div_baseAC-1"
                    >
                        <div
                        class="div_baseSvg div_baseSvg-1"
                        >
                            <svg class="svg_whatsappAC" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 348.49 355.43"><defs><linearGradient id="Degradado_sin_nombre_16" x1="174.35" y1="320.72" x2="174.35" y2="27.45" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3dab3d"/><stop offset="1" stop-color="#67b761"/></linearGradient></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M344.61,137.63c-7.94-36.51-25.54-67.63-53.37-92.49C251.21,9.38,204.19-5,150.91,1.5A165.53,165.53,0,0,0,98.93,17,174.26,174.26,0,0,0,2.7,204.6a171.93,171.93,0,0,0,23.46,61.23,3.73,3.73,0,0,1,.5,3.31Q17,303.27,7.38,337.43c-1.68,5.94-3.37,11.88-5.1,18a5.27,5.27,0,0,0,.62-.09Q48.46,342.68,94,330a3.52,3.52,0,0,1,2.77.13,174.62,174.62,0,0,0,142,5.85c60.06-24.11,101.88-79.1,108.71-142.79A173.06,173.06,0,0,0,344.61,137.63ZM221,313.1a146.64,146.64,0,0,1-118.67-11.3,3.71,3.71,0,0,0-3.3-.35Q70,310.78,41,320c-.62.2-1.42.86-1.92.34s.13-1.32.33-2Q47.66,290.65,56,263a2.92,2.92,0,0,0-.5-2.92c-13.63-18.85-22.7-39.7-25.93-62.75-7.44-53.1,8.83-97.89,48.61-133.79,19-17.12,41.44-27.83,66.47-33a146.7,146.7,0,0,1,164.6,86.38,143.88,143.88,0,0,1,11,44.71c.35,4.2.56,8.4.58,11.08C320.83,237.11,280.6,293,221,313.1Z" style="fill:#fff"/><path d="M320.3,161.58a143.88,143.88,0,0,0-11-44.71,146.7,146.7,0,0,0-164.6-86.38c-25,5.17-47.5,15.88-66.47,33-39.78,35.9-56,80.69-48.61,133.79,3.23,23.05,12.3,43.9,25.93,62.75A2.92,2.92,0,0,1,56,263q-8.37,27.69-16.63,55.42c-.2.64-.8,1.46-.33,2s1.3-.14,1.92-.34q29-9.23,58-18.54a3.71,3.71,0,0,1,3.3.35A146.64,146.64,0,0,0,221,313.1c59.65-20.06,99.88-76,99.93-140.44C320.86,170,320.65,165.78,320.3,161.58Zm-63.77,78.28a7.35,7.35,0,0,1-1.44,1.94A50,50,0,0,1,231,257.46c-4.26,1.26-8.7,1.48-14.11,1.46-7.76.18-15.94-2.19-24.11-5a165.61,165.61,0,0,1-50.59-27.19c-8.23-6.59-15.52-14.23-22.62-22a283.87,283.87,0,0,1-23.32-29.22c-5.55-7.94-8.94-16.8-11.31-26.11a54.23,54.23,0,0,1-1.77-18.76,48.77,48.77,0,0,1,9.33-23.81,55,55,0,0,1,9.82-10.28,9.58,9.58,0,0,1,5.84-2.33,80.41,80.41,0,0,1,14.22.29,3.35,3.35,0,0,1,2.43,1.93,76.64,76.64,0,0,1,5.32,10.16c4.31,9.46,8.23,19.08,11.66,28.91a7.36,7.36,0,0,1-.08,5.46,32.41,32.41,0,0,1-4.34,8.1c-2.89,3.77-5.8,7.52-8.79,11.21a2.25,2.25,0,0,0-.42,2.71,89.1,89.1,0,0,0,22,30.68c10.35,9.37,21.65,17.29,34.54,22.81a39.76,39.76,0,0,0,6.72,2.3,7.28,7.28,0,0,0,7.64-2.24A91.75,91.75,0,0,0,206.83,206c1.67-2.52,3.25-5.09,5.16-7.45s4.08-3.16,7.1-2.11a204.06,204.06,0,0,1,37.19,17.23,7.18,7.18,0,0,1,4,6.47A50,50,0,0,1,256.53,239.86Z" style="fill:url(#Degradado_sin_nombre_16)"/><path d="M216.9,258.92c-7.76.18-15.94-2.18-24.11-5-18.39-6.27-35.41-15.06-50.59-27.19-8.23-6.59-15.52-14.23-22.63-22a286.22,286.22,0,0,1-23.31-29.22c-5.55-7.94-8.94-16.8-11.31-26.11a54.23,54.23,0,0,1-1.77-18.76,48.67,48.67,0,0,1,9.33-23.81,54.9,54.9,0,0,1,9.81-10.28,9.63,9.63,0,0,1,5.84-2.33,80.5,80.5,0,0,1,14.23.29,3.35,3.35,0,0,1,2.43,1.93,76.64,76.64,0,0,1,5.32,10.16c4.31,9.46,8.23,19.08,11.67,28.91a7.46,7.46,0,0,1-.08,5.46,32.77,32.77,0,0,1-4.35,8.1c-2.89,3.77-5.8,7.52-8.79,11.21a2.26,2.26,0,0,0-.41,2.72,89,89,0,0,0,22,30.67c10.35,9.38,21.65,17.29,34.54,22.81a39.76,39.76,0,0,0,6.72,2.3,7.28,7.28,0,0,0,7.64-2.24A90,90,0,0,0,206.83,206c1.67-2.52,3.25-5.09,5.16-7.45s4.08-3.16,7.1-2.12a204.11,204.11,0,0,1,37.19,17.24,7.19,7.19,0,0,1,4,6.47,50,50,0,0,1-3.72,19.72,7.35,7.35,0,0,1-1.44,1.94A49.92,49.92,0,0,1,231,257.46C226.75,258.72,222.31,258.94,216.9,258.92Z" style="fill:#fff"/></g></g></svg>
                            <span>A Consultar</span>
                        </div>
                        <div
                        class="div_baseInfo div_baseInfo-1"
                        >
                            <span>
                                Para realizar una reserva por
                                <b 
                                id="b_tipoReseAC" 
                                class="b_tipoReseAC b_tipoReseAC-1">${tipoRese}</b> 
                                de esta unidad utilice los canales correspondientes. Realice el pre-registro, pero para confirmar el precio y otros datos deberá contactarse con un asesor justo después.
                            </span>
                        </div>
                    </div>
                </div>
                `

            }

        }else if(tipoRese == "mes"){

            precioEstandarPdt = precioPorMesGene;

            span_duracionRese.textContent = "Información";

            htmlDuracion = `
            <div
            id="div_reseTipoAC"
            class="div_reseTipoAC div_reseTipoAC-1"
            >
                <div 
                id="div_baseAC"
                class="div_baseAC div_baseAC-1"
                >
                    <div
                    class="div_baseSvg div_baseSvg-1"
                    >
                        <svg class="svg_whatsappAC" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 348.49 355.43"><defs><linearGradient id="Degradado_sin_nombre_16" x1="174.35" y1="320.72" x2="174.35" y2="27.45" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3dab3d"/><stop offset="1" stop-color="#67b761"/></linearGradient></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M344.61,137.63c-7.94-36.51-25.54-67.63-53.37-92.49C251.21,9.38,204.19-5,150.91,1.5A165.53,165.53,0,0,0,98.93,17,174.26,174.26,0,0,0,2.7,204.6a171.93,171.93,0,0,0,23.46,61.23,3.73,3.73,0,0,1,.5,3.31Q17,303.27,7.38,337.43c-1.68,5.94-3.37,11.88-5.1,18a5.27,5.27,0,0,0,.62-.09Q48.46,342.68,94,330a3.52,3.52,0,0,1,2.77.13,174.62,174.62,0,0,0,142,5.85c60.06-24.11,101.88-79.1,108.71-142.79A173.06,173.06,0,0,0,344.61,137.63ZM221,313.1a146.64,146.64,0,0,1-118.67-11.3,3.71,3.71,0,0,0-3.3-.35Q70,310.78,41,320c-.62.2-1.42.86-1.92.34s.13-1.32.33-2Q47.66,290.65,56,263a2.92,2.92,0,0,0-.5-2.92c-13.63-18.85-22.7-39.7-25.93-62.75-7.44-53.1,8.83-97.89,48.61-133.79,19-17.12,41.44-27.83,66.47-33a146.7,146.7,0,0,1,164.6,86.38,143.88,143.88,0,0,1,11,44.71c.35,4.2.56,8.4.58,11.08C320.83,237.11,280.6,293,221,313.1Z" style="fill:#fff"/><path d="M320.3,161.58a143.88,143.88,0,0,0-11-44.71,146.7,146.7,0,0,0-164.6-86.38c-25,5.17-47.5,15.88-66.47,33-39.78,35.9-56,80.69-48.61,133.79,3.23,23.05,12.3,43.9,25.93,62.75A2.92,2.92,0,0,1,56,263q-8.37,27.69-16.63,55.42c-.2.64-.8,1.46-.33,2s1.3-.14,1.92-.34q29-9.23,58-18.54a3.71,3.71,0,0,1,3.3.35A146.64,146.64,0,0,0,221,313.1c59.65-20.06,99.88-76,99.93-140.44C320.86,170,320.65,165.78,320.3,161.58Zm-63.77,78.28a7.35,7.35,0,0,1-1.44,1.94A50,50,0,0,1,231,257.46c-4.26,1.26-8.7,1.48-14.11,1.46-7.76.18-15.94-2.19-24.11-5a165.61,165.61,0,0,1-50.59-27.19c-8.23-6.59-15.52-14.23-22.62-22a283.87,283.87,0,0,1-23.32-29.22c-5.55-7.94-8.94-16.8-11.31-26.11a54.23,54.23,0,0,1-1.77-18.76,48.77,48.77,0,0,1,9.33-23.81,55,55,0,0,1,9.82-10.28,9.58,9.58,0,0,1,5.84-2.33,80.41,80.41,0,0,1,14.22.29,3.35,3.35,0,0,1,2.43,1.93,76.64,76.64,0,0,1,5.32,10.16c4.31,9.46,8.23,19.08,11.66,28.91a7.36,7.36,0,0,1-.08,5.46,32.41,32.41,0,0,1-4.34,8.1c-2.89,3.77-5.8,7.52-8.79,11.21a2.25,2.25,0,0,0-.42,2.71,89.1,89.1,0,0,0,22,30.68c10.35,9.37,21.65,17.29,34.54,22.81a39.76,39.76,0,0,0,6.72,2.3,7.28,7.28,0,0,0,7.64-2.24A91.75,91.75,0,0,0,206.83,206c1.67-2.52,3.25-5.09,5.16-7.45s4.08-3.16,7.1-2.11a204.06,204.06,0,0,1,37.19,17.23,7.18,7.18,0,0,1,4,6.47A50,50,0,0,1,256.53,239.86Z" style="fill:url(#Degradado_sin_nombre_16)"/><path d="M216.9,258.92c-7.76.18-15.94-2.18-24.11-5-18.39-6.27-35.41-15.06-50.59-27.19-8.23-6.59-15.52-14.23-22.63-22a286.22,286.22,0,0,1-23.31-29.22c-5.55-7.94-8.94-16.8-11.31-26.11a54.23,54.23,0,0,1-1.77-18.76,48.67,48.67,0,0,1,9.33-23.81,54.9,54.9,0,0,1,9.81-10.28,9.63,9.63,0,0,1,5.84-2.33,80.5,80.5,0,0,1,14.23.29,3.35,3.35,0,0,1,2.43,1.93,76.64,76.64,0,0,1,5.32,10.16c4.31,9.46,8.23,19.08,11.67,28.91a7.46,7.46,0,0,1-.08,5.46,32.77,32.77,0,0,1-4.35,8.1c-2.89,3.77-5.8,7.52-8.79,11.21a2.26,2.26,0,0,0-.41,2.72,89,89,0,0,0,22,30.67c10.35,9.38,21.65,17.29,34.54,22.81a39.76,39.76,0,0,0,6.72,2.3,7.28,7.28,0,0,0,7.64-2.24A90,90,0,0,0,206.83,206c1.67-2.52,3.25-5.09,5.16-7.45s4.08-3.16,7.1-2.12a204.11,204.11,0,0,1,37.19,17.24,7.19,7.19,0,0,1,4,6.47,50,50,0,0,1-3.72,19.72,7.35,7.35,0,0,1-1.44,1.94A49.92,49.92,0,0,1,231,257.46C226.75,258.72,222.31,258.94,216.9,258.92Z" style="fill:#fff"/></g></g></svg>
                        <span>A Consultar</span>
                    </div>
                    <div
                    class="div_baseInfo div_baseInfo-1"
                    >
                        <span>
                            Para realizar una reserva por
                            <b 
                            id="b_tipoReseAC" 
                            class="b_tipoReseAC b_tipoReseAC-1">${tipoRese}</b> 
                            de esta unidad utilice los canales correspondientes. Realice el pre-registro, pero para confirmar el precio y otros datos deberá contactarse con un asesor justo después.
                        </span>
                    </div>
                </div>
            </div>
            `;

            if(precioPorMesGene == 1){

                if(seleccionTR_AC == 0){
                    seleccionTR_AC++;
                    camposCompletados++;
                }
            
            }

        }

        div_duracionInputsBase.innerHTML="";

        const inputsDuracion = rangeInputsDuracion.createContextualFragment(htmlDuracion);
        div_duracionInputsBase.appendChild(inputsDuracion);

        div_duracionUnidadBase.classList.replace("div_duracionUnidadBase-1", "div_duracionUnidadBase-2");

        span_camposCompleNum.textContent = camposCompletados;

        if(tipoReservaSelected == "semana" && precioPorSemaGene != 1){
            
            document.querySelector("#btn_semanaLaV").addEventListener("click", ()=>{
                establecerTipoSemana(5);
            });

            document.querySelector("#btn_semanaLaS").addEventListener("click", ()=>{
                establecerTipoSemana(6);
            });

            document.querySelector("#btn_semanaAtras").addEventListener("click", ()=>{
                cambiarSemana(-1);
            });

            document.querySelector("#btn_semanaAdelante").addEventListener("click", ()=>{
                cambiarSemana(1);
            });

            document.querySelector("#in_cantidadRese").addEventListener("input", (e)=>{
                actualizarSemanasMuestra();
            });

            reservaModoSemanaFechas();

        }

        if(document.querySelector("#in_fechaIniRese") != null){ 

            document.querySelector("#in_fechaIniRese").addEventListener("input", (e)=>{

                if(
                tipoReservaSelected != "" &&
                tipoReservaSelected != null
                ){
                    sacarDatosHorarioNR(tipoReservaSelected); 
                }
        
            });

        }
    
        if(document.querySelector("#in_horaIniRese") != null){

            document.querySelector("#in_horaIniRese").addEventListener("input", (e)=>{
    
                if(
                tipoReservaSelected != "" &&
                tipoReservaSelected != null
                ){
                    sacarDatosHorarioNR(tipoReservaSelected); 
                }
        
            });

        }
    
        if(document.querySelector("#in_cantidadRese") != null){

            document.querySelector("#in_cantidadRese").addEventListener("input", (e)=>{
    
                if(
                tipoReservaSelected != "" &&
                tipoReservaSelected != null
                ){
                    sacarDatosHorarioNR(tipoReservaSelected); 
                }
                
            });

        }

        desbloquearBotonContiRese();

    }

    // Input Cantidad de Personas en la reserva
    in_numPersoRese.addEventListener("input", (e)=>{

        cantidadPersonFinal = Number(in_numPersoRese.value);

        desbloquearBotonContiRese();

    });

    // Input Titulo de la Nueva Reserva
    in_tituloReserva.addEventListener("input", (e)=>{

        let titulo = in_tituloReserva.value;

        if(
        titulo != "" && 
        titulo != null
        ){

            tituloReservaFinal = titulo; 

            if(tituloLleno == 0){
                tituloLleno++;
                camposCompletados++;
                span_camposCompleNum.textContent = camposCompletados;
            }            
            
        }else{

            camposCompletados--;

            tituloReservaFinal = "";

            tituloLleno = 0;

            span_camposCompleNum.textContent = camposCompletados;

        }

        desbloquearBotonContiRese();

    });

    // Input Actividad de la Nueva Reserva
    in_actividadesRese.addEventListener("input", (e)=>{

        let activiReserva = in_actividadesRese.value;
        let largo = activiReserva.length;

        span_limiteActividadB.textContent = largo;

        if(
        activiReserva != "" && 
        activiReserva != null && 
        largo <= 180
        ){

            span_limiteActividad.style.color = "#1a365f";
            span_limiteActividadB.style.color = "#1a365f";
            in_actividadesRese.style.outline = "none"

            actividadReservaFinal = activiReserva; 

            if(actividadLlena==0){
                actividadLlena++;
                camposCompletados++;
                span_camposCompleNum.textContent = camposCompletados;
            }

        }else{

            if(actividadLlena==1){
                actividadLlena = 0;
                camposCompletados--;
                actividadReservaFinal = "";
                span_camposCompleNum.textContent = camposCompletados;
            }
            
            if(largo > 180){
                span_limiteActividad.style.color = "#ef2626";
                span_limiteActividadB.style.color = "#ef2626";
                in_actividadesRese.style.outline = "3px solid #ef262688"
                actividadReservaFinal = ""; 
            }

        }

        desbloquearBotonContiRese();

    });

    // Botón continuar reserva
    btn_continuarReserva.addEventListener("click", (e)=>{

        if(camposCompletados == 6){

            // console.log("Id Usuario: "+idUsuarioLogueado);
            // console.log("Nombre Usuario: "+nombreUserLogueado);
            // console.log("Id Producto: "+idPdtSeleccionado);
            // console.log("Tipo de Reserva: "+tipoReservaSelected);
            // console.log("Precio por Hora: "+precioPorHoraGene);
            // console.log("Precio por Día: "+precioPorDiaGene);
            // console.log("Precio por Semana: "+precioPorSemaGene);
            // console.log("Precio por Mes: "+precioPorMesGene);
            // console.log("Precio Base (Compra): "+precioEstandarPdt);
            // console.log("Iva Producto: "+ivaReserva);
            // console.log("Descuento Producto: "+descuentoReserva);
            // console.log("Comisión Producto: "+comisionReserva);
            // console.log("Precio + IVA: "+ivaReservaPrecio);
            // console.log("Precio - Descuento: "+descuentoReservaPrecio);
            // console.log("Precio Completo (Compra): "+precioReservaFinal);
            // console.log("Fecha de Inicio: "+fechaInicioFinal);
            // console.log("Fecha de Salida: "+fechaSalidaFinal);
            // console.log("Fecha de Inicio Num: "+fechaInicioNumFinal);
            // console.log("Fecha de Salida Num: "+fechaSalidaNumFinal);
            // console.log("Hora de Inicio: "+horaInicioFinal);
            // console.log("Hora de Salida: "+horaSalidaFinal);
            // console.log("Duración Reserva: "+duracionReservaFinal);
            // console.log("Nº Personas: "+cantidadPersonFinal);
            // console.log("Unidad ID: "+unidadSeleccionada);
            // console.log("Titulo: "+tituloReservaFinal);
            // console.log("Actividad: "+actividadReservaFinal);
 
            let formRegistrarRese = new FormData();
            formRegistrarRese.append('registrar_reserva', 'true'); 
            formRegistrarRese.append('idUsuario', idUsuarioLogueado);
            formRegistrarRese.append('nombreUsuario', nombreUserLogueado);
            formRegistrarRese.append('idProducto', idPdtSeleccionado);
            formRegistrarRese.append('tipoReserva', tipoReservaSelected);
            formRegistrarRese.append('precioBase', precioEstandarPdt);
            formRegistrarRese.append('ivaProducto', ivaReserva);
            formRegistrarRese.append('descuentoProducto', descuentoReserva);
            formRegistrarRese.append('comisionProducto', comisionReserva);
            formRegistrarRese.append('precioConIva', ivaReservaPrecio);
            formRegistrarRese.append('precioConDescuento', descuentoReservaPrecio);
            formRegistrarRese.append('precioFinal', precioReservaFinal);
            formRegistrarRese.append('fechaInicio', fechaInicioFinal);
            formRegistrarRese.append('fechaSalida', fechaSalidaFinal);
            formRegistrarRese.append('fechaInicioNum', fechaInicioNumFinal);
            formRegistrarRese.append('fechaSalidaNum', fechaSalidaNumFinal);
            formRegistrarRese.append('horaInicio', horaInicioFinal);
            formRegistrarRese.append('horaSalida', horaSalidaFinal);
            formRegistrarRese.append('duracionReserva', duracionReservaFinal);
            formRegistrarRese.append('cantidadPersonas', cantidadPersonFinal);
            formRegistrarRese.append('unidadId', unidadSeleccionada);
            formRegistrarRese.append('titulo', tituloReservaFinal);
            formRegistrarRese.append('actividad', actividadReservaFinal);

            fetch(url_consultasDB, {
                method: 'POST',
                body: formRegistrarRese
            })
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    alert('¡Reserva Prerregistrada con éxito!');

                    document.querySelector("#span_codigoRese").textContent = data.rese_codigo;

                    document.querySelector("#div_basePrinRegisReserva").classList.replace("div_basePrinRegisReserva-1", "div_basePrinRegisReserva-2");
                    document.querySelector("#div_reseRegistradaBasePrin").classList.replace("div_reseRegistradaBasePrin-2", "div_reseRegistradaBasePrin-1");

                } else {

                    alert('Error al registrar la reserva: ' + data.message);

                }

            })
            .catch(error => {

                console.error('Error en la solicitud:', error);

            });

        }

    });

// EVENTOS //
//------------------------------------------------------------------------------------------------------------------------------------

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

                fetch(urlBuscarInfoAdminDB, {
                    method: "POST",
                    body: formActuPerfil,
                })
                    .then((response) => response.json())
                    .then((data) => {

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

//------------------------------------------------------
//<<-- REGISTRO VISITANTES.PHP | INICIO -->>
//------------------------------------------------------

if(document.querySelector("#registroVisitasHTML") != null){

//------------------------------------------------------------------------------------------------------------------------------------
// EVENTOS //

    //--------------------------------------------------------------------------------------------------------------------------------
    // Traer VISITAS Actuales al cargar la página

        // Función para terminar una visita
        function terminarVisita(visitaId) {
            
            let formTerminarVisita = new FormData();
            formTerminarVisita.append('terminar_visita', 'true');
            formTerminarVisita.append('visita_id', visitaId); // ID de la visita a terminar
        
            fetch(url_consultasDB, {
                method: 'POST',
                body: formTerminarVisita
            })
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    alert('Visita terminada correctamente');
                    cargarVisitasActivas(); 

                } else {
                    
                    alert('Error al terminar la visita');

                }

            })
            .catch(error => {

                console.error('Error:', error);

            });

        }

        // Función para agregar eventos de "Terminar Visita" a los botones
        function agregarEventosTerminar() {

            let botonesTerminar = document.querySelectorAll('.btn_terminarVisita');
            
            botonesTerminar.forEach(button => {

                button.addEventListener('click', function() {

                    let visitaId = this.getAttribute('data-id');
                    terminarVisita(visitaId);

                });

            });

        }

        // Función para cargar las visitas activas
        function cargarVisitasActivas() {
 
            let formCargarVisitas = new FormData();
            formCargarVisitas.append('cargar_visitas_activas', 'true'); 
        
            fetch(url_consultasDB, {
                method: 'POST',
                body: formCargarVisitas
            })
            .then(response => response.json())
            .then(data => {

                if (data.success) {
                    
                    let visitasContainer = document.getElementById('ul_visitasActivas');
                    visitasContainer.innerHTML = data.html;
                    
                    agregarEventosTerminar();

                } else {

                    console.error("Error al cargar las visitas activas:", data.error);

                }

            })
            .catch(error => {

                console.error('Error:', error);

            });

        }

        document.addEventListener('DOMContentLoaded', function() {
            
            cargarVisitasActivas();

        });

    // Traer VISITAS Actuales al cargar la página
    //--------------------------------------------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------------------------------------------------- 
    // REGISTRO DE VISITAS

        // Limpiar formulario
        function limpiarFormularioVisitas() {
            document.getElementById('nombres').value = '';
            document.getElementById('apellidos').value = '';
            document.getElementById('nDocumento').value = '';
            document.getElementById('celular').value = '';
            document.getElementById('correoE').value = '';
            document.getElementById('fechaNacimiento').value = '';
            document.getElementById('empresa').value = '';
            document.getElementById('rut').value = '';
            document.getElementById('motivo').value = '';
        }

        // Envio del formulario de visitas
        document.getElementById('submit-btn').addEventListener('click', function(event) {

            event.preventDefault();
        
            let formRegistroVisitas = new FormData();
            formRegistroVisitas.append('nombres', document.getElementById('nombres').value);
            formRegistroVisitas.append('apellidos', document.getElementById('apellidos').value);
            formRegistroVisitas.append('nDocumento', document.getElementById('nDocumento').value);
            formRegistroVisitas.append('celular', document.getElementById('celular').value);
            formRegistroVisitas.append('correoE', document.getElementById('correoE').value);
            formRegistroVisitas.append('fechaNacimiento', document.getElementById('fechaNacimiento').value);
            formRegistroVisitas.append('empresa', document.getElementById('empresa').value);
            formRegistroVisitas.append('rut', document.getElementById('rut').value);
            formRegistroVisitas.append('motivo', document.getElementById('motivo').value);
            formRegistroVisitas.append('visita_registro', 'true'); // Para identificar la acción
        
            fetch(url_consultasDB, {
                method: 'POST',
                body: formRegistroVisitas
            })
            .then(response => {
                
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json(); 

            })
            .then(data => {
                
                if (data.success) {

                    alert("Visita registrada correctamente.");
                    limpiarFormularioVisitas(); 
                    cargarVisitasActivas();

                } else {

                    alert("Hubo un error al registrar la visita: " + data.error);

                }

            })
            .catch(error => {
                
                console.error('Error:', error);
                alert("Ocurrió un error. Por favor, intenta de nuevo.");

            });

        });  

    // REGISTRO DE VISITAS
    //--------------------------------------------------------------------------------------------------------------------------------  

    //--------------------------------------------------------------------------------------------------------------------------------
    // BUSCAR VISITAS ANTERIORES

        // Función para buscar visitas terminadas
        document.getElementById('in_buscarVisitasAnte').addEventListener('input', function() {
            let query = this.value.trim();

            let formBuscarVisitaXNom = new FormData();
            formBuscarVisitaXNom.append('buscar_visitas_terminadas', true);
            formBuscarVisitaXNom.append('query', query);

            fetch(url_consultasDB, {
                method: 'POST',
                body: formBuscarVisitaXNom
            })
            .then(response => response.json())
            .then(data => {
                let resultadoContainer = document.getElementById('ul_resultadoVisitasAnte');
                resultadoContainer.innerHTML = '';

                if (data.success && data.visitas.length > 0) {
                    let fragment = document.createDocumentFragment();

                    data.visitas.forEach(visita => {
                        let li = document.createElement('li');
                        li.style.padding = '1rem';
                        li.style.marginBottom = '1rem';
                        li.style.border = '1px solid #ccc';
                        li.style.borderRadius = '0.5rem';

                        li.innerHTML = `
                        <strong>${visita.visita_nombres} ${visita.visita_apellidos}</strong><br>
                        Documento: ${visita.visita_nDocumento} | Correo: ${visita.visita_correoE}<br>
                        Empresa: ${visita.visita_empresa} | Motivo: ${visita.visita_motivo}<br>
                        
                        <button class="registrar-nueva-visita" data-id="${visita.id_visita}" 
                            style="margin-top: 1rem; padding: 0.5rem 1rem; background-color: #28a745; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                            Registrar Nueva Visita
                        </button>

                        <button class="ver-detalles-visita" data-id="${visita.id_visita}" 
                            style="margin-left: 0.5rem; padding: 0.5rem 1rem; background-color: #17a2b8; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                            👁 Ver Detalles
                        </button>

                        <div class="form-reRegistro form-reRegistro-1" id="form-${visita.id_visita}" style="display:none; margin-top: 1rem;">
                            <span>Confirme si los datos están actualizados</span><br><br>
                            <label>Teléfono:</label>
                            <input type="text" value="${visita.visita_celular}" class="telefono-input" style="width:100%; padding:0.5rem; margin-bottom:0.5rem;"/><br>
                            <label>Correo:</label>
                            <input type="email" value="${visita.visita_correoE}" class="email-input" style="width:100%; padding:0.5rem; margin-bottom:0.5rem;"/><br>
                            <label>Escriba el nuevo Motivo de la visita:</label>
                            <textarea class="motivo-input" style="width:100%; padding:0.5rem; resize:none; height: 6.8rem;">${visita.visita_motivo}</textarea><br>
                            <button class="confirmar-reRegistro" data-id="${visita.id_visita}" 
                                style="margin-top: 0.5rem; padding: 0.5rem 1rem; background-color: #007bff; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                                Confirmar Re-Registro
                            </button>
                        </div>
                        `;

                        fragment.appendChild(li);
                    });

                    resultadoContainer.appendChild(fragment);
                } else {
                    resultadoContainer.innerHTML = '<li>No se encontraron visitas terminadas.</li>';
                }
            })
            .catch(error => console.error('Error:', error));
        });

        // Evento para mostrar el formulario al hacer clic en "Registrar Nueva Visita"
        document.getElementById('ul_resultadoVisitasAnte').addEventListener('click', function(event) {
            if (event.target.classList.contains('registrar-nueva-visita')) {
                let visitaId = event.target.getAttribute('data-id');
                let formDiv = document.getElementById(`form-${visitaId}`);
                
                // Mostrar o esconder el formulario
                formDiv.style.display = (formDiv.style.display === 'none' || formDiv.style.display === '') ? 'block' : 'none';
            }
        });

        // Evento para confirmar el re-registro con los datos actualizados
        document.getElementById('ul_resultadoVisitasAnte').addEventListener('click', function(event) {
            if (event.target.classList.contains('confirmar-reRegistro')) {
                let visitaId = event.target.getAttribute('data-id');
                let formDiv = document.getElementById(`form-${visitaId}`);
                
                // Obtener datos actualizados
                let telefono = formDiv.querySelector('.telefono-input').value;
                let email = formDiv.querySelector('.email-input').value;
                let motivo = formDiv.querySelector('.motivo-input').value;

                // Enviar los datos actualizados al servidor
                let formReRegistroVisita = new FormData();
                formReRegistroVisita.append('reRegistrar_nueva_visita', true);
                formReRegistroVisita.append('visita_id', visitaId);
                formReRegistroVisita.append('telefono', telefono);
                formReRegistroVisita.append('email', email);
                formReRegistroVisita.append('motivo', motivo);

                fetch(url_consultasDB, {
                    method: 'POST',
                    body: formReRegistroVisita
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Nueva visita registrada correctamente.');
                        cargarVisitasActivas();  // Actualiza la lista de visitas activas en tiempo real
                    } else {
                        alert(data.error || "No se pudo registrar la visita.");
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        });


    // BUSCAR VISITAS ANTERIORES
    //--------------------------------------------------------------------------------------------------------------------------------
        
    //--------------------------------------------------------------------------------------------------------------------------------
    // MOSTRAR INFORMACIÓN DE VISITA ANTERIOR - BOTÓN OJO

        // Evento para cerrar el cuadro de detalles
        document.getElementById('cerrar-detalle-visita').addEventListener('click', function() {
            document.getElementById('detalle-visita').style.display = 'none';
        });
        
        // Función para mostrar los detalles en el contenedor
        function mostrarDetallesVisita(visita) {
            let detalleContenedor = document.getElementById('detalle-contenido');
            let detalleVisita = document.getElementById('detalle-visita');

            detalleContenedor.innerHTML = `
                <p><strong>Nombre:</strong> ${visita.visita_nombres} ${visita.visita_apellidos}</p>
                <p><strong>Documento:</strong> ${visita.visita_nDocumento}</p>
                <p><strong>Correo:</strong> ${visita.visita_correoE}</p>
                <p><strong>Teléfono:</strong> ${visita.visita_celular}</p>
                <p><strong>Empresa:</strong> ${visita.visita_empresa}</p>
                <p><strong>RUT:</strong> ${visita.visita_rut}</p>
                <p><strong>Motivo:</strong> ${visita.visita_motivo}</p>
                <p><strong>Fecha de Entrada:</strong> ${visita.visita_fechaEntrada} | <strong>Hora:</strong> ${visita.visita_horaEntrada}</p>
                <p><strong>Fecha de Salida:</strong> ${visita.visita_fechaSalida || 'N/A'} | <strong>Hora:</strong> ${visita.visita_horaSalida || 'N/A'}</p>
                <p><strong>Estado:</strong> ${visita.visita_estado}</p>
            `;

            detalleVisita.style.display = 'block';  // Mostrar el contenedor
        }

        // Evento para mostrar detalles de la visita
        document.getElementById('ul_resultadoVisitasAnte').addEventListener('click', function(event) {

            if (event.target.classList.contains('ver-detalles-visita')) {
                let visitaId = event.target.getAttribute('data-id');

                let formDetallesVisita = new FormData();
                formDetallesVisita.append('ver_detalles_visita', true);
                formDetallesVisita.append('visita_id', visitaId);

                fetch(url_consultasDB, {
                    method: 'POST',
                    body: formDetallesVisita
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        mostrarDetallesVisita(data.visita);
                    } else {
                        alert(data.error || "No se pudieron cargar los detalles de la visita.");
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        });

    // MOSTRAR INFORMACIÓN DE VISITA ANTERIOR - BOTÓN OJO
    //--------------------------------------------------------------------------------------------------------------------------------

// EVENTOS //
//------------------------------------------------------------------------------------------------------------------------------------

}

//------------------------------------------------------
//<<-- REGISTRO VISITANTES.PHP | FIN -->>
//------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------
// FUNCIONES Y VARIABLES GLOBALES //

/* URLS */

/* Local - (Localhost, XAMPP) */
// export var urlEnviContraRecu = "http://localhost/BizClub/enviarContraRecu.php";
// export var urlInfoClienteDB = "http://localhost/BizClub/consultarInfoCliente.php";
// export var urlConsultarUser = "http://localhost/BizClub/consultarUsuario.php";
// export var urlPagarMensualidadTDC = "http://localhost/BizClub/transaPagoMensualidad.php";
// export var urlBuscarInfoAdminDB = "http://localhost/BizClub/consultarInfoAdmin.php";
// export var urlConfirTDC = "http://localhost/BizClub/confirTarjetaCredito.php";
// export var urlCreaFacMembre = "http://localhost/BizClub/registrarFacMembre.php";
// export var urlGuardaTokenUser = "http://localhost/BizClub/guardarMiembroEpayco.php";
// export var urlCrearSub = "http://localhost/BizClub/crearSubNueva.php";
// export var urlCrearUserToken = "http://localhost/BizClub/crearUserToken.php";
// export var urlProxyEpayco = "http://localhost/BizClub/epayco_proxy.php";
// export var urlIndex = "http://localhost/BizClub/index.php";
// export var url_consultasDB = "http://localhost/BizClub/consultasDB.php";
// export var url_realizaReservaNew = "http://localhost/BizClub/realizarReserva-CLI.php";

export const cuadroOPerfil = document.querySelector(".cuadroPOculto");
export const divPerfilFotoBtn = document.querySelector(".divPerfil");
export const ajustesCuentaBtn = document.querySelector("#ajustesCuentaBtn"); 
export const btnCerrarSesion = document.querySelector(".btnCerrar");

/* Producción - (Bluehost) */
export var urlEnviContraRecu = "https://plataforma.the-bizclub.com/enviarContraRecu.php";
export var urlInfoClienteDB = "https://plataforma.the-bizclub.com/consultarInfoCliente.php";
export var urlConsultarUser = "https://plataforma.the-bizclub.com/consultarUsuario.php";
export var urlPagarMensualidadTDC = "https://plataforma.the-bizclub.com/transaPagoMensualidad.php";
export var urlBuscarInfoAdminDB = "https://plataforma.the-bizclub.com/consultarInfoAdmin.php";
export var urlConfirTDC = "https://plataforma.the-bizclub.com/confirTarjetaCredito.php";
export var urlCreaFacMembre = "https://plataforma.the-bizclub.com/registrarFacMembre.php";
export var urlGuardaTokenUser = "https://plataforma.the-bizclub.com/guardarMiembroEpayco.php";
export var urlCrearSub = "https://plataforma.the-bizclub.com/crearSubNueva.php";
export var urlCrearUserToken = "https://plataforma.the-bizclub.com/crearUserToken.php";
export var urlProxyEpayco = "https://plataforma.the-bizclub.com/epayco_proxy.php";
export var urlIndex = "https://plataforma.the-bizclub.com/index.php";
export var url_consultasDB = "https://plataforma.the-bizclub.com/consultasDB.php";
export var url_realizaReservaNew = "https://plataforma.the-bizclub.com/realizarReserva-CLI.php";

//------------------------------------------------------------------------------------------------------------------------------

/* FECHAS */

export var diaGeneNum = new Date().getDate();
export var mesGeneNum = new Date().getMonth()+1; 
export var anioGeneNum = new Date().getFullYear();
export var diaGeneTex = diaGeneNum < 10 ? "0"+diaGeneNum : String(diaGeneNum);
export var mesGeneTex = mesGeneNum < 10 ? "0"+mesGeneNum : String(mesGeneNum);
export var anioGeneTex = String(anioGeneNum);
export var cadenaFechaActual = anioGeneTex+"-"+mesGeneTex+"-"+diaGeneTex;
export var cadenaFechaActualP = anioGeneTex.substring(2,4)+"-"+mesGeneTex+"-"+diaGeneTex;

export var diasSemana = 0;
export var desdeHastaSemana = "sabado";

export var mesesFactura = {
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

export var mesesObjetoCompletos = {
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
  
export var mesesFacturaCod = {
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

export var mesesABREVI = [
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

export var mesesObjeto = [
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


//------------------------------------------------------------------------------------------------------------------------------

/* REDES */

let bizWhats = "https://wa.link/r0m86h";
let bizInsta = "https://www.instagram.com/bizclubcoworking/";
let bizFacebo = "https://www.facebook.com/profile.php?id=61551683347924&locale=es_LA";

//------------------------------------------------------------------------------------------------------------------------------

/* EVENTOS */

/* EVENTOS */


/* FUNCIONES */

// Año COPYRIGHT actualizar
export function actuCopyAnio(){

    document.querySelector("#span_copyright").textContent = "Copyright​ © "+anioGeneTex+" BizLab SAS";

}

actuCopyAnio();

// (Click fuera) ocultar cuadro perfil opciones
export function definirClickFuera(){

    if(document.querySelector("#cuadroPOculto") != null){

        window.addEventListener('click', function mostrarCuadroPerfil(e) {

            if(document.getElementById('divPerfil') != null){
                if (document.getElementById('divPerfil').contains(e.target)) {
                
        
                } else {
                        
                    document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
            
                }
            }
        
        });

        if(document.querySelector(".divPerfil") != null){
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
        
        ajustesCuentaBtn.addEventListener("click", (e) => {

            e.preventDefault();
            window.location.href = "usuarioPerfil.php";
        
        });

        btnCerrarSesion.addEventListener("click", (e) => {

            window.location.href = "cerrar.php";
        
        });

    }
    
}

definirClickFuera ();

// Redes FOOTER actualizar
export function actuRedesS(){

    document.querySelector("#a_facebook").setAttribute("href", bizFacebo);
    document.querySelector("#a_instagram").setAttribute("href", bizInsta);
    document.querySelector("#a_whatsapp").setAttribute("href", bizWhats);

} 

actuRedesS();

// Número aleatorio
export function numeroAleatorioEntre(min, max) {

    return Math.random() * (max - min) + min;

}

// Hora a Epoch
export function horaAEpoch(hora) {
    let [time, modifier] = hora.split(' '); // Separar "10:00" de "AM/PM"
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12; // Convertir PM a formato 24 horas (excepto 12 PM)
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0; // Convertir 12 AM a 00 horas
    }

    return hours * 3600 + minutes * 60; // Convertimos a segundos para comparación
}

// Fecha a Número Epoch
export function fechaANumero(fecha){
    
    let regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!regexFecha.test(fecha)) {
        throw new Error("Formato de fecha inválido. Usa 'YYYY-MM-DD'.");
    }

    let [year, month, day] = fecha.split('-');
    let fechaObj = new Date(Date.UTC(year, month - 1, day));  

    if (isNaN(fechaObj.getTime())) {
        throw new Error("Fecha inválida. Asegúrate de usar el formato 'YYYY-MM-DD'.");
    }

    let epochSegundos = Math.floor(fechaObj.getTime() / 1000);

    return epochSegundos;

}

// Crear fecha
export function obtenerFechaActual() {

    let fecha = new Date();
    
    let año = fecha.getFullYear(); 
    let mes = String(fecha.getMonth() + 1).padStart(2, '0');
    let dia = String(fecha.getDate()).padStart(2, '0'); 
    
    return `${año}-${mes}-${dia}`;

}

// Funcion rango de fechas formato 0000-00-00
export function obtenerRangoDeFechas(fechaInicio, fechaFin) {
    
    let inicio = new Date(`${fechaInicio}T00:00:00`);
    let fin = new Date(`${fechaFin}T00:00:00`);

    if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
        throw new Error("Una o ambas fechas no son válidas. Usa el formato YYYY-MM-DD.");
    }

    if (inicio > fin) {
        throw new Error("La fecha de inicio debe ser anterior o igual a la fecha de fin.");
    }

    let fechas = [];
    
    while (inicio <= fin) {
        
        fechas.push(inicio.toISOString().split('T')[0]);
        
        inicio.setDate(inicio.getDate() + 1);
    }

    return fechas;

}

// Hora a minutos
export function horaAMinutos(horaSele) {

    if (horaSele.includes(":") && (horaSele.includes("AM") || horaSele.includes("PM"))) {
        // Formato AM/PM
        let [horaMinuto, periodo] = horaSele.split(' ');
        let [hora, minuto] = horaMinuto.split(':');
        
        hora = parseInt(hora);
        minuto = parseInt(minuto);
        
        if (periodo === 'PM' && hora !== 12) {
            hora += 12;
        }
        
        if (periodo === 'AM' && hora === 12) {
            hora = 0;
        }

        let totalMinutos = hora * 60 + minuto;
        return [totalMinutos, String(totalMinutos).padStart(4, '0')];

    } else if (horaSele.includes(":")) {
        // Formato 24 horas (por ejemplo: "14:30")
        let [hora, minuto] = horaSele.split(':');
        
        hora = parseInt(hora);
        minuto = parseInt(minuto);
        
        let totalMinutos = hora * 60 + minuto;
        return [totalMinutos, String(totalMinutos).padStart(4, '0')];
        
    } else {
        
        throw new Error("Formato de hora no válido.");
    }

}

// Minutos a HORA (Formato 12 horas con periodo AM/PM)
export function minutosAFormato12h(minutos) {

    if (minutos < 0) {
        return "Entrada inválida: los minutos no pueden ser negativos.";
    }

    let horas = Math.floor(minutos / 60) % 24;
    let minutosRestantes = minutos % 60;

    let periodo = horas >= 12 ? "PM" : "AM";
    
    horas = horas % 12;
    horas = horas === 0 ? 12 : horas; 

    let minutosFormateados = minutosRestantes.toString().padStart(2, '0');

    return `${horas}:${minutosFormateados} ${periodo}`;

}

// Crear fecha
export function obtenerHoraActual() {

    let fecha = new Date();

    let horas = fecha.getHours();
    let minutos = fecha.getMinutes(); 
    let periodo = horas >= 12 ? 'PM' : 'AM'; 

    horas = horas % 12;
    horas = horas ? horas : 12; 

    minutos = String(minutos).padStart(2, '0');

    return `${horas}:${minutos} ${periodo}`;

}

// Crear código para registro (Factura, Membresia, Reserva), requiere de función: fechaANumero, mesesFactura, horaAMPMaMinutos,
// obtenerHoraActual
export function creaCodFMR(fecha){

    let epoch = fechaANumero(fecha);
    let hora = horaAMinutos(obtenerHoraActual())[1];
    
    let serieFactura = mesesFactura[new Date().getMonth()+1]+"-"+new Date().getFullYear();

    let codFactura = 
        "FAC"+hora+"-"+epoch;
    let codMembre =
        "MEM"+hora+"-"+epoch;
    let codRese =
        "RES"+hora+"-"+epoch;

    return [serieFactura, codFactura, codMembre, codRese];

}

// Dia de la semana en formato 0-6 (0 = domingo, ..., 6 = sabado)
export function obtenerDiaSemana(fecha) {

    let regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!regexFecha.test(fecha)) {
        throw new Error("Formato de fecha inválido. Usa 'YYYY-MM-DD'.");
    }

    let [year, month, day] = fecha.split('-');
    let date = new Date(year, month - 1, day); 
    
    if (isNaN(date)) {
        throw new Error("Fecha inválida.");
    }

    return date.getDay();

}

// Obtener la ultima fecha del mes anterior y la primera fecha del mes posterior (formato YYYY-MM-DD)
export function obtenerFechasExtremos(fecha) {

    let regexFecha = /^\d{4}-\d{2}-\d{2}$/;

    if (!regexFecha.test(fecha)) {
        throw new Error("Formato de fecha inválido. Usa 'YYYY-MM-DD'.");
    }

    let [year, month, day] = fecha.split('-').map(Number);

    // Último día del mes anterior
    let ultimoDiaAnterior = new Date(year, month - 1, 0); // Día 0 del mes actual = último día del anterior
    let fechaAnterior = `${ultimoDiaAnterior.getFullYear()}-${String(ultimoDiaAnterior.getMonth() + 1).padStart(2, '0')}-${String(ultimoDiaAnterior.getDate()).padStart(2, '0')}`;

    // Primer día del mes siguiente
    let primerDiaSiguiente = new Date(year, month, 1); // Primer día del mes siguiente
    let fechaPosterior = `${primerDiaSiguiente.getFullYear()}-${String(primerDiaSiguiente.getMonth() + 1).padStart(2, '0')}-${String(primerDiaSiguiente.getDate()).padStart(2, '0')}`;

    return [fechaAnterior, fechaPosterior];
    
}

// Obtener primer y ultimo dia de un mes
export function obtenerExtremosDelMes(fecha) {

    let [year, month] = fecha.split('-').map(Number);

    // Primer día del mes
    let primerDia = `${year}-${String(month).padStart(2, '0')}-01`;

    // Último día del mes
    let ultimoDia = new Date(year, month, 0).getDate();
    let ultimoDiaFormato = `${year}-${String(month).padStart(2, '0')}-${String(ultimoDia).padStart(2, '0')}`;

    return [primerDia, ultimoDiaFormato];
    
}

export function moverEntreMeses(fecha, cantidad, operacion) {

    let [year, month] = fecha.split('-').map(Number);

    let ajuste = operacion === "sumar" ? cantidad : -cantidad;

    let nuevaFecha = new Date(year, month - 1 + ajuste, 1);

    let nuevoYear = nuevaFecha.getFullYear();
    let nuevoMes = String(nuevaFecha.getMonth() + 1).padStart(2, '0');

    return `${nuevoYear}-${nuevoMes}-01`;
    
}

// Restar o sumar días a una fecha
export function sumarRestarDias(fecha, dias, operacion) {

    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!regexFecha.test(fecha)) {
        console.log(fecha);
        throw new Error("Formato de fecha inválido. Usa 'YYYY-MM-DD'.");
    }

    if (dias === 0) {
        return fecha;
    }

    const [year, month, day] = fecha.split('-');
    const date = new Date(year, month - 1, day); 

    if (isNaN(date)) {
        throw new Error("Fecha inválida.");
    }

    operacion = operacion.toLowerCase();  

    if (operacion === "sumar") {
        date.setDate(date.getDate() + dias);
    } else if (operacion === "restar") {
        date.setDate(date.getDate() - dias);
    } else {
        throw new Error("Operación inválida. Usa 'sumar' o 'restar'.");
    }

    return date.toISOString().split('T')[0];

}

// Quitar acentos
export function quitarAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//------------------------------------------------------------------------------------------------------------------------------
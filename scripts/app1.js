// VARIABLES Y FUNCIONES GLOBALES //

/* Local - (Localhost, XAMPP) */
// import {urlEnviContraRecu, urlInfoClienteDB, urlConsultarUser, urlPagarMensualidadTDC, urlConfirTDC, url_consultasDB, diaGeneNum, 
// mesGeneNum, anioGeneNum, diaGeneTex, mesGeneTex, anioGeneTex, cadenaFechaActual, cadenaFechaActualP, mesesFacturaCod, 
// creaCodFMR, fechaANumero, horaAMinutos, obtenerHoraActual, mesesFactura, obtenerFechaActual, actuCopyAnio} 
// from "http://localhost/BizClub/scripts/vyfGlobales.js";

/* Producción - (Bluehost) */
// import {urlEnviContraRecu, urlInfoClienteDB, urlConsultarUser, urlPagarMensualidadTDC, urlConfirTDC, cadenaFechaActual, cadenaFechaActualP, creaCodFMR, fechaANumero} 
// from "https://plataforma.the-bizclub.com/scripts/vyfGlobales.js";
import {urlEnviContraRecu, urlInfoClienteDB, urlConsultarUser, urlPagarMensualidadTDC, urlConfirTDC, url_consultasDB, diaGeneNum, 
mesGeneNum, anioGeneNum, diaGeneTex, mesGeneTex, anioGeneTex, cadenaFechaActual, cadenaFechaActualP, mesesFacturaCod, 
creaCodFMR, fechaANumero, horaAMinutos, obtenerHoraActual, mesesFactura, obtenerFechaActual, actuCopyAnio} 
from "https://plataforma.the-bizclub.com/scripts/vyfGlobales.js";

//-----------------------------------------------------------------------------------------------------------------------------------------

//---------------------------
// <<-- Index - INICIO -->>
//---------------------------

if(document.querySelector("#indexHTML") != null){

  
}

//-------------------------
// <<-- Index - FIN -->>
//-------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------
// <<-- Inicio Sesión - INICIO -->>
//------------------------------------

if(document.querySelector("#iniSesionHTML") !== null) {

  const in_correoLogin = document.querySelector("#in_correoLogin");
  const in_contraseLogin = document.querySelector("#in_contraseLogin");

  const svg_ojoIconA = document.querySelector("#svg_ojoIconA");
  const svg_ojoIconC = document.querySelector("#svg_ojoIconC");

  const btn_ojoMostrarContra = document.querySelector("#btn_ojoMostrarContra");
  const btn_iniarSesion = document.querySelector("#btn_iniarSesion");

  const span_errCorreo = document.querySelector("#span_errCorreo");
  const span_errContrase = document.querySelector("#span_errContrase");

  /* EVENTOS */
  in_contraseLogin.addEventListener("input", (e)=>{

    if(in_contraseLogin.value !== ""){

      btn_ojoMostrarContra.classList.replace("btn_ojoMostrarContra-1", "btn_ojoMostrarContra-2");
    
    }else{

      btn_ojoMostrarContra.classList.replace("btn_ojoMostrarContra-2", "btn_ojoMostrarContra-1");
      svg_ojoIconA.classList.replace("svg_ojoIconA-2", "svg_ojoIconA-1");
      svg_ojoIconC.classList.replace("svg_ojoIconC-1", "svg_ojoIconC-2");
      in_contraseLogin.removeAttribute("type");
      in_contraseLogin.setAttribute("type", "password");

    }

  });

  btn_ojoMostrarContra.addEventListener("click", (e)=>{

    if(svg_ojoIconA.classList.contains("svg_ojoIconA-1")){

      in_contraseLogin.removeAttribute("type");
      in_contraseLogin.setAttribute("type", "text");
      svg_ojoIconA.classList.replace("svg_ojoIconA-1", "svg_ojoIconA-2");
      svg_ojoIconC.classList.replace("svg_ojoIconC-2", "svg_ojoIconC-1");

    }else{

      in_contraseLogin.removeAttribute("type");
      in_contraseLogin.setAttribute("type", "password");
      svg_ojoIconA.classList.replace("svg_ojoIconA-2", "svg_ojoIconA-1");
      svg_ojoIconC.classList.replace("svg_ojoIconC-1", "svg_ojoIconC-2");

    }

  });

  btn_iniarSesion.addEventListener("click", (e)=>{

    e.preventDefault();
    
    if(in_correoLogin.value !== "" && in_contraseLogin.value !== ""){

      let formInicioSesion = new FormData();

      formInicioSesion.append("verificarUserLogin", "true");
      formInicioSesion.append("userLoginCorreo", in_correoLogin.value.trim());
      formInicioSesion.append("userLoginContrasenia", in_contraseLogin.value.trim());

      fetch(url_consultasDB, {
        method: 'POST',
        body: formInicioSesion
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error(`Error HTTP: ${response.status}`);
          }
          return response.json();
      })
      .then((data) => {
      
        //console.log(data);

        in_correoLogin.style.outline = "none";
        span_errCorreo.textContent = "#";
        span_errCorreo.classList.replace("span_errCorreo-2", "span_errCorreo-1");

        in_contraseLogin.style.outline = "none";
        span_errContrase.textContent = "#";
        span_errContrase.classList.replace("span_errContrase-2", "span_errContrase-1");

        if(data[0] === "Login exitoso"){

          in_correoLogin.setAttribute("disabled", "");
          in_contraseLogin.setAttribute("disabled", "");

          in_correoLogin.classList.replace("in_correoLogin-1", "in_correoLogin-2");
          in_contraseLogin.classList.replace("in_contraseLogin-1", "in_contraseLogin-2");

          in_contraseLogin.removeAttribute("type");
          in_contraseLogin.setAttribute("type", "password");

          in_correoLogin.style.outline = "none";
          in_contraseLogin.style.outline = "none";

          span_errCorreo.textContent = "#";
          span_errCorreo.classList.replace("span_errCorreo-2", "span_errCorreo-1");

          span_errContrase.textContent = "#";
          span_errContrase.classList.replace("span_errContrase-2", "span_errContrase-1");

          btn_iniarSesion.setAttribute("disabled", "");
          btn_iniarSesion.classList.replace("btn_iniarSesion-1", "btn_iniarSesion-2");

          btn_ojoMostrarContra.classList.replace("btn_ojoMostrarContra-2", "btn_ojoMostrarContra-1");

          document.querySelector("#span_ingresar").style.color = "#239923"
          document.querySelector("#span_ingresar").textContent = "Ingresando..."

          let urlEnvio = "";

          if(data[2] === "Usuario" || data[2] === "Miembro"){
            urlEnvio = "index.php";
          }else{
            urlEnvio = "administracion.php";
          }

          setTimeout(() => {
            window.location.href = urlEnvio;
          }, 1000); // Redirige después de 3 segundos

        }else if(data[0] === "Correo NO Encontrado"){
          
          in_correoLogin.style.outline = "3px solid #ff2713aa";
          span_errCorreo.textContent = "Correo NO Encontrado";
          span_errCorreo.classList.replace("span_errCorreo-1", "span_errCorreo-2");

        }else if(data[0] === "Correo electrónico inválido"){

          in_correoLogin.style.outline = "3px solid #ff2713aa";
          span_errCorreo.textContent = "Correo electrónico inválido";
          span_errCorreo.classList.replace("span_errCorreo-1", "span_errCorreo-2");
          
        }else if(data[0] === "Contraseña Incorrecta"){

          in_contraseLogin.style.outline = "3px solid #ff2713aa";
          span_errContrase.textContent = "Contraseña Incorrecta";
          span_errContrase.classList.replace("span_errContrase-1", "span_errContrase-2");

        }

      })
      .catch((error) => {
          console.error('Error:', error);
      });

    }

  });
  /* EVENTOS */

}

//-------------------------------
// <<-- Inicio Sesión - FIN -->>
//-------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------
// <<-- Registro - INICIO -->>
//-----------------------------

if (document.querySelector(".registroHTML") != null) {
  //SELECCIONANDO OBJETOS DEL DOM (REGISTRO.PHP) - INICIO

  //INPUTS

  const nombreRegisInput = document.querySelector(".nombreRegisInput");
  const apellidoRegisInput = document.querySelector(".apellidoRegisInput");
  const documentoInput = document.querySelector(".documentoInput");
  const fechaNInputRegis = document.querySelector(".fechaNInputRegis");
  const telefonoInputRegis = document.querySelector(".telefonoInputRegis");
  const direccInputRegis = document.querySelector(".direccInputRegis");
  const inputSelectRol = document.querySelector("#inputSelectRol");

  const inputCorreo = document.querySelector(".inputCorreoMiembro");
  const correoAdminInput = document.querySelector(".correoAdminInput");

  const empresaInput = document.querySelector(".empresaInput");

  const inputContraseña = document.querySelector(".contraInputRegis");
  const inputContraConfir = document.querySelector(".inputContraConfir");
  const inputContraseña2 = document.querySelector(".contraInputRegis2");
  const inputContraConfir2 = document.querySelector(".inputContraConfir2");

  const inputNit = document.querySelector(".inputNIT");
  const inputCodigoAcce = document.querySelector(".inputCodigoAcce");

  //FORM INPUTS REGISTRO
  const inputNomM = document.querySelector(".nomM");
  const inputApeM = document.querySelector(".apeM");
  const inputDocuM = document.querySelector(".docuM");
  const inputFechaM = document.querySelector(".fechaM");
  const inputTelefM = document.querySelector(".telefM");
  const inputDireccM = document.querySelector(".dirrecM");
  const inputRolM = document.querySelector(".rolM");
  const inputCorreoM = document.querySelector(".correoM");
  const inputContraM = document.querySelector(".contraM");
  const inputEmpreM = document.querySelector(".empreM");
  const inputNitM = document.querySelector(".nitM");
  const inputCorreoA = document.querySelector(".correoA");
  const inputContraA = document.querySelector(".contraA");
  //----------------------------

  //BOTONES

  const btnSiguiente = document.querySelector(".btnSiguiente-1");

  const btnAtrasM = document.querySelector(".btnAtrasRegisFM");
  const btnAtrasA = document.querySelector(".btnAtrasRegisFA");

  const btnCancelarRegis1 = document.querySelector(".btnCancelRegisF1");
  const btnCancelarRegisM = document.querySelector(".btnCancelRegisFM");
  const btnCancelarRegisA = document.querySelector(".btnCancelRegisFA");

  const btnRegistrarseM = document.querySelector(".btnRegistrarseFM");
  const btnRegistrarseA = document.querySelector(".btnRegistrarseFA");

  const ojoIconoA = document.querySelector(".ojoAbierto");
  const ojoIconoC = document.querySelector(".ojoCerrado");

  const ojoIconoA_A = document.querySelector(".ojoAbiertoA");
  const ojoIconoC_A = document.querySelector(".ojoCerradoA");

  //FORMULARIOS

  const formRegisF1 = document.querySelector(".formRe1");
  const formRegisF2 = document.querySelector(".formRe2");
  const formRegisF3 = document.querySelector(".formRe3");
  const formRegistrarseM = document.querySelector("#formRegisMiembro");

  //SPAN

  const spanRegisPer = document.querySelector(".registroSpan2");

  const spanErrNombre = document.querySelector(".sparErrNombre");
  const spanErrApellido = document.querySelector(".sparErrApellido");
  const spanErrDocumento = document.querySelector(".sparErrDocumento");
  const spanErrNacimiento = document.querySelector(".sparErrNacimiento");
  const spanErrTelefono = document.querySelector(".sparErrTelefono");
  const spanErrDirecc = document.querySelector(".sparErrDireccion");
  const sparErrTipoUser = document.querySelector(".sparErrTipoUser");
  const spanErrCorreoMiembro = document.querySelector(".sparErrCorreo");
  const spanErrNit = document.querySelector(".spanErrNit");
  const spanErrCodigoAcc = document.querySelector(".spanErrCodigoAcc");
  const spanErrCorreoAdmi = document.querySelector(".spanErrCorreoAdmi");

  const contraNoCoincide = document.querySelector(".contraNoCoincide");
  const contraNoCoincideA = document.querySelector(".contraNoCoincide2");

  //SELECCIONANDO OBJETOS DEL DOM (REGISTRO.PHP) - FIN

  //
  //------------------------------------------------------------------------------
  //

  //VARIABLES GLOBALES

  var numeros = "0123456789 ";
  var numeros2 = "1234567890+ ";
  var numeros3 = "1234567890- ";
  var arroba = "@";
  var letras = "abcdefghijklmnñopqrstuvwxyzáéíóú ";

  //Array para verificar que los inputs tengan datos correctos (0=TRUE, 1=FALSE).
  //Si es FALSE, se desactivarán algunos botones.
  var erroneos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //
  //-----------------------------------------------------------------------------------------
  //

  //FUNCIONES

  //Funcion para bloquear botones "Registrarse", "Atras" y "Siguiente" basado
  //en la cantidad de errores representados como 1 en erroneos[]
  const desbloqBloqBoton = () => {
    let suma = 0;
    var estadoInputs = null;

    for (let i = 0; i < erroneos.length; i++) {
      suma = suma + erroneos[i];
    }

    if (suma != 0) {
      estadoInputs = false;
    } else {
      if (suma == 0) {
        estadoInputs = true;
      }
    }

    if (estadoInputs == false) {
      btnSiguiente.setAttribute("disabled", "");
      btnSiguiente.classList.replace("btnSigue-1", "btnSigue-2");

      btnRegistrarseM.setAttribute("disabled", "");
      btnRegistrarseM.classList.replace("btnRegistrarFM-1", "btnRegistrarFM-2");

      btnRegistrarseA.setAttribute("disabled", "");
      btnRegistrarseA.classList.replace("btnRegistrarFA-1", "btnRegistrarFA-2");

      btnAtrasM.setAttribute("disabled", "");
      btnAtrasM.classList.replace("btnAtrasFM-1", "btnAtrasFM-2");

      btnAtrasA.setAttribute("disabled", "");
      btnAtrasA.classList.replace("btnAtrasFA-1", "btnAtrasFA-2");
    } else {
      if (estadoInputs == true) {
        if (btnSiguiente.getAttribute("disabled") != null) {
          btnSiguiente.removeAttribute("disabled");
          btnSiguiente.classList.replace("btnSigue-2", "btnSigue-1");
        }

        if (btnAtrasM.getAttribute("disabled") != null) {
          btnAtrasM.removeAttribute("disabled");
          btnAtrasM.classList.replace("btnAtrasFM-2", "btnAtrasFM-1");
        }

        if (btnAtrasA.getAttribute("disabled") != null) {
          btnAtrasA.removeAttribute("disabled");
          btnAtrasA.classList.replace("btnAtrasFA-2", "btnAtrasFA-1");
        }

        if (btnRegistrarseM.getAttribute("disabled") != null) {
          btnRegistrarseM.removeAttribute("disabled");
          btnRegistrarseM.classList.replace(
            "btnRegistrarFM-2",
            "btnRegistrarFM-1"
          );
        }

        if (btnRegistrarseA.getAttribute("disabled") != null) {
          btnRegistrarseA.removeAttribute("disabled");
          btnRegistrarseA.classList.replace(
            "btnRegistrarFA-2",
            "btnRegistrarFA-1"
          );
        }
      }
    }

    return estadoInputs;
    
  };

  const verificarErroneos = (indice, numero) => {
    erroneos[indice] = numero;
    desbloqBloqBoton();
  };

  const cambiarSpanRegistro = (numero) => {
    if (numero == 1) {
      spanRegisPer.textContent = "Datos Personales";
    }
    if (numero == 2) {
      spanRegisPer.textContent = "Datos del Nuevo Miembro";
    }
    if (numero == 3) {
      spanRegisPer.textContent = "Datos del Nuevo Administrador";
    }
  };

  //
  //-----------------------------------------------------------------------------------------
  //

  //EVENTOS

  //
  //NOMBRE INPUT (Registro.php)
  nombreRegisInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  nombreRegisInput.addEventListener("input", () => {
    let nombre = nombreRegisInput.value;
    let estNombre = null;

    if (nombre.length == 0) {
      spanErrNombre.textContent = "#";
      spanErrNombre.style.opacity = "0";

      verificarErroneos(0, 0);
    }
    if (nombre.length != 0) {
      for1: for (let i = 0; i < nombre.length; i++) {
        let letraActual = nombre.charAt(i).toLowerCase();
        for2: for (let e = 0; e < letras.length; e++) {
          if (letraActual == letras.charAt(e)) {
            estNombre = true;
            break for2;
          } else {
            estNombre = false;
          }
        }
        if (estNombre == false) {
          break for1;
        }
      }

      if (estNombre == false) {
        spanErrNombre.textContent =
          "No utilice números ni caracteres especiales";
        spanErrNombre.style.opacity = "1";

        verificarErroneos(0, 1);
      } else {
        if (estNombre == true) {
          spanErrNombre.textContent = "#";
          spanErrNombre.style.opacity = "0";

          verificarErroneos(0, 0);
        }
      }
    }
  });

  //
  //APELLIDO INPUT (Registro.php)
  apellidoRegisInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  apellidoRegisInput.addEventListener("input", (e) => {
    let apellido = apellidoRegisInput.value;
    let estApellido = null;

    if (apellido.length == 0) {
      spanErrApellido.textContent = "#";
      spanErrApellido.style.opacity = "0";

      verificarErroneos(1, 0);
    }

    if (apellido.length != 0) {
      for1: for (let i = 0; i < apellido.length; i++) {
        let letraActual = apellido.charAt(i).toLowerCase();

        for2: for (let e = 0; e < letras.length; e++) {
          if (letraActual == letras.charAt(e)) {
            estApellido = true;
            break for2;
          } else {
            estApellido = false;
          }
        }

        if (estApellido == false) {
          break for1;
        }
      }

      if (estApellido == false) {
        spanErrApellido.textContent =
          "No utilice números ni caracteres especiales";
        spanErrApellido.style.opacity = "1";

        verificarErroneos(1, 1);
      } else {
        if (estApellido == true) {
          spanErrApellido.textContent = "#";
          spanErrApellido.style.opacity = "0";

          verificarErroneos(1, 0);
        }
      }
    }
  });

  //
  //DOCUMENTO INPUT (Registro.php)
  documentoInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  //Verificar errores (Sin letras ni caracteres especiales)
  documentoInput.addEventListener("input", (e) => {
    let documento = documentoInput.value.trim();
    let estDocumento = null;

    if (documento.length == 0) {
      spanErrDocumento.textContent = "#";
      spanErrDocumento.style.opacity = "0";

      verificarErroneos(2, 0);
    }

    if (documento.length != 0) {
      if (documento.length < 7 || documento.length > 11) {
        spanErrDocumento.textContent = "Número de Documento inválido";
        spanErrDocumento.style.opacity = "1";

        verificarErroneos(2, 1);
      } else {
        for1: for (let i = 0; i < documento.length; i++) {
          let letraActual = documento.charAt(i).toLowerCase();

          for2: for (let e = 0; e < numeros.length; e++) {
            if (letraActual == numeros.charAt(e)) {
              estDocumento = true;
              break for2;
            } else {
              estDocumento = false;
            }
          }

          if (estDocumento == false) {
            break for1;
          }
        }

        if (estDocumento == false) {
          spanErrDocumento.textContent =
            "No utilice letras ni caracteres especiales";
          spanErrDocumento.style.opacity = "1";

          verificarErroneos(2, 1);
        } else {
          if (estDocumento == true) {
            spanErrDocumento.textContent = "#";
            spanErrDocumento.style.opacity = "0";

            verificarErroneos(2, 0);
          }
        }
      }
    }
  });

  //Comprobamos si existe un Documento similar en la base de datos
  //si es así, bloquear boton "Siguiente"
  documentoInput.addEventListener("input", (e) => {
    if (documentoInput.value.length != 0 && erroneos[2] == 0) {
      let documentTamanio = documentoInput.value;

      if (
        documentTamanio.length > 6 &&
        documentTamanio.length <= 11 &&
        documentTamanio.length != 0
      ) {
        let documentoComprobar = documentoInput.value;

        let formDocumentoVerificar = new FormData();

        formDocumentoVerificar.append(
          "documentoExistencia",
          documentoComprobar
        );
        formDocumentoVerificar.append("userVerifi", true);

        fetch(urlConsultarUser, {
          method: "POST",
          body: formDocumentoVerificar,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data == true) {
              spanErrDocumento.textContent = "El documento ya está registrado";
              spanErrDocumento.style.opacity = "1";
              verificarErroneos(3, 1);
            } else {
              if (data == false) {
                spanErrDocumento.textContent = "#";
                spanErrDocumento.style.opacity = "0";
                verificarErroneos(3, 0);
              }
            }
          })
          .catch((err) => console.log(err));
      }
    }
  });

  //
  //FECHA NACIMIENTO INPUT (Registro.php)
  fechaNInputRegis.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  //Verfificamos que la fecha de nacimiento sea lógica
  fechaNInputRegis.addEventListener("input", () => {
    let fecha = null;

    if (fechaNInputRegis.value != "") {
      fecha = fechaNInputRegis.value.trim();
    }

    let formFechaVerificar = new FormData();

    formFechaVerificar.append("fechaVerificar", fecha);
    formFechaVerificar.append("userVerifi", true);

    fetch(urlConsultarUser, {
      method: "POST",
      body: formFechaVerificar,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == false) {
          spanErrNacimiento.textContent = "Digite su fecha de nacimiento";
          spanErrNacimiento.style.opacity = "1";

          verificarErroneos(4, 1);
        } else {
          if (data == true) {
            spanErrNacimiento.textContent = "#";
            spanErrNacimiento.style.opacity = "0";

            verificarErroneos(4, 0);
          }
        }
      })
      .catch((err) => console.log(err));
  });

  //
  //TELEFONO INPUT EVENTO (Registro.php) - INICIO
  telefonoInputRegis.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  telefonoInputRegis.addEventListener("input", (e) => {
    let telefono = telefonoInputRegis.value.trim();
    let estTelefono = null;

    if (telefono.length == 0) {
      spanErrTelefono.textContent = "#";
      spanErrTelefono.style.opacity = "0";

      verificarErroneos(5, 0);
    }

    if (telefono.length != 0) {
      for1: for (let i = 0; i < telefono.length; i++) {
        let letraActual = telefono.charAt(i);

        for2: for (let e = 0; e < numeros2.length; e++) {
          if (letraActual == numeros2.charAt(e)) {
            estTelefono = true;
            break for2;
          } else {
            estTelefono = false;
          }
        }

        if (estTelefono == false) {
          break for1;
        }
      }

      if (estTelefono == false) {
        spanErrTelefono.textContent =
          "No utilice letras ni caracteres especiales";
        spanErrTelefono.style.opacity = "1";

        verificarErroneos(5, 1);
      } else {
        if (estTelefono == true) {
          spanErrTelefono.textContent = "#";
          spanErrTelefono.style.opacity = "0";

          verificarErroneos(5, 0);
        }
      }
    }
  });

  //Comprobamos si existe un número de teléfono similar en la base de datos
  //si es así, bloquear boton "Siguiente"
  telefonoInputRegis.addEventListener("input", (e) => {
    if (erroneos[5] == 0 && telefonoInputRegis.value.length != 0) {
      let telefonoExistente = telefonoInputRegis.value;

      let formTelefVerificar = new FormData();

      formTelefVerificar.append("telefExistencia", telefonoExistente);
      formTelefVerificar.append("userVerifi", true);

      fetch(urlConsultarUser, {
        method: "POST",
        body: formTelefVerificar,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data == true) {
            spanErrTelefono.textContent = "Este número ya está registrado";
            spanErrTelefono.style.opacity = "1";
            verificarErroneos(6, 1);
          } else {
            if (data == false) {
              spanErrTelefono.textContent = "#";
              spanErrTelefono.style.opacity = "0";
              verificarErroneos(6, 0);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  });

  //
  //DIRECCIÓN INPUT (Registro.php)
  direccInputRegis.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  direccInputRegis.addEventListener("input", (e) => {
    let direccion = direccInputRegis.value;

    if (direccion.length == 0) {
      spanErrDirecc.textContent = "#";
      spanErrDirecc.style.opacity = "0";

      verificarErroneos(7, 0);
    } else {
      if (direccion.length < 10) {
        spanErrDirecc.textContent = "La dirección es muy corta";
        spanErrDirecc.style.opacity = "1";

        verificarErroneos(7, 1);
      } else {
        if (direccion.length > 10) {
          spanErrDirecc.textContent = "#";
          spanErrDirecc.style.opacity = "0";

          verificarErroneos(7, 0);
        }
      }
    }
  });

  //
  //TIPO MIEMBRO SELECT (Registro.php)
  inputSelectRol.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  inputSelectRol.addEventListener("input", () => {
    let seleccion = inputSelectRol.options[inputSelectRol.selectedIndex].text;

    if (seleccion == "Usuario" || seleccion == "Administrador") {
      verificarErroneos(8, 0);
      sparErrTipoUser.style.opacity = "0";
      sparErrTipoUser.textContent = "#";
    } else {
      verificarErroneos(8, 1);
      sparErrTipoUser.textContent = "Rol inválido";
      sparErrTipoUser.style.opacity = "1";
    }
  });

  //
  //MIEMBRO INPUT CORREO (Registro.php)
  inputCorreo.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  inputCorreo.addEventListener("input", (e) => {
    let correo = inputCorreo.value;
    let arrobaNumber = 0;
    let estCorreo = null;

    if (correo.length == 0) {
      spanErrCorreoMiembro.textContent = "#";
      spanErrCorreoMiembro.style.opacity = "0";

      verificarErroneos(9, 0);
    }

    if (correo.length != 0) {
      for (let i = 0; i < correo.length; i++) {
        if (correo.charAt(i) == "@") {
          arrobaNumber++;
        }
      }

      if (arrobaNumber != 1) {
        estCorreo = false;
      } else {
        estCorreo = true;
      }

      if (estCorreo == false) {
        spanErrCorreoMiembro.textContent = "El correo es inválido";
        spanErrCorreoMiembro.style.opacity = "1";

        verificarErroneos(9, 1);
      } else {
        if (estCorreo == true) {
          spanErrCorreoMiembro.textContent = "#";
          spanErrCorreoMiembro.style.opacity = "0";

          verificarErroneos(9, 0);
        }
      }
    }
  });

  inputCorreo.addEventListener("input", () => {
    if (erroneos[9] == 0 && inputCorreo.value.length != 0) {
      let correoExistente = inputCorreo.value;

      let formCorreoVerificar = new FormData();

      formCorreoVerificar.append("correoExistencia", correoExistente);
      formCorreoVerificar.append("userVerifi", true);

      fetch(urlConsultarUser, {
        method: "POST",
        body: formCorreoVerificar,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data == true) {
            spanErrCorreoMiembro.textContent = "Este correo ya está en uso";
            spanErrCorreoMiembro.style.opacity = "1";
            verificarErroneos(10, 1);
          } else {
            if (data == false) {
              spanErrCorreoMiembro.textContent = "#";
              spanErrCorreoMiembro.style.opacity = "0";
              verificarErroneos(10, 0);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  });

  //
  //ADMIN INPUT CORREO (Registro.php)
  correoAdminInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  correoAdminInput.addEventListener("input", (e) => {
    let correoA = correoAdminInput.value;
    let arrobaNumber = 0;
    let estCorreoA = null;

    if (correoA.length == 0) {
      spanErrCorreoAdmi.textContent = "#";
      spanErrCorreoAdmi.style.opacity = "0";

      desbloqBloqBoton();
    }

    if (correoA.length != 0) {
      for (let i = 0; i < correoA.length; i++) {
        if (correoA.charAt(i) == "@") {
          arrobaNumber += 1;
        }
      }

      if (arrobaNumber != 1) {
        estCorreoA = false;
      } else {
        estCorreoA = true;
      }

      if (estCorreoA == false) {
        spanErrCorreoAdmi.textContent = "El correo es inválido";
        spanErrCorreoAdmi.style.opacity = "1";

        verificarErroneos(11, 1);
      } else {
        if (estCorreoA == true) {
          spanErrCorreoAdmi.textContent = "#";
          spanErrCorreoAdmi.style.opacity = "0";

          verificarErroneos(11, 0);
        }
      }
    }
  });

  //Comprobamos si existe un correo similar en la base de datos
  //si es así, bloquear boton "Siguiente"
  correoAdminInput.addEventListener("input", () => {
    if (erroneos[11] == 0 && correoAdminInput.value.length != 0) {
      let correoAdminExis = correoAdminInput.value;

      let formCorreoAVerifi = new FormData();

      formCorreoAVerifi.append("correoExisteAdmin", correoAdminExis);
      formCorreoAVerifi.append("userVerifi", true);

      fetch(urlConsultarUser, {
        method: "POST",
        body: formCorreoAVerifi,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data == true) {
            spanErrCorreoAdmi.textContent = "Este correo ya está en uso";
            spanErrCorreoAdmi.style.opacity = "1";
            verificarErroneos(12, 1);
          } else {
            if (data == false) {
              spanErrCorreoAdmi.textContent = "#";
              spanErrCorreoAdmi.style.opacity = "0";
              verificarErroneos(12, 0);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  });

  //
  //INPUT CONTRASEÑA (Registro.php)
  inputContraseña.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  inputContraseña.addEventListener("input", () => {
    let valor1 = inputContraseña.value.trim();
    let valor2 = inputContraConfir.value.trim();

    if (valor1 == "" && valor2 == "") {
      verificarErroneos(13, 0);
      verificarErroneos(14, 0);

      contraNoCoincide.textContent = "#";
      contraNoCoincide.style.opacity = "0";
    }

    if (valor1 != valor2 && valor1.length >= 9) {
      contraNoCoincide.textContent = "Las contraseñas NO coinciden";
      contraNoCoincide.style.opacity = "1";

      verificarErroneos(13, 1);
      verificarErroneos(14, 1);
    } else {
      if (valor1 != valor2 && valor1.length < 9) {
        contraNoCoincide.textContent = "La contraseña es muy corta";
        contraNoCoincide.style.opacity = "1";

        verificarErroneos(13, 1);
        verificarErroneos(14, 1);
      } else {
        if (valor1 == valor2 && valor1.length >= 9) {
          contraNoCoincide.textContent = "#";
          contraNoCoincide.style.opacity = "0";

          verificarErroneos(13, 0);
          verificarErroneos(14, 0);
        }
      }
    }
  });

  inputContraConfir.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  inputContraConfir.addEventListener("input", () => {
    let valor1 = inputContraseña.value.trim();
    let valor2 = inputContraConfir.value.trim();

    if (valor1 == "" && valor2 == "") {
      verificarErroneos(13, 0);
      verificarErroneos(14, 0);

      contraNoCoincide.textContent = "#";
      contraNoCoincide.style.opacity = "0";
    }

    if (valor1 != valor2 && valor1.length >= 9) {
      contraNoCoincide.textContent = "Las contraseñas NO coinciden";
      contraNoCoincide.style.opacity = "1";

      verificarErroneos(13, 1);
      verificarErroneos(14, 1);
    } else {
      if (valor1 != valor2 && valor1.length < 9) {
        contraNoCoincide.textContent = "La contraseña es muy corta";
        contraNoCoincide.style.opacity = "1";

        verificarErroneos(13, 1);
        verificarErroneos(14, 1);
      } else {
        if (valor1 == valor2 && valor1.length >= 9) {
          contraNoCoincide.textContent = "#";
          contraNoCoincide.style.opacity = "0";

          verificarErroneos(13, 0);
          verificarErroneos(14, 0);
        }
      }
    }
  });

  //
  //INPUT CONTRASEÑA ADMIN (Registro.php)
  inputContraseña2.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  inputContraseña2.addEventListener("input", () => {
    let valor1 = inputContraseña2.value.trim();
    let valor2 = inputContraConfir2.value.trim();

    if (valor1 == "" && valor2 == "") {
      verificarErroneos(15, 0);
      verificarErroneos(16, 0);

      contraNoCoincide.textContent = "#";
      contraNoCoincide.style.opacity = "0";
    }

    if (valor1 != valor2 && valor1.length >= 9) {
      contraNoCoincideA.textContent = "Las contraseñas NO coinciden";
      contraNoCoincideA.style.opacity = "1";

      verificarErroneos(15, 1);
      verificarErroneos(16, 1);
    } else {
      if (valor1 != valor2 && valor1.length < 9) {
        contraNoCoincideA.textContent = "La contraseña es muy corta";
        contraNoCoincideA.style.opacity = "1";

        verificarErroneos(15, 1);
        verificarErroneos(16, 1);
      } else {
        if (valor1 == valor2 && valor1.length >= 9) {
          contraNoCoincideA.textContent = "#";
          contraNoCoincideA.style.opacity = "0";

          verificarErroneos(15, 0);
          verificarErroneos(16, 0);
        }
      }
    }
  });

  inputContraConfir2.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  inputContraConfir2.addEventListener("input", () => {
    let valor1 = inputContraseña2.value.trim();
    let valor2 = inputContraConfir2.value.trim();

    if (valor1 == "" && valor2 == "") {
      verificarErroneos(15, 0);
      verificarErroneos(16, 0);

      contraNoCoincide.textContent = "#";
      contraNoCoincide.style.opacity = "0";
    }

    if (valor1 != "" && valor2 != "") {
      if (valor1 != valor2 && valor1.length >= 9) {
        contraNoCoincideA.textContent = "Las contraseñas NO coinciden";
        contraNoCoincideA.style.opacity = "1";

        verificarErroneos(15, 1);
        verificarErroneos(16, 1);
      } else {
        if (valor1 != valor2 && valor1.length < 9) {
          contraNoCoincideA.textContent = "La contraseña es muy corta";
          contraNoCoincideA.style.opacity = "1";

          verificarErroneos(15, 1);
          verificarErroneos(16, 1);
        } else {
          if (valor1 == valor2 && valor1.length >= 9) {
            contraNoCoincideA.textContent = "#";
            contraNoCoincideA.style.opacity = "0";

            verificarErroneos(15, 0);
            verificarErroneos(16, 0);
          }
        }
      }
    }
  });

  //
  //INPUT EMPRESA
  empresaInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  //
  //INPUT NIT (Registro.php)
  inputNit.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  inputNit.addEventListener("input", (e) => {
    let nit = inputNit.value.trim();
    let estNit = null;

    if (nit.length == 0) {
      spanErrNit.textContent = "#";
      spanErrNit.style.opacity = "0";

      verificarErroneos(17, 0);
    }

    if (nit.length != 0) {
      for1: for (let i = 0; i < nit.length; i++) {
        let letraActual = nit.charAt(i);

        for2: for (let e = 0; e < numeros3.length; e++) {
          if (letraActual == numeros3.charAt(e)) {
            estNit = true;
            break for2;
          } else {
            estNit = false;
          }
        }

        if (estNit == false) {
          break for1;
        }
      }

      if (estNit == false) {
        spanErrNit.textContent = "No use letras ni caracteres especiales";
        spanErrNit.style.opacity = "1";

        verificarErroneos(17, 1);
      } else {
        if (estNit == true) {
          spanErrNit.textContent = "#";
          spanErrNit.style.opacity = "0";

          verificarErroneos(17, 0);
        }
      }
    }
  });

  //
  //INPUT CODIGO DE ACCESO (Registro.php)
  inputCodigoAcce.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });

  //
  //--------------------------------------------------------------------------
  //

  btnSiguiente.addEventListener("click", (e) => {
    
    e.preventDefault();
    if (
      nombreRegisInput.value == "" ||
      nombreRegisInput.value == null ||
      apellidoRegisInput.value == "" ||
      apellidoRegisInput.value == null ||
      documentoInput.value == "" ||
      documentoInput.value == null ||
      fechaNInputRegis.value == "" ||
      fechaNInputRegis.value == null ||
      telefonoInputRegis.value == "" ||
      telefonoInputRegis.value == null ||
      direccInputRegis.value == "" ||
      direccInputRegis.value == null ||
      (inputSelectRol.options[inputSelectRol.selectedIndex].text !=
        "Usuario" &&
        inputSelectRol.options[inputSelectRol.selectedIndex].text !=
          "Administrador")
    ) {
      sparErrTipoUser.textContent = "Debe llenar los campos";
      sparErrTipoUser.style.opacity = "1";
      
    } else {
      if (sparErrTipoUser.textContent == "Debe llenar los campos") {
        sparErrTipoUser.textContent = "#";
        sparErrTipoUser.style.opacity = "0";
      }
      if (
        nombreRegisInput.value != "" &&
        apellidoRegisInput.value != "" &&
        documentoInput.value !== "" &&
        fechaNInputRegis.value !== "" &&
        telefonoInputRegis.value !== "" &&
        direccInputRegis.value !== "" &&
        inputSelectRol.options[inputSelectRol.selectedIndex].text ==
          "Usuario"
      ) {
        if (formRegisF1.classList.contains("formRegisF1")) {
          formRegisF1.classList.replace("formRegisF1", "formRegisF1B");
          if (!formRegisF2.classList.contains("formRegisF2")) {
            formRegisF2.classList.replace("formRegisF2B", "formRegisF2");
          }
          posicionFormRegis = 2;
          cambiarSpanRegistro(posicionFormRegis);
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
        btnAtrasM.addEventListener("click", (e) => {
          e.preventDefault();
          posicionFormRegis = 1;
          cambiarSpanRegistro(posicionFormRegis);
          if (formRegisF1.classList.contains("formRegisF1B")) {
            formRegisF1.classList.replace("formRegisF1B", "formRegisF1");
            if (!formRegisF2.classList.contains("formRegisF2B")) {
              formRegisF2.classList.replace("formRegisF2", "formRegisF2B");
            }
          }
        });
        btnAtrasA.addEventListener("click", (e) => {
          e.preventDefault();
          posicionFormRegis = 1;
          cambiarSpanRegistro(posicionFormRegis);
          if (formRegisF1.classList.contains("formRegisF1B")) {
            formRegisF1.classList.replace("formRegisF1B", "formRegisF1");
            if (!formRegisF3.classList.contains("formRegisF3B")) {
              formRegisF3.classList.replace("formRegisF3", "formRegisF3B");
            }
          }
        });
      }
      if (
        nombreRegisInput.value != "" &&
        apellidoRegisInput.value != "" &&
        documentoInput.value !== "" &&
        fechaNInputRegis.value !== "" &&
        telefonoInputRegis.value !== "" &&
        direccInputRegis.value !== "" &&
        inputSelectRol.options[inputSelectRol.selectedIndex].text ==
          "Administrador"
      ) {
        if (formRegisF1.classList.contains("formRegisF1")) {
          formRegisF1.classList.replace("formRegisF1", "formRegisF1B");
          if (!formRegisF3.classList.contains("formRegisF3")) {
            formRegisF3.classList.replace("formRegisF3B", "formRegisF3");
          }
          posicionFormRegis = 3;
          cambiarSpanRegistro(posicionFormRegis);
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
        btnAtrasA.addEventListener("click", (e) => {
          e.preventDefault();
          posicionFormRegis = 1;
          cambiarSpanRegistro(posicionFormRegis);
          if (formRegisF1.classList.contains("formRegisF1B")) {
            formRegisF1.classList.replace("formRegisF1B", "formRegisF1");
            if (!formRegisF3.classList.contains("formRegisF3B")) {
              formRegisF3.classList.replace("formRegisF3", "formRegisF3B");
            }
          }
        });
      }
    }
  });

  btnRegistrarseM.addEventListener("click", (e) => {
    e.preventDefault();
    var estadoBTN = desbloqBloqBoton();
    if (
      inputCorreo.value == "" ||
      inputCorreo.value == null ||
      inputContraseña.value == "" ||
      inputContraseña.value == null ||
      inputContraConfir.value == "" ||
      inputContraConfir.value == null ||
      empresaInput.value == "" ||
      empresaInput.value == null ||
      inputNit.value == "" ||
      inputNit.value == null
    ) {
        
      spanErrNit.textContent = "Debe llenar los campos";
      spanErrNit.style.opacity = "1";
      
    } else {
      
      if (estadoBTN != false) {
          
        spanErrNit.textContent = "Redireccionando...";
        spanErrNit.classList.replace("spanErr", "spanRegisAdminExito");
        spanErrNit.style.opacity = "1";

        inputNomM.value = nombreRegisInput.value;
        inputApeM.value = apellidoRegisInput.value;
        inputDocuM.value = documentoInput.value;
        inputFechaM.value = fechaNInputRegis.value;
        inputTelefM.value = telefonoInputRegis.value;
        inputDireccM.value = direccInputRegis.value;
        inputRolM.value =
          inputSelectRol.options[inputSelectRol.selectedIndex].text;
        inputCorreoM.value = inputCorreo.value;
        inputContraM.value = inputContraseña.value;
        inputEmpreM.value = empresaInput.value;
        inputNitM.value = inputNit.value;
        inputCorreoA.value = correoAdminInput.value;
        inputContraA.value = inputContraseña2.value;

        nombreRegisInput.value = "";
        apellidoRegisInput.value = "";
        documentoInput.value = "";
        fechaNInputRegis.value = "";
        telefonoInputRegis.value = "";
        direccInputRegis.value = "";
        inputSelectRol.value = "";
        inputCorreo.value = "";
        correoAdminInput.value = "";
        empresaInput.value = "";
        inputContraseña.value = "";
        inputContraConfir.value = "";
        inputContraseña2.value = "";
        inputContraConfir2.value = "";
        inputNit.value = "";
        inputCodigoAcce.value = "";
        correoAdminInput.value = "";
        inputContraseña2.value = "";

        formRegistrarseM.submit();
      }
    }
  });

  btnRegistrarseA.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      correoAdminInput.value == "" ||
      correoAdminInput.value == null ||
      inputContraseña2.value == "" ||
      inputContraseña2.value == null ||
      inputContraConfir2.value == "" ||
      inputContraConfir2.value == null ||
      inputCodigoAcce.value == "" ||
      inputCodigoAcce.value == null
    ) {
        
      spanErrCodigoAcc.textContent = "Debe llenar los campos";
      spanErrCodigoAcc.style.opacity = "1";
      
    } else {
      
      estadoBTNA = desbloqBloqBoton();

      if (estadoBTNA != false) {

        let codAcceso = inputCodigoAcce.value.trim();

        let formRegisAdmin = new FormData();

        formRegisAdmin.append("codigoAcceso", codAcceso);
        formRegisAdmin.append("userVerifi", true);

        fetch(urlConsultarUser, {
          method: "POST",
          body: formRegisAdmin,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data == null) {
              e.preventDefault();
              spanErrCodigoAcc.textContent =
                "El código es incorrecto, intente de nuevo";
              spanErrCodigoAcc.style.opacity = "1";
            } else {
              if (data != null) {
                  
                e.preventDefault();

                inputNomM.value = nombreRegisInput.value;
                inputApeM.value = apellidoRegisInput.value;
                inputDocuM.value = documentoInput.value;
                inputFechaM.value = fechaNInputRegis.value;
                inputTelefM.value = telefonoInputRegis.value;
                inputDireccM.value = direccInputRegis.value;
                inputRolM.value =
                  inputSelectRol.options[inputSelectRol.selectedIndex].text;
                inputCorreoM.value = inputCorreo.value;
                inputContraM.value = inputContraseña.value;
                inputEmpreM.value = empresaInput.value;
                inputNitM.value = inputNit.value;
                inputCorreoA.value = correoAdminInput.value;
                inputContraA.value = inputContraseña2.value;

                nombreRegisInput.value = "";
                apellidoRegisInput.value = "";
                documentoInput.value = "";
                fechaNInputRegis.value = "";
                telefonoInputRegis.value = "";
                direccInputRegis.value = "";
                inputSelectRol.value = "";
                inputCorreo.value = "";
                correoAdminInput.value = "";
                empresaInput.value = "";
                inputContraseña.value = "";
                inputContraConfir.value = "";
                inputContraseña2.value = "";
                inputContraConfir2.value = "";
                inputNit.value = "";
                inputCodigoAcce.value = "";
                correoAdminInput.value = "";
                inputContraseña2.value = "";

                formRegistrarseM.submit();

              }
            }
          })
          .catch((err) => console.log(err));
      }
    }
  });

  btnCancelarRegis1.addEventListener("click", (e) => {
    e.preventDefault();
    nombreRegisInput.value = "";
    apellidoRegisInput.value = "";
    documentoInput.value = "";
    fechaNInputRegis.value = "";
    telefonoInputRegis.value = "";
    direccInputRegis.value = "";
    inputSelectRol.value = "";
    inputCorreo.value = "";
    correoAdminInput.value = "";
    inputContraseña.value = "";
    inputContraConfir.value = "";
    inputContraseña2.value = "";
    inputContraConfir2.value = "";
    empresaInput.value = "";
    inputNit.value = "";
    inputCodigoAcce.value = "";
    window.location.href = "index.php";
  });

  btnCancelarRegisM.addEventListener("click", (e) => {
    e.preventDefault();
    nombreRegisInput.value = "";
    apellidoRegisInput.value = "";
    documentoInput.value = "";
    fechaNInputRegis.value = "";
    telefonoInputRegis.value = "";
    direccInputRegis.value = "";
    inputSelectRol.value = "";
    inputCorreo.value = "";
    correoAdminInput.value = "";
    inputContraseña.value = "";
    inputContraConfir.value = "";
    inputContraseña2.value = "";
    inputContraConfir2.value = "";
    empresaInput.value = "";
    inputNit.value = "";
    inputCodigoAcce.value = "";
    window.location.href = "index.php";
  });

  btnCancelarRegisA.addEventListener("click", (e) => {
    e.preventDefault();
    nombreRegisInput.value = "";
    apellidoRegisInput.value = "";
    documentoInput.value = "";
    fechaNInputRegis.value = "";
    telefonoInputRegis.value = "";
    direccInputRegis.value = "";
    inputSelectRol.value = "";
    inputCorreo.value = "";
    correoAdminInput.value = "";
    inputContraseña.value = "";
    inputContraConfir.value = "";
    inputContraseña2.value = "";
    inputContraConfir2.value = "";
    empresaInput.value = "";
    inputNit.value = "";
    inputCodigoAcce.value = "";
    window.location.href = "index.php";
  });

  //
  //--------------------------------------------------------------------------
  //

  ojoIconoA.addEventListener("click", (e) => {
    if (ojoIconoA.classList.contains("ojoIconA")) {
      ojoIconoA.classList.replace("ojoIconA", "ojoIconA2");
      ojoIconoC.classList.replace("ojoIconC2", "ojoIconC");
      inputContraseña.removeAttribute("type");
      inputContraseña.setAttribute("type", "text");
      inputContraConfir.removeAttribute("type");
      inputContraConfir.setAttribute("type", "text");
    }
  });

  ojoIconoC.addEventListener("click", (e) => {
    if (ojoIconoC.classList.contains("ojoIconC")) {
      ojoIconoA.classList.replace("ojoIconA2", "ojoIconA");
      ojoIconoC.classList.replace("ojoIconC", "ojoIconC2");
      inputContraseña.removeAttribute("type");
      inputContraseña.setAttribute("type", "password");
      inputContraConfir.removeAttribute("type");
      inputContraConfir.setAttribute("type", "password");
    }
  });

  ojoIconoA_A.addEventListener("click", (e) => {
    if (ojoIconoA_A.classList.contains("ojoIconAAdmi")) {
      ojoIconoA_A.classList.replace("ojoIconAAdmi", "ojoIconA2Admi");
      ojoIconoC_A.classList.replace("ojoIconC2Admi", "ojoIconCAdmi");
      inputContraseña2.removeAttribute("type");
      inputContraseña2.setAttribute("type", "text");
      inputContraConfir2.removeAttribute("type");
      inputContraConfir2.setAttribute("type", "text");
    }
  });

  ojoIconoC_A.addEventListener("click", (e) => {
    if (ojoIconoC_A.classList.contains("ojoIconCAdmi")) {
      ojoIconoA_A.classList.replace("ojoIconA2Admi", "ojoIconAAdmi");
      ojoIconoC_A.classList.replace("ojoIconCAdmi", "ojoIconC2Admi");
      inputContraseña2.removeAttribute("type");
      inputContraseña2.setAttribute("type", "password");
      inputContraConfir2.removeAttribute("type");
      inputContraConfir2.setAttribute("type", "password");
    }
  });

  //
  //--------------------------------------------------------------------------
  //
};

//---------------------------
// <<-- Registro - FIN -->>
//---------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------
// <<-- Servicios CLI - INICIO -->>
//-----------------------------------

if(document.querySelector("#serviciosHTML-CLI") != null){

  //------------------------------------------------------------------------------------------------------------------------------
  // Tomando Elementos del DOM

    // CONTENEDORES
    const cuadroOPerfil = document.querySelector(".cuadroPOculto");
    
    // BOTONES
    const divPerfilFotoBtn = document.querySelector(".divPerfil");
    const ajustesCuentaBtn = document.querySelector("#ajustesCuentaBtn"); 
    const btnCerrarSesion = document.querySelector(".btnCerrar");

  //------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------------------------
  // FUNCIONES

    // (Función Inicial) Llenar catálogo de servicios
    const rangoServiContentGene = document.createRange();
    
    function catalogoServicios(){

      let formCatalogoServices = new FormData();

      formCatalogoServices.append("serviciosCLIMostrar", true);

      fetch(urlInfoClienteDB, {
        method: "POST",
        body: formCatalogoServices,
      })
        .then((response) => response.json())
        .then((data) => {

          let htmlServicios = "";

          if(data.length != 1){

            for(let i = 1; i < data.length; i++){

              htmlServicios += `
              <div id="divServi${(data[i]["id_producto"])}" class="divServicio divServi">
                <form 
                  id = "formServi${(data[i]["id_producto"])}" 
                  name = "formServi${(data[i]["id_producto"])}"
                  method = "post"
                  action = "realizarReserva-CLI.php"
                >
                  <input type="hidden" value="${(data[i]["id_producto"])}" name="idServiListaCli-ID">
                  <input type="hidden" value="${(data[i]["produNombre"])}" name="idServiListaCli-Name">
                </form>
                <div class="divImgGene divImgG">
                  <img src="images/productosImages/${data[i]["productoImgPrin"]}" alt="Imagen del Servicio">
                </div>
                <div class="divDatosGene divDatosG">
                  <span class="nombreServicio nomServi">${data[i]["produNombre"]}</span>
                  <div class="divDescri">
                    <p class="descriServi desServi">${data[i]["produDescri"]}</p>
                  </div>
                  <div class="btnDiv">
                    <button 
                      class="botonReseAhora" 
                      onclick="
                        enviarServiIDRese(
                          'formServi${(data[i]["id_producto"])}'
                        )
                      "
                    >
                      Reservar Ahora
                    </button>
                  </div>
                </div>
              </div>
              `;

            }

          }else{

            htmlServicios = `
            <div>
              <span>No se Encontraron Servicios para Ti</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.77 511.57"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M489.17,422.32c-29.91-29.59-59.47-59.54-89.42-89.09-4.14-4.09-4.32-6.88-1.47-11.75,25.25-43.13,34.35-89.56,27-139-8.15-54.69-34-99.72-76.62-134.58C302,9.77,248-5.1,188.39,1.53,142.54,6.62,102.08,25,68.8,57,9.4,114-12,183.79,6.38,263.86,30.07,367.24,129.17,439.79,241.71,425.74a202.19,202.19,0,0,0,80.88-28.07c4.16-2.53,6.62-2.32,10.11,1.2,29.85,30.13,60,60,89.83,90.1,9.69,9.79,19.56,19,33.35,22.6h19c6.47-2.43,13.09-4.45,18.67-8.83,8.32-6.52,14.16-14.65,16.95-24.9a25.91,25.91,0,0,1,1.31-3.2v-19C508.15,441.9,499,432,489.17,422.32Zm1.45,47.55c-3.22,18.64-25.75,27.48-40.69,15.8a71.78,71.78,0,0,1-6.22-5.75Q392.35,428.6,341,377.25c-8.54-8.53-11.69-8.92-21.62-2.46-28.6,18.62-59.82,29.18-94,30.93C171.23,408.49,124,391.86,83.86,355.4,51.7,326.19,32.43,289.81,24.43,247.3c-2.09-11.13-2.72-22.41-2.94-33.76,1.77-67.18,29.63-120.74,84.8-159.39,24.88-17.43,52.91-27.68,83.17-31.31,46.8-5.6,90.35,3.88,129.78,29.77,37.22,24.44,63.07,58.06,77.4,100.37a186.51,186.51,0,0,1,9.91,62.7c-.5,36-10.11,69.51-29.38,100.09-1,1.55-2,3.08-3,4.63-5.23,8.27-4.8,12.36,2.16,19.33q52.54,52.59,105.16,105.12C488.56,451.85,492.37,459.69,490.62,469.87Z"/><path d="M270.1,67.47a104.63,104.63,0,0,0-20.51-6.15c-6-1.15-11.11,2-12.47,7.28-1.47,5.7,1,10.46,6.77,12.74a58,58,0,0,0,5.71,1.75c59.43,16.6,99.38,69,99.51,135.57.24,22.56-7.06,48.16-22.92,70.57-31.88,45.07-75.85,64.6-130.75,58.35-30.33-3.45-56.4-16.76-77.56-38.49C87.41,277.82,74.12,239.9,80,196.52c7.07-52.15,36.17-88.05,84.37-108.72,3.2-1.37,6.59-2.46,9.51-4.3a9.45,9.45,0,0,0,4.45-10.77,10.22,10.22,0,0,0-9.06-8.14c-2.86-.4-5.57.72-8.23,1.65C102.38,86.82,60.09,143.51,57.56,205.64c-1.72,42.19,11.09,79.55,38.89,111.55,43.44,50,116.39,66.92,177.45,41.21,68.27-28.74,107.71-99.79,93.94-172.48C357.08,129.08,323.62,89.65,270.1,67.47Z"/><path d="M166.16,151.9a10.3,10.3,0,0,0-15.67,7.78c-.49,4.37,2,7.53,4.91,10.42q19.59,19.58,39.15,39.18c5,5,5.06,3.76-.17,9q-19.55,19.62-39.14,39.18c-3,3-5.53,6.35-4.61,11a10.42,10.42,0,0,0,7.16,8.26c4.52,1.56,8.16-.19,11.28-3.31q20-19.89,39.9-39.83c5.71-5.68,4.13-5.71,9.69-.18q19.64,19.53,39.17,39.16c3.32,3.34,6.95,5.78,12,4.25,8.36-2.54,10.14-11.84,3.39-18.67q-20.34-20.58-41-40.88c-2.77-2.71-2.95-4.21-.06-7C245.72,197,259,183.47,272.45,170.07c2.64-2.63,5-5.39,5-9.86a10.43,10.43,0,0,0-6.77-9.16c-5.58-2.3-9.6.55-13.28,4.22C244,168.67,230.53,182,217.25,195.55c-2.59,2.64-4,2.77-6.68,0-13-13.31-26.26-26.41-39.47-39.55A26.61,26.61,0,0,0,166.16,151.9Z"/><path d="M207.16,78.15a10.23,10.23,0,0,0,10.48-10.33,10.29,10.29,0,1,0-20.57-.34A10.17,10.17,0,0,0,207.16,78.15Z"/></g></g></svg>
            </div>
            `;

          }

          rangoServiContentGene.selectNode(document.getElementsByTagName("div").item(0));
          const serviGeneLista =
            rangoServiContentGene.createContextualFragment(htmlServicios);
          document.querySelector("#catalogoServiGene").appendChild(serviGeneLista);

        })
        .catch((err) => console.log(err));

    }

    catalogoServicios();

  //------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------------------------
  // EVENTOS

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

  //------------------------------------------------------------------------------------------------------------------------------

};

//---------------------------------
// <<-- Servicios CLI - FIN -->>
//---------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------
// <<-- recuperarContraseña.php - INICIO -->>
//--------------------------------------------

if (document.querySelector(".recuvaContraHTML") !== null) {
  //SELECION OBJETOS DEL DOM
  //

  //CONTENEDORES
  const form2Contenedor = document.querySelector(".conteForm2");

  //FORM
  const formCambioPassConfir = document.querySelector("#formCambioPassConfir");

  //INPUTS
  const correoInput = document.querySelector(".correoExisRecuInput");
  const codigoInput = document.querySelector(".codigoInput");
  const inputOConfirmado = document.querySelector(".esend");

  //SPAN
  const spanErrCorreo = document.querySelector(".spanErrCorreo1");
  const spanErrCodigo = document.querySelector(".spanErrCodigo");
  const spanCorreoEnviar = document.querySelector(".spanCorreo2");

  //BOTONES
  const btnCancelar = document.querySelector(".btnCancelar");
  const btnEnviar = document.querySelector(".btnEnviar");
  const btnVerifCodi = document.querySelector(".btnCodiVerif");
  const aReenviarCodigo = document.querySelector(".reenviarA");

  //
  //SELECION OBJETOS DEL DOM

  //

  //EVENTOS
  //

  correoInput.addEventListener("input", (e) =>{
    
    var correo = correoInput.value;

    if (correo.length != 0) {
      let formCorreoRecuContra = new FormData();

      formCorreoRecuContra.append("correoRecuContra", correo);
      formCorreoRecuContra.append("userVerifi", true);

      fetch(urlConsultarUser, {
        method: "POST",
        body: formCorreoRecuContra,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data == true) {
            spanErrCorreo.textContent = "Correo Encontrado";
            spanErrCorreo.style.color = "#2d0";
            spanErrCorreo.style.opacity = "1";
            btnEnviar.classList.replace("btnEnv1", "btnEnv2");
            btnEnviar.removeAttribute("disabled");
          } else {
            if (data == false) {
              spanErrCorreo.textContent = "El Correo NO existe";
              spanErrCorreo.style.opacity = "1";
              spanErrCorreo.style.color = "#f30";
              if (btnEnviar.removeAttribute("disabled") == null) {
                btnEnviar.setAttribute("disabled", "");
                btnEnviar.classList.replace("btnEnv2", "btnEnv1");
              }
            }
          }
        })
        .catch((err) => console.log(err));
        
    } else {
        
      spanErrCorreo.textContent = "#";
      spanErrCorreo.style.opacity = "0";
      btnCancelar.classList.replace("btnCancelar1", "btnCancelar2");
      
      if (btnEnviar.removeAttribute("disabled") == null) {
          
        btnEnviar.setAttribute("disabled", "");
        btnEnviar.classList.replace("btnEnv2", "btnEnv1");
        
      }
      
    }
  });

  btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();

    if (correoInput.value.trim() != "") {
      btnEnviar.setAttribute("disabled", "");
      btnEnviar.classList.replace("btnEnv2", "btnEnv1");

      btnCancelar.setAttribute("disabled", "");
      btnCancelar.classList.replace("btnCan1", "btnCan2");

      let correo = correoInput.value.trim();
      var cod = "";

      let formRecuContra = new FormData();

      formRecuContra.append("correoUser", correo);
      formRecuContra.append("send", true);

      fetch(urlEnviContraRecu, {
        method: "POST",
        body: formRecuContra,
      })
        .then((response) => response.json())
        .then((data) => {
          
          cod = data;
          btnVerifCodi.addEventListener(
            "click",
            (funcionEnv1 = (e) => {
              e.preventDefault();
              
              let codigo = codigoInput.value;

              if (cod != codigo && codigo.length != 0) {
                  
                spanErrCodigo.textContent =
                  "El código es incorrecto, intente de nuevo";
                spanErrCodigo.style.opacity = "1";
                
              } else {
                if (cod == codigo && codigo.length != 0) {
                    
                  spanErrCodigo.textContent = "#";
                  spanErrCodigo.style.opacity = "0";
                  cod = "";
                  codigoInput.value = "";
                  correoInput.value = "";
                  
                  inputOConfirmado.value = spanCorreoEnviar.textContent;
                  document.getElementById("formCambioPassConfir").submit();
                  
                }
              }
            })
          );

          aReenviarCodigo.addEventListener("click", (e) => {
              
            cod = "";
            btnVerifCodi.removeEventListener("click", funcionEnv1);
            
            btnVerifCodi.setAttribute("disabled", "");
            let correo = correoInput.value.trim();

            let formRecuContraRe = new FormData();

            formRecuContraRe.append("correoUser", correo);
            formRecuContraRe.append("send", true);

            fetch(urlEnviContraRecu, {
              method: "POST",
              body: formRecuContraRe,
            })
              .then((response) => response.json())
              .then((data) => {
                cod = data;
                btnVerifCodi.removeAttribute("disabled");
                btnVerifCodi.addEventListener("click", (e) => {
                  e.preventDefault();

                  let codigo = codigoInput.value;

                  if (data != codigo && codigo.length != 0) {
                      
                    spanErrCodigo.textContent =
                      "El código es incorrecto, intente de nuevo";
                    spanErrCodigo.style.opacity = "1";
                    
                  } else {
                      
                    if (data == codigo && codigo.length != 0) {
                      spanErrCodigo.textContent = "#";
                      spanErrCodigo.style.opacity = "0";
                      cod = "";
                      codigoInput.value = "";
                      correoInput.value = "";
                      
                      inputOConfirmado.value = spanCorreoEnviar.textContent;
                      document.getElementById("formCambioPassConfir").submit();
                    }
                    
                  }
                });
              })
              .catch((err) => console.log(err));
          });

          spanCorreoEnviar.textContent = correoInput.value;
          spanErrCorreo.textContent = "Enviado";

          btnCancelar.removeAttribute("disabled");
          btnCancelar.classList.replace("btnCan1", "btnCan2");
          btnVerifCodi.style.cursor = "pointer";
          btnVerifCodi.removeAttribute("disabled");

          form2Contenedor.style.opacity = "1";

          codigoInput.style.cursor = "text";

          aReenviarCodigo.style.cursor = "pointer";

        })
        .catch((err) => console.log(err));
    }
  });

  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "inicioSesion.php";
  });

  //
  //EVENTOS
}

//------------------------------------------
// <<-- recuperarContraseña.php - FIN -->>
//------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------
// <<-- recuperarContraseña2.php - INICIO -->>
//----------------------------------------------

if (document.querySelector(".recuvaContra2HTML") !== null) {
  //INPUTS
  const contraNewInput = document.querySelector(".contraNewInput");
  const contraNewInputConfir = document.querySelector(".contraNewInputConfir");

  //SPAN
  const spanErrCorreo1 = document.querySelector(".spanErrCorreo1");

  //BOTONES
  const btnCambioContra = document.querySelector(".btnEnviar");
  const btnCancel = document.querySelector(".btnCancelar");
  const ojoAbierto = document.querySelector(".ojoAbierto");
  const ojoCerrado = document.querySelector(".ojoCerrado");

  //FORM
  const formContraNew = document.querySelector("#formCambiarContra");

  //
  //EVENTOS
  //

  btnCancel.addEventListener("click", (e) => {
    e.preventDefault();
    btnCambioContra.setAttribute("disabled", "");
    btnCambioContra.classList.replace("btnEnv1", "btnEnv2");
    btnCancel.setAttribute("disabled", "");
    btnCancel.classList.replace("btnCan1", "btnCan2");
    window.location.href = "inicioSesion.php";
  });

  btnCambioContra.addEventListener("click", (e) => {
    e.preventDefault();

    var contra1 = contraNewInput.value;
    var contra2 = contraNewInputConfir.value;

    if (contra1 != "" && contra2 != "") {
      btnCambioContra.setAttribute("disabled", "");
      btnCambioContra.classList.replace("btnEnv1", "btnEnv2");
      btnCancel.setAttribute("disabled", "");
      btnCancel.classList.replace("btnCan1", "btnCan2");
      spanErrCorreo1.textContent =
        "Contraseña cambiada con éxito. Redireccionando…";
      spanErrCorreo1.style.opacity = "1";
      spanErrCorreo1.style.color = "green";
      formContraNew.submit();
    }
  });

  ojoAbierto.addEventListener("click", () => {
    ojoAbierto.classList.replace("ojoIconA", "ojoIconA2");
    ojoCerrado.classList.replace("ojoIconC2", "ojoIconC");

    contraNewInput.removeAttribute("type");
    contraNewInputConfir.removeAttribute("type");

    contraNewInput.setAttribute("type", "text");
    contraNewInputConfir.setAttribute("type", "text");
  });

  ojoCerrado.addEventListener("click", () => {
    ojoAbierto.classList.replace("ojoIconA2", "ojoIconA");
    ojoCerrado.classList.replace("ojoIconC", "ojoIconC2");

    contraNewInput.removeAttribute("type");
    contraNewInputConfir.removeAttribute("type");

    contraNewInput.setAttribute("type", "password");
    contraNewInputConfir.setAttribute("type", "password");
  });

  contraNewInput.addEventListener("input", (e) => {
    var contra1 = contraNewInput.value;
    var contra2 = contraNewInputConfir.value;

    if (contra1 == "" && contra2 == "") {
      spanErrCorreo1.textContent = "#";
      spanErrCorreo1.style.opacity = "0";
      btnCambioContra.setAttribute("disabled", "");
      btnCambioContra.classList.replace("btnEnv1", "btnEnv2");
    } else {
      if (contra1.length < 9) {
        spanErrCorreo1.textContent = "La contraseña es muy corta";
        spanErrCorreo1.style.opacity = "1";
        btnCambioContra.setAttribute("disabled", "");
        btnCambioContra.classList.replace("btnEnv1", "btnEnv2");
      } else {
        if (contra1.length >= 9 && contra1 != contra2) {
          spanErrCorreo1.textContent = "Las contraseñas no coinciden";
          spanErrCorreo1.style.opacity = "1";
          btnCambioContra.setAttribute("disabled", "");
          btnCambioContra.classList.replace("btnEnv1", "btnEnv2");
        } else {
          if (contra1.length >= 9 && contra1 == contra2) {
            spanErrCorreo1.textContent = "#";
            spanErrCorreo1.style.opacity = "0";
            if (btnCambioContra.getAttribute("disabled") != null) {
              btnCambioContra.removeAttribute("disabled");
            }
            btnCambioContra.classList.replace("btnEnv2", "btnEnv1");
          }
        }
      }
    }
  });

  contraNewInputConfir.addEventListener("input", (e) => {
    let contra1 = contraNewInput.value;
    let contra2 = contraNewInputConfir.value;

    if (contra1 == "" && contra2 == "") {
      spanErrCorreo1.textContent = "#";
      spanErrCorreo1.style.opacity = "0";
    } else {
      if (contra1.length < 8) {
        spanErrCorreo1.textContent = "La contraseña es muy corta";
        spanErrCorreo1.style.opacity = "1";
      } else {
        if (contra1.length >= 8 && contra1 != contra2) {
          spanErrCorreo1.textContent = "Las contraseñas no coinciden";
          spanErrCorreo1.style.opacity = "1";
        } else {
          spanErrCorreo1.textContent = "#";
          spanErrCorreo1.style.opacity = "0";
          if (contra1.length >= 8 && contra1 == contra2) {
            spanErrCorreo1.textContent = "#";
            spanErrCorreo1.style.opacity = "0";
            if (btnCambioContra.getAttribute("disabled") != null) {
              btnCambioContra.removeAttribute("disabled");
            }
            btnCambioContra.classList.replace("btnEnv2", "btnEnv1");
          }
        }
      }
    }
  });
}

//-------------------------------------------
// <<-- recuperarContraseña2.php - FIN -->>
//-------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------
// <<-- confirmarNuevoMiembro.php - INICIO -->>
//-----------------------------------------------

if(document.querySelector(".confirmarCorreoHTML") != null) {
  //TOMANDO OBJETOS DEL DOM

  //INPUTS
  const inputCodigo = document.querySelector(".correoMCodigo");

  const inputNomM = document.querySelector(".inputNom");
  const inputApeM = document.querySelector(".inputApe");
  const inputDocuM = document.querySelector(".inputDocu");
  const inputFechaM = document.querySelector(".inputFecha");
  const inputTelefM = document.querySelector(".inputTelef");
  const inputDireccM = document.querySelector(".inputDirecc");
  const inputRolM = document.querySelector(".inputRol");
  const inputCorreoM = document.querySelector(".inputCorreo");
  const inputContraM = document.querySelector(".inputContra");
  const inputEmpresaM = document.querySelector(".inputEmpre");
  const inputNitM = document.querySelector(".inputNit");
  const inputCorreoA = document.querySelector(".correoAdmin");
  const inputContraA = document.querySelector(".contraAdmin");

  //BOTONES
  const btnConfirmar = document.querySelector(".btnRegistrarM");
  const btnCancelar = document.querySelector(".btnCancelarM");

  //SPAN
  const spanErrCodigo = document.querySelector(".spanErrCodigo");

  //VARIABLES GLOBALES
  var datos = ["", "", "", "", "", "", "", "", "", "", "", "", ""];

  window.addEventListener("load", () => {
    datos[0] = inputNomM.value;
    datos[1] = inputApeM.value;
    datos[2] = inputDocuM.value;
    datos[3] = inputFechaM.value;
    datos[4] = inputTelefM.value;
    datos[5] = inputDireccM.value;
    datos[6] = inputRolM.value;
    datos[7] = inputCorreoM.value;
    datos[8] = inputContraM.value;
    datos[9] = inputEmpresaM.value;
    datos[10] = inputNitM.value;
    datos[11] = inputCorreoA.value;
    datos[12] = inputContraA.value;

    let correo = "";

    if (inputCorreoM.value != "") {
      correo = inputCorreoM.value;
    } else {
      if (inputCorreoA.value != "") {
        correo = inputCorreoA.value;
      }
    }

    let formCorreoCodigo = new FormData();

    formCorreoCodigo.append("correoUser", correo);
    formCorreoCodigo.append("send2Correo", true);

    fetch(urlEnviContraRecu, {
      method: "POST",
      body: formCorreoCodigo,
    })
      .then((response) => response.json())
      .then((data) => {
        if (datos[10] != "") {
            
          btnConfirmar.addEventListener("click", (e) => {
            e.preventDefault();

            if (
              inputNomM.value == datos[0] &&
              inputApeM.value == datos[1] &&
              inputDocuM.value == datos[2] &&
              inputFechaM.value == datos[3] &&
              inputTelefM.value == datos[4] &&
              inputDireccM.value == datos[5] &&
              inputRolM.value == datos[6] &&
              inputCorreoM.value == datos[7] &&
              inputContraM.value == datos[8] &&
              inputEmpresaM.value == datos[9] &&
              inputNitM.value == datos[10]
            ) {

              if (data == inputCodigo.value) {
                
                var ultimoMiembroRegistrado = 0;

                let formRegisMiembro = new FormData();

                formRegisMiembro.append("nombreMiembroR", inputNomM.value);
                formRegisMiembro.append("apellidoMiembro", inputApeM.value);
                formRegisMiembro.append("documentoMiembro", inputDocuM.value);
                formRegisMiembro.append("fechaNMiembro", inputFechaM.value);
                formRegisMiembro.append("telefonoMiembro", inputTelefM.value);
                formRegisMiembro.append("direccMiembro", inputDireccM.value);
                formRegisMiembro.append("rolMiembro", inputRolM.value);
                formRegisMiembro.append("correoMiembro", inputCorreoM.value);
                formRegisMiembro.append(
                  "contraseniaMiembro",
                  inputContraM.value
                );
                formRegisMiembro.append("empresaMiembro", inputEmpresaM.value);
                formRegisMiembro.append("nitMiembro", inputNitM.value);
                formRegisMiembro.append("userVerifi", true);

                fetch(urlConsultarUser, {
                  method: "POST",
                  body: formRegisMiembro,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    
                    ultimoMiembroRegistrado = data;

                    btnConfirmar.setAttribute("disabled", "");
                    btnConfirmar.classList.replace(
                      "btnRegistrarM",
                      "btnRegistrarM2"
                    );

                    btnCancelar.setAttribute("disabled", "");
                    btnCancelar.classList.replace(
                      "btnCancelarM",
                      "btnCancelarM2"
                    );

                    setTimeout(() => {
                      window.location.href = "inicioSesion.php";
                    }, 1200);
                  })
                  .catch((err) => console.log(err));
              } else {
                spanErrCodigo.textContent =
                  "El código es incorrecto. Intente de nuevo";
                spanErrCodigo.style.opacity = "1";
              }
            }
          });
        } else {
          if (datos[10] == "") {
            btnConfirmar.addEventListener("click", (e) => {
              e.preventDefault();

              if (
                inputNomM.value == datos[0] &&
                inputApeM.value == datos[1] &&
                inputDocuM.value == datos[2] &&
                inputFechaM.value == datos[3] &&
                inputTelefM.value == datos[4] &&
                inputDireccM.value == datos[5] &&
                inputRolM.value == datos[6] &&
                inputCorreoA.value == datos[11] &&
                inputContraA.value == datos[12]
              ) {

                if (data == inputCodigo.value) {
                  var ultimoMiembroRegistrado = 0;

                  let formRegisMiembro = new FormData();

                  formRegisMiembro.append("nombreMiembroR", inputNomM.value);
                  formRegisMiembro.append("apellidoMiembro", inputApeM.value);
                  formRegisMiembro.append("documentoMiembro", inputDocuM.value);
                  formRegisMiembro.append("fechaNMiembro", inputFechaM.value);
                  formRegisMiembro.append("telefonoMiembro", inputTelefM.value);
                  formRegisMiembro.append("direccMiembro", inputDireccM.value);
                  formRegisMiembro.append("rolMiembro", inputRolM.value);
                  formRegisMiembro.append("correoMiembro", inputCorreoA.value);
                  formRegisMiembro.append(
                    "contraseniaMiembro",
                    inputContraA.value
                  );
                  formRegisMiembro.append("userVerifi", true);

                  fetch(urlConsultarUser, {
                    method: "POST",
                    body: formRegisMiembro,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      ultimoMiembroRegistrado = data;

                      btnConfirmar.setAttribute("disabled", "");
                      btnConfirmar.classList.replace(
                        "btnRegistrarM",
                        "btnRegistrarM2"
                      );

                      btnCancelar.setAttribute("disabled", "");
                      btnCancelar.classList.replace(
                        "btnCancelarM",
                        "btnCancelarM2"
                      );

                      setTimeout(() => {
                        window.location.href = "inicioSesion.php";
                      }, 1200);
                    })
                    .catch((err) => console.log(err));
                } else {
                  spanErrCodigo.textContent =
                    "El código es incorrecto. Intente de nuevo";
                  spanErrCodigo.style.opacity = "1";
                }
              }
            });
          }
        }
      })
      .catch((err) => console.log(err));
  });

  //
  //EVENTO
  inputCodigo.addEventListener("input", (e) => {
    if (inputCodigo.value == "") {
      spanErrCodigo.textContent = "#";
      spanErrCodigo.style.opacity = "0";
    }
  });

  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    inputNomM.value = "";
    inputApeM.value = "";
    inputDocuM.value = "";
    inputFechaM.value = "";
    inputTelefM.value = "";
    inputDireccM.value = "";
    inputRolM.value = "";
    inputCorreoM.value = "";
    inputContraM.value = "";
    inputEmpresaM.value = "";
    inputNitM.value = "";
    window.location.href = "inicioSesion.php";
  });
}

//--------------------------------------------
// <<-- confirmarNuevoMiembro.php - FIN -->>
//--------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------
// <<-- comprobarStdMembresia.php - INICIO -->>
//-----------------------------------------------

if(document.querySelector("#comprobarMembreHTML") != null){

  //--------------------------------------------------------------------------------------------------------------------------------
  // Tomando Elementos del DOM

    // BOTONES
    const btn_pagarMensualidad = document.querySelector("#btn_pagarMensualidad");
    const btn_volver = document.querySelector("#btn_volver");

    // INPUTS
    const in_numTDC = document.querySelector("#in_numTDC"); 
    const in_mesVTDC = document.querySelector("#in_mesVTDC");
    const in_anioVTDC = document.querySelector("#in_anioVTDC");
    const in_numCVVTDC = document.querySelector("#in_numCVVTDC");

    // CONTENEDORES
    const divEstadoCuenta = document.querySelector("#divEstadoCuenta");
    const body = document.querySelector(".body");

  //--------------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------------------
  // VARIABLES GENERALES O CONSTANTES

    var erroresInputs = [0,0,0,0];

  //--------------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------------------
  // FUNCIONES - INICIO

    //------------------------------------------------------------------------------------------------------------------------------
    // Buscar la proxima fecha de pago de la mensualidad
    const rangoDivStdMembresia = document.createRange();

    function fechaProximaPagoFiltrar(datos){

      let fechaProxPago = datos[0]["membreFechaPagoP"];
      let facturaFecha = datos[1];

      let fechaSumaPagoProx = fechaANumero(fechaProxPago);
      let fechaSumaActu = fechaANumero(cadenaFechaActual);

      let htmlDivStdCuenta = ``;

      if(fechaSumaPagoProx == fechaSumaActu){

        // Cuenta Activa - Último día para pagar la siguiente mensualidad
        btn_pagarMensualidad.removeAttribute("disabled");
        btn_pagarMensualidad.classList.replace("buttonPagarMensu-B", "buttonPagarMensu-D");

        // Form para habilitar/inhabilitar la membresía
        let formInabilitarMembre = new FormData();

        formInabilitarMembre.append("habiliInabiliMembre", true);
        formInabilitarMembre.append("estadoMembre", 'Activa');
        formInabilitarMembre.append("idMembresiaUser", document.querySelector("#inO_idMembreUser").value);

        fetch(urlInfoClienteDB, {
          method: "POST",
          body: formInabilitarMembre,
        })
          .then((response) => response.json())
          .then((data) => {

          })
          .catch((err) => console.log(err));

        // Div Estado Cuenta
        htmlDivStdCuenta = `
        <div class="stdMembreDiv">
          <span class="spanDispo">Membresía Activa</span>
        </div>
        <div class="divProxiPagoSpan">
          <span>Su próximo pago se realiza HOY <b>(${fechaProxPago})</b></span>
        </div>
        `;

      }else{

        if(fechaSumaPagoProx > fechaSumaActu){

          // Cuenta Activa - Mensualidad Paga, fecha de pago próxima aún lejos
          btn_pagarMensualidad.setAttribute("disabled", "");
          btn_pagarMensualidad.classList.replace("buttonPagarMensu-D", "buttonPagarMensu-B");

          // Form para habilitar/inhabilitar la membresía
          let formInabilitarMembre = new FormData();

          formInabilitarMembre.append("habiliInabiliMembre", true);
          formInabilitarMembre.append("estadoMembre", 'Activa');
          formInabilitarMembre.append("idMembresiaUser", document.querySelector("#inO_idMembreUser").value);

          fetch(urlInfoClienteDB, {
            method: "POST",
            body: formInabilitarMembre,
          })
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((err) => console.log(err));
          
          // Div Estado Cuenta
          htmlDivStdCuenta = `
          <div class="stdMembreDiv">
            <span class="spanDispo">Membresía Activa</span>
          </div>
          <div class="divProxiPagoSpan">
            <span>Su próximo pago se realizará en: <b>${fechaProxPago}</b></span>
          </div>
          `;
        }
        
      }

      if(fechaSumaActu > fechaSumaPagoProx){

        if(facturaFecha != null){

          // Cuenta Activa - Mensualidad al día
          btn_pagarMensualidad.setAttribute("disabled", "");
          btn_pagarMensualidad.classList.replace("buttonPagarMensu-D", "buttonPagarMensu-B");

          // Form para habilitar/inhabilitar la membresía
          let formInabilitarMembre = new FormData();

          formInabilitarMembre.append("habiliInabiliMembre", true);
          formInabilitarMembre.append("estadoMembre", 'Activa');
          formInabilitarMembre.append("idMembresiaUser", document.querySelector("#inO_idMembreUser").value);

          fetch(urlInfoClienteDB, {
            method: "POST",
            body: formInabilitarMembre,
          })
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((err) => console.log(err));

          // Div Estado Cuenta
          htmlDivStdCuenta = `
          <div class="stdMembreDiv">
            <span class="spanDispo">Membresía Activa</span>
          </div>
          <div class="divProxiPagoSpan">
            <span>Su próximo pago se realizará en: <b>${fechaProxPago}</b></span>
          </div>
          `;

        }else{

          // Cuenta Inactiva por Pago de Mensualidad Atrasado
          btn_pagarMensualidad.removeAttribute("disabled");
          btn_pagarMensualidad.classList.replace("buttonPagarMensu-B", "buttonPagarMensu-D");

          // Form para habilitar/inhabilitar la membresía
          let formInabilitarMembre = new FormData();

          formInabilitarMembre.append("habiliInabiliMembre", true);
          formInabilitarMembre.append("estadoMembre", 'Inactiva');
          formInabilitarMembre.append("idMembresiaUser", document.querySelector("#inO_idMembreUser").value);

          fetch(urlInfoClienteDB, {
            method: "POST",
            body: formInabilitarMembre,
          })
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((err) => console.log(err));

          // Div Estado Cuenta
          htmlDivStdCuenta = `
          <div class="stdMembreDiv">
            <span class="spanInacti">Membresía Inactiva</span>
          </div>
          <div class="divProxiPagoSpan">
            <span>El pago de su mensualidad está atrasado, pague el mes faltante para reactivar su membresía.</span>
          </div>
          `;

        }

      }

      // Llenando Div con el estado de la membresía
      rangoDivStdMembresia.selectNode(document.getElementsByTagName("div").item(0));
      const estadoCuenta =
        rangoDivStdMembresia.createContextualFragment(htmlDivStdCuenta);
      divEstadoCuenta.appendChild(estadoCuenta);

    }

    function buscarFechaPagoProximo(){

      let formPagoFechaP = new FormData();

      formPagoFechaP.append("fechaProxPagoMensu", true);
      formPagoFechaP.append("idMembreEpayco", document.querySelector("#inO_idMembreUser").value);

      fetch(urlInfoClienteDB, {
        method: "POST",
        body: formPagoFechaP,
      })
        .then((response) => response.json())
        .then((data) => {
            fechaProximaPagoFiltrar(data);
        })
        .catch((err) => console.log(err));

    }

    buscarFechaPagoProximo();

    //------------------------------------------------------------------------------------------------------------------------------

    function verificarErroresIN(){

      let sumaErroresIn = 0;

      for(let i = 0; i < erroresInputs.length; i++){
        sumaErroresIn += erroresInputs[i];
      }

      if(sumaErroresIn == 0){
        btn_pagarMensualidad.removeAttribute("disabled");
        btn_pagarMensualidad.classList.replace("buttonPagarMensu-B", "buttonPagarMensu-D");
      }else{
        btn_pagarMensualidad.setAttribute("disabled", "");
        btn_pagarMensualidad.classList.replace("buttonPagarMensu-D", "buttonPagarMensu-B");
      }

      return sumaErroresIn;

    }

    function enviarComprobarTDC(){

      // Verificar Errores
      let sumaErrores = verificarErroresIN();

      if(
        in_numTDC.value != "" &&
        in_mesVTDC.value != "" &&
        in_anioVTDC.value != "" &&
        in_numCVVTDC.value != "" &&
        sumaErrores == 0
      ){

        let formComprobarTarjeta = new FormData();

        formComprobarTarjeta.append("numeroTarjeta", in_numTDC.value);
        formComprobarTarjeta.append("mesVTarjeta", in_mesVTDC.value);
        formComprobarTarjeta.append("anioVTarjeta", in_anioVTDC.value);
        formComprobarTarjeta.append("cvcTarjeta", in_numCVVTDC.value);

        fetch(urlConfirTDC, {
          method: "POST",
          body: formComprobarTarjeta,
        })
            .then((response) => response.json())
            .then((data) => {

              let formPagarMensualidad = new FormData();

              formPagarMensualidad.append("transaPagoMembresia", true);
              formPagarMensualidad.append("tokenTarjeta", data[0]);
              formPagarMensualidad.append("totalTransaccion", document.querySelector("#inO_totalMembre").value);
              formPagarMensualidad.append("ivaTransaccion", document.querySelector("#inO_ivaCantMembre").value);
              formPagarMensualidad.append("ivaBaseTransa", document.querySelector("#inO_mensualidadMembre").value);
              formPagarMensualidad.append("userDocumentoTransa", document.querySelector("#inO_userDocumento").value);
              formPagarMensualidad.append("userNombreTransa", document.querySelector("#inO_userNombre").value);
              formPagarMensualidad.append("userApellidoTransa", document.querySelector("#inO_userApellido").value);
              formPagarMensualidad.append("userEmailTransa", document.querySelector("#inO_userEmail").value);
              formPagarMensualidad.append("userCelularTransa", document.querySelector("#inO_userCelular").value);
              formPagarMensualidad.append("fechaTransa", cadenaFechaActualP);
              formPagarMensualidad.append("ipUserTransa", document.querySelector("#inO_ipUser").value);
              formPagarMensualidad.append("nombreTDCTransa", data[3]);
              formPagarMensualidad.append("numeroTDC", in_numTDC.value);
              formPagarMensualidad.append("mesVTDC", in_mesVTDC.value);
              formPagarMensualidad.append("anioVTDC", in_anioVTDC.value);
              formPagarMensualidad.append("numCVCTDC", in_numCVVTDC.value);
              
              fetch(urlPagarMensualidadTDC, {
                method: "POST",
                body: formPagarMensualidad,
              })
                .then((response) => response.json())
                .then((data) => {
                  
                  let factuCod = creaCodFMR();
                  let fechaCrea = factuCod[0];
                  let horaCrea = factuCod[1];
                  let serieFactu = factuCod[2];
                  let factuCodigo = factuCod[3];
                  
                  let formRegisFactuMensualidad = new FormData();

                  let respuestaEpayco = data.data.transaction.data.respuesta;
                  let motivoEpayco = data.data.transaction.data.estado;

                  formRegisFactuMensualidad.append("regisFactuMensualidad", true);
                  formRegisFactuMensualidad.append("fechaCreaFac", fechaCrea);
                  formRegisFactuMensualidad.append("horaCreaFac", horaCrea);
                  formRegisFactuMensualidad.append("serieFac", serieFactu);
                  formRegisFactuMensualidad.append("codigoFac", factuCodigo);
                  formRegisFactuMensualidad.append("mensuaMembresia", document.querySelector("#inO_mensualidadMembre").value);
                  formRegisFactuMensualidad.append("ivaCantMembresia", document.querySelector("#inO_ivaCantMembre").value);
                  formRegisFactuMensualidad.append("descuCantMembresia", document.querySelector("#inO_descuCantMembre").value);
                  formRegisFactuMensualidad.append("codigoUserEpayco", document.querySelector("#inO_idUserCodigoEpayco").value);
                  formRegisFactuMensualidad.append("totalMembresia", document.querySelector("#inO_totalMembre").value);
                  formRegisFactuMensualidad.append("membresiaIDEpayco", document.querySelector("#inO_idMembreUser").value);
                  formRegisFactuMensualidad.append("membresiaCodigoEpayco", document.querySelector("#inO_idMembreCodigoEpayco").value);
                  formRegisFactuMensualidad.append("idUser", document.querySelector("#inO_userId").value);
                  formRegisFactuMensualidad.append("idMembresiaUser", document.querySelector("#inO_userIdMembresia").value);
                  formRegisFactuMensualidad.append("codigoFac", factuCodigo);
                  formRegisFactuMensualidad.append("referenciaEpayco", data.data.transaction.data.ref_payco);
                  formRegisFactuMensualidad.append("franquiciaCard", data.data.transaction.data.franquicia);
                  formRegisFactuMensualidad.append("bancoCard", data.data.transaction.data.banco);
                  formRegisFactuMensualidad.append("factuEpaycoCod", document.querySelector("#inO_idMembreUser").value+"-"+data.data.transaction.data.factura.split("Y")[1]);
                  formRegisFactuMensualidad.append("respuestaTransa", data.data.transaction.data.respuesta);
                  formRegisFactuMensualidad.append("motivoTransa", data.data.transaction.data.estado);
                  formRegisFactuMensualidad.append("tokenCardEpayco", data.data.tokenCard.cardTokenId);

                  fetch(urlInfoClienteDB, {
                    method: "POST",
                    body: formRegisFactuMensualidad,
                  })
                    .then((response) => response.json())
                    .then((data) => {

                      document.querySelector("#inFormO_codMembresiaEmail").value = document.querySelector("#inO_idMembreCodigo").value;
                      document.querySelector("#inFormO_fechaCreaFac").value = fechaCrea;
                      document.querySelector("#inFormO_fechaCaducaFac").value = data[0];
                      document.querySelector("#inFormO_facNumPedido").value = data[1];
                      document.querySelector("#inFormO_mensuaMembresia").value = document.querySelector("#inO_mensualidadMembre").value;
                      document.querySelector("#inFormO_ivaCantMembresia").value = document.querySelector("#inO_ivaCantMembre").value;
                      document.querySelector("#inFormO_descuCantMembresia").value = document.querySelector("#inO_descuCantMembre").value;
                      document.querySelector("#inFormO_totalMembresia").value = document.querySelector("#inO_totalMembre").value;
                      document.querySelector("#inFormO_horaCreaFac").value = horaCrea;
                      document.querySelector("#inFormO_serieFac").value = serieFactu;
                      document.querySelector("#inFormO_codigoFac").value = factuCodigo;
                      document.querySelector("#inFormO_membreNombre").value = document.querySelector("#inO_nombreMembre").value;
                      document.querySelector("#inFormO_respuestaEpay").value = respuestaEpayco;
                      document.querySelector("#inFormO_motivoEpay").value = motivoEpayco;

                      document.querySelector("#formCreaFacMensualidad").submit();
                      
                    })
                    .catch((err) => console.log(err));

                })
                .catch((err) => console.log(err));

            })
            .catch((err) => console.log(err));

      }

    }

  // FUNCIONES - FIN
  //--------------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------------------
  // EVENTOS - INICIO
  
    // (Bloquear Boton CTRL, CTRL+F5)
    window.addEventListener("keydown", (event)=>{

      if(event.ctrlKey){
        event.preventDefault();
        event.stopPropagation();
      }

    });

    // Número de Tarjeta INPUT
    in_numTDC.addEventListener("input", (e)=>{

      let valor = e.target.value;

      if(valor != ""){

        if(isNaN(Number(valor))){
          erroresInputs[0] = 1;
        }else{
          erroresInputs[0] = 0;
        }

      }else{
        erroresInputs[0] = 1;
      }

      verificarErroresIN();

    });

    // Mes de Vencimiento INPUT
    in_mesVTDC.addEventListener("input", (e)=>{

      let valor = in_mesVTDC.options[in_mesVTDC.selectedIndex].text;

      if(valor != ""){

        if(isNaN(Number(valor))){
          erroresInputs[1] = 1;
        }else{
          erroresInputs[1] = 0;
        }

      }else{
        erroresInputs[1] = 1;
      }

      verificarErroresIN();

    });

    // Año de Vencimiento INPUT
    in_anioVTDC.addEventListener("input", (e)=>{

      let valor = e.target.value;

      if(valor != ""){

        if(isNaN(Number(valor))){
          erroresInputs[2] = 1;
        }else{
          erroresInputs[2] = 0;
        }

      }else{
        erroresInputs[2] = 1;
      }

      verificarErroresIN();

    });

    // Número CVC INPUT
    in_numCVVTDC.addEventListener("input", (e)=>{

      let valor = e.target.value;

      if(valor != ""){

        if(isNaN(Number(valor))){
          erroresInputs[3] = 1;
        }else{
          erroresInputs[3] = 0;
        }

      }else{
        erroresInputs[3] = 1;
      }

      verificarErroresIN();

    });

    // Botón Volver
    btn_volver.addEventListener("click", (e)=>{
      window.location.href = "index.php";
    });

    // Botón Pagar Mensualidad
    const rangoSpinner = document.createRange();

    btn_pagarMensualidad.addEventListener("click", (e)=>{

      btn_pagarMensualidad.setAttribute("disabled", "");
      btn_pagarMensualidad.classList.replace("buttonPagarMensu-D", "buttonPagarMensu-B");

      // HTML spinner
      htmlSpinner = `
      <div id="baseSpinnerCargaRese" class="baseSpinnerCargaRese baseSpinnerCargaRese-A">
        <span>Procesando... Espere</span>
      </div>
      `;

      window.scroll({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      body.style.overflowY = "hidden";

      // Desplegando Spinner
      rangoSpinner.selectNode(document.getElementsByTagName("div").item(0));
      const spinnerPagoMensu =
        rangoSpinner.createContextualFragment(htmlSpinner);
      body.appendChild(spinnerPagoMensu);

      enviarComprobarTDC();

    });

  // EVENTOS - FIN
  //--------------------------------------------------------------------------------------------------------------------------------

}

//--------------------------------------------
// <<-- comprobarStdMembresia.php - FIN -->>
//--------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

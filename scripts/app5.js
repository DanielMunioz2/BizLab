function fetchFactura() {
    fetch('llamar_factura.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(factura => {
            const estadoElement = document.getElementById(`estado-${factura.id_Factura}`);
            if (estadoElement) {
                estadoElement.textContent = factura.estadoFactura;
            }
        });
    })
    .catch(err => console.error('Error al obtener facturas:', err));
}

function fetchUsuario() {
    fetch('llamar_usuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const estadoElement = document.getElementById(`estado-${user.id_usuario}`);
            if (estadoElement) {
                estadoElement.textContent = user.user_estado;
            }
        });
    })
    .catch(err => console.error('Error al obtener usuarios:', err));
}

setInterval(fetchFactura, 10000); 
setInterval(fetchUsuario, 10000);

document.addEventListener('DOMContentLoaded', function() {
    fetchFactura(); 
    fetchUsuario(); 
});

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//----------------------------------------------------------------------------------------------------------------------------------
//------------------------------
// LISTA FACTURAS.PHP | INICIO
//------------------------------

if(document.querySelector("#listaFactuHTML") != null){
    
    //------------------------------------------------------------------------------------------------------------------------------
    // Tomando Elementos del DOM

    // BOTONES
    const flechaPerfilDiv = document.querySelector(".divFlecha");
    const flechaPerfil = document.querySelector(".flechaIconPerfil");
    const btnCerrarSesion = document.querySelector(".btnCerrar");
    const ajustesCuentaBtn = document.querySelector("#ajustesCuentaBtn");

    // CONTENEDORES
    const cuadroOPerfil = document.querySelector(".cuadroPOculto");

    //------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------
    // FUNCIONES - INICIO

    // FUNCIONES - FIN
    //------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------
    // EVENTOS - INICIO

        // (Click Fuera) Ocultar y mostrar cuadro de opciones del perfil
        if(document.querySelector("#cuadroPOculto") != null){

            window.addEventListener('click', function mostrarCuadroPerfil(e) {

                if (document.getElementById('divFlecha').contains(e.target)) {
                    

                } else {
                        
                    document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
                    flechaPerfil.classList.replace("flecha2", "flecha1");

                }

            });

        }

        // Flecha botón - Mostrar y ocultar cuadro de opciones del perfil
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

        // Botón AJUSTES DE LA CUENTA - Cuadro de opciones del perfil
        ajustesCuentaBtn.addEventListener("click", (e) => {
          
          e.preventDefault();
          window.location.href = "usuarioPerfil.php";

        })
        
        // Botón Cerrar Sesión - Cuadro de opciones del perfil
        btnCerrarSesion.addEventListener("click", (e) => {

          window.location.href = "cerrar.php";

        });

    // EVENTOS - FIN
    //------------------------------------------------------------------------------------------------------------------------------
}

//------------------------------
// LISTA FACTURAS.PHP | FIN
//------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//----------------------------------------------------------------------------------------------------------------------------------
//------------------------------
// LISTA MIEMBROS.PHP | INICIO
//------------------------------

if(document.querySelector("#listaMiembrosHTML") != null){
    
    //------------------------------------------------------------------------------------------------------------------------------
    // Tomando Elementos del DOM

    // BOTONES
    const flechaPerfilDiv = document.querySelector(".divFlecha");
    const flechaPerfil = document.querySelector(".flechaIconPerfil");
    const btnCerrarSesion = document.querySelector(".btnCerrar");
    const ajustesCuentaBtn = document.querySelector("#ajustesCuentaBtn");

    // CONTENEDORES
    const cuadroOPerfil = document.querySelector(".cuadroPOculto");

    //------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------
    // FUNCIONES - INICIO

    // FUNCIONES - FIN
    //------------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------------
    // EVENTOS - INICIO

        // (Click Fuera) Ocultar y mostrar cuadro de opciones del perfil
        if(document.querySelector("#cuadroPOculto") != null){

            window.addEventListener('click', function mostrarCuadroPerfil(e) {

                if (document.getElementById('divFlecha').contains(e.target)) {
                    

                } else {
                        
                    document.querySelector("#cuadroPOculto").classList.replace("cuadroOPerfil2", "cuadroOPerfil1");
                    flechaPerfil.classList.replace("flecha2", "flecha1");

                }

            });

        }

        // Flecha botón - Mostrar y ocultar cuadro de opciones del perfil
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

        // Botón AJUSTES DE LA CUENTA - Cuadro de opciones del perfil
        ajustesCuentaBtn.addEventListener("click", (e) => {
          
          e.preventDefault();
          window.location.href = "usuarioPerfil.php";

        })
        
        // Botón Cerrar Sesión - Cuadro de opciones del perfil
        btnCerrarSesion.addEventListener("click", (e) => {

          window.location.href = "cerrar.php";

        });

    // EVENTOS - FIN
    //------------------------------------------------------------------------------------------------------------------------------
}

//------------------------------
// LISTA MIEMBROS.PHP | FIN
//------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const nextPanelBtn = document.getElementById("nextPanelBtn");
    const registrarBtn = document.getElementById("registrarBtn");
    const verifyCodeBtn = document.getElementById("verifyCodeBtn");
    const userRolSelect = document.getElementById("user_rol");
    const panel1 = document.getElementById("panel1");
    const panel2 = document.getElementById("panel2");
    const panel3 = document.getElementById("panel3");
    const usuarioPanel = document.getElementById("usuarioPanel");
    const adminPanel = document.getElementById("adminPanel");

    let userEmail = "";           // Guardaremos el correo del usuario para la verificación
    let verificationCode = "";    // Código de verificación para el correo

    // Manejar transición del primer al segundo panel según el rol
    nextPanelBtn.addEventListener("click", () => {
        const rolSeleccionado = userRolSelect.value;

        if (!rolSeleccionado) {
            alert("Por favor selecciona un rol antes de continuar.");
            return;
        }

        panel1.style.display = "none";
        panel2.style.display = "block";

        if (rolSeleccionado === "Usuario") {
            usuarioPanel.style.display = "block";
            adminPanel.style.display = "none";
        } else if (rolSeleccionado === "Administrador") {
            usuarioPanel.style.display = "none";
            adminPanel.style.display = "block";
        }
    });

    // Enviar formulario de registro
    registrarBtn.addEventListener("click", function(e) {
        e.preventDefault();
        
        // Deshabilitar el botón para evitar múltiples envíos
        registrarBtn.disabled = true;
        registrarBtn.textContent = "Enviando...";

        let rolSeleccionado = userRolSelect.value;
        let formRegistrarUser = new FormData(document.getElementById("registroForm"));
        formRegistrarUser.append("registro_usuario", "true");

        // Agregar campos nuevos al FormData
        let celular = document.getElementById("user_celular").value.trim();
        let documento = document.getElementById("user_documento").value.trim();
        let genero = document.querySelector('#user_genero').value;
        let fNacimiento = document.getElementById("user_fNacimiento").value.trim();
        let cargo = document.getElementById("user_cargo").value.trim();
        let ciudad = document.getElementById("user_ciudad").value.trim();
        let direccion = document.getElementById("user_direc").value.trim();

        formRegistrarUser.append("user_celular", celular);
        formRegistrarUser.append("user_documento", documento);
        formRegistrarUser.append("user_genero", genero);
        formRegistrarUser.append("user_fNacimiento", fNacimiento);
        formRegistrarUser.append("user_cargo", cargo);
        formRegistrarUser.append("user_ciudad", ciudad);
        formRegistrarUser.append("user_direc", direccion);

        if (rolSeleccionado === "Administrador") {
            let codigoAdminInput = document.getElementById("codigoAdmin").value.trim();
            if (!codigoAdminInput) {
                alert("Por favor ingresa el código Admin.");
                registrarBtn.disabled = false;  // Rehabilitar el botón en caso de error
                registrarBtn.textContent = "Registrar";
                return;
            }
            formRegistrarUser.append("codigo_admin_ingresado", codigoAdminInput);
        }

        // Enviar datos al servidor usando fetch
        fetch("https://plataforma.the-bizclub.com/consultasDB.php", {
            method: "POST",
            body: formRegistrarUser
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registro exitoso. Revisa tu correo para el código de verificación.");
                userEmail = data.email;
                verificationCode = data.codigoVerificacion;

                panel2.style.display = "none";
                panel3.style.display = "block";
            } else {
                alert(data.message || "Hubo un error al registrar el usuario.");
                registrarBtn.disabled = false;  // Rehabilitar el botón si hay un error
                registrarBtn.textContent = "Registrar";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un error al registrar el usuario.");
            registrarBtn.disabled = false;  // Rehabilitar el botón si ocurre un error de red
            registrarBtn.textContent = "Registrar";
        });
    });

    // Verificar código ingresado por el usuario
    verifyCodeBtn.addEventListener("click", function() {

        verifyCodeBtn.disabled = true;
        verifyCodeBtn.textContent = "Comprobando...";

        const codigoIngresado = document.getElementById("verification_code").value.trim();

        if (!codigoIngresado) {
            alert("Por favor ingresa el código de verificación.");
            verifyCodeBtn.disabled = false;
            verifyCodeBtn.textContent = "Verificar Código";
            return;
        }

        if (codigoIngresado === verificationCode) {
            // Si el código es correcto, enviamos la solicitud para activar la cuenta en la base de datos
            let formVerificarCodigo = new FormData();
            formVerificarCodigo.append("verificar_codigo", "true");
            formVerificarCodigo.append("user_email", userEmail);

            fetch("https://plataforma.the-bizclub.com/consultasDB.php", {
                method: "POST",
                body: formVerificarCodigo
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                if (data.includes("¡Verificación exitosa!")) {
                    limpiarCampos();
                    window.location.replace("inicioSesion.php"); // Redirigir a login si la verificación es exitosa
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Hubo un error al verificar el código.");
                verifyCodeBtn.disabled = false;
                verifyCodeBtn.textContent = "Verificar Código";
            });
        } else {
            alert("Código incorrecto. Por favor, intenta nuevamente.");
            verifyCodeBtn.disabled = false;
            verifyCodeBtn.textContent = "Verificar Código";
        }
    });

    // Limpiar todos los campos del formulario
    function limpiarCampos() {
        document.querySelectorAll('#registroForm input, #registroForm select, #registroForm textarea').forEach(input => {
            if (input.type !== 'button' && input.type !== 'submit' && input.type !== 'file') {
                input.value = '';
            } else if (input.type === 'file') {
                input.value = null;
            }
        });
        userRolSelect.selectedIndex = 0;
    }

    // Evitar regresar al registro después de redirigir a inicio de sesión
    if (window.history && window.history.pushState) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.location.replace("index.php");
        };
    }

});


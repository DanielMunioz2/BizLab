document.getElementById('send-code').addEventListener('click', function () {

    let email = document.getElementById('email').value.trim();

    if (!email) {
        alert('Por favor, introduce tu correo.');
        return;
    }

    this.disabled = true;  

    let formData = new FormData();
    formData.append('verifiEmail_recuContra', 'true');
    formData.append('email', email);

    fetch('https://plataforma.the-bizclub.com/consultasDB.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('verification_code', data.code);
            localStorage.setItem('user_email', email); // Guardamos el email

            document.getElementById('email-panel').style.display = 'none';
            document.getElementById('code-panel').style.display = 'block';
        } else {
            alert(data.message);
            document.getElementById('send-code').disabled = false;  // Reactiva el botón
        }
    })
    .catch(error => {
        alert('Error en el servidor: ' + error.message);
        document.getElementById('send-code').disabled = false;
    });

});

document.getElementById('verify-code').addEventListener('click', function () {

    let enteredCode = document.getElementById('code').value.trim();
    let storedCode = localStorage.getItem('verification_code');

    if (!storedCode) {
        alert('No se ha encontrado un código válido. Por favor, solicita uno nuevo.');
        return;
    }

    if (enteredCode === storedCode) {
        document.getElementById('code-panel').style.display = 'none';
        document.getElementById('password-panel').style.display = 'block';
    } else {
        alert('Código incorrecto.');
    }

});

document.getElementById('change-password').addEventListener('click', function () {

    let password = document.getElementById('new-password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    let email = localStorage.getItem('user_email'); // Recuperamos el email

    if (!email) {
        alert('No se encontró el correo. Por favor, reinicia el proceso.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    let formData = new FormData();
    formData.append('cambiar_contrasenia', 'true');
    formData.append('email', email);
    formData.append('password', password);

    fetch('https://plataforma.the-bizclub.com/consultasDB.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Contraseña cambiada con éxito.');
            localStorage.removeItem('verification_code'); // Limpiamos los datos después de éxito
            localStorage.removeItem('user_email');
            window.location.href = "inicioSesion.php";
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        alert('Error en el servidor: ' + error.message);
    });

});

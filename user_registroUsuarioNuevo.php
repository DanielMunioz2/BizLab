<!DOCTYPE html> 
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page for client management and appointment scheduling in the coworking company BizClub, located in Cúcuta, Norte de Santander - Colombia">
    <meta name="keywords" content="HTML, CSS, JavaScript, PHP, SQL, API">
    <meta name="author" content="Daniel Muñoz">

    <title>Registro - BizClub</title>

    <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
    <link rel="stylesheet" href="estilos/resetear.css">
    <link rel="stylesheet" href="estilos/user_registroUsuarioNuevo.css">
</head>
<body>
    
    <div class="form-container">
        <h2>Registro de Usuario</h2>
        <form id="registroForm" enctype="multipart/form-data">
            
            <!-- Primer Panel (Datos Básicos) -->
            <div id="panel1">
                <label for="user_nombre">Nombre:</label>
                <input type="text" id="user_nombre" name="user_nombre" required><br>

                <label for="user_apellido">Apellido:</label>
                <input type="text" id="user_apellido" name="user_apellido" required><br>

                <label for="user_correo">Correo:</label>
                <input type="email" id="user_correo" name="user_correo" required><br>

                <label for="user_contrasenia">Contraseña:</label>
                <input type="password" id="user_contrasenia" name="user_contrasenia" required><br>

                <label for="user_contrasenia2">Confirmar Contraseña:</label>
                <input type="password" id="user_contrasenia2" name="user_contrasenia2" required><br>

                <label for="user_rol">Rol:</label>
                <select id="user_rol" name="user_rol" required>
                    <option value="" disabled selected>Selecciona un rol</option>
                    <option value="Usuario">Usuario</option>
                    <option value="Administrador">Administrador</option>
                </select><br>

                <!-- Nuevos campos solicitados -->
                <label for="user_ciudad">Ciudad:</label>
                <input type="text" id="user_ciudad" name="user_ciudad" required><br>

                <label for="user_direc">Dirección:</label>
                <textarea id="user_direc" name="user_direc" required style="resize:none;"></textarea><br>

                <label for="user_celular">Número de Celular:</label>
                <input type="text" id="user_celular" name="user_celular" required><br>

                <label for="user_documento">Documento de Identidad:</label>
                <input type="text" id="user_documento" name="user_documento" required><br>

                <label for="user_genero">Género:</label>
                <select id="user_genero" name="user_genero" required>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select><br>

                <label for="user_fNacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="user_fNacimiento" name="user_fNacimiento" required><br>

                <button type="button" id="nextPanelBtn">Siguiente</button>
            </div>

            <!-- Segundo Panel (Dependiendo del Rol) -->
            <div id="panel2" style="display:none;">

                <!-- Campos de Usuario -->
                <div id="usuarioPanel" style="display:none;">
                    <label for="user_tipoEmpleo">Tipo de Empleo:</label>
                    <select id="user_tipoEmpleo" name="user_tipoEmpleo">
                        <option value="Empleado">Empleado</option>
                        <option value="Independiente">Independiente</option>
                    </select><br>

                    <label for="user_imagen">Imagen de Perfil:</label>
                    <input type="file" id="user_imagen" name="user_imagen"><br>

                    <label for="user_empresa">Empresa (si aplica):</label>
                    <input type="text" id="user_empresa" name="user_empresa"><br>

                    <label for="user_empresaRut">Rut Empresa (si aplica):</label>
                    <input type="text" id="user_empresaRut" name="user_empresaRut"><br>
                </div>

                <!-- Campos de Administrador -->
                <div id="adminPanel" style="display:none;">
                    <label for="codigoAdmin">Código Admin:</label>
                    <input type="text" id="codigoAdmin" name="codigoAdmin" required><br>

                    <label for="user_cargo">Cargo en la Empresa:</label>
                    <input type="text" id="user_cargo" name="user_cargo" required><br>

                    <label for="admin_imagen">Imagen de Perfil del Administrador:</label>
                    <input type="file" id="admin_imagen" name="admin_imagen" required><br>
                </div>

                <button type="submit" id="registrarBtn">Registrar</button>
            </div>
            

            <!-- Panel 3 para Verificación de Código -->
            <div id="panel3" style="display:none;">
                <label for="verification_code">Código de Verificación:</label>
                <input type="text" id="verification_code" name="verification_code" required>
                <button type="button" id="verifyCodeBtn">Verificar Código</button>
            </div>
        </form>
    </div>

    <script src="scripts\app10.js"></script>  
    
</body>
</html>

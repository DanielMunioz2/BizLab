<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

//* Permisos del Hosting *//

$origen_permitido = "https://plataforma.the-bizclub.com";

header("Access-Control-Allow-Origin: $origen_permitido");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Content-Length: 0");
    http_response_code(200);
    exit();
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// session_start([
//     'cookie_httponly' => true,
//     'cookie_secure' => true,
//     'cookie_samesite' => 'Strict'
// ]);

require("conexion.php");

date_default_timezone_set('America/Bogota');

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//* VARIABLES GLOBALES *//

$meses = [
    '01' => 'enero',
    '02' => 'febrero',
    '03' => 'marzo',
    '04' => 'abril',
    '05' => 'mayo',
    '06' => 'junio',
    '07' => 'julio',
    '08' => 'agosto',
    '09' => 'septiembre',
    '10' => 'octubre',
    '11' => 'noviembre',
    '12' => 'diciembre'
];

//* VARIABLES GLOBALES *//

//* CONSULTAS - INICIO *//

//// VERIFICAR USUARIO LOGIN
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['verificarUserLogin'])){
    
    if (!isset($_POST['userLoginCorreo']) || !isset($_POST['userLoginContrasenia'])) {

        echo json_encode(['Debe llenar los campos', null, null], JSON_UNESCAPED_UNICODE);
        exit();

    }

    // Validar el correo electrónico
    $correo = filter_input(INPUT_POST, 'userLoginCorreo', FILTER_VALIDATE_EMAIL);
    if (!$correo) {
        
        echo json_encode(['Correo electrónico inválido', null, null], JSON_UNESCAPED_UNICODE);
        exit();

    }
    
    // Verificar que la contraseña no esté vacía
    $contrasenia = $_POST['userLoginContrasenia'];
    if (empty($contrasenia)) {
        
        echo json_encode(['Contraseña requerida', null, null], JSON_UNESCAPED_UNICODE);
        exit();
        
    }

    // Conexión a la base de datos con PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $stmt = $pdo->prepare("SELECT `id_usuario`, `user_contrasenia`, `user_rol` FROM `$dbname`.`usuarios` WHERE `usuarios`.`user_correo` = :correo");
    $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
    $correo = $_POST["userLoginCorreo"];
    $stmt->execute();
    $user = $stmt->fetch();

    if (!$user) {

        // Usuario no encontrado
        echo json_encode(['Correo NO Encontrado', null, null], JSON_UNESCAPED_UNICODE);
        exit();

    }        

    // Verificar la contraseña usando password_verify
    if ($contrasenia !== $user['user_contrasenia']) {

        echo json_encode(['Contraseña Incorrecta', null, null], JSON_UNESCAPED_UNICODE);
        exit();

    }

    // Login exitoso
    session_start();
    $_SESSION['user_id'] = $user['id_usuario']; 
    $_SESSION['user_tipo'] = $user['user_rol']; 

    echo json_encode(['Login exitoso', $user['id_usuario'], $user['user_rol']], JSON_UNESCAPED_UNICODE);

}
//// VERIFICAR USUARIO LOGIN

//// DESPLEGAR LISTA PRODUCTOS NUEVA RESERVA
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["nombrePdtNewRese"])){

    try {
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [ 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        
        if (!isset($_POST['nombrePdtNewRese'])) {
            echo json_encode(["success" => true, "data" => "ERROR: Nombre del Producto Vacío"]); 
            exit();
        }
    
        $producto = $_POST["nombrePdtNewRese"]; 

        $stmt = $pdo->prepare(
        "SELECT `id_producto`, `produNombre`, `productoImgPrin` FROM `$dbname`.`productos` 
        WHERE `productos`.`produNombre` LIKE :producto");
    
        $stmt->execute(["producto" => "%$producto%"]);
    
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        if ($productos) {
            echo json_encode(["success" => true, "data" => $productos]);
        } else {
            echo json_encode(["success" => true, "data" => "No se encontraron productos"]);
        }
    
    } catch (Exception $e) {
        
        echo json_encode(["success" => true, "message" => "Algo salió mal"]); 
        
    }

}
//// DESPLEGAR LISTA PRODUCTOS NUEVA RESERVA

//// ELEGIR PRODUCTO NUEVA RESERVA
if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["elegirPdtNewR"])){
    
    try {
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [ 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        
        if (!isset($_POST["idProducto"])) {
            echo json_encode(["success" => true, "data" => "ERROR: Nombre del Producto Vacío"]); 
            exit();
        }
    
        $producto = $_POST["idProducto"]; 

        $stmt = $pdo->prepare(
        "SELECT * FROM `$dbname`.`productos` 
        WHERE `productos`.`id_producto` = :producto");
    
        $stmt->execute(["producto" => $producto]);
    
        $producto = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        if ($producto) {
            echo json_encode(["success" => true, "data" => $producto]);
        } else {
            echo json_encode(["success" => true, "data" => "No se encontró el producto"]);
        }
    
    } catch (Exception $e) {
        
        echo json_encode(["success" => true, "message" => "Algo salió mal"]); 
        
    }

}
//// ELEGIR PRODUCTO NUEVA RESERVA

//// TRAER RESERVAS Y FILTRAR CON EL HORARIO DE LA NUEVA RESERVA
if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["filtrarReservasNewRese"])){
    
    try {
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [ 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        
        if(
        !isset($_POST["fechaIniNewR"]) ||
        !isset($_POST["fechaFinNewR"])
        ){
            echo json_encode(["success" => true, "data" => "ERROR: Datos Faltantes"]); 
            exit();
        }
    
        //--------------------------------------------------------------------------------------------------------------------------------------

        $fechaNRInicio = $_POST["fechaIniNewR"];
        $fechaNRFinal = $_POST["fechaFinNewR"];

        $sql = "SELECT * FROM `$dbname`.`reservas` 
                WHERE 
                    `reservas`.`rese_fechaIniNum` = :fechaInicio 
                    OR `reservas`.`rese_fechaFinNum` = :fechaInicio
                    OR `reservas`.`rese_fechaIniNum` = :fechaFinal 
                    OR `reservas`.`rese_fechaFinNum` = :fechaFinal
                    OR (`reservas`.`rese_fechaIniNum` > :fechaInicio AND `reservas`.`rese_fechaIniNum` < :fechaFinal)
                    OR (`reservas`.`rese_fechaFinNum` > :fechaInicio AND `reservas`.`rese_fechaFinNum` < :fechaFinal)";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':fechaInicio' => $fechaNRInicio,
            ':fechaFinal'  => $fechaNRFinal
        ]);

        $reservasResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

        //--------------------------------------------------------------------------------------------------------------------------------------

        if ($reservasResult) {
            echo json_encode(["success" => true, "data" => $reservasResult]);
        } else {
            echo json_encode(["success" => true, "data" => $reservasResult]);
        }
    
    } catch (Exception $e) {
        
        echo json_encode(["success" => true, "message" => "Algo salió mal"]); 
        
    }

}
//// TRAER RESERVAS Y FILTRAR CON EL HORARIO DE LA NUEVA RESERVA

//// TRAER UNIDADES DISPONIBLES PARA LA NUEVA RESERVA
if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["listaUnidadesDispo"])){
    
    try {
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [ 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        
        if (!isset($_POST["unidadesIds"])) {
            echo json_encode(["success" => true, "data" => "ERROR: Datos faltantes"]); 
            exit();
        }
    
        $unidadesId = $_POST["unidadesIds"];  

        $unidadesArray = explode(',', $unidadesId);

        $placeholders = rtrim(str_repeat('?,', count($unidadesArray)), ',');

        // Consulta SQL para obtener el id, nombre y nombre de la imagen
        $sql = "SELECT `id_unidad`, `unidad_nombre`, `unidad_imagen` 
                FROM `$dbname`.`unidades` 
                WHERE `unidades`.`id_unidad` IN ($placeholders)";

        $stmt = $pdo->prepare($sql);

        // Ejecutar pasando el array como parámetros
        $stmt->execute($unidadesArray);

        // Obtener los resultados
        $unidadesResultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        if ($unidadesResultado) {
            echo json_encode(["success" => true, "data" => $unidadesResultado]);
        } else {
            echo json_encode(["success" => true, "data" => "No se encontraron las unidades"]);
        }
    
    } catch (Exception $e) {
        
        echo json_encode(["success" => true, "message" => "Algo salió mal"]); 
        
    }

}
//// TRAER UNIDADES DISPONIBLES PARA LA NUEVA RESERVA

//// REGISTRO DE VISITAS
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['visita_registro'])){
    
    try {
    
        // Conectar a la base de datos con PDO
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [ 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    
        // Obtener los datos del formulario
        $estado = 'Activa';
        $fechaEntrada = date('Y-m-d');
        $horaEntrada = date('h:i A');
        $nombres = $_POST['nombres'];
        $apellidos = $_POST['apellidos'];
        $nDocumento = (int)$_POST['nDocumento'];
        $celular = (int)$_POST['celular'];
        $correoE = $_POST['correoE'];
        $fechaNacimiento = $_POST['fechaNacimiento'];
        $empresa = $_POST['empresa'];
        $rut = $_POST['rut'];
        $motivo = $_POST['motivo'];
    
        // Consulta SQL para insertar los datos
        $sql = "
            INSERT INTO `$dbname`.`bizclub_visitas` 
            (`visita_estado`, `visita_fechaEntrada`, `visita_horaEntrada`, `visita_nombres`, 
            `visita_apellidos`, `visita_nDocumento`, `visita_celular`, `visita_correoE`, 
            `visita_fechaNacimiento`, `visita_empresa`, `visita_rut`, `visita_motivo`) 
            VALUES 
            (:estado, :fechaEntrada, :horaEntrada, :nombres, 
            :apellidos, :nDocumento, :celular, :correoE, 
            :fechaNacimiento, :empresa, :rut, :motivo);";
    
        // Preparar la consulta
        $stmt = $pdo->prepare($sql);
    
        // Vincular los parámetros
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':fechaEntrada', $fechaEntrada);
        $stmt->bindParam(':horaEntrada', $horaEntrada);
        $stmt->bindParam(':nombres', $nombres);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':nDocumento', $nDocumento);
        $stmt->bindParam(':celular', $celular);
        $stmt->bindParam(':correoE', $correoE);
        $stmt->bindParam(':fechaNacimiento', $fechaNacimiento);
        $stmt->bindParam(':empresa', $empresa);
        $stmt->bindParam(':rut', $rut);
        $stmt->bindParam(':motivo', $motivo);
    
        // Ejecutar la consulta
        $stmt->execute();
    
        // Devolver una respuesta JSON de éxito
        echo json_encode(['success' => true]);
    
    } catch (PDOException $e) {
        
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        
    }

}
//// REGISTRO DE VISITAS

//// DESPLEGAR LISTA DE VISITAS ACTIVAS
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['cargar_visitas_activas'])){

    try {
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [ 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $sql = "SELECT * FROM `$dbname`.`bizclub_visitas` WHERE `bizclub_visitas`.`visita_estado` = 'Activa'";

        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $html = '';
        while ($row = $stmt->fetch()) {
            $html .= '<li class="li_visitaItem li_visitaItem-1" data-id="' . $row['id_visita'] . '">
                        <p><strong>' . $row['visita_nombres'] . ' ' . $row['visita_apellidos'] . '</strong></p>
                        <p class="p_documento-1">Documento: ' . $row['visita_nDocumento'] . '</p>
                        <p class="p_motivo-1">Motivo: ' . $row['visita_motivo'] . '</p>
                        <p class="p_motivo-1">Entrada (Fecha y Hora): ' . $row['visita_fechaEntrada'] . " | " . $row['visita_horaEntrada'] . '</p>
                        <button class="btn_terminarVisita btn_terminarVisita-1" data-id="' . $row['id_visita'] . '">Terminar Visita</button>
                      </li>';
        }

        echo json_encode(['success' => true, 'html' => $html]);

    } catch (PDOException $e) {

        echo json_encode(['success' => false, 'error' => $e->getMessage()]);

    }

}
//// DESPLEGAR LISTA DE VISITAS ACTIVAS

//// TERMINAR VISITA
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['terminar_visita'])) {

    try {
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [ 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $visitaId = $_POST['visita_id'];

        $fechaSalida = date('Y-m-d');
        $horaSalida = date('h:i A');

        $sql = "UPDATE $dbname.bizclub_visitas 
                SET bizclub_visitas.visita_estado = 'Terminada', 
                    bizclub_visitas.visita_fechaSalida = :fechaSalida, 
                    bizclub_visitas.visita_horaSalida = :horaSalida 
                WHERE bizclub_visitas.id_visita = :visitaId 
                AND bizclub_visitas.visita_estado = 'Activa'";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':fechaSalida', $fechaSalida);
        $stmt->bindParam(':horaSalida', $horaSalida);
        $stmt->bindParam(':visitaId', $visitaId, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {

            echo json_encode(['success' => true]);

        } else {

            echo json_encode(['success' => false, 'error' => 'No se encontró la visita o ya está terminada']);

        }

    } catch (PDOException $e) {

        echo json_encode(['success' => false, 'error' => $e->getMessage()]);

    }

}
//// TERMINAR VISITA

//// BUSCAR VISITAS ANTERIORES
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['buscar_visitas_terminadas'])) {
    try {

        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $query = '%' . $_POST['query'] . '%';

        $sql = "SELECT * FROM $dbname.bizclub_visitas 
                WHERE visita_estado = 'Terminada' 
                AND (visita_nombres LIKE :query OR visita_apellidos LIKE :query)
                ORDER BY visita_fechaSalida DESC, visita_horaSalida DESC
                LIMIT 1";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':query', $query);
        $stmt->execute();

        $visitas = $stmt->fetchAll();

        echo json_encode(['success' => true, 'visitas' => $visitas]);

    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
//// BUSCAR VISITAS ANTERIORES

//// RE-REGISTRAR VISITANTE ANTERIOR
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['reRegistrar_nueva_visita'])) {

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $visitaId = $_POST['visita_id'];
        $telefono = $_POST['telefono'];
        $email = $_POST['email'];
        $motivo = $_POST['motivo'];

        // Verificar si ya existe una visita activa para el visitante
        $checkSql = "SELECT * FROM $dbname.bizclub_visitas 
                     WHERE visita_nDocumento = (SELECT visita_nDocumento FROM $dbname.bizclub_visitas WHERE id_visita = :visitaId)
                     AND visita_estado = 'Activa' 
                     ORDER BY id_visita DESC 
                     LIMIT 1";
        $checkStmt = $pdo->prepare($checkSql);
        $checkStmt->bindParam(':visitaId', $visitaId, PDO::PARAM_INT);
        $checkStmt->execute();
        $visitaActiva = $checkStmt->fetch();

        if ($visitaActiva) {
            echo json_encode(['success' => false, 'error' => 'El visitante ya tiene una visita activa. No se puede re-registrar.']);
            exit;
        }

        // Obtener los datos de la visita anterior
        $sql = "SELECT * FROM $dbname.bizclub_visitas WHERE id_visita = :visitaId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':visitaId', $visitaId, PDO::PARAM_INT);
        $stmt->execute();
        $visita = $stmt->fetch();

        if ($visita) {
            // Insertar nueva visita con los datos actualizados
            $fechaEntrada = date('Y-m-d');
            $horaEntrada = date('h:i A');
            $estado = 'Activa';

            $insertSql = "INSERT INTO $dbname.bizclub_visitas 
                (visita_estado, visita_fechaEntrada, visita_horaEntrada, visita_nombres, 
                 visita_apellidos, visita_nDocumento, visita_celular, visita_correoE, 
                 visita_fechaNacimiento, visita_empresa, visita_rut, visita_motivo) 
                VALUES 
                (:estado, :fechaEntrada, :horaEntrada, :nombres, 
                 :apellidos, :nDocumento, :celular, :correoE, 
                 :fechaNacimiento, :empresa, :rut, :motivo)";

            $insertStmt = $pdo->prepare($insertSql);
            $insertStmt->bindParam(':estado', $estado);
            $insertStmt->bindParam(':fechaEntrada', $fechaEntrada);
            $insertStmt->bindParam(':horaEntrada', $horaEntrada);
            $insertStmt->bindParam(':nombres', $visita['visita_nombres']);
            $insertStmt->bindParam(':apellidos', $visita['visita_apellidos']);
            $insertStmt->bindParam(':nDocumento', $visita['visita_nDocumento']);
            $insertStmt->bindParam(':celular', $telefono); // Actualizado
            $insertStmt->bindParam(':correoE', $email);    // Actualizado
            $insertStmt->bindParam(':fechaNacimiento', $visita['visita_fechaNacimiento']);
            $insertStmt->bindParam(':empresa', $visita['visita_empresa']);
            $insertStmt->bindParam(':rut', $visita['visita_rut']);
            $insertStmt->bindParam(':motivo', $motivo);    // Actualizado
            $insertStmt->execute();

            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Visita no encontrada']);
        }

    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

}
//// RE-REGISTRAR VISITANTE ANTERIOR

//// MOSTRAR DATOS DE VISITA ANTERIOR - BOTÓN OJO
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['ver_detalles_visita'])) {
    
    try {

        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $visitaId = $_POST['visita_id'];

        $sql = "SELECT * FROM $dbname.bizclub_visitas WHERE id_visita = :visitaId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':visitaId', $visitaId, PDO::PARAM_INT);
        $stmt->execute();

        $visita = $stmt->fetch();

        if ($visita) {
            echo json_encode(['success' => true, 'visita' => $visita]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Visita no encontrada.']);
        }

    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

}
//// MOSTRAR DATOS DE VISITA ANTERIOR - BOTÓN OJO

//// PRE-REGISTRAR LA RESERVA
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['registrar_reserva'])) {

    try {
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $fechaActual = date('Y-m-d');
        $horaActual = date('h:i A');
        $epochActual = time();
        
        $mesActual = date('m');  
        $anioActual = date('Y');

        // Generar código de reserva
        $rese_serie = $meses[$mesActual] . '-' . $anioActual; 
        $horaMinutos = date('Hi'); 
        $rese_codigo = "RES" . $horaMinutos . "-" . $epochActual;

        // Registrar reserva en la base de datos
        $datosReserva = [
            ':rese_codigo'        => $rese_codigo,
            ':rese_serie'         => $rese_serie,
            ':rese_estado'        => 'Por_Confirmar',
            ':rese_fechaCompra'   => $fechaActual,
            ':rese_fechaCompraNum'=> $epochActual,
            ':rese_horaCompra'    => $horaActual,
            ':rese_tipo'          => $_POST['tipoReserva'],
            ':rese_fechaIniTex'   => $_POST['fechaInicio'],
            ':rese_fechaIniNum'   => $_POST['fechaInicioNum'],
            ':rese_fechaFinTex'   => $_POST['fechaSalida'],
            ':rese_fechaFinNum'   => $_POST['fechaSalidaNum'],
            ':rese_horaIni'       => $_POST['horaInicio'],
            ':rese_horaFin'       => $_POST['horaSalida'],
            ':rese_duracion'      => $_POST['duracionReserva'],
            ':rese_precioBase'    => $_POST['precioBase'],
            ':rese_iva'           => $_POST['ivaProducto'],
            ':rese_descuento'     => $_POST['descuentoProducto'],
            ':rese_comision'      => $_POST['comisionProducto'],
            ':rese_precioIVA'     => $_POST['precioConIva'],
            ':rese_precioDescu'   => $_POST['precioConDescuento'],
            ':rese_precioFinal'   => $_POST['precioFinal'],
            ':rese_numeroPerson'  => $_POST['cantidadPersonas'],
            ':rese_otrosMiembros' => null,
            ':rese_titulo'        => $_POST['titulo'],
            ':rese_actividad'     => $_POST['actividad'],
            ':rese_fechaCancel'   => null,
            ':rese_horaCancel'    => null,
            ':rese_motivoCancel'  => null,
            ':rese_horasPrevCancel'=> null,
            ':rese_costoAdicCancel'=> null,
            ':rese_nombreUser'    => $_POST['nombreUsuario'],
            ':id_unidad'          => $_POST['unidadId'],
            ':id_usuario'         => $_POST['idUsuario'],
            ':id_producto'        => $_POST['idProducto']
        ];

        // Insertar en la base de datos para la reserva
        $sql = "INSERT INTO `$dbname`.`reservas` (
                    rese_codigo, rese_serie, rese_estado, rese_fechaCompra, rese_fechaCompraNum, rese_horaCompra,
                    rese_tipo, rese_fechaIniTex, rese_fechaIniNum, rese_fechaFinTex, rese_fechaFinNum, rese_horaIni,
                    rese_horaFin, rese_duracion, rese_precioBase, rese_iva, rese_descuento, rese_comision,
                    rese_precioIVA, rese_precioDescu, rese_precioFinal, rese_numeroPerson, rese_otrosMiembros,
                    rese_titulo, rese_actividad, rese_fechaCancel, rese_horaCancel, rese_motivoCancel, 
                    rese_horasPrevCancel, rese_costoAdicCancel, rese_nombreUser, id_unidad, id_usuario, id_producto
                ) VALUES (
                    :rese_codigo, :rese_serie, :rese_estado, :rese_fechaCompra, :rese_fechaCompraNum, :rese_horaCompra,
                    :rese_tipo, :rese_fechaIniTex, :rese_fechaIniNum, :rese_fechaFinTex, :rese_fechaFinNum, :rese_horaIni,
                    :rese_horaFin, :rese_duracion, :rese_precioBase, :rese_iva, :rese_descuento, :rese_comision,
                    :rese_precioIVA, :rese_precioDescu, :rese_precioFinal, :rese_numeroPerson, :rese_otrosMiembros,
                    :rese_titulo, :rese_actividad, :rese_fechaCancel, :rese_horaCancel, :rese_motivoCancel, 
                    :rese_horasPrevCancel, :rese_costoAdicCancel, :rese_nombreUser, :id_unidad, :id_usuario, :id_producto
                )";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($datosReserva);

        // Obtener el id_reserva de la última reserva insertada
        $id_reserva = $pdo->lastInsertId();

        // Cálculos para la factura
        $precioBaseTotal = $_POST['precioBase'] * $_POST['duracionReserva']; // Precio total por las personas
        $facturaSubTotal = $precioBaseTotal - $_POST['descuentoProducto']; // Aplicamos el descuento
        $ivaFactura = $facturaSubTotal * ($_POST['ivaProducto'] / 100); // Calculamos el IVA (porcentaje)
        $montoFactuTotal = $facturaSubTotal + $ivaFactura; // Total factura con IVA

        // Generar el código y la serie de la factura
        $facturaCodigo = "FAC" . $horaMinutos . "-" . $epochActual;
        $facturaSerie = $meses[$mesActual] . '-' . $anioActual;

        // Insertar la factura en la base de datos
        $datosFactura = [
            ':facturaCodigo'    => $facturaCodigo,
            ':facturaSerie'     => $facturaSerie,
            ':fechaFactura'     => $fechaActual,
            ':horaFactura'      => $horaActual,
            ':fechaFacturaV'    => $fechaActual, // Fecha de vencimiento, puede ser diferente si se necesita
            ':estadoFactura'    => 'Pendiente', // Puedes cambiar esto según el estado que desees
            ':precioFactura'    => $precioBaseTotal,
            ':factuSubTotal'    => $facturaSubTotal,
            ':ivaFactura'       => $ivaFactura,
            ':descuFactura'     => $_POST['descuentoProducto'],
            ':montoFactuTotal'  => $montoFactuTotal,
            ':id_producto'      => $_POST['idProducto'],
            ':id_usuario'       => $_POST['idUsuario'],
            ':id_unidad'        => $_POST['unidadId'],
            ':id_reserva'       => $id_reserva // Usamos el ID de la reserva insertada
        ];

        $sqlFactura = "INSERT INTO `$dbname`.`facturas` (
                            facturaCodigo, facturaSerie, fechaFactura, horaFactura, fechaFacturaV, estadoFactura,
                            precioFactura, factuSubTotal, ivaFactura, descuFactura, montoFactuTotal, id_producto,
                            id_usuario, id_unidad, id_reserva
                        ) VALUES (
                            :facturaCodigo, :facturaSerie, :fechaFactura, :horaFactura, :fechaFacturaV, :estadoFactura,
                            :precioFactura, :factuSubTotal, :ivaFactura, :descuFactura, :montoFactuTotal, :id_producto,
                            :id_usuario, :id_unidad, :id_reserva
                        )";

        $stmtFactura = $pdo->prepare($sqlFactura);
        $stmtFactura->execute($datosFactura);

        echo json_encode([
            'success' => true,
            'message' => 'Reserva y factura registrada con éxito.',
            'rese_codigo' => $rese_codigo,
            'factura_codigo' => $facturaCodigo
        ]);

    } catch (PDOException $e) {
        
        echo json_encode(['success' => false, 'message' => 'Error en la base de datos: ' . $e->getMessage()]);

    } catch (Exception $e) {
        
        echo json_encode(['success' => false, 'message' => 'Error inesperado: ' . $e->getMessage()]);
        
    }

}
//// PRE-REGISTRAR LA RESERVA

//// ADMIN - LISTA DE RESERVAS
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['buscar_reservas_lista'])) {

    $accion = $_POST['buscar_reservas_lista'];

    try {

        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        // Obtener todas las reservas
        if ($accion === 'obtener_reservas') {
            $stmt = $pdo->prepare("
                SELECT 
                    r.*, 
                    p.produNombre  -- Usamos produNombre para obtener el nombre del producto
                FROM reservas r 
                JOIN productos p ON r.id_producto = p.id_producto
                ORDER BY r.rese_fechaIniNum DESC
            ");
            $stmt->execute();
            $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['success' => true, 'reservas' => $reservas]);
        }

        // Actualizar estado de la reserva
        elseif ($accion === 'actualizar_estado') {
            if (isset($_POST['id_reserva'], $_POST['nuevo_estado'])) {
                $id_reserva = $_POST['id_reserva'];
                $nuevo_estado = $_POST['nuevo_estado'];

                $stmt = $pdo->prepare("
                    UPDATE reservas 
                    SET rese_estado = :nuevo_estado 
                    WHERE id_reserva = :id_reserva
                ");
                $stmt->bindParam(':nuevo_estado', $nuevo_estado);
                $stmt->bindParam(':id_reserva', $id_reserva);
                $stmt->execute();

                echo json_encode(['success' => true, 'message' => 'Estado actualizado correctamente.']);
            } else {
                echo json_encode(['success' => false, 'error' => 'Datos insuficientes para actualizar el estado.']);
            }
        }

        // Actualizar precio de la reserva
        elseif ($accion === 'actualizar_precio') {

            if (isset($_POST['id_reserva'], $_POST['precio'], $_POST['iva'], $_POST['descuento'], $_POST['comision'], $_POST['cantidad'])) {
                $id_reserva = $_POST['id_reserva'];
                $precio_base = $_POST['precio'];      // Precio unitario
                $iva = $_POST['iva'];
                $descuento = $_POST['descuento'];
                $comision = $_POST['comision'];
                $cantidad = $_POST['cantidad'];       // Cantidad/Duración
        
                // Calcular los precios intermedios y finales
                $precio_iva_unitario = $precio_base * (1 + ($iva / 100));
                $precio_descuento_unitario = $precio_iva_unitario - ($precio_iva_unitario * ($descuento / 100));
                
                // Aplicar la cantidad y la comisión al precio final
                $subtotal_sin_comision = $precio_descuento_unitario * $cantidad;
                $precio_final = $subtotal_sin_comision + ($subtotal_sin_comision * ($comision / 100));
        
                // Actualizar la reserva
                $stmt = $pdo->prepare("
                    UPDATE {$dbname}.reservas 
                    SET rese_precioBase = :precio_base,
                        rese_iva = :iva,
                        rese_descuento = :descuento,
                        rese_comision = :comision,
                        rese_precioIVA = :precio_iva_unitario,
                        rese_precioDescu = :precio_descuento_unitario,
                        rese_precioFinal = :precio_final,
                        rese_duracion = :cantidad,
                        rese_estado = 'Pendiente'
                    WHERE id_reserva = :id_reserva
                ");
        
                $stmt->bindParam(':precio_base', $precio_base);
                $stmt->bindParam(':iva', $iva);
                $stmt->bindParam(':descuento', $descuento);
                $stmt->bindParam(':comision', $comision);
                $stmt->bindParam(':precio_iva_unitario', $precio_iva_unitario);
                $stmt->bindParam(':precio_descuento_unitario', $precio_descuento_unitario);
                $stmt->bindParam(':precio_final', $precio_final);
                $stmt->bindParam(':cantidad', $cantidad);
                $stmt->bindParam(':id_reserva', $id_reserva);
                $stmt->execute();
        
                // Actualizar la factura asociada
                $stmt_factura = $pdo->prepare("
                    UPDATE {$dbname}.facturas 
                    SET estadoFactura = 'Pagada',
                        precioFactura = :precio_base,
                        factuSubTotal = :subtotal_sin_comision,
                        ivaFactura = :iva,
                        descuFactura = :descuento,
                        montoFactuTotal = :precio_final
                    WHERE id_reserva = :id_reserva
                ");
        
                $stmt_factura->bindParam(':precio_base', $precio_base);
                $stmt_factura->bindParam(':subtotal_sin_comision', $subtotal_sin_comision);
                $stmt_factura->bindParam(':iva', $iva);
                $stmt_factura->bindParam(':descuento', $descuento);
                $stmt_factura->bindParam(':precio_final', $precio_final);
                $stmt_factura->bindParam(':id_reserva', $id_reserva);
                $stmt_factura->execute();
        
                echo json_encode(['success' => true, 'message' => 'Reserva confirmada correctamente y factura actualizada como Pagada.']);
            } else {
                echo json_encode(['success' => false, 'error' => 'Datos insuficientes para confirmar la reserva.']);
            }

        }

        elseif ($accion === 'actualizar_estados_automaticamente') {
            $currentTimestamp = time();  // Hora y fecha actual
            $currentHour = date('H:i:s', $currentTimestamp);  // Solo la hora actual
        
            // Actualizar reservas que deben estar 'Activa'
            $stmtActiva = $pdo->prepare("
                UPDATE reservas 
                SET rese_estado = 'Activa' 
                WHERE rese_estado IN ('Por_Confirmar', 'Pausada') 
                AND rese_fechaIniNum <= :current_time 
                AND rese_fechaFinNum > :current_time
                AND :current_hour BETWEEN rese_horaInicio AND rese_horaFin
            ");
            $stmtActiva->execute([
                'current_time' => $currentTimestamp,
                'current_hour' => $currentHour
            ]);
        
            // Actualizar reservas que deben estar 'Pausada'
            $stmtPausada = $pdo->prepare("
                UPDATE reservas 
                SET rese_estado = 'Pausada' 
                WHERE rese_estado = 'Activa'
                AND rese_fechaFinNum > :current_time 
                AND (:current_hour < rese_horaInicio OR :current_hour > rese_horaFin)
            ");
            $stmtPausada->execute([
                'current_time' => $currentTimestamp,
                'current_hour' => $currentHour
            ]);
        
            // Actualizar reservas que deben estar 'Terminada'
            $stmtTerminada = $pdo->prepare("
                UPDATE reservas 
                SET rese_estado = 'Terminada' 
                WHERE rese_estado IN ('Por_Confirmar', 'Activa', 'Pausada')
                AND rese_fechaFinNum <= :current_time
            ");
            $stmtTerminada->execute(['current_time' => $currentTimestamp]);
        
            // Obtener las reservas actualizadas para devolver al cliente
            $stmt = $pdo->prepare("
                SELECT id_reserva, rese_estado 
                FROM reservas 
                WHERE rese_fechaIniNum <= :current_time 
                OR rese_fechaFinNum <= :current_time
            ");
            $stmt->execute(['current_time' => $currentTimestamp]);
            $reservas_actualizadas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            echo json_encode(['success' => true, 'reservas_actualizadas' => $reservas_actualizadas]);
        }

        // Acción no reconocida
        else {
            echo json_encode(['success' => false, 'error' => 'Acción no válida.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
}
//// ADMIN - LISTA DE RESERVAS

//// ADMIN - LISTA DE FACTURAS
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion_facturas'])) {
    $accion = $_POST['accion_facturas'];

    try {
        
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        // Obtener todas las facturas con detalles de usuario y producto
        if ($accion === 'obtener_facturas') {
            $stmt = $pdo->prepare("
                SELECT 
                    f.*, 
                    u.user_nombre, u.user_apellido, u.user_correo,
                    p.produNombre, p.produCategoria, p.produPrecio
                FROM facturas f
                JOIN usuarios u ON f.id_usuario = u.id_usuario
                JOIN productos p ON f.id_producto = p.id_producto
                ORDER BY f.fechaFactura DESC
            ");
            $stmt->execute();
            $facturas = $stmt->fetchAll();

            echo json_encode(['success' => true, 'facturas' => $facturas]);
        }

        // Filtrar facturas por fecha, serie o búsqueda
        elseif ($accion === 'filtrar_facturas') {
            $filtros = [];
            $params = [];

            if (!empty($_POST['fechaFactura'])) {
                $filtros[] = 'f.fechaFactura = :fechaFactura';
                $params[':fechaFactura'] = $_POST['fechaFactura'];
            }

            if (!empty($_POST['facturaSerie'])) {
                $filtros[] = 'f.facturaSerie = :facturaSerie';
                $params[':facturaSerie'] = $_POST['facturaSerie'];
            }

            if (!empty($_POST['busqueda'])) {
                $busqueda = '%' . $_POST['busqueda'] . '%';
                $filtros[] = '(u.user_nombre LIKE :busqueda OR p.produNombre LIKE :busqueda)';
                $params[':busqueda'] = $busqueda;
            }

            $query = "
                SELECT 
                    f.*, 
                    u.user_nombre, u.user_apellido, u.user_correo,
                    p.produNombre, p.produCategoria, p.produPrecio
                FROM facturas f
                JOIN usuarios u ON f.id_usuario = u.id_usuario
                JOIN productos p ON f.id_producto = p.id_producto
            ";

            if (!empty($filtros)) {
                $query .= ' WHERE ' . implode(' AND ', $filtros);
            }

            $query .= ' ORDER BY f.fechaFactura DESC';
            $stmt = $pdo->prepare($query);
            $stmt->execute($params);
            $facturas = $stmt->fetchAll();

            echo json_encode(['success' => true, 'facturas' => $facturas]);
        }

        // Acción no reconocida
        else {
            echo json_encode(['success' => false, 'error' => 'Acción no válida.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
}
//// ADMIN - LISTA DE FACTURAS

//// ADMIN - LISTA DE USUARIOS
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion_usuarios'])) {
    try {
        // Conexión a la base de datos dentro del try
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $accion = $_POST['accion_usuarios'];

        // Obtener todos los usuarios
        if ($accion === 'obtener_usuarios') {
            $stmt = $pdo->query("SELECT * FROM usuarios");
            $usuarios = $stmt->fetchAll();

            echo json_encode(['success' => true, 'usuarios' => $usuarios]);
        }

        // Filtrar usuarios por nombre/apellido o fecha de unión
        // if ($accion === 'filtrar_usuarios') {
        //     $nombreApellido = isset($_POST['nombreApellido']) ? trim($_POST['nombreApellido']) : '';
        //     $fechaUnion = isset($_POST['fechaUnion']) ? trim($_POST['fechaUnion']) : '';

        //     $query = "SELECT * FROM usuarios WHERE 1=1";
        //     $params = [];

        //     if (!empty($nombreApellido)) {
        //         $query .= " AND (user_nombre LIKE :nombreApellido OR user_apellido LIKE :nombreApellido)";
        //         $params[':nombreApellido'] = "%$nombreApellido%";
        //     }

        //     if (!empty($fechaUnion)) {
        //         $query .= " AND user_fechaU = :fechaUnion";
        //         $params[':fechaUnion'] = $fechaUnion;
        //     }

        //     $stmt = $pdo->prepare($query);
        //     $stmt->execute($params);
        //     $usuarios = $stmt->fetchAll();

        //     echo json_encode(['success' => true, 'usuarios' => $usuarios]);
        // }
        if ($accion === 'filtrar_usuarios') {
            $nombreApellido = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';  // Cambié 'nombreApellido' por 'nombre'
            $fechaUnion = isset($_POST['fecha_union']) ? trim($_POST['fecha_union']) : '';  // Cambié 'fechaUnion' por 'fecha_union'
        
            $query = "SELECT * FROM usuarios WHERE 1=1";
            $params = [];
        
            if (!empty($nombreApellido)) {
                $query .= " AND (user_nombre LIKE :nombreApellido OR user_apellido LIKE :nombreApellido)";
                $params[':nombreApellido'] = "%$nombreApellido%";
            }
        
            if (!empty($fechaUnion)) {
                $query .= " AND user_fechaU = :fechaUnion";
                $params[':fechaUnion'] = $fechaUnion;
            }
        
            $stmt = $pdo->prepare($query);
            $stmt->execute($params);
            $usuarios = $stmt->fetchAll();
        
            echo json_encode(['success' => true, 'usuarios' => $usuarios]);
        }

    } catch (PDOException $e) {
        // Captura de cualquier error durante la conexión o ejecución de la consulta
        echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }

}
//// ADMIN - LISTA DE USUARIOS

//// REGISTRO DE USUARIOS
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['registro_usuario'])) {

    try {

        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        // Recibir datos del formulario
        $nombre = $_POST['user_nombre'];
        $apellido = $_POST['user_apellido'];
        $correo = $_POST['user_correo'];
        $contrasenia = $_POST['user_contrasenia'];
        $contrasenia2 = $_POST['user_contrasenia2'];
        $rol = $_POST['user_rol'];
        $tipoEmpleo = $_POST['user_tipoEmpleo'];
        $imagen = $_FILES['user_imagen']['name'];
        $fechaUnion = date('Y-m-d');
        $horaUnion = date('h:i A'); 
        $estado = 'Pendiente';

        // Nuevos campos
        $celular = $_POST['user_celular'];
        $documento = $_POST['user_documento'];
        $genero = $_POST['user_genero'];
        $fNacimiento = $_POST['user_fNacimiento'];
        $cargo = $_POST['user_cargo'];
        $ciudad = $_POST['user_ciudad'];
        $direccion = $_POST['user_direc'];

        // Validar contraseñas
        if ($contrasenia !== $contrasenia2) {
            echo json_encode(['success' => false, 'message' => 'Las contraseñas no coinciden.']);
            exit;
        }

        // Verificar si el correo, celular o documento ya existen en la base de datos
        $sql = "SELECT * FROM usuarios WHERE user_correo = :correo OR user_celular = :celular OR user_documento = :documento";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':correo' => $correo,
            ':celular' => $celular,
            ':documento' => $documento
        ]);
        
        $usuarioExistente = $stmt->fetch();

        // Si el usuario existe con estado 'Activo', prohibir el registro
        if ($usuarioExistente && $usuarioExistente['user_estado'] === 'Activo') {
            echo json_encode(['success' => false, 'message' => 'El correo, el celular o el documento ya están registrados y activos. Verifique alguno de esos datos y por favor cámbielos.']);
            exit;
        }

        // Si el usuario existe con estado 'Pendiente', actualizar los datos
        if ($usuarioExistente && $usuarioExistente['user_estado'] == 'Pendiente') {
            $sqlUpdate = "UPDATE usuarios 
                          SET user_nombre = :user_nombre, 
                              user_apellido = :user_apellido, 
                              user_contrasenia = :user_contrasenia, 
                              user_rol = :user_rol, 
                              user_tipoEmpleo = :user_tipoEmpleo, 
                              user_imagen = :user_imagen, 
                              user_fechaU = :user_fechaU, 
                              user_horaU = :user_horaU, 
                              user_celular = :user_celular, 
                              user_documento = :user_documento, 
                              user_genero = :user_genero, 
                              user_fNacimiento = :user_fNacimiento, 
                              user_cargo = :user_cargo, 
                              user_ciudad = :user_ciudad, 
                              user_direc = :user_direc
                          WHERE user_correo = :correo OR user_celular = :celular OR user_documento = :documento";

            $stmtUpdate = $pdo->prepare($sqlUpdate);
            $stmtUpdate->execute([
                ':user_nombre' => $nombre,
                ':user_apellido' => $apellido,
                ':user_contrasenia' => $contrasenia,
                ':user_rol' => $rol,
                ':user_tipoEmpleo' => $tipoEmpleo,
                ':user_imagen' => $imagen,
                ':user_fechaU' => $fechaUnion,
                ':user_horaU' => $horaUnion,
                ':user_celular' => $celular,
                ':user_documento' => $documento,
                ':user_genero' => $genero,
                ':user_fNacimiento' => $fNacimiento,
                ':user_cargo' => $cargo,
                ':user_ciudad' => $ciudad,
                ':user_direc' => $direccion,
                ':correo' => $correo,
                ':celular' => $celular,
                ':documento' => $documento
            ]);

        } else {
            // Si no existe, insertar nuevo usuario
            $sqlInsert = "INSERT INTO usuarios (user_nombre, user_apellido, user_correo, user_contrasenia, user_rol, user_tipoEmpleo, user_imagen, user_fechaU, user_horaU, user_estado, user_celular, user_documento, user_genero, user_fNacimiento, user_cargo, user_ciudad, user_direc) 
                    VALUES (:user_nombre, :user_apellido, :user_correo, :user_contrasenia, :user_rol, :user_tipoEmpleo, :user_imagen, :user_fechaU, :user_horaU, :user_estado, :user_celular, :user_documento, :user_genero, :user_fNacimiento, :user_cargo, :user_ciudad, :user_direc)";
        
            $stmtInsert = $pdo->prepare($sqlInsert);
            $stmtInsert->execute([
                ':user_nombre' => $nombre,
                ':user_apellido' => $apellido,
                ':user_correo' => $correo,
                ':user_contrasenia' => $contrasenia,
                ':user_rol' => $rol,
                ':user_tipoEmpleo' => $tipoEmpleo,
                ':user_imagen' => $imagen,
                ':user_fechaU' => $fechaUnion,
                ':user_horaU' => $horaUnion,
                ':user_estado' => $estado,
                ':user_celular' => $celular,
                ':user_documento' => $documento,
                ':user_genero' => $genero,
                ':user_fNacimiento' => $fNacimiento,
                ':user_cargo' => $cargo,
                ':user_ciudad' => $ciudad,
                ':user_direc' => $direccion
            ]);
        }

        // Validación del código para administradores
        if ($rol === 'Administrador') {

            $codigoAdminInput = $_POST['codigo_admin_ingresado'];

            $stmtAdmin = $pdo->prepare("SELECT codigoAdmin FROM codigoadmin LIMIT 1");
            $stmtAdmin->execute();
            $codigoAdminDB = $stmtAdmin->fetchColumn();

            if ($codigoAdminInput !== $codigoAdminDB) {
                echo json_encode(['success' => false, 'message' => 'Código de Administrador incorrecto.']);
                exit;
            }

            // Actualizar el código de administrador
            $nuevoCodigoAdmin = generarCodigo(8);
            $sqlUpdateAdmin = "UPDATE codigoadmin SET codigoAdmin = :nuevoCodigoAdmin";
            $stmtUpdateAdmin = $pdo->prepare($sqlUpdateAdmin);
            $stmtUpdateAdmin->execute([':nuevoCodigoAdmin' => $nuevoCodigoAdmin]);

            // Guardar la imagen del administrador
            if (isset($_FILES['admin_imagen']) && $_FILES['admin_imagen']['error'] === UPLOAD_ERR_OK) {
                $imagenAdmin = $_FILES['admin_imagen'];
                $rutaImagen = 'uploads/' . basename($imagenAdmin['name']);
                move_uploaded_file($imagenAdmin['tmp_name'], $rutaImagen);
            }
        }

        // Generar código de verificación para el correo
        $codigoVerificacion = generarCodigo(8);

        // Enviar correo con el código de verificación
        if (enviarCorreoVerificacion($correo, $codigoVerificacion)) {
            echo json_encode(['success' => true, 'email' => $correo, 'codigoVerificacion' => $codigoVerificacion]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al enviar el correo de verificación.']);
        }

    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }

}

// Función para generar códigos aleatorios de 8 caracteres
function generarCodigo($longitud) {
    $caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    $codigo = '';
    for ($i = 0; $i < $longitud; $i++) {
        $codigo .= $caracteres[rand(0, strlen($caracteres) - 1)];
    }
    return $codigo;
}

// Funcion para enviar correo de verificación
function enviarCorreoVerificacion($correoDestino, $codigo) {

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'bizclub2023@gmail.com'; 
        $mail->Password   = 'cdeylerydrvgcjwv';
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;

        $mail->setFrom('bizclub2023@gmail.com', 'BizClub');
        $mail->addAddress($correoDestino);
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';  // Asegurarse de que se usen caracteres UTF-8
        $mail->Subject = 'Código de Verificación';
        $mail->Body    = "Tu código de verificación es: <strong>$codigo</strong>";

        $mail->send();
        return true;

    } catch (Exception $e) {

        return false;

    }

}
//// REGISTRO DE USUARIOS

//// CONFIRMAR CODIGO DE REGISTRO
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['verificar_codigo'])) {

    try {

        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $email = $_POST['user_email'];

        // Si el código ya fue validado en el frontend, solo actualizamos el estado del usuario
        $updateStmt = $pdo->prepare("UPDATE usuarios SET user_estado = 'Activo' WHERE user_correo = :email");
        $updateStmt->execute([':email' => $email]);

        if ($updateStmt->rowCount() > 0) {
            echo "¡Verificación exitosa! Tu cuenta está ahora activa.";
        } else {
            echo "No se encontró un usuario con ese correo o ya está activo.";
        }

    } catch (Exception $e) {
        
        echo "Error: " . $e->getMessage();
        
    }
    
}
//// CONFIRMAR CODIGO DE REGISTRO

//// RECUPERAR CONTRASEÑA
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['verifiEmail_recuContra'])) {

    try {

        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        if ($_POST['verifiEmail_recuContra'] === 'true') {

            $email = $_POST['email'];
            $stmt = $pdo->prepare("SELECT user_correo FROM usuarios WHERE user_correo = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {

                $codigo = generarCodigo(8);
                
                $mail = new PHPMailer(true);
                
                try {

                    $mail->isSMTP();
                    $mail->Host       = 'smtp.gmail.com';
                    $mail->SMTPAuth   = true;
                    $mail->Username   = 'bizclub2023@gmail.com';
                    $mail->Password   = 'cdeylerydrvgcjwv';
                    $mail->SMTPSecure = 'ssl';
                    $mail->Port       = 465;

                    $mail->setFrom('bizclub2023@gmail.com', 'BizClub');
                    $mail->addAddress($email);
                    $mail->isHTML(true);
                    $mail->CharSet = 'UTF-8';
                    $mail->Subject = 'Código de Verificación';
                    $mail->Body    = "Tu código de verificación es: <strong>$codigo</strong>";

                    $mail->send();

                    echo json_encode(['success' => true, 'code' => $codigo]);
                    exit;

                } catch (Exception $e) {

                    echo json_encode(['success' => false, 'message' => 'Error al enviar el correo.']);
                    exit;

                }

            } else {

                echo json_encode(['success' => false, 'message' => 'Correo no encontrado.']);
                exit;

            }

        }

    } catch (PDOException $e) {

        echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos.']);
        exit;

    }
    
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cambiar_contrasenia'])) {

    try {

        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        if ($_POST['cambiar_contrasenia'] === 'true') {

            $email = $_POST['email'];
            $nuevaContra = $_POST['password'];

            if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/', $nuevaContra)) {
                echo json_encode(['success' => false, 'message' => 'La contraseña no cumple con los requisitos.']);
                exit;
            }

            $stmt = $pdo->prepare("UPDATE usuarios SET user_contrasenia = :password WHERE user_correo = :email");
            $stmt->bindParam(':password', $nuevaContra);  
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            echo json_encode(['success' => true, 'message' => 'Contraseña actualizada correctamente.']);
            exit;
        }

    } catch (PDOException $e) {

        echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos: ' . $e->getMessage()]);
        exit;

    }

}
//// RECUPERAR CONTRASEÑA

//// CALENDARIO DE RESERVAS
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion_buscarReseCalenda'])){

    try{

        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        if($_POST['accion_buscarReseCalenda'] === 'reservas_tipoMes'){

            $mesAnteriorFecha = $_POST['mesAnteriorFecha'] ?? '';
            $mesActualFecha = $_POST['mesActualFecha'] ?? '';
            $mesProximoFecha = $_POST['mesProximoFecha'] ?? '';

            $stmt = $pdo->prepare("
            SELECT * FROM reservas 
            JOIN usuarios ON usuarios.id_usuario = reservas.id_usuario
            JOIN unidades ON unidades.id_unidad = reservas.id_unidad
            JOIN productos ON productos.id_producto = reservas.id_producto
            WHERE rese_fechaIniTex LIKE CONCAT('%', :fechaMAnte, '%')
            OR rese_fechaFinTex LIKE CONCAT('%', :fechaMAnte, '%')
            OR rese_fechaIniTex LIKE CONCAT('%', :fechaMActu, '%')
            OR rese_fechaFinTex LIKE CONCAT('%', :fechaMActu, '%')
            OR rese_fechaIniTex LIKE CONCAT('%', :fechaMProx, '%')
            OR rese_fechaFinTex LIKE CONCAT('%', :fechaMProx, '%')
            ORDER BY rese_fechaIniTex ASC, rese_horaIni ASC;
            ");

            $stmt->bindValue(':fechaMAnte', $mesAnteriorFecha, PDO::PARAM_STR);
            $stmt->bindValue(':fechaMActu', $mesActualFecha, PDO::PARAM_STR);
            $stmt->bindValue(':fechaMProx', $mesProximoFecha, PDO::PARAM_STR);

            $stmt->execute();
            $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['success' => true, 'resesCalendaMes' => $reservas]);
            exit;

        }

    }catch(PDOException $e){

        echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos: ' . $e->getMessage()]);
        exit;

    };
    
}
//// CALENDARIO DE RESERVAS

//// CALENDARIO DE RESERVAS - OPCIONES DE RESERVA
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['opcion_reservaLista'])){

    try{

        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        if($_POST['opcion_reservaLista'] == "Cancelar"){

            $fechaCancelacion = date('Y-m-d');
            $horaCancelacion = date('h:i A');

            $idReserva = $_POST['idReservaOpcion'] ?? '';

            $stmt = $pdo->prepare("
            UPDATE reservas SET 
            rese_estado = 'Cancelada', 
            rese_fechaCancel = :fechaCancel, 
            rese_horaCancel = :horaCancel
            WHERE id_reserva = :idReseCancel;
            ");
            $stmt->bindParam(':idReseCancel', $idReserva);
            $stmt->bindParam(':horaCancel', $horaCancelacion);
            $stmt->bindParam(':fechaCancel', $fechaCancelacion);
            $stmt->execute();

            echo json_encode(['success' => true, 'idCambiado' => $idReserva]);
            exit;

        }

    }catch(PDOException $e){

        echo json_encode(['success' => false, 'message' => 'Error al ejecutar la opción: ' . $e->getMessage()]);
        exit;

    }

}
//// CALENDARIO DE RESERVAS - OPCIONES DE RESERVA

//// CALENDARIO DE RESERVAS - ACTUALIZACIÓN AUTOMATICA DE RESERVAS
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['actuAutomaticaReseCalenda'])) {

    try {
        // Establecer la zona horaria en PHP
        date_default_timezone_set('America/Bogota');

        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        // Asegurar que MySQL use la hora de Colombia
        $pdo->exec("SET time_zone = '-05:00'");

        $query = "
        UPDATE reservas SET rese_estado = 
        CASE 
            WHEN rese_estado = 'Cancelada' THEN rese_estado 
            WHEN UNIX_TIMESTAMP(NOW()) < rese_fechaIniNum THEN 'Pendiente' 
            WHEN UNIX_TIMESTAMP(NOW()) BETWEEN rese_fechaIniNum AND rese_fechaFinNum 
                 AND (TIME_TO_SEC(TIME(NOW())) < TIME_TO_SEC(STR_TO_DATE(rese_horaIni, '%h:%i %p')) 
                 OR TIME_TO_SEC(TIME(NOW())) > TIME_TO_SEC(STR_TO_DATE(rese_horaFin, '%h:%i %p')))
            THEN 'Pausada' 
            WHEN UNIX_TIMESTAMP(NOW()) BETWEEN rese_fechaIniNum AND rese_fechaFinNum 
                 AND TIME_TO_SEC(TIME(NOW())) BETWEEN TIME_TO_SEC(STR_TO_DATE(rese_horaIni, '%h:%i %p')) AND TIME_TO_SEC(STR_TO_DATE(rese_horaFin, '%h:%i %p'))
            THEN 'Activa' 
            WHEN UNIX_TIMESTAMP(NOW()) > rese_fechaFinNum THEN 'Terminada' 
            ELSE rese_estado 
        END 
        WHERE rese_estado != 'Cancelada'";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        
        echo json_encode(["success" => true, "message" => "Reservas actualizadas correctamente"]);

    } catch (PDOException $e) {

        echo json_encode(['success' => false, 'message' => 'Error al ejecutar la actualización de Reservas: ' . $e->getMessage()]);
        exit;

    }

}
//// CALENDARIO DE RESERVAS - ACTUALIZACIÓN AUTOMATICA DE RESERVAS

//* CONSULTAS - FIN *//

?>

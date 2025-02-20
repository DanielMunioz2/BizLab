<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    require_once 'Libreria/dompdf/autoload.inc.php';
    use Dompdf\Dompdf;
    use Dompdf\Options;
    
    include("conexion.php");
    $id_usuario = $_GET['id_usuario'];
    
    $query = "SELECT u.user_nombre, u.user_apellido, u.user_correo, u.user_genero, u.user_celular, u.user_documento, u.user_fNacimiento, u.user_direc, u.user_ciudad, u.user_rol, m.membre_nombre 
    FROM usuarios u LEFT JOIN membresias m ON u.user_membresia = m.id_membresia WHERE u.id_usuario = '$id_usuario'";
    
    $result = $conn->query($query);
    $user = $result->fetch_assoc();
    
    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', true);
    $dompdf = new Dompdf($options);
    
    $html = '<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Detalle del Usuario</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            h1 {
                color: #333;
            }
            .detalle {
                margin-bottom: 15px;
            }
        </style>
    </head>
    <body>';
    
    $html .= '<h1>Detalle del Usuario</h1>';
    $html .= '<div class="detalle"><strong>Nombres:</strong> ' . $user['user_nombre'] . '</div>';
    $html .= '<div class="detalle"><strong>Apellidos:</strong> ' . $user['user_apellido'] . '</div>';
    $html .= '<div class="detalle"><strong>Correo:</strong> ' . $user['user_correo'] . '</div>';
    $html .= '<div class="detalle"><strong>Género:</strong> ' . $user['user_genero'] . '</div>';
    $html .= '<div class="detalle"><strong>Teléfono:</strong> ' . $user['user_celular'] . '</div>';
    $html .= '<div class="detalle"><strong>Membresía:</strong> ' . $user['membre_nombre'] . '</div>';
    $html .= '<div class="detalle"><strong>Rol:</strong> ' . $user['user_rol'] . '</div>';
    $html .= '<div class="detalle"><strong>Ciudad:</strong> ' . $user['user_ciudad'] . '</div>';
    $html .= '<div class="detalle"><strong>Cédula:</strong> ' . $user['user_documento'] . '</div>';
    $html .= '<div class="detalle"><strong>Dirección:</strong> ' . $user['user_direc'] . '</div>';
    $html .= '<div class="detalle"><strong>Fecha de Nacimiento:</strong> ' . $user['user_fNacimiento'] . '</div>';
    
    $html .= '</body>
    </html>';
    
    $dompdf->loadHtml($html);
    $dompdf->setPaper('A4', 'portrait');
    $dompdf->render();
    
    $dompdf->stream("detalle_usuario.pdf", array("Attachment" => false));
    exit();

?>

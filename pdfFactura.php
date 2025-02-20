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
    
    require_once("conexion.php");
    
    $id_factura = $_GET['id_factura'];
    
    $query = "SELECT f.fechaFactura, f.estadoFactura, f.precioFactura, f.bancoNombre, f.ivaFactura, f.refEpayco, f.facturaCodigo, f.descuFactura, f.montoFactuTotal, f.tokenTarjeta, f.factuEpayco, f.id_producto, f.id_membresia, f.id_usuario,
                     p.produNombre, m.membre_nombre, u.user_nombre
              FROM facturas f
              LEFT JOIN productos p ON f.id_producto = p.id_producto
              LEFT JOIN membresias m ON f.id_membresia = m.id_membresia
              LEFT JOIN usuarios u ON f.id_usuario = u.id_usuario
              WHERE f.id_factura = '$id_factura'";
    
    $result = $conn->query($query);
    $factura = $result->fetch_assoc();
    
    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', true);
    $dompdf = new Dompdf($options);
    
    $html = '<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Detalle de la Factura</title>
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
            .detalle strong {
                display: inline-block;
                width: 150px;
            }
        </style>
    </head>
    <body>';
    
    $html .= '<h1>Detalle de la Factura</h1>';
    $html .= '<div class="detalle"><strong>Nombre del Usuario:</strong> ' . htmlspecialchars($factura['user_nombre']) . '</div>';
    $html .= '<div class="detalle"><strong>Referencia Epayco:</strong> ' . htmlspecialchars($factura['refEpayco']) . '</div>';
    $html .= '<div class="detalle"><strong>Factura Epayco:</strong> ' . htmlspecialchars($factura['factuEpayco']) . '</div>';
    $html .= '<div class="detalle"><strong>Código:</strong> ' . htmlspecialchars($factura['facturaCodigo']) . '</div>';
    $html .= '<div class="detalle"><strong>Estado:</strong> ' . htmlspecialchars($factura['estadoFactura']) . '</div>';
    $html .= '<div class="detalle"><strong>Precio:</strong> ' . htmlspecialchars($factura['precioFactura']) . '</div>';
    $html .= '<div class="detalle"><strong>IVA:</strong> ' . htmlspecialchars($factura['ivaFactura']) . '</div>';
    $html .= '<div class="detalle"><strong>Descuento:</strong> ' . htmlspecialchars($factura['descuFactura']) . '</div>';
    $html .= '<div class="detalle"><strong>Precio Total:</strong> ' . htmlspecialchars($factura['montoFactuTotal']) . '</div>';
    $html .= '<div class="detalle"><strong>Token Tarjeta:</strong> ' . htmlspecialchars($factura['tokenTarjeta']) . '</div>';
    $html .= '<div class="detalle"><strong>Banco:</strong> ' . htmlspecialchars($factura['bancoNombre']) . '</div>';
    $html .= '<div class="detalle"><strong>Membresia:</strong> ' . htmlspecialchars($factura['membre_nombre']) . '</div>';
    $html .= '<div class="detalle"><strong>Producto:</strong> ' . htmlspecialchars($factura['produNombre']) . '</div>';
    
    $html .= '</body>
    </html>';
    
    $dompdf->loadHtml($html);
    $dompdf->setPaper('A4', 'portrait');
    $dompdf->render();
    
    $dompdf->stream("detalle_factura.pdf", array("Attachment" => false));
    exit();

?>

<?php
/*En esta página se reciben las variables enviadas desde ePayco hacia el servidor.
Antes de realizar cualquier movimiento en base de datos se deben comprobar algunos valores
Es muy importante comprobar la firma enviada desde ePayco
Ingresar  el valor de p_cust_id_cliente lo encuentras en la configuración de tu cuenta ePayco
Ingresar  el valor de p_key lo encuentras en la configuración de tu cuenta ePayco
*/

// 1511557
// 22287e20748f2006e410e9ad8a1372124be0d71f
// curl --location 'https://apify.epayco.co/login' \
// --header 'Authorization: Basic MjAwNWMxOTQyNGM4M2QzM2IxNDZjNzA0NTY0N2JmZjA6NGMzYjgzNmRlYzk2NjYwNGRkMjRjOThhOTEwYTI2N2Q='

// Personal
// $p_cust_id_cliente = '1475696';
// $p_key             = '8805ed9259269323d45afeff2fb9fc4a049b4b5c';

// BizLab
$p_cust_id_cliente = '1511557';
$p_key             = '22287e20748f2006e410e9ad8a1372124be0d71f';

$x_ref_payco      = $_REQUEST['x_ref_payco'];
$x_transaction_id = $_REQUEST['x_transaction_id'];
$x_amount         = $_REQUEST['x_amount'];
$x_currency_code  = $_REQUEST['x_currency_code'];
$x_signature      = $_REQUEST['x_signature'];



$signature = hash('sha256', $p_cust_id_cliente . '^' . $p_key . '^' . $x_ref_payco . '^' . $x_transaction_id . '^' . $x_amount . '^' . $x_currency_code);

// obtener invoice y valor en el sistema del comercio
$numOrder = '2531'; // Este valor es un ejemplo se debe reemplazar con el número de orden que tiene registrado en su sistema
$valueOrder = '10000';  // Este valor es un ejemplo se debe reemplazar con el valor esperado de acuerdo al número de orden del sistema del comercio

$x_response     = $_REQUEST['x_response'];
$x_motivo       = $_REQUEST['x_response_reason_text'];
$x_id_invoice   = $_REQUEST['x_id_invoice'];
$x_autorizacion = $_REQUEST['x_approval_code'];
// se valida que el número de orden y el valor coincidan con los valores recibidos
if ($x_id_invoice === $numOrder && $x_amount === $valueOrder) {
//Validamos la firma
if ($x_signature == $signature) {
    /*Si la firma esta bien podemos verificar los estado de la transacción*/
    $x_cod_response = $_REQUEST['x_cod_response'];
    switch ((int) $x_cod_response) {
        case 1:
            # code transacción aceptada
            //echo "transacción aceptada";
            break;
        case 2:
            # code transacción rechazada
            //echo "transacción rechazada";
            break;
        case 3:
            # code transacción pendiente
            //echo "transacción pendiente";
            break;
        case 4:
            # code transacción fallida
            //echo "transacción fallida";
            break;
        }
    } else {
        die("Firma no válida");
    }
} else {
    die("número de orden o valor pagado no coinciden");
}
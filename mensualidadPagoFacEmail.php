<?php

    session_start();

    require("conexion.php");

    require __DIR__ . "/vendor/autoload.php";
    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use Dompdf\Dompdf;
    use Dompdf\Options;

    if($_SESSION["iniciado"] != null){

        $resultadoUser = 
            $conn->query(
                "SELECT * FROM `gdrfkbmy_bizlabDB`.`usuarios` 
                WHERE `usuarios`.`id_usuario` = ".$_SESSION["iniciado"]."");
        
        $resultadoUser = $resultadoUser->fetch_assoc();

        $fechaCrea = "";
        $horaCrea = "";
        $serieFactu = "";
        $codFactu = "";
        $ivaMembre = "";
        $descuMem = "";
        $precioMem = "";
        $subtotalFac = "";
        $totalFac = "";
        $direccUser = "";
        $numPedido = "";
        $fCaduFac = "";
        $numFac = "";
        $nomMembre = "";
        $nomUser = "";
        $correoUser = "";
        $codMembre = "";

        // Hora y Fecha

            //Definimos la zona horario.
            date_default_timezone_set('America/Bogota');

            $diaTexto = date("Ymd");
            $hora = date("H:i:s");
            $hora1 = date("H");
            $hora2 = date("i");
            $hora3 = date("s");

        //---------------------------------------------------------

        // Variables de la Factura

        if(isset($_POST["codMembresiaEmail"])){

            $fechaCrea = $_POST["fechaCreaFac"];
            $horaCrea = $_POST["horaCreaFac"];
            $serieFactu = $_POST["serieFac"];
            $codFactu = $_POST["codigoFac"];
            $ivaMembre = $_POST["ivaCantMembresia"];
            $descuMem = $_POST["descuCantMembresia"];
            $precioMem = $_POST["mensuaMembresia"];
            $subtotalFac = $_POST["mensuaMembresia"];
            $totalFac = $_POST["totalMembresia"];
            $direccUser = $resultadoUser["user_direc"];
            $numPedido = $_POST["facNumPedido"];
            $fCaduFac = $_POST["fechaCaducaFac"];
            $numFac = $_POST["codigoFac"];
            $nomMembre = $_POST["membreNombre"];
            $nomUser = $resultadoUser["user_nombre"]." ".$resultadoUser["user_nombre"];
            $correoUser = $resultadoUser["user_correo"];
            $codMembre = $_POST["codMembresiaEmail"];
            $respuesta = $_POST["respuestaEpay"];
            $motivo = $_POST["motivoEpay"];

            $options = new Options;
            $options->setChroot(__DIR__);
            $options->setIsRemoteEnabled(true);

            $dompdf = new Dompdf($options);

            $dompdf->setPaper("A5", "landscape");

            $html = file_get_contents("plantillaFacMem.html");
            $html = str_replace(["{{fechaCreaFac}}", "{{horaCreaFac}}", "{{serieFac}}", 
                "{{codFac}}", "{{iva}}", "{{descu}}", 
                "{{precio}}", "{{subtotal}}", "{{total}}", 
                "{{direcc}}", "{{numPedido}}", "{{fCaduca}}",
                "{{numFac}}", "{{nombreMembre}}", "{{nomUser}}"],
                [$fechaCrea, $horaCrea, $serieFactu,
                $codFactu, $ivaMembre, $descuMem,
                $precioMem, $subtotalFac, $totalFac,
                $direccUser, $numPedido, $fCaduFac,
                $numFac, $nomMembre, $nomUser], 
                $html);

            $dompdf->loadHtml($html);
            $dompdf->render();

            $dompdf->addInfo("Title", "Factura-Membresía");

            // $dompdf->stream("Factura-Mem".$diaTexto.$hora1.$hora2.$hora3.".pdf", ["Attachment" => 1]);

            $output = $dompdf->output();
            file_put_contents("bills/Factura-Mem_Mensualidad".$diaTexto.$hora1.$hora2.$hora3.".pdf", $output);
            
            //---------------------------------------------------------------------

            //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            //---------------------------------------------------------------------
            // Email de la Factura
            //---------------------------------------------------------------------
            //jiabbmmobophejbg

            $mail = new PHPMailer(true);

            //Server settings
            $mail->isSMTP();                              //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';       //Set the SMTP server to send through
            $mail->SMTPAuth   = true;             //Enable SMTP authentication
            $mail->Username   = 'bizclub2023@gmail.com';   //SMTP write your email
            $mail->Password   = 'cdeylerydrvgcjwv';      //SMTP password
            $mail->SMTPSecure = 'ssl';            //Enable implicit SSL encryption
            $mail->Port       = 465;                                    

            //Recipients
            $mail->setFrom('abcde2034@gmail.com', 'BizLab SAS'); // Sender Email and name
            $mail->addAddress($correoUser);     //Add a recipient email  
            $mail->addReplyTo('abcde2034@gmail.com', 'BizLab SAS'); // reply to sender email

            //Attachments
            $mail->addAttachment('bills/Factura-Mem_Mensualidad'.$diaTexto.$hora1.$hora2.$hora3.'.pdf');

            //Content
            $mail->isHTML(true);               //Set email format to HTML
            $mail->Subject = 'BizClub - Pago de Mensualidad | Factura de Compra';   // email subject headings
            $mail->Body    = '<span style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">Descargue la factura adjunta:</span><br><br>
            <b style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">Membresía: </b><span style="font-size: 15px; margin-left: .2rem; color: #444; font-family: `Montserrat`, sans-serif;">'.$codMembre.'</span><br><br>
            <span style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;"><b style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">Usuario: </b>'.$nomUser.'</span><br><br>
            <span style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;"><b style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">Próximo Pago (fecha): </b>'.$fCaduFac.'</span><br><br><br>
            ------------------------------------------------------------------------------------------------<br><br>
            <span style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">Correo generado automáticamente, por favor no responder.</span><br><br>
            ------------------------------------------------------------------------------------------------'; //email message

            // Success sent message alert
            $mail->send();
            // echo
            // " 
            // <script> 
            //  document.location.href = 'recuperarContrasenia2.php';
            // </script>
            // ";

            //---------------------------------------------------------------------

            //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        }
        //------------------------------------------------------

    }else{

        header("location:inicioSesion.php");

    }

?>

<!DOCTYPE html>
<html lang="es" class="reseFactuCompraHTML">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Factura de Compra - Mensualidad</title>
        <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
        <link rel="stylesheet" href="estilos/factuCompraRese.css">
    </head>
    <body class="body">
        <main class="main">
            <div class="divSvg">
                <svg class="footer_logoBizSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.43 39.84"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M72.55,19.72c-.51-.49-.49-.79-.1-1.27a9.71,9.71,0,0,0,1.65-3A11.54,11.54,0,0,0,63.13,0Q41.55,0,19.94,0a19.89,19.89,0,0,0-.68,39.76c7.53.15,15.07,0,22.61,0v0H64.24a12.61,12.61,0,0,0,3.91-.44C76.92,36.52,79.26,26.12,72.55,19.72ZM65.42,33.37a13.3,13.3,0,0,1-1.55.08H20.32A13.18,13.18,0,0,1,8.84,27.68,12.85,12.85,0,0,1,7.69,14.15C10,9.38,13.91,6.54,19.22,6.49c14.72-.15,29.44-.07,44.16,0a5.05,5.05,0,0,1,5,5.09,5.13,5.13,0,0,1-4.91,5.18c-.4,0-.8,0-1.2,0l-38.53,0A3.21,3.21,0,0,0,20.39,20a3.26,3.26,0,0,0,3.42,3.23q20.52,0,41-.06a5.11,5.11,0,0,1,.57,10.2Z"/></g></g></svg>    
            </div>
            <div class="baseFactura">
                <span class="tituloRespuesta">Respuesta de la transacción</span>
                <div class="divDataRespuestaTransa">
                    <div class="divDatoBasePri">
                        <div class="div1">
                            <span>Referencia</span>
                        </div>
                        <div class="div2">
                            <span><?php echo $codFactu; ?></span>
                        </div>
                    </div> 
                    <div class="divDatoBase">
                        <div class="div1">
                            <span>Fecha</span>
                        </div>
                        <div class="div2">
                            <span><?php echo $fechaCrea." | ".$horaCrea; ?></span>
                        </div>
                    </div>
                    <div class="divDatoBase">
                        <div class="div1">
                            <span>Respuesta</span>
                        </div>
                        <div class="div2">
                            <span><?php echo $respuesta; ?></span>
                        </div>
                    </div> 
                    <div class="divDatoBase">
                        <div class="div1">
                            <span>Motivo</span>
                        </div>
                        <div class="div2">
                            <span><?php echo $motivo; ?></span>
                        </div>
                    </div> 
                    <div class="divDatoBaseUlti">
                        <div class="div1">
                            <span>TOTAL</span>
                        </div>
                        <div class="div2">
                            <span><?php echo $totalFac; ?></span>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="spanInfoCorreo">
                <span>Se ha enviado un correo a <b><?php echo $resultadoUser["user_correo"]; ?></b>. Revisa tu bandeja para obtener tu factura.</span>
            </div>
            <div class="btnDiv">
                <button class="btnVolver">Volver a <b>BizClub</b></button>
            </div>
        </main>
    </body>
    <script>

        history.replaceState(null,null,"index.php");
        document.querySelector(".btnVolver").addEventListener("click", ()=>{

            window.location.href = "index.php";

        });

    </script>
</html>
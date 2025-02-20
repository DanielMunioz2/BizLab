<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
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
                "SELECT * FROM `soqkyjmy_bizclubPlataformaDb`.`usuarios` 
                WHERE `usuarios`.`id_usuario` = ".$_SESSION["iniciado"]."");
        
        $resultadoUser = $resultadoUser->fetch_assoc();

        $fechaCrea = "";
        $horaCrea = "";
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
        $codMiembro = "";

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
        if(isset($_POST["fechaCrea"])){
            $fechaCrea = $_POST["fechaCrea"];
            $horaCrea = $_POST["horaCrea"];
            $serieFactu = $_POST["serieFactu"];
            $codFactu = $_POST["codFactu"];
            $ivaMembre = $_POST["ivaMembreFac"];
            $descuMem = $_POST["descuMem"];
            $precioMem = $_POST["precioMem"];
            $subtotalFac = $_POST["subtotalFac"];
            $totalFac = $_POST["totalFac"];
            $direccUser = $_POST["direccUserFac"];
            $numPedido = $_POST["numPedido"];
            $fCaduFac = $_POST["fCaduFac"];
            $numFac = $_POST["numFac"];
            $nomMembre = $_POST["nomMembre"];
            $nomUser = $_POST["nomUser"];
            $correoUser = $_POST["corrUserFac"];
            $codMiembro = $_POST["miembroCod"];

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
            file_put_contents("bills/Factura-Mem".$diaTexto.$hora1.$hora2.$hora3.".pdf", $output);
            
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
            $mail->addAttachment('bills/Factura-Mem'.$diaTexto.$hora1.$hora2.$hora3.'.pdf');

            //Content
            $mail->isHTML(true);               //Set email format to HTML
            $mail->Subject = 'BizClub - Nuevo Miembro | Factura de Compra';   // email subject headings
            $mail->Body    = '<span style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">Descargue la factura adjunta:</span><br><br>
            <b style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">Su código de miembro es: </b><span style="font-size: 15px; margin-left: .2rem; color: #444; font-family: `Montserrat`, sans-serif;">'.$codMiembro.'</span><br><br>
            <span style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">Guarde este código para acceder a las instalaciones de BizClub e identificarse.</span><br><br><br>
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

        if(isset($_POST["crearFactura"])){

            // Retomando Variables
            $fechaCrea = $_POST["fechaCrea2"];
            $horaCrea = $_POST["horaCrea2"];
            $serieFactu = $_POST["serieFactu2"];
            $codFactu = $_POST["codFactu2"];
            $ivaMembre = $_POST["ivaMembreFac2"];
            $descuMem = $_POST["descuMem2"];
            $precioMem = $_POST["precioMem2"];
            $subtotalFac = $_POST["subtotalFac2"];
            $totalFac = $_POST["totalFac2"];
            $direccUser = $_POST["direccUserFac2"];
            $numPedido = $_POST["numPedido2"];
            $fCaduFac = $_POST["fCaduFac2"];
            $numFac = $_POST["numFac2"];
            $nomMembre = $_POST["nomMembre2"];
            $nomUser = $_POST["nomUser2"];
            //--------------------------------------------------------

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

            $dompdf->stream("Factura-Mem".$diaTexto.$hora1.$hora2.$hora3.".pdf", ["Attachment" => 1]);

            // $output = $dompdf->output();
            // file_put_contents("bills/Factura-$diaTexto"."_".$hora, $output);

        }

    }
    
    //----------------------------------------------------------------------------------------------------------

?>

<!DOCTYPE html>
<html lang="en" class="generaFacPdfHTML">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Compra Exitosa</title>
        <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
        <link rel="stylesheet" href="estilos/genePdfFacMem.css">

        <!-- Form Descargar Factura -->
        <form
            id="formCrearFacturaMembre"
            name="formCrearFacturaMembre"
            method="post"
            action="genePdfFacMem.php"
        >
            <input type="hidden" name="crearFactura" value="true">
            <input type="hidden" name="fechaCrea2" value="<?php echo $fechaCrea; ?>">
            <input type="hidden" name="horaCrea2" value="<?php echo $horaCrea; ?>">
            <input type="hidden" name="serieFactu2" value="<?php echo $serieFactu; ?>">
            <input type="hidden" name="codFactu2" value="<?php echo $codFactu; ?>">
            <input type="hidden" name="ivaMembreFac2" value="<?php echo $ivaMembre; ?>">
            <input type="hidden" name="descuMem2" value="<?php echo $descuMem; ?>">
            <input type="hidden" name="precioMem2" value="<?php echo $precioMem; ?>">
            <input type="hidden" name="subtotalFac2" value="<?php echo $subtotalFac; ?>">
            <input type="hidden" name="totalFac2" value="<?php echo $totalFac; ?>">
            <input type="hidden" name="direccUserFac2" value="<?php echo $direccUser; ?>">
            <input type="hidden" name="numPedido2" value="<?php echo $numPedido; ?>">
            <input type="hidden" name="fCaduFac2" value="<?php echo $fCaduFac; ?>">
            <input type="hidden" name="numFac2" value="<?php echo $numFac; ?>">
            <input type="hidden" name="nomMembre2" value="<?php echo $nomMembre; ?>">
            <input type="hidden" name="nomUser2" value="<?php echo $nomUser; ?>">
        </form>
        <!----------------------------------------------------------------------------------------->
        
    </head>
    <body class="body">
        <main class="main">
            <div class="divContentGene">
                <img class="img1" src="images\medalla.png" alt="">
                <img class="img2" src="images\medalla.png" alt="">
                <span class="bienvenido">¡Bienvenido a <b>BizClub</b> <?php echo $resultadoUser["user_nombre"]; ?>!</span>
                <div class="divTarjetaMem">
                    <div class="tarjeta">
                        <div class="imgPersoGene">
                            <div class="img">
                                <img src="imagesUser/<?php echo $resultadoUser["user_imagen"]; ?>" alt="">
                            </div>
                            <div class="divSpans">
                                <span class="span1"><?php echo $nomMembre; ?></span>
                                <span class="span2">
                                    <?php echo $resultadoUser["user_cargo"]." - ".$resultadoUser["user_empresa"]." | ".$resultadoUser["user_empresaNit"]; ?>
                                </span>
                                <span class="span3">CC <?php echo $resultadoUser["user_documento"]; ?></span>
                                <span class="span4"><?php echo $resultadoUser["user_ciudad"]; ?></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="divCodNewMiembro">
                    <span class="codMiemSpan">Código del Miembro</span>
                    <div class="divCod">
                        <div class="divCod2">
                            <span><?php echo $codMiembro; ?></span>
                        </div>
                    </div>
                    <div class="instru">
                        <span>Guarde este código para acceder a las instalaciones e identificarse</span>
                    </div>
                </div>
                <div class="divBtns">
                    <div class="divBtnVol">
                        <button
                            class="btnVolver"
                            id="btnVolver"
                        >
                            Ir al inicio
                        </button>
                    </div>
                    <div class="divBtnDes">
                        <button 
                            class="btnFactuDescargar"
                            id="btnFactuDescargar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166.4 166.35"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M166.37,115.4c0-7.37-4.52-12.35-10.89-12.26s-10.68,5-10.74,12.41c-.05,7.83-.13,15.67,0,23.5.07,3.49-.87,5.16-4.74,5.15q-56.49-.15-113,0c-3.75,0-4.95-1.49-4.87-5.07.15-7.66.07-15.33,0-23-.09-7.83-4.35-12.79-10.95-12.92S.24,107.8.13,115.83c-.15,12.33-.21,24.66,0,37,.19,9.93,4,13.5,13.86,13.51q34.5,0,69,0,35.25,0,70.49,0c8.64,0,12.82-4.25,12.85-12.94Q166.44,134.4,166.37,115.4Z"/><path d="M75.58,121.6c4.64,4.56,10.69,4.71,15.26.24q21.06-20.62,41.68-41.7a10.94,10.94,0,0,0-.1-15A11.14,11.14,0,0,0,117,64.85c-2.37,2.08-4.47,4.47-6.72,6.7-5,4.93-10,9.84-15.11,14.88-1.29-2.09-.94-3.62-.94-5.08,0-12.49,0-25,0-37.47,0-11,.1-22-.1-33C94,4.86,90,.63,84.46.07c-5.9-.6-10.6,2.85-11.86,9A36.93,36.93,0,0,0,72,16.52c0,21.32,0,42.63,0,64,0,1.74.58,3.63-.68,5.28-1.89-.31-2.71-1.91-3.84-3C61.53,76.9,55.78,70.86,49.72,65.16c-4.7-4.43-11-4.31-15.31-.14a10.44,10.44,0,0,0-.12,15.21Q54.77,101.08,75.58,121.6Z"/></g></g></svg>
                            Descargar Factura
                        </button>
                    </div>
                </div>
            </div>
        </main>
        <footer class="footer">
            <div class="footer_contenido">
                <div class="footer_redesSocialesContent">
                    
                </div>
                <svg class="footer_logoBizSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.43 39.84"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M72.55,19.72c-.51-.49-.49-.79-.1-1.27a9.71,9.71,0,0,0,1.65-3A11.54,11.54,0,0,0,63.13,0Q41.55,0,19.94,0a19.89,19.89,0,0,0-.68,39.76c7.53.15,15.07,0,22.61,0v0H64.24a12.61,12.61,0,0,0,3.91-.44C76.92,36.52,79.26,26.12,72.55,19.72ZM65.42,33.37a13.3,13.3,0,0,1-1.55.08H20.32A13.18,13.18,0,0,1,8.84,27.68,12.85,12.85,0,0,1,7.69,14.15C10,9.38,13.91,6.54,19.22,6.49c14.72-.15,29.44-.07,44.16,0a5.05,5.05,0,0,1,5,5.09,5.13,5.13,0,0,1-4.91,5.18c-.4,0-.8,0-1.2,0l-38.53,0A3.21,3.21,0,0,0,20.39,20a3.26,3.26,0,0,0,3.42,3.23q20.52,0,41-.06a5.11,5.11,0,0,1,.57,10.2Z"/></g></g></svg>
                <div class="footer_copyrightContent">
                    Copyright​ © 2024 BizLab SAS 
                </div>
            </div>
        </footer>
        <script src="scripts\app3.js"></script>
    </body>
    <script>

        history.replaceState(null,null,"index.php");

    </script>
</html>
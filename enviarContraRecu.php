<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    if(isset($_POST["send"])){

        $letras="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        $codigo = "";

        for($i=1;$i<11; $i++){
            $random1 = rand(1,2);
            if($random1==1){
                $random2= rand(0,51);
                $codigo.=$letras[$random2];
            }else{
                if($random1==2){
                    $codigo.=rand(1,9);
                }
            }
        }
        //Import PHPMailer classes into the global namespace
        //These must be at the top of your script, not inside a function
        

        //required files
       

        //Create an instance; passing `true` enables exceptions
        //if (isset($_POST["send"])) {

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
            $mail->setFrom( 'abcde2034@gmail.com', 'BizLab SAS'); // Sender Email and name
            $mail->addAddress($_POST['correoUser']);     //Add a recipient email  
            $mail->addReplyTo('abcde2034@gmail.com', 'BizLab SAS'); // reply to sender email

            //Content
            $mail->isHTML(true);               //Set email format to HTML
            $mail->Subject = 'BizClub - Recuperar Contrasenia';   // email subject headings
            $mail->Body    = '<span style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">El código de recuperacion para su contraseña <b>BizClub</b> es: </span><br><br>
            <span style="font-size: 18px; color: #333; font-family: `Montserrat`, sans-serif;">'.$codigo.'</span><br><br><br>
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
        //}
        echo json_encode($codigo, JSON_UNESCAPED_UNICODE);
        
    }else{
        if(isset($_POST["send2Correo"])){
            $letras="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

            $codigo = "";
    
            for($i=1;$i<11; $i++){
                $random1 = rand(1,2);
                if($random1==1){
                    $random2= rand(0,51);
                    $codigo.=$letras[$random2];
                }else{
                    if($random1==2){
                        $codigo.=rand(1,9);
                    }
                }
            }
            //Import PHPMailer classes into the global namespace
            //These must be at the top of your script, not inside a function
            
    
            //required files
           
    
            //Create an instance; passing `true` enables exceptions
            //if (isset($_POST["send"])) {
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
                $mail->setFrom( 'abcde2034@gmail.com', 'BizLab SAS'); // Sender Email and name
                $mail->addAddress($_POST['correoUser']);     //Add a recipient email  
                $mail->addReplyTo('abcde2034@gmail.com', 'BizLab SAS'); // reply to sender email
    
                //Content
                $mail->isHTML(true);               //Set email format to HTML
                $mail->Subject = 'BizClub - Confirma tu correo';   // email subject headings
                $mail->Body    = '<span style="font-size: 15px; color: #444; font-family: `Montserrat`, sans-serif;">El código para confirmar su cuenta <b>BizClub</b> es: </span><br><br>
                <span style="font-size: 18px; color: #333; font-family: `Montserrat`, sans-serif;">'.$codigo.'</span><br><br><br>
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
            //}
            
            echo json_encode($codigo, JSON_UNESCAPED_UNICODE);
            
        }else{
            header("location:inicioSesion.php");
        }  
    }


?>
<?php

    if(isset($_POST["transaPagoMembresia"])){

        //-------------------------------------------------------------------------------------------------------------------------
        // Variables

        $tokenTDC = $_POST["tokenTarjeta"];
        $totalTransa = $_POST["totalTransaccion"];
        $ivaTransa = $_POST["ivaTransaccion"];
        $ivaBaseTransa = $_POST["ivaBaseTransa"];
        $userDocuTransa = $_POST["userDocumentoTransa"];
        $userNombreTransa = $_POST["userNombreTransa"];
        $userApellidoTransa = $_POST["userApellidoTransa"];
        $userEmailTransa = $_POST["userEmailTransa"];
        $userCelularTransa = $_POST["userCelularTransa"];
        $userFechaTransa = $_POST["fechaTransa"];
        $userIP = $_POST["ipUserTransa"];
        $nombreTDC = $_POST["nombreTDCTransa"];
        $numeroTDC = $_POST["numeroTDC"];
        $mesVTDC = $_POST["mesVTDC"];
        $anioVTDC = $_POST["anioVTDC"];
        $numCVCTDC = $_POST["numCVCTDC"];
        

        $arrayDatosDevuelta = [];

        //-------------------------------------------------------------------------------------------------------------------------

        //-------------------------------------------------------------------------------------------------------------------------
        // CURL LOGIN EPAYCO

        // Personal
        // AUTHORIZATION: Basic Mjc0OGQ5YWI5YzcwNDFlMzY3MTFjMTlmNDgwMmM4Y2Y6ZjY2OGRkMTRjOTNhZmYzZDc4ZTg4NzZhNDYzNDYyOGU=

        // BizLab
        // AUTHORIZATION: Basic MjAwNWMxOTQyNGM4M2QzM2IxNDZjNzA0NTY0N2JmZjA6NGMzYjgzNmRlYzk2NjYwNGRkMjRjOThhOTEwYTI2N2Q=
        
        $curl = curl_init();
    
        $httpHeaders = array(
            'AUTHORIZATION: Basic MjAwNWMxOTQyNGM4M2QzM2IxNDZjNzA0NTY0N2JmZjA6NGMzYjgzNmRlYzk2NjYwNGRkMjRjOThhOTEwYTI2N2Q=',
            'Content-Type: application/json'
        );
    
        curl_setopt_array($curl, [
        CURLOPT_URL => "https://apify.epayco.co/login",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTPHEADER => $httpHeaders,
        ]);
    
        $response = curl_exec($curl);
    
        curl_close($curl);
        $token = json_decode($response, true);
    
        //-------------------------------------------------------------------------------------------------------------------------
        
        //-------------------------------------------------------------------------------------------------------------------------
        // Transacción TDC

        $transationTDC = curl_init();
    
        $httpHeadersTransa = array(
            'AUTHORIZATION: Bearer '.$token["token"],
            'Content-Type: application/json'
        );
    
        curl_setopt_array($transationTDC, array(
        CURLOPT_URL => 'https://apify.epayco.co/payment/process',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
            "value":"'.$totalTransa.'",
            "docType":"CC",
            "docNumber":"'.$userDocuTransa.'",
            "name":"'.$userNombreTransa.'",
            "lastName":"'.$userApellidoTransa.'",
            "email":"'.$userEmailTransa.'",
            "cellPhone":"'.$userCelularTransa.'",
            "phone":"0000000",
            "cardNumber":"'.$numeroTDC.'",
            "cardExpYear":"'.$anioVTDC.'",
            "cardExpMonth":"'.$mesVTDC.'",
            "cardCvc":"'.$numCVCTDC.'",
            "dues":"1",
            "_cardTokenId":"'.$tokenTDC.'"
        }',
        CURLOPT_HTTPHEADER => $httpHeadersTransa,
        ));
    
        $responseTransaTDC = curl_exec($transationTDC);
    
        curl_close($transationTDC);
    
        $responseTransaTDC = json_decode($responseTransaTDC, true);

        //-------------------------------------------------------------------------------------------------------------------------

        //-------------------------------------------------------------------------------------------------------------------------
        // Devolviendo los datos

        echo json_encode($responseTransaTDC, JSON_UNESCAPED_UNICODE);

        //-------------------------------------------------------------------------------------------------------------------------
        
    }

?>
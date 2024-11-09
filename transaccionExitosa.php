<!DOCTYPE html>
<html lang="es" class="transaExitosaHTML">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <title>Formulario Pruebas Respuesta</title>
  <!-- Bootstrap -->
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
  <link rel="stylesheet" href="estilos/transaccionExitosa.css">
  <style type="text/css">
    *{
      font-size: 10px;
    }
    .body{
      max-width: 100vw;
      min-height: 100vh;
      position: relative;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
    }
    @keyframes spinnerLoad {

      from{
        transform: rotate(0turn);
      }
      to{
        transform: rotate(1turn);
      }

    }
  </style>
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>

<body class="body">
  <div 
    class="cubiertaBase"
    style="width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #ffffff;"
  >
    <div 
      id="baseSpinnerCargaRese" 
      class="baseSpinnerCargaRese"
      style="visibility: hidden;
      opacity: 0;"
    >
      <div id="spinnerLoad"></div>
      <span id="spanSpinnerLoad" style="opacity: 0;">Procesando... Espera</span>
    </div>
  </div>
  <header id="main-header" style="margin-top:20px">
    <div class="row">
      <div class="col-lg-12 franja">
        <img class="center-block" src="https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/epayco/logo1.png" style="">
      </div>
    </div>
  </header>
  <div class="container">
    <div class="row" style="margin-top:20px">
      <div class="col-lg-8 col-lg-offset-2 ">
        <h4 style="text-align:left"> Respuesta de la Transacción </h4>
        <hr>
      </div>
      <div class="col-lg-8 col-lg-offset-2 ">
        <div class="table-responsive">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Referencia</td>
                <td id="referencia"></td>
              </tr>
              <tr>
                <td class="bold">Fecha</td>
                <td id="fecha" class=""></td>
              </tr>
              <tr>
                <td>Respuesta</td>
                <td id="respuesta"></td>
              </tr>
              <tr>
                <td>Motivo</td>
                <td id="motivo"></td>
              </tr>
              <tr>
                <td class="bold">Banco</td>
                <td class="" id="banco">
              </tr>
              <tr>
                <td class="bold">Recibo</td>
                <td id="recibo"></td>
              </tr>
              <tr>
                <td class="bold">Total</td>
                <td class="" id="total">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <form method="post" action="https://gdr.fkb.mybluehost.me/website_bizlabv1/registroReseFacNewRese.php" id="indexRegistroFacRese" name="indexRegistroFacRese">

    <input type="hidden" name="tituloRese" id="tituloRese" value="">
    <input type="hidden" name="activiRese" id="activiRese" value="">
    <input type="hidden" name="idUserRese" id="idUserRese" value="">
    <input type="hidden" name="idProdRese" id="idProdRese" value="">
    <input type="hidden" name="idUnidRese" id="idUnidRese" value="">
    <input type="hidden" name="numPersoRese" id="numPersoRese" value="">

    <input type="hidden" name="tipoRese" id="tipoRese" value="">

    <!-- Por hora -->
    <input type="hidden" name="diaReseInicioXH" id="diaReseInicioXH" value="">
    <input type="hidden" name="horaEntraInputXH" id="horaEntraInputXH" value="">
    <input type="hidden" name="horaSaleInputXH" id="horaSaleInputXH" value="">
    <input type="hidden" name="cantHorasXH" id="cantHorasXH" value="">
    <input type="hidden" name="cantMinusXH" id="cantMinusXH" value="">
    
    <!-- Por día -->
    <input type="hidden" name="diaReseInicioXD" id="diaReseInicioXD" value="">
    <input type="hidden" name="diaReseFinalXD" id="diaReseFinalXD" value="">
    <input type="hidden" name="cadenaDiasInputXD" id="cadenaDiasInputXD" value="">
    <input type="hidden" name="cantDiasInputXD" id="cantDiasInputXD" value="">
    
    <!-- Por semana -->
    <input type="hidden" name="semanaDiaInicio" id="semanaDiaInicio" value="">
    <input type="hidden" name="semanaDiaFinal" id="semanaDiaFinal" value="">
    <input type="hidden" name="semanaCadenaDias" id="semanaCadenaDias" value="">

    <!-- Factura -->
    <input type="hidden" name="ivaPdt" id="ivaPdt" value="">
    <input type="hidden" name="descuPdt" id="descuPdt" value="">
    <input type="hidden" name="reseCodigo" id="reseCodigo" value="">
    <input type="hidden" name="fechaCrea" id="fechaCrea" value="">
    <input type="hidden" name="horaCrea" id="horaCrea" value="">
    <input type="hidden" name="serieReseFac" id="serieReseFac" value="">
    <input type="hidden" name="fechaFactuVenci" id="fechaFactuVenci" value="">

    <input type="hidden" name="precio" id="precio" value="">
    <input type="hidden" name="precioXCant" id="precioXCant" value="">
    <input type="hidden" name="precioTotal" id="precioTotal" value="">
    <input type="hidden" name="inO_tipoUser" id="inO_tipoUser" value="">
    <input type="hidden" name="inO_idUserIni" id="inO_idUserIni" value="">

    <!-- Lo demás -->
    <input type="hidden" name="referenceEpaycoRese" id="referenceEpaycoRese" value="">
    <input type="hidden" name="codigoFacRese" id="codigoFacRese" value="">
    <input type="hidden" name="numCuotasRese" id="numCuotasRese" value="">
    <input type="hidden" name="transaTipoPago" id="transaTipoPago" value="">
    <input type="hidden" name="franquicieCard" id="franquicieCard" value="">
    <input type="hidden" name="nombreBanco" id="nombreBanco" value="">

    <input type="hidden" name="respuestaEpaycoTransa" id="respuestaEpaycoTransa" value="">
    <input type="hidden" name="motivoEpaycoTransa" id="motivoEpaycoTransa" value="">

  </form>
  <footer>
    <div class="row">
      <div class="container">
        <div class="col-lg-8 col-lg-offset-2">
          <img src="https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/epayco/pagos_procesados_por_epayco_260px.png" style="margin-top:10px; float:left"> <img src="https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/epayco/credibancologo.png"
            height="40px" style="margin-top:10px; float:right">
        </div>
      </div>
    </div>
  </footer>
  <script src="scripts\app2.js"></script>
  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script>
    function getQueryParam(param) {
      location.search.substr(1)
        .split("&")
        .some(function(item) { // returns first occurence and stops
          return item.split("=")[0] == param && (param = item.split("=")[1])
        })
      return param
    }
    $(document).ready(function() {
      //llave publica del comercio

      //Referencia de payco que viene por url
      var ref_payco = getQueryParam('ref_payco');
      //Url Rest Metodo get, se pasa la llave y la ref_payco como paremetro
      var urlapp = "https://secure.epayco.co/validation/v1/reference/" + ref_payco;

      $.get(urlapp, function(response) {


        if (response.success) {

          if (response.data.x_cod_response == 1) {
            //Codigo personalizado
            alert("Transaccion Aprobada");

            document.querySelector("#baseSpinnerCargaRese").removeAttribute("style");
            document.querySelector("#baseSpinnerCargaRese").setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0; z-index: 1000; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center;");
            document.querySelector("#spinnerLoad").setAttribute("style", "width: 15rem; height: 15rem; border: 15px solid #b8cee244; border-top-color: #1568b7; border-radius: 50%; animation: spinnerLoad 0.75s ease infinite;");
            document.querySelector("#spanSpinnerLoad").removeAttribute("style");
            document.querySelector("#spanSpinnerLoad").setAttribute("style", "width: 100%; font-size: 2.6rem; text-align: center; margin-top: 1.6rem; color: #002d56aa;");
            // console.log('transacción aceptada');

            document.querySelector("#tituloRese").value = response.data.x_extra1;
            document.querySelector("#activiRese").value = response.data.x_extra2; 
            document.querySelector("#idUserRese").value = response.data.x_extra3; 
            document.querySelector("#idProdRese").value = response.data.x_extra4;
            document.querySelector("#idUnidRese").value = response.data.x_extra5;
            document.querySelector("#numPersoRese").value = response.data.x_extra6;

            document.querySelector("#tipoRese").value = response.data.x_extra7;

            // Reserva por Hora
            document.querySelector("#diaReseInicioXH").value = response.data.x_extra8;
            document.querySelector("#horaEntraInputXH").value = response.data.x_extra9;
            document.querySelector("#horaSaleInputXH").value = response.data.x_extra10;
            document.querySelector("#cantHorasXH").value = response.data.x_extra11;
            document.querySelector("#cantMinusXH").value = response.data.x_extra12;

            // Reserva por Día
            document.querySelector("#diaReseInicioXD").value = response.data.x_extra13;
            document.querySelector("#diaReseFinalXD").value = response.data.x_extra14;
            document.querySelector("#cadenaDiasInputXD").value = response.data.x_extra15;
            document.querySelector("#cantDiasInputXD").value = response.data.x_extra16;

            // Reserva por Semana
            document.querySelector("#semanaDiaInicio").value = response.data.x_extra17;
            document.querySelector("#semanaDiaFinal").value = response.data.x_extra18;
            document.querySelector("#semanaCadenaDias").value = response.data.x_extra19;

            // Factura
            document.querySelector("#ivaPdt").value = response.data.x_extra20;
            document.querySelector("#descuPdt").value = response.data.x_extra21;
            document.querySelector("#reseCodigo").value = response.data.x_extra22;
            document.querySelector("#fechaCrea").value = response.data.x_extra23;
            document.querySelector("#horaCrea").value = response.data.x_extra24;
            document.querySelector("#serieReseFac").value = response.data.x_extra25;
            document.querySelector("#fechaFactuVenci").value = response.data.x_extra26;

            document.querySelector("#precio").value = response.data.x_extra27;
            document.querySelector("#precioXCant").value = response.data.x_extra28;
            document.querySelector("#precioTotal").value = response.data.x_extra29;
            document.querySelector("#inO_tipoUser").value = response.data.x_extra30;
            document.querySelector("#inO_idUserIni").value = response.data.x_extra31;

            // Lo demas
            document.querySelector("#referenceEpaycoRese").value = response.data.x_ref_payco;
            document.querySelector("#codigoFacRese").value = response.data.x_id_factura;
            document.querySelector("#numCuotasRese").value = response.data.x_quotas;
            document.querySelector("#transaTipoPago").value = response.data.x_type_payment;
            document.querySelector("#franquicieCard").value = response.data.x_franchise;
            document.querySelector("#nombreBanco").value = response.data.x_bank_name;
            document.querySelector("#respuestaEpaycoTransa").value = response.data.x_response;
            document.querySelector("#motivoEpaycoTransa").value = response.data.x_response_reason_text;
            
            document.querySelector("#indexRegistroFacRese").submit();

          }
          //Transaccion Rechazada
          if (response.data.x_cod_response == 2) {
            console.log('transacción rechazada');
          }
          //Transaccion Pendiente
          if (response.data.x_cod_response == 3) {
            console.log('transacción pendiente');
          }
          //Transaccion Fallida
          if (response.data.x_cod_response == 4) {
            console.log('transacción fallida');
          }

          $('#fecha').html(response.data.x_transaction_date);
          $('#respuesta').html(response.data.x_response);
          $('#referencia').text(response.data.x_id_invoice);
          $('#motivo').text(response.data.x_response_reason_text);
          $('#recibo').text(response.data.x_transaction_id);
          $('#banco').text(response.data.x_bank_name);
          $('#autorizacion').text(response.data.x_approval_code);
          $('#total').text(response.data.x_amount + ' ' + response.data.x_currency_code);
          
          // console.log(response.data);


        } else {
          alert("Error consultando la información");
        }
      });

    });

    
        
  </script>
</body>

</html>
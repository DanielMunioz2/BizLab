<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    require_once("conexion.php");
    
    session_start();

    if (!isset($_SESSION['iniciado'])) {
        header("Location: inicioSesion.php");
        exit; 
    }

    $userId = $_SESSION['iniciado'];
    $queryUserName = "SELECT user_nombre FROM usuarios WHERE Id_usuario = $userId";
    $resultUserName = $conn->query($queryUserName);
    $userName = "";
    
    if ($resultUserName && $resultUserName->num_rows > 0) {
        $row = $resultUserName->fetch_assoc();
        $userName = $row['user_nombre'];
    }

    $asunto_user = "";
    $descripcion_user = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $asunto_user = htmlspecialchars($_POST['asunto']);
        $descripcion_user = htmlspecialchars($_POST['descripcion']);

        header("Location: compra.php");
        exit;
    }

    $queryUnidades = "SELECT id_unidad, unidad_nombre, unidad_tipo, unidad_cantPerson, unidad_descrip, unidad_caracte, unidad_precios, unidad_estado, unidad_totalReser, unidad_imagen
                      FROM unidades";

    $resultUnidades = $conn->query($queryUnidades);
    if ($resultUnidades && $resultUnidades->num_rows > 0) {
        
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Servicios</title>
    <link rel="shortcut icon" type="x-icon" href="images/favicon_bizclub.svg">
    <link rel="stylesheet" href="estilos/reservas.css">
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .contenedor_base {
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            gap: 20px;
        }
        .contenedor_texto_bizclub {
            flex: 1;
        }
        .contenedor_reserva {
            margin-top: 20px;
        }
        .reserva-form {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .select_estilizado {
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
        .reservar-btn {
            padding: 8px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .reservar-btn:hover {
            background-color: #0056b3;
        }
        .contenedor_2 {
            flex: 1;
            text-align: center; 
        }
        .contenedor_2 img {
            max-width: 100%;
            height: 100%;
            display: block;
        }
    </style>
    <script>
        function validarFormulario() {
            var asunto = document.getElementsByName('asunto')[0].value.trim();
            var descripcion = document.getElementsByName('descripcion')[0].value.trim();
            var cantidad_personas = document.getElementsByName('cantidad_personas')[0].value.trim();

            if (asunto === '' || descripcion === '' || cantidad_personas === '') {
                alert('Por favor complete todos los campos antes de enviar.');
                return false;
            }

            return true;
        }
    </script>
</head>
<body>
    <main class="main">
        <div class="contenedor_todo">
            <?php
                while ($row = $resultUnidades->fetch_assoc()) {
                    $id_unidad = $row['id_unidad'];
                    $unidad_nombre = $row['unidad_nombre'];
                    $unidad_tipo = $row['unidad_tipo'];
                    $unidad_cantPerson = $row['unidad_cantPerson'];
                    $unidad_descrip = $row['unidad_descrip'];
                    $unidad_caracte = $row['unidad_caracte'];
                    $unidad_precios = $row['unidad_precios'];
                    $unidad_estado = $row['unidad_estado'];
                    $unidad_totalReser = $row['unidad_totalReser'];
                    $unidad_imagen = $row['unidad_imagen'];
            ?>
            <div class="contenedor_base">
                <div class="contenedor_texto_bizclub">
                    <h2><?php echo $unidad_nombre; ?> - <?php echo $unidad_tipo; ?></h2>
                    <h3>PRECIOS: <?php echo $unidad_precios; ?></h3><br>
                    <p></p><br>
                    <h1>CARACTERISTICAS: <?php echo $unidad_descrip; ?></h1><br>
                    <p></p><br>
                    <h1>DESCRIPCION: <?php echo $unidad_caracte; ?></h1><br>
                    <p></p>
                    <div class="contenedor_reserva">
                        <form class="reserva-form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" onsubmit="return validarFormulario()">
                            <input type="text" name="asunto" placeholder="Ingrese un asunto..." class="select_estilizado" value="<?php echo $asunto_user; ?>" required> 
                            <input type="text" name="descripcion" placeholder="Ingrese una descripcion..." class="select_estilizado" value="<?php echo $descripcion_user; ?>" required> 
                            <h3>CANTIDAD DE PERSONAS: <?php echo $unidad_cantPerson; ?> - MAXIMO: <?php echo $unidad_totalReser; ?></h3>
                            <select class="select_estilizado" name="cantidad_personas" required>
                                <?php
                                    for ($i = 1; $i <= $unidad_cantPerson; $i++) {
                                        echo "<option value='$i'>$i</option>";
                                    }
                                ?>
                            </select>
                            <button type="submit" name="submit" class="reservar-btn">Completar Reserva</button> 
                            <button type="button" onclick="window.location.href='index.php';">Regresar al inicio</button>
                        </form>
                    </div>
                </div>
                <div class="contenedor_2">
                    <img src="images/Escritorios_dedicados.jpg" alt="Imagen de la unidad">
                </div>
            </div>
            <?php
                } 
            ?>
        </div>
    </main>
</body>
</html>

<?php

    } else {
        echo "No se encontraron unidades.";
    }

    $resultUnidades->free();

    $conn->close();
    
?>

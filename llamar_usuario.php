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
    
    $userCorreo = $_SESSION['iniciado'];
    $query = "SELECT id_usuario, user_estado FROM usuarios";
    $result = $conn->query($query);
    
    if ($result && $result->num_rows > 0) {
        $userStates = [];
        while ($row = $result->fetch_assoc()) {
            $userStates[] = $row;
        }
        echo json_encode($userStates);
    } else {
        echo json_encode([]);
    }
    
?>

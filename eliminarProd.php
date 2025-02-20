<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    session_start();

    require_once("conexion.php");
    
    if(isset($_POST["tipo"])){
    //

        $id = $_POST["id"];
        $tipo = $_POST["tipo"];
        $imagen = $_POST["imagen"];

        if($tipo=="producto"){

            $queryElimiProd="DELETE FROM `soqkyjmy_bizclubPlataformaDb`.`productos` WHERE `productos`.`id_producto` = $id;";

            $resultado = $conn->query($queryElimiProd);

            unlink("images/productosImages/".$imagen);

            $_SESSION["stdProd"]=4;
            header("location:administracion.php");
    
        }else{
            if($tipo=="unidad"){

                $queryElimiUni="DELETE FROM `soqkyjmy_bizclubPlataformaDb`.`unidades` WHERE `unidades`.`id_unidad` = $id;";

                $resultado = $conn->query($queryElimiUni);

                unlink("images/productosImages/".$imagen);

                $_SESSION["stdProd"]=5;
                header("location:administracion.php");

            }
        }

       
       
    //
    }

    if(isset($_POST["idEliminarProdEdit"])){

        $id = $_POST["idEliminarProdEdit"];
        $tipo = $_POST["tipoEditEli"];
        $imagen = $_POST["imagen"];

        if($tipo=="producto"){

            $queryElimiProd="DELETE FROM `soqkyjmy_bizclubPlataformaDb`.`productos` WHERE `productos`.`id_producto` = $id;";

            $resultado = $conn->query($queryElimiProd);

            unlink("images/productosImages/".$imagen);

            $_SESSION["stdProd"]=4;
            header("location:administracion.php");
    
        }else{

            if($tipo=="unidad"){

                $queryElimiUni="DELETE FROM `soqkyjmy_bizclubPlataformaDb`.`unidades` WHERE `unidades`.`id_unidad` = $id;";

                $resultado = $conn->query($queryElimiUni);

                unlink("images/productosImages/".$imagen);

                $_SESSION["stdProd"]=5;
                header("location:administracion.php");

            }

        }

    }

?>
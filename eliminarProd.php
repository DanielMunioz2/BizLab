<?php

    session_start();

    include("conexion.php");

    
    if(isset($_POST["tipo"])){
    //

        $id = $_POST["id"];
        $tipo = $_POST["tipo"];
        $imagen = $_POST["imagen"];

        if($tipo=="producto"){

            $queryElimiProd="DELETE FROM `gdrfkbmy_bizlabDB`.`productos` WHERE `productos`.`id_producto` = $id;";

            $resultado = $conn->query($queryElimiProd);

            unlink("images/productosImages/".$imagen);

            $_SESSION["stdProd"]=4;
            header("location:administracion.php");
    
        }else{
            if($tipo=="unidad"){

                $queryElimiUni="DELETE FROM `gdrfkbmy_bizlabDB`.`unidades` WHERE `unidades`.`id_unidad` = $id;";

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

            $queryElimiProd="DELETE FROM `gdrfkbmy_bizlabDB`.`productos` WHERE `productos`.`id_producto` = $id;";

            $resultado = $conn->query($queryElimiProd);

            unlink("images/productosImages/".$imagen);

            $_SESSION["stdProd"]=4;
            header("location:administracion.php");
    
        }else{

            if($tipo=="unidad"){

                $queryElimiUni="DELETE FROM `gdrfkbmy_bizlabDB`.`unidades` WHERE `unidades`.`id_unidad` = $id;";

                $resultado = $conn->query($queryElimiUni);

                unlink("images/productosImages/".$imagen);

                $_SESSION["stdProd"]=5;
                header("location:administracion.php");

            }

        }

    }

?>
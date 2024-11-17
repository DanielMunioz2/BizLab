<?php

    //$conn = new mysqli("50.6.153.181", "gdrfkbmy_bizuser", "(noN2@Nc,e0v", "gdrfkbmy_bizlabDB");
    $conn = new mysqli("localhost:3306", "root", "D@n!#l!ll01188390", "gdrfkbmy_bizlabdb");

    if($conn->connect_error){
        die("Hubo un fallo en la conexion". $conn->$connect_error);
    };
    
?>
<?php

    $host = 'localhost';
    $user = 'root';
    $password = '';
    $db = 'reservas';

    $conexion = mysqli_connect($host,$user,$password,$db);

    if (!$conexion){
        die('Error al conectar a la base de datos: ' . mysqli_connect_error());
    }

    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $consulta = $_POST['consulta'];
    $tabla = 'consultas';
    try{
        $resultado = mysqli_query($conexion, "SHOW TABLES LIKE '$tabla'");
        if (mysqli_num_rows($resultado) == 0){
            $query = "CREATE TABLE $tabla (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL,
                apellido VARCHAR(50) NOT NULL,
                correo VARCHAR(255) NOT NULL,
                consulta VARCHAR(255) NOT NULL,
                )";
        }
        $crearTabla = mysqli_query($conexion,$query);
        if ($crearTabla) {
            $query = "INSERT INTO $tabla (nombre,apellido,correo,consulta) VALUES ('$nombre','$apellido','$correo','$consulta')";
            $insertar = mysqli_query($conexion,$query);
        }
        else{
            echo "Error al crear la tabla: " . mysqli_error($conexion,$query);
        }
    }
    catch(mysqli_sql_exception $e){
        echo $e->getMessage();
    }
    finally{
        mysqli_close($conexion);
        exit();
    }

?>
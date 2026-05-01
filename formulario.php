<?php

$servidor = "localhost";
$usuario = "root";
$clave = "";
$basededatos = "parts_digital"; 

// CONEXIÓN A MYSQL
$enlace = mysqli_connect($servidor, $usuario, $clave, $basededatos);

if (!$enlace) {
    die("Error de conexión: " . mysqli_connect_error());
}

// SI EL FORMULARIO FUE ENVIADO
if (isset($_POST['registrar'])) {

    // DATOS DEL FORMULARIO
    $nombre = $_POST['firstName'];
    $correo = $_POST['email'];
    $contrasena = $_POST['password'];

    // CONSULTA SQL
    $insertarDatos = "INSERT INTO datos (nombre, correo, password)
                      VALUES ('$nombre', '$correo', '$contrasena')";

    $ejecutarInsertar = mysqli_query($enlace, $insertarDatos);

    // RESPUESTA AL USUARIO
    if ($ejecutarInsertar) {
        echo "<script>alert('Datos guardados correctamente'); window.location.href='../index.php';</script>";
    } else {
        echo "<script>alert('Error al guardar los datos: ".mysqli_error($enlace)."'); window.history.back();</script>";
    }
}

?>
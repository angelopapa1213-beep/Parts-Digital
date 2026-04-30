<?php

$servidor = "localhost";
$usuario = "root";
$clave = "";
$basededatos = "ejemplo"; // aquí va tu base de datos

$enlace = mysqli_connect($servidor, $usuario, $clave, $basededatos);

if (!$enlace) {
    die("Error de conexión: " . mysqli_connect_error());
}

if (isset($_POST['registrar'])) {

    $nombre = $_POST['firstName'];
    $apellido = $_POST['lastName'];
    $correo = $_POST['email'];
    $contrasena = $_POST['password'];

    $insertarDatos = "INSERT INTO datos (Nombre, Apellido, `Correo electrónico`, Contraseña)
    VALUES ('$nombre', '$apellido', '$correo', '$contrasena')";

    $ejecutarInsertar = mysqli_query($enlace, $insertarDatos);

    if ($ejecutarInsertar) {
        echo "<script>alert('Datos guardados correctamente');</script>";
    } else {
        echo "<script>alert('Error al guardar los datos');</script>";
    }
}

?>
<?php
$servidor = "localhost";
$usuario = "root";
$clave = "";
$basededatos = "parts_digital";

$enlace = mysqli_connect($servidor, $usuario, $clave, $basededatos);

if (!$enlace) {
    die("Error de conexión: " . mysqli_connect_error());
}

if (isset($_POST['registrar'])) {

    $nombre = $_POST['firstName'];
    $correo = $_POST['email'];
    $contrasena = $_POST['password'];

    $insertar = "INSERT INTO datos (nombre, correo, contrasena)
                 VALUES ('$nombre', '$correo', '$contrasena')";

    $resultado = mysqli_query($enlace, $insertar);

    if ($resultado) {
        echo "<script>alert('Datos guardados correctamente'); window.location='formulario.html';</script>";
    }else {
        echo "<script>alert('Error al guardar los datos'); window.history.back();</script>";
    }
}

?>
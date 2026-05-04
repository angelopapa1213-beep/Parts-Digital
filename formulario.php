<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servidor = "localhost";
$usuario = "root";
$clave = "";
$basededatos = "parts_digital";

$enlace = mysqli_connect($servidor, $usuario, $clave, $basededatos);

if (!$enlace) {
    die("Error de conexión: " . mysqli_connect_error());
}

// Detectar envío del formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nombre = $_POST['firstName'];
    $correo = $_POST['email'];
    $contrasena = $_POST['contrasena'];

    // CONSULTA SQL
    $insertarDatos = "INSERT INTO datos (nombre, correo, contrasena)
                      VALUES ('$nombre', '$correo', '$contrasena')";

    $ejecutarInsertar = mysqli_query($enlace, $insertarDatos);

    if ($ejecutarInsertar) {
        echo "<script>alert('Datos guardados correctamente'); window.location.href='../index.php';</script>";
    } else {
        echo "<script>alert('Error al guardar los datos: " . mysqli_error($enlace) . "'); window.history.back();</script>";
    }
}
?>
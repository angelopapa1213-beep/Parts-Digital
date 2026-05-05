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


if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nombre = $_POST['nombre'];
    $correo = $_POST['email'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];
    $fecha = $_POST['fecha'];
    $hora = $_POST['hora'];
    $producto = $_POST['producto'];
    $pago = $_POST['pago'];

    // CONSULTA SQL
    $insertarDatos = "INSERT INTO reservaciones (nombre, correo, telefono,direccion,fecha, hora, producto,pago)
                      VALUES ('$nombre', '$correo', '$telefono', '$direccion','$fecha','$hora','$producto','$pago')";

    $ejecutarInsertar = mysqli_query($enlace, $insertarDatos);


}
?>
<?php

$enlace = mysqli_connect("localhost", "root", "", "parts_digital");

if (!$enlace) {
    die("Error de conexión: " . mysqli_connect_error());
}

if (isset($_POST['registrar'])) {

    $nombre     = trim($_POST['firstName']);
    $correo     = trim($_POST['email']);
    $contrasena = $_POST['password'];

    if (empty($nombre) || empty($correo) || empty($contrasena)) {
        header("Location: formulario.html?status=error&msg=Campos+vacios");
        exit;
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        header("Location: formulario.html?status=error&msg=Correo+invalido");
        exit;
    }

    $check = mysqli_prepare($enlace, "SELECT id FROM datos WHERE correo = ?");
    mysqli_stmt_bind_param($check, "s", $correo);
    mysqli_stmt_execute($check);
    mysqli_stmt_store_result($check);

    if (mysqli_stmt_num_rows($check) > 0) {
        mysqli_stmt_close($check);
        header("Location: formulario.html?status=duplicado");
        exit;
    }
    mysqli_stmt_close($check);

    $contrasenaHash = password_hash($contrasena, PASSWORD_BCRYPT);

    $stmt = mysqli_prepare($enlace, "INSERT INTO datos (nombre, correo, contrasena) VALUES (?, ?, ?)");
    mysqli_stmt_bind_param($stmt, "sss", $nombre, $correo, $contrasenaHash);
    $resultado = mysqli_stmt_execute($stmt);

    if ($resultado) {
        mysqli_stmt_close($stmt);
        mysqli_close($enlace);
        header("Location: formulario.html?status=ok");
    } else {
        $error = urlencode(mysqli_error($enlace));
        mysqli_stmt_close($stmt);
        mysqli_close($enlace);
        header("Location: formulario.html?status=error&msg=" . $error);
    }
    exit;

} else {
    header("Location: formulario.html");
    exit;
}
?>
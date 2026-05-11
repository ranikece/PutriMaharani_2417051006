<?php
session_start();
include 'koneksi.php';

// REGISTER
if (isset($_POST['register'])) {

    $nama = $_POST['nama'];

    $password = password_hash(
        $_POST['password'],
        PASSWORD_DEFAULT
    );

    $query = "INSERT INTO users (nama, password)
              VALUES ('$nama', '$password')";

    mysqli_query($conn, $query);

    echo "Register berhasil!";
}

// LOGIN
if (isset($_POST['login'])) {

    $nama = $_POST['nama'];
    $password = $_POST['password'];

    $query = "SELECT * FROM users
              WHERE nama='$nama'";

    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {

        $user = mysqli_fetch_assoc($result);

        if (
            password_verify(
                $password,
                $user['password']
            )
        ) {

            $_SESSION['nama'] = $user['nama'];

            header("Location: dashboard.php");
            exit;

        } else {

            echo "Password salah!";
        }

    } else {

        echo "User tidak ditemukan!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login Register</title>
</head>
<body>

<h2>Register</h2>

<form method="POST">

    <input
        type="text"
        name="nama"
        placeholder="Nama"
        required>

    <br><br>

    <input
        type="password"
        name="password"
        placeholder="Password"
        required>

    <br><br>

    <button type="submit" name="register">
        Register
    </button>

</form>

<hr>

<h2>Login</h2>

<form method="POST">

    <input
        type="text"
        name="nama"
        placeholder="Nama"
        required>

    <br><br>

    <input
        type="password"
        name="password"
        placeholder="Password"
        required>

    <br><br>

    <button type="submit" name="login">
        Login
    </button>

</form>

</body>
</html>
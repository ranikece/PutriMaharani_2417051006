<?php
session_start();
include 'koneksi.php';

if (
    !isset($_SESSION['nama']) ||
    $_SESSION['nama'] != 'admin'
) {

    header("Location: dashboard.php");
    exit;
}

if (!isset($_GET['id'])) {

    header("Location: dashboard.php");
    exit;
}

$id = $_GET['id'];

$query = mysqli_query(
    $conn,
    "SELECT * FROM users WHERE id='$id'"
);

$data = mysqli_fetch_assoc($query);

if (!$data) {

    header("Location: dashboard.php");
    exit;
}

if (isset($_POST['update'])) {

    $nama = $_POST['nama'];

    $password = password_hash(
        $_POST['password'],
        PASSWORD_DEFAULT
    );

    mysqli_query(
        $conn,
        "UPDATE users
         SET nama='$nama',
             password='$password'
         WHERE id='$id'"
    );

    header("Location: dashboard.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Data Pengguna</title>

    <style>

        body {
            font-family: Arial, sans-serif;
            padding: 10px;
        }

        h2 {
            margin-bottom: 20px;
        }

        label {
            font-weight: bold;
        }

        input {
            width: 250px;
            padding: 5px;
            margin-top: 5px;
        }

    </style>
</head>
<body>

<h2>Edit Data Pengguna</h2>

<form method="POST">

    <label>Nama Pengguna:</label>

    <br>

    <input
        type="text"
        name="nama"
        value="<?php echo $data['nama']; ?>"
        required>

    <br><br>

    <label>Password Baru:</label>

    <br>

    <input
        type="password"
        name="password"
        placeholder="Masukkan password baru"
        required>

    <br><br>

    <button type="submit" name="update">
        Simpan Perubahan
    </button>

    <br><br>

    <button
        type="button"
        onclick="window.location.href='dashboard.php'">

        Batal

    </button>

</form>

</body>
</html>
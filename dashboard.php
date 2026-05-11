<?php
session_start();
include 'koneksi.php';

// PROTEKSI LOGIN
if (!isset($_SESSION['nama'])) {

    header("Location: auth.php");
    exit;
}

// HAPUS DATA
if (isset($_GET['hapus'])) {

    // HANYA ADMIN
    if ($_SESSION['nama'] != 'admin') {

        header("Location: dashboard.php");
        exit;
    }

    $id = $_GET['hapus'];

    mysqli_query(
        $conn,
        "DELETE FROM users WHERE id='$id'"
    );

    header("Location: dashboard.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>

<h1>Dashboard</h1>

<h3>
    <?php
    if ($_SESSION['nama'] == 'admin') {
        echo "Selamat Datang, admin!";
    } else {
        echo "Selamat Datang, " . $_SESSION['nama'];
    }
    ?>
</h3>

<a href="logout.php">
    Logout
</a>

<hr>

<?php if ($_SESSION['nama'] == 'admin') : ?>

<h2>Manajemen User</h2>

<table border="1" cellpadding="10">

    <tr>
        <th>ID</th>
        <th>Nama</th>
        <th>Aksi</th>
    </tr>

    <?php

    $query = mysqli_query(
        $conn,
        "SELECT * FROM users"
    );

    while ($data = mysqli_fetch_assoc($query)) {

    ?>

    <tr>

        <td>
            <?php echo $data['id']; ?>
        </td>

        <td>
            <?php echo $data['nama']; ?>
        </td>

        <td>

            <a href="edit.php?id=<?php echo $data['id']; ?>">
                Edit
            </a>

            |

            <a
            href="dashboard.php?hapus=<?php echo $data['id']; ?>"
            onclick="return confirm('Yakin hapus?')">

                Hapus

            </a>

        </td>

    </tr>

    <?php } ?>

</table>

<?php else : ?>

<?php endif; ?>

</body>
</html>
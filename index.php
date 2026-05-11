<?php
include 'koneksi.php';

$editData = null;

if (isset($_POST['tambah'])) {
    $nama = mysqli_real_escape_string($conn, $_POST['nama']);
    $npm  = mysqli_real_escape_string($conn, $_POST['npm']);

    mysqli_query($conn, "INSERT INTO mahasiswa (nama, npm) VALUES ('$nama', '$npm')");
    header("Location: index.php");
    exit;
}

if (isset($_GET['hapus'])) {
    $id = (int)$_GET['hapus'];
    mysqli_query($conn, "DELETE FROM mahasiswa WHERE id=$id");
    header("Location: index.php");
    exit;
}

if (isset($_GET['edit'])) {
    $id = (int)$_GET['edit'];
    $result = mysqli_query($conn, "SELECT * FROM mahasiswa WHERE id=$id");
    $editData = mysqli_fetch_assoc($result);
}

if (isset($_POST['update'])) {
    $id   = (int)$_POST['id'];
    $nama = mysqli_real_escape_string($conn, $_POST['nama']);
    $npm  = mysqli_real_escape_string($conn, $_POST['npm']);

    mysqli_query($conn, "UPDATE mahasiswa SET nama='$nama', npm='$npm' WHERE id=$id");
    header("Location: index.php");
    exit;
}

$data = mysqli_query($conn, "SELECT * FROM mahasiswa ORDER BY id DESC");
?>

<!DOCTYPE html>
<html>
<head>
    <title>CRUD Mahasiswa</title>
</head>
<body>

<h2>Data Mahasiswa</h2>

<form method="POST">
    <input type="hidden" name="id" value="<?= $editData['id'] ?? '' ?>">

    Nama: <input type="text" name="nama" required value="<?= $editData['nama'] ?? '' ?>">
    NPM: <input type="text" name="npm" required value="<?= $editData['npm'] ?? '' ?>">

    <button type="submit" name="<?= $editData ? 'update' : 'tambah' ?>">
        <?= $editData ? 'Update' : 'Tambah' ?>
    </button>
</form>

<br>

<table border="1" cellpadding="8">
    <tr>
        <th>No</th>
        <th>Nama</th>
        <th>NPM</th>
        <th>Aksi</th>
    </tr>

    <?php $no=1; while($row = mysqli_fetch_assoc($data)): ?>
    <tr>
        <td><?= $no++ ?></td>
        <td><?= htmlspecialchars($row['nama']) ?></td>
        <td><?= htmlspecialchars($row['npm']) ?></td>
        <td>
            <a href="?edit=<?= $row['id'] ?>">Edit</a> |
            <a href="?hapus=<?= $row['id'] ?>" onclick="return confirm('Hapus?')">Hapus</a>
        </td>
    </tr>
    <?php endwhile; ?>

</table>

</body>
</html>
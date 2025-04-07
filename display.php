<?php
// Database connection
if (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] === "localhost") {
    $host = "localhost";
    $user = "root";
    $password = "Power93@";
    $dbname = "media_training";
} else {
    $host = "localhost";
    $user = "itwtvmvh_media_training";
    $password = "Wj(oLb{F!8@S";
    $dbname = "itwtvmvh_media_training";
}

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all registrations
$sql = "SELECT * FROM media_registrations ORDER BY id DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>All Registrations</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;  
        }
        th, td {
            border: 1px solid #888;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #eee;
        }
        img, embed {
            max-width: 100px;
            height: auto;
        }
    </style>
</head>
<body>
    <h2>Media Training Registrations</h2>

    <?php if ($result->num_rows > 0): ?>
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Experience</th>
                    <th>Experience Details</th>
                    <th>Skills</th>
                    <th>Commitment</th>
                    <th>Church</th>
                    <th>Sponsor</th>
                    <th>Proof</th>
                </tr>
            </thead>
            <tbody>
                <?php while($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td><?= htmlspecialchars($row['full_name']) ?></td>
                        <td><?= htmlspecialchars($row['date_of_birth']) ?></td>
                        <td><?= htmlspecialchars($row['gender']) ?></td>
                        <td><?= htmlspecialchars($row['address']) ?></td>
                        <td><?= htmlspecialchars($row['phone']) ?></td>
                        <td><?= htmlspecialchars($row['email']) ?></td>
                        <td><?= htmlspecialchars($row['experience']) ?></td>
                        <td><?= htmlspecialchars($row['experience_details']) ?></td>
                        <td><?= htmlspecialchars($row['skills']) ?></td>
                        <td><?= htmlspecialchars($row['commitment']) ?></td>
                        <td><?= htmlspecialchars($row['church']) ?></td>
                        <td><?= htmlspecialchars($row['sponsorby']) ?></td>
                        <td>
                            <?php if ($row['payment_proof']): ?>
                                <?php 
                                $ext = strtolower(pathinfo($row['payment_proof'], PATHINFO_EXTENSION));
                                if (in_array($ext, ['jpg', 'jpeg', 'png'])): ?>
                                    <img src="<?= $row['payment_proof'] ?>" alt="Proof">
                                <?php elseif ($ext == 'pdf'): ?>
                                    <embed src="<?= $row['payment_proof'] ?>" type="application/pdf">
                                <?php endif; ?>
                            <?php else: ?>
                                No file
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    <?php else: ?>
        <p>No registrations found.</p>
    <?php endif; ?>

</body>
</html>

<?php
$conn->close();
?>

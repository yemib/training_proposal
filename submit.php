<?php
// Database connection

if (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] === "localhost" ) {
  
$host = "localhost";
$user = "root"; // Change as needed
$password = "Power93@"; // Change as needed
$dbname = "media_training"; 
}else{ 

$host = "localhost";
$user = "itwtvmvh_media_training"; // Change as needed
$password = "Wj(oLb{F!8@S"; // Change as needed
$dbname = "itwtvmvh_media_training"; // Change as needed

}
$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = isset($_POST['full_name']) ? $_POST['full_name'] : " ";
    $date_of_birth = isset($_POST['date_of_birth']) ? $_POST['date_of_birth'] : date("Y-m-d");
    $gender = isset($_POST['gender']) ? $_POST['gender'] : " ";
    $address = isset($_POST['address']) ? $_POST['address'] : " ";
    $phone = isset($_POST['phone']) ? $_POST['phone'] : " ";
    $email = isset($_POST['email']) ? $_POST['email'] : " ";
    $experience = isset($_POST['experience']) ? $_POST['experience'] : " ";
    $experience_details = isset($_POST['experience_details']) ? $_POST['experience_details'] : " ";
    $skills = isset($_POST['skills']) ? implode(", ", $_POST['skills']) : " ";
    $commitment = isset($_POST['commitment']) ? $_POST['commitment'] : " ";

    // Handle file upload
    $payment_proof = "";
 // Handle file upload with validation
$payment_proof = "";
$allowed_extensions = ['pdf', 'jpg', 'jpeg', 'png'];

if (isset($_FILES['payment_proof']) && $_FILES['payment_proof']['error'] == 0) {
    $target_dir = "uploads/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    // Get file extension
    $file_ext = strtolower(pathinfo($_FILES["payment_proof"]["name"], PATHINFO_EXTENSION));

    // Validate file type
    if (in_array($file_ext, $allowed_extensions)) {
        $payment_proof = $target_dir . time() . "_" . basename($_FILES["payment_proof"]["name"]);
        move_uploaded_file($_FILES["payment_proof"]["tmp_name"], $payment_proof);
    } else {
        die("Error: Only PDF, JPG, JPEG, or PNG files are allowed.");
    }
}


    // Insert data into database
    $stmt = $conn->prepare("INSERT INTO media_registrations (full_name, date_of_birth, gender, address, phone, email, experience, experience_details, skills, commitment, payment_proof) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssis", $full_name, $date_of_birth, $gender, $address, $phone, $email, $experience, $experience_details, $skills, $commitment, $payment_proof);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>

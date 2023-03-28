<?php

// Define database credentials
$host = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Connect to the database
$conn = mysqli_connect($host, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get the form data
$sheettype = $_POST["sheettype"];
$title = $_POST["title"];
$composer = $_POST["composer"];
$arranger = $_POST["arranger"];
$publisher = $_POST["publisher"];
$score = isset($_POST["score"]) ? 1 : 0;
$missing = isset($_POST["missing"]) ? 1 : 0;

// Build the SQL query
$sql = "SELECT * FROM music_library WHERE sheettype = '$sheettype'";
if ($title !== "") {
    $sql .= " AND title LIKE '%$title%'";
}
if ($composer !== "") {
    $sql .= " AND composer LIKE '%$composer%'";
}
if ($arranger !== "") {
    $sql .= " AND arranger LIKE '%$arranger%'";
}
if ($publisher !== "") {
    $sql .= " AND publisher LIKE '%$publisher%'";
}
if ($score !== "") {
    $sql .= " AND score = $score";
}
if ($missing !== "") {
    $sql .= " AND missing = $missing";
}

// Execute the SQL query
$result = mysqli_query($conn, $sql);

<?php

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  // Filter the input data
  $sheet = $_POST['sheettype'];
  $title = filter_input(INPUT_POST, 'title');
  $composer = filter_input(INPUT_POST, 'composer');
  $arranger = filter_input(INPUT_POST, 'arranger');

  $grade = $_POST['grade'];
  $type = $_POST['type'];
  $instrument = $_POST['instrument'];
  $publisher = $_POST['publisher'];
  $amount = filter_input(INPUT_POST, 'amount', FILTER_SANITIZE_NUMBER_INT);
  $scoreYN = $_POST['score'];
  $missingYN = $_POST['missing'];

  // Create an SQL query using the filtered data
  if ($sheet === 'wind'){
    $sql = "SELECT * FROM $sheet
    WHERE title LIKE '%$title%' AND composer LIKE '%$composer%' AND arranger LIKE '%$arranger%'
    ORDER BY title;";
  } elseif ($sheet === 'jazz') {
    $sql = "SELECT * FROM $sheet
    WHERE title LIKE '%$title%' AND composer LIKE '%$composer%' AND arranger LIKE '%$arranger%'
    ORDER BY title;";
  } else {
    $sql = "SELECT * FROM $sheet
    WHERE title LIKE '%$title%' AND composer LIKE '%$composer%' AND arranger LIKE '%$arranger%'
    ORDER BY title;";
  }

  

  
}

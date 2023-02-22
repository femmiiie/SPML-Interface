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
    $sql = 'SELECT * FROM {$sheet}';
  } elseif ($sheet === 'jazz') {
    $sql = 'SELECT * FROM {$sheet}';
  } else {
    $sql = 'SELECT * FROM {$sheet}';
  }

  

  
}

<?php

$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database_name";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Read data from Excel file
require 'path/to/PHPExcel/Classes/PHPExcel.php';

$inputFileType = 'Excel5'; // or 'Excel2007' or 'Excel2003XML'
$inputFileName = 'path/to/excel/file.xls';

/** Create a new PHPExcel object **/
$objPHPExcel = PHPExcel_IOFactory::load($inputFileName);

// Get the data from the Excel file
$data = array();
foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {
    $worksheetTitle     = $worksheet->getTitle();
    $highestRow         = $worksheet->getHighestRow(); // e.g. 10
    $highestColumn      = $worksheet->getHighestColumn(); // e.g. 'F'
    $highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn);

    // Get the last row that was updated
    $sql = "SELECT MAX(id) as last_id FROM table_name";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $last_id = $row["last_id"];

    for ($row = $last_id+1; $row <= $highestRow; ++$row) {
        for ($col = 0; $col < $highestColumnIndex; ++$col) {
            $cell = $worksheet->getCellByColumnAndRow($col, $row);
            $val = $cell->getValue();
            $data[$row][$col] = $val;
        }
    }
}

// Step 3: Update the SQL database with the new data from the Excel file
foreach ($data as $row) {
    $sql = "INSERT INTO table_name (column1, column2) VALUES ('" . $row[0] . "', '" . $row[1] . "')";
    if ($conn->query($sql) !== TRUE) {
        echo "Error updating record: " . $conn->error;
    }
}

$conn->close();


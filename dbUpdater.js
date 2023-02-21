// Step 1: Connect to your SQL database
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database with ID ' + connection.threadId);
});

// Step 2: Read data from Excel file
const XLSX = require('xlsx');

const workbook = XLSX.readFile('path/to/excel/file.xls');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Get the data from the Excel file
const data = [];
const range = XLSX.utils.decode_range(worksheet['!ref']);

// Get the last row that was updated
const query = "SELECT MAX(id) as last_id FROM table_name";
connection.query(query, function (error, results, fields) {
  if (error) {
    console.log("Error getting last ID: " + error);
    return;
  }

  const last_id = results[0].last_id || 0;

  for (let row = last_id + 1; row <= range.e.r; row++) {
    const rowData = [];
    for (let col = 0; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      const cellValue = worksheet[cellAddress] ? worksheet[cellAddress].v : '';
      rowData.push(cellValue);
    }
    data.push(rowData);
  }

  // Step 3: Update the SQL database with the new data from the Excel file
  data.forEach(row => {
    const sql = `INSERT INTO table_name (column1, column2) VALUES ('${row[0]}', '${row[1]}')`;
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("Error updating record: " + error);
        return;
      }
      console.log("Record updated: " + results.affectedRows);
    });
  });

  // Step 4: Close the database connection
  connection.end(function(err) {
    console.log('Database connection closed.');
  });
});
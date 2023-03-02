const mysql = require('mysql');
const XLSX = require('xlsx');

const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database with ID ' + connection.threadId);
});

//Read data from Excel file
const workbook = XLSX.readFile('path/to/excel/file.xls');
const sheetNames = workbook.SheetNames;

//Loop through all sheets
sheetNames.forEach(sheetName => {
  const worksheet = workbook.Sheets[sheetName];
  const data = [];
  const range = XLSX.utils.decode_range(worksheet['!ref']);

  // Get the last row that was updated
  const query = `SELECT MAX(id) as last_id FROM ${sheetName}`;
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log(`Error getting last ID for ${sheetName}: ${error}`);
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

    //Update the SQL database with the new data from the Excel file
    data.forEach(row => {
      const sql = `INSERT INTO ${sheetName} (column1, column2) VALUES ('${row[0]}', '${row[1]}')`;
      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log(`Error updating record for ${sheetName}: ${error}`);
          return;
        }
        console.log(`Record updated for ${sheetName}: ${results.affectedRows}`);
      });
    });
  });
});

//Close the database connection
connection.end(function(err) {
  console.log('Database connection closed.');
});
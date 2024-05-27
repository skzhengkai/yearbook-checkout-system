// Set students who bought the yearbook to claimedYearbook

const fs = require('fs');
const csv = require('csv-parser');
const { stringify } = require('csv-stringify');

const inputFile = 'bought.csv';
const outputFile = 'students_without_id.csv';

const results = [];

// Read the CSV file and filter out students without an ID
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    if (!row.ID) {
      results.push(row);
    }
  })
  .on('end', () => {
    // Define the CSV headers
    const headers = ['Last', 'First', 'Grade', 'ID'];

    // Create a writable stream to the output file
    const writableStream = fs.createWriteStream(outputFile);

    // Use csv-stringify to write the filtered data to the new CSV file
    const stringifier = stringify({ header: true, columns: headers });

    // Write the header and filtered data to the new file
    stringifier.pipe(writableStream);
    results.forEach((row) => {
      stringifier.write(row);
    });
    stringifier.end();

    console.log('CSV file successfully processed and filtered data written to', outputFile);
  })
  .on('error', (error) => {
    console.error('Error reading the CSV file:', error);
  });

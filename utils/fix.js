// I don't actually know what this is for, but it's here just in case.

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const studentsFilePath = path.join(__dirname, 'students.csv');
const boughtFilePath = path.join(__dirname, 'bought.csv');
const updatedStudentsFilePath = path.join(__dirname, 'updated_students.csv');

let boughtStudents = new Set();

// Read bought.csv and store the student IDs who bought the yearbook
fs.createReadStream(boughtFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const studentID = row.ID.trim();
    console.log(`Adding bought student ID: ${studentID}`);
    boughtStudents.add(studentID);
  })
  .on('end', () => {
    console.log('Finished reading bought.csv');
    console.log(`Bought students set: ${Array.from(boughtStudents).join(', ')}`);

    let students = [];

    // Read students.csv and update the Bought status
    fs.createReadStream(studentsFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const studentID = row['Student ID'].trim();
        console.log(`Processing student ID: ${studentID}`);
        row.Bought = boughtStudents.has(studentID) ? 'True' : 'False';
        students.push(row);
      })
      .on('end', () => {
        console.log('Finished reading and updating students.csv');
        writeUpdatedStudentsCSV(students);
      });
  });

// Function to write the updated students data to a new CSV file
function writeUpdatedStudentsCSV(students) {
  const headers = ['Last Name', 'First Name', 'Student ID', 'Grade', 'Bought'];
  const csvRows = students.map(student => headers.map(header => student[header]).join(','));

  const csvContent = [headers.join(','), ...csvRows].join('\n');

  fs.writeFile(updatedStudentsFilePath, csvContent, (err) => {
    if (err) {
      console.error('Error writing updated_students.csv:', err);
    } else {
      console.log('Successfully wrote updated_students.csv');
    }
  });
}

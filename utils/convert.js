// convert CSV to JSON

const fs = require('fs');
const csv = require('csv-parser');

const results = {};

fs.createReadStream('students.csv')
  .pipe(csv())
  .on('data', (data) => {
    const studentId = data['Student ID'];
    results[studentId] = {
      name: `${data['First Name']} ${data['Last Name']}`,
      grade: data['Grade'],
      claimedYearbook: false
    };
  })
  .on('end', () => {
    fs.writeFileSync('students.json', JSON.stringify(results, null, 2));
    console.log('CSV file successfully processed and converted to JSON');
  });

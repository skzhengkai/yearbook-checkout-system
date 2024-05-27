// Stress test the mongo DB and server. Seems to be able to handle requests pretty thoroughly.

const axios = require('axios');
const async = require('async');

const url = 'https://10ebe38d-07f1-4d71-8c90-30948aa90a02-00-246c0ptok4e9o.worf.replit.dev/checkout';
const studentIds = [
  { name: 'Devan Abeyta', studentId: '4009589' },
  { name: 'Kaelyn Abeyta', studentId: '4009926' },
  { name: 'Maya Abughosh', studentId: '4009475' },
  { name: 'Abigail Adams', studentId: '4010571' },
  { name: 'Brayden Adams', studentId: '4009927' },
  { name: 'Ahmed Ahmed', studentId: '4009928' }
];

const requests = [];

studentIds.forEach(student => {
  for (let i = 0; i < 5; i++) { // Adjust the number of requests per student
    requests.push({
      method: 'post',
      url: url,
      data: { studentId: student.studentId }
    });
  }
});

const concurrentRequests = 10; // Number of concurrent requests
let successCount = 0;
let errorCount = 0;

async.eachLimit(requests, concurrentRequests, (request, callback) => {
  axios(request)
    .then(response => {
      console.log(`Success for ${request.data.studentId}: ${response.data}`);
      successCount++;
      callback();
    })
    .catch(error => {
      console.error(`Error for ${request.data.studentId}: ${error.message}`);
      errorCount++;
      callback();
    });
}, err => {
  if (err) {
    console.error('Error in stress test:', err);
  } else {
    console.log(`Stress test completed. Success: ${successCount}, Errors: ${errorCount}`);
  }
});

// Convert JSON to MongoDB

const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB connection string
const uri = "mongodb+srv://username:password@yearbook24.00pqddn.mongodb.net/?retryWrites=true&w=majority&appName=yearbook24";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    const database = client.db('yearbook'); // specify the database name
    const collection = database.collection('students'); // specify the collection name

    // Array to hold the student data
    const results = [];

    // Read and parse the CSV file
    fs.createReadStream('updated_students.csv')
      .pipe(csv())
      .on('data', (data) => {
        const studentId = data['Student ID'];
        const bought = data['Bought'] === 'True';
        results.push({
          studentId: studentId,
          name: `${data['First Name']} ${data['Last Name']}`,
          grade: data['Grade'],
          claimedYearbook: false,
          boughtYearbook: bought
        });
      })
      .on('end', async () => {
        try {
          // Insert the parsed data into the MongoDB collection
          await collection.insertMany(results);
          console.log('CSV file successfully processed and data inserted into MongoDB');
        } catch (insertErr) {
          console.error('Error inserting data into MongoDB:', insertErr);
        } finally {
          // Close the MongoDB connection
          await client.close();
        }
      });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

run().catch(console.dir);

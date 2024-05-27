const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const uri = "mongodb+srv://username:password@yearbook24.00pqddn.mongodb.net/?retryWrites=true&w=majority&appName=yearbook24";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

const connectToDatabase = async () => {
  if (!db) {
    await client.connect();
    db = client.db('yearbook');
  }
  return db;
};

// Establish the connection at startup
connectToDatabase().catch(err => {
  console.error('Failed to connect to the database', err);
  process.exit(1);
});

const getStudentData = async (studentId) => {
  const db = await connectToDatabase();
  const collection = db.collection('students');
  return await collection.findOne({ studentId: studentId });
};

const setStudentData = async (studentId, updateData) => {
  const db = await connectToDatabase();
  const collection = db.collection('students');
  await collection.updateOne({ studentId: studentId }, { $set: updateData });
};

app.post('/checkout', async (req, res) => {
  const studentId = req.body.studentId;
  try {
    const student = await getStudentData(studentId);
    if (student) {
      if (student.boughtYearbook) {
        if (student.claimedYearbook) {
          res.status(400).send(`${student.name} has already claimed their yearbook.`);
        } else {
          await setStudentData(studentId, { claimedYearbook: true });
          res.send(`Yearbook successfully claimed for ${student.name}.`);
        }
      } else {
        res.status(400).send(`${student.name} has not purchased the yearbook. Aww! :(`);
      }
    } else {
      res.status(404).send(`Student with ID ${studentId} cannot be found!`);
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).send('An error occurred. Please reach out to Adam for assistance.');
  }
});

app.get('/student/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await getStudentData(studentId);
    if (student) {
      res.json({ name: student.name });
    } else {
      res.status(404).send(`Student with ID ${studentId} cannot be found!`);
    }
  } catch (error) {
    res.status(500).send('An error occurred. Please try again.');
  }
});

app.get('/students', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('students');
    const students = await collection.find({}).toArray();
    res.json(students);
  } catch (error) {
    res.status(500).send('An error occurred. Please try again.');
  }
});

// New endpoints for admin panel
app.get('/admin/totalCheckedOut', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('students');
    const totalCheckedOut = await collection.countDocuments({ claimedYearbook: true });
    res.json({ total: totalCheckedOut });
  } catch (error) {
    res.status(500).send('An error occurred. Please try again.');
  }
});

app.get('/admin/checkedOutStudents', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('students');
    const checkedOutStudents = await collection.find({ claimedYearbook: true }).toArray();
    res.json(checkedOutStudents);
  } catch (error) {
    res.status(500).send('An error occurred. Please try again.');
  }
});

const https = require('https');

function getPublicIpAddress() {
  return new Promise((resolve, reject) => {
    https.get('https://api.ipify.org?format=json', (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const ip = JSON.parse(data).ip;
          resolve(ip);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

app.get('/ip', (req, res) => {
  getPublicIpAddress()
    .then(ip => {
      res.send(`Your public IP address is: ${ip}`);
    })
    .catch(err => {
      res.status(500).send(`Error fetching public IP address: ${err}`);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

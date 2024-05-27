# Yearbook Checkout System

Welcome to the Yearbook Checkout System! This application allows students to claim their yearbooks by either scanning their ID card or entering their ID code manually. It also includes an admin panel for monitoring checkouts and a public IP address fetcher for network troubleshooting.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **ID Scanning**: Scan student ID cards using the webcam.
- **Manual Entry**: Enter student ID codes manually.
- **Yearbook Claim Verification**: Verify if the student has purchased and claimed their yearbook.
- **Admin Panel**: Monitor the total number of checkouts and view the list of students who have claimed their yearbooks.
- **IP Address Fetching**: Fetch and display the server's public IP address.

## Technologies

- **Frontend**: HTML, CSS, JavaScript, jQuery
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Barcode Scanning**: QuaggaJS
- **Deployment**: Hosted on a web server with MongoDB Atlas for database management

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/yearbook-checkout.git
   ```
2. Navigate to the project directory:
   ```
   cd yearbook-checkout
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Set up your MongoDB connection:
   ```
   Update the `uri` variable in the server code with your MongoDB connection string.
   ```
5. Set up the MongDB database:
   You can use the various files provided in the /utils folder to convert CSV to the database format.
6. Start the server:
   ```
   npm start
   ```
7. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage
### Student Interface
1. **Scan ID:** Use the webcam to scan your ID card.
2. **Manual Entry:** Enter your student ID code manually and click "Manual Entry".
3. **Message Display:** The application will display a success message if the yearbook is claimed successfully, or an error message if there are any issues.

### Admin Interface
1. **Total Checkouts:** View the total number of yearbooks that have been claimed.
2. **Checked Out Students:** View the list of students who have claimed their yearbooks.

### Public IP Address
- Navigate to `/ip` to fetch and display the server's public IP address.

## Endpoints
### Student Endpoints
- **POST /checkout**: Handle yearbook checkout for a student.
- **GET /student/**: Fetch student data by ID.
- **GET /students**: Fetch all students.

### Admin Endpoints
- **GET /admin/totalCheckedOut**: Get the total number of yearbooks claimed.
- **GET /admin/checkedOutStudents**: Get the list of students who have claimed their yearbooks.

### Utility Endpoints
- **GET /ip**: Fetch the server's public IP address.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

---
Thank you for using the Yearbook Checkout System! If you have any questions or issues, please feel free to open an issue on GitHub.
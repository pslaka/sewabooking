const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const { combinator } = require('postcss-selector-parser');

const app = express();
const port = 3000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sewabooking')
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if MongoDB connection fails
});



// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formDataSchema = new Schema({
 // Define fields for SewaBooking data
 full_name: { type: String, required: true },
 vehicle_number: { type: String, required: true },  
 vehicle: { type: Number, required: true },
 email: { type: String, required: true },
 address: { type: String, required: true },
 phone_number: { type: Number, required: true }
});

const FormDataModel = mongoose.model('FormData', formDataSchema);



// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Middleware to parse form data
// app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/register', (req, res) => {

const { full_name, vehicle_number, vehicle, email, address, phone_number } = req.body;

  // Create a new FormDataModel instance 
  const formData = new FormDataModel({
    full_name,
    vehicle_number,
    vehicle,
    email,
    address,
    phone_number,
  });

  // Save to MongoDB
  formData.save()
  
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('/another-page', (req, res) => {
//   res.sendFile(path.join(__dirname, 'another-page.html'));
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

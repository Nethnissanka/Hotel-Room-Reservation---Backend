require('dotenv').config();

const express = require('express');
const connectDB = require('./db.js');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const adminRoutes = require('./routes/adminRoutes');


const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.json()); // Parse JSON requests
app.use(bodyParser.json()); // For parsing application/json

// Routes
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require("./routes/bookingsRoute");

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use("/api/bookings", bookingsRoute);
app.use('/api/admin', adminRoutes); // Use the admin routes

const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));

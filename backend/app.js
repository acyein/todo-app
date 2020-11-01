const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 8000;

// Connect to DB
mongoose.connect(
	process.env.MONGODB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => console.log("Connected to DB")
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
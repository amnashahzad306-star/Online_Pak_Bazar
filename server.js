const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../frontend'));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', UserSchema);

// Register Route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed. Email may already exist.' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

// Logout Route
app.get('/logout', (req, res) => {
  res.json({ message: 'User logged out successfully!' });
});

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

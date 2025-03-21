const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET || 'your_jwt_secret', 
    { expiresIn: '30d' }
  );
};

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber, companyName, isAgency } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
      companyName: companyName || '',
      isAgency: isAgency || false
    });
    
    // Generate token
    const token = generateToken(user);
    
    res.status(201).json({
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken(user);
    
    res.status(200).json({
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};

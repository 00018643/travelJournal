const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const authController = {
  getLogin: (req, res) => {
    res.render('login', { error: null });
  },

  postLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authService.getUserByEmail(email);

      console.log(`Logging in as with email: ${email}`);
      console.log(`User: ${user.id}`);

      if (!user) {
        return res.render('login', { error: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render('login', { error: 'Invalid username or password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });

      res.redirect('/notes');
    } catch (error) {
      console.error('Error during login:', error);
      res.render('login', { error: 'Server error' });
    }
  },

  getRegister: (req, res) => {
    res.render('register', { error: null });
  },

  postRegister: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Registering user:', {email });

      const existingUser = await authService.getUserByEmail(email);
      if (existingUser) {
        console.log('Email already exists:', email);
        return res.render('register', { error: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: uuidv4(),
        email,
        password: hashedPassword,
      };

      console.log('Creating new user:', newUser);
      await authService.createUser(newUser);

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });

      console.log('User registered, redirecting to /notes');
      res.redirect('/notes');
    } catch (error) {
      console.error('Error during registration:', error);
      res.render('register', { error: 'Failed to register user. Please try again.' });
    }
  },

  logout: (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
  },
};

module.exports = authController;
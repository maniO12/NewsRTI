import { Router } from 'express';
import Admin from '../models/Admin.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchAdmin from '../middleware/fetch.js'; // Middleware to fetch admin details

const router = Router();
const JWT_SECRET = 'Thisissecretwebtokn';

// --- Route 1: Create a New Admin ---
router.post(
  '/createAdmin',
  [
    body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res.status(400).json({ message: 'Admin with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      admin = await Admin.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const data = { admin: { id: admin.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.status(201).json({ authtoken, status: true });
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// --- Route 2: Admin Login ---
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const data = { admin: { id: admin.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.status(200).json({ authtoken, status: true });
    } catch (error) {
      console.error('Error in /login:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// --- Route 3: Get Admin Details ---
router.post('/getAdmin', fetchAdmin, async (req, res) => {
  try {
    if (!req.admin || !req.admin.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const id = req.admin.id;
    const admin = await Admin.findById(id).select('-password');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin details:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

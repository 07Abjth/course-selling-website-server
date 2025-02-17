// controllers/mentorController.js
import Mentor from '../models/mentorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new mentor
export const registerMentor = async (req, res) => {
  try {
    const { name, email, password, expertise, role } = req.body;

    // Check if the mentor already exists
    const mentorExists = await Mentor.findOne({ email });
    if (mentorExists) {
      return res.status(400).json({ message: 'Mentor already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the mentor
    const newMentor = new Mentor({
      name,
      email,
      password: hashedPassword,
      expertise,
      role,
    });

    // Save the mentor to the database
    await newMentor.save();

    // Generate JWT token
    const token = jwt.sign({ id: newMentor._id, role: newMentor.role }, 'your-secret-key', { expiresIn: '1h' });

    return res.status(201).json({ message: 'Mentor registered successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login mentor
export const loginMentor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find mentor by email
    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    // Compare the provided password with the stored password
    const isPasswordCorrect = await bcrypt.compare(password, mentor.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: mentor._id, role: mentor.role }, 'your-secret-key', { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

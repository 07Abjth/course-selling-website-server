import User from '../models/userModel.js';  
import bcrypt from 'bcrypt';   
import generateToken from '../utils/generateToken.js';  

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

console.log("password====>",password);
console.log("hashedPassword====>",hashedPassword);



    // Create a new user
    const user = new User({ name, email, password: hashedPassword, phoneNumber });
    await user.save();

    // If user creation is successful, generate a JWT token
    if (user) {
      const token = generateToken(user, "user");

      // Send the token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        sameSite: "strict",
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

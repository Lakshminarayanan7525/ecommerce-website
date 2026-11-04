import User from '../models/User.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../services/emailService.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({ name, email, phone, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    await PasswordResetToken.deleteMany({ userId: user._id });
    
    // Generate a 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[PASSWORD RESET OTP for ${user.email}]: ${otp}`);
    await PasswordResetToken.create({ userId: user._id, token: otp });

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #F59E0B;">ApexStore Password Reset</h2>
        <p>Hello <b>${user.name}</b>,</p>
        <p>Your 6-digit OTP for resetting your password is:</p>
        <h1 style="background: #F8FAFC; padding: 12px; display: inline-block; letter-spacing: 4px; color: #1E293B; border: 1px solid #CBD5E1;">${otp}</h1>
        <p style="color: #EF4444; font-weight: bold;">This OTP is valid for 10 minutes only.</p>
      </div>
    `;

    await sendEmail({ to: user.email, subject: 'Password Reset OTP - ApexStore', html });
    res.json({ message: 'Password reset OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = await PasswordResetToken.findOne({ userId: user._id, token });
    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = password;
    await user.save();
    await PasswordResetToken.deleteMany({ userId: user._id });

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
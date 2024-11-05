import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../models/userModel';
import dotenv from 'dotenv';
import validator from 'validator';

dotenv.config();

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  if (!validator.isLength(username, { min: 3 })) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
  }
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  // Check if user already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username is already taken.' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and store the new user
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };

  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully.' });
};

// Login a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if the user exists
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials.' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials.' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRATION || '1h' }
  );

  res.json({ message: 'Login successful', token });
};

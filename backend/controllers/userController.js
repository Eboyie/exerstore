import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';

import { generateToken } from '../utils/createTokens.js';
import expressAsyncHandler from 'express-async-handler';

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //check if all fields are filled
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: 'User already exists' });

  //validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: 'Please enter a valid email address' });
  }

  //validate password
  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters long.',
    });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordCorrect) {
      generateToken(res, existingUser._id);

      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    } else {
      res.status(404).json({ message: 'Incorrect password' });
    }
  } else {
    res.status(404).json({ message: 'invalid email or password' });
  }
});

export const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out successfully' });
});

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: 'New Password must be at least 6 characters long.' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400).json({ message: 'Cannot delete admin user' });
      return;
    }
    await user.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

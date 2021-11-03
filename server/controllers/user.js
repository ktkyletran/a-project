import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: 'User does not exist' });

    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (!checkPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ userData: existingUser, token })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
  
    if (existingUser) return res.status(404).json({ message: 'User already exist' });

    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = await User.create({ firstName, lastName, name: `${firstName} ${lastName}`, email, password: hashedPassword });

    const token = jwt.sign({ email: userData.email, id: userData._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ userData, token })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
};
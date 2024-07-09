const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate OTP
const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex');
};

// Send OTP Email
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "nitt50201@gmail.com",
      pass: "uuqa hfcg nbhc nxlg"
    }
  });

  const mailOptions = {
    from: 'nitt50201@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      otp: generateOTP(),
      otpExpires: Date.now() + 3600000, // 1 hour
    });

    await user.save();

    await sendOTPEmail(user.email, user.otp);

    res.status(200).json({ msg: 'OTP sent to email' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      'test',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Sign in User
exports.signInUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      if (!user.isVerified) {
        return res.status(400).json({ msg: 'Account not verified' });
      }
  
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        'test',
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token,name: user.name,email: user.email });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
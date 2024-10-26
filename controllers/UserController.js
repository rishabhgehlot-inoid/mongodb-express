const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const crypto = require("crypto");

module.exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Both email and password fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newUser = new User({
      email,
      password: hashedPassword,
      verification_code: verificationToken,
      Varified: false,
    });
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET
    );

    newUser.token = token;
    newUser.save();
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Please verify your email by clicking the link below:</p>
             <a href="${process.env.CLIENT_URL}/verify-email?token=${verificationToken}">
             Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Registration successful! A verification email has been sent.",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error registering user", error });
  }
};

module.exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid token or user not found" });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired token", error });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Both email and password fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    user.token = token;
    user.save();

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account with that email" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password Reset",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${process.env.CLIENT_URL}/reset-password?token=${resetToken}">
             Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

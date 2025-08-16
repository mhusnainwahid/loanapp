import User from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const signupUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, cnic, imageUrl, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter required fields!" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({ message: "User already exists!" });
    }

    const token = jwt.sign({ name }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const codeExpires = new Date(Date.now() + 5 * 60 * 1000);

    const userObj = {
      name,
      email,
      password: hashedPass,
      verificationCode,
      isVerified : false,
      codeExpires,
      role,
      phoneNumber,
      imageUrl,
    };

    const user = await User.create(userObj);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS, 
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: userObj.email,
      subject: "Verify your account",
      text: `Your verification code is: ${verificationCode}`,
    });

    console.log("Message sent:", info.messageId);

    return res.status(200).json({
      message: "User signup successfully!",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: "User signup failed during email sending!",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter required fields!" });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(401).json({ message: "Please signup first!" });
    }

     if (!existUser.isVerified) {
      return res.status(401).json({ message: "Please verify your account first!" });
    }

    const comparePass = bcrypt.compareSync(password, existUser.password);
    if (!comparePass) {
      return res.status(400).json({ message: "Wrong credentials!" });
    }

    const token = jwt.sign(
      { id: existUser._id, name: existUser.userName, email: existUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "User login successfully!",
      user: existUser,
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while logging in the user!",
      error: error.message,
    });
  }
};


export const verifyUser = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified!" });
    }

    if (user.verificationCode?.toString().trim() !== code?.toString().trim()) {
      return res.status(400).json({ message: "Invalid code" });
    }

    if (user.codeExpires < Date.now()) {
      return res.status(400).json({ message: "Code expired already!" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.codeExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "User verified successfully!" });

  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while verifying user!",
      error: error.message
    });
  }
};
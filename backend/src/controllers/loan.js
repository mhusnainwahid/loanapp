import Loan from "../models/loan.js";
import nodemailer from "nodemailer";

export const createLoan = async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    return res.status(200).json({
      message: "Loan create successfully!",
      loan,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while creating loan!",
      error: error.message,
    });
  }
};

export const getLoans = async (req, res) => {
  try {
    const { userId } = req.params;
    const loan = await Loan.find({ userId });
    return res.status(200).json({ loan });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while getting loans!",
      error: error.message,
    });
  }
};

export const getAllLoans = async (req, res) => {
  try {
    const loan = await Loan.find();
    return res.status(200).json({ loan });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while getting loans!",
      error: error.message,
    });
  }
};

export const loanResponse = async (req, res) => {
  try {
    const { loanId } = req.params;
    const updateData = req.body;

    const loan = await Loan.findByIdAndUpdate(loanId, updateData, {
      new: true,
    });

    if (!loan) {
      return res.status(404).json({ message: "Loan not found!" });
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS,
      },
    });
    const subject =
      loan.status === "approved"
        ? "🎉 Your Loan has been Approved!"
        : loan.status === "rejected"
        ? "❌ Your Loan has been Rejected"
        : "ℹ️ Loan Status Updated";
    const html = `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2 style="color:${loan.status === "approved" ? "green" : loan.status === "rejected" ? "red" : "blue"};">
          Loan ${loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
        </h2>
        <p>Hi ${loan.name},</p>
        <p>Your loan request of <b>PKR ${loan.amount}</b> has been <b>${loan.status}</b> by the admin.</p>
        <p>If you have any questions, please contact support.</p>
        <br/>
        <small>&copy; ${new Date().getFullYear()} Loan App</small>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: loan.email, 
      subject,
      html,
    });

    return res.status(200).json({
      message: `Loan ${loan.status} and email sent!`,
      loan,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loan didn't update successfully!",
      error: error.message,
    });
  }
};


export const putLoans = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { action } = req.body;
    const loan = await Loan.find();
    return res.status(200).json({ loan });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while getting loans!",
      error: error.message,
    });
  }
};

import Loan from "../models/loan.js";

export const createLoan = async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    return res.status(200).json({
      message: "Loan create successfully!",
      loan
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
    const {userId} = req.params
    const loan = await Loan.find({userId});
    return res.status(200).json({loan});
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
    return res.status(200).json({loan});
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while getting loans!",
      error: error.message,
    });
  }
};

export const putLoans = async (req, res) => {
  try {
    const {loanId} = req.params
    const {action} = req.body
    const loan = await Loan.find();
    return res.status(200).json({loan});
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while getting loans!",
      error: error.message,
    });
  }
};
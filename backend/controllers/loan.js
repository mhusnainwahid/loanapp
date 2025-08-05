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

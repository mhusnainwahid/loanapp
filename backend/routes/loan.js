import express from 'express'
import { createLoan } from '../controllers/loan.js'

const loanRoutes = express.Router()
loanRoutes.post('/apply-loan',createLoan)

export default loanRoutes
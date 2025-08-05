import express from 'express'
import { createLoan, getLoans } from '../controllers/loan.js'

const loanRoutes = express.Router()
loanRoutes.post('/apply-loan',createLoan)
loanRoutes.get('/my-loans/:userId',getLoans)

export default loanRoutes
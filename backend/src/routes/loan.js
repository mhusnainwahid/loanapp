import express from 'express'
import { createLoan, getAllLoans, getLoans } from '../controllers/loan.js'

const loanRoutes = express.Router()
loanRoutes.post('/apply-loan',createLoan)
loanRoutes.get('/userloans/',getAllLoans)
loanRoutes.get('/my-loans/:userId',getLoans)

export default loanRoutes
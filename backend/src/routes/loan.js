import express from 'express'
import { createLoan, getAllLoans, getLoans, loanResponse } from '../controllers/loan.js'

const loanRoutes = express.Router()
loanRoutes.post('/apply-loan',createLoan)
loanRoutes.get('/userloans/',getAllLoans)
loanRoutes.get('/my-loans/:userId',getLoans)
loanRoutes.put('/loanres/:loanId', loanResponse)

export default loanRoutes
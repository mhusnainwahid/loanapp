import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

const loanTypes = [
  { value: 'home', label: 'Home Loan' },
  { value: 'education', label: 'Education Loan' },
  { value: 'business', label: 'Business Loan' }
];

const ApplyLoan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('')
  const [loanType, setLoanType] = useState('')
  const [amount, setAmount] = useState('')
  const [tenure, setTenure] = useState('')
  const [cnic, setCnic] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [qualification, setQualification] = useState('')
  const [monthlyIncome, setMonthlyIncome] = useState('')

  const userId = localStorage.getItem('userId')

  const handleSelectChange = (value) => {
    setLoanType(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(name, loanType, amount, tenure, cnic,email,phoneNumber,qualification,monthlyIncome)

    try {
     const res = await axios.post('http://localhost:3000/apply-loan', {
        name,
        email,
        phoneNumber,
        qualification,
        monthlyIncome,
        loanType,
        amount,
        tenure,
        cnic,
        userId,

      })
      toast.success('Loan application submitted successfully!');
      // navigate('/my-loans');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Apply for Loan</CardTitle>
            <CardDescription>
              Fill out the form below to submit your loan application
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanType">Loan Type</Label>
                <Select value={loanType} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter loan amount"
                  min="1000"
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phonenumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  name="qualification"
                  type="text"
                  required
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income</Label>
                <Input
                  id="monthlyIncome"
                  name="monthlyIncome"
                  type="number"
                  required
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="Enter your phone number"
                  min="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter loan amount"
                  min="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Tenure</Label>
                <Input
                  id="tenure"
                  name="tenure"
                  type="number"
                  required
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="Enter Tenure"
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC Number</Label>
                <Input
                  id="cnic"
                  name="cnic"
                  type="text"
                  required
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  placeholder="Enter your CNIC number"
                  pattern="[0-9]{13}"
                  title="CNIC must be 13 digits"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyLoan;
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
  const [formData, setFormData] = useState({
    loanType: '',
    amount: '',
    cnic: '',
    proofDocument: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      loanType: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      proofDocument: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('loanType', formData.loanType);
      submitData.append('amount', formData.amount);
      submitData.append('cnic', formData.cnic);
      if (formData.proofDocument) {
        submitData.append('proofDocument', formData.proofDocument);
      }

      // Replace with your backend URL
      await axios.post('/api/loans/apply', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Loan application submitted successfully!');
      navigate('/my-loans');
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
                <Select onValueChange={handleSelectChange} required>
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
                <Label htmlFor="amount">Loan Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  required
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter loan amount"
                  min="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC Number</Label>
                <Input
                  id="cnic"
                  name="cnic"
                  type="text"
                  required
                  value={formData.cnic}
                  onChange={handleInputChange}
                  placeholder="Enter your CNIC number"
                  pattern="[0-9]{13}"
                  title="CNIC must be 13 digits"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proofDocument">Proof Document</Label>
                <Input
                  id="proofDocument"
                  name="proofDocument"
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-muted-foreground">
                  Upload income proof, identity document, or other relevant documents
                </p>
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
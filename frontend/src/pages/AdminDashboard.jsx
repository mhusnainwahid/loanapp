import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [approvalData, setApprovalData] = useState({
    interestRate: '',
    tenure: ''
  });


  useEffect(() => {
    const fetchAllLoans = async () => {
      try {
        const res = await axios.get('http://localhost:3000/userloans')
        console.log(res.data.loan)
        setLoans(res.data.loan)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllLoans()
  }, [])

  useEffect(() => {
    if (filter === 'all') {
      setFilteredLoans(loans);
    } else {
      setFilteredLoans(loans.filter(loan => loan.status === filter));
    }
  }, [loans, filter]);

  // const fetchAllLoans = async () => {
  //   try {
  //     const response = await axios.get('/api/admin/loans');
  //     setLoans(response.data);
  //   } catch (error) {
  //     toast.error('Failed to fetch loan applications');
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  // const handleLoanAction = async (loanId, action, data = {}) => {
  //   try {
  //     await axios.put(`http://localhost:3000/adminloans/${loanId}/${action}`, data);

  //     toast.success(`Loan ${action}d successfully!`);
  //     const res = await axios.get('http://localhost:3000/userloans');
  //     setLoans(res.data.loan)
  //     setSelectedLoan(null);
  //   } catch (error) {
  //     toast.error(`Failed to ${action} loan`);
  //   }
  // };

  const handleLoanAction = async (loan, action) => {
    // console.log(loan)
    try {
      const res = await axios.put(`http://localhost:3000/loanres/${loan._id}`, {
        status: action
      })
    } catch (error) {
      toast.error(`Failed to ${action} loan`);
    }
  }

  // const handleApprove = async () => {
  //   if (!approvalData.interestRate || !approvalData.tenure) {
  //     toast.error('Please fill in all required fields');
  //     return;
  //   }

  //   await handleLoanAction(selectedLoan._id, 'approve', {
  //     interestRate: parseFloat(approvalData.interestRate),
  //     tenure: parseInt(approvalData.tenure)
  //   });

  //   setApprovalData({ interestRate: '', tenure: '' });
  // };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'destructive';
      case 'pending':
      default:
        return 'secondary';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate('/adminhome')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage all loan applications
          </p>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={navigateToHome}>Go To Admin Home page</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{loans.length}</div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">
                {loans.filter(l => l.status === 'pending').length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">
                {loans.filter(l => l.status === 'approved').length}
              </div>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-destructive">
                {loans.filter(l => l.status === 'rejected').length}
              </div>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6">
          {filteredLoans.map((loan) => (
            <Card key={loan._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      {loan.loanType.charAt(0).toUpperCase() + loan.loanType.slice(1)} Loan
                    </CardTitle>
                    <CardDescription>
                      Applied on {formatDate(loan.createdAt)} by {loan.user?.name}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusVariant(loan.status)}>
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Applicant</p>
                    <p className="text-lg">{loan.user?.name}</p>
                    <p className="text-sm text-muted-foreground">{loan.user?.email}</p>
                    <p className="text-sm text-muted-foreground">{loan.user?.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Loan Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(loan.amount)}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">CNIC</p>
                    <p className="text-lg">{loan.cnic}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Application ID</p>
                    <p className="text-lg font-mono">{loan._id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>

                {loan.status === 'approved' && loan.emi && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-success/10 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Monthly EMI</p>
                      <p className="text-lg font-semibold text-success">
                        {formatCurrency(loan.emi)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tenure</p>
                      <p className="text-lg">{loan.tenure} months</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Interest Rate</p>
                      <p className="text-lg">{loan.interestRate}% per annum</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {loan.proofDocument && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(loan.proofDocument, '_blank')}
                    >
                      View Documents
                    </Button>
                  )}

                  {loan.user?.profileImage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(loan.user.profileImage, '_blank')}
                    >
                      View Profile
                    </Button>
                  )}

                  {loan.status === 'pending' && (
                    <>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleLoanAction(loan, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleLoanAction(loan, 'rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLoans.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">
                No loan applications found
              </h3>
              <p className="text-sm text-muted-foreground">
                {filter === 'all'
                  ? 'No applications have been submitted yet.'
                  : `No ${filter} applications found.`
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyLoans();
  }, []);

  const fetchMyLoans = async () => {
    try {
      // Replace with your backend URL
      const response = await axios.get('/api/loans/my-loans');
      setLoans(response.data);
    } catch (error) {
      toast.error('Failed to fetch loan applications');
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Loan Applications</h1>
          <p className="text-muted-foreground mt-2">
            Track the status of your loan applications
          </p>
        </div>

        {loans.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No loan applications found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                You haven't applied for any loans yet.
              </p>
              <Button onClick={() => window.location.href = '/apply-loan'}>
                Apply for Loan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {loans.map((loan) => (
              <Card key={loan._id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        {loan.loanType.charAt(0).toUpperCase() + loan.loanType.slice(1)} Loan
                      </CardTitle>
                      <CardDescription>
                        Applied on {formatDate(loan.createdAt)}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusVariant(loan.status)}>
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                    {loan.status === 'approved' && loan.emi && (
                      <>
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
                      </>
                    )}

                    {loan.status === 'rejected' && loan.rejectionReason && (
                      <div className="col-span-full">
                        <p className="text-sm font-medium text-muted-foreground">Rejection Reason</p>
                        <p className="text-sm text-destructive mt-1">{loan.rejectionReason}</p>
                      </div>
                    )}
                  </div>

                  {loan.proofDocument && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Submitted Documents
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(loan.proofDocument, '_blank')}
                      >
                        View Document
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLoans;
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AdminHome = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/admin");
  };

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get("http://localhost:3000/userloans");
        setLoans(res.data.loan || []);
      } catch (error) {
        toast.error("Failed to fetch loans");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const totalApproved = loans.filter((l) => l.status === "approved").length;
  const totalPending = loans.filter((l) => l.status === "pending").length;
  const totalRejected = loans.filter((l) => l.status === "rejected").length;

  const pieData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [totalApproved, totalPending, totalRejected],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  const monthlyData = Array(12).fill(0);
  loans.forEach((loan) => {
    const month = new Date(loan.createdAt).getMonth();
    monthlyData[month]++;
  });

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Loans Applied",
        data: monthlyData,
        fill: true,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary/10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Title & Quick Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Home</h1>
            <p className="text-muted-foreground mt-2">
              Overview of loan activities and quick actions.
            </p>
          </div>
          <Button onClick={navigateToDashboard}>Go To Admin Dashboard</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{loans.length}</div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">{totalApproved}</div>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">{totalPending}</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-destructive">{totalRejected}</div>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Loan Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie data={pieData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Loan Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={lineData} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Loan Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Applicant</th>
                    <th className="px-4 py-2 text-left">Loan Type</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.slice(0, 5).map((loan) => (
                    <tr key={loan._id} className="border-b">
                      <td className="px-4 py-2">{loan.user?.name}</td>
                      <td className="px-4 py-2 capitalize">{loan.loanType}</td>
                      <td className="px-4 py-2">
                        ${loan.amount?.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        <Badge
                          variant={
                            loan.status === "approved"
                              ? "success"
                              : loan.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {loan.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Other Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button className="w-full" variant="outline">
            Add New Loan Type
          </Button>
          <Button className="w-full" variant="outline">
            Manage Customers
          </Button>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;

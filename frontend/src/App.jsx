import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import ApplyLoan from "./pages/ApplyLoan";
import MyLoans from "./pages/MyLoans";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminHome from "./pages/AdminHome";
import AuthGaurd from "./routes/AuthGaurd";
import IsLogin from "./routes/IsLogin";
import AdminRoutes from "./routes/AdminRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>

              <Route element={<><IsLogin /></>} >
                <Route path='/login' element={<><Login /></>} />
                <Route path='/signup' element={<><Signup /></>} />
              </Route>
              <Route path="/" element={<Home />} />
              <Route element={<><AuthGaurd /></>} >
                <Route
                  path="/apply-loan"
                  element={
                    <ApplyLoan />
                  }
                />
                <Route
                  path="/my-loans"
                  element={
                    <MyLoans />
                  }
                />
                <Route element={<><AdminRoutes /></>} >
                  <Route path="/adminhome" element={<><AdminHome /></>} />
                  <Route
                    path="/admin"
                    element={
                      <AdminDashboard />
                    }
                  />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />

            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
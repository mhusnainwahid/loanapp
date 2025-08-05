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
              <Route path="/" element={<Home />} />
              {/* <Route path="/login" element={<Auth mode="login" />} />
              <Route path="/signup" element={<Auth mode="signup" />} /> */}
              <Route path='/login' element = {<><Login/></>} />
              <Route path='/signup' element = {<><Signup/></>} />
              
              <Route 
                path="/apply-loan" 
                element={
                  // <ProtectedRoute>
                    <ApplyLoan />
                  // </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-loans" 
                element={
                  // <ProtectedRoute>
                    <MyLoans />
                  // </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  // <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  // </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
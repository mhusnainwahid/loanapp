import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem("role")
    localStorage.removeItem("userId")
    localStorage.removeItem("isVerify")
    setIsAuth(true)
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuth(!!token)
  }, [])

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 group">
            <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant group-hover:shadow-hover transition-all duration-300">
              <span className="text-white font-bold text-lg lg:text-xl">L</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-xl lg:text-2xl bg-gradient-primary bg-clip-text text-transparent">
                EliteLoan
              </span>
              <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">
                Professional Lending
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isAuth ?
              <Button
                variant="default"
                onClick={handleLogOut}
              >
                LogOut
              </Button>: 
                <> <Button
                  variant="outline"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
                  <Button
                    variant="default"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button> 
              </>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

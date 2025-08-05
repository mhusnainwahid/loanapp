import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, LogOut, User, Home, FileText, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = user ? [
    { path: '/', label: 'Home', icon: Home },
    { path: '/apply-loan', label: 'Apply Loan', icon: FileText },
    { path: '/my-loans', label: 'My Loans', icon: User },
    ...(isAdmin ? [{ path: '/admin', label: 'Admin Dashboard', icon: BarChart3 }] : [])
  ] : [];

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-professional">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-18 items-center justify-between">
          {/* Logo - Enhanced */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant group-hover:shadow-hover transition-all duration-300">
              <span className="text-white font-bold text-lg lg:text-xl">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl lg:text-2xl bg-gradient-primary bg-clip-text text-transparent">
                EliteLoan
              </span>
              <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">
                Professional Lending
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10 shadow-professional border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover:shadow-professional'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu / Auth Buttons - Enhanced */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:shadow-elegant transition-all duration-200">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          <AvatarImage src={user.profileImage} alt={user.name} />
                          <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 p-2 shadow-elegant" align="end">
                      <div className="flex items-center space-x-3 p-3 bg-gradient-card rounded-lg mb-2">
                        <Avatar className="h-10 w-10 border border-primary/20">
                          <AvatarImage src={user.profileImage} alt={user.name} />
                          <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          {user.role === 'admin' && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="text-destructive focus:text-destructive hover:bg-destructive/10 cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile Menu - Enhanced */}
                <div className="md:hidden">
                  <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 p-6">
                      <div className="flex flex-col space-y-6 mt-6">
                        {/* User Info - Enhanced */}
                        <div className="flex items-center space-x-3 p-4 bg-gradient-card rounded-xl border border-primary/10 shadow-professional">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={user.profileImage} alt={user.name} />
                            <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            {user.role === 'admin' && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                Admin
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Navigation Items - Enhanced */}
                        <div className="space-y-2">
                          {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                  isActivePath(item.path)
                                    ? 'text-primary bg-primary/10 shadow-professional border border-primary/20'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                                }`}
                              >
                                <Icon className="h-5 w-5" />
                                <span>{item.label}</span>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Logout Button - Enhanced */}
                        <Button 
                          variant="outline" 
                          onClick={handleLogout}
                          className="w-full justify-start border-destructive/20 text-destructive hover:bg-destructive/10"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </>
            ) : (
              /* Auth Buttons for Non-Logged Users - Enhanced */
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10 font-medium">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="shadow-professional hover:shadow-elegant transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
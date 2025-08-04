import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import heroImage from '../assets/financial-hero.jpg';
import { ArrowRight, Shield, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Professional Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8 animate-slide-in">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trusted by 10,000+ customers
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Secure Your
                </span>
                <br />
                <span className="text-foreground">Financial Future</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Experience hassle-free loan approvals with our advanced digital platform. 
                Get competitive rates, instant decisions, and personalized financial solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link to="/apply-loan" className="sm:w-auto">
                  <Button size="xl" className="w-full sm:w-auto group shadow-elegant hover:shadow-hover transition-all duration-300">
                    Apply for Loan
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="sm:w-auto">
                    <Button size="xl" className="w-full sm:w-auto group shadow-elegant hover:shadow-hover transition-all duration-300">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/login" className="sm:w-auto">
                    <Button size="xl" variant="outline" className="w-full sm:w-auto border-2 hover:bg-primary/5">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 pt-6 lg:pt-8">
              <div className="flex items-center space-x-3 p-3 lg:p-4 rounded-xl bg-card shadow-professional">
                <div className="p-2 bg-success/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm lg:text-base">Best Rates</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">From 8.5% APR</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 lg:p-4 rounded-xl bg-card shadow-professional">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm lg:text-base">100% Secure</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Bank-level encryption</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 lg:p-4 rounded-xl bg-card shadow-professional">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm lg:text-base">Fast Approval</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Professional features */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-elegant">
              <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
              <div className="space-y-4">
                {[
                  'Instant pre-approval decisions',
                  'No hidden fees or charges',
                  'Flexible repayment options',
                  '24/7 customer support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

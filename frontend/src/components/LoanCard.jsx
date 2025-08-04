import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';

const LoanCard = ({ type, description, features, interestRate, icon }) => {
  const { user } = useAuth();

  return (
    <Card className="group relative overflow-hidden hover:shadow-hover transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/30 bg-gradient-card">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="text-center pb-4 relative z-10">
        <div className="text-4xl lg:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
          {type}
        </CardTitle>
        <CardDescription className="text-sm lg:text-base text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        {/* Interest Rate - Professional highlight */}
        <div className="text-center p-4 lg:p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary-glow/10 rounded-xl border border-primary/20">
          <p className="text-sm text-muted-foreground font-medium">Interest Rate</p>
          <p className="text-2xl lg:text-3xl font-bold text-primary mt-1">{interestRate}</p>
          <p className="text-xs text-muted-foreground mt-1">*Terms and conditions apply</p>
        </div>

        {/* Features with professional styling */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground text-sm lg:text-base">Key Benefits:</h4>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm lg:text-base text-foreground leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>

        {/* Professional CTA */}
        <div className="pt-4">
          {user ? (
            <Link to="/apply-loan" className="block">
              <Button className="w-full group relative overflow-hidden shadow-professional hover:shadow-elegant transition-all duration-300">
                <span className="relative z-10">Apply Now</span>
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary-glow opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Button>
            </Link>
          ) : (
            <Link to="/signup" className="block">
              <Button className="w-full group relative overflow-hidden shadow-professional hover:shadow-elegant transition-all duration-300">
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary-glow opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Button>
            </Link>
          )}
        </div>

        {/* Professional badge */}
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
            ✓ Pre-approved available
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanCard;
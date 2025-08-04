import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import {Lock} from 'lucide-react';
import heroImage from '../assets/financial-hero.jpg';
import { ArrowRight, Shield, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75 z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8 animate-slide-in">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trusted by 10,000+ customers
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                <span className="text-blue-400">Secure Your</span><br />
                <span className="text-white">Financial Future</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-200 max-w-xl leading-relaxed">
                Experience hassle-free loan approvals with our advanced digital platform.
                Get competitive rates, instant decisions, and personalized financial solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link to="/apply-loan">
                  <Button size="xl" className="group shadow-elegant hover:shadow-hover transition-all duration-300">
                    Apply for Loan
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button
                      size="xl"
                      className="group px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>

                  </Link>
                  <Link to="/login">
                    <Button
                      size="xl"
                      variant="outline"
                      className="border-2 border-white text-black hover:bg-white/10 hover:text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300"
                    >
                      <Lock className="w-5 h-5" />
                      Sign In
                    </Button>

                  </Link>
                </>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 lg:pt-8">
              {[
                {
                  icon: <TrendingUp className="h-5 w-5 text-green-400" />,
                  title: 'Best Rates',
                  sub: 'From 8.5% APR',
                },
                {
                  icon: <Shield className="h-5 w-5 text-blue-400" />,
                  title: '100% Secure',
                  sub: 'Bank-level encryption',
                },
                {
                  icon: <Clock className="h-5 w-5 text-yellow-400" />,
                  title: 'Fast Approval',
                  sub: 'Within 24 hours',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 p-4 rounded-xl bg-white/10 backdrop-blur-md shadow-md"
                >
                  <div className="p-2 bg-white/10 rounded-lg">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-white text-base">{item.title}</p>
                    <p className="text-sm text-gray-300">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">Why Choose Us?</h3>
              <div className="space-y-4">
                {[
                  'Instant pre-approval decisions',
                  'No hidden fees or charges',
                  'Flexible repayment options',
                  '24/7 customer support',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-200">{feature}</span>
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

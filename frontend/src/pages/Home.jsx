import Hero from '../components/Hero';
import LoanCard from '../components/LoanCard';

const loanTypes = [
  {
    type: 'Home Loan',
    description: 'Turn your dream of homeownership into reality with our competitive home loan rates and flexible terms.',
    features: ['Up to 30-year tenure', 'Minimal documentation', 'Quick approval process', 'No hidden charges'],
    interestRate: '8.5% onwards',
    icon: '🏠'
  },
  {
    type: 'Education Loan',
    description: 'Invest in your future with comprehensive education loans covering tuition, living expenses, and more.',
    features: ['No collateral required', 'Flexible repayment options', 'Cover full course fees', 'Moratorium period available'],
    interestRate: '9.5% onwards',
    icon: '🎓'
  },
  {
    type: 'Business Loan',
    description: 'Fuel your entrepreneurial dreams with working capital and business expansion loans designed for growth.',
    features: ['Quick disbursement', 'Minimal paperwork', 'Flexible tenure options', 'Competitive interest rates'],
    interestRate: '12% onwards',
    icon: '💼'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Professional loan types section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6">
              Choose Your Perfect Loan
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of loan products, each tailored to meet your specific financial needs 
              with competitive rates and professional service.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-24 bg-gradient-primary rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {loanTypes.map((loan, index) => (
              <div key={index} className="animate-slide-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <LoanCard {...loan} />
              </div>
            ))}
          </div>

          {/* Trust section */}
          <div className="mt-16 lg:mt-20 text-center">
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-elegant border border-primary/10">
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-foreground">
                Trusted by thousands of customers
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">₹500Cr+</div>
                  <div className="text-sm text-muted-foreground">Loans Disbursed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">24hrs</div>
                  <div className="text-sm text-muted-foreground">Avg. Approval Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
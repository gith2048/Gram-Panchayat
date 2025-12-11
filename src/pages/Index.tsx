import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/common/ServiceCard';
import { MOCK_SERVICES } from '@/data/mockData';
import { 
  FileText, 
  Users, 
  Clock, 
  Shield, 
  ArrowRight, 
  Building2,
  CheckCircle2,
  Smartphone,
  Award
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Online Applications',
    description: 'Apply for certificates, schemes, and services from anywhere, anytime.',
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Track your application status in real-time with instant updates.',
  },
  {
    icon: Shield,
    title: 'Secure & Transparent',
    description: 'Your data is protected with enterprise-grade security measures.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Access services on any device - desktop, tablet, or mobile.',
  },
];

const stats = [
  { value: '50,000+', label: 'Citizens Served' },
  { value: '100+', label: 'Services Available' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Online Access' },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Award className="w-4 h-4 text-accent" />
                <span>Government of India Initiative</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Digital E-Gram
                <span className="block text-accent">Panchayat</span>
              </h1>
              
              <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
                Empowering rural India through digital governance. Apply for government schemes, 
                certificates, and services online with ease and transparency.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button size="xl" variant="accent" className="font-semibold">
                    Explore Services
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="xl" variant="hero-outline">
                    Register Now
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-primary-foreground/20">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-accent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Image/Illustration */}
            <div className="hidden lg:flex justify-center items-center animate-fade-in stagger-2">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-accent/30 to-primary-foreground/10 rounded-3xl backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
                  <Building2 className="w-40 h-40 text-primary-foreground/30" />
                </div>
                {/* Floating cards */}
                <div className="absolute -top-6 -right-6 bg-card text-card-foreground rounded-xl p-4 shadow-elevated animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Application Approved</p>
                      <p className="text-xs text-muted-foreground">Birth Certificate</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-8 bg-card text-card-foreground rounded-xl p-4 shadow-elevated animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">50,000+</p>
                      <p className="text-xs text-muted-foreground">Happy Citizens</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Digital E-Gram?
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience seamless government services at your fingertips
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Popular Services
              </h2>
              <p className="text-muted-foreground">
                Most requested government services and schemes
              </p>
            </div>
            <Link to="/services">
              <Button variant="outline">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SERVICES.slice(0, 6).map((service, index) => (
              <div 
                key={service.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who have simplified their access to government services. 
            Register today and experience hassle-free applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="accent" className="font-semibold">
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="hero-outline">
                Already Registered? Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

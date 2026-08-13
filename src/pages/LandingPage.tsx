import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function LandingPage() {
  const { user, profile } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const features = [
    {
      title: 'Instant Room Booking',
      description: 'Book any room or resource in seconds with a simple, conflict-aware booking flow.',
      icon: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_551b54a3-8828-4291-9b44-45c2e35b7c26.jpg',
    },
    {
      title: 'Conflict Detection',
      description: 'Real-time conflict detection prevents double bookings before they happen — automatically.',
      icon: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d16c025f-f942-4e8c-9161-35eb5e7a85de.jpg',
    },
    {
      title: 'Approval Workflows',
      description: 'Set up Manager and Admin approval flows so every booking gets the right sign-off.',
      icon: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_51cb3981-2a0c-48dc-94f9-d682172c0da2.jpg',
    },
    {
      title: 'Role-Based Access',
      description: 'Admins, Managers, and Users each get exactly the access they need — nothing more.',
      icon: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_dbba2daa-4bf9-41ee-91fa-a157d07e1fed.jpg',
    },
    {
      title: 'Live Calendar View',
      description: 'See all room bookings across your organization on a real-time shared calendar.',
      icon: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_24b10170-3dd8-4c73-a301-57809a240843.jpg',
    },
    {
      title: 'Instant Notifications',
      description: 'Get notified the moment your booking is approved, rejected, or cancelled.',
      icon: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_370e590e-e01d-4dec-b291-8e721b41efa2.jpg',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2 px-2 py-1 sm:px-3 sm:py-1 bg-primary border-3 border-black hard-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                <img 
                  src="https://miaoda-conversation-file.s3cdn.medo.dev/user-b1pxnfidi8e8/conv-b5rmjd5bhh4w/20260501/file-bbmv6icp7i0w.png" 
                  alt="MeetOps Logo" 
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain [filter:drop-shadow(3px_3px_0px_#000)]"
                />
                <span className="text-foreground text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide">
                  MEETOPS
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm font-bold uppercase tracking-wide">
                    {profile?.name || 'User'}
                  </span>
                  <Button asChild>
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t-2 border-primary">
            <div className="px-4 py-4 space-y-3">
              {user ? (
                <>
                  <div className="text-sm font-bold uppercase tracking-wide text-center py-2">
                    {profile?.name || 'User'}
                  </div>
                  <Button className="w-full" asChild>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      Go to Dashboard
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-x-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-foreground">
              <div className="space-y-4">
                {user ? (
                  <>
                    <div className="inline-block px-3 py-1.5 sm:px-6 sm:py-3 bg-primary border-3 border-black hard-shadow mb-2 sm:mb-4">
                      <p className="text-sm sm:text-lg font-bold uppercase tracking-wide">
                        WELCOME BACK!
                      </p>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black">
                      <span className="block">Hello,</span>
                      <span className="block text-primary text-hard-shadow">{profile?.name || 'User'}!</span>
                    </h1>
                    <p className="text-base sm:text-xl md:text-2xl text-black/70 max-w-2xl font-medium">
                      Ready to manage your bookings? Access your dashboard to view upcoming reservations,
                      create new bookings, and manage your organization's resources.
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black">
                      <span className="block">Book Rooms.</span>
                      <span className="block text-primary text-hard-shadow">Eliminate Conflicts.</span>
                      <span className="block">Run Smoother.</span>
                    </h1>
                    <p className="text-base sm:text-xl md:text-2xl text-black/70 max-w-2xl font-medium">
                      MeetOps gives your team a centralized platform to book meeting rooms, manage
                      resources, and eliminate double bookings — all in one place.
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <>
                    <Button size="lg" className="text-lg px-8 py-6" asChild>
                      <Link to="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={scrollToFeatures}>
                      View Features
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" className="text-lg px-8 py-6" asChild>
                      <Link to="/register">Get Started</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t-2 border-border">
                <p className="text-sm text-muted-foreground mb-4">Trusted by modern teams</p>
                <div className="grid grid-cols-2 sm:flex items-center gap-6 sm:gap-8">
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-primary text-hard-shadow">500+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Organizations</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-primary text-hard-shadow">10K+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Bookings/Month</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-primary text-hard-shadow">99.9%</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_14511401-01fa-4e0d-b577-490ca494cfb8.jpg"
                  alt="MeetOps Dashboard"
                  className="w-full rounded-lg shadow-2xl border-4 border-primary"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Everything your team needs to manage spaces
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From instant booking to conflict-free scheduling, MeetOps handles it all.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-background border-2 border-border p-8 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-6">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://miaoda-conversation-file.s3cdn.medo.dev/user-b1pxnfidi8e8/conv-b5rmjd5bhh4w/20260501/file-bbmv6icp7i0w.png" 
                  alt="MeetOps Logo" 
                  className="w-16 h-16 object-contain [filter:drop-shadow(3px_3px_0px_#000)]"
                />
                <h3 className="text-2xl font-bold text-primary">MeetOps</h3>
              </div>
              <p className="text-muted-foreground">Smarter room booking for modern teams.</p>
            </div>

            {/* Product Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Product</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={scrollToFeatures}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t-2 border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 MeetOps. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

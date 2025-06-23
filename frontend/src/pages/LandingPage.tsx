import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, CreditCard, Smartphone, TrendingUp } from 'lucide-react';
import secureBankLogo from './SecureBank.jpg';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={secureBankLogo} alt="SecureBank Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-white">SecureBank</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
          </nav>
          <div className="flex space-x-2">
            <Link to="/login">
              <Button variant="secondary" className="bg-white text-blue-900 hover:bg-white/90">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="bg-yellow-400 hover:bg-white hover:text-blue-900">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Banking Made
          <span className="block text-yellow-400">Simple & Secure</span>
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in">
          Experience the future of banking with our comprehensive financial solutions. 
          Manage your accounts, transfer money, and track your finances with ease.
        </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
        <Link to="/login">
          <Button size="lg" className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 px-8 py-3 text-lg">
              Get Started
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 px-8 py-3 text-lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Why Choose SecureBank?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all">
            <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Bank-Level Security</h3>
            <p className="text-white/80">256-bit encryption and multi-factor authentication</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all">
            <CreditCard className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Multiple Accounts</h3>
            <p className="text-white/80">Checking, savings, and credit accounts in one place</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all">
            <Smartphone className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Mobile Banking</h3>
            <p className="text-white/80">Access your accounts anywhere, anytime</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all">
            <TrendingUp className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Financial Insights</h3>
            <p className="text-white/80">Track spending and manage your financial goals</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900/50 backdrop-blur-sm border-t border-white/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">SecureBank</span>
          </div>
          <p className="text-white/60">© 2024 SecureBank. All rights reserved. FDIC Insured.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
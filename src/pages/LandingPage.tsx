import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, CheckCircle, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Vote</span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Experience the future of democratic participation with our secure, transparent, and user-friendly online voting platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Right Side - Neon Visual */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Neon circles */}
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full border-2 border-orange-400 animate-pulse delay-300"></div>
                <div className="absolute inset-8 rounded-full border-2 border-pink-400 animate-pulse delay-700"></div>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                      <Shield className="h-12 w-12 text-black" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      Secure Voting
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose VoteSecure?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge security with intuitive design to deliver the most reliable online voting experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Bank-Level Security
              </h3>
              <p className="text-gray-600">
                Your vote is protected with end-to-end encryption and multi-factor authentication.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Accessible to All
              </h3>
              <p className="text-gray-600">
                Vote from anywhere, anytime, on any device with our responsive design.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Transparent Results
              </h3>
              <p className="text-gray-600">
                Real-time results with complete audit trails for maximum transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Ready to Make Your Voice Heard?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of voters who trust VoteSecure for secure, convenient online voting.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Register to Vote</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/instructions"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
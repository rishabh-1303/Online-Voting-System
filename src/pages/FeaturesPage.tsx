import React from 'react';
import { Shield, Smartphone, Globe, Clock, BarChart3, Lock, Users, CheckCircle, Eye, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Military-Grade Security',
      description: 'End-to-end encryption with advanced cryptographic protocols ensures your vote remains private and secure.',
      color: 'blue'
    },
    {
      icon: Smartphone,
      title: 'Multi-Device Access',
      description: 'Vote from any device - desktop, tablet, or smartphone with seamless responsive design.',
      color: 'green'
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Vote from anywhere in the world with full compliance with international accessibility standards.',
      color: 'purple'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Voting windows stay open around the clock, accommodating different schedules and time zones.',
      color: 'red'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Results',
      description: 'Watch live result updates with transparent counting and instant verification of outcomes.',
      color: 'yellow'
    },
    {
      icon: Lock,
      title: 'Blockchain Verification',
      description: 'Immutable record-keeping with blockchain technology for ultimate transparency and trust.',
      color: 'indigo'
    },
    {
      icon: Users,
      title: 'Multi-Language Support',
      description: 'Available in 15+ languages to ensure everyone can participate in their preferred language.',
      color: 'pink'
    },
    {
      icon: CheckCircle,
      title: 'Audit Trail',
      description: 'Complete audit trails for every vote with cryptographic verification and receipt generation.',
      color: 'teal'
    },
    {
      icon: Eye,
      title: 'Transparent Process',
      description: 'Open-source code and public verification tools allow independent security audits.',
      color: 'orange'
    },
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'Immediate vote confirmation with unique receipts for voter verification and peace of mind.',
      color: 'cyan'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      pink: 'bg-pink-100 text-pink-600',
      teal: 'bg-teal-100 text-teal-600',
      orange: 'bg-orange-100 text-orange-600',
      cyan: 'bg-cyan-100 text-cyan-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Powerful Features</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover how VoteSecure combines cutting-edge technology with user-friendly design to deliver 
            the most secure and accessible online voting experience possible.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${getColorClasses(feature.color)}`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Register</h3>
              <p className="text-gray-600 text-sm">Create your secure account with identity verification</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Verify</h3>
              <p className="text-gray-600 text-sm">Complete multi-factor authentication for security</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Vote</h3>
              <p className="text-gray-600 text-sm">Cast your ballot with our intuitive interface</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Confirm</h3>
              <p className="text-gray-600 text-sm">Receive instant confirmation and receipt</p>
            </div>
          </div>
        </div>

        {/* Security Highlights */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Security is Our Priority</h2>
            <p className="text-xl text-gray-300">
              Your vote is protected by multiple layers of security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3">256-bit Encryption</h3>
              <p className="text-gray-300 text-sm">
                Military-grade encryption protects your vote from the moment it's cast until it's counted.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Zero-Knowledge Proof</h3>
              <p className="text-gray-300 text-sm">
                Your voting choices remain completely private while still being verifiable.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Immutable Records</h3>
              <p className="text-gray-300 text-sm">
                Blockchain technology ensures votes cannot be altered or deleted after submission.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose VoteSecure?</h2>
            <p className="text-xl text-blue-100">
              See how we compare to traditional voting methods
            </p>
          </div>
          
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-green-600">VoteSecure</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-500">Traditional Voting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 text-gray-900">Accessibility</td>
                    <td className="py-4 px-6 text-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center text-gray-400">Limited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-900">Real-time Results</td>
                    <td className="py-4 px-6 text-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center text-gray-400">Hours/Days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-900">Cost Efficiency</td>
                    <td className="py-4 px-6 text-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center text-gray-400">High Cost</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-900">Environmental Impact</td>
                    <td className="py-4 px-6 text-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center text-gray-400">Paper Waste</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-900">Security Audit Trail</td>
                    <td className="py-4 px-6 text-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center text-gray-400">Limited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have already made the switch to secure online voting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Get Started Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
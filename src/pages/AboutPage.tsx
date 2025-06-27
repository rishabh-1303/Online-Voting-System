import React from 'react';
import { Shield, Users, Globe, Award, CheckCircle, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About VoteSecure</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing democracy through secure, accessible, and transparent online voting technology. 
            Our mission is to make every voice heard and every vote count in the digital age.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              To democratize democracy by providing secure, accessible, and transparent voting solutions that empower 
              every citizen to participate in shaping their community's future, regardless of location, physical ability, 
              or circumstance.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security First</h3>
              <p className="text-gray-600">
                Every vote is protected with military-grade encryption and multi-layer security protocols to ensure complete privacy and integrity.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accessibility</h3>
              <p className="text-gray-600">
                Our platform is designed to be accessible to everyone, including people with disabilities, rural communities, and busy professionals.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600">
                Open-source technology and real-time audit trails ensure complete transparency in the voting process and results.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We continuously innovate and improve our platform to provide the best possible voting experience for all users.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reliability</h3>
              <p className="text-gray-600">
                Our robust infrastructure ensures 99.9% uptime and seamless voting experiences during critical election periods.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We leverage cutting-edge technology including blockchain, AI, and advanced cryptography to secure the democratic process.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">250K+</div>
              <div className="text-gray-600">Votes Cast</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Elections Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">150+</div>
              <div className="text-gray-600">Communities Served</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            We're a diverse team of technologists, security experts, and democracy advocates working together 
            to build the future of voting.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                AS
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Alex Smith</h3>
              <p className="text-blue-600 font-medium mb-4">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                Former security engineer at major tech companies, passionate about using technology to strengthen democracy.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                MJ
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Maria Johnson</h3>
              <p className="text-green-600 font-medium mb-4">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                Former election official with 15 years of experience in public service and democratic processes.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                DC
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">David Chen</h3>
              <p className="text-purple-600 font-medium mb-4">Chief Security Officer</p>
              <p className="text-gray-600 text-sm">
                Cybersecurity expert specializing in cryptography and secure systems for critical infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Democratic Revolution</h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to experience the future of voting? Get started with VoteSecure today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
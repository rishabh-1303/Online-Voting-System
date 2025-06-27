import React from 'react';
import { Vote, Mail, Phone, MessageCircle, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">VoteSecure</span>
            </div>
            <p className="text-gray-400">
              Secure, transparent, and accessible online voting for everyone.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">support@votesecure.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </a>
              <a href="/features" className="block text-gray-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="/instructions" className="block text-gray-400 hover:text-white transition-colors">
                How to Vote
              </a>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Feedback</h3>
            <div className="space-y-3">
              <textarea
                placeholder="Share your feedback..."
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Send Feedback</span>
              </button>
            </div>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Instagram className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 VoteSecure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
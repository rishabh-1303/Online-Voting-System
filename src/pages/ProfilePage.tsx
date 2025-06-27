import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Edit3, Camera, Mail, Phone, Calendar, MapPin, Vote, Settings, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
          <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-white text-blue-600 rounded-full p-2 hover:bg-gray-100 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-blue-100">{user.email}</p>
                <div className="mt-2 flex items-center justify-center sm:justify-start space-x-2">
                  <div className={`w-3 h-3 rounded-full ${user.hasVoted ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className="text-sm">
                    {user.hasVoted ? 'Vote Cast' : 'Ready to Vote'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
                Personal Info
              </button>
              <Link to="/elections" className="py-4 px-1 text-gray-500 hover:text-gray-700 font-medium">
                Elections
              </Link>
              <button className="py-4 px-1 text-gray-500 hover:text-gray-700 font-medium">
                Settings
              </button>
            </nav>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter address"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">123 Democracy Street, Civic City, CC 12345</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">January 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Vote className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Voting Status</p>
                      <p className="font-medium text-green-600">Eligible to Vote</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Account Type</p>
                      <p className="font-medium">Verified Voter</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 px-8 py-6 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/elections"
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                View Elections
              </Link>
              <Link
                to="/vote"
                className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
              >
                Cast Vote
              </Link>
              <Link
                to="/instructions"
                className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
              >
                How to Vote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
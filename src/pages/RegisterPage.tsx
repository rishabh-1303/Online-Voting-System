import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle, Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Handle date of birth change and age calculation
    if (name === 'dateOfBirth' && value) {
      const calculatedAge = calculateAge(value);
      setAge(calculatedAge);
      setIsEligible(calculatedAge >= 18);
      
      // Clear any previous age-related errors
      if (calculatedAge >= 18 && error.includes('age')) {
        setError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Age verification
    if (!formData.dateOfBirth) {
      setError('Please enter your date of birth');
      setIsLoading(false);
      return;
    }
    
    const userAge = calculateAge(formData.dateOfBirth);
    if (userAge < 18) {
      setError('You must be at least 18 years old to register for voting');
      setIsLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-12 flex items-center justify-center">
          <div className="text-center text-white space-y-6">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
              <User className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Join VoteSecure</h2>
            <p className="text-lg text-purple-100">
              Create your account and participate in secure digital democracy
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                <p className="text-sm">Secure Voting</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                <p className="text-sm">18+ Verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="p-12">
          <div className="mb-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-6">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join our secure voting platform (18+ only)</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Date of Birth Field */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Age Display and Eligibility Status */}
              {age !== null && (
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Your age: {age} years old</span>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      isEligible ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isEligible ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span>Eligible to vote</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4" />
                          <span>Not eligible (Must be 18+)</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {!isEligible && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-red-800 font-medium">Voting Age Requirement</p>
                          <p className="text-sm text-red-700 mt-1">
                            You must be at least 18 years old to register for voting. 
                            You will be eligible to vote on your 18th birthday.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isEligible === false}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 
               isEligible === false ? 'Not Eligible (Under 18)' : 
               'Create Account'}
            </button>

            {/* Age Requirement Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Voting Age Requirement</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Only citizens who are 18 years or older are eligible to register and vote. 
                    This is a legal requirement for democratic participation.
                  </p>
                </div>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, User, Shield, Vote, FileText, ArrowRight, ArrowLeft, AlertCircle, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const InstructionsPage: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: User,
      title: 'Create Your Account',
      description: 'Register with your email and create a secure password. Verify your email address to activate your account.',
      details: [
        'Click the "Register" button on the homepage',
        'Fill in your personal information accurately',
        'Create a strong password with at least 8 characters',
        'Check your email for verification link',
        'Click the verification link to activate your account'
      ],
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Verify Your Identity',
      description: 'Complete identity verification to ensure election security. This step protects the integrity of the voting process.',
      details: [
        'Upload a valid government-issued ID',
        'Take a selfie for facial recognition',
        'Provide your current address information',
        'Wait for verification approval (usually 24-48 hours)',
        'Receive confirmation of verified status'
      ],
      color: 'green'
    },
    {
      icon: FileText,
      title: 'Review Election Information',
      description: 'Study the candidates, ballot measures, and election details before casting your vote.',
      details: [
        'Browse available elections in your area',
        'Read candidate profiles and platforms',
        'Review ballot measures and propositions',
        'Check voting deadlines and requirements',
        'Understand your voting rights and responsibilities'
      ],
      color: 'purple'
    },
    {
      icon: Vote,
      title: 'Cast Your Vote',
      description: 'Use our secure voting interface to make your selections and submit your ballot.',
      details: [
        'Log in to your verified account',
        'Select the election you want to vote in',
        'Make your candidate selections carefully',
        'Review your choices before submitting',
        'Confirm your vote and receive a receipt'
      ],
      color: 'red'
    }
  ];

  const toggleStep = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(step => step !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">How to Vote</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Follow these simple steps to participate in secure online voting. Your democratic participation has never been easier or more secure.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">{completedSteps.length}/4 steps completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getColorClasses(step.color)}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Step {index + 1}: {step.title}
                      </h3>
                      <button
                        onClick={() => toggleStep(index)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          completedSteps.includes(index)
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'border-gray-300 hover:border-green-600'
                        }`}
                      >
                        {completedSteps.includes(index) && <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    {/* Detailed Steps */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Detailed Instructions:</h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Important Reminders</h3>
              <ul className="space-y-1 text-yellow-700 text-sm">
                <li>• Ensure you have a stable internet connection before voting</li>
                <li>• Do not share your login credentials with anyone</li>
                <li>• Vote in a private location to maintain ballot secrecy</li>
                <li>• Save your voting receipt for your records</li>
                <li>• Contact support if you encounter any technical issues</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Voting Schedule */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Voting Schedule</h3>
              <div className="space-y-1 text-blue-700 text-sm">
                <p>• Early Voting: October 20 - November 4, 2024</p>
                <p>• Election Day: November 5, 2024</p>
                <p>• Voting Hours: 8:00 AM - 8:00 PM (Local Time)</p>
                <p>• Results Available: November 5, 2024 at 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
          >
            <span>Start Voting Process</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/about"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Learn More About Us</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InstructionsPage;
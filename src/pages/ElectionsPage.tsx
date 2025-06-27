import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Election {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'active' | 'completed';
  participants: number;
  description: string;
  type: string;
}

const ElectionsPage: React.FC = () => {
  const elections: Election[] = [
    {
      id: '1',
      title: 'City Mayor Election 2024',
      date: 'November 5, 2024',
      time: '8:00 AM - 8:00 PM',
      location: 'Civic City',
      status: 'active',
      participants: 4,
      description: 'Choose the next mayor to lead our city forward with vision and integrity.',
      type: 'Municipal Election'
    },
    {
      id: '2',
      title: 'School Board Election',
      date: 'December 15, 2024',
      time: '9:00 AM - 6:00 PM',
      location: 'Education District',
      status: 'upcoming',
      participants: 6,
      description: 'Select representatives to guide our education system and policies.',
      type: 'Educational Election'
    },
    {
      id: '3',
      title: 'City Council Ward 3',
      date: 'January 20, 2025',
      time: '8:00 AM - 8:00 PM',
      location: 'Ward 3',
      status: 'upcoming',
      participants: 3,
      description: 'Elect your local representative for Ward 3 city council seat.',
      type: 'Local Election'
    },
    {
      id: '4',
      title: 'Municipal Budget Referendum',
      date: 'October 15, 2024',
      time: '8:00 AM - 8:00 PM',
      location: 'Civic City',
      status: 'completed',
      participants: 0,
      description: 'Community decision on the 2025 municipal budget allocation.',
      type: 'Referendum'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'upcoming':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const activeElections = elections.filter(e => e.status === 'active');
  const upcomingElections = elections.filter(e => e.status === 'upcoming');
  const completedElections = elections.filter(e => e.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Elections</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about current and upcoming elections in your area. Your voice matters in shaping our community's future.
          </p>
        </div>

        {/* Active Elections */}
        {activeElections.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Active Elections</span>
              </h2>
              <span className="text-sm text-green-600 font-medium">Vote Now!</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeElections.map((election) => (
                <div key={election.id} className="bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{election.type}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(election.status)}`}>
                        {getStatusIcon(election.status)}
                        <span className="capitalize">{election.status}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{election.title}</h3>
                    <p className="text-gray-600 mb-4">{election.description}</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{election.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{election.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{election.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{election.participants} candidates</span>
                      </div>
                    </div>
                    <Link
                      to="/vote"
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                    >
                      <span>Vote Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Elections */}
        {upcomingElections.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Elections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingElections.map((election) => (
                <div key={election.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{election.type}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(election.status)}`}>
                        {getStatusIcon(election.status)}
                        <span className="capitalize">{election.status}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{election.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{election.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{election.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{election.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{election.participants} candidates</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Elections */}
        {completedElections.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Elections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedElections.map((election) => (
                <div key={election.id} className="bg-white rounded-xl shadow-lg overflow-hidden opacity-75">
                  <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{election.type}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(election.status)}`}>
                        {getStatusIcon(election.status)}
                        <span className="capitalize">{election.status}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{election.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{election.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{election.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{election.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Informed</h2>
          <p className="text-lg text-blue-100 mb-6">
            Don't miss out on important elections. Register to receive notifications about upcoming voting opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Register to Vote
            </Link>
            <Link
              to="/instructions"
              className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold"
            >
              Learn How to Vote
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ElectionsPage;
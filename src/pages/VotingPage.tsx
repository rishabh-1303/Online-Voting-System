import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown, ChevronUp, User, Calendar, MapPin, Flag, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

interface Candidate {
  id: string;
  name: string;
  party: string;
  partySymbol: string;
  age: number;
  constituency: string;
  education: string;
  experience: string;
  manifesto: string[];
  partyColor: string;
}

interface Election {
  id: string;
  title: string;
  type: 'official' | 'contest';
  description: string;
  startDate: string;
  endDate: string;
  constituency: string;
  organizer?: string;
  isActive: boolean;
}

const VotingPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [expandedCandidate, setExpandedCandidate] = useState<string>('');
  const [confirmVote, setConfirmVote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedElection, setSelectedElection] = useState<string>('1');

  // Indian Political Parties and Candidates
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Rajesh Kumar Singh',
      party: 'BJP (Bharatiya Janata Party)',
      partySymbol: '🪷', // Lotus
      age: 52,
      constituency: 'Delhi Central',
      education: 'MA Political Science, Delhi University',
      experience: '15 years in politics, Former MLA',
      manifesto: ['Digital India', 'Make in India', 'Swachh Bharat', 'Ayushman Bharat', 'Skill Development'],
      partyColor: 'orange'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      party: 'INC (Indian National Congress)',
      partySymbol: '✋', // Hand
      age: 45,
      constituency: 'Delhi Central',
      education: 'LLB, Jawaharlal Nehru University',
      experience: '12 years in public service',
      manifesto: ['NYAY Scheme', 'Employment Guarantee', 'Healthcare for All', 'Education Reform', 'Women Empowerment'],
      partyColor: 'blue'
    },
    {
      id: '3',
      name: 'Arvind Kejriwal',
      party: 'AAP (Aam Aadmi Party)',
      partySymbol: '🧹', // Broom
      age: 55,
      constituency: 'Delhi Central',
      education: 'IIT Kharagpur, IRS Officer',
      experience: 'Anti-corruption activist, Former CM Delhi',
      manifesto: ['Free Education', 'Free Healthcare', 'Anti-Corruption', 'Swaraj', 'Mohalla Clinics'],
      partyColor: 'indigo'
    },
    {
      id: '4',
      name: 'Mamata Banerjee',
      party: 'AITC (All India Trinamool Congress)',
      partySymbol: '🌸', // Flower
      age: 68,
      constituency: 'Delhi Central',
      education: 'BA, University of Calcutta',
      experience: 'Former Railway Minister, CM West Bengal',
      manifesto: ['Ma-Mati-Manush', 'Social Welfare', 'Industrial Development', 'Cultural Heritage', 'Minority Rights'],
      partyColor: 'green'
    },
    {
      id: '5',
      name: 'Mayawati',
      party: 'BSP (Bahujan Samaj Party)',
      partySymbol: '🐘', // Elephant
      age: 67,
      constituency: 'Delhi Central',
      education: 'LLB, University of Delhi',
      experience: 'Former CM Uttar Pradesh, Dalit Rights Leader',
      manifesto: ['Social Justice', 'Dalit Empowerment', 'Reservation Policy', 'Economic Equality', 'Education Access'],
      partyColor: 'purple'
    },
    {
      id: '6',
      name: 'Akhilesh Yadav',
      party: 'SP (Samajwadi Party)',
      partySymbol: '🚲', // Bicycle
      age: 50,
      constituency: 'Delhi Central',
      education: 'B.Tech, University of Sydney',
      experience: 'Former CM Uttar Pradesh, Youth Leader',
      manifesto: ['Laptop Distribution', 'Expressway Development', 'Youth Employment', 'Farmer Welfare', 'Backward Class Upliftment'],
      partyColor: 'red'
    }
  ];

  // Available Elections (Official + Contests)
  const elections: Election[] = [
    {
      id: '1',
      title: 'Lok Sabha General Election 2024',
      type: 'official',
      description: 'General Election for the 18th Lok Sabha of India',
      startDate: '2024-04-19',
      endDate: '2024-06-01',
      constituency: 'Delhi Central',
      isActive: true
    },
    {
      id: '2',
      title: 'Class President Election - DU',
      type: 'contest',
      description: 'Student Council Election for Delhi University',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      constituency: 'Delhi University',
      organizer: 'Student Council Committee',
      isActive: true
    },
    {
      id: '3',
      title: 'Best Teacher Award Voting',
      type: 'contest',
      description: 'Annual voting for the most popular teacher',
      startDate: '2024-03-10',
      endDate: '2024-03-25',
      constituency: 'Modern School Delhi',
      organizer: 'School Management',
      isActive: true
    }
  ];

  const currentElection = elections.find(e => e.id === selectedElection);
  const isOfficialElection = currentElection?.type === 'official';

  const getPartyColorClasses = (color: string) => {
    const colorMap = {
      orange: 'border-orange-500 bg-orange-50',
      blue: 'border-blue-500 bg-blue-50',
      indigo: 'border-indigo-500 bg-indigo-50',
      green: 'border-green-500 bg-green-50',
      purple: 'border-purple-500 bg-purple-50',
      red: 'border-red-500 bg-red-50'
    };
    return colorMap[color as keyof typeof colorMap] || 'border-gray-500 bg-gray-50';
  };

  const handleVoteSubmit = async () => {
    if (!selectedCandidate || !confirmVote) return;
    
    setIsSubmitting(true);
    
    // Simulate vote submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    updateProfile({ hasVoted: true });
    navigate('/profile');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to vote</h2>
          <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (user.hasVoted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">धन्यवाद! Thank You for Voting!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your vote has been successfully recorded and counted. Your participation strengthens our democracy.
            </p>
            <Link
              to="/profile"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/profile" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Profile
          </Link>
        </div>

        {/* Election Selection */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Election</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {elections.map((election) => (
              <div
                key={election.id}
                onClick={() => setSelectedElection(election.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedElection === election.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    election.type === 'official' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {election.type === 'official' ? 'Official Election' : 'Friendly Contest'}
                  </span>
                  {election.type === 'official' && <Flag className="h-4 w-4 text-orange-500" />}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{election.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{election.description}</p>
                <div className="text-xs text-gray-500">
                  <div className="flex items-center space-x-1 mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{election.constituency}</span>
                  </div>
                  {election.organizer && (
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>Organized by: {election.organizer}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Election Header */}
          <div className={`p-8 text-white ${
            isOfficialElection 
              ? 'bg-gradient-to-r from-orange-600 to-green-600' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              {isOfficialElection && <Flag className="h-8 w-8 text-white" />}
              <h1 className="text-3xl font-bold">{currentElection?.title}</h1>
            </div>
            <p className="text-lg mb-4">{currentElection?.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{currentElection?.startDate} to {currentElection?.endDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>{currentElection?.constituency}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{user.name}</span>
              </div>
              {currentElection?.organizer && (
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Organizer: {currentElection.organizer}</span>
                </div>
              )}
            </div>
          </div>

          {/* Voting Instructions */}
          <div className="p-6 bg-gradient-to-r from-orange-50 to-green-50 border-b">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Flag className="h-5 w-5 text-orange-600" />
              <span>मतदान निर्देश / Voting Instructions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>सभी उम्मीदवारों की समीक्षा करें / Review all candidates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>अपना पसंदीदा उम्मीदवार चुनें / Select your preferred candidate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>पुष्टि करें और वोट दें / Confirm and submit your vote</span>
              </div>
            </div>
          </div>

          {/* Candidates List */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <span>अपना उम्मीदवार चुनें / Select Your Candidate</span>
            </h2>
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedCandidate === candidate.id
                      ? `${getPartyColorClasses(candidate.partyColor)} border-2`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCandidate(candidate.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl ${
                          candidate.partyColor === 'orange' ? 'bg-orange-600' :
                          candidate.partyColor === 'blue' ? 'bg-blue-600' :
                          candidate.partyColor === 'indigo' ? 'bg-indigo-600' :
                          candidate.partyColor === 'green' ? 'bg-green-600' :
                          candidate.partyColor === 'purple' ? 'bg-purple-600' :
                          'bg-red-600'
                        }`}>
                          {candidate.partySymbol}
                        </div>
                        {selectedCandidate === candidate.id && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                        <p className={`font-medium text-lg ${
                          candidate.partyColor === 'orange' ? 'text-orange-600' :
                          candidate.partyColor === 'blue' ? 'text-blue-600' :
                          candidate.partyColor === 'indigo' ? 'text-indigo-600' :
                          candidate.partyColor === 'green' ? 'text-green-600' :
                          candidate.partyColor === 'purple' ? 'text-purple-600' :
                          'text-red-600'
                        }`}>
                          {candidate.party}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Age: {candidate.age} • Constituency: {candidate.constituency}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCandidate(
                          expandedCandidate === candidate.id ? '' : candidate.id
                        );
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedCandidate === candidate.id ? (
                        <ChevronUp className="h-6 w-6" />
                      ) : (
                        <ChevronDown className="h-6 w-6" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedCandidate === candidate.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">शिक्षा / Education</h4>
                          <p className="text-gray-600 text-sm mb-4">{candidate.education}</p>
                          <h4 className="font-semibold text-gray-900 mb-2">अनुभव / Experience</h4>
                          <p className="text-gray-600 text-sm">{candidate.experience}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">घोषणापत्र / Manifesto</h4>
                          <div className="flex flex-wrap gap-2">
                            {candidate.manifesto.map((item, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  candidate.partyColor === 'orange' ? 'bg-orange-100 text-orange-800' :
                                  candidate.partyColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                                  candidate.partyColor === 'indigo' ? 'bg-indigo-100 text-indigo-800' :
                                  candidate.partyColor === 'green' ? 'bg-green-100 text-green-800' :
                                  candidate.partyColor === 'purple' ? 'bg-purple-100 text-purple-800' :
                                  'bg-red-100 text-red-800'
                                }`}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vote Confirmation */}
          {selectedCandidate && (
            <div className="p-8 border-t bg-gradient-to-r from-orange-50 to-green-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    id="confirm-vote"
                    type="checkbox"
                    checked={confirmVote}
                    onChange={(e) => setConfirmVote(e.target.checked)}
                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="confirm-vote" className="text-gray-700 font-medium">
                    मैं पुष्टि करता/करती हूं कि मैं वोट देना चाहता/चाहती हूं / I confirm that I want to vote for{' '}
                    <span className="text-blue-600 font-semibold">
                      {candidates.find(c => c.id === selectedCandidate)?.name}
                    </span>
                    {' '}({candidates.find(c => c.id === selectedCandidate)?.party})
                  </label>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setSelectedCandidate('');
                      setConfirmVote(false);
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    रद्द करें / Cancel
                  </button>
                  <button
                    onClick={handleVoteSubmit}
                    disabled={!confirmVote || isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-orange-600 to-green-600 text-white rounded-lg hover:from-orange-700 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {isSubmitting ? 'वोट जमा कर रहे हैं... / Submitting Vote...' : 'वोट दें / Submit Vote'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
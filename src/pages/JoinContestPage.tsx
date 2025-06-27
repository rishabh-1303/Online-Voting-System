import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, Vote, CheckCircle, AlertCircle, QrCode } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

interface Contest {
  id: string;
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  venue: string;
  organizer: string;
  candidates: Candidate[];
  isActive: boolean;
  accessCode: string;
}

interface Candidate {
  id: string;
  name: string;
  description: string;
  category?: string;
  votes: number;
}

const JoinContestPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState(searchParams.get('code') || '');
  const [contest, setContest] = useState<Contest | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [confirmVote, setConfirmVote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // Mock contest data - in real app, this would come from API
  const mockContests: Contest[] = [
    {
      id: '1',
      title: 'Class President Election - 12th Grade',
      description: 'Annual election for class president and vice president',
      type: 'class-election',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      venue: 'Modern School Delhi',
      organizer: 'Class Teacher Committee',
      isActive: true,
      accessCode: 'CLASS2024',
      candidates: [
        { id: '1', name: 'Rahul Sharma', description: 'Sports Captain, Debate Team Leader', votes: 25 },
        { id: '2', name: 'Priya Patel', description: 'Head Girl, Academic Topper', votes: 20 }
      ]
    },
    {
      id: '2',
      title: 'Best Teacher Award 2024',
      description: 'Vote for your favorite teacher who made the biggest impact',
      type: 'teacher-award',
      startDate: '2024-03-10',
      endDate: '2024-03-25',
      venue: 'Delhi Public School',
      organizer: 'Student Council',
      isActive: true,
      accessCode: 'TEACHER2024',
      candidates: [
        { id: '1', name: 'Mrs. Sunita Gupta', description: 'Mathematics Teacher', category: 'Science', votes: 45 },
        { id: '2', name: 'Mr. Rajesh Kumar', description: 'English Teacher', category: 'Arts', votes: 35 },
        { id: '3', name: 'Dr. Meera Singh', description: 'Physics Teacher', category: 'Science', votes: 40 }
      ]
    }
  ];

  useEffect(() => {
    const contestId = searchParams.get('id');
    const code = searchParams.get('code');
    
    if (code) {
      setAccessCode(code);
      handleJoinContest(code);
    }
  }, [searchParams]);

  const handleJoinContest = (code?: string) => {
    const codeToUse = code || accessCode;
    if (!codeToUse) {
      setError('Please enter an access code');
      return;
    }

    const foundContest = mockContests.find(c => c.accessCode === codeToUse.toUpperCase());
    
    if (!foundContest) {
      setError('Invalid access code. Please check and try again.');
      return;
    }

    if (!foundContest.isActive) {
      setError('This contest is not currently active.');
      return;
    }

    setContest(foundContest);
    setHasJoined(true);
    setError('');
  };

  const handleVoteSubmit = async () => {
    if (!selectedCandidate || !confirmVote || !contest) return;
    
    setIsSubmitting(true);
    
    // Simulate vote submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setHasVoted(true);
    setIsSubmitting(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Login Required</h1>
            <p className="text-lg text-gray-600 mb-8">
              Please log in to participate in contests
            </p>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Voting!</h1>
            <p className="text-lg text-gray-600 mb-4">
              Your vote has been successfully recorded for: <strong>{contest?.title}</strong>
            </p>
            <p className="text-gray-600 mb-8">
              Results will be visible to the contest organizer only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/profile"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Profile
              </Link>
              <Link
                to="/"
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
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

        {!hasJoined ? (
          /* Join Contest Form */
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Contest</h1>
              <p className="text-gray-600">Enter the contest access code to participate</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contest Access Code
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono"
                  placeholder="Enter code (e.g., CLASS2024)"
                  maxLength={10}
                />
                <button
                  onClick={() => handleJoinContest()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Join
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Get the access code from your contest organizer or scan the QR code
              </p>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">How to Join:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Get the access code from your contest organizer</li>
                <li>• Scan the QR code with your phone camera or Google Lens</li>
                <li>• Enter the code in the field above</li>
                <li>• Vote for your preferred candidate/option</li>
              </ul>
            </div>
          </div>
        ) : (
          /* Contest Voting Interface */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Contest Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-8 w-8 text-white" />
                <h1 className="text-3xl font-bold">{contest?.title}</h1>
              </div>
              <p className="text-lg mb-4">{contest?.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-green-100">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{contest?.startDate} to {contest?.endDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{contest?.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Organized by: {contest?.organizer}</span>
                </div>
              </div>
            </div>

            {/* Voting Instructions */}
            <div className="p-6 bg-green-50 border-b">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Vote className="h-5 w-5 text-green-600" />
                <span>Voting Instructions</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span>Review all options</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span>Select your choice</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span>Confirm and submit</span>
                </div>
              </div>
            </div>

            {/* Candidates/Options List */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Make Your Choice</h2>
              <div className="space-y-4">
                {contest?.candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      selectedCandidate === candidate.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCandidate(candidate.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          {selectedCandidate === candidate.id && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-600">{candidate.description}</p>
                          {candidate.category && (
                            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                              {candidate.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vote Confirmation */}
            {selectedCandidate && (
              <div className="p-8 border-t bg-green-50">
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
                      I confirm that I want to vote for{' '}
                      <span className="text-green-600 font-semibold">
                        {contest?.candidates.find(c => c.id === selectedCandidate)?.name}
                      </span>
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
                      Cancel
                    </button>
                    <button
                      onClick={handleVoteSubmit}
                      disabled={!confirmVote || isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      {isSubmitting ? 'Submitting Vote...' : 'Submit Vote'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinContestPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit3, Trash2, Users, Calendar, MapPin, Settings, Save, X, Share2, QrCode, Copy, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import QRCode from 'qrcode';

interface Contest {
  id: string;
  title: string;
  description: string;
  type: 'class-election' | 'teacher-award' | 'sports-captain' | 'cultural-event' | 'custom';
  startDate: string;
  endDate: string;
  venue: string;
  organizer: string;
  candidates: Candidate[];
  isActive: boolean;
  totalVotes: number;
  accessCode: string;
  qrCodeUrl?: string;
  participants: Participant[];
}

interface Candidate {
  id: string;
  name: string;
  description: string;
  category?: string;
  votes: number;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  hasVoted: boolean;
}

const OrganizerPage: React.FC = () => {
  const { user } = useAuth();
  const [contests, setContests] = useState<Contest[]>([
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
      totalVotes: 45,
      accessCode: 'CLASS2024',
      participants: [
        { id: '1', name: 'Amit Kumar', email: 'amit@school.edu', joinedAt: '2024-03-14', hasVoted: true },
        { id: '2', name: 'Sneha Patel', email: 'sneha@school.edu', joinedAt: '2024-03-14', hasVoted: true },
        { id: '3', name: 'Rohit Singh', email: 'rohit@school.edu', joinedAt: '2024-03-15', hasVoted: false }
      ],
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
      totalVotes: 120,
      accessCode: 'TEACHER2024',
      participants: [
        { id: '1', name: 'Student A', email: 'student1@school.edu', joinedAt: '2024-03-10', hasVoted: true },
        { id: '2', name: 'Student B', email: 'student2@school.edu', joinedAt: '2024-03-11', hasVoted: true }
      ],
      candidates: [
        { id: '1', name: 'Mrs. Sunita Gupta', description: 'Mathematics Teacher', category: 'Science', votes: 45 },
        { id: '2', name: 'Mr. Rajesh Kumar', description: 'English Teacher', category: 'Arts', votes: 35 },
        { id: '3', name: 'Dr. Meera Singh', description: 'Physics Teacher', category: 'Science', votes: 40 }
      ]
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingContest, setEditingContest] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState<string | null>(null);
  const [showParticipants, setShowParticipants] = useState<string | null>(null);
  const [newContest, setNewContest] = useState<Partial<Contest>>({
    title: '',
    description: '',
    type: 'custom',
    startDate: '',
    endDate: '',
    venue: '',
    organizer: user?.name || '',
    candidates: [],
    isActive: false,
    totalVotes: 0,
    accessCode: '',
    participants: []
  });

  const [newCandidate, setNewCandidate] = useState({ name: '', description: '', category: '' });

  const contestTypes = [
    { value: 'class-election', label: 'Class Election', icon: '🏛️' },
    { value: 'teacher-award', label: 'Teacher Award', icon: '🏆' },
    { value: 'sports-captain', label: 'Sports Captain', icon: '⚽' },
    { value: 'cultural-event', label: 'Cultural Event', icon: '🎭' },
    { value: 'custom', label: 'Custom Contest', icon: '📝' }
  ];

  // Generate random access code
  const generateAccessCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Generate QR Code
  const generateQRCode = async (contestId: string, accessCode: string) => {
    try {
      const contestUrl = `${window.location.origin}/join-contest?code=${accessCode}&id=${contestId}`;
      const qrCodeDataUrl = await QRCode.toDataURL(contestUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  };

  // Update QR codes for existing contests
  useEffect(() => {
    const updateQRCodes = async () => {
      const updatedContests = await Promise.all(
        contests.map(async (contest) => {
          if (!contest.qrCodeUrl) {
            const qrCodeUrl = await generateQRCode(contest.id, contest.accessCode);
            return { ...contest, qrCodeUrl };
          }
          return contest;
        })
      );
      setContests(updatedContests);
    };

    updateQRCodes();
  }, []);

  const handleCreateContest = async () => {
    if (!newContest.title || !newContest.description || !newContest.startDate || !newContest.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const accessCode = generateAccessCode();
    const contestId = Date.now().toString();
    const qrCodeUrl = await generateQRCode(contestId, accessCode);

    const contest: Contest = {
      id: contestId,
      title: newContest.title!,
      description: newContest.description!,
      type: newContest.type as Contest['type'],
      startDate: newContest.startDate!,
      endDate: newContest.endDate!,
      venue: newContest.venue || '',
      organizer: newContest.organizer!,
      candidates: newContest.candidates || [],
      isActive: false,
      totalVotes: 0,
      accessCode,
      qrCodeUrl,
      participants: []
    };

    setContests([...contests, contest]);
    setNewContest({
      title: '',
      description: '',
      type: 'custom',
      startDate: '',
      endDate: '',
      venue: '',
      organizer: user?.name || '',
      candidates: [],
      isActive: false,
      totalVotes: 0,
      accessCode: '',
      participants: []
    });
    setShowCreateForm(false);
  };

  const handleAddCandidate = (contestId: string) => {
    if (!newCandidate.name) return;

    const candidate: Candidate = {
      id: Date.now().toString(),
      name: newCandidate.name,
      description: newCandidate.description,
      category: newCandidate.category,
      votes: 0
    };

    if (showCreateForm) {
      setNewContest({
        ...newContest,
        candidates: [...(newContest.candidates || []), candidate]
      });
    } else {
      setContests(contests.map(contest => 
        contest.id === contestId 
          ? { ...contest, candidates: [...contest.candidates, candidate] }
          : contest
      ));
    }

    setNewCandidate({ name: '', description: '', category: '' });
  };

  const handleDeleteContest = (contestId: string) => {
    if (confirm('Are you sure you want to delete this contest?')) {
      setContests(contests.filter(contest => contest.id !== contestId));
    }
  };

  const handleToggleActive = (contestId: string) => {
    setContests(contests.map(contest => 
      contest.id === contestId 
        ? { ...contest, isActive: !contest.isActive }
        : contest
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadQRCode = (qrCodeUrl: string, contestTitle: string) => {
    const link = document.createElement('a');
    link.download = `${contestTitle}-QRCode.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access organizer panel</h2>
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
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Contest Organizer</h1>
              <p className="text-gray-600">Create and manage friendly voting contests with QR code sharing</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Contest</span>
            </button>
          </div>
        </div>

        {/* Create Contest Form */}
        {showCreateForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Contest</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contest Title</label>
                <input
                  type="text"
                  value={newContest.title}
                  onChange={(e) => setNewContest({ ...newContest, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contest title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contest Type</label>
                <select
                  value={newContest.type}
                  onChange={(e) => setNewContest({ ...newContest, type: e.target.value as Contest['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {contestTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newContest.description}
                  onChange={(e) => setNewContest({ ...newContest, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your contest"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={newContest.startDate}
                  onChange={(e) => setNewContest({ ...newContest, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={newContest.endDate}
                  onChange={(e) => setNewContest({ ...newContest, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue/Location</label>
                <input
                  type="text"
                  value={newContest.venue}
                  onChange={(e) => setNewContest({ ...newContest, venue: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter venue or location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                <input
                  type="text"
                  value={newContest.organizer}
                  onChange={(e) => setNewContest({ ...newContest, organizer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Organizer name"
                />
              </div>
            </div>

            {/* Add Candidates Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Candidates/Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Candidate/Option name"
                />
                <input
                  type="text"
                  value={newCandidate.description}
                  onChange={(e) => setNewCandidate({ ...newCandidate, description: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description (optional)"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCandidate.category}
                    onChange={(e) => setNewCandidate({ ...newCandidate, category: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Category (optional)"
                  />
                  <button
                    onClick={() => handleAddCandidate('')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Display Added Candidates */}
              {newContest.candidates && newContest.candidates.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Added Candidates:</h4>
                  {newContest.candidates.map((candidate, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="font-medium">{candidate.name}</span>
                        {candidate.description && <span className="text-gray-600 ml-2">- {candidate.description}</span>}
                        {candidate.category && <span className="text-blue-600 ml-2">({candidate.category})</span>}
                      </div>
                      <button
                        onClick={() => setNewContest({
                          ...newContest,
                          candidates: newContest.candidates?.filter((_, i) => i !== index)
                        })}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateContest}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Create Contest</span>
              </button>
            </div>
          </div>
        )}

        {/* Contests List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contests.map((contest) => (
            <div key={contest.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">
                        {contestTypes.find(t => t.value === contest.type)?.icon}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{contest.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{contest.description}</p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{contest.startDate} to {contest.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{contest.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{contest.totalVotes} votes • {contest.candidates.length} candidates • {contest.participants.length} participants</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contest.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {contest.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Access Code Display */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Contest Access Code</h4>
                      <p className="text-2xl font-bold text-blue-600 font-mono">{contest.accessCode}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(contest.accessCode)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>

                {/* Candidates Results */}
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-gray-900">Results:</h4>
                  {contest.candidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="font-medium">{candidate.name}</span>
                        {candidate.description && <span className="text-gray-600 text-sm ml-2">- {candidate.description}</span>}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="font-bold text-blue-600">{candidate.votes} votes</div>
                          <div className="text-xs text-gray-500">
                            {contest.totalVotes > 0 ? Math.round((candidate.votes / contest.totalVotes) * 100) : 0}%
                          </div>
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ 
                              width: contest.totalVotes > 0 ? `${(candidate.votes / contest.totalVotes) * 100}%` : '0%' 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowShareModal(contest.id)}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-1"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                    <button
                      onClick={() => setShowParticipants(contest.id)}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center space-x-1"
                    >
                      <Users className="h-4 w-4" />
                      <span>Participants</span>
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleActive(contest.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        contest.isActive
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {contest.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteContest(contest.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Share Contest</h3>
                <button
                  onClick={() => setShowShareModal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {(() => {
                const contest = contests.find(c => c.id === showShareModal);
                if (!contest) return null;

                return (
                  <div className="space-y-6">
                    {/* QR Code */}
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 mb-4">Scan QR Code to Join</h4>
                      {contest.qrCodeUrl && (
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                          <img src={contest.qrCodeUrl} alt="Contest QR Code" className="w-48 h-48" />
                        </div>
                      )}
                      <button
                        onClick={() => contest.qrCodeUrl && downloadQRCode(contest.qrCodeUrl, contest.title)}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
                      >
                        <QrCode className="h-4 w-4" />
                        <span>Download QR Code</span>
                      </button>
                    </div>

                    {/* Access Code */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Or use Access Code</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="text-2xl font-bold text-blue-600 font-mono">{contest.accessCode}</span>
                        <button
                          onClick={() => copyToClipboard(contest.accessCode)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Participants can enter this code on the website to join the contest
                      </p>
                    </div>

                    {/* Share URL */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Direct Link</h4>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={`${window.location.origin}/join-contest?code=${contest.accessCode}&id=${contest.id}`}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          onClick={() => copyToClipboard(`${window.location.origin}/join-contest?code=${contest.accessCode}&id=${contest.id}`)}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">How to Share:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Share the QR code for easy mobile access</li>
                        <li>• Give participants the access code to enter manually</li>
                        <li>• Send the direct link via email or messaging</li>
                        <li>• Only organizers can see detailed results</li>
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Participants Modal */}
        {showParticipants && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Contest Participants</h3>
                <button
                  onClick={() => setShowParticipants(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {(() => {
                const contest = contests.find(c => c.id === showParticipants);
                if (!contest) return null;

                return (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{contest.participants.length}</div>
                          <div className="text-sm text-blue-800">Total Participants</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {contest.participants.filter(p => p.hasVoted).length}
                          </div>
                          <div className="text-sm text-green-800">Voted</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">
                            {contest.participants.filter(p => !p.hasVoted).length}
                          </div>
                          <div className="text-sm text-orange-800">Pending</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {contest.participants.map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{participant.name}</div>
                            <div className="text-sm text-gray-600">{participant.email}</div>
                            <div className="text-xs text-gray-500">Joined: {participant.joinedAt}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              participant.hasVoted
                                ? 'bg-green-100 text-green-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {participant.hasVoted ? 'Voted' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {contest.participants.length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No Participants Yet</h4>
                        <p className="text-gray-600">Share your contest code or QR code to get participants!</p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {contests.length === 0 && !showCreateForm && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Contests Yet</h3>
            <p className="text-gray-600 mb-6">Create your first voting contest to get started</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Contest
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerPage;
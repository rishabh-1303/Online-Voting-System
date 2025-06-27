import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import VotingPage from './pages/VotingPage';
import ElectionsPage from './pages/ElectionsPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import InstructionsPage from './pages/InstructionsPage';
import OrganizerPage from './pages/OrganizerPage';
import JoinContestPage from './pages/JoinContestPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/vote" element={<VotingPage />} />
            <Route path="/elections" element={<ElectionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/instructions" element={<InstructionsPage />} />
            <Route path="/organizer" element={<OrganizerPage />} />
            <Route path="/join-contest" element={<JoinContestPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
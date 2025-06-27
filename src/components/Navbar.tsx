import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Vote, User, LogOut, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">VoteSecure</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/elections" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Elections
                </Link>
                <Link to="/organizer" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Organizer</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link to="/features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </Link>
              
              {user ? (
                <>
                  <Link to="/elections" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Elections
                  </Link>
                  <Link to="/organizer" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Organizer
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
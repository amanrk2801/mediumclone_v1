// src/components/UserMenu.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface UserMenuProps {
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ userMenuOpen, setUserMenuOpen }) => {
  const { logout, currentUser } = useAuth(); // Access currentUser
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Failed to logout:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="relative text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none"
      >
        {/* Display current user's avatar or a default avatar */}
        <img
          src={currentUser?.photoURL || '/default-avatar.svg'}
          alt="User Avatar"
          className="h-8 w-8 rounded-full"
        />
      </button>
      {userMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-50">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => setUserMenuOpen(false)} // Close menu on click
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

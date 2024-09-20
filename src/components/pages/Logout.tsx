// src/components/pages/Logout.tsx
import React, { useEffect } from 'react';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut(auth);
        navigate('/'); // Redirect to home after logout
      } catch (err) {
        console.error('Error signing out:', err);
      }
    };

    performLogout();
  }, [navigate]);

  return null; // Optionally, you can show a loading indicator
};

export default Logout;

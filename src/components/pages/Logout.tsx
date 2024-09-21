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
        navigate('/');
      } catch (err) {
        console.error('Error signing out:', err);
      }
    };

    performLogout();
  }, [navigate]);

  return null; 
};

export default Logout;

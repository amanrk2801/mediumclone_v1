// src/auth/AuthModals.tsx
import React, { useState, useEffect } from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import { useNavigate } from 'react-router-dom';

interface AuthModalsProps {
  initialView: 'signin' | 'signup';
}

const AuthModals: React.FC<AuthModalsProps> = ({ initialView }) => {
  const [showSignIn, setShowSignIn] = useState<boolean>(initialView === 'signin');
  const [showSignUp, setShowSignUp] = useState<boolean>(initialView === 'signup');
  const navigate = useNavigate();

  useEffect(() => {
    setShowSignIn(initialView === 'signin');
    setShowSignUp(initialView === 'signup');
  }, [initialView]);

  const openSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
    navigate('/signin');
  };

  const openSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false);
    navigate('/signup');
  };

  const closeModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    navigate('/'); // Navigate back to home or desired route
  };

  return (
    <>
      {showSignIn && <SignInModal onClose={closeModals} onSwitchToSignUp={openSignUp} />}
      {showSignUp && <SignUpModal onClose={closeModals} onSwitchToSignIn={openSignIn} />}
    </>
  );
};

export default AuthModals;

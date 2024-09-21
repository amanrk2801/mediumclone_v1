import React, { useState } from 'react';
import { X } from 'lucide-react';
import { auth, googleProvider, githubProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { github, google } from '@/assets/images/images';

interface SignInModalProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      onClose();
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      onClose();
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-3xl font-serif mb-6">Welcome back.</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <button
            type="button"
            className="flex items-center justify-start w-full border border-gray-300 p-2 rounded hover:bg-gray-100"
            onClick={handleGoogleSignIn}
          >
            <img src={google} alt="Google logo" className="mr-2 h-6 w-6" />
            Sign in with Google
          </button>
          <button
            type="button"
            className="flex items-center justify-start w-full border border-gray-300 p-2 rounded hover:bg-gray-100"
            onClick={handleGithubSignIn}
          >
            <img src={github} alt="GitHub logo" className="mr-2 h-6 w-6" />
            Sign in with GitHub
          </button>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          No account?{' '}
          <button onClick={onSwitchToSignUp} className="text-green-600 hover:underline">
            Create one
          </button>
        </p>
        <p className="mt-4 text-center text-sm">
          <button className="text-gray-600 hover:underline">Forgot email or trouble signing in?</button>
        </p>
        <p className="mt-6 text-center text-xs text-gray-500">
          Click "Sign In" to agree to our Terms of Service and acknowledge that our Privacy Policy applies to you.
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
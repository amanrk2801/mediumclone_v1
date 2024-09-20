// SignInPage.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  auth,
  googleProvider,
  githubProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "../../firebase"; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed in with email and password');
        setError('');
        navigate('/'); // Redirect to home or dashboard after sign-in
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('Signed in with Google');
      setError('');
      navigate('/'); // Redirect after successful sign-in
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      console.log('Signed in with GitHub');
      setError('');
      navigate('/'); // Redirect after successful sign-in
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96 relative">
        <button className="absolute top-2 right-2">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-3xl font-serif mb-6">Welcome back.</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleGoogleSignIn}
            type="button" // Prevents form submission
          >
            <img
              src="/google-logo.svg"
              alt="Google logo"
              className="mr-2 h-6 w-6"
            />
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleGithubSignIn}
            type="button" // Prevents form submission
          >
            <img
              src="/github-logo.svg"
              alt="GitHub logo"
              className="mr-2 h-6 w-6"
            />
            Sign in with GitHub
          </Button>
          {/* You can add more social sign-in buttons here */}
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Sign In
          </Button>
        </form>
        <p className="mt-6 text-center text-sm">
          No account?{' '}
          <a href="/signup" className="text-green-600 hover:underline">
            Create one
          </a>
        </p>
        <p className="mt-4 text-center text-sm">
          <a href="/forgot-password" className="text-gray-600 hover:underline">
            Forgot email or trouble signing in?
          </a>
        </p>
        <p className="mt-6 text-center text-xs text-gray-500">
          Click "Sign In" to agree to our Terms of Service and acknowledge that
          our Privacy Policy applies to you.
        </p>
      </div>
    </div>
  );
}

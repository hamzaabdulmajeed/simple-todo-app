import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import Dashboard from './components/dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowLogin(true);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard user={user} onSignOut={handleSignOut} />;
  }

  return showLogin ? (
    <LoginPage 
      onSwitchToSignup={() => setShowLogin(false)}
      onLoginSuccess={() => {}}
    />
  ) : (
    <SignupPage 
      onSwitchToLogin={() => setShowLogin(true)}
      onSignupSuccess={() => {}}
    />
  );
}
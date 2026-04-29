import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Chrome, AlertCircle, User as UserIcon, Phone } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandlers';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Background Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const syncUserProfile = async (user: User, additionalData?: { username: string; contactNumber: string }) => {
    const userDocRef = doc(db, 'users', user.uid);
    const path = `users/${user.uid}`;
    
    let userDoc;
    try {
      userDoc = await getDoc(userDocRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path, auth);
      return;
    }

    const existingData = userDoc.exists() ? userDoc.data() : null;

    const userData = {
      email: user.email,
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    } as any;

    if (!existingData) {
      // First time registration
      userData.username = additionalData?.username || user.displayName?.replace(/\s+/g, '').toLowerCase() || 'user_' + Math.random().toString(36).slice(2, 7);
      userData.contactNumber = additionalData?.contactNumber || '';
      userData.displayName = user.displayName || '';
      userData.createdAt = serverTimestamp();
      
      try {
        await setDoc(userDocRef, userData);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path, auth);
      }
    } else {
      // Returning user - update missing info or specific fields
      // If we have additionalData from a login form (though usually it's only on signup), we could merge it
      // But mainly we want to ensure basic info is present
      if (!existingData.username && additionalData?.username) userData.username = additionalData.username;
      if (!existingData.contactNumber && additionalData?.contactNumber) userData.contactNumber = additionalData.contactNumber;
      if (!existingData.displayName && user.displayName) userData.displayName = user.displayName;

      try {
        await setDoc(userDocRef, userData, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path, auth);
      }
    }
  };

  const getErrorMessage = (err: any) => {
    console.error("Auth Error:", err.code, err.message);
    
    switch (err.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please login instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      case 'auth/operation-not-allowed':
        return 'Email/Password auth is not enabled. Please enable it in Firebase Console.';
      case 'auth/weak-password':
        return 'Password is too weak. Use at least 6 characters.';
      case 'permission-denied':
        return 'System access denied. Security rules violation.';
      case 'auth/popup-closed-by-user':
        return 'Authentication cancelled.';
      default:
        return err.message || 'An unexpected error occurred.';
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserProfile(result.user);
      onClose();
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6 && mode !== 'forgot') {
      setError('Password should be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await syncUserProfile(result.user, { username, contactNumber });
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent!');
        setMode('login');
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await syncUserProfile(result.user);
      }
      if (mode !== 'forgot') onClose();
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop with Cinematic Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
            className="relative w-full max-w-5xl max-h-[95vh] bg-[#050505] border border-white/10 rounded-[2rem] md:rounded-[3.5rem] shadow-[0_0_150px_-20px_rgba(0,174,239,0.15),0_0_60px_-10px_rgba(207,167,91,0.1)] flex flex-col md:flex-row overflow-hidden isolate"
          >
            {/* Artistic Side Decoration */}
            <div className="hidden md:flex w-[35%] bg-gradient-to-br from-brand-blue/10 via-black to-black p-12 flex-col justify-between relative overflow-hidden text-center border-r border-white/5">
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-brand-blue/10 blur-[100px] rounded-full" />
              <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full" />
              
              <div className="relative z-10 space-y-6">
                <img src="/Logo.png" alt="Velgorex Logo" className="h-16 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(0,174,239,0.4)]" />
                <h3 className="text-xl font-display font-bold text-brand-gold uppercase tracking-[0.3em] leading-tight drop-shadow-[0_0_10px_rgba(207,167,91,0.3)]">VELGOREX <br/> TECHNOLOGIES</h3>
                <p className="text-white/30 text-[9px] uppercase font-mono tracking-widest leading-relaxed mx-auto max-w-[180px]">
                  Identity Verification Protocol <br/> v9.4.0
                </p>
              </div>

              <div className="relative z-10 pt-10">
                <div className="inline-block px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[8px] text-brand-gold font-bold tracking-[0.4em] uppercase hover:bg-white/10 transition-colors cursor-default">
                  System Level Access
                </div>
              </div>
            </div>

            {/* Main Form Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-16 relative scrollbar-hide">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors p-2 z-20 hover:rotate-90 transition-transform duration-300"
              >
                <X size={24} />
              </button>

              <div className="max-w-md mx-auto h-full flex flex-col justify-center">
                <div className="mb-10 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-wider mb-2">
                    {mode === 'signup' ? 'New Account' : mode === 'forgot' ? 'Recovery' : 'Access Terminal'}
                  </h2>
                  <div className="h-[2px] w-10 bg-brand-blue mb-4 hidden md:block" />
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
                    {mode === 'signup' ? 'Join the network' : 'Identify yourself to proceed'}
                  </p>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] p-4 rounded-2xl mb-8 flex items-center gap-3 backdrop-blur-sm shadow-[0_4px_20px_rgba(239,68,68,0.1)]"
                  >
                    <AlertCircle size={14} className="shrink-0" />
                    <span className="font-mono tracking-tight uppercase">{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === 'signup' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em] ml-1">Universal Tag</label>
                        <div className="relative group">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors" size={16} />
                          <input 
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username_01"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3.5 text-white focus:outline-none focus:border-brand-blue/40 focus:bg-white/10 transition-all text-sm font-mono placeholder:text-white/10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em] ml-1">Secure Contact</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors" size={16} />
                          <input 
                            type="tel"
                            required
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3.5 text-white focus:outline-none focus:border-brand-blue/40 focus:bg-white/10 transition-all text-sm font-mono placeholder:text-white/10"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em] ml-1">Network Identity</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors" size={16} />
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="identity@velgorex.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3.5 text-white focus:outline-none focus:border-brand-blue/40 focus:bg-white/10 transition-all text-sm font-mono placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  {mode !== 'forgot' && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em]">Security Cipher</label>
                        {mode === 'login' && (
                          <button 
                            type="button"
                            onClick={() => setMode('forgot')}
                            className="text-[9px] text-brand-blue/50 hover:text-brand-blue font-bold uppercase tracking-widest transition-colors"
                          >
                            Reset?
                          </button>
                        )}
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors" size={16} />
                        <input 
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3.5 text-white focus:outline-none focus:border-brand-blue/40 focus:bg-white/10 transition-all text-sm placeholder:text-white/10"
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-1 btn-gold py-4 shadow-[0_10px_30px_rgba(207,167,91,0.2)] disabled:opacity-50 disabled:scale-95 transition-all"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em]">
                        {loading ? 'Processing...' : mode === 'signup' ? 'Finalize Registration' : mode === 'forgot' ? 'Send Reset' : 'Authorize Entry'}
                      </span>
                    </button>
                    
                    <button 
                      onClick={handleGoogleLogin}
                      type="button"
                      disabled={loading}
                      className="px-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center transition-all group disabled:opacity-50"
                      title="Continue with Google"
                    >
                      <Chrome size={20} className="text-white/40 group-hover:text-brand-blue transition-colors" />
                    </button>
                  </div>

                  <div className="mt-8 text-center">
                    <button 
                      type="button"
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="text-white/30 hover:text-white transition-colors text-[10px] uppercase font-bold tracking-[0.2em] border-b border-transparent hover:border-brand-blue/40 pb-1"
                    >
                      {mode === 'login' ? "New System User? Register" : "Existing Member? Access System"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, Mail, Shield, Save, ArrowLeft, Loader2, CheckCircle2, Camera, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/errorHandlers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState({
    displayName: '',
    contactNumber: '',
    email: '',
    username: '',
    photoURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchProfile(currentUser.uid);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchProfile = async (uid: string) => {
    const docRef = doc(db, 'users', uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileData({
          displayName: data.displayName || '',
          contactNumber: data.contactNumber || '',
          email: data.email || '',
          username: data.username || '',
          photoURL: data.photoURL || ''
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`, auth);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    setUploading(true);

    try {
      // 1. Process image: Resize and convert to base64
      const reader = new FileReader();
      
      const processImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 400;
              const MAX_HEIGHT = 400;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }

              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, width, height);
              
              // Compress to JPEG with 0.7 quality
              const base64 = canvas.toDataURL('image/jpeg', 0.7);
              resolve(base64);
            };
            img.onerror = reject;
            img.src = event.target?.result as string;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      const base64Image = await processImage(file);

      // 2. Update local state
      setProfileData(prev => ({ ...prev, photoURL: base64Image }));

      // 3. Update Auth Profile (Display Name only, photoURL too long for Auth)
      await updateProfile(user, { 
        displayName: profileData.displayName
      });

      // 4. Update Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        photoURL: base64Image,
        updatedAt: serverTimestamp()
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Image processing error:', error);
      alert('Failed to process image. Please try a different one.');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setSuccess(false);

    try {
      // 1. Update Auth Profile (for Navbar/Global state)
      await updateProfile(user, {
        displayName: profileData.displayName
      });

      // 2. Update Firestore
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        displayName: profileData.displayName,
        contactNumber: profileData.contactNumber,
        photoURL: profileData.photoURL,
        updatedAt: serverTimestamp()
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`, auth);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-4">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group text-sm font-mono uppercase tracking-[0.2em]"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Return to Network
              </button>
              <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
                User <span className="text-brand-gold">Profile</span>
              </h1>
              <p className="text-white/40 text-sm font-mono uppercase tracking-[0.3em]">
                Protocol ID: {profileData.username}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl md:rounded-full">
              <Shield className="text-brand-blue" size={20} />
              <div className="text-left">
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none mb-1">Security Status</p>
                <p className="text-xs text-brand-blue font-bold uppercase tracking-widest leading-none">Identity Verified</p>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-premium rounded-[2.5rem] p-8 border-white/5 bg-white/[0.01] group relative">
                <div className="relative w-32 h-32 mx-auto mb-6 group">
                  <div className="w-full h-full rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] transition-transform duration-500 group-hover:scale-105">
                    {uploading ? (
                      <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
                    ) : profileData.photoURL ? (
                      <img src={profileData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-brand-gold" />
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-black border-4 border-[#030303] hover:bg-white transition-colors cursor-pointer group-hover:scale-110 disabled:opacity-50 disabled:cursor-wait"
                  >
                    <Camera size={16} />
                  </button>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                       <span className="text-[10px] font-bold text-white uppercase tracking-widest">Uploading</span>
                    </div>
                  )}
                </div>

                <div className="text-center space-y-2">
                  <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">
                    {profileData.displayName || profileData.username}
                  </h2>
                  <p className="text-white/30 text-xs font-mono lowercase tracking-wider">
                    {profileData.email}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl">
                <p className="text-[10px] text-brand-blue font-bold uppercase tracking-[0.2em] mb-2">Notice</p>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Changes to security parameters may require up to 24 hours to propagate across all edge clusters.
                </p>
              </div>
            </div>

            {/* Edit Form */}
            <div className="lg:col-span-2">
              <div className="glass-premium rounded-[2.5rem] p-8 md:p-12 border-white/5 bg-white/[0.01] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none" />
                
                <form onSubmit={handleUpdate} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <UserIcon size={12} className="text-brand-gold" />
                        Display Name
                      </label>
                      <input 
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                        placeholder="Agent Name"
                        className="w-full bg-[#080808] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold/30 focus:bg-white/5 transition-all text-sm font-sans placeholder:text-white/10"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Phone size={12} className="text-brand-blue" />
                        Secure Contact
                      </label>
                      <input 
                        type="tel"
                        value={profileData.contactNumber}
                        onChange={(e) => setProfileData(prev => ({ ...prev, contactNumber: e.target.value }))}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#080808] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-blue/30 focus:bg-white/5 transition-all text-sm font-sans placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 opacity-50 cursor-not-allowed">
                    <label className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                      <Mail size={12} />
                      Immutable Identity (Email)
                    </label>
                    <input 
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white/30 text-sm font-mono cursor-not-allowed"
                    />
                  </div>

                  <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <button 
                      type="submit"
                      disabled={saving}
                      className="w-full md:w-auto btn-gold px-12 py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-95 transition-all shadow-[0_10px_40px_rgba(207,167,91,0.2)]"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Syncing...</span>
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          <span>Update Profile</span>
                        </>
                      )}
                    </button>

                    {success && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-brand-blue font-mono text-[10px] uppercase tracking-widest"
                      >
                        <CheckCircle2 size={16} />
                        Sync Successful
                      </motion.div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

// Internal icon for User to avoid conflict
const UserIcon = ({ size, className }: { size: number, className?: string }) => (
  <User size={size} className={className} />
);

export default Profile;

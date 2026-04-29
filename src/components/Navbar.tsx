/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, LogIn, User } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    let unsubscribeFirestore: (() => void) | null = null;
    
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        unsubscribeFirestore = onSnapshot(doc(db, 'users', currentUser.uid), (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          }
        });
      } else {
        setUserData(null);
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
          unsubscribeFirestore = null;
        }
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHomePage) {
      e.preventDefault();
      navigate(`/#${id}`);
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleAuthAction = () => {
    if (user) {
      signOut(auth);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/40 backdrop-blur-md border-b ${
          isScrolled ? 'py-3 border-white/10' : 'py-6 border-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <img 
              src="/Logo.png" 
              alt="Velgorex Logo" 
              className="h-8 w-auto transition-all duration-500 group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(0,174,239,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(207,167,91,0.2)]"
            />
            <span className="font-display text-lg font-bold tracking-tighter text-white group-hover:text-glow-blue transition-all">
              VELGOREX
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {['Services', 'About', 'Work', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="text-[10px] font-mono font-medium text-white/40 hover:text-white transition-colors relative group uppercase tracking-[0.4em]"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full border border-white/10 bg-white/5 hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold overflow-hidden">
                    {userData?.photoURL || user.photoURL ? (
                      <img src={userData?.photoURL || user.photoURL} alt={userData?.displayName || user.displayName || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span className="hidden md:block text-[9px] font-bold text-white/50 uppercase tracking-widest px-1 group-hover:text-white transition-colors">
                    {userData?.displayName?.split(' ')[0] || user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'User'}
                  </span>
                </button>

                <AnimatePresence>
                  {profileMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setProfileMenuOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 mt-4 w-48 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 py-2"
                      >
                        <div className="px-6 py-3 border-b border-white/5 mb-2">
                           <p className="text-[8px] text-white/20 uppercase font-mono tracking-widest mb-1">Identity Confirmed</p>
                           <p className="text-[10px] text-white font-bold truncate tracking-tight">{userData?.displayName || user.displayName || user.email}</p>
                        </div>
                        <Link 
                          to="/profile"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-3 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <User size={14} className="text-brand-gold" />
                          Profile
                        </Link>
                        <button 
                          onClick={() => {
                            signOut(auth);
                            setProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all text-left"
                        >
                          <ArrowRight size={14} className="rotate-180 text-brand-blue" />
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={handleAuthAction}
                className="hidden sm:flex items-center gap-2 px-6 py-2 bg-brand-gold text-black text-[10px] font-bold tracking-widest uppercase hover:bg-brand-gold-light hover:shadow-[0_0_15px_rgba(207,167,91,0.4)] transition-all duration-300"
              >
                <LogIn size={14} />
                Sign In
              </button>
            )}
            <button 
              className="lg:hidden text-white/50 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 p-10 flex flex-col gap-8 text-center"
          >
            {['Services', 'About', 'Work', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  handleNavClick(e, item.toLowerCase());
                  setMobileMenuOpen(false);
                }}
                className="text-[10px] font-mono font-medium text-white/40 hover:text-white uppercase tracking-[0.5em]"
              >
                {item}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
               {user && (
                 <Link 
                   to="/profile"
                   onClick={() => setMobileMenuOpen(false)}
                   className="w-full py-4 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                 >
                   <User size={14} className="text-brand-gold" />
                   View Profile
                 </Link>
               )}
               <button 
                onClick={handleAuthAction}
                className="w-full py-4 bg-brand-gold text-black text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold-light transition-all"
               >
                  {user ? 'Sign Out' : 'Sign In'}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </>
  );
};


export default Navbar;

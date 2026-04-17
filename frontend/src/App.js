import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectRoute from './components/ProtectRoute';

// Page imports
import Home from './pages/Home'; 
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';
import CreatePostPage from './pages/CreatePostPage';
import AdminPage from './pages/AdminPage';
import ProfilPage from './pages/ProfilPage';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: '#fff'
      }}>
        <div className="logo" style={{ marginBottom: 24 }}>
          <img src={process.env.PUBLIC_URL + '/images/pic6.jpg'} alt="Logo" style={{ width: 120, borderRadius: '50%', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }} />
        </div>
        <h1 style={{ fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>Hoops & Friends</h1>
        <div className="spinner" style={{
          width: 48, height: 48, border: '6px solid #fff', borderTop: '6px solid #2a5298', borderRadius: '50%',
          animation: 'spin 1s linear infinite', marginBottom: 16
        }} />
        <div className="loading-text" style={{ fontSize: 18, opacity: 0.8 }}>Loading...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/edit-post/:id" element={<ProtectRoute><EditPostPage /></ProtectRoute>} />
        <Route path="/create-post" element={<ProtectRoute><CreatePostPage /></ProtectRoute>} />
        <Route path="/admin" element={<ProtectRoute><AdminPage /></ProtectRoute>} />
        <Route path="/profile" element={<ProtectRoute><ProfilPage /></ProtectRoute>} />
      </Routes>
      <Footer />
    </>
  );
}
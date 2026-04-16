import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <div className="loader-container">
        <div className="logo"><img src="/images/pic6.jpg" alt="Logo" /></div>
        <h1>Hoops & Friends</h1>
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
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
    </Router>
  );
}
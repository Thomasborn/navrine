import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Work } from './pages/Work';
import { Services } from './pages/Services';
import { Agency } from './pages/Agency';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { Admin } from './pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/agency" element={<Agency />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

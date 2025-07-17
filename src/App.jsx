import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Songs from '@/pages/Songs';
import Karaoke from '@/pages/Karaoke';
import Venue from '@/pages/Venue';
import Subscribe from '@/pages/Subscribe';
import Compete from '@/pages/Compete';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AdminPortal from '@/pages/AdminPortal';
import VenuePortal from '@/pages/VenuePortal';
import MicfightHero from '@/pages/MicfightHero';
import AuthCallback from '@/pages/AuthCallback';
import Profile from '@/pages/Profile';
import { useAuth } from '@/contexts/SupabaseAuthContext';

function App() {
  const { user } = useAuth();
  return (
    <>
      <Helmet>
        <title>Micfights - The Ultimate Music Competition Platform</title>
        <meta name="description" content="Experience the ultimate music and karaoke subscription platform with dynamic players, venue management, and artist competitions." />
      </Helmet>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/karaoke" element={<Karaoke />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/compete" element={<Compete />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/venue-portal" element={<VenuePortal />} />
            <Route path="/micfight-hero/:id" element={<MicfightHero />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
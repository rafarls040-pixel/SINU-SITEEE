import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Secretariat from '../components/Secretariat';
import Committees from '../components/Committees';
import { DelegateSection } from '../components/DelegateSection';
import { HomeNewsSection } from '../components/HomeNewsSection';
import Legacy from '../components/Legacy';
import Sponsors from '../components/Sponsors';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Committees />
      <Secretariat />
      <HomeNewsSection />
      <DelegateSection />
      <Legacy />
      <Sponsors />
      <Footer />
    </main>
  );
};

export default Home;

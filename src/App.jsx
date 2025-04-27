import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import HomeQuote from './HomeQuote';
import About from './About'; // 👈 Make sure the path is correct
import Ready from './Ready';
import Footer from './Footer';
import Services from './Services';
import Explore from './Explore';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <HomeHeader />
            
            <HomeQuote />
            <Ready/>
            <Footer/>
          </>
        } />
        
        <Route path="/about" element={<About />} />
        
        <Route path="/services" element={<Services />} />
        <Route path="/explore" element={<Explore/>} />
      </Routes>
    </>
  );
};

export default App;

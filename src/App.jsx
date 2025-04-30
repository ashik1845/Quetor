import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import HomeQuote from './HomeQuote';
import About from './About'; // 👈 Make sure the path is correct
import Ready from './Ready';
import Footer from './Footer';
import Services from './Services';
import Explore from './Explore';
import Support from './Support';
import ScrollToTop from './ScrollToTop';
import ScrollPage from './ScrollSection';
import Scroll from './Scroll';
const App = () => {
  return (
    <>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <HomeHeader />
            
            <Scroll/>
            <HomeQuote />
            <Ready/>
            <Footer/>
          </>
        } />
        
        <Route path="/about" element={<About />} />
        
        <Route path="/services" element={<Services />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/support" element={<Support/>} />
      </Routes>
    </>
  );
};

export default App;

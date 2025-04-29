import React from 'react'
import logo from '../src/assets/Logo.png';
import './Quetorhead.css'
import { useNavigate } from 'react-router-dom';

const Quetorhead = () => {
  const navigate = useNavigate();
  return (
    <div className='header-page-top'>
      <img src={logo} alt="Logo" className="header-logo" />
      
      <div className="header-center-content">
        <p>One Click, Big Change!</p>
        <button
      className='header-home-top-button'
      onClick={() => navigate('/explore')}
    >
      Book A Demo
    </button>
     </div>
    </div>
  )
}

export default Quetorhead;

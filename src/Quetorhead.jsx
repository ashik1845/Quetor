import React from 'react'
import logo from '../src/assets/Logo.png';
import './Quetorhead.css'
const Quetorhead = () => {
  return (
    <div className='page-top'>
              <img src={logo} alt="Logo" className="logo" />
        
              <div className="center-content">
            <p>One Click, Big Change!</p>
            <button className='home-top-button'>Book A Demo</button>
          </div>
                    </div>
  )
}

export default Quetorhead;
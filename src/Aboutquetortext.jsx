import React from 'react'
import './Aboutquetortext.css'
import Aboutimage from './assets/Aboutimg.png';

const Aboutquetortext = () => {
  return (
    <div className="about-text-container">
    <div className="about-text-left-box">
      <img src={Aboutimage} alt="About" className="about-text-image" />
      <p className="about-text-description">
        Whether you're a small school, large college, or wide institute, our software is designed to enhance your examination process, ensuring efficiency and accuracy. Experience the future of educational assessments with Quetor.
      </p>
    </div>
    <div className="about-text-right">
      <p className="about-text-right-description">
        <span className="about-text-highlight">Quetor</span> was founded with a mission to eliminate the tedious, time-consuming process of question paper creation. Our team of educators and technology experts came together to build a solution that transforms hours of work into minutes of simple interaction.
      </p>
    </div>
  </div>
  )
}

export default Aboutquetortext;
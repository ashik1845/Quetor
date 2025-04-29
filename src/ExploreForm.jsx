import React, { useState } from 'react';
import './ExploreForm.css';
import dashedBorderImage from './assets/dashed-border-image.png';
import exploreArrow from './assets/explorearrow.png';
  // Import the image

const ExploreForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setDropdownOpen(false);
  };

  return (
    <div className="exploreform-container">
      <h2 className="exploreform-heading">
        Book Your <span className="exploreform-highlight">Personalized Demo</span> Now
      </h2>
      <form className="exploreform-form">
        <div className="exploreform-left">
          <div className="exploreform-input-group">
            <input type="text" placeholder="Name*" className="exploreform-input" />
            <div className="exploreform-underline"></div>
          </div>
          <div className="exploreform-input-group">
            <input type="text" placeholder="Contact Number*" className="exploreform-input" />
            <div className="exploreform-underline"></div>
          </div>
          <div className="exploreform-input-group">
            <div className="exploreform-dropdown" onClick={handleDropdownToggle}>
              <div className="exploreform-dropdown-selected">
                {selectedOption || 'Institute Type*'}
              </div>
              <div className={`exploreform-dropdown-arrow ${dropdownOpen ? 'open' : ''}`}></div>
            </div>
            <div className="exploreform-underline"></div>
        
            {dropdownOpen && (
              <div className="exploreform-dropdown-list">
                <div onClick={() => handleOptionSelect('Institute')}>Institute</div>
                <div onClick={() => handleOptionSelect('College')}>College</div>
                <div onClick={() => handleOptionSelect('School')}>School</div>
              </div>
            )}
          </div>
        </div>

        <div className="exploreform-right">
          <div className="exploreform-input-group">
            <input type="email" placeholder="Email Address*" className="exploreform-input" />
            <div className="exploreform-underline"></div>
          </div>
          <div className="exploreform-input-group">
            <input type="text" placeholder="Institute Name*" className="exploreform-input" />
            <div className="exploreform-underline"></div>
          </div>
          <div className="exploreform-input-group">
            <input type="text" placeholder="Additional Message" className="exploreform-input" />
            <div className="exploreform-underline"></div>
          </div>
        </div>
      </form>

      <div className="exploreform-button-wrapper">
  <button className="exploreform-button">Book Demo</button>

  <img src={exploreArrow} alt="Arrow" className="exploreform-arrow" />
</div>

<h2 className="exploreform-next-heading">
  What We Do <span className="exploreform-next-highlight">Next</span>
</h2>


      <div className="exploreform-images-container">
        <div className="exploreform-image-item" style={{ backgroundImage: `url(${dashedBorderImage})` }}>
          <div className="exploreform-circle">
            <span className="exploreform-circle-text">Personal Introduction</span>
            <div className="exploreform-tooltip">
  Our team will get to know your institution and specific needs
</div>

          </div>
        </div>
        <div className="exploreform-image-item" style={{ backgroundImage: `url(${dashedBorderImage})` }}>
          <div className="exploreform-circle">
            <span className="exploreform-circle-text">Live System Demo</span>
            <div className="exploreform-tooltip">
            See the Quetor platform in action with real-world
            examples
</div>

          </div>
        </div>
        <div className="exploreform-image-item" style={{ backgroundImage: `url(${dashedBorderImage})` }}>
          <div className="exploreform-circle">
            <span className="exploreform-circle-text">Q&A
            Session</span>
            <div className="exploreform-tooltip">
  Get all your questions answered by our product experts
</div>

          </div>
        </div>
        <div className="exploreform-image-item" style={{ backgroundImage: `url(${dashedBorderImage})` }}>
          <div className="exploreform-circle">
            <span className="exploreform-circle-text">Custom Proposal</span>
            <div className="exploreform-tooltip">
            Receive a tailored solution and pricing plan for your
            institution
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreForm;

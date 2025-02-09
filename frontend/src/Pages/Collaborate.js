import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Collaborate.css";
import image1 from "../Assests/1680602234690-1-scaled.jpg";
import image2 from "../Assests/images.jpeg";
import image3 from "../Assests/istockphoto-870402320-612x612.jpg";
import image4 from "../Assests/24a7506c-87bd-47a4-b554-9cf18de73d1a_maruti_panchayat_20120806.jpg";
import images5 from "../Assests/images11.jpg";
import images6 from "../Assests/images22.jpg";
import images7 from "../Assests/images33.jpg";
import images8 from "../Assests/images44.jpg";

const Collaborate = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();


  return (
    <div className="collaborate-container">
      <h1 className="section-title">Collaborate With Us</h1>
      <p className="section-subtitle">
        Click on a section below to learn more and take action.
      </p>

      {/* Collaboration Buttons */}
      <div className="collaboration-buttons">
        <button onClick={() => setActiveSection("NGO")}>Collaborate with NGOs</button>
        <button onClick={() => setActiveSection("Schools")}>Integrate Curriculum in Schools</button>
        <button onClick={() => setActiveSection("Colleges")}>Youth Parliament in Colleges</button>
        <button onClick={() => setActiveSection("Committees")}>Manage Area Committees</button>
      </div>

      {/* Content Display */}
      <div className="content-container">
        {activeSection === "NGO" && (
          <div className="collaboration-card">
            <h2>Collaborate with NGOs</h2>
            <p>Partner with NGOs to organize political literacy campaigns.</p>
            <button onClick={() => navigate("/ngo")}>Start Collaboration</button>
          </div>
        )}

        {activeSection === "Schools" && (
          <div className="collaboration-card">
            <h2>Integrate Curriculum in Schools</h2>
            <p>Help schools integrate education about rights, the Constitution, and voting.</p>
            <button onClick={() => navigate("/schools")}>Tie Up with Schools</button>
          </div>
        )}

        {activeSection === "Colleges" && (
          <div className="collaboration-card">
            <h2>Youth Parliament in Colleges</h2>
            <p>Host sessions to educate students about political participation and RTI.</p>
            <button onClick={() => navigate("/parliament")}>Host Youth Parliament</button>
          </div>
        )}

        {activeSection === "Committees" && (
          <div className="collaboration-card">
            <h2>Manage your area by this Group</h2>
            <p>Create and manage area-specific committees for political literacy.</p>
         
            <h3>Existing Committees:</h3>
            <ul>
             <button onClick={() => navigate("/group")}>Join Group</button>
            </ul>
          </div>
        )}
      </div>
      
 <h1 className="our">Our Gallery</h1>
 {activeSection && (
        <div className="image-grid">
          <div className="image-row">
            <img src={image1} alt="Collaboration" />
            <img src={image2} alt="Education" />
            <img src={image3} alt="Youth Parliament" />
            <img src={image4} alt="Committees" />
            <img src={images5} alt="Committees" />
            <img src={images6} alt="Committees" />
            <img src={images7} alt="Committees" />
            <img src={images8} alt="Committees" />
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Collaborate;


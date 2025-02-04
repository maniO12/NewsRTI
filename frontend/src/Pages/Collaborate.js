import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Collaborate.css";
import image1 from "../Assests/1680602234690-1-scaled.jpg";
import image2 from "../Assests/images.jpeg";
import image3 from "../Assests/istockphoto-870402320-612x612.jpg";
import image4 from "../Assests/24a7506c-87bd-47a4-b554-9cf18de73d1a_maruti_panchayat_20120806.jpg";
const CollaborateSection = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [areaCommittees, setAreaCommittees] = useState([]);
  const navigate = useNavigate();

  const addCommittee = (areaName) => {
    setAreaCommittees((prev) => [...prev, areaName]);
  };

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
            <h2>Manage Area Committees</h2>
            <p>Create and manage area-specific committees for political literacy.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const areaName = e.target.areaName.value;
                addCommittee(areaName);
                e.target.reset();
              }}
            >
              <input type="text" name="areaName" placeholder="Enter area name" required />
              <button type="submit" className="add-committee-button">Add</button>
            </form>
            <h3>Existing Committees:</h3>
            <ul>
              {areaCommittees.length > 0 ? (
                areaCommittees.map((area, index) => <li key={index}>{area}</li>)
              ) : (
                <li>No committees yet</li>
              )}
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
          </div>
          <div className="image-row">
            <img src="" alt="Community Engagement" />
            <img src="" alt="Educational Workshops" />
            <img src="" alt="Youth Empowerment" />
            <img src="" alt="Local Initiatives" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborateSection;


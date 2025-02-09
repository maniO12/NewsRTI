import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import "./Youth.css";
import images1 from "../Assests/images33.jpg";
import images2 from "../Assests/images44.jpg";

const YouthParliament = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      to_name: "Youth Parliament Team",
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_m1mwxlc",
        "template_imb2qcv",
        templateParams,
        "y9WKQ5PFBxUk6DwFC"
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setEmailSent(true);
        },
        (error) => {
          console.log("Error sending email:", error);
        }
      );
  };

  return (
    <div className="youth-parliament-container">
      <h1 className="youth-title">Youth Parliament & Political Literacy</h1>
      <p className="youth-subtitle">
        Empowering students to be informed and responsible citizens. Join our Youth Parliament sessions!
      </p>

      <section className="why-join">
        <h2>Why Join the Youth Parliament?</h2>
        <div className="youth-images">
          <img src={images1} alt="Youth Parliament Session" />
          <img src={images2} alt="Political Literacy Workshop" />
        </div>
        <p>
          The Youth Parliament is an initiative to engage students in discussions about governance, policy-making, and leadership.
          It fosters critical thinking, debate skills, and awareness about the responsibilities of a democratic citizen.
        </p>
      </section>

      <section className="features">
        <h2>Our Initiatives</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>🏛️ Youth Parliament Sessions</h3>
            <p>Students participate in mock parliamentary sessions, presenting policies and debating key issues.</p>
          </div>
          <div className="feature-card">
            <h3>📚 Political Literacy Workshops</h3>
            <p>Learn about the Constitution, electoral process, and how governance impacts society.</p>
          </div>
          <div className="feature-card">
            <h3>🎤 Leadership & Debate Competitions</h3>
            <p>Enhance leadership skills through debates and discussions on real-world political issues.</p>
          </div>
          <div className="feature-card">
            <h3>📢 Public Speaking & Media Training</h3>
            <p>Train students on how to articulate their thoughts effectively in political discussions and public platforms.</p>
          </div>
          <div className="feature-card">
            <h3>🗳️ Understanding Elections & Voting Rights</h3>
            <p>Workshops on how elections work, the role of political parties, and the importance of voting.</p>
          </div>
        </div>
      </section>

      <section className="benefits">
        <h2>Benefits of Joining</h2>
        <ul>
          <li>Develop strong leadership and communication skills</li>
          <li>Learn about political systems and governance</li>
          <li>Improve public speaking and debate skills</li>
          <li>Network with policymakers and leaders</li>
          <li>Become an active and responsible citizen</li>
        </ul>
      </section>

      <section className="registration-form">
        <h2>Register for Youth Parliament</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="message">Why do you want to join?</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell us why you're interested..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Submit Registration</button>
          </form>

          {emailSent && (
            <div className="email-confirm">
              <p>Your registration has been successfully submitted! 🎉</p>
              <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default YouthParliament;

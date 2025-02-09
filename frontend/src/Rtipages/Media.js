import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Media.css";

const Media = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs
      .send(
        "service_m1mwxlc", // Your EmailJS Service ID
        "template_imb2qcv", // Your EmailJS Template ID
        formData,
        "y9WKQ5PFBxUk6DwFC" // Your EmailJS User ID
      )
      .then(
        (response) => {
          console.log("RTI Request Sent Successfully:", response);
          setEmailSent(true);
        },
        (error) => {
          console.log("Error Sending RTI Request:", error);
        }
      );
  };

  return (
    <div className="media-container">
      {/* Existing Content */}
      <header className="media-header">
        <h1 className="media-header-title">Empowering Journalism & Political Literacy</h1>
        <p className="media-header-subtitle">
          Collaborate with us to highlight real issues, promote education, and expose corruption.
        </p>
      </header>

      <section className="media-section">
        <h2 className="media-title">Why Work With Us?</h2>
        <div className="media-grid">
          <div className="media-card">
            <h3>🎥 Ground-Level Reporting</h3>
            <p>Cover real issues faced by people and give them a voice through responsible journalism.</p>
          </div>
          <div className="media-card">
            <h3>📜 Filing RTIs</h3>
            <p>Use RTI to demand transparency in governance and public projects.</p>
          </div>
          <div className="media-card">
            <h3>📢 Political Awareness</h3>
            <p>Educate the public on their rights, laws, and the importance of active citizenship.</p>
          </div>
          <div className="media-card">
            <h3>🏛️ Exposing Corruption</h3>
            <p>Work together to uncover misuse of public funds and administrative failures.</p>
          </div>
          <div className="media-card">
            <h3>📚 Education for All</h3>
            <p>Promote awareness about the right to education and bridge gaps in literacy.</p>
          </div>
        </div>
      </section>

      <section className="media-section">
  <h2 className="media-title">Our Work in Action</h2>
  <p className="media-description">
    These videos showcase ground-level reporting, RTI report analyses, and media collaborations that contribute to social transformation. 
    Explore real investigative journalism, governance transparency efforts, and impactful social awareness campaigns.
  </p>
  <div className="media-video-container">
    <a href="/videos" className="media-button">Watch Our Videos</a>
  </div>
</section>


      <section className="media-cta">
        <h2 className="media-title">Join Us in Creating Change</h2>
        <p>Collaborate with us to bring truth and awareness to the people.</p>
      </section>

      {/* Collaboration Form */}
      <section className="media-form">
        <h2 className="media-title">Collaborate with Us</h2>
        {emailSent ? (
          <p className="success-message">We will connect with you in 1 hour for further steps to collaborate.</p>
        ) : (
          <form onSubmit={handleSubmit} className="form-container">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="form-textarea"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Media;

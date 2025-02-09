import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import "./Ngo.css";
import image1 from "../Assests/1680602234690-1-scaled.jpg";
import image2 from "../Assests/images.jpeg";

const Ngo = () => {
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
      to_name: "Rise Together",
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
    <div className="collab-container-ngo">
      <h1 className="collab-title-ngo">Start Your Collaboration</h1>
      <p className="collab-subtitle-ngo">
        Join us to make a positive impact. Fill in your details below to get started.
      </p>

      <section className="why-collab-ngo">
        <h2>Why Collaborate With Us?</h2>
        <div className="collab-images-ngo">
          <img src={image1} alt="Why Collaborate" />
          <img src={image2} alt="Collaborative Impact" />
        </div>
        <p>
          We empower NGOs through political literacy, fundraising support, and community engagement.
        </p>
      </section>

      <section className="features-ngo">
        <h2>Our Initiatives for NGOs</h2>
        <div className="feature-list-ngo">
          <div className="feature-card-ngo">
            <h3>📢 Public Meetings for Political Literacy</h3>
            <p>We organize awareness programs to educate communities about democracy and governance.</p>
          </div>
          <div className="feature-card-ngo">
            <h3>💰 Fundraising Support</h3>
            <p>We help NGOs connect with donors and raise funds to support their cause.</p>
          </div>
          <div className="feature-card-ngo">
            <h3>🎓 Workshops & Training</h3>
            <p>Regular training sessions for NGOs on leadership, administration, and governance.</p>
          </div>
          <div className="feature-card-ngo">
            <h3>👥 Volunteer & Community Engagement</h3>
            <p>We provide a platform for volunteers to connect and contribute to your mission.</p>
          </div>
          <div className="feature-card-ngo">
            <h3>📅 Event Calendar for NGOs</h3>
            <p>Plan and organize public meetings, fundraising events, and workshops with ease.</p>
          </div>
        </div>
      </section>

      <section className="benefits-ngo">
        <h2>Benefits of Collaboration</h2>
        <ul>
          <li>Increased visibility and outreach</li>
          <li>Support in raising funds for your cause</li>
          <li>Access to a network of experts and volunteers</li>
          <li>Public awareness campaigns and community events</li>
        </ul>
      </section>

      <section className="form-section-ngo">
        <h2>Submit Your Details</h2>
        <div className="form-container-ngo">
          <form onSubmit={handleSubmit}>
            <div className="input-group-ngo">
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

            <div className="input-group-ngo">
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

            <div className="input-group-ngo">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell us why you want to collaborate..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn-ngo">Submit Details</button>
          </form>

          {emailSent && (
            <div className="email-confirm-ngo">
              <p>Your details have been successfully submitted! 🎉</p>
              <button onClick={() => navigate("/ngo")}>Back to Home</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Ngo;

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission and send email
  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      to_name: "Rise Together",  // Replace with your recipient name
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_m1mwxlc",    // Replace with your EmailJS service ID
        "template_imb2qcv",    // Replace with your EmailJS template ID
        templateParams,
        "y9WKQ5PFBxUk6DwFC"      // Replace with your public key or leave empty if handled by EmailJS
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setEmailSent(true);  // Display confirmation message
        },
        (error) => {
          console.log("Error sending email:", error);
        }
      );
  };

  return (
    <div className="collaboration-page-container">
      <h1 className="page-title">Start Your Collaboration</h1>
      <p className="page-subtitle">
        Join us to make a positive impact. Fill in your details below to get started.
      </p>

      {/* Why Collaborate Section */}
      <section className="why-collaborate-section">
        <h2>Why Collaborate With Us?</h2>
        <div className="images">
          <img src={image1} alt="Why Collaborate" />
          <img src={image2} alt="Collaborative Impact" />
        </div>
        <p>
          We are dedicated to creating a meaningful impact in various sectors such as
          political literacy, education, and youth engagement. By collaborating with us, you
          contribute to a cause that empowers communities and drives positive change.
        </p>
      </section>

      {/* Services Provided Section */}
      <section className="services-section">
        <h2>Services Provided After Collaboration</h2>
        <ul>
          <li>Organizing campaigns and workshops on political literacy</li>
          <li>Providing educational resources and materials</li>
          <li>Connecting you with like-minded organizations and partners</li>
          <li>Support in setting up and managing area committees</li>
        </ul>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Benefits of Collaboration</h2>
        <ul>
          <li>Increased visibility for your organization and its initiatives</li>
          <li>Access to a wide network of experts and volunteers</li>
          <li>Opportunities to make a greater impact through joint efforts</li>
          <li>Support in achieving your organization's goals and objectives</li>
        </ul>
      </section>

      {/* Details Submission Form */}
      <section className="details-submission-section">
        <h2>Submit Your Details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>

          <button type="submit">Submit Details</button>
        </form>

        {emailSent && (
          <div className="email-confirmation">
            <p>Your details have been successfully submitted!</p>
            <button onClick={() => navigate("/ngo")}>Back to Home</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Ngo;

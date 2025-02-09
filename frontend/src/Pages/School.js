import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import "./School.css";

// Sample Schools Data
const schoolsList = [
  { id: 1, name: "Delhi Public School", city: "New York", status: "✅ Partnered" },
  { id: 2, name: "ZPHS", city: "Los Angeles", status: "⏳ Pending" },
  { id: 3, name: "Model School", city: "Chicago", status: "✅ Partnered" },
];

const Schools = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
    .send(
      "service_m1mwxlc",    // Replace with your EmailJS service ID
      "template_imb2qcv",    // Replace with your EmailJS template ID
      formData,
      "y9WKQ5PFBxUk6DwFC"      // Replace with your public key or leave empty if handled by EmailJS
    )
      .then(() => setEmailSent(true))
      .catch((error) => console.error("Error sending email:", error));
  };

  return (
    <div className="schools-container">
      {/* Hero Section */}
      <motion.div className="hero-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1>Partner With Schools</h1>
        <p>Empowering students with knowledge about governance, leadership, and democracy.</p>
      </motion.div>

      {/* Topics We Cover */}
      <section className="topics">
        <h2>What We Teach?</h2>
        <div className="cards-container">
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>📜 Citizen Rights</h3>
            <p>Understanding fundamental rights and duties as a citizen.</p>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>🗳️ Constitution & Voting System</h3>
            <p>Educating students about democracy, elections, and the importance of voting.</p>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>🎯 Leadership Skills</h3>
            <p>Helping students become future leaders with the right knowledge.</p>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <h3>❌ Anti-Corruption Awareness</h3>
            <p>Teaching how corruption impacts society and how to fight against it.</p>
          </motion.div>
        </div>
      </section>

      {/* Collaboration Table */}
      <section className="collaboration-table">
        <h2>Partnered Schools</h2>
        <table>
          <thead>
            <tr>
              <th>School Name</th>
              <th>City</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {schoolsList.map((school) => (
              <tr key={school.id}>
                <td>{school.name}</td>
                <td>{school.city}</td>
                <td>{school.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Contact Form */}
      <section className="contact-form">
        <h2>Become Our Partner</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Your Email" onChange={handleInputChange} required />
          <textarea name="message" placeholder="Your Message" onChange={handleInputChange} required></textarea>
          <button type="submit">Submit</button>
        </form>
        {emailSent && <p className="success-message">Your request has been submitted successfully!</p>}
      </section>
    </div>
  );
};

export default Schools;

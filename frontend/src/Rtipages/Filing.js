import React, { useState } from "react";
import "./Filing.css";

const Filing = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    request: "",
  });

  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);
    // Handle form submission logic here
  };

  return (
    <div className="rti-container">
      {/* Header Section */}
      <header className="rti-header">
        <h1>Raise Your Voice for Change</h1>
        <p>RTI ensures transparency in every government project and service.</p>
      </header>

      {/* Quote Section */}
      <section className="rti-quote">
        <p>"An informed citizen is an empowered citizen. Use RTI for a better future!"</p>
      </section>

      {/* Why RTI Section with Small Cards */}
      <section className="rti-info">
        <h2>Why Should You Use RTI?</h2>
        <div className="rti-cards">
          <div className="rti-card">🔍 <h3>Access Data</h3> <p>Know how public funds are spent.</p></div>
          <div className="rti-card">📜 <h3>Demand Accountability</h3> <p>Ask why projects are delayed.</p></div>
          <div className="rti-card">💡 <h3>Expose Corruption</h3> <p>Get details of government contracts.</p></div>
          <div className="rti-card">🏛️ <h3>Strengthen Democracy</h3> <p>Participate actively in governance.</p></div>
        </div>
      </section>

      {/* Why Collaborate Section */}
      <section className="rti-benefits">
        <h2>Why Collaborate With Our RTI App?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">🚀 <h3>Make RTI Transparent</h3> <p>RTI should be a public-accessible act. Our app ensures that RTI reports are open and available for everyone.</p></div>
          <div className="benefit-card">📢 <h3>Safety from Threats</h3> <p>Many RTI activists face threats. Our platform allows secure and anonymous submissions to protect users.</p></div>
          <div className="benefit-card">🔐 <h3>Secure & Public Reports</h3> <p>With our RTI Report Section, all requests and responses can be made accessible, reducing misuse and ensuring accountability.</p></div>
          <div className="benefit-card">📈 <h3>Educate Society</h3> <p>We help citizens learn about government activities and ensure transparency in governance.</p></div>
        </div>
      </section>

      {/* Problems Faced After Filing RTI */}
      <section className="rti-problems">
        <h2>Facing Issues After Filing an RTI?</h2>
        <p>Many people encounter challenges after filing an RTI, such as:</p>
        <ul className="rti-list">
          <li>☑️ Receiving threat calls or harassment.</li>
          <li>☑️ No response from the concerned department.</li>
          <li>☑️ False information being provided.</li>
          <li>☑️ Government officials delaying the RTI process.</li>
        </ul>
        <p>Our app helps you overcome these issues by providing legal support, connecting you with RTI activists, and ensuring your RTI remains transparent.
        <br></br>  Call us : *************
        </p>
      </section>

      {/* RTI Form Section */}
      <section className="rti-form">
        <h2>Join our WhatsApp Group</h2>
        <div className="form-container12">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <input type="tel" name="whatsapp" placeholder="WhatsApp Number" value={formData.whatsapp} onChange={handleInputChange} required />
            <textarea name="request" placeholder="Why you want to join?" value={formData.request} onChange={handleInputChange} required />
            <button type="submit" className="submit-btn">Add</button>
          </form>
          {emailSent && <div className="email-confirm">Your details will be verified and processed.</div>}
        </div>
      </section>
    </div>
  );
};

export default Filing;

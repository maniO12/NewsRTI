import React from "react";
import "./Know.css";

const Know = () => {
  return (
    <div className="rti-container">
      <header className="rti-header">
        <h1 className="rti-title">RTI Knowledge Hub</h1>
        <p className="rti-subtitle">
          Empowering citizens with knowledge about the Right to Information (RTI)
          Act and how to use it effectively.
        </p>
      </header>

      {/* Section 1: Introduction to RTI */}
      <section className="rti-section">
        <h2 className="rti-section-title">📜 Introduction to RTI</h2>
        <p>
          The Right to Information (RTI) Act, 2005 empowers citizens to request
          information from government bodies, promoting transparency and
          accountability. It is a crucial tool in a democracy, ensuring that
          public funds and policies serve the people effectively.
        </p>
        <p>
          Under this act, public authorities are obligated to disclose
          information requested by citizens unless it falls under specific
          exemptions. The act applies to all levels of government, including
          central, state, and local authorities.
        </p>
      </section>

      {/* Section 2: How to File an RTI */}
      <section className="rti-section">
        <h2 className="rti-section-title">📝 How to File an RTI</h2>
        <p>
          Filing an RTI application is a straightforward process. Follow the
          steps below to successfully file your request.
        </p>
        <ul className="rti-list">
          <li>✔️ Identify the department relevant to your request.</li>
          <li>✔️ Draft a clear RTI application mentioning the required details.</li>
          <li>✔️ Pay the prescribed fee (varies by state and department).</li>
          <li>✔️ Send the application via post or file it online through the RTI portal.</li>
          <li>✔️ Await a response within 30 days or file an appeal if not satisfied.</li>
        </ul>
        <p>
          The application should be addressed to the designated Public Information
          Officer (PIO) of the concerned department. Ensure that you provide your
          contact details so that you can receive a response within the stipulated
          time.
        </p>
      </section>

      {/* Section 3: RTI Act & Legal Framework */}
      <section className="rti-section">
        <h2 className="rti-section-title">⚖️ RTI Act & Legal Framework</h2>
        <p>
          The RTI Act grants every citizen the right to seek information. It
          mandates timely responses from Public Information Officers (PIOs). Some
          exemptions exist to protect sensitive national or personal data.
        </p>
        <p>
          Citizens can appeal if they do not receive a satisfactory response. The
          Central Information Commission (CIC) and State Information Commissions
          (SIC) oversee compliance and handle appeals.
        </p>
      </section>

      {/* Section 4: RTI Use Cases & Categories */}
      <section className="rti-section">
        <h2 className="rti-section-title">🔍 RTI Use Cases & Categories</h2>
        <div className="rti-grid">
          <div className="rti-card">✔️ Government Schemes & Welfare Benefits</div>
          <div className="rti-card">✔️ Infrastructure & Civic Issues</div>
          <div className="rti-card">✔️ Public Funds & Government Expenses</div>
          <div className="rti-card">✔️ Education & University Records</div>
          <div className="rti-card">✔️ Law Enforcement & Corruption Cases</div>
          <div className="rti-card">✔️ Environmental & Social Issues</div>
        </div>
      </section>

      {/* Section 5: RTI Filing Tools & Resources */}
      <section className="rti-section">
        <h2 className="rti-section-title">🛠️ RTI Filing Tools & Resources</h2>
        <ul className="rti-list">
          <li>✔️ RTI Application Generator Tool</li>
          <li>✔️ List of Important RTI Portals (State & Central)</li>
          <li>✔️ RTI Helpline & Legal Support Contacts</li>
          <li>✔️ Directory of Public Information Officers (PIOs)</li>
          <li>✔️ RTI Sample Application Templates</li>
        </ul>
      </section>

      {/* Section 6: Community & Collaboration */}
      <section className="rti-section">
        <h2 className="rti-section-title">🤝 Community & Collaboration</h2>
        <p>
          Join discussions, collaborate on RTI requests, and work with groups to
          amplify your impact. Share your RTI experiences and learn from others.
        </p>
        <p>
          Stay updated with the latest RTI developments through our community.
          Join our <a href="#">WhatsApp group</a> and <a href="#">YouTube channel</a> to
          get regular updates, guidance, and success stories.
        </p>
      </section>
    </div>
  );
};

export default Know;
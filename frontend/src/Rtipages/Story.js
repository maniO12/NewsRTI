import React from "react";
import "./Story.css";
const successStories = [
  {
    title: "Exposing a ₹400 Crore Scam",
    description:
      "An RTI request exposed a major scam in road construction projects. The scam involved over ₹400 crore in fake bills. As a result, several corrupt officials were arrested, and reforms were introduced.",
    impact: "Led to legal action and policy changes in public project audits.",
    area: "Maharashtra",
    date: "March 2023",
  },
  {
    title: "Scholarship Transparency in Education",
    description:
      "Students filed an RTI request to investigate scholarship fund distribution. It revealed that only 40% of funds reached students, while the rest was misallocated.",
    impact: "Forced authorities to ensure direct bank transfers for scholarships.",
    area: "Uttar Pradesh",
    date: "July 2022",
  },
  {
    title: "Healthcare Reform in Rural Areas",
    description:
      "RTI activists discovered that government hospitals in rural areas lacked doctors and essential medicines despite receiving funds.",
    impact: "Immediate intervention led to better medical supplies and staffing.",
    area: "Rajasthan",
    date: "January 2024",
  },
  {
    title: "Illegal Land Encroachment Exposed",
    description:
      "An RTI revealed unauthorized land grabs by powerful individuals. This information forced the local administration to take action and reclaim public land.",
    impact: "Land worth ₹100 crore was recovered and returned to the public.",
    area: "Tamil Nadu",
    date: "May 2021",
  },
  {
    title: "Public Transport Fare Reduction",
    description:
      "RTI inquiries uncovered that public bus fares were being increased unfairly. The government was charging additional hidden costs.",
    impact: "Public pressure led to a 15% reduction in ticket prices.",
    area: "Delhi",
    date: "November 2023",
  },
  {
    title: "Water Crisis in Villages Addressed",
    description:
      "RTI applications revealed that funds allocated for water supply projects were misused. Many villages lacked access to clean drinking water.",
    impact: "The government allocated additional funds and ensured water supply.",
    area: "Bihar",
    date: "August 2022",
  },
];

const RTISuccessStories = () => {
  return (
    <div className="rti-container">
      <header className="rti-header">
        <h1>RTI Success Stories</h1>
        <p>Real-life cases where RTI empowered citizens and led to change</p>
      </header>

      <section className="rti-info">
        <h2>Notable RTI Success Stories</h2>
        <div className="rti-cards">
          {successStories.map((story, index) => (
            <div key={index} className="rti-card">
              <h3>{story.title}</h3>
              <p>{story.description}</p>
              <p className="rti-impact"><strong>Impact:</strong> {story.impact}</p>
              <div className="rti-highlight">
                <br></br>
                <br></br>
                <span className="rti-area"><strong>📍 Area:</strong> {story.area}</span>
                <span className="rti-date"><strong>📅 Date:</strong> {story.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RTISuccessStories;

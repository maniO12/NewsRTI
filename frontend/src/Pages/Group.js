import React, { useState } from "react";
import "./Group.css";

const areas = [
  { name: "Delhi", link: "https://chat.whatsapp.com/example1" },
  { name: "Mumbai", link: "https://chat.whatsapp.com/example2" },
  { name: "Bangalore", link: "https://chat.whatsapp.com/example3" },
  { name: "Chennai", link: "https://chat.whatsapp.com/example4" },
];

// Replace with your secure access code
const ACCESS_CODE = "JOIN2025";

const Group = () => {
  const [search, setSearch] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (enteredCode === ACCESS_CODE) {
      setVerified(true);
      setError("");
    } else {
      setError("Invalid access code. Try again.");
    }
  };

  const filteredAreas = areas.filter((area) =>
    area.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="group-container">
      <h2>Join a WhatsApp Group</h2>

      {!verified ? (
        <div className="verify-container">
          <p>Enter the access code to proceed:</p>
          <input
            type="text"
            placeholder="Enter access code"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            className="group-input"
          />
          {error && <p className="error-text">{error}</p>}
          <button onClick={handleVerify} className="group-button">
            Verify
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search for your area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="group-input"
          />
          <div className="area-list">
            {filteredAreas.length > 0 ? (
              filteredAreas.map((area, index) => (
                <div key={index} className="area-item">
                  <span className="area-name">{area.name}</span>
                  <button onClick={() => window.open(area.link, "_blank")} className="join-button">
                    Join
                  </button>
                </div>
              ))
            ) : (
              <p className="no-results">No areas found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Group;

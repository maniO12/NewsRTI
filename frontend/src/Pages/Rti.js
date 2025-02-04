import React from "react";
import { useNavigate } from "react-router-dom";
import "./Rti.css";

const Bar = () => {
  const navigate = useNavigate();

  return (
    <div className="bar">
      <button className="bar-item" onClick={() => navigate("/filing")}>Filing Assistance</button>
      <button className="bar-item" onClick={() => navigate("/info")}>Information Repository</button>
      <button className="bar-item" onClick={() => navigate("/know")}>Knowledge Hub</button>
      <button className="bar-item" onClick={() => navigate("/media")}>Journalism</button>
      <button className="bar-item" onClick={() => navigate("/story")}>Success Stories</button>
    </div>
  );
};

export default Bar;
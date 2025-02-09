import React, { useState, useEffect } from 'react';
import './Report.css';
import axios from 'axios';

const Report = () => {
  const [rtiForm, setRtiForm] = useState({
    date: "",
    sector: "",
    description: "",
    location: "",
  });

  const [publicServiceForm, setPublicServiceForm] = useState({
    date: "",
    sector: "",
    description: "",
    location: "",
    media: null, // Store the uploaded media file
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formTypeSubmitted, setFormTypeSubmitted] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [approvedRtiReports, setApprovedRtiReports] = useState([]);
  const [approvedPublicReports, setApprovedPublicReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [folder, setFolder] = useState(null);

  // Handle form input changes
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "RTI") {
      setRtiForm({ ...rtiForm, [name]: value });
    } else if (formType === "PublicService") {
      if (name === "media") {
        setPublicServiceForm({ ...publicServiceForm, media: e.target.files[0] });
      } else {
        setPublicServiceForm({ ...publicServiceForm, [name]: value });
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e, formType) => {
    e.preventDefault();

    try {
      if (formType === "RTI") {
        const response = await fetch('http://localhost:5000/api/reports/submit-rti', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rtiForm),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          setIsFormSubmitted(true);
          setFormTypeSubmitted("RTI");
          setRtiForm({ date: "", sector: "", description: "", location: "" });
        } else {
          setErrorMessage(data.message || "Error submitting RTI report");
        }
      } else if (formType === "PublicService") {
        const formData = new FormData();
        formData.append('date', publicServiceForm.date);
        formData.append('sector', publicServiceForm.sector);
        formData.append('description', publicServiceForm.description);
        formData.append('location', publicServiceForm.location);
        if (publicServiceForm.media) {
          formData.append('media', publicServiceForm.media);
        }

        const response = await fetch('http://localhost:5000/api/reports/submit-public-service', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          setIsFormSubmitted(true);
          setFormTypeSubmitted("PublicService");
          setPublicServiceForm({ date: "", sector: "", description: "", location: "", media: null });
        } else {
          setErrorMessage(data.message || "Error submitting Public Service report");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred while submitting the form. Please try again.");
    }
  };

  const fetchApprovedReports = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      // Fetch approved RTI reports
      const rtiResponse = await axios.get("http://localhost:5000/api/reports/rti-reports/approved-reports");
      if (rtiResponse.data.data.length === 0) {
        setApprovedRtiReports([]);
        setErrorMessage("No approved RTI reports found.");
      } else {
        setApprovedRtiReports(rtiResponse.data.data);
      }

      // Fetch approved Public Service reports
      const publicResponse = await axios.get("http://localhost:5000/api/reports/public-service-reports/approved-reports");
      if (publicResponse.data.data.length === 0) {
        setApprovedPublicReports([]);
        setErrorMessage("No approved Public Service reports found.");
      } else {
        setApprovedPublicReports(publicResponse.data.data);
      }

    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  }

  const handleFolderUpload = (event) => {
    setFolder(event.target.files[0]);
  };

  const handleUploadFolder = async () => {
    if (!folder) {
      setErrorMessage("Please select a folder to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("folder", folder);

    try {
      const response = await axios.post("/api/reports/upload-folder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Folder uploaded successfully!");
    } catch (error) {
      setErrorMessage("Error uploading folder.");
    }
  };

  return (
    <div className="report-section-container00">
  <h2 className="report-section-heading00">Why Report Section?</h2>
  <p className="report-section-description00">
    This section is dedicated to empowering every citizen by making the Right to Information (RTI) Act accessible to all who aspire to bring change in society. 
    It aims to transform the RTI Act into a tool for transparency, enabling the public to understand the progress and development of the nation.
  </p>

  <div className="flex-container00">
    <div className="forms-container00">
      <div className="form-container00 rti-form-container00 animate00">
        <h3 className="form-heading00">RTI Report Form</h3>
        <div className="form-wrapper00">
          <form className="form00 rti-form00" onSubmit={(e) => handleSubmit(e, "RTI")}>
            <label className="form-label00">
              Current Date:
              <input type="date" name="date" value={rtiForm.date} onChange={(e) => handleInputChange(e, "RTI")} className="form-input00" required />
            </label>
            <label className="form-label00">
              Sector:
              <select name="sector" value={rtiForm.sector} onChange={(e) => handleInputChange(e, "RTI")} className="form-select00" required>
                <option value="">Select Sector</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </label>
            <label className="form-label00">
              Description of the Issue:
              <textarea name="description" value={rtiForm.description} onChange={(e) => handleInputChange(e, "RTI")} className="form-textarea00" rows="4" required />
            </label>
            <label className="form-label00">
              Location:
              <input type="text" name="location" value={rtiForm.location} onChange={(e) => handleInputChange(e, "RTI")} className="form-input00" required />
            </label>
            <button type="submit" className="form-submit-button00">Submit RTI Report</button>
          </form>
        </div>
      </div>

      <div className="form-container00 public-service-form-container00 animate00">
        <h3 className="form-heading00">Public Service Problem Report Form</h3>
        <div className="form-wrapper00">
          <form className="form00 public-service-form00" onSubmit={(e) => handleSubmit(e, "PublicService")}>
            <label className="form-label00">
              Date:
              <input type="date" name="date" value={publicServiceForm.date} onChange={(e) => handleInputChange(e, "PublicService")} className="form-input00" required />
            </label>
            <label className="form-label00">
              Sector:
              <select name="sector" value={publicServiceForm.sector} onChange={(e) => handleInputChange(e, "PublicService")} className="form-select00" required>
                <option value="">Select Sector</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Power">Power</option>
                <option value="Public Transport">Public Transport</option>
              </select>
            </label>
            <label className="form-label00">
              Description of the Issue:
              <textarea name="description" value={publicServiceForm.description} onChange={(e) => handleInputChange(e, "PublicService")} className="form-textarea00" rows="4" required />
            </label>
            <label className="form-label00">
              Location:
              <input type="text" name="location" value={publicServiceForm.location} onChange={(e) => handleInputChange(e, "PublicService")} className="form-input00" required />
            </label>
            <label className="form-label00">
              Upload Media (Image/Video):
              <input type="file" name="media" onChange={(e) => handleInputChange(e, "PublicService")} className="form-input00" accept="image/*,video/*" />
            </label>
            <button type="submit" className="form-submit-button00">Submit Public Service Problem</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  {isFormSubmitted && formTypeSubmitted === "RTI" && (
    <div className="report-submission-status00">
      <p>Your RTI report has been successfully submitted.Your report will available in our Whatsapp community within 40 days.</p>
    </div>
  )}
  {isFormSubmitted && formTypeSubmitted === "PublicService" && (
    <div className="report-submission-status00">
      <p>Your public service problem has been successfully reported.Your issue will taken care within 6hrs of reporting.</p>
    </div>
  )}

  <div className="dashboard-container00">
    <h2> Dashboard</h2>
    <div className="approved-reports-section00">
      <h3>Approved RTI Reports for Review</h3>
      <ul>
        {approvedRtiReports.length > 0 ? (
          approvedRtiReports.map((report) => (
            <li key={report._id}>
              <h4>{report.title}</h4>
              <p>{report.description}</p>
              <p>Status: {report.status}</p>
            </li>
          ))
        ) : (
          <p>No approved RTI reports yet.</p>
        )}
      </ul>
    </div>
    <div className="approved-reports-section00">
      <h3>Approved Public Service Reports for Review</h3>
      <ul>
        {approvedPublicReports.length > 0 ? (
          approvedPublicReports.map((report) => (
            <li key={report._id}>
              <h4>{report.title}</h4>
              <p>{report.description}</p>
              <p>Status: {report.status}</p>
            </li>
          ))
        ) : (
          <p>No approved Public Service reports yet.</p>
        )}
      </ul>
    </div>
 

  </div>
</div>

  );
};

export default Report;
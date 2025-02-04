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
    <div className="report-section-container">
      <h2 className="report-section-heading">Why Report Section?</h2>
      <p className="report-section-description">
        This section is dedicated to empowering every citizen by making the Right to Information (RTI) Act accessible to all who aspire to bring change in society. 
        It aims to transform the RTI Act into a tool for transparency, enabling the public to understand the progress and development of the nation.
      </p>

      {/* Flex Container for Forms and Images */}
      <div className="flex-container">
        {/* Forms Container */}
        <div className="forms-container">
          {/* RTI Form */}
          <div className="form-container rti-form-container animate">
            <h3 className="form-heading">RTI Report Form</h3>
            <div className="form-wrapper">
              <form
                className="form rti-form"
                onSubmit={(e) => handleSubmit(e, "RTI")}
              >
                <label className="form-label">
                  Current Date:
                  <input
                    type="date"
                    name="date"
                    value={rtiForm.date}
                    onChange={(e) => handleInputChange(e, "RTI")}
                    className="form-input"
                    required
                  />
                </label>
                <label className="form-label">
                  Sector:
                  <select
                    name="sector"
                    value={rtiForm.sector}
                    onChange={(e) => handleInputChange(e, "RTI")}
                    className="form-select"
                    required
                  >
                    <option value="">Select Sector</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </label>
                <label className="form-label">
                  Description of the Issue:
                  <textarea
                    name="description"
                    value={rtiForm.description}
                    onChange={(e) => handleInputChange(e, "RTI")}
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </label>
                <label className="form-label">
                  Location:
                  <input
                    type="text"
                    name="location"
                    value={rtiForm.location}
                    onChange={(e) => handleInputChange(e, "RTI")}
                    className="form-input"
                    required
                  />
                </label>
                <button type="submit" className="form-submit-button122">
                  Submit RTI Report
                </button>
              </form>
            </div>
          </div>

          {/* Public Service Form */}
          <div className="form-container public-service-form-container animate">
            <h3 className="form-heading">Public Service Problem Report Form</h3>
            <div className="form-wrapper">
              <form
                className="form public-service-form"
                onSubmit={(e) => handleSubmit(e, "PublicService")}
              >
                <label className="form-label">
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={publicServiceForm.date}
                    onChange={(e) => handleInputChange(e, "PublicService")}
                    className="form-input"
                    required
                  />
                </label>
                <label className="form-label">
                  Sector:
                  <select
                    name="sector"
                    value={publicServiceForm.sector}
                    onChange={(e) => handleInputChange(e, "PublicService")}
                    className="form-select"
                    required
                  >
                    <option value="">Select Sector</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Power">Power</option>
                    <option value="Public Transport">Public Transport</option>
                  </select>
                </label>
                <label className="form-label">
                  Description of the Issue:
                  <textarea
                    name="description"
                    value={publicServiceForm.description}
                    onChange={(e) => handleInputChange(e, "PublicService")}
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </label>
                <label className="form-label">
                  Location:
                  <input
                    type="text"
                    name="location"
                    value={publicServiceForm.location}
                    onChange={(e) => handleInputChange(e, "PublicService")}
                    className="form-input"
                    required
                  />
                </label>

                {/* File Upload for Media */}
                <label className="form-label">
                  Upload Media (Image/Video):
                  <input
                    type="file"
                    name="media"
                    onChange={(e) => handleInputChange(e, "PublicService")}
                    className="form-input"
                    accept="image/*,video/*"
                  />
                </label>

                <button type="submit" className="form-submit-button">
                  Submit Public Service Problem
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* After Form Submission */}
      {isFormSubmitted && formTypeSubmitted === "RTI" && (
        <div className="report-submission-status">
          <p>
            Your RTI report has been successfully submitted. Please note that the RTI will be available in our dashboard for review 30 days after raising the issue only if the issue is fair 
            and helps for development.
          </p>
        </div>
      )}

      {isFormSubmitted && formTypeSubmitted === "PublicService" && (
        <div className="report-submission-status">
          <p>
            Your public service problem has been successfully reported. The issue will be taken care of within one day and brought to the attention of the local authority. 
            If the issue is large, it will be covered in a video and released on our app.
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="dashboard-container">
        <h2> Dashboard</h2>

        {/* Approved Reports Section */}
        <div className="approved-reports-section">
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

        <div className="approved-reports-section">
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

        {/* Upload Folder Section */}
        <div className="upload-folder-section">
          <h3>Upload Report Folder</h3>
          <input type="file" onChange={handleFolderUpload} />
          <button onClick={handleUploadFolder}>Upload Folder</button>
        </div>

        {/* Error Message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Report;
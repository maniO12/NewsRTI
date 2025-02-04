import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Newsdisplay.css';

const Newsdisplay = () => {
  // News states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [errors, setErrors] = useState({});

  // Reports states
  const [rtiReports, setRtiReports] = useState([]); // RTI Reports
  const [publicServiceReports, setPublicServiceReports] = useState([]); // Public Service Reports

  // Fetch RTI Reports
  const fetchRtiReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/rti-reports');
      setRtiReports(response.data);
    } catch (err) {
      console.error('Error fetching RTI reports:', err);
    }
  };

  // Fetch Public Service Reports
  const fetchPublicServiceReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/public-service-reports');
      setPublicServiceReports(response.data);
    } catch (err) {
      console.error('Error fetching Public Service reports:', err);
    }
  };

  // Approve Report
  // Approve Report
const handleApproveReport = async (reportId, reportType) => {
  try {
    await axios.patch(`http://localhost:5000/api/reports/${reportType}/${reportId}/approve`);
    alert('Report approved successfully!');

    // Update state to remove the approved report
    if (reportType === 'rti-reports') {
      setRtiReports((prevReports) => prevReports.filter((report) => report._id !== reportId));
    } else if (reportType === 'public-service-reports') {
      setPublicServiceReports((prevReports) => prevReports.filter((report) => report._id !== reportId));
    }
  } catch (err) {
    console.error('Error approving report:', err);
    alert('Failed to approve report. Please try again.');
  }
};


  // Fetch all reports when component mounts
  useEffect(() => {
    fetchRtiReports();
    fetchPublicServiceReports();
  }, []);

  // Validate title: Non-empty, max 200 characters
  const validateTitle = () => {
    if (!title) return 'Title is required.';
    if (title.length > 200) return 'Title cannot exceed 200 characters.';
    return '';
  };

  // Validate content: Non-empty
  const validateContent = () => {
    if (!content) return 'Content is required.';
    return '';
  };

  // Validate media: Non-empty
  const validateFiles = () => {
    if (!media) return 'Media (Image or Video) is required.';
    return '';
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleError = validateTitle();
    const contentError = validateContent();
    const filesError = validateFiles();

    if (titleError || contentError || filesError) {
      setErrors({ title: titleError, content: contentError, files: filesError });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('media', media);

    try {
      await axios.post('http://localhost:5000/api/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('News posted successfully!');
      setTitle('');
      setContent('');
      setMedia(null);
      setErrors({});
    } catch (err) {
      console.error('Error uploading news:', err);
      alert('Failed to post news. Please try again.');
    }
  };

  return (
    <div className="news-display-container">
      {/* News Upload Section */}
      <div className="upload-container">
        <h2>Upload News</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>

          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            {errors.content && <div className="error">{errors.content}</div>}
          </div>

          <div>
            <label>Media (Image or Video):</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg, image/png, video/mp4, video/mkv"
              required
            />
            {errors.files && <div className="error">{errors.files}</div>}
          </div>

          <button type="submit">Post News</button>
        </form>
      </div>

      {/* RTI Reports Section */}
      <div className="reports-container">
        <h2>RTI Reports</h2>
        {rtiReports.length > 0 ? (
          <ul>
            {rtiReports.map((report) => (
              <li key={report._id} className="report-item">
                <strong>Date:</strong> {new Date(report.date).toLocaleDateString()} <br />
                <strong>Sector:</strong> {report.sector} <br />
                <strong>Description:</strong> {report.description} <br />
                <strong>Location:</strong> {report.location} <br />
                <strong>Status:</strong> {report.status} <br />
                <button
                  onClick={() => handleApproveReport(report._id, 'rti-reports')}
                  disabled={report.status === 'approved'}
                >
                  {report.status === 'approved' ? 'Approved' : 'Approve'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No RTI reports submitted yet.</p>
        )}
      </div>

      {/* Public Service Reports Section */}
      <div className="reports-container">
        <h2>Public Service Reports</h2>
        {publicServiceReports.length > 0 ? (
          <ul>
            {publicServiceReports.map((report) => (
              <li key={report._id} className="report-item">
                <strong>Date:</strong> {new Date(report.date).toLocaleDateString()} <br />
                <strong>Sector:</strong> {report.sector} <br />
                <strong>Description:</strong> {report.description} <br />
                <strong>Location:</strong> {report.location} <br />
                <strong>Media:</strong>{' '}
                {report.media ? (
                  <a href={`http://localhost:5000/${report.media}`} target="_blank" rel="noopener noreferrer">
                    View Media
                  </a>
                ) : (
                  'No media'
                )}
                <br />
                <button
                  onClick={() => handleApproveReport(report._id, 'public-service-reports')}
                  disabled={report.status === 'approved'}
                >
                  {report.status === 'approved' ? 'Approved' : 'Approve'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Public Service reports submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Newsdisplay;

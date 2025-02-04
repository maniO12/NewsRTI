import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Image from '../../Assests/ian-schneider-TamMbr4okv4-unsplash.jpg';

const AdminLogin = ({ setIsLoggedIn, isAuthenticated, setIsAuthenticated }) => {  
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the admin user is already logged in using a stored token
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setIsAuthenticated(true); // Enable admin-specific links
      navigate('/home'); // Redirect to admin home if logged in
    }
  }, [navigate, setIsLoggedIn, setIsAuthenticated]);

  const handleSubmitt = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    setLoading(true);
    setError('');

    const loginUrl = 'http://localhost:5000/api/admin/login';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (response.ok && json.authtoken) {
        // Save token and update state
        localStorage.setItem('token', json.authtoken);
        setIsLoggedIn(true);
        setIsAuthenticated(true); // Enable admin-specific links
        alert('Admin logged in successfully!');
        navigate('/home'); // Redirect to admin home page
      } else {
        setError(json.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsLoggedIn(false);
    setIsAuthenticated(false); // Disable admin-specific links
    navigate('/adminlogin'); // Redirect to admin login page
  };

  return (
    <div className="login-page">
      {/* Left side: Login container */}
      <div className="container2">
        <div className="login-container">
          <h2 className="text-center">Admin Login</h2>

          {!isAuthenticated ? (
            <form onSubmit={handleSubmitt}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label4">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={onChange}
                  placeholder="Enter email"
                  value={credentials.email}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={onChange}
                  placeholder="Enter Password"
                  value={credentials.password}
                  required
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-grid4">
                <button type="submit" className="newbtn btn btn-primary" disabled={loading}>
                  {loading ? 'Logging In...' : 'Login'}
                </button>
              </div>
            </form>
          ) : (
            // Display the Logout button if the user is authenticated
            <div className="text-center mt-3">
              <h3>Welcome, Admin!</h3>
              <button className="newbtn btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Image */}
      <div className="image-container">
        <img
          src={Image}
          alt="Login Illustration"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
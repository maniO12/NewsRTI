import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import lImage from '../../Assests/logowhite02.jpg';
const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError(''); // Clear any previous error

    try {
      const response = await fetch('http://localhost:5000/api/auth/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();

      if (response.ok && json.status) {
        localStorage.setItem('token', json.authtoken);
        navigate('/');
      } else {
        setError(json.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('user with this email may exist');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-page">
    {/* Left side: Signup container */}
    <div className="container2">
      <div className="login-container2">
        <h2 className="text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label4">User Name / Mb.no</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              placeholder="Enter your Name/mb no"
              value={credentials.name}
            />
          </div>
  
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
              placeholder="Password"
              value={credentials.password}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label4">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="cpassword"
              id="cpassword"
              onChange={onChange}
              placeholder="Confirm Password"
              value={credentials.cpassword}
            />
          </div>
  
          <div className="text-center mt-3">
            <p>
              Already have an account?{' '}
              <span
                className="text-primary cursor-pointer"
                onClick={() => navigate('/')}
              >
                Login
              </span>
            </p>
          </div>
  
          {error && <div className="alert alert-danger">{error}</div>}
  
          <div className="d-grid4">
            <button type="submit" className="newbtn btn btn-primary" disabled={loading}>
              {loading ? 'Signing Up...' : 'Signup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  
    {/* Right side: Image */}
    <div className="image-container1">
      <img
        src={lImage} // Replace with the actual path to your image
        alt="Signup Illustration"
      />
    </div>
  </div>
  
  );
};
export default Signup;
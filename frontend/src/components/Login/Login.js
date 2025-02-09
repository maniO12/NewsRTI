import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Image from '../../Assests/logowhite02.jpg';
const Login = ({ setIsLoggedIn }) => {  
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();   

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (response.ok && json.status) {
        localStorage.setItem('token', json.authtoken);
        setIsLoggedIn(true);  // Update the parent component state to true
        navigate('/home'); // Redirect to the home page or dashboard
      } else {
        setError(json.message || 'Invalid credentials');
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

  return (
    <div className="login-page">
  {/* Left side: Login container */}
  <div className="container2">
    <div className="login-container">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit}>
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
      <div className="text-center mt-3">
        <p>
          Don't have an account?{' '}
          <span
            className="text-primary cursor-pointer"
            onClick={() => navigate('/signin')}
          >
            Signup
          </span>
        </p>
      </div>
      <div className="text-center mt-3">
        <p>
          Admin Login?{' '}
          <span
            className="text-primary cursor-pointer"
            onClick={() => navigate('/adminlogin')}
          >
            Signup
          </span>
        </p>
      </div>
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

export default Login; 
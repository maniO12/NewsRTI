import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Logout logic
      localStorage.removeItem("token"); // Clear token on logout
      setIsLoggedIn(false); // Update parent state
      navigate("/"); // Redirect to login page after logout
    } else {
      // Redirect to login page if not logged in
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <div className="tophead">RiseTogether</div>
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navbar Links - Only show when logged in */}
      {isLoggedIn && (
        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/news" className="nav-link" onClick={() => setMenuOpen(false)}>
              News
            </Link>
          </li>
          <li>
            <Link to="/videos" className="nav-link" onClick={() => setMenuOpen(false)}>
              Videos
            </Link>
          </li>
          <li>
            <Link to="/rti" className="nav-link" onClick={() => setMenuOpen(false)}>
              RTI
            </Link>
          </li>
          <li>
            <Link to="/report" className="nav-link" onClick={() => setMenuOpen(false)}>
              Report
            </Link>
          </li>
          <li>
            <Link to="/collaborate" className="nav-link" onClick={() => setMenuOpen(false)}>
              Collaborate
            </Link>
          </li>

          {/* Admin-only links */}
          {isAuthenticated && (
            <>
              <li>
                <Link to="/upload" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Upload Video
                </Link>
              </li>
              <li>
                <Link to="/uploadnews" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Upload News
                </Link>
              </li>
            </>
          )}
        </ul>
      )}

      {/* Profile Button */}
      <button className="profile-button" onClick={handleAuthClick}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

export default Navbar;




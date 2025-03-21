import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to PopX</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        
        <Link to="/register">
          <button className="primary-button">Create Account</button>
        </Link>
        
        <Link to="/login">
          <button className="secondary-button">Already Registered? Login</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
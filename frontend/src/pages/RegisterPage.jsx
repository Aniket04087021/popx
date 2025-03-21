import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await register(formData);
        navigate('/profile');
      } catch (error) {
        setErrors({ 
          form: error.response?.data?.message || 'Registration failed. Please try again.' 
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Create your PopX account</h1>
        
        {errors.form && <div className="error-message">{errors.form}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'input-error' : ''}
            />
            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email address*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Company name"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group radio-group">
            <label>Are you an Agency?*</label>
            <div className="radio-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  checked={formData.isAgency === true}
                  onChange={() => setFormData({...formData, isAgency: true})}
                />
                <span className="radio-custom"></span>
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  checked={formData.isAgency === false}
                  onChange={() => setFormData({...formData, isAgency: false})}
                />
                <span className="radio-custom"></span>
                No
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="primary-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
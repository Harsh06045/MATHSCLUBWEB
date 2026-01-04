import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './LoginScreen.css'; // Import the CSS file

import logo from '../assets/logo.png'; // Import the logo

const LoginScreen = ({ onForgotPassword, onNavigate, onLogin, registeredUser }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="login-container">
      {/* Elevated Card */}
      <div className="login-card">

        {/* Header / Branding */}
        <div className="login-header">
          <div className="logo-container">
            <img src={logo} alt="SIST Logo" className="logo-image" />
          </div>
          <h1 className="app-title">MathClub</h1>
          <p className="app-subtitle">Welcome back! Please sign in to continue.</p>
        </div>

        {/* Tab Switcher */}
        <div className="tab-group">
          <button
            onClick={() => onNavigate('login')}
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
          >
            Sign In
          </button>
          <button
            onClick={() => onNavigate('register')}
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
          >
            Register
          </button>
        </div>

        {/* Form Container */}
        <div className="login-form-container">
          <form className="form-stack" onSubmit={(e) => {
            e.preventDefault();

            // If we have a registered user, use their data. 
            // Otherwise, construct a fallback based on the entered email.
            const dataToPass = registeredUser || {
              fullName: email.split('@')[0], // Use part before @ as name
              email: email,
              role: role,
              department: "Member",
              year: "N/A",
              regNo: "N/A",
              phone: "N/A"
            };

            onLogin(role, dataToPass);
          }}>

            {/* Role Selector */}
            <div className="form-group">
              <label className="form-label form-label-row">
                Select Role
              </label>
              <div className="input-wrapper">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="student">Student</option>
                  <option value="club_member">Club Member</option>
                  <option value="admin">Admin</option>
                  <option value="faculty">Faculty Coordinator</option>
                </select>
                <div className="select-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label className="form-label form-label-row">
                Email or Username
              </label>
              <input
                type="text"
                placeholder="euler@example.com"
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">
                  Password
                </label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="forgot-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <a href="#" className="footer-link">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="footer-link">Help Center</a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

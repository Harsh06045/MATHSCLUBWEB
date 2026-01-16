import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './LoginScreen.css';
import logo from '../assets/logo.png';

const LoginScreen = ({
  onForgotPassword,
  onNavigate,
  onLogin,
  approvals = [],
  members = []
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    //  ADMIN LOGIN (always allowed)
    if (role === 'admin') {
      onLogin('admin', { role: 'admin', email, password: e.target.password.value });
      return;
    }

    //  Check if user exists in approved members
    const approvedUser = members.find(
      (u) => u.email === email && u.role === role
    );

    if (approvedUser) {
      onLogin(role, approvedUser);
      return;
    }

    // ⏳ Check if user is pending approval
    const pendingUser = approvals.find(
      (u) => u.email === email && u.role === role
    );

    if (pendingUser) {
      setError(' Your account is pending admin approval.');
      return;
    }

    //  Not registered
    setError(' No account found. Please register first.');
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* HEADER */}
        <div className="login-header">
          <div className="logo-container">
            <img src={logo} alt="SIST Logo" className="logo-image" />
          </div>
          <h1 className="app-title">MathClub</h1>
          <p className="app-subtitle">Sign in with approved credentials</p>
        </div>

        {/* TABS */}
        <div className="tab-group">
          <button
            onClick={() => onNavigate('login')}
            className="tab-btn active"
          >
            Sign In
          </button>
          <button
            onClick={() => onNavigate('register')}
            className="tab-btn"
          >
            Register
          </button>
        </div>

        {/* FORM */}
        <div className="login-form-container">
          <form className="form-stack" onSubmit={handleSubmit}>

            {/* ROLE */}
            <div className="form-group">
              <label className="form-label form-label-row">Select Role</label>
              <div className="input-wrapper">
                <select
                  className="form-select"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>Select Role</option>
                  <option value="student">Student</option>
                  <option value="club_member">Club Member</option>
                  <option value="faculty">Faculty Coordinator</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="select-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label className="form-label form-label-row">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="euler@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD (UI ONLY) */}
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Password</label>
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
                  className="form-input"
                  placeholder="••••••••"
                  required
                  name="password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '14px' }}>
                {error}
              </p>
            )}

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>
        </div>

        {/* FOOTER */}
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

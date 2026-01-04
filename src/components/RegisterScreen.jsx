import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import './LoginScreen.css'; // Reusing the auth styling
import logo from '../assets/logo.png';

const RegisterScreen = ({ onNavigate, onRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // New State for Profile Data
    const [fullName, setFullName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');

    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pass data to parent App component
        onRegister({
            fullName,
            email,
            role,
            department,
            year,
            regNo,
            phone: "+91 98765 43210" // Mock phone since field is missing in UI
        });

        setShowSuccess(true);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        // Optionally navigate to login or home after closing
        // onNavigate('login'); 
    };

    return (
        <div className="login-container">
            {/* Success Notification Overlay */}
            {showSuccess && (
                <div className="notification-overlay">
                    <div className="notification-card">
                        <div className="notification-icon-wrapper">
                            <CheckCircle size={48} className="notification-icon" />
                        </div>
                        <h3 className="notification-title">Success!</h3>
                        <p className="notification-message">
                            Your application has been sent for administrative approval.
                        </p>
                        <button onClick={handleCloseSuccess} className="notification-btn">
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Elevated Card */}
            <div className="login-card">

                {/* Header / Branding */}
                <div className="login-header">
                    <div className="logo-container">
                        <img src={logo} alt="SIST Logo" className="logo-image" />
                    </div>
                    <h1 className="app-title">MathClub</h1>
                    <p className="app-subtitle">Join us and be part of the equation!</p>
                </div>

                {/* Tab Switcher */}
                <div className="tab-group">
                    <button
                        onClick={() => onNavigate('login')}
                        className="tab-btn"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => onNavigate('register')}
                        className="tab-btn active"
                    >
                        Register
                    </button>
                </div>

                {/* Form Container */}
                <div className="login-form-container">
                    <form className="form-stack" onSubmit={handleSubmit}>

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
                                    <option value="faculty">Faculty Coordinator</option>
                                </select>
                                <div className="select-icon">
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="form-group">
                            <label className="form-label form-label-row">Full Name</label>
                            <input
                                type="text"
                                placeholder="Isaac Newton"
                                className="form-input"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        {/* Register Number */}
                        <div className="form-group">
                            <label className="form-label form-label-row">Register Number</label>
                            <input
                                type="number"
                                placeholder="12345678"
                                className="form-input"
                                required
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                            />
                        </div>

                        {/* Two Column Row for Year & Dept */}
                        <div className="flex gap-4">
                            <div className="form-group flex-1">
                                <label className="form-label form-label-row">Academic Year</label>
                                <div className="input-wrapper">
                                    <select
                                        className="form-select"
                                        required
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    >
                                        <option value="" disabled>Select Year</option>
                                        <option>1st Year</option>
                                        <option>2nd Year</option>
                                        <option>3rd Year</option>
                                        <option>4th Year</option>
                                    </select>
                                    <div className="select-icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group flex-1">
                                <label className="form-label form-label-row">Department</label>
                                <input
                                    type="text"
                                    placeholder="CSE"
                                    className="form-input"
                                    required
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label form-label-row">Email Address</label>
                            <input
                                type="email"
                                placeholder="euler@example.com"
                                className="form-input"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label className="form-label form-label-row">Create Password</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="form-input"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label className="form-label form-label-row">Confirm Password</label>
                            <div className="input-wrapper">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="form-input"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (password !== e.target.value) {
                                            e.target.setCustomValidity("Passwords do not match");
                                        } else {
                                            e.target.setCustomValidity("");
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="password-toggle"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        {/* Helper Note */}
                        <p className="text-xs text-[#64748b] text-center italic">
                            * Applications require admin approval
                        </p>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Apply for Membership
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

export default RegisterScreen;

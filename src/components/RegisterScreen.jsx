import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import './LoginScreen.css';
import logo from '../assets/logo.png';

const RegisterScreen = ({ onNavigate, onRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [fullName, setFullName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [showSuccess, setShowSuccess] = useState(false);

    const resetForm = () => {
        setRole('');
        setPassword('');
        setConfirmPassword('');
        setFullName('');
        setRegNo('');
        setYear('');
        setDepartment('');
        setEmail('');
        setPhone('');
    };

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        //  Send data to App.jsx
        const result = await onRegister({
            name: fullName,
            registrationNumber: regNo,
            year,
            department,
            email,
            password,
            role,
            phone
        });

        if (result && result.success) {
            setShowSuccess(true);
            resetForm();
        } else {
            setError(result?.message || 'Registration failed. Please try again.');
        }
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        onNavigate('login'); //  go to login after register
    };

    return (
        <div className="login-container">

            {/*  SUCCESS OVERLAY */}
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
                        <button
                            onClick={handleCloseSuccess}
                            className="notification-btn"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            )}

            {/* CARD */}
            <div className="login-card">

                {/* HEADER */}
                <div className="login-header">
                    <div className="logo-container">
                        <img src={logo} alt="SIST Logo" className="logo-image" />
                    </div>
                    <h1 className="app-title">MathClub</h1>
                    <p className="app-subtitle">Join us and be part of the equation!</p>
                </div>

                {/* TABS */}
                <div className="tab-group">
                    <button
                        onClick={() => onNavigate('login')}
                        className="tab-btn"
                    >
                        Sign In
                    </button>
                    <button
                        className="tab-btn active"
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

                        {/* FULL NAME */}
                        <div className="form-group">
                            <label className="form-label form-label-row">Full Name</label>
                            <input
                                className="form-input"
                                placeholder="Isaac Newton"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        {/* REGISTER NO */}
                        <div className="form-group">
                            <label className="form-label form-label-row">Register Number</label>
                            <input
                                className="form-input"
                                placeholder="12345678"
                                required
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                            />
                        </div>

                        {/* YEAR + DEPT */}
                        <div className="flex gap-4">
                            <div className="form-group flex-1">
                                <label className="form-label form-label-row">Academic Year</label>
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
                            </div>

                            <div className="form-group flex-1">
                                <label className="form-label form-label-row">Department</label>
                                <input
                                    className="form-input"
                                    placeholder="CSE"
                                    required
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="flex gap-4">
                            <div className="form-group flex-1">
                                <label className="form-label form-label-row">Email Address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="euler@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group flex-1">
                                <label className="form-label form-label-row">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    placeholder="+91 1234567890"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="form-group">
                            <label className="form-label form-label-row">Create Password</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        {/* CONFIRM PASSWORD */}
                        <div className="form-group">
                            <label className="form-label form-label-row">Confirm Password</label>
                            <div className="input-wrapper">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="••••••••"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        e.target.setCustomValidity(
                                            password !== e.target.value
                                                ? 'Passwords do not match'
                                                : ''
                                        );
                                    }}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <p className="text-xs text-[#64748b] text-center italic">
                            * Applications require admin approval
                        </p>

                        <button type="submit" className="submit-btn">
                            Apply for Membership
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

export default RegisterScreen;

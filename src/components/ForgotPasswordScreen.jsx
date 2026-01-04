import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './LoginScreen.css'; // Reusing the auth styling
import logo from '../assets/logo.png';

const ForgotPasswordScreen = ({ onBack }) => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="login-container">
            <div className="login-card">

                {/* Header */}
                <div className="login-header">
                    <div className="logo-container">
                        <img src={logo} alt="SIST Logo" className="logo-image" />
                    </div>
                    <h1 className="app-title">Reset Password</h1>
                    <p className="app-subtitle">
                        Please enter your new password below.
                    </p>
                </div>

                {/* Form Container */}
                <div className="login-form-container">
                    <form className="form-stack" onSubmit={(e) => e.preventDefault()}>

                        {/* New Password Input */}
                        <div className="form-group">
                            <label className="form-label form-label-row">
                                New Password
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="form-input"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="password-toggle"
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="form-group">
                            <label className="form-label form-label-row">
                                Confirm Password
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="form-input"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (newPassword !== e.target.value) {
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Reset Password
                        </button>

                        {/* Back to Login */}
                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={onBack}
                                className="forgot-link"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                            >
                                Back to Login
                            </button>
                        </div>

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

export default ForgotPasswordScreen;

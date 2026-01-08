import React, { useState } from 'react';
import { UserCheck, ChevronDown, ChevronUp, Users, LogOut, Check, X } from 'lucide-react';
import './AdminPanel.css';
import logo from '../assets/logo.png'; // Reuse existing logo

const AdminPanel = ({ onNavigate }) => {
    const [activeView, setActiveView] = useState('approvals'); // 'approvals' or 'members'
    const [members, setMembers] = useState([]); // Store approved users

    // Mock Data for Approvals
    const [approvals, setApprovals] = useState([
        {
            id: 1,
            fullName: "Alan Turing",
            email: "alan@example.com",
            role: "student",
            regNo: "12345678",
            year: "3rd Year",
            department: "CSE",
            phone: "+91 98765 43210"
        },
        {
            id: 2,
            fullName: "Ada Lovelace",
            email: "ada@example.com",
            role: "club_member",
            regNo: "87654321",
            year: "2nd Year",
            department: "Mathematics",
            phone: "+91 91234 56789"
        },
        {
            id: 3,
            fullName: "Srinivasa Ramanujan",
            email: "ramanujan@example.com",
            role: "faculty",
            regNo: "FAC001",
            year: "N/A",
            department: "Pure Mathematics",
            phone: "+91 99887 76655"
        }
    ]);

    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleApprove = (id) => {
        const userToApprove = approvals.find(user => user.id === id);
        if (userToApprove) {
            setMembers([...members, userToApprove]);
            setApprovals(approvals.filter(user => user.id !== id));
            alert(`Approved ${userToApprove.fullName}`);
        }
    };

    const handleReject = (id) => {
        // Mock Reject Logic
        if (window.confirm("Are you sure you want to reject this request?")) {
            setApprovals(approvals.filter(user => user.id !== id));
        }
    };

    return (
        <div className="admin-container">
            {/* Left Sidebar (25%ish - fixed width 250px in CSS) */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <img src={logo} alt="Logo" style={{ width: 32, height: 32 }} />
                    <h2 className="sidebar-title">Admin Panel</h2>
                </div>

                <ul className="sidebar-menu">
                    <li
                        className={`menu-item ${activeView === 'approvals' ? 'active' : ''}`}
                        onClick={() => setActiveView('approvals')}
                    >
                        <Users size={20} />
                        <span>Approvals</span>
                    </li>
                    <li
                        className={`menu-item ${activeView === 'members' ? 'active' : ''}`}
                        onClick={() => setActiveView('members')}
                    >
                        <UserCheck size={20} />
                        <span>Members</span>
                    </li>
                    {/* Logout at bottom or separated */}
                    <li
                        className="menu-item"
                        style={{ marginTop: 'auto', color: '#ef4444' }}
                        onClick={() => onNavigate('login')}
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </li>
                </ul>
            </aside>

            {/* Right Content Area */}
            <main className="admin-content">
                <div className="content-header">
                    <h1 className="page-title">
                        {activeView === 'approvals' ? 'Pending Approvals' : 'Club Members'}
                    </h1>
                    <p className="text-muted" style={{ color: 'var(--text-muted)' }}>
                        {activeView === 'approvals'
                            ? 'Manage new member registration requests.'
                            : 'View and manage active club members.'}
                    </p>
                </div>

                <div className="approvals-list">
                    {activeView === 'approvals' ? (
                        approvals.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                <Users size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                <p>No pending approvals found.</p>
                            </div>
                        ) : (
                            approvals.map((user) => (
                                <div key={user.id} className="approval-card">
                                    <div className="approval-header" onClick={() => toggleExpand(user.id)}>
                                        <div className="user-name">{user.fullName}</div>
                                        <div className="user-email">{user.email}</div>
                                        <div>
                                            <span className="user-role-badge">{user.role.replace('_', ' ')}</span>
                                        </div>
                                        <button
                                            className="action-icon-btn approve"
                                            title="Approve"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleApprove(user.id);
                                            }}
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            className="action-icon-btn reject"
                                            title="Reject"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleReject(user.id);
                                            }}
                                        >
                                            <X size={18} />
                                        </button>
                                        <button className="expand-btn">
                                            {expandedId === user.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </div>

                                    {expandedId === user.id && (
                                        <div className="approval-details">
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <label>Register Number</label>
                                                    <span>{user.regNo}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <label>Department</label>
                                                    <span>{user.department}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <label>Academic Year</label>
                                                    <span>{user.year}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <label>Phone Number</label>
                                                    <span>{user.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )
                    ) : (
                        // MEMBERS LIST VIEW
                        members.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                <UserCheck size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                <p>No active members yet.</p>
                            </div>
                        ) : (
                            members.map((user) => (
                                <div key={user.id} className="approval-card">
                                    <div
                                        className="approval-header"
                                        onClick={() => toggleExpand(user.id)}
                                        style={{ gridTemplateColumns: '2fr 2fr 1.5fr auto' }} // Custom grid for members (no actions)
                                    >
                                        <div className="user-name">{user.fullName}</div>
                                        <div className="user-email">{user.email}</div>
                                        <div>
                                            <span className="user-role-badge">{user.role.replace('_', ' ')}</span>
                                        </div>
                                        <button className="expand-btn">
                                            {expandedId === user.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </div>

                                    {expandedId === user.id && (
                                        <div className="approval-details">
                                            <div className="details-grid">
                                                <div className="detail-item">
                                                    <label>Register Number</label>
                                                    <span>{user.regNo}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <label>Department</label>
                                                    <span>{user.department}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <label>Academic Year</label>
                                                    <span>{user.year}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <label>Phone Number</label>
                                                    <span>{user.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;

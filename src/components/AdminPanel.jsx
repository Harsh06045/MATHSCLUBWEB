import React, { useState } from 'react';
import {
  UserCheck,
  ChevronDown,
  ChevronUp,
  Users,
  LogOut,
  Check,
  X
} from 'lucide-react';
import './AdminPanel.css';
import logo from '../assets/logo.png';

const AdminPanel = ({
  onNavigate,
  approvals,
  members,
  onApprove,
  onReject
}) => {
  const [activeView, setActiveView] = useState('approvals');
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleApprove = (id) => {
    onApprove(id);
    setExpandedId(null);
  };

  const handleReject = (id) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      onReject(id);
      setExpandedId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('session');
    onNavigate('login');
  };


  return (
    <div className="admin-container">
      {/* Sidebar */}
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

          <li
            className="menu-item"
            style={{ marginTop: 'auto', color: '#ef4444' }}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </li>

        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <div className="content-header">
          <h1 className="page-title">
            {activeView === 'approvals'
              ? 'Pending Approvals'
              : 'Club Members'}
          </h1>
          <p className="text-muted">
            {activeView === 'approvals'
              ? 'Manage new member registration requests.'
              : 'View and manage active club members.'}
          </p>
        </div>

        <div className="approvals-list">
          {/* APPROVALS VIEW */}
          {activeView === 'approvals' ? (
            approvals.length === 0 ? (
              <div className="empty-state">
                <Users size={48} />
                <p>No pending approvals found.</p>
              </div>
            ) : (
              approvals.map((user) => (
                <div key={user._id} className="approval-card">
                  <div
                    className="approval-header"
                    onClick={() => toggleExpand(user._id)}
                  >
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                    <span className="user-role-badge">
                      {user.role.replace('_', ' ')}
                    </span>

                    <button
                      className="action-icon-btn approve"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(user._id);
                      }}
                    >
                      <Check size={18} />
                    </button>

                    <button
                      className="action-icon-btn reject"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(user._id);
                      }}
                    >
                      <X size={18} />
                    </button>

                    <button className="expand-btn">
                      {expandedId === user._id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  {expandedId === user._id && (
                    <div className="approval-details">
                      <div className="details-grid">
                        <div className="detail-item">
                          <label>Register Number</label>
                          <span>{user.registrationNumber}</span>
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
                          <label>Phone</label>
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )
          ) : (
            /* MEMBERS VIEW */
            members.length === 0 ? (
              <div className="empty-state">
                <UserCheck size={48} />
                <p>No active members yet.</p>
              </div>
            ) : (
              members.map((user) => (
                <div key={user._id} className="approval-card">
                  <div
                    className="approval-header"
                    onClick={() => toggleExpand(user._id)}
                    style={{ gridTemplateColumns: '2fr 2fr 1.5fr auto' }}
                  >
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                    <span className="user-role-badge">
                      {user.role.replace('_', ' ')}
                    </span>

                    <button className="expand-btn">
                      {expandedId === user._id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  {expandedId === user._id && (
                    <div className="approval-details">
                      <div className="details-grid">
                        <div className="detail-item">
                          <label>Register Number</label>
                          <span>{user.registrationNumber}</span>
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
                          <label>Phone</label>
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

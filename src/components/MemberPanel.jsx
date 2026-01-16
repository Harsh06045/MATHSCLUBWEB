import React, { useState } from 'react';
import {
    Calendar,
    Megaphone,
    Users,
    LogOut,
    Plus,
    Image,
    Video,
    X,
    ChevronLeft,
    ChevronRight,
    Search,
    MapPin,
    Clock,
    Play,
    Edit2,
    Check,
    UserCheck
} from 'lucide-react';
import './MemberPanel.css'; // New Enhanced Styles
import logo from '../assets/logo.png';

const MemberPanel = ({
    onNavigate,
    events, // { ongoing: [], past: [] }
    announcements,
    approvals, // Read-only
    onAddEvent,
    onAddAnnouncement,
    onAddMedia,
    onUpdateEvent // New Prop
}) => {
    const [activeView, setActiveView] = useState('events');
    const [showEventModal, setShowEventModal] = useState(false);
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
    const [showMediaModal, setShowMediaModal] = useState(false);

    // Detail View State
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const [isEditingAttendance, setIsEditingAttendance] = useState(false);
    const [attendanceInput, setAttendanceInput] = useState('');

    // Form States
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        tags: '',
        category: 'Ongoing'
    });

    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        category: 'General',
        content: ''
    });

    const [mediaUpload, setMediaUpload] = useState({
        eventId: '',
        type: 'image',
        url: ''
    });

    const handleLogout = () => {
        localStorage.removeItem('session');
        onNavigate('login');
    };

    const handleEventClick = (ev) => {
        setSelectedEvent(ev);
        setAttendanceInput(ev.attendance || 0);
        setIsEditingAttendance(false);
    };

    const saveAttendance = () => {
        if (!selectedEvent) return;
        const updated = { ...selectedEvent, attendance: Number(attendanceInput) };
        onUpdateEvent(updated); // Update global state
        setSelectedEvent(updated); // Update local modal state
        setIsEditingAttendance(false);
    };

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        const eventData = {
            ...newEvent,
            id: Date.now(),
            tags: newEvent.tags.split(',').map(t => t.trim()),
            images: newEvent.category === 'Past' ? [] : undefined
        };
        onAddEvent(eventData);
        setShowEventModal(false);
        setNewEvent({ title: '', date: '', location: '', description: '', tags: '', category: 'Ongoing' });
    };

    const handleSubmitAnnouncement = (e) => {
        e.preventDefault();
        const announcementData = {
            ...newAnnouncement,
            id: Date.now(),
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        };
        onAddAnnouncement(announcementData);
        setShowAnnouncementModal(false);
        setNewAnnouncement({ title: '', category: 'General', content: '' });
    };

    const handleSubmitMedia = (e) => {
        e.preventDefault();
        if (!mediaUpload.eventId) return;

        const mediaItem = mediaUpload.type === 'video'
            ? { type: 'video', src: mediaUpload.url, thumbnail: 'https://placehold.co/600x400/png?text=Video+Thumbnail' }
            : mediaUpload.url;

        onAddMedia(mediaUpload.eventId, mediaItem);
        setShowMediaModal(false);
        setMediaUpload({ eventId: '', type: 'image', url: '' });
    };

    // Lightbox Handlers
    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(-1);
    const nextMedia = (e) => {
        e.stopPropagation();
        if (selectedEvent && selectedEvent.images) {
            setLightboxIndex((prev) => (prev + 1) % selectedEvent.images.length);
        }
    };
    const prevMedia = (e) => {
        e.stopPropagation();
        if (selectedEvent && selectedEvent.images) {
            setLightboxIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
        }
    };

    return (
        <div className="member-container">
            {/* Enhanced Sidebar */}
            <aside className="member-sidebar">
                <div className="sidebar-brand">
                    <img src={logo} alt="Logo" style={{ width: 40, height: 40 }} />
                    <div>
                        <h2>MathClub</h2>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>Member Panel</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <li className={`nav-item ${activeView === 'events' ? 'active' : ''}`} onClick={() => setActiveView('events')}>
                        <Calendar size={20} /> <span>Events</span>
                    </li>
                    <li className={`nav-item ${activeView === 'announcements' ? 'active' : ''}`} onClick={() => setActiveView('announcements')}>
                        <Megaphone size={20} /> <span>Announcements</span>
                    </li>
                    <li className={`nav-item ${activeView === 'requests' ? 'active' : ''}`} onClick={() => setActiveView('requests')}>
                        <Users size={20} /> <span>Requests</span>
                    </li>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <li className="nav-item" onClick={handleLogout} style={{ color: '#ef4444' }}>
                        <LogOut size={20} /> <span>Sign Out</span>
                    </li>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="member-content">
                <header className="content-header">
                    <div>
                        <h1 className="page-title">
                            {activeView === 'events' ? 'Event Management' :
                                activeView === 'announcements' ? 'Announcements' : 'Join Requests'}
                        </h1>
                        <p style={{ color: '#64748b', margin: '0.5rem 0 0 0' }}>
                            {activeView === 'events' ? 'Organize upcoming activities and memories.' :
                                activeView === 'announcements' ? 'Keep the community updated.' : 'View pending registrations.'}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {activeView === 'events' && (
                            <>
                                <button className="btn-secondary" onClick={() => setShowMediaModal(true)}>
                                    <Image size={18} /> Add Media
                                </button>
                                <button className="btn-primary" onClick={() => setShowEventModal(true)}>
                                    <Plus size={18} /> New Event
                                </button>
                            </>
                        )}
                        {activeView === 'announcements' && (
                            <button className="btn-primary" onClick={() => setShowAnnouncementModal(true)}>
                                <Plus size={18} /> New Post
                            </button>
                        )}
                    </div>
                </header>

                {/* Dynamic Content Grid */}
                <div className="content-area">

                    {/* EVENTS VIEW */}
                    {activeView === 'events' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                            <section>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></span> Ongoing & Upcoming
                                </h3>
                                <div className="content-grid">
                                    {events.ongoing.length === 0 ? <p className="text-muted" style={{ fontStyle: 'italic', paddingLeft: '1rem' }}>No active events currently.</p> : events.ongoing.map(ev => (
                                        <div key={ev._id} className="member-card">
                                            <div>
                                                <div className="card-header">
                                                    <span className="card-title">{ev.title}</span>
                                                    <span className="card-date">{ev.date}</span>
                                                </div>
                                                <div className="card-body">
                                                    <p>{ev.description}</p>
                                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                                        {ev.tags && ev.tags.map(t => <span key={t} className="badge general">{t}</span>)}
                                                    </div>
                                                </div>
                                            </div>
                                            {ev.location && (
                                                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <MapPin size={14} /> {ev.location}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }}></span> Past Events
                                </h3>
                                {events.past.length === 0 ? <p className="text-muted" style={{ fontStyle: 'italic', paddingLeft: '1rem' }}>No past events.</p> : (
                                    <div className="content-grid">
                                        {events.past.map(ev => (
                                            <div key={ev._id} className="member-card" onClick={() => handleEventClick(ev)} style={{ cursor: 'pointer' }}>
                                                <div className="card-header">
                                                    <span className="card-title">{ev.title}</span>
                                                    <span className="card-date" style={{ background: '#f1f5f9', color: '#64748b' }}>{ev.date}</span>
                                                </div>
                                                <div className="card-body" style={{ marginBottom: '1rem' }}>
                                                    <p className="truncate-text">{ev.description}</p>
                                                </div>
                                                {/* Media Strip */}
                                                <div className="media-preview-strip">
                                                    {ev.images && ev.images.length > 0 ? (
                                                        ev.images.slice(0, 5).map((img, i) => (
                                                            <div key={i} title={typeof img === 'string' ? "Image" : "Video"}>
                                                                {typeof img === 'string' ?
                                                                    <img src={img} className="media-thumb" alt="" /> :
                                                                    <div className="media-thumb" style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Play size={12} fill="white" color="white" />
                                                                    </div>
                                                                }
                                                            </div>
                                                        ))
                                                    ) : <span style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#cbd5e1' }}>No media added</span>}
                                                    {ev.images && ev.images.length > 5 && (
                                                        <div className="media-thumb" style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>
                                                            +{ev.images.length - 5}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>
                    )}
                    {/* ... logic for announcements/requests remains the same ... */}
                    {activeView === 'announcements' && (
                        <div className="content-grid">
                            {announcements.map(ann => (
                                <div key={ann._id} className="member-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span className={`badge ${ann.category.toLowerCase()}`}>{ann.category}</span>
                                        <small style={{ color: '#94a3b8' }}>{ann.date}</small>
                                    </div>
                                    <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{ann.title}</h3>
                                    <p className="card-body">{ann.content}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeView === 'requests' && (
                        <div className="request-list">
                            {approvals.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                                    <Search size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <p>No pending requests.</p>
                                </div>
                            ) : (
                                approvals.map(user => (
                                    <div key={user._id} className="request-card">
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span style={{ fontWeight: 700, color: '#64748b' }}>{user.name.charAt(0)}</span>
                                            </div>
                                            <div className="user-info">
                                                <h4>{user.name}</h4>
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span className="badge general" style={{ textTransform: 'capitalize' }}>{user.role.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                </div>
            </main>

            {/* --- EVENT DETAIL MODAL --- */}
            {selectedEvent && (
                <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
                    <div className="modal-content detail-modal-width" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Event Details</h3>
                            <button className="close-btn" onClick={() => setSelectedEvent(null)}><X size={20} /></button>
                        </div>

                        {/* Random cover image derived from event images or placeholder */}
                        <img
                            src={selectedEvent.images && selectedEvent.images.length > 0 && typeof selectedEvent.images[0] === 'string' ? selectedEvent.images[0] : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1740&q=80"}
                            alt="Cover"
                            className="detail-cover-image"
                        />

                        <h2 className="detail-title">{selectedEvent.title}</h2>

                        <div className="detail-meta-row">
                            <div className="detail-meta-item">
                                <Calendar size={18} color="#2563eb" /> <span>{selectedEvent.date}</span>
                            </div>
                            {selectedEvent.location && (
                                <div className="detail-meta-item">
                                    <MapPin size={18} color="#2563eb" /> <span>{selectedEvent.location}</span>
                                </div>
                            )}

                            {/* ATTENDANCE SECTION */}
                            <div className="detail-meta-item" style={{ marginLeft: 'auto', background: '#f0fdf4', padding: '4px 12px', borderRadius: '20px', color: '#166534' }}>
                                <UserCheck size={18} />
                                <span style={{ fontWeight: 600 }}>
                                    {isEditingAttendance ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <input
                                                type="number"
                                                value={attendanceInput}
                                                onChange={(e) => setAttendanceInput(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ width: '60px', padding: '4px', borderRadius: '4px', border: '1px solid #16a34a' }}
                                            />
                                            <button onClick={saveAttendance} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#16a34a' }}><Check size={18} /></button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>{selectedEvent.attendance || 0} Attended</span>
                                            <button onClick={() => setIsEditingAttendance(true)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#16a34a', opacity: 0.6 }}><Edit2 size={14} /></button>
                                        </div>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="detail-description">
                            {selectedEvent.description}
                        </div>

                        {selectedEvent.images && selectedEvent.images.length > 0 && (
                            <>
                                <span className="section-label">Media Gallery</span>
                                <div className="detail-gallery-grid">
                                    {selectedEvent.images.map((media, index) => (
                                        <div key={index} className="gallery-item" onClick={() => openLightbox(index)}>
                                            {typeof media === 'string' ? (
                                                <img src={media} alt={`Gallery ${index}`} />
                                            ) : (
                                                <>
                                                    <img src={media.thumbnail || 'https://placehold.co/400x400/000/fff?text=Video'} alt="Video Thumb" style={{ opacity: 0.8 }} />
                                                    <div className="video-indicator">
                                                        <Play size={24} fill="white" />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* --- LIGHTBOX (For Detail View) --- */}
            {lightboxIndex >= 0 && selectedEvent && selectedEvent.images && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content-wrapper" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close-btn" onClick={closeLightbox}><X size={24} /></button>

                        <button className="lightbox-nav-btn lightbox-prev" onClick={prevMedia}><ChevronLeft size={24} /></button>

                        {typeof selectedEvent.images[lightboxIndex] === 'string' ? (
                            <img src={selectedEvent.images[lightboxIndex]} alt="Full view" className="lightbox-media" />
                        ) : (
                            <video controls autoPlay className="lightbox-media">
                                <source src={selectedEvent.images[lightboxIndex].src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}

                        <button className="lightbox-nav-btn lightbox-next" onClick={nextMedia}><ChevronRight size={24} /></button>
                    </div>
                </div>
            )}


            {/* --- CREATION MODALS (Existing) --- */}
            {/* ... keeping these as is ... */}

            {showEventModal && (
                <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Create Event</h3>
                            <button className="close-btn" onClick={() => setShowEventModal(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmitEvent}>
                            {/* Form Fields ... identical logic */}
                            <div className="form-group">
                                <label>Type</label>
                                <select className="form-input" value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })}>
                                    <option value="Ongoing">Upcoming</option>
                                    <option value="Past">Past</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input required className="form-input" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event Name" />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input required className="form-input" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} placeholder="Ex: March 15, 2026" />
                            </div>
                            {newEvent.category === 'Ongoing' && (
                                <div className="form-group">
                                    <label>Location</label>
                                    <input className="form-input" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} placeholder="Ex: Main Auditorium" />
                                </div>
                            )}
                            <div className="form-group">
                                <label>Description</label>
                                <textarea required className="form-input" rows="3" value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Tags</label>
                                <input className="form-input" value={newEvent.tags} onChange={e => setNewEvent({ ...newEvent, tags: e.target.value })} placeholder="Coding, Workshop..." />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Create Event</button>
                        </form>
                    </div>
                </div>
            )}

            {showAnnouncementModal && (
                <div className="modal-overlay" onClick={() => setShowAnnouncementModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>New Announcement</h3>
                            <button className="close-btn" onClick={() => setShowAnnouncementModal(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmitAnnouncement}>
                            <div className="form-group">
                                <label>Title</label>
                                <input required className="form-input" value={newAnnouncement.title} onChange={e => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-input" value={newAnnouncement.category} onChange={e => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}>
                                    <option value="General">General</option>
                                    <option value="Exam">Exam</option>
                                    <option value="Club">Club</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <textarea required className="form-input" rows="4" value={newAnnouncement.content} onChange={e => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })} />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Post Announcement</button>
                        </form>
                    </div>
                </div>
            )}

            {showMediaModal && (
                <div className="modal-overlay" onClick={() => setShowMediaModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Add Media</h3>
                            <button className="close-btn" onClick={() => setShowMediaModal(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmitMedia}>
                            <div className="form-group">
                                <label>Target Event (Past Only)</label>
                                <select required className="form-input" value={mediaUpload.eventId} onChange={e => setMediaUpload({ ...mediaUpload, eventId: e.target.value })}>
                                    <option value="">-- Select Event --</option>
                                    {events.past.map(e => <option key={e._id} value={e._id}>{e.title}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Media Type</label>
                                <select className="form-input" value={mediaUpload.type} onChange={e => setMediaUpload({ ...mediaUpload, type: e.target.value })}>
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>URL</label>
                                <input required className="form-input" value={mediaUpload.url} onChange={e => setMediaUpload({ ...mediaUpload, url: e.target.value })} placeholder="https://..." />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Upload</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MemberPanel;

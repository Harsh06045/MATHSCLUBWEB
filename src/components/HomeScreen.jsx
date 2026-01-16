import React, { useState, useEffect } from 'react';
import {
    UserPlus,
    Info,
    Calendar,
    Megaphone,
    ArrowRight,
    CheckCircle,
    MapPin,
    Users,
    Video,
    ChevronLeft,
    ChevronRight,
    User,
    LogOut,
    X,
    UserCircle,
    Menu
} from 'lucide-react';
import './HomeScreen.css';
import logo from '../assets/logo.png';

// Update component signature to accept userData and CONTENT PROPS
const HomeScreen = ({
    userRole,
    onNavigate,
    userData,
    announcements = [],
    ongoingEvents = [],
    pastEvents = []
}) => {

    // State Management
    const [activeTab, setActiveTab] = useState('Overview');
    const [showSuccess, setShowSuccess] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [registrationError, setRegistrationError] = useState('');

    // Events State
    const [eventCategory, setEventCategory] = useState('Ongoing');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventRegistrationSuccess, setEventRegistrationSuccess] = useState(false);
    const [registeredEventIds, setRegisteredEventIds] = useState([]); // Track registered events
    const [selectedImage, setSelectedImage] = useState(null); // Lightbox state

    // Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselImages = [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000"
    ];

    useEffect(() => {
        if (activeTab === 'About Us') {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
            }, 3000); // 3 seconds slide duration
            return () => clearInterval(timer);
        }
    }, [activeTab]);

    // Profile State
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false); // Mobile Menu State

    // Ensure userData has a fallback if null (though App handles it)
    const currentUser = userData || {
        name: "Guest User",
        email: "guest@example.com",
        role: userRole || "Guest",
        department: "N/A",
        year: "N/A",
        registrationNumber: "N/A",
        phone: "N/A"
    };

    // Announcements State
    const [expandedAnnouncementIds, setExpandedAnnouncementIds] = useState([]);

    const toggleAnnouncement = (id) => {
        setExpandedAnnouncementIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const teams = ['Technical Team', 'Design Team', 'Social Media', 'Content Team'];

    const handleEventRegistration = () => {
        setEventRegistrationSuccess(true);
        if (selectedEvent) {
            setRegisteredEventIds(prev => [...prev, selectedEvent._id]);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('session');
        onNavigate('login');
    };

    const navItems = ['Overview', 'Register', 'About Us', 'Events', 'Announcements'];

    const features = [
        {
            category: 'Register',
            title: 'Member Registration',
            description: 'Join the community! Sign up for new memberships or renew your existing club status.',
            icon: <UserPlus size={24} />,
            link: isRegistered ? 'Registered' : 'Register',
            isPrimaryAction: true,
            actionType: 'custom',
            target: 'Register',
            note: '* All membership requests are subject to administrative approval.'
        },
        {
            category: 'About Us',
            title: 'About the Club',
            description: 'Discover our mission, meet the faculty coordinators, and learn about our history.',
            icon: <Info size={24} />,
            link: 'Read More'
        },
        {
            category: 'Events',
            title: 'Upcoming Events',
            description: 'Stay tuned for hackathons, workshops, and guest lectures scheduled for this semester.',
            icon: <Calendar size={24} />,
            link: 'View Calendar'
        },
        {
            category: 'Announcements',
            title: 'Announcements',
            description: 'Important updates regarding exams, schedule changes, and club achievements.',
            icon: <Megaphone size={24} />,
            link: 'See Updates'
        }
    ];

    const visibleFeatures = activeTab === 'Overview'
        ? features
        : features.filter(feature => feature.category === activeTab);

    return (
        <div className="home-container">
            {/* Success Notification Overlay */}
            {showSuccess && (
                <div className="notification-overlay">
                    <div className="notification-card">
                        <div className="notification-icon-wrapper">
                            <CheckCircle size={48} className="notification-icon" />
                        </div>
                        <h3 className="notification-title">Success!</h3>
                        <p className="notification-message">
                            Membership Request Submitted. <br />
                            Your application has been sent for administrative approval.
                        </p>
                        <button onClick={() => setShowSuccess(false)} className="notification-btn">
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="home-header">
                <div className="brand-section">
                    <img src={logo} alt="MathClub Logo" className="brand-logo" />
                    <div className="brand-info">
                        <span className="brand-title">MathClub</span>
                        <span className="brand-tagline">Think • Solve • Grow</span>
                    </div>
                </div>
                <div className="user-greeting">
                    {/* Desktop Greeting */}
                    <span className="greeting-text desktop-only">Welcome back, {currentUser.name.split(' ')[0]}</span>{/* Force Update */}

                    <div className="user-profile-section" style={{ position: 'relative' }}>
                        <button
                            className="profile-avatar-btn"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="avatar-circle">
                                <User size={20} className="avatar-icon" />
                            </div>
                        </button>

                        {showProfileMenu && (
                            <div className="profile-dropdown-menu">
                                <button
                                    className="dropdown-item"
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        setShowProfileModal(true);
                                    }}
                                >
                                    <UserCircle size={16} /> Profile
                                </button>
                                <button
                                    className="dropdown-item logout-item"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={16} /> Logout
                                </button>

                            </div>
                        )}
                    </div>
                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Navigation Bar */}
            <nav className={`nav-bar ${showMobileMenu ? 'mobile-visible' : ''}`}>
                {navItems.map(item => (
                    <button
                        key={item}
                        className={`nav-pill ${activeTab === item ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(item);
                            setShowMobileMenu(false); // Close menu on selection
                        }}
                    >
                        {item}
                    </button>
                ))}
            </nav>

            {/* Main Dashboard Content */}
            <main className="dashboard-content">
                {activeTab === 'About Us' ? (
                    <div className="about-container">
                        <button className="back-btn" onClick={() => setActiveTab('Overview')} style={{ marginBottom: '1rem' }}>
                            <ChevronLeft size={20} /> Back to Overview
                        </button>
                        <section className="about-hero">
                            <h2 className="section-title">Our Legacy</h2>

                            <p className="about-description">
                                Established in 2015, the MathClub has been a beacon for mathematics enthusiasts, fostering a community where logic meets creativity.
                                We are dedicated to exploring the depths of mathematical sciences through collaborative learning, challenging competitions, and
                                groundbreaking research. Our mission is to demystify complex concepts and nurture the next generation of problem solvers.
                            </p>

                            {/* Sliding Card Carousel */}
                            <div className="sliding-carousel-container">
                                {carouselImages.map((img, idx) => {
                                    let position = 'nextSlide';
                                    if (idx === currentSlide) {
                                        position = 'activeSlide';
                                    } else if (
                                        idx === currentSlide - 1 ||
                                        (currentSlide === 0 && idx === carouselImages.length - 1)
                                    ) {
                                        position = 'prevSlide';
                                    }

                                    return (
                                        <article className={`carousel-card ${position}`} key={idx}>
                                            <img src={img} alt={`Math Activity ${idx + 1}`} className="carousel-img" />
                                        </article>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="about-section">
                            <h3 className="subsection-title">Faculty Coordinators</h3>
                            <div className="members-grid compact">
                                {[
                                    { name: "Dr. Eleanor Vance", role: "Senior Advisor" },
                                    { name: "Prof. Alan Turing", role: "Technical Mentor" }
                                ].map((member, idx) => (
                                    <div key={idx} className="member-card faculty">
                                        <div className="member-avatar placeholder">FC</div>
                                        <div className="member-info">
                                            <h4 className="member-name">{member.name}</h4>
                                            <p className="member-role">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="about-section">
                            <h3 className="subsection-title">Core Leadership</h3>
                            <div className="members-grid compact">
                                {[
                                    { name: "Sarah O'Connor", role: "President" },
                                    { name: "David Chen", role: "Vice President" }
                                ].map((member, idx) => (
                                    <div key={idx} className="member-card leadership">
                                        <div className="member-avatar placeholder">L</div>
                                        <div className="member-info">
                                            <h4 className="member-name">{member.name}</h4>
                                            <p className="member-role">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="teams-wrapper">
                            {[
                                {
                                    team: "Technical Team",
                                    members: [
                                        { name: "Marcus Reed", role: "Lead Developer" },
                                        { name: "Julia Santos", role: "Backend Specialist" },
                                        { name: "Alex Kumar", role: "Frontend Dev" },
                                        { name: "Nina Patel", role: "DevOps Engineer" }
                                    ]
                                },
                                {
                                    team: "Design Team",
                                    members: [
                                        { name: "Leo Rossi", role: "Creative Director" },
                                        { name: "Maya Lin", role: "UI/UX Designer" },
                                        { name: "Sam Wilson", role: "Graphic Artist" }
                                    ]
                                },
                                {
                                    team: "Content Team",
                                    members: [
                                        { name: "Elena Gilbert", role: "Head of Content" },
                                        { name: "Tom Holland", role: "Editor" },
                                        { name: "Zendaya Coleman", role: "Writer" }
                                    ]
                                },
                                {
                                    team: "Social Media",
                                    members: [
                                        { name: "Chris Evans", role: "Social Lead" },
                                        { name: "Scarlett J.", role: "Community Mgr" },
                                        { name: "Robert D.", role: "Content Creator" }
                                    ]
                                }
                            ].map((dept, idx) => (
                                <section key={idx} className="about-section team-section">
                                    <h3 className="subsection-title">{dept.team}</h3>
                                    <div className="members-grid">
                                        {dept.members.map((member, mIdx) => (
                                            <div key={mIdx} className="member-card">
                                                <div className="member-avatar placeholder">{member.name.charAt(0)}</div>
                                                <div className="member-info">
                                                    <h4 className="member-name">{member.name}</h4>
                                                    <p className="member-role">{member.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'Events' ? (
                    <div className="events-container">
                        {selectedEvent ? (
                            <div className="event-registration-view">
                                <button className="back-btn" onClick={() => {
                                    setSelectedEvent(null);
                                    setEventRegistrationSuccess(false);
                                }}>
                                    <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /> Back to Events
                                </button>

                                <div className="event-detail-card">
                                    <div className="detail-header">
                                        <span className="event-tag-large">{selectedEvent.tags ? selectedEvent.tags[0] : 'Event'}</span>
                                        <h2 className="detail-title">{selectedEvent.title}</h2>
                                    </div>

                                    <div className="detail-meta-grid">
                                        <div className="meta-item">
                                            <Calendar className="meta-icon" />
                                            <span>{selectedEvent.date}</span>
                                        </div>
                                        {selectedEvent.location && (
                                            <div className="meta-item">
                                                <MapPin className="meta-icon" />
                                                <span>{selectedEvent.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="detail-description">{selectedEvent.description}</p>

                                    <div className="registration-action-area">
                                        {eventRegistrationSuccess || registeredEventIds.includes(selectedEvent.id) ? (
                                            <>
                                                <div className="success-message">
                                                    <CheckCircle size={24} />
                                                    <span>{eventRegistrationSuccess ? 'Successfully Registered!' : 'You are already registered for this event.'}</span>
                                                </div>
                                                <p className="registration-note">* Please verify your inbox for the confirmation email and further event details.</p>
                                            </>
                                        ) : (
                                            <button
                                                className="confirm-register-btn"
                                                onClick={handleEventRegistration}
                                            >
                                                Confirm Registration
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button className="back-btn" onClick={() => setActiveTab('Overview')} style={{ marginBottom: '1rem' }}>
                                    <ChevronLeft size={20} /> Back to Overview
                                </button>
                                <div className="events-subnav">
                                    <button
                                        className={`subnav-pill ${eventCategory === 'Ongoing' ? 'active' : ''}`}
                                        onClick={() => setEventCategory('Ongoing')}
                                    >
                                        Ongoing Events
                                    </button>
                                    <button
                                        className={`subnav-pill ${eventCategory === 'Past' ? 'active' : ''}`}
                                        onClick={() => setEventCategory('Past')}
                                    >
                                        Past Events
                                    </button>
                                </div>

                                <div className="events-grid">
                                    {eventCategory === 'Ongoing' ? (
                                        ongoingEvents.length > 0 ? (
                                            ongoingEvents.map(event => {
                                                const isEventRegistered = registeredEventIds.includes(event._id);
                                                return (
                                                    <div key={event._id} className="event-card ongoing">
                                                        <div className="event-date-badge">
                                                            <span className="month">{event.date.split(' ')[0].substring(0, 3)}</span>
                                                            <span className="day">{event.date.split(' ')[1] ? event.date.split(' ')[1].replace(',', '') : ''}</span>
                                                        </div>
                                                        <div className="event-content">
                                                            <div className="event-tags">
                                                                {event.tags && event.tags.map(tag => <span key={tag} className="event-tag">{tag}</span>)}
                                                            </div>
                                                            <h3 className="event-title">{event.title}</h3>
                                                            <div className="event-meta">
                                                                <MapPin size={14} /> {event.location}
                                                            </div>
                                                            <p className="event-desc-short">{event.description}</p>

                                                            {isEventRegistered ? (
                                                                <button
                                                                    className="event-register-btn registered"
                                                                    disabled
                                                                    style={{ cursor: 'not-allowed', opacity: 0.7, backgroundColor: '#10b981' }}
                                                                >
                                                                    <CheckCircle size={16} /> Already Registered
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="event-register-btn"
                                                                    onClick={() => setSelectedEvent(event)}
                                                                >
                                                                    Register Now <ArrowRight size={16} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : <p>No ongoing events.</p>
                                    ) : (
                                        pastEvents.length > 0 ? (
                                            pastEvents.map(event => {
                                                // Handle images safely
                                                const images = event.images || [];
                                                const displayImages = images.length > 5 ? images.slice(0, 5) : images;
                                                const remainingCount = images.length - 4;

                                                return (
                                                    <div key={event._id} className="event-card past">
                                                        <div className="past-event-header">
                                                            <h3 className="event-title">{event.title}</h3>
                                                            <span className="event-date-simple">{event.date}</span>
                                                        </div>
                                                        {event.attendance && (
                                                            <div className="attendance-badge">
                                                                <Users size={14} /> {event.attendance} Attendees
                                                            </div>
                                                        )}
                                                        <p className="event-desc-short">{event.description}</p>
                                                        <div className="event-gallery-preview">
                                                            {displayImages.map((item, idx) => {
                                                                const isVideo = typeof item === 'object' && item.type === 'video';
                                                                const imgSrc = isVideo ? item.thumbnail : item;
                                                                const mediaSrc = isVideo ? item.src : item;
                                                                const mediaType = isVideo ? 'video' : 'image';

                                                                return (
                                                                    <div key={idx} className="gallery-placeholder" style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                                                                        {images.length > 5 && idx === 4 ? (
                                                                            <div className="gallery-overlay">
                                                                                <span>+{remainingCount}</span>
                                                                            </div>
                                                                        ) : null}
                                                                        <img src={imgSrc} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                                                                        {isVideo && (
                                                                            <div className="video-icon-overlay" style={{
                                                                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                                                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                                                backgroundColor: 'rgba(0,0,0,0.3)'
                                                                            }}>
                                                                                <div style={{
                                                                                    background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '12px',
                                                                                    backdropFilter: 'blur(4px)', display: 'flex'
                                                                                }}>
                                                                                    <Video size={24} color="white" fill="white" />
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        <div className="gallery-click-handler"
                                                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}
                                                                            onClick={() => setSelectedImage({ src: mediaSrc, type: mediaType, eventId: event._id, index: idx })}
                                                                        ></div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : <p>No past events recorded.</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ) : activeTab === 'Announcements' ? (
                    <div className="announcements-container">
                        <button className="back-btn" onClick={() => setActiveTab('Overview')} style={{ marginBottom: '1rem' }}>
                            <ChevronLeft size={20} /> Back to Overview
                        </button>
                        <div className="section-header">
                            <h2 className="section-title">Latest Updates</h2>
                            <p className="section-subtitle">Stay informed with the latest news from MathClub and the university.</p>
                        </div>

                        <div className="announcements-list">
                            {announcements.map((item) => {
                                const isExpanded = expandedAnnouncementIds.includes(item.id);
                                const isLongText = item.content.length > 100; // Threshold for expansion

                                return (
                                    <div key={item._id} className={`announcement-card ${item.category.toLowerCase()}`}>
                                        <div className="announcement-header">
                                            <div className="announcement-meta">
                                                <span className={`category-badge ${item.category.toLowerCase()}`}>{item.category}</span>
                                                <span className="announcement-date">{item.date}</span>
                                            </div>
                                            <h3 className="announcement-title">{item.title}</h3>
                                        </div>
                                        <div className="announcement-body">
                                            <p className={`announcement-text ${isExpanded ? 'expanded' : ''}`}>
                                                {item.content}
                                            </p>
                                            {isLongText && (
                                                <button
                                                    className="read-more-btn"
                                                    onClick={() => toggleAnnouncement(item._id)}
                                                >
                                                    {isExpanded ? 'Read Less' : 'Read More'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="features-wrapper">
                        {activeTab !== 'Overview' && (
                            <button className="back-btn" onClick={() => setActiveTab('Overview')} style={{ marginBottom: '1rem' }}>
                                <ChevronLeft size={20} /> Back to Overview
                            </button>
                        )}
                        <div className="grid-container">
                            {visibleFeatures.map((feature, index) => (
                                <div key={index} className="feature-card">
                                    <div className="card-icon-wrapper">
                                        {feature.icon}
                                    </div>
                                    <h3 className="card-title">{feature.title}</h3>
                                    <p className="card-desc">{feature.description}</p>
                                    {feature.isPrimaryAction ? (
                                        <>
                                            {feature.category === 'Register' && activeTab === 'Register' && !isRegistered && (
                                                <>
                                                    <select
                                                        className={`team-select ${registrationError ? 'error' : ''}`}
                                                        value={selectedTeam}
                                                        onChange={(e) => {
                                                            setSelectedTeam(e.target.value);
                                                            setRegistrationError('');
                                                        }}
                                                    >
                                                        <option value="" disabled>Select a Team</option>
                                                        {teams.map(team => (
                                                            <option key={team} value={team}>{team}</option>
                                                        ))}
                                                    </select>
                                                    {registrationError && <p className="validation-error">{registrationError}</p>}
                                                </>
                                            )}
                                            <button
                                                className={`card-action-btn ${isRegistered && feature.category === 'Register' ? 'disabled' : ''}`}
                                                disabled={isRegistered && feature.category === 'Register'}
                                                onClick={() => {
                                                    if (activeTab === 'Register') {
                                                        if (!selectedTeam) {
                                                            setRegistrationError('Please select a team to register.');
                                                            return;
                                                        }
                                                        setShowSuccess(true);
                                                        setIsRegistered(true);
                                                    } else {
                                                        setActiveTab('Register');
                                                    }
                                                }}
                                            >
                                                {feature.link} {isRegistered && feature.category === 'Register' ? <CheckCircle size={16} /> : <ArrowRight size={16} />}
                                            </button>
                                            {feature.note && <p className="feature-note">{feature.note}</p>}
                                        </>
                                    ) : (
                                        <button
                                            className="card-action-btn"
                                            onClick={() => setActiveTab(feature.category)}
                                        >
                                            {feature.link} <ArrowRight size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )
                }
            </main >

            {/* Lightbox Modal */}
            {
                selectedImage && (
                    <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
                        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>

                            {/* Navigation Buttons */}
                            {(() => {
                                const event = pastEvents.find(e => e._id === selectedImage.eventId);
                                const images = event ? event.images || [] : [];
                                const hasPrev = selectedImage.index > 0;
                                const hasNext = selectedImage.index < images.length - 1;

                                const handleNavigate = (direction) => {
                                    const newIndex = direction === 'next' ? selectedImage.index + 1 : selectedImage.index - 1;
                                    if (newIndex >= 0 && newIndex < images.length) {
                                        const nextItem = images[newIndex];
                                        const isVideo = typeof nextItem === 'object' && nextItem.type === 'video';

                                        setSelectedImage({
                                            eventId: selectedImage.eventId,
                                            src: isVideo ? nextItem.src : nextItem,
                                            type: isVideo ? 'video' : 'image',
                                            index: newIndex
                                        });
                                    }
                                };

                                return (
                                    <>
                                        {hasPrev && (
                                            <button className="lightbox-nav prev" onClick={() => handleNavigate('prev')}>
                                                <ChevronLeft size={32} />
                                            </button>
                                        )}

                                        <div className="lightbox-media-container" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {selectedImage.type === 'video' ? (
                                                <video
                                                    src={selectedImage.src}
                                                    controls
                                                    autoPlay
                                                    style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
                                                />
                                            ) : (
                                                <img src={selectedImage.src} alt="Full view" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} />
                                            )}
                                        </div>

                                        {hasNext && (
                                            <button className="lightbox-nav next" onClick={() => handleNavigate('next')}>
                                                <ChevronRight size={32} />
                                            </button>
                                        )}
                                    </>
                                )
                            })()}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default HomeScreen;

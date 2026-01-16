import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import HomeScreen from './components/HomeScreen';
import AdminPanel from './components/AdminPanel';
import MemberPanel from './components/MemberPanel';
import './App.css';

// DEFAULT DATA (Moved from HomeScreen)
const DEFAULT_ANNOUNCEMENTS = [
  {
    _id: "1",
    title: "End Semester Exam Schedule Released",
    date: "May 15, 2026",
    category: "Exam",
    content: "The final exam schedule for the Spring 2026 semester has been released. Please check the university portal for your specific seating arrangements and timing. Ensure you carry your admit cards. Good luck to all students!"
  },
  {
    _id: "2",
    title: "Club Membership Renewal",
    date: "April 20, 2026",
    category: "Club",
    content: "It's that time of the year! All existing members are requested to renew their memberships by end of this month to retain access to exclusive resources and events. Early bird renewals get a special MathClub merchandise pack."
  },
  {
    _id: "3",
    title: "Workshop on Cryptography",
    date: "March 10, 2026",
    category: "General",
    content: "Join us for an exciting deep dive into the world of Cryptography. We will cover topics ranging from classical ciphers to modern RSA encryption. This session is open to all students, regardless of their major. Snacks will be provided! Don't miss this opportunity to learn how to keep secrets safe in the digital age."
  },
  {
    _id: "4",
    title: "Library Renovation Update",
    date: "February 28, 2026",
    category: "General",
    content: "The main university library will be undergoing renovations starting next week. The 3rd floor will be closed for access. Temporary study spaces have been set up in the Student Center. We apologize for the inconvenience and hope to unveil a better learning environment soon."
  }
];

const DEFAULT_ONGOING_EVENTS = [
  {
    _id: "1",
    title: "Math Hackathon 2026",
    date: "March 15, 2026",
    location: "Main Auditorium",
    description: "A 24-hour hackathon solving complex mathematical problems using code.",
    tags: ["Coding", "Competition"]
  },
  {
    _id: "2",
    title: "Guest Lecture: Number Theory",
    date: "February 10, 2026",
    location: "Room 304",
    description: "An exclusive session with Prof. Andrew Wiles on modern number theory.",
    tags: ["Lecture", "Academic"]
  }
];

const DEFAULT_PAST_EVENTS = [
  {
    _id: "101",
    title: "Integration Bee 2025",
    date: "December 12, 2025",
    attendance: 150,
    description: "Our annual integration contest was a huge success!",
    images: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
      {
        type: 'video',
        src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
      },
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    _id: "102",
    title: "Freshers' Orientation",
    date: "September 05, 2025",
    attendance: 200,
    description: "Welcoming the new batch of math enthusiasts.",
    images: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

const API_URL = 'http://localhost:5000/api';

function App() {
  const [currentScreen, setCurrentScreen] = useState(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session?.isLoggedIn) {
      switch (session.role) {
        case 'admin': return 'admin';
        case 'club_member': return 'member_panel';
        case 'student': return 'home';
        default: return 'home';
      }
    }
    return 'login';
  });

  const [userRole, setUserRole] = useState(() => {
    return JSON.parse(localStorage.getItem('session'))?.role || '';
  });

  const [userData, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem('session'))?.userData || null;
  });

  // GLOBAL STATE
  const [approvals, setApprovals] = useState([]);
  const [members, setMembers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH INITIAL DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, contentRes, announcementsRes] = await Promise.all([
          fetch(`${API_URL}/users/approvals`),
          fetch(`${API_URL}/content/events`),
          fetch(`${API_URL}/content/announcements`)
        ]);

        const rawApprovals = await usersRes.json();
        const rawEvents = await contentRes.json();
        const rawAnnouncements = await announcementsRes.json();

        const approvalsData = Array.isArray(rawApprovals) ? rawApprovals : [];
        const eventsData = Array.isArray(rawEvents) ? rawEvents : [];
        const announcementsData = Array.isArray(rawAnnouncements) ? rawAnnouncements : [];

        setApprovals(approvalsData);
        setAnnouncements(announcementsData.length > 0 ? announcementsData : DEFAULT_ANNOUNCEMENTS);
        setOngoingEvents(eventsData.filter(e => e.category === 'Ongoing').length > 0
          ? eventsData.filter(e => e.category === 'Ongoing')
          : DEFAULT_ONGOING_EVENTS);
        setPastEvents(eventsData.filter(e => e.category === 'Past').length > 0
          ? eventsData.filter(e => e.category === 'Past')
          : DEFAULT_PAST_EVENTS);

        const membersRes = await fetch(`${API_URL}/users/members`);
        const rawMembers = await membersRes.json();
        const membersData = Array.isArray(rawMembers) ? rawMembers : [];
        setMembers(membersData);

      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleLogin = async (role, data = null) => {
    setUserRole(role);
    if (data) setUserData(data);

    const sessionData = {
      isLoggedIn: true,
      role,
      userData: data
    };
    localStorage.setItem('session', JSON.stringify(sessionData));

    if (role === 'admin') setCurrentScreen('admin');
    else if (role === 'club_member') setCurrentScreen('member_panel');
    else setCurrentScreen('home');
  };


  const handleRegister = async (data) => {
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const newUser = await res.json();
      setApprovals([...approvals, newUser]);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const approveUser = async (id) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });
      const approvedUser = await res.json();
      setMembers(prev => [...prev, approvedUser]);
      setApprovals(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      console.error('Approval error:', err);
    }
  };


  const rejectUser = async (id) => {
    try {
      await fetch(`${API_URL}/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
      setApprovals(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      console.error('Rejection error:', err);
    }
  };

  const handleAddEvent = async (eventData) => {
    try {
      const res = await fetch(`${API_URL}/content/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      const newEvent = await res.json();
      if (newEvent.category === 'Past') {
        setPastEvents(prev => [newEvent, ...prev]);
      } else {
        setOngoingEvents(prev => [newEvent, ...prev]);
      }
    } catch (err) {
      console.error('Add event error:', err);
    }
  };

  const handleAddAnnouncement = async (announcementData) => {
    try {
      const res = await fetch(`${API_URL}/content/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcementData)
      });
      const newAnnouncement = await res.json();
      setAnnouncements(prev => [newAnnouncement, ...prev]);
    } catch (err) {
      console.error('Add announcement error:', err);
    }
  };

  const handleAddMedia = async (eventId, mediaItem) => {
    const event = pastEvents.find(e => e._id === eventId);
    if (!event) return;

    const updatedImages = [...(event.images || []), mediaItem];
    handleUpdateEvent({ ...event, images: updatedImages });
  };


  const handleUpdateEvent = async (updatedEvent) => {
    try {
      const res = await fetch(`${API_URL}/content/events/${updatedEvent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent)
      });
      const correctedEvent = await res.json();
      setPastEvents(prev => prev.map(ev => ev._id === correctedEvent._id ? correctedEvent : ev));
      setOngoingEvents(prev => prev.map(ev => ev._id === correctedEvent._id ? correctedEvent : ev));
    } catch (err) {
      console.error('Update event error:', err);
    }
  };


  if (loading) {
    return <div className="loading-screen">Loading Maths Club Hub...</div>;
  }

  return (
    <>
      {currentScreen === 'login' && (
        <LoginScreen
          onNavigate={setCurrentScreen}
          onLogin={handleLogin}
          approvals={approvals}
          members={members}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onNavigate={setCurrentScreen}
          onRegister={handleRegister}
        />
      )}

      {currentScreen === 'forgot-password' && (
        <ForgotPasswordScreen onBack={() => setCurrentScreen('login')} />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          userRole={userRole}
          userData={userData}
          onNavigate={setCurrentScreen}
          announcements={announcements}
          ongoingEvents={ongoingEvents}
          pastEvents={pastEvents}
        />
      )}

      {currentScreen === 'admin' && (
        <AdminPanel
          onNavigate={setCurrentScreen}
          approvals={approvals}
          members={members}
          onApprove={approveUser}
          onReject={rejectUser}
        />
      )}

      {currentScreen === 'member_panel' && (
        <MemberPanel
          onNavigate={setCurrentScreen}
          events={{ ongoing: ongoingEvents, past: pastEvents }}
          announcements={announcements}
          approvals={approvals}
          onAddEvent={handleAddEvent}
          onAddAnnouncement={handleAddAnnouncement}
          onAddMedia={handleAddMedia}
          onUpdateEvent={handleUpdateEvent}
        />
      )}
    </>
  );
}

export default App;

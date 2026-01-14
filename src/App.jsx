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
    id: 1,
    title: "End Semester Exam Schedule Released",
    date: "May 15, 2026",
    category: "Exam",
    content: "The final exam schedule for the Spring 2026 semester has been released. Please check the university portal for your specific seating arrangements and timing. Ensure you carry your admit cards. Good luck to all students!"
  },
  {
    id: 2,
    title: "Club Membership Renewal",
    date: "April 20, 2026",
    category: "Club",
    content: "It's that time of the year! All existing members are requested to renew their memberships by end of this month to retain access to exclusive resources and events. Early bird renewals get a special MathClub merchandise pack."
  },
  {
    id: 3,
    title: "Workshop on Cryptography",
    date: "March 10, 2026",
    category: "General",
    content: "Join us for an exciting deep dive into the world of Cryptography. We will cover topics ranging from classical ciphers to modern RSA encryption. This session is open to all students, regardless of their major. Snacks will be provided! Don't miss this opportunity to learn how to keep secrets safe in the digital age."
  },
  {
    id: 4,
    title: "Library Renovation Update",
    date: "February 28, 2026",
    category: "General",
    content: "The main university library will be undergoing renovations starting next week. The 3rd floor will be closed for access. Temporary study spaces have been set up in the Student Center. We apologize for the inconvenience and hope to unveil a better learning environment soon."
  }
];

const DEFAULT_ONGOING_EVENTS = [
  {
    id: 1,
    title: "Math Hackathon 2026",
    date: "March 15, 2026",
    location: "Main Auditorium",
    description: "A 24-hour hackathon solving complex mathematical problems using code.",
    tags: ["Coding", "Competition"]
  },
  {
    id: 2,
    title: "Guest Lecture: Number Theory",
    date: "February 10, 2026",
    location: "Room 304",
    description: "An exclusive session with Prof. Andrew Wiles on modern number theory.",
    tags: ["Lecture", "Academic"]
  }
];

const DEFAULT_PAST_EVENTS = [
  {
    id: 101,
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
    id: 102,
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

function App() {
  const [currentScreen, setCurrentScreen] = useState(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session?.isLoggedIn) {
      // Determine screen based on role
      switch (session.role) {
        case 'admin': return 'admin';
        case 'club_member': return 'member_panel';
        case 'student': return 'home'; // Explicitly student -> home
        default: return 'home'; // Fallback
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
  const [approvals, setApprovals] = useState(() =>
    JSON.parse(localStorage.getItem('approvals')) || []
  );

  const [members, setMembers] = useState(() =>
    JSON.parse(localStorage.getItem('members')) || []
  );

  // New Global State for Content
  const [announcements, setAnnouncements] = useState(() =>
    JSON.parse(localStorage.getItem('announcements')) || DEFAULT_ANNOUNCEMENTS
  );

  const [ongoingEvents, setOngoingEvents] = useState(() =>
    JSON.parse(localStorage.getItem('ongoingEvents')) || DEFAULT_ONGOING_EVENTS
  );

  const [pastEvents, setPastEvents] = useState(() =>
    JSON.parse(localStorage.getItem('pastEvents')) || DEFAULT_PAST_EVENTS
  );


  // PERSISTENCE EFFECT
  useEffect(() => {
    localStorage.setItem('approvals', JSON.stringify(approvals));
    localStorage.setItem('members', JSON.stringify(members));
    localStorage.setItem('announcements', JSON.stringify(announcements));
    localStorage.setItem('ongoingEvents', JSON.stringify(ongoingEvents));
    localStorage.setItem('pastEvents', JSON.stringify(pastEvents));
  }, [approvals, members, announcements, ongoingEvents, pastEvents]);


  //  LOGIN
  const handleLogin = (role, data = null) => {
    setUserRole(role);
    if (data) setUserData(data);

    const sessionData = {
      isLoggedIn: true,
      role,
      userData: data
    };
    localStorage.setItem('session', JSON.stringify(sessionData));

    // Route based on role
    if (role === 'admin') setCurrentScreen('admin');
    else if (role === 'club_member') setCurrentScreen('member_panel');
    else setCurrentScreen('home');
  };


  //  REGISTER → PENDING APPROVAL
  const handleRegister = (data) => {
    setApprovals([
      ...approvals,
      {
        ...data,
        id: Date.now(),
        status: 'pending'
      }
    ]);
  };

  //  ADMIN APPROVE
  const approveUser = (id) => {
    const user = approvals.find(u => u.id === id);
    if (!user) return;

    const approvedUser = { ...user, status: 'approved' };
    setMembers(prev => [...prev, approvedUser]);
    setApprovals(prev => prev.filter(u => u.id !== id));
  };


  //  ADMIN REJECT
  const rejectUser = (id) => {
    const rejectedUser = approvals.find(u => u.id === id);
    if (!rejectedUser) return;

    const updatedUser = { ...rejectedUser, status: 'rejected' };
    setApprovals(prev => prev.filter(u => u.id !== id));

    const rejected = JSON.parse(localStorage.getItem('rejected')) || [];
    localStorage.setItem('rejected', JSON.stringify([...rejected, updatedUser]));
  };

  // CONTENT HANDLERS
  const handleAddEvent = (eventData) => {
    if (eventData.category === 'Past') {
      setPastEvents(prev => [eventData, ...prev]);
    } else {
      setOngoingEvents(prev => [eventData, ...prev]);
    }
  };

  const handleAddAnnouncement = (announcementData) => {
    setAnnouncements(prev => [announcementData, ...prev]);
  };

  const handleAddMedia = (eventId, mediaItem) => {
    setPastEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          images: [...(event.images || []), mediaItem]
        };
      }
      return event;
    }));
  };


  const handleUpdateEvent = (updatedEvent) => {
    // Check Past Events first
    setPastEvents(prev => prev.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));

    // Check Ongoing Events
    setOngoingEvents(prev => prev.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
  };


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
          // Pass content props
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

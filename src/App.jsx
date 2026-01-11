import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import HomeScreen from './components/HomeScreen';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session?.isLoggedIn) {
      return session.role === 'admin' ? 'admin' : 'home';
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

  // Persist data
  useEffect(() => {
    localStorage.setItem('approvals', JSON.stringify(approvals));
  }, [approvals]);

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  //  LOGIN
  const handleLogin = (role, data = null) => {
    setUserRole(role);
    if (data) setUserData(data);

    localStorage.setItem(
      'session',
      JSON.stringify({
        isLoggedIn: true,
        role,
        userData: data
      })
    );

    setCurrentScreen(role === 'admin' ? 'admin' : 'home');
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

    const approvedUser = {
      ...user,
      status: 'approved'
    };

    setMembers(prev => [...prev, approvedUser]);
    setApprovals(prev => prev.filter(u => u.id !== id));
  };


  //  ADMIN REJECT
  const rejectUser = (id) => {
    const rejectedUser = approvals.find(u => u.id === id);

    if (!rejectedUser) return;

    const updatedUser = {
      ...rejectedUser,
      status: 'rejected'
    };

    setApprovals(prev => prev.filter(u => u.id !== id));

    const rejected = JSON.parse(localStorage.getItem('rejected')) || [];
    localStorage.setItem('rejected', JSON.stringify([...rejected, updatedUser]));
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
    </>
  );
}

export default App;




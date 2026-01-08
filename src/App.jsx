import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import HomeScreen from './components/HomeScreen';
import AdminPanel from './components/AdminPanel'; // Import Admin Panel
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = (role, data = null) => {
    setUserRole(role);
    if (data) {
      setUserData(data);
    }

    // Redirect logic
    if (role === 'admin') {
      setCurrentScreen('admin');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleRegister = (data) => {
    setUserData(data);
  };

  return (
    <>
      {currentScreen === 'login' && (
        <LoginScreen
          onForgotPassword={() => setCurrentScreen('forgot-password')}
          onNavigate={setCurrentScreen}
          onLogin={handleLogin}
          registeredUser={userData}
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
        />
      )}
    </>
  );
}

export default App;

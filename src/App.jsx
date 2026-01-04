import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import HomeScreen from './components/HomeScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = (role, data = null) => {
    setUserRole(role);
    if (data) {
      setUserData(data);
    } else if (!userData) {
      // Fallback if no specific user data provided (e.g., direct login without register)
      // We might set a default here or handle it in LoginScreen
    }
    setCurrentScreen('home');
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
    </>
  );
}

export default App;

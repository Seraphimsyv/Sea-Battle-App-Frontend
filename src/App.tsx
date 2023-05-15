import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { SigninPage } from './components/pages/SigninPage';

function App() {
  // eslint-disable-next-line
  const [jwtToken, setToken] = useState(localStorage.getItem('token') || undefined);
  // eslint-disable-next-line
  const [profile, setProfile] = useState(JSON.stringify(localStorage.getItem('user')) || undefined);

  const handleSaveToken = (token: string) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    fetch('/api/account/profile', {
      headers: headers
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', token);
      setProfile(data);
      setToken(token)
    })
    .then(() => window.location.href='/');
  }

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      if (['/log-in', '/sign-in'].includes(window.location.pathname)) {
        window.location.href = '/';
      }
    } else {
      if (!['/log-in', '/sign-in'].includes(window.location.pathname)) {
        window.location.href = '/log-in';
      }
    }
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/log-in' element={<LoginPage handleSave={handleSaveToken} />} />
          <Route path='/sign-in' element={<SigninPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

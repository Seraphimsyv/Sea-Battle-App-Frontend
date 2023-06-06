import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlertComponent from './components/AlertComponent';
import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';

import {
  AlertProvider,
  useAlerts
} from './manager/alert-manager';
import './index.css';

const AppRouter = ()  => {
  const { alerts, remAlert } = useAlerts();
  const [jwtToken] = useState(localStorage.getItem('token') || undefined);
  /**
   * User authorization handler
   * @param token 
   */
  const hanldeAuthorization = (token: string) => {
    localStorage.setItem('token', token);
    window.location.href='/';
  }
  /**
   * Authorization Check Hook
   */
  useEffect(() => {
    if (jwtToken) {
      if (['/log-in', '/sign-in'].includes(window.location.pathname)) {
        window.location.href = '/';
      }
    } else {
      if (!['/log-in', '/sign-in'].includes(window.location.pathname)) {
        window.location.href = '/log-in';
      }
    }
  }, [jwtToken])
  /**
   * 
   * @param id 
   */
  const handleRemoveAlert = (id: string) => {
    remAlert(id);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/log-in' element={<LoginPage handleSave={hanldeAuthorization} />} />
          <Route path='/sign-in' element={<SigninPage />} />
          <Route path='/game/:gameId' element={<GamePage />} />
        </Routes>
      </Router>
      <div id="alerts">
        {alerts.map((alert, key) => (
          <AlertComponent
            key={key}
            id={alert.id}
            variant={alert.variant}
            message={alert.message}
            callbackClose={handleRemoveAlert}
          />
        ))}
      </div>
    </>
  );
}

const App = () => {
  return (
    <AlertProvider>
      <AppRouter />
    </AlertProvider>
  )
}

export default App;

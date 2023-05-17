import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { TemplateAuthPage } from '../TemplateAuthPage';

interface ILoginPageProps {
  handleSave: (token: string) => void
}

export const LoginPage = ({ handleSave }: ILoginPageProps) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  /**
   * 
   * @param evt 
   */
  const handleChangeLogin = (evt: React.FormEvent<HTMLInputElement>) : void => {
    setLogin(evt.currentTarget.value);
  }
  /**
   * 
   * @param evt 
   */
  const handleChangePassword = (evt: React.FormEvent<HTMLInputElement>) : void => {
    setPassword(evt.currentTarget.value);
  }
  /**
   * 
   */
  const handleLogin = () => {
    fetch('/api/auth/log-in', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: login, password: password })
    })
    .then(res => res.json())
    .then(res => {
      if (res?.statusCode) {
        alert(res.message)
      } else {
        handleSave(res.access_token);
      }
    })
  }

  return (
    <>
      <TemplateAuthPage>
        <div className='div__form_login'>
          <h1>Log-in</h1>
          <input className='form__input' id="form__input_login" type='text' value={login} placeholder='Login' onChange={handleChangeLogin} />
          <input className='form__input' id="form__input_pass" type='password' value={password} placeholder='Password' onChange={handleChangePassword} />
          <div id="form__btns">
            <input className='form__btn' id="form__input_submit" type='button' value='Log-in' onClick={handleLogin} />
            <Link className='form__btn' to="/sign-in">Sign-in</Link>
          </div>
        </div>
      </TemplateAuthPage>
    </>
  )
}
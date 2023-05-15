import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TemplateAuthPage } from '../TemplateAuthPage';

export const SigninPage = () => {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  /**
   * 
   * @param evt 
   */
  const handleChangeUsername = (evt: React.FormEvent<HTMLInputElement>) : void => {
    setUsername(evt.currentTarget.value);
  }
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
  const handleSignin = () => {
    fetch('/api/auth/sign-in', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, login: login, password: password })
    })
    .then(res => res.json())
    .then(res => {
      if (res?.statusCode) {
        console.log(res)
      } else {
        window.location.href = '/log-in';
      }
    })
  }

  return (
    <>
      <TemplateAuthPage>
        <div className='div__form_login'>
          <h1>Sign-in</h1>
          <input className='form__input' id="form__input_username" type='text' value={username} placeholder='Username' onChange={handleChangeUsername} />
          <input className='form__input' id="form__input_login" type='text' value={login} placeholder='Login' onChange={handleChangeLogin} />
          <input className='form__input' id="form__input_pass" type='password' value={password} placeholder='Password' onChange={handleChangePassword} />
          <div id="form__btns">
            <input className='form__btn' id="form__input_submit" type='button' value='Sign-in' onClick={handleSignin} />
            <Link className='form__btn' to="/log-in">Log-in</Link>
          </div>
        </div>
      </TemplateAuthPage>
    </>
  )
}
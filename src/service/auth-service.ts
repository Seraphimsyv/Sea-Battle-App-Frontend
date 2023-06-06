import {
  LogIn,
  SignIn
} from '../types/auth.types'

export class AuthService {
  private static readonly HOST = '/api/auth';
  /**
   * 
   * @param token 
   * @returns 
   */
  static refreshToken(token: string) : Promise<string> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/refresh-token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res?.statusCode || res?.status  ) {
          reject(res);
        } else {
          resolve(res);
        }
      })
      .catch(err => reject(err))
    })
  }
  /**
   * 
   * @param login 
   * @param password 
   * @returns 
   */
  static logIn({ login, password }: LogIn) : Promise<string> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/log-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: login, password: password })
      })
      .then(res => res.json())
      .then(res => {
        if (res?.statusCode || res?.status  ) {
          reject(res);
        } else {
          resolve(res.access_token);
        }
      })
      .catch(err => reject(err))
    })
  }
  /**
   * 
   * @param username 
   * @param login 
   * @param password 
   * @returns 
   */
  static signIn({ username, login, password }: SignIn) : Promise<true | string> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/sign-in`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, login: login, password: password })      
      })
      .then(res => res.json())
      .then(res => {
        if (res?.statusCode || res?.status  ) {
          reject(res);
        } else {
          resolve(res);
        }
      })
      .catch(err => reject(err))
    })
  }
}
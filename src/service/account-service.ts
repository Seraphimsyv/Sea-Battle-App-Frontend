import {
  Profile,
  Statistic,
  History,
} from '../types/account.types'

export default class AccountService {
  private static readonly HOST = '/api/account';
  /**
   * 
   * @param token 
   * @returns 
   */
  static loadProfile(token: string) : Promise<Profile> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
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
      .catch(err => reject(err));
    })
  }
  /**
   * 
   * @param token 
   * @returns 
   */
  static loadStatistic(token: string) : Promise<Statistic> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/statistic`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
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
      .catch(err => reject(err));
    })
  }
  /**
   * 
   * @param token 
   * @returns 
   */
  static loadHistory(token: string) : Promise<History[]> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
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
}
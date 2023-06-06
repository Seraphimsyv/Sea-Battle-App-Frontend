export class AuthManager {
  /**
   * 
   * @returns 
   */
  static validateAuth() : Promise<boolean> {
    const token = window.localStorage.getItem('token');

    return new Promise((resolve, reject) => {
      const path = window.location.pathname;
      
      if (token) {
        if (['/log-in', '/sign-in'].includes(path)) {
          resolve(true);
        }
      } else {
        reject(false);
      }
    })
  }
}
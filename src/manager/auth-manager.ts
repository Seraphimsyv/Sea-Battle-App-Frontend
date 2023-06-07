interface ILogIn {
  login: string;
  password: string;
}

interface ISignUp extends ILogIn {
  username: string;
}

export default class AuthManager {
  /**
   * 
   * @param param0 
   * @returns 
   */
  static validateLog({ login, password }: ILogIn) : Promise<string | true> {
    return new Promise((resolve, reject) => {
      if (login === '') {
        reject('login')
      }

      if (password === '') {
        reject('password');
      }

      resolve(true);
    })
  }
  /**
   * 
   * @param param0 
   * @returns 
   */
  static validateSign({ username, login, password }: ISignUp) : Promise<string | true> {
    return new Promise((resolve, reject) => {
      if (username === '') {
        reject('username');
      }

      if (login === '') {
        reject('login');
      }

      if (password === '') {
        reject('password');
      }

      resolve(true);
    })
  }
}
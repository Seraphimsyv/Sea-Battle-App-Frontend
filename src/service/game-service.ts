import { io, Socket } from 'socket.io-client';
import {
  LoadMessages,
  SendMessage,
  CheckShot,
  Connect,
  AddShip,
  Message,
  Create,
  Check,
} from '../types/game.types';

export class GameService {
  private static readonly HOST = '/api/game';
  /**
   * 
   * @param token 
   * @returns 
   */
  static loadGames(token: string) : Promise<Object[]> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/load-games`, {
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
          resolve(res.games);
        }
      })
      .catch(err => reject(err))
    })
  }
  /**
   * 
   * @param token 
   * @returns 
   */
  static create({ token, body }: Create) : Promise<string> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(res => {
        if (res?.statusCode || res?.status  ) {
          reject(res);
        } else {
          resolve(res.gameId);
        }
      })
      .catch(err => reject(err))
    })
  }
  /**
   * 
   * @param token 
   * @param gameId 
   * @param type 
   * @param password 
   * @returns 
   */
  static connect({ token, gameId, password }: Connect) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({
          gameId: gameId,
          password: password
        })
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
  static getSocket(token: string) : Socket {
    return io(
      '', 
      {
        path: "/api/ws/game",
        extraHeaders: { Authorization: `${token}` }
      }
    );
  }
  /**
   * 
   * @param token 
   * @param gameId 
   * @returns 
   */
  static check({ token, gameId }: Check) : Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ gameId: gameId })
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
   * @param token 
   * @param gameId 
   * @returns 
   */
  static updateStatus({ token, gameId, playerId }: Check) : Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ gameId: gameId, playerId })
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
   * @param token 
   * @param locations 
   * @returns 
   */
  static addShip({ token, gameId, ships }: AddShip) : Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/add-ship`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ gameId, ships })
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
   * @param token 
   * @param gameId 
   * @param location 
   * @returns 
   */
  static checkShot({ token, gameId, location }: CheckShot) : Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/check-shot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ gameId: gameId, location: location })
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
   * @param token 
   * @param gameId 
   */
  static loadMessages({ token, gameId }: LoadMessages) : Promise<Message[]> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/get-messages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ gameId: gameId })
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
   * @param token 
   * @param gameId 
   * @param message 
   * @returns 
   */
  static sendMessage({ token, gameId, message }: SendMessage) : Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.HOST}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ gameId: gameId, message: message})
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
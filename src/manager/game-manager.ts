import { EnumShipStatus } from "../enum/game.enum";
import { Location, Ship } from "../types/game.types";

enum EnumShipSize {
  Medium, Large
}

export default class GameManager {
  public static readonly ships : Ship[] = [];
  /**
   * 
   * @param oldLoc 
   * @param newLoc 
   */
  static validateCells(oldLoc: Location, newLoc: Location) {
    if (
      oldLoc.x - 1 === newLoc.x &&
      oldLoc.y - 1 === newLoc.y
    ) throw new Error('Left top');
    
    if (
      oldLoc.x === newLoc.x &&
      oldLoc.y - 1 === newLoc.y
    ) throw new Error('Center top');

    if (
      oldLoc.x + 1 === newLoc.x &&
      oldLoc.y - 1 === newLoc.y
    ) throw new Error('Right top');

    if (
      oldLoc.x - 1 === newLoc.x &&
      oldLoc.y === newLoc.y
    ) throw new Error('Left middle');

    if (
      oldLoc.x === newLoc.x &&
      oldLoc.y === newLoc.y
    ) throw new Error('Center middle');

    if (
      oldLoc.x + 1 === newLoc.x &&
      oldLoc.y === newLoc.y
    ) throw new Error('Right middle');

    if (
      oldLoc.x - 1 === newLoc.x &&
      oldLoc.y + 1 === newLoc.y
    ) throw new Error('Left bottom');

    if (
      oldLoc.x === newLoc.x &&
      oldLoc.y + 1 === newLoc.y
    ) throw new Error('Center bottom');

    if (
      oldLoc.x + 1 === newLoc.x &&
      oldLoc.y + 1 === newLoc.y
    ) throw new Error('Right bottom');
  }
  /**
   * 
   * @param locations 
   * @param size 
   * @returns 
   */
  static async add(locations: Location[], size: number) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        if (locations.length === 0) reject(false);

        this.ships.forEach(ship => {
          ship.locations.forEach(oldLoc => {
            locations.forEach(newLoc => {
              this.validateCells(oldLoc, newLoc);
            })
          })
        })

        this.ships.push({
          locations: locations,
          status: EnumShipStatus.Full
        })

        resolve(true);
      } catch (err) {
        reject(err);
      }
    })
  }
  /**
   * 
   * @param location 
   * @returns 
   */
  static async validateRotate(ship: Ship, location: Location) {
    return new Promise((resolve, reject) => {
      ship.locations.forEach(loc => {
        if (
          loc.x === location.x
          && loc.y === location.y
        ) {
          resolve(true);
        }
      })

      resolve(false);
    })
  }
  /**
   * 
   * @param shipInx 
   * @param size 
   */
  static async rotateToRight(shipInx: number, size: EnumShipSize) {
    return new Promise(async (resolve) => {
      const arroundShips = this.ships;
      const currentLoc = this.ships[shipInx].locations;
      const shipSize = size === EnumShipSize.Medium ? 2 : 3;

      if (currentLoc[0].x + (shipSize - 1) > 10) {
        resolve(await this.rotateToTop(shipInx, size))
      } else {
        const newLoc = {
          x: currentLoc[0].x + (shipSize - 1),
          y: currentLoc[0].y
        }
        
        try {
          
          arroundShips.forEach((arrShip, arrInx) => {
          
            if (shipInx !== arrInx) {
              arrShip.locations.forEach((arrLoc) => {
                this.validateCells(arrLoc, newLoc);
              })
            }
          })
          /** Change positions */
          this.ships[shipInx].locations[1].x = currentLoc[0].x + 1;
          this.ships[shipInx].locations[1].y = currentLoc[0].y;
          
          if (size === EnumShipSize.Large) {
            this.ships[shipInx].locations[2].x = currentLoc[0].x + 2;
            this.ships[shipInx].locations[2].y = currentLoc[0].y;
          }
          
          resolve('right');
        } catch (err) {
          resolve(await this.rotateToTop(shipInx, size))
        }
      }
    })
  }
  /**
   * 
   * @param shipInx 
   * @param size 
   */
  static async rotateToTop(shipInx: number, size: EnumShipSize) {
    return new Promise(async (resolve) => {
      const arroundShips = this.ships;
      const currentLoc = this.ships[shipInx].locations;
      const shipSize = size === EnumShipSize.Medium ? 2 : 3;

      if (currentLoc[0].y - (shipSize - 1) < 1) {
        resolve(await this.rotateToLeft(shipInx, size));
      } else {
        const newLoc = {
          x: currentLoc[0].x,
          y: currentLoc[0].y - (shipSize - 1)
        }

        try {

          arroundShips.forEach((arrShip, arrInx) => {

            if (shipInx !== arrInx) {
              arrShip.locations.forEach((arrLoc) => {
                this.validateCells(arrLoc, newLoc);
              })
            }
          })
          /** Change positions */
          this.ships[shipInx].locations[1].x = currentLoc[0].x;
          this.ships[shipInx].locations[1].y = currentLoc[0].y - 1;

          if (size === EnumShipSize.Large) {
            this.ships[shipInx].locations[2].x = currentLoc[0].x;
            this.ships[shipInx].locations[2].y = currentLoc[0].y - 2;
          }

          resolve('top');
        } catch (err) {
          resolve(await this.rotateToLeft(shipInx, size));
        }
      }
    })
  }
  /**
   * 
   * @param shipInx 
   * @param size 
   */
  static async rotateToLeft(shipInx: number, size: EnumShipSize) {
    return new Promise(async (resolve) => {
      const arroundShips = this.ships;
      const currentLoc = this.ships[shipInx].locations;
      const shipSize = size === EnumShipSize.Medium ? 2 : 3;

      if (currentLoc[0].x - (shipSize -1) < 1) {
        resolve(await this.rotateToBottom(shipInx, size));
      } else {
        const newLoc = {
          x: currentLoc[0].x - (shipSize - 1),
          y: currentLoc[0].y
        }

        try {

          arroundShips.forEach((arrShip, arrInx) => {

            if (shipInx !== arrInx) {
              arrShip.locations.forEach((arrLoc) => {
                this.validateCells(arrLoc, newLoc);
              })
            }
          })
          /** Change position to left */
          this.ships[shipInx].locations[1].x = currentLoc[0].x - 1;
          this.ships[shipInx].locations[1].y = currentLoc[0].y;
          
          if (size === EnumShipSize.Large) {
            this.ships[shipInx].locations[2].x = currentLoc[0].x - 2;
            this.ships[shipInx].locations[2].y = currentLoc[0].y;
          }

          resolve('left');
        } catch (err) {
          resolve(await this.rotateToBottom(shipInx, size));
        }
      }
    })
  }
  /**
   * 
   * @param shipInx 
   * @param size 
   */
  static async rotateToBottom(shipInx: number, size: EnumShipSize) {
    return new Promise(async (resolve) => {
      const arroundShips = this.ships;
      const currentLoc = this.ships[shipInx].locations;
      const shipSize = size === EnumShipSize.Medium ? 2 : 3;

      if (currentLoc[0].y + (shipSize - 1) > 10) {
        resolve(await this.rotateToRight(shipInx, size));
      } else {
        const newLoc = {
          x: currentLoc[0].x,
          y: currentLoc[0].y + (shipSize - 1)
        }

        try {

          arroundShips.forEach((arrShip, arrInx) => {

            if (shipInx !== arrInx) {
              arrShip.locations.forEach((arrLoc) => {
                this.validateCells(arrLoc, newLoc);
              })
            }
          })
          /** Change positions */
          this.ships[shipInx].locations[1].x = currentLoc[0].x;
          this.ships[shipInx].locations[1].y = currentLoc[0].y + 1;

          if (size === EnumShipSize.Large) {
            this.ships[shipInx].locations[2].x = currentLoc[0].x;
            this.ships[shipInx].locations[2].y = currentLoc[0].y + 2;
          }

          resolve('bottom');
        } catch (err) {
          resolve(await this.rotateToRight(shipInx, size));
        }
      }
    })
  }
  /**
   * 
   * @param location 
   */
  static async rotate(location: Location) {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.ships.length; i++) {
        const ship = this.ships[i];

        const validCell = await this.validateRotate(ship, location);

        if (!validCell) continue;
        /**
         * One cell ship
         */
        if (ship.locations.length === 1) {
          resolve('on the spot');
        }
        /**
         * Two cell ship
         */
        if (ship.locations.length === 2) {
          if (ship.locations[0].y + 1 === ship.locations[1].y) {
            await this.rotateToRight(i, EnumShipSize.Medium)
            .then((res) => resolve(res));
          } else if (ship.locations[0].x + 1 === ship.locations[1].x) {
            await this.rotateToTop(i, EnumShipSize.Medium)
            .then((res) => resolve(res));
          } else if (ship.locations[0].y - 1 === ship.locations[1].y) {
            await this.rotateToLeft(i, EnumShipSize.Medium)
            .then((res) => resolve(res));
          } else {
            await this.rotateToBottom(i, EnumShipSize.Medium)
            .then((res) => resolve(res));
          }
        }
        /**
         * Three cell ship
         */
        if (ship.locations.length === 3) {
          if (ship.locations[0].y + 1 === ship.locations[1].y) {
            await this.rotateToRight(i, EnumShipSize.Large)
            .then((res) => resolve(res));
          } else if (ship.locations[0].x + 1 === ship.locations[1].x) {
            await this.rotateToTop(i, EnumShipSize.Large)
            .then((res) => resolve(res));
          } else if (ship.locations[0].y - 1 === ship.locations[1].y) {
            await this.rotateToLeft(i, EnumShipSize.Large)
            .then((res) => resolve(res));
          } else {
            await this.rotateToBottom(i, EnumShipSize.Large)
            .then((res) => resolve(res));
          }
        }
      }
    })
  }
  /**
   * 
   * @param location 
   * @returns 
   */
  static async del(location: Location) {
    return new Promise(async (resolve, reject) => {

      this.ships.forEach((ship, shipInx) => {

        ship.locations.forEach((loc, locInx) => {

          if (loc.x === location.x && loc.y === location.y) {
            const size = ship.locations.length;
            this.ships.splice(shipInx, 1);
            resolve(size); 
          }
        })
      })
    })
  }
}
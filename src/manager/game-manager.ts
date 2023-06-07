import { EnumShipStatus } from "../enum/game.enum";
import { Location, Ship } from "../types/game.types";

export default class GameManager {
  public static readonly ships : Ship[] = [];

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

  static add(locations: Location[], size: number) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {

        if (locations.length === 0) {
          throw new Error();
        }

        this.ships.forEach(ship => {
          ship.locations.forEach(oldLoc => {
            locations.forEach(newLoc => {
              this.validateCells(oldLoc, newLoc)
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

  static del(location: Location) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.ships.length; i++) {

        for (let l = 0; l < this.ships[i].locations.length; i++) {
          const loc = this.ships[i].locations[l];

          if (loc.x === location.x && loc.y === location.y) {
            const size = this.ships[i].locations.length;
            this.ships.splice(i, 1);
            resolve(size);
          }
        }
      }
    })
  }
}
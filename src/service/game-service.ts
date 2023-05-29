export type TypeShip = {
  col: number;
  row: number;
}

export class GameService {
  public static readonly ships : TypeShip[] = [];
  /**
   * Deleting a Ship object from the list
   * @param ship 
   */
  static delShip(ship: TypeShip) : void {
    
    for (let i = 0; i < this.ships.length; i++) {
      if (
        this.ships[i].col === ship.col &&
        this.ships[i].row === ship.row
      ) this.ships.splice(i, 1);
    }
  }
  /**
   * Adding a Ship object to the list
   * @param ship 
   * @returns 
   */
  static addShip(ship: TypeShip, test?: boolean) : boolean {

    if (this.ships.length > 0) {
      
      for (let i = 0; i < this.ships.length; i++) {
        if (
          this.ships[i].col - 1 === ship.col &&
          this.ships[i].row + 1 === ship.row 
        ) return false;

        if (
          this.ships[i].col + 1 === ship.col &&
          this.ships[i].row - 1 === ship.row 
        ) return false;

        if (
          this.ships[i].col + 1 === ship.col &&
          this.ships[i].row + 1 === ship.row 
        ) return false;

        if (
          this.ships[i].col + 1 === ship.col &&
          this.ships[i].row === ship.row 
        ) return false;

        if (
          this.ships[i].col === ship.col &&
          this.ships[i].row + 1 === ship.row 
        ) return false;

        if (
          this.ships[i].col - 1 === ship.col &&
          this.ships[i].row - 1 === ship.row 
        ) return false;

        if (
          this.ships[i].col - 1 === ship.col &&
          this.ships[i].row === ship.row 
        ) return false;

        if (
          this.ships[i].col === ship.col &&
          this.ships[i].row - 1 === ship.row 
        ) return false;
      }
    }

    if (test === undefined || test === false) {
      this.ships.push(ship);
    }

    return true;
  }
}
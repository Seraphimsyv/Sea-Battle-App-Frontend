type Ship = {
  status: 1 | 0;
  col: number;
  row: number;
}

export class GameService {
  public readonly ships : Ship[] = [];

  addShip(ship: Ship) : boolean {

    this.ships.forEach(el => {
      if (
          el.col === ship.col ||
          el.col === ship.col + 1 ||
          el.col === ship.col - 1
      ) {
        return false;
      }

      if (
        el.row === ship.row ||
        el.row === ship.row + 1 ||
        el.row === ship.row - 1
      ) {
        return false;
      }
    })

    return true;
  }
}
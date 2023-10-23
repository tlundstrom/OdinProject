import Ship from "./Ship";

const boardSize = 10;

class Gameboard {
  board: Ship[][] | null[][];
  misses: boolean[][];
  constructor() {
    this.board = [];
    this.misses = [];
    this.init();
  }

  init() {
    for (let i = 0; i < boardSize; i++) {
      this.board[i] = [];
      this.misses[i] = [];
      for (let j = 0; j < boardSize; j++) {
        this.board[i][j] = null;
        this.misses[i][j] = false;
      }
    }
  }

  place(ship: Ship, y: number, x: number, vert: boolean) {
    if (!this.isPossible(ship, y, x, vert)) return false;

    if (vert) {
      for (let i = 0; i < ship.length; i++) {
        this.board[y + i][x] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i] = ship;
      }
    }
    return true;
  }

  randomize() {
    if (!this.isEmpty()) return;

    const ships = [];
    const carrier = new Ship("carrier");
    const battleship = new Ship("battleship");
    const cruiser = new Ship("cruiser");
    const submarine = new Ship("submarine");
    const destroyer = new Ship("destroyer");
    ships.push(carrier, battleship, cruiser, submarine, destroyer);

    let placements = 0;

    const random = () => {
      return Math.floor(Math.random() * 10);
    };

    while (placements < 5) {
      const y = random();
      const x = random();
      const vert = !!(random() % 2);

      if (this.place(ships[placements], y, x, vert)) placements++;
    }
  }

  isPossible(ship: Ship, row: number, column: number, vert: boolean) {
    if (row < 0 || row > boardSize - 1 || column < 0 || column > boardSize - 1) return false;

    if (vert) {
      if (row + ship.length > boardSize) return false;
    } else {
      if (column + ship.length > boardSize) return false;
    }

    if (vert) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][column]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][column + i]) return false;
      }
    }

    if (vert) {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (row + x + i < 0 || row + x + i >= boardSize || column + y < 0 || column + y >= boardSize) continue;
            if (this.board[row + x + i][column + y]) return false;
          }
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (row + x < 0 || row + x >= boardSize || column + y + i < 0 || column + y + i >= boardSize) continue;
            if (this.board[row + x][column + y + i]) return false;
          }
        }
      }
    }
    return true;
  }

  handleAttack(row: number, column: number) {
    if (row < 0 || row >= boardSize || column < 0 || column >= boardSize) {
      return false;
    }

    if (this.board[row][column]) {
      let hitIndex = 0;
      // is vertical
      if (column > 0 && this.board[row][column - 1]) {
        let i = 1;
        while (column - i >= 0 && this.board[row][column - i]) {
          hitIndex++;
          i++;
        }
      } else if (row > 0 && this.board[row - 1][column]) {
        let i = 1;
        while (row - i >= 0 && this.board[row - i][column]) {
          hitIndex++;
          i++;
        }
      }
      this.board[row][column]?.hit(hitIndex);
      return true;
    } else {
      this.misses[row][column] = true;
      return false;
    }
  }

  handleGameOver() {
    let isBoardEmpty = true;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j]) {
          isBoardEmpty = false;
          if (!this.board[i][j]?.isSunk()) {
            return false;
          }
        }
      }
    }
    console.log(isBoardEmpty);
    return isBoardEmpty ? false : true;
  }

  isEmpty() {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (this.board[i][j] !== null) return false;
      }
    }
    return true;
  }

  getEmptyFieldsAmount() {
    let result = 0;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (this.board[i][j] === null) result++;
      }
    }
    return result;
  }
}

export default Gameboard;

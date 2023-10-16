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

  place(ship: Ship, row: number, col: number, vert: boolean) {
    if (!this.isPossible(ship, row, col, vert)) return false;

    if (vert) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship;
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
      const row = random();
      const col = random();
      const vert = !!(random() % 2);

      if (this.place(ships[placements], row, col, vert)) placements++;
    }
  }

  isPossible(ship: Ship, row: number, col: number, vert: boolean) {
    if (row < 0 || row > boardSize - 1 || col < 0 || col > boardSize - 1) return false;

    if (vert) {
      if (row + ship.length > boardSize) return false;
    } else {
      if (col + ship.length > boardSize) return false;
    }

    if (vert) {
      for (let i = 0; i < Ship.length; i++) {
        if (this.board[row + i][col]) return false;
      }
    } else {
      for (let i = 0; i < Ship.length; i++) {
        if (this.board[row][col + i]) return false;
      }
    }

    if (vert) {
      for (let i = 0; i < Ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (row + x + i < 0 || row + x + i >= boardSize || col + y < 0 || col + y >= boardSize) continue;
            if (this.board[row + x + i][col + y]) return false;
          }
        }
      }
    } else {
      for (let i = 0; i < Ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (row + x < 0 || row + x >= boardSize || col + y + i < 0 || col + y + i >= boardSize) continue;
            if (this.board[row + x][col + y + i]) return false;
          }
        }
      }
    }
    return true;
  }

  handleAttack(row: number, col: number) {
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
      return false;
    }

    if (this.board[row][col]) {
      let hitIndex = 0;
      if (col > 0 && this.board[row][col - 1]) {
        let i = 1;
        while (col - i >= 0 && this.board[row][col - i]) {
          hitIndex++;
          i++;
        }
      } else if (row > 0 && this.board[row - 1][col]) {
        let i = 1;
        while (row - i >= 0 && this.board[row - i][col]) {
          hitIndex++;
          i++;
        }
      }
      this.board[row][col]?.hit(hitIndex);
      return true;
    } else {
      this.misses[row][col] = true;
      return false;
    }
  }

  handleGameOver() {
    let isBoardEmpty = true;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (this.board[i][j]) {
          isBoardEmpty = false;
          if (!this.board[i][j]?.isSunk()) {
            return false;
          }
        }
      }
    }
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

interface IShipLengths {
  carrier: number;
  battleship: number;
  cruiser: number;
  submarine: number;
  destroyer: number;
}

const shipLengths: IShipLengths = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

class Ship {
  length: number;
  hits: number[];
  sunk: boolean;
  id: string;
  constructor(type: string) {
    this.length = shipLengths[type as keyof IShipLengths];
    this.hits = [];
    this.sunk = false;
    this.id = type;
  }

  hit(position: number) {
    if (this.hits.includes(position) || position < 0 || position > this.length) return;
    this.hits.push(position);
  }
  isSunk() {
    return (this.sunk = this.hits.length === this.length);
  }
}

export default Ship;

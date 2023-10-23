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
  name: string;
  constructor(name: string) {
    this.length = shipLengths[name as keyof IShipLengths];
    this.hits = [];
    this.sunk = false;
    this.name = name;
  }

  hit(position: number) {
    console.log(position);
    if (this.hits.includes(position) || position < 0 || position > this.length) return;
    this.hits.push(position);
  }
  isSunk() {
    return (this.sunk = this.hits.length === this.length);
  }
}

export default Ship;

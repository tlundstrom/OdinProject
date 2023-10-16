import Gameboard from "./Gameboard";

class Player {
  name: string;
  hits: number[][];
  constructor(name: string) {
    this.name = name;
    this.hits = [];
  }

  attack(xpos: number, ypos: number, gameboard: Gameboard) {
    if (this.hasHit(xpos, ypos)) return;

    this.hits.push([xpos, ypos]);
    gameboard.handleAttack(xpos, ypos);
  }

  cpuAttack(gameboard: Gameboard) {
    if (this.hits.length === 100) return;

    let xpos = Math.floor(Math.random() * 10);
    let ypos = Math.floor(Math.random() * 10);

    while (this.hasHit(xpos, ypos)) {
      xpos = Math.floor(Math.random() * 10);
      ypos = Math.floor(Math.random() * 10);
    }
    this.hits.push([xpos, ypos]);
    gameboard.handleAttack(xpos, ypos);
  }

  hasHit(xpos: number, ypos: number) {
    for (let i = 0; i < this.hits.length; i++) {
      if (this.hits[i][0] === xpos && this.hits[i][1] === ypos) return true;
    }
    return false;
  }
}

export default Player;

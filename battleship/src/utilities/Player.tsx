import Gameboard from "./Gameboard";

import { smartAttack, pushToStackonHit } from "./battleshipAI";

class Player {
  name: string;
  hits: number[][];
  seekmode: boolean;
  constructor(name: string) {
    this.name = name;
    this.hits = [];
    this.seekmode = true;
  }

  attack(xpos: number, ypos: number, gameboard: Gameboard) {
    if (this.hasHit(xpos, ypos)) return;

    this.hits.push([xpos, ypos]);
    gameboard.handleAttack(xpos, ypos);
  }

  cpuAttack(gameboard: Gameboard) {
    if (this.hits.length === 100) return;

    let attackCoods = smartAttack(this.seekmode);
    let xpos = attackCoods[0];
    let ypos = attackCoods[1];

    this.hits.push([xpos, ypos]);
    if (gameboard.handleAttack(xpos, ypos)) {
      this.seekmode = false;
      pushToStackonHit(xpos, ypos);
    }
  }

  hasHit(xpos: number, ypos: number) {
    for (let i = 0; i < this.hits.length; i++) {
      if (this.hits[i][0] === xpos && this.hits[i][1] === ypos) return true;
    }
    return false;
  }
}

export default Player;

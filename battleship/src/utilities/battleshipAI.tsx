export const SeekStack: number[][] = [];
export const PreviousMoves = new Map();
const huntStack: number[][] = [];

export const createSeekStack = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if ((i + j) % 2 === 1) {
        SeekStack.push([i, j]);
      }
    }
  }
};

const randomIndex = (array: number[][]) => {
  return Math.floor(Math.random() * array.length);
};

export function pushToStackonHit(xpos: number, ypos: number) {
  if (xpos - 1 > -1) huntStack.push([xpos - 1, ypos]);
  if (xpos + 1 < 10) huntStack.push([xpos + 1, ypos]);
  if (ypos - 1 > -1) huntStack.push([xpos, ypos - 1]);
  if (ypos + 1 < 10) huntStack.push([xpos, ypos + 1]);
}

export const smartAttack = (seekmode: boolean): number[] => {
  if (huntStack.length === 0) seekmode = true;
  if (seekmode) return SeekAttack();
  return HuntAttack();
};
const SeekAttack = (): number[] => {
  let index = randomIndex(SeekStack);
  let coords = SeekStack[index];
  if (PreviousMoves.has(coords.toString())) {
    SeekStack.splice(index, 1);
    coords = SeekAttack();
  }
  SeekStack.splice(index, 1);
  PreviousMoves.set(coords.toString(), null);
  return coords;
};

export const HuntAttack = (): number[] => {
  if (huntStack.length === 0) return smartAttack(true);
  let index = randomIndex(huntStack);
  let coords = huntStack[index] as number[];
  if (PreviousMoves.has(coords.toString())) {
    huntStack.splice(index, 1);
    coords = HuntAttack();
  }

  PreviousMoves.set(coords.toString(), null);
  huntStack.splice(index, 1);
  return coords;
};

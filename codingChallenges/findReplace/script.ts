const s: string = "abcd";
const indices: number[] = [0, 2];
const sources: string[] = ["a", "cd"];
const targets: string[] = ["eee", "ffff"];

const findReplaceString = (s: string, indices: number[], sources: string[], targets: string[]): string => {
  let result: string[] = s.split("");

  for (let i = 0; i < indices.length; i++) {
    const index: number = indices[i];
    const source: string = sources[i];
    const target: string = targets[i];
    const substring: string = s.substring(index, index + source.length);

    if (substring === source) {
      result[index] = target;
      for (let j = index + 1; j < source.length + index; j++) {
        result[j] = "";
      }
    }
  }

  return result.join("");
};

console.log(findReplaceString(s, indices, sources, targets));

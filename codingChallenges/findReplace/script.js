const findReplaceString = function (s, indices, sources, targets) {
  let result = s.split("");

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    const source = sources[i];
    const target = targets[i];
    const substring = s.substring(index, index + source.length);
    if (substring === source) {
      result[index] = target;
      for (let j = index + 1; j < source.length + index; j++) {
        result[j] = null;
      }
    }
  }
  return result.filter((res) => res !== null).join("");
};

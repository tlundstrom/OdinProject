const distinctNames = (ideas) => {
  let nameCount = 0;
  const ideasSet = new Set();
  const combinationCount = [];
  const a = "a".charCodeAt(0);
  ideas.forEach((idea) => ideasSet.add(idea));

  for (let i = 0; i < 26; i++) combinationCount[i] = new Array(26).fill(0);

  ideas.forEach((idea) => {
    let charNumber = idea.charCodeAt(0) - a;
    for (let offset = 0; offset < 26; offset++) {
      let newIdea = String.fromCharCode(offset + a) + idea.slice(1);
      if (!ideasSet.has(newIdea)) {
        combinationCount[charNumber][offset]++;
        nameCount += combinationCount[offset][charNumber];
      }
    }
  });
  return nameCount * 2;
};

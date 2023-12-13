const arrayStringsAreEqual = (word1, word2) => {
  let word1Pointer = 0,
    word2Pointer = 0,
    string1Pointer = 0,
    string2Pointer = 0;
  while (word1Pointer < word1.length && word2Pointer < word2.length) {
    if (word1[word1Pointer][string1Pointer] !== word2[word2Pointer][string2Pointer]) return false;

    incrementArrayResetString(string1Pointer, word1Pointer, word1);
    incrementArrayResetString(string2Pointer, word2Pointer, word2);
  }
  return word1Pointer === word1.length && word2Pointer === word2.length;
};

const incrementArrayResetString = (stringPointer, wordPointer, word) => {
  stringPointer++;
  if (stringPointer == word[wordPointer].length) {
    stringPointer = 0;
    wordPointer++;
  }
};

var isMatch = function (inputString, pattern) {
  const dynamicTable = Array.from({ length: inputString.length + 1 }, () => Array(pattern.length + 1).fill(false));

  dynamicTable[0][0] = true;

  for (let i = 0; i <= inputString.length; ++i) {
    for (let j = 1; j <= pattern.length; ++j) {
      if (pattern[j - 1] === "*") {
        dynamicTable[i][j] = dynamicTable[i][j - 2];
        if (i && (pattern[j - 2] === "." || pattern[j - 2] === inputString[i - 1])) {
          dynamicTable[i][j] = dynamicTable[i][j] || dynamicTable[i - 1][j];
        }
      } else if (i && (pattern[j - 1] === "." || pattern[j - 1] === inputString[i - 1])) {
        dynamicTable[i][j] = dynamicTable[i - 1][j - 1];
      }
    }
  }
  return dynamicTable[inputString.length][pattern.length];
};

isMatch("ab", ".*");

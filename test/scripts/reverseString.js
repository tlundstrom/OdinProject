const reverseString = (string) => {
  let strArr = string.split("");
  strArr.reverse();
  return strArr.join("");
};

module.exports = { reverseString };

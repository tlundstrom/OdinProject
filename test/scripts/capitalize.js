const capitalize = (string) => {
  let char = string.substring(0, 1).toUpperCase();
  let newString = string.slice(1);
  return char + newString;
};

capitalize("taco");

module.exports = { capitalize };

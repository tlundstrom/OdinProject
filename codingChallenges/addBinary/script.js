var addBinary = function (a, b) {
  let pointerA = a.length - 1;
  let pointerB = b.length - 1;
  let carryOver = 0;
  let Zero = "0".charCodeAt(0);
  let result = [];

  while (pointerA >= 0 || pointerB >= 0 || carryOver > 0) {
    if (pointerA >= 0) {
      carryOver += a[pointerA].charCodeAt(0) - Zero;
      pointerA--;
    }
    if (pointerB >= 0) {
      carryOver += b[pointerB].charCodeAt(0) - Zero;
      pointerB--;
    }

    result.push(carryOver % 2);
    carryOver = Math.floor(carryOver / 2);
  }

  return result.reverse().join("");
};

console.log(addBinary("1010", "1011"));

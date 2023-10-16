const caesarCipher = {
  encode: (string, amount) => {
    if (amount < 0) return caesarCipher.encode(string, amount + 26);

    let output = "";

    for (let i = 0; i < string.length; i++) {
      let char = string[i];

      if (char.match(/[a-z]/i)) {
        let ascii = string.charCodeAt(i);

        if (ascii >= 65 && ascii <= 90) {
          char = String.fromCharCode(((ascii - 65 + amount) % 26) + 65);
        } else if (ascii >= 97 && ascii <= 122) {
          char = String.fromCharCode(((ascii - 97 + amount) % 26) + 97);
        }
      }
      output += char;
    }
    return output;
  },
  decode: (string, amount) => {
    if (amount < 0) return caesarCipher.decode(string, amount + 26);
    amount = 26 - amount;

    let output = "";

    for (let i = 0; i < string.length; i++) {
      let char = string[i];

      if (char.match(/[a-z]/i)) {
        let ascii = string.charCodeAt(i);

        if (ascii >= 65 && ascii <= 90) {
          char = String.fromCharCode(((ascii - 65 + amount) % 26) + 65);
        } else if (ascii >= 97 && ascii <= 122) {
          char = String.fromCharCode(((ascii - 97 + amount) % 26) + 97);
        }
      }
      output += char;
    }
    return output;
  },
};

module.exports = { caesarCipher };

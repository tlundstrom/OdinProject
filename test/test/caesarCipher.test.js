const { text } = require("@fortawesome/fontawesome-svg-core");
const { caesarCipher } = require("../scripts/caesarCipher");

describe("Caesar Cipher", () => {
  test("Shift By 3 ", () => {
    expect(caesarCipher.encode("cat", 3)).toBe("fdw");
  });
  test("Deshift by 3 ", () => {
    expect(caesarCipher.decode("fdw", 3)).toBe("cat");
  });
});

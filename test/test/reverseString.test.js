const { reverseString } = require("../scripts/reverseString");

describe("reverseString", () => {
  test("String should reverse ", () => {
    expect(reverseString("thomas")).toBe("samoht");
  });
});

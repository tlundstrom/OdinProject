const { capitalize } = require("../scripts/capitalize");

describe("capitalize", () => {
  test("Name ", () => {
    expect(capitalize("thomas")).toBe("Thomas");
  });
});

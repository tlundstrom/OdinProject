const { calculator } = require("../scripts/calculator");

describe("calculator", () => {
  test("Add ", () => {
    expect(calculator.add(1, 2)).toBe(3);
  });
  test("Subtract ", () => {
    expect(calculator.subtract(3, 1)).toBe(2);
  });

  test("Multiply ", () => {
    expect(calculator.multiply(5, 5)).toBe(25);
  });

  test("Divide ", () => {
    expect(calculator.divide(10, 2)).toBe(5);
  });

  test("Divide By Zeor ", () => {
    expect(calculator.divide(10, 0)).toBe("Error");
  });
});

const removeComments = (code) => {
  code
    .join("\n")
    .replace(/\/\/.*|\/\*(.|\n)*?\*\//g, "")
    .split("\n")
    .filter((lines) => lines !== "");
};

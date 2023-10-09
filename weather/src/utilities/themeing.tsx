export const setNightMode = () => {
  document.querySelector("body")?.setAttribute("data-theme", "night");
  console.log("night");
};
export const setDayMode = () => {
  document.querySelector("body")?.setAttribute("data-theme", "day");
  console.log("day");
};

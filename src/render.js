import i18next from "i18next";
const render = (a) => {
  console.log("\x1B[1;31m%s\x1B[0m", "Correct the errors:"),
    a.forEach((a, b) => console.log(`${b + 1}. ${i18next.t(a.id, a.values)}`));
};
export default render;

import i18next from "i18next";
import en from "./locales/en.js";
import runTests from "./tests.js";
import render from "./render.js";
const [, , PROJECT_PATH, LANG = "en"] = process.argv,
  app = async (a, b) => {
    await i18next.init({ lng: b, resources: { en } });
    try {
      const b = await runTests(a);
      b.length && (render(b), process.exit(1));
    } catch (a) {
      console.log(a);
    }
  };
app(PROJECT_PATH, LANG);

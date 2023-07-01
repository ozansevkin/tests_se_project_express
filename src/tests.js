import path from "path";
import { mkfile, mkdir } from "@hexlet/immutable-fs-trees";
import {
  checkStructure,
  checkDependencies,
  checkPackageFieldsFilled,
  checkEslintExecuting,
  checkEslintConfig,
} from "./lib.js";
const runTests = async (a) => {
  const b = mkdir("project", [
      mkfile("package.json"),
      mkfile(".editorconfig"),
      mkfile(".gitignore"),
      mkfile("README.md"),
      mkdir("controllers"),
      mkdir("middlewares"),
      mkdir("routes"),
      mkdir("models"),
      mkdir("utils"),
    ]),
    c = checkStructure(a, b);
  if (c.length) return c;
  const d = (
    await Promise.all([
      await checkDependencies(path.join(a, "package.json"), {
        devDependencies: [
          "eslint",
          "eslint-config-airbnb-base",
          "eslint-plugin-import",
          "nodemon",
        ],
        dependencies: [
          "express",
          "mongoose",
          "validator",
          "bcryptjs",
          "jsonwebtoken",
        ],
      }),
      checkPackageFieldsFilled(path.join(a, "package.json"), [
        "name",
        "author",
      ]),
      checkEslintConfig(a),
      checkEslintExecuting(a),
    ])
  ).flat();
  return d;
};
export default runTests;

import "dotenv/config";
import fs from "fs";
import path from "path";
import dirTree from "directory-tree";
import { isDirectory } from "@hexlet/immutable-fs-trees";
import shell from "shelljs";
import waitPort from "wait-port";
import has from "has";
import { getData, getFileData } from "./utils.js";
const checkStructure = (a, b) => {
    const c = dirTree(a, { attributes: ["type"] }),
      d = (a, b) => {
        const c = a.reduce((a, c) => {
          const e = b.find(
            ({ name: a, type: b }) => c.name === a && c.type === b
          );
          return e
            ? isDirectory(c) && e
              ? [...a, ...d(c.children, e.children)]
              : a
            : [
                ...a,
                { id: "structure", values: { type: c.type, name: c.name } },
              ];
        }, []);
        return c;
      };
    return d(b.children, c.children);
  },
  checkDependencies = async (a, b) => {
    const c = getData(a),
      d = [
        { items: Object.keys(c.dependencies), type: "dependencies" },
        { items: Object.keys(c.devDependencies), type: "devDependencies" },
      ];
    return d.reduce((a, { items: c, type: d }) => {
      const e = b[d]
        .filter((a) => !c.includes(a))
        .map((a) => ({
          id: "dependency.required",
          values: { type: d, name: a },
        }));
      return [...a, ...e];
    }, []);
  },
  checkPackageFieldsFilled = (a, b) => {
    const c = getData(a);
    return b
      .filter((a) => !c[a])
      .map((a) => ({ id: "packageSettings", values: { name: a } }));
  },
  checkEslintExecuting = (a) => {
    const { stdout: b, code: c } = shell.exec(
      'npx eslint --quiet --ignore-pattern "tests_se_project_express/*" .',
      { silent: !0, async: !1, cwd: a }
    );
    return 0 === c ? [] : [{ id: "eslint", values: { errors: b } }];
  },
  checkEslintConfig = (a) => {
    const b = [".eslintrc.js", ".eslintrc.json", ".eslintrc"]
      .map((b) => path.resolve(a, b))
      .find((a) => fs.existsSync(a));
    if (!b)
      return [
        {
          id: "structure",
          values: { type: "file", name: ".eslintrc.js or .eslintrc.json" },
        },
      ];
    const c = getFileData(b),
      d = [
        { option: "extends", name: "airbnb-base" },
        {
          option: "rules",
          name: "no-underscore-dangle",
          value: '["error",{"allow":["_id"]}]',
        },
      ]
        .filter(({ name: a }) => !c.includes(a))
        .map(({ option: a, name: b, value: c }) => ({
          id: `eslintrc.${a}`,
          values: { name: b, value: c },
        }));
    return d;
  };
export {
  checkStructure,
  checkDependencies,
  checkPackageFieldsFilled,
  checkEslintExecuting,
  checkEslintConfig,
};

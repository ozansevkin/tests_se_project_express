import fs from "fs";
import path from "path";
const parsers = { json: JSON.parse },
  getFormat = (a) => path.extname(a).slice(1),
  parse = (a, b) => parsers[b](a),
  getFileData = (a) => fs.readFileSync(a, "utf8"),
  getData = (a) => parse(getFileData(a, "utf-8"), getFormat(a));
export { getFileData, getData };

// ratio.js：算比例（一次扫描，每行只判一次）
import { isComment } from "./judge.js";

function noLinesError() {
  const error = new Error("no lines to scan");
  error.code = "E_NO_LINES";
  return error;
}

export function commentRatio(lines, mark) {
  if (!Array.isArray(lines) || lines.length === 0) throw noLinesError();

  const count = lines.length;
  const flags = new Array(count);
  let comments = 0;
  let blanks = 0;

  for (let i = 0; i < count; i += 1) {
    const flag = isComment(lines[i], mark);
    flags[i] = flag;
    if (flag) comments += 1;
    else if (String(lines[i]).trim().length === 0) blanks += 1;
  }

  const basis_points = Math.floor((comments * 10000) / count);

  return { flags, comments, blanks, basis_points };
}

// ratio.js：算比例（一次扫描，每行只判一次；整数除法求万分比）
import { isComment } from "./judge.js";

export function commentRatio(lines, mark) {
  const total = lines.length;
  if (total === 0) {
    const error = new Error("no lines to check");
    error.code = "E_NO_LINES";
    throw error;
  }
  const flags = new Array(total);
  let comments = 0;
  let blanks = 0;
  for (let index = 0; index < total; index += 1) {
    const line = lines[index];
    const flag = isComment(line, mark);
    flags[index] = flag;
    if (flag) {
      comments += 1;
    } else if (String(line).trim() === "") {
      blanks += 1;
    }
  }
  const basis_points = Math.floor((comments * 10000) / total);
  return { flags, comments, blanks, basis_points };
}

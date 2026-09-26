// ratio.js：算比例（基线：一律给零）
import { isComment } from "./judge.js";

export function commentRatio(lines, mark) {
  return { flags: [], comments: 0, blanks: 0, basis_points: 0 };
}

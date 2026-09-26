// app.js：渲染结果
import { isComment } from "./judge.js";
import { commentRatio } from "./ratio.js";

export function render(spec) {
  const lines = spec.lines || [];
  const mark = spec.mark || "#";
  const view = commentRatio(lines, mark);
  const flags = view.flags || [];
  return { flags: flags, comments: view.comments || 0, blanks: view.blanks || 0,
           basis_points: view.basis_points || 0, count: flags.length,
           checked: flags.length === lines.length };
}

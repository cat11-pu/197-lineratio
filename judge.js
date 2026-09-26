// judge.js：判一行
// 去掉行首空白后以标记开头算注释行；整行空白算空行，不算注释行；
// 标记出现在行中间不算。
export function isComment(line, mark) {
  const stripped = String(line).replace(/^\s+/, "");
  if (stripped.length === 0) return false;
  return stripped.startsWith(mark);
}

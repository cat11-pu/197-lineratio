// judge.js：判一行（去掉行首空白后以标记开头算注释行；整行空白算空行）
export function isComment(line, mark) {
  const trimmed = String(line).replace(/^\s+/, "");
  if (trimmed === "") return false;
  return trimmed.startsWith(mark);
}

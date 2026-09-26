// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let mark = spec.mark || "#";
  parts.log.textContent = "行数 " + (spec.lines || []).length + "，标记 " + mark + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { mark: mark }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.lines || []).forEach(function (line, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spot + 1) + ".";
      row.appendChild(head);
      const mark2 = document.createElement("span");
      mark2.className = "chip" + (view.flags[spot] ? " ok" : "");
      mark2.textContent = view.flags[spot] ? "注释行" : (line === "" ? "空行" : "代码行");
      row.appendChild(mark2);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "注释行 " + view.comments + " 行，空行 " + view.blanks + " 行，比例万分之 "
      + view.basis_points;
    parts.log.textContent = "是否逐行判过 " + view.checked;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "统计比例";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一条代码行";
  addButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).concat(["value = 1"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一行";
  dropButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一行";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "# note";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { lines: (spec.lines || []).concat([box.value]) }));
      parts.out.textContent = "加入这行后注释行 " + view.comments + " 行";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看比例";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { mark: mark }));
    parts.out.textContent = "万分之 " + view.basis_points + "，注释行 " + view.comments + " 行";
  });
  parts.controls.appendChild(readButton);

  draw();
}

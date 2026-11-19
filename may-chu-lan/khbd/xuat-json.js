/* Xuất nội dung 31 bài AI (ai-12-tiet/lan/*) ra JSON để tao-khbd.py dựng kế hoạch bài dạy. Chạy: node xuat-json.js > bai.json */
const fs = require("fs"), path = require("path"), vm = require("vm");
const LAN = path.join(__dirname, "..", "..", "ai-12-tiet", "lan");
const cut = (s, a, b) => { const i = s.indexOf(a); if (i < 0) return ""; const j = b ? s.indexOf(b, i) : -1; return s.slice(i, j < 0 ? undefined : j); };
const lab = fs.readFileSync(path.join(__dirname, "..", "lop", "mophong.js"), "utf8");
const LABS = vm.runInNewContext("(" + cut(lab, "const LABS=", "Object.keys(LABS)").slice(11).trim().replace(/;$/, "") + ")");
const out = fs.readdirSync(LAN).filter(d => /^ai\d-bai\d+$/.test(d)).map(dir => {
  const n = fs.readFileSync(path.join(LAN, dir, "noidung.js"), "utf8"), m = fs.readFileSync(path.join(LAN, dir, "mophong.js"), "utf8");
  const sb = {}; vm.runInNewContext(cut(n, "const BAI=", "\n") + "\n" + cut(n, "const STEPS=", "\nconst DECL") + "\n" + cut(n, "const GHIBAI=", "\nfunction renderGhiBai") + "\nthis.B={BAI,STEPS,GHIBAI};", sb);
  const simT = {}; m.replace(/\n\s*([a-zA-Z0-9_]+)\(\)\{[\s\S]*?_shell\('([^']*)'/g, (_, k, t) => { if (!simT[k]) simT[k] = t; });
  const B = sb.B; B.dir = dir;
  B.STEPS.forEach(s => (s.qs || []).forEach(q => { if (q.type === "sim") { const L = LABS[q.sim.replace(/^lab_/, "")]; q.title = q.sim.startsWith("lab_") && L ? "Phòng thí nghiệm mở rộng: " + L.t + " (" + L.u + ")" : "Mô phỏng: " + (simT[q.sim] || q.sim); } }));
  return B;
});
process.stdout.write(JSON.stringify(out));

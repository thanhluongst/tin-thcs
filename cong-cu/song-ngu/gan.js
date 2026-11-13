/* Gắn công tắc Tiếng Việt | English cho MỘT hoạt động của bài, theo bản dịch cong-cu/song-ngu/en/<thư-mục-bài>.json
   Chạy:  node cong-cu/song-ngu/gan.js            (tất cả các bài có bản dịch)
          node cong-cu/song-ngu/gan.js tin6-internet
   JSON: {"task": "<id câu hỏi đầu tiên trong hoạt động>", "tag": "<HTML tiêu đề EN>", "reading": "<HTML lời dẫn EN>",
          "tasks": {"<id>": {label, q, k, cats, items, o, opts, ph}}}
   Chạy lại nhiều lần được (thay khối cũ). */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const V = 12;
const only = process.argv[2];
/* en/<bài>.json (một bài) hoặc en/_<nhóm>.json ({"<bài>": {...}, ...} nhiều bài) */
const ENTRIES = [];
for (const f of fs.readdirSync(path.join(__dirname, "en")).filter(f => f.endsWith(".json"))) {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, "en", f), "utf8"));
  if (f.startsWith("_")) Object.keys(j).forEach(k => ENTRIES.push([k, j[k]])); else ENTRIES.push([f.replace(/\.json$/, ""), j]);
}
/* gộp các mục trùng tên bài (ví dụ _more.json chỉ chứa "more") */
const MERGED = {};
ENTRIES.forEach(([k, v]) => { MERGED[k] = Object.assign(MERGED[k] || {}, v); });
const files = Object.entries(MERGED).filter(([k, v]) => v.task && (!only || k === only));
function attr(s){ return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
let ok = 0;
for (const [lesson, d] of files) {
  const ix = path.join(ROOT, lesson, "index.html");
  let h = fs.readFileSync(ix, "utf8");
  const id = "sn-" + d.task;
  /* 1. tìm hoạt động chứa câu hỏi */
  const ti = h.indexOf('data-task="' + d.task + '"'); if (ti < 0) { console.log("!! " + lesson + ": không thấy " + d.task); continue; }
  const ai = Math.max(h.lastIndexOf('<div class="act"', ti), h.lastIndexOf('<div class="act ', ti)), ae = h.indexOf(">", ai);
  let open = h.slice(ai, ae);
  if (!/data-sn-hd=/.test(open)) open += ' data-sn-hd="' + id + '"';
  h = h.slice(0, ai) + open + h.slice(ae);
  /* 2. tiêu đề và lời dẫn */
  const body0 = h.indexOf(">", ai) + 1, ti2 = h.indexOf('data-task="' + d.task + '"');
  let seg = h.slice(body0, ti2);
  seg = seg.replace(/<div class="act-tag">(?:<span data-en="[^"]*">)?([\s\S]*?)(?:<\/span>)?<\/div>/, (m, inner) =>
    '<div class="act-tag"><span data-en="' + attr(d.tag) + '">' + inner + '</span></div>');
  if (d.reading) seg = seg.replace(/<div class="reading"(?: data-en="[^"]*")?>/, '<div class="reading" data-en="' + attr(d.reading) + '">');
  h = h.slice(0, body0) + seg + h.slice(ti2);
  /* các đoạn đọc tiếp theo trong cùng hoạt động (d.more theo thứ tự) */
  if (d.more && d.more.length) {
    const ti3 = h.indexOf('data-task="' + d.task + '"');
    let end = h.indexOf('\n      <div class="act', ti3); const sec = h.indexOf("</section>", ti3); if (end < 0 || sec < end) end = sec;
    const rd0 = h.indexOf('<div class="reading"', body0); /* đoạn đầu (đã gắn ở trên) */
    const start = rd0 >= 0 && rd0 < ti3 ? rd0 + 20 : ti3;
    let k = 0, rest = h.slice(start, end);
    rest = rest.replace(/<div class="reading"(?: data-en="[^"]*")?>/g, m => k < d.more.length ? '<div class="reading" data-en="' + attr(d.more[k++]) + '">' : m);
    h = h.slice(0, start) + rest + h.slice(end);
  }
  /* 3. nạp song-ngu.js ngay sau content.js + gọi hoatDong */
  h = h.replace(/\n?<!--SN-->[\s\S]*?<!--\/SN-->/, "").replace(/\n<script src="\.\.\/chung\/song-ngu\.js\?v=\d+"><\/script>\n<script>SongNgu\.hoatDong\([\s\S]*?\);<\/script>/, "");
  const call = '\n<!--SN--><script src="../chung/song-ngu.js?v=' + V + '"></script>\n<script>SongNgu.hoatDong(' + JSON.stringify({id, tasks: d.tasks, nx: d.nx || {}}) + ');</script><!--/SN-->';
  const cm = h.match(/<script src="content\.js\?v=\d+"><\/script>/); if (!cm) { console.log("!! " + lesson + ": không thấy content.js"); continue; }
  h = h.replace(cm[0], cm[0] + call);
  fs.writeFileSync(ix, h); ok++;
}
console.log("Đã gắn " + ok + "/" + files.length + " bài.");

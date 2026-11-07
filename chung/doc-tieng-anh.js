/* Đọc từ tiếng Anh: tìm các từ/cụm từ tiếng Anh (theo từ điển dưới đây) trong nội dung bài,
   gạch chân chấm chấm; học sinh bấm vào (hoặc Tab rồi Enter) để máy đọc bằng giọng tiếng Anh chuẩn.
   Dùng giọng đọc có sẵn trong trình duyệt (Web Speech API) – không cần mạng, không cần tệp âm thanh.
   Thêm từ riêng cho một bài: trong index.html, trước khi nạp tệp này, đặt
     window.TU_ANH_THEM = ["Mind map", "Flowgorithm"];            // đọc đúng như chữ
     window.TU_ANH_THEM = {"COUNTIF": "count if", "PhET": "fet"};  // chữ → cách đọc
   Tắt tính năng trên một trang: window.TU_ANH_TAT = true; */
(function(){
"use strict";
if (window.TU_ANH_TAT || !("speechSynthesis" in window)) return;

/* Từ điển: "chữ" hoặc "chữ=cách đọc". Không phân biệt hoa thường. Cụm dài được ưu tiên. */
var DS = [
  // Phần mềm, hệ điều hành, dịch vụ
  "Microsoft","Windows","Word","Excel","PowerPoint","Paint","Scratch","Python","Pascal","Google","Google Maps","Google Drive","Google Sheets","Google Docs",
  "Chrome","Firefox","Edge","Safari","Opera","Internet Explorer","File Explorer","Linux","Android","iOS=i O S","macOS=mac O S","Facebook","YouTube","Messenger","Instagram","TikTok=tik tok",
  "Gmail","Yahoo","Bing","Wikipedia","OneDrive","LibreOffice","Calc","Writer","Canva","GeoGebra","PhET=fet","Flowgorithm","MindMaple=mind maple","Photoshop","Windows Defender","Media Player",
  // Internet, mạng, thiết bị
  "Internet","web","website","webpage","online","offline","email","e-mail","mail","blog","blogger","vlogger","streamer","livestream","hyperlink","link","browser","search","download","upload",
  "Wi-Fi=wifi","WiFi=wifi","Bluetooth","modem","router","Access Point","laptop","tablet","smartphone","camera","webcam","micro=micro","printer","scanner","mouse","keyboard","monitor","speaker","USB=U S B",
  "virus","malware","spam","hacker","password","username","account","robot","game","video","online game","smart","Internet of Things","IoT=I O T","chip","transistor","pixel",
  "bit","byte","Kilobyte","Megabyte","Gigabyte","Terabyte","CPU=C P U","RAM","ROM","SSD=S S D","AI=A I","ISP=I S P","WWW=world wide web","World Wide Web",
  // Phím
  "Enter","Ctrl=control","Shift","Alt","Tab","Delete","Backspace","Esc=escape","Home","End","Page Up","Page Down","Caps Lock","Space","Print Screen",
  // Lệnh, thẻ, hộp thoại trong Word / PowerPoint / Excel
  "File","Home","Insert","Design","Layout","Page Layout","References","Review","View","Format","Data","Formulas","Animations","Transitions","Slide Show","Slide","Slides",
  "New","Open","Save","Save As","Print","Close","Copy","Cut","Paste","Undo","Redo","Find","Replace","Find and Replace","Select","Select All","Go To",
  "Font","Font Size","Bold","Italic","Underline","Paragraph","Alignment","Align Left","Align Right","Center","Justify","Line Spacing","Indent","Bullets","Numbering","Styles","Text Box",
  "Header","Footer","Header & Footer=header and footer","Page Number","Page Setup","Margins","Orientation","Portrait","Landscape","Size","Columns","Breaks",
  "Table","Insert Table","Merge Cells","Split Cells","Borders","Shading","Picture","Pictures","Shapes","Chart","SmartArt=smart art","WordArt=word art","Symbol","Equation",
  "Wrap Text","In Line with Text","Square","Tight","Behind Text","In Front of Text","Bring to Front","Send to Back","Bring Forward","Send Backward","Group","Arrange",
  "Themes","Theme","Template","Background","Format Background","Slide Master","Layout","Title","Title Slide","Content","Outline","Notes","Handouts","Preview","Apply","Apply to All",
  "Animation Pane","Effect Options","Duration","Delay","Start","On Click","With Previous","After Previous","Fade","Wipe","Fly In","Zoom","Transition",
  "Sheet","Worksheet","Workbook","Cell","Cells","Row","Rows","Column","Range","Sort","Filter","Sort & Filter=sort and filter","AutoFilter=auto filter","Data Validation","Validation","Error Alert","Input Message","Allow","List","Whole Number","Decimal",
  "Number","Number Format","Percentage","Currency","Date","Time","General","Text","Merge & Center=merge and center","AutoSum=auto sum","Fill","Fill Handle","Formula","Function",
  "Clustered Column","Pie","Line","Bar","Chart Title","Legend","Axis","Data Labels","Insert Function",
  "SUM=sum","AVERAGE=average","MAX=max","MIN=min","COUNT=count","IF=if","COUNTIF=count if","SUMIF=sum if",
  "OK=okay","Cancel","Yes","No","Next","Back","Help","Options","Settings","Tools","Setup","Install","Update","Rename","Folder","Desktop","Recycle Bin","Shut down","Restart","Log in","Log out","Sign in","Sign out",
  // Scratch, lập trình
  "Sprite","Sprites","Stage","Costume","Costumes","Backdrop","Code","Sounds","Events","Control","Motion","Looks","Sensing","Operators","Variables","My Blocks","Pen",
  "when green flag clicked","forever","repeat","repeat until","wait","wait until","if then","if then else","think","move","turn","go to","glide","ask and wait","answer","set","change","stop all",
  "Input","Output","Debug","Bug","Stop","Program","Algorithm","Flowchart","Mind map","Central Topic",
  // Cụm lệnh nhiều chữ hay gặp trong SGK (đọc trọn cụm)
  "Google Sheet","Format Cells","Chart Elements","Plain Number","Bottom of Page","Top of Page","Cover Page","Replace All","Find Next","Send Backward","New Slide","Close Header and Footer",
  "Header and Footer","Edit Header","Edit Footer","Shape Fill","Shape Outline","Shape Styles","Picture Border","Picture Styles","Number Filters","Text Filters","Data Tools","Windows Explorer","Windows Media Player",
  "New Folder","Bullets and Numbering","Numbering Library","Define New Bullet","Define New Number Format","Notes and Handouts","Print Selection","Print Active Sheets","Print Entire Workbook",
  "More Options","Label Options","Add Level","Delete Level","Increase List Level","Decrease List Level","Increase Indent","Decrease Indent","Title and Content","Insert Column","Insert Row","Insert Above","Insert Below",
  "Insert Left","Insert Right","Insert Video","Insert Hyperlink","Insert Picture","Insert Chart","Delete Rows","Delete Columns","Delete Cells","Delete Table","Split Table","Cell Size","Table Tools","Bar Chart",
  "Pie Chart","Line Chart","Area Chart","Column Chart","Doughnut Chart","Block Arrows","Slide Number","Date and Time","Font Color","Format Painter","Times New Roman","Local Disk","This PC","This Device",
  "Greater Than Or Equal To","Greater Than","Less Than","Largest to Smallest","Smallest to Largest","Operating System","Application Software","Access Point","Wireless Router","Internet Service Provider",
  "Lab Safety","Apply To All","Portrait Orientation","Safe To Remove Hardware","App Store","Google Play","Google Chrome","Mozilla Firefox","Microsoft Edge","Microsoft Word","Microsoft Excel","Microsoft PowerPoint",
  "Google Slides","Google Meet","Google Earth","Key Opinion Leader","Analytical Engine","Three Columns","Blank",
  // Màu
  "Red","Green","Blue","Cyan","Magenta","Yellow","RGB=R G B","CMYK=C M Y K"
];
var EXTRA = window.TU_ANH_THEM;
if (Array.isArray(EXTRA)) DS = DS.concat(EXTRA);
else if (EXTRA && typeof EXTRA === "object") Object.keys(EXTRA).forEach(function(k){ DS.push(k + "=" + EXTRA[k]); });

var SAY = {}, KEY = {}, words = [];
DS.forEach(function(s){ var i = s.indexOf("="), w = (i < 0 ? s : s.slice(0, i)).trim(); if (!w) return; var k = w.toLowerCase(); if (!(k in SAY)) { words.push(w); KEY[k] = w; } if (i >= 0) SAY[k] = s.slice(i + 1).trim(); else if (!(k in SAY)) SAY[k] = null; });
words.sort(function(a, b){ return b.length - a.length; });
function rx(w){ return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ +/g, "\\s+"); }
/* Ranh giới từ: không đứng liền chữ cái (kể cả chữ có dấu tiếng Việt), chữ số, dấu gạch dưới. */
var L = "A-Za-z0-9_\\u00C0-\\u024F\\u1E00-\\u1EFF";
var RE = new RegExp("(^|[^" + L + "])(" + words.map(rx).join("|") + ")(?![" + L + "])", "gi");

/* Không đụng vào các vùng tương tác: nút, ô nhập, mô phỏng phần mềm, mã lệnh… */
/* Từ ngắn (≤ 3 chữ) và chữ viết tắt in hoa phải đúng kiểu chữ, tránh nhầm với tiếng Việt: AI ≠ "ai", No ≠ "no". */
function strict(k, m){ var w = KEY[k.toLowerCase()] || k; if (w.length > 3 && !/^[A-Z]{2,}$/.test(w)) return true;
  return m === w || m === w.toUpperCase() || (!/[A-Z]/.test(w.slice(1)) && m === w.charAt(0).toUpperCase() + w.slice(1)); }
var BLOCK = ".act,.chieu,.zoom-ov,header.hero,section,.concept";

var SKIP = "script,style,textarea,input,select,option,button,a,code,pre,svg,canvas,[contenteditable],.ta-w,.bt,.vb,.tc,.tc-show,.scx,.mc,.tk,.sx,.tt,.hv,.toc,.pager,footer,.who,.join,.tools,.mode,.status,.no-ta,[data-no-ta]";
var ROOTS = "main,header.hero,.chieu,.zoom-ov";

function wrap(root){
  if (!root || root.nodeType !== 1 && root.nodeType !== 3) return;
  var host = root.nodeType === 3 ? root.parentNode : root;
  if (!host || !host.closest || !host.closest(ROOTS) || host.closest(SKIP)) return;
  var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: function(n){
    var p = n.parentNode; if (!p || !n.nodeValue || !/[A-Za-z]{2}/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
    /* Chữ nằm trực tiếp trong khung flex/grid (như tiêu đề bài) – bọc vào sẽ làm mất dấu cách */
    if (p.closest(SKIP) || /flex|grid/.test(getComputedStyle(p).display)) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT; }});
  var list = [], n; while ((n = tw.nextNode())) list.push(n);
  list.forEach(function(t){
    var s = t.nodeValue, m, last = 0, frag = null; RE.lastIndex = 0;
    /* Mỗi từ chỉ gạch chân lần xuất hiện đầu tiên trong một hoạt động/khối, cho đỡ rối mắt */
    var blk = t.parentNode.closest(BLOCK) || document.body, seen = blk._taSeen || (blk._taSeen = {});
    while ((m = RE.exec(s))) {
      var st = m.index + m[1].length, w = m[2], k = w.replace(/\s+/g, " ").toLowerCase();
      RE.lastIndex = st + w.length;
      if (!strict(k, w) || (seen[k] && seen[k].isConnected)) continue;
      frag = frag || document.createDocumentFragment();
      if (st > last) frag.appendChild(document.createTextNode(s.slice(last, st)));
      var sp = document.createElement("span"); sp.className = "ta-w"; sp.textContent = w;
      sp.setAttribute("role", "button"); sp.tabIndex = 0; sp.title = "Bấm để nghe đọc: " + w.replace(/\s+/g, " ");
      frag.appendChild(sp); seen[k] = sp; last = st + w.length;
    }
    if (!frag) return;
    if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
    t.parentNode.replaceChild(frag, t);
  });
}

/* Giọng đọc: ưu tiên giọng tự nhiên tiếng Anh – Mỹ, rồi Anh, rồi bất kì giọng tiếng Anh. */
var voice = null;
function pick(){
  var vs = speechSynthesis.getVoices() || [], en = vs.filter(function(v){ return /^en[-_]/i.test(v.lang) || /^en$/i.test(v.lang); });
  function f(re, lang){ return en.filter(function(v){ return re.test(v.name) && (!lang || v.lang.replace("_", "-").toLowerCase() === lang); })[0]; }
  voice = f(/natural|online|neural/i, "en-us") || f(/google/i, "en-us") || f(/aria|jenny|zira|samantha|david|mark/i, "en-us") || f(/./, "en-us") || f(/natural|google/i, "en-gb") || en[0] || null;
}
pick(); if (speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", pick); else speechSynthesis.onvoiceschanged = pick;

var cur = null, toastT = 0;
function toast(msg){
  var d = document.getElementById("ta-toast");
  if (!d) { d = document.createElement("div"); d.id = "ta-toast"; d.setAttribute("role", "status"); document.body.appendChild(d); }
  d.textContent = msg; d.hidden = false; clearTimeout(toastT); toastT = setTimeout(function(){ d.hidden = true; }, 4000);
}
function speak(sp){
  var w = sp.textContent.replace(/\s+/g, " ").trim(), k = w.toLowerCase(), say = SAY[k] || (/^[A-Z]{2,}$/.test(w) ? w.toLowerCase() : w);
  if (!voice) pick();
  if (!voice) { toast("Máy này chưa có giọng đọc tiếng Anh. Thầy cô cài thêm giọng English trong phần Cài đặt › Thời gian & ngôn ngữ › Giọng nói."); }
  speechSynthesis.cancel();
  if (cur) cur.classList.remove("ta-on");
  var u = new SpeechSynthesisUtterance(say);
  u.lang = voice ? voice.lang : "en-US"; if (voice) u.voice = voice;
  u.rate = sp._slow ? 0.55 : 0.85; u.pitch = 1;
  cur = sp; sp.classList.add("ta-on");
  u.onend = u.onerror = function(){ sp.classList.remove("ta-on"); if (cur === sp) cur = null; };
  /* Bấm lần 2 liền nhau vào cùng một từ → đọc chậm hơn để học sinh nghe rõ */
  var now = Date.now(); sp._slow = sp._t && now - sp._t < 2500 ? !sp._slow : false; sp._t = now;
  speechSynthesis.speak(u);
}
document.addEventListener("click", function(e){
  var sp = e.target.closest && e.target.closest(".ta-w"); if (!sp) return;
  e.preventDefault(); e.stopPropagation(); speak(sp);
}, true);
document.addEventListener("keydown", function(e){
  if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("ta-w")) { e.preventDefault(); speak(e.target); }
});

/* CSS */
var css = document.createElement("style");
css.textContent = ".ta-w{cursor:pointer;text-decoration:underline dotted;text-decoration-color:var(--accent,#0a7f7f);text-decoration-thickness:2px;text-underline-offset:3px;border-radius:4px;transition:background .15s}"
  + ".ta-w:hover{background:var(--accent-soft,#e3f4f4)}.ta-w:focus-visible{outline:2px solid var(--accent,#0a7f7f);outline-offset:1px}"
  + ".ta-w.ta-on{background:var(--accent,#0a7f7f);color:var(--accent-ink,#fff);text-decoration:none}"
  + ".ta-w.ta-on::after{content:\" 🔊\";font-size:.85em}"
  + "#ta-toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);max-width:min(92vw,520px);background:#222;color:#fff;padding:10px 14px;border-radius:10px;font-size:14px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.25)}"
  + "@media print{.ta-w{text-decoration:none}}";
document.head.appendChild(css);

/* Bọc lần đầu và theo dõi nội dung được vẽ thêm (câu hỏi, phần chốt, màn hình chiếu) */
var pend = [], timer = 0, busy = false;
function flush(){ timer = 0; busy = true; var a = pend; pend = []; a.forEach(function(n){ if (n.isConnected) wrap(n); }); mo.takeRecords(); busy = false; }
var mo = new MutationObserver(function(rs){
  if (busy) return;
  rs.forEach(function(r){ r.addedNodes.forEach(function(n){ if ((n.nodeType === 1 && !n.classList.contains("ta-w")) || n.nodeType === 3) pend.push(n); }); });
  if (pend.length && !timer) timer = setTimeout(flush, 120);
});
function start(){ busy = true; document.querySelectorAll(ROOTS).forEach(wrap); busy = false; mo.observe(document.body, {childList: true, subtree: true}); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();

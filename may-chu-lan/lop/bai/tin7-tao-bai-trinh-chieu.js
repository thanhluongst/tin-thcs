/* Tin học 7 · Bài 11. Tạo bài trình chiếu · 2 tiết. Soạn lại cho lớp học LAN.
   Tình huống: báo cáo dự án Trường học xanh bằng PowerPoint.
   Mô phỏng: "tcBoTri" (chọn mẫu bố trí trang: Title Slide, Title and Content…), "tcPhanCap" (Tab/Shift+Tab tăng giảm cấp danh sách). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Báo cáo dự án thế nào cho hấp dẫn?',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p><b>An, Minh, Khoa</b> cần báo cáo kết quả dự án Trường học xanh trước toàn trường. Đọc cả trang văn bản dài thì chán lắm! <b>Phần mềm trình chiếu</b> giúp trình bày ngắn gọn, trực quan. Thử chọn <b>mẫu bố trí</b> cho từng trang trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'tcBoTri'},
      {id:'q1',type:'single',q:'Quan sát: Trang đầu tiên (giới thiệu tên dự án, nhóm) nên dùng mẫu nào?',opts:['Title Slide (Trang tiêu đề)','Title and Content','Blank','Two Content'],ok:0},
      {id:'q2',type:'single',q:'Trang có tiêu đề và danh sách nội dung nên dùng mẫu:',opts:['Title Slide','Title and Content','Blank','Picture'],ok:1}],
  key:['<b>Mẫu bố trí</b> (Layout) sắp sẵn chỗ cho tiêu đề, nội dung; trang đầu dùng <b>Title Slide</b>.']},
 {t:'Phần mềm trình chiếu',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Phần mềm trình chiếu (PowerPoint, Google Slides…) giúp tạo các <b>trang chiếu</b> chứa văn bản, hình ảnh, âm thanh, video và <b>trình chiếu</b> toàn màn hình.</p>',
  qs:[{id:'h1',type:'tf',q:'Đúng hay sai?',items:[{t:'Phần mềm trình chiếu chỉ chứa được văn bản',a:'F'},{t:'Có thể trình chiếu toàn màn hình (F5)',a:'T'},{t:'Mỗi trang chiếu nên ngắn gọn, nêu ý chính',a:'T'},{t:'Tệp PowerPoint có phần mở rộng .pptx',a:'T'}]},
      {id:'h2',type:'match',q:'Ghép thao tác với lệnh.',items:['Thêm trang chiếu mới','Đổi mẫu bố trí','Trình chiếu từ đầu','Lưu tệp'],opts:['Home → New Slide (Ctrl+M)','Home → Layout','F5 / Slide Show','Ctrl+S'],ok:[0,1,2,3]}],
  key:['Phần mềm trình chiếu: tạo <b>trang chiếu</b> đa phương tiện, <b>trình chiếu</b> (F5).']},
 {t:'Cấu trúc phân cấp',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Nội dung trang “Ý tưởng” có ý lớn, ý nhỏ. Trình bày <b>phân cấp</b> giúp người xem dễ nắm. Dùng <b>Tab</b> (tăng cấp – lùi vào) và <b>Shift+Tab</b> (giảm cấp) trong mô phỏng.</p>',
  qs:[{id:'s2',type:'sim',sim:'tcPhanCap'},
      {id:'p1',type:'single',q:'Để đưa dòng “Vai trò của cây xanh” thành mục con của “Ý tưởng”, đặt con trỏ đầu dòng rồi nhấn:',opts:['Shift+Tab','Tab','Enter','Ctrl+B'],ok:1},
      {id:'p2',type:'single',q:'Câu nào <b>sai</b> về cấu trúc phân cấp?',opts:['Giúp nội dung rõ ràng, mạch lạc','Mục con lùi vào so với mục cha','Nên có thật nhiều cấp để chi tiết','Có thể dùng kí hiệu đầu dòng hoặc số thứ tự'],ok:2}],
  key:['<b>Phân cấp</b>: Tab tăng cấp (lùi vào), Shift+Tab giảm cấp; không nên quá nhiều cấp.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút!</p>',
  qs:[{id:'l1',type:'single',q:'Tiêu đề của bài trình chiếu nên đặt ở:',opts:['Trang cuối','Trang đầu tiên (trang tiêu đề)','Trang giữa','Không cần'],ok:1},
      {id:'l2',type:'sort',q:'Trang chiếu nào trình bày tốt?',cols:{c0:'Nên',c1:'Không nên'},items:[{t:'Mỗi trang có tiêu đề rõ',a:'c0'},{t:'Chép nguyên đoạn văn dài',a:'c1'},{t:'Ý chính ngắn gọn, phân cấp',a:'c0'},{t:'Chữ nhỏ, dày đặc',a:'c1'}]}],
  key:['Trang chiếu: <b>tiêu đề rõ, ý ngắn, phân cấp</b>.']},
 {t:'Dàn ý báo cáo của nhóm',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Nhóm em báo cáo một chủ đề tự chọn.</p>',
  qs:[{id:'v1',type:'text',q:'Viết dàn ý 4 trang chiếu (tiêu đề từng trang và 1–2 ý con).',ans:'VD: 1. Trang tiêu đề: Trường học xanh – Nhóm 3. 2. Ý tưởng: vai trò cây xanh; chọn cây. 3. Thực hiện: số cây; chi phí. 4. Kết quả và bài học.'}],
  key:['Lập <b>dàn ý</b> trước khi làm trang chiếu.']},
 {t:'Tổng kết',hd:'Tổng kết · 4 phút',code:'',phut:4,
  story:'<p>Bài trình chiếu tốt bắt đầu từ cấu trúc rõ.</p>',
  qs:[{id:'tk',type:'single',q:'Câu nào đúng?',opts:['Trang tiêu đề nằm cuối','Mẫu bố trí giúp sắp xếp nội dung trang chiếu','Không thể phân cấp nội dung','PowerPoint chỉ làm được văn bản'],ok:1}],
  key:['<b>Trang tiêu đề – mẫu bố trí – phân cấp</b>.']}
];
const GHIBAI={so:'Bài 11:',ten:'TẠO BÀI TRÌNH CHIẾU',muc:[
 {step:2,h:'Phần mềm trình chiếu',it:['Tạo <b>trang chiếu</b>: chữ, hình, âm thanh, video; <b>F5</b> trình chiếu.','<b>Mẫu bố trí</b>: Title Slide (trang tiêu đề), Title and Content…']},
 {step:3,h:'Cấu trúc phân cấp',it:['<b>Tab</b>: tăng cấp; <b>Shift+Tab</b>: giảm cấp.','Ngắn gọn, không quá nhiều cấp.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
function _t7tc_css(){return `<style>.m-t7tc .sl{aspect-ratio:16/9;max-width:520px;margin:10px auto;background:#fff;border-radius:8px;box-shadow:0 4px 16px #0002;padding:4%;display:flex;flex-direction:column;gap:6px;font-family:Calibri,system-ui}
.m-t7tc .ph{border:2px dashed #94a3b8;border-radius:6px;padding:6px 10px;color:#334155}.m-t7tc .ti{font-size:24px;font-weight:700;text-align:center}.m-t7tc .ct{flex:1;font-size:16px}
.m-t7tc .two{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:6px}</style>`;}
SIMS_BAI.tcBoTri=function(){
  const S=['Trang 1: Giới thiệu dự án','Trang 2: Ý tưởng','Trang 3: So sánh trước – sau','Trang 4: Ảnh hoạt động'], OK=['title','tc','two','blank'];
  const L={title:'Title Slide',tc:'Title and Content',two:'Two Content',blank:'Blank (ảnh lớn)'};
  const e=_el(_shell('Chọn mẫu bố trí','Chọn <b>trang</b>, rồi chọn <b>mẫu bố trí</b> phù hợp. Xem trang chiếu thay đổi.',
   _t7tc_css()+`<div class="sim-ctl"><div><b>Trang</b> ${_seg('s',S.map((s,k)=>[String(k),s]),'0')}</div><div><b>Layout</b> ${_seg('l',Object.entries(L),'blank')}</div></div>
   <div class="m-t7tc"><div class="sl"></div></div><p class="kq" style="text-align:center;font-weight:700"></p>`));
  const pick={0:'blank',1:'blank',2:'blank',3:'blank'}; let s='0';
  const C=['TRƯỜNG HỌC XANH','Ý tưởng','Trước | Sau','📸🌳🌳🌳'];
  const go=()=>{const l=pick[s],sl=e.querySelector('.sl');
    sl.innerHTML=l==='title'?`<div style="flex:1"></div><div class="ph ti">${C[s]}</div><div class="ph" style="text-align:center">Nhóm 3 – Lớp 7A</div><div style="flex:1"></div>`:
      l==='tc'?`<div class="ph ti" style="text-align:left">${C[s]}</div><div class="ph ct">• Vai trò cây xanh<br>• Chọn cây phù hợp</div>`:
      l==='two'?`<div class="ph ti" style="text-align:left">${C[s]}</div><div class="two"><div class="ph">🏜️ Trước</div><div class="ph">🌳 Sau</div></div>`:`<div class="ph" style="flex:1;display:grid;place-items:center;font-size:40px">${s==='3'?C[3]:'(trống)'}</div>`;
    const n=Object.keys(pick).filter(k=>pick[k]===OK[k]).length; e.querySelector('.kq').textContent=(pick[s]===OK[s]?'✓ Phù hợp! ':'Thử mẫu khác? ')+' · Trang hợp lí: '+n+'/4'; return n;};
  _wireSeg(e,(n,v)=>{if(n==='s'){s=v; e.querySelectorAll('[data-n="l"] button').forEach(b=>b.classList.toggle('on',b.dataset.v===pick[s]));} else {pick[s]=v;} const k=go(); if(n==='l') FX.play(k===4?'win':pick[s]===OK[s]?'ding':'tick');});
  go(); return e;
};
SIMS_BAI.tcPhanCap=function(){
  const R=[['Ý tưởng',0],['Vai trò của cây xanh',1],['Chọn loại cây',1],['Bóng mát, dễ trồng',2],['Thực hiện',0],['Phân công nhóm',1]];
  const e=_el(_shell('Tăng, giảm cấp','Bấm chọn một dòng, rồi bấm <b>⇥ Tab</b> hoặc <b>⇤ Shift+Tab</b>. Làm cho giống <b>dàn ý mẫu</b>.',
   _t7tc_css()+`<style>.m-t7tc .li{padding:6px 8px;border-radius:6px;cursor:pointer;font-size:17px;transition:margin .2s}.m-t7tc .li.on{background:#dbeafe}</style>
   <div class="sim-ctl"><button type="button" class="btn acc tab">⇥ Tab (tăng cấp)</button><button type="button" class="btn st">⇤ Shift+Tab (giảm cấp)</button></div>
   <div class="m-t7tc"><div class="sl" style="aspect-ratio:auto"><div class="ph ti" style="text-align:left">Dự án Trường học xanh</div><div class="ph ct ls"></div></div></div>
   <p class="kq" style="text-align:center;font-weight:700"></p>`));
  const lv=R.map(()=>0); let cur=1; const B=['●','–','▪'];
  const go=()=>{const ls=e.querySelector('.ls'); ls.innerHTML=R.map((r,k)=>`<div class="li ${k===cur?'on':''}" data-k="${k}" style="margin-left:${lv[k]*28}px;font-size:${17-lv[k]*2}px">${B[lv[k]]} ${r[0]}</div>`).join('');
    ls.querySelectorAll('.li').forEach(d=>d.onclick=()=>{cur=+d.dataset.k; go(); FX.play('tick');});
    const n=R.filter((r,k)=>r[1]===lv[k]).length; e.querySelector('.kq').textContent='Đúng cấp: '+n+'/'+R.length+(n===R.length?' 🎉':''); return n;};
  e.querySelector('.tab').onclick=()=>{lv[cur]=Math.min(2,lv[cur]+1); FX.play(go()===R.length?'win':'whoosh');};
  e.querySelector('.st').onclick=()=>{lv[cur]=Math.max(0,lv[cur]-1); FX.play(go()===R.length?'win':'whoosh');};
  go(); return e;
};

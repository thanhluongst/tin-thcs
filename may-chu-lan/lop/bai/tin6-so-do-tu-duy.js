/* Tin học 6 · Bài 10. Sơ đồ tư duy · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: nhóm Mai chuẩn bị nội dung "Sổ lưu niệm lớp 6A".
   Mô phỏng: t6_vanbanvssd (Đoạn văn hay sơ đồ?), t6_ghepsd (Ghép sơ đồ tư duy), t6_pmsd (Vẽ bằng phần mềm). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Đoạn văn hay sơ đồ?',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p>Nhóm Mai ghi lại ý tưởng cho <b>Sổ lưu niệm lớp 6A</b>. Bạn An viết thành đoạn văn dài, bạn Mai vẽ thành <b>sơ đồ</b>. Bấm <b>⏱ Tìm</b> để đo thời gian tìm một ý trong mỗi cách ghi.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_vanbanvssd'},
      {id:'k1',type:'single',q:'Cách ghi nào giúp nhìn nhanh các ý chính và mối liên hệ?',opts:['Đoạn văn dài','Sơ đồ có chủ đề ở giữa, các nhánh tỏa ra','Ghi lộn xộn','Không cần ghi'],ok:1}],
  key:['<b>Sơ đồ tư duy</b> giúp nhìn thấy <b>ý chính</b> và <b>mối liên hệ</b> nhanh hơn đoạn văn.']},

 {t:'Các thành phần của sơ đồ tư duy',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',ic:'',phut:12,
  story:'<p>Sơ đồ tư duy gồm: <b>chủ đề chính</b> ở giữa, <b>chủ đề nhánh</b> tỏa ra, mỗi nhánh có thể có <b>nhánh con</b>; dùng từ ngắn, màu sắc, hình ảnh. Ghép các thẻ vào đúng chỗ trên sơ đồ.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_ghepsd'},
      {id:'h1',type:'multi',q:'Thành phần của sơ đồ tư duy (chọn các ý đúng)',opts:['Chủ đề chính','Chủ đề nhánh','Đường nối','Từ khoá ngắn gọn, hình ảnh, màu sắc','Đoạn văn thật dài'],ok:[0,1,2,3]},
      {id:'h2',type:'single',q:'Chủ đề chính thường đặt ở đâu?',opts:['Góc trên bên trái','Ở giữa sơ đồ','Cuối trang','Không cần có'],ok:1}],
  key:['Sơ đồ tư duy: <b>chủ đề chính</b> ở giữa → <b>chủ đề nhánh</b> → nhánh con; dùng <b>từ khoá</b>, màu, hình.']},

 {t:'Vẽ sơ đồ bằng phần mềm',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',ic:'',phut:8,
  story:'<p>Có thể vẽ sơ đồ tư duy trên giấy hoặc bằng <b>phần mềm</b> (vd MindMaple, XMind). Thử các nút trong mô phỏng: thêm nhánh, đổi màu, xoá nhánh.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_pmsd'},
      {id:'h3',type:'sort',q:'Vẽ bằng phần mềm có gì hơn vẽ tay?',cols:{c0:'Ưu điểm của phần mềm',c1:'Không đúng'},items:[{t:'Sửa, thêm, xoá nhánh dễ dàng',a:'c0'},{t:'Lưu, chia sẻ qua mạng dễ',a:'c0'},{t:'Không cần máy tính',a:'c1'},{t:'Đổi màu, thêm hình nhanh',a:'c0'},{t:'Không bao giờ phải suy nghĩ',a:'c1'}]}],
  key:['Phần mềm giúp vẽ sơ đồ <b>đẹp</b>, dễ <b>sửa</b>, dễ <b>lưu và chia sẻ</b>.']},

 {t:'Thử thách nhanh',hd:'Luyện tập · 6 phút',code:'3',ic:'',phut:6,
  qs:[{id:'l1',type:'tf',q:'Đúng hay Sai?',items:[{t:'Sơ đồ tư duy dùng nhiều câu dài',a:'F'},{t:'Có thể dùng màu sắc, hình ảnh trong sơ đồ',a:'T'},{t:'Sơ đồ tư duy giúp ghi nhớ tốt hơn',a:'T'},{t:'Chỉ vẽ được sơ đồ bằng phần mềm',a:'F'}]},
      {id:'l2',type:'single',q:'Sơ đồ chủ đề “Bài 1. Thông tin và dữ liệu”: nhánh nào hợp lí?',opts:['Thông tin, Dữ liệu, Vật mang tin','Bóng đá, Âm nhạc','Thứ Hai, Thứ Ba','Toán, Văn'],ok:0}],
  key:['Nhánh cần <b>liên quan</b> đến chủ đề chính.']},

 {t:'Sơ đồ của em',hd:'Vận dụng · 7 phút',code:'4',ic:'',phut:7,
  qs:[{id:'v1',type:'text',q:'Liệt kê chủ đề chính và 3–4 chủ đề nhánh cho sơ đồ “Kế hoạch nghỉ hè của em”.',ans:'VD: Chủ đề chính: Nghỉ hè. Nhánh: Học tập (đọc sách, ôn Toán), Thể thao (bơi), Du lịch (về quê), Giúp đỡ gia đình.'}],
  key:['Dùng sơ đồ tư duy để <b>lập kế hoạch</b>, ôn bài.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Sơ đồ tư duy là…',opts:['Một đoạn văn dài','Cách trình bày thông tin trực quan bằng từ ngắn, đường nối, hình ảnh','Một bảng tính','Một trang web'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Chủ đề chính – nhánh – từ khoá – màu – hình</b>.']}
];

const GHIBAI={so:'Bài 10:',ten:'SƠ ĐỒ TƯ DUY',muc:[
 {step:2,h:'Sơ đồ tư duy',it:['Trình bày thông tin <b>trực quan</b> bằng từ ngắn, đường nối, màu, hình.','Gồm <b>chủ đề chính</b> (giữa), <b>chủ đề nhánh</b>.']},
 {step:3,h:'Phần mềm',it:['Vẽ <b>đẹp</b>, dễ <b>sửa, lưu, chia sẻ</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}
var T6COL=['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899'];
function t6map(center,br){ /* br: [{t,c,kids:[]}] → SVG sơ đồ tỏa tròn */
  const W=600,H=320,cx=300,cy=160; let s=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:620px;display:block;margin:auto;background:#fffbeb;border-radius:14px">`;
  br.forEach((b,i)=>{const a=-Math.PI/2+i*2*Math.PI/Math.max(br.length,1), x=cx+Math.cos(a)*170, y=cy+Math.sin(a)*105;
    s+=`<path d="M${cx},${cy} Q${(cx+x)/2},${cy} ${x},${y}" stroke="${b.c}" stroke-width="6" fill="none"/>`;
    (b.kids||[]).forEach((k,j)=>{const kx=x+(x>=cx?1:-1)*70, ky=y-18+j*24; s+=`<line x1="${x}" y1="${y}" x2="${kx}" y2="${ky}" stroke="${b.c}" stroke-width="2"/><text x="${kx+(x>=cx?4:-4)}" y="${ky+4}" font-size="12" text-anchor="${x>=cx?'start':'end'}">${k}</text>`;});
    s+=`<rect x="${x-58}" y="${y-15}" width="116" height="30" rx="15" fill="${b.c}"/><text x="${x}" y="${y+5}" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">${b.t}</text>`;});
  return s+`<ellipse cx="${cx}" cy="${cy}" rx="80" ry="30" fill="#1e3a8a"/><text x="${cx}" y="${cy+6}" font-size="15" font-weight="800" fill="#fff" text-anchor="middle">${center}</text></svg>`;}

SIMS_BAI.t6_vanbanvssd=function(){
  const BR=[{t:'Thành viên',c:T6COL[0],kids:['42 bạn','cô chủ nhiệm']},{t:'Kỉ niệm',c:T6COL[1],kids:['cắm trại','hội khoẻ']},{t:'Thành tích',c:T6COL[2],kids:['giải nhì văn nghệ']},{t:'Hình thức',c:T6COL[3],kids:['ảnh','bài viết']}];
  const e=t6('Đoạn văn hay sơ đồ?','Chọn cách xem, bấm <b>⏱ Tìm</b>, rồi bấm vào chỗ có ý “<b>giải nhì văn nghệ</b>” ngay khi thấy.',
   `<div class="sim-ctl" style="justify-content:center">${_seg('m',[['vb','📄 Đoạn văn của An'],['sd','🧠 Sơ đồ của Mai']],'vb')}<button type="button" class="btn acc run">⏱ Tìm</button></div>
    <div class="vw" style="min-height:200px;filter:blur(6px);transition:filter .2s"></div><div class="kq">Bấm ⏱ Tìm để bắt đầu</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Cách ghi</th><th>Thời gian tìm</th></tr></table>`);
  let m='vb', t0=0; const hist=[], vw=e.querySelector('.vw');
  const VB='<p style="max-width:600px;margin:auto;line-height:1.7;font-size:15px">Sổ lưu niệm lớp 6A sẽ giới thiệu 42 bạn trong lớp và cô chủ nhiệm, kể lại những kỉ niệm đẹp như buổi cắm trại ở công viên và ngày hội khoẻ Phù Đổng của trường, trong đó lớp đã cố gắng rất nhiều, đồng thời ghi lại các thành tích nổi bật của lớp trong năm học, chẳng hạn như <span class="tg">giải nhì văn nghệ</span> toàn trường, và sổ sẽ được trình bày bằng nhiều ảnh đẹp cùng các bài viết của các bạn.</p>';
  const draw=()=>{vw.innerHTML=m==='vb'?VB:t6map('Sổ lưu niệm 6A',BR); const tg=m==='vb'?vw.querySelector('.tg'):[...vw.querySelectorAll('text')].find(x=>x.textContent==='giải nhì văn nghệ');
    tg.style.cursor='pointer'; tg.onclick=()=>{if(!t0) return; const s=((Date.now()-t0)/1000).toFixed(1); t0=0; vw.style.filter='blur(6px)';
      hist.unshift([m==='vb'?'Đoạn văn':'Sơ đồ tư duy',s+' giây']); if(hist.length>6) hist.pop(); histTable(e,hist,()=>''); t6kq(e,true,`Tìm thấy sau <b>${s} giây</b>. So sánh hai cách ghi!`);};};
  _wireSeg(e,(n,v)=>{m=v; draw(); vw.style.filter='blur(6px)'; t0=0;});
  e.querySelector('.run').onclick=()=>{vw.style.filter='none'; t0=Date.now(); FX.play('whoosh'); t6kq(e,null,'🔎 Tìm “giải nhì văn nghệ” rồi bấm vào nó!');};
  draw(); return e;
};
SIMS_BAI.t6_ghepsd=function(){
  const BR=[['Thành viên',T6COL[0]],['Kỉ niệm',T6COL[1]],['Thành tích',T6COL[2]]];
  const CH=[['42 bạn lớp 6A',0],['Cô chủ nhiệm',0],['Cắm trại',1],['Hội khoẻ',1],['Giải nhì văn nghệ',2],['Học sinh giỏi',2]];
  const e=t6('Ghép sơ đồ tư duy','Bấm chọn một <b>thẻ</b>, rồi bấm vào <b>chủ đề nhánh</b> phù hợp để gắn thẻ thành nhánh con.',
   `<div class="g ch">${CH.map((c,i)=>`<button type="button" class="c" data-i="${i}">🏷️ ${c[0]}</button>`).join('')}</div>
    <div class="g">${BR.map((b,i)=>`<button type="button" class="c br" data-b="${i}" style="background:${b[1]};color:#fff;border-color:${b[1]}">${b[0]}</button>`).join('')}</div>
    <div class="mp"></div><div class="kq">Chọn một thẻ</div>`);
  let sel=null; const put=BR.map(()=>[]); let ok=0;
  const draw=()=>{e.querySelector('.mp').innerHTML=t6map('Sổ lưu niệm 6A',BR.map((b,i)=>({t:b[0],c:b[1],kids:put[i]})));};
  e.querySelectorAll('.ch .c').forEach(b=>b.onclick=()=>{if(b.disabled) return; e.querySelectorAll('.ch .c').forEach(x=>x.classList.remove('on')); b.classList.add('on'); sel=+b.dataset.i;});
  e.querySelectorAll('.br').forEach(b=>b.onclick=()=>{if(sel===null){t6kq(e,null,'Hãy chọn một thẻ trước'); return;} const c=CH[sel], bi=+b.dataset.b, chip=e.querySelector(`.ch .c[data-i="${sel}"]`);
    if(c[1]===bi){put[bi].push(c[0]); chip.disabled=true; chip.classList.remove('on'); chip.classList.add('ok'); ok++; draw(); t6kq(e,true,`✓ “${c[0]}” thuộc nhánh <b>${BR[bi][0]}</b>`+(ok===CH.length?' · 🎉 Hoàn thành sơ đồ!':'')); if(ok===CH.length) FX.play('win');}
    else t6kq(e,false,`✗ “${c[0]}” không thuộc nhánh ${BR[bi][0]}. Thử nhánh khác!`); sel=c[1]===bi?null:sel;});
  draw(); return e;
};
SIMS_BAI.t6_pmsd=function(){
  const POOL=['Học tập','Thể thao','Du lịch','Giúp mẹ','Đọc sách','Vẽ tranh'];
  const e=t6('Vẽ bằng phần mềm','Dùng các nút công cụ như trong phần mềm vẽ sơ đồ tư duy.',
   `<div class="sim-ctl" style="justify-content:center"><button type="button" class="btn acc add">➕ Thêm nhánh</button><button type="button" class="btn ghost col">🎨 Đổi màu</button><button type="button" class="btn ghost del">🗑️ Xoá nhánh cuối</button><button type="button" class="btn ghost sav">💾 Lưu</button></div>
    <div class="mp"></div><div class="kq">Sơ đồ “Nghỉ hè” đang trống nhánh</div>`);
  const br=[]; let ci=0;
  const draw=()=>{e.querySelector('.mp').innerHTML=t6map('🌞 Nghỉ hè',br);};
  e.querySelector('.add').onclick=()=>{if(br.length>=6){t6kq(e,null,'Đủ 6 nhánh rồi!'); return;} br.push({t:POOL[br.length],c:T6COL[(br.length+ci)%6],kids:[]}); draw(); t6kq(e,true,'➕ Đã thêm nhánh “'+br[br.length-1].t+'” chỉ bằng 1 cú bấm');};
  e.querySelector('.col').onclick=()=>{ci++; br.forEach((b,i)=>b.c=T6COL[(i+ci)%6]); draw(); t6kq(e,true,'🎨 Đổi màu tất cả nhánh trong nháy mắt');};
  e.querySelector('.del').onclick=()=>{if(br.pop()){draw(); t6kq(e,true,'🗑️ Xoá nhánh mà không phải tẩy, vẽ lại');}};
  e.querySelector('.sav').onclick=()=>{t6kq(e,true,'💾 Đã lưu tệp <code>nghi-he.emm</code> – có thể gửi cho bạn qua mạng'); FX.play('sparkle');};
  draw(); return e;
};

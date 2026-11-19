/* Tin học 6 · Bài 12. Trình bày thông tin ở dạng bảng · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: Mai lập bảng phân công trực nhật và bảng thành tích cho Sổ lưu niệm.
   Mô phỏng: t6_chubang (Chữ hay bảng?), t6_taobang (Chèn bảng), t6_suabang (Sửa bảng: thêm, xoá hàng cột, gộp ô). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Chữ hay bảng?',hd:'Khởi động · 5 phút',code:'1',ic:'',phut:5,
  story:'<p>Cô giao Mai ghi lịch trực nhật của tổ. Mai viết thành đoạn văn, còn Lan kẻ thành <b>bảng</b>. Bấm để xem hai cách trình bày, rồi trả lời: <b>thứ Tư ai trực?</b></p>',
  qs:[{id:'s1',type:'sim',sim:'t6_chubang'},
      {id:'k1',type:'single',q:'Thứ Tư bạn nào trực nhật?',opts:['An','Bình','Chi','Dũng'],ok:2},
      {id:'k2',type:'single',q:'Vì sao bảng giúp tìm nhanh?',opts:['Bảng có màu','Thông tin xếp theo hàng, cột rõ ràng, dễ so sánh','Bảng chữ to hơn','Bảng có ít chữ hơn nên thiếu ý'],ok:1}],
  key:['<b>Bảng</b> trình bày thông tin <b>cô đọng</b>, dễ <b>tìm kiếm, so sánh</b>.']},

 {t:'Tạo bảng',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Bảng gồm các <b>hàng</b> (ngang) và <b>cột</b> (dọc); chỗ giao nhau là <b>ô</b>. Trong Word: <b>Insert → Table</b>, kéo chuột chọn số cột × số hàng. Hãy chèn bảng <b>3 cột × 6 hàng</b> cho lịch trực nhật.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_taobang'},
      {id:'h1',type:'single',q:'Bảng 3 cột × 6 hàng có bao nhiêu ô?',opts:['9','18','36','6'],ok:1},
      {id:'h2',type:'match',q:'Ghép cho đúng.',items:['Hàng','Cột','Ô'],opts:['Chỗ giao của một hàng và một cột','Các ô xếp theo chiều dọc','Các ô xếp theo chiều ngang'],ok:[2,1,0]}],
  key:['Chèn bảng: <b>Insert → Table</b>, chọn số <b>cột × hàng</b>.']},

 {t:'Chỉnh sửa bảng',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',ic:'',phut:10,
  story:'<p>Tổ có thêm bạn mới, cần <b>thêm hàng</b>; ô tiêu đề cần <b>gộp ô</b>. Bấm vào một ô để chọn, rồi dùng các lệnh (giống thẻ <b>Layout</b> của bảng).</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_suabang'},
      {id:'h3',type:'sort',q:'Lệnh nào làm <b>tăng</b> số ô của bảng?',cols:{c0:'Tăng số ô',c1:'Giảm số ô'},items:[{t:'Insert Above (chèn hàng trên)',a:'c0'},{t:'Delete Rows (xoá hàng)',a:'c1'},{t:'Insert Right (chèn cột phải)',a:'c0'},{t:'Merge Cells (gộp ô)',a:'c1'}]},
      {id:'h4',type:'single',q:'Lệnh nào gộp nhiều ô thành một ô?',opts:['Split Cells','Merge Cells','Delete Table','Insert Below'],ok:1}],
  key:['Thẻ <b>Layout</b>: <b>chèn/xoá</b> hàng, cột; <b>gộp ô</b> (Merge), <b>tách ô</b> (Split).']},

 {t:'Thử thách nhanh',hd:'Luyện tập · 7 phút',code:'3',ic:'',phut:7,
  qs:[{id:'l1',type:'tf',q:'Đúng hay Sai?',items:[{t:'Có thể định dạng chữ trong ô như văn bản thường',a:'T'},{t:'Bảng đã tạo thì không thêm được hàng',a:'F'},{t:'Kéo đường kẻ để thay đổi độ rộng cột',a:'T'},{t:'Xoá hàng sẽ xoá cả dữ liệu trong hàng đó',a:'T'}]},
      {id:'l2',type:'single',q:'Bảng điểm có 30 học sinh, mỗi bạn một hàng, thêm 1 hàng tiêu đề. Cần bao nhiêu hàng?',opts:['30','31','29','60'],ok:1}],
  key:['Bảng sửa được <b>linh hoạt</b>: thêm, xoá, gộp, đổi độ rộng.']},

 {t:'Bảng của em',hd:'Vận dụng · 7 phút',code:'4',ic:'',phut:7,
  qs:[{id:'v1',type:'text',q:'Thiết kế bảng “Thời gian biểu một ngày” của em: bảng có mấy cột, mấy hàng, tiêu đề các cột là gì?',ans:'VD: 3 cột (Thời gian, Công việc, Ghi chú), 8 hàng (1 hàng tiêu đề + 7 mốc thời gian).'}],
  key:['Lập bảng: xác định <b>số cột</b> (loại thông tin) và <b>số hàng</b> (số đối tượng + tiêu đề).']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Để chèn bảng trong Word, em dùng…',opts:['Home → Bold','Insert → Table','File → Save','View → Zoom'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Insert → Table</b>; sửa bảng ở thẻ <b>Layout</b>.']}
];

const GHIBAI={so:'Bài 12:',ten:'TRÌNH BÀY THÔNG TIN Ở DẠNG BẢNG',muc:[
 {step:2,h:'Tạo bảng',it:['Bảng gồm <b>hàng, cột, ô</b>; cô đọng, dễ so sánh.','<b>Insert → Table</b>, chọn số cột × hàng.']},
 {step:3,h:'Sửa bảng',it:['Thẻ <b>Layout</b>: chèn/xoá hàng, cột; <b>Merge</b> gộp ô, <b>Split</b> tách ô.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 .wt{border-collapse:collapse;margin:10px auto;background:#fff;color:#111}.t6 .wt td{border:1.5px solid #334155;padding:6px 12px;min-width:70px;height:26px;text-align:center;cursor:pointer}.t6 .wt td.sel{background:#bfdbfe}.t6 .wt tr:first-child td{font-weight:700;background:#fef3c7}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_chubang=function(){
  const D=[['Thứ Hai','An','Quét lớp'],['Thứ Ba','Bình','Lau bảng'],['Thứ Tư','Chi','Tưới cây'],['Thứ Năm','Dũng','Quét lớp'],['Thứ Sáu','An','Lau bảng']];
  const e=t6('Chữ hay bảng?','Bấm chọn cách trình bày. Bấm <b>⏱ Bắt đầu</b>, tìm xem <b>thứ Tư ai trực</b>, bấm vào tên bạn đó.',
   `<div class="sim-ctl" style="justify-content:center">${_seg('v',[['vb','📄 Đoạn văn'],['bg','▦ Bảng']],'vb')}<button type="button" class="btn acc run">⏱ Bắt đầu</button></div><div class="vw" style="max-width:560px;margin:auto;min-height:160px;filter:blur(6px)"></div>
    <div class="kq">Bấm ⏱ Bắt đầu</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Cách trình bày</th><th>Thời gian</th></tr></table>`);
  let v='vb', t0=0; const hist=[], vw=e.querySelector('.vw');
  const nm=(n,d)=>`<span class="nm" data-d="${d}" style="cursor:pointer">${n}</span>`;
  const draw=()=>{vw.innerHTML=v==='vb'?`<p style="line-height:1.8">Tổ 1 phân công trực nhật như sau: ${D.map(d=>`${d[0].toLowerCase()} bạn ${nm(d[1],d[0])} trực và ${d[2].toLowerCase()}`).join(', ')}.</p>`
      :`<table class="wt"><tr><td>Ngày</td><td>Người trực</td><td>Công việc</td></tr>${D.map(d=>`<tr><td>${d[0]}</td><td>${nm(d[1],d[0])}</td><td>${d[2]}</td></tr>`).join('')}</table>`;
    vw.querySelectorAll('.nm').forEach(s=>s.onclick=()=>{if(!t0) return; const ok=s.dataset.d==='Thứ Tư', sec=((Date.now()-t0)/1000).toFixed(1);
      if(!ok){t6kq(e,false,'✗ Chưa đúng, tìm tiếp!'); return;} t0=0; vw.style.filter='blur(6px)'; hist.unshift([v==='vb'?'Đoạn văn':'Bảng',sec+' giây']); histTable(e,hist,()=>'');
      t6kq(e,true,`✓ Chi trực thứ Tư. Em tìm mất <b>${sec} giây</b>.`);});};
  _wireSeg(e,(n,x)=>{v=x; t0=0; vw.style.filter='blur(6px)'; draw();});
  e.querySelector('.run').onclick=()=>{vw.style.filter='none'; t0=Date.now(); FX.play('whoosh'); t6kq(e,null,'🔎 Thứ Tư ai trực? Bấm vào tên!');};
  draw(); return e;
};
SIMS_BAI.t6_taobang=function(){
  const e=t6('Chèn bảng','Di chuột trên lưới để chọn kích thước, <b>bấm</b> để chèn bảng. Mục tiêu: <b>3 cột × 6 hàng</b>.',
   `<div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;align-items:flex-start"><div><div class="lb" style="font-weight:700;text-align:center;margin-bottom:4px">Insert Table</div>
    <div class="gr" style="display:grid;grid-template-columns:repeat(8,26px);gap:3px">${Array.from({length:64},(_,i)=>`<div data-c="${i%8+1}" data-r="${Math.floor(i/8)+1}" style="width:26px;height:26px;border:1.5px solid #94a3b8;border-radius:3px;background:#fff;cursor:pointer"></div>`).join('')}</div></div>
    <div class="out"></div></div><div class="kq">Chưa chèn bảng</div>`);
  const cells=[...e.querySelectorAll('.gr div')];
  const hi=(c,r)=>{cells.forEach(x=>x.style.background=(+x.dataset.c<=c&&+x.dataset.r<=r)?'#fdba74':'#fff'); e.querySelector('.lb').textContent=c&&r?`Bảng ${c} × ${r}`:'Insert Table';};
  cells.forEach(x=>{x.onmouseenter=()=>hi(+x.dataset.c,+x.dataset.r);
    x.onclick=()=>{const c=+x.dataset.c, r=+x.dataset.r; e.querySelector('.out').innerHTML=`<table class="wt">${Array.from({length:r},()=>`<tr>${'<td></td>'.repeat(c)}</tr>`).join('')}</table>`;
      const ok=c===3&&r===6; t6kq(e,ok,`Đã chèn bảng <b>${c} cột × ${r} hàng</b> = ${c*r} ô`+(ok?' · 🎉 Đúng yêu cầu!':' · chưa đúng 3 × 6')); if(ok) FX.play('win');};});
  e.querySelector('.gr').onmouseleave=()=>hi(0,0);
  return e;
};
SIMS_BAI.t6_suabang=function(){
  const e=t6('Sửa bảng','Bấm một ô để chọn (bấm thêm ô cùng hàng để chọn nhiều ô gộp). Mục tiêu: <b>thêm hàng cho bạn Hoa</b> và <b>gộp hàng tiêu đề thành 1 ô</b>.',
   `<div class="tb" style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center"><button type="button" class="btn ghost" data-k="above">⬆ Chèn hàng trên</button><button type="button" class="btn ghost" data-k="below">⬇ Chèn hàng dưới</button><button type="button" class="btn ghost" data-k="right">➡ Chèn cột phải</button><button type="button" class="btn ghost" data-k="delr">✖ Xoá hàng</button><button type="button" class="btn ghost" data-k="delc">✖ Xoá cột</button><button type="button" class="btn acc" data-k="merge">⊞ Gộp ô</button><button type="button" class="btn ghost" data-k="reset">↺</button></div>
    <div class="out"></div><div class="kq">Chọn một ô</div>`);
  let T, sel;
  const init=()=>{T=[[{t:'LỊCH TRỰC NHẬT TỔ 1',s:1},{t:'',s:1},{t:'',s:1}],[{t:'Ngày',s:1},{t:'Người trực',s:1},{t:'Việc',s:1}],[{t:'Thứ Hai',s:1},{t:'An',s:1},{t:'Quét lớp',s:1}],[{t:'Thứ Ba',s:1},{t:'Bình',s:1},{t:'Lau bảng',s:1}]]; sel=[];};
  const draw=()=>{e.querySelector('.out').innerHTML=`<table class="wt">${T.map((row,r)=>`<tr>${row.map((c,k)=>c.s===0?'':`<td colspan="${c.s}" data-r="${r}" data-k="${k}" class="${sel.some(s=>s[0]===r&&s[1]===k)?'sel':''}">${c.t}</td>`).join('')}</tr>`).join('')}</table>`;
    e.querySelectorAll('.out td').forEach(td=>td.onclick=()=>{const r=+td.dataset.r,k=+td.dataset.k; if(sel.length&&sel[0][0]===r){const i=sel.findIndex(s=>s[1]===k); i>=0?sel.splice(i,1):sel.push([r,k]);} else sel=[[r,k]]; FX.play('tick'); draw();});
    const merged=T[0][0].s===T[0].length, hoa=T.length>=5;
    if(merged&&hoa){t6kq(e,true,'🎉 Hoàn thành: đã thêm hàng mới và gộp tiêu đề!'); FX.play('win');}};
  const blank=n=>Array.from({length:n},()=>({t:'',s:1}));
  e.querySelectorAll('[data-k]').forEach(b=>{if(b.tagName!=='BUTTON') return; b.onclick=()=>{const k=b.dataset.k;
    if(k==='reset'){init(); draw(); t6kq(e,null,'Đã làm lại'); return;}
    if(!sel.length){t6kq(e,false,'Hãy chọn một ô trước!'); return;}
    const [r,c]=sel[0], W=T[0].reduce((a,x)=>a+x.s,0);
    if(k==='above'||k==='below'){const nr=blank(W); if(T.length>=4) nr[1].t='Hoa'; T.splice(k==='above'?r:r+1,0,nr); t6kq(e,true,'Đã chèn 1 hàng '+(k==='above'?'phía trên':'phía dưới')+' (số ô tăng thêm '+W+')');}
    else if(k==='right'){if(T.some(row=>row.some(x=>x.s!==1))){t6kq(e,false,'Bảng có ô đã gộp, hãy làm lại (↺) trước khi chèn cột'); return;} T.forEach(row=>row.splice(c+1,0,{t:'',s:1})); t6kq(e,true,'Đã chèn 1 cột bên phải');}
    else if(k==='delr'){if(T.length<=1) return; T.splice(r,1); t6kq(e,true,'Đã xoá hàng (mất cả dữ liệu trong hàng)');}
    else if(k==='delc'){if(T.some(row=>row.some(x=>x.s!==1))||W<=1){t6kq(e,false,'Không xoá cột được ở bảng có ô gộp'); return;} T.forEach(row=>row.splice(c,1)); t6kq(e,true,'Đã xoá cột');}
    else if(k==='merge'){if(sel.length<2){t6kq(e,false,'Chọn ít nhất 2 ô cùng hàng để gộp'); return;} const ks=sel.map(s=>s[1]).sort((a,b)=>a-b), row=T[r], f=row[ks[0]];
      ks.slice(1).forEach(j=>{f.s+=row[j].s; f.t=(f.t+' '+row[j].t).trim(); row[j].s=0;}); t6kq(e,true,'Đã gộp '+ks.length+' ô thành 1 ô');}
    sel=[]; draw();};});
  init(); draw(); return e;
};

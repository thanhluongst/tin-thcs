/* Tin học 6 · Bài 13. Thực hành: Tìm kiếm và thay thế · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: bài viết về Vịnh Hạ Long của Mai gõ sai nhiều chỗ "Ha Long".
   Mô phỏng: t6_suatay (Sửa bằng tay), t6_timtu (Hộp thoại Find), t6_thaythe (Hộp thoại Replace). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Sửa lỗi bằng tay',hd:'Khởi động · 5 phút',code:'1',ic:'',phut:5,
  story:'<p>Mai gõ bài viết về <b>Vịnh Hạ Long</b> nhưng gõ nhầm thành <b>“Ha Long”</b> ở nhiều chỗ. Thử tự tìm và sửa từng chỗ bằng tay, xem mất bao lâu!</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_suatay'},
      {id:'k1',type:'single',q:'Nếu bài viết dài 20 trang, sửa bằng tay sẽ thế nào?',opts:['Rất nhanh','Mất nhiều thời gian, dễ sót','Không sửa được','Máy tự sửa'],ok:1}],
  key:['Văn bản dài: tìm, sửa bằng tay <b>chậm</b>, dễ <b>bỏ sót</b>.']},

 {t:'Tìm kiếm (Find)',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Lệnh <b>Find</b> (Home → Find, hoặc <b>Ctrl + F</b>) tìm nhanh một từ trong văn bản: các vị trí tìm thấy được <b>tô sáng</b>. Gõ từ cần tìm vào ô.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_timtu'},
      {id:'h1',type:'single',q:'Phím tắt mở công cụ tìm kiếm là…',opts:['Ctrl + F','Ctrl + H','Ctrl + B','Ctrl + S'],ok:0},
      {id:'h2',type:'single',q:'Tìm từ “đảo” trong mô phỏng, có bao nhiêu kết quả?',opts:['1','2','3','4'],ok:3}],
  key:['<b>Find</b> (<b>Ctrl+F</b>): tìm nhanh, tô sáng mọi vị trí của từ.']},

 {t:'Thay thế (Replace)',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',ic:'',phut:12,
  story:'<p>Lệnh <b>Replace</b> (Home → Replace, hoặc <b>Ctrl + H</b>): gõ từ cần tìm ở <b>Find what</b>, từ thay thế ở <b>Replace with</b>, rồi bấm <b>Replace</b> (thay từng chỗ) hoặc <b>Replace All</b> (thay tất cả). Cẩn thận: thử thay “an” bằng “em” xem chuyện gì xảy ra!</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_thaythe'},
      {id:'h3',type:'match',q:'Ghép nút với tác dụng.',items:['Find Next','Replace','Replace All'],opts:['Thay thế tất cả các vị trí','Đến vị trí tìm thấy tiếp theo','Thay thế vị trí đang chọn'],ok:[1,2,0]},
      {id:'h4',type:'single',q:'Thay “an” bằng “em” bằng Replace All làm “Lan” thành “Lem”. Bài học là…',opts:['Không bao giờ dùng Replace','Cần gõ từ tìm đầy đủ, kiểm tra trước khi Replace All','Replace All luôn đúng','Phải gõ lại cả bài'],ok:1}],
  key:['<b>Replace</b> (<b>Ctrl+H</b>): thay từng chỗ hoặc <b>Replace All</b>; cần <b>kiểm tra</b> kĩ.']},

 {t:'Thực hành',hd:'Luyện tập · 8 phút',code:'3',ic:'',phut:8,
  qs:[{id:'l1',type:'tf',q:'Đúng hay Sai?',items:[{t:'Find chỉ tìm được một vị trí đầu tiên',a:'F'},{t:'Replace All thay thế mọi vị trí tìm thấy',a:'T'},{t:'Ctrl + H mở hộp thoại thay thế',a:'T'},{t:'Thay thế xong không thể hoàn tác (Undo)',a:'F'}]},
      {id:'l2',type:'single',q:'Muốn thay “HS” thành “học sinh” trong cả văn bản, nhanh nhất là…',opts:['Sửa từng chỗ','Replace với Find what: HS, Replace with: học sinh → Replace All','Xoá cả văn bản','Dùng Find rồi gõ lại'],ok:1}],
  key:['Lỡ thay sai: nhấn <b>Ctrl + Z</b> để hoàn tác.']},

 {t:'Vận dụng',hd:'Vận dụng · 6 phút',code:'4',ic:'',phut:6,
  qs:[{id:'v1',type:'text',q:'Kể một tình huống em có thể dùng Tìm kiếm và thay thế khi làm bài ở nhà.',ans:'VD: Bài văn gõ nhầm tên nhân vật; danh sách lớp viết tắt “Nguyễn” thành “Ng.” muốn sửa lại đầy đủ.'}],
  key:['Tìm kiếm và thay thế giúp <b>sửa nhanh, chính xác</b> văn bản dài.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Lệnh Replace nằm ở thẻ nào?',opts:['Home','Insert','Layout','View'],ok:0},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Ctrl+F</b> tìm · <b>Ctrl+H</b> thay thế · <b>Ctrl+Z</b> hoàn tác.']}
];

const GHIBAI={so:'Bài 13:',ten:'TÌM KIẾM VÀ THAY THẾ',muc:[
 {step:2,h:'Tìm kiếm',it:['<b>Home → Find</b> (Ctrl+F): tô sáng mọi vị trí của từ.']},
 {step:3,h:'Thay thế',it:['<b>Home → Replace</b> (Ctrl+H): Find what, Replace with.','<b>Replace</b> từng chỗ, <b>Replace All</b> tất cả; kiểm tra kĩ.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 .doc{max-width:600px;margin:10px auto;background:#fff;color:#111;padding:16px 20px;border-radius:8px;box-shadow:0 2px 10px #0003;font:16px/1.8 "Times New Roman",serif}.t6 .doc mark{background:#fde047;padding:0 2px}.t6 .doc mark.cur{background:#f97316;color:#fff}.t6 .dlg{max-width:600px;margin:auto;background:#e2e8f0;border-radius:10px;padding:10px;display:grid;gap:6px}.t6 .dlg input{font:600 16px system-ui;padding:6px 10px;border-radius:6px;border:2px solid #94a3b8}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}
var T6BV='Vịnh Ha Long ở tỉnh Quảng Ninh. Ha Long có gần hai nghìn hòn đảo lớn nhỏ. Bạn Lan và Mai đã đến thăm Ha Long vào mùa hè. Hai bạn ngồi bên bàn đá trên đảo Ti Tốp, ngắm hoàng hôn trên vịnh Ha Long. Mai kể: đảo Gà Chọi là biểu tượng của Ha Long, còn đảo Đầu Người thì rất lạ.';
function t6esc(s){return s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}

SIMS_BAI.t6_suatay=function(){
  const e=t6('Sửa lỗi bằng tay','Bấm <b>⏱ Bắt đầu</b>, rồi bấm vào từng chữ <b>“Ha”</b> sai để sửa thành <b>“Hạ”</b>. Có bao nhiêu chỗ sai?',
   `<div class="sim-ctl" style="justify-content:center"><button type="button" class="btn acc run">⏱ Bắt đầu</button><span class="sc">Đã sửa: 0</span></div><div class="doc"></div><div class="kq">Bấm ⏱ Bắt đầu</div>`);
  let t0=0, n=0; const tot=(T6BV.match(/\bHa\b/g)||[]).length;
  const draw=()=>{let i=0; e.querySelector('.doc').innerHTML=T6BV.split(' ').map(w=>w==='Ha'?`<span class="w" data-i="${i++}" style="cursor:pointer">Ha</span>`:w).join(' ');
    e.querySelectorAll('.w').forEach(s=>s.onclick=()=>{if(!t0||s.dataset.x) return; s.dataset.x=1; s.textContent='Hạ'; s.style.background='#bbf7d0'; n++; FX.play('tick');
      e.querySelector('.sc').textContent='Đã sửa: '+n; if(n===tot){const sec=((Date.now()-t0)/1000).toFixed(1); t0=0; t6kq(e,true,`Sửa xong ${tot} chỗ sau <b>${sec} giây</b>. Nếu bài dài 20 trang thì sao?`);}});};
  e.querySelector('.run').onclick=()=>{n=0; draw(); t0=Date.now(); e.querySelector('.sc').textContent='Đã sửa: 0'; t6kq(e,null,'Tìm và bấm vào mọi chữ “Ha”!'); FX.play('whoosh');};
  draw(); return e;
};
SIMS_BAI.t6_timtu=function(){
  const e=t6('Hộp thoại Find (Ctrl+F)','Gõ từ cần tìm, nhấn <b>Enter</b> hoặc <b>🔍 Tìm</b>. Bấm <b>Find Next ⏭</b> để đến vị trí tiếp theo. Thử: <code>Ha Long</code>, <code>đảo</code>, <code>Mai</code>.',
   `<div class="dlg"><div style="display:flex;gap:6px"><input class="q" value="đảo" style="flex:1"><button type="button" class="btn acc run">🔍 Tìm</button><button type="button" class="btn ghost nx">Find Next ⏭</button></div></div><div class="doc"></div><div class="kq">Chưa tìm</div>`);
  let pos=[], cur=-1;
  const draw=q=>{const doc=e.querySelector('.doc'); if(!q){doc.textContent=T6BV; return;} const re=new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
    let k=0; doc.innerHTML=t6esc(T6BV).replace(re,m=>`<mark data-k="${k}" class="${k++===cur?'cur':''}">${m}</mark>`); return k;};
  const run=()=>{const q=e.querySelector('.q').value.trim(); cur=0; const n=draw(q)||0; pos=Array(n); if(!n){cur=-1; draw(q);} t6kq(e,n>0,n?`Tìm thấy <b>${n}</b> kết quả cho “${t6esc(q)}”`:`Không tìm thấy “${t6esc(q)}”`);};
  e.querySelector('.run').onclick=run; e.querySelector('.q').onkeydown=ev=>{if(ev.key==='Enter') run();};
  e.querySelector('.nx').onclick=()=>{if(!pos.length) return; cur=(cur+1)%pos.length; draw(e.querySelector('.q').value.trim()); FX.play('tick'); t6kq(e,true,`Kết quả ${cur+1}/${pos.length}`);};
  draw(''); return e;
};
SIMS_BAI.t6_thaythe=function(){
  const e=t6('Hộp thoại Replace (Ctrl+H)','Điền <b>Find what</b> và <b>Replace with</b>. Dùng <b>Find Next</b> + <b>Replace</b> để thay từng chỗ, hoặc <b>Replace All</b>. Bấm <b>↶ Undo</b> nếu thay nhầm.',
   `<div class="dlg"><label>Find what: <input class="f" value="Ha Long"></label><label>Replace with: <input class="r" value="Hạ Long"></label>
    <div style="display:flex;gap:6px;flex-wrap:wrap"><button type="button" class="btn ghost nx">Find Next ⏭</button><button type="button" class="btn ghost one">Replace</button><button type="button" class="btn acc all">Replace All</button><button type="button" class="btn ghost un">↶ Undo</button></div></div>
    <div class="doc"></div><div class="kq">Sẵn sàng</div>`);
  let txt=T6BV, cur=-1; const undo=[];
  const re=()=>{const f=e.querySelector('.f').value; return f?new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'):null;};
  const draw=()=>{const r=re(); let k=0; e.querySelector('.doc').innerHTML=r?t6esc(txt).replace(new RegExp(r.source.replace(/&/g,'&amp;'),'g'),m=>`<mark class="${k++===cur?'cur':''}">${m}</mark>`):t6esc(txt); return k;};
  const check=()=>{if(/\bHa Long\b/.test(txt)) return; if(/Lem|bèm|hoèng/.test(txt)) t6kq(e,false,'⚠️ Thay nhầm cả chữ trong từ khác (Lan → Lem, bàn → bèm)! Bấm Undo.'); else if(/Hạ Long/.test(txt)&&txt.length<=T6BV.length+10){t6kq(e,true,'🎉 Đã sửa hết “Ha Long” thành “Hạ Long”!'); FX.play('win');}};
  e.querySelector('.nx').onclick=()=>{const n=draw(); if(!n){cur=-1; t6kq(e,false,'Không còn vị trí nào'); return;} cur=(cur+1)%n; draw(); t6kq(e,null,`Đang chọn vị trí ${cur+1}/${n}`); FX.play('tick');};
  e.querySelector('.one').onclick=()=>{const r=re(); if(!r||cur<0){t6kq(e,null,'Bấm Find Next để chọn một vị trí trước'); return;} let k=0; undo.push(txt);
    txt=txt.replace(r,m=>k++===cur?e.querySelector('.r').value:m); cur=-1; const n=draw(); t6kq(e,true,`Đã thay 1 chỗ, còn ${n} chỗ`); check();};
  e.querySelector('.all').onclick=()=>{const r=re(); if(!r) return; const n=(txt.match(r)||[]).length; undo.push(txt); txt=txt.replace(r,e.querySelector('.r').value); cur=-1; draw(); t6kq(e,true,`Replace All: đã thay <b>${n}</b> chỗ`); check();};
  e.querySelector('.un').onclick=()=>{if(undo.length){txt=undo.pop(); cur=-1; draw(); t6kq(e,null,'↶ Đã hoàn tác');}};
  e.querySelector('.f').oninput=()=>{cur=-1; draw();};
  draw(); return e;
};

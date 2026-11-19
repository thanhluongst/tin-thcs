/* Tin học 6 · Bài 16. Các cấu trúc điều khiển · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: một ngày của bạn Mai và chú robot tưới cây Bin.
   Mô phỏng: t6_bacautruc (Ba kiểu chỉ dẫn), t6_renhanh (Ngã rẽ: nếu… thì… nếu không…), t6_lap (Robot Bin tưới cây). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Một ngày của Mai',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p>Buổi sáng của Mai có những việc: <i>đánh răng rồi rửa mặt</i>; <i>nếu trời mưa thì mang áo mưa</i>; <i>chạy 3 vòng sân</i>. Bấm từng việc để xem cách các bước được thực hiện.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_bacautruc'},
      {id:'k1',type:'match',q:'Ghép việc làm với kiểu thực hiện.',items:['Đánh răng rồi rửa mặt','Nếu trời mưa thì mang áo mưa','Chạy 3 vòng sân'],opts:['Lặp lại','Lần lượt từng bước','Chọn theo điều kiện'],ok:[1,2,0]}],
  key:['Ba cấu trúc điều khiển: <b>tuần tự</b>, <b>rẽ nhánh</b>, <b>lặp</b>.']},

 {t:'Cấu trúc rẽ nhánh',hd:'Hình thành kiến thức · Hoạt động 1 · 11 phút',code:'2.1',ic:'',phut:11,
  story:'<p><b>Rẽ nhánh</b>: kiểm tra một <b>điều kiện</b>; đúng thì làm việc này, sai thì làm việc khác (hoặc không làm gì). Đổi điều kiện trong mô phỏng và xem đường đi sáng lên.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_renhanh'},
      {id:'h1',type:'single',q:'Dạng <b>thiếu</b> “Nếu trời mưa thì mang áo mưa”: khi trời không mưa, Mai…',opts:['Mang áo mưa','Không làm gì thêm, đi tiếp','Ở nhà','Đi mua áo mưa'],ok:1},
      {id:'h2',type:'single',q:'Cấu trúc nào là rẽ nhánh dạng <b>đủ</b>?',opts:['Nếu… thì…','Nếu… thì… nếu không thì…','Lặp 10 lần…','Làm A rồi làm B'],ok:1}],
  key:['Rẽ nhánh <b>thiếu</b>: nếu… thì…; <b>đủ</b>: nếu… thì… nếu không thì…']},

 {t:'Cấu trúc lặp',hd:'Hình thành kiến thức · Hoạt động 2 · 11 phút',code:'2.2',ic:'',phut:11,
  story:'<p><b>Lặp</b>: thực hiện một việc nhiều lần. Có hai kiểu: lặp với <b>số lần biết trước</b>, và lặp <b>đến khi điều kiện xảy ra</b>. Điều khiển robot Bin tưới hàng cây.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_lap'},
      {id:'h3',type:'sort',q:'Lặp số lần biết trước hay lặp với điều kiện?',cols:{c0:'Biết trước số lần',c1:'Lặp đến khi có điều kiện'},items:[{t:'Chạy 3 vòng sân',a:'c0'},{t:'Tưới cây đến khi bình hết nước',a:'c1'},{t:'Chép phạt 5 lần',a:'c0'},{t:'Đọc sách đến khi buồn ngủ',a:'c1'}]},
      {id:'h4',type:'single',q:'Vì sao dùng lặp giúp viết thuật toán ngắn gọn?',opts:['Không phải viết lại một việc nhiều lần','Máy tính chạy chậm hơn','Không cần điều kiện','Bỏ bớt bước'],ok:0}],
  key:['<b>Lặp</b>: lặp với <b>số lần biết trước</b> hoặc lặp <b>có điều kiện</b>.']},

 {t:'Thử thách nhanh',hd:'Luyện tập · 6 phút',code:'3',ic:'',phut:6,
  qs:[{id:'l1',type:'sort',q:'Xếp vào đúng cấu trúc.',cols:{c0:'Rẽ nhánh',c1:'Lặp'},items:[{t:'Nếu điểm ≥ 5 thì “Đạt”, nếu không “Chưa đạt”',a:'c0'},{t:'Nhảy dây 50 lần',a:'c1'},{t:'Nếu đói thì ăn cơm',a:'c0'},{t:'Gõ cửa đến khi có người mở',a:'c1'}]},
      {id:'l2',type:'single',q:'Điểm 4, áp dụng “Nếu điểm ≥ 5 thì Đạt, nếu không thì Chưa đạt”. Kết quả?',opts:['Đạt','Chưa đạt','Không có kết quả','Cả hai'],ok:1}],
  key:['Mọi thuật toán đều ghép từ <b>3 cấu trúc</b>: tuần tự, rẽ nhánh, lặp.']},

 {t:'Thuật toán của em',hd:'Vận dụng · 7 phút',code:'4',ic:'',phut:7,
  qs:[{id:'v1',type:'text',q:'Viết thuật toán “Đánh răng buổi sáng” có dùng ít nhất một cấu trúc rẽ nhánh hoặc lặp.',ans:'VD: Lấy bàn chải; nếu hết kem thì báo mẹ, nếu không thì bóp kem; lặp chải 30 lần; súc miệng; cất bàn chải.'}],
  key:['Dùng cấu trúc phù hợp để mô tả việc <b>hằng ngày</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'“Lặp lại: tưới một cây, đến khi tưới hết hàng” là cấu trúc gì?',opts:['Tuần tự','Rẽ nhánh','Lặp có điều kiện','Không phải cấu trúc'],ok:2},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Tuần tự – rẽ nhánh – lặp</b>.']}
];

const GHIBAI={so:'Bài 16:',ten:'CÁC CẤU TRÚC ĐIỀU KHIỂN',muc:[
 {step:2,h:'Ba cấu trúc',it:['<b>Tuần tự</b>: lần lượt từng bước.']},
 {step:3,h:'Rẽ nhánh',it:['<b>Thiếu</b>: nếu… thì…','<b>Đủ</b>: nếu… thì… nếu không thì…']},
 {step:4,h:'Lặp',it:['Lặp <b>số lần biết trước</b>; lặp <b>có điều kiện</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 .stg{max-width:560px;margin:8px auto;min-height:70px;background:#f0f9ff;border-radius:14px;padding:10px;font-size:30px;text-align:center}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_bacautruc=function(){
  const A={tt:['🪥➜🧼','Đánh răng rồi rửa mặt','<b>Tuần tự</b>: các bước lần lượt, bước trước xong mới tới bước sau',['🪥 Đánh răng','🧼 Rửa mặt','✓ Xong']],
           rn:['🌧️❓','Nếu trời mưa thì mang áo mưa','<b>Rẽ nhánh</b>: kiểm tra điều kiện rồi chọn việc làm',null],
           lp:['🏃🔁','Chạy 3 vòng sân','<b>Lặp</b>: một việc thực hiện nhiều lần',['🏃 Vòng 1','🏃 Vòng 2','🏃 Vòng 3','✓ Xong']]};
  const e=t6('Ba kiểu chỉ dẫn','Bấm từng việc của Mai và xem các bước diễn ra.',
   `<div class="g">${Object.entries(A).map(([k,a])=>`<button type="button" class="c" data-k="${k}"><span class="e">${a[0]}</span>${a[1]}</button>`).join('')}</div><div class="stg">👧</div><div class="kq">Chọn một việc</div>`);
  let tm=[]; const stg=e.querySelector('.stg');
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{tm.forEach(clearTimeout); tm=[]; const a=A[b.dataset.k]; let st=a[3];
    if(!st){const mua=Math.random()<.5; st=[mua?'🌧️ Trời mưa? → ĐÚNG':'☀️ Trời mưa? → SAI', mua?'🧥 Mang áo mưa':'(bỏ qua)','🚲 Đi học'];}
    stg.innerHTML=''; st.forEach((s,i)=>tm.push(setTimeout(()=>{stg.innerHTML+=(i?' ➜ ':'')+`<span style="font-size:20px;font-weight:700">${s}</span>`; FX.play('tick');},i*600)));
    tm.push(setTimeout(()=>t6kq(e,true,a[2]),st.length*600));});
  return e;
};
SIMS_BAI.t6_renhanh=function(){
  const e=t6('Ngã rẽ: nếu… thì… nếu không…','Chọn dạng rẽ nhánh và thời tiết, bấm <b>▶ Chạy</b>. Đường đi được tô màu.',
   `<div class="sim-ctl" style="justify-content:center"><div><b>Dạng</b> ${_seg('d',[['thieu','Thiếu'],['du','Đủ']],'du')}</div><div><b>Thời tiết</b> ${_seg('w',[['mua','🌧️ Mưa'],['nang','☀️ Nắng']],'mua')}</div><button type="button" class="btn acc run">▶ Chạy</button></div>
    <svg class="sv" viewBox="0 0 520 300" style="width:100%;max-width:520px;display:block;margin:auto"></svg><div class="kq">Bấm ▶ Chạy</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Dạng</th><th>Thời tiết</th><th>Mai làm gì</th></tr></table>`);
  const S={d:'du',w:'mua'}, hist=[]; _wireSeg(e,(n,v)=>{S[n]=v; draw();});
  const draw=(path)=>{const on=k=>path&&path.includes(k)?'#f59e0b':'#94a3b8', fl=k=>path&&path.includes(k)?'#fde68a':'#fff';
    e.querySelector('.sv').innerHTML=`<polygon points="260,20 360,70 260,120 160,70" fill="${fl('dk')}" stroke="#1e3a8a" stroke-width="3"/><text x="260" y="76" text-anchor="middle" font-weight="700">Trời mưa?</text>
     <line x1="160" y1="70" x2="90" y2="70" stroke="${on('dung')}" stroke-width="5"/><line x1="90" y1="70" x2="90" y2="150" stroke="${on('dung')}" stroke-width="5"/><text x="120" y="60" font-weight="700" fill="#16a34a">Đúng</text>
     <rect x="20" y="150" width="140" height="44" rx="6" fill="${fl('dung')}" stroke="#1e3a8a" stroke-width="3"/><text x="90" y="178" text-anchor="middle" font-weight="700">🧥 Mang áo mưa</text>
     <line x1="360" y1="70" x2="430" y2="70" stroke="${on('sai')}" stroke-width="5"/><line x1="430" y1="70" x2="430" y2="150" stroke="${on('sai')}" stroke-width="5"/><text x="380" y="60" font-weight="700" fill="#dc2626">Sai</text>
     ${S.d==='du'?`<rect x="360" y="150" width="140" height="44" rx="6" fill="${fl('sai')}" stroke="#1e3a8a" stroke-width="3"/><text x="430" y="178" text-anchor="middle" font-weight="700">🧢 Đội mũ</text>`:`<text x="430" y="178" text-anchor="middle" font-style="italic">(không làm gì)</text>`}
     <line x1="90" y1="194" x2="90" y2="250" stroke="${on('dung')}" stroke-width="5"/><line x1="430" y1="194" x2="430" y2="250" stroke="${on('sai')}" stroke-width="5"/><line x1="90" y1="250" x2="430" y2="250" stroke="#94a3b8" stroke-width="5"/>
     <rect x="200" y="235" width="120" height="40" rx="20" fill="${fl('di')}" stroke="#1e3a8a" stroke-width="3"/><text x="260" y="261" text-anchor="middle" font-weight="700">🚲 Đi học</text>`;};
  e.querySelector('.run').onclick=()=>{const m=S.w==='mua', p=['dk',m?'dung':'sai','di']; FX.play('whoosh'); draw(p);
    const lam=m?'Mang áo mưa rồi đi học':S.d==='du'?'Đội mũ rồi đi học':'Đi học luôn';
    t6kq(e,true,`Điều kiện “Trời mưa?” <b>${m?'ĐÚNG':'SAI'}</b> → ${lam}`); hist.unshift([S.d==='du'?'Đủ':'Thiếu',m?'Mưa':'Nắng',lam]); if(hist.length>6) hist.pop(); histTable(e,hist,()=>'');};
  draw(); return e;
};
SIMS_BAI.t6_lap=function(){
  const e=t6('Robot Bin tưới cây','Chọn kiểu lặp rồi bấm <b>▶ Chạy</b>. Hàng có 8 cây, bình chứa đủ nước tưới 5 cây.',
   `<div class="sim-ctl" style="justify-content:center"><div><b>Kiểu lặp</b> ${_seg('k',[['3','Lặp 3 lần'],['8','Lặp 8 lần'],['dk','Lặp đến khi bình hết nước']],'3')}</div><button type="button" class="btn acc run">▶ Chạy</button></div>
    <div class="row" style="display:grid;grid-template-columns:repeat(8,1fr);gap:4px;max-width:560px;margin:8px auto;font-size:30px;text-align:center"></div>
    <div style="text-align:center;font-weight:700">🪣 Nước trong bình: <span class="nc">5</span>/5 · Số lần lặp: <span class="sl">0</span></div><div class="kq">Bấm ▶ Chạy</div>`);
  let k='3', busy=false; _wireSeg(e,(n,v)=>k=v);
  const row=e.querySelector('.row'), draw=(w,pos)=>{row.innerHTML=Array.from({length:8},(_,i)=>`<div style="background:${i<w?'#dcfce7':'#fef9c3'};border-radius:8px;padding:4px">${i<w?'🌳':'🌱'}<br>${i===pos?'🤖':''}</div>`).join('');};
  e.querySelector('.run').onclick=()=>{if(busy) return; busy=true; let n=0, nuoc=5; draw(0,0); e.querySelector('.nc').textContent=5;
    const t=setInterval(()=>{const stop=k==='dk'?nuoc===0:n>=+k;
      if(stop||n>=8){clearInterval(t); busy=false;
        t6kq(e,k==='dk'?true:n<=5?true:false,k==='dk'?`Lặp có điều kiện: dừng khi bình hết nước, tưới được <b>${n}</b> cây.`:n>5?`Lặp ${k} lần nhưng bình chỉ đủ 5 cây: ${n-5} lần tưới khô! 😮`:`Lặp đúng <b>${k}</b> lần (biết trước số lần), tưới ${n} cây.`); return;}
      if(nuoc>0){nuoc--;} n++; draw(Math.min(n,5-nuoc+0),Math.min(n,7)); FX.play(nuoc>=0?'tick':'tick');
      e.querySelector('.nc').textContent=nuoc; e.querySelector('.sl').textContent=n;},500);};
  draw(0,0); return e;
};

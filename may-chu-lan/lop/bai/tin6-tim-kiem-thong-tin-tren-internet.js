/* Tin học 6 · Bài 7. Tìm kiếm thông tin trên Internet · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: Mai cần tìm thông tin về "Vịnh Hạ Long" và "cách trồng cây xoài" cho bài tập.
   Mô phỏng: t6_thuvien (Tìm sách trong thư viện), t6_maytk (Máy tìm kiếm thu nhỏ), t6_chontk (Chọn từ khoá tốt nhất). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Tìm một cuốn sách',hd:'Khởi động · 5 phút',code:'1',ic:'',phut:5,
  story:'<p>Thư viện có 60 cuốn sách. Mai cần tìm cuốn <b>“Vịnh Hạ Long”</b>. Mai có thể lật từng kệ, hoặc tra <b>mục lục</b> của thư viện. Cách nào nhanh hơn?</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_thuvien'},
      {id:'k1',type:'single',q:'Trên Internet có hàng tỉ trang web. Muốn tìm nhanh, ta cần công cụ giống “mục lục” là…',opts:['Máy tìm kiếm','Máy in','Bàn phím','Thư điện tử'],ok:0}],
  key:['Thông tin trên Internet rất nhiều; cần <b>máy tìm kiếm</b> để tìm nhanh.']},

 {t:'Máy tìm kiếm và từ khoá',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',ic:'',phut:12,
  story:'<p><b>Máy tìm kiếm</b> (Google, Bing, Cốc Cốc…) giúp tìm trang web theo <b>từ khoá</b>. Gõ từ khoá vào mô phỏng và xem số kết quả. Thử đặt từ khoá trong dấu <b>“ ”</b>.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_maytk'},
      {id:'h1',type:'single',q:'Từ khoá là gì?',opts:['Mật khẩu của máy tính','Từ hoặc cụm từ liên quan đến nội dung cần tìm','Tên của máy tìm kiếm','Địa chỉ trang web'],ok:1},
      {id:'h2',type:'single',q:'Đặt từ khoá trong dấu ngoặc kép “ ” thì kết quả…',opts:['Nhiều hơn','Chỉ gồm các trang chứa đúng cụm từ đó, ít và sát hơn','Không có kết quả','Giống hệt không có ngoặc'],ok:1}],
  key:['<b>Máy tìm kiếm</b> tìm trang web theo <b>từ khoá</b>; dùng <b>“ ”</b> để tìm chính xác cụm từ.']},

 {t:'Chọn từ khoá tốt',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',ic:'',phut:8,
  story:'<p>Cùng một câu hỏi, từ khoá khác nhau cho kết quả khác nhau. Chọn từ khoá tốt nhất cho mỗi câu hỏi.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_chontk'},
      {id:'h3',type:'multi',q:'Từ khoá tốt thường… (chọn các ý đúng)',opts:['Ngắn gọn, đúng trọng tâm','Có từ đặc trưng của nội dung cần tìm','Là cả một câu dài lan man','Không cần liên quan đến câu hỏi'],ok:[0,1]}],
  key:['Chọn từ khoá <b>ngắn gọn</b>, <b>đặc trưng</b> để kết quả <b>sát</b> với điều cần tìm.']},

 {t:'Các bước tìm kiếm',hd:'Luyện tập · 7 phút',code:'3',ic:'',phut:7,
  qs:[{id:'l1',type:'match',q:'Sắp xếp các bước tìm kiếm: ghép số thứ tự với việc làm.',items:['Bước 1','Bước 2','Bước 3','Bước 4'],opts:['Gõ từ khoá vào ô tìm kiếm, nhấn Enter','Mở trình duyệt, vào máy tìm kiếm','Xem kết quả, chọn trang phù hợp','Đọc, kiểm tra thông tin trên trang đã chọn'],ok:[1,0,2,3]},
      {id:'l2',type:'sort',q:'Đâu là máy tìm kiếm?',cols:{c0:'Máy tìm kiếm',c1:'Không phải'},items:[{t:'Google',a:'c0'},{t:'Bing',a:'c0'},{t:'Word',a:'c1'},{t:'Cốc Cốc',a:'c0'},{t:'Paint',a:'c1'}]}],
  key:['Mở máy tìm kiếm → gõ <b>từ khoá</b> → chọn kết quả → <b>đọc, kiểm tra</b>.']},

 {t:'Tìm cho bài tập',hd:'Vận dụng · 6 phút',code:'4',ic:'',phut:6,
  qs:[{id:'v1',type:'text',q:'Em cần tìm “cách trồng và chăm sóc cây xoài”. Em sẽ dùng từ khoá gì? Vì sao?',ans:'VD: “cách trồng cây xoài” hoặc trồng xoài chăm sóc – ngắn gọn, có từ đặc trưng.'}],
  key:['Thông tin tìm được cần <b>kiểm tra</b> độ tin cậy.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Muốn tìm đúng cụm “Vịnh Hạ Long”, em gõ…',opts:['Vịnh','“Vịnh Hạ Long”','Hạ','Vịnh Hạ Long đẹp không bạn ơi'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Máy tìm kiếm + từ khoá tốt</b> = tìm nhanh, đúng.']}
];

const GHIBAI={so:'Bài 7:',ten:'TÌM KIẾM THÔNG TIN TRÊN INTERNET',muc:[
 {step:2,h:'Máy tìm kiếm',it:['Công cụ tìm trang web theo <b>từ khoá</b>: Google, Bing, Cốc Cốc.','<b>Từ khoá</b>: từ, cụm từ liên quan nội dung cần tìm.']},
 {step:3,h:'Từ khoá tốt',it:['<b>Ngắn gọn, đặc trưng</b>; dùng <b>“ ”</b> để tìm đúng cụm từ.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_thuvien=function(){
  const e=t6('Tìm sách trong thư viện','Bấm <b>🐢 Lật từng cuốn</b> hoặc <b>⚡ Tra mục lục</b> để tìm cuốn “Vịnh Hạ Long”.',
   `<div class="ke" style="display:grid;grid-template-columns:repeat(15,1fr);gap:3px;max-width:560px;margin:10px auto">${Array.from({length:60},(_,i)=>`<div style="height:34px;border-radius:4px;background:hsl(${i*37%360},60%,70%)"></div>`).join('')}</div>
    <div class="sim-ctl" style="justify-content:center"><button type="button" class="btn ghost cham">🐢 Lật từng cuốn</button><button type="button" class="btn acc nhanh">⚡ Tra mục lục</button></div><div class="kq">Cuốn sách nằm đâu đó trong 60 cuốn…</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Cách tìm</th><th>Số cuốn phải xem</th></tr></table>`);
  const B=[...e.querySelectorAll('.ke div')], hist=[]; let busy=false;
  const reset=()=>B.forEach((b,i)=>{b.style.outline='';b.style.opacity=1;});
  e.querySelector('.cham').onclick=()=>{if(busy) return; busy=true; reset(); const x=30+Math.floor(Math.random()*30); let i=0;
    const t=setInterval(()=>{B[i].style.opacity=.3; FX.play('tick'); if(i===x){clearInterval(t); B[i].style.opacity=1; B[i].style.outline='4px solid #16a34a'; busy=false;
      t6kq(e,null,`📕 Tìm thấy sau khi xem <b>${x+1}</b> cuốn. Mệt quá!`); hist.unshift(['Lật từng cuốn',x+1]); histTable(e,hist,()=>'');} i++;},45);};
  e.querySelector('.nhanh').onclick=()=>{if(busy) return; reset(); const x=Math.floor(Math.random()*60); B[x].style.outline='4px solid #16a34a';
    t6kq(e,true,`⚡ Mục lục ghi: <b>kệ ${Math.floor(x/15)+1}, vị trí ${x%15+1}</b> → tìm thấy ngay!`); hist.unshift(['Tra mục lục',1]); histTable(e,hist,(v,j)=>j===1?'g':'');};
  return e;
};
SIMS_BAI.t6_maytk=function(){
  const D=['Vịnh Hạ Long – di sản thiên nhiên thế giới','Du lịch Hạ Long 3 ngày 2 đêm','Lịch sử hình thành Vịnh Hạ Long','Hạ Long có gì đẹp? 10 điểm đến','Cách trồng cây xoài cho quả sai','Kĩ thuật chăm sóc cây xoài','Giá xoài hôm nay','Cách làm bánh chưng ngày Tết','Lịch sử Việt Nam thời Lý','Bản đồ tỉnh Quảng Ninh','Hang Sửng Sốt ở Vịnh Hạ Long','Bài hát về biển Hạ Long','Trường THCS tổ chức tham quan Hạ Long','Cách trồng rau sạch tại nhà','Kĩ thuật trồng cây ăn quả'];
  const e=t6('Máy tìm kiếm thu nhỏ','Gõ từ khoá và bấm <b>🔍 Tìm</b>. Thử: <code>Hạ Long</code>, <code>"Vịnh Hạ Long"</code>, <code>trồng xoài</code>, <code>cách trồng</code>.',
   `<div class="sim-ctl" style="justify-content:center"><input class="q" style="font:600 18px system-ui;padding:10px 14px;border-radius:999px;border:2px solid #94a3b8;min-width:260px" value="Hạ Long"><button type="button" class="btn acc run">🔍 Tìm</button></div>
    <div class="kq">Gõ từ khoá để tìm</div><div class="rs" style="max-width:560px;margin:auto"></div>`);
  const norm=s=>s.toLowerCase();
  const run=()=>{const q=e.querySelector('.q').value.trim(); if(!q) return; const m=q.match(/^["“](.+)["”]$/);
    const hit=m?D.filter(d=>norm(d).includes(norm(m[1]))):D.filter(d=>norm(q).split(/\s+/).some(w=>norm(d).includes(w)));
    t6kq(e,hit.length?true:false,`Tìm thấy <b>${hit.length}</b> kết quả cho ${m?'cụm chính xác':'từ khoá'} <code>${q.replace(/</g,'&lt;')}</code>`);
    e.querySelector('.rs').innerHTML=hit.map(d=>`<div style="padding:6px 10px;border-bottom:1px solid #e2e8f0"><span style="color:#1d4ed8;font-weight:700;text-decoration:underline">${d}</span></div>`).join('');};
  e.querySelector('.run').onclick=run; e.querySelector('.q').onkeydown=ev=>{if(ev.key==='Enter') run();};
  return e;
};
SIMS_BAI.t6_chontk=function(){
  const Q=[['Hang động đẹp nhất ở Vịnh Hạ Long?',[['hang',20,0],['Hạ Long',35,0],['hang động Vịnh Hạ Long',95,1],['đẹp',10,0]]],
           ['Cách trồng cây xoài?',[['cây',15,0],['cách trồng cây xoài',95,1],['xoài ngon',40,0],['trồng',25,0]]],
           ['Vua nào dời đô ra Thăng Long?',[['vua',10,0],['dời đô Thăng Long',95,1],['Thăng',20,0],['lịch sử',15,0]]]];
  const e=t6('Chọn từ khoá tốt nhất','Mỗi câu hỏi, bấm chọn từ khoá. Thanh màu cho biết kết quả <b>sát</b> với câu hỏi đến đâu.',
   `<div class="cq" style="font-size:18px;font-weight:800;text-align:center;margin:8px"></div><div class="g op"></div>
    <div style="max-width:420px;margin:auto;background:#e2e8f0;border-radius:999px;height:22px"><div class="bar" style="height:100%;width:0;border-radius:999px;background:#16a34a;transition:width .5s"></div></div>
    <div class="sim-ctl" style="justify-content:center"><button type="button" class="btn ghost nx">➡ Câu tiếp</button><span class="sc">Câu 1/3</span></div><div class="kq">Chọn một từ khoá</div>`);
  let k=0;
  const show=()=>{const q=Q[k]; e.querySelector('.cq').textContent='❓ '+q[0]; e.querySelector('.sc').textContent=`Câu ${k+1}/3`; e.querySelector('.bar').style.width='0';
    e.querySelector('.op').innerHTML=q[1].map((o,i)=>`<button type="button" class="c" data-i="${i}">🔑 ${o[0]}</button>`).join('');
    e.querySelectorAll('.op .c').forEach(b=>b.onclick=()=>{const o=q[1][+b.dataset.i]; e.querySelectorAll('.op .c').forEach(x=>x.classList.remove('ok','no')); b.classList.add(o[2]?'ok':'no');
      const bar=e.querySelector('.bar'); bar.style.width=o[1]+'%'; bar.style.background=o[2]?'#16a34a':'#f59e0b';
      t6kq(e,!!o[2],o[2]?`✓ Độ sát ${o[1]}%: từ khoá ngắn gọn, đặc trưng!`:`Độ sát chỉ ${o[1]}%: từ khoá quá chung chung hoặc lệch ý.`);});};
  e.querySelector('.nx').onclick=()=>{k=(k+1)%3; show(); t6kq(e,null,'Chọn một từ khoá');}; show();
  return e;
};

/* Tin học 6 · Bài 2. Xử lí thông tin · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: thủ môn bắt phạt đền và chiếc máy tính của lớp.
   Mô phỏng: t6_phatden (Bắt phạt đền), t6_chutrinh (Bốn bước xử lí thông tin), t6_thanhphan (Bên trong máy tính), t6_duatoc (Người hay máy nhanh hơn). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Quả phạt đền',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p>Em là <b>thủ môn</b>. Trước khi sút, cầu thủ có những dấu hiệu: nhìn về một góc, đặt chân trụ… Em phải <b>quan sát</b>, <b>nhớ</b> thói quen của cầu thủ, <b>suy nghĩ</b> rồi <b>bay người</b>.</p><p>Thử bắt 5 quả phạt đền trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_phatden'},
      {id:'k1',type:'single',q:'Muốn bắt được bóng, thủ môn dựa vào đâu?',opts:['Đoán bừa','Quan sát dấu hiệu, xử lí rồi quyết định hướng bay','Nhắm mắt lại','Đứng yên giữa khung thành'],ok:1}],
  key:['Thủ môn <b>thu nhận</b>, <b>lưu trữ</b>, <b>xử lí</b> thông tin rồi hành động: đó là <b>xử lí thông tin</b>.']},

 {t:'Bốn hoạt động xử lí thông tin',hd:'Hình thành kiến thức · Hoạt động 1 · 9 phút',code:'2.1',ic:'',phut:9,
  story:'<p>Xử lí thông tin gồm 4 hoạt động: <b>thu nhận → xử lí → lưu trữ → truyền</b>. Chọn một tình huống và bấm <b>▶ Chạy</b> để xem từng hoạt động sáng lên.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_chutrinh'},
      {id:'h1',type:'match',q:'Tình huống thủ môn: ghép mỗi việc với hoạt động.',items:['Nhìn hướng chạy đà của cầu thủ','Nhớ cầu thủ này hay sút góc trái','Suy luận và quyết định bay sang trái','Hô to cho đồng đội biết'],
       opts:['Lưu trữ','Truyền','Thu nhận','Xử lí'],ok:[2,0,3,1]},
      {id:'h2',type:'single',q:'Hoạt động nào biến thông tin đã có thành thông tin mới, quyết định mới?',opts:['Thu nhận','Xử lí','Lưu trữ','Truyền'],ok:1}],
  key:['Xử lí thông tin: <b>thu nhận</b>, <b>xử lí</b>, <b>lưu trữ</b>, <b>truyền</b> thông tin.']},

 {t:'Máy tính xử lí thông tin',hd:'Hình thành kiến thức · Hoạt động 2 · 9 phút',code:'2.2',ic:'',phut:9,
  story:'<p>Máy tính cũng xử lí thông tin như con người. Bấm vào từng bộ phận để biết nó làm nhiệm vụ gì.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_thanhphan'},
      {id:'h3',type:'sort',q:'Xếp thiết bị vào đúng nhóm.',cols:{c0:'Thiết bị vào',c1:'Thiết bị ra'},items:[{t:'Bàn phím',a:'c0'},{t:'Màn hình',a:'c1'},{t:'Chuột',a:'c0'},{t:'Máy in',a:'c1'},{t:'Micro',a:'c0'},{t:'Loa',a:'c1'}]},
      {id:'h4',type:'single',q:'Bộ phận nào giống “bộ não” của máy tính?',opts:['Bộ xử lí (CPU)','Bàn phím','Loa','Ổ đĩa'],ok:0}],
  key:['Máy tính gồm: <b>thiết bị vào</b>, <b>bộ xử lí</b>, <b>bộ nhớ</b>, <b>thiết bị ra</b>.']},

 {t:'Người hay máy nhanh hơn?',hd:'Hình thành kiến thức · Hoạt động 3 · 6 phút',code:'2.3',ic:'',phut:6,
  story:'<p>Cùng tính tổng các số từ 1 đến N. Đặt N rồi cho người và máy tính thi với nhau.</p>',
  qs:[{id:'s4',type:'sim',sim:'t6_duatoc'},
      {id:'h5',type:'multi',q:'Máy tính giúp con người xử lí thông tin hiệu quả nhờ…',opts:['Tính toán rất nhanh','Lưu trữ được rất nhiều','Chính xác, làm việc không mệt','Tự biết mọi điều mà không cần con người'],ok:[0,1,2]}],
  key:['Máy tính xử lí <b>nhanh</b>, <b>chính xác</b>, lưu trữ <b>lớn</b>; là công cụ hỗ trợ con người.']},

 {t:'Phân loại công việc',hd:'Luyện tập · 6 phút',code:'3',ic:'',phut:6,
  story:'<p>Em dùng máy tính làm bài tập về nhà.</p>',
  qs:[{id:'l1',type:'sort',q:'Việc nào là <b>thu nhận</b>, việc nào là <b>truyền</b> thông tin?',cols:{c0:'Thu nhận',c1:'Truyền'},items:[{t:'Gõ đề bài bằng bàn phím',a:'c0'},{t:'Gửi bài cho cô qua thư điện tử',a:'c1'},{t:'Quét ảnh bài vẽ vào máy',a:'c0'},{t:'In bài ra giấy',a:'c1'}]},
      {id:'l2',type:'single',q:'Lưu bài vào thẻ nhớ là hoạt động nào?',opts:['Thu nhận','Xử lí','Lưu trữ','Truyền'],ok:2}],
  key:['Mỗi thao tác với máy tính đều thuộc một trong <b>4 hoạt động</b> xử lí thông tin.']},

 {t:'Xử lí thông tin quanh em',hd:'Vận dụng · 5 phút',code:'4',ic:'',phut:5,
  story:'<p>Khi qua đường, em xử lí thông tin như thế nào?</p>',
  qs:[{id:'v1',type:'text',q:'Mô tả 4 hoạt động khi em qua đường.',ans:'Thu nhận: nhìn đèn, xe cộ; Xử lí: đánh giá xe xa hay gần; Lưu trữ: nhớ luật giao thông; Truyền: giơ tay xin đường, bước đi.'}],
  key:['Con người xử lí thông tin <b>mọi lúc</b>; máy tính giúp làm việc đó nhanh hơn.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Thứ tự đúng của quá trình xử lí thông tin trong máy tính?',opts:['Ra → Xử lí → Vào','Vào (thu nhận) → Xử lí, lưu trữ → Ra (truyền)','Lưu trữ → Vào → Ra','Xử lí → Vào → Ra'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Thu nhận → xử lí → lưu trữ → truyền</b>.']}
];

const GHIBAI={so:'Bài 2:',ten:'XỬ LÍ THÔNG TIN',muc:[
 {step:2,h:'Xử lí thông tin',it:['Gồm 4 hoạt động: <b>thu nhận, xử lí, lưu trữ, truyền</b>.']},
 {step:3,h:'Máy tính',it:['Thành phần: <b>thiết bị vào, bộ xử lí, bộ nhớ, thiết bị ra</b>.'],flow:['Thiết bị vào','Bộ xử lí + bộ nhớ','Thiết bị ra']},
 {step:4,h:'Hiệu quả',it:['Máy tính <b>nhanh, chính xác</b>, lưu trữ lớn.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_phatden=function(){
  const H=[['L','⬅️ Trái'],['M','⬆️ Giữa'],['R','➡️ Phải']], CUE={L:'nhìn sang góc trái, chân trụ hướng trái',M:'chạy đà thẳng, nhìn giữa',R:'nhìn sang góc phải, xoay người phải'};
  const e=t6('Bắt phạt đền','Đọc <b>dấu hiệu</b> của cầu thủ rồi chọn hướng bay người. Mỗi lượt 1 quả, đủ 5 quả.',
   `<div class="cue" style="margin:10px 0;padding:12px;border-radius:14px;background:#e0f2fe;font-weight:700;text-align:center;font-size:17px">⚽ Bấm “Quả mới”</div><div class="g">${H.map(h=>`<button type="button" class="c" data-v="${h[0]}"><span class="e">🧤</span>${h[1]}</button>`).join('')}</div><div class="sim-ctl" style="justify-content:center"><button type="button" class="btn acc nx">⚽ Quả mới</button><span class="sc">Bắt được: 0/0</span></div><div class="kq">Chưa sút</div>`);
  let cur=null, ok=0, n=0;
  e.querySelector('.nx').onclick=()=>{ if(n>=5){ok=0;n=0;} cur='LMR'[Math.floor(Math.random()*3)]; e.querySelector('.cue').innerHTML='👀 Dấu hiệu: cầu thủ <b>'+CUE[cur]+'</b>'; FX.play('whoosh'); };
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{ if(!cur) return; const real=Math.random()<.8?cur:'LMR'[Math.floor(Math.random()*3)]; n++;
    const win=b.dataset.v===real; if(win) ok++; t6kq(e,win,(win?'🧤 Cản phá thành công!':'😮 Bóng vào lưới!')+' Bóng bay về '+H.find(h=>h[0]===real)[1]);
    e.querySelector('.sc').textContent=`Bắt được: ${ok}/${n}`; cur=null; e.querySelector('.cue').innerHTML=n>=5?'🏁 Hết 5 quả! Đọc dấu hiệu giúp em bắt được '+ok+' quả.':'⚽ Bấm “Quả mới”'; });
  return e;
};
SIMS_BAI.t6_chutrinh=function(){
  const P=['📥 Thu nhận','⚙️ Xử lí','🗄️ Lưu trữ','📤 Truyền'];
  const S={hoc:['Nghe cô giảng, đọc sách','Suy nghĩ, hiểu bài, giải bài tập','Ghi vào vở, nhớ trong đầu','Trả lời cô, giảng lại cho bạn'],
           thu:['Nhìn hướng chạy đà của cầu thủ','Phán đoán hướng bóng','Nhớ thói quen sút của cầu thủ','Bay người, hô đồng đội'],
           may:['Gõ bàn phím, bấm chuột','Bộ xử lí tính toán','Lưu vào bộ nhớ, ổ đĩa','Hiện lên màn hình, in ra']};
  const e=t6('Bốn hoạt động xử lí thông tin','Chọn tình huống rồi bấm <b>▶ Chạy</b>.',
   `<div class="sim-ctl" style="justify-content:center">${_seg('sc',[['hoc','📚 Em học bài'],['thu','🧤 Thủ môn'],['may','💻 Máy tính']],'hoc')}<button type="button" class="btn acc run">▶ Chạy</button></div>
    <div class="g">${P.map((p,i)=>`<div class="c" data-i="${i}" style="width:150px;cursor:default"><b>${p}</b><br><small class="d">…</small></div>`).join('<span style="font-size:28px;align-self:center">➜</span>')}</div><div class="kq">Chọn tình huống và chạy</div>`);
  let sc='hoc'; _wireSeg(e,(n,v)=>sc=v);
  e.querySelector('.run').onclick=()=>{ const bx=[...e.querySelectorAll('div.c')]; bx.forEach(b=>{b.classList.remove('ok');b.querySelector('.d').textContent='…';});
    bx.forEach((b,i)=>setTimeout(()=>{b.classList.add('ok'); b.querySelector('.d').textContent=S[sc][i]; FX.play('tick'); if(i===3) t6kq(e,true,'Xong một vòng xử lí thông tin!');},i*700)); };
  return e;
};
SIMS_BAI.t6_thanhphan=function(){
  const D=[['⌨️','Bàn phím','in','Thiết bị vào: nhận thông tin từ người dùng'],['🖱️','Chuột','in','Thiết bị vào: chọn, điều khiển'],['🎤','Micro','in','Thiết bị vào: thu âm thanh'],['🧠','Bộ xử lí (CPU)','cpu','Xử lí thông tin, giống bộ não'],['💾','Bộ nhớ, ổ đĩa','mem','Lưu trữ dữ liệu'],['🖥️','Màn hình','out','Thiết bị ra: hiện kết quả'],['🖨️','Máy in','out','Thiết bị ra: in ra giấy'],['🔊','Loa','out','Thiết bị ra: phát âm thanh']];
  const N={in:'📥 Thu nhận',cpu:'⚙️ Xử lí',mem:'🗄️ Lưu trữ',out:'📤 Truyền / đưa ra'};
  const e=t6('Bên trong máy tính','Bấm từng bộ phận: nó làm hoạt động nào trong xử lí thông tin?',
   `<div class="g">${D.map((d,i)=>`<button type="button" class="c" data-i="${i}"><span class="e">${d[0]}</span>${d[1]}</button>`).join('')}</div><div class="kq">Chọn một bộ phận</div>`);
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{ e.querySelectorAll('.c').forEach(x=>x.classList.remove('on')); b.classList.add('on'); const d=D[+b.dataset.i]; t6kq(e,true,`${d[0]} ${d[1]} → <b>${N[d[2]]}</b><br><small>${d[3]}</small>`); });
  return e;
};
SIMS_BAI.t6_duatoc=function(){
  const e=t6('Người hay máy nhanh hơn?','Chọn N rồi bấm <b>Thi</b>. Người cộng mỗi số mất khoảng 2 giây.',
   `<div class="sim-ctl" style="justify-content:center">${_seg('n',[['10','N = 10'],['100','N = 100'],['1000','N = 1000'],['1000000','N = 1 triệu']],'10')}<button type="button" class="btn acc run">🏁 Thi</button></div>
    <div style="max-width:520px;margin:auto"><div>🧑 Người <div style="background:#e2e8f0;border-radius:8px;height:22px"><div class="bh" style="background:#f59e0b;height:100%;width:0;border-radius:8px;transition:width 1.5s"></div></div></div>
    <div>💻 Máy tính <div style="background:#e2e8f0;border-radius:8px;height:22px"><div class="bm" style="background:#16a34a;height:100%;width:0;border-radius:8px;transition:width .2s"></div></div></div></div>
    <div class="kq">Chưa thi</div><table class="tbl sim-hist"><tr><th>Lần</th><th>N</th><th>Người</th><th>Máy tính</th></tr></table>`);
  let n=10; const hist=[]; _wireSeg(e,(k,v)=>n=+v);
  const tg=s=>s<60?s+' giây':s<3600?Math.round(s/60)+' phút':s<86400?Math.round(s/3600)+' giờ':Math.round(s/86400)+' ngày';
  e.querySelector('.run').onclick=()=>{ const bh=e.querySelector('.bh'), bm=e.querySelector('.bm'); bh.style.width=bm.style.width='0';
    setTimeout(()=>{bm.style.width='100%'; bh.style.width=Math.max(4,100-Math.log10(n)*20)+'%'; FX.play('whoosh');},50);
    const t=n*2, kq=(n*(n+1)/2).toLocaleString('vi-VN'); hist.unshift([n.toLocaleString('vi-VN'),tg(t),'chưa tới 1 giây']); if(hist.length>5) hist.pop();
    setTimeout(()=>{histTable(e,hist,(v,j)=>j===2?'g':''); t6kq(e,true,`Tổng = ${kq}. Máy tính xong ngay, người cần khoảng <b>${tg(t)}</b>!`);},400); };
  return e;
};

/* Tin học 7 · Bài 15. Thuật toán tìm kiếm nhị phân · 2 tiết. Soạn lại cho lớp học LAN.
   Mô phỏng: "npDoanSo" (đoán số 1–100 với gợi ý lớn hơn/nhỏ hơn – đếm lượt), "npTungBuoc" (dãy đã sắp xếp: chọn giữa, bỏ một nửa, so sánh với tuần tự). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Trò chơi đoán số',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>Máy nghĩ một số từ <b>1 đến 100</b>. Mỗi lần đoán, máy chỉ nói <b>“lớn hơn”</b> hoặc <b>“nhỏ hơn”</b>. Em cần ít lượt nhất có thể! Gợi ý: đoán <b>số ở giữa</b> khoảng còn lại.</p>',
  qs:[{id:'s1',type:'sim',sim:'npDoanSo'},
      {id:'q1',type:'single',q:'Quan sát: Đoán số ở giữa khoảng thì sau mỗi lượt, khoảng tìm kiếm còn khoảng:',opts:['Giảm 1 số','Một nửa','Gấp đôi','Không đổi'],ok:1},
      {id:'q2',type:'single',q:'Với 100 số, đoán theo cách “chọn giữa” cần nhiều nhất khoảng bao nhiêu lượt?',opts:['7','50','100','20'],ok:0}],
  key:['Mỗi lần so sánh với <b>phần tử giữa</b>, ta bỏ được <b>một nửa</b> khoảng tìm kiếm.']},
 {t:'Thuật toán tìm kiếm nhị phân',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Điều kiện: dãy đã <b>sắp xếp</b>. Các bước: (1) Xét phần tử <b>ở giữa</b>. (2) Bằng giá trị cần tìm → <b>tìm thấy</b>. (3) Nếu giá trị cần tìm <b>nhỏ hơn</b> → tìm ở <b>nửa trước</b>; <b>lớn hơn</b> → <b>nửa sau</b>. (4) Lặp lại tới khi thấy hoặc vùng tìm kiếm rỗng.</p>',
  qs:[{id:'s2',type:'sim',sim:'npTungBuoc'},
      {id:'h1',type:'single',q:'Dãy 2, 5, 8, 12, 16, 23, 38. Tìm 23: phần tử giữa đầu tiên được xét là:',opts:['2','12','16','23'],ok:1},
      {id:'h2',type:'single',q:'Tiếp theo (23 > 12), vùng tìm kiếm còn lại là:',opts:['2, 5, 8','16, 23, 38','12, 16, 23','Cả dãy'],ok:1},
      {id:'h3',type:'tf',q:'Đúng hay sai?',items:[{t:'Tìm kiếm nhị phân dùng được cho dãy chưa sắp xếp',a:'F'},{t:'Với dãy dài, nhị phân thường nhanh hơn tuần tự nhiều',a:'T'},{t:'Mỗi bước loại bỏ khoảng một nửa dãy',a:'T'}]}],
  key:['<b>Nhị phân</b>: dãy <b>đã sắp xếp</b>; so với phần tử giữa, bỏ <b>một nửa</b> mỗi bước → nhanh.']},
 {t:'So sánh hai thuật toán',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ Tuần tự hay nhị phân?</p>',
  qs:[{id:'l1',type:'sort',q:'Tình huống nào dùng được nhị phân?',cols:{c0:'Dùng được nhị phân',c1:'Chỉ dùng tuần tự'},items:[{t:'Tra từ trong từ điển (xếp theo vần)',a:'c0'},{t:'Tìm bạn trong hàng đứng lộn xộn',a:'c1'},{t:'Tìm số trang trong cuốn sách',a:'c0'},{t:'Tìm chiếc tất trong giỏ đồ',a:'c1'}]},
      {id:'l2',type:'single',q:'Dãy 1024 phần tử đã sắp xếp, nhị phân cần nhiều nhất bao nhiêu lần so sánh?',opts:['11','100','512','1024'],ok:0}],
  key:['Dãy <b>đã sắp xếp</b> + dài → chọn <b>nhị phân</b>.']},
 {t:'Tra từ điển',hd:'Vận dụng · 7 phút',code:'4',phut:7,
  story:'<p>Em tra từ “computer” trong từ điển Anh – Việt giấy.</p>',
  qs:[{id:'v1',type:'text',q:'Mô tả cách em tra từ theo ý tưởng tìm kiếm nhị phân.',ans:'Mở khoảng giữa từ điển; so chữ cái đầu với “c”; nếu trang đang mở sau “c” thì tìm ở nửa trước, ngược lại nửa sau; lặp lại cho tới khi thấy trang có “computer”.'}],
  key:['Nhị phân có trong <b>đời sống</b>: từ điển, danh bạ.']},
 {t:'Tổng kết',hd:'Tổng kết · 4 phút',code:'',phut:4,
  story:'<p>Chia đôi để chiến thắng!</p>',
  qs:[{id:'tk',type:'single',q:'Câu nào đúng?',opts:['Nhị phân xét lần lượt từ đầu dãy','Nhị phân cần dãy đã sắp xếp, mỗi bước bỏ một nửa vùng tìm','Nhị phân luôn chậm hơn tuần tự','Nhị phân không cần so sánh'],ok:1}],
  key:['<b>Nhị phân</b>: sắp xếp → giữa → nửa → lặp.']}
];
const GHIBAI={so:'Bài 15:',ten:'THUẬT TOÁN TÌM KIẾM NHỊ PHÂN',muc:[
 {step:1,h:'Ý tưởng',it:['So sánh với <b>phần tử giữa</b>, bỏ <b>một nửa</b> vùng tìm kiếm.']},
 {step:2,h:'Các bước',it:['Điều kiện: dãy <b>đã sắp xếp</b>.'],flow:['Xét phần tử giữa','Bằng → tìm thấy','Nhỏ hơn → nửa trước; lớn hơn → nửa sau','Vùng rỗng → không tìm thấy']},
 {step:3,h:'So sánh',it:['Dãy dài, đã sắp xếp: <b>nhị phân nhanh hơn</b> tuần tự.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.npDoanSo=function(){
  const e=_el(_shell('Đoán số 1–100','Nhập số đoán rồi bấm <b>Đoán</b> (hoặc bấm <b>🎯 Chọn giữa</b> để máy gợi ý số ở giữa khoảng còn lại).',
   `<style>.m-t7np .bar{position:relative;height:30px;background:#e2e8f0;border-radius:15px;overflow:hidden;margin:12px 0}.m-t7np .rg{position:absolute;top:0;bottom:0;background:linear-gradient(90deg,#60a5fa,#a78bfa);transition:.4s}
   .m-t7np .big{font:800 20px system-ui;text-align:center}.m-t7np input{width:90px;font-size:22px;text-align:center;border:2px solid #6366f1;border-radius:10px;padding:4px}</style>
   <div class="m-t7np"><div class="big">Khoảng còn lại: <span class="lo">1</span> – <span class="hi">100</span> · Lượt: <span class="n">0</span></div><div class="bar"><div class="rg" style="left:0;width:100%"></div></div>
   <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><input type="number" min="1" max="100"><button type="button" class="btn acc go">Đoán</button><button type="button" class="btn mid">🎯 Chọn giữa</button><button type="button" class="btn nw">🔀 Ván mới</button></div>
   <div class="kq big" style="margin-top:10px;min-height:28px"></div></div>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>Đoán</th><th>Máy trả lời</th><th>Khoảng còn</th></tr></table>`));
  let s,lo,hi,n,hist,done; const inp=e.querySelector('input'),kq=e.querySelector('.kq');
  const show=()=>{e.querySelector('.lo').textContent=lo; e.querySelector('.hi').textContent=hi; e.querySelector('.n').textContent=n; const r=e.querySelector('.rg'); r.style.left=(lo-1)+'%'; r.style.width=(hi-lo+1)+'%';};
  const nw=()=>{s=1+Math.floor(Math.random()*100); lo=1; hi=100; n=0; hist=[]; done=0; kq.textContent=''; inp.value=''; show(); histTable(e,hist,()=>'');};
  const guess=g=>{if(done||!(g>=1&&g<=100)) return; n++; let t;
    if(g===s){t='🎉 Đúng!'; done=1; kq.textContent='🎉 Đúng rồi: '+s+' sau '+n+' lượt'+(n<=7?' – tuyệt vời!':''); FX.play('win');}
    else if(g<s){t='Lớn hơn ⬆'; lo=Math.max(lo,g+1); kq.textContent='Số cần tìm LỚN HƠN '+g; FX.play('tick');} else {t='Nhỏ hơn ⬇'; hi=Math.min(hi,g-1); kq.textContent='Số cần tìm NHỎ HƠN '+g; FX.play('tick');}
    hist.unshift([g,t,done?'–':lo+'–'+hi]); if(hist.length>8) hist.pop(); histTable(e,hist,(v,j)=>j===1&&/Đúng/.test(v)?'g':''); show();};
  e.querySelector('.go').onclick=()=>guess(+inp.value); inp.onkeydown=ev=>{if(ev.key==='Enter') guess(+inp.value);};
  e.querySelector('.mid').onclick=()=>{const m=Math.floor((lo+hi)/2); inp.value=m; guess(m);}; e.querySelector('.nw').onclick=()=>{nw(); FX.play('whoosh');}; nw(); return e;
};
SIMS_BAI.npTungBuoc=function(){
  const A=[2,5,8,12,16,23,38,41,56,72,85,91,99];
  const e=_el(_shell('Nhị phân từng bước','Chọn số cần tìm, bấm <b>⏭ Bước tiếp</b>. Ô vàng là phần tử giữa, ô mờ đã bị loại. So sánh với số bước của tuần tự.',
   `<style>.m-t7nb .cards{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;margin:12px 0}.m-t7nb .cd{width:44px;height:54px;border-radius:8px;display:grid;place-items:center;font:800 18px system-ui;background:#e0e7ff;border:2px solid #a5b4fc;transition:.3s}
   .m-t7nb .cd.out{opacity:.2;transform:scale(.85)}.m-t7nb .cd.mid{background:#fde68a;border-color:#d97706;transform:scale(1.12)}.m-t7nb .cd.hit{background:#22c55e;color:#fff}</style>
   <div class="sim-ctl"><div><b>Cần tìm</b> ${_seg('x',[['23','23'],['91','91'],['5','5'],['60','60']],'23')}</div><button type="button" class="btn acc st">⏭ Bước tiếp</button><button type="button" class="btn rs">↺</button></div>
   <div class="m-t7nb"><div class="cards">${A.map((v,k)=>`<div class="cd" data-k="${k}">${v}</div>`).join('')}</div>
   <div class="kq" style="text-align:center;font-weight:700;font-size:17px;min-height:26px"></div><div class="cmp" style="text-align:center;margin-top:6px"></div></div>`));
  let x=23,L,R,m,step,done; const kq=e.querySelector('.kq');
  const show=()=>e.querySelectorAll('.cd').forEach((c,k)=>{c.className='cd'+(k<L||k>R?' out':'')+(k===m?(A[k]===x&&done?' hit':' mid'):'');});
  const rs=()=>{L=0;R=A.length-1;m=-1;step=0;done=0;kq.textContent='Vùng tìm kiếm: cả dãy ('+A.length+' phần tử)'; e.querySelector('.cmp').textContent=''; show();};
  _wireSeg(e,(n,v)=>{x=+v; rs();});
  e.querySelector('.st').onclick=()=>{if(done){FX.play('tick');return;}
    if(L>R){done=1; kq.textContent='❌ Vùng tìm kiếm rỗng – không có '+x; FX.play('drum');}
    else {m=Math.floor((L+R)/2); step++;
      if(A[m]===x){done=1; kq.textContent='✅ Bước '+step+': giữa = '+A[m]+' = '+x+' → TÌM THẤY!'; FX.play('win');}
      else if(x<A[m]){kq.textContent='Bước '+step+': giữa = '+A[m]+'. '+x+' < '+A[m]+' → tìm ở NỬA TRƯỚC'; R=m-1; FX.play('whoosh');}
      else {kq.textContent='Bước '+step+': giữa = '+A[m]+'. '+x+' > '+A[m]+' → tìm ở NỬA SAU'; L=m+1; FX.play('whoosh');}}
    show(); if(done){const t=A.indexOf(x); e.querySelector('.cmp').innerHTML='Nhị phân: <b>'+step+'</b> lần so sánh · Tuần tự: <b>'+(t<0?A.length:t+1)+'</b> lần';}};
  e.querySelector('.rs').onclick=rs; rs(); return e;
};

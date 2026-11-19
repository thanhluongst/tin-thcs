/* Tin học 7 · Bài 14. Thuật toán tìm kiếm tuần tự · 2 tiết. Soạn lại cho lớp học LAN.
   Tình huống: mẹ An tìm khách hàng trong sổ ghi chép.
   Mô phỏng: "tkTuanTu" (lật thẻ lần lượt từ đầu – đếm số lần so sánh), "tkSoDo" (chạy từng bước sơ đồ khối: i, so sánh, tăng i). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Tìm thẻ có số 15',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>Mẹ An ghi thông tin khách hàng vào sổ, không theo thứ tự nào. Muốn tìm một khách, mẹ phải xem lần lượt. Hãy tìm thẻ có số cần tìm bằng cách <b>lật lần lượt từng thẻ từ trái sang phải</b>.</p>',
  qs:[{id:'s1',type:'sim',sim:'tkTuanTu'},
      {id:'q1',type:'single',q:'Quan sát: Nếu số cần tìm ở <b>cuối</b> dãy 10 thẻ, phải so sánh bao nhiêu lần?',opts:['1','5','10','11'],ok:2},
      {id:'q2',type:'single',q:'Khi nào dừng tìm kiếm?',opts:['Sau đúng 5 lần','Khi tìm thấy hoặc đã xem hết dãy','Khi gặp số lớn hơn','Không bao giờ'],ok:1}],
  key:['<b>Tìm kiếm tuần tự</b>: xét <b>lần lượt</b> từ đầu dãy; dừng khi <b>tìm thấy</b> hoặc <b>hết dãy</b>.']},
 {t:'Thuật toán tìm kiếm tuần tự',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Các bước: (1) Xét phần tử <b>đầu tiên</b>. (2) Nếu bằng giá trị cần tìm → thông báo <b>tìm thấy</b>, kết thúc. (3) Nếu chưa → xét phần tử <b>tiếp theo</b>, lặp lại bước 2. (4) Hết dãy mà không thấy → thông báo <b>không tìm thấy</b>. Chạy từng bước trong mô phỏng sơ đồ khối.</p>',
  qs:[{id:'s2',type:'sim',sim:'tkSoDo'},
      {id:'h1',type:'single',q:'Dãy 3, 8, 1, 9, 5. Tìm 9 bằng tuần tự cần bao nhiêu lần so sánh?',opts:['1','3','4','5'],ok:2},
      {id:'h2',type:'single',q:'Dãy 3, 8, 1, 9, 5. Tìm 7 cần bao nhiêu lần so sánh?',opts:['0','4','5','6'],ok:2},
      {id:'h3',type:'tf',q:'Đúng hay sai?',items:[{t:'Tìm kiếm tuần tự dùng được cho dãy chưa sắp xếp',a:'T'},{t:'Thuật toán có cấu trúc lặp',a:'T'},{t:'Luôn chỉ cần 1 lần so sánh',a:'F'}]}],
  key:['Thuật toán dùng <b>cấu trúc lặp</b> và <b>rẽ nhánh</b>; dùng được cho dãy <b>chưa sắp xếp</b>.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ Danh sách lớp: Hà, Minh, Lan, Khoa, An, Bình.</p>',
  qs:[{id:'l1',type:'single',q:'Tìm “An” theo tuần tự, An được tìm thấy ở lần so sánh thứ:',opts:['1','4','5','6'],ok:2},
      {id:'l2',type:'single',q:'Tìm “Tú” thì kết quả là:',opts:['Thấy ở vị trí 1','Không tìm thấy sau 6 lần so sánh','Thấy ở vị trí 6','Lỗi'],ok:1}],
  key:['Số lần so sánh <b>nhiều nhất</b> = số phần tử của dãy.']},
 {t:'Tìm sách trong thư viện lớp',hd:'Vận dụng · 7 phút',code:'4',phut:7,
  story:'<p>Thư viện lớp có 50 cuốn sách xếp lộn xộn.</p>',
  qs:[{id:'v1',type:'text',q:'Mô tả cách em tìm cuốn “Dế Mèn phiêu lưu kí” theo thuật toán tìm kiếm tuần tự.',ans:'Xem cuốn đầu tiên; nếu đúng tên thì dừng; nếu không xem cuốn tiếp theo; lặp lại tới khi tìm thấy hoặc hết 50 cuốn thì báo không có.'}],
  key:['Áp dụng tuần tự cho <b>dữ liệu chưa sắp xếp</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 4 phút',code:'',phut:4,
  story:'<p>Từng bước, từng phần tử.</p>',
  qs:[{id:'tk',type:'single',q:'Câu nào đúng?',opts:['Tìm kiếm tuần tự cần dãy đã sắp xếp','Tìm kiếm tuần tự xét lần lượt từng phần tử từ đầu dãy','Luôn so sánh hết dãy dù đã thấy','Chỉ dùng cho số'],ok:1}],
  key:['<b>Tuần tự</b>: lần lượt – dừng khi thấy hoặc hết dãy.']}
];
const GHIBAI={so:'Bài 14:',ten:'THUẬT TOÁN TÌM KIẾM TUẦN TỰ',muc:[
 {step:1,h:'Ý tưởng',it:['Xét <b>lần lượt</b> từng phần tử từ <b>đầu dãy</b>.']},
 {step:2,h:'Các bước',it:[],flow:['Xét phần tử đầu','Bằng giá trị cần tìm? → Tìm thấy','Chưa: xét phần tử tiếp','Hết dãy → Không tìm thấy']},
 {step:3,h:'Lưu ý',it:['Dùng cho dãy <b>chưa sắp xếp</b>; nhiều nhất <b>n</b> lần so sánh.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
function _t7tk_css(){return `<style>.m-t7tk .cards{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:12px 0}.m-t7tk .cd{width:52px;height:70px;border-radius:10px;display:grid;place-items:center;font:800 22px system-ui;cursor:pointer;
background:linear-gradient(135deg,#6366f1,#8b5cf6);color:transparent;transition:.3s;position:relative;user-select:none}.m-t7tk .cd.up{background:#fff;color:#1e293b;border:2px solid #cbd5e1}
.m-t7tk .cd.hit{background:#22c55e;color:#fff;transform:scale(1.15)}.m-t7tk .cd.cur{outline:4px solid #f59e0b}.m-t7tk .cd small{position:absolute;bottom:-18px;font-size:11px;color:#64748b}
.m-t7tk .big{font:800 20px system-ui;text-align:center}</style>`;}
SIMS_BAI.tkTuanTu=function(){
  const e=_el(_shell('Lật thẻ tìm số','Lật thẻ <b>theo thứ tự từ trái sang</b> (chỉ lật được thẻ kế tiếp). Đếm số lần so sánh.',
   _t7tk_css()+`<div class="m-t7tk"><div class="big">🎯 Cần tìm: <span class="x"></span> · So sánh: <span class="n">0</span></div><div class="cards"></div>
   <div style="text-align:center"><button type="button" class="btn acc nw">🔀 Dãy mới</button></div><div class="kq big" style="margin-top:8px;min-height:28px"></div></div>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>Cần tìm</th><th>Vị trí</th><th>Số lần so sánh</th></tr></table>`));
  let A,x,i,done; const hist=[];
  const nw=()=>{A=[]; while(A.length<10){const v=1+Math.floor(Math.random()*30); if(!A.includes(v)) A.push(v);} x=Math.random()<.8?A[Math.floor(Math.random()*10)]:31+Math.floor(Math.random()*9); i=0; done=0;
    e.querySelector('.x').textContent=x; e.querySelector('.n').textContent=0; e.querySelector('.kq').textContent='';
    e.querySelector('.cards').innerHTML=A.map((v,k)=>`<div class="cd ${k===0?'cur':''}" data-k="${k}">${v}<small>${k+1}</small></div>`).join('');
    e.querySelectorAll('.cd').forEach(c=>c.onclick=()=>flip(+c.dataset.k));};
  const flip=k=>{if(done||k!==i){if(!done) FX.play('tick'); return;} const c=e.querySelectorAll('.cd')[k]; c.classList.remove('cur'); c.classList.add('up'); i++; e.querySelector('.n').textContent=i;
    const kq=e.querySelector('.kq');
    if(A[k]===x){c.classList.add('hit'); done=1; kq.textContent='✅ Tìm thấy ở vị trí '+(k+1)+' sau '+i+' lần so sánh'; FX.play('win'); hist.unshift([x,k+1,i]);}
    else if(i===A.length){done=1; kq.textContent='❌ Đã xét hết '+i+' thẻ – không tìm thấy '+x; FX.play('drum'); hist.unshift([x,'không có',i]);}
    else {e.querySelectorAll('.cd')[i].classList.add('cur'); FX.play('tick'); return;}
    if(hist.length>6) hist.pop(); histTable(e,hist,(v,j)=>j===1?(v==='không có'?'r':'g'):'');};
  e.querySelector('.nw').onclick=()=>{nw(); FX.play('whoosh');}; nw(); return e;
};
SIMS_BAI.tkSoDo=function(){
  const A=[3,8,1,9,5];
  const e=_el(_shell('Chạy từng bước thuật toán','Chọn giá trị cần tìm, bấm <b>⏭ Bước tiếp</b> để chạy từng bước. Khối đang thực hiện sáng màu vàng.',
   _t7tk_css()+`<style>.m-t7sd{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start}.m-t7sd .bl{padding:8px 10px;margin:5px 0;border:2px solid #94a3b8;border-radius:10px;background:#fff;font-weight:600;text-align:center;transition:.2s}
   .m-t7sd .bl.d{border-radius:4px;transform:none;background:#eef2ff}.m-t7sd .bl.on{background:#fde68a;border-color:#d97706;transform:scale(1.04)}@media(max-width:560px){.m-t7sd{grid-template-columns:1fr}}</style>
   <div class="sim-ctl"><div><b>Cần tìm</b> ${_seg('x',[['9','9'],['3','3'],['7','7']],'9')}</div><button type="button" class="btn acc st">⏭ Bước tiếp</button><button type="button" class="btn rs">↺</button></div>
   <div class="m-t7sd"><div><div class="bl" data-b="0">Bắt đầu: i ← 1</div><div class="bl d" data-b="1">i ≤ 5 ?</div><div class="bl d" data-b="2">A[i] = x ?</div><div class="bl" data-b="3">i ← i + 1</div><div class="bl" data-b="4">✅ Thông báo: tìm thấy ở vị trí i</div><div class="bl" data-b="5">❌ Thông báo: không tìm thấy</div></div>
   <div class="m-t7tk"><div class="cards">${A.map((v,k)=>`<div class="cd up" data-k="${k}">${v}<small>i=${k+1}</small></div>`).join('')}</div><div class="big lg" style="font-size:16px"></div></div></div>`));
  let x=9,b=-1,i=1,cmp=0; const lg=e.querySelector('.lg');
  const show=()=>{e.querySelectorAll('.bl').forEach(d=>d.classList.toggle('on',+d.dataset.b===b)); e.querySelectorAll('.cd').forEach((c,k)=>{c.classList.toggle('cur',k===i-1&&b>=1&&b<=3); c.classList.toggle('hit',b===4&&k===i-1);});
    lg.innerHTML='i = '+i+' · Số lần so sánh A[i] với x: <b>'+cmp+'</b>';};
  const rs=()=>{b=-1;i=1;cmp=0;show();};
  _wireSeg(e,(n,v)=>{x=+v; rs();});
  e.querySelector('.st').onclick=()=>{if(b===4||b===5){FX.play('tick');return;}
    if(b===-1) b=0; else if(b===0) b=1; else if(b===1) b=i<=5?2:5; else if(b===2){cmp++; b=A[i-1]===x?4:3;} else if(b===3){i++; b=1;}
    show(); FX.play(b===4?'win':b===5?'drum':'tick');};
  e.querySelector('.rs').onclick=rs; show(); return e;
};

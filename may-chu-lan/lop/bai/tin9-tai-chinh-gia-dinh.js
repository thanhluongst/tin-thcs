/* Tin học 9 · Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: nhà An hoàn thiện trang tính Tổng hợp (thu – chi – NET – biểu đồ).
   Mô phỏng: t9sotinh (Sổ tính 3 trang: sửa Thu nhập/Chi tiêu, Tổng hợp và biểu đồ tự cập nhật),
   t9thamchieu (Lắp ghép công thức tham chiếu sang trang tính khác). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Thu nhiều hay chi nhiều?',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Nhà An đã có trang <b>Thu nhập</b> và <b>Chi tiêu</b>. Bố hỏi: <i>“Tháng này nhà mình dư hay thiếu bao nhiêu?”</i> Cần một trang <b>Tổng hợp</b>.</p>',
  qs:[{id:'k1',type:'multi',q:'Trang Tổng hợp nên có:',opts:['Tổng thu nhập','Tổng chi tiêu','Chênh lệch thu – chi','Biểu đồ so sánh thu, chi'],ok:[0,1,2,3]}],
  key:['Trang <b>Tổng hợp</b>: tổng thu, tổng chi, <b>giá trị NET</b> và <b>biểu đồ</b>.']},

 {t:'Sổ tính liên kết các trang',hd:'Hình thành kiến thức · Hoạt động 1 · 13 phút',code:'2.1',phut:13,
  story:'<p>Mở từng thẻ trang tính. Sửa một khoản ở trang <b>Thu nhập</b> hoặc <b>Chi tiêu</b> rồi quay lại trang <b>Tổng hợp</b> xem điều gì thay đổi.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9sotinh'},
      {id:'h1',type:'single',q:'Công thức ở B14 (Tổng thu nhập) của trang Tổng hợp:',opts:['=H7','=\'Thu nhập\'!H7','=Thu nhập!H7','=SUM(Thu nhập)'],ok:1},
      {id:'h2',type:'single',q:'Giá trị NET (B16 = B14 − B15) với dữ liệu mẫu là 3 860 nghĩa là:',opts:['Nhà An chi nhiều hơn thu','Thu nhiều hơn chi 3 860 nghìn đồng','Tổng thu','Tổng chi'],ok:1},
      {id:'h3',type:'single',q:'Sửa số tiền ở trang Chi tiêu thì trang Tổng hợp:',opts:['Không đổi','Tự cập nhật vì công thức tham chiếu sang trang đó','Bị lỗi','Phải gõ lại'],ok:1}],
  key:['Các trang tính <b>liên kết</b> bằng công thức tham chiếu → Tổng hợp <b>tự cập nhật</b>.','<b>NET</b> = Tổng thu − Tổng chi.']},

 {t:'Địa chỉ ô ở trang tính khác',hd:'Hình thành kiến thức · Hoạt động 2 · 9 phút',code:'2.2',phut:9,
  story:'<p>Công thức <code>=\'Thu nhập\'!H7</code> gồm 3 phần. Hãy tự lắp ghép công thức tham chiếu.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9thamchieu'},
      {id:'h4',type:'match',q:'Trong =\'Thu nhập\'!H7, ghép mỗi phần với tên gọi.',items:['\'Thu nhập\'','!','H7'],opts:['Địa chỉ ô','Tên trang tính','Dấu chấm than ngăn cách'],ok:[1,2,0]},
      {id:'h5',type:'single',q:'Vì sao tên Thu nhập phải đặt trong dấu nháy đơn?',opts:['Cho đẹp','Vì tên trang tính có dấu cách','Vì có dấu tiếng Việt','Không cần'],ok:1}],
  key:['Tham chiếu: <b>Tên trang tính</b> + <b>!</b> + <b>địa chỉ ô</b>. Tên có dấu cách → đặt trong <b>\'nháy đơn\'</b>.']},

 {t:'Biểu đồ thu – chi',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Vẽ biểu đồ cột so sánh Thu và Chi trên trang Tổng hợp.</p>',
  qs:[{id:'l1',type:'single',q:'Vùng dữ liệu nên chọn:',opts:['A13:B15 (nội dung, số tiền của Thu và Chi)','A1:Z100','Chỉ B16','Cả trang Chi tiêu'],ok:0},
      {id:'l2',type:'single',q:'Thứ tự đúng các bước hoàn thiện:',opts:['Biểu đồ → tạo trang Tổng hợp → tính tổng','Tính tổng ở hai trang → tạo trang Tổng hợp → bảng A13:B16 → biểu đồ','Biểu đồ → NET','Xoá trang Chi tiêu → tạo Tổng hợp'],ok:1}],
  key:['Biểu đồ <b>cột</b> giúp so sánh trực quan thu – chi.']},

 {t:'Cân đối kinh phí triển lãm',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Tạo trang Tổng hợp cho dự án Triển lãm tin học.</p>',
  qs:[{id:'v1',type:'text',q:'Viết công thức ở B14, B15, B16.',ans:"B14 ='Các khoản thu'!H4; B15 ='Các khoản chi'!H4; B16 =B14-B15."}],
  key:['Mọi bảng tính nhiều trang đều liên kết bằng <b>tham chiếu</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 4 phút',phut:4,
  story:'<p>Dự án Quản lí tài chính gia đình hoàn thành: xác thực dữ liệu → COUNTIF → SUMIF → IF → Tổng hợp.</p>',
  qs:[{id:'t1',type:'single',q:'Lấy giá trị ô H11 ở trang Chi tiêu:',opts:['=Chi tiêu.H11','=\'Chi tiêu\'!H11','=H11!Chi tiêu','=[Chi tiêu]H11'],ok:1},
      {id:'t2',type:'text',short:1,q:'Em sẽ giúp gia đình quản lí chi tiêu thế nào?',ans:'Tự đánh giá.'}],
  key:['<b>Tên trang!Địa chỉ ô</b> – nối các trang tính thành một hệ thống.']}
];

const GHIBAI={so:'Bài 13a:',ten:'HOÀN THIỆN BẢNG TÍNH QUẢN LÍ TÀI CHÍNH GIA ĐÌNH',muc:[
 {step:2,h:'Trang Tổng hợp',it:['Tổng thu, tổng chi lấy từ hai trang; <b>NET = Thu − Chi</b>; biểu đồ cột.']},
 {step:3,h:'Tham chiếu trang khác',it:['<b>Tên trang tính!Địa chỉ ô</b>, VD: =\'Thu nhập\'!H7.','Tên có dấu cách → trong <b>nháy đơn</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9sotinh=function(){
  const D={thu:[['Lương',12000],['Thưởng',2000],['Làm thêm',3500],['Được tặng',0],['Khác',0]],chi:[['Ăn',8000],['Học tập',2200],['Tiết kiệm',1000],['Ở',920],['Di chuyển',300],['Giải trí',220],['Sức khoẻ',0],['Quà tặng',0],['Khác',1000]]};
  const e=_el(_shell('Sổ tính Tài chính gia đình','Bấm các <b>thẻ trang tính</b> phía dưới. Sửa số ở trang Thu nhập/Chi tiêu, xem trang Tổng hợp tự đổi.',
   `<div class="m-t9st"><style>.m-t9st .pg{border:1px solid #94a3b8;background:#fff;min-height:240px;padding:8px;border-radius:6px 6px 0 0}.m-t9st table{border-collapse:collapse;font:14px Consolas,monospace}
   .m-t9st td,.m-t9st th{border:1px solid #cbd5e1;padding:4px 8px}.m-t9st th{background:#e2e8f0}.m-t9st input{width:80px;font:inherit;border:0;background:#fef9c3}.m-t9st td.f{background:#ecfdf5;font-weight:800;cursor:pointer}
   .m-t9st .tabs{display:flex;gap:2px}.m-t9st .tabs button{border:1px solid #94a3b8;border-top:0;background:#e2e8f0;padding:6px 14px;cursor:pointer;font-weight:700;border-radius:0 0 8px 8px}
   .m-t9st .tabs button.on{background:#fff;color:#15803d}.m-t9st .fx{font:14px Consolas,monospace;border:1px solid #cbd5e1;padding:5px 8px;margin-bottom:6px;background:#f8fafc}
   .m-t9st .ch{display:flex;gap:24px;align-items:flex-end;height:150px;margin:10px 0 0 10px;border-left:2px solid #475569;border-bottom:2px solid #475569;padding:0 16px;width:max-content}
   .m-t9st .ch div{width:60px;text-align:center;color:#fff;font-weight:800;border-radius:6px 6px 0 0;transition:height .5s;display:flex;align-items:flex-start;justify-content:center;font-size:12px}
   .m-t9st .w{display:flex;flex-wrap:wrap;gap:20px;align-items:flex-end}.m-t9st .lb{display:flex;gap:24px;margin-left:26px;font-weight:700}.m-t9st .lb span{width:60px;text-align:center}</style>
   <div class="fx">fx:</div><div class="pg"></div><div class="tabs"><button data-t="thu">Thu nhập</button><button data-t="chi">Chi tiêu</button><button data-t="th" class="on">Tổng hợp</button></div></div>`));
  let tab='th';const pg=e.querySelector('.pg'),fx=e.querySelector('.fx'),sum=k=>D[k].reduce((a,r)=>a+r[1],0),f=n=>n.toLocaleString('vi-VN');
  const sheet=k=>{const n=D[k].length,hr=n+2;return `<table><tr><th></th><th>F</th><th>H</th></tr><tr><td>1</td><th>Khoản ${k==='thu'?'thu':'chi'}</th><th>Tổng tiền</th></tr>`+
    D[k].map((r,i)=>`<tr><td>${i+2}</td><td>${r[0]}</td><td><input data-k="${k}" data-i="${i}" value="${r[1]}"></td></tr>`).join('')+`<tr><td>${hr}</td><th>Tổng</th><td class="f" data-fx="=SUM(H2:H${hr-1})">${f(sum(k))}</td></tr></table>`;};
  const draw=()=>{fx.textContent='fx:';if(tab!=='th')pg.innerHTML=sheet(tab);else{const T=sum('thu'),C=sum('chi'),N=T-C,mx=Math.max(T,C,1);
    pg.innerHTML=`<div class="w"><table><tr><th></th><th>A</th><th>B</th></tr><tr><td>13</td><th>Nội dung</th><th>Số tiền</th></tr><tr><td>14</td><td>Thu</td><td class="f" data-fx="='Thu nhập'!H${D.thu.length+2}">${f(T)}</td></tr>
     <tr><td>15</td><td>Chi</td><td class="f" data-fx="='Chi tiêu'!H${D.chi.length+2}">${f(C)}</td></tr><tr><td>16</td><td>Giá trị NET</td><td class="f" data-fx="=B14-B15" style="color:${N<0?'#b91c1c':'#15803d'}">${f(N)}</td></tr></table>
     <div><div class="ch"><div style="height:${T/mx*130}px;background:#16a34a">${f(T)}</div><div style="height:${C/mx*130}px;background:#dc2626">${f(C)}</div></div><div class="lb"><span>Thu</span><span>Chi</span></div></div></div>
     <p style="font-weight:700">${N>=0?'✅ Thu nhiều hơn chi '+f(N)+' nghìn đồng':'⚠️ Chi vượt thu '+f(-N)+' nghìn đồng!'}</p>`;}
    pg.querySelectorAll('input').forEach(x=>x.oninput=()=>{D[x.dataset.k][+x.dataset.i][1]=+x.value||0;const t=pg.querySelector('td.f');t.textContent=f(sum(x.dataset.k));FX.play('tick');});
    pg.querySelectorAll('td.f').forEach(t=>t.onclick=()=>{fx.textContent='fx: '+t.dataset.fx;FX.play('ding');});};
  e.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{e.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');tab=b.dataset.t;FX.play('whoosh');draw();});
  draw();return e;
};
SIMS_BAI.t9thamchieu=function(){
  const S={'Thu nhập':{H7:17500,H4:3500},'Chi tiêu':{H11:13640,H3:8000}};
  const e=_el(_shell('Lắp ghép công thức tham chiếu','Bấm các mảnh theo thứ tự để lắp công thức, rồi bấm <b>↵ Nhập</b>. Thử cả cách thiếu nháy, thiếu dấu !.',
   `<div class="m-t9tc2"><style>.m-t9tc2 .pc{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.m-t9tc2 .pc button{font:700 18px Consolas,monospace;padding:10px 14px;border-radius:10px;border:2px solid #94a3b8;background:#fff;cursor:pointer}
   .m-t9tc2 .pc .s{border-color:#7c3aed;color:#7c3aed}.m-t9tc2 .pc .x{border-color:#e2932b;color:#b45309}.m-t9tc2 .pc .c{border-color:#2563eb;color:#2563eb}
   .m-t9tc2 .fm{font:800 22px Consolas,monospace;background:#fff;border:2px solid #16a34a;padding:10px;border-radius:10px;min-height:52px}.m-t9tc2 .kq{font-weight:700;margin:8px 0;min-height:24px}</style>
   <div class="pc"><button class="p">=</button><button class="s">'Thu nhập'</button><button class="s">Thu nhập</button><button class="s">'Chi tiêu'</button><button class="x">!</button><button class="x">.</button><button class="c">H7</button><button class="c">H11</button><button class="c">H4</button></div>
   <div class="fm"></div><div class="kq"></div><button class="btn acc go">↵ Nhập</button> <button class="btn ghost cl">⌫ Xoá</button>
   <table class="tbl sim-hist" style="margin-top:10px"><tr><th>Lần</th><th>Công thức</th><th>Kết quả</th></tr></table></div>`));
  let parts=[];const hist=[];const draw=()=>e.querySelector('.fm').textContent=parts.join('');
  e.querySelectorAll('.pc button').forEach(b=>b.onclick=()=>{parts.push(b.textContent);draw();FX.play('tick');});
  e.querySelector('.cl').onclick=()=>{parts=[];draw();e.querySelector('.kq').textContent='';};
  e.querySelector('.go').onclick=()=>{const t=parts.join(''),m=t.match(/^='([^']+)'!(H\d+)$/);let kq,ok=false;
    if(m&&S[m[1]]&&S[m[1]][m[2]]!==undefined){kq='✓ = '+S[m[1]][m[2]].toLocaleString('vi-VN')+' (lấy ô '+m[2]+' của trang '+m[1]+')';ok=true;}
    else if(/^=[^'!]+ [^!]*!/.test(t))kq='✗ #NAME? Tên trang có dấu cách phải đặt trong nháy đơn.';else if(!t.includes('!'))kq='✗ Thiếu dấu ! ngăn cách tên trang và địa chỉ ô.';
    else if(m)kq='✗ Ô '+m[2]+' của trang '+m[1]+' không chứa tổng (thử ô khác).';else kq='✗ Sai cú pháp. Mẫu: =\'Tên trang\'!Ô';
    e.querySelector('.kq').textContent=kq;hist.unshift([t||'(trống)',ok?'Đúng':'Lỗi']);if(hist.length>6)hist.pop();histTable(e,hist,(v,j)=>j===1?(v==='Đúng'?'g':'r'):'');FX.play(ok?'sparkle':'tick');};
  return e;
};

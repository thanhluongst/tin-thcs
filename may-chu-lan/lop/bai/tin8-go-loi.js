/* Tin học 8 · Bài 15. Gỡ lỗi · 1 tiết.
   Tình huống: An bổ sung biến "số lần đoán" (tối đa 7 lần) cho trò chơi Đoán số; Khoa nói "chưa xong, còn lỗi".
   Mô phỏng: "kiemThu" (chạy các ca kiểm thử, so sánh kết quả mong đợi – thực tế, bấm khối nghi ngờ để sửa),
             "chanLe" (gỡ lỗi chương trình số chẵn/lẻ). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Chương trình đã xong chưa?',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p><b>An</b>: “Tớ đã làm xong trò chơi Đoán số, có đếm <b>số lần đoán</b>, tối đa <b>7 lần</b>!”. <b>Khoa</b>: “Chưa xong đâu, chương trình còn <b>lỗi</b>. Phải <b>kiểm thử</b> đã!”</p>',
  qs:[{id:'kd',type:'single',q:'Kiểm thử chương trình là:',opts:['Chạy chương trình với nhiều bộ dữ liệu, so sánh kết quả với mong đợi','Đọc lướt chương trình','Xoá chương trình viết lại','Chạy một lần là đủ'],ok:0}],
  key:['<b>Kiểm thử</b>: chạy với các <b>tình huống</b> khác nhau, so sánh kết quả <b>thực tế</b> với <b>mong đợi</b>.']},
 {t:'Thám tử gỡ lỗi',hd:'Hình thành kiến thức · Hoạt động 1 · 15 phút',code:'2.1',phut:15,
  story:'<p>Chạy 3 <b>ca kiểm thử</b>. Ca nào kết quả khác mong đợi → có lỗi. Bấm vào khối lệnh <b>nghi ngờ</b> để sửa, rồi chạy lại đến khi cả 3 ca đều ✅.</p>',
  qs:[{id:'s1',type:'sim',sim:'kiemThu'},
      {id:'g1',type:'single',q:'Đoán sai 7 lần mà chương trình vẫn cho đoán lần thứ 8. Lỗi nằm ở:',opts:['Lệnh hiển thị','Điều kiện của vòng lặp','Lệnh lấy số ngẫu nhiên','Lệnh nói “HOAN HÔ”'],ok:1},
      {id:'g2',type:'single',q:'Sau 7 lần, đoán đúng hay sai đều có thể xảy ra. Điều kiện rẽ nhánh để báo thắng nên là:',opts:['số lần đoán = 7','trả lời = số bí mật','số lần đoán > 7','trả lời > 0'],ok:1},
      {id:'g3',type:'single',q:'Phát biểu đúng nhất về gỡ lỗi:',opts:['Gỡ lỗi là xoá chương trình','Gỡ lỗi là tìm ra lỗi và sửa lỗi','Chỉ cần sửa lỗi cú pháp','Máy tính tự gỡ lỗi'],ok:1}],
  key:['<b>Gỡ lỗi</b> = <b>tìm</b> lỗi + <b>sửa</b> lỗi. So sánh <b>kịch bản</b> với <b>khối lệnh</b> để tìm chỗ sai.']},
 {t:'Lỗi cú pháp hay lỗi lôgic?',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',phut:8,
  story:'<p>Có chương trình <b>không chạy được</b> (lỗi cú pháp), có chương trình <b>chạy nhưng kết quả sai</b> (lỗi lôgic). Scratch lắp ghép khối nên hầu như không có lỗi cú pháp.</p>',
  qs:[{id:'s2',type:'sim',sim:'chanLe'},
      {id:'ll',type:'sort',q:'Lỗi nào là lỗi gì?',cols:{c0:'Lỗi cú pháp',c1:'Lỗi lôgic'},items:[{t:'Viết thiếu dấu ngoặc trong Python, chương trình không chạy',a:'c0'},{t:'Dùng “<” thay vì “>” nên báo sai “Quá cao/Quá thấp”',a:'c1'},{t:'Điều kiện lặp sai nên đoán được 8 lần',a:'c1'},{t:'Gõ sai tên lệnh “prnt”',a:'c0'},{t:'Kiểm tra số chẵn bằng “n chia 2 dư 1”',a:'c1'}]}],
  key:['<b>Lỗi cú pháp</b>: viết sai quy tắc → không chạy. <b>Lỗi lôgic</b>: chạy nhưng <b>kết quả sai</b>.']},
 {t:'Luyện tập',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  qs:[{id:'lt',type:'single',q:'Một cách khác để sửa lỗi điều kiện lặp (cho đoán tối đa 7 lần) là:',opts:['lặp lại cho đến khi ⟨trả lời = số bí mật⟩ hoặc ⟨số lần đoán = 7⟩','Bỏ biến số lần đoán','lặp lại liên tục','lặp lại 100'],ok:0},
      {id:'tf',type:'tf',q:'Đúng hay sai?',items:[{t:'Nên kiểm thử cả tình huống biên (đúng ở lần 7, sai cả 7 lần)',a:'T'},{t:'Chạy đúng một lần nghĩa là chương trình không còn lỗi',a:'F'}]}],
  key:['Kiểm thử cả <b>tình huống biên</b>.']},
 {t:'Đổi vai trò',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Em nghĩ một số, <b>máy tính đoán</b>; em trả lời “cao/thấp”.</p>',
  qs:[{id:'vd',type:'text',q:'Máy tính nên đoán thế nào để nhanh nhất? Nêu một tình huống kiểm thử cho chương trình này.',ans:'Máy đoán số giữa khoảng (tìm kiếm nhị phân). Kiểm thử: số 1, số 100, số 50 – xem có đoán đúng trong ≤ 7 lần.'}],
  key:['Thiết kế ca kiểm thử <b>trước</b> khi viết chương trình.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Lỗi làm chương trình chạy nhưng kết quả sai là:',opts:['Lỗi cú pháp','Lỗi lôgic','Lỗi phần cứng','Không phải lỗi'],ok:1}],
  key:['<b>Kiểm thử → tìm lỗi → sửa lỗi → kiểm thử lại</b>.']}
];
const GHIBAI={so:'Bài 15:',ten:'GỠ LỖI',muc:[
 {step:2,h:'Gỡ lỗi',it:['Kiểm thử với nhiều tình huống; so sánh <b>kịch bản</b> và <b>khối lệnh</b>.'],flow:['Kiểm thử','Tìm lỗi','Sửa lỗi','Kiểm thử lại']},
 {step:3,h:'Hai loại lỗi',it:['<b>Cú pháp</b>: không chạy được. <b>Lôgic</b>: chạy nhưng kết quả sai.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.kiemThu=function(){
  const B=[{t:'đặt số bí mật thành (lấy ngẫu nhiên 1 đến 100)'},{t:'đặt số lần đoán thành 0'},
    {t:'lặp lại cho đến khi ⟨trả lời = số bí mật⟩ hoặc ⟨số lần đoán <b>> 7</b>⟩',fix:'lặp lại cho đến khi ⟨trả lời = số bí mật⟩ hoặc ⟨số lần đoán <b>= 7</b>⟩',bug:'lap',c:1},
    {t:'&nbsp;&nbsp;hỏi “Đoán số?” và đợi; thay đổi số lần đoán một lượng 1',in:1},
    {t:'nếu ⟨<b>số lần đoán < 7</b>⟩ thì',fix:'nếu ⟨<b>trả lời = số bí mật</b>⟩ thì',bug:'re',c:1},
    {t:'&nbsp;&nbsp;nói (kết hợp “HOAN HÔ! ” và số lần đoán)',fix:'&nbsp;&nbsp;nói (kết hợp “HOAN HÔ! Số lần đoán: ” và số lần đoán)',bug:'hi',in:1},
    {t:'nếu không thì nói “Bạn đã hết lượt!”'}];
  const CA=[['A: Đoán đúng ở lần 3',3,'HOAN HÔ! Số lần đoán: 3'],['B: Đoán sai cả 7 lần',0,'Hết lượt sau 7 lần'],['C: Đoán đúng đúng lần thứ 7',7,'HOAN HÔ! Số lần đoán: 7']];
  const e=_el(_shell('Thám tử gỡ lỗi','Bấm <b>▶</b> từng ca kiểm thử. Ca sai ❌ → bấm vào <b>khối nghi ngờ</b> (khối đỏ nhạt) để sửa → chạy lại.',
   `<div class="m8gl"><style>.m8gl .g{display:grid;grid-template-columns:1.2fr 1fr;gap:12px}.m8gl .bk{background:#ffab19;color:#222;border-radius:8px;padding:7px 10px;margin:4px 0;font:600 14px system-ui;cursor:pointer;transition:.2s}.m8gl .bk.in{margin-left:18px;background:#ffd38a}.m8gl .bk:hover{outline:2px dashed #dc2626}.m8gl .bk.ok{background:#bbf7d0}.m8gl .bk.sus{background:#fecaca}.m8gl .ca button{display:block;width:100%;text-align:left;margin:6px 0}.m8gl td.g{color:#15803d}.m8gl td.r{color:#b91c1c}.m8gl .ms{font-weight:700;margin-top:6px}@media(max-width:640px){.m8gl .g{grid-template-columns:1fr}}</style>
    <div class="g"><div class="pr"></div><div class="ca">${CA.map((c,i)=>`<button class="btn ghost" data-i="${i}">▶ Ca ${c[0]}</button>`).join('')}<div class="ms"></div></div></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Ca</th><th>Mong đợi</th><th>Thực tế</th><th>KQ</th></tr></table></div>`));
  const fx={lap:0,re:0,hi:0}, hist=[]; let sus=new Set();
  function draw(){e.querySelector('.pr').innerHTML='<div class="bk" style="background:#ffbf00;border-radius:14px 14px 8px 8px">🏁 khi bấm vào cờ xanh</div>'+B.map((b,i)=>`<div class="bk ${b.in?'in':''} ${b.bug&&fx[b.bug]?'ok':''} ${b.bug&&sus.has(b.bug)&&!fx[b.bug]?'sus':''}" data-i="${i}">${b.bug&&fx[b.bug]?b.fix+' ✔':b.t}</div>`).join('');
    e.querySelectorAll('.pr .bk[data-i]').forEach(d=>d.onclick=()=>{const b=B[+d.dataset.i], ms=e.querySelector('.ms');
      if(b.bug&&!fx[b.bug]){fx[b.bug]=1; FX.play('sparkle'); ms.textContent='🔧 Đã sửa khối này. Chạy lại các ca kiểm thử!';} else {FX.play('tick'); ms.textContent=b.bug?'Khối này đã sửa rồi.':'Khối này không có lỗi. Tìm tiếp!';} draw();});}
  function run(i){const c=CA[i]; let n=0, out;
    for(;;){ if(fx.lap? n>=7 : n>7) break; n++; if(c[1]===n) break; }   // mô phỏng vòng lặp (đoán đúng ở lần c[1])
    const dung=c[1]>0&&c[1]===n; const thang=fx.re?dung:n<7;
    out=thang?'HOAN HÔ! '+(fx.hi?'Số lần đoán: ':'')+n:'Hết lượt sau '+n+' lần'; return out;}
  e.querySelectorAll('.ca button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i, c=CA[i], r=run(i), ok=r===c[2];
    if(!ok){ if(i===0) sus.add('hi'); if(i===1){sus.add('lap'); if(!/Hết/.test(r)) sus.add('re');} if(i===2) sus.add('re'); }
    hist.unshift([c[0].slice(0,2),c[2],r,ok?'✅':'❌']); if(hist.length>8) hist.pop(); histTable(e,hist,(v,j)=>j===3?(v==='✅'?'g':'r'):'');
    e.querySelector('.ms').textContent=ok?'Ca '+c[0].slice(0,1)+' đúng!':'Ca '+c[0].slice(0,1)+' sai → có khối nghi ngờ (tô đỏ nhạt).'; FX.play(ok?'ding':'drum'); draw();
    if(fx.lap&&fx.re&&fx.hi&&ok) {e.querySelector('.ms').textContent='🎉 Đã gỡ hết lỗi! Chạy lại cả 3 ca để chắc chắn.'; FX.play('win');}});
  draw(); return e;
};
SIMS_BAI.chanLe=function(){
  const e=_el(_shell('Số chẵn hay lẻ?','Nhập <b>n</b>, bấm <b>▶</b>. Kết quả có đúng không? Chọn <b>điều kiện</b> khác để sửa lỗi lôgic.',
   `<div class="m8cl"><style>.m8cl .bk{background:#ffab19;border-radius:8px;padding:8px 12px;margin:6px 0;font:700 15px system-ui}.m8cl .bk.in{margin-left:22px;background:#9966ff;color:#fff}.m8cl select,.m8cl input{font:700 16px system-ui;border-radius:10px;padding:4px}.m8cl .out{font:800 22px system-ui;text-align:center;margin:8px}</style>
    <div class="bk">nếu ⟨ <select><option value="1">n chia 2 dư 1</option><option value="0">n chia 2 dư 0</option><option value="2">n chia 2 = 0</option></select> ⟩ thì</div><div class="bk in">nói “n là số chẵn”</div><div class="bk">nếu không thì</div><div class="bk in">nói “n là số lẻ”</div>
    <div class="sim-ctl" style="justify-content:center">n = <input type="number" value="6" style="width:80px"><button class="btn acc go">▶</button></div><div class="out"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>n</th><th>Điều kiện</th><th>Máy nói</th><th>Đúng?</th></tr></table></div>`));
  const hist=[];
  e.querySelector('.go').onclick=()=>{const n=Math.round(+e.querySelector('input').value), c=e.querySelector('select').value;
    const cond=c==='1'?n%2===1||n%2===-1:c==='0'?n%2===0:n/2===0; const say=cond?'chẵn':'lẻ', real=n%2===0?'chẵn':'lẻ', ok=say===real;
    e.querySelector('.out').innerHTML='🐱 “'+n+' là số '+say+'” '+(ok?'✅':'❌ (thực ra là số '+real+')');
    hist.unshift([n,e.querySelector('select').selectedOptions[0].text,say,ok?'Đúng':'Sai']); if(hist.length>6) hist.pop(); histTable(e,hist,(v,j)=>j===3?(v==='Đúng'?'g':'r'):''); FX.play(ok?'ding':'drum');};
  return e;
};

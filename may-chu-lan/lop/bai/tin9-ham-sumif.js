/* Tin học 9 · Bài 11a. Sử dụng hàm SUMIF · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: trang tính Chi tiêu nhà An – tổng tiền của từng khoản chi.
   Mô phỏng: t9sumif (Bảng tính mini: range, criteria, sum_range – tô ô kiểm tra và ô được cộng),
   t9chonham (Chọn hàm SUM / COUNTIF / SUMIF cho từng câu hỏi). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Khoản nào tốn tiền nhất?',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Bài trước An đã đếm được <b>số lần</b> chi mỗi khoản. Mẹ hỏi tiếp: <i>“Tháng này khoản Ở hết <b>bao nhiêu tiền</b>?”</i></p>',
  qs:[{id:'k1',type:'single',q:'Ô H2 = 920 trong Hình 11a.1 nghĩa là:',opts:['Số lần chi khoản Ở','Tổng tiền đã chi cho khoản Ở (điện 800 + nước 120)','Tổng tất cả các khoản chi','Số tiền còn lại'],ok:1},
      {id:'k2',type:'single',q:'Để có 920, công thức cần:',opts:['Đếm các ô ghi “Ở”','Kiểm tra cột Khoản chi B3:B10, cộng số tiền tương ứng ở D3:D10','Cộng cả cột D','Nhân 800 với 120'],ok:1}],
  key:['Cần hàm <b>tính tổng theo điều kiện</b>: <b>SUMIF</b>.']},

 {t:'Hàm SUMIF',hd:'Hình thành kiến thức · Hoạt động 1 · 14 phút',code:'2.1',phut:14,
  story:'<p>Cú pháp: <code>=SUMIF(range, criteria, [sum_range])</code>. Ô <b>xanh</b> là ô được kiểm tra, ô <b>vàng</b> là ô được cộng. Thử bỏ <b>sum_range</b> xem sao.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9sumif'},
      {id:'h1',type:'match',q:'Ghép tham số với ý nghĩa.',items:['range','criteria','sum_range'],opts:['Vùng chứa các ô được cộng','Vùng chứa các ô cần kiểm tra điều kiện','Điều kiện'],ok:[1,2,0]},
      {id:'h2',type:'single',q:'=SUMIF(B3:B10,"Ăn",D3:D10) cho kết quả:',opts:['2','3000','8000','5000'],ok:2},
      {id:'h3',type:'single',q:'=SUMIF(D3:D10,">1000") (không có sum_range) cộng:',opts:['Các ô D3:D10 lớn hơn 1000','Tất cả cột D','Các ô cột B','Không tính được'],ok:0}],
  key:['<b>=SUMIF(range, criteria, sum_range)</b>: kiểm tra <b>range</b>, cộng ô tương ứng trong <b>sum_range</b>.','Bỏ sum_range: cộng chính các ô của range thoả điều kiện.']},

 {t:'SUM, COUNTIF hay SUMIF?',hd:'Hình thành kiến thức · Hoạt động 2 · 9 phút',code:'2.2',phut:9,
  story:'<p>Mỗi câu hỏi của mẹ cần một hàm khác nhau. Chọn hàm và xem bảng tính trả lời.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9chonham'},
      {id:'h4',type:'single',q:'Công thức ở H2 để sao chép đúng xuống H3:H6:',opts:['=SUMIF(B3:B10,F2,D3:D10)','=SUMIF($B$3:$B$10,F2,$D$3:$D$10)','=SUMIF($B$3:$B$10,"Ở",$D$3:$D$10)','=SUM($D$3:$D$10)'],ok:1}],
  key:['Tổng cả vùng: <b>SUM</b>. Đếm theo điều kiện: <b>COUNTIF</b>. Tổng theo điều kiện: <b>SUMIF</b>.','Hai vùng dùng địa chỉ <b>tuyệt đối</b>, điều kiện F2 <b>tương đối</b>.']},

 {t:'Trang tính Thu nhập',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Trang Thu nhập: khoản thu ở B3:B8, số tiền D3:D8, danh sách khoản thu ở F2:F6. Làm thêm có 2 lần: 1 500 và 2 000.</p>',
  qs:[{id:'l1',type:'single',q:'Công thức ở H2:',opts:['=SUMIF($B$3:$B$8,F2,$D$3:$D$8)','=COUNTIF($B$3:$B$8,F2)','=SUMIF(F2,$B$3:$B$8)','=SUM($D$3:$D$8)'],ok:0},
      {id:'l2',type:'single',q:'Tổng tiền khoản Làm thêm (H4) là:',opts:['2','1 500','2 000','3 500'],ok:3}],
  key:['Thêm dòng dữ liệu → mở rộng <b>cả range và sum_range</b>.']},

 {t:'Kinh phí triển lãm',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Dùng SUMIF tính tổng từng khoản thu, chi trong KinhPhiTrienLam.xlsx.</p>',
  qs:[{id:'v1',type:'text',q:'Viết công thức ở H2 trang Các khoản chi.',ans:'=SUMIF($B$3:$B$20,F2,$D$3:$D$20), sao chép sang H3.'}],
  key:['SUMIF giúp <b>tổng hợp</b> thu – chi theo từng khoản.']},

 {t:'Tổng kết',hd:'Tổng kết · 4 phút',phut:4,
  story:'<p>COUNTIF đếm, SUMIF cộng – đều theo điều kiện.</p>',
  qs:[{id:'t1',type:'single',q:'“Tháng này nhà An chi cho Học tập bao nhiêu tiền?” dùng:',opts:['SUM','COUNT','COUNTIF','SUMIF'],ok:3},
      {id:'t2',type:'text',short:1,q:'Gia đình An nên điều chỉnh khoản chi nào? Vì sao?',ans:'Tự đánh giá (khoản Ăn chiếm nhiều nhất…).'}],
  key:['<b>SUMIF</b> = SUM + <b>IF</b> (điều kiện).']}
];

const GHIBAI={so:'Bài 11a:',ten:'SỬ DỤNG HÀM SUMIF',muc:[
 {step:2,h:'Hàm SUMIF',it:['<b>=SUMIF(range, criteria, [sum_range])</b>: kiểm tra range, cộng ô tương ứng ở sum_range.','Không có sum_range: cộng chính các ô của range thoả điều kiện.']},
 {step:3,h:'Chọn hàm',it:['SUM: tổng cả vùng; COUNTIF: đếm có điều kiện; <b>SUMIF</b>: tổng có điều kiện.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T9SI_DATA=[['01/8','Ở','Tiền điện',800],['02/8','Ăn','Đi chợ',3000],['05/8','Học tập','Học phí',2000],['10/8','Di chuyển','Xăng xe',300],['12/8','Ăn','Đi chợ',5000],['15/8','Ở','Tiền nước',120],['20/8','Tiết kiệm','Gửi tiết kiệm',1000],['25/8','Học tập','Mua vở',200]];
function t9siMatch(v,c){c=String(c).trim().replace(/^"|"$/g,'');const m=c.match(/^(>=|<=|<>|>|<|=)?(.*)$/),op=m[1]||'=',x=m[2],n=Number(x);
  if(op!=='='&&op!=='<>'||(!isNaN(n)&&x!=='')){if(typeof v!=='number'||isNaN(n))return false;return{'>':v>n,'<':v<n,'>=':v>=n,'<=':v<=n,'=':v===n,'<>':v!==n}[op];}
  const r=new RegExp('^'+x.replace(/[.+^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*').replace(/\?/g,'.')+'$','i').test(String(v));return op==='<>'?!r:r;}
SIMS_BAI.t9sumif=function(){
  const P=[['B','"Ở"','D'],['B','"Ăn"','D'],['B','"Học*"','D'],['D','">1000"',''],['D','"<500"','']];
  const e=_el(_shell('Bảng tính SUMIF','Chọn <b>range</b>, gõ <b>criteria</b>, chọn <b>sum_range</b>, bấm <b>↵</b>. 🟦 ô được kiểm tra, 🟨 ô được cộng.',
   `<div class="m-t9si"><style>.m-t9si table{border-collapse:collapse;font:14px Consolas,monospace}.m-t9si td,.m-t9si th{border:1px solid #cbd5e1;padding:4px 7px}.m-t9si th,.m-t9si .rh{background:#e2e8f0;text-align:center}
   .m-t9si td.ck{background:#bfdbfe}.m-t9si td.sm{background:#fde047;font-weight:800}.m-t9si .fb{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font:16px Consolas,monospace;margin:8px 0}
   .m-t9si .fb input{font:inherit;width:110px;padding:5px;border:2px solid #2563eb;border-radius:6px}.m-t9si .kq{font:800 22px system-ui;color:#1d4e89}.m-t9si .ex button{font:13px Consolas,monospace;margin:2px;padding:5px 8px;border-radius:8px;border:1px solid #cbd5e1;background:#fff;cursor:pointer}</style>
   <div class="ex">Ví dụ: ${P.map((p,i)=>`<button data-i="${i}">${p[0]}3:${p[0]}10 · ${p[1]}${p[2]?' · '+p[2]+'3:'+p[2]+'10':''}</button>`).join('')}</div>
   <div class="fb"><b>=SUMIF(</b>${_seg('r',[['B','B3:B10'],['D','D3:D10']],'B')}<b>,</b><input class="cr" value='"Ở"'><b>,</b>${_seg('s',[['D','D3:D10'],['','(bỏ trống)']],'D')}<b>)</b><button class="btn acc go">↵</button> <span class="kq">= ?</span></div>
   <table class="sh"></table><table class="tbl sim-hist" style="margin-top:10px"><tr><th>Lần</th><th>Công thức</th><th>Kết quả</th></tr></table></div>`));
  const s={r:'B',s:'D'},hist=[],sh=e.querySelector('.sh');
  const draw=(hit)=>{const col=s.s||s.r;sh.innerHTML='<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><td class="rh">2</td><th>Ngày</th><th>Khoản chi</th><th>Nội dung</th><th>Số tiền</th></tr>'+
    T9SI_DATA.map((d,i)=>`<tr><td class="rh">${i+3}</td>${d.map((v,j)=>{const L='ABCD'[j];let c='';if(hit&&hit[i]&&L===col)c='sm';else if(hit&&L===s.r)c='ck';return `<td class="${c}">${v}</td>`;}).join('')}</tr>`).join('');};
  _wireSeg(e,(n,v)=>{s[n]=v;draw();});
  const run=()=>{const c=e.querySelector('.cr').value.trim(),hit=T9SI_DATA.map(d=>t9siMatch(s.r==='B'?d[1]:d[3],c));let sum=0,err='';
    T9SI_DATA.forEach((d,i)=>{if(hit[i]){const v=(s.s||s.r)==='D'?d[3]:0;sum+=v;}});if(!s.s&&s.r==='B')err=' (cột B là chữ, không cộng được → 0)';
    draw(hit);e.querySelector('.kq').textContent='= '+sum.toLocaleString('vi-VN')+err;
    hist.unshift([`=SUMIF(${s.r}3:${s.r}10,${c}${s.s?','+s.s+'3:'+s.s+'10':''})`,sum]);if(hist.length>6)hist.pop();histTable(e,hist,()=>'');FX.play(sum?'ding':'tick');};
  e.querySelector('.go').onclick=run;e.querySelector('.cr').onkeydown=ev=>{if(ev.key==='Enter')run();};
  e.querySelectorAll('.ex button').forEach(b=>b.onclick=()=>{const p=P[+b.dataset.i];s.r=p[0];s.s=p[2];
    e.querySelectorAll('.sseg').forEach(g=>g.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x.dataset.v===s[g.dataset.n])));e.querySelector('.cr').value=p[1];run();});
  draw();return e;
};
SIMS_BAI.t9chonham=function(){
  const Q=[['Tháng này nhà An chi tất cả bao nhiêu tiền?','SUM','=SUM(D3:D10)',()=>T9SI_DATA.reduce((a,d)=>a+d[3],0)],
   ['Nhà An đi chợ (khoản Ăn) mấy lần?','COUNTIF','=COUNTIF(B3:B10,"Ăn")',()=>T9SI_DATA.filter(d=>d[1]==='Ăn').length],
   ['Khoản Học tập hết bao nhiêu tiền?','SUMIF','=SUMIF(B3:B10,"Học tập",D3:D10)',()=>T9SI_DATA.filter(d=>d[1]==='Học tập').reduce((a,d)=>a+d[3],0)],
   ['Có mấy khoản chi trên 1000?','COUNTIF','=COUNTIF(D3:D10,">1000")',()=>T9SI_DATA.filter(d=>d[3]>1000).length],
   ['Tổng các khoản chi trên 1000 là bao nhiêu?','SUMIF','=SUMIF(D3:D10,">1000")',()=>T9SI_DATA.filter(d=>d[3]>1000).reduce((a,d)=>a+d[3],0)]];
  const e=_el(_shell('SUM, COUNTIF hay SUMIF?','Đọc câu hỏi của mẹ, bấm vào hàm phù hợp. Bảng tính sẽ trả lời!',
   `<div class="m-t9ch"><style>.m-t9ch .q{font:700 20px system-ui;padding:16px;border-radius:14px;background:#fff;border:2px solid #c7d6ea;margin:8px 0}.m-t9ch .bt{display:flex;gap:10px;flex-wrap:wrap}
   .m-t9ch .bt button{font:800 20px Consolas,monospace;padding:14px 22px;border-radius:14px;border:0;cursor:pointer;color:#fff}.m-t9ch .f{font-weight:700;min-height:48px;margin-top:10px}.m-t9ch .sc{font-weight:800;color:#1d4e89}</style>
   <div class="sc"></div><div class="q"></div><div class="bt"><button style="background:#2563eb">SUM</button><button style="background:#7c3aed">COUNTIF</button><button style="background:#e2932b">SUMIF</button></div><div class="f"></div></div>`));
  let i=0,sc=0;const show=()=>{e.querySelector('.sc').textContent='Câu '+(i+1)+'/'+Q.length+' · Điểm '+sc;e.querySelector('.q').textContent='👩 '+Q[i][0];};
  e.querySelectorAll('.bt button').forEach(b=>b.onclick=()=>{const q=Q[i],ok=b.textContent===q[1];if(ok)sc++;
    e.querySelector('.f').innerHTML=(ok?'✓ Đúng! ':'✗ Nên dùng <b>'+q[1]+'</b>. ')+'<code>'+q[2]+'</code> = <b>'+q[3]().toLocaleString('vi-VN')+'</b>';FX.play(ok?'ding':'tick');
    i=(i+1)%Q.length;if(i===0){FX.play('win');e.querySelector('.f').innerHTML+=' <br>🎉 Hết lượt! Điểm: '+sc+'/'+Q.length+'. Bấm tiếp để chơi lại.';sc=0;}show();});
  show();return e;
};

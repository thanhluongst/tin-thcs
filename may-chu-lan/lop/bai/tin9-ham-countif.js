/* Tin học 9 · Bài 10a. Sử dụng hàm COUNTIF · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: trang tính Chi tiêu nhà An – đếm số lần chi của từng khoản.
   Mô phỏng: t9countif (Bảng tính mini: gõ điều kiện, COUNTIF tính trực tiếp, tô ô thoả mãn),
   t9saochepcf (Sao chép công thức có/không có dấu $). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Tháng này chi mấy lần?',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Mẹ hỏi An: <i>“Tháng 8 nhà mình đi chợ (khoản Ăn) mấy lần?”</i>. Bảng chỉ có 8 dòng thì đếm tay được, nhưng cả năm có hàng trăm dòng thì sao?</p>',
  qs:[{id:'k1',type:'single',q:'Hàm SUM, COUNT thiếu điều gì để trả lời câu hỏi của mẹ?',opts:['Không cộng được số','Không xét được điều kiện (chỉ khoản Ăn)','Không chạy trên Excel','Không sao chép được'],ok:1}],
  key:['Cần hàm <b>đếm theo điều kiện</b>: <b>COUNTIF</b>.']},

 {t:'Hàm COUNTIF',hd:'Hình thành kiến thức · Hoạt động 1 · 14 phút',code:'2.1',phut:14,
  story:'<p>Cú pháp: <code>=COUNTIF(range, criteria)</code>. Gõ <b>điều kiện</b> khác nhau vào bảng tính mini và xem ô nào được đếm (tô vàng).</p>',
  qs:[{id:'s1',type:'sim',sim:'t9countif'},
      {id:'h1',type:'match',q:'Ghép tham số với ý nghĩa.',items:['range','criteria'],opts:['Điều kiện kiểm tra các ô','Vùng chứa các ô cần kiểm tra để đếm'],ok:[1,0]},
      {id:'h2',type:'single',q:'=COUNTIF(B3:B10,"Ăn") cho kết quả:',opts:['1','2','3','8000'],ok:1},
      {id:'h3',type:'single',q:'=COUNTIF(D3:D10,">1000") đếm:',opts:['Các khoản có số tiền lớn hơn 1000','Tổng tiền lớn hơn 1000','Số dòng của bảng','Các khoản tên dài hơn 1000 kí tự'],ok:0},
      {id:'h4',type:'single',q:'Điều kiện "H*" nghĩa là:',opts:['Chỉ đúng chữ H','Bắt đầu bằng H, sau đó là dãy kí tự bất kì','Kết thúc bằng H','Chứa dấu *'],ok:1}],
  key:['<b>=COUNTIF(range, criteria)</b> đếm số ô trong <b>range</b> thoả mãn <b>criteria</b>.','Điều kiện: giá trị ("Ăn"), so sánh (">1000"), kí tự đại diện (<b>*</b>), hoặc <b>địa chỉ ô</b> (F2).']},

 {t:'Sao chép công thức',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Ở G2 An gõ <code>=COUNTIF($B$3:$B$10,F2)</code> rồi sao chép xuống G3:G6. Thử bỏ dấu <b>$</b> xem chuyện gì xảy ra.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9saochepcf'},
      {id:'h5',type:'single',q:'Vì sao dùng F2 thay cho "Ở" trong công thức?',opts:['Cho ngắn gọn','Để khi sao chép, điều kiện tự đổi thành F3, F4… theo từng khoản','Vì Excel không nhận chữ Ở','Để công thức chạy nhanh hơn'],ok:1},
      {id:'h6',type:'tf',q:'Khi sao chép =COUNTIF($B$3:$B$10,F2) từ G2 xuống G3:',items:[{t:'$B$3:$B$10 giữ nguyên',a:'T'},{t:'F2 đổi thành F3',a:'T'},{t:'Nếu bỏ $, vùng đếm bị trượt thành B4:B11',a:'T'}]}],
  key:['Vùng đếm dùng <b>địa chỉ tuyệt đối</b> ($B$3:$B$10); điều kiện dùng <b>địa chỉ tương đối</b> (F2).']},

 {t:'Khảo sát lớp',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Phiếu khảo sát 10 bạn ở B4:B13 (các lựa chọn A, B, C, D). Ô D5:D8 chứa A, B, C, D.</p>',
  qs:[{id:'l1',type:'single',q:'Công thức ở E5 để sao chép xuống E8:',opts:['=COUNTIF(B4:B13,D5)','=COUNTIF($B$4:$B$13,D5)','=COUNT($B$4:$B$13)','=COUNTIF($B$4:$B$13,"D5")'],ok:1},
      {id:'l2',type:'single',q:'Thêm dòng dữ liệu mới (đến dòng 20), em cần:',opts:['Không cần sửa gì','Mở rộng vùng thành $B$3:$B$20','Xoá công thức','Đổi sang hàm SUM'],ok:1}],
  key:['Thêm dữ liệu → nhớ <b>mở rộng vùng</b> trong công thức.']},

 {t:'Kinh phí triển lãm',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Mở KinhPhiTrienLam.xlsx, dùng COUNTIF tính số lần thu của mỗi khoản thu, số lần chi của mỗi khoản chi.</p>',
  qs:[{id:'v1',type:'text',q:'Viết công thức em dùng ở trang Các khoản thu.',ans:'Ví dụ G2: =COUNTIF($B$3:$B$20,F2), sao chép sang G3.'}],
  key:['COUNTIF giúp <b>thống kê</b> nhanh mọi bảng dữ liệu.']},

 {t:'Tổng kết',hd:'Tổng kết · 4 phút',phut:4,
  story:'<p>Đếm theo điều kiện chỉ với một công thức!</p>',
  qs:[{id:'t1',type:'single',q:'Công thức đếm số lần chi khoản ghi ở ô F3:',opts:['=COUNTIF($B$3:$B$10,F3)','=COUNT(F3)','=SUM($B$3:$B$10)','=COUNTIF(F3,$B$3:$B$10)'],ok:0},
      {id:'t2',type:'text',short:1,q:'Em sẽ dùng COUNTIF để đếm gì ở nhà/ở lớp?',ans:'Tự đánh giá.'}],
  key:['<b>COUNTIF</b> = COUNT + <b>IF</b> (điều kiện).']}
];

const GHIBAI={so:'Bài 10a:',ten:'SỬ DỤNG HÀM COUNTIF',muc:[
 {step:2,h:'Hàm COUNTIF',it:['<b>=COUNTIF(range, criteria)</b>: đếm số ô trong range thoả mãn criteria.','Điều kiện: "Ăn", ">1000", "H*", hoặc địa chỉ ô F2.']},
 {step:3,h:'Sao chép',it:['range: địa chỉ <b>tuyệt đối</b> ($B$3:$B$10); điều kiện: địa chỉ <b>tương đối</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T9CI_DATA=[['01/8','Ở','Tiền điện',800],['02/8','Ăn','Đi chợ',3000],['05/8','Học tập','Học phí',2000],['10/8','Di chuyển','Xăng xe',300],['12/8','Ăn','Đi chợ',5000],['15/8','Ở','Tiền nước',120],['20/8','Tiết kiệm','Gửi tiết kiệm',1000],['25/8','Học tập','Mua vở',200]];
var T9CI_KHOAN=['Ở','Ăn','Di chuyển','Học tập','Tiết kiệm'];
function t9ciMatch(v,c){c=String(c).trim().replace(/^"|"$/g,'');const m=c.match(/^(>=|<=|<>|>|<|=)?(.*)$/),op=m[1]||'=',x=m[2];const n=Number(x);
  if(op!=='='&&op!=='<>'||(!isNaN(n)&&x!=='')){if(typeof v!=='number'||isNaN(n))return op==='<>'?String(v)!==x:false;return{'>':v>n,'<':v<n,'>=':v>=n,'<=':v<=n,'=':v===n,'<>':v!==n}[op];}
  const re=new RegExp('^'+x.replace(/[.+^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*').replace(/\?/g,'.')+'$','i');const r=re.test(String(v));return op==='<>'?!r:r;}
SIMS_BAI.t9countif=function(){
  const P=[['B','"Ăn"'],['B','"H*"'],['D','">1000"'],['D','"<=300"'],['B','F3'],['B','"<>Ăn"']];
  const e=_el(_shell('Bảng tính COUNTIF','Chọn <b>range</b>, gõ <b>criteria</b> (hoặc bấm một ví dụ), bấm <b>↵</b>. Ô được đếm sẽ tô vàng.',
   `<div class="m-t9ci"><style>.m-t9ci table{border-collapse:collapse;font:14px Consolas,monospace}.m-t9ci td,.m-t9ci th{border:1px solid #cbd5e1;padding:4px 7px}.m-t9ci th,.m-t9ci .rh{background:#e2e8f0;text-align:center}
   .m-t9ci td.hit{background:#fde047;font-weight:800;transition:.3s}.m-t9ci td.rg{outline:2px dashed #2563eb;outline-offset:-2px}.m-t9ci .fb{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font:16px Consolas,monospace;margin:8px 0}
   .m-t9ci .fb input{font:inherit;width:120px;padding:5px;border:2px solid #2563eb;border-radius:6px}.m-t9ci .kq{font:800 22px system-ui;color:#1d4e89}.m-t9ci .ex button{font:13px Consolas,monospace;margin:2px;padding:5px 8px;border-radius:8px;border:1px solid #cbd5e1;background:#fff;cursor:pointer}
   .m-t9ci .w{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start}</style>
   <div class="ex">Ví dụ: ${P.map((p,i)=>`<button data-i="${i}">${p[0]}3:${p[0]}10 · ${p[1]}</button>`).join('')}</div>
   <div class="fb"><b>=COUNTIF(</b>${_seg('r',[['B','B3:B10'],['D','D3:D10']],'B')}<b>,</b><input class="cr" value='"Ăn"'><b>)</b><button class="btn acc go">↵</button> <span class="kq">= ?</span></div>
   <div class="w"><table class="sh"></table><table><tr><th></th><th>F</th></tr>${T9CI_KHOAN.map((k,i)=>`<tr><td class="rh">${i+2}</td><td>${k}</td></tr>`).join('')}</table></div>
   <table class="tbl sim-hist" style="margin-top:10px"><tr><th>Lần</th><th>Công thức</th><th>Kết quả</th></tr></table></div>`));
  let r='B';const hist=[],sh=e.querySelector('.sh');
  const draw=(hit)=>{sh.innerHTML='<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><td class="rh">2</td><th>Ngày</th><th>Khoản chi</th><th>Nội dung</th><th>Số tiền</th></tr>'+
    T9CI_DATA.map((d,i)=>`<tr><td class="rh">${i+3}</td>${d.map((v,j)=>`<td class="${(j===1&&r==='B')||(j===3&&r==='D')?'rg':''} ${hit&&hit[i]&&((j===1&&r==='B')||(j===3&&r==='D'))?'hit':''}">${v}</td>`).join('')}</tr>`).join('');};
  _wireSeg(e,(n,v)=>{r=v;draw();});
  const run=()=>{let c=e.querySelector('.cr').value.trim(),src=c;const ref=c.match(/^F(\d+)$/i);if(ref){c=T9CI_KHOAN[+ref[1]-2]||'';}
    const hit=T9CI_DATA.map(d=>t9ciMatch(r==='B'?d[1]:d[3],c)),n=hit.filter(Boolean).length;draw(hit);e.querySelector('.kq').textContent='= '+n;
    hist.unshift([`=COUNTIF(${r}3:${r}10,${src})`+(ref?` (F${ref[1]}="${c}")`:''),n]);if(hist.length>6)hist.pop();histTable(e,hist,()=>'');FX.play(n?'ding':'tick');};
  e.querySelector('.go').onclick=run;e.querySelector('.cr').onkeydown=ev=>{if(ev.key==='Enter')run();};
  e.querySelectorAll('.ex button').forEach(b=>b.onclick=()=>{const p=P[+b.dataset.i];r=p[0];e.querySelectorAll('.sseg button').forEach(x=>x.classList.toggle('on',x.dataset.v===r));e.querySelector('.cr').value=p[1];run();});
  draw();return e;
};
SIMS_BAI.t9saochepcf=function(){
  const e=_el(_shell('Sao chép công thức COUNTIF','Chọn có/không dấu <b>$</b>, bấm <b>⬇ Sao chép xuống G3:G6</b>. So sánh với kết quả đúng.',
   `<div class="m-t9sc"><style>.m-t9sc table{border-collapse:collapse;font:14px Consolas,monospace}.m-t9sc td,.m-t9sc th{border:1px solid #cbd5e1;padding:5px 8px}.m-t9sc th{background:#e2e8f0}
   .m-t9sc td.g{background:#dcfce7}.m-t9sc td.r{background:#fee2e2}.m-t9sc tr{animation:m9sc .4s}@keyframes m9sc{from{opacity:0;transform:translateY(-8px)}}</style>
   <div class="sim-ctl">${_seg('d',[['1','=COUNTIF($B$3:$B$10,F2)'],['0','=COUNTIF(B3:B10,F2)']],'1')}<button class="btn acc run">⬇ Sao chép xuống G3:G6</button></div>
   <table class="tb"></table><p class="kq" style="font-weight:700"></p></div>`));
  let d='1';_wireSeg(e,(n,v)=>d=v);
  e.querySelector('.run').onclick=()=>{let rows='<tr><th>Ô</th><th>F (khoản)</th><th>Công thức sau khi sao chép</th><th>Kết quả</th><th>Đúng phải là</th></tr>',bad=0;
    T9CI_KHOAN.forEach((k,i)=>{const a=3+(d==='1'?0:i),b=10+(d==='1'?0:i),rg=d==='1'?'$B$3:$B$10':`B${a}:B${b}`;
      const got=T9CI_DATA.filter((x,j)=>j+3>=a&&j+3<=b&&x[1]===k).length,ok=T9CI_DATA.filter(x=>x[1]===k).length;if(got!==ok)bad++;
      rows+=`<tr><td>G${i+2}</td><td>${k}</td><td>=COUNTIF(${rg},F${i+2})</td><td class="${got===ok?'g':'r'}">${got}</td><td>${ok}</td></tr>`;});
    e.querySelector('.tb').innerHTML=rows;e.querySelector('.kq').textContent=bad?'✗ '+bad+' ô sai: vùng đếm bị trượt xuống khi sao chép!':'✓ Tất cả đúng: vùng đếm được giữ cố định nhờ dấu $.';FX.play(bad?'tick':'sparkle');};
  return e;
};

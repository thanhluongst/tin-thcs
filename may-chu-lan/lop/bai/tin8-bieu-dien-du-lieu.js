/* Tin học 8 · Bài 13. Biểu diễn dữ liệu · 1 tiết.
   Tình huống: Bọ rùa vẽ đa giác đều n cạnh với n nhập từ bàn phím.
   Mô phỏng: "phepToan" (máy phép toán Scratch: số, xâu kí tự, lôgic),
             "bienN" (biến n → biểu thức 360/n → Bọ rùa vẽ; tô màu hằng/biến/biểu thức). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Dữ liệu có nhiều kiểu',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>Ở lớp 7, bảng tính có dữ liệu <b>số</b>, <b>văn bản</b>… Scratch cũng có các <b>kiểu dữ liệu</b> riêng. Thử “máy phép toán” của Scratch: đưa vào hai giá trị, chọn phép toán, xem kết quả là kiểu gì.</p>',
  qs:[{id:'s1',type:'sim',sim:'phepToan'},
      {id:'k1',type:'sort',q:'Giá trị nào là kiểu gì?',cols:{c0:'Số',c1:'Xâu kí tự hoặc lôgic'},items:[{t:'25',a:'c0'},{t:'“Xin chào”',a:'c1'},{t:'3.14',a:'c0'},{t:'true (đúng)',a:'c1'},{t:'“8A”',a:'c1'},{t:'−7',a:'c0'}]},
      {id:'k2',type:'match',q:'Ghép phép toán với kiểu dữ liệu kết quả.',items:['5 + 3','kết hợp “Tin” và “học”','5 > 3','độ dài của “Scratch”'],opts:['Lôgic (đúng/sai)','Số','Xâu kí tự'],ok:[1,2,0,1]}],
  key:['Scratch có 3 kiểu dữ liệu: <b>số</b>, <b>xâu kí tự</b>, <b>lôgic</b> (đúng/sai).','Phép <b>so sánh</b>, <b>và/hoặc/không</b> cho kết quả <b>lôgic</b>.']},
 {t:'Hằng, biến và biểu thức',hd:'Hình thành kiến thức · Hoạt động 1 · 13 phút',code:'2.1',phut:13,
  story:'<p>Chương trình Bài 12 chỉ vẽ được tam giác. Muốn vẽ <b>đa giác đều n cạnh bất kì</b>: tạo <b>biến n</b>, số lần lặp là <b>n</b>, góc xoay là <b>biểu thức 360/n</b>.</p>',
  qs:[{id:'s2',type:'sim',sim:'bienN'},
      {id:'b1',type:'sort',q:'Thành phần là gì?',cols:{c0:'Hằng hoặc biểu thức',c1:'Biến'},items:[{t:'360',a:'c0'},{t:'n (số cạnh nhập từ bàn phím)',a:'c1'},{t:'360 / n',a:'c0'},{t:'độ dài cạnh (có thể thay đổi khi chạy)',a:'c1'},{t:'100',a:'c0'}]},
      {id:'b2',type:'single',q:'Nhập n = 4 thì Bọ rùa vẽ hình gì, mỗi lần xoay bao nhiêu độ?',opts:['Tam giác, 120°','Hình vuông, 90°','Ngũ giác, 72°','Lục giác, 60°'],ok:1},
      {id:'b3',type:'tf',q:'Đúng hay sai?',items:[{t:'Biến là tên của vùng nhớ, giá trị có thể thay đổi khi chương trình chạy',a:'T'},{t:'Hằng có giá trị thay đổi mỗi lần chạy',a:'F'},{t:'Biểu thức kết hợp hằng, biến bằng các phép toán',a:'T'}]}],
  key:['<b>Hằng</b>: giá trị không đổi. <b>Biến</b>: vùng nhớ có tên, giá trị <b>thay đổi</b> được.','<b>Biểu thức</b>: hằng, biến kết hợp bằng <b>phép toán</b>.']},
 {t:'Biến trong Scratch',hd:'Hình thành kiến thức · Hoạt động 2 · 7 phút',code:'2.2',phut:7,
  qs:[{id:'sc',type:'match',q:'Ghép khối lệnh với tác dụng.',items:['Make a Variable (Tạo một biến)','đặt n thành 5','thay đổi n một lượng 1','hỏi … và đợi; trả lời'],opts:['Nhận dữ liệu từ bàn phím','Tăng giá trị n thêm 1','Gán giá trị 5 cho biến n','Tạo biến mới, đặt tên'],ok:[3,2,1,0]}],
  key:['Nhóm <b>Biến (Variables)</b>: tạo biến, <b>đặt</b> giá trị, <b>thay đổi</b> giá trị.']},
 {t:'Luyện tập: hình tròn',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>r là biến lưu bán kính hình tròn, <b>r = 5</b>, π ≈ 3,14.</p>',
  qs:[{id:'lt',type:'match',q:'Ghép biểu thức với giá trị.',items:['2 * 3.14 * r','3.14 * r * r','r * r','r + r'],opts:['25','10','78.5','31.4'],ok:[3,2,0,1]}],
  key:['Biểu thức tính <b>chu vi</b>: 2·π·r; <b>diện tích</b>: π·r·r.']},
 {t:'Vận dụng',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  qs:[{id:'vd',type:'text',q:'Mô tả chương trình Scratch của em có dùng biến (vd: tính tiền mua vở). Biến nào? Biểu thức nào?',ans:'VD: biến số_vở, giá; biểu thức tiền = số_vở * giá; hỏi số vở từ bàn phím rồi nói tiền.'}],
  key:['Biến giúp chương trình <b>dùng được với nhiều dữ liệu</b> khác nhau.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Kết quả của phép so sánh 7 < 3 là:',opts:['7','3','sai (false)','“7<3”'],ok:2}],
  key:['<b>Kiểu dữ liệu – hằng – biến – biểu thức</b>.']}
];
const GHIBAI={so:'Bài 13:',ten:'BIỂU DIỄN DỮ LIỆU',muc:[
 {step:2,h:'Kiểu dữ liệu trong Scratch',it:['<b>Số</b>, <b>xâu kí tự</b>, <b>lôgic</b> (đúng/sai).']},
 {step:3,h:'Hằng, biến, biểu thức',it:['<b>Hằng</b>: không đổi; <b>biến</b>: vùng nhớ có tên, giá trị thay đổi.','<b>Biểu thức</b>: hằng, biến + phép toán. VD: <b>360 / n</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.phepToan=function(){
  const O=[['+','cộng','#59c059'],['-','trừ','#59c059'],['*','nhân','#59c059'],['/','chia','#59c059'],['>','lớn hơn','#59c059'],['=','bằng','#59c059'],['và','và','#59c059'],['kết hợp','kết hợp','#59c059'],['độ dài','độ dài của','#59c059']];
  const e=_el(_shell('Máy phép toán Scratch','Nhập <b>a</b>, <b>b</b> (số hoặc chữ, hoặc true/false), chọn <b>phép toán</b>, bấm <b>= Tính</b>.',
   `<div class="m8pt"><style>.m8pt .blk{display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;background:#59c059;color:#fff;font:800 18px system-ui;border-radius:30px;padding:12px 18px;width:max-content;max-width:100%;margin:12px auto}.m8pt input{width:110px;border:0;border-radius:20px;padding:6px 10px;font:700 17px system-ui;text-align:center}.m8pt select{font:700 16px system-ui;border-radius:10px;padding:4px}.m8pt .out{text-align:center;font:800 26px system-ui;margin:8px}.m8pt .ty{display:inline-block;border-radius:999px;padding:4px 14px;color:#fff;font-size:15px}</style>
    <div class="blk"><span class="pa">(</span><input class="a" value="5"><select>${O.map(o=>`<option value="${o[0]}">${o[1]}</option>`).join('')}</select><input class="b" value="3"><span>)</span><button class="btn acc go">= Tính</button></div>
    <div class="out">?</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Phép toán</th><th>Kết quả</th><th>Kiểu</th></tr></table></div>`));
  const hist=[]; const sel=e.querySelector('select'), B=e.querySelector('.b');
  sel.onchange=()=>{B.style.display=sel.value==='độ dài'?'none':''; FX.play('tick');};
  const num=v=>v.trim()!==''&&!isNaN(+v), lg=v=>v==='true'||v==='false';
  e.querySelector('.go').onclick=()=>{const a=e.querySelector('.a').value, b=B.value, o=sel.value; let r, t;
    if(['+','-','*','/'].includes(o)){const x=num(a)?+a:0, y=num(b)?+b:0; r=o==='+'?x+y:o==='-'?x-y:o==='*'?x*y:(y===0?'Vô cực':Math.round(x/y*1000)/1000); t='Số';}
    else if(o==='>'||o==='='){r=num(a)&&num(b)?(o==='>'?+a>+b:+a===+b):(o==='>'?a.toLowerCase()>b.toLowerCase():a.toLowerCase()===b.toLowerCase()); r=String(r); t='Lôgic';}
    else if(o==='và'){r=String(a==='true'&&b==='true'); t='Lôgic';}
    else if(o==='kết hợp'){r='“'+a+b+'”'; t='Xâu kí tự';} else {r=a.length; t='Số';}
    const col={Số:'#2563eb',Lôgic:'#7c3aed','Xâu kí tự':'#ea580c'}[t];
    e.querySelector('.out').innerHTML=r+' <span class="ty" style="background:'+col+'">'+t+'</span>';
    hist.unshift([o==='độ dài'?'độ dài của “'+a+'”':a+' '+sel.selectedOptions[0].text+' '+b,String(r),t]); if(hist.length>6) hist.pop(); histTable(e,hist,()=>''); FX.play('ding');};
  return e;
};
SIMS_BAI.bienN=function(){
  const e=_el(_shell('Biến n – đa giác đều','Kéo thanh <b>n</b> (hoặc độ dài cạnh), bấm <b>▶ Chạy</b>. Màu: <span style="color:#2563eb">■ hằng</span> <span style="color:#ea580c">■ biến</span> <span style="color:#16a34a">■ biểu thức</span>.',
   `<div class="m8bn"><style>.m8bn .g{display:grid;grid-template-columns:1fr 1fr;gap:12px}.m8bn .cd div{background:#4c97ff;color:#fff;border-radius:8px;padding:7px 10px;margin:4px 0;font:700 15px system-ui}.m8bn .cd .c{background:#ffab19}.m8bn .cd .v{background:#ff8c1a}.m8bn .cd .in{margin-left:20px}.m8bn b.h{background:#fff;color:#2563eb;border-radius:10px;padding:0 6px}.m8bn b.b{background:#fff;color:#ea580c;border-radius:10px;padding:0 6px}.m8bn b.x{background:#fff;color:#16a34a;border-radius:10px;padding:0 6px}.m8bn svg{width:100%;background:#fff;border:1px solid #e2e8f0;border-radius:12px}.m8bn input{width:100%;accent-color:#ea580c}@media(max-width:620px){.m8bn .g{grid-template-columns:1fr}}</style>
    <div class="g"><div><label>n = <b class="nv">3</b><input type="range" class="n" min="3" max="12" value="3"></label><label>cạnh = <b class="lv">80</b><input type="range" class="l" min="20" max="100" value="80"></label>
    <div class="cd"><div class="c">🏁 khi bấm vào cờ xanh</div><div class="v">đặt <b class="b">n</b> thành <b class="nv2">3</b></div><div class="c">lặp lại <b class="b">n</b></div><div class="in">di chuyển <b class="b">cạnh</b> bước</div><div class="in">xoay ↺ <b class="x">(<b class="h">360</b> / <b class="b">n</b>)</b> = <b class="gv">120</b> độ</div></div>
    <div class="sim-ctl"><button class="btn acc run">▶ Chạy</button></div></div><svg viewBox="0 0 300 260"><g class="ink"></g><text class="bug" font-size="22" text-anchor="middle" dominant-baseline="central">🐞</text></svg></div></div>`));
  const q=s=>e.querySelector(s); let tm;
  const up=()=>{const n=+q('.n').value; q('.nv').textContent=n; q('.nv2').textContent=n; q('.lv').textContent=q('.l').value; q('.gv').textContent=Math.round(360/n*100)/100;};
  q('.n').oninput=()=>{up(); FX.play('tick');}; q('.l').oninput=up;
  q('.run').onclick=()=>{clearInterval(tm); const n=+q('.n').value, L=+q('.l').value*(n>8?.6:1); let x=150-L/2, y=240, a=0, i=0; const ink=q('.ink'), bug=q('.bug'); ink.innerHTML='';
    const pl=()=>{bug.setAttribute('x',x); bug.setAttribute('y',y);}; pl(); FX.play('whoosh');
    tm=setInterval(()=>{if(i>=n){clearInterval(tm); FX.play('win'); return;} const r=a*Math.PI/180, nx=x+L*Math.cos(r), ny=y+L*Math.sin(r);
      ink.insertAdjacentHTML('beforeend',`<line x1="${x}" y1="${y}" x2="${nx}" y2="${ny}" stroke="#ea580c" stroke-width="4" stroke-linecap="round"/>`); x=nx; y=ny; a-=360/n; i++; pl(); FX.play('tick');},350);};
  up(); return e;
};

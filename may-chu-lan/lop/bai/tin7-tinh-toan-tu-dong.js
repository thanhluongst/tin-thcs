/* Tin học 7 · Bài 7. Tính toán tự động trên bảng tính · 2 tiết. Soạn lại cho lớp học LAN.
   Tình huống: tính tiền mua cây cho dự án Trường học xanh.
   Mô phỏng: "ttTuDong" (công thức dùng số vs dùng địa chỉ ô khi sửa dữ liệu), "ttSaoChep" (kéo sao chép công thức – địa chỉ tự thay đổi). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Giá cây thay đổi!',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p><b>An</b> tính tiền mua 12 cây bàng giá 50 nghìn: An gõ <code>=12*50</code>. <b>Minh</b> gõ <code>=B2*C2</code>. Hôm sau giá đổi thành 60 nghìn… Thử <b>sửa giá</b> trong mô phỏng xem công thức của ai tự cập nhật.</p>',
  qs:[{id:'s1',type:'sim',sim:'ttTuDong'},
      {id:'q1',type:'single',q:'Quan sát: Khi sửa giá ở ô C2, kết quả của ai tự thay đổi?',opts:['Của An (=12*50)','Của Minh (=B2*C2)','Cả hai','Không ai'],ok:1},
      {id:'q2',type:'single',q:'Vì sao?',opts:['Vì công thức của Minh dài hơn','Vì công thức của Minh dùng địa chỉ ô, lấy dữ liệu mới nhất trong ô','Vì An gõ sai','Vì Excel ưu tiên Minh'],ok:1}],
  key:['Dùng <b>địa chỉ ô</b> trong công thức → dữ liệu thay đổi, kết quả <b>tự động cập nhật</b>.']},
 {t:'Công thức và phép toán',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Công thức bắt đầu bằng <b>=</b>, gồm số, địa chỉ ô, các phép toán <b>+ − * / ^</b> và dấu ngoặc. Thứ tự: ngoặc → luỹ thừa → nhân chia → cộng trừ.</p>',
  qs:[{id:'h1',type:'match',q:'Ghép biểu thức toán với công thức bảng tính.',items:['(5 + 3) × 2','10 : 4','2³','15 − 3 × 2'],opts:['=(5+3)*2','=10/4','=2^3','=15-3*2'],ok:[0,1,2,3]},
      {id:'h2',type:'single',q:'Ô A1 = 4, B1 = 6. Công thức <code>=(A1+B1)/2</code> cho kết quả:',opts:['7','5','10','4'],ok:1},
      {id:'h3',type:'tf',q:'Đúng hay sai?',items:[{t:'Dấu nhân trong bảng tính là *',a:'T'},{t:'Công thức =A1 x B1 là đúng',a:'F'},{t:'Có thể chọn ô bằng chuột khi đang gõ công thức',a:'T'}]}],
  key:['Phép toán: <b>+ − * / ^</b>; ưu tiên <b>( )</b>.','Gõ <b>=</b>, bấm chọn ô, gõ phép toán, <b>Enter</b>.']},
 {t:'Sao chép công thức',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Bảng có 5 loại cây. Gõ công thức cho từng hàng thì lâu! Thử <b>kéo thả nút điền</b> (ô vuông nhỏ góc phải dưới) để sao chép công thức ở D2 xuống dưới.</p>',
  qs:[{id:'s2',type:'sim',sim:'ttSaoChep'},
      {id:'c1',type:'single',q:'Quan sát: Sao chép <code>=B2*C2</code> từ D2 xuống D4, công thức ở D4 là:',opts:['=B2*C2','=B4*C4','=B3*C3','=D2*D3'],ok:1},
      {id:'c2',type:'single',q:'Sao chép <code>=B2*C2</code> từ D2 sang E2 (sang phải 1 cột) thì công thức thành:',opts:['=B2*C2','=C2*D2','=B3*C3','=C3*D3'],ok:1},
      {id:'c3',type:'text',q:'Giải thích vì sao sao chép công thức giúp tính nhanh cho cả bảng? (1–2 câu)',ans:'Địa chỉ ô trong công thức tự điều chỉnh theo vị trí mới (địa chỉ tương đối), nên mỗi hàng tính đúng dữ liệu của hàng đó mà không phải gõ lại.'}],
  key:['Sao chép công thức: địa chỉ ô <b>tự điều chỉnh</b> theo vị trí (<b>địa chỉ tương đối</b>).']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút!</p>',
  qs:[{id:'l1',type:'single',q:'Ô E3 có <code>=C3+D3</code>. Sao chép E3 sang E7 thì được:',opts:['=C3+D3','=C7+D7','=G3+H3','=C7+D3'],ok:1},
      {id:'l2',type:'single',q:'Công thức nào tính trung bình của A1, A2, A3?',opts:['=A1+A2+A3/3','=(A1+A2+A3)/3','=(A1+A2+A3):3','(A1+A2+A3)/3'],ok:1}],
  key:['Nhớ dấu <b>=</b> và <b>dấu ngoặc</b>.']},
 {t:'Bảng chi phí trồng cây',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Cột B: số cây, C: đơn giá, D: thành tiền (hàng 2–6). Ô D7 là tổng.</p>',
  qs:[{id:'v1',type:'single',q:'Cách nhanh nhất điền cột D2:D6 là:',opts:['Gõ 5 công thức khác nhau','Gõ =B2*C2 ở D2 rồi kéo nút điền xuống D6','Tính bằng máy tính bỏ túi rồi gõ số','Sao chép giá trị ở D2'],ok:1},
      {id:'v2',type:'single',q:'Ô D7 nên là:',opts:['=D2+D3+D4+D5+D6','=D2*D6','=B7*C7','D2+D6'],ok:0}],
  key:['<b>Một công thức + kéo sao chép</b> = cả bảng.']},
 {t:'Tổng kết',hd:'Tổng kết · 3 phút',code:'',phut:3,
  story:'<p>Bảng tính tự động tính lại khi dữ liệu thay đổi.</p>',
  qs:[{id:'t1',type:'single',q:'Câu nào đúng?',opts:['Nên gõ số trực tiếp vào công thức','Dùng địa chỉ ô để kết quả tự cập nhật','Sao chép công thức giữ nguyên địa chỉ ô','Công thức không cần dấu ='],ok:1}],
  key:['<b>Địa chỉ ô</b> + <b>sao chép công thức</b> → tính toán tự động.']}
];
const GHIBAI={so:'Bài 7:',ten:'TÍNH TOÁN TỰ ĐỘNG TRÊN BẢNG TÍNH',muc:[
 {step:2,h:'Công thức',it:['Bắt đầu bằng <b>=</b>; phép toán <b>+ − * / ^</b>, ngoặc ( ).','Dùng <b>địa chỉ ô</b> → kết quả <b>tự cập nhật</b>.']},
 {step:3,h:'Sao chép công thức',it:['Kéo <b>nút điền</b> hoặc Ctrl+C/Ctrl+V.','Địa chỉ ô <b>tự điều chỉnh</b> (=B2*C2 → =B3*C3).']}]};

var SIMS_BAI=window.SIMS_BAI||{};
function _t7tt_css(){return `<style>.m-t7tt table{border-collapse:collapse;font-size:15px;background:#fff;margin:6px 0}.m-t7tt th{background:#e2e8f0;padding:4px 8px}
.m-t7tt td{border:1px solid #cbd5e1;min-width:84px;height:30px;padding:2px 8px;text-align:right}.m-t7tt td.t{text-align:left}.m-t7tt td.f{background:#fef9c3;font-weight:700}
.m-t7tt td.hl{background:#bbf7d0;transition:.3s}.m-t7tt input{width:70px;font-size:15px;text-align:right;border:2px solid #2563eb;border-radius:6px}
.m-t7tt .fl{position:relative}.m-t7tt .h{position:absolute;right:-5px;bottom:-5px;width:11px;height:11px;background:#16a34a;border:2px solid #fff;cursor:crosshair}</style>`;}
SIMS_BAI.ttTuDong=function(){
  const e=_el(_shell('Ai tự cập nhật?','Sửa <b>số cây</b> hoặc <b>đơn giá</b> (ô xanh). Quan sát cột của An và Minh.',
   _t7tt_css()+`<div class="m-t7tt" style="overflow:auto"><table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D – An</th><th>E – Minh</th></tr>
   <tr><th>1</th><td class="t">Cây</td><td class="t">Số cây</td><td class="t">Giá (nghìn)</td><td class="t">=12*50</td><td class="t">=B2*C2</td></tr>
   <tr><th>2</th><td class="t">🌳 Bàng</td><td><input class="b" type="number" value="12"></td><td><input class="c" type="number" value="50"></td><td class="f an">600</td><td class="f mi">600</td></tr></table></div>
   <div class="kq" style="padding:12px;border-radius:12px;background:#f1f5f9;font-weight:700;text-align:center">Thử đổi giá thành 60</div>`));
  const b=e.querySelector('.b'),c=e.querySelector('.c'),mi=e.querySelector('.mi'),an=e.querySelector('.an'),kq=e.querySelector('.kq');
  const go=()=>{const v=(+b.value||0)*(+c.value||0); mi.textContent=v; mi.classList.add('hl'); setTimeout(()=>mi.classList.remove('hl'),400);
    const ok=v===600; an.style.background=ok?'':'#fee2e2'; kq.innerHTML=ok?'Hai kết quả bằng nhau.':'Minh: <b>'+v+'</b> ✓ tự cập nhật · An: vẫn <b>600</b> ✗ (phải sửa công thức bằng tay)'; FX.play(ok?'tick':'ding');};
  b.oninput=go; c.oninput=go; return e;
};
SIMS_BAI.ttSaoChep=function(){
  const R=[['🌳 Bàng',12,50],['🌴 Cau',8,70],['🌸 Hoa sữa',10,45],['🍋 Chanh',6,30],['🌿 Si',4,90]];
  const e=_el(_shell('Kéo sao chép công thức','Bấm ô <b>D2</b>, rồi bấm <b>⬇ Kéo xuống 1 hàng</b> nhiều lần (như kéo nút điền ■). Bấm ô bất kì ở cột D để xem công thức.',
   _t7tt_css()+`<div class="m-t7tt" style="overflow:auto"><div style="font:700 16px Consolas,monospace;padding:6px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:4px">fx: <span class="fb">=B2*C2</span></div>
   <table><tr><th></th><th>A</th><th>B – Số cây</th><th>C – Giá</th><th>D – Thành tiền</th></tr>${R.map((r,k)=>`<tr><th>${k+2}</th><td class="t">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td class="d" data-r="${k+2}"></td></tr>`).join('')}</table>
   <button type="button" class="btn acc dn">⬇ Kéo xuống 1 hàng</button> <button type="button" class="btn rs">↺ Làm lại</button></div>`));
  let n=2; const fb=e.querySelector('.fb'),show=()=>e.querySelectorAll('td.d').forEach(td=>{const r=+td.dataset.r; td.className='d'+(r<=n?' f':''); td.innerHTML=r<=n?R[r-2][1]*R[r-2][2]+(r===n?'<span class="h"></span>':''):''; td.classList.add('fl');});
  e.querySelectorAll('td.d').forEach(td=>td.onclick=()=>{const r=+td.dataset.r; fb.textContent=r<=n?'=B'+r+'*C'+r:'(trống)'; FX.play('tick');});
  e.querySelector('.dn').onclick=()=>{if(n>=6){FX.play('win');return;} n++; show(); fb.textContent='=B'+n+'*C'+n; const td=e.querySelector(`td[data-r="${n}"]`); td.classList.add('hl'); FX.play('whoosh');};
  e.querySelector('.rs').onclick=()=>{n=2; show(); fb.textContent='=B2*C2';}; show();
  return e;
};

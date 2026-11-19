/* Tin học 8 · Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế · 1 tiết.
   Tình huống: Khoa tính doanh thu các phần mềm và doanh thu của công ti (tỉ lệ 70% ở ô F2).
   Mô phỏng: "saochep" (sao chép công thức – địa chỉ tương đối/tuyệt đối, bấm F4 gắn $). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Bảng tính của Khoa',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p><b>Khoa</b> lập bảng số liệu bán phần mềm: cột <b>Đơn giá</b> (C), <b>Số lượt tải</b> (D). Khoa cần tính <b>Doanh thu</b> (E) = Đơn giá × Số lượt tải, và <b>Doanh thu của công ti</b> (F) = Doanh thu × tỉ lệ <b>70%</b> ở ô <b>F2</b>.</p>',
  qs:[{id:'kd',type:'single',q:'Công thức tính Doanh thu ô E4 là:',opts:['=C4+D4','=C4*D4','=C4/D4','C4*D4'],ok:1},
      {id:'kd2',type:'single',q:'Tính cho các phần mềm còn lại mà không gõ lại công thức, em làm thế nào?',opts:['Gõ lại từng ô','Sao chép công thức (kéo thả nút điền)','Xoá bảng làm lại','Dùng máy tính bỏ túi'],ok:1}],
  key:['Công thức bắt đầu bằng dấu <b>=</b>; có thể <b>sao chép</b> công thức sang ô khác.']},
 {t:'Phòng thí nghiệm sao chép công thức',hd:'Hình thành kiến thức · Hoạt động 1 · 13 phút',code:'2.1',phut:13,
  story:'<p>Nhập công thức cho ô <b>F4</b> rồi <b>kéo xuống</b> F5–F7. Thử cả <code>=E4*F2</code> và <code>=E4*$F$2</code> (bấm <b>F4</b> để gắn dấu $). Quan sát công thức và kết quả ở từng ô.</p>',
  qs:[{id:'s1',type:'sim',sim:'saochep'},
      {id:'q1',type:'single',q:'Sao chép <code>=E4*F2</code> từ F4 xuống F5 thì được công thức gì?',opts:['=E4*F2','=E5*F3','=E5*F2','=E4*F3'],ok:1},
      {id:'q2',type:'single',q:'Vì sao kết quả ở F5 sai khi dùng <code>=E4*F2</code>?',opts:['Vì F3 là ô trống/không phải tỉ lệ 70%','Vì E5 sai','Vì phần mềm lỗi','Vì phải dùng phép cộng'],ok:0},
      {id:'q3',type:'single',q:'Sao chép <code>=E5*$F$2</code> từ F5 đến F6, công thức nhận được là:',opts:['=E6*$F$3','=E6*$F$2','=E5*$F$2','=E6*F3'],ok:1}],
  key:['<b>Địa chỉ tương đối</b> (F2) <b>thay đổi</b> khi sao chép; <b>địa chỉ tuyệt đối</b> ($F$2) <b>giữ nguyên</b>.','Gõ $ trực tiếp hoặc bấm <b>F4</b> sau địa chỉ ô.']},
 {t:'Tương đối, tuyệt đối, hỗn hợp',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',phut:8,
  story:'<p>Mỗi lần bấm F4, dấu $ thay đổi: <code>F2 → $F$2 → F$2 → $F2 → F2</code>.</p>',
  qs:[{id:'dc',type:'match',q:'Ghép địa chỉ với loại.',items:['B3','$B$3','B$3','$B3'],opts:['Tuyệt đối','Hỗn hợp: cố định hàng','Tương đối','Hỗn hợp: cố định cột'],ok:[2,0,1,3]},
      {id:'dc2',type:'single',q:'Ô C1 có <code>=A1*B1</code>. Sao chép C1 sang E2 thì được:',opts:['=A1*B1','=C2*D2','=B2*C2','=C1*D1'],ok:1}],
  key:['Sao chép lệch <b>m cột, n hàng</b> → địa chỉ tương đối lệch đúng m cột, n hàng.']},
 {t:'Bảng giá giảm 20%',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Cửa hàng: cột C là Đơn giá, ô <b>D2</b> lưu tỉ lệ giảm giá <b>20%</b>. Cột D là Giá sau giảm, cột E Số lượng, cột F Tổng tiền.</p>',
  qs:[{id:'lt1',type:'single',q:'Công thức ô D5 (rồi sao chép xuống) là:',opts:['=C5*(1-D2)','=C5*(1-$D$2)','=C5-D2','=$C$5*D2'],ok:1},
      {id:'lt2',type:'single',q:'Công thức Tổng tiền ô F5:',opts:['=D5*E5','=D5+E5','=$D$5*E5','=C5*E5*D2'],ok:0}],
  key:['Ô chứa <b>tham số chung</b> (tỉ lệ, đơn giá cố định) → dùng <b>địa chỉ tuyệt đối</b>.']},
 {t:'Bảng tính phần mềm em thích',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  qs:[{id:'vd',type:'text',q:'Em sẽ lập bảng tính 5 phần mềm (tên, lượt tải, đánh giá…) và tính toán gì? Viết 1 công thức có dùng địa chỉ tuyệt đối.',ans:'VD: Tỉ lệ lượt tải =D4/$D$9 với D9 là tổng lượt tải.'}],
  key:['Bảng tính giúp giải <b>bài toán thực tế</b> nhanh, chính xác.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'tf',q:'Đúng hay sai?',items:[{t:'$A$1 không đổi khi sao chép công thức',a:'T'},{t:'A1 luôn giữ nguyên khi sao chép',a:'F'}]}],
  key:['<b>Tương đối</b> đổi, <b>tuyệt đối</b> giữ nguyên.']}
];
const GHIBAI={so:'Bài 5:',ten:'SỬ DỤNG BẢNG TÍNH GIẢI QUYẾT BÀI TOÁN THỰC TẾ',muc:[
 {step:2,h:'Địa chỉ ô khi sao chép công thức',it:['<b>Tương đối</b> (A1): thay đổi theo vị trí ô mới.','<b>Tuyệt đối</b> ($A$1): giữ nguyên. Bấm <b>F4</b> để gắn $.']},
 {step:3,h:'Địa chỉ hỗn hợp',it:['<b>$A1</b>: cố định cột; <b>A$1</b>: cố định hàng.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.saochep=function(){
  const R=[['Quản lí thời gian',30000,66665],['Từ điển Anh–Việt',20000,48000],['Luyện gõ phím',15000,35000],['Vẽ tranh',25000,41000]];
  const e=_el(_shell('Sao chép công thức','Chọn cách viết địa chỉ ô tỉ lệ (hoặc bấm <b>F4</b>), bấm <b>⬇ Kéo xuống</b>. Bấm vào một ô cột F để xem công thức.',
   `<div class="m8sc"><style>.m8sc table{border-collapse:collapse;width:100%;font:15px Consolas,monospace;background:#fff}.m8sc td,.m8sc th{border:1px solid #cbd5e1;padding:6px 8px;text-align:right}.m8sc th{background:#e2e8f0;text-align:center}.m8sc td.l{text-align:left;font-family:system-ui}.m8sc .rn{background:#e2e8f0;text-align:center;width:28px}.m8sc .hl{background:#fef08a}.m8sc .bad{background:#fee2e2;color:#b91c1c}.m8sc .good{background:#dcfce7}.m8sc .fx{font:16px Consolas,monospace;border:2px solid #94a3b8;border-radius:8px;padding:8px;margin:8px 0;background:#f8fafc}.m8sc .sel{outline:3px solid #2563eb}</style>
    <div class="sim-ctl"><div><b>Công thức F4:</b> ${_seg('m',[['F2','=E4*F2'],['$F$2','=E4*$F$2'],['F$2','=E4*F$2'],['$F2','=E4*$F2']],'F2')}</div><button class="btn ghost f4">F4</button><button class="btn acc go">⬇ Kéo xuống F5:F7</button></div>
    <div class="fx">fx <span></span></div><div style="overflow-x:auto"><table></table></div></div>`));
  let m='F2', filled=0, sel=4;
  const ref=(row)=>{const dr=row-4, c=m.startsWith('$'), r=m.includes('$2'); return (c?'$F':'F')+(r?'$2':(2+dr));};
  const val=(a)=>{const row=+a.replace(/\D/g,''); return row===2?0.7:row===3?'':row>=4&&row<4+filled+1?'(F'+row+')':'';};
  function draw(){let h='<tr><th></th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr><tr><td class="rn">2</td><td class="l" colspan="3"></td><td class="l">Tỉ lệ:</td><td class="hl">70%</td></tr><tr><td class="rn">3</td><td class="l">Phần mềm</td><td class="l">Đơn giá</td><td class="l">Lượt tải</td><td class="l">Doanh thu</td><td class="l">DT công ti</td></tr>';
    R.forEach((x,i)=>{const row=4+i, E=x[1]*x[2]; let f='';
      if(i<=filled){const a=ref(row), ar=+a.replace(/\D/g,''); const k=ar===2?0.7:ar===3?null:'ref'; const v=k===null?'#VALUE!':k==='ref'?'0':Math.round(E*k).toLocaleString('vi');
        f=`<td data-r="${row}" class="${v==='#VALUE!'||v==='0'?'bad':'good'} ${sel===row?'sel':''}" style="cursor:pointer">${v}</td>`;} else f='<td></td>';
      h+=`<tr><td class="rn">${row}</td><td class="l">${x[0]}</td><td>${x[1].toLocaleString('vi')}</td><td>${x[2].toLocaleString('vi')}</td><td>${E.toLocaleString('vi')}</td>${f}</tr>`;});
    e.querySelector('table').innerHTML=h; e.querySelector('.fx span').textContent=sel-4<=filled?'=E'+sel+'*'+ref(sel):'';
    e.querySelectorAll('td[data-r]').forEach(td=>td.onclick=()=>{sel=+td.dataset.r; FX.play('tick'); draw();});}
  const setM=v=>{m=v; filled=0; sel=4; e.querySelectorAll('.sseg button').forEach(b=>b.classList.toggle('on',b.dataset.v===v)); draw();};
  _wireSeg(e,(n,v)=>setM(v));
  e.querySelector('.f4').onclick=()=>{const o=['F2','$F$2','F$2','$F2']; setM(o[(o.indexOf(m)+1)%4]); FX.play('tick');};
  e.querySelector('.go').onclick=()=>{filled=3; sel=5; draw(); const bad=e.querySelectorAll('td.bad').length; FX.play(bad?'drum':'sparkle');};
  draw(); return e;
};

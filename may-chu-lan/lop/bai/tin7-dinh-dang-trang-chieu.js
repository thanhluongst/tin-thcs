/* Tin học 7 · Bài 12. Định dạng đối tượng trên trang chiếu · 2 tiết. Soạn lại cho lớp học LAN.
   Mô phỏng: "ddChu" (cỡ chữ, màu chữ – nền, số dòng → điểm dễ đọc), "ddHinh" (chèn ảnh, lớp Send to Back/Bring to Front, kéo góc giữ tỉ lệ). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Trang chiếu nào dễ đọc?',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p><b>Khoa</b> làm trang chiếu chữ nhỏ, 7 màu, chữ vàng trên nền trắng… Cả lớp ngồi cuối không đọc được! Thử chỉnh <b>cỡ chữ, màu, số dòng</b> trong mô phỏng để đạt điểm dễ đọc cao.</p>',
  qs:[{id:'s1',type:'sim',sim:'ddChu'},
      {id:'q1',type:'single',q:'Quan sát: Màu chữ và màu nền thế nào thì dễ đọc nhất?',opts:['Vàng trên trắng','Tương phản: chữ tối trên nền sáng hoặc ngược lại','Đỏ trên tím','Cùng màu'],ok:1},
      {id:'q2',type:'single',q:'Mỗi trang chiếu nên có khoảng:',opts:['1–2 dòng','Không quá 6–7 dòng, ý ngắn gọn','15–20 dòng','Càng nhiều càng tốt'],ok:1}],
  key:['Chữ <b>đủ lớn</b>, màu <b>tương phản</b> với nền, <b>ít dòng</b>, ít màu.']},
 {t:'Định dạng văn bản',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Định dạng văn bản trên trang chiếu giống trong phần mềm soạn thảo: phông, cỡ, màu, kiểu chữ, căn lề. Có thể dùng <b>mẫu định dạng</b> (Design → Themes) cho cả bài.</p>',
  qs:[{id:'h1',type:'match',q:'Ghép lời khuyên với yếu tố.',items:['Dùng 1–2 phông chữ dễ đọc','Tiêu đề ≥ 28pt, nội dung ≥ 20pt','Không quá 3 màu chữ','Chọn mẫu Design → Themes'],opts:['Phông chữ','Cỡ chữ','Màu chữ','Mẫu định dạng'],ok:[0,1,2,3]},
      {id:'h2',type:'single',q:'Áp dụng theme chỉ cho trang 3 và 4, em:',opts:['Nháy chuột vào theme','Chọn trang 3, 4 → nháy phải vào theme → Apply to Selected Slides','Xoá các trang khác','Không làm được'],ok:1}],
  key:['Phông <b>dễ đọc</b>, cỡ <b>đủ lớn</b>, <b>ít màu</b>; dùng <b>Themes</b> cho đồng bộ.']},
 {t:'Chèn và định dạng hình ảnh',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Ảnh cây xanh vừa chèn <b>che mất</b> dòng chữ “TRƯỜNG HỌC XANH”. Dùng các nút trong mô phỏng để đưa ảnh xuống dưới và đổi kích thước.</p>',
  qs:[{id:'s2',type:'sim',sim:'ddHinh'},
      {id:'p1',type:'single',q:'Để ảnh nằm dưới dòng chữ, em chọn ảnh rồi dùng:',opts:['Bring to Front','Send to Back','Crop','Delete'],ok:1},
      {id:'p2',type:'single',q:'Thay đổi kích thước ảnh mà vẫn giữ tỉ lệ, em kéo:',opts:['Nút tròn ở giữa cạnh','Nút ở góc ảnh','Nút xoay','Viền ảnh'],ok:1},
      {id:'p3',type:'tf',q:'Đúng hay sai?',items:[{t:'Hình ảnh minh hoạ giúp bài trình chiếu sinh động, dễ hiểu',a:'T'},{t:'Có thể dùng mọi ảnh trên mạng mà không cần ghi nguồn',a:'F'}]}],
  key:['Chèn ảnh: <b>Insert → Pictures</b>; <b>Send to Back / Bring to Front</b> đổi lớp; kéo <b>góc</b> giữ tỉ lệ.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút!</p>',
  qs:[{id:'l1',type:'sort',q:'Nên hay không nên?',cols:{c0:'Nên',c1:'Không nên'},items:[{t:'Chữ trắng trên nền xanh đậm',a:'c0'},{t:'Mỗi dòng một màu khác nhau',a:'c1'},{t:'Ảnh minh hoạ đúng nội dung',a:'c0'},{t:'Ảnh che chữ',a:'c1'},{t:'Phông chữ uốn lượn khó đọc',a:'c1'}]},
      {id:'l2',type:'single',q:'Sao chép nội dung từ tệp văn bản sang trang chiếu, bước đúng là:',opts:['Ctrl+X ở trang chiếu','Chọn văn bản → Ctrl+C → đặt con trỏ ở trang chiếu → Ctrl+V','Gõ lại toàn bộ','Kéo tệp vào thùng rác'],ok:1}],
  key:['Đẹp = <b>dễ đọc + đúng nội dung</b>.']},
 {t:'Sửa trang chiếu của Khoa',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Trang của Khoa: 12 dòng chữ cỡ 14, 5 màu, ảnh che tiêu đề.</p>',
  qs:[{id:'v1',type:'text',q:'Đưa ra 3 góp ý cụ thể để sửa trang chiếu của Khoa.',ans:'Rút gọn còn 5–6 ý; tăng cỡ chữ ≥ 20; dùng 1–2 màu tương phản nền; đưa ảnh xuống dưới (Send to Back) hoặc thu nhỏ, đặt cạnh chữ.'}],
  key:['Góp ý <b>cụ thể, lịch sự</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 3 phút',code:'',phut:3,
  story:'<p>Định dạng phục vụ người xem.</p>',
  qs:[{id:'tk',type:'single',q:'Câu nào đúng?',opts:['Càng nhiều màu càng đẹp','Chữ tương phản với nền, cỡ đủ lớn, ảnh không che chữ','Không nên chèn ảnh','Kéo cạnh ảnh để giữ tỉ lệ'],ok:1}],
  key:['<b>Chữ – màu – ảnh – lớp</b> hợp lí.']}
];
const GHIBAI={so:'Bài 12:',ten:'ĐỊNH DẠNG ĐỐI TƯỢNG TRÊN TRANG CHIẾU',muc:[
 {step:2,h:'Văn bản',it:['Phông <b>dễ đọc</b>, cỡ <b>≥ 20pt</b>, màu <b>tương phản</b>, ít dòng.','<b>Design → Themes</b>: mẫu định dạng.']},
 {step:3,h:'Hình ảnh',it:['<b>Insert → Pictures</b>; kéo <b>góc</b> giữ tỉ lệ.','<b>Send to Back / Bring to Front</b>: đổi lớp.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.ddChu=function(){
  const e=_el(_shell('Trang chiếu dễ đọc','Chỉnh <b>cỡ chữ</b>, <b>màu chữ – nền</b> và <b>số dòng</b>. Cố đạt điểm 3/3.',
   `<div class="sim-ctl"><div><b>Cỡ chữ</b> ${_seg('sz',[['12','12'],['16','16'],['24','24'],['32','32']],'12')}</div>
   <div><b>Màu</b> ${_seg('cl',[['yw','Vàng / trắng'],['rp','Đỏ / tím'],['bw','Đen / trắng'],['wb','Trắng / xanh đậm']],'yw')}</div>
   <div><b>Số dòng</b> ${_seg('n',[['4','4'],['7','7'],['12','12']],'12')}</div></div>
   <div class="sl" style="aspect-ratio:16/9;max-width:520px;margin:10px auto;border-radius:8px;box-shadow:0 4px 16px #0002;padding:3%;overflow:hidden;font-family:Calibri,system-ui"></div>
   <p class="kq" style="text-align:center;font-weight:700"></p>`));
  let sz='12',cl='yw',n='12'; const C={yw:['#facc15','#fff',0],rp:['#dc2626','#7e22ce',0],bw:['#111','#fff',1],wb:['#fff','#1e3a8a',1]};
  const T=['Cây xanh cho bóng mát','Giảm bụi, tiếng ồn','Điều hoà không khí','Tạo cảnh quan đẹp','Nơi sống của chim','Giúp học sinh thư giãn','Gắn kết tập thể','Học về thực vật','Tiết kiệm điện','Làm mát lớp học','Thu hút khách','Giáo dục môi trường'];
  const go=()=>{const s=e.querySelector('.sl'),c=C[cl]; s.style.background=c[1]; s.style.color=c[0];
    s.innerHTML=`<div style="font-weight:700;font-size:${(+sz)*0.9+6}px">Vai trò cây xanh</div>`+T.slice(0,+n).map(t=>`<div style="font-size:${(+sz)*0.6}px">• ${t}</div>`).join('');
    const p=(+sz>=24)+c[2]+(+n<=7); e.querySelector('.kq').textContent='Điểm dễ đọc: '+p+'/3 '+'⭐'.repeat(p)+(p===3?' – Tuyệt!':''); return p;};
  _wireSeg(e,(k,v)=>{if(k==='sz')sz=v; else if(k==='cl')cl=v; else n=v; if(go()===3) FX.play('win');}); go(); return e;
};
SIMS_BAI.ddHinh=function(){
  const e=_el(_shell('Ảnh che chữ','Bấm các nút: đổi <b>lớp</b> của ảnh, <b>kéo góc</b> (giữ tỉ lệ) hoặc <b>kéo cạnh</b> (méo ảnh).',
   `<div class="sim-ctl"><button type="button" class="btn" data-o="back">⬇ Send to Back</button><button type="button" class="btn" data-o="front">⬆ Bring to Front</button>
   <button type="button" class="btn" data-o="corner">↘ Kéo góc (thu nhỏ)</button><button type="button" class="btn" data-o="side">↔ Kéo cạnh</button><button type="button" class="btn" data-o="reset">↺</button></div>
   <div class="sl" style="position:relative;aspect-ratio:16/9;max-width:520px;margin:10px auto;background:#f0fdf4;border-radius:8px;box-shadow:0 4px 16px #0002;overflow:hidden">
   <div class="tx" style="position:absolute;top:38%;left:0;right:0;text-align:center;font:900 30px system-ui;color:#166534;z-index:2">TRƯỜNG HỌC XANH</div>
   <div class="im" style="position:absolute;left:20%;top:12%;width:60%;height:76%;z-index:3;background:linear-gradient(#86efac,#15803d);border-radius:10px;display:grid;place-items:center;font-size:70px;transition:.3s;outline:2px dashed #2563eb">🌳</div></div>
   <p class="kq" style="text-align:center;font-weight:700">Ảnh đang che chữ!</p>`));
  const im=e.querySelector('.im'),kq=e.querySelector('.kq'); let w=60,h=76,z=3;
  const go=()=>{im.style.width=w+'%'; im.style.height=h+'%'; im.style.zIndex=z; im.style.opacity=z<2?.55:1; const ratio=Math.abs(w/h-60/76)<.05;
    kq.textContent=(z<2?'✓ Chữ đã hiện trên ảnh. ':'Ảnh đang che chữ! ')+(ratio?'Ảnh giữ đúng tỉ lệ.':'⚠ Ảnh bị méo (sai tỉ lệ).');};
  e.querySelectorAll('.sim-ctl button').forEach(b=>b.onclick=()=>{const o=b.dataset.o;
    if(o==='back')z=1; if(o==='front')z=3; if(o==='corner'&&w>24){w*=.8;h*=.8;} if(o==='side'&&w<95)w+=12; if(o==='reset'){w=60;h=76;z=3;}
    go(); FX.play(o==='back'?'ding':'whoosh');});
  go(); return e;
};

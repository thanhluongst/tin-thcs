/* Tin học 8 · Bài 8a. Danh sách liệt kê và hình ảnh trong văn bản · 1 tiết.
   Tình huống: Phiếu khảo sát và tờ rơi tuyển thành viên CLB Tin học.
   Mô phỏng: "danhsach" (Bullets/Numbering), "toroi" (chèn ảnh, Wrap Text, hình đồ hoạ). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Phiếu khảo sát của An',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>An soạn <b>Phiếu khảo sát</b> cho CLB Tin học, gõ tay số 1., 2., 3. ở đầu dòng. Khi chèn thêm một mục ở giữa, An phải sửa lại tất cả các số. Có cách nào nhanh hơn?</p>',
  qs:[{id:'kd',type:'single',q:'Phần mềm soạn thảo có công cụ nào giúp tự đánh số, tự đánh lại số khi thêm mục?',opts:['Danh sách liệt kê (Numbering)','Chèn bảng','Đổi phông chữ','Căn giữa'],ok:0}],
  key:['Phần mềm soạn thảo có <b>danh sách liệt kê</b> tự động.']},
 {t:'Danh sách liệt kê',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Bấm <b>Bullets</b> (dấu đầu dòng) hoặc <b>Numbering</b> (số thứ tự), chọn kiểu kí hiệu. Thử <b>➕ Chèn mục</b> vào giữa danh sách.</p>',
  qs:[{id:'s1',type:'sim',sim:'danhsach'},
      {id:'ds1',type:'match',q:'Ghép loại danh sách với tình huống phù hợp.',items:['Các bước nấu cơm theo thứ tự','Các đồ dùng cần mang đi dã ngoại (không cần thứ tự)'],opts:['Danh sách dấu đầu dòng (Bullets)','Danh sách số thứ tự (Numbering)'],ok:[1,0]},
      {id:'ds2',type:'single',q:'Quan sát: chèn thêm một mục vào giữa danh sách số thứ tự thì…',opts:['Phải gõ lại toàn bộ số','Các số tự động đánh lại','Danh sách bị xoá','Số bị trùng'],ok:1},
      {id:'ds3',type:'single',q:'Lệnh tạo danh sách nằm ở đâu?',opts:['Home → nhóm Paragraph','Insert → Pictures','Layout → Margins','View → Zoom'],ok:0}],
  key:['<b>Bullets</b>: liệt kê không cần thứ tự; <b>Numbering</b>: có thứ tự. Lệnh ở <b>Home → Paragraph</b>.']},
 {t:'Tờ rơi có hình ảnh',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>CLB cần <b>tờ rơi tuyển thành viên</b> bắt mắt. Thử chèn ảnh, chọn kiểu <b>Wrap Text</b> và vẽ thêm hình mũi tên.</p>',
  qs:[{id:'s2',type:'sim',sim:'toroi'},
      {id:'tr1',type:'match',q:'Ghép kiểu Wrap Text với hiệu ứng.',items:['In Line with Text','Square','Behind Text','In Front of Text'],opts:['Ảnh nằm sau chữ (làm ảnh nền)','Ảnh như một kí tự trên dòng','Ảnh đè lên chữ','Chữ bao quanh ảnh theo hình chữ nhật'],ok:[1,3,0,2]},
      {id:'tr2',type:'single',q:'Ảnh nền che mất chữ, để ảnh nằm dưới chữ em chọn:',opts:['In Line with Text','Square','Behind Text','In Front of Text'],ok:2},
      {id:'tr3',type:'single',q:'Vẽ mũi tên cong rồi tô vàng, em dùng:',opts:['Insert → Shapes, rồi Shape Fill','Insert → Table','Home → Bullets','Insert → Pictures'],ok:0}],
  key:['Chèn ảnh: <b>Insert → Pictures</b>; vẽ hình: <b>Insert → Shapes</b>, tô màu <b>Shape Fill</b>.','<b>Wrap Text</b> chỉnh vị trí ảnh so với chữ.']},
 {t:'Luyện tập',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  qs:[{id:'lt1',type:'single',q:'Phương án nào <b>SAI</b>?',opts:['Có thể chèn ảnh từ tệp trong máy','Có thể thay đổi kích thước ảnh','Danh sách liệt kê chỉ có một kiểu kí hiệu duy nhất','Có thể vẽ hình đồ hoạ trong văn bản'],ok:2},
      {id:'lt2',type:'single',q:'Nhập kí hiệu ô vuông ☐ ở cuối dòng phiếu khảo sát, em dùng:',opts:['Insert → Symbol','Home → Bold','Insert → Chart','Layout → Columns'],ok:0}],
  key:['<b>Insert → Symbol</b> để chèn kí hiệu đặc biệt.']},
 {t:'Tờ rơi CLB của em',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  qs:[{id:'vd',type:'text',q:'Mô tả tờ rơi quảng cáo một CLB của trường em: có danh sách gì, hình ảnh gì, ảnh đặt kiểu Wrap Text nào?',ans:'VD: Danh sách hoạt động (Bullets), ảnh nền Behind Text, logo CLB kiểu Square.'}],
  key:['Kết hợp <b>danh sách, hình ảnh, hình đồ hoạ</b> để văn bản <b>hấp dẫn</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'tf',q:'Đúng hay sai?',items:[{t:'Danh sách số thứ tự tự đánh lại số khi thêm mục',a:'T'},{t:'Không thể đặt ảnh làm nền văn bản',a:'F'}]}],
  key:['<b>Danh sách</b> giúp rõ ràng; <b>hình ảnh</b> giúp sinh động.']}
];
const GHIBAI={so:'Bài 8a:',ten:'DANH SÁCH LIỆT KÊ VÀ HÌNH ẢNH TRONG VĂN BẢN',muc:[
 {step:2,h:'Danh sách liệt kê',it:['<b>Bullets</b> (dấu đầu dòng), <b>Numbering</b> (số thứ tự): Home → Paragraph.']},
 {step:3,h:'Hình ảnh, hình đồ hoạ',it:['<b>Insert → Pictures / Shapes</b>; <b>Wrap Text</b> chỉnh vị trí ảnh với chữ.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.danhsach=function(){
  const items=['Ngôn ngữ lập trình','Mạng máy tính','Đồ hoạ máy tính','Trí tuệ nhân tạo'];
  const STY={b1:'●',b2:'➤',b3:'✔',b4:'◆',n1:'1.',n2:'a)',n3:'I.',n4:'A.'};
  const e=_el(_shell('Phiếu khảo sát','Chọn kiểu <b>danh sách</b>, rồi bấm <b>➕ Chèn mục</b>/<b>➖ Xoá mục</b> để xem số tự đánh lại.',
   `<div class="m8ds"><style>.m8ds .rb{display:flex;gap:6px;flex-wrap:wrap;background:#f1f5f9;border-radius:10px;padding:8px}.m8ds .rb button{min-width:46px;height:42px;border:2px solid #cbd5e1;background:#fff;border-radius:8px;font:700 16px system-ui;cursor:pointer}.m8ds .rb .on{border-color:#2563eb;background:#dbeafe}.m8ds .pg{background:#fff;box-shadow:0 2px 10px #0002;margin:12px auto;max-width:520px;padding:24px 30px;min-height:200px;font:17px 'Times New Roman',serif}.m8ds .li{display:flex;gap:10px;padding:3px 0;animation:m8dsi .35s}.m8ds .mk{min-width:28px;text-align:right;color:#1d4ed8;font-weight:700}@keyframes m8dsi{from{background:#fef08a}}</style>
    <div class="rb"><span style="align-self:center">Bullets:</span>${['b1','b2','b3','b4'].map(k=>`<button data-k="${k}">${STY[k]}</button>`).join('')}<span style="align-self:center">Numbering:</span>${['n1','n2','n3','n4'].map(k=>`<button data-k="${k}">${STY[k]}</button>`).join('')}<button data-k="">✕ Bỏ</button></div>
    <div class="sim-ctl"><button class="btn acc add">➕ Chèn mục vào giữa</button><button class="btn ghost del">➖ Xoá mục</button></div>
    <div class="pg"><b>PHIẾU KHẢO SÁT</b><br>Em muốn tìm hiểu nội dung nào?<div class="ls"></div></div></div>`));
  let k='', extra=['Robot giáo dục','Thiết kế web','An toàn thông tin'];
  const roman=n=>['I','II','III','IV','V','VI','VII','VIII'][n-1];
  const mk=i=>!k?'':k[0]==='b'?STY[k]:k==='n1'?(i+1)+'.':k==='n2'?String.fromCharCode(97+i)+')':k==='n3'?roman(i+1)+'.':String.fromCharCode(65+i)+'.';
  function draw(){e.querySelector('.ls').innerHTML=items.map((t,i)=>`<div class="li"><span class="mk">${mk(i)}</span><span>${t} ☐</span></div>`).join(''); e.querySelectorAll('.rb button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));}
  e.querySelectorAll('.rb button').forEach(b=>b.onclick=()=>{k=b.dataset.k; FX.play('tick'); draw();});
  e.querySelector('.add').onclick=()=>{if(!extra.length) return; items.splice(2,0,extra.shift()); FX.play('sparkle'); draw();};
  e.querySelector('.del').onclick=()=>{if(items.length>2){extra.push(items.splice(1,1)[0]); FX.play('whoosh'); draw();}};
  draw(); return e;
};
SIMS_BAI.toroi=function(){
  const e=_el(_shell('Tờ rơi tuyển thành viên','Bấm <b>🖼️ Chèn ảnh</b>, chọn kiểu <b>Wrap Text</b>, thêm <b>➰ Mũi tên</b> và tô màu.',
   `<div class="m8tr"><style>.m8tr .pg{position:relative;background:#fff;box-shadow:0 2px 10px #0002;margin:12px auto;max-width:520px;padding:22px;min-height:260px;font:15px/1.5 Georgia,serif;overflow:hidden}.m8tr .img{font-size:70px;line-height:1;background:linear-gradient(135deg,#a5f3fc,#c4b5fd);border-radius:10px;text-align:center;transition:.3s}.m8tr .img.sq{float:left;width:120px;margin:0 12px 6px 0}.m8tr .img.il{display:inline-block;width:80px;font-size:40px;vertical-align:middle}.m8tr .img.bh{position:absolute;inset:0;font-size:220px;opacity:.35;z-index:0;border-radius:0}.m8tr .img.fr{position:absolute;left:60px;top:70px;width:220px;height:140px;z-index:3;font-size:110px}.m8tr .tx{position:relative;z-index:1}.m8tr .arw{position:absolute;right:20px;bottom:16px;font-size:58px;z-index:2;transition:.3s}</style>
    <div class="sim-ctl"><button class="btn acc ins">🖼️ Chèn ảnh</button><div>Wrap Text ${_seg('w',[['il','In Line'],['sq','Square'],['bh','Behind Text'],['fr','In Front']],'il')}</div><button class="btn ghost shp">➰ Mũi tên</button>${_seg('c',[['#000','⬛'],['#facc15','🟨'],['#ef4444','🟥'],['#22c55e','🟩']],'#000')}</div>
    <div class="pg"><div class="tx"><h3 style="margin:0 0 6px;color:#1d4ed8">CLB TIN HỌC TUYỂN THÀNH VIÊN!</h3>Em yêu thích lập trình, đồ hoạ, robot? Hãy tham gia câu lạc bộ để học hỏi, sáng tạo và kết bạn. Sinh hoạt chiều thứ Năm hằng tuần tại phòng máy. Đăng kí với cô chủ nhiệm trước ngày 30. Chúng tớ chờ cậu!</div></div></div>`));
  const pg=e.querySelector('.pg'), tx=e.querySelector('.tx'); let img=null, w='il', arw=null;
  const place=()=>{if(!img) return; img.className='img '+w; if(w==='il') tx.insertBefore(img,tx.childNodes[1]); else if(w==='sq') tx.insertBefore(img,tx.childNodes[1]); else pg.insertBefore(img,tx);};
  e.querySelector('.ins').onclick=()=>{if(!img){img=document.createElement('div'); img.textContent='💻'; place(); FX.play('sparkle');}};
  e.querySelector('.shp').onclick=()=>{if(!arw){arw=document.createElement('div'); arw.className='arw'; arw.textContent='⤵'; pg.appendChild(arw); FX.play('sparkle');}};
  _wireSeg(e,(n,v)=>{if(n==='w'){w=v; place();} else if(arw){arw.style.color=v; arw.style.textShadow=v==='#000'?'':'0 0 2px #000';}});
  return e;
};

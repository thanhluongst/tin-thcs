/* Tin học 6 · Bài 14. Thực hành tổng hợp: Hoàn thiện sổ lưu niệm · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: nhóm Mai hoàn thiện một trang "Sổ lưu niệm lớp 6A" trước buổi trưng bày.
   Mô phỏng: t6_soiloi (Soi lỗi trang sổ), t6_quytrinh (Các bước làm sổ), t6_dungtrang (Dựng trang sổ lưu niệm). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Soi lỗi trang sổ',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p>Bạn Khoa nộp bản nháp một trang sổ lưu niệm, nhưng còn nhiều lỗi trình bày. Bấm vào những chỗ em thấy <b>chưa ổn</b>. Có <b>5 lỗi</b>!</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_soiloi'},
      {id:'k1',type:'multi',q:'Lỗi nào cần dùng công cụ <b>Tìm kiếm và thay thế</b>?',opts:['Gõ sai “6a” thay vì “6A” ở nhiều chỗ','Tiêu đề chưa căn giữa','Ảnh quá to','Bảng thiếu đường kẻ'],ok:[0]}],
  key:['Kiểm tra sản phẩm: <b>chính tả</b>, <b>định dạng</b>, <b>bảng</b>, <b>hình ảnh</b>.']},

 {t:'Các bước làm sổ lưu niệm',hd:'Hình thành kiến thức · Hoạt động 1 · 8 phút',code:'2.1',ic:'',phut:8,
  story:'<p>Làm một sản phẩm số cần đi theo các bước. Bấm các thẻ theo <b>đúng thứ tự</b>.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_quytrinh'},
      {id:'h1',type:'single',q:'Bước đầu tiên khi làm sổ lưu niệm là…',opts:['In ra giấy','Lên ý tưởng bằng sơ đồ tư duy, phân công','Định dạng chữ','Chèn ảnh'],ok:1}],
  key:['<b>Lên ý tưởng</b> (sơ đồ tư duy) → <b>soạn</b> → <b>định dạng, chèn bảng, ảnh</b> → <b>kiểm tra</b> → <b>lưu, chia sẻ</b>.']},

 {t:'Dựng trang sổ lưu niệm',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',ic:'',phut:12,
  story:'<p>Dùng kiến thức các bài 10–13: chọn cách trình bày cho tiêu đề, đoạn văn, bảng, ảnh. Đạt đủ <b>5 sao</b> theo tiêu chí của cô.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_dungtrang'},
      {id:'h2',type:'match',q:'Ghép yêu cầu với kiến thức đã học.',items:['Tiêu đề to, đậm, căn giữa','Danh sách thành viên và sở thích','Sửa “Ha Long” thành “Hạ Long” khắp trang','Ý tưởng các mục của sổ'],opts:['Bài 13. Tìm kiếm và thay thế','Bài 10. Sơ đồ tư duy','Bài 11. Định dạng văn bản','Bài 12. Trình bày dạng bảng'],ok:[2,3,0,1]}],
  key:['Phối hợp <b>định dạng</b>, <b>bảng</b>, <b>tìm – thay thế</b>, <b>sơ đồ tư duy</b> để hoàn thiện sản phẩm.']},

 {t:'Đánh giá chéo',hd:'Luyện tập · 8 phút',code:'3',ic:'',phut:8,
  story:'<p>Các nhóm trao đổi sản phẩm, chấm theo tiêu chí.</p>',
  qs:[{id:'l1',type:'sort',q:'Tiêu chí nào nên có khi chấm trang sổ lưu niệm?',cols:{c0:'Nên có',c1:'Không cần'},items:[{t:'Đúng chính tả',a:'c0'},{t:'Trình bày rõ ràng, cân đối',a:'c0'},{t:'Dùng thật nhiều phông chữ khác nhau',a:'c1'},{t:'Có bảng, hình ảnh phù hợp',a:'c0'},{t:'Càng nhiều màu càng tốt',a:'c1'}]},
      {id:'l2',type:'text',q:'Nhận xét một điểm tốt và một điểm cần sửa trong sản phẩm của nhóm bạn.',ans:'VD: Điểm tốt: tiêu đề nổi bật, bảng rõ. Cần sửa: ảnh chưa căn giữa, còn lỗi chính tả.'}],
  key:['Đánh giá theo <b>tiêu chí</b>, góp ý <b>cụ thể</b>, lịch sự.']},

 {t:'Lưu và chia sẻ',hd:'Vận dụng · 5 phút',code:'4',ic:'',phut:5,
  qs:[{id:'v1',type:'single',q:'Muốn gửi sổ lưu niệm cho cô giáo xem trên điện thoại, em nên…',opts:['Lưu tệp, gửi qua thư điện tử','Chụp ảnh màn hình mờ','Xoá tệp','Đọc to cho cô nghe'],ok:0},
      {id:'v2',type:'single',q:'Tên tệp nào đặt hợp lí nhất?',opts:['abc.docx','So-luu-niem-6A-nhom2.docx','Untitled.docx','1.docx'],ok:1}],
  key:['Đặt <b>tên tệp</b> rõ nghĩa; <b>lưu</b> thường xuyên.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'text',short:1,q:'Điều em tự hào nhất về sổ lưu niệm của nhóm?',ans:'Tự đánh giá.'}],
  key:['Hoàn thiện sản phẩm số bằng <b>soạn thảo văn bản</b> + <b>sơ đồ tư duy</b>.']}
];

const GHIBAI={so:'Bài 14:',ten:'HOÀN THIỆN SỔ LƯU NIỆM',muc:[
 {step:2,h:'Quy trình',it:[],flow:['Ý tưởng (sơ đồ tư duy)','Soạn nội dung','Định dạng, bảng, ảnh','Kiểm tra (tìm – thay thế)','Lưu, chia sẻ']},
 {step:3,h:'Tiêu chí',it:['<b>Đúng chính tả</b>, trình bày <b>rõ, cân đối</b>, có <b>bảng, ảnh</b> phù hợp.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 .pg{max-width:460px;margin:10px auto;background:#fff;color:#111;padding:18px 22px;border-radius:6px;box-shadow:0 2px 10px #0003;font-family:"Times New Roman",serif}.t6 .pg table{border-collapse:collapse;margin:8px auto}.t6 .pg td{padding:3px 10px}.t6 .er{cursor:pointer;border-radius:4px}.t6 .er.fd{outline:3px solid #dc2626;background:#fee2e2}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_soiloi=function(){
  const e=t6('Soi lỗi trang sổ','Bấm vào chỗ có lỗi trình bày. Chỗ đúng thì không tính.',
   `<div class="pg"><div class="er" data-x="1" data-m="Tiêu đề chưa căn giữa, chưa đậm, chữ nhỏ" style="font-size:15px">Kỉ niệm lớp 6a</div>
    <p><span class="ok1">Lớp chúng em có 42 bạn, mỗi bạn một vẻ.</span> <span class="er" data-x="1" data-m="Gõ sai “6a” – dùng Thay thế (Replace) sửa thành “6A”">Lớp 6a rất đoàn kết.</span> <span class="er" data-x="1" data-m="Lỗi chính tả “Ha Long” → “Hạ Long”">Chuyến đi Ha Long thật vui.</span></p>
    <div class="er" data-x="1" data-m="Danh sách nên trình bày dạng bảng cho dễ đọc">Thành viên: An – bóng đá, Bình – vẽ, Chi – hát, Dũng – cờ vua.</div>
    <div class="er" data-x="1" data-m="Ảnh lệch sang phải, nên căn giữa" style="text-align:right;font-size:60px">📸</div>
    <div class="er" data-x="0" data-m="Phần này ổn" style="text-align:right;font-style:italic">Nhóm 2 – lớp 6A</div></div>
    <div class="kq">Tìm 5 lỗi</div><p style="text-align:center">Tìm được: <span class="sc">0/5</span></p>`);
  let n=0;
  e.querySelectorAll('.er').forEach(x=>x.onclick=()=>{if(x.dataset.d) return; if(x.dataset.x==='1'){x.dataset.d=1; x.classList.add('fd'); n++; e.querySelector('.sc').textContent=n+'/5';
      t6kq(e,true,'✓ '+x.dataset.m+(n===5?' · 🎉 Tìm đủ 5 lỗi!':'')); if(n===5) FX.play('win');} else t6kq(e,false,'Chỗ này không có lỗi: '+x.dataset.m);});
  return e;
};
SIMS_BAI.t6_quytrinh=function(){
  const S=['💡 Lên ý tưởng bằng sơ đồ tư duy','✍️ Soạn nội dung văn bản','🎨 Định dạng chữ, đoạn, trang','▦ Chèn bảng, hình ảnh','🔎 Kiểm tra, tìm – thay thế lỗi','💾 Lưu, chia sẻ sản phẩm'];
  const e=t6('Các bước làm sổ','Bấm các thẻ theo đúng thứ tự từ bước 1 đến bước 6.',
   `<div class="g src"></div><ol class="dst" style="max-width:420px;margin:8px auto;font-weight:700;font-size:16px;line-height:1.9"></ol><div class="sim-ctl" style="justify-content:center"><button type="button" class="btn ghost lai">↺ Làm lại</button></div><div class="kq">Chọn bước 1</div>`);
  let k=0;
  const init=()=>{k=0; e.querySelector('.dst').innerHTML=''; const ord=S.map((s,i)=>i).sort((a,b)=>((a*7+3)%6)-((b*7+3)%6));
    e.querySelector('.src').innerHTML=ord.map(i=>`<button type="button" class="c" data-i="${i}" style="max-width:220px">${S[i]}</button>`).join('');
    e.querySelectorAll('.src .c').forEach(b=>b.onclick=()=>{const i=+b.dataset.i; if(i===k){b.remove(); e.querySelector('.dst').insertAdjacentHTML('beforeend',`<li>${S[i]}</li>`); k++;
        t6kq(e,true,k===6?'🎉 Đúng quy trình làm sản phẩm!':`✓ Đúng! Chọn bước ${k+1}`); if(k===6) FX.play('win');}
      else {b.classList.add('no'); setTimeout(()=>b.classList.remove('no'),500); t6kq(e,false,`Chưa đúng, bước ${k+1} là gì?`);}});};
  e.querySelector('.lai').onclick=()=>{init(); t6kq(e,null,'Chọn bước 1');}; init();
  return e;
};
SIMS_BAI.t6_dungtrang=function(){
  const e=t6('Dựng trang sổ lưu niệm','Chọn cách trình bày cho từng phần. Mỗi lựa chọn hợp lí được 1 ⭐.',
   `<div class="sim-ctl"><div><b>Tiêu đề</b> ${_seg('td',[['0','Chữ thường'],['1','To, đậm, căn giữa'],['2','7 màu nhấp nháy']],'0')}</div>
     <div><b>Đoạn văn</b> ${_seg('dv',[['0','Sát lề, dòng dày'],['1','Căn đều, giãn dòng 1,5']],'0')}</div>
     <div><b>Thành viên</b> ${_seg('tv',[['0','Viết liền 1 dòng'],['1','Bảng 2 cột']],'0')}</div>
     <div><b>Ảnh</b> ${_seg('an',[['0','Lệch phải'],['1','Căn giữa, vừa trang']],'0')}</div>
     <div><b>Chính tả</b> ${_seg('ct',[['0','Còn “Ha Long”'],['1','Đã Replace All → “Hạ Long”']],'0')}</div></div>
    <div class="pg pv"></div><div class="kq"></div>`);
  const S={td:'0',dv:'0',tv:'0',an:'0',ct:'0'};
  const draw=()=>{const hl=S.ct==='1'?'Hạ Long':'Ha Long';
    e.querySelector('.pv').innerHTML=`<div style="${S.td==='1'?'text-align:center;font-size:26px;font-weight:700;color:#1d4ed8':S.td==='2'?'font-size:22px;background:linear-gradient(90deg,red,orange,green,blue,violet);-webkit-background-clip:text;color:transparent;font-weight:700':'font-size:15px'}">Kỉ niệm lớp 6A</div>
      <p style="${S.dv==='1'?'text-align:justify;line-height:1.5':'line-height:1.05'}">Năm học này, lớp 6A có chuyến tham quan ${hl} thật đáng nhớ. Ai cũng thích hang Sửng Sốt và đảo Ti Tốp của ${hl}.</p>
      ${S.tv==='1'?'<table border="1"><tr><td><b>Bạn</b></td><td><b>Sở thích</b></td></tr><tr><td>An</td><td>Bóng đá</td></tr><tr><td>Chi</td><td>Ca hát</td></tr></table>':'<p>Thành viên: An – bóng đá, Chi – ca hát.</p>'}
      <div style="text-align:${S.an==='1'?'center':'right'};font-size:${S.an==='1'?54:90}px">🏝️</div>`;
    const st=(S.td==='1')+(S.dv==='1')+(S.tv==='1')+(S.an==='1')+(S.ct==='1');
    t6kq(e,st===5?true:null,'⭐'.repeat(st)+'☆'.repeat(5-st)+(st===5?' Tuyệt vời! Trang sổ hoàn chỉnh.':S.td==='2'?' (tiêu đề nhiều màu quá rối mắt)':'')); if(st===5) FX.play('win');};
  _wireSeg(e,(n,v)=>{S[n]=v; draw();}); draw();
  return e;
};

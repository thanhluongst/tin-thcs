/* Tin học 7 · Bài 10. Hoàn thiện bảng tính · 2 tiết. Soạn lại cho lớp học LAN.
   Tình huống: in bảng báo cáo dự án Trường học xanh.
   Mô phỏng: "htIn" (xem trước khi in: đường lưới không in, cần kẻ viền; chọn vùng in), "htTrang" (thao tác với trang tính: thêm, đổi tên, xoá, sao chép). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'In ra sao mất đường kẻ?',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p><b>An</b> in bảng số liệu nhưng tờ giấy chỉ có chữ và số, <b>không có đường kẻ</b>! Trên màn hình rõ ràng có đường lưới mà? Thử <b>Xem trước khi in</b> trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'htIn'},
      {id:'q1',type:'single',q:'Quan sát: Vì sao bản in không có đường kẻ?',opts:['Máy in hết mực','Đường lưới trên màn hình không được in, phải kẻ đường viền (Borders)','Do phông chữ','Do chưa lưu tệp'],ok:1},
      {id:'q2',type:'single',q:'Muốn in chỉ khối A3:D6 đang chọn, mục Settings chọn:',opts:['Print Active Sheets','Print Entire Workbook','Print Selection','Print One Sided'],ok:2}],
  key:['<b>Đường lưới</b> không được in → dùng <b>Borders</b> kẻ viền.','<b>Print Selection</b>: in vùng đang chọn.']},
 {t:'Kẻ đường viền và in',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Chọn khối ô → Format Cells → trang <b>Border</b>: Outline (viền ngoài), Inside (đường kẻ trong), None (bỏ). In: <b>File → Print</b> (Ctrl+P) → xem trước → chọn máy in, vùng in, số bản → Print.</p>',
  qs:[{id:'h1',type:'match',q:'Ghép nút Border với tác dụng.',items:['Outline','Inside','None'],opts:['Kẻ viền bao quanh khối','Kẻ các đường bên trong khối','Xoá mọi đường viền'],ok:[0,1,2]},
      {id:'h2',type:'single',q:'Muốn bảng in có đủ khung và đường kẻ giữa các ô, em chọn:',opts:['Chỉ Outline','Chỉ Inside','Cả Outline và Inside','None'],ok:2}],
  key:['<b>Outline + Inside</b> → bảng đủ khung khi in.']},
 {t:'Làm việc với trang tính',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Tệp dự án có nhiều trang tính: Số cây, Chi phí, Hoàn thiện… Thử <b>thêm, đổi tên, sao chép, xoá</b> trang tính trong mô phỏng.</p>',
  qs:[{id:'s2',type:'sim',sim:'htTrang'},
      {id:'t1',type:'match',q:'Ghép việc với thao tác.',items:['Thêm trang tính mới','Đổi tên trang tính','Xoá trang tính','Sao chép trang tính'],opts:['Nháy nút ⊕ cạnh tên trang','Nháy đúp tên trang rồi gõ tên mới','Nháy phải tên trang → Delete','Nháy phải → Move or Copy, đánh dấu Create a copy'],ok:[0,1,2,3]},
      {id:'t2',type:'tf',q:'Đúng hay sai?',items:[{t:'Một tệp bảng tính có thể có nhiều trang tính',a:'T'},{t:'Xoá trang tính có thể hoàn tác dễ dàng bằng Ctrl+Z',a:'F'},{t:'Nên đặt tên trang tính gợi nhớ nội dung',a:'T'}]}],
  key:['Trang tính: <b>thêm, đổi tên, xoá, sao chép, di chuyển</b>; đặt tên <b>gợi nhớ</b>.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút!</p>',
  qs:[{id:'l1',type:'single',q:'Phím tắt mở hộp thoại in là:',opts:['Ctrl+S','Ctrl+P','Ctrl+B','Ctrl+1'],ok:1},
      {id:'l2',type:'single',q:'In bảng rút gọn, bỏ qua một số cột mà không xoá dữ liệu, em:',opts:['Xoá các cột đó','Ẩn các cột (Hide) rồi in','Đổi màu chữ thành trắng','Gộp các cột'],ok:1}],
  key:['<b>Ẩn cột</b> (Hide) để in gọn mà không mất dữ liệu.']},
 {t:'Hoàn thiện báo cáo nhóm',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Nhóm chuẩn bị in báo cáo Trường học xanh.</p>',
  qs:[{id:'v1',type:'text',q:'Liệt kê các bước em làm để bảng in ra đẹp, đủ khung, chỉ in phần cần thiết.',ans:'Định dạng dữ liệu, trình bày tiêu đề; chọn bảng → Borders (Outline + Inside); đặt tên trang; File → Print, xem trước, Print Selection, chọn số bản → Print.'}],
  key:['Kiểm tra <b>xem trước</b> trước khi in.']},
 {t:'Tổng kết',hd:'Tổng kết · 4 phút',code:'',phut:4,
  story:'<p>Bảng tính hoàn thiện: đẹp trên màn hình và trên giấy.</p>',
  qs:[{id:'tk',type:'single',q:'Câu nào đúng?',opts:['Đường lưới luôn được in','Phải kẻ đường viền để bảng in có khung','Không xem trước được khi in','Mỗi tệp chỉ có 1 trang tính'],ok:1}],
  key:['<b>Viền – trang tính – in</b>.']}
];
const GHIBAI={so:'Bài 10:',ten:'HOÀN THIỆN BẢNG TÍNH',muc:[
 {step:2,h:'Kẻ viền và in',it:['Đường lưới <b>không in</b>; dùng <b>Borders</b> (Outline + Inside).','In: <b>Ctrl+P</b>, xem trước, <b>Print Selection</b> để in vùng chọn.']},
 {step:3,h:'Trang tính',it:['<b>Thêm, đổi tên, xoá, sao chép</b> trang tính; đặt tên gợi nhớ.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.htIn=function(){
  const e=_el(_shell('Xem trước khi in','Bật/tắt <b>đường viền</b>, chọn <b>vùng in</b>, rồi xem trang giấy bên phải.',
   `<style>.m-t7ht{display:grid;grid-template-columns:1fr 1fr;gap:14px}.m-t7ht table{border-collapse:collapse;font-size:13px;width:100%}.m-t7ht td{padding:3px 5px}
   .m-t7ht .scr td{border:1px solid #d1d5db}.m-t7ht .scr .s{background:#dbeafe}.m-t7ht .pg{background:#fff;box-shadow:0 4px 14px #0003;padding:16px;aspect-ratio:1/1.3;border-radius:4px}
   .m-t7ht .pg.bd td{border:1.5px solid #111}.m-t7ht h5{margin:0 0 6px}@media(max-width:560px){.m-t7ht{grid-template-columns:1fr}}</style>
   <div class="sim-ctl"><div><b>Đường viền</b> ${_seg('b',[['0','Chưa kẻ'],['1','Outline + Inside']],'0')}</div><div><b>Vùng in</b> ${_seg('v',[['all','Cả trang tính'],['sel','Print Selection (A3:D6)']],'all')}</div></div>
   <div class="m-t7ht"><div><h5>🖥️ Màn hình</h5><table class="scr"></table></div><div><h5>🖨️ Bản in</h5><div class="pg"><table></table></div></div></div>`));
  const D=[['Ghi chú: số liệu tháng 3','','',''],['','','',''],['Lớp','Số cây','Sống','Tỉ lệ'],['7A','25','24','96%'],['7B','18','16','89%'],['7C','32','30','94%']];
  let b='0',v='all'; const go=()=>{e.querySelector('.scr').innerHTML=D.map((r,i)=>'<tr>'+r.map(c=>`<td class="${i>=2?'s':''}">${c}</td>`).join('')+'</tr>').join('');
    const rows=v==='sel'?D.slice(2):D; const pg=e.querySelector('.pg'); pg.className='pg'+(b==='1'?' bd':''); pg.querySelector('table').innerHTML=rows.map((r,i)=>'<tr>'+r.map(c=>`<td style="${(v==='sel'?i===0:i===2)?'font-weight:700':''}">${c}</td>`).join('')+'</tr>').join('');};
  _wireSeg(e,(n,x)=>{if(n==='b')b=x; else v=x; go(); FX.play(b==='1'&&v==='sel'?'win':'whoosh');}); go(); return e;
};
SIMS_BAI.htTrang=function(){
  const e=_el(_shell('Thanh trang tính','Chọn một trang (bấm tên), rồi bấm thao tác. <b>Nhiệm vụ</b>: tạo trang “Hoàn thiện” là bản sao của “Chi phí” và xoá “Sheet3”.',
   `<style>.m-t7tg .tabs{display:flex;gap:4px;flex-wrap:wrap;border-top:3px solid #16a34a;padding-top:6px}.m-t7tg .tab{padding:8px 14px;border-radius:0 0 10px 10px;background:#e2e8f0;cursor:pointer;font-weight:600}
   .m-t7tg .tab.on{background:#fff;border:2px solid #16a34a;border-top:none;color:#166534}.m-t7tg .ops{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}</style>
   <div class="m-t7tg"><div class="ops"><button type="button" class="btn" data-o="add">⊕ Thêm</button><button type="button" class="btn" data-o="ren">✎ Đổi tên</button><button type="button" class="btn" data-o="cp">⧉ Sao chép</button><button type="button" class="btn" data-o="del">🗑 Xoá</button></div>
   <div class="tabs"></div><p class="kq" style="font-weight:700;text-align:center"></p></div>`));
  let T=['Số cây','Chi phí','Sheet3'],cur=0,nn=4; const kq=e.querySelector('.kq');
  const go=()=>{e.querySelector('.tabs').innerHTML=T.map((t,k)=>`<span class="tab ${k===cur?'on':''}" data-k="${k}">${t}</span>`).join('');
    e.querySelectorAll('.tab').forEach(s=>s.onclick=()=>{cur=+s.dataset.k; go(); FX.play('tick');});
    const ok=T.includes('Hoàn thiện')&&!T.includes('Sheet3'); if(ok){kq.textContent='🎉 Hoàn thành nhiệm vụ!'; FX.play('win');}};
  e.querySelectorAll('.ops button').forEach(b=>b.onclick=()=>{const o=b.dataset.o;
    if(o==='add'){T.push('Sheet'+nn++); cur=T.length-1; kq.textContent='Đã thêm trang mới.';}
    if(o==='ren'){const n=prompt('Tên mới cho trang “'+T[cur]+'”:',T[cur]); if(n&&n.trim()){T[cur]=n.trim(); kq.textContent='Đã đổi tên.';}}
    if(o==='cp'){T.splice(cur+1,0,T[cur]+' (2)'); cur++; kq.textContent='Đã sao chép – đổi tên bản sao nếu cần.';}
    if(o==='del'){if(T.length<2){kq.textContent='Phải còn ít nhất 1 trang tính.';} else if(confirm('Xoá “'+T[cur]+'”? Không thể hoàn tác.')){T.splice(cur,1); cur=Math.max(0,cur-1); kq.textContent='Đã xoá.';}}
    FX.play('ding'); go();});
  go(); return e;
};

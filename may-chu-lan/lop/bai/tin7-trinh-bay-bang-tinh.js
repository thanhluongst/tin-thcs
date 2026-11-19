/* Tin học 7 · Bài 9. Trình bày bảng tính · 2 tiết. Soạn lại cho lớp học LAN.
   Tình huống: bảng chi phí dự án Trường học xanh khó đọc.
   Mô phỏng: "tbDinhDangSo" (Number/Currency/Percentage/Date, số chữ số thập phân – dữ liệu gốc không đổi), "tbTrinhBay" (gộp ô, căn giữa, tô màu, chữ đậm, độ rộng cột). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Bảng số khó đọc',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>Cột <b>Trung bình</b> hiện <code>0.982142857</code>, cột <b>Chi phí</b> hiện <code>1400000</code>… rất khó đọc, khó so sánh. Thử các <b>kiểu định dạng số</b> trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'tbDinhDangSo'},
      {id:'q1',type:'single',q:'Quan sát: Định dạng Percentage, 2 chữ số thập phân, ô 0.982142857 hiện:',opts:['0.98','98.21%','98%','0.982%'],ok:1},
      {id:'q2',type:'single',q:'Sau khi định dạng, giá trị thật trong ô (thanh công thức) có thay đổi không?',opts:['Có, bị làm tròn','Không, chỉ thay đổi cách hiển thị','Có, thành chữ','Bị xoá'],ok:1}],
  key:['<b>Định dạng dữ liệu</b> chỉ thay đổi <b>cách hiển thị</b>, không thay đổi giá trị.']},
 {t:'Định dạng dữ liệu số, ngày',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Chọn ô → <b>Format Cells</b> (Ctrl+1) → trang <b>Number</b>: Number (số thập phân, dấu phân cách hàng nghìn), Currency (tiền tệ), Percentage (%), Date (ngày).</p>',
  qs:[{id:'h1',type:'single',q:'Để 1400000 hiện thành 1,400,000.00 em chọn:',opts:['Number, 2 chữ số thập phân, đánh dấu “Use 1000 Separator”','Percentage','Date','Text'],ok:0},
      {id:'h2',type:'single',q:'A3 = 15/3/2021, B3 = 31/3/2021. <code>=B3-A3</code> cho kết quả:',opts:['16','15','31','Lỗi'],ok:0},
      {id:'h3',type:'tf',q:'Đúng hay sai?',items:[{t:'Có thể cộng, trừ dữ liệu kiểu ngày',a:'T'},{t:'Tăng số chữ số thập phân làm giá trị lớn hơn',a:'F'},{t:'Nút % trên dải lệnh Home định dạng phần trăm nhanh',a:'T'}]}],
  key:['<b>Number, Currency, Percentage, Date</b>; trừ hai ngày → <b>số ngày</b>.']},
 {t:'Trình bày bảng tính',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Bảng chưa đẹp: tiêu đề nằm lệch, cột hẹp, không nổi bật. Bấm các nút <b>trình bày</b> trong mô phỏng để làm đẹp bảng.</p>',
  qs:[{id:'s2',type:'sim',sim:'tbTrinhBay'},
      {id:'t1',type:'match',q:'Ghép việc cần làm với lệnh.',items:['Đưa tiêu đề vào giữa bảng trên nhiều cột','Chữ in đậm','Tô màu nền ô','Căn giữa dữ liệu trong ô'],opts:['Merge & Center','Bold (Ctrl+B)','Fill Color','Center'],ok:[0,1,2,3]},
      {id:'t2',type:'single',q:'Gộp vùng A2:B3 (A2 = 120, các ô khác có dữ liệu) thì:',opts:['Giữ lại tất cả dữ liệu','Chỉ giữ dữ liệu ô A2 (ô trái trên)','Giữ dữ liệu ô B3','Mất hết dữ liệu'],ok:1}],
  key:['<b>Trình bày</b>: gộp ô, căn lề, phông chữ, màu nền, độ rộng cột – làm bảng <b>dễ đọc</b>.','Gộp ô chỉ giữ dữ liệu <b>ô trái trên</b>.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút!</p>',
  qs:[{id:'l1',type:'sort',q:'Định dạng dữ liệu hay trình bày bảng?',cols:{c0:'Định dạng dữ liệu',c1:'Trình bày bảng'},items:[{t:'Hiện số dạng phần trăm',a:'c0'},{t:'Gộp ô tiêu đề',a:'c1'},{t:'Thêm 2 chữ số thập phân',a:'c0'},{t:'Tô màu hàng tiêu đề',a:'c1'},{t:'Hiện ngày kiểu dd/mm/yyyy',a:'c0'}]},
      {id:'l2',type:'single',q:'Ô hiện ##### nghĩa là:',opts:['Dữ liệu sai','Cột quá hẹp, cần mở rộng','Ô bị khoá','Có virus'],ok:1}],
  key:['Ô hiện <b>#####</b> → <b>mở rộng cột</b>.']},
 {t:'Làm đẹp bảng của nhóm',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Nhóm em có bảng: Lớp | Số cây | Tỉ lệ sống | Chi phí.</p>',
  qs:[{id:'v1',type:'text',q:'Em sẽ định dạng từng cột thế nào và trình bày tiêu đề ra sao?',ans:'Số cây: Number không thập phân; Tỉ lệ sống: Percentage 1 chữ số; Chi phí: Number có dấu phân cách hàng nghìn. Tiêu đề: Merge & Center, đậm, tô màu.'}],
  key:['Chọn định dạng <b>phù hợp loại dữ liệu</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 3 phút',code:'',phut:3,
  story:'<p>Đẹp và dễ đọc – dữ liệu vẫn nguyên vẹn.</p>',
  qs:[{id:'t1x',type:'single',q:'Câu nào đúng?',opts:['Định dạng làm thay đổi giá trị ô','Định dạng và trình bày chỉ thay đổi cách hiển thị','Gộp ô giữ dữ liệu mọi ô','Không thể trừ hai ngày'],ok:1}],
  key:['<b>Định dạng dữ liệu</b> + <b>trình bày bảng</b> → bảng dễ đọc.']}
];
const GHIBAI={so:'Bài 9:',ten:'TRÌNH BÀY BẢNG TÍNH',muc:[
 {step:2,h:'Định dạng dữ liệu',it:['Format Cells → <b>Number, Currency, Percentage, Date</b>.','Chỉ đổi <b>cách hiển thị</b>, giá trị giữ nguyên.']},
 {step:3,h:'Trình bày bảng',it:['<b>Merge & Center</b>, căn lề, phông, màu nền, độ rộng cột.','Gộp ô giữ dữ liệu <b>ô trái trên</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.tbDinhDangSo=function(){
  const V=[['Trung bình',0.982142857],['Chi phí',1400000],['Ngày trồng',44270]];
  const e=_el(_shell('Định dạng số','Chọn <b>kiểu định dạng</b> và <b>số chữ số thập phân</b>. So sánh ô hiển thị với thanh công thức.',
   `<div class="sim-ctl"><div><b>Kiểu</b> ${_seg('k',[['gen','General'],['num','Number'],['pct','Percentage'],['cur','Currency ₫'],['date','Date']],'gen')}</div>
   <div><b>Thập phân</b> ${_seg('d',[['0','0'],['1','1'],['2','2'],['3','3']],'2')}</div></div>
   <table class="tbl" style="font-size:16px"><tr><th>Ô</th><th>Thanh công thức (giá trị thật)</th><th>Ô hiển thị</th></tr>${V.map((v,k)=>`<tr><td>${v[0]}</td><td style="font-family:Consolas">${v[1]}</td><td class="o" data-k="${k}" style="text-align:right;font:800 18px Consolas;color:#1d4ed8"></td></tr>`).join('')}</table>`));
  let k='gen',d=2; const go=()=>e.querySelectorAll('.o').forEach(td=>{const x=V[+td.dataset.k][1]; let s;
    const nf=(y,g)=>y.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d,useGrouping:g});
    if(k==='gen') s=String(x); else if(k==='num') s=nf(x,true); else if(k==='pct') s=nf(x*100,true)+'%'; else if(k==='cur') s=nf(x,true)+' ₫';
    else {const t=new Date(Date.UTC(1899,11,30)+x*864e5); s=('0'+t.getUTCDate()).slice(-2)+'/'+('0'+(t.getUTCMonth()+1)).slice(-2)+'/'+t.getUTCFullYear();}
    td.textContent=s;});
  _wireSeg(e,(n,v)=>{if(n==='k')k=v; else d=+v; go(); FX.play('ding');}); go(); return e;
};
SIMS_BAI.tbTrinhBay=function(){
  const e=_el(_shell('Làm đẹp bảng','Bấm lần lượt các nút để trình bày bảng. Bấm lại để bỏ.',
   `<style>.m-t7tb .bt{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}.m-t7tb .bt button{font-size:15px;padding:8px 12px;border-radius:10px;border:2px solid #cbd5e1;background:#fff;cursor:pointer;font-weight:600}
   .m-t7tb .bt button.on{border-color:#16a34a;background:#dcfce7}.m-t7tb table{border-collapse:collapse;font-size:15px}.m-t7tb td{border:1px solid #e2e8f0;padding:4px 6px;max-width:60px;overflow:hidden;white-space:nowrap;transition:.25s}
   .m-t7tb.w td{max-width:200px}.m-t7tb.mg .tt{text-align:center}.m-t7tb.b .h td,.m-t7tb.b .tt{font-weight:800}.m-t7tb.c .h td{background:#16a34a;color:#fff}.m-t7tb.al td.n{text-align:center}.m-t7tb.bd td{border-color:#334155}</style>
   <div class="m-t7tb"><div class="bt">${[['mg','⇔ Merge & Center'],['b','𝐁 In đậm'],['c','🎨 Tô màu tiêu đề'],['w','↔ Mở rộng cột'],['al','≡ Căn giữa số'],['bd','▦ Kẻ viền']].map(b=>`<button type="button" data-c="${b[0]}">${b[1]}</button>`).join('')}</div>
   <table><tr><td class="tt" colspan="1">TRƯỜNG HỌC XANH – CHI PHÍ</td><td></td><td></td></tr><tr class="h"><td>Lớp</td><td>Số cây trồng</td><td>Chi phí (đồng)</td></tr>
   <tr><td>7A</td><td class="n">25</td><td class="n">1,250,000</td></tr><tr><td>7B</td><td class="n">18</td><td class="n">900,000</td></tr></table>
   <p class="kq" style="text-align:center;font-weight:700">Điểm trình bày: 0/6</p></div>`));
  const box=e.querySelector('.m-t7tb'),tt=e.querySelector('.tt');
  e.querySelectorAll('.bt button').forEach(b=>b.onclick=()=>{b.classList.toggle('on'); box.classList.toggle(b.dataset.c);
    if(b.dataset.c==='mg'){const on=b.classList.contains('on'); tt.colSpan=on?3:1; [...tt.parentElement.children].slice(1).forEach(x=>x.style.display=on?'none':'');}
    const n=e.querySelectorAll('.bt .on').length; e.querySelector('.kq').textContent='Điểm trình bày: '+n+'/6'+(n===6?' 🌟':''); FX.play(n===6?'win':'tick');});
  return e;
};

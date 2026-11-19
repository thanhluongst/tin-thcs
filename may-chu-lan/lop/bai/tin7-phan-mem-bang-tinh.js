/* Tin học 7 · Bài 6. Làm quen với phần mềm bảng tính · 2 tiết. Soạn lại cho lớp học LAN.
   Tình huống: dự án Trường học xanh – lập bảng thống kê cây trồng.
   Mô phỏng: "btO" (bấm ô → địa chỉ ô, hộp tên), "btNhap" (nhập dữ liệu: số căn phải, chữ căn trái, công thức =…). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Dự án Trường học xanh',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Lớp 7A thống kê số cây mỗi lớp trồng. Ghi trên giấy thì cộng, sửa rất vất vả. <b>Phần mềm bảng tính</b> (Excel) giúp nhập, tính toán, sửa nhanh. Bấm vào các ô trong bảng tính mini để làm quen.</p>',
  qs:[{id:'s1',type:'sim',sim:'btO'},
      {id:'q1',type:'single',q:'Quan sát: Ô nằm ở cột C, hàng 4 có địa chỉ là:',opts:['4C','C4','C:4','R4C3'],ok:1},
      {id:'q2',type:'single',q:'Hộp tên (Name Box) hiển thị gì?',opts:['Tên tệp','Địa chỉ ô đang chọn','Nội dung công thức','Tên trang tính'],ok:1}],
  key:['Bảng tính gồm <b>cột</b> (A, B, C…) và <b>hàng</b> (1, 2, 3…); <b>địa chỉ ô</b> = tên cột + tên hàng (VD: C4).']},
 {t:'Giao diện bảng tính',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Màn hình Excel có: <b>bảng chọn/dải lệnh</b>, <b>hộp tên</b>, <b>vùng nhập dữ liệu (thanh công thức)</b>, <b>trang tính</b> gồm các ô, <b>tên trang tính</b> (Sheet1…). Một tệp bảng tính là một <b>bảng tính</b> có thể chứa nhiều trang tính.</p>',
  qs:[{id:'h1',type:'match',q:'Ghép thành phần với chức năng.',items:['Hộp tên','Thanh công thức','Ô tính','Tên trang tính (Sheet)'],opts:['Hiện địa chỉ ô đang chọn','Hiện, sửa nội dung ô đang chọn','Giao của một hàng và một cột','Chuyển giữa các trang tính'],ok:[0,1,2,3]},
      {id:'h2',type:'single',q:'Khối ô từ B2 đến D5 được viết là:',opts:['B2-D5','B2:D5','B2;D5','B2..D5'],ok:1},
      {id:'h3',type:'single',q:'Khối B2:D5 có bao nhiêu ô?',opts:['8','12','15','20'],ok:1}],
  key:['<b>Khối ô</b>: ô trái trên <b>:</b> ô phải dưới (VD: B2:D5).']},
 {t:'Nhập dữ liệu vào ô',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Nhập số cây của các lớp. Thử nhập <b>chữ</b>, <b>số</b>, <b>ngày</b> và <b>công thức</b> bắt đầu bằng dấu <code>=</code>. Để ý dữ liệu căn lề trái hay phải.</p>',
  qs:[{id:'s2',type:'sim',sim:'btNhap'},
      {id:'n1',type:'sort',q:'Mặc định, dữ liệu được căn lề thế nào?',cols:{c0:'Căn trái',c1:'Căn phải'},items:[{t:'Lớp 7A',a:'c0'},{t:'25',a:'c1'},{t:'Cây bàng',a:'c0'},{t:'12.5',a:'c1'},{t:'=B2+B3 (kết quả số)',a:'c1'}]},
      {id:'n2',type:'single',q:'Muốn máy tính tính toán, nội dung ô phải bắt đầu bằng:',opts:['Dấu +','Dấu =','Dấu #','Chữ “TINH”'],ok:1},
      {id:'n3',type:'tf',q:'Đúng hay sai?',items:[{t:'Nhấn Enter để kết thúc nhập, con trỏ xuống ô dưới',a:'T'},{t:'Thanh công thức cho thấy công thức, còn ô hiện kết quả',a:'T'},{t:'Số được căn trái là số không tính toán được',a:'T'}]}],
  key:['<b>Chữ</b> căn trái, <b>số</b> căn phải. <b>Công thức</b> bắt đầu bằng <b>=</b>, ô hiện kết quả.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút!</p>',
  qs:[{id:'l1',type:'single',q:'Ô ở cột thứ 4, hàng 10 có địa chỉ:',opts:['D10','10D','C10','E10'],ok:0},
      {id:'l2',type:'single',q:'Ô A1 chứa 5, A2 chứa 7. Ô A3 nhập <code>=A1*A2</code> sẽ hiện:',opts:['A1*A2','12','35','57'],ok:2},
      {id:'l3',type:'single',q:'Nhập <code>A1+A2</code> (không có dấu =) vào ô thì ô hiện:',opts:['12','A1+A2','Lỗi','0'],ok:1}],
  key:['Thiếu dấu <b>=</b>, máy coi là <b>văn bản</b>.']},
 {t:'Bảng cây trồng của lớp em',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Lập bảng: Lớp | Số cây trồng | Số cây sống.</p>',
  qs:[{id:'v1',type:'text',q:'Em sẽ đặt tiêu đề ở ô nào, dữ liệu ở khối nào, và viết công thức tính tổng số cây sống của 3 lớp ở ô nào?',ans:'VD: tiêu đề A1:C1; dữ liệu A2:C4; ô C5 = C2+C3+C4.'}],
  key:['Bố trí dữ liệu thành <b>bảng</b> rồi dùng <b>công thức</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',phut:2,
  story:'<p>Bảng tính = hàng + cột + ô; nhập số, chữ, công thức.</p>',
  qs:[{id:'t1',type:'single',q:'Câu nào đúng?',opts:['Địa chỉ ô viết hàng trước cột','Công thức bắt đầu bằng dấu =','Số mặc định căn trái','Một bảng tính chỉ có một trang tính'],ok:1}],
  key:['<b>Địa chỉ ô, khối ô, công thức =</b>.']}
];
const GHIBAI={so:'Bài 6:',ten:'LÀM QUEN VỚI PHẦN MỀM BẢNG TÍNH',muc:[
 {step:1,h:'Ô và địa chỉ ô',it:['<b>Địa chỉ ô</b> = cột + hàng (C4).','<b>Khối ô</b>: B2:D5.']},
 {step:2,h:'Giao diện',it:['<b>Hộp tên</b>, <b>thanh công thức</b>, trang tính, tên trang tính.']},
 {step:3,h:'Nhập dữ liệu',it:['<b>Chữ</b> căn trái, <b>số</b> căn phải.','<b>Công thức</b> bắt đầu bằng <b>=</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
function _t7bt_css(){return `<style>.m-t7bt{overflow:auto}.m-t7bt .fx{display:flex;gap:6px;margin-bottom:6px}.m-t7bt .nb{width:70px;font:700 16px Consolas,monospace;padding:6px;border:2px solid #16a34a;border-radius:6px;text-align:center;background:#f0fdf4}
.m-t7bt .fb{flex:1;font:16px Consolas,monospace;padding:6px;border:1px solid #cbd5e1;border-radius:6px}.m-t7bt table{border-collapse:collapse;font-size:15px;background:#fff}
.m-t7bt th{background:#e2e8f0;min-width:30px;padding:3px 6px;font-weight:600}.m-t7bt td{border:1px solid #cbd5e1;min-width:80px;height:28px;padding:2px 6px;cursor:cell}
.m-t7bt td.on{outline:3px solid #16a34a;outline-offset:-2px}.m-t7bt th.on{background:#bbf7d0}</style>`;}
function _t7bt_grid(R,C){let h='<table><tr><th></th>'; for(let c=0;c<C;c++) h+=`<th data-c="${c}">${String.fromCharCode(65+c)}</th>`; h+='</tr>';
  for(let r=1;r<=R;r++){h+=`<tr><th data-r="${r}">${r}</th>`; for(let c=0;c<C;c++) h+=`<td data-a="${String.fromCharCode(65+c)+r}"></td>`; h+='</tr>';} return h+'</table>';}
function _t7bt_eval(f,D){const s=f.slice(1).toUpperCase(); if(!/^[A-Z0-9+\-*/().\s]+$/.test(s)) return '#LỖI';
  try{const x=Function('return ('+s.replace(/([A-Z])(\d+)/g,(m)=>{const v=parseFloat(D[m]); return isNaN(v)?0:v;})+')')(); return isFinite(x)?Math.round(x*100)/100:'#DIV/0!';}catch(_){return '#LỖI';}}
SIMS_BAI.btO=function(){
  const e=_el(_shell('Bảng tính mini – địa chỉ ô','Bấm vào <b>bất kì ô nào</b>. Xem hộp tên và tiêu đề hàng, cột sáng lên. Rồi làm <b>nhiệm vụ</b>.',
   _t7bt_css()+`<div class="m-t7bt"><div class="fx"><span class="nb">A1</span><span class="fb">Hộp tên ← địa chỉ ô</span></div>${_t7bt_grid(6,5)}</div>
   <div class="kq" style="margin-top:10px;padding:12px;border-radius:12px;background:#eef2ff;font-weight:700;text-align:center"></div>`));
  const Q=['C4','A1','E6','B3','D2'],nb=e.querySelector('.nb'),kq=e.querySelector('.kq'); let i=0,d=0; const ask=()=>{kq.textContent=i<Q.length?'🎯 Nhiệm vụ '+(i+1)+': Bấm vào ô '+Q[i]:'🎉 Hoàn thành '+d+'/'+Q.length+' nhiệm vụ!';}; ask();
  e.querySelectorAll('td').forEach(td=>td.onclick=()=>{e.querySelectorAll('.on').forEach(x=>x.classList.remove('on')); td.classList.add('on'); const a=td.dataset.a; nb.textContent=a;
    e.querySelector(`th[data-c="${a.charCodeAt(0)-65}"]`).classList.add('on'); e.querySelector(`th[data-r="${a.slice(1)}"]`).classList.add('on');
    if(i<Q.length){if(a===Q[i]){d++; i++; FX.play('ding'); if(i===Q.length) FX.play('win');} else FX.play('tick'); ask();}});
  return e;
};
SIMS_BAI.btNhap=function(){
  const e=_el(_shell('Nhập dữ liệu','Bấm một ô, gõ vào <b>thanh công thức</b> rồi nhấn <b>Enter</b>. Thử: <code>Lớp 7A</code>, <code>25</code>, <code>=B2+B3</code>, <code>B2+B3</code>.',
   _t7bt_css()+`<div class="m-t7bt"><div class="fx"><span class="nb">B2</span><input class="fb" placeholder="Gõ dữ liệu rồi nhấn Enter"></div>${_t7bt_grid(5,4)}</div>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>Ô</th><th>Em nhập</th><th>Ô hiển thị</th><th>Loại</th></tr></table>`));
  const D={A1:'Lớp',B1:'Số cây',A2:'7A',B2:'25',A3:'7B',B3:'18'},nb=e.querySelector('.nb'),fb=e.querySelector('.fb'),hist=[]; let cur='B4';
  const show=()=>e.querySelectorAll('td').forEach(td=>{const v=D[td.dataset.a]||''; let o=v,num=false; if(v[0]==='='){o=_t7bt_eval(v,D); num=typeof o==='number';} else num=v!==''&&!isNaN(+v);
    td.textContent=o; td.style.textAlign=num?'right':'left';});
  const pick=(a,nf)=>{cur=a; e.querySelectorAll('td').forEach(t=>t.classList.toggle('on',t.dataset.a===a)); nb.textContent=a; fb.value=D[a]||''; if(!nf) fb.focus();};
  e.querySelectorAll('td').forEach(td=>td.onclick=()=>pick(td.dataset.a));
  fb.onkeydown=ev=>{if(ev.key!=='Enter') return; const v=fb.value.trim(); D[cur]=v; show(); const td=e.querySelector(`td[data-a="${cur}"]`);
    const loai=v[0]==='='?'Công thức':v!==''&&!isNaN(+v)?'Số (căn phải)':'Văn bản (căn trái)'; hist.unshift([cur,v,td.textContent,loai]); if(hist.length>6) hist.pop();
    histTable(e,hist,(x,j)=>j===3?(/Công/.test(x)?'g':''):''); FX.play('ding'); const nx=cur[0]+(+cur.slice(1)+1); pick(e.querySelector(`td[data-a="${nx}"]`)?nx:cur);};
  show(); pick('B4',1);
  return e;
};

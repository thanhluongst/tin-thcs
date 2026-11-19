/* Tin học 7 · Bài 8. Công cụ hỗ trợ tính toán · 2 tiết. Soạn lại cho lớp học LAN.
   Tình huống: thống kê số cây các lớp trồng (Trường học xanh).
   Mô phỏng: "ccHam" (chọn hàm SUM/AVERAGE/MAX/MIN/COUNT + kéo chọn khối ô → kết quả), "ccLoi" (sửa dữ liệu, ô trống, chữ → hàm xử lí thế nào). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Cộng 10 ô thì gõ dài quá!',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>An cần tính tổng số cây của 8 lớp: <code>=B2+B3+B4+B5+B6+B7+B8+B9</code> – dài, dễ sai. Excel có <b>hàm</b> làm việc này. Thử chọn hàm và khối ô trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'ccHam'},
      {id:'q1',type:'single',q:'Quan sát: Hàm nào cho biết lớp trồng <b>nhiều</b> cây nhất?',opts:['SUM','AVERAGE','MAX','COUNT'],ok:2},
      {id:'q2',type:'single',q:'<code>=SUM(B2:B9)</code> tương đương với:',opts:['=B2+B9','=B2+B3+…+B9','=B2*B9','=(B2+B9)/2'],ok:1}],
  key:['<b>Hàm</b> là công thức có sẵn: <code>=TÊN_HÀM(khối ô)</code>.']},
 {t:'Năm hàm thông dụng',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Cách nhập: gõ <b>=</b>, tên hàm, mở ngoặc, chọn khối ô, đóng ngoặc, Enter. Hoặc dùng nút <b>Σ AutoSum</b> trên dải lệnh Home.</p>',
  qs:[{id:'h1',type:'match',q:'Ghép hàm với chức năng.',items:['SUM','AVERAGE','MAX','MIN','COUNT'],opts:['Tính tổng','Tính trung bình cộng','Tìm giá trị lớn nhất','Tìm giá trị nhỏ nhất','Đếm số ô chứa số'],ok:[0,1,2,3,4]},
      {id:'h2',type:'single',q:'A1:A4 chứa 4, 8, 6, 2. <code>=AVERAGE(A1:A4)</code> bằng:',opts:['20','5','8','4'],ok:1},
      {id:'h3',type:'single',q:'Viết hàm nào là <b>đúng</b>?',opts:['=SUM(A1;A5)','=SUM A1:A5','=SUM(A1:A5)','SUM(A1:A5)'],ok:2}],
  key:['<b>SUM, AVERAGE, MAX, MIN, COUNT</b>; cú pháp <code>=SUM(A1:A5)</code>.']},
 {t:'Khi dữ liệu thay đổi, có ô trống',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Lớp 7C chưa báo số cây (ô trống), lớp 7D ghi “chưa có”. Hàm xử lí thế nào? Sửa dữ liệu trong mô phỏng và quan sát.</p>',
  qs:[{id:'s2',type:'sim',sim:'ccLoi'},
      {id:'l1',type:'single',q:'Quan sát: COUNT đếm những ô nào?',opts:['Mọi ô','Chỉ ô chứa số','Chỉ ô chứa chữ','Cả ô trống'],ok:1},
      {id:'l2',type:'tf',q:'Đúng hay sai?',items:[{t:'Kết quả hàm tự cập nhật khi sửa dữ liệu',a:'T'},{t:'AVERAGE tính cả ô trống là số 0',a:'F'},{t:'SUM bỏ qua ô chứa chữ',a:'T'}]}],
  key:['Hàm <b>bỏ qua</b> ô trống và ô chứa chữ; kết quả <b>tự cập nhật</b>.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút! B2:B6 = 5, 9, 3, 7, 6.</p>',
  qs:[{id:'x1',type:'single',q:'=SUM(B2:B6) =',opts:['30','29','6','25'],ok:0},
      {id:'x2',type:'single',q:'=MAX(B2:B6) − MIN(B2:B6) =',opts:['9','3','6','12'],ok:2},
      {id:'x3',type:'single',q:'=COUNT(B2:B6) =',opts:['30','6','5','1'],ok:2}],
  key:['Tính nhẩm để <b>kiểm tra</b> kết quả hàm.']},
 {t:'Thống kê dự án',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Bảng số cây 8 lớp ở B2:B9.</p>',
  qs:[{id:'v1',type:'text',q:'Viết 3 công thức: tổng số cây, trung bình mỗi lớp, số cây nhiều nhất.',ans:'=SUM(B2:B9); =AVERAGE(B2:B9); =MAX(B2:B9)'}],
  key:['Dùng hàm để <b>thống kê</b> nhanh.']},
 {t:'Tổng kết',hd:'Tổng kết · 4 phút',code:'',phut:4,
  story:'<p>Năm hàm – năm trợ thủ.</p>',
  qs:[{id:'t1',type:'single',q:'Hàm nào đếm số lớp đã báo số cây (ô chứa số)?',opts:['SUM','COUNT','MIN','AVERAGE'],ok:1}],
  key:['<b>SUM – AVERAGE – MAX – MIN – COUNT</b>.']}
];
const GHIBAI={so:'Bài 8:',ten:'CÔNG CỤ HỖ TRỢ TÍNH TOÁN',muc:[
 {step:2,h:'Hàm',it:['Cú pháp: <code>=TÊN_HÀM(khối ô)</code>, VD =SUM(B2:B9).'],tb:[['Hàm','Chức năng'],['SUM','Tổng'],['AVERAGE','Trung bình'],['MAX / MIN','Lớn / nhỏ nhất'],['COUNT','Đếm ô chứa số']]},
 {step:3,h:'Lưu ý',it:['Hàm <b>bỏ qua</b> ô trống, ô chữ; <b>tự cập nhật</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
function _t7cc_css(){return `<style>.m-t7cc table{border-collapse:collapse;font-size:15px;background:#fff}.m-t7cc th{background:#e2e8f0;padding:4px 8px}
.m-t7cc td{border:1px solid #cbd5e1;min-width:70px;height:30px;padding:2px 8px;cursor:pointer;user-select:none}.m-t7cc td.n{text-align:right}.m-t7cc td.sel{background:#dbeafe;outline:2px dashed #2563eb;outline-offset:-2px}
.m-t7cc .res{font:800 22px Consolas,monospace;padding:12px;border-radius:12px;background:#0f172a;color:#86efac;text-align:center;margin-top:8px}.m-t7cc input{width:64px;font-size:15px;text-align:right}</style>`;}
function _t7cc_f(fn,a){const n=a.filter(x=>x!==''&&!isNaN(+x)).map(Number); if(fn==='COUNT') return n.length; if(!n.length) return fn==='SUM'?0:'#DIV/0!';
  const s=n.reduce((p,q)=>p+q,0); return fn==='SUM'?s:fn==='AVERAGE'?Math.round(s/n.length*100)/100:fn==='MAX'?Math.max(...n):Math.min(...n);}
SIMS_BAI.ccHam=function(){
  const L=[['7A',25],['7B',18],['7C',32],['7D',12],['7E',27],['7G',21],['7H',15],['7K',30]];
  const e=_el(_shell('Hàm thống kê','Chọn <b>hàm</b>, rồi <b>bấm ô đầu</b> và <b>bấm ô cuối</b> ở cột B để chọn khối ô.',
   _t7cc_css()+`<div class="sim-ctl"><div><b>Hàm</b> ${_seg('fn',[['SUM','Σ SUM'],['AVERAGE','AVERAGE'],['MAX','⬆ MAX'],['MIN','⬇ MIN'],['COUNT','# COUNT']],'SUM')}</div></div>
   <div class="m-t7cc" style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start"><table><tr><th></th><th>A – Lớp</th><th>B – Số cây</th></tr>${L.map((l,k)=>`<tr><th>${k+2}</th><td>${l[0]}</td><td class="n" data-r="${k+2}">${l[1]}</td></tr>`).join('')}</table>
   <div style="flex:1;min-width:220px"><div class="res">=SUM(B2:B9)<br>= ?</div><table class="tbl sim-hist" style="margin-top:8px"><tr><th>Lần</th><th>Công thức</th><th>Kết quả</th></tr></table></div></div>`));
  let fn='SUM',a=2,b=9,st=0; const hist=[],res=e.querySelector('.res');
  const go=()=>{e.querySelectorAll('td.n').forEach(td=>td.classList.toggle('sel',+td.dataset.r>=a&&+td.dataset.r<=b)); const v=_t7cc_f(fn,L.slice(a-2,b-1).map(x=>String(x[1]))), f='='+fn+'(B'+a+':B'+b+')';
    res.innerHTML=f+'<br>= '+v; hist.unshift([f,v]); if(hist.length>6) hist.pop(); histTable(e,hist,()=>''); FX.play('ding');};
  _wireSeg(e,(n,v)=>{fn=v; go();});
  e.querySelectorAll('td.n').forEach(td=>td.onclick=()=>{const r=+td.dataset.r; if(!st){a=b=r; st=1; e.querySelectorAll('td.n').forEach(x=>x.classList.toggle('sel',x===td)); res.innerHTML='Bấm ô cuối…'; FX.play('tick');} else {st=0; if(r<a){b=a;a=r;} else b=r; go();}});
  go(); return e;
};
SIMS_BAI.ccLoi=function(){
  const V=['25','18','','chưa có','27'];
  const e=_el(_shell('Hàm với ô trống, ô chữ','Sửa giá trị các ô (để trống, gõ chữ, gõ số). Quan sát 5 hàm thay đổi.',
   _t7cc_css()+`<div class="m-t7cc" style="display:flex;gap:14px;flex-wrap:wrap"><table><tr><th></th><th>Lớp</th><th>B – Số cây</th></tr>${V.map((v,k)=>`<tr><th>${k+2}</th><td>7${'ABCDE'[k]}</td><td><input data-k="${k}" value="${v}"></td></tr>`).join('')}</table>
   <table class="tbl" style="flex:1;min-width:220px"><tr><th>Công thức</th><th>Kết quả</th></tr>${['SUM','AVERAGE','MAX','MIN','COUNT'].map(f=>`<tr><td>=${f}(B2:B6)</td><td class="r" data-f="${f}" style="font-weight:800;color:#1d4ed8"></td></tr>`).join('')}</table></div>`));
  const go=()=>{const a=[...e.querySelectorAll('input')].map(i=>i.value.trim()); e.querySelectorAll('.r').forEach(td=>{td.textContent=_t7cc_f(td.dataset.f,a);});
    e.querySelectorAll('input').forEach(i=>i.style.textAlign=i.value!==''&&!isNaN(+i.value)?'right':'left');};
  e.querySelectorAll('input').forEach(i=>i.oninput=()=>{go(); FX.play('tick');}); go(); return e;
};

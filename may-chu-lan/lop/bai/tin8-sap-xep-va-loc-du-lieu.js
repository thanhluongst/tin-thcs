/* Tin học 8 · Bài 6. Sắp xếp và lọc dữ liệu · 1 tiết.
   Tình huống: bảng kết quả khảo sát nội dung Tin học lớp 8A.
   Mô phỏng: "sapxep" (Sort 1–2 tiêu chí), "loc" (AutoFilter + Number Filters). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Phiếu khảo sát lớp 8A',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Lớp 8A khảo sát: mỗi bạn chọn <b>một nội dung Tin học</b> muốn tìm hiểu (Ngôn ngữ lập trình, Đồ hoạ máy tính, Mạng máy tính…). Bảng kết quả dài và lộn xộn. Cô cần: danh sách <b>theo tên</b>, và danh sách các bạn <b>muốn học lập trình</b>.</p>',
  qs:[{id:'kd',type:'match',q:'Ghép yêu cầu với công cụ.',items:['Xếp danh sách theo thứ tự chữ cái của tên','Chỉ hiện các bạn chọn Ngôn ngữ lập trình'],opts:['Lọc dữ liệu (Filter)','Sắp xếp dữ liệu (Sort)'],ok:[1,0]}],
  key:['<b>Sắp xếp</b>: đổi thứ tự các hàng. <b>Lọc</b>: chỉ hiện các hàng thoả điều kiện.']},
 {t:'Sắp xếp dữ liệu',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Thử sắp xếp bảng theo <b>một</b> tiêu chí (Tên), rồi theo <b>hai</b> tiêu chí (Tên, rồi Họ đệm). Để ý hai bạn cùng tên <b>Trang</b>.</p>',
  qs:[{id:'s1',type:'sim',sim:'sapxep'},
      {id:'sx1',type:'single',q:'Hai bạn cùng tên Trang. Muốn bạn có họ đệm đứng trước theo bảng chữ cái xếp trên, em thêm tiêu chí thứ hai là:',opts:['Tổ','Họ đệm','Nội dung','STT'],ok:1},
      {id:'sx2',type:'single',q:'Vì sao chọn <b>My data has headers</b> trong hộp thoại Sort?',opts:['Để hàng tiêu đề không bị sắp xếp lẫn vào dữ liệu','Để tô màu tiêu đề','Để xoá tiêu đề','Để in đậm'],ok:0},
      {id:'sx3',type:'sort',q:'Thứ tự tăng dần / giảm dần',cols:{c0:'Tăng dần (A→Z, nhỏ→lớn)',c1:'Giảm dần (Z→A, lớn→nhỏ)'},items:[{t:'An, Bình, Chi',a:'c0'},{t:'10, 7, 3',a:'c1'},{t:'Yến, Minh, Hà',a:'c1'},{t:'2, 5, 9',a:'c0'}]}],
  key:['<b>Data → Sort</b>: chọn cột, thứ tự <b>tăng/giảm</b>; <b>Add Level</b> để thêm tiêu chí.','Tiêu chí 2 dùng khi tiêu chí 1 <b>bằng nhau</b>.']},
 {t:'Lọc dữ liệu',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Bật <b>Filter</b>, bấm nút ▼ ở tiêu đề cột để chọn điều kiện. Thử lọc theo <b>Nội dung</b>, rồi thêm điều kiện <b>Tổ</b>; thử <b>Number Filters</b> với cột Điểm.</p>',
  qs:[{id:'s2',type:'sim',sim:'loc'},
      {id:'l1',type:'single',q:'Khi lọc, các hàng không thoả điều kiện sẽ:',opts:['Bị xoá vĩnh viễn','Bị ẩn đi, bỏ lọc sẽ hiện lại','Chuyển sang trang tính khác','Bị tô đỏ'],ok:1},
      {id:'l2',type:'single',q:'Lọc các bạn Tổ 1 muốn học Đồ hoạ máy tính: em đặt điều kiện ở…',opts:['Chỉ cột Tổ','Chỉ cột Nội dung','Cả cột Tổ và cột Nội dung','Cột Họ đệm'],ok:2},
      {id:'l3',type:'single',q:'Điều kiện “Điểm lớn hơn hoặc bằng 8” dùng mục nào của Number Filters?',opts:['Equals','Greater Than Or Equal To','Less Than','Top 10'],ok:1}],
  key:['<b>Data → Filter</b>: nút ▼ ở tiêu đề cột. Lọc nhiều cột = các điều kiện <b>đồng thời</b>.','Hàng không thoả bị <b>ẩn</b>, không bị xoá.']},
 {t:'Luyện tập',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  qs:[{id:'lt1',type:'single',q:'Sắp xếp theo Tổ; cùng tổ theo Tên; cùng tên theo Họ đệm. Cần mấy mức (level)?',opts:['1','2','3','4'],ok:2},
      {id:'lt2',type:'tf',q:'Đúng hay sai?',items:[{t:'Có thể sắp xếp cột số theo giá trị giảm dần',a:'T'},{t:'Lọc làm thay đổi dữ liệu gốc',a:'F'},{t:'Number Filters chỉ dùng cho cột chứa số',a:'T'}]}],
  key:['Sắp xếp nhiều mức: <b>ưu tiên từ trên xuống</b>.']},
 {t:'Thời gian dùng thiết bị số',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Tệp TGSDThietbiso.xlsx ghi số học sinh mỗi lớp dùng thiết bị số theo khoảng thời gian.</p>',
  qs:[{id:'vd',type:'text',q:'Em sẽ đặt điều kiện lọc nào để tìm các lớp cần nhắc nhở dùng thiết bị số quá nhiều? Mô tả (1–2 câu).',ans:'Number Filters → Greater Than: cột “Từ 5 giờ trở lên” lớn hơn 10.'}],
  key:['Sắp xếp, lọc giúp <b>tìm nhanh</b> thông tin cần thiết.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Lệnh Sort và Filter nằm ở dải lệnh nào?',opts:['Home','Insert','Data','View'],ok:2}],
  key:['<b>Data → Sort / Filter</b>.']}
];
const GHIBAI={so:'Bài 6:',ten:'SẮP XẾP VÀ LỌC DỮ LIỆU',muc:[
 {step:2,h:'Sắp xếp',it:['<b>Data → Sort</b>: chọn cột, <b>tăng/giảm</b> dần; <b>Add Level</b> thêm tiêu chí.']},
 {step:3,h:'Lọc',it:['<b>Data → Filter</b> → nút ▼; <b>Number Filters</b> cho cột số.','Hàng không thoả bị <b>ẩn</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
const _m8sxData=[['Nguyễn Thu','Trang',1,'Đồ hoạ máy tính',8],['Lê Minh','An',2,'Ngôn ngữ lập trình',9],['Trần Hà','Vy',1,'Mạng máy tính',7],['Bùi Thị','Trang',2,'Ngôn ngữ lập trình',6],['Phạm Đức','Khoa',3,'Đồ hoạ máy tính',10],['Hoàng Gia','Bảo',1,'Ngôn ngữ lập trình',8],['Đỗ Mai','Chi',3,'Mạng máy tính',5],['Vũ Quang','Minh',2,'Đồ hoạ máy tính',9],['Ngô Lan','Anh',1,'Đồ hoạ máy tính',7]];
const _m8sxH=['Họ đệm','Tên','Tổ','Nội dung','Điểm'];
const _m8sxCss=`<style>.m8sx table{border-collapse:collapse;width:100%;background:#fff;font-size:15px}.m8sx td,.m8sx th{border:1px solid #cbd5e1;padding:6px 8px}.m8sx th{background:#dbeafe}.m8sx tr.fl td{animation:m8sxf .5s}@keyframes m8sxf{from{background:#fef08a}}.m8sx select{font-size:15px;padding:6px;border-radius:8px}.m8sx .note{font-weight:700;color:#0f766e;margin:6px 0}</style>`;
function _m8sxTable(rows,hl){return '<table><tr><th>#</th>'+_m8sxH.map((h,j)=>`<th ${hl&&hl.includes(j)?'style="background:#fde68a"':''}>${h}</th>`).join('')+'</tr>'+rows.map((r,i)=>`<tr class="fl"><td>${i+1}</td>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')+'</table>';}
SIMS_BAI.sapxep=function(){
  const opt=(n,v)=>`<select data-n="${n}">${n==='k2'?'<option value="-1">(không)</option>':''}${_m8sxH.map((h,j)=>`<option value="${j}" ${j==v?'selected':''}>${h}</option>`).join('')}</select>`;
  const e=_el(_shell('Hộp thoại Sort','Chọn <b>Sort by</b>, thứ tự, thêm <b>Then by</b> (tiêu chí 2), bấm <b>OK</b>.',
   `<div class="m8sx">${_m8sxCss}<div class="sim-ctl"><div>Sort by ${opt('k1',1)} ${_seg('o1',[['a','A→Z'],['d','Z→A']],'a')}</div><div>Then by ${opt('k2',-1)} ${_seg('o2',[['a','A→Z'],['d','Z→A']],'a')}</div><button class="btn acc ok">OK</button><button class="btn ghost rs">↺ Bảng gốc</button></div><div class="note"></div><div class="tb"></div></div>`));
  const o={o1:'a',o2:'a'}; _wireSeg(e,(n,v)=>o[n]=v);
  const tb=e.querySelector('.tb'), nt=e.querySelector('.note');
  const cmp=(a,b,k,d)=>{const x=a[k],y=b[k]; const r=typeof x==='number'?x-y:String(x).localeCompare(String(y),'vi'); return d==='a'?r:-r;};
  e.querySelector('.ok').onclick=()=>{const k1=+e.querySelector('[data-n=k1]').value,k2=+e.querySelector('[data-n=k2]').value;
    const r=_m8sxData.slice().sort((a,b)=>cmp(a,b,k1,o.o1)||(k2>=0?cmp(a,b,k2,o.o2):0)); tb.innerHTML=_m8sxTable(r,[k1,k2]);
    nt.textContent='Đã sắp xếp theo '+_m8sxH[k1]+(k2>=0?', rồi '+_m8sxH[k2]:'')+'. '+(k1===1&&k2<0?'Hai bạn Trang: thứ tự chưa chắc theo họ đệm!':''); FX.play('whoosh');};
  e.querySelector('.rs').onclick=()=>{tb.innerHTML=_m8sxTable(_m8sxData); nt.textContent='Bảng gốc (chưa sắp xếp)';};
  e.querySelector('.rs').onclick(); return e;
};
SIMS_BAI.loc=function(){
  const e=_el(_shell('Bộ lọc (Filter)','Chọn điều kiện ở <b>Tổ</b>, <b>Nội dung</b>, <b>Điểm</b> (Number Filters). Đếm số hàng hiện.',
   `<div class="m8sx">${_m8sxCss}<div class="sim-ctl"><div>▼ Tổ <select data-n="to"><option value="">(Tất cả)</option><option>1</option><option>2</option><option>3</option></select></div>
    <div>▼ Nội dung <select data-n="nd"><option value="">(Tất cả)</option><option>Ngôn ngữ lập trình</option><option>Đồ hoạ máy tính</option><option>Mạng máy tính</option></select></div>
    <div>▼ Điểm <select data-n="op"><option value="">(Tất cả)</option><option value="ge">≥ (Greater Than Or Equal To)</option><option value="lt">&lt; (Less Than)</option><option value="eq">= (Equals)</option></select> <select data-n="x">${[5,6,7,8,9,10].map(v=>`<option ${v==8?'selected':''}>${v}</option>`).join('')}</select></div></div>
    <div class="note"></div><div class="tb"></div></div>`));
  const g=n=>e.querySelector(`[data-n=${n}]`).value;
  function up(){const to=g('to'),nd=g('nd'),op=g('op'),x=+g('x');
    const r=_m8sxData.filter(d=>(!to||d[2]==to)&&(!nd||d[3]===nd)&&(!op||(op==='ge'?d[4]>=x:op==='lt'?d[4]<x:d[4]===x)));
    e.querySelector('.tb').innerHTML=_m8sxTable(r,[to?2:-1,nd?3:-1,op?4:-1]);
    e.querySelector('.note').textContent=`Hiện ${r.length}/${_m8sxData.length} hàng — ${_m8sxData.length-r.length} hàng đang bị ẨN (không bị xoá).`; FX.play(r.length?'tick':'drum');}
  e.querySelectorAll('select').forEach(s=>s.onchange=up); up(); return e;
};

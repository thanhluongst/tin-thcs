/* Tin học 8 · Bài 7. Trình bày dữ liệu bằng biểu đồ · 1 tiết.
   Tình huống: kết quả khảo sát nội dung Tin học (41 học sinh).
   Mô phỏng: "taobieudo" (bảng dữ liệu mini → biểu đồ cột/quạt/đường, nhãn %). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Bảng số hay biểu đồ?',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Kết quả khảo sát 41 bạn lớp 8A được trình bày bằng <b>bảng số</b> (Hình 7.1) và bằng <b>biểu đồ cột</b> (Hình 7.2). Cách nào giúp so sánh nhanh hơn?</p>',
  qs:[{id:'kd',type:'single',q:'Cách nào hiệu quả hơn để <b>so sánh</b> số học sinh quan tâm mỗi nội dung?',opts:['Bảng số','Biểu đồ','Như nhau','Đọc văn bản'],ok:1}],
  key:['<b>Biểu đồ</b> giúp so sánh, nhận xét dữ liệu <b>trực quan, nhanh</b>.']},
 {t:'Xưởng vẽ biểu đồ',hd:'Hình thành kiến thức · Hoạt động 1 · 15 phút',code:'2.1',phut:15,
  story:'<p>Sửa số liệu trong bảng, chọn loại biểu đồ: <b>cột</b>, <b>hình quạt tròn</b>, <b>đường gấp khúc</b>. Bật <b>nhãn dữ liệu</b> (số hoặc %).</p>',
  qs:[{id:'s1',type:'sim',sim:'taobieudo'},
      {id:'b1',type:'match',q:'Ghép mục đích với loại biểu đồ phù hợp.',items:['So sánh số lượng giữa các nhóm','Tỉ lệ phần trăm từng phần trên tổng','Xu hướng thay đổi theo thời gian'],opts:['Biểu đồ đường gấp khúc','Biểu đồ cột','Biểu đồ hình quạt tròn'],ok:[1,2,0]},
      {id:'b2',type:'single',q:'15 trên 41 học sinh quan tâm Đồ hoạ. Phần quạt này khoảng:',opts:['15%','37%','41%','63%'],ok:1},
      {id:'b3',type:'single',q:'Quan sát: khi sửa số trong bảng, biểu đồ…',opts:['Không đổi','Tự động cập nhật theo','Bị xoá','Đổi sang loại khác'],ok:1}],
  key:['<b>Cột</b>: so sánh; <b>quạt tròn</b>: tỉ lệ %; <b>đường</b>: xu hướng theo thời gian.','Biểu đồ <b>tự cập nhật</b> khi dữ liệu thay đổi.']},
 {t:'Các bước tạo biểu đồ',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',phut:8,
  qs:[{id:'bc',type:'match',q:'Ghép bước với thao tác.',items:['Bước 1','Bước 2','Bước 3','Bước 4'],opts:['Insert → chọn loại biểu đồ trong nhóm Charts','Chọn vùng dữ liệu (cả tiêu đề)','Chart Elements: thêm tiêu đề, nhãn, chú giải','Chỉnh sửa, đổi tên tiêu đề biểu đồ'],ok:[1,0,2,3]},
      {id:'ce',type:'single',q:'Nút <b>Chart Elements</b> (dấu +) dùng để:',opts:['Đổi màu trang tính','Thêm/bớt thành phần: tiêu đề, nhãn dữ liệu, chú giải…','Xoá biểu đồ','In biểu đồ'],ok:1}],
  key:['<b>Chọn dữ liệu → Insert → Charts → Chart Elements</b>.']},
 {t:'Đọc biểu đồ',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Biểu đồ doanh thu công nghiệp phần mềm Việt Nam 2016–2020 tăng dần qua các năm.</p>',
  qs:[{id:'lt1',type:'single',q:'Muốn thể hiện xu hướng doanh thu qua các năm, nên dùng:',opts:['Biểu đồ quạt','Biểu đồ đường gấp khúc (hoặc cột)','Bảng số','Không cần biểu đồ'],ok:1},
      {id:'lt2',type:'single',q:'429 học sinh, 86 bạn dùng thiết bị số từ 5 giờ trở lên. Phần quạt khoảng:',opts:['8,6%','20%','43%','86%'],ok:1}],
  key:['Đọc biểu đồ: nhìn <b>trục, chú giải, nhãn</b> để rút ra <b>nhận xét</b>.']},
 {t:'Biểu đồ của em',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  qs:[{id:'vd',type:'text',q:'Nêu một tình huống thực tế cần tạo biểu đồ và loại biểu đồ em chọn.',ans:'VD: Theo dõi điểm Tin học từng tháng → biểu đồ đường; tỉ lệ bạn thích các môn thể thao → biểu đồ quạt.'}],
  key:['Chọn loại biểu đồ <b>phù hợp mục đích</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Biểu đồ nào phù hợp nhất để thể hiện tỉ lệ %?',opts:['Cột','Quạt tròn','Đường','Không có'],ok:1}],
  key:['Biểu đồ: <b>trực quan, so sánh nhanh</b>, tự cập nhật.']}
];
const GHIBAI={so:'Bài 7:',ten:'TRÌNH BÀY DỮ LIỆU BẰNG BIỂU ĐỒ',muc:[
 {step:2,h:'Loại biểu đồ',it:['<b>Cột</b>: so sánh; <b>quạt tròn</b>: tỉ lệ %; <b>đường gấp khúc</b>: xu hướng.']},
 {step:3,h:'Tạo biểu đồ',it:[],flow:['Chọn dữ liệu','Insert → Charts','Chart Elements','Chỉnh sửa']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.taobieudo=function(){
  const D=[['Ngôn ngữ lập trình',12],['Đồ hoạ máy tính',15],['Mạng máy tính',8],['Trí tuệ nhân tạo',6]], COL=['#2563eb','#f59e0b','#10b981','#ef4444','#8b5cf6'];
  const e=_el(_shell('Xưởng vẽ biểu đồ','Sửa <b>số</b> trong bảng, chọn <b>loại biểu đồ</b> và <b>nhãn</b>. Biểu đồ cập nhật ngay.',
   `<div class="m8bd"><style>.m8bd .g{display:grid;grid-template-columns:240px 1fr;gap:14px}.m8bd table{border-collapse:collapse;width:100%;background:#fff}.m8bd td,.m8bd th{border:1px solid #cbd5e1;padding:5px 6px;font-size:14px}.m8bd th{background:#dcfce7}.m8bd input{width:56px;font:700 15px system-ui;padding:3px}.m8bd svg{width:100%;background:#fff;border-radius:12px;border:1px solid #e2e8f0}@media(max-width:620px){.m8bd .g{grid-template-columns:1fr}}</style>
    <div class="sim-ctl">${_seg('t',[['col','📊 Cột'],['pie','🥧 Quạt tròn'],['line','📈 Đường']],'col')}${_seg('lb',[['n','Nhãn: số'],['p','Nhãn: %'],['x','Không nhãn']],'n')}</div>
    <div class="g"><table><tr><th>Nội dung</th><th>Số HS</th></tr>${D.map((d,i)=>`<tr><td><span style="color:${COL[i]}">■</span> ${d[0]}</td><td><input type="number" min="0" max="40" value="${d[1]}" data-i="${i}"></td></tr>`).join('')}<tr><td><b>Tổng</b></td><td class="tot"></td></tr></table><svg viewBox="0 0 420 260"></svg></div></div>`));
  let t='col', lb='n'; const sv=e.querySelector('svg');
  function draw(){const tot=D.reduce((s,d)=>s+d[1],0)||1; e.querySelector('.tot').textContent=tot;
    const L=v=>lb==='x'?'':lb==='p'?Math.round(v*100/tot)+'%':v; let h=`<text x="210" y="20" text-anchor="middle" font-weight="700" font-size="14">Nội dung Tin học học sinh quan tâm</text>`;
    const mx=Math.max(...D.map(d=>d[1]),1);
    if(t==='pie'){let a=-Math.PI/2; D.forEach((d,i)=>{const s=d[1]/tot*2*Math.PI, x1=150+90*Math.cos(a),y1=140+90*Math.sin(a),a2=a+s,x2=150+90*Math.cos(a2),y2=140+90*Math.sin(a2),m=a+s/2;
      if(d[1]>0) h+=`<path d="M150 140 L${x1} ${y1} A90 90 0 ${s>Math.PI?1:0} 1 ${x2} ${y2}Z" fill="${COL[i]}" stroke="#fff" stroke-width="2"/><text x="${150+60*Math.cos(m)}" y="${145+60*Math.sin(m)}" fill="#fff" font-weight="700" font-size="13" text-anchor="middle">${L(d[1])}</text>`; a=a2;});
      D.forEach((d,i)=>h+=`<rect x="270" y="${70+i*24}" width="14" height="14" fill="${COL[i]}"/><text x="290" y="${82+i*24}" font-size="12">${d[0]}</text>`);}
    else { h+='<line x1="40" y1="220" x2="410" y2="220" stroke="#64748b"/><line x1="40" y1="30" x2="40" y2="220" stroke="#64748b"/>'; const w=370/D.length; let pts=[];
      D.forEach((d,i)=>{const hh=d[1]/mx*170, x=40+i*w; if(t==='col') h+=`<rect x="${x+w*.2}" y="${220-hh}" width="${w*.6}" height="${hh}" fill="${COL[i]}" rx="4"><animate attributeName="height" from="0" to="${hh}" dur=".4s"/><animate attributeName="y" from="220" to="${220-hh}" dur=".4s"/></rect>`;
        pts.push([x+w/2,220-hh]); h+=`<text x="${x+w/2}" y="${214-hh}" text-anchor="middle" font-weight="700" font-size="13">${L(d[1])}</text><text x="${x+w/2}" y="238" text-anchor="middle" font-size="10">${d[0].split(' ').slice(0,2).join(' ')}</text>`;});
      if(t==='line') h+=`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#2563eb" stroke-width="3"/>`+pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#2563eb"/>`).join('');}
    sv.innerHTML=h;}
  _wireSeg(e,(n,v)=>{if(n==='t')t=v; else lb=v; FX.play('whoosh'); draw();});
  e.querySelectorAll('input').forEach(i=>i.oninput=()=>{D[+i.dataset.i][1]=Math.max(0,+i.value||0); FX.play('tick'); draw();});
  draw(); return e;
};

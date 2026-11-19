/* Tin học 9 · Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: nhóm An, Minh, Khoa hoàn thiện sơ đồ LuocSu.emm và bài trình chiếu LuocSuMayTinh.
   Mô phỏng: t9kinhphi (Bảng tính kinh phí mini), t9dongtg (Dựng sơ đồ dòng thời gian), t9chonminhhoa (Chọn công cụ trực quan). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Kinh phí triển lãm',hd:'Khởi động · Nhiệm vụ 1 · 8 phút',code:'1',phut:8,
  story:'<p>Trước khi đính kèm <code>KinhPhi.xlsx</code> vào sơ đồ tư duy, nhóm kiểm tra lại bảng tính. Sửa <b>số lượng</b>, <b>đơn giá</b> và xem <b>Thành tiền</b> tự tính.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9kinhphi'},
      {id:'k1',type:'single',q:'Với dữ liệu ban đầu, tổng chi phí cho “Lược sử công cụ tính toán” là:',opts:['72 000 đồng','122 000 đồng','64 000 đồng','130 000 đồng'],ok:1},
      {id:'k2',type:'single',q:'Ô Thành tiền nên dùng:',opts:['Gõ tay con số','Công thức = Số lượng × Đơn giá','Chèn ảnh','Để trống'],ok:1}],
  key:['Bảng tính dùng <b>công thức</b> để tự tính lại khi dữ liệu thay đổi.']},

 {t:'Đính kèm và trình bày sơ đồ tư duy',hd:'Hình thành kiến thức · Nhiệm vụ 1–2 · 10 phút',code:'2.1',phut:10,
  story:'<p>Trong MindMaple Lite: tệp trên máy dùng <b>Insert/Attachment</b>; video trên Internet dùng <b>Insert/Hyperlink</b>. Sau đó nhóm trưởng trình bày trước nhóm.</p>',
  qs:[{id:'h1',type:'sort',q:'Dữ liệu nào dùng lệnh nào?',cols:{c0:'Insert/Attachment',c1:'Insert/Hyperlink'},items:[{t:'KinhPhi.xlsx trên máy',a:'c0'},{t:'Ảnh Pascaline.jpg trên máy',a:'c0'},{t:'Video ENIAC trên YouTube',a:'c1'},{t:'TieuSu.docx trên máy',a:'c0'},{t:'Trang web bảo tàng máy tính',a:'c1'}]},
      {id:'h2',type:'single',q:'Thứ tự đúng để đính kèm tệp vào nhánh:',opts:['Chọn nhánh → Insert/Attachment/Attachment → chọn tệp, Open → biểu tượng tệp hiện ở nhánh','Chọn tệp → Open → chọn nhánh','Insert/Hyperlink → chọn tệp','Lưu sơ đồ → chọn nhánh → chọn tệp'],ok:0}],
  key:['Tệp trên máy: <b>Insert/Attachment</b>; liên kết web: <b>Insert/Hyperlink</b>.']},

 {t:'Sơ đồ dòng thời gian',hd:'Hình thành kiến thức · Nhiệm vụ 3 · 10 phút',code:'2.2',phut:10,
  story:'<p>Bài trình chiếu “Lược sử công cụ tính toán” cần một <b>sơ đồ dòng thời gian</b>. Hãy đặt các máy tính đúng mốc năm.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9dongtg'},
      {id:'h3',type:'match',q:'Ghép mốc năm với máy tính.',items:['1642','1833','1945','1973','2007'],opts:['ENIAC','iPhone','Pascaline','Máy phân tích của Babbage','Micral (máy vi tính)'],ok:[2,3,0,4,1]}],
  key:['<b>Sơ đồ dòng thời gian</b> trình bày tiến trình lịch sử rõ ràng, dễ nhớ.']},

 {t:'Chọn công cụ trực quan',hd:'Hình thành kiến thức · Nhiệm vụ 3 · 7 phút',code:'2.3',phut:7,
  story:'<p>Mỗi nội dung hợp với một kiểu minh hoạ. Thử chọn và xem bản xem trước.</p>',
  qs:[{id:'s3',type:'sim',sim:'t9chonminhhoa'},
      {id:'h4',type:'match',q:'Nội dung nào hợp với công cụ trực quan nào?',items:['Các mốc phát minh máy tính','So sánh kinh phí các nhóm','Ý tưởng, phân công nhiệm vụ','Hình dáng máy Pascaline'],opts:['Biểu đồ cột','Ảnh chụp','Sơ đồ dòng thời gian','Sơ đồ tư duy'],ok:[2,0,3,1]}],
  key:['Chọn minh hoạ <b>truyền tải tốt nhất</b> thông điệp: đơn giản, rõ ràng.']},

 {t:'Rà soát bài trình chiếu',hd:'Luyện tập · 4 phút',code:'3',phut:4,
  story:'<p>Một bạn đóng vai người trình bày, cả nhóm rà soát.</p>',
  qs:[{id:'l1',type:'tf',q:'Khi rà soát, nhóm cần sửa:',items:[{t:'Ảnh mờ thay bằng ảnh rõ nét',a:'T'},{t:'Chữ quá nhỏ, nhìn từ xa không rõ',a:'T'},{t:'Mốc năm sai trên sơ đồ dòng thời gian',a:'T'},{t:'Thêm thật nhiều chữ cho đầy trang',a:'F'}]}],
  key:['Trang chiếu: <b>ít chữ, ảnh rõ, mốc đúng</b>, có <b>nguồn</b>.']},

 {t:'Các thế hệ máy tính',hd:'Vận dụng · 3 phút',code:'4',phut:3,
  story:'<p>Bổ sung vào bài trình chiếu đặc điểm các thế hệ máy tính.</p>',
  qs:[{id:'v1',type:'match',q:'Ghép thế hệ với linh kiện chính.',items:['Thế hệ 1','Thế hệ 2','Thế hệ 3','Thế hệ 4'],opts:['Transistor','Bộ vi xử lí','Đèn điện tử chân không','Mạch tích hợp IC'],ok:[2,0,3,1]}],
  key:['Mỗi thế hệ máy tính gắn với một <b>linh kiện</b> chính.']},

 {t:'Tổng kết',hd:'Tổng kết · 3 phút',phut:3,
  story:'<p>Sơ đồ tư duy để <b>lên ý tưởng, phân công</b>; bài trình chiếu để <b>trình bày</b>.</p>',
  qs:[{id:'t1',type:'single',q:'Để trình bày tiến trình phát minh máy tính, nên dùng:',opts:['Bảng số liệu dài','Sơ đồ dòng thời gian','Một đoạn văn dài','Biểu đồ tròn'],ok:1},
      {id:'t2',type:'text',short:1,q:'Em đã đóng góp gì cho sản phẩm của nhóm?',ans:'Tự đánh giá.'}],
  key:['Công cụ trực quan phù hợp giúp <b>trao đổi, hợp tác</b> hiệu quả.']}
];

const GHIBAI={so:'Bài 8:',ten:'THỰC HÀNH: SỬ DỤNG CÔNG CỤ TRỰC QUAN',muc:[
 {step:2,h:'Sơ đồ tư duy',it:['Tệp trên máy: <b>Insert/Attachment</b>; video, trang web: <b>Insert/Hyperlink</b>.']},
 {step:3,h:'Bài trình chiếu',it:['<b>Sơ đồ dòng thời gian</b> cho tiến trình lịch sử; ảnh, video minh hoạ.','Chọn minh hoạ <b>đơn giản, rõ ràng</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9kinhphi=function(){
  const R=[['In ảnh màu',8,8000],['In nội dung chú thích',8,1000],['Văn phòng phẩm',1,50000]];
  const e=_el(_shell('Bảng tính kinh phí','Sửa ô <b>màu vàng</b> (Số lượng, Đơn giá). Cột <b>Thành tiền</b> và <b>Tổng</b> tính bằng công thức.',
   `<div class="m-t9kp"><style>.m-t9kp table{border-collapse:collapse;width:100%;max-width:640px;font:15px Consolas,monospace}.m-t9kp td,.m-t9kp th{border:1px solid #cbd5e1;padding:6px 8px}
   .m-t9kp th{background:#e2e8f0}.m-t9kp .rh{background:#f1f5f9;text-align:center;color:#64748b}.m-t9kp input{width:90px;font:inherit;border:0;background:#fef9c3;padding:3px}
   .m-t9kp td.f{background:#ecfdf5;font-weight:700;cursor:pointer}.m-t9kp .fx{font:14px Consolas,monospace;border:1px solid #cbd5e1;padding:6px 8px;margin:6px 0;max-width:640px;background:#fff}</style>
   <div class="fx">fx: (bấm vào một ô xanh để xem công thức)</div>
   <table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><td class="rh">1</td><th>Nội dung</th><th>Số lượng</th><th>Đơn giá</th><th>Thành tiền</th></tr>
   ${R.map((r,i)=>`<tr><td class="rh">${i+2}</td><td>${r[0]}</td><td><input data-r="${i}" data-c="1" value="${r[1]}"></td><td><input data-r="${i}" data-c="2" value="${r[2]}"></td><td class="f" data-fx="=B${i+2}*C${i+2}"></td></tr>`).join('')}
   <tr><td class="rh">5</td><th colspan="3" style="text-align:right">Tổng</th><td class="f tot" data-fx="=SUM(D2:D4)"></td></tr></table></div>`));
  const fmt=n=>n.toLocaleString('vi-VN');
  const calc=()=>{let s=0;e.querySelectorAll('tr').forEach(tr=>{const i=tr.querySelectorAll('input');if(i.length){const v=(+i[0].value||0)*(+i[1].value||0);s+=v;tr.querySelector('.f').textContent=fmt(v);}});e.querySelector('.tot').textContent=fmt(s);};
  e.querySelectorAll('input').forEach(i=>i.oninput=()=>{calc();FX.play('tick');});
  e.querySelectorAll('td.f').forEach(td=>td.onclick=()=>{e.querySelector('.fx').textContent='fx: '+td.dataset.fx;FX.play('ding');});
  calc();return e;
};
SIMS_BAI.t9dongtg=function(){
  const M=[[1642,'🧮 Pascaline'],[1833,'⚙️ Máy phân tích (Babbage)'],[1945,'🏢 ENIAC'],[1959,'🔌 IBM 7090'],[1964,'🖥️ IBM System/360'],[1973,'💻 Micral'],[2007,'📱 iPhone']];
  const e=_el(_shell('Dựng sơ đồ dòng thời gian','Bấm các máy tính theo thứ tự <b>từ cũ nhất đến mới nhất</b>. Chúng sẽ xếp lên dòng thời gian.',
   `<div class="m-t9tg"><style>.m-t9tg .pool{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}.m-t9tg .pool button{font:700 15px system-ui;padding:10px 12px;border-radius:12px;border:2px solid #cbd5e1;background:#fff;cursor:pointer}
   .m-t9tg .pool button.used{visibility:hidden}.m-t9tg .line{position:relative;display:flex;gap:6px;overflow-x:auto;padding:30px 4px 6px;border-top:6px solid #1d4e89}
   .m-t9tg .it{min-width:110px;background:#e7eff9;border-radius:12px;padding:8px;text-align:center;font-weight:700;position:relative;animation:m9tg .4s}.m-t9tg .it b{display:block;color:#e2932b;font-size:18px}
   .m-t9tg .it:before{content:'';position:absolute;top:-30px;left:50%;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:#e2932b}@keyframes m9tg{from{transform:translateY(-20px);opacity:0}}
   .m-t9tg .kq{font-weight:700;margin-top:8px}</style><div class="pool"></div><div class="line"></div><p class="kq"></p><button class="btn ghost rs">↺ Xếp lại</button></div>`));
  let k=0,err=0;
  const init=()=>{k=0;err=0;e.querySelector('.line').innerHTML='';e.querySelector('.kq').textContent='';const sh=M.map((m,i)=>i).sort(()=>Math.random()-.5);
    e.querySelector('.pool').innerHTML=sh.map(i=>`<button data-i="${i}">${M[i][1]}</button>`).join('');
    e.querySelectorAll('.pool button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i===k){b.classList.add('used');e.querySelector('.line').insertAdjacentHTML('beforeend',`<div class="it"><b>${M[i][0]}</b>${M[i][1]}</div>`);k++;FX.play(k===M.length?'sparkle':'ding');
        e.querySelector('.kq').textContent=k===M.length?'🎉 Hoàn thành dòng thời gian! (sai '+err+' lần)':'Đúng! Tiếp theo là máy nào?';}
      else{err++;FX.play('tick');e.querySelector('.kq').textContent='✗ Chưa đúng: còn máy cũ hơn '+M[i][1]+'.';}});};
  e.querySelector('.rs').onclick=init;init();return e;
};
SIMS_BAI.t9chonminhhoa=function(){
  const C=[['Các mốc phát minh máy tính','tg'],['So sánh kinh phí 3 nhóm','cot'],['Ý tưởng, phân công nhiệm vụ','sd'],['Hình dáng máy Pascaline','anh']];
  const T={tg:'📅 Dòng thời gian',cot:'📊 Biểu đồ cột',sd:'🗺️ Sơ đồ tư duy',anh:'🖼️ Ảnh chụp'};
  const PV={tg:'<div style="display:flex;gap:6px;border-top:5px solid #1d4e89;padding-top:8px">1642 · 1833 · 1945 · 1973 · 2007</div>',
   cot:'<div style="display:flex;gap:10px;align-items:flex-end;height:90px">'+[60,85,40].map((h,i)=>`<div style="width:40px;height:${h}px;background:#2f6fb5;border-radius:6px 6px 0 0;color:#fff;text-align:center;font-size:12px">N${i+1}</div>`).join('')+'</div>',
   sd:'<div style="text-align:center">🟦 Triển lãm<br>↙️ ⬇️ ↘️<br>An · Minh · Khoa</div>',anh:'<div style="font-size:60px;text-align:center">🧮</div>'};
  const e=_el(_shell('Chọn công cụ trực quan','Chọn <b>nội dung</b> và <b>công cụ</b>, bấm <b>👁️ Xem trước</b>.',
   `<div class="m-t9cm"><style>.m-t9cm .pv{border:2px solid #c7d6ea;border-radius:14px;padding:14px;min-height:120px;background:#fff;max-width:420px}.m-t9cm .kq{font-weight:700;margin-top:8px}</style>
   <div class="sim-ctl"><div><b>Nội dung</b><br>${_seg('c',C.map((c,i)=>[''+i,c[0]]),'0')}</div><div><b>Công cụ</b><br>${_seg('t',Object.entries(T),'tg')}</div><button class="btn acc run">👁️ Xem trước</button></div>
   <div class="pv"></div><p class="kq"></p></div>`));
  const s={c:'0',t:'tg'};_wireSeg(e,(n,v)=>s[n]=v);
  e.querySelector('.run').onclick=()=>{const ok=C[+s.c][1]===s.t;e.querySelector('.pv').innerHTML=PV[s.t];e.querySelector('.kq').textContent=ok?'✅ Rất hợp! Thông điệp rõ ràng.':'🤔 Chưa hợp lắm. Nội dung này nên dùng '+T[C[+s.c][1]]+'.';FX.play(ok?'ding':'tick');};
  return e;
};

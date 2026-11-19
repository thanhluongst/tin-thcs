/* Tin học 9 · Bài 3. Thực hành: Đánh giá chất lượng thông tin · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: em tìm thông tin để chọn 3 nguyện vọng THPT.
   Mô phỏng: t9timkiem (Máy tìm kiếm thử: từ khoá → kết quả → đánh giá), t9nguyenvong (Xếp 3 nguyện vọng theo điểm dự kiến). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Tìm thông tin chọn trường',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Sắp hết lớp 9, em cần chọn <b>3 nguyện vọng</b> vào lớp 10. Gõ “trường THPT” lên mạng ra hàng triệu kết quả. Bắt đầu từ đâu?</p>',
  qs:[{id:'k1',type:'tf',q:'Để tìm được thông tin tốt, em nên…',items:[{t:'Xác định rõ mục đích và yêu cầu của thông tin cần tìm',a:'T'},{t:'Gõ từ khoá thật ngắn, chung chung',a:'F'},{t:'Đánh giá chất lượng thông tin trước khi dùng',a:'T'},{t:'Chỉ đọc kết quả đầu tiên',a:'F'}]}],
  key:['Xác định <b>mục đích, yêu cầu</b> → tìm kiếm → <b>đánh giá</b> → sử dụng.']},

 {t:'Nhiệm vụ 1: Từ khoá và nguồn tin',hd:'Hình thành kiến thức · Nhiệm vụ 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Thử các <b>từ khoá</b> khác nhau trong máy tìm kiếm mô phỏng. Từ khoá càng <b>cụ thể</b>, kết quả càng sát. Để ý <b>tên miền</b> của từng kết quả.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9timkiem'},
      {id:'h1',type:'single',q:'Từ khoá nào cho kết quả sát nhất?',opts:['trường','điểm chuẩn','điểm chuẩn lớp 10 THPT Lê Xoay 2026','trường học tốt'],ok:2},
      {id:'h2',type:'single',q:'Trang web của các Sở Giáo dục và Đào tạo thường có tên miền dạng:',opts:['.com','.edu.vn','.blogspot.com','.net'],ok:1},
      {id:'h3',type:'sort',q:'Thông tin nào <b>cần tìm</b> để chọn trường?',cols:{c0:'Cần tìm',c1:'Không cần'},items:[{t:'Điểm chuẩn các năm gần đây',a:'c0'},{t:'Chỉ tiêu tuyển sinh',a:'c0'},{t:'Màu sơn cổng trường',a:'c1'},{t:'Khoảng cách từ nhà đến trường',a:'c0'},{t:'Tên ca sĩ từng học ở trường',a:'c1'}]}],
  key:['Dùng từ khoá <b>cụ thể</b>; ưu tiên nguồn <b>có thẩm quyền</b> (.edu.vn, trang của trường).','Câu trả lời của <b>AI</b> giúp khoanh vùng nhưng phải <b>kiểm chứng</b>.']},

 {t:'Nhiệm vụ 2: Đánh giá và chọn 3 nguyện vọng',hd:'Hình thành kiến thức · Nhiệm vụ 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Dựa vào thông tin đã đánh giá, hãy xếp <b>3 nguyện vọng</b>: kéo thanh <b>điểm dự kiến</b> của em và xem trường nào <b>khả thi</b>.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9nguyenvong'},
      {id:'h4',type:'match',q:'Mỗi cách kiểm tra giúp đánh giá tiêu chí nào?',items:['Xem ngày đăng tin','Đối chiếu với trang của Sở và của trường','Kiểm tra đã có đủ điểm chuẩn, chỉ tiêu, hạn đăng kí','Thông tin có giúp em quyết định không'],
       opts:['Tính đầy đủ','Tính sử dụng được','Tính mới','Tính chính xác'],ok:[2,3,0,1]},
      {id:'h5',type:'single',q:'Nguyên tắc xếp nguyện vọng hợp lí là:',opts:['Cả 3 trường đều có điểm chuẩn cao hơn nhiều so với sức học','Trường mơ ước ở NV1, trường chắc chắn đỗ ở NV cuối','Chọn ngẫu nhiên','Chọn trường bạn thân chọn'],ok:1}],
  key:['Các bước: <b>mục đích</b> → <b>tìm kiếm, lưu trữ</b> → <b>đánh giá</b> → <b>lựa chọn, sắp xếp</b>.']},

 {t:'Môn học ở THPT',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Tra cứu Chương trình GDPT 2018: ở THPT, môn nào bắt buộc, môn nào được tự chọn?</p>',
  qs:[{id:'l1',type:'sort',q:'Môn bắt buộc hay lựa chọn ở THPT?',cols:{c0:'Bắt buộc',c1:'Lựa chọn'},items:[{t:'Toán',a:'c0'},{t:'Ngữ văn',a:'c0'},{t:'Lịch sử',a:'c0'},{t:'Tin học',a:'c1'},{t:'Vật lí',a:'c1'},{t:'Địa lí',a:'c1'}]},
      {id:'l2',type:'single',q:'Nguồn đáng tin nhất để kiểm tra danh sách môn học THPT:',opts:['Bình luận trên mạng xã hội','Văn bản của Bộ GD&ĐT','Một video giải trí','Lời kể của bạn'],ok:1}],
  key:['Thông tin về chương trình học: tra ở <b>văn bản của Bộ GD&ĐT</b>.']},

 {t:'Dàn ý bài trình chiếu',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Lập dàn ý bài trình chiếu “Chọn môi trường học tập sau THCS”.</p>',
  qs:[{id:'v1',type:'text',q:'Ghi 4–5 trang chiếu dự kiến (mỗi trang một dòng).',ans:'Tiêu đề; Các lựa chọn sau THCS; Tiêu chí lựa chọn; Thông tin các trường (nguồn); 3 nguyện vọng của em và lí do.'}],
  key:['Bài trình chiếu cần ghi rõ <b>nguồn</b> thông tin đã kiểm chứng.']},

 {t:'Tổng kết',hd:'Tổng kết · 3 phút',phut:3,
  story:'<p>Thông tin tốt + đánh giá kĩ = lựa chọn sáng suốt.</p>',
  qs:[{id:'t1',type:'single',q:'Thứ tự đúng các bước tìm và dùng thông tin chọn trường:',opts:['Đánh giá → tìm kiếm → chọn → xác định mục đích','Xác định mục đích → tìm kiếm, lưu trữ → đánh giá → lựa chọn','Tìm kiếm → chọn → đánh giá','Chọn → tìm kiếm → đánh giá'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['Đánh giá thông tin theo <b>4 tiêu chí</b> trước khi ra quyết định.']}
];

const GHIBAI={so:'Bài 3:',ten:'THỰC HÀNH: ĐÁNH GIÁ CHẤT LƯỢNG THÔNG TIN',muc:[
 {step:2,h:'Tìm kiếm',it:['Từ khoá <b>cụ thể</b>; nguồn <b>có thẩm quyền</b> (.edu.vn); kết quả từ AI phải <b>kiểm chứng</b>.']},
 {step:3,h:'Các bước',it:[],flow:['Mục đích, yêu cầu','Tìm kiếm, lưu trữ','Đánh giá (4 tiêu chí)','Lựa chọn']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9timkiem=function(){
  const K={a:['trường',[['Trường – Wikipedia','vi.wikipedia.org','Từ chỉ nơi học tập…',0],['Trường mầm non Hoa Sen','hoasen.edu.vn','Tuyển sinh mầm non',0],['Trường lái xe ABC','laixe-abc.com','Học lái xe',0]]],
   b:['điểm chuẩn',[['Điểm chuẩn đại học 2019','tuyensinh247.com','Điểm chuẩn ĐH…',0],['Điểm chuẩn lớp 10 Hà Nội','hanoi.edu.vn','Hà Nội, không phải tỉnh em',0],['Điểm chuẩn là gì?','hoidap.vn','Giải thích khái niệm',0]]],
   c:['điểm chuẩn lớp 10 THPT Lê Xoay 2026',[['Công bố điểm chuẩn lớp 10 năm 2026','phutho.edu.vn','Sở GD&ĐT Phú Thọ – 07/2026',1],['Thông báo tuyển sinh 2026','thpt-lexoay.edu.vn','Trang của trường – 06/2026',1],['Điểm chuẩn Lê Xoay “siêu cao”??','facebook.com/hoinhom','Bài đăng nhóm, không rõ nguồn',0]]],
   d:['🤖 Hỏi AI: các trường THPT gần Vĩnh Tường',[['AI: “Có THPT Lê Xoay, THPT Vĩnh Tường, THPT Đội Cấn…”','công cụ AI','Cần kiểm chứng: có thể cũ hoặc sai',0]]]};
  const e=_el(_shell('Máy tìm kiếm thử','Chọn một <b>từ khoá</b>, bấm <b>🔎 Tìm</b>. Chấm kết quả <b>⭐ Hữu ích</b> hoặc <b>👎 Bỏ qua</b>.',
   `<div class="m-t9tk"><style>.m-t9tk .bx{display:flex;gap:8px;align-items:center;border:2px solid #c7d6ea;border-radius:99px;padding:6px 6px 6px 16px;background:#fff;font-weight:600;margin:8px 0}
   .m-t9tk .bx span{flex:1}.m-t9tk .r{border-radius:12px;padding:10px 12px;margin:6px 0;background:#fff;border:1.5px solid #e2e8f0}.m-t9tk .r a{color:#1a0dab;font-weight:700;text-decoration:none}
   .m-t9tk .r .u{color:#15803d;font-size:13px}.m-t9tk .r button{border:0;border-radius:8px;padding:5px 9px;margin:4px 4px 0 0;cursor:pointer;font-weight:700;background:#eef2ff}
   .m-t9tk .r.ok{background:#f0fdf4;border-color:#16a34a}.m-t9tk .r.bad{background:#fef2f2;border-color:#dc2626}</style>
   <div class="sim-ctl">${_seg('k',Object.entries(K).map(([k,v])=>[k,v[0].length>22?v[0].slice(0,22)+'…':v[0]]),'a')}</div>
   <div class="bx"><span class="kw">🔎 ${K.a[0]}</span><button class="btn acc go">🔎 Tìm</button></div><div class="rs"></div></div>`));
  let k='a';_wireSeg(e,(n,v)=>{k=v;e.querySelector('.kw').textContent='🔎 '+K[v][0];});
  e.querySelector('.go').onclick=()=>{FX.play('whoosh');e.querySelector('.rs').innerHTML=K[k][1].map((r,i)=>`<div class="r" data-i="${i}"><a>${r[0]}</a><div class="u">${r[1]}</div><small>${r[2]}</small><div><button class="y">⭐ Hữu ích</button><button class="n">👎 Bỏ qua</button> <i class="f"></i></div></div>`).join('');
    e.querySelectorAll('.r').forEach(d=>d.querySelectorAll('button').forEach(b=>b.onclick=()=>{const r=K[k][1][+d.dataset.i],ok=(b.classList.contains('y')?1:0)===r[3];
      d.classList.remove('ok','bad');d.classList.add(ok?'ok':'bad');d.querySelector('.f').textContent=ok?'✓ Chuẩn!':(r[3]?'✗ Đây là nguồn chính thức, đúng thứ em cần':'✗ Nguồn này chưa đáp ứng (không đúng mục đích / chưa tin cậy)');FX.play(ok?'ding':'tick');}));};
  return e;
};
SIMS_BAI.t9nguyenvong=function(){
  const S=[['THPT Chuyên',38.5,'🏆'],['THPT Lê Xoay',34,'🏫'],['THPT Vĩnh Tường',29.5,'🏫'],['THPT Đội Cấn',25,'🏫'],['Trung tâm GDNN–GDTX',0,'🛠️']];
  const e=_el(_shell('Xếp 3 nguyện vọng','Kéo thanh <b>điểm dự kiến</b> (thang 40). Bấm vào trường để thêm vào NV1 → NV2 → NV3. Bấm <b>✔ Kiểm tra</b>.',
   `<div class="m-t9nv"><style>.m-t9nv input[type=range]{width:100%;max-width:420px}.m-t9nv .d{font:800 26px system-ui;color:#1d4e89}
   .m-t9nv .s{display:flex;justify-content:space-between;align-items:center;gap:8px;border-radius:12px;padding:10px 12px;margin:6px 0;cursor:pointer;border:2px solid transparent;font-weight:600}
   .m-t9nv .s:hover{border-color:#1d4e89}.m-t9nv .g{background:#dcfce7}.m-t9nv .y{background:#fef9c3}.m-t9nv .rr{background:#fee2e2}
   .m-t9nv .nv{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.m-t9nv .nv span{border:2px dashed #94a3b8;border-radius:10px;padding:8px 12px;min-width:120px;font-weight:700}
   .m-t9nv .kq{font-weight:700}</style>
   <div>Điểm dự kiến của em: <span class="d">32</span></div><input type="range" min="15" max="40" step="0.5" value="32">
   <div class="ls"></div><div class="nv"><span>NV1: —</span><span>NV2: —</span><span>NV3: —</span></div>
   <button class="btn acc ck">✔ Kiểm tra</button> <button class="btn ghost rs">↺ Làm lại</button><p class="kq"></p></div>`));
  let d=32,nv=[];const sl=e.querySelector('input'),ls=e.querySelector('.ls');
  const lv=c=>c===0?'g':d>=c+1.5?'g':d>=c-1?'y':'rr';
  const draw=()=>{e.querySelector('.d').textContent=d;ls.innerHTML=S.map((s,i)=>`<div class="s ${lv(s[1])}" data-i="${i}"><span>${s[2]} ${s[0]}</span><span>${s[1]?'Điểm chuẩn '+s[1]:'Xét tuyển'} · ${{g:'✅ Khả thi',y:'🟡 Cạnh tranh',rr:'⛔ Khó đỗ'}[lv(s[1])]}</span></div>`).join('');
    ls.querySelectorAll('.s').forEach(x=>x.onclick=()=>{const i=+x.dataset.i;if(nv.length<3&&!nv.includes(i)){nv.push(i);FX.play('tick');drawNv();}});};
  const drawNv=()=>e.querySelectorAll('.nv span').forEach((x,j)=>x.textContent='NV'+(j+1)+': '+(nv[j]!==undefined?S[nv[j]][0]:'—'));
  sl.oninput=()=>{d=+sl.value;draw();};
  e.querySelector('.rs').onclick=()=>{nv=[];drawNv();e.querySelector('.kq').textContent='';};
  e.querySelector('.ck').onclick=()=>{const kq=e.querySelector('.kq');if(nv.length<3){kq.textContent='Hãy chọn đủ 3 nguyện vọng.';return;}
    const c=nv.map(i=>S[i][1]||0),sorted=c.every((x,j)=>j===0||x<=c[j-1]),safe=lv(c[2])==='g';
    kq.innerHTML=(sorted?'✓ Thứ tự từ cao xuống thấp. ':'✗ Nên xếp trường điểm chuẩn cao hơn lên trước. ')+(safe?'✓ NV3 là lựa chọn an toàn.':'✗ NV3 nên là trường em chắc chắn đỗ.');FX.play(sorted&&safe?'sparkle':'tick');};
  draw();return e;
};

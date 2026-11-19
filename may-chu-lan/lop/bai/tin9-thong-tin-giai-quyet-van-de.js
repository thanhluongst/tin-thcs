/* Tin học 9 · Bài 2. Thông tin trong giải quyết vấn đề · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: An chọn trường THPT, tin vào trang web cũ Minh gửi.
   Mô phỏng: t9nguon (Soi nguồn tin), t9tieuchi (Máy đo chất lượng thông tin – 4 tiêu chí). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Trang web cũ của Minh',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p><b>Minh</b> gửi An đường link về điểm chuẩn trường THPT. An tin ngay và đăng kí. Nhưng trang đó ghi <i>“Năm học 2001–2002”</i>!</p><p>Hãy <b>soi từng nguồn tin</b> trong mô phỏng: xem ngày đăng, nơi đăng rồi quyết định có nên tin không.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9nguon'},
      {id:'k1',type:'single',q:'Vì sao An chọn trường chưa hợp lí?',opts:['Vì An hỏi bạn Minh','Vì thông tin đã cũ, chưa được kiểm chứng','Vì trang web có nhiều hình ảnh','Vì An đọc trên máy tính'],ok:1},
      {id:'k2',type:'single',q:'Để chọn trường, nguồn nào <b>đáng tin cậy nhất</b>?',opts:['Bài đăng của một KOL','Diễn đàn ẩn danh','Trang web của Sở Giáo dục và Đào tạo','Tin nhắn lan truyền'],ok:2}],
  key:['Thông tin trên Internet <b>nhiều</b> nhưng không phải tin nào cũng <b>đáng tin</b>; ưu tiên nguồn <b>có thẩm quyền</b>.']},

 {t:'Nguồn tin đáng tin cậy',hd:'Hình thành kiến thức · Hoạt động 1 · 9 phút',code:'2.1',phut:9,
  story:'<p>An bắt đầu lại: lần này An xem kĩ <b>ai</b> đưa tin, <b>khi nào</b>, và <b>đối chiếu</b> nhiều nguồn.</p>',
  qs:[{id:'h1',type:'sort',q:'Nguồn tin đáng tin cậy hay cần kiểm chứng?',cols:{c0:'Đáng tin cậy',c1:'Cần kiểm chứng'},items:[
        {t:'Trang web của Sở GD&ĐT (edu.vn)',a:'c0'},{t:'Trang web chính thức của trường THPT',a:'c0'},{t:'Bài quảng cáo của KOL',a:'c1'},
        {t:'Tin nhắn “chia sẻ ngay” trên mạng xã hội',a:'c1'},{t:'Báo chính thống',a:'c0'},{t:'Câu trả lời của công cụ AI',a:'c1'}]},
      {id:'h2',type:'single',q:'Thấy KOL quảng cáo một trung tâm luyện thi “đỗ 100%”, em nên làm gì?',opts:['Tin ngay vì KOL nổi tiếng','Kiểm chứng ở nguồn chính thống trước khi tin','Chia sẻ cho cả lớp','Đăng kí ngay kẻo hết chỗ'],ok:1}],
  key:['Nguồn đáng tin: <b>cơ quan có thẩm quyền</b>, trang chính thức, báo chính thống. Tin từ KOL, mạng xã hội, AI cần <b>kiểm chứng</b>.']},

 {t:'Bốn tiêu chí của thông tin có chất lượng',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Thông tin <b>có chất lượng</b> phải đạt đủ 4 tiêu chí. Dùng “máy đo” để chấm từng mẩu tin An tìm được.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9tieuchi'},
      {id:'h3',type:'match',q:'Mỗi thông tin kém chất lượng vi phạm tiêu chí nào?',items:['Điểm chuẩn của năm 2002','Ghi sai địa chỉ trường','Chỉ có điểm chuẩn, thiếu hạn đăng kí','Bài viết về lịch sử trường khi em cần điểm chuẩn'],
       opts:['Tính chính xác','Tính sử dụng được','Tính mới','Tính đầy đủ'],ok:[2,0,3,1]},
      {id:'h4',type:'single',q:'An không để ý <b>thời gian đăng kí nguyện vọng</b>. Thông tin An có vi phạm tiêu chí nào?',opts:['Tính mới','Tính chính xác','Tính đầy đủ','Tính sử dụng được'],ok:2}],
  key:['Bốn tiêu chí: <b>mới</b> – <b>chính xác</b> – <b>đầy đủ</b> – <b>sử dụng được</b>.','Thiếu một tiêu chí có thể dẫn đến <b>quyết định sai</b>.']},

 {t:'Số điện thoại nông trại',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Lớp muốn đi tham quan nông trại. <b>An</b> lấy số điện thoại trên trang web cũ của nông trại (đã đổi số). <b>Minh</b> hỏi trực tiếp chủ nông trại và nhận số mới.</p>',
  qs:[{id:'l1',type:'tf',q:'Thông tin số điện thoại <b>của An</b>:',items:[{t:'Có tính mới',a:'F'},{t:'Có tính chính xác',a:'F'},{t:'Có tính sử dụng được (gọi được)',a:'F'}]},
      {id:'l2',type:'tf',q:'Thông tin số điện thoại <b>của Minh</b>:',items:[{t:'Có tính mới',a:'T'},{t:'Có tính chính xác',a:'T'},{t:'Có tính sử dụng được',a:'T'}]}],
  key:['Thông tin cũ thường kéo theo <b>sai</b> và <b>không dùng được</b>; hỏi nguồn gốc giúp có thông tin chất lượng.']},

 {t:'Máy tính điện tử đầu tiên',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Tìm trên Internet: máy tính điện tử kĩ thuật số đầu tiên trên thế giới là máy nào?</p>',
  qs:[{id:'v1',type:'single',q:'Nhiều nguồn uy tín cho biết đó là máy:',opts:['iPhone','ENIAC','Pascaline','IBM PC'],ok:1},
      {id:'v2',type:'text',q:'Ghi lại 1 nguồn em tìm được và đánh giá theo 4 tiêu chí (ngắn gọn).',ans:'Ví dụ: Bách khoa toàn thư; chính xác (đối chiếu nhiều nguồn), đầy đủ (năm 1945–1946, Mỹ, đèn điện tử), sử dụng được cho bài trình bày.'}],
  key:['Luôn <b>đối chiếu nhiều nguồn</b> trước khi dùng thông tin.']},

 {t:'Tổng kết',hd:'Tổng kết · 4 phút',phut:4,
  story:'<p>Trước khi tin và chia sẻ một thông tin, em tự hỏi 4 câu: Mới chưa? Đúng chưa? Đủ chưa? Dùng được không?</p>',
  qs:[{id:'t1',type:'multi',q:'Chọn <b>tất cả</b> tiêu chí của thông tin có chất lượng.',opts:['Tính mới','Tính chính xác','Nhiều lượt thích','Tính đầy đủ','Tính sử dụng được'],ok:[0,1,3,4]},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['Thông tin <b>chất lượng</b> giúp giải quyết vấn đề <b>đúng</b> và <b>hiệu quả</b>.']}
];

const GHIBAI={so:'Bài 2:',ten:'THÔNG TIN TRONG GIẢI QUYẾT VẤN ĐỀ',muc:[
 {step:2,h:'Nguồn thông tin',it:['Ưu tiên nguồn <b>có thẩm quyền</b>, trang chính thức; tin từ KOL, mạng xã hội, AI cần <b>kiểm chứng</b>.']},
 {step:3,h:'Thông tin có chất lượng',it:['Đạt 4 tiêu chí: <b>mới, chính xác, đầy đủ, sử dụng được</b>.','Thông tin chất lượng giúp <b>quyết định đúng</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9nguon=function(){
  const N=[['🌐','diemchuan-xua.blogspot.com','Năm học 2001–2002','Blog cá nhân',0,'Tin quá cũ, không rõ người viết'],
   ['🏛️','phutho.edu.vn','Tháng 6/2026','Sở Giáo dục và Đào tạo',1,'Cơ quan có thẩm quyền, mới cập nhật'],
   ['⭐','Trang của một KOL','Hôm qua','Bài quảng cáo có trả tiền',0,'Mục đích quảng cáo, cần kiểm chứng'],
   ['🏫','thpt-lexoay.edu.vn','Tháng 5/2026','Trang chính thức của trường',1,'Nguồn chính thức của trường'],
   ['💬','Tin nhắn “Chia sẻ ngay!!!”','Không rõ','Không rõ người gửi',0,'Không rõ nguồn, dễ là tin giả'],
   ['📰','Báo Giáo dục & Thời đại','Tháng 6/2026','Báo chính thống',1,'Báo chính thống, có thể đối chiếu']];
  const e=_el(_shell('Soi nguồn tin','Bấm <b>🔍 Soi</b> để xem nơi đăng, ngày đăng; rồi chọn <b>✅ Tin được</b> hoặc <b>⚠️ Cần kiểm chứng</b>.',
   `<div class="m-t9ng"><style>.m-t9ng .c{display:flex;gap:12px;align-items:center;border:2px solid #dbe4f0;border-radius:14px;padding:10px 12px;margin:8px 0;background:#fff}
   .m-t9ng .c .i{font-size:34px}.m-t9ng .c .m{flex:1}.m-t9ng .c .m small{display:block;color:#475569}.m-t9ng .c .x{display:none}
   .m-t9ng .c.sh .x{display:block}.m-t9ng .c button{border:0;border-radius:10px;padding:8px 10px;font-weight:700;cursor:pointer;margin:2px;background:#e0e7ff}
   .m-t9ng .c.ok{border-color:#16a34a;background:#f0fdf4}.m-t9ng .c.bad{border-color:#dc2626;background:#fef2f2}.m-t9ng .sc{font:800 20px system-ui;color:#1d4e89}</style>
   <div class="sc">Điểm: 0 / ${N.length}</div>${N.map((n,i)=>`<div class="c" data-i="${i}"><div class="i">${n[0]}</div><div class="m"><b>${n[1]}</b><small class="x">📅 ${n[2]} · 👤 ${n[3]}</small><small class="r"></small></div>
   <div><button class="so">🔍 Soi</button><button class="t">✅ Tin được</button><button class="k">⚠️ Cần kiểm chứng</button></div></div>`).join('')}</div>`));
  let sc=0;
  e.querySelectorAll('.c').forEach(c=>{const n=N[+c.dataset.i];c.querySelector('.so').onclick=()=>{c.classList.add('sh');FX.play('whoosh');};
    c.querySelectorAll('.t,.k').forEach(b=>b.onclick=()=>{if(c.dataset.x)return;c.dataset.x=1;c.classList.add('sh');const ok=(b.classList.contains('t')?1:0)===n[4];if(ok)sc++;
      c.classList.add(ok?'ok':'bad');c.querySelector('.r').innerHTML=(ok?'✓ ':'✗ ')+n[5];e.querySelector('.sc').textContent='Điểm: '+sc+' / '+N.length;FX.play(ok?'ding':'tick');});});
  return e;
};
SIMS_BAI.t9tieuchi=function(){
  const T=[['Điểm chuẩn trường A năm 2002 (blog)',[0,1,0,0]],['Điểm chuẩn + chỉ tiêu + hạn đăng kí 2026 (Sở GD&ĐT)',[1,1,1,1]],['Điểm chuẩn 2026 nhưng ghi nhầm tên trường',[1,0,0,0]],['Lịch sử thành lập trường (khi em cần điểm chuẩn)',[1,1,1,0]],['Điểm chuẩn 2026, thiếu hạn đăng kí',[1,1,0,1]]];
  const TC=['🕒 Mới','🎯 Chính xác','🧩 Đầy đủ','🛠️ Sử dụng được'];
  const e=_el(_shell('Máy đo chất lượng thông tin','Chọn một mẩu tin, bật/tắt các tiêu chí em thấy nó <b>đạt</b>, bấm <b>📏 Đo</b>. Máy sẽ cho biết em chấm đúng chưa.',
   `<div class="m-t9tc"><style>.m-t9tc .tin{display:flex;flex-direction:column;gap:6px}.m-t9tc .tin button{text-align:left;border:2px solid #dbe4f0;background:#fff;border-radius:10px;padding:8px 10px;cursor:pointer;font-weight:600}
   .m-t9tc .tin button.on{border-color:#1d4e89;background:#e7eff9}.m-t9tc .tc{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
   .m-t9tc .tc button{font:700 16px system-ui;padding:10px 14px;border-radius:12px;border:2px solid #cbd5e1;background:#fff;cursor:pointer}.m-t9tc .tc button.on{background:#dcfce7;border-color:#16a34a}
   .m-t9tc .bar{height:22px;border-radius:99px;background:#e5e7eb;overflow:hidden}.m-t9tc .bar i{display:block;height:100%;width:0;transition:width .6s}
   .m-t9tc .kq{font-weight:700;margin:8px 0}</style>
   <div class="tin">${T.map((t,i)=>`<button data-i="${i}" class="${i?'':'on'}">📄 ${t[0]}</button>`).join('')}</div>
   <div class="tc">${TC.map((t,i)=>`<button data-j="${i}">${t}</button>`).join('')}<button class="btn acc do">📏 Đo</button></div>
   <div class="bar"><i></i></div><div class="kq">Chưa đo</div></div>`));
  let cur=0;const tc=[0,0,0,0];
  e.querySelectorAll('.tin button').forEach(b=>b.onclick=()=>{e.querySelectorAll('.tin button').forEach(x=>x.classList.remove('on'));b.classList.add('on');cur=+b.dataset.i;FX.play('tick');});
  e.querySelectorAll('.tc [data-j]').forEach(b=>b.onclick=()=>{const j=+b.dataset.j;tc[j]^=1;b.classList.toggle('on',!!tc[j]);FX.play('tick');});
  e.querySelector('.do').onclick=()=>{const a=T[cur][1],n=a.reduce((s,x)=>s+x,0),bar=e.querySelector('.bar i');bar.style.width=(n*25)+'%';bar.style.background=n===4?'#16a34a':n>=2?'#f59e0b':'#dc2626';
    const sai=a.map((x,j)=>x!==tc[j]?TC[j]:null).filter(Boolean);
    e.querySelector('.kq').innerHTML=(n===4?'🌟 Thông tin CÓ CHẤT LƯỢNG (4/4)':'⚠️ Chưa đủ chất lượng ('+n+'/4). Thiếu: '+TC.filter((t,j)=>!a[j]).join(', '))+'<br>'+(sai.length?'Em chấm chưa đúng ở: '+sai.join(', '):'✓ Em chấm đúng cả 4 tiêu chí!');
    FX.play(sai.length?'tick':'sparkle');};
  return e;
};

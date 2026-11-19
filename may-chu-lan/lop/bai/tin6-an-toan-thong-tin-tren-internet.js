/* Tin học 6 · Bài 9. An toàn thông tin trên Internet · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: Mai mới có tài khoản mạng xã hội và thư điện tử.
   Mô phỏng: t6_tinnhan (Hộp tin nhắn lạ), t6_matkhau (Máy đo mật khẩu), t6_hoso (Hồ sơ công khai). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Những tin nhắn lạ',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p>Mai vừa có tài khoản mạng xã hội. Hộp tin nhắn có nhiều tin. Với mỗi tin, em sẽ <b>làm gì</b>?</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_tinnhan'},
      {id:'k1',type:'multi',q:'Trên Internet có thể gặp tác hại nào? (chọn các ý đúng)',opts:['Bị lừa đảo, lấy cắp thông tin','Bị bắt nạt trên mạng','Nhiễm virus, phần mềm độc hại','Nghiện Internet, trò chơi','Máy tính tự chạy nhanh hơn'],ok:[0,1,2,3]}],
  key:['Internet có <b>tác hại</b>: lừa đảo, lộ thông tin, bắt nạt, virus, nghiện.']},

 {t:'Mật khẩu mạnh',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Kẻ xấu dùng máy tính đoán thử hàng tỉ mật khẩu mỗi giây. Gõ thử các mật khẩu và xem cần bao lâu để bị đoán ra.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_matkhau'},
      {id:'h1',type:'single',q:'Mật khẩu nào <b>mạnh</b> nhất?',opts:['123456','mai2012','Mai@Ha-Long#2012!','password'],ok:2},
      {id:'h2',type:'tf',q:'Đúng hay Sai?',items:[{t:'Mật khẩu mạnh có chữ hoa, chữ thường, số, kí hiệu',a:'T'},{t:'Nên dùng ngày sinh làm mật khẩu cho dễ nhớ',a:'F'},{t:'Không chia sẻ mật khẩu cho bạn bè',a:'T'},{t:'Dùng một mật khẩu cho mọi tài khoản là an toàn',a:'F'}]}],
  key:['<b>Mật khẩu mạnh</b>: dài, có <b>chữ hoa, chữ thường, số, kí hiệu</b>; giữ <b>bí mật</b>.']},

 {t:'Bảo vệ thông tin cá nhân',hd:'Hình thành kiến thức · Hoạt động 2 · 9 phút',code:'2.2',ic:'',phut:9,
  story:'<p>Mai điền hồ sơ <b>công khai</b>: ai cũng xem được. Chọn những thông tin Mai đăng lên và xem mức nguy hiểm.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_hoso'},
      {id:'h3',type:'sort',q:'Thông tin nào <b>không nên</b> đăng công khai?',cols:{c0:'Không nên',c1:'Có thể chia sẻ'},items:[{t:'Địa chỉ nhà',a:'c0'},{t:'Số điện thoại',a:'c0'},{t:'Mật khẩu',a:'c0'},{t:'Sở thích đọc sách',a:'c1'},{t:'Lịch đi học hằng ngày',a:'c0'},{t:'Bức tranh em vẽ',a:'c1'}]}],
  key:['<b>Không chia sẻ</b> thông tin cá nhân: địa chỉ, số điện thoại, mật khẩu, lịch trình.']},

 {t:'Quy tắc an toàn',hd:'Luyện tập · 7 phút',code:'3',ic:'',phut:7,
  qs:[{id:'l1',type:'match',q:'Ghép tình huống với cách xử lí.',items:['Người lạ muốn kết bạn và hẹn gặp','Bị bạn nhắn tin chế giễu, đe doạ','Tin nhắn: “Bấm link nhận quà”','Chơi game quá 3 giờ mỗi ngày'],opts:['Không bấm, xoá tin','Không gặp, báo bố mẹ','Đặt giới hạn thời gian','Lưu bằng chứng, báo thầy cô, bố mẹ'],ok:[1,3,0,2]},
      {id:'l2',type:'single',q:'Khi đăng nhập ở máy tính công cộng, xong việc em cần…',opts:['Để nguyên','Đăng xuất tài khoản','Lưu mật khẩu vào máy','Tắt màn hình'],ok:1}],
  key:['Gặp nguy hiểm trên mạng: <b>không làm theo</b>, <b>báo người lớn</b> tin cậy.']},

 {t:'Lời khuyên cho bạn',hd:'Vận dụng · 6 phút',code:'4',ic:'',phut:6,
  qs:[{id:'v1',type:'text',q:'Bạn em định đăng ảnh chụp vé máy bay có tên, ngày bay lên mạng. Em khuyên bạn thế nào?',ans:'Không nên đăng vì lộ thông tin cá nhân và lịch trình (cả nhà đi vắng); nếu đăng hãy che thông tin, chỉ chia sẻ với người thân.'}],
  key:['Suy nghĩ <b>trước khi đăng</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Việc nào giúp em an toàn trên Internet?',opts:['Chia sẻ mật khẩu cho bạn thân','Bấm mọi đường link lạ','Đặt mật khẩu mạnh, đăng xuất khi dùng xong','Kết bạn với mọi người lạ'],ok:2},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Mật khẩu mạnh – giữ bí mật thông tin – báo người lớn</b>.']}
];

const GHIBAI={so:'Bài 9:',ten:'AN TOÀN THÔNG TIN TRÊN INTERNET',muc:[
 {step:2,h:'Tác hại',it:['Lừa đảo, <b>lộ thông tin</b>, bắt nạt, virus, nghiện Internet.']},
 {step:3,h:'Mật khẩu',it:['<b>Mạnh</b>: dài, chữ hoa, thường, số, kí hiệu; <b>giữ bí mật</b>.']},
 {step:4,h:'Bảo vệ',it:['Không chia sẻ <b>thông tin cá nhân</b>; gặp nguy hiểm <b>báo người lớn</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_tinnhan=function(){
  const M=[['🎁','Người lạ','Chúc mừng! Bạn trúng iPhone 15. Bấm link và nhập mật khẩu để nhận!','bo','Lừa đảo lấy mật khẩu'],
           ['👤','Người lạ','Chào em, anh cũng 12 tuổi. Mình gặp nhau ở công viên nhé, đừng nói với bố mẹ.','bao','Người lạ hẹn gặp: rất nguy hiểm'],
           ['😠','Tài khoản ẩn danh','Mày học dốt lắm, cả lớp ghét mày!','bao','Bắt nạt trên mạng'],
           ['👩‍🏫','Cô Hoa (cô chủ nhiệm)','Các em nhớ nộp bài thuyết trình trước thứ Sáu nhé.','tl','Tin nhắn của người quen, an toàn'],
           ['💾','Người lạ','Tải phần mềm hack game miễn phí: game_hack.exe','bo','Tệp lạ có thể chứa virus']];
  const ACT=[['tl','💬 Trả lời'],['bo','🗑️ Bỏ qua, xoá'],['bao','🙋 Báo bố mẹ, thầy cô']];
  const e=t6('Hộp tin nhắn lạ','Đọc từng tin, chọn cách xử lí. Cố gắng xử lí đúng cả 5 tin!',
   `<div class="ms" style="max-width:560px;margin:auto;background:#f1f5f9;border-radius:14px;padding:12px;min-height:80px"></div>
    <div class="g">${ACT.map(a=>`<button type="button" class="c" data-a="${a[0]}">${a[1]}</button>`).join('')}</div><div class="kq">Tin 1/5</div><p style="text-align:center">Xử lí đúng: <span class="sc">0</span></p>`);
  let k=0, ok=0;
  const show=()=>{const m=M[k]; e.querySelector('.ms').innerHTML=`<div style="font-size:30px;float:left;margin-right:10px">${m[0]}</div><b>${m[1]}</b><br>${m[2]}`;};
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{const m=M[k], a=b.dataset.a, right=a===m[3]||(m[3]==='bo'&&a==='bao');
    if(right) ok++; t6kq(e,right,(right?'✓ Đúng! ':'✗ Chưa an toàn! ')+m[4]+(right?'':' – nên '+ACT.find(x=>x[0]===m[3])[1]));
    e.querySelector('.sc').textContent=ok; k=(k+1)%5; if(k===0){FX.play(ok>=4?'win':'tick'); ok=0;} setTimeout(show,900);});
  show(); return e;
};
SIMS_BAI.t6_matkhau=function(){
  const e=t6('Máy đo mật khẩu','Gõ một mật khẩu (đừng dùng mật khẩu thật!). Xem độ mạnh và thời gian máy tính kẻ xấu cần để đoán ra.',
   `<div class="sim-ctl" style="justify-content:center"><input class="pw" style="font:700 20px Consolas,monospace;padding:10px;border-radius:10px;border:2px solid #94a3b8;min-width:280px" value="123456"></div>
    <div class="g">${['📏 Từ 8 kí tự','🔠 Chữ hoa','🔡 Chữ thường','🔢 Chữ số','✳️ Kí hiệu'].map((t,i)=>`<span class="c ck" data-i="${i}" style="cursor:default;min-width:90px;font-size:14px">${t}</span>`).join('')}</div>
    <div style="max-width:480px;margin:auto;background:#e2e8f0;border-radius:999px;height:24px"><div class="bar" style="height:100%;border-radius:999px;transition:width .3s,background .3s"></div></div>
    <div class="kq"></div><table class="tbl sim-hist"><tr><th>Lần</th><th>Mật khẩu</th><th>Thời gian bị đoán</th></tr></table>`);
  const hist=[]; let last='';
  const tg=s=>s<1?'chưa tới 1 giây':s<60?Math.round(s)+' giây':s<3600?Math.round(s/60)+' phút':s<86400?Math.round(s/3600)+' giờ':s<31536000?Math.round(s/86400)+' ngày':s<31536000*1e6?Math.round(s/31536000).toLocaleString('vi-VN')+' năm':'hàng triệu năm';
  const run=()=>{const p=e.querySelector('.pw').value, c=[p.length>=8,/[A-Z]/.test(p),/[a-z]/.test(p),/\d/.test(p),/[^A-Za-z0-9]/.test(p)];
    e.querySelectorAll('.ck').forEach((x,i)=>{x.classList.toggle('ok',c[i]);});
    const pool=(c[1]?26:0)+(c[2]?26:0)+(c[3]?10:0)+(c[4]?32:0)||1, weak=/^(123|password|abc|qwerty|mai)/i.test(p);
    const s=weak?0.001:Math.pow(pool,p.length)/1e10, n=c.filter(x=>x).length, lv=weak?0:Math.min(4,Math.floor(Math.log10(s+1)/3));
    const bar=e.querySelector('.bar'); bar.style.width=(15+lv*21)+'%'; bar.style.background=['#dc2626','#f97316','#eab308','#22c55e','#15803d'][lv];
    t6kq(e,lv>=3?true:lv<=1?false:null,`${['Rất yếu','Yếu','Trung bình','Mạnh','Rất mạnh'][lv]} · bị đoán ra sau <b>${tg(s)}</b>`+(weak?' (mật khẩu quá phổ biến!)':''));
    if(p&&p!==last){last=p; hist.unshift([p.replace(/</g,'&lt;'),tg(s)]); if(hist.length>5) hist.pop(); histTable(e,hist,()=>'');}};
  let tm; e.querySelector('.pw').oninput=()=>{clearTimeout(tm); tm=setTimeout(run,500);}; run();
  return e;
};
SIMS_BAI.t6_hoso=function(){
  const I=[['😊','Biệt danh: Mây Hồng',0],['📚','Sở thích: đọc truyện',0],['🎨','Tranh em vẽ',0],['🏠','Địa chỉ nhà',3],['📞','Số điện thoại',3],['🏫','Tên trường, lớp',2],['🕖','Lịch đi học hằng ngày',3],['🔑','Mật khẩu',5],['📸','Ảnh chụp cổng nhà',2]];
  const e=t6('Hồ sơ công khai','Bấm chọn thông tin Mai muốn đăng lên hồ sơ <b>công khai</b>. Quan sát thanh <b>mức nguy hiểm</b>.',
   `<div class="g">${I.map((x,i)=>`<button type="button" class="c" data-i="${i}"><span class="e">${x[0]}</span>${x[1]}</button>`).join('')}</div>
    <div style="max-width:480px;margin:auto;background:#e2e8f0;border-radius:999px;height:24px"><div class="bar" style="height:100%;width:0;border-radius:999px;background:#16a34a;transition:width .3s"></div></div><div class="kq">Hồ sơ đang trống: an toàn</div>`);
  const S=new Set();
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{const i=+b.dataset.i; S.has(i)?S.delete(i):S.add(i); b.classList.toggle(I[i][2]?'no':'ok',S.has(i));
    const r=[...S].reduce((a,j)=>a+I[j][2],0), bar=e.querySelector('.bar'); bar.style.width=Math.min(100,r*7)+'%'; bar.style.background=r>=5?'#dc2626':r>=2?'#f59e0b':'#16a34a';
    const bad=[...S].filter(j=>I[j][2]).map(j=>I[j][1]);
    t6kq(e,bad.length?false:true,bad.length?'⚠️ Nguy hiểm! Kẻ xấu có thể biết: '+bad.join(', '):'✓ An toàn: chỉ chia sẻ sở thích, sản phẩm của em.');});
  return e;
};

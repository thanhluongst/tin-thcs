/* Tin học 8 · Bài 4. Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số · 1 tiết.
   Tình huống: bức ảnh ruộng bậc thang của Khoa; các tình huống trên mạng.
   Mô phỏng: "dungAnh" (An dùng ảnh của Khoa thế nào?), "dendo" (đèn giao thông hành vi số). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'An dùng ảnh của Khoa',hd:'Khởi động · 7 phút',code:'1',phut:7,
  story:'<p><b>Khoa</b> chia sẻ cho <b>An</b> bức ảnh ruộng bậc thang mình chụp. An muốn dùng ảnh này. Em hãy thử từng cách làm của An trong mô phỏng và xem chuyện gì xảy ra.</p>',
  qs:[{id:'s1',type:'sim',sim:'dungAnh'},
      {id:'k1',type:'single',q:'An nên làm theo cách nào?',opts:['Đăng lên mạng, ghi là ảnh mình chụp','Đem đi dự thi ảnh dưới tên mình','Xin phép Khoa và ghi rõ tác giả khi đăng','Sửa ảnh rồi bán cho người khác'],ok:2},
      {id:'k2',type:'single',q:'Vì sao?',opts:['Vì ảnh là sản phẩm của Khoa, Khoa có quyền tác giả','Vì ảnh xấu','Vì An không biết đăng ảnh','Vì mạng chậm'],ok:0}],
  key:['Sản phẩm số có <b>quyền tác giả</b>: muốn dùng phải <b>xin phép</b> và <b>ghi nguồn</b>.']},
 {t:'Đèn đỏ – đèn xanh trên mạng',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Mỗi hành vi trên mạng giống như đi đường: có hành vi <b>an toàn</b> (đèn xanh), <b>thiếu văn hoá</b> (đèn vàng) và <b>vi phạm pháp luật</b> (đèn đỏ). Hãy bật đèn cho từng hành vi.</p>',
  qs:[{id:'s2',type:'sim',sim:'dendo'},
      {id:'vp',type:'sort',q:'Hành vi nào <b>vi phạm đạo đức, pháp luật</b>?',cols:{c0:'Vi phạm',c1:'Không vi phạm'},items:[
        {t:'Tải phần mềm bẻ khoá (crack) để dùng',a:'c0'},{t:'Đặt mật khẩu mạnh cho tài khoản',a:'c1'},{t:'Đăng ảnh bạn khác để chế giễu',a:'c0'},{t:'Truy cập trái phép tài khoản người khác',a:'c0'},{t:'Trích dẫn nguồn khi dùng tư liệu',a:'c1'},{t:'Phát tán tin giả',a:'c0'}]},
      {id:'p19',type:'single',q:'Hành động nào <b>không</b> vi phạm đạo đức và pháp luật?',opts:['Chia sẻ phim có bản quyền lên mạng','Quay video người khác khi họ không đồng ý rồi đăng lên','Dùng ảnh trên mạng có ghi giấy phép miễn phí và ghi nguồn','Dùng phần mềm không có bản quyền'],ok:2}],
  key:['Vi phạm: <b>bản quyền</b>, <b>xâm phạm riêng tư</b>, <b>lừa đảo, tin giả</b>, <b>bắt nạt trên mạng</b>.','Luật: <b>Luật An ninh mạng</b>, <b>Luật Sở hữu trí tuệ</b>.']},
 {t:'Văn hoá trên mạng',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',phut:8,
  story:'<p>Không vi phạm pháp luật chưa đủ — cần <b>ứng xử có văn hoá</b>: lịch sự, tôn trọng, trung thực.</p>',
  qs:[{id:'vh',type:'tf',q:'Đúng hay sai?',items:[{t:'Bình luận lịch sự, tôn trọng người khác',a:'T'},{t:'Viết toàn chữ IN HOA để quát người khác là bình thường',a:'F'},{t:'Không đăng thông tin cá nhân của người khác khi chưa được phép',a:'T'},{t:'Có thể nói bất cứ điều gì vì không ai biết mình là ai',a:'F'}]}],
  key:['Văn hoá số: <b>lịch sự, tôn trọng, trung thực</b>, bảo vệ <b>riêng tư</b> của mình và người khác.']},
 {t:'Em sẽ khuyên bạn',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Bạn em quay video các bạn trong lớp đang ngủ gật rồi định đăng lên mạng cho vui.</p>',
  qs:[{id:'lt1',type:'single',q:'Lời khuyên phù hợp nhất:',opts:['Đăng đi, vui mà','Không đăng: xâm phạm hình ảnh, có thể làm các bạn tổn thương; nên xoá video','Đăng nhưng che mặt mình','Gửi riêng cho cả lớp'],ok:1},
      {id:'lt2',type:'text',q:'Một bạn dùng ảnh trên mạng để làm bài thuyết trình mà không ghi nguồn. Em khuyên gì? (1–2 câu)',ans:'Ghi rõ nguồn/tác giả, ưu tiên ảnh có giấy phép sử dụng miễn phí; tôn trọng quyền tác giả.'}],
  key:['Khi thấy hành vi sai: <b>nhắc nhở nhẹ nhàng</b>, khuyên <b>sửa</b>, báo người lớn khi cần.']},
 {t:'Thông điệp văn hoá số',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  qs:[{id:'vd',type:'text',q:'Viết một khẩu hiệu ngắn hướng dẫn các bạn ứng xử văn hoá trên mạng.',ans:'VD: “Nghĩ trước khi đăng – Tôn trọng trước khi bình luận”.'}],
  key:['Lan toả <b>hành vi đẹp</b> trên mạng.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Dùng ảnh của người khác, việc đầu tiên cần làm là:',opts:['Tải ngay về máy','Xin phép tác giả / kiểm tra giấy phép','Sửa thành ảnh của mình','Đăng thật nhanh'],ok:1}],
  key:['<b>Tôn trọng bản quyền</b>, <b>riêng tư</b> và <b>ứng xử có văn hoá</b>.']}
];
const GHIBAI={so:'Bài 4:',ten:'ĐẠO ĐỨC VÀ VĂN HOÁ TRONG SỬ DỤNG CÔNG NGHỆ KĨ THUẬT SỐ',muc:[
 {step:2,h:'Vi phạm đạo đức, pháp luật',it:['Vi phạm <b>bản quyền</b>, xâm phạm <b>riêng tư</b>, <b>tin giả</b>, <b>bắt nạt</b> trên mạng.']},
 {step:3,h:'Ứng xử có văn hoá',it:['<b>Lịch sự, tôn trọng, trung thực</b>; dùng tư liệu phải <b>xin phép, ghi nguồn</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.dungAnh=function(){
  const C=[['🙋 Xin phép Khoa, đăng có ghi “Ảnh: Khoa”',1,'Khoa vui vẻ đồng ý 😊. Mọi người khen Khoa chụp đẹp. Đúng quyền tác giả!'],
    ['😎 Đăng lên mạng, nói “ảnh tớ chụp”',0,'Khoa buồn và giận 😢. Mọi người phát hiện An nhận vơ – mất uy tín.'],
    ['🏆 Gửi đi dự thi ảnh dưới tên An',0,'Ban tổ chức phát hiện ảnh của người khác 🚫 – bị huỷ giải, vi phạm bản quyền.'],
    ['💰 Bán ảnh cho trang quảng cáo',0,'Vi phạm quyền tác giả nghiêm trọng ⚖️ – có thể bị xử phạt.']];
  const e=_el(_shell('An dùng ảnh của Khoa','Chọn cách làm của An, bấm <b>▶ Xem kết quả</b>.',
   `<div class="m8da"><style>.m8da .ch{display:grid;grid-template-columns:1fr 1fr;gap:8px}.m8da .ch button{border:2px solid #e2e8f0;background:#fff;border-radius:14px;padding:12px;font-weight:600;cursor:pointer;text-align:left}.m8da .ch .on{border-color:#0ea5e9;background:#e0f2fe}.m8da .st{display:flex;align-items:center;gap:16px;margin:12px 0;padding:14px;border-radius:16px;background:#f1f5f9;min-height:90px}.m8da .face{font-size:56px}@media(max-width:560px){.m8da .ch{grid-template-columns:1fr}}</style>
    <div class="ch">${C.map((c,i)=>`<button data-i="${i}">${c[0]}</button>`).join('')}</div>
    <div class="sim-ctl" style="justify-content:center"><button class="btn acc go">▶ Xem kết quả</button></div>
    <div class="st"><div class="face">🏞️</div><div class="tx">Chọn một cách làm…</div></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Cách làm</th><th>Kết quả</th></tr></table></div>`));
  let k=-1; const hist=[];
  e.querySelectorAll('.ch button').forEach(b=>b.onclick=()=>{k=+b.dataset.i; e.querySelectorAll('.ch button').forEach(x=>x.classList.toggle('on',x===b)); FX.play('tick');});
  e.querySelector('.go').onclick=()=>{if(k<0) return; const c=C[k], st=e.querySelector('.st');
    st.style.background=c[1]?'#dcfce7':'#fee2e2'; st.querySelector('.face').textContent=c[1]?'😊':'😢'; st.querySelector('.tx').innerHTML='<b>'+(c[1]?'Đúng cách':'Không nên')+'</b><br>'+c[2];
    hist.unshift([c[0].slice(2),c[1]?'Đúng':'Vi phạm']); histTable(e,hist,(v,j)=>j===1?(v==='Đúng'?'g':'r'):''); FX.play(c[1]?'win':'drum');};
  return e;
};
SIMS_BAI.dendo=function(){
  const H=[['Bình luận động viên bài vẽ của bạn','x'],['Chia sẻ phim có bản quyền cho cả lớp tải','d'],['Viết toàn chữ IN HOA để quát bạn trong nhóm chat','v'],['Đăng ảnh chế giễu bạn cùng lớp','d'],['Ghi nguồn khi dùng ảnh trên mạng','x'],['Spam tin nhắn liên tục vào nhóm lớp','v'],['Đăng nhập trộm tài khoản game của bạn','d'],['Đăng số điện thoại của bạn khi chưa hỏi','v']];
  const L={x:['🟢','An toàn, có văn hoá'],v:['🟡','Thiếu văn hoá'],d:['🔴','Vi phạm đạo đức, pháp luật']};
  const e=_el(_shell('Đèn giao thông trên mạng','Đọc hành vi, bật <b>đèn</b> phù hợp. Đúng 🎉, sai sẽ có giải thích.',
   `<div class="m8dd"><style>.m8dd .hv{font:700 20px system-ui;text-align:center;padding:18px;border-radius:16px;background:#f8fafc;border:2px solid #e2e8f0;min-height:70px}.m8dd .tl{display:flex;gap:18px;justify-content:center;margin:14px 0;background:#1f2937;border-radius:40px;padding:14px 24px;width:max-content;margin-inline:auto}.m8dd .tl button{width:74px;height:74px;border-radius:50%;border:0;font-size:12px;font-weight:700;cursor:pointer;opacity:.45;transition:.2s;color:#111}.m8dd .tl button:hover{opacity:1;transform:scale(1.08)}.m8dd .ms{text-align:center;font-weight:700;min-height:24px}.m8dd .sc{text-align:center}</style>
    <div class="hv"></div><div class="tl"><button data-v="d" style="background:#ef4444">Đỏ</button><button data-v="v" style="background:#facc15">Vàng</button><button data-v="x" style="background:#22c55e">Xanh</button></div><div class="ms"></div><div class="sc"></div></div>`));
  let i=0, ok=0;
  const show=()=>{e.querySelector('.hv').textContent=(i%H.length+1)+'. '+H[i%H.length][0]; e.querySelector('.sc').textContent='Điểm: '+ok+'/'+i;};
  e.querySelectorAll('.tl button').forEach(b=>b.onclick=()=>{const h=H[i%H.length], r=b.dataset.v===h[1]; if(r) ok++;
    const m=e.querySelector('.ms'); m.innerHTML=(r?'🎉 Đúng! ':'❌ Chưa đúng. ')+L[h[1]][0]+' '+L[h[1]][1]; m.style.color=r?'#15803d':'#b91c1c';
    FX.play(r?'ding':'tick'); i++; setTimeout(show,700);});
  show(); return e;
};

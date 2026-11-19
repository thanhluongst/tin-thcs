/* Tin học 9 · Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: điện thoại của Minh với các tin nhắn, bài đăng trên mạng.
   Mô phỏng: t9ngay (Một ngày với điện thoại – thanh trượt thời gian dùng), t9tinnhan (Tin nhắn lạ: em xử lí thế nào?),
   t9toaan (Toà án mạng: hành vi hợp pháp hay vi phạm?). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Một ngày với điện thoại',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p><b>Minh</b> dùng điện thoại từ sáng đến tối: học, chơi game, lướt mạng xã hội. Kéo thanh <b>số giờ dùng mỗi ngày</b> để xem điều gì xảy ra với sức khoẻ và học tập của Minh.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9ngay'},
      {id:'k1',type:'multi',q:'Phương án nào là tác động <b>tiêu cực</b> của công nghệ kĩ thuật số?',opts:['Nghiện trò chơi, mạng xã hội','Mất ngủ, cận thị, ít vận động','Chuyển tiền nhanh bằng ngân hàng số','Bị lộ thông tin cá nhân'],ok:[0,1,3]}],
  key:['Dùng công nghệ <b>quá mức, sai cách</b> gây hại cho <b>sức khoẻ, học tập, quyền riêng tư</b>.']},

 {t:'Tác động tiêu cực đến con người và xã hội',hd:'Hình thành kiến thức · Hoạt động 1 · 8 phút',code:'2.1',phut:8,
  story:'<p>Tác động tiêu cực không chỉ với <b>mỗi người</b> mà còn với cả <b>xã hội</b>: môi trường, việc làm, an ninh…</p>',
  qs:[{id:'h1',type:'sort',q:'Tác động tiêu cực này ảnh hưởng chủ yếu đến ai?',cols:{c0:'Con người (cá nhân)',c1:'Xã hội'},items:[
        {t:'Nghiện Internet, mất ngủ',a:'c0'},{t:'Rác thải điện tử gây ô nhiễm',a:'c1'},{t:'Lệ thuộc máy tính, ngại tự suy nghĩ',a:'c0'},{t:'Tự động hoá làm một số người mất việc',a:'c1'},{t:'Bị lộ thông tin riêng tư',a:'c0'},{t:'Tin giả gây hoang mang dư luận',a:'c1'}]},
      {id:'h2',type:'single',q:'Phương án nào <b>KHÔNG</b> phải tác động tiêu cực?',opts:['Thói quen tra mạng thay vì tự làm bài','Dùng phần mềm soạn thảo để làm báo cáo','Thức khuya xem video','Nghiện mạng xã hội'],ok:1}],
  key:['Tiêu cực với <b>con người</b>: sức khoẻ, quyền riêng tư, lệ thuộc. Với <b>xã hội</b>: môi trường, việc làm, an ninh, tin giả.']},

 {t:'Tin nhắn lạ',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Minh nhận tin nhắn từ một “bạn mới quen”: <i>“Bấm link nhận quà, nhớ chia sẻ cho 5 bạn!”</i>. Thử từng cách xử lí trong mô phỏng.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9tinnhan'},
      {id:'h3',type:'single',q:'Minh có nên bấm và chia sẻ liên kết đó không?',opts:['Có, vì được quà','Không: dấu hiệu lừa đảo, có thể chứa mã độc','Có, nếu bạn bè cũng chia sẻ','Chỉ bấm, không chia sẻ'],ok:1},
      {id:'h4',type:'match',q:'Ghép tình huống với tên hành vi.',items:['Dùng phần mềm bẻ khoá','Đăng ảnh bạn kèm lời chê bai','Mạo danh ngân hàng xin mã OTP','Phát tán virus'],opts:['Lừa đảo, chiếm đoạt tài sản','Vi phạm bản quyền','Phá hoại hệ thống, dữ liệu','Xúc phạm, bắt nạt trên mạng'],ok:[1,3,0,2]}],
  key:['Liên kết lạ + hứa quà + giục chia sẻ = <b>dấu hiệu lừa đảo</b>: không bấm, <b>chặn, báo cáo</b>, hỏi người lớn.']},

 {t:'Toà án mạng',hd:'Hình thành kiến thức · Hoạt động 3 · 8 phút',code:'2.3',phut:8,
  story:'<p>Luật An ninh mạng 2018, Luật CNTT 2006, Nghị định 72/2013 quy định các <b>hành vi bị nghiêm cấm</b> trên môi trường số. Em là “thẩm phán”: phán quyết từng vụ!</p>',
  qs:[{id:'s3',type:'sim',sim:'t9toaan'},
      {id:'h5',type:'multi',q:'Hành vi nào vi phạm pháp luật, trái đạo đức, thiếu văn hoá?',opts:['Tải phim lậu chia sẻ lên mạng','Bình luận chửi bới người khác','Chúc mừng sinh nhật bạn','Đăng tin bôi nhọ thầy cô'],ok:[0,1,3]}],
  key:['Hành vi bị cấm: <b>vi phạm bản quyền</b>, <b>lừa đảo</b>, <b>phát tán mã độc</b>, <b>đăng tin sai sự thật</b>, <b>xúc phạm</b> người khác…']},

 {t:'Bảo vệ bản thân',hd:'Luyện tập · 6 phút',code:'3',phut:6,
  story:'<p>Minh lập “nội quy dùng điện thoại” cho bản thân.</p>',
  qs:[{id:'l1',type:'sort',q:'Thói quen nào giúp tránh tác động tiêu cực?',cols:{c0:'Nên',c1:'Không nên'},items:[{t:'Đặt giới hạn thời gian dùng mỗi ngày',a:'c0'},{t:'Không chia sẻ mật khẩu, thông tin cá nhân',a:'c0'},{t:'Kiểm chứng tin trước khi chia sẻ',a:'c0'},{t:'Lướt mạng đến 1 giờ sáng',a:'c1'},{t:'Dùng chung mật khẩu cho mọi tài khoản',a:'c1'}]},
      {id:'l2',type:'single',q:'Hành vi nào <b>KHÔNG</b> vi phạm?',opts:['Bình luận chia rẽ vùng miền','Đăng nhập trộm tài khoản bạn','Chia sẻ thông tin lớp học lập trình miễn phí','Quảng cáo thuốc trái phép'],ok:2}],
  key:['Dùng mạng <b>có giới hạn, có trách nhiệm</b>, tôn trọng pháp luật và người khác.']},

 {t:'Tìm hiểu luật',hd:'Vận dụng · 4 phút',code:'4',phut:4,
  story:'<p>Về nhà: đọc Điều 12 Luật CNTT 2006 và Điều 5 Nghị định 72/2013.</p>',
  qs:[{id:'v1',type:'text',q:'Nêu 1 hành vi bị cấm em thấy có ở cả hai văn bản.',ans:'Ví dụ: lợi dụng mạng để đưa thông tin sai sự thật, xúc phạm danh dự người khác; phát tán virus, tấn công hệ thống.'}],
  key:['Văn bản pháp luật ghi rõ <b>hành vi bị nghiêm cấm</b> khi dùng Internet.']},

 {t:'Tổng kết',hd:'Tổng kết · 3 phút',phut:3,
  story:'<p>Trên mạng cũng như ngoài đời: <b>văn minh, an toàn, đúng luật</b>.</p>',
  qs:[{id:'t1',type:'single',q:'Khi gặp liên kết lạ hứa tặng quà, em nên:',opts:['Bấm ngay','Chia sẻ cho bạn','Không bấm, chặn và báo người lớn','Nhập mật khẩu để nhận quà'],ok:2},
      {id:'t2',type:'text',short:1,q:'Em sẽ thay đổi thói quen nào sau bài học?',ans:'Tự đánh giá.'}],
  key:['Biết <b>tác động tiêu cực</b> và <b>hành vi vi phạm</b> để tự bảo vệ và sống có trách nhiệm trên mạng.']}
];

const GHIBAI={so:'Bài 4:',ten:'MỘT SỐ VẤN ĐỀ PHÁP LÍ VỀ SỬ DỤNG DỊCH VỤ INTERNET',muc:[
 {step:2,h:'Tác động tiêu cực',it:['Con người: <b>sức khoẻ</b>, <b>quyền riêng tư</b>, <b>lệ thuộc</b> công nghệ.','Xã hội: <b>môi trường</b>, <b>việc làm</b>, tin giả, an ninh.']},
 {step:4,h:'Hành vi vi phạm',it:['Vi phạm bản quyền, lừa đảo, phát tán mã độc, tin sai sự thật, xúc phạm người khác.','Văn bản: <b>Luật An ninh mạng 2018</b>, <b>Luật CNTT 2006</b>, <b>NĐ 72/2013</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9ngay=function(){
  const e=_el(_shell('Một ngày với điện thoại của Minh','Kéo thanh <b>số giờ dùng điện thoại giải trí mỗi ngày</b>, quan sát các chỉ số.',
   `<div class="m-t9ng2"><style>.m-t9ng2 input{width:100%;max-width:460px}.m-t9ng2 .h{font:800 28px system-ui;color:#1d4e89}
   .m-t9ng2 .g{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-top:10px}
   .m-t9ng2 .m{background:#fff;border:2px solid #e2e8f0;border-radius:14px;padding:10px;text-align:center}.m-t9ng2 .m .i{font-size:34px}
   .m-t9ng2 .bar{height:12px;border-radius:99px;background:#e5e7eb;overflow:hidden;margin-top:6px}.m-t9ng2 .bar i{display:block;height:100%;transition:.4s}
   .m-t9ng2 .face{font-size:60px;text-align:center}</style>
   <div>Thời gian: <span class="h">2 giờ</span>/ngày</div><input type="range" min="0" max="10" step="0.5" value="2"><div class="face">🙂</div>
   <div class="g">${[['😴','Giấc ngủ'],['👀','Mắt'],['📚','Học tập'],['🏃','Vận động'],['👨‍👩‍👧','Gia đình']].map(m=>`<div class="m"><div class="i">${m[0]}</div><b>${m[1]}</b><div class="bar"><i></i></div><small></small></div>`).join('')}</div></div>`));
  const sl=e.querySelector('input');let last=-1;
  const up=()=>{const h=+sl.value;e.querySelector('.h').textContent=h+' giờ';const k=[1.1,1.2,1,1.3,1.1];
    e.querySelectorAll('.m').forEach((m,j)=>{const v=Math.max(5,Math.min(100,100-Math.max(0,h-1.5)*12*k[j]));const b=m.querySelector('.bar i');b.style.width=v+'%';b.style.background=v>70?'#16a34a':v>40?'#f59e0b':'#dc2626';m.querySelector('small').textContent=v>70?'Tốt':v>40?'Giảm sút':'Báo động!';});
    const lv=h<=2?0:h<=5?1:2;e.querySelector('.face').textContent=['🙂','😕','😵'][lv];if(lv!==last){FX.play(lv===2?'tick':'ding');last=lv;}};
  sl.oninput=up;up();return e;
};
SIMS_BAI.t9tinnhan=function(){
  const A=[['👆 Bấm vào link','bad','Trang giả mạo yêu cầu nhập mật khẩu → tài khoản bị chiếm, máy nhiễm mã độc!'],['📤 Chia sẻ cho 5 bạn','bad','Em vô tình giúp kẻ lừa đảo lan truyền, 5 bạn cũng gặp nguy!'],['🔑 Gửi mã OTP để nhận quà','bad','Mất tiền trong tài khoản! Không bao giờ đưa OTP cho ai.'],['🚫 Không bấm, chặn và báo cáo','ok','An toàn! Tài khoản lừa đảo bị báo cáo.'],['🗣️ Hỏi bố mẹ, thầy cô','ok','Rất tốt! Người lớn giúp em nhận ra lừa đảo.']];
  const e=_el(_shell('Tin nhắn lạ','Đọc tin nhắn, chọn một cách xử lí và xem hậu quả. Thử hết các cách!',
   `<div class="m-t9tn"><style>.m-t9tn .ph{max-width:340px;margin:0 auto;border:10px solid #111827;border-radius:28px;background:#eef2f7;padding:12px;min-height:260px}
   .m-t9tn .b{background:#fff;border-radius:14px 14px 14px 4px;padding:10px;margin:6px 0;max-width:85%;box-shadow:0 1px 2px #0002}.m-t9tn .b a{color:#2563eb;word-break:break-all}
   .m-t9tn .me{margin-left:auto;background:#bfdbfe;border-radius:14px 14px 4px 14px}.m-t9tn .act{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0}
   .m-t9tn .act button{font:700 15px system-ui;padding:10px 12px;border-radius:12px;border:2px solid #cbd5e1;background:#fff;cursor:pointer}
   .m-t9tn .kq{border-radius:12px;padding:12px;font-weight:700;text-align:center}.m-t9tn .bad{background:#fee2e2;color:#991b1b}.m-t9tn .ok{background:#dcfce7;color:#166534}</style>
   <div class="ph"><div><b>👤 Bạn mới quen</b></div><div class="b">🎁 Chúc mừng! Bạn trúng thẻ cào 500k. Bấm nhận ngay: <a>http://qua-tang-free.xyz/nhan</a></div><div class="b">Nhớ chia sẻ cho 5 bạn mới được nhận nha!! ⏰ Còn 10 phút</div><div class="log"></div></div>
   <div class="act">${A.map((a,i)=>`<button data-i="${i}">${a[0]}</button>`).join('')}</div><div class="kq">Em sẽ làm gì?</div></div>`));
  e.querySelectorAll('.act button').forEach(b=>b.onclick=()=>{const a=A[+b.dataset.i],k=e.querySelector('.kq');k.className='kq '+a[1];k.textContent=(a[1]==='ok'?'✅ ':'⚠️ ')+a[2];
    e.querySelector('.log').innerHTML=`<div class="b me">${a[0]}</div>`;FX.play(a[1]==='ok'?'sparkle':'tick');});
  return e;
};
SIMS_BAI.t9toaan=function(){
  const V=[['Tải game bẻ khoá rồi chia sẻ link cho bạn',1,'Vi phạm bản quyền'],['Đăng ảnh chế giễu ngoại hình bạn cùng lớp',1,'Xúc phạm, bắt nạt trên mạng'],['Chia sẻ bài giảng miễn phí có ghi nguồn',0,'Hợp pháp, có ích'],
   ['Lập tài khoản giả mạo thầy giáo',1,'Mạo danh, xúc phạm danh dự'],['Đăng tin “trường cho nghỉ học” bịa đặt',1,'Đưa tin sai sự thật'],['Báo cáo một bài đăng lừa đảo',0,'Hành vi tích cực'],['Gửi tệp chứa virus cho cả nhóm',1,'Phát tán mã độc'],['Chúc mừng sinh nhật bạn trên nhóm lớp',0,'Văn minh, lịch sự']];
  const e=_el(_shell('Toà án mạng','Mỗi vụ việc hiện lên: gõ búa <b>⚖️ Vi phạm</b> hoặc <b>👍 Hợp pháp</b>.',
   `<div class="m-t9ta"><style>.m-t9ta .cs{font:700 20px system-ui;text-align:center;padding:22px;border-radius:16px;background:#fff;border:3px solid #c7d6ea;min-height:90px;display:grid;place-items:center}
   .m-t9ta .act{display:flex;gap:12px;justify-content:center;margin:12px 0}.m-t9ta .act button{font:800 18px system-ui;padding:12px 22px;border-radius:14px;border:0;cursor:pointer}
   .m-t9ta .v{background:#fecaca}.m-t9ta .h{background:#bbf7d0}.m-t9ta .f{text-align:center;font-weight:700;min-height:24px}.m-t9ta .sc{text-align:center;color:#1d4e89;font-weight:800}</style>
   <div class="sc">Vụ 1/${V.length} · Điểm 0</div><div class="cs"></div><div class="act"><button class="v">⚖️ Vi phạm</button><button class="h">👍 Hợp pháp</button></div><div class="f"></div></div>`));
  let i=0,sc=0;const show=()=>{e.querySelector('.cs').textContent=i<V.length?'📁 '+V[i][0]:'🎉 Xong! Em đúng '+sc+'/'+V.length+' vụ';e.querySelector('.sc').textContent='Vụ '+Math.min(i+1,V.length)+'/'+V.length+' · Điểm '+sc;};
  e.querySelectorAll('.act button').forEach(b=>b.onclick=()=>{if(i>=V.length){i=0;sc=0;show();return;}const g=b.classList.contains('v')?1:0,ok=g===V[i][1];if(ok)sc++;
    e.querySelector('.f').innerHTML=(ok?'✓ Chính xác: ':'✗ Chưa đúng: ')+V[i][2];FX.play(ok?'ding':'tick');i++;if(i>=V.length)FX.play('win');show();});
  show();return e;
};

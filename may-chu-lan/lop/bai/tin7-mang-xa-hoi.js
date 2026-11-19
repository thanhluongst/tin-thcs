/* Tin học 7 · Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet · 1 tiết. Soạn lại cho lớp học LAN.
   Mô phỏng: "mxhBangTin" (bảng tin MXH: thích, chia sẻ, tin giả lan nhanh), "mxhKenh" (chọn kênh phù hợp cho tình huống). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Bảng tin của Minh',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p><b>Minh</b> mở mạng xã hội và thấy nhiều bài đăng. Có bài hay, có bài <b>giật tít</b>. Em hãy thử <b>Thích</b>, <b>Chia sẻ</b> hoặc <b>Kiểm tra nguồn</b> từng bài và quan sát số người nhận được tin.</p>',
  qs:[{id:'s1',type:'sim',sim:'mxhBangTin'},
      {id:'q1',type:'single',q:'Quan sát: Khi em bấm Chia sẻ, điều gì xảy ra với số người thấy tin?',opts:['Không đổi','Tăng nhanh vì bạn bè của em cũng nhìn thấy','Giảm đi','Chỉ mình em thấy'],ok:1},
      {id:'q2',type:'single',q:'Trước khi chia sẻ một tin gây sốc, em nên làm gì?',opts:['Chia sẻ ngay cho nhanh','Kiểm tra nguồn tin chính thống','Thêm bình luận gay gắt','Gửi cho cả lớp'],ok:1}],
  key:['Tin trên <b>mạng xã hội</b> lan rất nhanh; <b>kiểm tra nguồn</b> trước khi chia sẻ.']},
 {t:'Mạng xã hội là gì?',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Mạng xã hội là ứng dụng trên Internet giúp mọi người <b>kết nối, chia sẻ, trao đổi</b> thông tin. VD: Facebook, Zalo, Instagram, YouTube, TikTok.</p>',
  qs:[{id:'h1',type:'tf',q:'Đúng hay sai về mạng xã hội?',items:[{t:'Giúp kết nối bạn bè, chia sẻ thông tin, học tập',a:'T'},{t:'Mọi thông tin trên mạng xã hội đều chính xác',a:'F'},{t:'Có thể bị lộ thông tin cá nhân',a:'T'},{t:'Dùng quá nhiều có thể gây nghiện, ảnh hưởng sức khoẻ',a:'T'}]},
      {id:'h2',type:'sort',q:'Lợi ích hay tác hại?',cols:{c0:'Lợi ích',c1:'Tác hại'},items:[{t:'Học nhóm, hỏi bài qua nhóm lớp',a:'c0'},{t:'Bị lừa đảo, bắt nạt qua mạng',a:'c1'},{t:'Kết nối người thân ở xa',a:'c0'},{t:'Thức khuya lướt mạng, mất ngủ',a:'c1'},{t:'Lan truyền tin giả',a:'c1'},{t:'Quảng bá sản phẩm, sự kiện của trường',a:'c0'}]}],
  key:['<b>Mạng xã hội</b>: kết nối, chia sẻ; có <b>lợi ích</b> và <b>tác hại</b> (tin giả, lộ thông tin, nghiện).']},
 {t:'Chọn kênh trao đổi phù hợp',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Ngoài mạng xã hội còn có <b>thư điện tử, diễn đàn, nhắn tin, gọi video, website</b>… Mỗi kênh hợp với một việc. Chọn kênh cho từng tình huống trong mô phỏng.</p>',
  qs:[{id:'s2',type:'sim',sim:'mxhKenh'},
      {id:'k1',type:'match',q:'Ghép nhu cầu với kênh phù hợp nhất.',items:['Gửi bài tập có tệp đính kèm cho thầy cô','Họp nhóm có nhìn thấy nhau','Hỏi đáp chủ đề lập trình với nhiều người','Xem thông báo tuyển sinh chính thức'],opts:['Thư điện tử','Gọi video','Diễn đàn','Website của trường'],ok:[0,1,2,3]}],
  key:['Kênh trao đổi: <b>thư điện tử, diễn đàn, nhắn tin, gọi video, website, mạng xã hội</b> – chọn theo mục đích.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút!</p>',
  qs:[{id:'l1',type:'multi',q:'Chọn những việc <b>nên</b> làm khi dùng mạng xã hội.',opts:['Đặt mật khẩu mạnh','Kết bạn với mọi người lạ','Giới hạn thời gian dùng','Đăng số điện thoại, địa chỉ nhà công khai','Báo người lớn khi bị đe doạ'],ok:[0,2,4]},
      {id:'l2',type:'single',q:'Phần mềm nào <b>không phải</b> mạng xã hội?',opts:['Zalo','Facebook','Microsoft Excel','TikTok'],ok:2}],
  key:['Dùng mạng xã hội <b>an toàn, có giới hạn</b>.']},
 {t:'Quy tắc của em',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Lớp em lập nhóm Zalo để trao đổi bài.</p>',
  qs:[{id:'v1',type:'text',q:'Đề xuất 3 quy tắc cho nhóm lớp để trao đổi hiệu quả, an toàn.',ans:'VD: chỉ đăng nội dung học tập; kiểm tra nguồn trước khi chia sẻ; không đăng thông tin cá nhân của người khác; lời lẽ lịch sự.'}],
  key:['Đặt <b>quy tắc</b> khi dùng kênh trao đổi chung.']},
 {t:'Tổng kết',hd:'Tổng kết · 3 phút',code:'',phut:3,
  story:'<p>Mạng xã hội là công cụ – dùng thông minh thì có ích.</p>',
  qs:[{id:'t1',type:'single',q:'Câu nào đúng nhất?',opts:['Nên chia sẻ mọi tin hot','Kiểm tra nguồn, bảo vệ thông tin cá nhân khi dùng mạng xã hội','Chỉ dùng mạng xã hội, bỏ email','Mạng xã hội chỉ có tác hại'],ok:1}],
  key:['<b>Kiểm chứng – bảo vệ – giới hạn</b> khi dùng mạng xã hội.']}
];
const GHIBAI={so:'Bài 4:',ten:'MẠNG XÃ HỘI VÀ MỘT SỐ KÊNH TRAO ĐỔI THÔNG TIN',muc:[
 {step:2,h:'Mạng xã hội',it:['Ứng dụng giúp <b>kết nối, chia sẻ</b>: Facebook, Zalo, YouTube…','<b>Lợi ích</b>: học tập, kết nối. <b>Tác hại</b>: tin giả, lộ thông tin, nghiện.']},
 {step:3,h:'Kênh trao đổi khác',it:['<b>Thư điện tử, diễn đàn, nhắn tin, gọi video, website</b> – chọn theo mục đích.']},
 {step:1,h:'Lưu ý',it:['<b>Kiểm tra nguồn</b> trước khi chia sẻ.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.mxhBangTin=function(){
  const P=[['📰','Báo Tuổi Trẻ','Trường THCS X đạt giải nhất Tin học trẻ cấp tỉnh',1],['😱','Trang “Tin Nóng 24h”','SỐC!!! Ăn kem buổi tối làm mất trí nhớ – chia sẻ ngay!!!',0],['🏫','Fanpage nhà trường','Lịch kiểm tra giữa kì môn Tin: thứ Năm tuần sau',1],['🎁','Tài khoản lạ','Bấm link nhận ngay 1 triệu đồng, chỉ hôm nay!',0]];
  const e=_el(_shell('Bảng tin mạng xã hội','Với mỗi bài: bấm <b>👍 Thích</b>, <b>↗ Chia sẻ</b> (tin lan tới bạn bè) hoặc <b>🔍 Kiểm tra nguồn</b>.',
   `<style>.m-t7mx .post{border:1px solid #e2e8f0;border-radius:14px;padding:10px 12px;margin:8px 0;background:#fff;box-shadow:0 1px 3px #0001}
   .m-t7mx .who{font-weight:700}.m-t7mx .txt{margin:6px 0;font-size:16px}.m-t7mx .bt button{font-size:15px;padding:6px 12px;margin-right:6px;border-radius:999px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer}
   .m-t7mx .note{font-size:14px;margin-top:6px;font-weight:600}.m-t7mx .reach{float:right;color:#2563eb;font-weight:800}</style>
   <div class="m-t7mx">${P.map((p,k)=>`<div class="post" data-k="${k}"><span class="reach">👁 <b>${12+k*3}</b></span><div class="who">${p[0]} ${p[1]}</div><div class="txt">${p[2]}</div>
   <div class="bt"><button type="button" data-a="like">👍 Thích</button><button type="button" data-a="share">↗ Chia sẻ</button><button type="button" data-a="chk">🔍 Kiểm tra nguồn</button></div><div class="note"></div></div>`).join('')}</div>`));
  e.querySelectorAll('.post').forEach(d=>{const p=P[+d.dataset.k],r=d.querySelector('.reach b'),n=d.querySelector('.note');
    d.querySelectorAll('button').forEach(b=>b.onclick=()=>{const a=b.dataset.a;
      if(a==='like'){b.textContent='👍 Đã thích'; FX.play('tick');}
      if(a==='share'){let v=+r.textContent,t=0; const iv=setInterval(()=>{v=Math.round(v*1.6+5); r.textContent=v; if(++t>5) clearInterval(iv);},180); FX.play('whoosh');
        n.style.color=p[3]?'#166534':'#b91c1c'; n.textContent=p[3]?'↗ Tin chính xác được lan rộng – có ích!':'⚠️ Em vừa lan truyền tin chưa kiểm chứng tới hàng trăm người!';}
      if(a==='chk'){n.style.color=p[3]?'#166534':'#b91c1c'; n.textContent=p[3]?'✅ Nguồn chính thống, đáng tin.':'❌ Nguồn không rõ ràng, nội dung giật tít → có thể là tin giả / lừa đảo.'; FX.play(p[3]?'ding':'drum');}});});
  return e;
};
SIMS_BAI.mxhKenh=function(){
  const K=[['email','📧 Thư điện tử'],['video','📹 Gọi video'],['forum','💬 Diễn đàn'],['web','🌐 Website'],['mxh','👥 Mạng xã hội']];
  const T=[['Gửi bài tập kèm tệp cho cô giáo','email'],['Cả nhóm thảo luận, nhìn thấy nhau','video'],['Hỏi kinh nghiệm học Scratch từ nhiều người','forum'],['Xem điểm chuẩn chính thức','web'],['Chia sẻ ảnh chuyến dã ngoại với bạn bè','mxh']];
  const e=_el(_shell('Chọn kênh trao đổi','Đọc <b>tình huống</b>, bấm <b>kênh</b> em cho là phù hợp nhất.',
   `<div class="tt" style="font-size:18px;font-weight:700;padding:14px;border-radius:12px;background:#eef2ff;text-align:center"></div>
   <div class="ks" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0">${K.map(k=>`<button type="button" class="btn" style="font-size:16px" data-k="${k[0]}">${k[1]}</button>`).join('')}</div>
   <div class="kq" style="text-align:center;font-weight:700;min-height:24px"></div><p style="text-align:center">Điểm: <b class="d">0</b>/${T.length}</p>`));
  let i=0,d=0; const tt=e.querySelector('.tt'),kq=e.querySelector('.kq'),show=()=>{tt.textContent=i<T.length?'Tình huống '+(i+1)+': '+T[i][0]:'🎉 Hoàn thành! Bấm kênh bất kì để chơi lại.';};show();
  e.querySelectorAll('.ks button').forEach(b=>b.onclick=()=>{if(i>=T.length){i=0;d=0;e.querySelector('.d').textContent=0;kq.textContent='';show();return;}
    const ok=b.dataset.k===T[i][1]; if(ok) d++; kq.style.color=ok?'#166534':'#b91c1c'; kq.textContent=ok?'✓ Hợp lí!':'✗ Chưa hợp lí nhất – nên dùng '+K.find(k=>k[0]===T[i][1])[1];
    e.querySelector('.d').textContent=d; FX.play(ok?'ding':'tick'); i++; setTimeout(show,700); if(i===T.length&&d===T.length) FX.play('win');});
  return e;
};

/* Tin học 8 · Bài 16. Tin học và nghề nghiệp · 1 tiết.
   Tình huống: An, Minh, Khoa trò chuyện về các nghề nghiệp có ứng dụng tin học.
   Mô phỏng: "phoNghe" (phố nghề nghiệp – bấm từng nghề xem ứng dụng tin học, trước/sau khi có máy tính),
             "binhDang" (cân bình đẳng giới – kéo các nhận định). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Dạo phố nghề nghiệp',hd:'Khởi động · 7 phút',code:'1',phut:7,
  story:'<p><b>An</b>: “Mẹ tớ là bác sĩ, cũng dùng máy tính suốt.” <b>Minh</b>: “Bố tớ là kiến trúc sư, vẽ nhà bằng phần mềm.” <b>Khoa</b>: “Tớ muốn làm lập trình viên!”. Dạo <b>phố nghề nghiệp</b>: bấm từng nghề, gạt công tắc <b>Trước / Có tin học</b>.</p>',
  qs:[{id:'s1',type:'sim',sim:'phoNghe'},
      {id:'p1',type:'single',q:'Quan sát: khi ứng dụng tin học, công việc thường…',opts:['Chậm hơn, nhiều sai sót hơn','Nhanh hơn, chính xác hơn, hiệu quả hơn','Không thay đổi','Không cần con người nữa'],ok:1},
      {id:'p2',type:'match',q:'Ghép ứng dụng tin học với nghề.',items:['Bệnh án điện tử, chẩn đoán hình ảnh','Phần mềm thiết kế bản vẽ 3D','Phần mềm kế toán, bảng tính','Bài giảng điện tử, lớp học trực tuyến'],opts:['Kế toán','Giáo viên','Bác sĩ','Kiến trúc sư'],ok:[2,3,0,1]}],
  key:['Tin học được ứng dụng trong <b>hầu hết các nghề</b>, giúp <b>nâng cao hiệu quả</b> công việc.']},
 {t:'Nghề tin học và nghề có ứng dụng tin học',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Có nghề <b>thuộc lĩnh vực tin học</b> (tạo ra phần mềm, quản trị hệ thống…) và nghề <b>ứng dụng tin học</b> (dùng tin học làm công cụ).</p>',
  qs:[{id:'n1',type:'sort',q:'Nghề nào thuộc lĩnh vực tin học?',cols:{c0:'Nghề thuộc lĩnh vực tin học',c1:'Nghề ứng dụng tin học'},items:[{t:'Lập trình viên',a:'c0'},{t:'Quản trị mạng',a:'c0'},{t:'Bác sĩ',a:'c1'},{t:'Kĩ sư an toàn thông tin',a:'c0'},{t:'Nhân viên ngân hàng',a:'c1'},{t:'Nhà thiết kế đồ hoạ',a:'c1'}]},
      {id:'n2',type:'sort',q:'Ví dụ thể hiện lợi ích nào?',cols:{c0:'Tăng năng suất, tốc độ',c1:'Chính xác, lưu trữ, chia sẻ dễ dàng'},items:[{t:'Robot lắp ráp ô tô làm việc liên tục',a:'c0'},{t:'Hồ sơ bệnh án lưu trên máy, tra cứu ngay',a:'c1'},{t:'Bảng tính tự động tính lương cả nghìn người',a:'c0'},{t:'Bản vẽ gửi qua mạng cho đối tác',a:'c1'}]}],
  key:['Nghề <b>lĩnh vực tin học</b>: lập trình, quản trị mạng, an toàn thông tin, phân tích dữ liệu…','Nghề <b>ứng dụng tin học</b>: dùng máy tính làm công cụ.']},
 {t:'Bình đẳng giới trong tin học',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Có bạn nói: <i>“Nghề tin học chỉ dành cho con trai.”</i> Em hãy đặt từng nhận định lên <b>cân</b>: đúng thì cân cân bằng, định kiến thì cân lệch.</p>',
  qs:[{id:'s2',type:'sim',sim:'binhDang'},
      {id:'bd1',type:'tf',q:'Đúng hay sai?',items:[{t:'Nam và nữ đều có thể học tốt và làm tốt nghề tin học',a:'T'},{t:'Con gái không nên học lập trình',a:'F'},{t:'Ada Lovelace (nữ) được coi là lập trình viên đầu tiên',a:'T'},{t:'Bất bình đẳng giới làm lãng phí tài năng',a:'T'}]},
      {id:'p94',type:'single',q:'Phương án <b>KHÔNG</b> đúng:',opts:['Máy tính và ứng dụng tin học dành cho mọi người','Nữ giới có nhiều thành tựu trong tin học','Chỉ nam giới mới làm được nghề lập trình','Cần tạo cơ hội như nhau cho nam và nữ'],ok:2}],
  key:['Tin học dành cho <b>mọi người</b>, <b>không phân biệt giới tính</b>.']},
 {t:'Luyện tập',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  qs:[{id:'lt',type:'multi',q:'Thầy cô dùng những ứng dụng tin học nào để dạy học hiệu quả hơn?',opts:['Bài trình chiếu, video','Phần mềm mô phỏng, lớp học trực tuyến','Sổ điểm điện tử','Phấn và bảng đen'],ok:[0,1,2]},
      {id:'lt2',type:'text',q:'Bất bình đẳng giới trong sử dụng máy tính có thể dẫn tới hậu quả gì? (1–2 câu)',ans:'Mất cơ hội học tập, việc làm của một bộ phận; lãng phí tài năng; xã hội phát triển chậm.'}],
  key:['Mỗi người đều cần <b>kĩ năng tin học</b> cho tương lai.']},
 {t:'Vận dụng',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  qs:[{id:'vd',type:'single',q:'Là học sinh lớp 8, việc làm phù hợp để thúc đẩy bình đẳng giới ở lớp:',opts:['Chỉ cho bạn nam dùng máy tính trước','Khuyến khích cả bạn nam và nữ tham gia CLB Tin học','Chê bạn nữ học lập trình','Không quan tâm'],ok:1}],
  key:['Hành động nhỏ: <b>khuyến khích, tôn trọng</b> mọi bạn.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Nghề nào thuộc lĩnh vực tin học?',opts:['Đầu bếp','Kĩ sư phần mềm','Thợ may','Nông dân'],ok:1}],
  key:['Tin học: <b>nâng cao hiệu quả</b> mọi nghề; <b>bình đẳng</b> cho mọi người.']}
];
const GHIBAI={so:'Bài 16:',ten:'TIN HỌC VÀ NGHỀ NGHIỆP',muc:[
 {step:2,h:'Tin học với nghề nghiệp',it:['Tin học giúp mọi nghề <b>nhanh, chính xác, hiệu quả</b>.']},
 {step:3,h:'Nghề tin học',it:['<b>Lập trình, quản trị mạng, an toàn thông tin</b>…']},
 {step:4,h:'Bình đẳng giới',it:['Tin học dành cho <b>mọi người</b>, không phân biệt giới tính.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.phoNghe=function(){
  const N=[['🩺','Bác sĩ','Ghi bệnh án giấy, tìm hồ sơ mất hàng giờ','Bệnh án điện tử, chụp CT/MRI, tư vấn từ xa'],['🏗️','Kiến trúc sư','Vẽ tay bản vẽ, sửa phải vẽ lại','Phần mềm thiết kế 3D, xem trước công trình'],['🧮','Kế toán','Tính tay, sổ sách dày cộp','Phần mềm kế toán, bảng tính tự tính'],['👩‍🏫','Giáo viên','Phấn trắng bảng đen, chấm bài thủ công','Bài giảng điện tử, lớp học trực tuyến, sổ điểm số'],['🌾','Nông dân','Đoán thời tiết, tưới thủ công','Cảm biến, tưới tự động, dự báo thời tiết'],['👨‍💻','Lập trình viên','—','Viết phần mềm, ứng dụng, trò chơi (nghề tin học)']];
  const e=_el(_shell('Phố nghề nghiệp','Bấm vào một <b>ngôi nhà nghề</b>, gạt <b>Trước ↔ Có tin học</b>. Đếm số nghề em đã ghé.',
   `<div class="m8pn"><style>.m8pn .st{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}.m8pn .st button{border:0;border-radius:14px 14px 6px 6px;padding:10px 4px;background:linear-gradient(#fde68a,#fbbf24);cursor:pointer;font-weight:700;font-size:13px}.m8pn .st button span{display:block;font-size:36px}.m8pn .st .on{background:linear-gradient(#a7f3d0,#34d399);transform:translateY(-4px)}.m8pn .st .vs{box-shadow:inset 0 -4px #16a34a}.m8pn .bx{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.m8pn .bx div{border-radius:14px;padding:14px;min-height:80px;transition:.3s;opacity:.35}.m8pn .bx .a{opacity:1;transform:scale(1.03)}.m8pn .c{text-align:center;font-weight:700;margin-top:8px}@media(max-width:600px){.m8pn .st{grid-template-columns:repeat(3,1fr)}}</style>
    <div class="st">${N.map((n,i)=>`<button data-i="${i}"><span>${n[0]}</span>${n[1]}</button>`).join('')}</div>
    <div class="sim-ctl" style="justify-content:center">${_seg('m',[['0','⏪ Trước kia'],['1','💻 Có tin học']],'1')}</div>
    <div class="bx"><div class="b0" style="background:#f1f5f9"></div><div class="b1" style="background:#dcfce7"></div></div><div class="c"></div></div>`));
  let i=0, m='1'; const vs=new Set();
  function draw(){const n=N[i]; e.querySelectorAll('.st button').forEach((b,k)=>{b.classList.toggle('on',k===i); b.classList.toggle('vs',vs.has(k));});
    e.querySelector('.b0').innerHTML='<b>⏪ Trước kia</b><br>'+n[2]; e.querySelector('.b1').innerHTML='<b>💻 Có tin học</b><br>'+n[3];
    e.querySelector('.b0').classList.toggle('a',m==='0'); e.querySelector('.b1').classList.toggle('a',m==='1'); e.querySelector('.c').textContent='Đã ghé '+vs.size+'/'+N.length+' nghề'+(vs.size===N.length?' 🎉':'');}
  e.querySelectorAll('.st button').forEach(b=>b.onclick=()=>{i=+b.dataset.i; vs.add(i); FX.play(vs.size===N.length?'win':'ding'); draw();});
  _wireSeg(e,(n,v)=>{m=v; draw();}); vs.add(0); draw(); return e;
};
SIMS_BAI.binhDang=function(){
  const S=[['Con gái cũng có thể là lập trình viên giỏi',1],['Máy tính là đồ chơi của con trai',0],['Ai thích cũng có thể tham gia CLB Robot',1],['Nữ không hợp với nghề an toàn thông tin',0],['Cả bạn nam và nữ đều được dùng phòng máy như nhau',1],['Chỉ nam giới mới làm được kĩ sư phần mềm',0]];
  const e=_el(_shell('Cân bình đẳng giới','Bấm <b>⚖️ Đặt lên cân</b> cho mỗi nhận định. Nhận định <b>bình đẳng</b> giữ cân thăng bằng; <b>định kiến</b> làm cân lệch. Rồi em tự đánh giá.',
   `<div class="m8bd2"><style>.m8bd2 svg{width:100%;max-width:420px;display:block;margin:auto}.m8bd2 .bm{transition:transform .6s;transform-origin:210px 70px}.m8bd2 .nd{text-align:center;font:700 19px system-ui;padding:12px;border-radius:14px;background:#f5f3ff;min-height:50px}.m8bd2 .vd{display:flex;gap:10px;justify-content:center;margin:10px 0}.m8bd2 .ms{text-align:center;font-weight:700;min-height:22px}</style>
    <div class="nd"></div><svg viewBox="0 0 420 170"><polygon points="195,165 225,165 210,70" fill="#94a3b8"/><g class="bm"><rect x="40" y="66" width="340" height="8" rx="4" fill="#475569"/><text x="70" y="58" font-size="34" text-anchor="middle">👧</text><text x="350" y="58" font-size="34" text-anchor="middle">👦</text></g></svg>
    <div class="vd"><button class="btn" style="background:#16a34a" data-v="1">⚖️ Bình đẳng</button><button class="btn" style="background:#dc2626" data-v="0">⚠️ Định kiến</button></div><div class="ms"></div></div>`));
  let i=0, ok=0;
  const show=()=>{e.querySelector('.nd').textContent='“'+S[i%S.length][0]+'”'; e.querySelector('.bm').style.transform='rotate(0deg)';};
  e.querySelectorAll('.vd button').forEach(b=>b.onclick=()=>{const s=S[i%S.length], r=+b.dataset.v===s[1]; if(r) ok++;
    e.querySelector('.bm').style.transform=s[1]?'rotate(0deg)':'rotate('+(Math.random()<.5?-14:14)+'deg)';
    const m=e.querySelector('.ms'); m.innerHTML=(r?'🎉 Đúng! ':'❌ Chưa đúng. ')+(s[1]?'Đây là nhận định bình đẳng.':'Đây là định kiến giới – cân bị lệch!')+' (Điểm '+ok+'/'+(i+1)+')'; m.style.color=r?'#15803d':'#b91c1c';
    FX.play(r?'ding':'drum'); i++; setTimeout(show,1400);});
  show(); return e;
};

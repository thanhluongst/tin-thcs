/* Tin học 6 · Bài 8. Thư điện tử · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: Mai gửi bài thuyết trình cho cô giáo và lời chúc cho bạn Lan ở Pháp.
   Mô phỏng: t6_thutay (Thư tay hay thư điện tử?), t6_diachi (Kiểm tra địa chỉ thư), t6_soanthu (Soạn và gửi thư). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Thư tay hay thư điện tử?',hd:'Khởi động · 5 phút',code:'1',ic:'',phut:5,
  story:'<p>Mai muốn gửi lời chúc sinh nhật cho Lan ở Paris. Gửi <b>thư tay</b> qua bưu điện hay gửi <b>thư điện tử</b>? Thử cả hai trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_thutay'},
      {id:'k1',type:'multi',q:'Ưu điểm của thư điện tử so với thư tay (chọn các ý đúng)',opts:['Gửi nhanh, gần như tức thì','Gửi cho nhiều người cùng lúc','Đính kèm được tệp ảnh, video','Không cần Internet'],ok:[0,1,2]}],
  key:['<b>Thư điện tử</b> (email) gửi qua Internet: <b>nhanh</b>, rẻ, gửi được <b>nhiều người</b>, kèm <b>tệp</b>.']},

 {t:'Hộp thư và địa chỉ thư',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Mỗi người dùng có một <b>hộp thư</b> với <b>địa chỉ thư</b> dạng <code>&lt;tên đăng nhập&gt;@&lt;tên máy chủ thư&gt;</code>, vd <code>mai.nguyen@gmail.com</code>. Kiểm tra các địa chỉ trong mô phỏng.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_diachi'},
      {id:'h1',type:'sort',q:'Địa chỉ thư nào hợp lệ?',cols:{c0:'Hợp lệ',c1:'Không hợp lệ'},items:[{t:'lan2012@yahoo.com',a:'c0'},{t:'mai nguyen@gmail.com',a:'c1'},{t:'thaygiao.tin@thcs.edu.vn',a:'c0'},{t:'binh.gmail.com',a:'c1'},{t:'an@@gmail.com',a:'c1'}]},
      {id:'h2',type:'single',q:'Trong địa chỉ <code>lan2012@yahoo.com</code>, phần <code>yahoo.com</code> là gì?',opts:['Tên đăng nhập','Tên máy chủ thư điện tử','Mật khẩu','Tiêu đề thư'],ok:1}],
  key:['Địa chỉ thư: <b>tên đăng nhập@tên máy chủ thư</b>; mỗi địa chỉ là <b>duy nhất</b>.']},

 {t:'Soạn và gửi thư',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',ic:'',phut:10,
  story:'<p>Mai gửi bài thuyết trình cho cô giáo <code>co.hoa@thcs.edu.vn</code>. Điền người nhận, tiêu đề, nội dung, đính kèm tệp rồi bấm <b>Gửi</b>.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_soanthu'},
      {id:'h3',type:'single',q:'Thiếu ô nào thì thư <b>không gửi được</b>?',opts:['Tiêu đề','Người nhận (địa chỉ)','Tệp đính kèm','Lời chào'],ok:1},
      {id:'h4',type:'tf',q:'Đúng hay Sai?',items:[{t:'Có thể gửi một thư cho nhiều người cùng lúc',a:'T'},{t:'Nên mở mọi tệp đính kèm từ người lạ',a:'F'},{t:'Cần giữ bí mật mật khẩu hộp thư',a:'T'},{t:'Thư điện tử cần kết nối Internet',a:'T'}]}],
  key:['Soạn thư: <b>người nhận</b>, <b>tiêu đề</b>, <b>nội dung</b>, (tệp đính kèm) → <b>Gửi</b>.']},

 {t:'Ưu, nhược điểm',hd:'Luyện tập · 7 phút',code:'3',ic:'',phut:7,
  qs:[{id:'l1',type:'sort',q:'Xếp vào đúng cột.',cols:{c0:'Ưu điểm',c1:'Nhược điểm'},items:[{t:'Gửi nhanh, chi phí thấp',a:'c0'},{t:'Có thể bị lộ thông tin nếu lộ mật khẩu',a:'c1'},{t:'Đính kèm được tệp',a:'c0'},{t:'Có thể nhận thư rác, thư lừa đảo, virus',a:'c1'},{t:'Gửi cho nhiều người cùng lúc',a:'c0'},{t:'Cần thiết bị và Internet',a:'c1'}]},
      {id:'l2',type:'single',q:'Nhận thư lạ: “Bạn trúng thưởng iPhone, bấm vào đây!”. Em nên…',opts:['Bấm ngay','Không bấm, xoá thư, báo người lớn','Gửi lại cho bạn bè','Trả lời kèm mật khẩu'],ok:1}],
  key:['Dùng thư điện tử <b>an toàn</b>: không mở thư lạ, giữ <b>mật khẩu</b>.']},

 {t:'Thư cho thầy cô',hd:'Vận dụng · 6 phút',code:'4',ic:'',phut:6,
  qs:[{id:'v1',type:'text',q:'Viết tiêu đề và 2–3 câu nội dung thư em gửi cô giáo nộp bài tập.',ans:'VD: Tiêu đề: Bài tập Tin học – Nguyễn Văn An 6A. Nội dung: Em chào cô ạ. Em gửi cô bài tập Tin học bài 7. Em cảm ơn cô.'}],
  key:['Thư lịch sự: <b>tiêu đề rõ</b>, có <b>lời chào</b>, <b>ký tên</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Muốn có thư điện tử, trước hết em cần…',opts:['Mua tem','Đăng kí (tạo) tài khoản thư điện tử','Mua máy in','Cài Paint'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Tài khoản thư</b> = địa chỉ + mật khẩu; gửi thư nhanh, cần dùng <b>an toàn</b>.']}
];

const GHIBAI={so:'Bài 8:',ten:'THƯ ĐIỆN TỬ',muc:[
 {step:2,h:'Thư điện tử',it:['Thư gửi qua Internet: <b>nhanh</b>, nhiều người, kèm <b>tệp</b>.','Địa chỉ: <b>tên đăng nhập@tên máy chủ thư</b>.']},
 {step:3,h:'Gửi thư',it:['Điền <b>người nhận, tiêu đề, nội dung</b> → Gửi.']},
 {step:4,h:'An toàn',it:['Giữ <b>mật khẩu</b>; không mở thư, tệp lạ.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}.t6 .fm{max-width:560px;margin:auto;display:grid;gap:6px}.t6 .fm input,.t6 .fm textarea{font:600 15px system-ui;padding:8px 10px;border-radius:8px;border:2px solid #cbd5e1;width:100%;box-sizing:border-box}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_thutay=function(){
  const e=t6('Thư tay hay thư điện tử?','Bấm từng cách gửi. Xem thời gian thư tới Paris và gửi được cho bao nhiêu bạn.',
   `<div class="g"><button type="button" class="c" data-k="tay"><span class="e">✉️📮</span>Thư tay qua bưu điện</button><button type="button" class="c" data-k="mail"><span class="e">📧</span>Thư điện tử</button></div>
    <div style="max-width:520px;margin:auto;position:relative;height:56px;background:linear-gradient(90deg,#fde68a,#bfdbfe);border-radius:14px"><span style="position:absolute;left:8px;top:14px;font-weight:800">🇻🇳 Hà Nội</span><span style="position:absolute;right:8px;top:14px;font-weight:800">Paris 🇫🇷</span><span class="pk" style="position:absolute;left:90px;top:6px;font-size:32px;transition:left 0s">✉️</span></div>
    <div class="kq">Chọn cách gửi</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Cách gửi</th><th>Thời gian</th><th>Kèm ảnh, video?</th></tr></table>`);
  const hist=[], pk=e.querySelector('.pk');
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{const m=b.dataset.k==='mail'; pk.style.transition='left 0s'; pk.style.left='90px'; pk.textContent=m?'📧':'✉️';
    setTimeout(()=>{pk.style.transition=m?'left .4s':'left 4s linear'; pk.style.left='calc(100% - 140px)';},30); FX.play('whoosh');
    setTimeout(()=>{t6kq(e,m,m?'📧 Tới nơi sau <b>vài giây</b>! Có thể gửi cùng lúc cho cả lớp, kèm ảnh, video.':'✉️ Tới nơi sau khoảng <b>7–10 ngày</b>, mỗi lần một người nhận.');
      hist.unshift([m?'Thư điện tử':'Thư tay',m?'Vài giây':'7–10 ngày',m?'Được':'Không']); if(hist.length>4) hist.pop(); histTable(e,hist,(v,j)=>j===1?(v==='Vài giây'?'g':'r'):'');},m?500:4100);});
  return e;
};
SIMS_BAI.t6_diachi=function(){
  const A=['mai.nguyen@gmail.com','lan2012@yahoo.com','co.hoa@thcs.edu.vn','binh.gmail.com','an@@gmail.com','mai nguyen@gmail.com','@gmail.com','khoa@'];
  const e=t6('Kiểm tra địa chỉ thư','Bấm một địa chỉ (hoặc tự gõ) để kiểm tra. Địa chỉ hợp lệ được tách thành <b>tên đăng nhập</b> và <b>tên máy chủ</b>.',
   `<div class="g">${A.map(a=>`<button type="button" class="c" data-a="${a}" style="font-family:Consolas,monospace">${a}</button>`).join('')}</div>
    <div class="sim-ctl" style="justify-content:center"><input class="tu" style="font:600 16px Consolas,monospace;padding:8px;border-radius:8px;border:2px solid #94a3b8;min-width:240px" placeholder="tự gõ địa chỉ…"><button type="button" class="btn acc kt">✔ Kiểm tra</button></div><div class="kq">Chọn một địa chỉ</div>`);
  const check=a=>{const p=a.split('@');
    if(/\s/.test(a)) return [0,'Có <b>dấu cách</b>, không hợp lệ'];
    if(p.length!==2) return [0,p.length<2?'Thiếu dấu <b>@</b>':'Có nhiều hơn một dấu <b>@</b>'];
    if(!p[0]) return [0,'Thiếu <b>tên đăng nhập</b> trước @'];
    if(!/^[\w-]+(\.[\w-]+)+$/.test(p[1])) return [0,'Thiếu hoặc sai <b>tên máy chủ thư</b> sau @'];
    return [1,`<span style="background:#bfdbfe;padding:2px 6px;border-radius:6px">${p[0]}</span> @ <span style="background:#fde68a;padding:2px 6px;border-radius:6px">${p[1]}</span><br><small>tên đăng nhập · tên máy chủ thư</small>`];};
  const show=(a,b)=>{const r=check(a); if(b){b.classList.remove('ok','no'); b.classList.add(r[0]?'ok':'no');} t6kq(e,!!r[0],(r[0]?'✓ Hợp lệ: ':'✗ ')+r[1]);};
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>show(b.dataset.a,b));
  e.querySelector('.kt').onclick=()=>{const v=e.querySelector('.tu').value.trim().replace(/</g,''); if(v) show(v);};
  return e;
};
SIMS_BAI.t6_soanthu=function(){
  const e=t6('Soạn và gửi thư','Điền thư rồi bấm <b>📨 Gửi</b>. Thử bỏ trống ô <b>Đến</b> hoặc gõ sai địa chỉ xem chuyện gì xảy ra.',
   `<div class="fm"><label>Đến: <input class="to" value="co.hoa@thcs.edu.vn"></label><label>Tiêu đề: <input class="sub" value="Bài thuyết trình Vịnh Hạ Long – Mai 6A"></label>
    <textarea class="bd" rows="3">Em chào cô ạ. Em gửi cô bài thuyết trình của nhóm em. Em cảm ơn cô!</textarea>
    <div><button type="button" class="btn ghost att">📎 Đính kèm tệp</button> <span class="fl"></span></div><button type="button" class="btn acc send">📨 Gửi</button></div>
    <div class="kq">Chưa gửi</div><h4 style="margin:8px 0 4px">📥 Hộp thư đến của cô Hoa</h4><table class="tbl sim-hist"><tr><th>#</th><th>Từ</th><th>Tiêu đề</th><th>Tệp</th></tr></table>`);
  const hist=[]; let att=false;
  e.querySelector('.att').onclick=()=>{att=!att; e.querySelector('.fl').textContent=att?'📄 Ha-Long.pptx (2 MB)':''; FX.play('tick');};
  e.querySelector('.send').onclick=()=>{const to=e.querySelector('.to').value.trim(), sub=e.querySelector('.sub').value.trim().replace(/</g,'');
    if(!to){t6kq(e,false,'✗ Chưa có địa chỉ người nhận, không gửi được!'); return;}
    if(!/^[^\s@]+@[\w-]+(\.[\w-]+)+$/.test(to)){t6kq(e,false,'✗ Địa chỉ người nhận không hợp lệ, thư bị trả lại.'); return;}
    if(to.toLowerCase()!=='co.hoa@thcs.edu.vn'){t6kq(e,true,'✓ Đã gửi tới '+to.replace(/</g,'')+' (không phải hộp thư của cô Hoa)'); return;}
    FX.play('whoosh'); hist.unshift(['mai.nguyen@gmail.com',sub||'(không có tiêu đề)',att?'📎':'—']); histTable(e,hist,()=>'');
    t6kq(e,true,'✓ Cô Hoa đã nhận thư'+(sub?'':' (nhưng thiếu tiêu đề, cô khó biết thư về việc gì)')+(att?' kèm tệp bài thuyết trình.':'. Em quên đính kèm tệp?'));};
  return e;
};

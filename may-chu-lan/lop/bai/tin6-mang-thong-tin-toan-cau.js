/* Tin học 6 · Bài 6. Mạng thông tin toàn cầu · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: Mai lên mạng tìm hiểu về Vịnh Hạ Long cho bài thuyết trình.
   Mô phỏng: t6_mangnhen (Mạng nhện thông tin), t6_luotweb (Lướt web bằng liên kết), t6_godiachi (Gõ địa chỉ trang web). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Mạng nhện thông tin',hd:'Khởi động · 5 phút',code:'1',ic:'',phut:5,
  story:'<p>“Web” trong tiếng Anh nghĩa là <b>mạng nhện</b>. Các trang thông tin trên Internet nối với nhau như sợi tơ nhện. Bấm vào các trang để thấy chúng liên kết thế nào.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_mangnhen'},
      {id:'k1',type:'single',q:'Vì sao gọi là “mạng thông tin toàn cầu” (World Wide Web)?',opts:['Vì các trang thông tin trên khắp thế giới liên kết với nhau như mạng nhện','Vì có nhiều con nhện','Vì chỉ có ở một nước','Vì dùng dây điện'],ok:0}],
  key:['<b>WWW</b>: các trang thông tin trên Internet <b>liên kết</b> với nhau thành mạng toàn cầu.']},

 {t:'Trang web, website, siêu liên kết',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',ic:'',phut:12,
  story:'<p>Mai mở website <b>halong.vn</b> (giả định). Bấm vào các <b>chữ gạch chân</b> trên trang (siêu liên kết) để chuyển sang trang khác. Quan sát thanh địa chỉ.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_luotweb'},
      {id:'h1',type:'match',q:'Ghép khái niệm với ý nghĩa.',items:['Trang web','Website','Siêu liên kết','Địa chỉ trang web','Trang chủ'],
       opts:['Nhiều trang web liên quan, cùng một địa chỉ truy cập','Chỗ bấm vào để chuyển tới trang khác','Trang mở ra đầu tiên của website','Trang thông tin có văn bản, ảnh, video…','Dòng chữ trên thanh địa chỉ, vd www.abc.vn'],ok:[3,0,1,4,2]},
      {id:'h2',type:'single',q:'Khi di chuột lên siêu liên kết, con trỏ thường đổi thành hình gì?',opts:['Bàn tay 👆','Đồng hồ ⏳','Chữ I','Dấu cộng ➕'],ok:0}],
  key:['<b>Trang web</b> chứa văn bản, ảnh, video và <b>siêu liên kết</b>; nhiều trang tạo thành <b>website</b>, có <b>trang chủ</b> và <b>địa chỉ</b>.']},

 {t:'Trình duyệt web',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',ic:'',phut:8,
  story:'<p>Để xem trang web, ta dùng <b>trình duyệt</b> (Chrome, Edge, Firefox, Cốc Cốc…). Gõ địa chỉ vào <b>thanh địa chỉ</b> rồi nhấn Enter.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_godiachi'},
      {id:'h3',type:'sort',q:'Phần mềm nào là trình duyệt web?',cols:{c0:'Trình duyệt',c1:'Không phải'},items:[{t:'Google Chrome',a:'c0'},{t:'Microsoft Word',a:'c1'},{t:'Cốc Cốc',a:'c0'},{t:'Paint',a:'c1'},{t:'Mozilla Firefox',a:'c0'},{t:'Microsoft Edge',a:'c0'}]},
      {id:'h4',type:'single',q:'Gõ sai một chữ trong địa chỉ trang web thì sao?',opts:['Vẫn mở đúng trang','Có thể không mở được hoặc mở trang khác','Máy tính bị hỏng','Trình duyệt tự xoá'],ok:1}],
  key:['<b>Trình duyệt</b> là phần mềm để xem trang web; cần gõ <b>đúng địa chỉ</b>.']},

 {t:'Thử thách nhanh',hd:'Luyện tập · 7 phút',code:'3',ic:'',phut:7,
  qs:[{id:'l1',type:'tf',q:'Đúng hay Sai?',items:[{t:'Mỗi website có một địa chỉ truy cập',a:'T'},{t:'Trang web chỉ chứa chữ',a:'F'},{t:'Trình duyệt dùng để xem trang web',a:'T'},{t:'WWW và Internet là một',a:'F'}]},
      {id:'l2',type:'single',q:'Địa chỉ nào đúng dạng địa chỉ trang web?',opts:['www.vietnamtourism.gov.vn','vietnam tourism','@vietnam.vn@','vietnam//gov'],ok:0}],
  key:['<b>WWW</b> là một dịch vụ chạy trên <b>Internet</b>.']},

 {t:'Khám phá một website',hd:'Vận dụng · 6 phút',code:'4',ic:'',phut:6,
  qs:[{id:'v1',type:'text',q:'Kể tên một website em hay dùng để học tập. Trang chủ của nó có những gì?',ans:'VD: hanhtrangso.nxbgd.vn – trang chủ có ô tìm kiếm, danh mục sách, liên kết tới các bài học.'}],
  key:['Biết <b>truy cập</b> và <b>khai thác</b> thông tin trên website học tập.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Bấm vào đâu để chuyển từ trang này sang trang khác?',opts:['Siêu liên kết','Thanh cuộn','Nút tắt máy','Bàn phím số'],ok:0},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Trang web – website – siêu liên kết – địa chỉ – trình duyệt</b>.']}
];

const GHIBAI={so:'Bài 6:',ten:'MẠNG THÔNG TIN TOÀN CẦU',muc:[
 {step:2,h:'Trang web, website',it:['<b>Trang web</b>: văn bản, ảnh, video, <b>siêu liên kết</b>.','<b>Website</b>: nhiều trang web liên quan, có <b>địa chỉ</b> và <b>trang chủ</b>.']},
 {step:3,h:'Trình duyệt',it:['Phần mềm xem trang web: Chrome, Edge, Firefox, Cốc Cốc.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}.t6 .br{max-width:620px;margin:10px auto;border:2px solid #94a3b8;border-radius:12px;overflow:hidden;background:#fff;color:#0f172a}.t6 .br .bar{display:flex;gap:6px;align-items:center;background:#e2e8f0;padding:8px}.t6 .br .url{flex:1;background:#fff;border-radius:999px;padding:6px 12px;font:600 15px Consolas,monospace;border:1px solid #cbd5e1}.t6 .br .pg{padding:14px;min-height:150px}.t6 .br a{color:#1d4ed8;text-decoration:underline;cursor:pointer;font-weight:700}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_mangnhen=function(){
  const P=[['📰 Báo',300,40],['🏝️ Hạ Long',120,110],['🗺️ Bản đồ',480,110],['🎓 Học tập',160,220],['🎬 Video',440,220],['🏨 Khách sạn',300,170]];
  const L=[[0,1],[0,2],[1,5],[2,5],[1,3],[2,4],[3,5],[4,5],[0,5],[1,4]];
  const e=t6('Mạng nhện thông tin','Bấm vào một trang: các trang <b>liên kết</b> với nó sẽ sáng lên.',
   `<svg viewBox="0 0 600 270" style="width:100%;max-width:600px;display:block;margin:auto;background:#f8fafc;border-radius:14px">${L.map(l=>`<line data-a="${l[0]}" data-b="${l[1]}" x1="${P[l[0]][1]}" y1="${P[l[0]][2]}" x2="${P[l[1]][1]}" y2="${P[l[1]][2]}" stroke="#cbd5e1" stroke-width="3"/>`).join('')}
    ${P.map((p,i)=>`<g data-t6c="1" class="nd" data-i="${i}" style="cursor:pointer"><rect x="${p[1]-62}" y="${p[2]-20}" width="124" height="40" rx="12" fill="#fff" stroke="#64748b" stroke-width="2"/><text x="${p[1]}" y="${p[2]+6}" font-size="15" font-weight="700" text-anchor="middle">${p[0]}</text></g>`).join('')}</svg><div class="kq">Chọn một trang</div>`);
  e.querySelectorAll('g.nd').forEach(g=>g.onclick=()=>{const i=+g.dataset.i, nb=new Set([i]);
    e.querySelectorAll('line').forEach(l=>{const a=+l.dataset.a,b=+l.dataset.b,on=a===i||b===i; l.setAttribute('stroke',on?'#f59e0b':'#cbd5e1'); l.setAttribute('stroke-width',on?6:3); if(on){nb.add(a);nb.add(b);}});
    e.querySelectorAll('g.nd rect').forEach((r,k)=>r.setAttribute('fill',k===i?'#fde68a':nb.has(k)?'#dbeafe':'#fff'));
    t6kq(e,true,`${P[i][0]} liên kết tới <b>${nb.size-1}</b> trang khác. Mọi trang đều nối với nhau như mạng nhện!`);});
  return e;
};
SIMS_BAI.t6_luotweb=function(){
  const W={home:['www.halong.vn','🏠 Trang chủ – Vịnh Hạ Long','Chào mừng đến Vịnh Hạ Long – Di sản thiên nhiên thế giới! 🌊',[['dao','Các hòn đảo đẹp'],['hang','Hang động'],['anh','Thư viện ảnh']]],
    dao:['www.halong.vn/dao','🏝️ Các hòn đảo','Vịnh có gần 2000 hòn đảo lớn nhỏ, nổi tiếng là hòn Gà Chọi.',[['home','Về trang chủ'],['anh','Xem ảnh đảo']]],
    hang:['www.halong.vn/hang-dong','🕳️ Hang động','Hang Sửng Sốt, động Thiên Cung… có nhũ đá rất đẹp.',[['home','Về trang chủ'],['dao','Các hòn đảo']]],
    anh:['www.halong.vn/thu-vien-anh','🖼️ Thư viện ảnh','⛰️🌅🚣 ⛵🏝️🌊',[['home','Về trang chủ'],['hang','Hang động']]]};
  const e=t6('Lướt web bằng liên kết','Bấm vào các <b>chữ gạch chân màu xanh</b> (siêu liên kết). Nút ⬅ để quay lại.',
   `<div class="br"><div class="bar"><button type="button" class="btn ghost bk">⬅</button><span class="url"></span></div><div class="pg"></div></div><div class="kq">Đang ở trang chủ</div><p style="text-align:center">Số trang đã xem: <span class="sc">1/4</span></p>`);
  const st=['home'], seen=new Set(['home']);
  const go=(k,push)=>{if(push) st.push(k); seen.add(k); const w=W[k];
    e.querySelector('.url').textContent='🔒 '+w[0];
    e.querySelector('.pg').innerHTML=`<h3 style="margin:0 0 6px">${w[1]}</h3><p>${w[2]}</p><p>${w[3].map(l=>`<a data-k="${l[0]}">👉 ${l[1]}</a>`).join(' &nbsp; ')}</p>`;
    e.querySelectorAll('.pg a').forEach(a=>a.onclick=()=>{FX.play('whoosh'); go(a.dataset.k,true);});
    e.querySelector('.sc').textContent=seen.size+'/4'; t6kq(e,seen.size===4?true:null,'Địa chỉ trang: <code>'+w[0]+'</code>'+(seen.size===4?' · 🎉 Em đã xem hết website!':''));};
  e.querySelector('.bk').onclick=()=>{if(st.length>1){st.pop(); go(st[st.length-1]);}};
  go('home'); return e;
};
SIMS_BAI.t6_godiachi=function(){
  const OK={'www.vietnamtourism.gov.vn':'🇻🇳 Tổng cục Du lịch Việt Nam','www.halong.vn':'🌊 Vịnh Hạ Long','vi.wikipedia.org':'📚 Wikipedia tiếng Việt','hanhtrangso.nxbgd.vn':'🎒 Hành trang số – sách giáo khoa'};
  const e=t6('Gõ địa chỉ trang web','Gõ một địa chỉ vào thanh địa chỉ rồi nhấn <b>Enter</b> hoặc <b>➜</b>. Thử gõ sai một chữ xem sao!<br>Gợi ý: <code>www.halong.vn</code>, <code>vi.wikipedia.org</code>, <code>hanhtrangso.nxbgd.vn</code>',
   `<div class="br"><div class="bar">🌐<input class="url" value="www.halong.vn"><button type="button" class="btn acc go">➜</button></div><div class="pg">Trang trống</div></div><div class="kq">Chưa mở trang nào</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Địa chỉ đã gõ</th><th>Kết quả</th></tr></table>`);
  const hist=[], inp=e.querySelector('input');
  const go=()=>{const u=inp.value.trim().toLowerCase().replace(/^https?:\/\//,'').replace(/\/$/,''), t=OK[u];
    e.querySelector('.pg').innerHTML=t?`<h3>${t}</h3><p>Trang web đã mở thành công ✓</p>`:`<h3>😕 Không tìm thấy trang</h3><p>Không truy cập được <code>${u.replace(/</g,'&lt;')}</code>. Kiểm tra lại địa chỉ.</p>`;
    t6kq(e,!!t,t?'✓ Trình duyệt đã mở trang':'✗ Địa chỉ sai, không mở được');
    hist.unshift([u.replace(/</g,'&lt;'),t?'Mở được':'Không tìm thấy']); if(hist.length>6) hist.pop(); histTable(e,hist,(v,j)=>j===1?(v==='Mở được'?'g':'r'):'');};
  e.querySelector('.go').onclick=go; inp.onkeydown=ev=>{if(ev.key==='Enter') go();};
  return e;
};

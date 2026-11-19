/* Tin học 6 · Bài 5. Internet · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: Mai muốn gửi lời chúc tới bạn Lan đang ở Pháp.
   Mô phỏng: t6_mangmang (Mạng của các mạng), t6_goitin (Đường đi của lời chúc), t6_dichvu (Internet giúp gì cho em?). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Mạng của các mạng',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p>Mạng ở nhà Mai nối với mạng của nhà cung cấp, rồi nối với mạng của cả nước, của các nước khác… Bấm <b>Mở rộng</b> để xem các mạng nối với nhau thành <b>Internet</b>.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_mangmang'},
      {id:'k1',type:'single',q:'Internet là gì?',opts:['Một máy tính rất lớn ở Mỹ','Mạng kết nối hàng triệu máy tính và mạng máy tính khắp thế giới','Một phần mềm chơi trò chơi','Mạng trong một phòng học'],ok:1}],
  key:['<b>Internet</b> là mạng kết nối các mạng máy tính <b>khắp thế giới</b>.']},

 {t:'Đặc điểm của Internet',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Mai gửi lời chúc từ Hà Nội tới Lan ở Paris. Lời chúc đi qua nhiều mạng. Thử <b>cắt đứt một đường cáp</b> rồi gửi lại: lời chúc còn tới không?</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_goitin'},
      {id:'h1',type:'multi',q:'Đặc điểm của Internet (chọn các ý đúng)',opts:['Tính toàn cầu','Tính tương tác','Dễ tiếp cận','Không chủ sở hữu','Chỉ một công ty quản lí toàn bộ'],ok:[0,1,2,3]},
      {id:'h2',type:'single',q:'Một đường cáp bị đứt, lời chúc vẫn tới vì…',opts:['Lời chúc đi đường khác','Lời chúc bị huỷ','Máy tự viết lại lời chúc','Không thể tới'],ok:0}],
  key:['Internet có tính <b>toàn cầu</b>, <b>tương tác</b>, <b>dễ tiếp cận</b>, <b>không chủ sở hữu</b>.']},

 {t:'Lợi ích của Internet',hd:'Hình thành kiến thức · Hoạt động 2 · 9 phút',code:'2.2',ic:'',phut:9,
  story:'<p>Bấm vào từng nhu cầu của Mai để xem Internet giúp được gì.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_dichvu'},
      {id:'h3',type:'match',q:'Ghép nhu cầu với dịch vụ trên Internet.',items:['Xem thông tin, tin tức','Gửi thư cho bạn','Học trực tuyến với thầy cô','Mua sách'],opts:['Thư điện tử','Thương mại điện tử','Học trực tuyến','Web (WWW)'],ok:[3,0,2,1]},
      {id:'h4',type:'tf',q:'Đúng hay Sai?',items:[{t:'Internet giúp tìm kiếm thông tin nhanh',a:'T'},{t:'Dùng Internet không bao giờ có hại',a:'F'},{t:'Có thể giải trí trên Internet: nghe nhạc, xem phim',a:'T'}]}],
  key:['Lợi ích: <b>học tập, làm việc, liên lạc, giải trí, mua sắm</b>… nhưng cần dùng <b>hợp lí</b>.']},

 {t:'Thử thách nhanh',hd:'Luyện tập · 7 phút',code:'3',ic:'',phut:7,
  qs:[{id:'l1',type:'single',q:'Tính “không chủ sở hữu” của Internet nghĩa là…',opts:['Ai cũng sở hữu riêng Internet','Không tổ chức, cá nhân nào nắm toàn bộ Internet','Internet miễn phí hoàn toàn','Internet không có máy chủ'],ok:1},
      {id:'l2',type:'sort',q:'Việc nào <b>cần</b> Internet?',cols:{c0:'Cần Internet',c1:'Không cần Internet'},items:[{t:'Gửi thư điện tử',a:'c0'},{t:'Soạn văn bản trên máy',a:'c1'},{t:'Xem video trực tuyến',a:'c0'},{t:'Vẽ bằng Paint',a:'c1'},{t:'Gọi video cho ông bà ở xa',a:'c0'}]}],
  key:['Người dùng truy cập Internet qua <b>nhà cung cấp dịch vụ</b>.']},

 {t:'Internet và em',hd:'Vận dụng · 5 phút',code:'4',ic:'',phut:5,
  qs:[{id:'v1',type:'text',q:'Em thường dùng Internet làm gì? Nêu một điều em nên tránh khi dùng Internet.',ans:'VD: học bài, xem tin tức, gọi video. Nên tránh dùng quá lâu, vào trang không phù hợp, chia sẻ thông tin cá nhân.'}],
  key:['Dùng Internet <b>đúng mục đích</b>, <b>đủ thời gian</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Muốn máy tính ở nhà vào được Internet, em cần…',opts:['Đăng kí với nhà cung cấp dịch vụ Internet','Mua máy in','Cài Paint','Không cần gì'],ok:0},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['Internet: mạng <b>toàn cầu</b>, nhiều <b>lợi ích</b>, cần dùng <b>an toàn, hợp lí</b>.']}
];

const GHIBAI={so:'Bài 5:',ten:'INTERNET',muc:[
 {step:2,h:'Internet',it:['Mạng kết nối các mạng máy tính <b>khắp thế giới</b>.','Truy cập qua <b>nhà cung cấp dịch vụ Internet</b>.']},
 {step:3,h:'Đặc điểm',it:['<b>Toàn cầu, tương tác, dễ tiếp cận, không chủ sở hữu</b>.']},
 {step:4,h:'Lợi ích',it:['Học tập, liên lạc, giải trí, mua sắm…; dùng <b>hợp lí</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_mangmang=function(){
  const L=[['🏠','Mạng ở nhà Mai','3 thiết bị'],['🏢','Mạng nhà cung cấp dịch vụ','hàng nghìn gia đình'],['🇻🇳','Mạng cả nước','hàng triệu thiết bị'],['🌏','Mạng châu Á','hàng trăm triệu thiết bị'],['🌍','INTERNET – toàn cầu','hàng tỉ thiết bị']];
  const e=t6('Mạng của các mạng','Bấm <b>🔍 Mở rộng</b> nhiều lần để thấy các mạng nối với nhau.',
   `<div class="g lv"></div><div class="sim-ctl" style="justify-content:center"><button type="button" class="btn acc mr">🔍 Mở rộng</button><button type="button" class="btn ghost lai">↺ Làm lại</button></div><div class="kq">Bắt đầu từ mạng ở nhà</div>`);
  let k=0; const show=()=>{e.querySelector('.lv').innerHTML=L.slice(0,k+1).map((l,i)=>`<div class="c ${i===k?'on':''}" style="cursor:default;transform:scale(${.8+i*.06})"><span class="e">${l[0]}</span>${l[1]}<br><small>${l[2]}</small></div>`).join('<span style="font-size:26px;align-self:center">🔗</span>');
    t6kq(e,k===4?true:null,k===4?'🌍 Tất cả các mạng nối lại thành <b>Internet</b>!':'Đang xem: '+L[k][1]); if(k===4) FX.play('sparkle');};
  e.querySelector('.mr').onclick=()=>{if(k<4){k++; show();}}; e.querySelector('.lai').onclick=()=>{k=0; show();}; show();
  return e;
};
SIMS_BAI.t6_goitin=function(){
  const N={HN:[60,120,'Hà Nội'],SG:[200,40,'Singapore'],DB:[200,200,'Dubai'],FR:[340,40,'Frankfurt'],MS:[340,200,'Marseille'],PA:[480,120,'Paris']};
  const ED=[['HN','SG'],['HN','DB'],['SG','FR'],['DB','MS'],['SG','DB'],['FR','PA'],['MS','PA'],['FR','MS']];
  const e=t6('Đường đi của lời chúc','Bấm vào một <b>đường cáp</b> để cắt/nối lại. Bấm <b>💌 Gửi</b> để gửi lời chúc Hà Nội → Paris.',
   `<svg viewBox="0 0 540 250" style="width:100%;max-width:600px;display:block;margin:auto;background:#eff6ff;border-radius:14px">${ED.map((d,i)=>`<line data-t6c="1" data-i="${i}" x1="${N[d[0]][0]}" y1="${N[d[0]][1]}" x2="${N[d[1]][0]}" y2="${N[d[1]][1]}" stroke="#2563eb" stroke-width="8" stroke-linecap="round" style="cursor:pointer"/>`).join('')}
    ${Object.values(N).map(n=>`<circle cx="${n[0]}" cy="${n[1]}" r="20" fill="#fff" stroke="#1e40af" stroke-width="3"/><text x="${n[0]}" y="${n[1]+40}" font-size="13" font-weight="700" text-anchor="middle">${n[2]}</text>`).join('')}<text class="pk" font-size="24" x="48" y="128">💌</text></svg>
    <div class="sim-ctl" style="justify-content:center"><button type="button" class="btn acc run">💌 Gửi</button></div><div class="kq">Đường cáp còn tốt: ${ED.length}/${ED.length}</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Cáp bị cắt</th><th>Kết quả</th></tr></table>`);
  const cut=new Set(), hist=[];
  e.querySelectorAll('line').forEach(l=>l.onclick=()=>{const i=+l.dataset.i; cut.has(i)?cut.delete(i):cut.add(i); l.setAttribute('stroke',cut.has(i)?'#fca5a5':'#2563eb'); l.setAttribute('stroke-dasharray',cut.has(i)?'6 8':''); FX.play('tick'); t6kq(e,null,`Đường cáp còn tốt: ${ED.length-cut.size}/${ED.length}`);});
  e.querySelector('.run').onclick=()=>{const prev={HN:null}, q=['HN']; while(q.length){const u=q.shift(); ED.forEach((d,i)=>{if(cut.has(i)) return; const v=d[0]===u?d[1]:d[1]===u?d[0]:null; if(v&&!(v in prev)){prev[v]=u; q.push(v);}});}
    const pk=e.querySelector('.pk'); let p=null; if('PA' in prev){p=[]; for(let v='PA';v;v=prev[v]) p.unshift(v);}
    hist.unshift([cut.size+' đường',p?'Tới nơi qua '+p.map(x=>N[x][2]).join(' → '):'Không tới được']); if(hist.length>5) hist.pop();
    if(!p){t6kq(e,false,'✗ Mọi đường đều bị cắt, lời chúc không tới được.'); histTable(e,hist,(v,j)=>j===1?(v.startsWith('Tới')?'g':'r'):''); return;}
    FX.play('whoosh'); p.forEach((v,j)=>setTimeout(()=>{pk.setAttribute('x',N[v][0]-12); pk.setAttribute('y',N[v][1]+8); if(j===p.length-1){t6kq(e,true,'✓ Lan đã nhận lời chúc! Đường đi: '+p.map(x=>N[x][2]).join(' → ')); histTable(e,hist,(v,j)=>j===1?(v.startsWith('Tới')?'g':'r'):'');}},j*450));};
  return e;
};
SIMS_BAI.t6_dichvu=function(){
  const D=[['📰','Đọc tin tức','Web (WWW)','Xem các trang web tin tức'],['✉️','Gửi thư cho cô','Thư điện tử','Gửi bài tập, lời chúc'],['🎓','Học với thầy cô từ xa','Học trực tuyến','Lớp học qua video'],['🛒','Mua sách','Thương mại điện tử','Đặt hàng trên mạng'],['🎬','Xem phim, nghe nhạc','Giải trí trực tuyến','Video, âm nhạc'],['💬','Nhắn tin, gọi video','Mạng xã hội, trò chuyện','Liên lạc với ông bà']];
  const e=t6('Internet giúp gì cho em?','Bấm vào từng nhu cầu của Mai.',
   `<div class="g">${D.map((d,i)=>`<button type="button" class="c" data-i="${i}"><span class="e">${d[0]}</span>${d[1]}</button>`).join('')}</div><div class="kq">Chọn một nhu cầu</div><p style="text-align:center">Đã khám phá: <span class="sc">0/6</span></p>`);
  const s=new Set(); e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{const d=D[+b.dataset.i]; s.add(b.dataset.i); b.classList.add('ok'); t6kq(e,true,`${d[0]} ${d[1]} → dịch vụ <b>${d[2]}</b><br><small>${d[3]}</small>`); e.querySelector('.sc').textContent=s.size+'/6'; if(s.size===6) FX.play('sparkle');});
  return e;
};

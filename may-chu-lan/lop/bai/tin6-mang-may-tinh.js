/* Tin học 6 · Bài 4. Mạng máy tính · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: phòng tin học của trường có 1 máy in và nhiều máy tính.
   Mô phỏng: t6_chungmayin (Có mạng và không có mạng), t6_noimang (Nối mạng gửi tệp), t6_dungmang (Lắp mạng cho phòng tin). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Một máy in cho cả lớp',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p>Phòng tin có <b>6 máy tính</b> nhưng chỉ có <b>1 máy in</b>. Cả lớp cần in bài. Nếu các máy <b>không nối với nhau</b> thì sao? Nếu <b>nối thành mạng</b> thì sao?</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_chungmayin'},
      {id:'k1',type:'single',q:'Khi các máy nối mạng, việc in bài thay đổi thế nào?',opts:['Không in được nữa','Mọi máy đều in được qua máy in chung','Chỉ máy nối trực tiếp mới in được','Phải mua thêm 5 máy in'],ok:1}],
  key:['Nối các máy tính lại thành <b>mạng</b> giúp <b>dùng chung</b> thiết bị như máy in.']},

 {t:'Mạng máy tính là gì?',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Giống như các con đường nối các ngôi nhà, <b>dây cáp</b> hoặc <b>sóng</b> nối các máy tính. Hãy nối dây giữa các máy rồi thử <b>gửi tệp</b> từ máy An sang máy Bình.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_noimang'},
      {id:'h1',type:'single',q:'Mạng máy tính là gì?',opts:['Một máy tính rất mạnh','Nhóm máy tính và thiết bị kết nối để truyền thông tin cho nhau','Một phần mềm trò chơi','Dây điện trong nhà'],ok:1},
      {id:'h2',type:'multi',q:'Lợi ích của mạng máy tính (chọn các ý đúng)',opts:['Chia sẻ dữ liệu','Dùng chung máy in, máy quét','Trao đổi thông tin, liên lạc','Làm máy tính không bao giờ hỏng'],ok:[0,1,2]}],
  key:['<b>Mạng máy tính</b>: các máy tính kết nối để <b>chia sẻ dữ liệu, thiết bị</b> và trao đổi thông tin.']},

 {t:'Thành phần của mạng',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',ic:'',phut:10,
  story:'<p>Thầy giao cho nhóm em <b>lắp mạng</b> cho phòng tin: có máy tính, máy tính bảng, máy in. Chọn đủ các thành phần để mạng hoạt động.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_dungmang'},
      {id:'h3',type:'sort',q:'Xếp các thành phần vào đúng nhóm.',cols:{c0:'Thiết bị đầu cuối',c1:'Thiết bị kết nối'},items:[{t:'Máy tính',a:'c0'},{t:'Bộ chuyển mạch (switch)',a:'c1'},{t:'Máy in',a:'c0'},{t:'Dây cáp mạng',a:'c1'},{t:'Điện thoại thông minh',a:'c0'},{t:'Bộ định tuyến không dây (router wifi)',a:'c1'}]},
      {id:'h4',type:'single',q:'Muốn điện thoại vào mạng không cần dây, phòng tin cần thêm gì?',opts:['Máy in','Bộ định tuyến không dây (wifi)','Bàn phím','Loa'],ok:1}],
  key:['Mạng gồm: <b>thiết bị đầu cuối</b>, <b>thiết bị kết nối</b> (có dây/không dây) và <b>phần mềm mạng</b>.']},

 {t:'Lợi ích và kết nối không dây',hd:'Luyện tập · 7 phút',code:'3',ic:'',phut:7,
  qs:[{id:'l1',type:'tf',q:'Đúng hay Sai?',items:[{t:'Mạng không dây dùng sóng để truyền dữ liệu',a:'T'},{t:'Máy tính trong mạng không thể dùng chung máy in',a:'F'},{t:'Phần mềm mạng giúp quản lí việc trao đổi dữ liệu',a:'T'},{t:'Điện thoại không thể là thiết bị đầu cuối',a:'F'}]},
      {id:'l2',type:'match',q:'Ghép thiết bị với vai trò.',items:['Bộ chuyển mạch (switch)','Router wifi','Dây cáp mạng','Máy tính'],opts:['Nhận, gửi dữ liệu cho người dùng','Phát sóng kết nối không dây','Nối nhiều máy tính trong phòng','Đường truyền có dây'],ok:[2,1,3,0]}],
  key:['Có hai cách kết nối: <b>có dây</b> (cáp) và <b>không dây</b> (sóng wifi).']},

 {t:'Kết nối mạng ở trường, ở nhà',hd:'Vận dụng · 5 phút',code:'4',ic:'',phut:5,
  qs:[{id:'v1',type:'text',q:'Nhà em (hoặc trường em) có những thiết bị nào kết nối mạng? Kết nối có dây hay không dây?',ans:'VD: điện thoại, máy tính bảng, ti vi kết nối không dây qua router wifi; máy tính bàn nối dây cáp.'}],
  key:['Nhận ra mạng máy tính <b>quanh em</b>: ở nhà, ở trường.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Thành phần nào <b>không</b> bắt buộc trong mọi mạng máy tính?',opts:['Thiết bị đầu cuối','Thiết bị kết nối','Phần mềm mạng','Máy in màu'],ok:3},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['Mạng = <b>thiết bị đầu cuối</b> + <b>thiết bị kết nối</b> + <b>phần mềm mạng</b>.']}
];

const GHIBAI={so:'Bài 4:',ten:'MẠNG MÁY TÍNH',muc:[
 {step:2,h:'Mạng máy tính',it:['Các máy tính <b>kết nối</b> để truyền thông tin cho nhau.','Lợi ích: <b>chia sẻ dữ liệu, thiết bị</b>, trao đổi thông tin.']},
 {step:3,h:'Thành phần',it:['<b>Thiết bị đầu cuối</b>: máy tính, điện thoại, máy in.','<b>Thiết bị kết nối</b>: cáp, switch, router wifi.','<b>Phần mềm mạng</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_chungmayin=function(){
  const e=t6('Có mạng và không có mạng','Chọn <b>Không nối mạng</b> hoặc <b>Nối mạng</b>, rồi bấm <b>🖨️ In</b> trên từng máy.',
   `<div class="sim-ctl" style="justify-content:center">${_seg('m',[['0','❌ Không nối mạng'],['1','🔗 Nối mạng']],'0')}</div>
    <div class="g">${[1,2,3,4,5,6].map(i=>`<button type="button" class="c" data-i="${i}" style="min-width:80px;padding:6px"><span class="e" style="font-size:26px">🖥️</span>Máy ${i}</button>`).join('')}</div>
    <svg viewBox="0 0 600 120" style="width:100%;max-width:600px;display:block;margin:auto"><line x1="50" y1="0" x2="300" y2="80" stroke="#64748b" stroke-width="4"/><g class="ln" stroke="#2563eb" stroke-width="4" opacity="0">${[1,2,3,4,5].map(i=>`<line x1="${50+i*100}" y1="0" x2="300" y2="80"/>`).join('')}</g>
    <text x="300" y="115" font-size="44" text-anchor="middle">🖨️</text></svg>
    <div class="kq">Bấm vào một máy để in</div><p style="text-align:center">Số máy in được: <span class="sc">0/6</span></p>`);
  let m='0'; const okSet=new Set();
  _wireSeg(e,(n,v)=>{m=v; okSet.clear(); e.querySelector('.ln').setAttribute('opacity',v==='1'?1:0); e.querySelectorAll('.c').forEach(x=>x.classList.remove('ok','no')); e.querySelector('.sc').textContent='0/6';});
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{const i=+b.dataset.i, ok=m==='1'||i===1;
    b.classList.remove('ok','no'); b.classList.add(ok?'ok':'no'); if(ok) okSet.add(i);
    t6kq(e,ok,ok?`🖨️ Máy ${i} in thành công${m==='1'?' qua mạng':' (máy này cắm trực tiếp máy in)'}`:`✗ Máy ${i} không có đường truyền tới máy in`);
    e.querySelector('.sc').textContent=okSet.size+'/6';});
  return e;
};
SIMS_BAI.t6_noimang=function(){
  const N=[['An',80,60],['Bình',520,60],['Chi',80,200],['Dũng',520,200],['Switch',300,130]];
  const e=t6('Nối mạng gửi tệp','Bấm lần lượt <b>hai máy</b> để nối/gỡ dây. Rồi bấm <b>📨 Gửi tệp An → Bình</b>.',
   `<svg viewBox="0 0 600 260" style="width:100%;max-width:600px;display:block;margin:auto;background:#f8fafc;border-radius:14px"><g class="ed"></g>${N.map((n,i)=>`<g class="nd" data-i="${i}" style="cursor:pointer"><circle cx="${n[1]}" cy="${n[2]}" r="34" fill="#fff" stroke="#94a3b8" stroke-width="3"/><text x="${n[1]}" y="${n[2]+8}" font-size="28" text-anchor="middle">${i===4?'🔀':'🖥️'}</text><text x="${n[1]}" y="${n[2]+52}" font-size="14" font-weight="700" text-anchor="middle">${n[0]}</text></g>`).join('')}<text class="pk" font-size="26" opacity="0">📄</text></svg>
    <div class="sim-ctl" style="justify-content:center"><button type="button" class="btn acc run">📨 Gửi tệp An → Bình</button><button type="button" class="btn ghost xoa">✂️ Gỡ hết dây</button></div><div class="kq">Chưa có dây nối nào</div>`);
  const E=new Set(); let sel=null;
  const key=(a,b)=>Math.min(a,b)+'-'+Math.max(a,b);
  const draw=()=>{e.querySelector('.ed').innerHTML=[...E].map(k=>{const [a,b]=k.split('-').map(Number);return `<line x1="${N[a][1]}" y1="${N[a][2]}" x2="${N[b][1]}" y2="${N[b][2]}" stroke="#2563eb" stroke-width="5"/>`;}).join('');
    e.querySelectorAll('.nd circle').forEach((c,i)=>c.setAttribute('stroke',i===sel?'#f59e0b':'#94a3b8'));};
  e.querySelectorAll('.nd').forEach(g=>g.onclick=()=>{const i=+g.dataset.i; if(sel===null){sel=i;} else if(sel===i){sel=null;} else {const k=key(sel,i); E.has(k)?E.delete(k):E.add(k); sel=null; FX.play('tick'); t6kq(e,null,'Số dây nối: '+E.size);} draw();});
  const path=()=>{const prev={0:null}, q=[0]; while(q.length){const u=q.shift(); if(u===1) break; E.forEach(k=>{const [a,b]=k.split('-').map(Number); const v=a===u?b:b===u?a:-1; if(v>=0&&!(v in prev)){prev[v]=u;q.push(v);}});}
    if(!(1 in prev)) return null; const p=[]; for(let v=1;v!==null;v=prev[v]) p.unshift(v); return p;};
  e.querySelector('.run').onclick=()=>{const p=path(), pk=e.querySelector('.pk');
    if(!p){t6kq(e,false,'✗ Không có đường truyền từ An đến Bình. Hãy nối dây!'); return;}
    FX.play('whoosh'); p.forEach((v,j)=>setTimeout(()=>{pk.setAttribute('x',N[v][1]-12); pk.setAttribute('y',N[v][2]-30); pk.setAttribute('opacity',1);
      if(j===p.length-1) t6kq(e,true,'✓ Bình đã nhận tệp! Đường đi: '+p.map(x=>N[x][0]).join(' → '));},j*500));};
  e.querySelector('.xoa').onclick=()=>{E.clear(); sel=null; draw(); e.querySelector('.pk').setAttribute('opacity',0); t6kq(e,null,'Chưa có dây nối nào');};
  return e;
};
SIMS_BAI.t6_dungmang=function(){
  const P=[['pc','🖥️','Máy tính','dc',1],['tab','📱','Máy tính bảng','dc',1],['in','🖨️','Máy in','dc',1],['cap','🔌','Dây cáp mạng','kn',1],['sw','🔀','Switch','kn',1],['wifi','📶','Router wifi','kn',1],['pm','💿','Phần mềm mạng','pm',1],['loa','🔊','Loa','x',0],['tv','🎮','Tay cầm trò chơi','x',0]];
  const e=t6('Lắp mạng cho phòng tin','Chọn các thành phần cần thiết (bấm để chọn/bỏ), rồi bấm <b>⚡ Bật mạng</b>.',
   `<div class="g">${P.map(p=>`<button type="button" class="c" data-k="${p[0]}"><span class="e">${p[1]}</span>${p[2]}</button>`).join('')}</div>
    <div class="sim-ctl" style="justify-content:center"><button type="button" class="btn acc run">⚡ Bật mạng</button></div><div class="kq">Chưa chọn thành phần</div>`);
  const S=new Set();
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{const k=b.dataset.k; S.has(k)?S.delete(k):S.add(k); b.classList.toggle('on',S.has(k));});
  e.querySelector('.run').onclick=()=>{const miss=[];
    if(!['pc','tab','in'].every(k=>S.has(k))) miss.push('đủ <b>thiết bị đầu cuối</b> (máy tính, máy tính bảng, máy in)');
    if(!(S.has('cap')&&S.has('sw'))) miss.push('<b>dây cáp + switch</b> cho máy tính bàn');
    if(!S.has('wifi')) miss.push('<b>router wifi</b> để máy tính bảng kết nối không dây');
    if(!S.has('pm')) miss.push('<b>phần mềm mạng</b>');
    const thua=P.filter(p=>!p[4]&&S.has(p[0])).map(p=>p[2]);
    if(!miss.length) t6kq(e,true,'🎉 Mạng hoạt động! Đủ thiết bị đầu cuối, thiết bị kết nối và phần mềm mạng.'+(thua.length?'<br><small>('+thua.join(', ')+' không cần cho mạng)</small>':''));
    else t6kq(e,false,'Mạng chưa chạy. Còn thiếu: '+miss.join('; '));
    if(!miss.length) FX.play('win');};
  return e;
};

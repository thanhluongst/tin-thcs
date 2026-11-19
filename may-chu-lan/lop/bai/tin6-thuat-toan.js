/* Tin học 6 · Bài 15. Thuật toán · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: chú robot Bin của lớp 6A chỉ làm đúng những gì được chỉ dẫn.
   Mô phỏng: t6_robot (Chỉ đường cho robot Bin), t6_nuocchanh (Máy pha nước chanh: đầu vào – đầu ra), t6_sodokhoi (Chạy sơ đồ khối). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Chỉ đường cho robot',hd:'Khởi động · 7 phút',code:'1',ic:'',phut:7,
  story:'<p>Robot <b>Bin</b> 🤖 cần đến lấy quả táo 🍎. Bin chỉ hiểu các lệnh: <b>⬆ Tiến</b>, <b>↰ Quay trái</b>, <b>↱ Quay phải</b>. Hãy ghép lệnh thành <b>dãy chỉ dẫn</b> rồi bấm <b>▶ Chạy</b>.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_robot'},
      {id:'k1',type:'single',q:'Nếu đổi thứ tự các lệnh, robot sẽ…',opts:['Vẫn đến đúng chỗ','Có thể đi sai đường','Tự sửa lại','Không chạy'],ok:1},
      {id:'k2',type:'single',q:'Dãy lệnh giúp Bin lấy được táo gọi là gì?',opts:['Thuật toán','Dữ liệu','Phần cứng','Trang web'],ok:0}],
  key:['<b>Thuật toán</b>: dãy các chỉ dẫn <b>rõ ràng</b>, <b>có thứ tự</b> để giải quyết một vấn đề.']},

 {t:'Đầu vào và đầu ra',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Mỗi thuật toán có <b>đầu vào</b> (input: những gì cần có) và <b>đầu ra</b> (output: kết quả). Thử máy pha nước chanh: chọn đầu vào và xem từng bước của thuật toán.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_nuocchanh'},
      {id:'h1',type:'sort',q:'Thuật toán pha nước chanh: đâu là đầu vào, đâu là đầu ra?',cols:{c0:'Đầu vào',c1:'Đầu ra'},items:[{t:'Chanh, đường, nước',a:'c0'},{t:'Cốc nước chanh',a:'c1'},{t:'Đá viên',a:'c0'}]},
      {id:'h2',type:'match',q:'Ghép bài toán với đầu ra.',items:['Tính tổng hai số a, b','Nấu cơm','Tìm số lớn nhất trong 3 số'],opts:['Nồi cơm chín','Số lớn nhất','Giá trị a + b'],ok:[2,0,1]}],
  key:['Thuật toán: <b>đầu vào</b> → các bước xử lí → <b>đầu ra</b>.']},

 {t:'Mô tả thuật toán',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',ic:'',phut:10,
  story:'<p>Có thể mô tả thuật toán bằng <b>ngôn ngữ tự nhiên</b> (liệt kê các bước) hoặc <b>sơ đồ khối</b>. Nhập hai số rồi bấm <b>⏭ Bước tiếp</b> để chạy sơ đồ khối tính tổng.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_sodokhoi'},
      {id:'h3',type:'match',q:'Ghép hình trong sơ đồ khối với ý nghĩa.',items:['Hình elip (bầu dục)','Hình bình hành','Hình chữ nhật','Mũi tên'],opts:['Bước xử lí','Bắt đầu / kết thúc','Hướng thực hiện','Nhập / xuất dữ liệu'],ok:[1,3,0,2]},
      {id:'h4',type:'tf',q:'Đúng hay Sai?',items:[{t:'Một bài toán chỉ có đúng một cách mô tả thuật toán',a:'F'},{t:'Sơ đồ khối giúp nhìn rõ thứ tự các bước',a:'T'},{t:'Máy tính hiểu được mọi chỉ dẫn mơ hồ',a:'F'}]}],
  key:['Mô tả thuật toán bằng <b>ngôn ngữ tự nhiên</b> hoặc <b>sơ đồ khối</b>.']},

 {t:'Thử thách nhanh',hd:'Luyện tập · 6 phút',code:'3',ic:'',phut:6,
  qs:[{id:'l1',type:'single',q:'Chỉ dẫn nào <b>không</b> rõ ràng cho máy tính?',opts:['Cộng a với b','Đi thẳng 3 bước','Cho một ít đường','In kết quả ra màn hình'],ok:2},
      {id:'l2',type:'match',q:'Sắp xếp thuật toán “rửa tay”: ghép bước với việc làm.',items:['Bước 1','Bước 2','Bước 3','Bước 4'],opts:['Xoa xà phòng','Làm ướt tay','Lau khô tay','Xả sạch bằng nước'],ok:[1,0,3,2]}],
  key:['Mỗi bước phải <b>rõ ràng</b>, thực hiện <b>đúng thứ tự</b>.']},

 {t:'Thuật toán quanh em',hd:'Vận dụng · 6 phút',code:'4',ic:'',phut:6,
  qs:[{id:'v1',type:'text',q:'Viết thuật toán “Pha một gói mì” bằng ngôn ngữ tự nhiên. Nêu đầu vào và đầu ra.',ans:'Đầu vào: gói mì, nước sôi, bát. Các bước: 1) Bóc gói mì cho vào bát; 2) Cho gia vị; 3) Đổ nước sôi; 4) Đậy nắp 3 phút. Đầu ra: bát mì chín.'}],
  key:['Thuật toán có ở <b>mọi nơi</b>: nấu ăn, chỉ đường, giải toán.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Thuật toán là…',opts:['Một con robot','Dãy các chỉ dẫn rõ ràng, có trình tự để giải quyết một vấn đề','Một phần mềm vẽ','Một loại máy tính'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Thuật toán</b>: đầu vào → dãy bước rõ ràng → đầu ra.']}
];

const GHIBAI={so:'Bài 15:',ten:'THUẬT TOÁN',muc:[
 {step:2,h:'Thuật toán',it:['Dãy các chỉ dẫn <b>rõ ràng, có trình tự</b> để giải quyết vấn đề.']},
 {step:3,h:'Đầu vào – đầu ra',it:[],flow:['Đầu vào (input)','Thuật toán','Đầu ra (output)']},
 {step:4,h:'Mô tả',it:['Bằng <b>ngôn ngữ tự nhiên</b> hoặc <b>sơ đồ khối</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:90px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}.t6 .prog{display:flex;flex-wrap:wrap;gap:4px;min-height:44px;background:#f1f5f9;border-radius:10px;padding:6px;max-width:560px;margin:6px auto}.t6 .prog span{background:#4f46e5;color:#fff;border-radius:8px;padding:6px 10px;font-weight:700}.t6 .prog span.cur{background:#f59e0b}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_robot=function(){
  const N=5, WALL=['1,1','2,3','3,1','1,3'], GOAL=[4,4], CMD={f:'⬆ Tiến',l:'↰ Trái',r:'↱ Phải'};
  const e=t6('Chỉ đường cho robot Bin','Bấm các nút lệnh để thêm vào chương trình, rồi bấm <b>▶ Chạy</b>. Tránh các ô đá 🪨!',
   `<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;align-items:flex-start"><div class="bd" style="display:grid;grid-template-columns:repeat(${N},52px);gap:3px"></div>
    <div><div class="g" style="margin:0">${Object.entries(CMD).map(([k,v])=>`<button type="button" class="c" data-c="${k}" style="min-width:80px">${v}</button>`).join('')}</div>
    <div class="prog"></div><div class="sim-ctl" style="justify-content:center"><button type="button" class="btn acc run">▶ Chạy</button><button type="button" class="btn ghost bk">⌫ Xoá lệnh cuối</button><button type="button" class="btn ghost clr">🗑️ Xoá hết</button></div></div></div><div class="kq">Robot hướng xuống dưới ⬇. Hãy lập trình!</div>`);
  const P=[]; let busy=false;
  const ARW=['⬆','➡','⬇','⬅'], D=[[-1,0],[0,1],[1,0],[0,-1]];
  const board=(r,c,d,hit)=>{let h=''; for(let i=0;i<N;i++) for(let j=0;j<N;j++){const w=WALL.includes(i+','+j), me=i===r&&j===c, g=i===GOAL[0]&&j===GOAL[1];
    h+=`<div style="width:52px;height:52px;border-radius:8px;display:grid;place-items:center;font-size:28px;background:${me&&hit?'#fecaca':w?'#e7e5e4':'#ecfccb'}">${me?'<span style="font-size:20px;line-height:1;text-align:center">🤖<br>'+ARW[d]+'</span>':w?'🪨':g?'🍎':''}</div>`;}
    e.querySelector('.bd').innerHTML=h;};
  const prog=cur=>{e.querySelector('.prog').innerHTML=P.map((p,i)=>`<span class="${i===cur?'cur':''}">${i+1}. ${CMD[p]}</span>`).join('')||'<i style="color:#64748b">Chương trình trống</i>';};
  e.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{if(busy||P.length>=20) return; P.push(b.dataset.c); prog();});
  e.querySelector('.bk').onclick=()=>{if(!busy){P.pop(); prog();}}; e.querySelector('.clr').onclick=()=>{if(!busy){P.length=0; prog(); board(0,0,2);}};
  e.querySelector('.run').onclick=()=>{if(busy||!P.length) return; busy=true; let r=0,c=0,d=2,i=0; board(r,c,d);
    const t=setInterval(()=>{if(i>=P.length){clearInterval(t); busy=false; const win=r===GOAL[0]&&c===GOAL[1]; t6kq(e,win,win?`🎉 Bin lấy được táo sau ${P.length} lệnh!`:'Bin dừng lại nhưng chưa tới táo. Sửa chương trình nhé!'); if(win) FX.play('win'); prog(); return;}
      const p=P[i]; prog(i);
      if(p==='l') d=(d+3)%4; else if(p==='r') d=(d+1)%4; else {const nr=r+D[d][0], nc=c+D[d][1];
        if(nr<0||nc<0||nr>=N||nc>=N||WALL.includes(nr+','+nc)){clearInterval(t); busy=false; board(r,c,d,1); t6kq(e,false,`💥 Lệnh ${i+1}: Bin đâm vào ${nr<0||nc<0||nr>=N||nc>=N?'tường':'đá'}! Sửa lại thuật toán.`); return;} r=nr; c=nc;}
      FX.play('tick'); board(r,c,d); i++;},450);};
  board(0,0,2); prog(); return e;
};
SIMS_BAI.t6_nuocchanh=function(){
  const e=t6('Máy pha nước chanh','Chọn <b>đầu vào</b>, bấm <b>▶ Pha</b>, quan sát các bước và <b>đầu ra</b>.',
   `<div class="sim-ctl"><div><b>🍋 Chanh</b> ${_seg('ch',[['0','0 quả'],['1','1 quả'],['2','2 quả']],'1')}</div><div><b>🍬 Đường</b> ${_seg('du',[['0','0 thìa'],['2','2 thìa'],['5','5 thìa']],'2')}</div><div><b>🧊 Đá</b> ${_seg('da',[['0','Không'],['1','Có']],'1')}</div><button type="button" class="btn acc run">▶ Pha</button></div>
    <div style="display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap"><div class="c" style="cursor:default">📥 ĐẦU VÀO<br><small class="iv"></small></div><span style="font-size:26px">➜</span>
     <ol class="st" style="background:#f1f5f9;border-radius:12px;padding:10px 10px 10px 30px;margin:0;font-weight:600;line-height:1.8"><li>Vắt chanh vào cốc</li><li>Thêm đường</li><li>Đổ 200 ml nước, khuấy đều</li><li>Thêm đá</li></ol>
     <span style="font-size:26px">➜</span><div class="c out" style="cursor:default">📤 ĐẦU RA<br><span style="font-size:40px">🥤</span><br><small class="ov">?</small></div></div><div class="kq">Chọn đầu vào rồi bấm Pha</div>`);
  const S={ch:'1',du:'2',da:'1'}; _wireSeg(e,(n,v)=>S[n]=v);
  e.querySelector('.run').onclick=()=>{const li=[...e.querySelectorAll('.st li')]; li.forEach(x=>x.style.background=''); e.querySelector('.iv').textContent=`${S.ch} chanh, ${S.du} thìa đường, ${S.da==='1'?'có':'không'} đá`;
    li.forEach((x,i)=>setTimeout(()=>{x.style.background='#fde68a'; FX.play('tick');
      if(i===3){const ch=+S.ch, du=+S.du; const v=ch===0?'Nước đường, không phải nước chanh!':du===0?'Chua lè 😖':du===5&&ch===1?'Ngọt quá 🤢':'Nước chanh ngon 😋'; e.querySelector('.ov').textContent=v+(S.da==='1'?' · mát lạnh':'');
        t6kq(e,/ngon/.test(v),'Đầu ra: <b>'+v+'</b>. Đầu vào khác → đầu ra khác!');}},i*600));};
  return e;
};
SIMS_BAI.t6_sodokhoi=function(){
  const B=[['el','Bắt đầu'],['pa','Nhập a, b'],['re','Tổng ← a + b'],['pa','Xuất Tổng'],['el','Kết thúc']];
  const shape=(t,x,y,txt,on)=>{const f=on?'#fde68a':'#fff', s='stroke="#1e3a8a" stroke-width="3" fill="'+f+'"';
    const g=t==='el'?`<ellipse cx="${x}" cy="${y}" rx="80" ry="22" ${s}/>`:t==='pa'?`<polygon points="${x-80},${y+22} ${x-60},${y-22} ${x+80},${y-22} ${x+60},${y+22}" ${s}/>`:`<rect x="${x-80}" y="${y-22}" width="160" height="44" ${s}/>`;
    return g+`<text x="${x}" y="${y+6}" font-size="15" font-weight="700" text-anchor="middle">${txt}</text>`;};
  const e=t6('Chạy sơ đồ khối','Nhập a và b, bấm <b>⏭ Bước tiếp</b> để thực hiện từng khối. Theo dõi bảng giá trị.',
   `<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;align-items:center"><svg class="sv" viewBox="0 0 220 380" style="width:220px"></svg>
    <div><div class="sim-ctl">a = <input class="big a" type="number" value="5"> b = <input class="big b" type="number" value="7"></div>
    <div class="sim-ctl"><button type="button" class="btn acc nx">⏭ Bước tiếp</button><button type="button" class="btn ghost lai">↺ Lại</button></div>
    <table class="tbl"><tr><th>a</th><th>b</th><th>Tổng</th><th>Màn hình</th></tr><tr class="vl"><td>?</td><td>?</td><td>?</td><td></td></tr></table></div></div><div class="kq">Bấm ⏭ Bước tiếp</div>`);
  let k=-1, V={};
  const draw=()=>{let s='<defs><marker id="t6ar" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#1e3a8a"/></marker></defs>';
    B.forEach((b,i)=>{const y=30+i*78; if(i) s+=`<line x1="110" y1="${y-56}" x2="110" y2="${y-26}" stroke="#1e3a8a" stroke-width="3" marker-end="url(#t6ar)"/>`; s+=shape(b[0],110,y,b[1],i===k);});
    e.querySelector('.sv').innerHTML=s; e.querySelector('.vl').innerHTML=`<td>${V.a??'?'}</td><td>${V.b??'?'}</td><td>${V.t??'?'}</td><td>${V.o??''}</td>`;};
  e.querySelector('.nx').onclick=()=>{if(k>=4) return; k++; FX.play('tick');
    if(k===1){V.a=+e.querySelector('.a').value; V.b=+e.querySelector('.b').value;} if(k===2) V.t=V.a+V.b; if(k===3) V.o='🖥️ '+V.t;
    draw(); t6kq(e,k===4?true:null,k===4?`✓ Thuật toán kết thúc. Đầu vào (${V.a}, ${V.b}) → đầu ra ${V.t}`:'Đang thực hiện khối: <b>'+B[k][1]+'</b>');};
  e.querySelector('.lai').onclick=()=>{k=-1; V={}; draw(); t6kq(e,null,'Bấm ⏭ Bước tiếp');};
  draw(); return e;
};

/* Tin học 6 · Bài 17. Chương trình máy tính · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: Mai muốn chú mèo trong Scratch vẽ một hình vuông.
   Mô phỏng: t6_ngonngu (Máy tính hiểu ngôn ngữ nào?), t6_khoilenh (Lập trình chú mèo vẽ hình), t6_thuattoanct (Từ thuật toán đến chương trình). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Máy tính hiểu ngôn ngữ nào?',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p>Mai nói với chú mèo trong máy tính: <i>“Mèo ơi, đi lên một chút nhé!”</i>. Mèo không nhúc nhích. Thử các cách ra lệnh trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_ngonngu'},
      {id:'k1',type:'single',q:'Muốn máy tính làm theo, ta phải viết chỉ dẫn bằng…',opts:['Tiếng Việt thông thường','Ngôn ngữ lập trình mà máy tính hiểu được','Hình vẽ tay','Tiếng hát'],ok:1}],
  key:['Máy tính chỉ hiểu chỉ dẫn viết bằng <b>ngôn ngữ lập trình</b>.']},

 {t:'Chương trình Scratch',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',ic:'',phut:12,
  story:'<p><b>Scratch</b> là ngôn ngữ lập trình kéo thả các <b>khối lệnh</b>. Ghép khối lệnh để chú mèo vẽ <b>hình vuông</b>. Gợi ý: một hình vuông có 4 cạnh và 4 góc quay 90°.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_khoilenh'},
      {id:'h1',type:'single',q:'Để vẽ hình vuông cạnh 100 bước, dùng khối lặp, em lặp mấy lần?',opts:['2','3','4','8'],ok:2},
      {id:'h2',type:'tf',q:'Đúng hay Sai?',items:[{t:'Chương trình là dãy lệnh máy tính hiểu và thực hiện được',a:'T'},{t:'Máy tính thực hiện lệnh theo thứ tự trong chương trình',a:'T'},{t:'Đổi thứ tự lệnh thì kết quả không bao giờ thay đổi',a:'F'},{t:'Scratch là ngôn ngữ lập trình',a:'T'}]}],
  key:['<b>Chương trình</b>: dãy lệnh viết bằng ngôn ngữ lập trình; máy tính thực hiện <b>lần lượt</b>.']},

 {t:'Từ thuật toán đến chương trình',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',ic:'',phut:8,
  story:'<p>Lập trình là <b>viết thuật toán</b> bằng ngôn ngữ lập trình. Ghép mỗi bước của thuật toán (ngôn ngữ tự nhiên) với khối lệnh Scratch tương ứng.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_thuattoanct'},
      {id:'h3',type:'single',q:'Quan hệ giữa thuật toán và chương trình?',opts:['Không liên quan','Chương trình là thuật toán được viết bằng ngôn ngữ lập trình','Thuật toán là chương trình chạy nhanh hơn','Hai tên gọi của phần cứng'],ok:1}],
  key:['<b>Chương trình</b> = <b>thuật toán</b> viết bằng <b>ngôn ngữ lập trình</b>.']},

 {t:'Thử thách nhanh',hd:'Luyện tập · 6 phút',code:'3',ic:'',phut:6,
  qs:[{id:'l1',type:'match',q:'Ghép khối lệnh Scratch với tác dụng.',items:['di chuyển 10 bước','xoay ↻ 90 độ','lặp lại 4','nói Xin chào! trong 2 giây'],opts:['Thực hiện các lệnh bên trong 4 lần','Hiện bóng nói','Quay phải một góc vuông','Đi thẳng 10 bước'],ok:[3,2,0,1]},
      {id:'l2',type:'single',q:'Muốn vẽ tam giác đều, mỗi lần chú mèo xoay bao nhiêu độ?',opts:['60°','90°','120°','180°'],ok:2}],
  key:['Khối <b>lặp</b> giúp chương trình <b>ngắn gọn</b>.']},

 {t:'Chương trình của em',hd:'Vận dụng · 6 phút',code:'4',ic:'',phut:6,
  qs:[{id:'v1',type:'text',q:'Viết dãy khối lệnh để chú mèo vẽ một hình chữ nhật dài 150, rộng 80.',ans:'lặp lại 2: [di chuyển 150 bước; xoay ↻ 90 độ; di chuyển 80 bước; xoay ↻ 90 độ].'}],
  key:['Phân tích hình → <b>thuật toán</b> → <b>chương trình</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Máy tính thực hiện công việc theo…',opts:['Ý thích của nó','Chương trình do con người viết','Tiếng nói của người dùng','Thời tiết'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Ngôn ngữ lập trình – chương trình – thực hiện lần lượt</b>.']}
];

const GHIBAI={so:'Bài 17:',ten:'CHƯƠNG TRÌNH MÁY TÍNH',muc:[
 {step:2,h:'Chương trình',it:['Dãy lệnh viết bằng <b>ngôn ngữ lập trình</b>; máy tính thực hiện <b>lần lượt</b>.','VD ngôn ngữ: <b>Scratch</b>.']},
 {step:3,h:'Thuật toán → chương trình',it:[],flow:['Bài toán','Thuật toán','Chương trình','Máy tính thực hiện']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 .blk{display:inline-block;font:700 14px system-ui;color:#fff;border-radius:8px;padding:8px 12px;margin:2px;cursor:pointer;border:none;box-shadow:0 3px 0 #0003}.t6 .bm{background:#4c97ff}.t6 .bl{background:#ffab19}.t6 .bs{background:#9966ff}.t6 .bp{background:#0fbd8c}.t6 .scr{min-height:180px;min-width:240px;background:#f8fafc;border:2px dashed #94a3b8;border-radius:12px;padding:8px}.t6 .scr .blk{display:block;width:max-content}.t6 .scr .cur{outline:3px solid #f43f5e}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_ngonngu=function(){
  const L=[['💬','“Mèo ơi, đi lên một chút nhé!”',0],['🗣️','“Cat, please go up!”',0],['✏️','Vẽ mũi tên ⬆ lên giấy',0],['🧩','<span class="blk bm" style="cursor:default">thay đổi y một lượng 50</span>',1]];
  const e=t6('Máy tính hiểu ngôn ngữ nào?','Bấm từng cách ra lệnh cho chú mèo.',
   `<div class="g">${L.map((l,i)=>`<button type="button" class="c" data-i="${i}" style="max-width:220px"><span class="e">${l[0]}</span>${l[1]}</button>`).join('')}</div>
    <div style="position:relative;height:150px;max-width:420px;margin:auto;background:#f0f9ff;border-radius:14px;overflow:hidden"><div class="cat" style="position:absolute;left:180px;top:90px;font-size:44px;transition:top .5s">🐱</div><div class="bb" style="position:absolute;left:230px;top:40px;background:#fff;border-radius:10px;padding:4px 8px;font-weight:700"></div></div><div class="kq">Chọn một cách ra lệnh</div>`);
  const cat=e.querySelector('.cat'), bb=e.querySelector('.bb');
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{const l=L[+b.dataset.i]; cat.style.top='90px';
    if(l[2]){setTimeout(()=>cat.style.top='30px',50); bb.textContent=''; t6kq(e,true,'✓ Mèo đi lên! Đây là lệnh trong <b>ngôn ngữ lập trình</b> Scratch.');}
    else {bb.textContent='❓❓'; t6kq(e,false,'Mèo không hiểu… Máy tính không hiểu lời nói, chữ viết thông thường.');}});
  return e;
};
SIMS_BAI.t6_khoilenh=function(){
  const BK={m:['di chuyển 100 bước','bm'],r:['xoay ↻ 90 độ','bm'],r2:['xoay ↻ 120 độ','bm'],l4:['lặp lại 4 lần [','bl'],l3:['lặp lại 3 lần [','bl'],end:[']  hết lặp','bl'],s:['nói “Xong!”','bs'],pd:['đặt bút xuống ✏️','bp']};
  const e=t6('Lập trình chú mèo vẽ hình','Bấm khối lệnh để thêm vào <b>chương trình</b> (bên phải), bấm khối trong chương trình để xoá. Bấm <b>🚩 Chạy</b>. Mục tiêu: vẽ <b>hình vuông</b>.',
   `<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:flex-start"><div style="max-width:200px">${Object.entries(BK).map(([k,b])=>`<button type="button" class="blk ${b[1]}" data-k="${k}">${b[0]}</button>`).join('')}
     <div style="margin-top:8px"><button type="button" class="btn ghost mau">💡 Chương trình mẫu</button></div></div>
    <div class="scr"><div style="background:#ffbf00;color:#000;font-weight:700;border-radius:8px 8px 0 0;padding:6px 10px;width:max-content">🚩 khi bấm vào lá cờ</div><div class="pl"></div></div>
    <svg class="stage" viewBox="0 0 240 240" style="width:240px;background:#fff;border:2px solid #cbd5e1;border-radius:12px"></svg></div>
    <div class="sim-ctl" style="justify-content:center"><button type="button" class="btn acc run">🚩 Chạy</button><button type="button" class="btn ghost clr">🗑️ Xoá chương trình</button></div><div class="kq">Chương trình trống</div>`);
  const P=[]; let busy=false;
  const prog=cur=>{const pl=e.querySelector('.pl'); let ind=0; pl.innerHTML=P.map((k,i)=>{if(k==='end') ind=Math.max(0,ind-1); const h=`<span class="blk ${BK[k][1]} ${i===cur?'cur':''}" data-i="${i}" style="margin-left:${ind*18}px">${BK[k][0]}</span>`; if(k[0]==='l') ind++; return h;}).join('');
    pl.querySelectorAll('.blk').forEach(b=>b.onclick=()=>{if(busy) return; P.splice(+b.dataset.i,1); prog();});};
  const stage=(lines,x,y,d,say)=>{e.querySelector('.stage').innerHTML=lines.map(l=>`<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>`).join('')+`<text x="${x-14}" y="${y+12}" font-size="28" transform="rotate(${d} ${x} ${y})">🐱</text>`+(say?`<rect x="${x+10}" y="${y-44}" width="64" height="26" rx="8" fill="#fff" stroke="#333"/><text x="${x+42}" y="${y-26}" font-size="13" text-anchor="middle">${say}</text>`:'');};
  e.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(busy||P.length>=16) return; P.push(b.dataset.k); FX.play('tick'); prog(); t6kq(e,null,P.length+' khối lệnh');});
  e.querySelector('.clr').onclick=()=>{if(!busy){P.length=0; prog(); stage([],70,70,0);}};
  e.querySelector('.mau').onclick=()=>{if(busy) return; P.splice(0,P.length,'pd','l4','m','r','end','s'); prog();};
  e.querySelector('.run').onclick=()=>{if(busy||!P.length) return;
    const flat=[], st=[]; for(let i=0;i<P.length;i++){const k=P[i]; if(k[0]==='l') st.push([i,+k[1]]); else if(k==='end'){const o=st.pop(); if(o){const p=flat.findIndex(f=>f[1]>o[0]), body=p<0?[]:flat.splice(p);for(let r=0;r<o[1];r++) flat.push(...body);}} else flat.push([k,i]);}
    busy=true; let x=70,y=70,d=0,pen=false,j=0; const L=[]; stage(L,x,y,d);
    const t=setInterval(()=>{if(j>=flat.length){clearInterval(t); busy=false; prog();
        const sq=L.length===4&&Math.abs(L[3][2]-L[0][0])<1&&Math.abs(L[3][3]-L[0][1])<1&&P.some(k=>k==='r');
        t6kq(e,sq,sq?'🎉 Chú mèo đã vẽ hình vuông!':L.length?`Mèo vẽ ${L.length} nét. Đó chưa phải hình vuông, sửa chương trình nhé!`:'Mèo chưa vẽ gì. Nhớ <b>đặt bút xuống</b>!'); if(sq) FX.play('win'); return;}
      const [k,i]=flat[j]; prog(i); let say='';
      if(k==='pd') pen=true; else if(k==='r') d+=90; else if(k==='r2') d+=120; else if(k==='s') say='Xong!'; else if(k==='m'){const nx=x+100*Math.cos(d*Math.PI/180), ny=y+100*Math.sin(d*Math.PI/180); if(pen) L.push([x,y,nx,ny]); x=nx; y=ny;}
      stage(L,x,y,d,say); FX.play('tick'); j++;},420);};
  prog(); stage([],70,70,0); return e;
};
SIMS_BAI.t6_thuattoanct=function(){
  const A=[['Bước 1: Bắt đầu khi bấm cờ xanh','🚩 khi bấm vào lá cờ','#ffbf00'],['Bước 2: Đặt bút xuống','đặt bút xuống ✏️','#0fbd8c'],['Bước 3: Làm 4 lần: đi 100 bước, quay phải 90°','lặp lại 4 lần [di chuyển 100 bước, xoay ↻ 90 độ]','#ffab19'],['Bước 4: Nói “Xong!”','nói “Xong!”','#9966ff']];
  const ord=[2,0,3,1];
  const e=t6('Từ thuật toán đến chương trình','Bấm một bước <b>thuật toán</b> (trái), rồi bấm <b>khối lệnh</b> tương ứng (phải).',
   `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:640px;margin:auto"><div class="ta">${A.map((a,i)=>`<button type="button" class="c" data-a="${i}" style="display:block;width:100%;margin:4px 0;text-align:left">📝 ${a[0]}</button>`).join('')}</div>
    <div class="tb">${ord.map(i=>`<button type="button" class="blk" data-b="${i}" style="display:block;width:100%;margin:8px 0;background:${A[i][2]};color:${i===0?'#000':'#fff'};text-align:left">${A[i][1]}</button>`).join('')}</div></div><div class="kq">Chọn một bước thuật toán</div><p style="text-align:center">Đã ghép: <span class="sc">0/4</span></p>`);
  let sel=null, n=0;
  e.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{if(b.disabled) return; e.querySelectorAll('[data-a]').forEach(x=>x.classList.remove('on')); b.classList.add('on'); sel=+b.dataset.a;});
  e.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{if(sel===null||b.disabled){t6kq(e,null,'Chọn một bước thuật toán trước'); return;} const ok=+b.dataset.b===sel;
    if(ok){const a=e.querySelector(`[data-a="${sel}"]`); a.disabled=b.disabled=true; a.classList.remove('on'); a.classList.add('ok'); b.style.opacity=.55; n++; e.querySelector('.sc').textContent=n+'/4'; sel=null;
      t6kq(e,true,n===4?'🎉 Ghép xong! Mỗi bước thuật toán được viết thành lệnh của chương trình.':'✓ Đúng!'); if(n===4) FX.play('win');}
    else t6kq(e,false,'✗ Khối lệnh này không làm đúng bước đó.');});
  return e;
};

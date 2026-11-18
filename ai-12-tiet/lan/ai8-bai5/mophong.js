/* Mô phỏng Bài 5 lớp 8 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js. */
const SIMS={
/* 1. Máy "nhìn": lưới 8x8 → số → so khớp mẫu */
see(){
  const P=s=>s.map(r=>r.split('').map(Number));
  const T={'⭕ Hình tròn':P(['00111100','01000010','10000001','10000001','10000001','10000001','01000010','00111100']),
    '➖ Đường ngang':P(['00000000','00000000','00000000','11111111','11111111','00000000','00000000','00000000']),
    '❌ Dấu nhân':P(['10000001','01000010','00100100','00011000','00011000','00100100','01000010','10000001']),
    '⬜ Hình vuông':P(['11111111','10000001','10000001','10000001','10000001','10000001','10000001','11111111'])};
  const st={g:[...Array(8)].map(()=>Array(8).fill(0)),hist:[],down:false,val:1};
  const e=_el(_shell('Máy "nhìn" một hình vẽ',
   'Bấm (hoặc kéo) trên lưới để tô hình: tròn, vuông, dấu nhân, đường ngang… rồi bấm <b>▶ Máy nhìn</b>. Thử vẽ nghiêng, vẽ thiếu, vẽ hình máy chưa học (ngôi sao).',
   `<div class="two" style="gap:16px;align-items:start"><div><div class="grid" style="display:grid;grid-template-columns:repeat(8,30px);gap:2px;touch-action:none;user-select:none"></div>
     <div style="margin-top:8px"><button type="button" class="btn acc run">▶ Máy nhìn</button> <button type="button" class="btn rs">🧹 Xoá</button></div></div>
     <div><b>Máy thấy dãy số:</b><pre class="num" style="font:14px/1.25 monospace;background:#0f172a;color:#a7f3d0;padding:8px;border-radius:8px;margin:4px 0"></pre><div class="out"></div></div></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số ô tô</th><th>Máy đoán</th><th>Độ giống</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  const G=e.querySelector('.grid');
  const draw=()=>{G.innerHTML=st.g.flat().map((v,i)=>`<div data-i="${i}" style="width:30px;height:30px;border-radius:4px;background:${v?'#1d4ed8':'#e2e8f0'}"></div>`).join('');
    e.querySelector('.num').textContent=st.g.map(r=>r.join(' ')).join('\n');};
  const set=t=>{const i=t&&t.dataset&&t.dataset.i; if(i===undefined) return; st.g[Math.floor(i/8)][i%8]=st.val; t.style.background=st.val?'#1d4ed8':'#e2e8f0'; e.querySelector('.num').textContent=st.g.map(r=>r.join(' ')).join('\n');};
  G.onpointerdown=ev=>{const i=ev.target.dataset.i; if(i===undefined) return; st.down=true; st.val=st.g[Math.floor(i/8)][i%8]?0:1; set(ev.target);};
  G.onpointermove=ev=>{if(st.down) set(document.elementFromPoint(ev.clientX,ev.clientY));};
  document.addEventListener('pointerup',()=>st.down=false);
  e.querySelector('.rs').onclick=()=>{st.g=st.g.map(r=>r.map(()=>0));draw();e.querySelector('.out').innerHTML='';};
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const n=st.g.flat().filter(Boolean).length;
    if(!n){e.querySelector('.out').innerHTML='<p>Chưa có dữ liệu đầu vào.</p>';return;}
    const sc=Object.keys(T).map(k=>{let s=0;T[k].forEach((r,i)=>r.forEach((v,j)=>{if(v===st.g[i][j])s++;}));return [k,Math.round(s/64*100)];}).sort((a,b)=>b[1]-a[1]);
    e.querySelector('.out').innerHTML=`<p><b>Đầu ra:</b> ${sc[0][0]} (giống ${sc[0][1]}%)</p>`+sc.map(([k,v])=>`<div style="display:flex;gap:6px;align-items:center;font-size:14px"><span style="width:120px">${k}</span><span style="flex:1;height:10px;background:#e5e7eb;border-radius:9px;overflow:hidden"><i style="display:block;height:100%;width:${v}%;background:#2563eb"></i></span>${v}%</div>`).join('')+'<p class="hint">Máy chỉ so dãy số với 4 mẫu đã học – không "hiểu" hình.</p>';
    st.hist.unshift([n,sc[0][0],sc[0][1]+'%']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2&&parseInt(v)<75?'r':'');
    if(window.FX) FX.play('ding');};
  draw(); return e;
},
/* 2. Máy "nghe": lỗi truyền qua các bước */
hear(){
  const CMD=[['Đặt báo thức sáu giờ sáng','Đặt báo thức sáu giờ sáng','⏰ Báo thức 6:00'],['Gọi cho mẹ','Gọi cho mẹ','📞 Đang gọi Mẹ']];
  const SUB={'sáu':'sau','giờ':'dờ','mẹ':'mè','Gọi':'Gửi','sáng':'sang','báo':'bão','thức':'thứ'};
  const st={n:'thap',v:'vua',c:0,hist:[]};
  const e=_el(_shell('Máy "nghe" lệnh của em',
   'Chọn câu lệnh, mức <b>tiếng ồn</b>, <b>tốc độ nói</b>, bấm <b>▶ Nói</b>. Theo dõi lỗi đi qua 4 bước. Thử ít nhất 4 lần.',
   `<div class="sim-ctl"><div><label>Câu lệnh</label>${_seg('c',[['0','⏰ Đặt báo thức 6 giờ sáng'],['1','📞 Gọi cho mẹ']],'0')}</div>
    <div><label>Tiếng ồn</label>${_seg('n',[['thap','Yên tĩnh'],['vua','Lớp ồn'],['cao','Chợ, xe cộ']],'thap')}</div>
    <div><label>Tốc độ nói</label>${_seg('v',[['vua','Vừa, rõ'],['nhanh','Rất nhanh']],'vua')}</div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Nói</button></div></div>
    <div class="steps" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Ồn</th><th>Tốc độ</th><th>Chữ máy nghe ra</th><th>Kết quả</th></tr><tr class="empty"><td colspan="5">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st[n]=n==='c'?+v:v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh');
    const p={thap:.03,vua:.2,cao:.45}[st.n]+(st.v==='nhanh'?.2:0), c=CMD[st.c];
    const heard=c[1].split(' ').map(w=>SUB[w]&&Math.random()<p?SUB[w]:w).join(' '), ok=heard===c[1];
    const res=ok?c[2]:'❓ "Xin lỗi, tôi tìm thấy: '+heard+'" (làm sai lệnh)';
    const box=(t,b,bad)=>`<div style="padding:10px;border-radius:10px;border:2px solid ${bad?'#dc2626':'#16a34a'};background:${bad?'#fee2e2':'#dcfce7'}"><b>${t}</b><br>${b}</div>`;
    e.querySelector('.steps').innerHTML=box('① Micro thu âm',`🎤 sóng âm${st.n!=='thap'?' + 🔊 tiếng ồn':''}`,false)+box('② Giọng nói → chữ','“'+heard+'”',!ok)+box('③ "Đọc" chữ, tìm ý',ok?'Hiểu đúng lệnh':'Đọc theo chữ sai',!ok)+box('④ Thực hiện',res,!ok);
    st.hist.unshift([{thap:'Yên tĩnh',vua:'Lớp ồn',cao:'Rất ồn'}[st.n],st.v==='nhanh'?'Nhanh':'Vừa',heard,ok?'Đúng':'Sai']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===3?(v==='Đúng'?'g':'r'):'');
    if(window.FX) FX.play(ok?'ding':'tick');};
  return e;
}
};

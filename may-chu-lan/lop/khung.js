/* Khung hàm dùng chung (lấy từ Web_LopHoc_AI). Dữ liệu bài (BAI, STEPS, GHIBAI) do máy chủ sinh từ bài Tin học. */
/* Nội dung Bài 3 – Lớp 8 – Chuyên đề Giáo dục AI (dùng chung cho trang học sinh và giáo viên) */
const IC={
 student:`<svg width="88" height="88" viewBox="0 0 92 92"><circle cx="46" cy="30" r="15" fill="#f2c9a0"/><path d="M31 27c2-10 9-14 15-14s13 4 15 14c-5-4-10-5-15-5s-10 1-15 5z" fill="#2b2b2b"/><path d="M18 84c3-17 14-26 28-26s25 9 28 26z" fill="#2f6fb5"/><rect x="34" y="62" width="24" height="18" rx="2" fill="#fff" stroke="#c9d3e2"/><path d="M38 68h16M38 73h12" stroke="#9aa8bc" stroke-width="2"/></svg>`,
 bot:`<svg width="88" height="88" viewBox="0 0 92 92"><rect x="16" y="24" width="60" height="46" rx="14" fill="#1d4e89"/><circle cx="35" cy="45" r="7" fill="#fff"/><circle cx="57" cy="45" r="7" fill="#fff"/><circle cx="35" cy="45" r="3" fill="#16233a"/><circle cx="57" cy="45" r="3" fill="#16233a"/><rect x="34" y="57" width="24" height="5" rx="2.5" fill="#e2932b"/><path d="M46 24V12" stroke="#1d4e89" stroke-width="4"/><circle cx="46" cy="10" r="5" fill="#e2932b"/><rect x="8" y="40" width="8" height="14" rx="3" fill="#2f6fb5"/><rect x="76" y="40" width="8" height="14" rx="3" fill="#2f6fb5"/></svg>`,
 scale:`<svg width="120" height="120" viewBox="0 0 80 80"><path d="M40 12v56M22 68h36" stroke="#1d4e89" stroke-width="4" stroke-linecap="round"/><path d="M14 24h52" stroke="#1d4e89" stroke-width="4" stroke-linecap="round"/><path d="M14 24L6 44h16zM66 24l-8 20h16z" fill="#e2932b" opacity=".9"/><path d="M6 44a8 5 0 0016 0M58 44a8 5 0 0016 0" fill="#e2932b"/><circle cx="40" cy="12" r="5" fill="#e2932b"/></svg>`,
 img:`<svg width="64" height="64" viewBox="0 0 70 70"><rect x="6" y="10" width="58" height="46" rx="6" fill="#fbe9e8" stroke="#c2413b" stroke-width="2"/><circle cx="26" cy="28" r="7" fill="#c2413b"/><path d="M10 52l16-14 10 8 10-10 14 16z" fill="#c2413b" opacity=".6"/><path d="M48 14l10 10M58 14L48 24" stroke="#c2413b" stroke-width="3"/></svg>`,
 chat:`<svg width="64" height="64" viewBox="0 0 70 70"><path d="M8 14h46a6 6 0 016 6v22a6 6 0 01-6 6H28l-12 10v-10H8a6 6 0 01-6-6V20a6 6 0 016-6z" fill="#fdf2e3" stroke="#e2932b" stroke-width="2"/><path d="M14 26h34M14 34h22" stroke="#e2932b" stroke-width="3" stroke-linecap="round"/><circle cx="56" cy="50" r="10" fill="#c2413b"/><path d="M56 44v7M56 54v1" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>`,
 lock:`<svg width="64" height="64" viewBox="0 0 70 70"><rect x="14" y="30" width="42" height="30" rx="6" fill="#efeafb" stroke="#6a4bc4" stroke-width="2"/><path d="M22 30V22a13 13 0 0126 0" fill="none" stroke="#6a4bc4" stroke-width="4"/><path d="M48 22l8-6" stroke="#c2413b" stroke-width="4" stroke-linecap="round"/><circle cx="35" cy="44" r="4" fill="#6a4bc4"/><path d="M35 48v5" stroke="#6a4bc4" stroke-width="3"/></svg>`,
 video:`<svg width="64" height="64" viewBox="0 0 56 56"><rect x="6" y="12" width="34" height="30" rx="5" fill="#c2413b"/><path d="M40 22l12-7v26l-12-7z" fill="#c2413b"/><path d="M18 21v12l10-6z" fill="#fff"/></svg>`,
 paper:`<svg width="64" height="64" viewBox="0 0 60 60"><rect x="12" y="6" width="36" height="48" rx="4" fill="#fffdf8" stroke="#c9b88f" stroke-width="2"/><path d="M19 18h22M19 25h22M19 32h16" stroke="#c9b88f" stroke-width="2.5"/><rect x="17" y="39" width="26" height="9" rx="2" fill="#eef6ff" stroke="#9cc0ea"/></svg>`,
 pen:`<svg width="64" height="64" viewBox="0 0 60 60"><rect x="8" y="10" width="34" height="42" rx="4" fill="#fff" stroke="#1d4e89" stroke-width="2"/><path d="M14 20h22M14 27h22M14 34h14" stroke="#9aa8bc" stroke-width="2.5"/><path d="M44 18l8 8-18 18-9 2 2-9z" fill="#e2932b"/></svg>`
};

const DECL=[['sp','Sản phẩm học tập','Ví dụ: Bài thuyết trình về di tích ở quê em'],['co','Có sử dụng AI không? (Có/Không)','Có hoặc Không'],['cc','Công cụ AI đã dùng','Ví dụ: chatbot do thầy cô hướng dẫn'],['phan','Dùng ở phần nào, để làm gì?','Ví dụ: gợi ý dàn ý'],['nguon','Đã kiểm tra bằng nguồn nào?','Ví dụ: sách lịch sử địa phương'],['tu','Phần em tự làm','Ví dụ: viết nội dung, trình bày'],['cam','Em cam kết (ít nhất 3 việc)','1. … 2. … 3. …']];

const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ox=(t,sel,cls,attrs)=>`<button type="button" class="opt ${cls||''} ${sel?'sel':''}" ${attrs||''}><span class="dot"></span><span>${t}</span></button>`;

/* Vẽ một hoạt động. ans: câu trả lời của học sinh; ro: chỉ xem */
function renderQs(step,ans,ro){
  ans=ans||{}; let qn=0;
  return (step.qs||[]).map(q=>{
    if(q.type==='sim') return `<div class="qblock qsim"><div class="qhd"><span class="qt">🧪 ${QTYPE.sim}</span></div><div class="simslot" data-sim="${q.sim}"></div></div>`;
    const v=ans[q.id]; let h=`<div class="qhd"><span class="qn">Câu ${++qn}</span><span class="qt">${QTYPE[q.type]||''}</span></div>`;
    if(q.head) h+=`<div class="story" style="margin-top:4px">${IC[q.ic]||''}<div><h3>${q.head}</h3><p style="margin:0">${q.ctx}</p></div></div>`;
    h+=`<p class="q" style="margin:12px 0 6px">${q.q}</p>`;
    if(q.type==='single'||q.type==='multi'){
      const m=q.type==='multi';
      h+=`<div class="opts" ${q.opts.some(o=>o.length>40)?'style="grid-template-columns:1fr"':''} data-q="${q.id}" data-t="${q.type}">${q.opts.map((o,k)=>ox(o,m?(v||[]).includes(k):v===k,m?'multi':'',`data-k="${k}"`)).join('')}</div>`;
    } else if(q.type==='text'){
      h+=q.short?`<input type="text" data-q="${q.id}" data-t="text" value="${esc(v)}" placeholder="${esc(q.ph||'')}">`:`<textarea data-q="${q.id}" data-t="text" placeholder="${esc(q.ph||'')}">${esc(v)}</textarea>`;
    } else if(q.type==='sort'){
      h+=`<div data-q="${q.id}" data-t="sort">${q.items.map((it,k)=>`<div class="sortrow"><span><b>${k+1}.</b> ${it.t}</span><span class="seg">${Object.entries(q.cols).map(([c,l])=>`<button type="button" class="${c} ${(v||{})[k]===c?'sel':''}" data-k="${k}" data-c="${c}">${l}</button>`).join('')}</span></div>`).join('')}</div>`;
    } else if(q.type==='tf'){
      h+=`<div data-q="${q.id}" data-t="tf">${q.items.map((it,k)=>`<div class="sortrow"><span><b>${k+1}.</b> ${it.t}</span><span class="seg">${['T','F'].map(c=>`<button type="button" class="${c} ${(v||{})[k]===c?'sel':''}" data-k="${k}" data-c="${c}">${c==='T'?'Đ':'S'}</button>`).join('')}</span></div>`).join('')}</div>`;
    } else if(q.type==='match'){
      h+=`<div class="chain" data-q="${q.id}" data-t="match">${q.items.map((it,k)=>`<div class="actor"><b>${it}</b><select data-k="${k}"><option value="">– Chọn –</option>${q.opts.map((o,j)=>`<option value="${j}" ${(v||{})[k]==j&&(v||{})[k]!==''&&(v||{})[k]!==undefined?'selected':''}>${o}</option>`).join('')}</select></div>`).join('')}</div>`;
    } else if(q.type==='decl'){
      h+=`<div data-q="${q.id}" data-t="decl" class="two"><div>${DECL.map(([k,l,ph])=>`<label class="f">${l}</label><input type="text" data-k="${k}" value="${esc((v||{})[k])}" placeholder="${esc(ph)}">`).join('')}</div></div>`;
    }
    return `<div class="qblock">${h}</div>`;
  }).join('');
}
/* Gắn tương tác chọn */
function wireQs(root){
  root.querySelectorAll('.opts').forEach(g=>{
    g.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ if(g.closest('.ro')) return;
      if(g.dataset.t==='multi') b.classList.toggle('sel'); else {g.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel')); b.classList.add('sel');}
      if(window.FX) FX.play('tick'); root.dispatchEvent(new Event('change'));});
  });
  root.querySelectorAll('[data-t="sort"],[data-t="tf"]').forEach(g=>{
    g.querySelectorAll('button').forEach(b=>b.onclick=()=>{ if(g.closest('.ro')) return;
      g.querySelectorAll(`button[data-k="${b.dataset.k}"]`).forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); if(window.FX) FX.play('tick'); root.dispatchEvent(new Event('change'));});
  });
}
/* Đọc câu trả lời từ giao diện */
function collect(root,step){
  const a={};
  step.qs.forEach(q=>{
    const el=root.querySelector(`[data-q="${q.id}"]`); if(!el) return;
    if(q.type==='single'){const s=el.querySelector('.opt.sel'); if(s) a[q.id]=+s.dataset.k;}
    else if(q.type==='multi'){const s=[...el.querySelectorAll('.opt.sel')].map(x=>+x.dataset.k); if(s.length) a[q.id]=s;}
    else if(q.type==='text'){const t=el.value.trim(); if(t) a[q.id]=t;}
    else if(q.type==='sort'||q.type==='tf'){const o={}; el.querySelectorAll('button.sel').forEach(b=>o[b.dataset.k]=b.dataset.c); if(Object.keys(o).length) a[q.id]=o;}
    else if(q.type==='match'){const o={}; el.querySelectorAll('select').forEach(s=>{if(s.value!=='') o[s.dataset.k]=+s.value;}); if(Object.keys(o).length) a[q.id]=o;}
    else if(q.type==='decl'){const o={}; el.querySelectorAll('input').forEach(i=>{if(i.value.trim()) o[i.dataset.k]=i.value.trim();}); if(Object.keys(o).length) a[q.id]=o;}
  });
  return a;
}
function missing(step,a){
  return step.qs.filter(q=>q.type!=='sim').filter(q=>{const v=a[q.id]; if(v===undefined) return true;
    if(q.type==='sort'||q.type==='tf'||q.type==='match') return Object.keys(v).length<q.items.length;
    if(q.type==='decl') return !v.sp||!v.co; return false;}).length;
}
/* ---- Chấm và thống kê ---- */
function isCorrect(q,v){
  if(v===undefined) return null;
  if(q.type==='single') return q.ok===undefined?null:v===q.ok;
  if(q.type==='multi') return q.ok?JSON.stringify([].concat(v).sort())===JSON.stringify(q.ok.slice().sort()):null;
  if(q.type==='sort'||q.type==='tf') return q.items.every((it,k)=>v[k]===it.a);
  if(q.type==='match') return q.items.every((it,k)=>v[k]===q.ok[k]);
  return null;
}
function itemOk(q,v,k){return q.type==='match'?v[k]===q.ok[k]:v[k]===q.items[k].a;}
function wOf(st){return Math.max(1,((st&&st.members)||[]).length||1);}
/* Tổng hợp kết quả cả lớp. all: {id:{bước:{câu:giá trị}}}, students: {id:{members,may,…}} */
function buildBoard(stepIdx,all,featured,students){
  students=students||{}; const step=STEPS[stepIdx]; const ids=Object.keys(students);
  const tot={m:ids.length,s:ids.reduce((t,id)=>t+wOf(students[id]),0)};
  const res={};
  step.qs.filter(q=>q.type!=='sim').forEach(q=>{
    const r={m:0,s:0,okM:0,okS:0,badM:0,badS:0,key:(q.type==='single'&&q.ok!==undefined)||(q.type==='multi'&&!!q.ok)||['sort','tf','match'].includes(q.type)};
    if(q.type==='single'||q.type==='multi') r.c=q.opts.map(()=>0);
    if(q.type==='sort'||q.type==='tf'||q.type==='match') r.c=q.items.map(()=>0);
    ids.forEach(id=>{
      const v=((all[id]||{})[stepIdx]||{})[q.id]; if(v===undefined) return;
      const w=wOf(students[id]); r.m++; r.s+=w;
      if(q.type==='single'||q.type==='multi') [].concat(v).forEach(k=>r.c[k]+=w);
      if(r.c&&(q.type==='sort'||q.type==='tf'||q.type==='match')) q.items.forEach((it,k)=>{if(itemOk(q,v,k)) r.c[k]+=w;});
      const ok=isCorrect(q,v);
      if(ok===true){r.okM++;r.okS+=w;} else if(ok===false){r.badM++;r.badS+=w;}
    });
    res[q.id]=r;
  });
  return {step:stepIdx,res,tot,featured:featured||[]};
}
function pct(a,b){return b?Math.round(a*100/b):0;}
function bars(rows){return `<div class="bars">${rows.map(([l,v,n,ok])=>`<div class="bar ${ok?'ok':''}"><span>${ok?'✓ ':''}${l}</span><span class="tr"><i style="width:${pct(v,n)}%"></i></span><b>${pct(v,n)}%</b></div>`).join('')}</div>`;}
/* Dòng thống kê đúng / chưa đúng / chưa nộp */
function statBox(q,r,tot,compact){
  if(!r) return '';
  const miss=Math.max(0,tot.s-r.s), missM=Math.max(0,tot.m-r.m);
  let h='';
  if(r.key){
    h+=`<div class="stack"><i class="g" style="width:${pct(r.okS,tot.s)}%"></i><i class="r" style="width:${pct(r.badS,tot.s)}%"></i><i class="n" style="width:${pct(miss,tot.s)}%"></i></div>
    <div class="stats"><span class="g">✅ Đúng: <b>${r.okS}</b> bạn (${r.okM} máy) – <b>${pct(r.okS,tot.s)}%</b></span>
    <span class="r">❌ Chưa đúng: <b>${r.badS}</b> bạn (${r.badM} máy) – <b>${pct(r.badS,tot.s)}%</b></span>
    <span class="n">⏳ Chưa nộp: <b>${miss}</b> bạn (${missM} máy) – <b>${pct(miss,tot.s)}%</b></span></div>`;
  } else {
    h+=`<div class="stats"><span class="b">📝 Đã trả lời: <b>${r.s}</b> bạn (${r.m} máy) – <b>${pct(r.s,tot.s)}%</b></span><span class="n">⏳ Chưa nộp: <b>${miss}</b> bạn (${missM} máy)</span></div>`;
  }
  if(r.c&&!compact){
    if(q.type==='single'||q.type==='multi') h+=`<div class="hint" style="margin-top:6px">Tỉ lệ chọn từng phương án (theo số bạn đã trả lời):</div>`+bars(q.opts.map((o,k)=>[o,r.c[k],r.s,q.ok!==undefined&&[].concat(q.ok).includes(k)]));
    else h+=`<div class="hint" style="margin-top:6px">Tỉ lệ làm đúng từng ý:</div>`+bars(q.items.map((it,k)=>[(k+1)+'. '+(typeof it==='string'?it:it.t).slice(0,70),r.c[k],r.s,false]));
  }
  return `<div class="statbox">${h}</div>`;
}
/* Bảng tổng hợp gọn (cột phải màn hình giáo viên) */
function renderBoard(board,mine,showKey){
  if(!board) return ''; const step=STEPS[board.step]; let h=`<p class="hint">Lớp có <b>${board.tot.s}</b> học sinh trên <b>${board.tot.m}</b> máy.</p>`;
  step.qs.forEach(q=>{const r=board.res[q.id]; if(!r) return; h+=`<div class="res"><h4>${q.head?q.head+' – ':''}${q.q}</h4>${statBox(q,r,board.tot,true)}</div>`;});
  return h;
}
/* Đánh dấu đáp án đúng ngay trên câu hỏi + thống kê từng câu (khi chiếu kết quả) */
function markReveal(root,step,mine,board){
  step.qs.forEach(q=>{
    const el=root.querySelector(`[data-q="${q.id}"]`); if(!el) return; const v=mine?mine[q.id]:undefined;
    if(q.type==='single'||q.type==='multi'){
      const ok=q.ok===undefined?[]:[].concat(q.ok);
      el.querySelectorAll('.opt').forEach(b=>{const k=+b.dataset.k; if(ok.includes(k)) b.classList.add('right'); else if(b.classList.contains('sel')) b.classList.add('wrong'); b.classList.remove('sel');
        if(mine&&ok.includes(k)&&!(v!==undefined&&[].concat(v).includes(k))&&q.type==='multi') b.classList.add('missed');});
    } else if(q.type==='sort'||q.type==='tf'){
      el.querySelectorAll('button').forEach(b=>{const k=+b.dataset.k, c=b.dataset.c, right=q.items[k].a===c, chosen=b.classList.contains('sel');
        b.classList.remove('sel'); if(right) b.classList.add('right'); else if(chosen) b.classList.add('wrong');});
    } else if(q.type==='match'){
      el.querySelectorAll('select').forEach(s=>{const k=+s.dataset.k, box=s.closest('.actor'); const good=mine?(v&&v[k]===q.ok[k]):true;
        box.classList.add(good?'right':'wrong'); const d=document.createElement('div'); d.className='corr'; d.textContent='✓ '+q.opts[q.ok[k]]; box.appendChild(d);});
    }
    if(q.ans&&(q.type==='text'||q.type==='decl'||(q.type==='single'&&q.ok===undefined))){
      const d=document.createElement('div'); d.className='sugg'; d.innerHTML='<b>💡 Gợi ý đáp án:</b> '+q.ans; el.insertAdjacentElement('afterend',d);
    }
    if(mine&&isCorrect(q,v)!==null){const ok=isCorrect(q,v); const t=document.createElement('span'); t.className='badge '+(ok?'g':'r');
      let txt=ok?'Em làm đúng':'Em chưa đúng'; if(!ok&&v&&(q.type==='sort'||q.type==='tf'||q.type==='match')) txt+=` (${q.items.filter((it,k)=>itemOk(q,v,k)).length}/${q.items.length} ý)`;
      t.textContent=txt; el.closest('.qblock').querySelector('.q').appendChild(document.createTextNode(' ')); el.closest('.qblock').querySelector('.q').appendChild(t);}
    if(board&&board.res[q.id]){const d=document.createElement('div'); d.innerHTML=statBox(q,board.res[q.id],board.tot,false); el.closest('.qblock').appendChild(d.firstElementChild);}
  });
}
function revealExtras(board,step){
  let h='';
  if(board&&board.featured&&board.featured.length) h+=`<h3 style="margin-top:16px">Câu trả lời được thầy cô chọn chiếu</h3>`+board.featured.map(f=>`<div class="feat"><b>${esc(f.name)}</b>: ${esc(f.text)}</div>`).join('');
  if(step.key) h+=`<div class="key"><h3>Điều cần nhớ</h3><ul>${step.key.map(k=>`<li>${k}</li>`).join('')}</ul></div>`;
  return h;
}
function textOf(q,v){
  if(v===undefined) return '';
  if(q.type==='decl') return DECL.filter(([k])=>v[k]).map(([k,l])=>l.split(' (')[0]+': '+v[k]).join(' | ');
  if(q.type==='single') return q.opts[v]; if(q.type==='multi') return v.map(k=>q.opts[k]).join('; ');
  if(q.type==='text') return v; return JSON.stringify(v);
}
/* Giai đoạn của hoạt động (màu + biểu tượng riêng để HS/GV biết đang ở đâu) */
function phaseOf(s){const t=((s&&s.hd)||'')+' '+((s&&s.t)||'');
  if(!s||s.k==='wel') return {k:'wel',ic:'👋',ten:'Chào mừng'};
  if(/tổng kết/i.test(t)) return {k:'tk',ic:'🏁',ten:'Tổng kết'};
  if(/khởi động|mở đầu/i.test(t)) return {k:'kd',ic:'🚀',ten:'Khởi động'};
  if(/vận dụng|mở rộng|tìm tòi/i.test(t)) return {k:'vd',ic:'🌱',ten:'Vận dụng'};
  if(/luyện tập|thử thách|củng cố/i.test(t)) return {k:'lt',ic:'🎯',ten:'Luyện tập'};
  return {k:'hk',ic:'💡',ten:'Hình thành kiến thức'};}
function stepHead(i){const s=STEPS[i], p=phaseOf(s), n=STEPS.length-2, b=(String(s.hd||'').match(/Bước\s*\d+/i)||[''])[0];
  return `<div class="sh ph-${p.k}"><div class="sh-top"><span class="sh-ph">${p.ic} ${p.ten}</span>${b?`<span class="sh-b">${b}</span>`:''}${i>0&&i<=n?`<span class="sh-n">Hoạt động <b>${i}</b>/${n}</span>`:''}${s.code?`<span class="chip code">${s.code}</span>`:''}</div><h2>${s.t}</h2></div>`;}
function stepStory(i){const s=STEPS[i]; return `<div class="sec-lb">📖 Đọc và quan sát</div><div class="story">${IC[s.ic]||''}<div style="flex:1">${s.story}</div></div>`;}
const QTYPE={single:'Chọn 1 đáp án',multi:'Chọn nhiều đáp án',sort:'Phân loại',tf:'Đúng / Sai',match:'Ghép nối',text:'Tự luận',decl:'Khai báo',sim:'Mô phỏng'};

/* Đáp án dùng cho giao diện giáo viên */
function correctOf(step){const a={}; step.qs.forEach(q=>{
  if(q.type==='single'&&q.ok!==undefined) a[q.id]=q.ok;
  else if(q.type==='multi'&&q.ok) a[q.id]=q.ok.slice();
  else if(q.type==='sort'||q.type==='tf'){const o={}; q.items.forEach((it,k)=>o[k]=it.a); a[q.id]=o;}
  else if(q.type==='match'){const o={}; q.ok.forEach((v,k)=>o[k]=v); a[q.id]=o;}
}); return a;}
function renderKey(i){const step=STEPS[i]; let h='<div class="key" style="background:var(--ok-soft);border-color:#bfe3cf;border-left-color:var(--ok)"><h3 style="color:var(--ok)">Đáp án</h3><ol style="margin:6px 0 0 18px;padding:0">';
  step.qs.filter(q=>q.type!=='sim').forEach(q=>{let t='';
    if(q.type==='single') t=q.ok!==undefined?q.opts[q.ok]:(q.ans||'');
    else if(q.type==='multi') t=q.ok.map(k=>q.opts[k]).join('; ');
    else if(q.type==='sort') t=q.items.map((it,k)=>(k+1)+' → '+q.cols[it.a]).join('; ');
    else if(q.type==='tf') t=q.items.map((it,k)=>(k+1)+': '+(it.a==='T'?'Đ':'S')).join('; ');
    else if(q.type==='match') t=q.items.map((it,k)=>it+' → '+q.opts[q.ok[k]]).join('; ');
    else t=q.ans||'';
    h+=`<li style="margin:4px 0"><b>${q.head?q.head+' – ':''}${q.q}</b><br>${t}</li>`;});
  h+='</ol></div>';
  if(step.key) h+=`<div class="key"><h3>Điều cần nhớ</h3><ul>${step.key.map(k=>`<li>${k}</li>`).join('')}</ul></div>`;
  return h;}

/* ---- Bảng thống kê theo nhóm (máy), vinh danh, xếp hạng ---- */
function labelOf(st){return st?((st.may?'Máy '+st.may+': ':'')+st.name):'';}
function keyedQs(step){return (step.qs||[]).filter(q=>(q.type==='single'&&q.ok!==undefined)||(q.type==='multi'&&q.ok)||['sort','tf','match'].includes(q.type));}
function groupTable(stepIdx,all,students){
  const step=STEPS[stepIdx], kq=keyedQs(step);
  const rows=Object.keys(students||{}).map(id=>{const a=step.qs?((all[id]||{})[stepIdx]):undefined; const marks=kq.map(q=>a?isCorrect(q,a[q.id]):null);
    return {id,label:labelOf(students[id]),n:wOf(students[id]),sub:!!a,marks,ok:marks.filter(m=>m===true).length};});
  rows.sort((x,y)=>(y.sub-x.sub)||(y.ok-x.ok)||x.label.localeCompare(y.label,'vi'));
  const honor=kq.length?rows.filter(r=>r.sub&&r.ok===kq.length).map(r=>({id:r.id,label:r.label})):[];
  return {cols:kq.map((q,k)=>'C'+(k+1)),qnames:kq.map(q=>(q.head?q.head.split(' –')[0]+' ':'')+q.q.replace(/<[^>]+>/g,'')),rows,honor,max:kq.length};
}
function renderTable(t,myId){
  if(!t||!t.rows.length) return '';
  let h=`<h3 style="margin-top:18px">📋 Bảng thống kê theo nhóm</h3>`;
  if(t.max) h+=`<p class="hint">${t.qnames.map((n,k)=>`<b>${t.cols[k]}</b>: ${esc(n.slice(0,60))}`).join(' · ')}</p>`;
  h+=`<div style="overflow-x:auto"><table class="tbl gt"><tr><th>Nhóm (máy)</th><th>Số bạn</th>${t.cols.map(c=>`<th>${c}</th>`).join('')}<th>${t.max?'Đúng':'Trạng thái'}</th></tr>`+
    t.rows.map(r=>`<tr class="${r.id===myId?'me':''}"><td>${esc(r.label)}${r.id===myId?' <span class="badge b">Nhóm em</span>':''}</td><td style="text-align:center">${r.n}</td>${r.marks.map(m=>`<td class="mk">${m===true?'<span class="g">✓</span>':m===false?'<span class="r">✗</span>':'–'}</td>`).join('')}<td style="text-align:center"><b>${r.sub?(t.max?r.ok+'/'+t.max:'Đã nộp'):'Chưa nộp'}</b></td></tr>`).join('')+'</table></div>';
  if(t.honor&&t.honor.length) h+=`<div class="honor"><h3>🏆 Vinh danh – trả lời đúng tất cả</h3>${t.honor.map(x=>`<span>${esc(x.label)}</span>`).join('')}</div>`;
  return h;
}
function renderPraise(list,myId){
  if(!list||!list.length) return '';
  return `<div class="praise"><h3>⭐ Lời khen, nhận xét của thầy cô</h3>${list.map(p=>`<div class="pr ${p.id===myId?'me':''}"><b>${esc(p.label)}</b> ${'⭐'.repeat(Math.min(5,p.stars||0))}${p.cmt?` – ${esc(p.cmt)}`:''}</div>`).join('')}</div>`;
}
/* Điểm: mỗi câu đúng 1 điểm, mỗi sao 2 điểm, mỗi phiếu bình chọn 1 điểm */
function rankRows(all,students,praise,votes){
  const rows=Object.keys(students||{}).map(id=>{let ok=0;
    STEPS.forEach((s,i)=>{if(!s.qs) return; const a=(all[id]||{})[i]; if(!a) return; keyedQs(s).forEach(q=>{if(isCorrect(q,a[q.id])===true) ok++;});});
    const stars=(praise||[]).filter(p=>p.id===id).reduce((t,p)=>t+(p.stars||0),0);
    const vt=Object.values(votes||{}).reduce((t,m)=>t+Object.values(m).filter(x=>x===id).length,0);
    return {id,label:labelOf(students[id]),n:wOf(students[id]),ok,stars,votes:vt,pts:ok+2*stars+vt};});
  rows.sort((a,b)=>b.pts-a.pts||b.ok-a.ok||a.label.localeCompare(b.label,'vi'));
  return rows;
}
function renderRank(rows,myId){
  const md=['🥇','🥈','🥉'];
  return `<h2>🏆 Bảng xếp hạng các nhóm</h2><p class="hint">Điểm = số câu đúng + 2 × số sao thầy cô khen + số phiếu bình chọn của các bạn.</p>
  <div style="overflow-x:auto"><table class="tbl gt"><tr><th>#</th><th>Nhóm (máy)</th><th>Câu đúng</th><th>Sao ⭐</th><th>Bình chọn 🗳</th><th>Điểm</th></tr>
  ${rows.map((r,k)=>`<tr class="${r.id===myId?'me':''} ${k<3&&r.pts>0?'top':''}"><td style="text-align:center;font-size:20px">${k<3&&r.pts>0?md[k]:k+1}</td><td>${esc(r.label)}${r.id===myId?' <span class="badge b">Nhóm em</span>':''}</td><td style="text-align:center">${r.ok}</td><td style="text-align:center">${r.stars}</td><td style="text-align:center">${r.votes}</td><td style="text-align:center"><b>${r.pts}</b></td></tr>`).join('')}</table></div>`;
}

/* ---- Nội dung ghi bài: mỗi hoạt động một mục, chiếu khi kết thúc hoạt động ---- */

/* ---- Chia một hoạt động thành từng phần: 0) đọc tình huống → mỗi mô phỏng / mỗi câu hỏi là MỘT phần.
   GV chiếu tới phần nào thì HS chỉ thấy phần đó (các câu đã làm vẫn giữ câu trả lời, chỉ tạm ẩn). ---- */
function nParts(step){const qs=(step&&step.qs)||[]; return 1+qs.length;}
function partLabel(step,p){const qs=(step&&step.qs)||[]; if(!p) return 'Tình huống';
  const q=qs[p-1]; if(!q) return ''; if(q.type==='sim') return 'Mô phỏng';
  return 'Câu '+qs.slice(0,p).filter(x=>x.type!=='sim').length+'/'+qs.filter(x=>x.type!=='sim').length;}
function applyParts(root,part,step){
  if(!root||!step) return; const n=nParts(step); part=Math.min(part,n-1);
  root.querySelectorAll('.qblock').forEach((b,k)=>{b.hidden=k!==part-1;});
  root.querySelectorAll('.sticky-sub').forEach(b=>b.hidden=part<1||(step.qs[part-1]||{}).type==='sim');
  let w=root.querySelector('.part-wait');
  if(part<n-1){ if(!w){w=document.createElement('div'); w.className='part-wait fb info show'; w.style.cssText='margin-top:14px;text-align:center;font-weight:700';
      const f=root.querySelector('form,#pf'); (f||root).insertAdjacentElement(f?'afterend':'beforeend',w);}
    w.innerHTML='📍 Đang ở: <b>'+partLabel(step,part)+'</b> · chờ thầy cô chuyển sang: '+partLabel(step,part+1)+' (phần '+(part+1)+'/'+n+')';}
  else if(w) w.remove();
}
/* Xếp hạng một câu: đúng trước, rồi ai nộp nhanh hơn (tính từ lúc thầy cô chiếu câu) */
function rankQRows(step,qi,ans,stu,tm,pt,part){const q=step&&step.qs[qi]; if(!q) return []; const t0=(pt||{})[part]||0;
  return Object.keys(stu||{}).map(sid=>{const v=(((ans||{})[sid]||{})[step._i]||{})[q.id], t=((((tm||{})[sid]||{})[step._i])||{})[q.id];
    const ok=v===undefined?null:isCorrect(q,v); return {id:sid,label:stu[sid].name+(stu[sid].may?' (máy '+stu[sid].may+')':''),done:v!==undefined,ok,sec:t&&t0?Math.max(0,Math.round((t-t0)/1000)):null};})
   .sort((a,b)=>(b.done-a.done)||((b.ok===true)-(a.ok===true))||((a.sec==null?1e9:a.sec)-(b.sec==null?1e9:b.sec)));}
function renderRankQ(o,myId){const md=['🥇','🥈','🥉'], rows=o.rows||[], tg=s=>s==null?'–':(s>=60?Math.floor(s/60)+' phút '+(s%60)+' giây':s+' giây');
  const pod=rows.filter(r=>r.done&&r.ok!==false).slice(0,3);
  return `<h2>🏁 Xếp hạng ${esc(o.title||'câu hỏi')}</h2><p class="hint">Trả lời <b>đúng</b> xếp trước, cùng đúng thì ai <b>nộp nhanh hơn</b> (tính từ lúc thầy cô chiếu câu) đứng trên.</p>
  ${pod.length?`<div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0">${pod.map((r,k)=>`<div style="flex:1;min-width:150px;text-align:center;padding:10px;border-radius:16px;background:${['#fde68a','#e5e7eb','#fed7aa'][k]};border:3px solid #1e2a5a;box-shadow:4px 4px 0 #1e2a5a"><div style="font-size:34px">${md[k]}</div><b>${esc(r.label)}</b><div>⏱ ${tg(r.sec)}</div></div>`).join('')}</div>`:''}
  <div style="overflow-x:auto"><table class="tbl gt"><tr><th>#</th><th>Nhóm (máy)</th><th>Kết quả</th><th>Thời gian</th></tr>${rows.map((r,k)=>`<tr class="${r.id===myId?'me':''}"><td style="text-align:center">${r.done?k+1:'–'}</td><td>${esc(r.label)}${r.id===myId?' <span class="badge b">Nhóm em</span>':''}</td><td>${!r.done?'⏳ Chưa nộp':r.ok===true?'✅ Đúng':r.ok===false?'❌ Chưa đúng':'📝 Đã trả lời'}</td><td>${r.done?tg(r.sec):''}</td></tr>`).join('')}</table></div>`;}
/* Vinh danh + thống kê một hoạt động: số câu đúng nhiều hơn đứng trên, bằng nhau thì ai xong sớm hơn */
function rankHRows(step,i,ans,stu,tm,pt){const qs=(step.qs||[]).filter(q=>q.type!=='sim'), t0=Math.min(...Object.keys(pt||{}).filter(k=>k.split('|')[0]==String(i)).map(k=>pt[k]),Infinity);
  return Object.keys(stu||{}).map(sid=>{const a=((ans||{})[sid]||{})[i]||{}, t=((tm||{})[sid]||{})[i]||{};
    const done=qs.filter(q=>a[q.id]!==undefined).length, ok=qs.filter(q=>isCorrect(q,a[q.id])===true).length, last=Math.max(0,...Object.values(t));
    return {id:sid,label:stu[sid].name+(stu[sid].may?' (máy '+stu[sid].may+')':''),done,ok,n:qs.length,sec:last&&isFinite(t0)?Math.max(0,Math.round((last-t0)/1000)):null,
      cau:qs.map(q=>a[q.id]===undefined?'⏳':isCorrect(q,a[q.id])===true?'✅':isCorrect(q,a[q.id])===false?'❌':'📝')};})
   .sort((a,b)=>(b.ok-a.ok)||(b.done-a.done)||((a.sec==null?1e9:a.sec)-(b.sec==null?1e9:b.sec)));}
function renderRankH(o,myId){const md=['🥇','🥈','🥉'], rows=o.rows||[], tg=s=>s==null?'–':(s>=60?Math.floor(s/60)+'′'+String(s%60).padStart(2,'0')+'″':s+' giây');
  const pod=rows.filter(r=>r.ok>0).slice(0,3), n=rows.length, nop=rows.filter(r=>r.done).length, nq=(rows[0]||{}).n||0;
  return `<h2>🏆 Vinh danh – ${esc(o.title||'hoạt động')}</h2>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 12px"><span class="badge b">📥 Đã nộp: ${nop}/${n} nhóm</span><span class="badge g">✅ Đúng hết: ${rows.filter(r=>r.n&&r.ok===r.n).length} nhóm</span><span class="badge o">❓ ${nq} câu</span></div>
  ${pod.length?`<div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0;align-items:flex-end">${[1,0,2].filter(k=>pod[k]).map(k=>{const r=pod[k];return `<div style="flex:1;min-width:150px;text-align:center;padding:${k?10:18}px 10px;border-radius:16px;background:${['#fde68a','#e5e7eb','#fed7aa'][k]};border:3px solid #1e2a5a;box-shadow:4px 4px 0 #1e2a5a"><div style="font-size:${k?32:44}px">${md[k]}</div><b>${esc(r.label)}</b><div>${r.ok}/${r.n} câu đúng · ⏱ ${tg(r.sec)}</div></div>`;}).join('')}</div>`:'<p class="hint">Chưa có nhóm nào trả lời đúng.</p>'}
  <div style="overflow-x:auto"><table class="tbl gt"><tr><th>#</th><th>Nhóm (máy)</th>${Array.from({length:nq},(_,k)=>`<th>Câu ${k+1}</th>`).join('')}<th>Đúng</th><th>Xong sau</th></tr>${rows.map((r,k)=>`<tr class="${r.id===myId?'me':''}"><td style="text-align:center">${r.done?k+1:'–'}</td><td>${esc(r.label)}${r.id===myId?' <span class="badge b">Nhóm em</span>':''}</td>${r.cau.map(c=>`<td style="text-align:center">${c}</td>`).join('')}<td style="text-align:center"><b>${r.ok}/${r.n}</b></td><td>${r.done?tg(r.sec):'⏳'}</td></tr>`).join('')}</table></div>
  <p class="hint">✅ đúng · ❌ chưa đúng · 📝 câu tự luận (thầy cô nhận xét) · ⏳ chưa nộp</p>`;}
/* Chốt từng câu: hiện đáp án + thống kê cả lớp của các câu đã chốt, khoá các câu đó */
function applyQrev(root,step,mine,board,qrev){
  if(!root||!step||!qrev||!qrev.length) return;
  qrev.forEach(id=>{const q=(step.qs||[]).find(x=>x.id===id), el=q&&root.querySelector(`[data-q="${id}"]`); if(!el) return; const blk=el.closest('.qblock');
    if(blk.dataset.qr) return; blk.dataset.qr=1; markReveal(blk,{qs:[q]},mine,board);
    blk.querySelectorAll('input,textarea,select,button').forEach(x=>x.disabled=true); blk.style.pointerEvents='none';
    const t=document.createElement('div'); t.className='badge g'; t.style.cssText='display:inline-block;margin:6px 0'; t.textContent='✅ Thầy cô đã chốt câu này'; blk.prepend(t);
    if(board&&board.res&&board.res[id]){const d=document.createElement('div'); d.innerHTML=statBox(q,board.res[id],board.tot,false); blk.appendChild(d.firstElementChild);}});
}
/* Ghi bài từng mục: hiện mục 1..k (mục mới nhất tô nổi) để học sinh chép dần theo lời giảng */
function renderGhiMuc(k){const all=GHIBAI.muc, ms=all.slice(0,Math.max(1,k)).map((m,j)=>Object.assign({n:j+1},m));
  return `<div class="vo"><div class="vo-title"><span class="b">${GHIBAI.so}</span> <span class="r">${GHIBAI.ten}</span></div>`+ms.map((m,j)=>`<div class="vo-m ${j===ms.length-1&&ms.length>1?'vo-new':''}"><div class="vo-mh">${m.n}. <span>${m.h}</span></div>
   ${m.it&&m.it.length?`<ul>${m.it.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
   ${m.flow?`<div class="vo-flow">${m.flow.map(x=>`<div>${x}</div>`).join('<i>→</i>')}</div>`:''}
   ${m.tb?`<table class="vo-tb"><tr>${m.tb[0].map(x=>`<th>${x}</th>`).join('')}</tr>${m.tb.slice(1).map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table>`:''}</div>`).join('')+`<div class="vo-f">✍️ Mục ${ms.length}/${all.length} – các em chép vào vở.</div></div>`;}
function renderGhiBai(upto,only){
  /* Cả bài (nút 📒 Bài ghi, bước Tổng kết): dùng ảnh tóm tắt thầy cô soạn sẵn nếu có */
  if(!only&&BAI.tomtat) return `<div class="vo tomtat"><img src="${BAI.tomtat}" alt="Tóm tắt ${esc(BAI.ten)}" style="display:block;width:100%;height:auto;border-radius:8px"><div class="vo-f">✍️ Các em chép phần trên vào vở.</div></div>`;
  const ms=GHIBAI.muc.map((m,k)=>Object.assign({n:k+1},m)).filter(m=>only?m.step===only:m.step<=upto);
  if(!ms.length) return '<p class="hint">Chưa có nội dung ghi bài cho phần này.</p>';
  const last=ms[ms.length-1].step;
  return `<div class="vo"><div class="vo-title"><span class="b">${GHIBAI.so}</span> <span class="r">${GHIBAI.ten}</span></div>`+ms.map(m=>`<div class="vo-m ${!only&&m.step===last&&ms.length>1?'vo-new':''}"><div class="vo-mh">${m.n}. <span>${m.h}</span></div>
   ${m.it?`<ul>${m.it.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
   ${m.flow?`<div class="vo-flow">${m.flow.map(x=>`<div>${x}</div>`).join('<i>→</i>')}</div>`:''}
   ${m.tb?`<table class="vo-tb"><tr>${m.tb[0].map(x=>`<th>${x}</th>`).join('')}</tr>${m.tb.slice(1).map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table>`:''}</div>`).join('')+`<div class="vo-f">✍️ Các em chép phần trên vào vở.</div></div>`;
}

/* ---- Mã YCCĐ của từng câu (dùng cho tổng hợp 12 tiết) ---- */


function lessonMeta(){
  const qs=[]; STEPS.forEach((s,i)=>(s.qs||[]).forEach(q=>{ if(q.type==='sim'||!q.code) return;
    const m={step:i,id:q.id,code:q.code,type:q.type,t:(q.head?q.head.split(' –')[0]+' ':'')+q.q.replace(/<[^>]+>/g,'').slice(0,80)};
    if(q.ok!==undefined) m.ok=q.ok; if(q.type==='sort'||q.type==='tf') m.ia=q.items.map(it=>it.a); if(q.type==='match') m.ok=q.ok; qs.push(m);}));
  return {bai:{lop:BAI.lop,so:BAI.so,ten:BAI.ten,tiet:STEPS.filter(s=>s.hd&&/Tiết 2/.test(s.hd)).length?2:1},yccd:BAI.yccd.split('·').map(x=>x.trim()),qs};
}

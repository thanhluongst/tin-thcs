/* Mô phỏng Bài 1 lớp 8 – chỉ để minh hoạ, số liệu giả định. Hàm tiện ích (_el,_shell,_seg,_wireSeg,histTable) có sẵn trong khung lop/mophong.js. */
function _meter(lbl,v,col){return `<div style="margin:6px 0"><div style="display:flex;justify-content:space-between;font-weight:600"><span>${lbl}</span><span>${v}%</span></div><div style="height:14px;background:#e5e7eb;border-radius:99px;overflow:hidden"><i style="display:block;height:100%;width:${v}%;background:${col};transition:width .6s"></i></div></div>`;}
const SIMS={
/* 1. Giao việc cho AI đến mức nào? */
replace(){
  const F={gd:['Giáo dục','chấm, nhận xét bài văn'],yt:['Y tế','báo kết quả bệnh, tư vấn'],nt:['Nghệ thuật','vẽ tranh dự thi']};
  const st={f:'gd',hist:[]};
  const e=_el(_shell('Giao việc cho AI đến mức nào?',
   'Chọn lĩnh vực, kéo thanh <b>mức giao việc cho AI</b>, bấm <b>▶ Chạy</b>. Quan sát bốn thước đo. Thử ít nhất 3 mức: 0%, khoảng 40%, 100%.',
   `<div class="sim-ctl"><div><label>Lĩnh vực</label>${_seg('f',[['gd','🏫 Giáo dục'],['yt','🏥 Y tế'],['nt','🎨 Nghệ thuật']],'gd')}</div>
    <div><label>Mức giao cho AI: <b class="pv">40</b>%</label><input type="range" class="pc" min="0" max="100" step="10" value="40" style="width:220px"></div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Chạy</button></div></div>
    <div class="out" style="max-width:520px"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Lĩnh vực</th><th>Giao AI</th><th>Tốc độ</th><th>Thấu hiểu</th><th>Trách nhiệm rõ</th><th>Dấu ấn riêng</th></tr><tr class="empty"><td colspan="7">Chưa chạy lần nào.</td></tr></table>`));
  const pc=e.querySelector('.pc'); pc.oninput=()=>e.querySelector('.pv').textContent=pc.value;
  _wireSeg(e,(n,v)=>{st[n]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh');
    const p=+pc.value/100, sp=Math.round(30+70*p), th=Math.round(p<=.5?90-20*p:80-150*(p-.5)), tr=Math.round(p<=.5?95-10*p:90-160*(p-.5)), ds=Math.round(st.f==='nt'?95-90*p:85-60*p);
    const cl=v=>Math.max(5,Math.min(100,v)); const v=[sp,cl(th),cl(tr),cl(ds)];
    e.querySelector('.out').innerHTML=`<p><b>${F[st.f][0]}</b> – ${F[st.f][1]}</p>`+_meter('⚡ Tốc độ, tiết kiệm công sức',v[0],'#2563eb')+_meter('💗 Sự thấu hiểu, tình cảm',v[1],'#db2777')+_meter('🧑‍⚖️ Có người chịu trách nhiệm rõ ràng',v[2],'#16a34a')+_meter('✍️ Dấu ấn riêng của con người',v[3],'#d97706')+
      `<p class="hint">${p>=.9?'⚠ Giao hết cho AI: nhanh nhưng mất sự thấu hiểu và không rõ ai chịu trách nhiệm.':p<=.1?'Không dùng AI: vẫn tốt nhưng chậm, tốn công.':'✅ AI hỗ trợ, con người quyết định: cân bằng hơn.'}</p>`;
    st.hist.unshift([F[st.f][0],pc.value+'%',...v.map(x=>x+'%')]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(x,j)=>j>=3&&parseInt(x)<40?'r':'');
    if(window.FX) FX.play('ding');};
  return e;
},
/* 2. Mười tuần làm bài: An và Bình */
brain(){
  const st={c:'an',hist:[]};
  const e=_el(_shell('Mười tuần làm bài với AI tạo sinh',
   'Chọn cách làm, bấm <b>▶ Chạy 10 tuần</b>. Đường xanh: tư duy phản biện; đường cam: sáng tạo; cột đỏ: số lỗi thông tin sai lọt vào bài nộp. Chạy cả hai cách để so sánh.',
   `<div class="sim-ctl"><div><label>Cách làm</label>${_seg('c',[['an','📋 Như An: chép nguyên đầu ra AI'],['binh','🔍 Như Bình: tự làm trước, đối chiếu sau']],'an')}</div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Chạy 10 tuần</button></div></div>
    <svg viewBox="0 0 520 220" class="sim-svg" style="max-width:560px"><line x1="40" y1="190" x2="510" y2="190" stroke="#94a3b8"/><line x1="40" y1="10" x2="40" y2="190" stroke="#94a3b8"/>
     <text x="275" y="214" font-size="12" text-anchor="middle" fill="#64748b">Tuần 1 → 10</text><g class="bars"></g><polyline class="l1" fill="none" stroke="#16a34a" stroke-width="3"/><polyline class="l2" fill="none" stroke="#d97706" stroke-width="3"/></svg>
    <div class="sim-cnt"><div><b class="c1">–</b>tư duy phản biện</div><div><b class="c2">–</b>sáng tạo</div><div class="bad"><b class="c3">–</b>lỗi sai lọt vào bài</div></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Cách làm</th><th>Phản biện</th><th>Sáng tạo</th><th>Lỗi sai lọt</th></tr><tr class="empty"><td colspan="5">Chưa chạy lần nào.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st[n]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh');
    const an=st.c==='an'; let t=60,s=60,err=0; const P1=[],P2=[],B=[];
    for(let w=0;w<10;w++){ t+=an?-4-Math.random()*2:2+Math.random()*2; s+=an?-3-Math.random()*2:1.5+Math.random()*2;
      const bad=an?(Math.random()<.45?1:0)+(Math.random()<.3?1:0):(Math.random()<.08?1:0); err+=bad;
      t=Math.max(5,Math.min(100,t)); s=Math.max(5,Math.min(100,s));
      const x=40+(w+.5)*47; P1.push(x+','+(190-t*1.7)); P2.push(x+','+(190-s*1.7)); B.push(`<rect x="${x-8}" y="${190-bad*25}" width="16" height="${bad*25}" fill="#dc2626" opacity=".7"/>`);}
    e.querySelector('.bars').innerHTML=B.join(''); e.querySelector('.l1').setAttribute('points',P1.join(' ')); e.querySelector('.l2').setAttribute('points',P2.join(' '));
    e.querySelector('.c1').textContent=Math.round(t); e.querySelector('.c2').textContent=Math.round(s); e.querySelector('.c3').textContent=err;
    st.hist.unshift([an?'Như An':'Như Bình',Math.round(t),Math.round(s),err]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(x,j)=>j===3?(x>2?'r':'g'):'');
    if(window.FX) FX.play('ding');};
  return e;
},
/* 3. Xếp quy trình năm bước */
steps5(){
  const OK=['Tự làm trước','Hỏi AI có mục đích','Kiểm chứng với nguồn tin cậy','Quyết định giữ hay sửa, có lí do','Ghi rõ phần tự làm, phần AI hỗ trợ'];
  const X='Nộp ngay đầu ra AI cho kịp giờ';
  const st={pick:[],hist:[]};
  const e=_el(_shell('Xếp quy trình năm bước của Bình',
   'Bấm các thẻ theo <b>đúng thứ tự</b> Bình đã làm. Có <b>một thẻ không phải</b> cách làm của Bình. Bấm <b>✔ Kiểm tra</b>, sai thì <b>↺ Làm lại</b>.',
   `<div class="cards" style="display:flex;flex-wrap:wrap;gap:8px;margin:8px 0"></div><div class="seq" style="min-height:40px;padding:8px;border:2px dashed #cbd5e1;border-radius:12px"></div>
    <div style="margin:8px 0"><button type="button" class="btn acc chk">✔ Kiểm tra</button> <button type="button" class="btn rs">↺ Làm lại</button></div><p class="msg" style="font-weight:700"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số bước đúng vị trí</th><th>Chọn thẻ thừa?</th></tr><tr class="empty"><td colspan="3">Chưa kiểm tra lần nào.</td></tr></table>`));
  const draw=()=>{const all=[...OK,X].sort((a,b)=>a.length%3-b.length%3||a.localeCompare(b));
    e.querySelector('.cards').innerHTML=all.map(c=>`<button type="button" class="btn" ${st.pick.includes(c)?'disabled style="opacity:.4"':''} data-c="${c}">${c}</button>`).join('');
    e.querySelector('.seq').innerHTML=st.pick.map((c,i)=>`<span class="chip" style="margin:3px">${'①②③④⑤⑥'[i]} ${c}</span>`).join('')||'<span class="hint">Thẻ em chọn sẽ hiện ở đây</span>';
    e.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{st.pick.push(b.dataset.c); if(window.FX) FX.play('tick'); draw();});};
  e.querySelector('.rs').onclick=()=>{st.pick=[];e.querySelector('.msg').textContent='';draw();};
  e.querySelector('.chk').onclick=()=>{const n=OK.filter((c,i)=>st.pick[i]===c).length, x=st.pick.includes(X);
    e.querySelector('.msg').textContent=n===5&&!x?'✅ Chính xác! Đây là quy trình năm bước dùng AI tạo sinh có kiểm chứng.':`Đúng vị trí ${n}/5${x?' – có thẻ thừa: “'+X+'” không phải cách của Bình.':''}`;
    st.hist.unshift([n+'/5',x?'Có':'Không']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===0?(v==='5/5'?'g':'r'):'');
    if(window.FX) FX.play(n===5&&!x?'win':'ding');};
  draw(); return e;
}
};

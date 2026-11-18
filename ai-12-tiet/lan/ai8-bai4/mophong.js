/* Mô phỏng Bài 4 lớp 8 – chỉ để minh hoạ, số liệu giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js. */
const SIMS={
/* hàm vẽ thước đo dùng chung (không phải mô phỏng) */
_m(lbl,v,col){return `<div style="margin:6px 0"><div style="display:flex;justify-content:space-between;font-weight:600"><span>${lbl}</span><span>${v}%</span></div><div style="height:14px;background:#e5e7eb;border-radius:99px;overflow:hidden"><i style="display:block;height:100%;width:${v}%;background:${col};transition:width .6s"></i></div></div>`;},
/* 1. Máy điểm danh học từ dữ liệu lệch */
bias(){
  const st={hist:[]};
  const e=_el(_shell('Máy điểm danh học từ ảnh mẫu',
   'Kéo thanh để chọn <b>tỉ lệ ảnh mẫu nhóm A (😀)</b> và <b>nhóm B (🧑🏿, đeo kính, ánh sáng yếu)</b> trong 100 ảnh huấn luyện, bấm <b>▶ Huấn luyện & thử</b>. Máy thử nhận diện 20 bạn mỗi nhóm. Thử 90/10, 70/30, 50/50.',
   `<div class="sim-ctl"><div><label>Ảnh nhóm A: <b class="pa">90</b> · nhóm B: <b class="pb">10</b></label><input type="range" class="r" min="50" max="100" step="10" value="90" style="width:240px"></div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Huấn luyện & thử</button></div></div>
    <div class="two" style="gap:14px"><div><b>Nhóm A</b><div class="ga" style="font-size:22px;line-height:1.5"></div></div><div><b>Nhóm B</b><div class="gb" style="font-size:22px;line-height:1.5"></div></div></div>
    <div class="out" style="max-width:520px"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Ảnh A/B</th><th>Đúng nhóm A</th><th>Đúng nhóm B</th><th>Chênh lệch</th></tr><tr class="empty"><td colspan="5">Chưa chạy.</td></tr></table>`));
  const r=e.querySelector('.r'); r.oninput=()=>{e.querySelector('.pa').textContent=r.value;e.querySelector('.pb').textContent=100-r.value;};
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const a=+r.value, b=100-a;
    const pA=Math.min(.97,.6+a/300), pB=Math.min(.97,.35+b*1.2/100);
    let ka=0,kb=0; const row=(p,ic)=>[...Array(20)].map(()=>{const ok=Math.random()<p; if(ok){ic==='A'?ka++:kb++} return ok?'✅':'❌';}).join('');
    e.querySelector('.ga').textContent=row(pA,'A'); e.querySelector('.gb').textContent=row(pB,'B');
    const A=ka*5,B=kb*5;
    e.querySelector('.out').innerHTML=SIMS_BAI._m('Nhận đúng nhóm A',A,'#2563eb')+SIMS_BAI._m('Nhận đúng nhóm B',B,'#db2777')+`<p class="hint">${A-B>=25?'⚠ Máy thiên vị: dữ liệu lệch → kết luận sai với nhóm ít ảnh. Bạn nhóm B có thể bị ghi "vắng" oan.':'Dữ liệu cân bằng hơn → máy công bằng hơn (nhưng vẫn có thể sai).'}</p>`;
    st.hist.unshift([a+'/'+b,A+'%',B+'%',(A-B)+'%']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===3?(parseInt(v)>=25?'r':'g'):'');
    if(window.FX) FX.play('ding');};
  return e;
},
/* 2. Tin nhắn xin tiền gấp: Dừng – Hỏi – Kiểm */
scam(){
  const ACT={chuyen:['💸 Chuyển tiền ngay',-1],otp:['🔢 Đọc mã OTP',-1],dung:['✋ Dừng: không chuyển, không đọc OTP',1],hoi:['☎️ Hỏi: gọi số thường của anh, hỏi bố mẹ',2],kiem:['🔍 Kiểm: hỏi câu chỉ người nhà biết, xem tài khoản lạ',3],tra:['💬 Nhắn lại hỏi thêm số tài khoản',0]};
  const st={seq:[],hist:[]};
  const e=_el(_shell('Tin nhắn xin tiền gấp',
   '“<i>Anh đây, đang cấp cứu, chuyển gấp 3 triệu vào số 0123… đừng nói bố mẹ!</i>” (giả định). Bấm các việc em sẽ làm <b>theo thứ tự</b>, rồi bấm <b>▶ Xem kết quả</b>.',
   `<div class="acts" style="display:flex;flex-wrap:wrap;gap:8px"></div><div class="seq" style="margin:8px 0;min-height:36px;padding:8px;border:2px dashed #cbd5e1;border-radius:12px"></div>
    <button type="button" class="btn acc run">▶ Xem kết quả</button> <button type="button" class="btn rs">↺ Làm lại</button><p class="msg" style="font-weight:700"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Các bước</th><th>Kết quả</th></tr><tr class="empty"><td colspan="3">Chưa có.</td></tr></table>`));
  const draw=()=>{e.querySelector('.acts').innerHTML=Object.keys(ACT).map(k=>`<button type="button" class="btn" data-k="${k}" ${st.seq.includes(k)?'disabled style="opacity:.4"':''}>${ACT[k][0]}</button>`).join('');
    e.querySelector('.seq').innerHTML=st.seq.map((k,i)=>`<span class="chip" style="margin:3px">${i+1}. ${ACT[k][0]}</span>`).join('')||'<span class="hint">Chưa chọn bước nào</span>';
    e.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{st.seq.push(b.dataset.k);if(window.FX)FX.play('tick');draw();});};
  e.querySelector('.rs').onclick=()=>{st.seq=[];e.querySelector('.msg').textContent='';draw();};
  e.querySelector('.run').onclick=()=>{ const s=st.seq; let r;
    if(s.some(k=>ACT[k][1]<0)&&!(s.indexOf('dung')>=0&&s.indexOf('dung')<Math.min(...s.filter(k=>ACT[k][1]<0).map(k=>s.indexOf(k))))) r='❌ Mất tiền / mất tài khoản – kẻ gian dùng giọng, mặt giả bằng AI.';
    else if(s[0]==='dung'&&s.includes('hoi')&&s.includes('kiem')&&s.indexOf('hoi')<s.indexOf('kiem')) r='✅ An toàn: gọi số thường, anh họ vẫn đang ngủ ở nhà – đó là cuộc gọi giả!';
    else r='⚠ Chưa đủ: hãy Dừng trước, rồi Hỏi, rồi Kiểm.';
    e.querySelector('.msg').textContent=r; st.hist.unshift([s.length+' bước',r.slice(0,2)]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v.startsWith('✅')?'g':'r'):'');
    if(window.FX) FX.play(r.startsWith('✅')?'win':'ding');};
  draw(); return e;
},
/* 3. Hội đồng thẩm định camera điểm danh */
council(){
  const M={dongy:['Xin đồng ý của phụ huynh, HS',{dl:15}],xoa:['Mã hoá ảnh, xoá sau 1 tháng',{dl:20}],thaythe:['Có cách điểm danh thay thế (gọi tên)',{tt:10,dl:10}],kiemthu:['Kiểm thử đủ nhóm HS (đeo kính, ánh sáng yếu)',{tt:25}],congkhai:['Công khai thu gì, để làm gì',{dl:10,sl:15}],nguoi:['GV xem lại trước khi ghi "vắng"',{tt:15,sl:20}]};
  const st={on:{},hist:[]};
  const e=_el(_shell('Hội đồng thẩm định: camera điểm danh',
   'Bật các biện pháp giảm thiểu, bấm <b>▶ Đánh giá</b>. Quan sát ba thước đo rủi ro và mức quyết định gợi ý. Thử ít nhất 3 phương án.',
   `<div class="ms" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:6px">${Object.keys(M).map(k=>`<label style="display:flex;gap:6px;align-items:center;padding:6px 10px;border:1px solid #cbd5e1;border-radius:10px;cursor:pointer"><input type="checkbox" data-k="${k}"> ${M[k][0]}</label>`).join('')}</div>
    <div style="margin:8px 0"><button type="button" class="btn acc run">▶ Đánh giá</button></div><div class="out" style="max-width:520px"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số biện pháp</th><th>Rủi ro dữ liệu</th><th>Rủi ro thiên vị</th><th>Rủi ro sai lệch</th><th>Gợi ý</th></tr><tr class="empty"><td colspan="6">Chưa có.</td></tr></table>`));
  e.querySelectorAll('[data-k]').forEach(c=>c.onchange=()=>{st.on[c.dataset.k]=c.checked;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); let dl=80,tt=70,sl=50,n=0;
    Object.keys(M).forEach(k=>{if(st.on[k]){n++;const d=M[k][1];dl-=d.dl||0;tt-=d.tt||0;sl-=d.sl||0;}});
    dl=Math.max(5,dl);tt=Math.max(5,tt);sl=Math.max(5,sl); const mx=Math.max(dl,tt,sl);
    const g=mx>=60?'Không triển khai':mx>=30?'Triển khai có điều kiện':'Có thể triển khai, tiếp tục giám sát';
    e.querySelector('.out').innerHTML=SIMS_BAI._m('🔒 Rủi ro dữ liệu, quyền riêng tư',dl,'#dc2626')+SIMS_BAI._m('⚖️ Rủi ro thiên vị, nhận sai',tt,'#d97706')+SIMS_BAI._m('📢 Rủi ro thông tin sai lệch (ghi vắng oan)',sl,'#7c3aed')+`<p><b>Gợi ý:</b> ${g}</p>`;
    st.hist.unshift([n,dl+'%',tt+'%',sl+'%',g]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j>=1&&j<=3&&parseInt(v)>=60?'r':'');
    if(window.FX) FX.play('ding');};
  return e;
}
};

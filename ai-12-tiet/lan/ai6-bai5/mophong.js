/* Mô phỏng Bài 5 lớp 6 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
train(){
  const st={l:'0',d:[],hist:[]};
  const e=_el(_shell('Dạy máy phân loại quả',
   'Chọn loại quả, <b>bấm lên bảng</b> để thêm ví dụ (trục ngang: độ to; trục đứng: càng lên cao càng đỏ). Rồi bấm <b>▶ Kiểm tra 20 quả mới</b>. Thử với 2 ví dụ, rồi 10 ví dụ.',
   `<div class="sim-ctl"><div><label>Đang thêm</label>${_seg('l',[['0','🍎 Táo (đỏ)'],['1','🍋 Chanh (vàng)']],'0')}</div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Kiểm tra 20 quả mới</button> <button type="button" class="btn x">🧹 Xoá</button></div></div>
    <svg viewBox="0 0 360 240" class="sim-svg" style="max-width:420px;background:linear-gradient(#fee2e2,#fef9c3);border-radius:10px;cursor:crosshair"><g class="pt"></g><g class="tt"></g></svg>
    <p class="msg" style="font-weight:700"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số ví dụ</th><th>Đoán đúng /20</th></tr><tr class="empty"><td colspan="3">Chưa kiểm tra.</td></tr></table>`));
  const sv=e.querySelector('svg'), truth=(x,y)=>y>120?1:0;
  const draw=()=>{e.querySelector('.pt').innerHTML=st.d.map(p=>`<text x="${p[0]-9}" y="${p[1]+7}" font-size="18">${p[2]?'🍋':'🍎'}</text>`).join('');};
  _wireSeg(e,(a,v)=>{st[a]=v;});
  sv.onclick=ev=>{const r=sv.getBoundingClientRect();st.d.push([(ev.clientX-r.left)*360/r.width,(ev.clientY-r.top)*240/r.height,+st.l]);e.querySelector('.tt').innerHTML='';draw();if(window.FX)FX.play('tick');};
  e.querySelector('.x').onclick=()=>{st.d=[];draw();e.querySelector('.tt').innerHTML='';e.querySelector('.msg').textContent='';};
  e.querySelector('.run').onclick=()=>{ if(!st.d.length){e.querySelector('.msg').textContent='🤖 Chưa có dữ liệu – máy chưa học được gì!';return;}
    if(window.FX) FX.play('whoosh'); let ok=0; const T=[];
    for(let i=0;i<20;i++){const x=Math.random()*340+10,y=Math.random()*220+10;let b=st.d[0];st.d.forEach(p=>{if(Math.hypot(p[0]-x,p[1]-y)<Math.hypot(b[0]-x,b[1]-y))b=p;});const c=b[2]===truth(x,y);ok+=c;T.push(`<rect x="${x-6}" y="${y-6}" width="12" height="12" fill="none" stroke="${c?'#16a34a':'#dc2626'}" stroke-width="2.5"/>`);}
    e.querySelector('.tt').innerHTML=T.join(''); e.querySelector('.msg').textContent=`Máy đoán đúng ${ok}/20 (ô xanh: đúng, ô đỏ: sai).`;
    st.hist.unshift([st.d.length,ok]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v>=16?'g':'r'):''); if(window.FX) FX.play('ding');};
  return e;
},
noise(){
  const st={n:'40',hist:[]};
  const e=_el(_shell('Thử nghiệm: dữ liệu bị dán nhãn sai',
   'Chọn số ví dụ, kéo thanh <b>% nhãn sai</b>, bấm <b>▶ Huấn luyện và kiểm tra</b>. Ghi lại độ chính xác, thử ít nhất 4 lần.',
   `<div class="sim-ctl"><div><label>Số ví dụ</label>${_seg('n',[['10','10'],['40','40'],['100','100']],'40')}</div>
    <div><label>Nhãn sai: <b class="ev">0</b>%</label><input type="range" class="e" min="0" max="50" step="10" value="0" style="width:200px"></div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Huấn luyện và kiểm tra</button></div></div>
    <p>Độ chính xác: <b class="o" style="font-size:22px">–</b></p><div style="height:14px;background:#e5e7eb;border-radius:9px;overflow:hidden;max-width:400px"><i class="bar" style="display:block;height:100%;width:0;background:#2563eb;transition:width .6s"></i></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số ví dụ</th><th>% nhãn sai</th><th>Chính xác</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  const r=e.querySelector('.e'); r.oninput=()=>e.querySelector('.ev').textContent=r.value;
  _wireSeg(e,(a,v)=>{st[a]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const n=+st.n,er=+r.value/100,P=()=>[Math.random(),Math.random()],t=p=>p[1]>.5?1:0;
    const D=[...Array(n)].map(()=>{const p=P();return [p,Math.random()<er?1-t(p):t(p)];}); let ok=0;
    for(let i=0;i<200;i++){const p=P();const nb=D.map(d=>[Math.hypot(d[0][0]-p[0],d[0][1]-p[1]),d[1]]).sort((a,b)=>a[0]-b[0]).slice(0,3);ok+=((nb.reduce((s,d)=>s+d[1],0)>=2)?1:0)===t(p);}
    const a=Math.round(ok/2); e.querySelector('.o').textContent=a+'%'; e.querySelector('.bar').style.width=a+'%';
    st.hist.unshift([n,r.value+'%',a+'%']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2?(parseInt(v)>=85?'g':parseInt(v)<70?'r':''):''); if(window.FX) FX.play('ding');};
  return e;
}
};

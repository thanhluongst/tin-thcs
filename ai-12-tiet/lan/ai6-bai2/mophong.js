/* Mô phỏng Bài 2 lớp 6 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
check(){
  const Q=[['Thủ đô Việt Nam là Hà Nội.',1,'Đúng – SGK Lịch sử và Địa lí 6.'],['Nước sôi ở 50°C.',0,'Sai – nước sôi ở 100°C (áp suất thường).'],['Trái Đất quay quanh Mặt Trời.',1,'Đúng – SGK KHTN 6.'],['Con nhện có 6 chân.',0,'Sai – nhện có 8 chân.'],['1 giờ có 60 phút.',1,'Đúng.'],['Lá cây có màu xanh vì chứa nhiều muối.',0,'Sai – lá xanh vì có diệp lục (SGK KHTN 6).']];
  const st={c:{},hist:[]};
  const e=_el(_shell('Kiểm chứng trợ lí ảo (giả lập)',
   'Với mỗi câu, chọn <b>✔ Tin</b> hoặc <b>✖ Nghi ngờ</b>, rồi bấm <b>📖 Tra SGK</b>. Đếm xem em phát hiện được mấy câu sai.',
   `<div class="ds"></div><p class="msg" style="font-weight:700"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Câu</th><th>Em đoán</th><th>Tra SGK</th></tr><tr class="empty"><td colspan="4">Chưa tra câu nào.</td></tr></table>`));
  e.querySelector('.ds').innerHTML=Q.map((q,i)=>`<div style="padding:10px;border:1px solid #cbd5e1;border-radius:12px;margin:6px 0"><b>🤖 ${q[0]}</b><div style="margin-top:6px">${_seg('q'+i,[['1','✔ Tin'],['0','✖ Nghi ngờ']],'')} <button type="button" class="btn" data-i="${i}">📖 Tra SGK</button></div><div class="kq"></div></div>`).join('');
  _wireSeg(e,(n,v)=>{st.c[n.slice(1)]=+v;});
  e.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,q=Q[i],g=st.c[i];
    b.parentNode.nextElementSibling.innerHTML=`<p style="margin:6px 0 0;color:${q[1]?'#166534':'#991b1b'}">📖 ${q[2]} ${g===undefined?'':g===q[1]?'– Em đoán đúng!':'– Em đoán chưa đúng.'}</p>`;
    st.hist.unshift(['Câu '+(i+1),g===undefined?'(chưa đoán)':g?'Tin':'Nghi ngờ',q[1]?'Đúng':'Sai']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2?(v==='Sai'?'r':'g'):'');
    const sai=Q.filter((x,k)=>!x[1]&&st.c[k]===0).length; e.querySelector('.msg').textContent=`Em đã nghi ngờ đúng ${sai}/3 câu AI trả lời sai.`; if(window.FX) FX.play('ding');});
  return e;
},
doctor(){
  const st={s:{},hist:[]};
  const e=_el(_shell('Bác sĩ và AI gợi ý (giả lập)',
   'Chọn triệu chứng, bấm <b>▶ AI gợi ý</b>. Sau đó em đóng vai bác sĩ: <b>đồng ý và khám thêm</b> hoặc <b>chưa đồng ý, cho xét nghiệm</b>.',
   `<div class="sim-ctl">${[['sot','🌡 Sốt'],['ho','😷 Ho'],['ngua','🔴 Phát ban']].map(([k,t])=>`<div><label>${t}</label>${_seg(k,[['1','Có'],['0','Không']],'0')}</div>`).join('')}
    <div style="align-self:end"><button type="button" class="btn acc run">▶ AI gợi ý</button></div></div><div class="o"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Triệu chứng</th><th>AI gợi ý</th><th>Bác sĩ quyết định</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st.s[n]=v==='1';});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const s=st.s;
    const g=s.ngua?['Dị ứng',s.sot||s.ho?55:80]:s.ho?['Cảm cúm',s.sot?85:60]:s.sot?['Sốt do virus',50]:['Chưa đủ dữ liệu',10];
    const tc=[s.sot&&'sốt',s.ho&&'ho',s.ngua&&'phát ban'].filter(Boolean).join(', ')||'—';
    const o=e.querySelector('.o'); o.innerHTML=`<p>🤖 AI gợi ý: <b>${g[0]}</b> – độ tin cậy ${g[1]}%</p><div style="height:12px;background:#e5e7eb;border-radius:9px;overflow:hidden;max-width:360px"><i style="display:block;height:100%;width:${g[1]}%;background:#2563eb"></i></div>
      <p>👩‍⚕️ Bác sĩ: <button type="button" class="btn d1">Đồng ý, khám thêm</button> <button type="button" class="btn d2">Chưa đồng ý, cho xét nghiệm</button></p><p class="d" style="font-weight:700"></p>`;
    o.querySelectorAll('.d1,.d2').forEach(b=>b.onclick=()=>{o.querySelector('.d').textContent='✅ Bác sĩ đã xem xét và QUYẾT ĐỊNH. AI chỉ gợi ý.';
      st.hist.unshift([tc,g[0]+' ('+g[1]+'%)',b.textContent]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,()=>''); if(window.FX) FX.play('ding');});};
  return e;
}
};

/* Mô phỏng Bài 7 lớp 8 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
/* Máy soi vấn đề */
fit(){
  const P={den:['💡 Bật tắt đèn lớp theo giờ',{nc:1,dl:1,ai:0,tot:0,rr:1}],la:['🍃 Nhận dạng lá sâu bệnh',{nc:1,dl:1,ai:1,tot:1,rr:1}],van:['📝 AI viết hộ bài văn',{nc:0,dl:1,ai:1,tot:0,rr:0}],cam:['📷 Chấm hạnh kiểm qua camera',{nc:0,dl:0,ai:0,tot:0,rr:0}],dich:['🌐 Dịch biển chỉ dẫn cho khách',{nc:1,dl:1,ai:1,tot:1,rr:1}]};
  const Q=[['nc','Có nhu cầu thật, ai cần?'],['dl','Có dữ liệu phù hợp, an toàn?'],['ai','AI có khả năng làm việc này?'],['tot','Lợi ích rõ hơn giải pháp đơn giản?'],['rr','Rủi ro kiểm soát được?']];
  const st={p:'den',a:{},hist:[]};
  const e=_el(_shell('Máy soi vấn đề',
   'Chọn vấn đề, trả lời 5 câu hỏi xem xét (Có/Không), bấm <b>▶ Soi</b>. Máy so câu trả lời của em với phân tích mẫu. Soi ít nhất 3 vấn đề.',
   `<div class="sim-ctl"><div><label>Vấn đề</label>${_seg('p',Object.keys(P).map(k=>[k,P[k][0]]),'den')}</div></div>
    <div class="qq" style="display:grid;gap:6px;max-width:560px">${Q.map(([k,t])=>`<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span>${t}</span>${_seg(k,[['1','Có'],['0','Không']],'')}</div>`).join('')}</div>
    <div style="margin:8px 0"><button type="button" class="btn acc run">▶ Soi</button></div><div class="out"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Vấn đề</th><th>Em trả lời khớp mẫu</th><th>Kết luận</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{if(n==='p'){st.p=v;st.a={};e.querySelectorAll('.qq .sseg button').forEach(b=>b.classList.remove('on'));e.querySelector('.out').innerHTML='';}else st.a[n]=+v;});
  e.querySelector('.run').onclick=()=>{ const M=P[st.p][1];
    if(Q.some(([k])=>st.a[k]===undefined)){e.querySelector('.out').innerHTML='<p class="hint">Trả lời đủ 5 câu trước nhé.</p>';return;}
    if(window.FX) FX.play('whoosh'); const khop=Q.filter(([k])=>st.a[k]===M[k]).length, all=Q.every(([k])=>M[k]);
    const kl=all?'✅ Đáng xem xét dùng AI':!M.ai||!M.tot?(M.nc?'➖ Giải pháp đơn giản là đủ':'⛔ Không nên dùng AI'):'⛔ Không nên dùng AI';
    e.querySelector('.out').innerHTML=`<table class="tbl" style="max-width:560px"><tr><th>Câu hỏi</th><th>Em</th><th>Mẫu</th></tr>${Q.map(([k,t])=>`<tr><td>${t}</td><td>${st.a[k]?'Có':'Không'}</td><td class="${st.a[k]===M[k]?'g':'r'}">${M[k]?'Có':'Không'}</td></tr>`).join('')}</table><p style="font-weight:700;font-size:18px">${kl}</p>`;
    st.hist.unshift([P[st.p][0],khop+'/5',kl]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v==='5/5'?'g':''):'');
    if(window.FX) FX.play('ding');};
  return e;
}
};

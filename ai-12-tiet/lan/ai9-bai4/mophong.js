/* Mô phỏng Bài 4 lớp 9 – số liệu giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
voice(){
  const G=['🏙 HS thành phố','🌾 HS vùng khác','👴 Ông bà','👩 Phụ huynh'];
  const P={de:['Dữ liệu dễ lấy nhất (chỉ HS thành phố)',[1000,0,0,0]],lech:['Chủ yếu thành phố, ít nhóm khác',[700,150,50,100]],deu:['Đủ các nhóm, chia đều',[250,250,250,250]]};
  const st={p:'de',hist:[]};
  const e=_el(_shell('Huấn luyện trợ lí giọng nói',
   'Chọn cách thu 1 000 mẫu giọng nói, bấm <b>▶ Huấn luyện & kiểm thử theo nhóm</b>. So sánh độ chính xác từng nhóm và chênh lệch.',
   `<div class="sim-ctl"><div><label>Cách thu thập</label>${_seg('p',Object.keys(P).map(k=>[k,P[k][0]]),'de')}</div></div>
    <button type="button" class="btn acc run">▶ Huấn luyện & kiểm thử theo nhóm</button><div class="o" style="max-width:520px;margin-top:8px"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Cách thu</th><th>Thấp nhất</th><th>Chênh lệch</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st[n]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const m=P[st.p][1];
    const acc=m.map((n,i)=>Math.round(Math.min(97,(i===0?62:48)+Math.sqrt(n)*1.15+(Math.random()-.5)*3)));
    const lo=Math.min(...acc), gap=Math.max(...acc)-lo;
    e.querySelector('.o').innerHTML=G.map((g,i)=>`<div style="margin:6px 0"><div style="display:flex;justify-content:space-between;font-weight:600"><span>${g} <small class="hint">(${m[i]} mẫu)</small></span><span>${acc[i]}%</span></div><div style="height:14px;background:#e5e7eb;border-radius:99px;overflow:hidden"><i style="display:block;height:100%;width:${acc[i]}%;background:${acc[i]<75?'#dc2626':'#16a34a'}"></i></div></div>`).join('')+
      `<p style="font-weight:700">${gap>20?'⚠ Chênh lệch lớn – nhóm bị bỏ sót bị phục vụ kém: AI không công bằng.':'✅ Các nhóm được phục vụ gần như nhau.'}</p>`;
    st.hist.unshift([P[st.p][0],lo+'%',gap+'%']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2?(parseInt(v)>20?'r':'g'):''); if(window.FX) FX.play('ding');};
  return e;
}
};

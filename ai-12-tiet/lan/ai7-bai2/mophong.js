/* Mô phỏng Bài 2 lớp 7 – đất nước X giả định, số liệu minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
law(){
  const L={cam:['🚫 Cấm công cụ chuyên để lừa đảo',.45],nhan:['🏷 Gắn nhãn "do AI tạo", báo đang dùng AI',.25],tn:['⚖️ Bên làm ra phải chịu trách nhiệm',.2],dongy:['✋ Phải được người bị giả giọng đồng ý',.2]};
  const st={on:{},hist:[]};
  const e=_el(_shell('30 ngày ở đất nước X',
   'Bật các quy định, bấm <b>▶ Chạy 30 ngày</b>. Đường đỏ là tổng số người bị lừa bằng giọng giả. Thử: không quy định nào → bật từng quy định → bật tất cả.',
   `<div class="sim-ctl">${Object.keys(L).map(k=>`<div><label>${L[k][0]}</label>${_seg(k,[['1','Có'],['0','Không']],'0')}</div>`).join('')}</div>
    <button type="button" class="btn acc run">▶ Chạy 30 ngày</button>
    <svg viewBox="0 0 440 190" class="sim-svg" style="max-width:480px"><line x1="40" y1="170" x2="430" y2="170" stroke="#94a3b8"/><line x1="40" y1="10" x2="40" y2="170" stroke="#94a3b8"/><text x="235" y="188" font-size="11" text-anchor="middle" fill="#64748b">Ngày 1 → 30</text><polyline class="ln" fill="none" stroke="#dc2626" stroke-width="3"/></svg>
    <p class="msg" style="font-weight:700"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số quy định</th><th>Người bị hại sau 30 ngày</th></tr><tr class="empty"><td colspan="3">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st.on[n]=v==='1';});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); let g=1; Object.keys(L).forEach(k=>{if(st.on[k]) g*=1-L[k][1];});
    let tot=0,user=5; const P=[];
    for(let d=1;d<=30;d++){user*=1+0.12*g; tot+=user*0.6*g; P.push((40+d*13)+','+(170-Math.min(155,tot/12)));}
    e.querySelector('.ln').setAttribute('points',P.join(' ')); const n=Object.values(st.on).filter(Boolean).length, T=Math.round(tot);
    e.querySelector('.msg').textContent=`Sau 30 ngày: khoảng ${T} người bị lừa. `+(n===0?'Không có luật: công cụ lan tự do, không ai chịu trách nhiệm.':n===4?'Đủ quy định: hậu quả được chặn sớm.':'Mỗi quy định chặn bớt một phần.');
    st.hist.unshift([n+'/4',T]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v>500?'r':v<100?'g':''):''); if(window.FX) FX.play('ding');};
  return e;
}
};

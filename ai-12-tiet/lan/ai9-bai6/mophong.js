/* Mô phỏng Bài 6 lớp 9 – bộ dữ liệu giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
clean(){
  const F={bs:['➕ Bổ sung ảnh kim loại (thiếu)',14],trung:['🧹 Loại 40 ảnh trùng lặp',6],nhan:['🏷 Gán nhãn lại 25 ảnh sai nhãn',12],mo:['🗑 Loại 30 ảnh mờ',5],bat:['📥 Thêm 200 ảnh bất kì (không kiểm)',-2]};
  const st={on:{},hist:[]};
  const e=_el(_shell('Bàn làm sạch dữ liệu',
   'Bộ dữ liệu ban đầu: nhựa 300 · giấy 250 · <b>kim loại 20</b> · 40 ảnh trùng · 25 ảnh sai nhãn · 30 ảnh mờ. Bật các cách cải thiện, bấm <b>▶ Huấn luyện lại & kiểm thử</b>.',
   `<div class="sim-ctl">${Object.keys(F).map(k=>`<div><label>${F[k][0]}</label>${_seg(k,[['1','Có'],['0','Không']],'0')}</div>`).join('')}</div>
    <button type="button" class="btn acc run">▶ Huấn luyện lại & kiểm thử</button>
    <p>Độ chính xác trên 100 ảnh mới: <b class="o" style="font-size:22px">–</b></p><div style="height:14px;background:#e5e7eb;border-radius:9px;overflow:hidden;max-width:420px"><i class="bar" style="display:block;height:100%;width:0;background:#2563eb;transition:width .6s"></i></div>
    <p class="kl" style="font-weight:700"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Cách đã dùng</th><th>Chính xác</th></tr><tr class="empty"><td colspan="3">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st.on[n]=v==='1';});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); let a=60; const used=Object.keys(F).filter(k=>st.on[k]); used.forEach(k=>a+=F[k][1]); a=Math.round(Math.min(97,a+(Math.random()-.5)*3));
    e.querySelector('.o').textContent=a+'%'; e.querySelector('.bar').style.width=a+'%';
    e.querySelector('.kl').textContent=st.on.bat&&used.length===1?'Thêm ảnh bất kì không giúp – còn đưa thêm lỗi.':a>=90?'✅ Dữ liệu đã được làm sạch, mô hình tốt hơn rõ rệt.':'Thử kết hợp thêm cách khác.';
    st.hist.unshift([used.map(k=>F[k][0].split(' ')[0]).join(' ')||'(chưa làm gì)',a+'%']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(parseInt(v)>=90?'g':parseInt(v)<70?'r':''):''); if(window.FX) FX.play('ding');};
  return e;
}
};

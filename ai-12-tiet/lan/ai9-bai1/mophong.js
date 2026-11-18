/* Mô phỏng Bài 1 lớp 9 – hồ sơ giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
hire(){
  const H=[...Array(12)].map((_,i)=>({id:'HS'+String(i+1).padStart(2,'0'),kn:6+((i*7)%5)/2,nu:i%2===1}));
  const st={lech:'80',hist:[]};
  const e=_el(_shell('Công cụ chấm hồ sơ học từ dữ liệu cũ',
   'Chọn <b>tỉ lệ nam trong dữ liệu tuyển dụng cũ</b>, bấm <b>▶ Huấn luyện & chấm 12 hồ sơ</b> (kinh nghiệm gần như nhau; hồ sơ nữ có dòng "đội bóng nữ"). Công cụ chọn 6 hồ sơ cao nhất.',
   `<div class="sim-ctl"><div><label>Tỉ lệ nam trong dữ liệu cũ</label>${_seg('lech',[['50','50%'],['80','80%'],['95','95%']],'80')}</div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Huấn luyện & chấm 12 hồ sơ</button></div></div><div class="o"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Nam trong dữ liệu cũ</th><th>Nữ được chọn /6</th><th>Nam được chọn /6</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st[n]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const pen=(+st.lech-50)/45*2.2;
    const sc=H.map(h=>({...h,d:+(h.kn+(Math.random()-.5)*.4-(h.nu?pen:0)).toFixed(1)})).sort((a,b)=>b.d-a.d); const top=sc.slice(0,6), nu=top.filter(h=>h.nu).length;
    e.querySelector('.o').innerHTML='<table class="tbl" style="max-width:600px"><tr><th>Hồ sơ</th><th>Kinh nghiệm (năm)</th><th>Ghi chú</th><th>Điểm AI</th><th>Kết quả</th></tr>'+sc.map(h=>`<tr><td>${h.id}</td><td>${h.kn}</td><td>${h.nu?'"đội bóng nữ"':''}</td><td>${h.d}</td><td class="${top.includes(h)?'g':''}">${top.includes(h)?'✔ Chọn':''}</td></tr>`).join('')+'</table>'+
      `<p style="font-weight:700">${nu<=1?'⚠ Kinh nghiệm như nhau nhưng hồ sơ nữ bị đẩy xuống – AI học lại thành kiến từ dữ liệu cũ và áp cho mọi hồ sơ.':nu>=3?'Dữ liệu cân bằng hơn → kết quả công bằng hơn.':'Có dấu hiệu lệch – cần xem kết quả theo nhóm.'}</p>`;
    st.hist.unshift([st.lech+'%',nu,6-nu]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v<=1?'r':v>=3?'g':''):''); if(window.FX) FX.play('ding');};
  return e;
}
};

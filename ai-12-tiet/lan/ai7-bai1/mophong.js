/* Mô phỏng Bài 1 lớp 7 – học sinh, số liệu giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
scholar(){
  /* [tên, điểm, buổi vắng, hoàn cảnh (AI không biết), xứng đáng thật] */
  const H=[['An',9.1,1,'',1],['Bình',8.9,0,'',1],['Chi',8.7,9,'Nghỉ để chăm mẹ ốm, có giấy xác nhận',1],['Dũng',8.6,0,'',1],['Hà',8.5,2,'',1],['Khoa',0,0,'Mới chuyển trường, chưa có điểm học kì trước (thực tế 8.8)',1],['Lan',8.3,1,'',0],['Minh',8.2,0,'',0],['Nga',8.0,3,'',0],['Phúc',7.9,0,'',0]];
  const st={kt:'0',hist:[]};
  const e=_el(_shell('Xét học bổng: AI xếp hạng, ai quyết định?',
   'AI chấm theo công thức <b>điểm − 0,2 × số buổi vắng</b> và chọn 5 bạn cao nhất. Chọn có hay không có <b>con người kiểm tra</b>, bấm <b>▶ Xét</b>. Ô đỏ là bạn xứng đáng nhưng bị loại.',
   `<div class="sim-ctl"><div><label>Con người kiểm tra trước khi công bố?</label>${_seg('kt',[['0','Không – AI quyết định luôn'],['1','Có – thầy cô xem hoàn cảnh']],'0')}</div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Xét</button></div></div><div class="o"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Con người kiểm tra</th><th>Bị loại oan</th><th>Có người giải thích?</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st[n]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const kt=st.kt==='1';
    const sc=H.map(h=>[h,kt&&h[3]?(h[0]==='Khoa'?8.8:h[1]):h[1]-0.2*h[2]]).sort((a,b)=>b[1]-a[1]); const chon=sc.slice(0,5).map(x=>x[0][0]);
    const oan=H.filter(h=>h[4]&&!chon.includes(h[0]));
    e.querySelector('.o').innerHTML='<table class="tbl" style="max-width:640px"><tr><th>Bạn</th><th>Điểm AI tính</th><th>Hoàn cảnh</th><th>Kết quả</th></tr>'+sc.map(([h,s])=>`<tr><td>${h[0]}</td><td>${s.toFixed(1)}</td><td>${kt&&h[3]?'👀 '+h[3]:'<span class="hint">AI không biết</span>'}</td><td class="${chon.includes(h[0])?'g':h[4]?'r':''}">${chon.includes(h[0])?'✔ Được chọn':h[4]?'✖ Bị loại oan':'–'}</td></tr>`).join('')+'</table>'+
      `<p style="font-weight:700">${oan.length?'⚠ '+oan.map(h=>h[0]).join(', ')+' bị loại oan – và không ai giải thích vì "máy quyết định".':'✅ Con người xem hoàn cảnh, danh sách công bằng hơn; có người chịu trách nhiệm.'}</p>`;
    st.hist.unshift([kt?'Có':'Không',oan.length,kt?'Có':'Không']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v?'r':'g'):''); if(window.FX) FX.play('ding');};
  return e;
}
};

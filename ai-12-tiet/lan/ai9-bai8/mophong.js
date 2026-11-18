/* Mô phỏng Bài 8 lớp 9 – mô hình giả lập. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
test(){
  const P={nhua:.92,giay:.88,kl:.3};   /* độ chính xác thật trên ảnh mới */
  const st={d:'cu',n:'10',hist:[]};
  const e=_el(_shell('Phòng kiểm thử mô hình nhận dạng rác',
   'Chọn <b>dữ liệu kiểm thử</b> và <b>số ảnh</b>, bấm <b>▶ Chạy kiểm tra</b>. Bảng hiện số đúng/sai theo từng loại. So sánh ảnh cũ (đã huấn luyện) với ảnh mới, ít ảnh với nhiều ảnh.',
   `<div class="sim-ctl"><div><label>Dữ liệu kiểm thử</label>${_seg('d',[['cu','Ảnh đã dùng khi huấn luyện'],['moi','Ảnh mới, đủ 3 loại']],'cu')}</div>
    <div><label>Số ảnh mỗi loại</label>${_seg('n',[['3','3'],['10','10'],['30','30']],'10')}</div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Chạy kiểm tra</button></div></div><div class="o"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Dữ liệu</th><th>Số ảnh/loại</th><th>Tỉ lệ đúng chung</th><th>Kim loại</th></tr><tr class="empty"><td colspan="5">Chưa có.</td></tr></table>`));
  _wireSeg(e,(k,v)=>{st[k]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const n=+st.n, cu=st.d==='cu', L={nhua:'🧴 Nhựa',giay:'📄 Giấy',kl:'🥫 Kim loại'};
    const R=Object.keys(P).map(k=>{const p=cu?(k==='kl'?.9:.98):P[k];let d=0;for(let i=0;i<n;i++)if(Math.random()<p)d++;return [k,d];});
    const tong=R.reduce((t,r)=>t+r[1],0), pc=Math.round(tong/(3*n)*100), kl=R.find(r=>r[0]==='kl')[1];
    e.querySelector('.o').innerHTML='<table class="tbl" style="max-width:420px"><tr><th>Loại</th><th>Đúng</th><th>Sai</th><th>Tỉ lệ</th></tr>'+R.map(([k,d])=>`<tr><td>${L[k]}</td><td>${d}</td><td>${n-d}</td><td class="${d/n<.7?'r':'g'}">${Math.round(d/n*100)}%</td></tr>`).join('')+`</table><p style="font-weight:700">${cu?'⚠ Thử bằng ảnh đã học: kết quả "đẹp" nhưng không cho biết mô hình gặp ảnh mới ra sao.':kl/n<.6?'🔎 Ảnh mới cho thấy điểm yếu thật: kim loại nhận sai nhiều.':''}${n<10?' Thử quá ít ảnh – kết quả dễ do may rủi.':''}</p>`;
    st.hist.unshift([cu?'Ảnh cũ':'Ảnh mới',n,pc+'%',kl+'/'+n]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,()=>''); if(window.FX) FX.play('ding');};
  return e;
}
};

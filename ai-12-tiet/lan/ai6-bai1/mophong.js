/* Mô phỏng Bài 1 lớp 6 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
robot(){
  const FR=[['🍎','đỏ','tròn'],['🍓','đỏ','nhọn'],['🍋','vàng','bầu'],['🍌','vàng','dài'],['🍅','đỏ','tròn'],['🍐','xanh','bầu'],['🍊','cam','tròn']];
  const R={'':'(chưa có quy tắc)','1|đỏ':'Màu ĐỎ → rổ A','1|vàng':'Màu VÀNG → rổ A','2|tròn':'Hình TRÒN → rổ A'};
  const st={r:'',hist:[]};
  const e=_el(_shell('Robot phân loại quả',
   'Chọn <b>quy tắc</b> cho robot rồi bấm <b>▶ Chạy robot</b>. Thử cả khi <b>chưa có quy tắc</b> và ít nhất 3 quy tắc khác nhau.',
   `<div class="sim-ctl"><div><label>Quy tắc con người đặt</label>${_seg('r',Object.keys(R).map(k=>[k,R[k]]),'')}</div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Chạy robot</button></div></div>
    <div class="two" style="gap:12px"><div style="padding:10px;border-radius:12px;background:#dcfce7"><b>🧺 Rổ A</b><div class="a" style="font-size:34px;min-height:44px"></div></div><div style="padding:10px;border-radius:12px;background:#e0e7ff"><b>🧺 Rổ B</b><div class="b" style="font-size:34px;min-height:44px"></div></div></div>
    <p class="msg" style="font-weight:700;font-size:17px"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Quy tắc</th><th>Rổ A</th><th>Rổ B</th></tr><tr class="empty"><td colspan="4">Chưa chạy.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st[n]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const A=[],B=[];
    if(!st.r){e.querySelector('.a').textContent='';e.querySelector('.b').textContent='';e.querySelector('.msg').textContent='🤖 "Tôi không biết phải làm gì… Hãy cho tôi quy tắc!"';st.hist.unshift(['(không có)','—','—']);}
    else{const [k,x]=st.r.split('|');FR.forEach(f=>(f[k]===x?A:B).push(f[0]));e.querySelector('.a').textContent=A.join(' ');e.querySelector('.b').textContent=B.join(' ');
      e.querySelector('.msg').textContent='🤖 Tôi làm ĐÚNG theo quy tắc con người đặt.'+(A.includes('🍅')?' (Cà chua vào rổ A – con người cần kiểm tra lại!)':'');st.hist.unshift([R[st.r],A.join(''),B.join('')]);}
    st.hist=st.hist.slice(0,6); histTable(e,st.hist,()=>''); if(window.FX) FX.play('ding');};
  return e;
}
};

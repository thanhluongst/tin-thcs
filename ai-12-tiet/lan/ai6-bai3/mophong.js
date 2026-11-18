/* Mô phỏng Bài 3 lớp 6 – ảnh, ứng dụng đều giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
photo(){
  const H=[[18,22,'🏫 Biển tên trường'],[72,25,'🏠 Số nhà 25'],[47,58,'👕 Phù hiệu lớp 6A'],[84,70,'📍 Vị trí gắn trong ảnh'],[24,74,'🙂 Khuôn mặt bạn khác']];
  const st={f:0,n:0,hist:[]};
  const e=_el(_shell('Soi bức ảnh (giả định)',
   'Bấm vào những chỗ trong ảnh em nghĩ <b>làm lộ thông tin cá nhân</b>. Có 5 chỗ. Bấm <b>↺</b> để soi lại.',
   `<div class="anh" style="position:relative;height:240px;border-radius:12px;background:linear-gradient(#bfe3ff 55%,#9bd28f 55%);font-size:44px;user-select:none;cursor:crosshair">
     <span style="position:absolute;left:12%;top:8%">🏫</span><span style="position:absolute;left:66%;top:12%">🏠</span><span style="position:absolute;left:42%;top:42%">🧒</span><span style="position:absolute;left:19%;top:60%">🧑</span><span style="position:absolute;left:79%;top:58%">📱</span>
     <span style="position:absolute;left:2%;top:2%;font-size:12px">Ảnh giả định</span></div>
    <div class="chips" style="display:flex;flex-wrap:wrap;gap:6px;margin:8px 0"></div><b class="msg"></b> <button type="button" class="btn rs">↺</button>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số lần bấm</th><th>Tìm được</th></tr><tr class="empty"><td colspan="3">Chưa có.</td></tr></table>`));
  const A=e.querySelector('.anh');
  A.onclick=ev=>{const r=A.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width*100,y=(ev.clientY-r.top)/r.height*100; st.n++;
    H.forEach(h=>{if(!h.f&&Math.hypot(h[0]-x,h[1]-y)<14){h.f=1;st.f++;e.querySelector('.chips').insertAdjacentHTML('beforeend',`<span class="chip" style="background:#fee2e2">${h[2]}</span>`);if(window.FX)FX.play('ding');}});
    e.querySelector('.msg').textContent=`Tìm được ${st.f}/5 chi tiết lộ thông tin.`};
  e.querySelector('.rs').onclick=()=>{st.hist.unshift([st.n,st.f+'/5']);st.hist=st.hist.slice(0,6);histTable(e,st.hist,(v,j)=>j===1?(v==='5/5'?'g':''):'');
    H.forEach(h=>h.f=0);st.f=0;st.n=0;e.querySelector('.chips').innerHTML='';e.querySelector('.msg').textContent='';};
  return e;
},
app(){
  const Q={ai:['Ai làm ra ứng dụng?','Công ty lạ, không có địa chỉ liên hệ'],dl:['Ứng dụng lấy dữ liệu gì?','Đòi ảnh khuôn mặt, danh bạ, vị trí'],md:['Lấy để làm gì?','Không nói rõ; có dòng "chia sẻ cho đối tác"'],tuoi:['Giới hạn độ tuổi?','Từ 16 tuổi trở lên'],bm:['Bố mẹ có đồng ý?','Bố mẹ chưa biết']};
  const st={on:{},hist:[]};
  const e=_el(_shell('Kiểm tra ứng dụng "Đổi ảnh vui" (giả định)',
   'Bấm từng câu hỏi để xem câu trả lời. Hỏi càng đủ, em càng biết rõ. Rồi bấm <b>▶ Quyết định</b>.',
   `<div class="qs" style="display:grid;gap:6px;max-width:560px">${Object.keys(Q).map(k=>`<button type="button" class="btn" data-k="${k}" style="text-align:left">❓ ${Q[k][0]}</button><div class="a-${k}" style="padding-left:12px;color:#991b1b"></div>`).join('')}</div>
    <div style="margin:8px 0"><button type="button" class="btn acc run">▶ Quyết định</button></div><p class="msg" style="font-weight:700;font-size:17px"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số câu đã hỏi</th><th>Quyết định gợi ý</th></tr><tr class="empty"><td colspan="3">Chưa có.</td></tr></table>`));
  e.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;st.on[k]=1;e.querySelector('.a-'+k).textContent='→ '+Q[k][1];if(window.FX)FX.play('tick');});
  e.querySelector('.run').onclick=()=>{const n=Object.keys(st.on).length;
    const d=n<2?'🟡 Chưa đủ thông tin – hỏi thêm trước khi quyết định!':'🔴 Không cài: ứng dụng lấy nhiều dữ liệu, không rõ mục đích, chưa đủ tuổi, bố mẹ chưa đồng ý.';
    e.querySelector('.msg').textContent=d; st.hist.unshift([n+'/5',d.slice(0,2)]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,()=>''); if(window.FX) FX.play('ding');};
  return e;
}
};

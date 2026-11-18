/* Mô phỏng Bài 7 lớp 9 – đầu ra AI giả lập. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
cocreate(){
  const R={chung:['"Làm trang giới thiệu câu lạc bộ"','Trang chung chung về "đọc sách tốt cho sức khoẻ", không có tên CLB, ghi sai lịch "thứ Hai" (CLB họp thứ Năm), có ảnh lấy trên mạng không rõ nguồn.',[0,0,0]],
    vua:['"Trang giới thiệu CLB đọc sách lớp 9A, họp thứ Năm"','Có tên CLB và lịch đúng, nhưng thiếu cách tham gia, có một số sách gợi ý không có trong thư viện.',[1,1,0]],
    ro:['"Trang giới thiệu CLB đọc sách 9A cho học sinh khối 8–9: lịch họp thứ Năm 16h tại thư viện, 3 hoạt động, cách đăng kí; giọng vui, ngắn gọn"','Đúng mục tiêu, đủ lịch, hoạt động, cách đăng kí; còn 1 câu khen quá lời cần sửa.',[1,1,1]]};
  const st={yc:'chung',kt:'0',hist:[]};
  const e=_el(_shell('Xưởng đồng sáng tạo',
   'Chọn <b>mức độ rõ của yêu cầu</b> và <b>có kiểm chứng không</b>, bấm <b>▶ AI tạo bản nháp</b>. Rồi em quyết định <b>Giữ</b> hay <b>Sửa</b>.',
   `<div class="sim-ctl"><div><label>Yêu cầu nhóm đưa cho AI</label>${_seg('yc',[['chung','Chung chung'],['vua','Vừa'],['ro','Rõ ràng, đủ ý']],'chung')}</div>
    <div><label>Nhóm kiểm chứng với thông tin thật?</label>${_seg('kt',[['0','Không'],['1','Có']],'0')}</div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ AI tạo bản nháp</button></div></div>
    <div class="o"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Yêu cầu</th><th>Kiểm chứng</th><th>Quyết định</th><th>Chất lượng cuối</th></tr><tr class="empty"><td colspan="5">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st[n]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const r=R[st.yc], kt=st.kt==='1';
    const o=e.querySelector('.o'); o.innerHTML=`<p><b>Yêu cầu:</b> ${r[0]}</p><p style="padding:8px 12px;background:#eef2ff;border-radius:10px">🤖 <b>Bản nháp:</b> ${r[1]}</p>${kt?'<p>🔍 Nhóm đã đối chiếu lịch, danh mục sách thư viện: phát hiện các chỗ cần sửa.</p>':'<p class="hint">Nhóm chưa kiểm chứng.</p>'}
      <button type="button" class="btn giu">✔ Giữ nguyên</button> <button type="button" class="btn sua">✏️ Sửa rồi dùng</button><p class="kq" style="font-weight:700"></p>`;
    o.querySelectorAll('.giu,.sua').forEach(b=>b.onclick=()=>{const sua=b.classList.contains('sua'); let q=r[2].filter(Boolean).length*25+(kt&&sua?25:0)-(!kt&&!sua?10:0); q=Math.max(5,Math.min(100,q));
      o.querySelector('.kq').textContent=`Chất lượng trang cuối: ${q}/100. `+(q>=90?'Yêu cầu rõ + kiểm chứng + sửa = sản phẩm tốt.':kt?'':'Chưa kiểm chứng nên lỗi vẫn còn.');
      st.hist.unshift([{chung:'Chung chung',vua:'Vừa',ro:'Rõ ràng'}[st.yc],kt?'Có':'Không',sua?'Sửa':'Giữ',q]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===3?(v>=90?'g':v<50?'r':''):''); if(window.FX) FX.play('ding');});};
  return e;
}
};

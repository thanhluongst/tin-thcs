/* Mô phỏng Bài 2 lớp 9 – thông tin nghề nghiệp minh hoạ, giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
job(){
  const J={bs:['🩺 Bác sĩ',['Đọc ảnh X-quang tìm điểm bất thường','Sắp lịch khám'],['Trò chuyện, giải thích cho bệnh nhân','Quyết định phác đồ, chịu trách nhiệm'],['Đọc hiểu kết quả AI, kiểm chứng','Giao tiếp, thấu cảm']],
    gv:['👩‍🏫 Giáo viên',['Chấm trắc nghiệm, gợi ý bài luyện','Soạn nháp câu hỏi'],['Động viên, hiểu tâm lí học sinh','Đánh giá sự tiến bộ, quyết định cách dạy'],['Thiết kế bài học có AI','Kiểm tra nội dung AI tạo']],
    kt:['📊 Kế toán',['Nhập hoá đơn, đối chiếu sổ','Lập báo cáo nháp'],['Phân tích, tư vấn cho chủ doanh nghiệp','Phát hiện gian lận bất thường cần điều tra'],['Dùng phần mềm có AI','Kiểm tra số liệu, đạo đức nghề nghiệp']],
    tk:['🎨 Thiết kế đồ hoạ',['Tạo nhiều phương án nháp nhanh','Xoá phông, chỉnh màu'],['Hiểu khách hàng, ý tưởng riêng','Chọn phương án, chịu trách nhiệm bản quyền'],['Viết yêu cầu rõ cho AI','Thẩm mĩ, bản quyền']],
    nn:['🌾 Nông nghiệp',['Dự báo thời tiết, sâu bệnh từ ảnh','Tưới tự động theo độ ẩm'],['Quyết định mùa vụ, giống cây','Chăm sóc, xử lí tình huống ngoài đồng'],['Đọc dữ liệu cảm biến','Kiểm chứng cảnh báo của AI']]};
  const st={j:'bs',xem:{},hist:[]};
  const e=_el(_shell('Bản đồ nghề tương lai',
   'Chọn nghề, bấm <b>▶ Xem thay đổi</b>. Quan sát việc AI làm, việc con người giữ và kĩ năng cần trang bị. Xem ít nhất 3 nghề.',
   `<div class="sim-ctl"><div><label>Nghề</label>${_seg('j',Object.keys(J).map(k=>[k,J[k][0]]),'bs')}</div></div>
    <button type="button" class="btn acc run">▶ Xem thay đổi</button><div class="o" style="margin-top:8px"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Nghề</th><th>Kĩ năng cần trang bị</th></tr><tr class="empty"><td colspan="3">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st[n]=v;});
  const box=(t,a,c)=>`<div style="padding:10px;border-radius:12px;background:${c}"><b>${t}</b><ul style="margin:4px 0 0 18px;padding:0">${a.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
  e.querySelector('.run').onclick=()=>{ const j=J[st.j]; st.xem[st.j]=1;
    e.querySelector('.o').innerHTML=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px">${box('🤖 AI làm',j[1],'#e0e7ff')}${box('🧑 Con người giữ',j[2],'#dcfce7')}${box('🎒 Kĩ năng cần',j[3],'#fef3c7')}</div>`;
    st.hist.unshift([j[0],j[3].join('; ')]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,()=>''); if(window.FX) FX.play('ding');};
  return e;
}
};

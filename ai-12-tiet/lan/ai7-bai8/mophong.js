/* Mô phỏng Bài 8 lớp 7 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
plan(){
  const M=[['lm','1. Làm gì?','Chatbot giải đáp lịch thi',s=>s.length>=8],['ch','2. Cho ai?','Học sinh khối 6',s=>/học sinh|bạn|khối|lớp|thầy|cô|người/i.test(s)],
    ['ai','3. AI làm việc gì, dựa trên dữ liệu nào?','Trả lời câu hỏi dựa trên lịch thi nhà trường công bố',s=>/dựa|từ|theo/i.test(s)&&s.length>=15],
    ['dl','4. Dữ liệu lấy từ đâu, có được phép?','Lịch thi trên bảng tin, được thầy cô cho phép',s=>/từ|trên|của|phép|nhà trường/i.test(s)],
    ['ai2','5. Ai làm, khi nào?','An: nhập câu hỏi (tuần 1); Bình: thử (tuần 2)',s=>/tuần|ngày|tháng|\d/.test(s)],
    ['do','6. Đo thế nào là thành công?','Đúng ít nhất 8/10 câu hỏi thử; thầy cô đối chiếu',s=>/\d/.test(s)]];
  const st={hist:[]};
  const e=_el(_shell('Máy kiểm tra kế hoạch',
   'Điền 6 mục kế hoạch (bấm <b>Điền mẫu</b> để xem ví dụ rồi sửa). Bấm <b>▶ Kiểm tra</b>: máy chỉ ra mục còn thiếu, còn chung chung hoặc chưa đo được.',
   `<div style="display:grid;gap:6px;max-width:640px">${M.map(m=>`<label style="font-weight:600">${m[1]}<input type="text" data-m="${m[0]}" style="width:100%;font:inherit;padding:6px 10px;border:2px solid #cbd5e1;border-radius:10px"></label>`).join('')}</div>
    <div style="margin:8px 0"><button type="button" class="btn mau">Điền mẫu</button> <button type="button" class="btn acc run">▶ Kiểm tra</button></div><div class="o"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Mục đạt</th><th>Cần sửa</th></tr><tr class="empty"><td colspan="3">Chưa có.</td></tr></table>`));
  e.querySelector('.mau').onclick=()=>M.forEach(m=>e.querySelector(`[data-m="${m[0]}"]`).value=m[2]);
  e.querySelector('.run').onclick=()=>{const bad=M.filter(m=>!m[3](e.querySelector(`[data-m="${m[0]}"]`).value.trim()));
    e.querySelector('.o').innerHTML=`<p style="font-weight:700;font-size:17px">${bad.length?'✏️ Cần sửa: '+bad.map(m=>m[1]).join('; '):'✅ Kế hoạch đủ 6 mục, có tiêu chí đo được.'}</p>`;
    st.hist.unshift([(6-bad.length)+'/6',bad.length?bad.map(m=>m[1].split('.')[0]).join(', '):'—']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===0?(v==='6/6'?'g':'r'):''); if(window.FX) FX.play(bad.length?'ding':'win');};
  return e;
}
};

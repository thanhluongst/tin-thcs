/* Mô phỏng Bài 5 lớp 7 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
declare(){
  const Y=[['cc','Công cụ AI đã dùng',/chatbot|ai|công cụ|ứng dụng|trợ lí/i],['md','Mục đích (dùng để làm gì)',/để|gợi ý|tìm|kiểm tra|dàn ý|ý tưởng/i],['ph','Phần được AI hỗ trợ',/phần|dàn ý|mở bài|ý|đoạn/i],['kc','Đã kiểm chứng bằng cách nào',/sgk|sách|thầy|cô|nguồn|đối chiếu|kiểm/i],['tl','Phần em tự làm',/tự|em viết|em làm|nội dung|trình bày/i]];
  const st={hist:[]};
  const e=_el(_shell('Máy kiểm tra khai báo',
   'Viết khai báo cho bài thuyết trình của Vy vào từng ô (có thể để trống để xem máy báo thiếu), bấm <b>▶ Kiểm tra</b>.',
   `<div style="display:grid;gap:6px;max-width:620px">${Y.map(y=>`<label style="font-weight:600">${y[1]}<input type="text" data-y="${y[0]}" style="width:100%;font:inherit;padding:6px 10px;border:2px solid #cbd5e1;border-radius:10px"></label>`).join('')}</div>
    <div style="margin:8px 0"><button type="button" class="btn acc run">▶ Kiểm tra</button></div><div class="o"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số ý đạt</th><th>Còn thiếu</th></tr><tr class="empty"><td colspan="3">Chưa có.</td></tr></table>`));
  e.querySelector('.run').onclick=()=>{ const ok=[],thieu=[];
    Y.forEach(y=>{const v=e.querySelector(`[data-y="${y[0]}"]`).value.trim(); (v.length>=4&&y[2].test(v)?ok:thieu).push(y[1]);});
    e.querySelector('.o').innerHTML=`<p style="font-weight:700;font-size:17px">${thieu.length?'⚠ Còn thiếu hoặc chưa rõ: '+thieu.join('; '):'✅ Khai báo đủ 5 ý – cô đọc là hiểu em đã dùng AI thế nào.'}</p>`;
    st.hist.unshift([ok.length+'/5',thieu.length?thieu.length+' ý':'—']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===0?(v==='5/5'?'g':'r'):''); if(window.FX) FX.play(thieu.length?'ding':'win');};
  return e;
}
};

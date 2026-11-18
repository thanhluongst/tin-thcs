/* Mô phỏng Bài 4 lớp 7 – ứng dụng giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
rate(){
  const TC=['🔒 Riêng tư','⚖️ Công bằng','🔍 Minh bạch','✅ Chính xác, an toàn','🧑 Trách nhiệm'];
  const A=[['A – Chatbot học tiếng Anh','Chỉ cần tên đăng nhập; nói rõ là AI; có nút báo lỗi; giáo viên quản lí lớp.',[1,1,1,1,1]],
    ['B – Đoán tương lai qua khuôn mặt','Đòi ảnh mặt, danh bạ; "đoán" người da tối "kém may mắn"; không giải thích; không có thông tin công ty.',[0,0,0,0,0]],
    ['C – Chấm điểm bài văn tự động','Không lấy dữ liệu thừa; nói rõ chấm theo độ dài và từ khoá; bài ngắn hay vẫn bị điểm thấp; thầy cô xem lại điểm.',[1,0,1,0,1]]];
  const st={a:'0',v:{},hist:[]};
  const e=_el(_shell('Phiếu chấm ứng dụng AI',
   'Chọn ứng dụng, đọc mô tả, đánh giá 5 tiêu chí (Đạt / Chưa), bấm <b>▶ So với mẫu</b>.',
   `<div class="sim-ctl"><div><label>Ứng dụng</label>${_seg('a',A.map((x,i)=>[String(i),x[0]]),'0')}</div></div>
    <p class="mt" style="padding:8px 12px;background:#f1f5f9;border-radius:10px"></p>
    <div class="qq" style="display:grid;gap:6px;max-width:520px">${TC.map((t,i)=>`<div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span>${t}</span>${_seg('c'+i,[['1','Đạt'],['0','Chưa']],'')}</div>`).join('')}</div>
    <div style="margin:8px 0"><button type="button" class="btn acc run">▶ So với mẫu</button></div><div class="o"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Ứng dụng</th><th>Em đánh giá khớp mẫu</th><th>Mẫu: số tiêu chí đạt</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  const mt=()=>e.querySelector('.mt').textContent=A[+st.a][1]; mt();
  _wireSeg(e,(n,v)=>{if(n==='a'){st.a=v;st.v={};mt();e.querySelectorAll('.qq .sseg button').forEach(b=>b.classList.remove('on'));e.querySelector('.o').innerHTML='';}else st.v[n.slice(1)]=+v;});
  e.querySelector('.run').onclick=()=>{ const M=A[+st.a][2]; if(TC.some((t,i)=>st.v[i]===undefined)){e.querySelector('.o').innerHTML='<p class="hint">Đánh giá đủ 5 tiêu chí nhé.</p>';return;}
    const k=TC.filter((t,i)=>st.v[i]===M[i]).length;
    e.querySelector('.o').innerHTML='<table class="tbl" style="max-width:520px"><tr><th>Tiêu chí</th><th>Em</th><th>Mẫu</th></tr>'+TC.map((t,i)=>`<tr><td>${t}</td><td>${st.v[i]?'Đạt':'Chưa'}</td><td class="${st.v[i]===M[i]?'g':'r'}">${M[i]?'Đạt':'Chưa'}</td></tr>`).join('')+'</table>';
    st.hist.unshift([A[+st.a][0],k+'/5',M.filter(Boolean).length+'/5']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v==='5/5'?'g':''):''); if(window.FX) FX.play('ding');};
  return e;
}
};

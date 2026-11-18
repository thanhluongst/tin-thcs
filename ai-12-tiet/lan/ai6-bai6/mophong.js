/* Mô phỏng Bài 6 lớp 6 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
detect(){
  const D={tl:['🗣 Trợ lí ảo',['"Mai trời mưa không?" → "Mai 70% có mưa, bạn mang áo mưa nhé."','"Mở bài hát vui" → mở nhạc em hay nghe','"Nhắc mẹ uống thuốc 8 giờ" → đặt lời nhắc'],1],
    mt:['🧮 Máy tính bỏ túi',['2 + 3 → 5','2 + 3 → 5 (lần nào cũng vậy)','Hỏi "mai mưa không?" → không hiểu'],0],
    bd:['🗺 Bản đồ',['Giờ tan tầm → gợi ý đường vòng tránh tắc','Trời mưa → báo đoạn ngập','Nửa đêm → đường ngắn nhất'],1],
    qu:['🌀 Quạt hẹn giờ',['Hẹn 30 phút → tắt sau 30 phút','Trời nóng hay lạnh → vẫn tắt sau 30 phút','Không tự đổi'],0],
    dc:['📷 Ứng dụng dịch bằng camera',['Biển "EXIT" → "Lối ra"','Thực đơn tiếng Nhật → tiếng Việt','Chữ viết tay → nhận ra và dịch'],1]};
  const st={k:'tl',t:0,hist:[]};
  const e=_el(_shell('Máy dò AI',
   'Chọn công cụ, bấm <b>▶ Thử tình huống</b> 3 lần. Quan sát: công cụ có <b>nhận dạng, đoán, thay đổi theo tình huống</b> không? Rồi bấm <b>🔍 Kết luận</b>.',
   `<div class="sim-ctl"><div><label>Công cụ</label>${_seg('k',Object.keys(D).map(k=>[k,D[k][0]]),'tl')}</div></div>
    <button type="button" class="btn acc run">▶ Thử tình huống</button> <button type="button" class="btn kl">🔍 Kết luận</button>
    <ol class="o" style="margin:8px 0"></ol><p class="msg" style="font-weight:700;font-size:17px"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Công cụ</th><th>Số lần thử</th><th>Kết luận</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  _wireSeg(e,(a,v)=>{st.k=v;st.t=0;e.querySelector('.o').innerHTML='';e.querySelector('.msg').textContent='';});
  e.querySelector('.run').onclick=()=>{const d=D[st.k]; if(st.t>=3) return; e.querySelector('.o').insertAdjacentHTML('beforeend',`<li>${d[1][st.t]}</li>`); st.t++; if(window.FX) FX.play('tick');};
  e.querySelector('.kl').onclick=()=>{const d=D[st.k]; if(st.t<3){e.querySelector('.msg').textContent='Thử đủ 3 tình huống đã nhé!';return;}
    const r=d[2]?'🤖 CÓ AI: nhận dạng, đoán, thay đổi theo tình huống nhờ học từ dữ liệu.':'⚙️ KHÔNG AI: làm cùng một việc cố định theo công thức, nút bấm.';
    e.querySelector('.msg').textContent=r; st.hist.unshift([d[0],st.t,d[2]?'Có AI':'Không AI']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,()=>''); if(window.FX) FX.play('ding');};
  return e;
}
};

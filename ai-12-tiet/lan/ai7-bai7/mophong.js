/* Mô phỏng Bài 7 lớp 7 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
feas(){
  const I=[['💬 Chatbot giải đáp nội quy, lịch học',[1,1,1]],['📷 Camera chấm điểm chuyên cần bằng khuôn mặt',[0,0,0]],['🍃 Nhận biết lá sâu trong vườn trường',[1,1,1]],['🤖 Robot tự lái đưa đón học sinh',[0,0,0]],['📚 Gợi ý sách theo sở thích từng bạn (cần lịch sử mượn)',[1,0,1]]];
  const Q=['Dữ liệu dễ thu thập, được phép?','Rủi ro đạo đức thấp?','Độ phức tạp, chi phí phù hợp với nhóm?'];
  const st={i:'0',a:{},hist:[]};
  const e=_el(_shell('Máy soi khả thi',
   'Chọn ý tưởng, trả lời 3 câu hỏi (Có/Không), bấm <b>▶ Đánh giá</b>. So với phân tích mẫu.',
   `<div class="sim-ctl"><div><label>Ý tưởng</label>${_seg('i',I.map((x,k)=>[String(k),x[0]]),'0')}</div></div>
    <div class="qq" style="display:grid;gap:6px;max-width:560px">${Q.map((q,k)=>`<div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span>${k+1}. ${q}</span>${_seg('q'+k,[['1','Có'],['0','Không']],'')}</div>`).join('')}</div>
    <div style="margin:8px 0"><button type="button" class="btn acc run">▶ Đánh giá</button></div><p class="msg" style="font-weight:700;font-size:17px"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Ý tưởng</th><th>Em</th><th>Mẫu</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  const kl=a=>{const n=a.filter(Boolean).length;return n===3?'✅ Khả thi':n===2?'🟡 Khả thi nếu điều chỉnh':'⛔ Chưa khả thi';};
  _wireSeg(e,(n,v)=>{if(n==='i'){st.i=v;st.a={};e.querySelectorAll('.qq .sseg button').forEach(b=>b.classList.remove('on'));e.querySelector('.msg').textContent='';}else st.a[n.slice(1)]=+v;});
  e.querySelector('.run').onclick=()=>{ if([0,1,2].some(k=>st.a[k]===undefined)){e.querySelector('.msg').textContent='Trả lời đủ 3 câu nhé!';return;}
    const em=kl([0,1,2].map(k=>st.a[k])),mau=kl(I[+st.i][1]); e.querySelector('.msg').textContent=em+(em===mau?' – khớp mẫu':' – mẫu: '+mau);
    st.hist.unshift([I[+st.i][0],em,mau]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v===mau?'g':'r'):''); if(window.FX) FX.play('ding');};
  return e;
}
};

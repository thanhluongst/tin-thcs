/* Mô phỏng Bài 3 lớp 7 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
auto(){
  const T=[['✍️ Sửa lỗi chính tả',[1,1,1]],['🗑 Xoá tệp "không cần thiết"',[0,0,1]],['🛡 Cách li tệp nghi virus',[1,1,1]],['💸 Tự gia hạn gói trả phí',[0,0,0]],['📷 Tự đăng ảnh lên mạng',[0,0,1]]];
  const Q=['Nếu AI làm sai, hậu quả có nhỏ không?','Có hoàn tác (làm lại) được không?','Người dùng xem lại hoặc tắt được không?'];
  const st={t:'0',a:{},hist:[]};
  const e=_el(_shell('Máy soi thao tác tự động',
   'Chọn thao tác, trả lời 3 câu hỏi, bấm <b>▶ Kết luận</b>. Máy so với câu trả lời mẫu.',
   `<div class="sim-ctl"><div><label>Thao tác</label>${_seg('t',T.map((x,i)=>[String(i),x[0]]),'0')}</div></div>
    <div class="qq" style="display:grid;gap:6px;max-width:560px">${Q.map((q,i)=>`<div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span>${i+1}. ${q}</span>${_seg('q'+i,[['1','Có'],['0','Không']],'')}</div>`).join('')}</div>
    <div style="margin:8px 0"><button type="button" class="btn acc run">▶ Kết luận</button></div><p class="msg" style="font-weight:700;font-size:17px"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Thao tác</th><th>Em kết luận</th><th>Mẫu</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  const kl=a=>a.every(Boolean)?'🤖 Để AI tự động được':'🧑 Con người trực tiếp quyết định';
  _wireSeg(e,(n,v)=>{if(n==='t'){st.t=v;st.a={};e.querySelectorAll('.qq .sseg button').forEach(b=>b.classList.remove('on'));e.querySelector('.msg').textContent='';}else st.a[n.slice(1)]=+v;});
  e.querySelector('.run').onclick=()=>{ if([0,1,2].some(i=>st.a[i]===undefined)){e.querySelector('.msg').textContent='Trả lời đủ 3 câu nhé!';return;}
    const em=kl([0,1,2].map(i=>st.a[i])), mau=kl(T[+st.t][1]);
    e.querySelector('.msg').textContent=em+(em===mau?' ✅ khớp mẫu':' – mẫu: '+mau);
    st.hist.unshift([T[+st.t][0],em,mau]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v===mau?'g':'r'):''); if(window.FX) FX.play('ding');};
  return e;
}
};

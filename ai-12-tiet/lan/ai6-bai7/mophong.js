/* Mô phỏng Bài 7 lớp 6 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
light(){
  const S=[['Luyện phát âm tiếng Anh',[1,1,1]],['Nhờ AI viết hộ bài văn tả mẹ',[0,0,1]],['Hỏi AI ý tưởng thuyết trình',[1,1,1]],['Gửi ảnh bạn cho ứng dụng chỉnh mặt',[0,1,0]],['Chép đáp án bài tập AI đưa',[0,0,1]]];
  const Q=['AI có giúp em học, làm tốt hơn?','Em vẫn tự làm, tự quyết?','Có an toàn, được phép?'];
  const st={s:'0',a:{},hist:[]};
  const e=_el(_shell('Đèn tín hiệu dùng AI',
   'Chọn tình huống, trả lời 3 câu hỏi (Có/Không), bấm <b>▶ Bật đèn</b>. Đèn so với câu trả lời mẫu để em tự kiểm tra.',
   `<div class="sim-ctl"><div><label>Tình huống</label>${_seg('s',S.map((x,i)=>[String(i),x[0]]),'0')}</div></div>
    <div class="qq" style="display:grid;gap:6px;max-width:520px">${Q.map((q,i)=>`<div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span>${i+1}. ${q}</span>${_seg('q'+i,[['1','Có'],['0','Không']],'')}</div>`).join('')}</div>
    <div style="margin:8px 0"><button type="button" class="btn acc run">▶ Bật đèn</button></div>
    <div style="display:flex;gap:14px;align-items:center"><div class="den" style="width:70px;height:70px;border-radius:50%;background:#e5e7eb;box-shadow:inset 0 0 0 6px #0f172a22"></div><b class="msg" style="font-size:18px"></b></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Tình huống</th><th>Đèn của em</th><th>Đèn mẫu</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  const den=a=>a.every(Boolean)?['🟢 Nên dùng','#22c55e']:!a[2]||(!a[0]&&!a[1])?['🔴 Không nên','#ef4444']:['🟡 Cân nhắc','#eab308'];
  _wireSeg(e,(n,v)=>{if(n==='s'){st.s=v;st.a={};e.querySelectorAll('.qq .sseg button').forEach(b=>b.classList.remove('on'));e.querySelector('.msg').textContent='';e.querySelector('.den').style.background='#e5e7eb';}else st.a[n.slice(1)]=+v;});
  e.querySelector('.run').onclick=()=>{ if([0,1,2].some(i=>st.a[i]===undefined)){e.querySelector('.msg').textContent='Trả lời đủ 3 câu nhé!';return;}
    const em=den([0,1,2].map(i=>st.a[i])), mau=den(S[+st.s][1]);
    e.querySelector('.den').style.background=em[1]; e.querySelector('.msg').textContent=em[0]+(em[0]===mau[0]?' ✅ khớp mẫu':' – mẫu: '+mau[0]+', thảo luận lại nhé');
    st.hist.unshift([S[+st.s][0],em[0],mau[0]]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v===mau[0]?'g':'r'):''); if(window.FX) FX.play('ding');};
  return e;
}
};

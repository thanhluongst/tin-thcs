/* Mô phỏng Bài 4 lớp 6 – chỉ để minh hoạ, số liệu giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
feed(){
  const T=['⚽ Bóng đá','🎮 Trò chơi','🔬 Khoa học','🎵 Âm nhạc','🐶 Động vật'];
  const st={k:'0',hist:[]};
  const e=_el(_shell('Gợi ý video (giả lập)',
   'Chọn loại em thích, kéo thanh <b>số video cùng loại đã xem</b>, bấm <b>▶ Xem gợi ý</b>. Thử 0, 10, 20 video.',
   `<div class="sim-ctl"><div><label>Loại em hay xem</label>${_seg('k',T.map((t,i)=>[String(i),t]),'0')}</div>
    <div><label>Đã xem: <b class="nv">0</b> video</label><input type="range" class="n" min="0" max="20" value="0" style="width:220px"></div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Xem gợi ý</button></div></div>
    <div class="fd" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;margin:8px 0"></div>
    <div class="sim-cnt"><div><b class="c1">–</b>loại trong 10 gợi ý</div><div class="bad"><b class="c2">–</b>phút xem dự kiến</div></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Đã xem</th><th>Số loại</th><th>Phút xem</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  const n=e.querySelector('.n'); n.oninput=()=>e.querySelector('.nv').textContent=n.value;
  _wireSeg(e,(a,v)=>{st[a]=v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const k=+st.k,x=+n.value,p=Math.min(.95,.2+x*.04);
    const fd=[...Array(10)].map(()=>Math.random()<p?k:Math.floor(Math.random()*5)), dv=new Set(fd).size, tm=15+x*4;
    e.querySelector('.fd').innerHTML=fd.map(i=>`<div style="padding:8px;border-radius:10px;background:#eef2ff;text-align:center;font-weight:600">${T[i]}</div>`).join('');
    e.querySelector('.c1').textContent=dv+'/5'; e.querySelector('.c2').textContent=tm;
    st.hist.unshift([x,dv+'/5',tm]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1&&parseInt(v)<=2?'r':''); if(window.FX) FX.play('ding');};
  return e;
},
who(){
  const V=[['Tính tổng 1000 số',{ai:'✅ Xong trong 1 giây, chính xác',ng:'😓 Mất cả buổi, dễ nhầm'}],['An ủi bạn đang buồn',{ai:'😐 Câu chữ hay nhưng chung chung, không hiểu chuyện của bạn',ng:'✅ Bạn thấy được quan tâm thật sự'}],['Dịch nhanh một biển báo tiếng Anh',{ai:'✅ Dịch ngay, đủ hiểu',ng:'🙂 Cần người biết tiếng Anh'}],['Chọn quà sinh nhật cho mẹ',{ai:'😐 Gợi ý món bán chạy, không biết mẹ thích gì',ng:'✅ Em hiểu mẹ, món quà có ý nghĩa'}],['Vẽ bức tranh về kỉ niệm của em',{ai:'😐 Tranh đẹp nhưng không phải kỉ niệm của em',ng:'✅ Thể hiện cảm xúc riêng'}]];
  const st={i:'0',hist:[]};
  const e=_el(_shell('AI hay con người phù hợp hơn?',
   'Chọn việc, bấm <b>🤖 Giao cho AI</b> hoặc <b>🧑 Con người làm</b> để xem kết quả. Thử cả hai với mỗi việc.',
   `<div class="sim-ctl"><div><label>Việc</label>${_seg('i',V.map((v,i)=>[String(i),v[0]]),'0')}</div></div>
    <button type="button" class="btn acc" data-w="ai">🤖 Giao cho AI</button> <button type="button" class="btn" data-w="ng">🧑 Con người làm</button>
    <p class="msg" style="font-weight:700;font-size:17px"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Việc</th><th>Ai làm</th><th>Kết quả</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  _wireSeg(e,(a,v)=>{st[a]=v;});
  e.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const v=V[+st.i],r=v[1][b.dataset.w];e.querySelector('.msg').textContent=r;
    st.hist.unshift([v[0],b.dataset.w==='ai'?'AI':'Con người',r]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(x,j)=>j===2?(x.startsWith('✅')?'g':''):''); if(window.FX) FX.play('ding');});
  return e;
}
};

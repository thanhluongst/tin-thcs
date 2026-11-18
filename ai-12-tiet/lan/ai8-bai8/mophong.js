/* Mô phỏng Bài 8 lớp 8 – chỉ để minh hoạ, không dùng chatbot thật. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
/* 1. Thử kịch bản chatbot thư viện với 6 bạn đọc giả lập */
bot(){
  const PART={chao:'👋 Chào, nêu phạm vi',hoi:'❓ Hỏi thêm khi thiếu thông tin',kh:'🤔 Nhánh "không hiểu"',nguoi:'🧑‍🏫 Chuyển cho thủ thư',ds:'🔒 Không hỏi dữ liệu cá nhân'};
  const U=[['Có sách vũ trụ không?',[]],['Sách gì hay?',['hoi']],['Cho mượn bài giải Toán với',['chao']],['Ờm… cái đó… quyển xanh xanh',['kh']],['Em làm mất sách, phải đền thế nào?',['nguoi']],['Tìm sách giùm, số em là 09…',['ds']]];
  const st={on:{chao:1,hoi:0,kh:0,nguoi:0,ds:0},hist:[]};
  const e=_el(_shell('Thử kịch bản chatbot thư viện',
   'Bật các phần có trong kịch bản, bấm <b>▶ Cho 6 bạn đọc thử</b>. Mỗi bạn hỏi một kiểu khác nhau. Thử bật dần từng phần và so sánh.',
   `<div class="sim-ctl">${Object.keys(PART).map(k=>`<div><label>${PART[k]}</label>${_seg(k,[['1','Có'],['0','Không']],String(st.on[k]))}</div>`).join('')}</div>
    <button type="button" class="btn acc run">▶ Cho 6 bạn đọc thử</button>
    <div class="out" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px;margin:10px 0"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số phần trong kịch bản</th><th>Được hỗ trợ</th><th>Mắc kẹt / có hại</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st.on[n]=+v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); let ok=0;
    e.querySelector('.out').innerHTML=U.map(([q,need],i)=>{const g=need.every(k=>st.on[k]);ok+=g;
      const R=[ '🤖 Có! 5 cuốn ở kệ B2.', g?'🤖 Bạn thích chủ đề gì, lớp mấy?':'🤖 (gợi ý bừa 1 cuốn không hợp)', g?'🤖 Mình chỉ hỗ trợ tìm sách thư viện thôi nhé.':'🤖 (cố trả lời bài Toán – sai phạm vi)', g?'🤖 Mình chưa hiểu, bạn nhớ tên hay tác giả không?':'🤖 (im lặng / trả lời sai)', g?'🤖 Việc này mình chuyển cho cô thủ thư nhé.':'🤖 (tự đặt ra mức đền tiền)', g?'🤖 Bạn đừng gửi số điện thoại nhé, mình không cần.':'🤖 (lưu số điện thoại)'][i];
      return `<div style="padding:8px;border-radius:10px;border:2px solid ${g?'#16a34a':'#dc2626'};background:${g?'#dcfce7':'#fee2e2'}"><b>🧑 ${q}</b><br>${R}</div>`;}).join('');
    const n=Object.values(st.on).filter(Boolean).length;
    st.hist.unshift([n+'/5',ok+'/6',(6-ok)+'']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2?(v==='0'?'g':'r'):'');
    if(window.FX) FX.play(ok===6?'win':'ding');};
  return e;
},
/* 2. Phản hồi của người dùng tác động đến chatbot */
feedback(){
  const st={hist:[]};
  const e=_el(_shell('Phản hồi 👍/👎 huấn luyện chatbot',
   'Kéo thanh <b>% người dùng phản hồi trung thực</b> (số còn lại cố tình bấm sai cho vui), bấm <b>▶ Chạy 5 vòng</b>. Mỗi vòng chatbot học lại từ phản hồi. Thử 90%, 50%, 20%.',
   `<div class="sim-ctl"><div><label>Phản hồi trung thực: <b class="pv">90</b>%</label><input type="range" class="r" min="0" max="100" step="10" value="90" style="width:240px"></div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Chạy 5 vòng</button></div></div>
    <svg viewBox="0 0 420 180" class="sim-svg" style="max-width:460px"><line x1="40" y1="160" x2="410" y2="160" stroke="#94a3b8"/><line x1="40" y1="10" x2="40" y2="160" stroke="#94a3b8"/>
     <text x="8" y="16" font-size="11" fill="#64748b">100%</text><text x="14" y="160" font-size="11" fill="#64748b">0%</text><text x="225" y="178" font-size="11" text-anchor="middle" fill="#64748b">Vòng 0 → 5</text>
     <polyline class="ln" fill="none" stroke="#7c3aed" stroke-width="3"/><g class="pts"></g></svg>
    <p class="msg" style="font-weight:700"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Trung thực</th><th>Đúng lúc đầu</th><th>Đúng sau 5 vòng</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  const r=e.querySelector('.r'); r.oninput=()=>e.querySelector('.pv').textContent=r.value;
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const h=+r.value/100; let a=70; const P=[[0,a]];
    for(let k=1;k<=5;k++){a+= (h-0.55)*22 + (Math.random()-.5)*4; a=Math.max(10,Math.min(98,a)); P.push([k,a]);}
    const xy=P.map(([k,v])=>[40+k*72,160-v*1.5]);
    e.querySelector('.ln').setAttribute('points',xy.map(p=>p.join(',')).join(' '));
    e.querySelector('.pts').innerHTML=xy.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#7c3aed"/><text x="${p[0]}" y="${p[1]-8}" font-size="11" text-anchor="middle">${Math.round(P[i][1])}%</text>`).join('');
    const end=Math.round(a);
    e.querySelector('.msg').textContent=end>75?'📈 Phản hồi trung thực giúp chatbot trả lời đúng hơn.':end<60?'📉 Phản hồi sai làm chatbot học sai – người dùng cũng tác động đến AI!':'➖ Chatbot gần như đứng yên.';
    st.hist.unshift([r.value+'%','70%',end+'%']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2?(parseInt(v)>=70?'g':'r'):'');
    if(window.FX) FX.play('ding');};
  return e;
}
};

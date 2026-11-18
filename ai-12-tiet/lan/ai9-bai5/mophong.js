/* Mô phỏng Bài 5 lớp 9 – chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
idea(){
  const I=[['In thêm bảng thông tin to hơn',[0,0,1,1],'Không dùng AI – vẫn có thể là giải pháp tốt, nhưng bài này cần ý tưởng có AI.'],
    ['Chatbot trả lời vị trí gian, giờ hoạt động từ sơ đồ và lịch của ban tổ chức',[1,1,1,1],'Qua cả 4 câu: mới, AI làm đúng một việc, có dữ liệu, có người kiểm.'],
    ['AI tự đoán khách thích sách gì qua camera khuôn mặt',[1,0,0,0],'Không có dữ liệu được phép; rủi ro riêng tư lớn; không ai kiểm.'],
    ['Robot tự đi dẫn khách tới gian',[1,1,0,0],'Mới nhưng quá phức tạp, chi phí cao, không có dữ liệu bản đồ trong nhà.'],
    ['AI viết sẵn mọi câu trả lời, không cần ai kiểm',[1,1,1,0],'Thiếu người quyết định – trả lời sai giờ không ai phát hiện.']];
  const Q=['(1) Mới so với cách đang làm?','(2) AI làm đúng một việc rõ ràng?','(3) Có dữ liệu phù hợp, được phép?','(4) Có người quyết định và xử lí rủi ro?'];
  const st={i:'0',hist:[]};
  const e=_el(_shell('Máy lọc ý tưởng',
   'Chọn phương án, bấm <b>▶ Lọc</b>. Phương án tốt phải qua cả 4 câu hỏi. Thử hết 5 phương án.',
   `<div class="sim-ctl"><div><label>Phương án</label>${_seg('i',I.map((x,k)=>[String(k),'PA '+(k+1)]),'0')}</div></div>
    <p class="pa" style="padding:8px 12px;background:#f1f5f9;border-radius:10px;font-weight:600"></p>
    <button type="button" class="btn acc run">▶ Lọc</button><div class="o" style="margin-top:8px"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Phương án</th><th>Qua</th></tr><tr class="empty"><td colspan="3">Chưa có.</td></tr></table>`));
  const pa=()=>{e.querySelector('.pa').textContent=I[+st.i][0];e.querySelector('.o').innerHTML='';}; pa();
  _wireSeg(e,(n,v)=>{st[n]=v;pa();});
  e.querySelector('.run').onclick=()=>{ const x=I[+st.i], q=x[1].filter(Boolean).length;
    e.querySelector('.o').innerHTML=Q.map((t,k)=>`<div>${x[1][k]?'✅':'❌'} ${t}</div>`).join('')+`<p style="font-weight:700">${x[2]}</p>`;
    st.hist.unshift(['PA '+(+st.i+1),q+'/4']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===1?(v==='4/4'?'g':'r'):''); if(window.FX) FX.play(q===4?'win':'ding');};
  return e;
}
};

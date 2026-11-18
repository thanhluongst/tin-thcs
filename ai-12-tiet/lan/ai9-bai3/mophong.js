/* Mô phỏng Bài 3 lớp 9 – nội dung giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
fake(){
  const C=[['📢 "Thầy hiệu trưởng: cả trường nghỉ ngày mai, CHIA SẺ NGAY!" – tài khoản lạ, 23 giờ',['Thúc giục chia sẻ','Nguồn lạ','Gây hoang mang'],1,'Trang chính thức của trường / hỏi GVCN'],
    ['📞 Video gọi của "mẹ": "Con chuyển gấp 2 triệu, đừng hỏi gì!" – khẩu hình hơi lệch tiếng',['Thúc giục chuyển tiền','Chi tiết bất thường (khẩu hình lệch)','Yêu cầu giữ bí mật'],1,'Gọi lại số quen của mẹ'],
    ['🖼 Ảnh "người nổi tiếng" quảng cáo thuốc thần kì – bàn tay 6 ngón',['Chi tiết bất thường (6 ngón)','Hứa hẹn quá mức','Không có trên kênh chính thức của người đó'],1,'Kênh chính thức của người đó, Bộ Y tế'],
    ['📰 Thông báo lịch thi trên website trường, có số văn bản, ngày kí',[],0,'Đã là kênh chính thức']];
  const DH=['Thúc giục, gấp','Nguồn lạ','Chi tiết bất thường','Gây cảm xúc mạnh','Yêu cầu bí mật/chuyển tiền'];
  const st={c:'0',m:{},hist:[]};
  const e=_el(_shell('Kính lúp thám tử',
   'Chọn nội dung, đánh dấu các dấu hiệu em thấy, chọn kết luận, bấm <b>▶ Đối chiếu</b>.',
   `<div class="sim-ctl"><div><label>Nội dung</label>${_seg('c',C.map((x,i)=>[String(i),'Nội dung '+(i+1)]),'0')}</div></div>
    <p class="nd" style="padding:10px 12px;background:#f1f5f9;border-radius:10px;font-weight:600"></p>
    <div class="dh" style="display:flex;flex-wrap:wrap;gap:6px">${DH.map((d,i)=>`<label style="padding:6px 10px;border:1px solid #cbd5e1;border-radius:10px"><input type="checkbox" data-d="${i}"> ${d}</label>`).join('')}</div>
    <div class="sim-ctl" style="margin-top:8px"><div><label>Kết luận của em</label>${_seg('kl',[['1','Nghi giả mạo – kiểm chứng'],['0','Có vẻ đáng tin']],'')}</div></div>
    <button type="button" class="btn acc run">▶ Đối chiếu</button><div class="o"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Nội dung</th><th>Số dấu hiệu em thấy</th><th>Kết luận</th></tr><tr class="empty"><td colspan="4">Chưa có.</td></tr></table>`));
  const show=()=>{e.querySelector('.nd').textContent=C[+st.c][0];e.querySelectorAll('[data-d]').forEach(x=>x.checked=false);e.querySelector('.o').innerHTML='';}; show();
  _wireSeg(e,(n,v)=>{if(n==='c'){st.c=v;st.kl=undefined;e.querySelectorAll('[data-n="kl"] button').forEach(b=>b.classList.remove('on'));show();}else st.kl=v;});
  e.querySelector('.run').onclick=()=>{ const c=C[+st.c], n=[...e.querySelectorAll('[data-d]:checked')].length; if(st.kl===undefined){e.querySelector('.o').innerHTML='<p class="hint">Chọn kết luận nhé.</p>';return;}
    const dung=+st.kl===c[2];
    e.querySelector('.o').innerHTML=`<p style="font-weight:700">${dung?'✅':'❌'} ${c[2]?'Nội dung có dấu hiệu giả mạo':'Nội dung từ kênh chính thức'}${c[1].length?': '+c[1].join('; '):''}.</p><p>🔍 Kiểm chứng bằng: <b>${c[3]}</b></p>`;
    st.hist.unshift(['Nội dung '+(+st.c+1),n,dung?'Đúng':'Chưa đúng']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2?(v==='Đúng'?'g':'r'):''); if(window.FX) FX.play('ding');};
  return e;
}
};

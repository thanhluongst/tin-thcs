/* Mô phỏng Bài 2 lớp 8 – chỉ để minh hoạ, số liệu giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js. */
const SIMS={
/* 1. Bảng tin gợi ý: bấm theo gợi ý hay tự chọn? */
feed(){
  const T=['⚽ Bóng đá','🎮 Trò chơi','🔬 Khoa học','🎵 Âm nhạc','🐶 Động vật','🍳 Nấu ăn','📚 Sách','✈️ Du lịch'];
  const st={m:'goi',w:Array(8).fill(1),r:0,min:0,hist:[],feed:[]};
  const e=_el(_shell('Bảng tin gợi ý video',
   'Chọn cách xem rồi bấm <b>▶ Xem 1 lượt</b> nhiều lần (ít nhất 6 lượt). Mỗi lượt AI đưa 6 video. Quan sát <b>số chủ đề</b>, <b>thời gian xem</b> và <b>thông báo</b>. Bấm <b>↺</b> để thử cách khác.',
   `<div class="sim-ctl"><div><label>Cách xem</label>${_seg('m',[['goi','👆 Luôn bấm video gợi ý đầu tiên'],['tu','🔎 Tự tìm chủ đề khác nhau']],'goi')}</div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Xem 1 lượt</button> <button type="button" class="btn rs">↺</button></div></div>
    <div class="fd" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin:8px 0"></div>
    <p class="nt" style="font-weight:700;color:#b45309;min-height:22px"></p>
    <div class="sim-cnt"><div><b class="c1">0</b>lượt</div><div><b class="c2">8</b>chủ đề trong bảng tin</div><div class="bad"><b class="c3">0</b>phút đã xem</div></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Cách xem</th><th>Lượt</th><th>Số chủ đề</th><th>Phút xem</th></tr><tr class="empty"><td colspan="5">Chưa có.</td></tr></table>`));
  const reset=()=>{st.w=Array(8).fill(1);st.r=0;st.min=0;e.querySelector('.fd').innerHTML='';e.querySelector('.nt').textContent='';['c1','c3'].forEach(c=>e.querySelector('.'+c).textContent=0);e.querySelector('.c2').textContent=8;};
  _wireSeg(e,(n,v)=>{st[n]=v;reset();});
  e.querySelector('.rs').onclick=reset;
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); st.r++;
    const pick=()=>{const s=st.w.reduce((a,b)=>a+b,0);let x=Math.random()*s;for(let i=0;i<8;i++){x-=st.w[i];if(x<0)return i}return 7};
    const fd=[...Array(6)].map(pick);
    if(st.m==='goi'){st.w[fd[0]]*=2.2; st.min+=12+st.r*2;} else {const k=Math.floor(Math.random()*8); st.w=st.w.map((v,i)=>i===k?v+1:Math.max(1,v*.8)); st.min+=10;}
    const n=new Set(fd).size;
    e.querySelector('.fd').innerHTML=fd.map(i=>`<div style="padding:10px;border-radius:10px;background:#eef2ff;text-align:center;font-weight:600">${T[i]}</div>`).join('');
    e.querySelector('.nt').textContent=st.m==='goi'&&st.r>=3?'🔔 “Còn 3 video hay nữa đang chờ bạn!” (gửi đúng lúc bạn định tắt máy)':'';
    e.querySelector('.c1').textContent=st.r; e.querySelector('.c2').textContent=n; e.querySelector('.c3').textContent=st.min;
    st.hist.unshift([st.m==='goi'?'Bấm gợi ý':'Tự chọn',st.r,n,st.min]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2?(v<=2?'r':''):'');
    if(window.FX) FX.play('ding');};
  return e;
},
/* 2. Dấu vết dữ liệu của Khang */
trace(){
  const Q={vt:['📍 Vị trí',['Nhà Khang ở phường nào','Trường Khang học','Giờ Khang ra khỏi nhà']],mic:['🎤 Micro',['Khang hay nói về bóng đá','Giọng nói của Khang']],dbg:['👥 Danh bạ',['Bạn thân, người nhà của Khang']],xem:['▶️ Lịch sử xem',['Sở thích: trò chơi, bóng đá','Giờ Khang hay thức khuya']],anh:['🖼 Ảnh',['Khuôn mặt Khang','Đồng phục, tên trường trong ảnh']]};
  const st={on:{vt:1,mic:0,dbg:0,xem:1,anh:0},d:7,hist:[]};
  const e=_el(_shell('Dấu vết dữ liệu của Khang',
   'Bật/tắt từng quyền Khang cấp cho ứng dụng, chọn số ngày dùng, bấm <b>▶ Phân tích</b>. Quan sát hệ thống “biết” gì và dùng để làm gì. Thử ít nhất 3 lần.',
   `<div class="sim-ctl">${Object.keys(Q).map(k=>`<div><label>${Q[k][0]}</label>${_seg(k,[['1','Bật'],['0','Tắt']],String(st.on[k]))}</div>`).join('')}
    <div><label>Số ngày dùng: <b class="dv">7</b></label><input type="range" class="dd" min="1" max="60" value="7"></div>
    <div style="align-self:end"><button type="button" class="btn acc run">▶ Phân tích</button></div></div>
    <div class="out"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số quyền bật</th><th>Ngày</th><th>Điều AI suy ra</th><th>Quảng cáo nhắm vào</th></tr><tr class="empty"><td colspan="5">Chưa có.</td></tr></table>`));
  const dd=e.querySelector('.dd'); dd.oninput=()=>e.querySelector('.dv').textContent=dd.value;
  _wireSeg(e,(n,v)=>{st.on[n]=+v;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh'); const d=+dd.value;
    const know=[]; Object.keys(Q).forEach(k=>{if(st.on[k]) Q[k][1].forEach((x,i)=>{if(d>=(i+1)*4) know.push(x)})});
    const ads=Math.min(know.length*Math.ceil(d/10),40), on=Object.values(st.on).filter(Boolean).length;
    e.querySelector('.out').innerHTML=`<div class="two" style="gap:12px"><div><b>🧠 Hệ thống suy ra:</b><ul>${know.map(x=>`<li>${x}</li>`).join('')||'<li class="hint">Chưa đủ dữ liệu</li>'}</ul></div>
     <div><b>🎯 Sử dụng → Tác động:</b><p>${ads?`${ads} quảng cáo, thông báo nhắm đúng giờ, đúng sở thích của Khang.${st.on.vt&&d>=12?' Biết giờ Khang ra khỏi nhà – nguy hiểm nếu dữ liệu bị bán.':''}`:'Gần như không tác động.'}</p></div></div>`;
    st.hist.unshift([on,d,know.length,ads]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2&&v>=6?'r':'');
    if(window.FX) FX.play('ding');};
  return e;
}
};

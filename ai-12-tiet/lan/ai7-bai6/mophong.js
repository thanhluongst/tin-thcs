/* Mô phỏng Bài 6 lớp 7 – ảnh mô phỏng bằng đặc điểm; chỉ để minh hoạ. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
train7(){
  /* mỗi con vật: [loài, màu lông 0 trắng..1 đen, tai nhọn 0..1] ; mèo tai nhọn hơn */
  const st={b:0,d:'it',hist:[],model:null};
  const gen=(loai,mau)=>[loai,Math.min(1,Math.max(0,mau+(Math.random()-.5)*.2)),loai==='mèo'?.65+Math.random()*.3:.15+Math.random()*.35];
  const e=_el(_shell('Xưởng huấn luyện: chó hay mèo?',
   'Chọn bộ dữ liệu, bấm lần lượt <b>① Thu thập & gán nhãn → ② Cho máy học → ③ Kiểm tra trên 20 ảnh mới</b>. Nếu kết quả chưa tốt, <b>④ Điều chỉnh</b> bằng bộ dữ liệu đa dạng rồi làm lại.',
   `<div class="sim-ctl"><div><label>Bộ dữ liệu</label>${_seg('d',[['it','Chỉ mèo lông trắng, chó lông đen (thiếu đa dạng)'],['da','Chó, mèo đủ màu lông (đa dạng)']],'it')}</div></div>
    <div style="display:flex;gap:6px;flex-wrap:wrap"><button type="button" class="btn b1">① Thu thập & gán nhãn</button><button type="button" class="btn b2">② Cho máy học</button><button type="button" class="btn acc b3">③ Kiểm tra 20 ảnh mới</button></div>
    <div class="o" style="margin:8px 0"></div><p class="msg" style="font-weight:700"></p>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Bộ dữ liệu</th><th>Đúng với mèo đen</th><th>Đúng tất cả</th></tr><tr class="empty"><td colspan="4">Chưa kiểm tra.</td></tr></table>`));
  let D=[];
  _wireSeg(e,(n,v)=>{st.d=v;st.b=0;st.model=null;D=[];e.querySelector('.o').innerHTML='';e.querySelector('.msg').textContent='Đã đổi bộ dữ liệu – làm lại từ bước ①.';});
  e.querySelector('.b1').onclick=()=>{D=[];for(let i=0;i<12;i++){D.push(st.d==='it'?gen('mèo',0):gen('mèo',Math.random()));D.push(st.d==='it'?gen('chó',1):gen('chó',Math.random()));}
    st.b=1;e.querySelector('.o').innerHTML='<b>Dữ liệu đã gán nhãn:</b> '+D.map(x=>`<span title="${x[0]}" style="display:inline-block;margin:2px;padding:2px 6px;border-radius:8px;background:${x[1]>.5?'#334155':'#f1f5f9'};color:${x[1]>.5?'#fff':'#0f172a'}">${x[0]==='mèo'?'🐱':'🐶'}</span>`).join('');e.querySelector('.msg').textContent='① Xong: 24 ảnh đã gán nhãn.';if(window.FX)FX.play('tick');};
  e.querySelector('.b2').onclick=()=>{if(st.b<1){e.querySelector('.msg').textContent='Cần thu thập dữ liệu trước!';return;}
    /* máy học: trọng số theo đặc điểm phân biệt rõ nhất trong dữ liệu */
    const m=k=>{const c=D.filter(x=>x[0]==='mèo'),g=D.filter(x=>x[0]==='chó');return Math.abs(c.reduce((t,x)=>t+x[k],0)/c.length-g.reduce((t,x)=>t+x[k],0)/g.length);};
    st.model={w1:m(1),w2:m(2),D};st.b=2;e.querySelector('.msg').textContent=`② Máy đã học: chú ý màu lông ${Math.round(st.model.w1/(st.model.w1+st.model.w2)*100)}%, hình tai ${Math.round(st.model.w2/(st.model.w1+st.model.w2)*100)}%.`;if(window.FX)FX.play('whoosh');};
  e.querySelector('.b3').onclick=()=>{if(st.b<2){e.querySelector('.msg').textContent='Cần cho máy học trước!';return;}
    const M=st.model,pred=x=>{let b=M.D[0],bd=9;M.D.forEach(y=>{const d=M.w1*Math.abs(y[1]-x[1])+M.w2*Math.abs(y[2]-x[2]);if(d<bd){bd=d;b=y;}});return b[0];};
    const T=[...Array(20)].map((_,i)=>gen(i%2?'mèo':'chó',i<6?(i%2?1:0):Math.random())); let ok=0,den=0,denOk=0;
    const cells=T.map(x=>{const p=pred(x),c=p===x[0];ok+=c;if(x[0]==='mèo'&&x[1]>.7){den++;denOk+=c;}return `<span style="display:inline-block;margin:2px;padding:2px 6px;border-radius:8px;border:2px solid ${c?'#16a34a':'#dc2626'};background:${x[1]>.5?'#334155':'#f1f5f9'};color:${x[1]>.5?'#fff':'#0f172a'}">${x[0]==='mèo'?'🐱':'🐶'}→${p}</span>`;});
    e.querySelector('.o').innerHTML='<b>③ Kiểm tra ảnh mới:</b> '+cells.join('');
    e.querySelector('.msg').textContent=`Đúng ${ok}/20; mèo lông đen đúng ${denOk}/${den}. `+(ok<16?'④ Cần điều chỉnh: thêm dữ liệu đa dạng.':'Kết quả tốt.');
    st.hist.unshift([st.d==='it'?'Thiếu đa dạng':'Đa dạng',denOk+'/'+den,ok+'/20']); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===2?(parseInt(v)>=16?'g':'r'):''); if(window.FX) FX.play('ding');};
  return e;
}
};

/* Tin học 7 · Bài 16. Thuật toán sắp xếp · 2 tiết. Soạn lại cho lớp học LAN.
   Mô phỏng: "sxCoc" (hoán đổi hai cốc nước nhờ cốc trung gian C), "sxNoiBot" (sắp xếp nổi bọt từng bước, đếm so sánh/đổi chỗ), "sxChon" (sắp xếp chọn: tìm nhỏ nhất rồi đổi về đầu). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Đổi nước hai cốc',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Cốc A đựng nước <b>xanh</b>, cốc B đựng nước <b>đỏ</b>. Làm sao để cốc A đựng nước đỏ, cốc B đựng nước xanh? Em có thêm một <b>cốc rỗng C</b>. Thử rót trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'sxCoc'},
      {id:'q1',type:'single',q:'Quan sát: Cần ít nhất mấy lần rót?',opts:['1','2','3','4'],ok:2},
      {id:'q2',type:'single',q:'Thứ tự đúng là:',opts:['A→B, B→A, C→A','A→C, B→A, C→B','B→C, C→A, A→B','A→B, C→A, B→C'],ok:1}],
  key:['<b>Đổi chỗ</b> hai phần tử cần <b>biến trung gian</b> (cốc C).']},
 {t:'Sắp xếp nổi bọt',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p><b>Nổi bọt</b>: đi từ cuối dãy lên đầu (hoặc từ đầu xuống), so sánh <b>hai phần tử liền kề</b>; nếu sai thứ tự thì <b>đổi chỗ</b>. Lặp lại tới khi không còn cặp nào sai. Phần tử nhỏ “nổi” dần lên đầu như bọt nước.</p>',
  qs:[{id:'s2',type:'sim',sim:'sxNoiBot'},
      {id:'h1',type:'single',q:'Dãy 5, 1, 4, 2. Sau lượt đầu tiên của nổi bọt (đi từ đầu, đẩy số lớn về cuối), dãy là:',opts:['1, 4, 2, 5','1, 2, 4, 5','5, 4, 2, 1','1, 5, 2, 4'],ok:0},
      {id:'h2',type:'tf',q:'Đúng hay sai?',items:[{t:'Nổi bọt so sánh hai phần tử liền kề',a:'T'},{t:'Khi một lượt không có đổi chỗ nào, dãy đã được sắp xếp',a:'T'},{t:'Nổi bọt chỉ cần 1 lượt là xong',a:'F'}]}],
  key:['<b>Nổi bọt</b>: so sánh <b>cặp liền kề</b>, đổi chỗ nếu sai thứ tự; lặp đến khi <b>không còn đổi chỗ</b>.']},
 {t:'Sắp xếp chọn',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p><b>Sắp xếp chọn</b>: tìm phần tử <b>nhỏ nhất</b> trong phần chưa sắp xếp rồi <b>đổi chỗ</b> nó về đầu phần đó. Lặp lại với phần còn lại.</p>',
  qs:[{id:'s3',type:'sim',sim:'sxChon'},
      {id:'c1',type:'single',q:'Dãy 7, 3, 9, 1. Sau bước 1 của sắp xếp chọn (tăng dần), dãy là:',opts:['1, 3, 9, 7','3, 7, 9, 1','1, 7, 3, 9','7, 3, 1, 9'],ok:0},
      {id:'c2',type:'text',q:'Nêu một điểm giống và một điểm khác giữa nổi bọt và sắp xếp chọn.',ans:'Giống: đều lặp lại việc so sánh và đổi chỗ, chia bài toán thành bài toán nhỏ hơn. Khác: nổi bọt đổi chỗ các cặp liền kề nhiều lần; sắp xếp chọn tìm phần tử nhỏ nhất rồi đổi chỗ một lần mỗi lượt.'}],
  key:['<b>Chọn</b>: tìm <b>nhỏ nhất</b> → đổi về đầu; mỗi lượt <b>tối đa 1</b> lần đổi chỗ.','Chia bài toán lớn thành <b>bài toán nhỏ hơn</b>.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút!</p>',
  qs:[{id:'l1',type:'single',q:'Dãy 4, 2, 6, 1. Sắp xếp chọn tăng dần, sau bước 2 dãy là:',opts:['1, 2, 6, 4','1, 2, 4, 6','2, 4, 6, 1','1, 4, 6, 2'],ok:0},
      {id:'l2',type:'single',q:'Dãy đã sắp xếp 1, 2, 3, 4. Nổi bọt thực hiện bao nhiêu lần đổi chỗ?',opts:['0','3','4','6'],ok:0}],
  key:['Dãy đã đúng thứ tự → <b>không đổi chỗ</b>.']},
 {t:'Xếp hàng chào cờ',hd:'Vận dụng · 7 phút',code:'4',phut:7,
  story:'<p>Tổ em 6 bạn cần xếp hàng từ thấp đến cao.</p>',
  qs:[{id:'v1',type:'single',q:'Cách nào là sắp xếp chọn?',opts:['Hai bạn đứng cạnh nhau so chiều cao, ai cao hơn lùi ra sau, lặp lại','Tìm bạn thấp nhất đưa lên đầu, rồi tìm bạn thấp nhất trong số còn lại…','Xếp ngẫu nhiên','Bạn cao nhất đứng đầu'],ok:1}],
  key:['Áp dụng thuật toán sắp xếp trong <b>đời sống</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 3 phút',code:'',phut:3,
  story:'<p>Đổi chỗ, so sánh, lặp lại.</p>',
  qs:[{id:'tk',type:'single',q:'Câu nào đúng?',opts:['Đổi chỗ hai phần tử không cần trung gian','Nổi bọt so sánh cặp liền kề; chọn tìm phần tử nhỏ nhất','Sắp xếp chọn so sánh cặp liền kề','Sắp xếp chỉ dùng cho số'],ok:1}],
  key:['<b>Nổi bọt</b> và <b>chọn</b> – hai cách sắp xếp.']}
];
const GHIBAI={so:'Bài 16:',ten:'THUẬT TOÁN SẮP XẾP',muc:[
 {step:1,h:'Đổi chỗ',it:['Cần <b>trung gian</b>: A→C, B→A, C→B.']},
 {step:2,h:'Nổi bọt',it:['So sánh <b>cặp liền kề</b>, sai thứ tự thì <b>đổi chỗ</b>; lặp đến khi không còn đổi chỗ.']},
 {step:3,h:'Sắp xếp chọn',it:['Tìm <b>nhỏ nhất</b> trong phần chưa sắp xếp, đổi về <b>đầu</b>; lặp lại.','Chia bài toán thành <b>bài toán nhỏ hơn</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.sxCoc=function(){
  const e=_el(_shell('Đổi nước hai cốc','Bấm cốc <b>nguồn</b> rồi bấm cốc <b>đích</b> (đích phải rỗng). Mục tiêu: A đỏ, B xanh.',
   `<style>.m-t7cc2{display:flex;justify-content:center;gap:28px;margin:14px 0}.m-t7cc2 .cup{width:86px;cursor:pointer;text-align:center;font-weight:800}
   .m-t7cc2 .g{height:110px;border:4px solid #64748b;border-top:none;border-radius:0 0 18px 18px;position:relative;overflow:hidden;background:#fff}.m-t7cc2 .w{position:absolute;left:0;right:0;bottom:0;height:75%;transition:.5s}
   .m-t7cc2 .cup.sel .g{border-color:#2563eb;box-shadow:0 0 0 4px #bfdbfe}</style>
   <div class="m-t7cc2">${['A','B','C'].map(c=>`<div class="cup" data-c="${c}"><div class="g"><div class="w"></div></div>Cốc ${c}</div>`).join('')}</div>
   <div class="kq" style="text-align:center;font-weight:700;font-size:17px"></div><div style="text-align:center;margin-top:8px"><button type="button" class="btn rs">↺ Làm lại</button></div>`));
  let S,sel,n,log; const col={x:'#3b82f6',d:'#ef4444','':'transparent'},kq=e.querySelector('.kq');
  const show=()=>{e.querySelectorAll('.cup').forEach(c=>{c.querySelector('.w').style.background=col[S[c.dataset.c]]; c.classList.toggle('sel',c.dataset.c===sel);});
    const ok=S.A==='d'&&S.B==='x'; kq.textContent=(log.length?log.join(', ')+' · ':'')+'Số lần rót: '+n+(ok?' 🎉 Hoàn thành!':''); return ok;};
  const rs=()=>{S={A:'x',B:'d',C:''}; sel=null; n=0; log=[]; show();};
  e.querySelectorAll('.cup').forEach(c=>c.onclick=()=>{const k=c.dataset.c;
    if(!sel){if(!S[k]){FX.play('tick');return;} sel=k; show(); FX.play('tick'); return;}
    if(k===sel){sel=null; show(); return;} if(S[k]){kq.textContent='⚠ Cốc '+k+' chưa rỗng – nước sẽ bị trộn!'; FX.play('drum'); sel=null; show(); return;}
    S[k]=S[sel]; S[sel]=''; log.push(sel+'→'+k); n++; sel=null; FX.play(show()?'win':'whoosh');});
  e.querySelector('.rs').onclick=rs; rs(); return e;
};
function _t7sx_css(){return `<style>.m-t7sx .bars{display:flex;align-items:flex-end;justify-content:center;gap:8px;height:170px;margin:12px 0}.m-t7sx .b{width:44px;border-radius:8px 8px 0 0;background:#818cf8;color:#fff;font:800 18px system-ui;display:flex;align-items:flex-start;justify-content:center;padding-top:4px;transition:.35s}
.m-t7sx .b.cmp{background:#f59e0b}.m-t7sx .b.sw{background:#ef4444}.m-t7sx .b.ok{background:#22c55e}.m-t7sx .b.min{background:#ec4899}.m-t7sx .info{text-align:center;font-weight:700;font-size:16px;min-height:24px}</style>`;}
function _t7sx_mk(name,guide,gen){return function(){
  const e=_el(_shell(name,guide,_t7sx_css()+`<div class="sim-ctl"><button type="button" class="btn acc st">⏭ Bước tiếp</button><button type="button" class="btn au">▶ Tự chạy</button><button type="button" class="btn nw">🔀 Dãy mới</button></div>
   <div class="m-t7sx"><div class="bars"></div><div class="info"></div><div class="cnt" style="text-align:center;margin-top:4px"></div></div>`));
  let A,it,tm=null,c,s; const bars=e.querySelector('.bars'),info=e.querySelector('.info');
  const draw=(st)=>{bars.innerHTML=A.map((v,k)=>`<div class="b ${(st.cls||{})[k]||''}" style="height:${30+v*13}px">${v}</div>`).join(''); info.textContent=st.msg||''; e.querySelector('.cnt').innerHTML='So sánh: <b>'+c+'</b> · Đổi chỗ: <b>'+s+'</b>';};
  const nw=()=>{clearInterval(tm); tm=null; A=[]; while(A.length<7){const v=1+Math.floor(Math.random()*10); if(!A.includes(v)) A.push(v);} it=gen(A); c=0; s=0; draw({msg:'Bấm Bước tiếp để bắt đầu'});};
  const step=()=>{const r=it.next(); if(r.done){clearInterval(tm); tm=null; return;} const st=r.value; if(st.c) c++; if(st.s) s++; draw(st); FX.play(st.end?'win':st.s?'whoosh':'tick');};
  e.querySelector('.st').onclick=step; e.querySelector('.au').onclick=()=>{if(tm){clearInterval(tm);tm=null;} else tm=setInterval(step,650);}; e.querySelector('.nw').onclick=nw; nw(); return e;};}
SIMS_BAI.sxNoiBot=_t7sx_mk('Sắp xếp nổi bọt','Bấm <b>⏭ Bước tiếp</b>: cặp cam đang so sánh, đỏ là đổi chỗ, xanh lá đã đúng vị trí (cuối dãy).',function*(A){
  const n=A.length,okc={}; for(let p=0;p<n-1;p++){let sw=false; for(let j=0;j<n-1-p;j++){const cls=Object.assign({},okc); cls[j]=cls[j+1]='cmp';
      yield {c:1,cls,msg:'Lượt '+(p+1)+': so sánh '+A[j]+' và '+A[j+1]};
      if(A[j]>A[j+1]){[A[j],A[j+1]]=[A[j+1],A[j]]; sw=true; const c2=Object.assign({},okc); c2[j]=c2[j+1]='sw'; yield {s:1,cls:c2,msg:'Sai thứ tự → đổi chỗ'};}}
    okc[n-1-p]='ok'; if(!sw){for(let k=0;k<n;k++) okc[k]='ok'; yield {cls:okc,msg:'Lượt '+(p+1)+' không có đổi chỗ → dãy đã sắp xếp!',end:1}; return;}}
  for(let k=0;k<n;k++) okc[k]='ok'; yield {cls:okc,msg:'Hoàn thành!',end:1};});
SIMS_BAI.sxChon=_t7sx_mk('Sắp xếp chọn','Bấm <b>⏭ Bước tiếp</b>: hồng là nhỏ nhất tạm thời, cam đang so sánh, xanh lá đã đúng vị trí (đầu dãy).',function*(A){
  const n=A.length,okc={}; for(let i=0;i<n-1;i++){let m=i; for(let j=i+1;j<n;j++){const cls=Object.assign({},okc); cls[m]='min'; cls[j]='cmp';
      yield {c:1,cls,msg:'Bước '+(i+1)+': so sánh '+A[j]+' với nhỏ nhất hiện tại '+A[m]}; if(A[j]<A[m]) m=j;}
    if(m!==i){[A[i],A[m]]=[A[m],A[i]]; const c2=Object.assign({},okc); c2[i]=c2[m]='sw'; yield {s:1,cls:c2,msg:'Đổi '+A[i]+' (nhỏ nhất) về vị trí '+(i+1)};}
    okc[i]='ok'; yield {cls:Object.assign({},okc),msg:'Vị trí '+(i+1)+' đã đúng: '+A[i]};}
  for(let k=0;k<n;k++) okc[k]='ok'; yield {cls:okc,msg:'Hoàn thành!',end:1};});

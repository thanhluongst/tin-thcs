/* Tin học 7 · Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu · 2 tiết. Soạn lại cho lớp học LAN.
   Mô phỏng: "hcHieuUng" (hiệu ứng cho đối tượng: Appear/Fly In/Zoom… xem trước, thứ tự xuất hiện), "hcChuyenTrang" (hiệu ứng chuyển trang Fade/Push/Wipe, số hiệu ứng → mức rối mắt). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Trang chiếu “biết chuyển động”',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>Bài báo cáo Trường học xanh đã đủ nội dung, nhưng các ý hiện ra cùng lúc, người nghe đọc trước khi nhóm nói tới. Thử thêm <b>hiệu ứng</b> để từng ý xuất hiện khi cần.</p>',
  qs:[{id:'s1',type:'sim',sim:'hcHieuUng'},
      {id:'q1',type:'single',q:'Quan sát: Hiệu ứng cho đối tượng giúp gì?',opts:['Làm tệp nhỏ hơn','Cho từng ý xuất hiện theo thứ tự, thu hút sự chú ý','Tự động lưu bài','Đổi màu nền'],ok:1},
      {id:'q2',type:'single',q:'Thứ tự xuất hiện các đối tượng được quyết định bởi:',opts:['Màu sắc','Thứ tự thêm hiệu ứng (số 1, 2, 3 bên cạnh đối tượng)','Cỡ chữ','Ngẫu nhiên'],ok:1}],
  key:['<b>Hiệu ứng</b> làm đối tượng xuất hiện <b>theo thứ tự</b>, thu hút chú ý.']},
 {t:'Hai loại hiệu ứng',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p><b>Hiệu ứng cho đối tượng</b> (Animations): chữ, ảnh xuất hiện, nhấn mạnh, biến mất. <b>Hiệu ứng chuyển trang</b> (Transitions): cách trang mới thay trang cũ. Thử chuyển trang trong mô phỏng.</p>',
  qs:[{id:'s2',type:'sim',sim:'hcChuyenTrang'},
      {id:'h1',type:'sort',q:'Hiệu ứng nào thuộc loại nào?',cols:{c0:'Cho đối tượng',c1:'Chuyển trang'},items:[{t:'Dòng chữ bay vào từ trái',a:'c0'},{t:'Trang mới đẩy trang cũ sang trái',a:'c1'},{t:'Ảnh phóng to dần khi xuất hiện',a:'c0'},{t:'Trang mờ dần sang trang sau',a:'c1'}]},
      {id:'h2',type:'match',q:'Ghép nội dung.',items:['Tạo hiệu ứng cho đối tượng','Tạo hiệu ứng chuyển trang','Xem trước hiệu ứng','Áp dụng cho mọi trang'],opts:['Thẻ Animations','Thẻ Transitions','Nút Preview','Apply To All'],ok:[0,1,2,3]}],
  key:['<b>Animations</b>: hiệu ứng đối tượng. <b>Transitions</b>: hiệu ứng chuyển trang.']},
 {t:'Dùng hiệu ứng hợp lí',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',phut:8,
  story:'<p>Hiệu ứng nhiều quá làm người xem <b>rối mắt</b>, mất tập trung vào nội dung.</p>',
  qs:[{id:'p1',type:'sort',q:'Nên hay không nên?',cols:{c0:'Nên',c1:'Không nên'},items:[{t:'Dùng thống nhất 1–2 kiểu chuyển trang',a:'c0'},{t:'Mỗi dòng chữ một hiệu ứng khác nhau',a:'c1'},{t:'Hiệu ứng phù hợp nội dung, tốc độ vừa phải',a:'c0'},{t:'Kèm âm thanh ồn ào cho mọi hiệu ứng',a:'c1'}]},
      {id:'p2',type:'text',q:'Vì sao không nên dùng quá nhiều hiệu ứng? (1–2 câu)',ans:'Quá nhiều hiệu ứng gây rối mắt, mất thời gian, làm người xem chú ý vào hiệu ứng thay vì nội dung.'}],
  key:['Hiệu ứng <b>vừa đủ, thống nhất, phù hợp nội dung</b>.']},
 {t:'Các bước tạo hiệu ứng',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ Ôn lại thao tác.</p>',
  qs:[{id:'l1',type:'single',q:'Bước đầu tiên khi tạo hiệu ứng cho một dòng chữ là:',opts:['Nháy Transitions','Chọn đối tượng (dòng chữ)','Nhấn F5','Lưu tệp'],ok:1},
      {id:'l2',type:'single',q:'Để hiệu ứng tự chạy sau hiệu ứng trước, ở mục Start chọn:',opts:['On Click','After Previous','None','Duration'],ok:1}],
  key:['Chọn đối tượng → <b>Animations</b> → chọn hiệu ứng → <b>Start, Duration</b>.']},
 {t:'Hoàn thiện báo cáo',hd:'Vận dụng · 7 phút',code:'4',phut:7,
  story:'<p>Nhóm em hoàn thiện bài trình chiếu Trường học xanh để báo cáo.</p>',
  qs:[{id:'v1',type:'text',q:'Em sẽ dùng hiệu ứng gì cho trang tiêu đề, trang nội dung và chuyển trang? Vì sao?',ans:'VD: tiêu đề Zoom; nội dung Appear lần lượt từng ý (On Click); chuyển trang Fade cho mọi trang – nhẹ nhàng, thống nhất.'}],
  key:['Lập <b>kế hoạch hiệu ứng</b> cho cả bài.']},
 {t:'Tổng kết',hd:'Tổng kết · 3 phút',code:'',phut:3,
  story:'<p>Hiệu ứng phục vụ nội dung, không thay thế nội dung.</p>',
  qs:[{id:'tk',type:'single',q:'Câu nào đúng?',opts:['Transitions tạo hiệu ứng cho dòng chữ','Animations tạo hiệu ứng cho đối tượng, Transitions cho chuyển trang','Càng nhiều hiệu ứng càng tốt','Không xem trước được hiệu ứng'],ok:1}],
  key:['<b>Animations – Transitions</b>, dùng <b>hợp lí</b>.']}
];
const GHIBAI={so:'Bài 13:',ten:'HOÀN THIỆN BÀI TRÌNH CHIẾU',muc:[
 {step:1,h:'Hiệu ứng cho đối tượng',it:['<b>Animations</b>: chọn đối tượng → hiệu ứng → Start, Duration.','Số 1, 2, 3 cho biết <b>thứ tự</b>.']},
 {step:2,h:'Hiệu ứng chuyển trang',it:['<b>Transitions</b>; <b>Apply To All</b> cho mọi trang.']},
 {step:3,h:'Hợp lí',it:['<b>Vừa đủ, thống nhất</b>, phù hợp nội dung.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.hcHieuUng=function(){
  const O=['🌳 Trường học xanh','• Trồng 120 cây','• Tỉ lệ sống 95%','🏆 Đạt giải nhất'];
  const e=_el(_shell('Thêm hiệu ứng cho đối tượng','Chọn <b>kiểu hiệu ứng</b>, bấm vào từng <b>đối tượng</b> để gán (số thứ tự hiện ra), rồi bấm <b>▶ Preview</b>.',
   `<style>.m-t7hc .sl{position:relative;aspect-ratio:16/9;max-width:520px;margin:10px auto;background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-radius:8px;box-shadow:0 4px 16px #0002;padding:4%}
   .m-t7hc .ob{position:relative;font:700 20px system-ui;margin:6px 0;padding:4px 30px;border-radius:6px;cursor:pointer;color:#14532d}.m-t7hc .ob:hover{outline:2px dashed #2563eb}
   .m-t7hc .no{position:absolute;left:0;top:4px;background:#2563eb;color:#fff;border-radius:4px;font-size:12px;padding:1px 5px}
   @keyframes t7hcfly{from{transform:translateX(-120%);opacity:0}}@keyframes t7hczoom{from{transform:scale(.1);opacity:0}}@keyframes t7hcfade{from{opacity:0}}@keyframes t7hcbounce{0%{transform:translateY(-60px);opacity:0}60%{transform:translateY(8px)}}</style>
   <div class="sim-ctl"><div><b>Hiệu ứng</b> ${_seg('k',[['appear','Appear'],['fade','Fade'],['fly','Fly In'],['zoom','Zoom'],['bounce','Bounce']],'fly')}</div>
   <button type="button" class="btn acc pv">▶ Preview</button><button type="button" class="btn rs">↺ Xoá hiệu ứng</button></div>
   <div class="m-t7hc"><div class="sl">${O.map((o,k)=>`<div class="ob" data-k="${k}" style="${k===0?'font-size:28px;text-align:center':''}">${o}</div>`).join('')}</div></div><p class="kq" style="text-align:center;font-weight:700"></p>`));
  let k='fly'; const A={}, ord=[], kq=e.querySelector('.kq');
  const lab=()=>e.querySelectorAll('.ob').forEach(d=>{const i=ord.indexOf(+d.dataset.k); d.querySelector('.no')?.remove(); if(i>=0) d.insertAdjacentHTML('afterbegin',`<span class="no">${i+1}</span>`);});
  _wireSeg(e,(n,v)=>{k=v;});
  e.querySelectorAll('.ob').forEach(d=>d.onclick=()=>{const i=+d.dataset.k; A[i]=k; if(!ord.includes(i)) ord.push(i); lab(); kq.textContent='Đã gán '+ord.length+' hiệu ứng.'; FX.play('tick');});
  e.querySelector('.rs').onclick=()=>{ord.length=0; lab(); kq.textContent='';};
  e.querySelector('.pv').onclick=()=>{const obs=[...e.querySelectorAll('.ob')]; obs.forEach(d=>{d.style.visibility=ord.includes(+d.dataset.k)?'hidden':''; d.style.animation='';});
    ord.forEach((i,j)=>setTimeout(()=>{const d=obs[i]; d.style.visibility=''; const a=A[i]; d.style.animation=a==='appear'?'':`t7hc${a} .7s ease-out`; FX.play('whoosh');},600+j*900));
    setTimeout(()=>{kq.textContent=ord.length?'Các đối tượng xuất hiện theo thứ tự 1 → '+ord.length+'.':'Chưa gán hiệu ứng nào – mọi thứ hiện cùng lúc.'; if(ord.length) FX.play('ding');},700+ord.length*900);};
  return e;
};
SIMS_BAI.hcChuyenTrang=function(){
  const P=['🌳 Trang 1: Giới thiệu','💡 Trang 2: Ý tưởng','🛠️ Trang 3: Thực hiện','🏆 Trang 4: Kết quả'],BG=['#dcfce7','#fef9c3','#dbeafe','#fce7f3'];
  const e=_el(_shell('Hiệu ứng chuyển trang','Chọn <b>kiểu chuyển trang</b> và bật/tắt <b>Apply To All</b>, rồi bấm <b>▶ Trang tiếp</b>.',
   `<style>.m-t7ct{position:relative;aspect-ratio:16/9;max-width:520px;margin:10px auto;border-radius:8px;overflow:hidden;box-shadow:0 4px 16px #0002}
   .m-t7ct .pg{position:absolute;inset:0;display:grid;place-items:center;font:800 26px system-ui}</style>
   <div class="sim-ctl"><div><b>Kiểu</b> ${_seg('k',[['none','Không'],['fade','Fade'],['push','Push'],['wipe','Wipe'],['mix','Mỗi trang 1 kiểu']],'none')}</div><button type="button" class="btn acc nx">▶ Trang tiếp</button></div>
   <div class="m-t7ct"><div class="pg" style="background:${BG[0]}">${P[0]}</div></div><p class="kq" style="text-align:center;font-weight:700"></p>`));
  let k='none',i=0; const box=e.querySelector('.m-t7ct'),kq=e.querySelector('.kq');
  _wireSeg(e,(n,v)=>{k=v; kq.textContent=v==='mix'?'⚠ Mỗi trang một kiểu → dễ rối mắt.':v==='none'?'Không hiệu ứng: chuyển đột ngột.':'Một kiểu thống nhất cho mọi trang – hợp lí.';});
  e.querySelector('.nx').onclick=()=>{const old=box.querySelector('.pg'); i=(i+1)%P.length; const nw=_el(`<div class="pg" style="background:${BG[i]}">${P[i]}</div>`);
    const t=k==='mix'?['fade','push','wipe'][i%3]:k; box.appendChild(nw);
    if(t==='none'){old.remove();} else {const a=t==='fade'?[[{opacity:0},{opacity:1}]]:t==='push'?[[{transform:'translateX(100%)'},{transform:'none'}],[{transform:'none'},{transform:'translateX(-100%)'}]]:[[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}]];
      nw.animate(a[0],{duration:700,easing:'ease-out'}); if(a[1]) old.animate(a[1],{duration:700,easing:'ease-out'}); setTimeout(()=>old.remove(),700);}
    FX.play(t==='none'?'tick':'whoosh');};
  return e;
};

/* Tin học 6 · Bài 11. Định dạng văn bản · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: Mai trình bày bài thơ "Mẹ" cho Sổ lưu niệm.
   Mô phỏng: t6_truocsau (Trước và sau khi định dạng), t6_dinhdangkt (Định dạng kí tự), t6_dinhdangdoan (Định dạng đoạn và trang). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Trước và sau khi định dạng',hd:'Khởi động · 5 phút',code:'1',ic:'',phut:5,
  story:'<p>Mai gõ xong bài thơ nhưng chữ nào cũng giống nhau, dồn sát lề trái. Bạn Lan sửa lại cho đẹp. Bấm qua lại để so sánh hai bản.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_truocsau'},
      {id:'k1',type:'multi',q:'Bản của Lan khác bản của Mai ở điểm nào? (chọn các ý đúng)',opts:['Tiêu đề to, đậm, có màu','Các đoạn được căn giữa','Nội dung chữ khác hẳn','Tên tác giả in nghiêng'],ok:[0,1,3]}],
  key:['<b>Định dạng văn bản</b> làm văn bản <b>rõ ràng, đẹp</b>, dễ đọc; nội dung không đổi.']},

 {t:'Định dạng kí tự',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Định dạng kí tự: <b>phông chữ</b>, <b>cỡ chữ</b>, <b>kiểu chữ</b> (đậm <b>B</b>, nghiêng <i>I</i>, gạch chân <u>U</u>), <b>màu chữ</b>. Dùng thanh công cụ để làm tiêu đề giống <b>mẫu</b>.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_dinhdangkt'},
      {id:'h1',type:'match',q:'Ghép nút lệnh với tác dụng.',items:['B','I','U','A (màu đỏ)'],opts:['Chữ nghiêng','Chữ gạch chân','Đổi màu chữ','Chữ đậm'],ok:[3,0,1,2]},
      {id:'h2',type:'single',q:'Muốn định dạng một từ, trước hết em phải…',opts:['Chọn (bôi đen) từ đó','Xoá từ đó','Lưu tệp','Tắt máy'],ok:0}],
  key:['Chọn văn bản → dùng lệnh trong nhóm <b>Font</b>: phông, cỡ, <b>B</b> <i>I</i> <u>U</u>, màu.']},

 {t:'Định dạng đoạn văn và trang',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',ic:'',phut:10,
  story:'<p>Định dạng đoạn: <b>căn lề</b> (trái, giữa, phải, đều hai bên), <b>khoảng cách dòng</b>, <b>thụt lề</b>. Định dạng trang: <b>hướng trang</b> (đứng, nằm ngang), <b>lề trang</b>. Thử các nút để trình bày giống mẫu.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_dinhdangdoan'},
      {id:'h3',type:'sort',q:'Lệnh nào là định dạng <b>đoạn văn</b>, lệnh nào là định dạng <b>kí tự</b>?',cols:{c0:'Đoạn văn',c1:'Kí tự'},items:[{t:'Căn giữa',a:'c0'},{t:'In đậm',a:'c1'},{t:'Giãn dòng 1,5',a:'c0'},{t:'Đổi màu chữ',a:'c1'},{t:'Thụt lề đầu dòng',a:'c0'},{t:'Cỡ chữ 14',a:'c1'}]},
      {id:'h4',type:'single',q:'Làm tờ giấy khen nằm ngang, em chọn hướng trang…',opts:['Portrait (đứng)','Landscape (nằm ngang)','Căn đều','In đậm'],ok:1}],
  key:['Đoạn: <b>căn lề, giãn dòng, thụt lề</b>. Trang: <b>hướng trang, lề trang</b>.']},

 {t:'Thử thách nhanh',hd:'Luyện tập · 7 phút',code:'3',ic:'',phut:7,
  qs:[{id:'l1',type:'tf',q:'Đúng hay Sai?',items:[{t:'Định dạng văn bản làm thay đổi nội dung',a:'F'},{t:'Có thể vừa in đậm vừa in nghiêng một từ',a:'T'},{t:'Căn giữa là định dạng đoạn văn',a:'T'},{t:'Hướng trang là định dạng kí tự',a:'F'}]},
      {id:'l2',type:'single',q:'Tổ hợp phím Ctrl + B dùng để…',opts:['In nghiêng','In đậm','Gạch chân','Căn giữa'],ok:1}],
  key:['Phím tắt: <b>Ctrl+B</b> đậm, <b>Ctrl+I</b> nghiêng, <b>Ctrl+U</b> gạch chân, <b>Ctrl+E</b> căn giữa.']},

 {t:'Trình bày bài thơ',hd:'Vận dụng · 7 phút',code:'4',ic:'',phut:7,
  qs:[{id:'v1',type:'text',q:'Em sẽ định dạng bài thơ yêu thích thế nào cho đẹp? (tiêu đề, các khổ thơ, tên tác giả)',ans:'VD: Tiêu đề cỡ 20, đậm, màu xanh, căn giữa; khổ thơ cỡ 14, căn giữa, giãn dòng 1,5; tên tác giả in nghiêng, căn phải.'}],
  key:['Trình bày <b>thống nhất</b>, không dùng quá nhiều màu, phông.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Có mấy loại định dạng văn bản đã học?',opts:['Kí tự, đoạn văn, trang','Chỉ kí tự','Chỉ trang','Bảng và hình'],ok:0},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Kí tự – đoạn văn – trang</b>.']}
];

const GHIBAI={so:'Bài 11:',ten:'ĐỊNH DẠNG VĂN BẢN',muc:[
 {step:2,h:'Định dạng kí tự',it:['<b>Phông, cỡ, kiểu</b> (đậm, nghiêng, gạch chân), <b>màu</b> chữ.']},
 {step:3,h:'Đoạn văn, trang',it:['Đoạn: <b>căn lề, giãn dòng, thụt lề</b>.','Trang: <b>hướng trang, lề trang</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 .tb{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;background:#e2e8f0;padding:6px;border-radius:10px;max-width:620px;margin:8px auto}.t6 .tb button{font:700 16px system-ui;min-width:40px;height:40px;border-radius:8px;border:2px solid #cbd5e1;background:#fff;cursor:pointer}.t6 .tb button.on{background:#bfdbfe;border-color:#2563eb}.t6 .tb select{font:600 14px system-ui;height:40px;border-radius:8px}.t6 .pg{background:#fff;color:#111;margin:10px auto;box-shadow:0 2px 10px #0003;font-family:"Times New Roman",serif;transition:all .3s}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}
var T6THO=['Lặng rồi cả tiếng con ve','Con ve cũng mệt vì hè nắng oi','Nhà em vẫn tiếng ạ ời','Kẽo cà tiếng võng mẹ ngồi mẹ ru'];

SIMS_BAI.t6_truocsau=function(){
  const e=t6('Trước và sau khi định dạng','Bấm để chuyển giữa <b>bản của Mai</b> và <b>bản của Lan</b>.',
   `<div class="sim-ctl" style="justify-content:center">${_seg('v',[['mai','📄 Bản của Mai (chưa định dạng)'],['lan','✨ Bản của Lan (đã định dạng)']],'mai')}</div><div class="pg" style="max-width:420px;padding:20px"></div><div class="kq">Đang xem bản của Mai</div>`);
  const pg=e.querySelector('.pg');
  const draw=v=>{pg.innerHTML=v==='mai'?`<div style="font-size:14px">Mẹ<br>${T6THO.join('<br>')}<br>Trần Quốc Minh</div>`
    :`<div style="text-align:center;font-size:28px;font-weight:700;color:#be123c">Mẹ</div><div style="text-align:center;font-size:16px;line-height:1.8">${T6THO.join('<br>')}</div><div style="text-align:right;font-style:italic;margin-top:8px">Trần Quốc Minh</div>`;
    t6kq(e,v==='lan'?true:null,v==='lan'?'✨ Dễ đọc, đẹp hơn – nhưng chữ vẫn y nguyên!':'Đang xem bản của Mai');};
  _wireSeg(e,(n,v)=>draw(v)); draw('mai'); return e;
};
SIMS_BAI.t6_dinhdangkt=function(){
  const T={b:1,i:0,u:0,c:'#be123c',s:'28',f:'Arial'};
  const e=t6('Định dạng kí tự','Dùng thanh công cụ để tiêu đề “Mẹ” giống <b>MẪU</b>. Các ô ✓ xanh khi đã đúng.',
   `<div style="text-align:center">MẪU: <span style="font:700 28px Arial;color:#be123c">Mẹ</span></div>
    <div class="tb"><select class="f"><option>Times New Roman</option><option>Arial</option><option>Comic Sans MS</option></select><select class="s">${[12,14,18,22,28,36].map(s=>`<option ${s===14?'selected':''}>${s}</option>`).join('')}</select>
     <button type="button" data-k="b"><b>B</b></button><button type="button" data-k="i"><i>I</i></button><button type="button" data-k="u"><u>U</u></button>
     ${['#111111','#be123c','#1d4ed8','#15803d'].map(c=>`<button type="button" data-c="${c}" style="color:${c}">A<span style="display:block;height:4px;background:${c};margin-top:-4px"></span></button>`).join('')}</div>
    <div class="pg" style="max-width:420px;padding:20px;text-align:center"><span class="tt">Mẹ</span></div>
    <div class="g">${['Phông Arial','Cỡ 28','Đậm','Không nghiêng','Không gạch chân','Màu đỏ'].map((t,i)=>`<span class="c ck" style="cursor:default;min-width:80px;font-size:13px">${t}</span>`).join('')}</div><div class="kq">Hãy định dạng tiêu đề</div>`);
  const S={b:0,i:0,u:0,c:'#111111',s:'14',f:'Times New Roman'};
  const draw=()=>{const tt=e.querySelector('.tt'); Object.assign(tt.style,{fontWeight:S.b?700:400,fontStyle:S.i?'italic':'normal',textDecoration:S.u?'underline':'none',color:S.c,fontSize:S.s+'px',fontFamily:S.f});
    e.querySelectorAll('.tb [data-k]').forEach(b=>b.classList.toggle('on',!!S[b.dataset.k])); e.querySelectorAll('.tb [data-c]').forEach(b=>b.classList.toggle('on',b.dataset.c===S.c));
    const ck=[S.f===T.f,S.s===T.s,!!S.b,!S.i,!S.u,S.c===T.c]; e.querySelectorAll('.ck').forEach((x,i)=>x.classList.toggle('ok',ck[i]));
    const all=ck.every(x=>x); t6kq(e,all?true:null,all?'🎉 Giống hệt mẫu!':`Đúng ${ck.filter(x=>x).length}/6 yêu cầu`); if(all) FX.play('win');};
  e.querySelectorAll('.tb [data-k]').forEach(b=>b.onclick=()=>{S[b.dataset.k]^=1; draw();});
  e.querySelectorAll('.tb [data-c]').forEach(b=>b.onclick=()=>{S.c=b.dataset.c; draw();});
  e.querySelector('.f').onchange=ev=>{S.f=ev.target.value; draw();}; e.querySelector('.s').onchange=ev=>{S.s=ev.target.value; draw();};
  draw(); return e;
};
SIMS_BAI.t6_dinhdangdoan=function(){
  const e=t6('Định dạng đoạn văn và trang','MẪU: bài thơ <b>căn giữa</b>, giãn dòng <b>1,5</b>, trang <b>nằm ngang</b>. Dùng các nút để trình bày đúng mẫu.',
   `<div class="tb"><button type="button" data-a="left">⬅ Trái</button><button type="button" data-a="center">↔ Giữa</button><button type="button" data-a="right">➡ Phải</button><button type="button" data-a="justify">☰ Đều</button>
     <select class="ls"><option value="1">Giãn dòng 1,0</option><option value="1.5">Giãn dòng 1,5</option><option value="2">Giãn dòng 2,0</option></select>
     <button type="button" data-o="p">📄 Đứng</button><button type="button" data-o="l">📃 Ngang</button></div>
    <div class="pg"><div class="tx" style="font-size:15px">${T6THO.join('<br>')}</div></div><div class="kq">Hãy trình bày giống mẫu</div>`);
  const S={a:'left',ls:'1',o:'p'}, pg=e.querySelector('.pg'), tx=e.querySelector('.tx');
  const draw=()=>{tx.style.textAlign=S.a; tx.style.lineHeight=S.ls*1.3; Object.assign(pg.style,S.o==='p'?{width:'260px',height:'340px',padding:'24px'}:{width:'420px',height:'250px',padding:'24px'});
    e.querySelectorAll('[data-a]').forEach(b=>b.classList.toggle('on',b.dataset.a===S.a)); e.querySelectorAll('[data-o]').forEach(b=>b.classList.toggle('on',b.dataset.o===S.o));
    const ck=[S.a==='center',S.ls==='1.5',S.o==='l'], all=ck.every(x=>x);
    t6kq(e,all?true:null,all?'🎉 Đúng mẫu! (căn giữa, giãn dòng 1,5, trang ngang)':`Căn giữa ${ck[0]?'✓':'✗'} · Giãn dòng 1,5 ${ck[1]?'✓':'✗'} · Trang ngang ${ck[2]?'✓':'✗'}`); if(all) FX.play('win');};
  e.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{S.a=b.dataset.a; draw();});
  e.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{S.o=b.dataset.o; draw();});
  e.querySelector('.ls').onchange=ev=>{S.ls=ev.target.value; draw();};
  draw(); return e;
};

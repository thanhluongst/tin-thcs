/* Tin học 6 · Bài 1. Thông tin và dữ liệu · 1 tiết (soạn lại cho lớp học LAN).
   6 hoạt động; tình huống xuyên suốt: buổi sáng đi học của bạn Mai.
   Mô phỏng: t6_thaybiet (Thấy gì? Biết gì? Làm gì?), t6_vatmangtin (Lật thẻ vật mang tin), t6_doanso (Hỏi để có thông tin). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Buổi sáng của Mai',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p><b>Mai</b> đi học: nhìn lên trời thấy mây đen, đến ngã tư thấy đèn đỏ, đến cổng trường nghe tiếng trống. Mỗi lần như vậy Mai đều <b>biết thêm điều gì đó</b> và <b>quyết định</b> làm gì.</p><p>Bấm từng cảnh trong mô phỏng để xem Mai <b>thấy gì → biết gì → làm gì</b>.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_thaybiet'},
      {id:'k1',type:'single',q:'Thấy đèn đỏ, Mai <b>biết</b> điều gì?',opts:['Đèn bị hỏng','Phải dừng lại, chưa được đi','Sắp đến giờ vào học','Trời sắp mưa'],ok:1},
      {id:'k2',type:'single',q:'Những điều Mai “biết” nhờ nhìn, nghe… được gọi là gì?',opts:['Thông tin','Phần mềm','Máy tính','Vật mang tin'],ok:0}],
  key:['Những gì đem lại hiểu biết cho con người là <b>thông tin</b>; thông tin giúp ta <b>ra quyết định</b>.']},

 {t:'Dữ liệu, thông tin và vật mang tin',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Mây đen, đèn đỏ, tiếng trống… là <b>dữ liệu</b> (chữ, số, hình ảnh, âm thanh). Khi được <b>xử lí, hiểu</b> thì dữ liệu cho ta <b>thông tin</b>. Dữ liệu được ghi lên <b>vật mang tin</b> như giấy, ảnh, thẻ nhớ.</p><p>Lật các thẻ đồ vật trong cặp sách của Mai: đồ vật nào là <b>vật mang tin</b>?</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_vatmangtin'},
      {id:'h1',type:'sort',q:'Xếp vào đúng cột.',cols:{c0:'Vật mang tin',c1:'Không phải vật mang tin'},
       items:[{t:'Cuốn sách giáo khoa',a:'c0'},{t:'Thẻ nhớ USB',a:'c0'},{t:'Tấm ảnh lớp',a:'c0'},{t:'Cục tẩy trắng',a:'c1'},{t:'Đĩa CD bài hát',a:'c0'},{t:'Chiếc thước kẻ trơn',a:'c1'}]},
      {id:'h2',type:'tf',q:'Đúng hay Sai?',items:[
        {t:'Dữ liệu có thể ở dạng chữ, số, hình ảnh, âm thanh',a:'T'},
        {t:'Thông tin là những gì đem lại hiểu biết cho con người',a:'T'},
        {t:'Dữ liệu và thông tin là hoàn toàn giống nhau',a:'F'},
        {t:'Tiếng trống trường cũng là dữ liệu',a:'T'}]}],
  key:['<b>Dữ liệu</b> được xử lí cho ta <b>thông tin</b>.','<b>Vật mang tin</b> là phương tiện lưu trữ, truyền dữ liệu (giấy, ảnh, thẻ nhớ…).']},

 {t:'Hỏi để có thông tin',hd:'Hình thành kiến thức · Hoạt động 2 · 9 phút',code:'2.2',ic:'',phut:9,
  story:'<p>Trò chơi: máy nghĩ một số từ 1 đến 100. Mỗi lần đoán, máy cho em <b>thông tin</b>: “lớn hơn” hoặc “nhỏ hơn”. Có thông tin, em đoán nhanh hơn hẳn!</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_doanso'},
      {id:'q1',type:'single',q:'Vì sao gợi ý “lớn hơn/nhỏ hơn” giúp em đoán nhanh?',opts:['Vì máy đoán hộ em','Vì thông tin giúp em loại bớt khả năng, quyết định đúng hơn','Vì số luôn là 50','Vì em may mắn'],ok:1},
      {id:'q2',type:'multi',q:'Thông tin có vai trò gì? (chọn các ý đúng)',opts:['Đem lại hiểu biết','Giúp ra quyết định đúng đắn','Luôn thay thế được con người','Giúp hiểu thế giới xung quanh'],ok:[0,1,3]}],
  key:['Thông tin đem lại <b>hiểu biết</b>, giúp con người có những <b>lựa chọn tốt</b> và hành động hợp lí.']},

 {t:'Bảng lượng mưa',hd:'Luyện tập · 8 phút',code:'3',ic:'',phut:8,
  story:'<p>Lượng mưa trung bình (mm) ở một địa phương:</p><table class="tbl"><tr><th>Tháng</th><th>1</th><th>3</th><th>5</th><th>7</th><th>9</th><th>11</th></tr><tr><td>mm</td><td>18</td><td>25</td><td>190</td><td>290</td><td>260</td><td>45</td></tr></table>',
  qs:[{id:'l1',type:'single',q:'Các con số trong bảng là gì?',opts:['Dữ liệu','Thông tin','Vật mang tin','Phần mềm'],ok:0},
      {id:'l2',type:'single',q:'Từ bảng, em rút ra thông tin nào?',opts:['Tháng 1 mưa nhiều nhất','Tháng 7 mưa nhiều nhất, nên mang áo mưa','Tháng nào cũng mưa như nhau','Tháng 11 mưa nhiều hơn tháng 9'],ok:1},
      {id:'l3',type:'match',q:'Ghép mỗi dữ liệu với thông tin em nhận được.',items:['Trống trường đánh 3 hồi','Biển báo hình người đi bộ','Nhiệt kế chỉ 39°C','Mây đen kéo đến'],
       opts:['Có lối dành cho người đi bộ','Bị sốt, cần đi khám','Sắp mưa, mang ô','Đến giờ vào lớp'],ok:[3,0,1,2]}],
  key:['Bảng số là <b>dữ liệu</b>; hiểu được “tháng nào mưa nhiều” là <b>thông tin</b>.']},

 {t:'Thông tin quanh em',hd:'Vận dụng · 6 phút',code:'4',ic:'',phut:6,
  story:'<p>Kể một ví dụ ở nhà hoặc ở trường: em nhận <b>dữ liệu</b> gì, có <b>thông tin</b> gì, và quyết định làm gì.</p>',
  qs:[{id:'v1',type:'text',q:'Ví dụ của em (dữ liệu → thông tin → quyết định).',ans:'VD: Điện thoại báo 6 giờ (dữ liệu) → biết đã đến giờ dậy (thông tin) → dậy chuẩn bị đi học (quyết định).'}],
  key:['Mọi lúc em đều <b>nhận và dùng thông tin</b> để quyết định.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  story:'<p>Bạn <b>Nam</b> nói: <i>“Quyển vở là thông tin.”</i></p>',
  qs:[{id:'t1',type:'single',q:'Nam nói đúng chưa?',opts:['Đúng','Chưa: quyển vở là vật mang tin, chữ trong vở là dữ liệu','Chưa: quyển vở là phần mềm','Chưa: quyển vở là dữ liệu số'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Dữ liệu</b> → xử lí → <b>thông tin</b>; dữ liệu nằm trên <b>vật mang tin</b>.']}
];

const GHIBAI={so:'Bài 1:',ten:'THÔNG TIN VÀ DỮ LIỆU',muc:[
 {step:2,h:'Thông tin và dữ liệu',it:['<b>Thông tin</b>: những gì đem lại hiểu biết.','<b>Dữ liệu</b>: chữ, số, hình ảnh, âm thanh; được xử lí cho thông tin.','<b>Vật mang tin</b>: giấy, ảnh, thẻ nhớ, đĩa CD…']},
 {step:3,h:'Tầm quan trọng',it:['Thông tin giúp <b>hiểu biết</b> và <b>ra quyết định</b> đúng.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_thaybiet=function(){
  const C=[['☁️','Mây đen kéo đến','Trời sắp mưa','Mang áo mưa'],['🚦','Đèn giao thông màu đỏ','Phải dừng lại','Dừng xe chờ đèn xanh'],['🥁','Tiếng trống 3 hồi','Đến giờ vào lớp','Xếp hàng vào lớp'],['🌡️','Nhiệt kế chỉ 38,5°C','Em bị sốt','Báo bố mẹ, đi khám']];
  const e=t6('Thấy gì? Biết gì? Làm gì?','Bấm vào từng <b>cảnh</b>. Quan sát ba bước: <b>dữ liệu</b> → <b>thông tin</b> → <b>quyết định</b>.',
   `<div class="g">${C.map((c,i)=>`<button type="button" class="c" data-i="${i}"><span class="e">${c[0]}</span>${c[1]}</button>`).join('')}</div><div class="kq">Chọn một cảnh</div><p style="text-align:center">Đã xem: <span class="sc">0/4</span></p>`);
  const seen=new Set();
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{const c=C[+b.dataset.i]; seen.add(b.dataset.i); b.classList.add('ok');
    t6kq(e,true,`👀 Thấy: <i>${c[1]}</i> &nbsp;→&nbsp; 💡 Biết: <b>${c[2]}</b> &nbsp;→&nbsp; 🏃 Làm: ${c[3]}`);
    e.querySelector('.sc').textContent=seen.size+'/4'; if(seen.size===4) FX.play('sparkle');});
  return e;
};
SIMS_BAI.t6_vatmangtin=function(){
  const V=[['📘','Sách giáo khoa',1,'chữ, hình ảnh'],['💾','Thẻ nhớ USB',1,'mọi loại dữ liệu số'],['🖼️','Tấm ảnh lớp',1,'hình ảnh'],['🧽','Cục tẩy trắng',0,''],['💿','Đĩa CD',1,'âm thanh, video'],['📏','Thước kẻ trơn',0,''],['📒','Vở ghi bài',1,'chữ, số'],['🍎','Quả táo',0,'']];
  const e=t6('Lật thẻ: vật mang tin','Bấm lật từng thẻ. Thẻ <b>xanh</b> là vật mang tin (kèm loại dữ liệu nó chứa), thẻ <b>đỏ</b> thì không. Tìm đủ <b>5</b> vật mang tin!',
   `<div class="g">${V.map((v,i)=>`<button type="button" class="c" data-i="${i}"><span class="e">❓</span>Thẻ ${i+1}</button>`).join('')}</div><div class="kq">Tìm được: 0/5 vật mang tin</div>`);
  let n=0;
  e.querySelectorAll('.c').forEach(b=>b.onclick=()=>{if(b.dataset.x) return; b.dataset.x=1; const v=V[+b.dataset.i];
    b.innerHTML=`<span class="e">${v[0]}</span>${v[1]}${v[2]?'<br><small>'+v[3]+'</small>':''}`; b.classList.add(v[2]?'ok':'no');
    if(v[2]) n++; t6kq(e,v[2]?true:false,(v[2]?'✓ '+v[1]+' là vật mang tin':'✗ '+v[1]+' không chứa dữ liệu')+` · Tìm được: ${n}/5`);
    if(n===5) FX.play('win');});
  return e;
};
SIMS_BAI.t6_doanso=function(){
  const e=t6('Đoán số bí mật','Nhập số từ 1 đến 100 rồi bấm <b>Đoán</b>. Đọc thông tin máy trả về để đoán lần sau. Thử đoán dưới 7 lần!',
   `<div class="sim-ctl" style="justify-content:center"><input class="big" type="number" min="1" max="100" value="50"><button type="button" class="btn acc run">🎯 Đoán</button><button type="button" class="btn ghost nw">🔄 Ván mới</button></div><div class="kq">Máy đã nghĩ xong một số!</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Em đoán</th><th>Thông tin nhận được</th></tr></table>`);
  let x, hist;
  const nw=()=>{x=1+Math.floor(Math.random()*100); hist=[]; histTable(e,hist,()=>''); t6kq(e,null,'Máy đã nghĩ xong một số!');};
  nw(); e.querySelector('.nw').onclick=nw;
  e.querySelector('.run').onclick=()=>{const v=+e.querySelector('input').value; if(!v) return;
    const tt=v===x?'🎉 Đúng rồi!':v<x?'⬆️ Số bí mật LỚN hơn':'⬇️ Số bí mật NHỎ hơn';
    hist.unshift([v,tt]); histTable(e,hist,(s,j)=>j===1&&v===x?'g':'');
    if(v===x){t6kq(e,true,`🎉 Đúng là ${x}! Em cần ${hist.length} lần nhờ thông tin “lớn hơn/nhỏ hơn”.`); FX.play('win');} else t6kq(e,null,tt);};
  return e;
};

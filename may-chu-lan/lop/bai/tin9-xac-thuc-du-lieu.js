/* Tin học 9 · Bài 9a. Sử dụng công cụ xác thực dữ liệu · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: dự án Quản lí tài chính gia đình – trang tính Chi tiêu của nhà An.
   Mô phỏng: t9nhaptudo (Nhập tự do hay có xác thực? – bảng chi tiêu mini tự tổng hợp),
   t9datavalid (Hộp thoại Data Validation: Allow, Data, Error Alert – nhập thử vào ô). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Sổ chi tiêu lộn xộn',hd:'Khởi động · 7 phút',code:'1',phut:7,
  story:'<p>Mẹ An nhờ An ghi chi tiêu vào bảng tính. Cả nhà cùng nhập: người gõ “Ăn”, người gõ “ăn uống”, có người gõ nhầm số âm… Cuối tháng, bảng tổng hợp <b>sai bét</b>!</p><p>Xem bảng bên dưới, rồi bật <b>🛡️ Xác thực dữ liệu</b> và nhập lại.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9nhaptudo'},
      {id:'k1',type:'single',q:'Vì sao bảng tổng hợp bị sai khi nhập tự do?',opts:['Vì máy tính tính sai','Vì cùng một khoản chi được gõ nhiều kiểu, số tiền nhập sai kiểu','Vì có quá nhiều dòng','Vì chưa tô màu bảng'],ok:1},
      {id:'k2',type:'single',q:'Bật xác thực dữ liệu, cột Khoản chi trở thành:',opts:['Ô trống','Danh sách chọn sẵn','Ô chỉ nhập số','Ô bị khoá'],ok:1}],
  key:['<b>Xác thực dữ liệu</b> hạn chế kiểu, giá trị dữ liệu nhập vào ô → nhập <b>nhanh, đúng, thống nhất</b>.']},

 {t:'Cấu trúc bảng tính tài chính',hd:'Hình thành kiến thức · Hoạt động 1 · 6 phút',code:'2.1',phut:6,
  story:'<p>Bảng tính gồm hai trang: <b>Thu nhập</b> và <b>Chi tiêu</b>, mỗi trang có cột Ngày, Khoản, Nội dung, Số tiền.</p>',
  qs:[{id:'h1',type:'sort',q:'Khoản thu hay khoản chi?',cols:{c0:'Khoản thu',c1:'Khoản chi'},items:[{t:'Lương',a:'c0'},{t:'Thưởng',a:'c0'},{t:'Làm thêm',a:'c0'},{t:'Ăn',a:'c1'},{t:'Học tập',a:'c1'},{t:'Di chuyển',a:'c1'}]}],
  key:['Hai trang tính: <b>Thu nhập</b>, <b>Chi tiêu</b>; cột: Ngày – Khoản – Nội dung – Số tiền.']},

 {t:'Hộp thoại Data Validation',hd:'Hình thành kiến thức · Hoạt động 2 · 13 phút',code:'2.2',phut:13,
  story:'<p><b>Data/Data Tools/Data Validation</b>. Thử đặt điều kiện trong thẻ <b>Settings</b>, chọn kiểu thông báo trong <b>Error Alert</b> rồi nhập thử giá trị vào ô.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9datavalid'},
      {id:'h2',type:'match',q:'Ghép lựa chọn ở ô Allow với ý nghĩa.',items:['Any value','Whole number','Decimal','List','Date','Text length'],opts:['Số thập phân','Ngày','Độ dài văn bản','Bất kì giá trị nào','Danh sách cho trước','Số nguyên'],ok:[3,5,0,4,1,2]},
      {id:'h3',type:'single',q:'Cột Số tiền chỉ nhận số nguyên lớn hơn 0: em chọn',opts:['Allow: List','Allow: Whole number, Data: greater than, Minimum: 0','Allow: Text length','Allow: Any value'],ok:1},
      {id:'h4',type:'single',q:'Error Alert kiểu <b>Stop</b>, nhập −500 vào ô Số tiền thì:',opts:['Ô nhận −500','Hiện cảnh báo, vẫn cho nhập nếu bấm Yes','Không cho nhập, phải nhập lại','Ô tự đổi thành 500'],ok:2}],
  key:['Thẻ <b>Settings</b>: Allow (List, Whole number…), điều kiện. <b>Input Message</b>: gợi ý khi chọn ô. <b>Error Alert</b>: Stop (chặn), Warning, Information.']},

 {t:'Thiết lập cột Khoản chi',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Danh sách khoản chi ở F2:F10. Cột Khoản chi là B3:B10.</p>',
  qs:[{id:'l1',type:'single',q:'Thứ tự đúng:',opts:['Chọn B3:B10 → Data Validation → Allow = List → Source = $F$2:$F$10 → OK','Data Validation → OK → chọn B3:B10','Chọn F2:F10 → Allow = Whole number','Allow = List → Source = B3:B10'],ok:0},
      {id:'l2',type:'tf',q:'Đúng hay Sai?',items:[{t:'Source của List có thể là một vùng ô như $F$2:$F$6',a:'T'},{t:'Kiểu Warning luôn chặn không cho nhập',a:'F'},{t:'Input Message hiện khi chọn ô',a:'T'}]}],
  key:['<b>List</b> + <b>Source</b> = vùng danh sách (địa chỉ tuyệt đối).']},

 {t:'Kinh phí triển lãm',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Tạo bảng tính kinh phí Triển lãm tin học: trang Các khoản thu (Quỹ, Tài trợ) và Các khoản chi.</p>',
  qs:[{id:'v1',type:'text',q:'Em đặt xác thực dữ liệu cho những cột nào, theo cách nào?',ans:'Cột khoản thu/chi: List lấy từ cột danh sách; cột Số tiền: Whole number greater than 0, kèm Input Message và Error Alert Stop.'}],
  key:['Đặt xác thực ngay khi tạo bảng giúp dữ liệu <b>sạch</b> từ đầu.']},

 {t:'Tổng kết',hd:'Tổng kết · 3 phút',phut:3,
  story:'<p>Dữ liệu đúng ngay từ khâu nhập thì mọi tính toán sau đó mới đúng.</p>',
  qs:[{id:'t1',type:'single',q:'Công cụ xác thực dữ liệu dùng để:',opts:['Tô màu ô','Hạn chế kiểu dữ liệu hoặc giá trị nhập vào ô','Sắp xếp dữ liệu','Vẽ biểu đồ'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Data Validation</b>: nhập <b>nhanh, chính xác, thống nhất</b>.']}
];

const GHIBAI={so:'Bài 9a:',ten:'SỬ DỤNG CÔNG CỤ XÁC THỰC DỮ LIỆU',muc:[
 {step:1,h:'Xác thực dữ liệu',it:['Hạn chế <b>kiểu</b> hoặc <b>giá trị</b> dữ liệu nhập vào ô.']},
 {step:3,h:'Cách dùng',it:['<b>Data/Data Tools/Data Validation</b>.','Settings: <b>Allow</b> (List, Whole number…); Input Message; Error Alert (<b>Stop</b>, Warning, Information).'],
  tb:[['Allow','Ý nghĩa'],['List','Danh sách cho trước'],['Whole number','Số nguyên'],['Decimal','Số thập phân'],['Date','Ngày'],['Text length','Độ dài văn bản']]}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9nhaptudo=function(){
  const DS=['Ở','Ăn','Di chuyển','Học tập'],D0=[['Ăn','500'],['ăn uống','300'],['Di chuyen','200'],['Ở','800'],['Ăn ','abc'],['Học tập','-500']];
  const e=_el(_shell('Nhập tự do hay có xác thực?','Sửa ô <b>Khoản chi</b> và <b>Số tiền</b>. Xem bảng <b>Tổng hợp</b> bên phải. Bật <b>🛡️ Xác thực dữ liệu</b> để so sánh.',
   `<div class="m-t9nt"><style>.m-t9nt .w{display:flex;flex-wrap:wrap;gap:16px}.m-t9nt table{border-collapse:collapse;font:15px Consolas,monospace}.m-t9nt td,.m-t9nt th{border:1px solid #cbd5e1;padding:5px 7px}
   .m-t9nt th{background:#e2e8f0}.m-t9nt input,.m-t9nt select{width:110px;font:inherit;border:0;background:transparent}.m-t9nt td.bad{background:#fee2e2}.m-t9nt .sw{font:800 16px system-ui;padding:10px 14px;border-radius:12px;border:2px solid #1d4e89;background:#fff;cursor:pointer}
   .m-t9nt .sw.on{background:#1d4e89;color:#fff}.m-t9nt .msg{font-weight:700;color:#b91c1c;min-height:22px}</style>
   <button class="sw">🛡️ Xác thực dữ liệu: TẮT</button><p class="msg"></p>
   <div class="w"><table class="nh"><tr><th>Khoản chi</th><th>Số tiền</th></tr></table>
   <table class="th"><tr><th>Khoản</th><th>Tổng (nghìn đ)</th></tr></table></div></div>`));
  let on=false;const data=D0.map(r=>r.slice()),msg=e.querySelector('.msg');
  const ok=r=>DS.includes(r[0]),num=r=>/^\d+$/.test(r[1])&&+r[1]>0;
  const sum=()=>{const s={};DS.forEach(k=>s[k]=0);let x=0;data.forEach(r=>{if(ok(r)&&num(r))s[r[0]]+=+r[1];else x++;});
    e.querySelector('.th').innerHTML='<tr><th>Khoản</th><th>Tổng (nghìn đ)</th></tr>'+DS.map(k=>`<tr><td>${k}</td><td>${s[k]}</td></tr>`).join('')+`<tr><td class="${x?'bad':''}">⚠️ Không tính được</td><td class="${x?'bad':''}">${x} dòng</td></tr>`;};
  const draw=()=>{e.querySelector('.nh').innerHTML='<tr><th>Khoản chi</th><th>Số tiền</th></tr>'+data.map((r,i)=>`<tr><td class="${ok(r)?'':'bad'}">${on?`<select data-i="${i}">${['',...DS].map(k=>`<option ${k===r[0]?'selected':''}>${k}</option>`).join('')}</select>`:`<input data-i="${i}" data-c="0" value="${r[0]}">`}</td><td class="${num(r)?'':'bad'}"><input data-i="${i}" data-c="1" value="${r[1]}"></td></tr>`).join('');
    e.querySelectorAll('.nh input,.nh select').forEach(x=>x.onchange=()=>{const i=+x.dataset.i,c=x.tagName==='SELECT'?0:+x.dataset.c,v=x.value.trim?x.value:x.value;
      if(on&&c===1&&!(/^\d+$/.test(v)&&+v>0)){msg.textContent='⛔ Stop: Số tiền phải là số nguyên lớn hơn 0!';FX.play('tick');x.value=data[i][1];return;}
      data[i][c]=v;msg.textContent='';FX.play('ding');draw();});sum();};
  e.querySelector('.sw').onclick=()=>{on=!on;const b=e.querySelector('.sw');b.classList.toggle('on',on);b.textContent='🛡️ Xác thực dữ liệu: '+(on?'BẬT':'TẮT');msg.textContent=on?'Cột Khoản chi thành danh sách chọn; Số tiền chỉ nhận số nguyên > 0. Sửa các ô đỏ!':'';FX.play('sparkle');draw();};
  draw();return e;
};
SIMS_BAI.t9datavalid=function(){
  const e=_el(_shell('Hộp thoại Data Validation','Đặt <b>Allow</b> và điều kiện, chọn kiểu <b>Error Alert</b>, gõ giá trị vào ô <b>D4</b> rồi bấm <b>↵ Nhập</b>.',
   `<div class="m-t9dv"><style>.m-t9dv .w{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}.m-t9dv .dlg{border:1px solid #94a3b8;border-radius:8px;background:#f8fafc;min-width:290px;box-shadow:0 4px 14px #0002}
   .m-t9dv .dlg .tt{background:#1d4e89;color:#fff;padding:6px 10px;border-radius:8px 8px 0 0;font-weight:700}.m-t9dv .dlg .bd{padding:10px}.m-t9dv .dlg label{display:block;font-weight:600;margin:6px 0 2px}
   .m-t9dv select,.m-t9dv .bd input{font:15px system-ui;padding:4px;width:100%}.m-t9dv .cell{font:18px Consolas,monospace;border:2px solid #16a34a;padding:8px;width:160px}
   .m-t9dv .pop{margin-top:10px;border-radius:10px;padding:12px;font-weight:700;display:none}.m-t9dv .pop.stop{display:block;background:#fee2e2;color:#991b1b}.m-t9dv .pop.warn{display:block;background:#fef9c3;color:#854d0e}
   .m-t9dv .pop.info{display:block;background:#dbeafe;color:#1e3a8a}.m-t9dv .pop.ok{display:block;background:#dcfce7;color:#166534}.m-t9dv .tip{font-size:13px;background:#fffbeb;border:1px solid #fcd34d;border-radius:6px;padding:6px;margin:6px 0}</style>
   <div class="w"><div class="dlg"><div class="tt">Data Validation</div><div class="bd">
    <label>Allow</label><select class="al"><option value="any">Any value</option><option value="whole" selected>Whole number</option><option value="dec">Decimal</option><option value="list">List</option><option value="len">Text length</option></select>
    <div class="cd"><label>Data</label><select class="op"><option value="gt">greater than</option><option value="bt">between</option><option value="lt">less than</option></select>
    <label>Minimum / giá trị</label><input class="mn" value="0"><label class="mxl">Maximum</label><input class="mx" value="100000"></div>
    <div class="ls" style="display:none"><label>Source</label><input class="src" value="Ở,Ăn,Di chuyển,Học tập"></div>
    <label>Error Alert – Style</label><select class="st"><option value="stop">⛔ Stop</option><option value="warn">⚠️ Warning</option><option value="info">ℹ️ Information</option></select></div></div>
   <div><b>Ô D4 (Số tiền)</b><div class="tip">💬 Input Message: Nhập số tiền (nghìn đồng)</div><input class="cell" value="-500"> <button class="btn acc go">↵ Nhập</button>
    <div class="pop"></div><table class="tbl sim-hist" style="margin-top:10px"><tr><th>Lần</th><th>Điều kiện</th><th>Giá trị</th><th>Kết quả</th></tr></table></div></div></div>`));
  const q=s=>e.querySelector(s),hist=[];
  const sync=()=>{const a=q('.al').value;q('.cd').style.display=(a==='any'||a==='list')?'none':'';q('.ls').style.display=a==='list'?'':'none';const bt=q('.op').value==='bt';q('.mx').style.display=q('.mxl').style.display=bt?'':'none';};
  ['.al','.op'].forEach(s=>q(s).onchange=()=>{sync();FX.play('tick');});
  q('.go').onclick=()=>{const a=q('.al').value,op=q('.op').value,v=q('.cell').value.trim(),mn=+q('.mn').value,mx=+q('.mx').value,st=q('.st').value;let ok,dk;
    const cmp=x=>op==='gt'?x>mn:op==='lt'?x<mn:x>=mn&&x<=mx,opT={gt:'> '+mn,lt:'< '+mn,bt:mn+'…'+mx}[op];
    if(a==='any'){ok=true;dk='Any value';}else if(a==='list'){const L=q('.src').value.split(',').map(s=>s.trim());ok=L.includes(v);dk='List';}
    else if(a==='len'){ok=cmp(v.length);dk='Độ dài '+opT;}else{const n=Number(v);ok=v!==''&&!isNaN(n)&&(a==='dec'||Number.isInteger(n))&&cmp(n);dk=(a==='whole'?'Số nguyên ':'Số thập phân ')+opT;}
    const p=q('.pop');let kq;if(ok){p.className='pop ok';p.textContent='✓ Ô D4 nhận giá trị '+v;kq='Nhận';FX.play('ding');}
    else{p.className='pop '+st;p.textContent=st==='stop'?'⛔ Stop: Giá trị không hợp lệ. Chỉ được Retry hoặc Cancel – KHÔNG nhập được!':st==='warn'?'⚠️ Warning: Giá trị không hợp lệ. Tiếp tục? (Yes vẫn nhập được)':'ℹ️ Information: Giá trị không hợp lệ. Bấm OK vẫn nhập được.';kq=st==='stop'?'Bị chặn':'Cảnh báo, vẫn nhập';FX.play('tick');}
    hist.unshift([dk,v||'(trống)',kq]);if(hist.length>6)hist.pop();histTable(e,hist,(x,j)=>j===2?(x==='Nhận'?'g':'r'):'');};
  sync();return e;
};

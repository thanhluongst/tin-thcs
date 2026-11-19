/* Tin học 6 · Bài 3. Thông tin trong máy tính · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống: Mai muốn biết máy tính "hiểu" chữ, số, hình ảnh như thế nào và chiếc USB chứa được bao nhiêu.
   Mô phỏng: t6_bongden (Dãy bóng đèn bit), t6_vebit (Vẽ ảnh bằng bit), t6_usb (Chiếc USB chứa được bao nhiêu?). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Máy tính hiểu thông tin thế nào?',hd:'Khởi động · 6 phút',code:'1',ic:'',phut:6,
  story:'<p>Bên trong máy tính chỉ có các mạch điện <b>bật/tắt</b>, giống như các bóng đèn. Vậy làm sao máy “hiểu” được chữ A hay số 25?</p><p>Bật/tắt 8 bóng đèn trong mô phỏng và quan sát dãy số 0, 1 bên dưới.</p>',
  qs:[{id:'s1',type:'sim',sim:'t6_bongden'},
      {id:'k1',type:'single',q:'Mỗi bóng đèn chỉ có mấy trạng thái?',opts:['1','2 (bật = 1, tắt = 0)','8','10'],ok:1},
      {id:'k2',type:'single',q:'Bật những bóng nào để được dãy 01000001 (chữ A)?',opts:['Bóng thứ 2 và bóng thứ 8 (tính từ trái)','Tất cả các bóng','Chỉ bóng đầu tiên','Không bóng nào'],ok:0}],
  key:['Máy tính dùng hai kí hiệu <b>0</b> và <b>1</b>; mỗi kí hiệu gọi là một <b>bit</b>.']},

 {t:'Biểu diễn thông tin bằng dãy bit',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Chữ, số, hình ảnh, âm thanh đều được <b>mã hoá</b> thành <b>dãy bit</b>. Thử vẽ một hình 8×8 ô: ô tô màu là 1, ô trắng là 0.</p>',
  qs:[{id:'s2',type:'sim',sim:'t6_vebit'},
      {id:'h1',type:'single',q:'Bức hình 8×8 ô trắng/đen cần bao nhiêu bit?',opts:['8','16','64','100'],ok:2},
      {id:'h2',type:'tf',q:'Đúng hay Sai?',items:[
        {t:'Dữ liệu trong máy tính được biểu diễn bằng dãy bit',a:'T'},
        {t:'Chỉ có số mới mã hoá được thành bit',a:'F'},
        {t:'Âm thanh, hình ảnh cũng được mã hoá thành dãy bit',a:'T'},
        {t:'Bit là đơn vị nhỏ nhất để lưu trữ thông tin',a:'T'}]}],
  key:['Mọi dữ liệu (số, chữ, hình, âm thanh) được <b>mã hoá</b> thành <b>dãy bit</b> để máy tính xử lí.']},

 {t:'Đơn vị đo dung lượng',hd:'Hình thành kiến thức · Hoạt động 2 · 9 phút',code:'2.2',ic:'',phut:9,
  story:'<p>8 bit = 1 <b>byte</b> (B). 1 KB = 1024 B, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB.</p><p>Mai có một chiếc USB. Chọn dung lượng USB và loại tệp xem chứa được bao nhiêu tệp.</p>',
  qs:[{id:'s3',type:'sim',sim:'t6_usb'},
      {id:'h3',type:'single',q:'Đơn vị nào lớn nhất?',opts:['KB','MB','GB','TB'],ok:3},
      {id:'h4',type:'match',q:'Ghép cho đúng.',items:['1 byte','1 KB','1 MB','1 GB'],opts:['1024 MB','1024 KB','8 bit','1024 byte'],ok:[2,3,1,0]}],
  key:['<b>1 B = 8 bit</b>; mỗi đơn vị tiếp theo gấp <b>1024</b> lần: KB, MB, GB, TB.']},

 {t:'Đổi đơn vị, ước lượng',hd:'Luyện tập · 7 phút',code:'3',ic:'',phut:7,
  qs:[{id:'l1',type:'single',q:'2 KB bằng bao nhiêu byte?',opts:['2000','2048','1024','16'],ok:1},
      {id:'l2',type:'single',q:'Thẻ nhớ 2 GB chứa khoảng bao nhiêu ảnh, mỗi ảnh 2 MB?',opts:['Khoảng 100','Khoảng 1000','Khoảng 10 000','Khoảng 10'],ok:1},
      {id:'l3',type:'sort',q:'Dung lượng nào <b>lớn hơn 1 MB</b>?',cols:{c0:'Lớn hơn 1 MB',c1:'Không lớn hơn 1 MB'},items:[{t:'2048 KB',a:'c0'},{t:'500 KB',a:'c1'},{t:'1 GB',a:'c0'},{t:'1024 byte',a:'c1'}]}],
  key:['Đổi lên đơn vị lớn: <b>chia 1024</b>; đổi xuống đơn vị nhỏ: <b>nhân 1024</b>.']},

 {t:'Mã hoá số từ 0 đến 15',hd:'Vận dụng · 6 phút',code:'4',ic:'',phut:6,
  story:'<p>Dùng 4 bóng đèn (4 bit) có thể biểu diễn các số từ 0 đến 15. Quay lại mô phỏng bóng đèn, chỉ dùng 4 bóng bên phải.</p>',
  qs:[{id:'v1',type:'single',q:'Số 5 được biểu diễn bằng dãy 4 bit nào?',opts:['0101','0011','1010','0110'],ok:0},
      {id:'v2',type:'text',q:'Ổ đĩa của máy tính nhà em (hoặc điện thoại) có dung lượng bao nhiêu? Chứa được khoảng bao nhiêu bài hát 4 MB?',ans:'VD: điện thoại 64 GB ≈ 64 × 1024 : 4 ≈ 16 000 bài hát.'}],
  key:['n bit biểu diễn được <b>2ⁿ</b> giá trị khác nhau (4 bit: 16 số).']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  qs:[{id:'t1',type:'single',q:'Câu nào đúng?',opts:['1 byte = 10 bit','Máy tính lưu chữ bằng mực','Mọi thông tin trong máy tính là dãy bit','1 GB nhỏ hơn 1 MB'],ok:2},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['Thông tin trong máy = <b>dãy bit</b>; đo bằng <b>byte, KB, MB, GB, TB</b>.']}
];

const GHIBAI={so:'Bài 3:',ten:'THÔNG TIN TRONG MÁY TÍNH',muc:[
 {step:2,h:'Biểu diễn thông tin',it:['<b>Bit</b>: kí hiệu 0 hoặc 1, đơn vị nhỏ nhất.','Mọi dữ liệu được <b>mã hoá</b> thành dãy bit.']},
 {step:3,h:'Đơn vị đo',it:['<b>1 byte = 8 bit</b>.'],tb:[['Đơn vị','Bằng'],['1 KB','1024 B'],['1 MB','1024 KB'],['1 GB','1024 MB'],['1 TB','1024 GB']]}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T6CSS='<style>.t6 .g{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:10px 0}.t6 .c{font:700 15px system-ui;padding:10px 14px;border-radius:14px;border:3px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer;min-width:104px;transition:transform .15s,background .2s;box-shadow:0 3px 0 #cbd5e1}.t6 .c:hover{transform:translateY(-2px)}.t6 .c.on{border-color:#2563eb;background:#dbeafe}.t6 .c.ok{border-color:#16a34a;background:#dcfce7}.t6 .c.no{border-color:#dc2626;background:#fee2e2}.t6 .c .e{font-size:34px;display:block;line-height:1.2}.t6 .kq{margin:12px 0;padding:14px;border-radius:14px;background:#f1f5f9;color:#0f172a;font-weight:700;text-align:center;font-size:17px}.t6 .kq.g{background:#dcfce7;color:#166534}.t6 .kq.r{background:#fee2e2;color:#991b1b}.t6 .sc{display:inline-block;background:#fef3c7;color:#92400e;border-radius:999px;padding:4px 12px;font-weight:800}.t6 input.big{font:700 20px system-ui;width:110px;padding:8px;border-radius:10px;border:2px solid #94a3b8;text-align:center}</style>';
function t6(t,g,b){const e=_el(_shell(t,g,b)); e.classList.add('t6'); e.insertAdjacentHTML('afterbegin',T6CSS); return e;}
function t6kq(e,ok,html){const k=e.querySelector('.kq'); k.className='kq '+(ok===null?'':ok?'g':'r'); k.innerHTML=html; if(window.FX) FX.play(ok===false?'tick':'ding');}

SIMS_BAI.t6_bongden=function(){
  const e=t6('Dãy bóng đèn bit','Bấm vào bóng để <b>bật (1)</b> hoặc <b>tắt (0)</b>. Xem dãy bit, giá trị số và kí tự tương ứng. Thử tạo chữ <b>A</b> (01000001).',
   `<div class="g">${[128,64,32,16,8,4,2,1].map((w,i)=>`<button type="button" class="c" data-i="${i}" style="min-width:64px"><span class="e">⚫</span><b class="b">0</b><br><small>${w}</small></button>`).join('')}</div>
    <div class="sim-ctl" style="justify-content:center"><button type="button" class="btn ghost clr">Tắt hết</button><button type="button" class="btn ghost a">Tạo chữ A</button></div><div class="kq">Dãy bit: 00000000 → số 0</div>`);
  const b=[0,0,0,0,0,0,0,0];
  const show=()=>{e.querySelectorAll('.c').forEach((x,i)=>{x.querySelector('.e').textContent=b[i]?'💡':'⚫'; x.querySelector('.b').textContent=b[i]; x.classList.toggle('on',!!b[i]);});
    const v=parseInt(b.join(''),2), ch=v>=32&&v<127?String.fromCharCode(v):'—';
    t6kq(e,v===65?true:null,`Dãy bit: <code style="font-size:20px">${b.join('')}</code> → số <b>${v}</b> → kí tự <b>${ch}</b>${v===65?' 🎉':''}`);};
  e.querySelectorAll('.c').forEach(x=>x.onclick=()=>{const i=+x.dataset.i; b[i]=1-b[i]; show();});
  e.querySelector('.clr').onclick=()=>{b.fill(0); show();};
  e.querySelector('.a').onclick=()=>{'01000001'.split('').forEach((c,i)=>b[i]=+c); show(); FX.play('sparkle');};
  return e;
};
SIMS_BAI.t6_vebit=function(){
  const e=t6('Vẽ ảnh bằng bit','Bấm vào ô để tô màu (1) hoặc xoá (0). Mỗi hàng là một dãy 8 bit. Thử vẽ trái tim hoặc mặt cười!',
   `<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;align-items:center"><div class="gr" style="display:grid;grid-template-columns:repeat(8,36px);gap:3px">${Array.from({length:64},(_,i)=>`<button type="button" data-i="${i}" style="width:36px;height:36px;border-radius:6px;border:1px solid #94a3b8;background:#fff;cursor:pointer"></button>`).join('')}</div>
    <pre class="bits" style="font:700 16px Consolas,monospace;background:#0f172a;color:#4ade80;padding:10px;border-radius:10px;margin:0"></pre></div>
    <div class="sim-ctl" style="justify-content:center"><button type="button" class="btn ghost tim">❤️ Trái tim mẫu</button><button type="button" class="btn ghost xoa">🧽 Xoá</button></div><div class="kq">Đã dùng 64 bit</div>`);
  const p=Array(64).fill(0), TIM='0000000001100110111111111111111101111110001111000001100000000000';
  const show=()=>{e.querySelectorAll('.gr button').forEach((x,i)=>x.style.background=p[i]?'#e11d48':'#fff');
    let s=''; for(let r=0;r<8;r++) s+=p.slice(r*8,r*8+8).join('')+'\n'; e.querySelector('.bits').textContent=s;
    t6kq(e,null,`Bức hình dùng <b>64 bit</b> (8 hàng × 8 bit) · ${p.filter(x=>x).length} ô màu`);};
  e.querySelectorAll('.gr button').forEach(x=>x.onclick=()=>{p[+x.dataset.i]^=1; FX.play('tick'); show();});
  e.querySelector('.tim').onclick=()=>{TIM.split('').forEach((c,i)=>p[i]=+c); show(); FX.play('sparkle');};
  e.querySelector('.xoa').onclick=()=>{p.fill(0); show();};
  show(); return e;
};
SIMS_BAI.t6_usb=function(){
  const U=[['1','1 GB'],['16','16 GB'],['64','64 GB']], F=[['txt','📄 Văn bản 50 KB',50/1024],['img','🖼️ Ảnh 2 MB',2],['mp3','🎵 Bài hát 4 MB',4],['mp4','🎬 Phim 1 GB',1024]];
  const e=t6('Chiếc USB chứa được bao nhiêu?','Chọn <b>dung lượng USB</b> và <b>loại tệp</b>, bấm <b>Tính</b>.',
   `<div class="sim-ctl"><div><b>USB</b> ${_seg('u',U,'16')}</div><div><b>Tệp</b> ${_seg('f',F.map(f=>[f[0],f[1]]),'img')}</div><button type="button" class="btn acc run">🧮 Tính</button></div>
    <div style="max-width:480px;margin:10px auto;font-size:40px;text-align:center">💾</div><div class="kq">Chưa tính</div><table class="tbl sim-hist"><tr><th>Lần</th><th>USB</th><th>Loại tệp</th><th>Số tệp chứa được</th></tr></table>`);
  let u='16', f='img'; const hist=[]; _wireSeg(e,(n,v)=>{if(n==='u')u=v; else f=v;});
  e.querySelector('.run').onclick=()=>{const ff=F.find(x=>x[0]===f), mb=+u*1024, n=Math.floor(mb/ff[2]);
    t6kq(e,true,`${u} GB = ${u} × 1024 = <b>${mb.toLocaleString('vi-VN')} MB</b> → chứa khoảng <b>${n.toLocaleString('vi-VN')}</b> tệp “${ff[1]}”`);
    hist.unshift([u+' GB',ff[1],n.toLocaleString('vi-VN')]); if(hist.length>6) hist.pop(); histTable(e,hist,(v,j)=>j===2?'g':'');};
  return e;
};

/* Tin học 7 · Bài 1. Thiết bị vào – ra · 1 tiết. Soạn lại cho lớp học LAN.
   Tình huống: phòng máy của lớp 7A chuẩn bị buổi họp trực tuyến.
   Mô phỏng: "vrPhanLoai" (bấm thiết bị → vào/ra/lưu trữ, dòng thông tin chạy), "vrAnToan" (thao tác đúng/sai với máy tính). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Chuẩn bị buổi họp trực tuyến',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Lớp 7A họp trực tuyến với trường bạn. <b>An</b> cần: webcam, micro, loa, màn hình, bàn phím… Thiết bị nào <b>đưa thông tin vào</b> máy, thiết bị nào <b>đưa thông tin ra</b>?</p><p>Bấm từng thiết bị trong mô phỏng để xem dòng thông tin chạy theo chiều nào.</p>',
  qs:[{id:'s1',type:'sim',sim:'vrPhanLoai'},
      {id:'q1',type:'single',q:'Quan sát: Webcam đưa thông tin theo chiều nào?',opts:['Từ máy tính ra ngoài','Từ bên ngoài vào máy tính','Không truyền thông tin','Cả hai chiều như nhau'],ok:1},
      {id:'q2',type:'single',q:'Thiết bị nào vừa nhận vừa đưa thông tin (vào – ra)?',opts:['Chuột','Loa','Màn hình cảm ứng','Máy chiếu'],ok:2}],
  key:['<b>Thiết bị vào</b> đưa thông tin vào máy; <b>thiết bị ra</b> đưa kết quả xử lí ra ngoài.']},
 {t:'Thiết bị vào – thiết bị ra',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Thiết bị vào – ra có nhiều loại, mỗi loại làm việc với một <b>dạng thông tin</b>: chữ, số, hình ảnh, âm thanh… Đĩa cứng, USB còn là <b>thiết bị lưu trữ</b>.</p>',
  qs:[{id:'p1',type:'sort',q:'Xếp thiết bị vào đúng nhóm.',cols:{c0:'Thiết bị vào',c1:'Thiết bị ra'},items:[
        {t:'Bàn phím',a:'c0'},{t:'Máy in',a:'c1'},{t:'Micro',a:'c0'},{t:'Loa',a:'c1'},{t:'Máy quét',a:'c0'},{t:'Máy chiếu',a:'c1'},{t:'Webcam',a:'c0'},{t:'Tai nghe',a:'c1'}]},
      {id:'p2',type:'match',q:'Ghép thiết bị với dạng thông tin nó xử lí.',items:['Micro','Máy quét','Loa','Bàn phím'],opts:['Âm thanh đưa vào','Hình ảnh đưa vào','Âm thanh đưa ra','Chữ, số đưa vào'],ok:[0,1,2,3]},
      {id:'p3',type:'tf',q:'Đúng hay sai?',items:[{t:'Ổ cứng, USB là thiết bị lưu trữ',a:'T'},{t:'Màn hình cảm ứng chỉ là thiết bị ra',a:'F'},{t:'Modem vừa nhận vừa gửi thông tin',a:'T'}]}],
  key:['Thiết bị vào – ra rất <b>đa dạng</b>; có thiết bị vừa vào vừa ra (màn hình cảm ứng, modem).','<b>Thiết bị lưu trữ</b>: đĩa cứng, USB, thẻ nhớ.']},
 {t:'Dùng máy tính an toàn',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Trong phòng máy, <b>Minh</b> định tắt máy bằng cách rút điện cho nhanh, còn <b>Khoa</b> vừa ăn bánh vừa gõ phím… Thử từng thao tác trong mô phỏng để xem hậu quả.</p>',
  qs:[{id:'s2',type:'sim',sim:'vrAnToan'},
      {id:'a1',type:'sort',q:'Thao tác nào đúng, thao tác nào sai?',cols:{c0:'Nên làm',c1:'Không nên'},items:[
        {t:'Tắt máy bằng lệnh Shut down',a:'c0'},{t:'Rút dây điện khi máy đang chạy',a:'c1'},{t:'Ăn uống cạnh bàn phím',a:'c1'},{t:'Rút USB bằng lệnh Eject trước',a:'c0'},{t:'Cắm, rút thiết bị khi tay ướt',a:'c1'},{t:'Gõ phím, bấm chuột nhẹ nhàng',a:'c0'}]},
      {id:'a2',type:'single',q:'Vì sao không nên tắt máy bằng cách rút điện?',opts:['Vì tốn điện hơn','Vì có thể mất dữ liệu, hỏng phần mềm','Vì máy sẽ chạy chậm hơn','Vì màn hình bị mờ'],ok:1}],
  key:['Tắt máy bằng lệnh <b>Shut down</b>; <b>Eject</b> trước khi rút USB.','Giữ máy <b>khô, sạch</b>; thao tác nhẹ nhàng; không chạm điện khi tay ướt.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút – nhóm nào đúng hết được vinh danh!</p>',
  qs:[{id:'l1',type:'multi',q:'Chọn <b>tất cả</b> thiết bị vào.',opts:['Chuột','Màn hình','Máy ảnh số','Máy in','Cảm biến nhiệt độ'],ok:[0,2,4]},
      {id:'l2',type:'single',q:'Thiết bị nào dùng để <b>lưu trữ</b> dữ liệu?',opts:['Loa','Thẻ nhớ','Micro','Máy chiếu'],ok:1},
      {id:'l3',type:'single',q:'Điều gì có thể xảy ra nếu đổ nước lên bàn phím?',opts:['Bàn phím gõ nhanh hơn','Chập điện, hỏng thiết bị','Máy tự lưu dữ liệu','Không ảnh hưởng gì'],ok:1}],
  key:['Nhận biết đúng <b>vào / ra / lưu trữ</b> và thao tác <b>an toàn</b>.']},
 {t:'Góc máy tính ở nhà em',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Nhìn lại góc học tập của em: có những thiết bị nào nối với máy tính/điện thoại?</p>',
  qs:[{id:'v1',type:'text',q:'Kể 2 thiết bị vào, 2 thiết bị ra em dùng ở nhà và 1 điều em sẽ làm để dùng máy an toàn hơn.',ans:'VD: vào – bàn phím, micro; ra – loa, màn hình. Tắt máy đúng cách, không ăn uống cạnh máy.'}],
  key:['Áp dụng quy tắc an toàn khi dùng máy tính <b>ở nhà</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',phut:2,
  story:'<p>Máy tính nhận thông tin qua thiết bị vào, xử lí, rồi đưa kết quả qua thiết bị ra.</p>',
  qs:[{id:'t1',type:'single',q:'Câu nào đúng?',opts:['Máy in là thiết bị vào','Micro là thiết bị ra','Màn hình cảm ứng là thiết bị vào – ra','USB là thiết bị ra'],ok:2}],
  key:['<b>Vào → Xử lí → Ra</b>, dữ liệu được <b>lưu trữ</b> trong thiết bị lưu trữ.']}
];
const GHIBAI={so:'Bài 1:',ten:'THIẾT BỊ VÀO – RA',muc:[
 {step:2,h:'Thiết bị vào – ra',it:['<b>Vào</b>: bàn phím, chuột, micro, máy quét, webcam.','<b>Ra</b>: màn hình, máy in, loa, máy chiếu. <b>Vào–ra</b>: màn hình cảm ứng, modem.','<b>Lưu trữ</b>: đĩa cứng, USB, thẻ nhớ.']},
 {step:3,h:'An toàn',it:['Tắt máy bằng <b>Shut down</b>; <b>Eject</b> trước khi rút USB.','Giữ máy <b>khô, sạch</b>; thao tác nhẹ nhàng.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.vrPhanLoai=function(){
  const TB=[['⌨️','Bàn phím','v','chữ, số'],['🖱️','Chuột','v','lệnh, vị trí'],['🎤','Micro','v','âm thanh'],['📷','Webcam','v','hình ảnh'],['🖨️','Máy in','r','văn bản, hình'],['🔊','Loa','r','âm thanh'],['🖥️','Màn hình','r','hình ảnh, chữ'],['📱','Màn hình cảm ứng','vr','chạm ↔ hình'],['💾','USB','l','lưu dữ liệu']];
  const e=_el(_shell('Dòng thông tin đi đâu?','Bấm vào một <b>thiết bị</b>. Quan sát mũi tên: thông tin đi <b>vào</b> máy (xanh), đi <b>ra</b> (cam) hay cả hai.',
   `<style>.m-t7vr{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center}.m-t7vr .tbs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
   .m-t7vr .tb{font-size:15px;padding:10px 4px;border:2px solid #cbd5e1;border-radius:12px;background:#fff;cursor:pointer;font-weight:600}.m-t7vr .tb span{display:block;font-size:30px}
   .m-t7vr .tb.on{border-color:#2563eb;background:#eff6ff;transform:scale(1.05)}.m-t7vr .cpu{width:150px;text-align:center}.m-t7vr .box{font-size:46px;padding:10px;border-radius:16px;background:#1e293b;color:#fff}
   .m-t7vr .arr{font-size:34px;height:44px;font-weight:900}.m-t7vr .arr.v{color:#16a34a;animation:t7vrv .8s infinite}.m-t7vr .arr.r{color:#ea580c;animation:t7vrv .8s infinite reverse}
   @keyframes t7vrv{50%{transform:translateY(-6px)}}@media(max-width:560px){.m-t7vr{grid-template-columns:1fr}}</style>
   <div class="m-t7vr"><div class="tbs">${TB.map((t,k)=>`<button type="button" class="tb" data-k="${k}"><span>${t[0]}</span>${t[1]}</button>`).join('')}</div>
   <div class="cpu"><div class="arr">·</div><div class="box">🖥️<div style="font-size:13px">Máy tính</div></div><div class="kq" style="margin-top:8px;font-weight:700">Chọn thiết bị</div></div></div>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>Thiết bị</th><th>Thông tin</th><th>Loại</th></tr></table>`));
  const hist=[],arr=e.querySelector('.arr'),kq=e.querySelector('.kq'),L={v:'Thiết bị vào',r:'Thiết bị ra',vr:'Vào – ra',l:'Lưu trữ'};
  e.querySelectorAll('.tb').forEach(b=>b.onclick=()=>{const t=TB[+b.dataset.k]; e.querySelectorAll('.tb').forEach(x=>x.classList.remove('on')); b.classList.add('on');
    arr.className='arr '+(t[2]==='vr'||t[2]==='l'?'':t[2]); arr.textContent=t[2]==='v'?'⬇ vào':t[2]==='r'?'⬆ ra':'⇅'; kq.textContent=t[0]+' '+L[t[2]];
    hist.unshift([t[1],t[3],L[t[2]]]); if(hist.length>6) hist.pop(); histTable(e,hist,(v,j)=>j===2?(/vào/i.test(v)&&!/–/.test(v)?'g':/ra/.test(v)?'r':''):''); FX.play(t[2]==='v'?'ding':'whoosh');});
  return e;
};
SIMS_BAI.vrAnToan=function(){
  const TT=[['🔌','Rút điện khi máy đang chạy',0,'💥 Mất bài chưa lưu, có thể hỏng hệ điều hành!'],['⏻','Bấm Start → Shut down',1,'✅ Máy tắt an toàn, dữ liệu được lưu.'],['🥤','Để cốc nước cạnh bàn phím',0,'💦 Nước đổ vào phím → chập, hỏng bàn phím!'],['⏏️','Eject rồi mới rút USB',1,'✅ USB an toàn, tệp không bị lỗi.'],['💧','Cắm phích khi tay ướt',0,'⚡ Nguy cơ điện giật!'],['🧽','Lau màn hình bằng khăn mềm, khô',1,'✅ Màn hình sạch, không xước.']];
  const e=_el(_shell('Thử thao tác với máy tính','Bấm một <b>thao tác</b> để xem hậu quả. Đếm xem có bao nhiêu thao tác an toàn.',
   `<style>.m-t7at{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px}.m-t7at button{padding:12px;border-radius:12px;border:2px solid #cbd5e1;background:#fff;font-weight:600;text-align:left;cursor:pointer;font-size:15px}
   .m-t7at button b{font-size:26px;margin-right:6px}.m-t7at .g{border-color:#16a34a;background:#dcfce7}.m-t7at .r{border-color:#dc2626;background:#fee2e2;animation:t7atx .3s 2}@keyframes t7atx{50%{transform:translateX(4px)}}</style>
   <div class="m-t7at">${TT.map((t,k)=>`<button type="button" data-k="${k}"><b>${t[0]}</b>${t[1]}</button>`).join('')}</div>
   <div class="kq" style="margin:12px 0;padding:14px;border-radius:12px;background:#f1f5f9;font-weight:700;text-align:center">Chọn một thao tác</div>
   <div style="text-align:center">An toàn: <b class="ok">0</b> · Nguy hiểm: <b class="ng">0</b></div>`));
  const kq=e.querySelector('.kq'),seen={};
  e.querySelectorAll('.m-t7at button').forEach(b=>b.onclick=()=>{const t=TT[+b.dataset.k]; b.className=t[2]?'g':'r'; kq.innerHTML=t[3]; kq.style.background=t[2]?'#dcfce7':'#fee2e2';
    seen[b.dataset.k]=t[2]; e.querySelector('.ok').textContent=Object.values(seen).filter(x=>x).length; e.querySelector('.ng').textContent=Object.values(seen).filter(x=>!x).length; FX.play(t[2]?'ding':'drum');});
  return e;
};

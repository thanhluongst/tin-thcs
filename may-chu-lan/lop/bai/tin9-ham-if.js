/* Tin học 9 · Bài 12a. Sử dụng hàm IF · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: nhà An kiểm tra chi tiêu theo quy tắc 50-30-20.
   Mô phỏng: t9q503020 (Cân đối chi tiêu 50-30-20: kéo số tiền, IF nhận xét trực tiếp),
   t9if (Hàm IF: điều kiện → nhánh đúng/sai), t9iflong (IF lồng nhau: kiểm tra từ mức cao xuống). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Quy tắc 50-30-20',hd:'Khởi động · 7 phút',code:'1',phut:7,
  story:'<p>Quy tắc <b>50-30-20</b>: 50% cho <b>nhu cầu thiết yếu</b> (A), 30% cho <b>mong muốn cá nhân</b> (B), 20% cho <b>tiết kiệm</b> (C). Kéo số tiền mỗi mục của nhà An và xem bảng tự nhận xét.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9q503020'},
      {id:'k1',type:'sort',q:'Xếp khoản chi vào mục theo quy tắc 50-30-20.',cols:{c0:'A – Thiết yếu',c1:'B/C – Mong muốn, tiết kiệm'},items:[{t:'Ăn',a:'c0'},{t:'Ở',a:'c0'},{t:'Học tập',a:'c0'},{t:'Giải trí',a:'c1'},{t:'Quà tặng',a:'c1'},{t:'Tiết kiệm',a:'c1'}]},
      {id:'k2',type:'single',q:'Nhận xét “cân đối” dựa vào đâu?',opts:['Tổng số tiền thật lớn','So sánh tỉ lệ chi mỗi mục với 50%, 30%, 20%','Số lần chi','Ngày chi'],ok:1}],
  key:['So sánh <b>tỉ lệ</b> chi mỗi mục với 50% – 30% – 20% để nhận xét.']},

 {t:'Hàm IF',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Cú pháp: <code>=IF(logical_test, [value_if_true], [value_if_false])</code>. Kéo giá trị ô N3 và quan sát hàm IF đi theo nhánh nào.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9if'},
      {id:'h1',type:'match',q:'Ghép tham số của IF với ý nghĩa.',items:['logical_test','value_if_true','value_if_false'],opts:['Giá trị trả về khi điều kiện sai','Biểu thức điều kiện (đúng/sai)','Giá trị trả về khi điều kiện đúng'],ok:[1,2,0]},
      {id:'h2',type:'single',q:'N3 = 90.5%. =IF(N3>50%,"Nhiều hơn","Ít hơn") cho kết quả:',opts:['Nhiều hơn','Ít hơn','TRUE','90.5%'],ok:0},
      {id:'h3',type:'single',q:'Công thức nhận xét mục Tiết kiệm ở O5:',opts:['=IF(N5>50%,"Nhiều hơn","Ít hơn")','=IF(N5>20%,"Nhiều hơn","Ít hơn")','=IF(N5>30%,"Nhiều hơn","Ít hơn")','=SUMIF(N5,20%)'],ok:1}],
  key:['<b>IF</b> kiểm tra điều kiện: <b>đúng</b> → value_if_true; <b>sai</b> → value_if_false.']},

 {t:'Hàm IF lồng nhau',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Nhận xét ba mức: trên 80% “Nhiều quá”, trên 50% “Nhiều hơn”, còn lại “Ít hơn”. Thử cả hai cách sắp thứ tự điều kiện.</p>',
  qs:[{id:'s3',type:'sim',sim:'t9iflong'},
      {id:'h4',type:'single',q:'=IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")) với N3 = 60%:',opts:['Nhiều quá','Nhiều hơn','Ít hơn','Lỗi'],ok:1},
      {id:'h5',type:'single',q:'Vì sao phải kiểm tra mức 80% <b>trước</b> mức 50%?',opts:['Cho đẹp','Vì nếu xét 50% trước, mọi giá trị trên 80% đều đã dừng ở “Nhiều hơn”','Excel bắt buộc','Không có lí do'],ok:1}],
  key:['<b>IF lồng nhau</b>: IF trong IF, kiểm tra <b>từ mức cao xuống mức thấp</b>.']},

 {t:'Tính thưởng doanh thu',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Doanh thu (nghìn đồng) ở cột B. Trên 10 triệu thưởng 5%, còn lại 0%.</p>',
  qs:[{id:'l1',type:'single',q:'Công thức ở C2:',opts:['=IF(B2>10,5%,0%)','=IF(B2>10000,5%,0%)','=IF(B2<10000,5%,0%)','=IF(10000,B2,5%)'],ok:1},
      {id:'l2',type:'single',q:'Cách mới: >20 triệu 6%; >15 triệu 4%; >10 triệu 2%; còn lại 0%. Công thức đúng:',opts:['=IF(B2>10000,2%,IF(B2>15000,4%,IF(B2>20000,6%,0%)))','=IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%)))','=IF(B2>20000,6%,4%)','=SUMIF(B2,">20000",6%)'],ok:1}],
  key:['Đơn vị nghìn đồng: 10 triệu = <b>10000</b>.']},

 {t:'Nhận xét chi tiết hơn',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Dùng IF lồng nhau nhận xét mục Mong muốn cá nhân (O4) theo 3 mức.</p>',
  qs:[{id:'v1',type:'text',q:'Viết công thức ở O4 (gợi ý mức 40% và 30%).',ans:'=IF(N4>40%,"Nhiều quá",IF(N4>30%,"Nhiều hơn","Ít hơn"))'}],
  key:['IF giúp bảng tính <b>tự nhận xét</b>, tự cảnh báo.']},

 {t:'Tổng kết',hd:'Tổng kết · 4 phút',phut:4,
  story:'<p>Nhà An chi mục A tới 90.5% – IF đã cảnh báo “Nhiều hơn”!</p>',
  qs:[{id:'t1',type:'single',q:'Hàm IF trả về value_if_false khi:',opts:['logical_test đúng','logical_test sai','Ô trống','Luôn luôn'],ok:1},
      {id:'t2',type:'text',short:1,q:'Gia đình An nên điều chỉnh thế nào?',ans:'Tự đánh giá: giảm chi thiết yếu chưa cần, tăng tiết kiệm…'}],
  key:['<b>IF</b>: chọn kết quả theo điều kiện; nhiều mức → <b>IF lồng nhau</b>.']}
];

const GHIBAI={so:'Bài 12a:',ten:'SỬ DỤNG HÀM IF',muc:[
 {step:2,h:'Hàm IF',it:['<b>=IF(logical_test, value_if_true, value_if_false)</b>.','VD: =IF(N3>50%,"Nhiều hơn","Ít hơn").']},
 {step:3,h:'IF lồng nhau',it:['=IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")).','Kiểm tra <b>từ mức cao xuống thấp</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9q503020=function(){
  const M=[['A','Nhu cầu thiết yếu',50,12340,'#2563eb'],['B','Mong muốn cá nhân',30,300,'#e2932b'],['C','Tiết kiệm',20,1000,'#16a34a']];
  const e=_el(_shell('Cân đối chi tiêu 50-30-20','Kéo số tiền mỗi mục (nghìn đồng). Cột <b>Tỉ lệ</b> và <b>Nhận xét</b> (hàm IF) tính lại ngay.',
   `<div class="m-t9q5"><style>.m-t9q5 .r{display:grid;grid-template-columns:150px 1fr 90px;gap:10px;align-items:center;margin:8px 0;font-weight:700}
   .m-t9q5 .bar{position:relative;height:30px;background:#e5e7eb;border-radius:8px;overflow:hidden}.m-t9q5 .bar i{position:absolute;inset:0 auto 0 0;transition:width .3s}
   .m-t9q5 .bar u{position:absolute;top:0;bottom:0;width:3px;background:#111}.m-t9q5 .bar span{position:absolute;left:8px;top:4px;color:#fff;text-shadow:0 1px 2px #000}
   .m-t9q5 table{border-collapse:collapse;font:14px Consolas,monospace;margin-top:10px}.m-t9q5 td,.m-t9q5 th{border:1px solid #cbd5e1;padding:5px 8px}.m-t9q5 th{background:#e2e8f0}
   .m-t9q5 .nh{color:#b91c1c;font-weight:800}.m-t9q5 .it{color:#166534;font-weight:800}</style>
   ${M.map((m,i)=>`<div class="r"><span>${m[0]} – ${m[1]}</span><input type="range" min="0" max="15000" step="20" value="${m[3]}" data-i="${i}"><span class="v"></span></div>`).join('')}
   ${M.map(m=>`<div class="r"><span>Tỉ lệ ${m[0]} (mốc ${m[2]}%)</span><div class="bar"><i style="background:${m[4]}"></i><u style="left:${m[2]}%"></u><span></span></div><span class="st"></span></div>`).join('')}
   <table><tr><th>Mục</th><th>M (tổng)</th><th>N (tỉ lệ)</th><th>O (nhận xét)</th></tr><tbody class="tb"></tbody></table></div>`));
  const v=M.map(m=>m[3]);let last='';
  const up=()=>{const T=v.reduce((a,b)=>a+b,0)||1,bars=e.querySelectorAll('.bar'),st=e.querySelectorAll('.st');let tb='',sig='';
    e.querySelectorAll('.v').forEach((x,i)=>x.textContent=v[i].toLocaleString('vi-VN'));
    M.forEach((m,i)=>{const p=v[i]/T*100,nh=p>m[2];bars[i].querySelector('i').style.width=p+'%';bars[i].querySelector('span').textContent=p.toFixed(1)+'%';st[i].innerHTML=`<span class="${nh?'nh':'it'}">${nh?'Nhiều hơn':'Ít hơn'}</span>`;
      sig+=nh?1:0;tb+=`<tr><td>${m[0]}</td><td>${v[i]}</td><td>${p.toFixed(1)}%</td><td>=IF(N${i+3}>${m[2]}%,"Nhiều hơn","Ít hơn") → <b class="${nh?'nh':'it'}">${nh?'Nhiều hơn':'Ít hơn'}</b></td></tr>`;});
    e.querySelector('.tb').innerHTML=tb;if(sig!==last){FX.play('tick');last=sig;}};
  e.querySelectorAll('input').forEach(x=>x.oninput=()=>{v[+x.dataset.i]=+x.value;up();});up();return e;
};
SIMS_BAI.t9if=function(){
  const e=_el(_shell('Hàm IF đi nhánh nào?','Kéo giá trị <b>N3</b>, đổi <b>mốc so sánh</b>. Quan sát hình thoi điều kiện và nhánh được chọn.',
   `<div class="m-t9if"><style>.m-t9if .fx{font:17px Consolas,monospace;background:#fff;border:1px solid #cbd5e1;padding:8px;border-radius:8px;margin:8px 0}.m-t9if svg text{font:700 15px system-ui}
   .m-t9if .kq{font:800 26px system-ui;text-align:center}.m-t9if input[type=range]{width:240px}</style>
   <div class="sim-ctl"><div><b>N3 = <span class="nv">90.5</span>%</b><br><input class="n" type="range" min="0" max="100" step="0.5" value="90.5"></div><div><b>Mốc</b><br>${_seg('m',[['50','50%'],['30','30%'],['20','20%']],'50')}</div></div>
   <div class="fx"></div>
   <svg viewBox="0 0 420 200" width="100%" style="max-width:520px"><polygon points="210,10 300,60 210,110 120,60" fill="#fef3c7" stroke="#b45309" stroke-width="3"/><text class="cd" x="210" y="65" text-anchor="middle"></text>
   <line class="lt" x1="120" y1="60" x2="60" y2="150" stroke-width="5"/><line class="lf" x1="300" y1="60" x2="360" y2="150" stroke-width="5"/>
   <text x="70" y="100">Đúng</text><text x="320" y="100">Sai</text><rect class="bt" x="0" y="150" width="130" height="44" rx="10"/><rect class="bf" x="290" y="150" width="130" height="44" rx="10"/>
   <text x="65" y="178" text-anchor="middle">"Nhiều hơn"</text><text x="355" y="178" text-anchor="middle">"Ít hơn"</text></svg><div class="kq"></div></div>`));
  let n=90.5,m=50,last=null;
  const up=()=>{const ok=n>m;e.querySelector('.nv').textContent=n;e.querySelector('.fx').innerHTML=`O3: =IF(<b style="color:#b45309">N3&gt;${m}%</b>,"Nhiều hơn","Ít hơn")`;
    e.querySelector('.cd').textContent=n+'% > '+m+'% ?';const on='#16a34a',off='#cbd5e1';
    e.querySelector('.lt').setAttribute('stroke',ok?on:off);e.querySelector('.lf').setAttribute('stroke',ok?off:on);e.querySelector('.bt').setAttribute('fill',ok?'#bbf7d0':'#f1f5f9');e.querySelector('.bf').setAttribute('fill',ok?'#f1f5f9':'#bbf7d0');
    e.querySelector('.kq').textContent=(ok?'ĐÚNG → ':'SAI → ')+'O3 = "'+(ok?'Nhiều hơn':'Ít hơn')+'"';if(ok!==last){FX.play('ding');last=ok;}};
  e.querySelector('.n').oninput=ev=>{n=+ev.target.value;up();};_wireSeg(e,(k,v)=>{m=+v;up();});up();return e;
};
SIMS_BAI.t9iflong=function(){
  const e=_el(_shell('IF lồng nhau','Kéo <b>N3</b>, chọn <b>thứ tự kiểm tra</b>, quan sát đường đi. Thử N3 = 90% với cả hai cách!',
   `<div class="m-t9il"><style>.m-t9il .fx{font:16px Consolas,monospace;background:#fff;border:1px solid #cbd5e1;padding:8px;border-radius:8px;margin:8px 0}
   .m-t9il .st{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0}.m-t9il .st div{padding:10px 12px;border-radius:12px;background:#f1f5f9;font-weight:700;transition:.3s}
   .m-t9il .st .y{background:#bbf7d0}.m-t9il .st .n{background:#fecaca}.m-t9il .st .end{background:#1d4e89;color:#fff}.m-t9il .warn{color:#b91c1c;font-weight:800}</style>
   <div class="sim-ctl"><div><b>N3 = <span class="nv">90</span>%</b><br><input type="range" min="0" max="100" value="90" style="width:240px"></div>
   <div><b>Thứ tự</b><br>${_seg('o',[['d','Đúng: 80% trước'],['s','Sai: 50% trước']],'d')}</div></div><div class="fx"></div><div class="st"></div><p class="warn"></p>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>N3</th><th>Thứ tự</th><th>Kết quả</th></tr></table></div>`));
  let n=90,o='d';const hist=[];
  const up=(log)=>{const L=o==='d'?[[80,'Nhiều quá'],[50,'Nhiều hơn']]:[[50,'Nhiều hơn'],[80,'Nhiều quá']];e.querySelector('.nv').textContent=n;
    e.querySelector('.fx').textContent=`=IF(N3>${L[0][0]}%,"${L[0][1]}",IF(N3>${L[1][0]}%,"${L[1][1]}","Ít hơn"))`;let h='',kq='Ít hơn';
    for(const [t,r] of L){const y=n>t;h+=`<div class="${y?'y':'n'}">${n}% > ${t}%? ${y?'Đúng':'Sai'}</div>➜`;if(y){kq=r;break;}}
    e.querySelector('.st').innerHTML=h+`<div class="end">${kq}</div>`;const right=n>80?'Nhiều quá':n>50?'Nhiều hơn':'Ít hơn';
    e.querySelector('.warn').textContent=kq!==right?'⚠️ Sai! '+n+'% phải là “'+right+'” – vì đã dừng ở điều kiện 50% trước.':'';
    if(log){hist.unshift([n+'%',o==='d'?'80% trước':'50% trước',kq]);if(hist.length>6)hist.pop();histTable(e,hist,(v,j)=>j===2?(v===right||kq===right?'g':'r'):'');FX.play(kq===right?'ding':'tick');}};
  let tm;e.querySelector('input').oninput=ev=>{n=+ev.target.value;up();clearTimeout(tm);tm=setTimeout(()=>up(1),500);};_wireSeg(e,(k,v)=>{o=v;up(1);});up();return e;
};

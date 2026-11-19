/* Tin học 9 · Bài 16. Thực hành: Lập chương trình máy tính · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: cài đặt bằng Scratch hai thuật toán của Bài 15 (tính lương, tìm số lớn nhất) rồi kiểm thử, gỡ lỗi.
   Mô phỏng: t9cautruc (Ba cấu trúc điều khiển với mèo Scratch), t9kiemthu (Kiểm thử chương trình tính lương – Bảng 16.1),
   t9gomax (Gỡ lỗi chương trình tìm max khi nhập chữ “data”). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Ba cấu trúc điều khiển',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>Mọi ngôn ngữ lập trình đều có ba cấu trúc điều khiển cơ bản. Cho mèo chạy thử từng cấu trúc.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9cautruc'},
      {id:'k1',type:'multi',q:'Ba cấu trúc điều khiển cơ bản là:',opts:['Tuần tự','Rẽ nhánh','Lặp','Nhảy cóc'],ok:[0,1,2]}],
  key:['Ba cấu trúc: <b>tuần tự</b>, <b>rẽ nhánh</b>, <b>lặp</b> – đủ để mô tả mọi thuật toán.']},

 {t:'Chương trình tính lương',hd:'Hình thành kiến thức · Nhiệm vụ 1 · 13 phút',code:'2.1',phut:13,
  story:'<p>Chương trình Scratch tính lương đã lắp xong. Hãy <b>kiểm thử</b> với 6 tình huống của Bảng 16.1, so sánh kết quả mong đợi và kết quả chạy.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9kiemthu'},
      {id:'h1',type:'sort',q:'Xếp biến vào nhóm.',cols:{c0:'Đầu vào / đầu ra',c1:'Biến trung gian'},items:[{t:'muc_luong',a:'c0'},{t:'tgian_laodong',a:'c0'},{t:'tien_luong',a:'c0'},{t:'tgian_dmuc',a:'c1'},{t:'tgian_vuot',a:'c1'},{t:'luong_vuot',a:'c1'}]},
      {id:'h2',type:'single',q:'Trong Scratch, hệ số 1,5 phải viết là:',opts:['1,5','1.5','3/2 bắt buộc','15'],ok:1},
      {id:'h3',type:'single',q:'Tình huống nào chương trình (chưa sửa) chạy chưa đúng?',opts:['muc_luong = 50, 45 giờ','muc_luong = 50, 40 giờ','muc_luong = −100','muc_luong = 60, 0 giờ'],ok:2}],
  key:['<b>Kiểm thử</b> với nhiều bộ dữ liệu, kể cả dữ liệu <b>không hợp lệ</b>, để tìm lỗi.']},

 {t:'Chương trình tìm số lớn nhất',hd:'Hình thành kiến thức · Nhiệm vụ 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Chạy chương trình tìm max với tình huống 8: <b>7, data, 12, 0</b>. Scratch không phân biệt số và chữ khi so sánh!</p>',
  qs:[{id:'s3',type:'sim',sim:'t9gomax'},
      {id:'h4',type:'single',q:'Với bản chưa sửa, đầu vào 7, data, 12, 0 cho kết quả:',opts:['12','7','data','0'],ok:2},
      {id:'h5',type:'single',q:'Cách sửa hợp lí:',opts:['Bỏ vòng lặp','Kiểm tra x có phải số không (VD x + 0 = 0 mà x ≠ 0 là chữ) rồi yêu cầu nhập lại','Đổi max thành 100','Không cần sửa'],ok:1}],
  key:['<b>Gỡ lỗi</b>: tìm tình huống sai → tìm nguyên nhân → sửa chương trình → kiểm thử lại.']},

 {t:'Số âm',hd:'Luyện tập · 6 phút',code:'3',phut:6,
  story:'<p>Tình huống 6 (Bảng 16.2) có số âm trong dãy nhập.</p>',
  qs:[{id:'l1',type:'single',q:'Sửa chương trình để bỏ qua số âm:',opts:['Chỉ xử lí x khi x > 0; x < 0 thì báo “Số không hợp lệ”','Đổi dấu x','Dừng chương trình','Không làm gì'],ok:0},
      {id:'l2',type:'tf',q:'Đúng hay Sai?',items:[{t:'Chương trình là bản mô tả thuật toán bằng ngôn ngữ lập trình',a:'T'},{t:'Chạy đúng một bộ dữ liệu là chương trình chắc chắn đúng',a:'F'},{t:'Vòng lặp “lặp lại cho đến khi” kiểm tra điều kiện trước mỗi lần lặp',a:'T'}]}],
  key:['Chương trình tốt phải xử lí cả <b>dữ liệu sai</b>.']},

 {t:'Sửa lỗi “data”',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Sửa chương trình Nhiệm vụ 2 để chạy đúng với tình huống 8.</p>',
  qs:[{id:'v1',type:'text',q:'Mô tả cách em sửa (các khối lệnh thêm vào).',ans:'Sau khi hỏi, kiểm tra: nếu (trả lời + 0 = 0) và (trả lời ≠ 0) thì nói “Hãy nhập số” và hỏi lại; chỉ so sánh với max khi trả lời là số.'}],
  key:['Lập trình = <b>cài đặt</b> + <b>kiểm thử</b> + <b>gỡ lỗi</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 5 phút',phut:5,
  story:'<p>Từ thuật toán đến chương trình chạy đúng.</p>',
  qs:[{id:'t1',type:'single',q:'Mục đích của kiểm thử là:',opts:['Làm chương trình dài hơn','Phát hiện lỗi để sửa','Tăng tốc máy','Đổi ngôn ngữ'],ok:1},
      {id:'t2',type:'text',short:1,q:'Lỗi nào em thấy thú vị nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Kiểm thử</b> nhiều tình huống, <b>gỡ lỗi</b> đến khi chương trình đúng.']}
];

const GHIBAI={so:'Bài 16:',ten:'THỰC HÀNH: LẬP CHƯƠNG TRÌNH MÁY TÍNH',muc:[
 {step:1,h:'Cấu trúc điều khiển',it:['<b>Tuần tự</b>, <b>rẽ nhánh</b>, <b>lặp</b>.']},
 {step:2,h:'Cài đặt và kiểm thử',it:['Tạo biến (đầu vào, đầu ra, trung gian); số thập phân viết dấu <b>chấm</b> (1.5).','<b>Kiểm thử</b> nhiều tình huống, cả dữ liệu không hợp lệ.']},
 {step:3,h:'Gỡ lỗi',it:['Scratch không phân biệt số và chữ khi so sánh → cần <b>kiểm tra dữ liệu nhập</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9cautruc=function(){
  const B={tt:[['🟦 đi 50 bước','mv'],['🟪 nói "Xin chào!" trong 1 giây','say'],['🟦 đi 50 bước','mv']],
   rn:[['🟨 nếu điểm ≥ 5 thì','if'],['   🟪 nói "Đạt!"','sayT'],['🟨 nếu không thì','else'],['   🟪 nói "Cố gắng lên!"','sayF']],
   lap:[['🟨 lặp lại 4 lần','rep'],['   🟦 đi 30 bước','mv30'],['   🟦 xoay 90 độ','turn']]};
  const e=_el(_shell('Ba cấu trúc điều khiển','Chọn <b>cấu trúc</b>, (với rẽ nhánh: chọn điểm), bấm <b>🏁 Chạy</b> xem mèo thực hiện.',
   `<div class="m-t9ct"><style>.m-t9ct .w{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}.m-t9ct .bl{font:700 15px system-ui;white-space:pre;background:#fff;border:2px solid #c7d6ea;border-radius:12px;padding:10px;min-width:250px;line-height:2}
   .m-t9ct .bl div.on{background:#fde68a;border-radius:6px}.m-t9ct .stg{position:relative;width:300px;height:200px;background:#f0f9ff;border:2px solid #94a3b8;border-radius:12px;overflow:hidden}
   .m-t9ct .cat{position:absolute;font-size:40px;transition:all .45s;left:40px;top:80px}.m-t9ct .bub{position:absolute;background:#fff;border:2px solid #334155;border-radius:12px;padding:3px 8px;font-weight:700;font-size:14px;display:none;white-space:nowrap}</style>
   <div class="sim-ctl"><div><b>Cấu trúc</b><br>${_seg('c',[['tt','Tuần tự'],['rn','Rẽ nhánh'],['lap','Lặp']],'tt')}</div><div class="dd"><b>Điểm</b><br>${_seg('d',[['3','3'],['5','5'],['8','8']],'8')}</div><button class="btn acc run">🏁 Chạy</button></div>
   <div class="w"><div class="bl"></div><div class="stg"><div class="cat">🐱</div><div class="bub"></div></div></div></div>`));
  let c='tt',dv=8,busy=false;const cat=e.querySelector('.cat'),bub=e.querySelector('.bub'),bl=e.querySelector('.bl');
  const show=()=>{bl.innerHTML=B[c].map(b=>`<div>${b[0]}</div>`).join('');e.querySelector('.dd').style.visibility=c==='rn'?'visible':'hidden';};
  _wireSeg(e,(n,v)=>{if(n==='c'){c=v;show();}else dv=+v;});
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  e.querySelector('.run').onclick=async()=>{if(busy)return;busy=true;let x=40,y=80,a=0;cat.style.left=x+'px';cat.style.top=y+'px';cat.style.transform='';bub.style.display='none';const rows=bl.querySelectorAll('div');
    const hl=i=>{rows.forEach(r=>r.classList.remove('on'));if(rows[i])rows[i].classList.add('on');};
    const say=async t=>{bub.textContent=t;bub.style.left=(x+30)+'px';bub.style.top=(y-26)+'px';bub.style.display='block';FX.play('ding');await wait(900);bub.style.display='none';};
    if(c==='tt'){hl(0);x+=50;cat.style.left=x+'px';FX.play('tick');await wait(600);hl(1);await say('Xin chào!');hl(2);x+=50;cat.style.left=x+'px';FX.play('tick');await wait(600);}
    else if(c==='rn'){hl(0);await wait(600);if(dv>=5){hl(1);await say('Đạt!');}else{hl(2);await wait(400);hl(3);await say('Cố gắng lên!');}}
    else{for(let i=0;i<4;i++){hl(0);await wait(250);hl(1);x+=30*Math.round(Math.cos(a*Math.PI/180));y+=30*Math.round(Math.sin(a*Math.PI/180));cat.style.left=x+'px';cat.style.top=y+'px';FX.play('tick');await wait(500);hl(2);a+=90;cat.style.transform='rotate('+a+'deg)';await wait(500);}}
    hl(-1);busy=false;};
  show();return e;
};
SIMS_BAI.t9kiemthu=function(){
  const TC=[[50,45],[50,40],[50,30],[60,0],[40,50],[-100,45]];
  const run=(m,t,fix)=>{if(fix&&(m<=0||t<0))return'Báo lỗi: nhập lại';const d=Math.min(t,40),v=Math.max(t-40,0);return d*m+v*m*1.5;};
  const want=(m,t)=>m<=0||t<0?'Báo lỗi: nhập lại':Math.min(t,40)*m+Math.max(t-40,0)*m*1.5;
  const e=_el(_shell('Kiểm thử chương trình tính lương','Chọn <b>phiên bản chương trình</b>, bấm <b>▶ Chạy kiểm thử</b> từng tình huống (hoặc chạy tất cả). Ô đỏ là lỗi.',
   `<div class="m-t9kt"><style>.m-t9kt table{border-collapse:collapse;font:15px system-ui;width:100%;max-width:620px}.m-t9kt td,.m-t9kt th{border:1px solid #cbd5e1;padding:6px 8px;text-align:center}.m-t9kt th{background:#e2e8f0}
   .m-t9kt td.g{background:#dcfce7}.m-t9kt td.r{background:#fee2e2;font-weight:800}.m-t9kt td button{border:0;border-radius:8px;padding:4px 10px;background:#1d4e89;color:#fff;cursor:pointer}.m-t9kt .kq{font-weight:700;margin-top:8px}</style>
   <div class="sim-ctl">${_seg('v',[['1','Bản 1 (chưa kiểm tra dữ liệu)'],['2','Bản 2 (đã thêm kiểm tra muc_luong > 0)']],'1')}<button class="btn acc all">▶ Chạy tất cả</button></div>
   <table><tr><th>TH</th><th>muc_luong</th><th>tgian</th><th>Mong đợi</th><th>Chương trình cho</th><th></th></tr>${TC.map((t,i)=>`<tr data-i="${i}"><td>${i+1}</td><td>${t[0]}</td><td>${t[1]}</td><td>${want(t[0],t[1]).toLocaleString('vi-VN')}</td><td class="o">?</td><td><button>▶</button></td></tr>`).join('')}</table><p class="kq"></p></div>`));
  let v='1';const one=tr=>{const t=TC[+tr.dataset.i],o=run(t[0],t[1],v==='2'),w=want(t[0],t[1]),td=tr.querySelector('.o');td.textContent=o.toLocaleString('vi-VN');td.className='o '+(o===w?'g':'r');return o===w;};
  _wireSeg(e,(n,x)=>{v=x;e.querySelectorAll('.o').forEach(td=>{td.textContent='?';td.className='o';});e.querySelector('.kq').textContent='';});
  e.querySelectorAll('tr[data-i] button').forEach(b=>b.onclick=()=>{FX.play(one(b.closest('tr'))?'ding':'tick');});
  e.querySelector('.all').onclick=()=>{let bad=0;e.querySelectorAll('tr[data-i]').forEach(tr=>{if(!one(tr))bad++;});e.querySelector('.kq').textContent=bad?'🐞 Phát hiện '+bad+' tình huống sai: chương trình vẫn tính lương âm khi muc_luong = −100!':'✅ Qua cả 6 tình huống kiểm thử.';FX.play(bad?'tick':'sparkle');};
  return e;
};
SIMS_BAI.t9gomax=function(){
  const PRE=[['7, data, 12, 0',['7','data','12','0']],['7, 3, 12, 5, 0',['7','3','12','5','0']],['5, -3, 8, 0',['5','-3','8','0']]];
  const gt=(a,b)=>{const na=Number(a),nb=Number(b);if(!isNaN(na)&&!isNaN(nb))return na>nb;return String(a).toLowerCase()>String(b).toLowerCase();};
  const e=_el(_shell('Gỡ lỗi chương trình tìm max','Chọn <b>bộ dữ liệu</b> và <b>phiên bản</b>, bấm <b>▶ Chạy</b>. Đọc nhật kí từng lần so sánh.',
   `<div class="m-t9gm"><style>.m-t9gm .lg{font:15px Consolas,monospace;background:#0f172a;color:#e2e8f0;border-radius:12px;padding:10px;min-height:120px;line-height:1.7}.m-t9gm .lg .r{color:#fca5a5}.m-t9gm .lg .g{color:#86efac}</style>
   <div class="sim-ctl"><div><b>Dữ liệu nhập</b><br>${_seg('d',PRE.map((p,i)=>[''+i,p[0]]),'0')}</div><div><b>Phiên bản</b><br>${_seg('v',[['1','Chưa sửa'],['2','Đã sửa (kiểm tra số)']],'1')}</div><button class="btn acc run">▶ Chạy</button></div>
   <div class="lg"></div><table class="tbl sim-hist" style="margin-top:10px"><tr><th>Lần</th><th>Dữ liệu</th><th>Phiên bản</th><th>Kết quả</th></tr></table></div>`));
  const s={d:'0',v:'1'},hist=[];_wireSeg(e,(n,x)=>s[n]=x);
  e.querySelector('.run').onclick=()=>{let max=0,log=['max ← 0'];const fix=s.v==='2';
    for(const x of PRE[+s.d][1]){if(x==='0'){log.push('nhập 0 → dừng');break;}
      if(fix&&(isNaN(Number(x))||Number(x)<0)){log.push(`<span class="g">nhập "${x}" → không phải số dương, nói "Hãy nhập lại", bỏ qua</span>`);continue;}
      if(gt(x,max)){log.push(`<span class="${isNaN(Number(x))?'r':''}">nhập ${x}: ${x} > ${max}? Đúng → max ← ${x}</span>`);max=x;}else log.push(`nhập ${x}: ${x} > ${max}? Sai${isNaN(Number(max))?' <span class="r">(so sánh như chữ!)</span>':''}`);}
    const ok=!isNaN(Number(max));log.push(`<b class="${ok?'g':'r'}">Xuất: số lớn nhất là ${max}</b>`);e.querySelector('.lg').innerHTML=log.join('<br>');
    hist.unshift([PRE[+s.d][0],fix?'Đã sửa':'Chưa sửa',String(max)]);if(hist.length>6)hist.pop();histTable(e,hist,(v,j)=>j===2?(isNaN(Number(v))?'r':'g'):'');FX.play(ok?'ding':'tick');};
  return e;
};

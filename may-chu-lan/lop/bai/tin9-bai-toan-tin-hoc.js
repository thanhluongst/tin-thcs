/* Tin học 9 · Bài 15. Bài toán tin học · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: công ti tính lương tuần cho nhân viên bằng máy tính.
   Mô phỏng: t9tinhluong (Chạy thuật toán tính lương từng bước, xem giá trị biến),
   t9timmax (Thuật toán tìm số lớn nhất: nhập dãy số kết thúc bằng 0, theo dõi biến max). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Máy tính giúp gì cho doanh nghiệp?',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Mỗi tuần, phòng kế toán phải tính lương cho hàng trăm nhân viên: chấm công → <b>tính toán tiền lương</b> → duyệt → chuyển khoản. Bước nào nên giao cho máy tính?</p>',
  qs:[{id:'k1',type:'single',q:'Bước thường được giao cho máy tính:',opts:['Duyệt bảng lương','Tính toán tiền lương','Ki tên','Phỏng vấn nhân viên'],ok:1}],
  key:['Máy tính làm tốt việc <b>tính toán</b> lặp lại, nhanh, chính xác.']},

 {t:'Bài toán tính lương',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Lương tuần = <b>mức lương/giờ × số giờ</b>. 40 giờ đầu là <b>định mức</b>; giờ vượt định mức được trả <b>gấp 1,5 lần</b>. Nhập dữ liệu và chạy thuật toán từng bước.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9tinhluong'},
      {id:'h1',type:'sort',q:'Đầu vào hay đầu ra của bài toán tính lương?',cols:{c0:'Đầu vào',c1:'Đầu ra'},items:[{t:'Mức lương theo giờ',a:'c0'},{t:'Số giờ làm việc trong tuần',a:'c0'},{t:'Tiền lương tuần',a:'c1'}]},
      {id:'h2',type:'single',q:'Mức lương 50 (nghìn đồng/giờ), làm 45 giờ. Lương tuần:',opts:['2 250','2 375','2 000','3 375'],ok:1},
      {id:'h3',type:'single',q:'Đầu ra của bài toán “số n có phải số nguyên tố không”:',opts:['Số n','Thông báo n là / không là số nguyên tố','Các ước của n','Số 2'],ok:1}],
  key:['<b>Bài toán tin học</b>: xác định <b>đầu vào</b> (dữ liệu cho trước) và <b>đầu ra</b> (kết quả cần tìm).']},

 {t:'Quy trình giải bài toán tin học',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Thuật toán tìm số lớn nhất: nhập lần lượt các số dương, nhập 0 thì dừng. Thử nhiều bộ dữ liệu, kể cả nhập 0 ngay đầu tiên.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9timmax'},
      {id:'h4',type:'single',q:'Với dãy 7, 3, 12, 5, 0, biến max lần lượt là:',opts:['0 → 7 → 12','0 → 7 → 3 → 12 → 5','7 → 12 → 5','0 → 12'],ok:0},
      {id:'h5',type:'single',q:'Nhập 0 ngay lần đầu, thuật toán đưa ra:',opts:['max = 0','“Không có dữ liệu”','Lỗi','Số lớn nhất'],ok:1},
      {id:'h6',type:'match',q:'Mỗi việc thuộc bước nào của quy trình?',items:['Xác định đầu vào, đầu ra','Mô tả các bước tính','Viết chương trình Scratch','Chạy thử, sửa lỗi'],opts:['Cài đặt thuật toán','Gỡ lỗi, kiểm thử','Xác định bài toán','Xây dựng thuật toán'],ok:[2,3,0,1]}],
  key:['Quy trình: <b>xác định bài toán</b> → <b>xây dựng thuật toán</b> → <b>cài đặt</b> → <b>gỡ lỗi, kiểm thử</b>.']},

 {t:'Số nguyên tố',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Thuật toán kiểm tra n có phải số nguyên tố: thử chia n cho các số từ 2 đến n−1.</p>',
  qs:[{id:'l1',type:'tf',q:'Đúng hay Sai?',items:[{t:'n < 2 thì không phải số nguyên tố',a:'T'},{t:'Nếu n chia hết cho một số từ 2 đến n−1 thì n không phải số nguyên tố',a:'T'},{t:'9 là số nguyên tố',a:'F'},{t:'13 là số nguyên tố',a:'T'}]},
      {id:'l2',type:'single',q:'Bước “Cài đặt thuật toán” tương ứng bước nào của giải quyết vấn đề?',opts:['Tìm hiểu vấn đề','Thực hiện giải pháp','Đánh giá','Phân tích'],ok:1}],
  key:['Bài toán tin học là một <b>vấn đề</b> được giải bằng máy tính.']},

 {t:'Sắp xếp dãy số',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Bài toán sắp xếp một dãy số tăng dần.</p>',
  qs:[{id:'v1',type:'text',q:'Mô tả đầu vào, đầu ra của bài toán sắp xếp.',ans:'Đầu vào: một dãy số (VD 5, 2, 8, 1). Đầu ra: dãy đó theo thứ tự tăng dần (1, 2, 5, 8).'}],
  key:['Mọi bài toán tin học bắt đầu từ <b>đầu vào – đầu ra</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 4 phút',phut:4,
  story:'<p>Từ vấn đề thực tế → bài toán tin học → chương trình máy tính.</p>',
  qs:[{id:'t1',type:'single',q:'Bước đầu tiên khi giải bài toán tin học:',opts:['Viết chương trình','Xác định bài toán (đầu vào, đầu ra)','Gỡ lỗi','Chạy thử'],ok:1},
      {id:'t2',type:'text',short:1,q:'Kể một việc ở nhà có thể biến thành bài toán tin học.',ans:'Tự đánh giá.'}],
  key:['<b>Bài toán tin học</b>: đầu vào → thuật toán → đầu ra.']}
];

const GHIBAI={so:'Bài 15:',ten:'BÀI TOÁN TIN HỌC',muc:[
 {step:2,h:'Bài toán tin học',it:['Xác định <b>đầu vào</b> (cho trước) và <b>đầu ra</b> (cần tìm).','VD tính lương: vào mức lương, số giờ; ra tiền lương.']},
 {step:3,h:'Quy trình giải',it:[],flow:['Xác định bài toán','Xây dựng thuật toán','Cài đặt thuật toán','Gỡ lỗi, kiểm thử']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9tinhluong=function(){
  const e=_el(_shell('Chạy thuật toán tính lương','Nhập <b>mức lương</b> (nghìn đồng/giờ) và <b>số giờ</b>, bấm <b>⏭ Bước tiếp</b> để chạy từng lệnh.',
   `<div class="m-t9tl"><style>.m-t9tl .w{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}.m-t9tl ol{margin:0;padding-left:26px;font:15px Consolas,monospace;line-height:1.9;background:#fff;border:2px solid #c7d6ea;border-radius:12px;padding:8px 8px 8px 32px}
   .m-t9tl li.on{background:#fde68a;border-radius:6px}.m-t9tl li.sk{color:#94a3b8;text-decoration:line-through}.m-t9tl .vars{display:grid;grid-template-columns:auto auto;gap:4px 12px;font:15px Consolas,monospace}
   .m-t9tl .vars b{color:#1d4e89}.m-t9tl .vars span.ch{background:#bbf7d0;border-radius:4px;transition:.3s}.m-t9tl input{width:80px;font:700 16px system-ui;padding:4px}.m-t9tl .out{font:800 22px system-ui;color:#15803d;margin-top:8px}</style>
   <div class="sim-ctl"><label>muc_luong <input class="ml" type="number" value="50"></label><label>tgian_laodong <input class="tg" type="number" value="45"></label>
   <button class="btn st">⏭ Bước tiếp</button><button class="btn acc all">⏩ Chạy hết</button><button class="btn ghost rs">↺</button></div>
   <div class="w"><ol><li>Nhập muc_luong, tgian_laodong</li><li>Nếu tgian_laodong ≤ 40: tgian_dmuc ← tgian_laodong; tgian_vuot ← 0</li><li>Ngược lại: tgian_dmuc ← 40; tgian_vuot ← tgian_laodong − 40</li>
   <li>luong_dmuc ← tgian_dmuc × muc_luong</li><li>luong_vuot ← tgian_vuot × muc_luong × 1,5</li><li>tien_luong ← luong_dmuc + luong_vuot</li><li>Xuất tien_luong</li></ol>
   <div><div class="vars"></div><div class="out"></div></div></div>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>Mức lương</th><th>Số giờ</th><th>Tiền lương</th></tr></table></div>`));
  let k=0,V={};const hist=[],L=e.querySelectorAll('li'),N=['muc_luong','tgian_laodong','tgian_dmuc','tgian_vuot','luong_dmuc','luong_vuot','tien_luong'];
  const show=(chg)=>{e.querySelector('.vars').innerHTML=N.map(n=>`<b>${n}</b><span class="${chg&&chg.includes(n)?'ch':''}">${V[n]===undefined?'?':V[n].toLocaleString('vi-VN')}</span>`).join('');};
  const reset=()=>{k=0;V={};L.forEach(l=>l.className='');e.querySelector('.out').textContent='';show();};
  const step=()=>{if(k>=7)return;L.forEach(l=>l.classList.remove('on'));let c=[];const ml=+e.querySelector('.ml').value,tg=+e.querySelector('.tg').value;
    if(k===0){V.muc_luong=ml;V.tgian_laodong=tg;c=['muc_luong','tgian_laodong'];}
    else if(k===1){if(V.tgian_laodong<=40){V.tgian_dmuc=V.tgian_laodong;V.tgian_vuot=0;c=['tgian_dmuc','tgian_vuot'];L[2].classList.add('sk');}else{L[1].classList.add('sk');k=2;V.tgian_dmuc=40;V.tgian_vuot=V.tgian_laodong-40;c=['tgian_dmuc','tgian_vuot'];}}
    else if(k===2){k=3;return step();}
    else if(k===3){V.luong_dmuc=V.tgian_dmuc*V.muc_luong;c=['luong_dmuc'];}else if(k===4){V.luong_vuot=V.tgian_vuot*V.muc_luong*1.5;c=['luong_vuot'];}
    else if(k===5){V.tien_luong=V.luong_dmuc+V.luong_vuot;c=['tien_luong'];}
    else if(k===6){e.querySelector('.out').textContent='💰 Tiền lương tuần: '+V.tien_luong.toLocaleString('vi-VN')+' nghìn đồng';hist.unshift([V.muc_luong,V.tgian_laodong,V.tien_luong.toLocaleString('vi-VN')]);if(hist.length>6)hist.pop();histTable(e,hist,()=>'');FX.play('sparkle');}
    L[k].classList.add('on');k++;show(c);if(k<7)FX.play('tick');};
  e.querySelector('.st').onclick=step;e.querySelector('.rs').onclick=reset;e.querySelector('.all').onclick=()=>{if(k>=7)reset();while(k<7)step();};
  e.querySelectorAll('input').forEach(i=>i.oninput=reset);reset();return e;
};
SIMS_BAI.t9timmax=function(){
  const e=_el(_shell('Tìm số lớn nhất','Bấm số để <b>nhập lần lượt</b> (hoặc gõ). Nhập <b>0</b> để kết thúc. Theo dõi biến <b>max</b>.',
   `<div class="m-t9mx"><style>.m-t9mx .kp{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.m-t9mx .kp button{width:54px;height:48px;font:800 18px system-ui;border-radius:12px;border:2px solid #c7d6ea;background:#fff;cursor:pointer}
   .m-t9mx .kp .z{background:#fee2e2}.m-t9mx .mx{display:inline-block;font:800 34px system-ui;color:#fff;background:#1d4e89;border-radius:16px;padding:10px 22px;transition:transform .2s}.m-t9mx .mx.up{transform:scale(1.2);background:#16a34a}
   .m-t9mx .seq{font:700 18px Consolas,monospace;margin:8px 0;min-height:28px}.m-t9mx .lg{font-weight:700;min-height:24px}</style>
   <div class="kp">${[7,3,12,5,9,1,20,4].map(n=>`<button>${n}</button>`).join('')}<button class="z">0</button> <input class="ip" type="number" style="width:80px;font:700 18px system-ui" placeholder="số"> <button class="ok" style="width:auto;padding:0 12px">Nhập</button></div>
   <div>max = <span class="mx">0</span></div><div class="seq">Đã nhập: —</div><div class="lg">max ← 0. Hãy nhập số đầu tiên.</div><button class="btn ghost rs">↺ Làm lại</button>
   <table class="tbl sim-hist" style="margin-top:10px"><tr><th>Lần</th><th>Dãy nhập</th><th>Đầu ra</th></tr></table></div>`));
  let mx=0,seq=[],trace=[0],end=false;const hist=[],mxEl=e.querySelector('.mx');
  const reset=()=>{mx=0;seq=[];trace=[0];end=false;mxEl.textContent='0';e.querySelector('.seq').textContent='Đã nhập: —';e.querySelector('.lg').textContent='max ← 0. Hãy nhập số đầu tiên.';};
  const put=x=>{if(end||isNaN(x)||x<0)return;seq.push(x);e.querySelector('.seq').textContent='Đã nhập: '+seq.join(', ');const lg=e.querySelector('.lg');
    if(x===0){end=true;const out=mx===0?'“Không có dữ liệu”':'Số lớn nhất là '+mx;lg.textContent='Nhập 0 → dừng vòng lặp. Xuất: '+out+'. (max đã qua: '+trace.join(' → ')+')';
      hist.unshift([seq.join(', '),out]);if(hist.length>6)hist.pop();histTable(e,hist,()=>'');FX.play('sparkle');return;}
    if(x>mx){lg.textContent=x+' > '+mx+' → max ← '+x;mx=x;trace.push(x);mxEl.textContent=mx;mxEl.classList.add('up');setTimeout(()=>mxEl.classList.remove('up'),300);FX.play('ding');}
    else{lg.textContent=x+' không lớn hơn '+mx+' → max giữ nguyên';FX.play('tick');}};
  e.querySelectorAll('.kp button:not(.ok)').forEach(b=>b.onclick=()=>put(+b.textContent));
  e.querySelector('.ok').onclick=()=>{const i=e.querySelector('.ip');if(i.value!==''){put(+i.value);i.value='';}};e.querySelector('.rs').onclick=reset;
  return e;
};

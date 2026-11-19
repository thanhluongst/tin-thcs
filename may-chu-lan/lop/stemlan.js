/* DỰ ÁN STEM → BÀI HỌC LAN (máy chủ ghép sau window.DU_AN của stem/<dự án>/index.html).
   Quy trình 5 bước STEM (CV 3089/BGDĐT-GDTrH), tổ chức theo Nghiên cứu bài học:
   mỗi bước là một hoạt động GV chiếu – nhóm HS làm – GV quan sát việc học của HS (bảng kết quả trực tiếp) – chốt.
   Bước 4 dùng nguyên "xưởng" mô phỏng của dự án (DU_AN.xuong). */
(function(){
const D=window.DU_AN, strip=s=>String(s||'').replace(/<[^>]+>/g,'').trim();
const MON={S:['Khoa học','🔬'],T:['Công nghệ','💻'],E:['Kĩ thuật','🛠'],M:['Toán học','📐']};
const tc=(D.tieuChi||[]).map(t=>`<li>${t.t}</li>`).join('');
const tx=(id,h)=>({id,type:'text',q:h[0],ans:strip(h[1])||'Thầy cô nhận xét.'});
const quan=s=>`<div class="ncbh">👀 <b>Thầy cô quan sát:</b> ${s}</div>`;
const tiet=(D.gv&&D.gv.tiet)||[[],[]], ph=k=>{const a=[].concat(...tiet).find(x=>new RegExp('Bước '+k+'\\.').test(x[1])); return a?a[0]:'';};

/* Bước 3: dự án có "phuongAn" (một cách đúng, chấm tự động) hoặc "soSanh" (bảng so sánh, nhóm tự chọn – không chấm) */
const P3=D.buoc3.phuongAn, S3=D.buoc3.soSanh;
const PA=P3?{qs:[{id:'pa',type:'single',q:P3.tieuDe,opts:P3.o.map(o=>`<b>${o[0]}</b> – ${o[1]}`),ok:P3.d}],key:strip(P3.g[P3.d]).replace(/^✅\s*/,'')}
 :S3?{qs:[{id:'pa',type:'single',q:S3.tieuDe+' – nhóm em chọn cách nào? <span class="hint">(so theo: '+S3.tieuChi.join('; ')+')</span>',opts:S3.phuongAn.map(o=>`<b>${o[0]}</b> – ${o[1]}`)}],
   key:'Chọn giải pháp bằng cách <b>so sánh theo tiêu chí</b>: '+S3.tieuChi.join(', ')+'.'}
 :{qs:[],key:'Chọn giải pháp phù hợp nhất với tiêu chí sản phẩm.'};

BAI.ten='Dự án STEM: '+D.ten; BAI.yccd=strip(D.gv&&D.gv.yccd); BAI.stem=true;

window.STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Bước 1. Xác định vấn đề',hd:'Khởi động · STEM bước 1 · '+(ph(1)||'5 phút'),code:'STEM 1',ic:'',
  story:`<div class="stem-hero" style="--m1:${D.mau1};--m2:${D.mau2}"><div class="stem-ic">${D.bieuTuong||'🧪'}</div><div><b>${D.ten}</b><br>${D.moTa||''}</div></div>
   <p><b>Tình huống:</b> ${D.buoc1.tinhHuong}</p><p><b>Nhiệm vụ:</b> ${D.buoc1.nhiemVu}</p>
   <div class="stem-tc"><b>🎯 Sản phẩm đạt khi:</b><ol>${tc}</ol></div>`+quan('nhóm nêu đúng vấn đề, đầu vào – đầu ra chưa?'),
  qs:[tx('b1a',D.buoc1.hoi[0]),...(D.buoc1.hoi[1]?[tx('b1b',D.buoc1.hoi[1])]:[])],
  key:['Hiểu rõ <b>vấn đề</b> và <b>tiêu chí sản phẩm</b> trước khi bắt tay làm.']},
 {t:'Bước 2. Nghiên cứu kiến thức nền',hd:'Hình thành kiến thức · STEM bước 2 · '+(ph(2)||'15 phút'),code:'STEM 2',ic:'',
  story:`<p>Nhóm đọc <b>${D.buoc2.kienThuc.length} thẻ kiến thức S–T–E–M</b> rồi làm phần kiểm tra nhanh.</p><div class="stem-the">${D.buoc2.kienThuc.map(k=>`<div class="stem-k m-${k.mon}"><div class="stem-kh">${(MON[k.mon]||['',''])[1]} <span>${(MON[k.mon]||[k.mon])[0]}</span><b>${k.ten}</b></div>${k.nd}</div>`).join('')}</div>`+quan('câu nào nhiều nhóm sai → giảng lại ngay thẻ đó.'),
  qs:D.buoc2.quiz.map((z,i)=>({id:'kt'+(i+1),type:'single',q:z.q,opts:z.o,ok:z.d})),
  key:[D.buoc2.kienThuc.map(k=>`<b>${k.ten}</b>`).join(' · ')]},
 {t:'Bước 3. Đề xuất và chọn giải pháp',hd:'Hình thành kiến thức · STEM bước 3 · '+(ph(3)||'15 phút'),code:'STEM 3',ic:'',
  story:`<p>Nhóm thảo luận, <b>chọn cách làm</b>, phác thảo giải pháp và <b>phân công</b>.</p>${D.buoc3.viec?`<div class="stem-tc"><b>👥 Gợi ý phân công:</b><ul>${D.buoc3.viec.map(v=>`<li>${v}</li>`).join('')}</ul></div>`:''}`+quan('nhóm nào chọn cách chưa hợp lí, mọi bạn đều có việc chưa?'),
  qs:PA.qs.concat((D.buoc3.hoi||[]).slice(-1).map(h=>tx('b3',h))),
  key:[PA.key]},
 {t:'Bước 4. Chế tạo và thử nghiệm',hd:'Luyện tập · STEM bước 4 · '+(ph(4)||'25 phút'),code:'STEM 4',ic:'',
  story:'<p>Nhóm làm sản phẩm trong <b>xưởng mô phỏng</b>: làm – chạy thử – tìm lỗi – sửa đến khi đạt các tiêu chí (tiêu chí đạt tự sáng lên).</p>'+quan('lỗi hay gặp, cách nhóm tự sửa – ghi lại để thảo luận ở bước 5.'),
  qs:[{id:'xg',type:'sim',sim:'xuong'},
      {id:'dat',type:'multi',q:'Sản phẩm của nhóm em đã đạt những tiêu chí nào?',opts:(D.tieuChi||[]).map(t=>t.t)}],
  key:['Kĩ sư <b>thử – sai – sửa</b> nhiều lần; mỗi lần sửa một chỗ rồi chạy lại.']},
 {t:'Bước 5. Chia sẻ, đánh giá, điều chỉnh',hd:'Vận dụng · STEM bước 5 · '+(ph(5)||'15 phút'),code:'STEM 5',ic:'',
  story:`<p>2–3 nhóm trình bày sản phẩm; cả lớp <b>bình chọn</b> và góp ý theo bảng tiêu chí.</p><table class="stem-rub"><tr><th>Tiêu chí</th><th>Mức 1</th><th>Mức 2</th><th>Mức 3</th></tr>${(D.rubric||[]).map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</table>`+quan('nhóm nhận ra lỗi và cách cải tiến chưa? Ghi nhận cho buổi họp nghiên cứu bài học.'),
  qs:[...(D.rubric||[]).map((r,i)=>({id:'rb'+i,type:'single',q:'Nhóm tự đánh giá – <b>'+r[0]+'</b>',opts:['Mức 1: '+r[1],'Mức 2: '+r[2],'Mức 3: '+r[3]]})),
      ...D.buoc5.hoi.slice(0,2).map((h,i)=>tx('b5'+i,h))],
  key:['Chia sẻ để <b>học từ nhóm bạn</b>; điều chỉnh sản phẩm theo góp ý.']},
 {t:'Tổng kết',hd:'Tổng kết dự án',code:'',ic:'',story:'Cùng nhìn lại dự án: em học được gì, nhóm em làm tốt điều gì, lần sau sẽ làm khác điều gì?',
  qs:[{id:'tk',type:'text',q:'Điều em nhớ nhất sau dự án này là gì?',ans:'Tự đánh giá.'}]}
];
window.GHIBAI={so:'STEM',ten:String(D.ten).toUpperCase(),muc:[
 {step:1,h:'Vấn đề cần giải quyết',it:[strip(D.buoc1.nhiemVu)]},
 {step:2,h:'Kiến thức nền',it:D.buoc2.kienThuc.map(k=>`<b>${k.ten}</b>`)},
 {step:4,h:'Quy trình kĩ thuật',it:['<b>Thiết kế → thử → tìm lỗi → sửa</b> đến khi đạt tiêu chí.']}]};

/* Xưởng mô phỏng (chạy trên trình duyệt) */
window.SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.xuong=function(){
  const K='stemlan-'+D.id+'-'+(location.pathname.split('/')[3]||''), w=(()=>{try{return JSON.parse(localStorage.getItem(K))||{};}catch(e){return {};}})(), tcd={};
  const e=document.createElement('div'); e.className='sim stemx';
  e.innerHTML=`<div class="sim-h"><span class="sim-tag">🛠 Xưởng dự án</span><h3>${D.bieuTuong||''} ${D.ten}</h3></div>
   <div class="stem-dat">${(D.tieuChi||[]).map(t=>`<span data-k="${t.k}">⬜ ${strip(t.t)}</span>`).join('')}</div><div class="xg"></div><div class="stem-bao" aria-live="polite"></div>`;
  const bao=t=>{const b=e.querySelector('.stem-bao'); b.innerHTML=t; b.classList.add('on'); clearTimeout(bao.t); bao.t=setTimeout(()=>b.classList.remove('on'),2600);};
  const api={w,luu(){try{localStorage.setItem(K,JSON.stringify(w));}catch(x){}},bao,
    dat(k,b){b=!!b; if(tcd[k]===b) return; tcd[k]=b; const s=e.querySelector(`[data-k="${k}"]`); if(s){s.classList.toggle('ok',b); s.textContent=(b?'✅ ':'⬜ ')+s.textContent.slice(2);} if(b){bao('✓ Đạt tiêu chí'); if(window.FX) FX.play('sparkle');}},
    datHet(){return (D.tieuChi||[]).every(t=>tcd[t.k]);}};
  try{ D.xuong(e.querySelector('.xg'),api); }catch(x){ e.querySelector('.xg').textContent='Lỗi xưởng: '+x.message; }
  return e;
};
})();

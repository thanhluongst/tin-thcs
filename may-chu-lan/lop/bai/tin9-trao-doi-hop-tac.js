/* Tin học 9 · Bài 7. Trình bày thông tin trong trao đổi và hợp tác · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: nhóm An, Minh, Khoa chuẩn bị “Lược sử công cụ tính toán” cho Triển lãm tin học.
   Mô phỏng: t9chiase (4 cách dùng sơ đồ tư duy/bài trình chiếu), t9dinhkem (Đính kèm tệp vào nhánh sơ đồ tư duy). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Nhóm chuẩn bị triển lãm',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Nhóm <b>An, Minh, Khoa</b> chuẩn bị bài “Lược sử công cụ tính toán” cho Triển lãm tin học. Ba bạn ở ba nhà khác nhau. Làm sao cùng lên ý tưởng, phân công và trình bày?</p>',
  qs:[{id:'k1',type:'multi',q:'Nhóm có thể dùng công cụ nào?',opts:['Sơ đồ tư duy để lên ý tưởng, phân công','Bài trình chiếu để trình bày','Chia sẻ tệp trực tuyến để cùng sửa','Gửi thư tay cho nhau'],ok:[0,1,2]}],
  key:['<b>Sơ đồ tư duy</b> và <b>bài trình chiếu</b> giúp trao đổi, hợp tác hiệu quả.']},

 {t:'Bốn cách trao đổi, hợp tác',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Thử từng <b>cách sử dụng</b> trong mô phỏng: ai xem được, ai sửa được, có cần gặp nhau không?</p>',
  qs:[{id:'s1',type:'sim',sim:'t9chiase'},
      {id:'h1',type:'match',q:'Mỗi tình huống là cách sử dụng nào?',items:['An trình bày trước nhóm, trả lời ngay câu hỏi','An gửi đường link chỉ để cô giáo xem','Mỗi bạn tự cập nhật nhánh mình phụ trách vào lúc rảnh','Cả nhóm cùng sửa một lúc, thấy ngay thay đổi của nhau'],
       opts:['Chia sẻ để xem','Chia sẻ để cộng tác theo thời gian thực','Trình bày trực tiếp','Chia sẻ để cập nhật'],ok:[2,0,3,1]},
      {id:'h2',type:'single',q:'Cách nào giúp diễn giải toàn cảnh và trả lời câu hỏi ngay?',opts:['Trình bày trực tiếp','Chia sẻ để xem','Chia sẻ để cập nhật','Gửi tệp qua email'],ok:0}],
  key:['Bốn cách: <b>trình bày trực tiếp</b>; chia sẻ để <b>xem</b>; chia sẻ để <b>cập nhật</b>; chia sẻ để <b>cộng tác thời gian thực</b>.']},

 {t:'Đính kèm dữ liệu vào sơ đồ',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Phần mềm sơ đồ tư duy cho <b>đính kèm</b> ảnh, video, văn bản, bảng tính vào từng nhánh. Hãy giúp nhóm gắn đúng tệp vào đúng nhánh.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9dinhkem'},
      {id:'h3',type:'multi',q:'Có thể đính kèm loại dữ liệu nào vào sơ đồ tư duy?',opts:['Văn bản','Hình ảnh','Video (hoặc liên kết video)','Trang tính'],ok:[0,1,2,3]},
      {id:'h4',type:'sort',q:'Khi dùng hình ảnh, video, biểu đồ, việc nào nên làm?',cols:{c0:'Nên',c1:'Không nên'},items:[{t:'Chọn loại minh hoạ truyền tải tốt thông điệp',a:'c0'},{t:'Dùng ảnh sắc nét, nhìn rõ từ xa',a:'c0'},{t:'Chèn thật nhiều hiệu ứng rối mắt',a:'c1'},{t:'Dùng ảnh mờ, chữ nhỏ',a:'c1'},{t:'Đơn giản, rõ ràng',a:'c0'}]}],
  key:['Đính kèm <b>đúng nhánh</b> giúp sơ đồ <b>gọn</b> mà vẫn <b>đủ chi tiết</b>.','Công cụ trực quan: <b>đơn giản, rõ ràng</b>, dữ liệu <b>chất lượng</b>.']},

 {t:'Nhận xét sơ đồ của nhóm',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Quan sát sơ đồ tư duy của nhóm (Hình 7.1 SGK) sau khi đã đính kèm.</p>',
  qs:[{id:'l1',type:'tf',q:'Nhận xét về sơ đồ:',items:[{t:'Mỗi tệp đính kèm đúng nhánh nội dung',a:'T'},{t:'Sơ đồ vẫn gọn trên một trang',a:'T'},{t:'Người xem phải mở từng tệp mới thấy nhánh chính',a:'F'},{t:'Mỗi bạn có thể tự cập nhật nhánh mình phụ trách',a:'T'}]}],
  key:['Sơ đồ có đính kèm: <b>gọn</b>, <b>đủ</b>, dễ <b>phân công</b>.']},

 {t:'Sơ đồ của em',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Em muốn trưng bày nội dung gì ở Triển lãm tin học?</p>',
  qs:[{id:'v1',type:'text',q:'Ghi các nhánh chính và tệp em sẽ đính kèm (mỗi nhánh một dòng).',ans:'Ví dụ “Sổ lưu niệm 9A”: Kỉ niệm lớp 6–9 (ảnh); Thầy cô (video); Dự kiến chi phí (bảng tính).'}],
  key:['Lên ý tưởng bằng <b>sơ đồ tư duy</b>, trình bày bằng <b>bài trình chiếu</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 4 phút',phut:4,
  story:'<p>Làm việc nhóm hiệu quả = công cụ phù hợp + chia sẻ đúng cách.</p>',
  qs:[{id:'t1',type:'single',q:'Nhóm ở xa nhau, muốn cùng sửa một lúc: chọn cách nào?',opts:['Trình bày trực tiếp','Chia sẻ để xem','Chia sẻ để cộng tác theo thời gian thực','In ra giấy'],ok:2},
      {id:'t2',type:'text',short:1,q:'Em cần học thêm kĩ năng gì để hợp tác tốt hơn?',ans:'Tự đánh giá.'}],
  key:['Chọn <b>cách chia sẻ</b> phù hợp với mục đích hợp tác.']}
];

const GHIBAI={so:'Bài 7:',ten:'TRÌNH BÀY THÔNG TIN TRONG TRAO ĐỔI VÀ HỢP TÁC',muc:[
 {step:2,h:'Cách sử dụng',it:['<b>Trình bày trực tiếp</b>; chia sẻ để <b>xem</b>, để <b>cập nhật</b>, để <b>cộng tác thời gian thực</b>.']},
 {step:3,h:'Đính kèm, công cụ trực quan',it:['Đính kèm <b>văn bản, ảnh, video, trang tính</b> vào nhánh sơ đồ tư duy.','Minh hoạ <b>đơn giản, rõ ràng</b>, dữ liệu <b>sắc nét</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9chiase=function(){
  const M={tt:['🎤 Trình bày trực tiếp','Gặp mặt',['👀 Nghe, xem','👀 Nghe, xem','❓ Hỏi ngay'],'Diễn giải toàn cảnh, trả lời câu hỏi ngay.'],
   xem:['👁️ Chia sẻ để xem','Không cần gặp',['👁️ Chỉ xem','👁️ Chỉ xem','👁️ Chỉ xem'],'Người nhận xem được, không sửa được.'],
   cn:['✏️ Chia sẻ để cập nhật','Không cần gặp',['✏️ Sửa lúc rảnh','✏️ Sửa lúc rảnh','✏️ Sửa lúc rảnh'],'Mỗi người tự cập nhật phần mình, lần lượt.'],
   ct:['⚡ Cộng tác thời gian thực','Không cần gặp',['⚡ Đang sửa…','⚡ Đang sửa…','⚡ Đang sửa…'],'Cùng sửa một lúc, thấy ngay thay đổi của nhau.']};
  const e=_el(_shell('Bốn cách trao đổi, hợp tác','Chọn <b>cách sử dụng</b>, bấm <b>▶ Thử</b>, quan sát quyền của từng bạn.',
   `<div class="m-t9cs"><style>.m-t9cs .g{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin:10px 0}
   .m-t9cs .p{background:#fff;border:2px solid #dbe4f0;border-radius:14px;padding:12px;text-align:center;transition:.3s}.m-t9cs .p .i{font-size:40px}.m-t9cs .p .s{font-weight:700;color:#1d4e89;min-height:24px}
   .m-t9cs .doc{border:3px dashed #94a3b8;border-radius:14px;padding:12px;text-align:center;font-weight:700}.m-t9cs .live{animation:m9cs 1s infinite}@keyframes m9cs{50%{box-shadow:0 0 0 5px #fde68a}}</style>
   <div class="sim-ctl">${_seg('m',Object.entries(M).map(([k,v])=>[k,v[0]]),'tt')}<button class="btn acc run">▶ Thử</button></div>
   <div class="doc">🗺️ Sơ đồ “Lược sử công cụ tính toán” <span class="w"></span></div>
   <div class="g">${[['👧','An (người tạo)'],['👦','Minh'],['🧑','Khoa']].map(p=>`<div class="p"><div class="i">${p[0]}</div><b>${p[1]}</b><div class="s"></div></div>`).join('')}</div>
   <p class="kq" style="font-weight:700"></p></div>`));
  let m='tt';_wireSeg(e,(n,v)=>m=v);
  e.querySelector('.run').onclick=()=>{const x=M[m],ps=e.querySelectorAll('.p');FX.play('whoosh');e.querySelector('.w').textContent='· '+x[1];
    ps.forEach((p,i)=>{p.classList.remove('live');p.querySelector('.s').textContent=i===0?(m==='tt'?'🎤 Đang trình bày':'🔗 Đã chia sẻ'):x[2][i];if(m==='ct')p.classList.add('live');});
    e.querySelector('.kq').textContent='💡 '+x[3];FX.play('ding');};
  return e;
};
SIMS_BAI.t9dinhkem=function(){
  const B=[['pas','🧮 Máy tính cơ học – Pascal'],['bab','⚙️ Charles Babbage'],['dt','💻 Máy tính điện tử'],['tc','💰 Dự kiến thu chi']];
  const F=[['📷 Anh-Pascaline.jpg','pas'],['📄 TieuSu-Babbage.docx','bab'],['🎬 Video ENIAC (liên kết)','dt'],['📊 KinhPhi.xlsx','tc']];
  const e=_el(_shell('Đính kèm tệp vào sơ đồ tư duy','Bấm chọn một <b>tệp</b>, rồi bấm vào <b>nhánh</b> muốn đính kèm (như lệnh Insert/Attachment).',
   `<div class="m-t9dk"><style>.m-t9dk .fs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.m-t9dk .fs button{font:700 15px system-ui;padding:10px 12px;border-radius:12px;border:2px solid #cbd5e1;background:#fff;cursor:pointer}
   .m-t9dk .fs button.on{border-color:#e2932b;background:#fff7ed}.m-t9dk .fs button.used{opacity:.35;pointer-events:none}
   .m-t9dk .mm{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center}.m-t9dk .ct{background:#1d4e89;color:#fff;border-radius:50%;width:130px;height:130px;display:grid;place-items:center;text-align:center;font-weight:800;padding:8px}
   .m-t9dk .col{display:flex;flex-direction:column;gap:10px}.m-t9dk .br{border:2px solid #93c5fd;background:#eff6ff;border-radius:14px;padding:10px;cursor:pointer;font-weight:700;min-height:56px}
   .m-t9dk .br small{display:block;font-weight:600}.m-t9dk .br.ok{border-color:#16a34a;background:#f0fdf4}.m-t9dk .br.bad{animation:m9dk .4s}@keyframes m9dk{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}</style>
   <div class="fs">${F.map((f,i)=>`<button data-i="${i}">${f[0]}</button>`).join('')}</div>
   <div class="mm"><div class="col">${B.slice(0,2).map(b=>`<div class="br" data-b="${b[0]}">${b[1]}<small></small></div>`).join('')}</div><div class="ct">Triển lãm tin học</div>
   <div class="col">${B.slice(2).map(b=>`<div class="br" data-b="${b[0]}">${b[1]}<small></small></div>`).join('')}</div></div><p class="kq" style="font-weight:700;margin-top:10px">Đã đính kèm 0/4</p></div>`));
  let cur=-1,n=0;
  e.querySelectorAll('.fs button').forEach(b=>b.onclick=()=>{e.querySelectorAll('.fs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');cur=+b.dataset.i;FX.play('tick');});
  e.querySelectorAll('.br').forEach(br=>br.onclick=()=>{if(cur<0)return;const f=F[cur];
    if(f[1]===br.dataset.b){br.classList.add('ok');br.querySelector('small').innerHTML+='📎 '+f[0]+'<br>';e.querySelector(`.fs [data-i="${cur}"]`).classList.add('used');cur=-1;n++;
      e.querySelector('.kq').textContent='Đã đính kèm '+n+'/4'+(n===4?' 🎉 Sơ đồ gọn mà đủ chi tiết!':'');FX.play(n===4?'sparkle':'ding');}
    else{br.classList.remove('bad');void br.offsetWidth;br.classList.add('bad');e.querySelector('.kq').textContent='✗ Tệp này không hợp với nhánh đó, thử nhánh khác.';FX.play('tick');}});
  return e;
};

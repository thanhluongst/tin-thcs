/* Tin học 9 · Bài 17. Tin học và thế giới nghề nghiệp · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: An, Minh, Khoa cùng làm một trò chơi máy tính – mỗi bạn một vai trò nghề nghiệp.
   Mô phỏng: t9xuongame (Xưởng làm trò chơi: giao việc cho từng bạn, xem nhóm nghề),
   t9lacban (La bàn nghề nghiệp: kéo thanh sở thích – gợi ý nhóm nghề), t9doanhnghiep (Tin học trong doanh nghiệp). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Xưởng làm trò chơi',hd:'Khởi động · 7 phút',code:'1',phut:7,
  story:'<p><b>Khoa</b> phác thảo kịch bản và chuyển thành phần mềm; <b>An</b> tạo nhân vật, hình ảnh, âm thanh; <b>Minh</b> đưa trò chơi lên Internet, duy trì hoạt động. Hãy giao đúng việc cho từng bạn để hoàn thành trò chơi.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9xuongame'},
      {id:'k1',type:'match',q:'Ghép mỗi bạn với nhóm nghề phù hợp.',items:['Khoa','An','Minh'],opts:['Thiết kế đồ hoạ, đa phương tiện','Quản trị hệ thống, mạng máy tính','Phân tích và phát triển phần mềm'],ok:[2,0,1]}],
  key:['Một sản phẩm tin học cần <b>nhiều nghề</b> phối hợp: phát triển phần mềm, thiết kế, quản trị hệ thống…']},

 {t:'Hai hướng nghề tin học',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Nghề tin học chia hai hướng: <b>Khoa học máy tính</b> và <b>Tin học ứng dụng</b>. Kéo các thanh sở thích của em để “la bàn” gợi ý nhóm nghề.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9lacban'},
      {id:'h1',type:'sort',q:'Xếp nghề vào hướng phù hợp (Hình 17.1).',cols:{c0:'Khoa học máy tính',c1:'Tin học ứng dụng'},items:[{t:'Nhà lập trình các ứng dụng',a:'c0'},{t:'Nhà khoa học dữ liệu',a:'c0'},{t:'Nhà quản trị cơ sở dữ liệu',a:'c0'},{t:'Nhà thiết kế trò chơi máy tính',a:'c1'},{t:'Nhà thiết kế trang web',a:'c1'},{t:'Nghệ sĩ kĩ thuật số',a:'c1'}]},
      {id:'h2',type:'single',q:'Đặc trưng của hướng Tin học ứng dụng:',opts:['Nghiên cứu lí thuyết thông tin và thuật toán','Dùng công cụ CNTT giải quyết vấn đề thực tế trong các lĩnh vực khác','Chỉ làm ở công ti phần mềm','Chỉ dành cho người giỏi toán'],ok:1}],
  key:['<b>Khoa học máy tính</b>: nghiên cứu thông tin, thuật toán; tạo phần mềm, CSDL, mạng.','<b>Tin học ứng dụng</b>: dùng công cụ CNTT giải quyết vấn đề thực tế (đồ hoạ, đa phương tiện…).']},

 {t:'Tin học trong doanh nghiệp',hd:'Hình thành kiến thức · Hoạt động 2 · 9 phút',code:'2.2',phut:9,
  story:'<p>Không chỉ công ti phần mềm, bệnh viện, ngân hàng, trường học, nông trại… đều cần người làm tin học. Bấm vào từng nơi để xem.</p>',
  qs:[{id:'s3',type:'sim',sim:'t9doanhnghiep'},
      {id:'h3',type:'sort',q:'Công việc tập trung nhiều hơn theo hướng nào?',cols:{c0:'Khoa học máy tính',c1:'Tin học ứng dụng'},items:[{t:'Phát triển hệ điều hành mới ở công ti phần mềm',a:'c0'},{t:'Thiết kế áp phích quảng cáo cho siêu thị',a:'c1'},{t:'Nghiên cứu thuật toán nén dữ liệu',a:'c0'},{t:'Làm video bài giảng cho trường học',a:'c1'}]}],
  key:['Hướng <b>KHMT</b> tập trung ở doanh nghiệp tin học; <b>Tin học ứng dụng</b> có ở <b>mọi lĩnh vực</b>.']},

 {t:'Nữ giới và tin học',hd:'Hình thành kiến thức · Hoạt động 3 · 6 phút',code:'2.3',phut:6,
  story:'<p>An hỏi: <i>“Nghề tin học có hợp với con gái không?”</i></p>',
  qs:[{id:'h4',type:'single',q:'Phát biểu đúng:',opts:['Nghề tin học chỉ hợp với nam','Nữ chỉ làm được thiết kế','Nghề phù hợp phụ thuộc năng lực, sở thích, nhu cầu, không phụ thuộc giới tính','Nữ không học được lập trình'],ok:2},
      {id:'h5',type:'text',q:'Nêu một nghề tin học mà lao động nữ có ưu thế và giải thích.',ans:'Ví dụ: kiểm thử phần mềm (cẩn thận, tỉ mỉ), thiết kế đồ hoạ (thẩm mĩ), phân tích yêu cầu (giao tiếp tốt).'}],
  key:['Nghề tin học phù hợp với <b>mọi người</b> có năng lực và đam mê.']},

 {t:'Nghề em quan tâm',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Chọn một nghề tin học em quan tâm.</p>',
  qs:[{id:'l1',type:'multi',q:'Để làm nghề tin học, em nên chuẩn bị:',opts:['Học tốt Toán, Tin học','Học tiếng Anh','Rèn tư duy giải quyết vấn đề, làm việc nhóm','Chỉ cần chơi game nhiều'],ok:[0,1,2]},
      {id:'l2',type:'single',q:'Quản trị hồ sơ bệnh án điện tử ở bệnh viện là công việc tin học trong lĩnh vực:',opts:['Giáo dục','Y tế','Nông nghiệp','Giao thông'],ok:1}],
  key:['Chuẩn bị từ bây giờ: <b>Toán, Tin, tiếng Anh</b>, kĩ năng <b>giải quyết vấn đề</b>.']},

 {t:'Tổng kết',hd:'Tổng kết · 6 phút',phut:6,
  story:'<p>Thế giới số cần rất nhiều người làm tin học – có thể là em!</p>',
  qs:[{id:'t1',type:'single',q:'Nhà thiết kế đa phương tiện thuộc hướng:',opts:['Khoa học máy tính','Tin học ứng dụng','Không thuộc tin học','Cả hai đều sai'],ok:1},
      {id:'t2',type:'text',short:1,q:'Nghề tin học em mơ ước? Vì sao?',ans:'Tự đánh giá.'}],
  key:['Hai hướng: <b>Khoa học máy tính</b> và <b>Tin học ứng dụng</b>; nghề tin học có ở mọi lĩnh vực.']}
];

const GHIBAI={so:'Bài 17:',ten:'TIN HỌC VÀ THẾ GIỚI NGHỀ NGHIỆP',muc:[
 {step:2,h:'Hai hướng nghề',it:['<b>Khoa học máy tính</b>: phát triển phần mềm, CSDL, mạng máy tính.','<b>Tin học ứng dụng</b>: thiết kế đồ hoạ, đa phương tiện; dùng CNTT trong các lĩnh vực.']},
 {step:3,h:'Nơi làm việc',it:['Doanh nghiệp tin học và <b>mọi lĩnh vực</b> khác: y tế, giáo dục, ngân hàng…','Nghề phù hợp theo <b>năng lực, sở thích</b>, không theo giới tính.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9xuongame=function(){
  const W=[['📝 Viết kịch bản trò chơi','k'],['💻 Lập trình phần mềm','k'],['🎨 Vẽ nhân vật, cảnh nền','a'],['🎵 Làm âm thanh, nhạc nền','a'],['🌐 Đưa trò chơi lên máy chủ Internet','m'],['🛡️ Theo dõi, bảo mật, sao lưu','m']];
  const P={k:['🧑 Khoa','Phân tích và phát triển phần mềm'],a:['👧 An','Thiết kế đồ hoạ, đa phương tiện'],m:['👦 Minh','Quản trị hệ thống, mạng máy tính']};
  const e=_el(_shell('Xưởng làm trò chơi','Chọn một <b>công việc</b>, rồi bấm vào <b>bạn</b> phù hợp. Giao đủ 6 việc để phát hành trò chơi!',
   `<div class="m-t9xg"><style>.m-t9xg .js{display:flex;flex-wrap:wrap;gap:8px}.m-t9xg .js button{font:700 15px system-ui;padding:10px 12px;border-radius:12px;border:2px solid #cbd5e1;background:#fff;cursor:pointer}
   .m-t9xg .js button.on{border-color:#e2932b;background:#fff7ed}.m-t9xg .js button.done{display:none}.m-t9xg .ps{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:12px}
   .m-t9xg .p{border:2px solid #bfdbfe;background:#eff6ff;border-radius:14px;padding:10px;cursor:pointer;min-height:120px}.m-t9xg .p b{font-size:18px}.m-t9xg .p small{display:block;color:#475569}
   .m-t9xg .p ul{margin:6px 0 0;padding-left:18px;font-size:14px}.m-t9xg .p.shake{animation:m9xg .4s}@keyframes m9xg{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
   .m-t9xg .pr{height:16px;background:#e5e7eb;border-radius:99px;overflow:hidden;margin:10px 0}.m-t9xg .pr i{display:block;height:100%;width:0;background:linear-gradient(90deg,#2f6fb5,#16a34a);transition:width .4s}</style>
   <div class="js">${W.map((w,i)=>`<button data-i="${i}">${w[0]}</button>`).join('')}</div><div class="pr"><i></i></div><div class="kq" style="font-weight:700"></div>
   <div class="ps">${Object.entries(P).map(([k,p])=>`<div class="p" data-k="${k}"><b>${p[0]}</b><small class="ng">Nhóm nghề: ?</small><ul></ul></div>`).join('')}</div></div>`));
  let cur=-1,n=0;
  e.querySelectorAll('.js button').forEach(b=>b.onclick=()=>{e.querySelectorAll('.js button').forEach(x=>x.classList.remove('on'));b.classList.add('on');cur=+b.dataset.i;FX.play('tick');});
  e.querySelectorAll('.p').forEach(p=>p.onclick=()=>{if(cur<0)return;const w=W[cur];
    if(w[1]===p.dataset.k){p.querySelector('ul').insertAdjacentHTML('beforeend','<li>'+w[0]+'</li>');p.querySelector('.ng').textContent='Nhóm nghề: '+P[w[1]][1];e.querySelector(`.js [data-i="${cur}"]`).classList.add('done');cur=-1;n++;
      e.querySelector('.pr i').style.width=(n/W.length*100)+'%';e.querySelector('.kq').textContent=n===W.length?'🎮 Trò chơi đã phát hành! Cả ba nghề đều cần thiết.':'Tiến độ '+n+'/'+W.length;FX.play(n===W.length?'win':'ding');}
    else{p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake');e.querySelector('.kq').textContent='✗ Việc này hợp với bạn khác hơn.';FX.play('tick');}});
  return e;
};
SIMS_BAI.t9lacban=function(){
  const S=[['Thích giải toán, tư duy logic','k'],['Thích lập trình, tìm hiểu thuật toán','k'],['Thích vẽ, thiết kế, chụp ảnh','a'],['Thích làm video, âm nhạc','a'],['Thích dùng máy tính giúp việc ở các ngành khác','a']];
  const G={k:['🔬 Khoa học máy tính','Nhà lập trình, nhà khoa học dữ liệu, nhà bảo mật, quản trị CSDL','#2563eb'],a:['🎨 Tin học ứng dụng','Thiết kế trò chơi, thiết kế web, nghệ sĩ kĩ thuật số, thiết kế đa phương tiện','#e2932b']};
  const e=_el(_shell('La bàn nghề nghiệp','Kéo mỗi thanh theo <b>mức độ em thích</b> (0–5). Kim la bàn chỉ về hướng nghề gần với em.',
   `<div class="m-t9lb"><style>.m-t9lb .w{display:flex;flex-wrap:wrap;gap:20px;align-items:center}.m-t9lb .sl label{display:grid;grid-template-columns:240px 1fr 24px;gap:8px;align-items:center;margin:6px 0;font-weight:600}
   .m-t9lb .kq{border-radius:14px;padding:12px;font-weight:700;max-width:420px}.m-t9lb .nd{transition:transform .5s;transform-origin:100px 100px}</style>
   <div class="w"><div class="sl">${S.map((s,i)=>`<label>${s[0]}<input type="range" min="0" max="5" value="2" data-i="${i}"><span>2</span></label>`).join('')}</div>
   <svg viewBox="0 0 200 200" width="190"><circle cx="100" cy="100" r="92" fill="#fff" stroke="#334155" stroke-width="4"/><text x="18" y="105" font-size="13" font-weight="800" fill="#2563eb">KHMT</text><text x="140" y="105" font-size="13" font-weight="800" fill="#e2932b">THƯD</text>
   <polygon class="nd" points="100,22 108,100 100,110 92,100" fill="#dc2626"/><circle cx="100" cy="100" r="8" fill="#334155"/></svg></div><div class="kq"></div></div>`));
  const v=S.map(()=>2);let last='';
  const up=()=>{let k=0,a=0;S.forEach((s,i)=>{if(s[1]==='k')k+=v[i];else a+=v[i]*2/3;});const ang=Math.max(-80,Math.min(80,(a-k)*12));e.querySelector('.nd').style.transform='rotate('+ang+'deg)';
    const g=Math.abs(a-k)<0.7?null:(k>a?'k':'a'),kq=e.querySelector('.kq');
    if(!g){kq.style.background='#f1f5f9';kq.innerHTML='⚖️ Em quan tâm cả hai hướng! Hãy tìm hiểu thêm cả hai.';}
    else{kq.style.background=G[g][2]+'22';kq.innerHTML=G[g][0]+'<br><small>Nghề gợi ý: '+G[g][1]+'</small>';}if((g||'')!==last){FX.play('ding');last=g||'';}};
  e.querySelectorAll('input').forEach(x=>x.oninput=()=>{v[+x.dataset.i]=+x.value;x.nextElementSibling.textContent=x.value;up();});up();return e;
};
SIMS_BAI.t9doanhnghiep=function(){
  const D=[['💻','Công ti phần mềm',[['Lập trình ứng dụng','k'],['Phân tích, thiết kế hệ thống','k'],['Kiểm thử phần mềm','k']]],['🏥','Bệnh viện',[['Quản trị hồ sơ bệnh án điện tử','a'],['Vận hành máy chụp cắt lớp, xử lí ảnh y tế','a']]],
   ['🏦','Ngân hàng',[['Bảo mật hệ thống giao dịch','k'],['Quản trị cơ sở dữ liệu khách hàng','k'],['Thiết kế giao diện ứng dụng ngân hàng','a']]],['🏫','Trường học',[['Làm video, bài giảng điện tử','a'],['Quản trị mạng máy tính phòng tin học','a']]],
   ['🌾','Nông trại công nghệ cao',[['Theo dõi cảm biến, tưới tiêu tự động','a'],['Phân tích dữ liệu mùa vụ','a']]],['📺','Đài truyền hình',[['Dựng phim, kĩ xảo đồ hoạ','a'],['Quản trị hệ thống phát sóng số','a']]]];
  const e=_el(_shell('Tin học trong doanh nghiệp','Bấm vào từng <b>nơi làm việc</b> để xem các công việc tin học ở đó và hướng nghề tương ứng.',
   `<div class="m-t9dn"><style>.m-t9dn .g{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}.m-t9dn .g button{border:2px solid #dbe4f0;background:#fff;border-radius:14px;padding:12px;cursor:pointer;font-weight:700}
   .m-t9dn .g button span{display:block;font-size:38px}.m-t9dn .g button.on{border-color:#1d4e89;background:#e7eff9}.m-t9dn .g button.seen:after{content:' ✓';color:#16a34a}
   .m-t9dn .ds{margin-top:12px;display:flex;flex-wrap:wrap;gap:8px}.m-t9dn .ds div{border-radius:12px;padding:10px 12px;font-weight:700;animation:m9dn .35s}.m-t9dn .k{background:#dbeafe}.m-t9dn .a{background:#ffedd5}
   @keyframes m9dn{from{opacity:0;transform:scale(.9)}}</style><div class="g">${D.map((d,i)=>`<button data-i="${i}"><span>${d[0]}</span>${d[1]}</button>`).join('')}</div><div class="ds"></div><p class="kq" style="font-weight:700"></p></div>`));
  const seen=new Set();
  e.querySelectorAll('.g button').forEach(b=>b.onclick=()=>{const d=D[+b.dataset.i];e.querySelectorAll('.g button').forEach(x=>x.classList.remove('on'));b.classList.add('on','seen');seen.add(b.dataset.i);
    e.querySelector('.ds').innerHTML=d[2].map(j=>`<div class="${j[1]}">${j[0]}<br><small>${j[1]==='k'?'🔬 Khoa học máy tính':'🎨 Tin học ứng dụng'}</small></div>`).join('');
    e.querySelector('.kq').textContent=seen.size===D.length?'🎉 Nơi nào cũng cần người làm tin học!':'Đã khám phá '+seen.size+'/'+D.length+' nơi';FX.play(seen.size===D.length?'sparkle':'ding');});
  return e;
};

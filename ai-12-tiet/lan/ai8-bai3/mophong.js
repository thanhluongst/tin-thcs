/* Phòng thí nghiệm mô phỏng (kiểu PhET) – Bài 3 lớp 8. Mỗi mô phỏng chạy riêng trên từng máy. */
const SIMCACHE={};
function _el(h){const d=document.createElement('div'); d.innerHTML=h.trim(); return d.firstElementChild;}
function _seg(n,opts,v){return `<div class="sseg" data-n="${n}">${opts.map(([k,l])=>`<button type="button" data-v="${k}" class="${k===v?'on':''}">${l}</button>`).join('')}</div>`;}
function _wireSeg(root,cb){root.querySelectorAll('.sseg').forEach(g=>g.querySelectorAll('button').forEach(b=>b.onclick=()=>{g.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on'); if(window.FX) FX.play('tick'); cb(g.dataset.n,b.dataset.v);}));}
function _shell(t,guide,body){return `<div class="sim"><div class="sim-h"><span class="sim-tag">🔬 Phòng thí nghiệm mô phỏng</span><h3>${t}</h3></div><p class="sim-guide">${guide}</p>${body}<p class="sim-note">Mô phỏng chỉ để minh hoạ, các con số là giả định.</p></div>`;}
function histTable(e,hist,cls){const t=e.querySelector('.sim-hist'); const head=t.querySelector('tr').outerHTML;
  t.innerHTML=head+hist.map((h,k)=>`<tr><td>${hist.length-k}</td>${h.map((v,j)=>`<td class="${cls(v,j)}">${v}</td>`).join('')}</tr>`).join('');}
function mountSims(root){root.querySelectorAll('.simslot').forEach(s=>{const id=s.dataset.sim; if(!SIMS[id]) return; let e=SIMCACHE[id]; if(!e){e=SIMS[id](); SIMCACHE[id]=e;} s.replaceWith(e);});}

const SIMS={
/* 1. Dây chuyền bài làm */
chain(){
  const ERR={low:.45,mid:.25,high:.10}, LBL={low:'Thấp',mid:'Trung bình',high:'Cao'};
  const st={q:'mid',chk:'no',busy:false,hist:[]};
  const X=[70,270,470,670];
  const e=_el(_shell('Dây chuyền bài làm: lỗi đi từ đâu, chặn ở đâu?',
   'Chọn chất lượng dữ liệu huấn luyện của công ty và việc Tuấn có kiểm tra bài hay không, rồi bấm <b>Chạy 20 bài</b>. Chấm <span style="color:#c2413b">●</span> đỏ là bài có thông tin sai, <span style="color:#1f8a5b">●</span> xanh là bài đúng hoặc đã được sửa. Thử nhiều cách và so sánh trong bảng.',
   `<div class="sim-ctl"><div><label>Dữ liệu huấn luyện của công ty</label>${_seg('q',[['low','Thấp'],['mid','Trung bình'],['high','Cao']],'mid')}</div>
     <div><label>Tuấn kiểm tra lại trước khi nộp?</label>${_seg('chk',[['no','Không'],['yes','Có – đối chiếu sách']],'no')}</div>
     <div style="align-self:end"><button type="button" class="btn acc run">▶ Chạy 20 bài</button></div></div>
    <svg viewBox="0 0 740 230" class="sim-svg">
     <defs><linearGradient id="lane" x1="0" x2="1"><stop offset="0" stop-color="#e7eff9"/><stop offset="1" stop-color="#fdf2e3"/></linearGradient></defs>
     <rect x="40" y="96" width="660" height="36" rx="18" fill="url(#lane)"/>
     ${[['Công ty X','huấn luyện','🏢'],['Chatbot','viết bài','🤖'],['Tuấn','kiểm tra?','🧑‍🎓'],['Cô giáo','nhận bài','👩‍🏫']].map((s,k)=>`<g transform="translate(${X[k]},0)"><circle cx="0" cy="114" r="34" fill="#fff" stroke="#1d4e89" stroke-width="3"/><text x="0" y="124" text-anchor="middle" font-size="28">${s[2]}</text><text x="0" y="178" text-anchor="middle" font-size="16" font-weight="700" fill="#16233a">${s[0]}</text><text x="0" y="198" text-anchor="middle" font-size="13" fill="#6b778c">${s[1]}</text></g>`).join('')}
     <g class="dots"></g><text class="shield" x="470" y="66" text-anchor="middle" font-size="14" font-weight="700" fill="#1f8a5b" opacity="0">🛡 Tuấn đối chiếu sách, sửa lỗi</text>
    </svg>
    <div class="sim-cnt"><div><b class="c1">0</b>bài sai chatbot tạo ra</div><div><b class="c2">0</b>bài sai Tuấn phát hiện, sửa</div><div class="bad"><b class="c3">0</b>bài sai đến tay cô giáo</div></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Dữ liệu</th><th>Tuấn kiểm tra</th><th>Sai do chatbot</th><th>Tuấn sửa</th><th>Sai đến cô giáo</th></tr><tr class="empty"><td colspan="6">Chưa chạy lần nào.</td></tr></table>`));
  const g=e.querySelector('.dots');
  _wireSeg(e,(n,v)=>{st[n]=v;});
  e.querySelector('.run').onclick=()=>{
    if(st.busy) return; st.busy=true; g.innerHTML=''; if(window.FX) FX.play('whoosh'); const N=20, err=ERR[st.q], chk=st.chk==='yes';
    e.querySelector('.shield').setAttribute('opacity',chk?1:0);
    const items=[...Array(N)].map((_,i)=>{const bad=Math.random()<err; const fixed=bad&&chk&&Math.random()<.9;
      const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('r',7); c.setAttribute('cy',114+((i%5)-2)*5); c.setAttribute('cx',X[0]); c.setAttribute('fill','#9aa8bc'); g.appendChild(c); return {c,bad,fixed,d:i*110};});
    let c1=0,c2=0,c3=0; const T0=performance.now(), DUR=2600;
    const tick=t=>{let done=0;
      items.forEach(it=>{const p=Math.min(1,Math.max(0,(t-T0-it.d)/DUR)); const x=X[0]+(X[3]-X[0])*p; it.c.setAttribute('cx',x);
        let col='#9aa8bc'; if(x>=X[1]) col=it.bad?'#c2413b':'#1f8a5b'; if(x>=X[2]&&it.fixed) col='#1f8a5b'; it.c.setAttribute('fill',col); if(p>=1) done++;});
      if(done<items.length) requestAnimationFrame(tick); else {
        c1=items.filter(i=>i.bad).length; c2=items.filter(i=>i.fixed).length; c3=c1-c2;
        e.querySelector('.c1').textContent=c1; e.querySelector('.c2').textContent=c2; e.querySelector('.c3').textContent=c3;
        st.hist.unshift([LBL[st.q],chk?'Có':'Không',c1,c2,c3]); st.hist=st.hist.slice(0,6);
        histTable(e,st.hist,(v,j)=>j===4?(v?'r':'g'):'');
        st.busy=false; if(window.FX) FX.play(c3?'ding':'win');}};
    requestAnimationFrame(tick);
  };
  return e;
},
/* 2. Bảng điều khiển chatbot thư viện */
panel(){
  const st={data:'du',filter:'on',notice:'on',q:'ro',check:'co'}; const seen=new Set();
  const e=_el(_shell('Bảng điều khiển chatbot thư viện: ai bấm nút nào?',
   'Bên trái là các nút của <b>người phát triển (Công ty X)</b>, bên phải là các nút của <b>người dùng (bạn Lan)</b>. Thay đổi từng nút và quan sát câu trả lời của chatbot, bài thuyết trình của Lan thay đổi thế nào. Khám phá đủ 5 nút.',
   `<div class="two" style="gap:14px">
     <div class="sim-role dev"><h4>🏢 Người phát triển – Công ty X</h4>
      <label>Dữ liệu sách dùng để huấn luyện</label>${_seg('data',[['du','Đầy đủ, cập nhật'],['thieu','Thiếu, cũ']],'du')}
      <label>Bộ lọc nội dung theo lứa tuổi</label>${_seg('filter',[['on','Bật'],['off','Tắt']],'on')}
      <label>Thông báo chatbot lưu dữ liệu gì</label>${_seg('notice',[['on','Có thông báo'],['off','Không thông báo']],'on')}</div>
     <div class="sim-role user"><h4>🧑‍🎓 Người dùng – bạn Lan</h4>
      <label>Câu hỏi Lan gửi</label>${_seg('q',[['ro','Rõ ràng, cụ thể'],['mo','Mơ hồ']],'ro')}
      <label>Lan đối chiếu với danh mục thư viện?</label>${_seg('check',[['co','Có đối chiếu'],['khong','Không']],'co')}
      <div class="disc">Đã khám phá: <b class="dn">0</b>/5 nút</div></div></div>
    <div class="two" style="gap:14px;margin-top:12px"><div class="chat"></div><div class="slide"></div></div>`));
  const render=()=>{
    const qtxt=st.q==='ro'?'Gợi ý giúp mình 3 cuốn sách về lịch sử địa phương có trong thư viện trường.':'Có sách gì hay không?';
    let books=[['Đất và người Nhơn Mỹ','ok'],['Lịch sử vùng đất Cần Thơ','ok']];
    if(st.data==='thieu') books.push(['Bí mật vùng sông nước (không có trong thư viện)','miss']); else books.push(['Địa chí Phong Điền','ok']);
    let note='';
    if(st.q==='mo'){ if(st.filter==='off') books.push(['Truyện kinh dị “Đêm rùng rợn” (chưa phù hợp lứa tuổi)','bad']); else note='<div class="sys">🛡 Bộ lọc lứa tuổi đã chặn 1 gợi ý không phù hợp.</div>'; }
    e.querySelector('.chat').innerHTML=`<div class="chat-h">💬 Chatbot thư viện</div>${st.notice==='on'?'<div class="sys">🔔 Chatbot lưu câu hỏi của bạn 30 ngày để cải thiện dịch vụ.</div>':'<div class="sys warn">❓ Không có thông báo nào về việc lưu dữ liệu của bạn.</div>'}
      <div class="bub u">${qtxt}</div><div class="bub b">${st.q==='mo'?'Bạn có thể tham khảo:':'Mình gợi ý:'}<ul>${books.map(([t,k])=>`<li class="${k}">${t}</li>`).join('')}</ul></div>${note}`;
    const used=st.check==='co'?books.filter(b=>b[1]==='ok'):books;
    e.querySelector('.slide').innerHTML=`<div class="chat-h">📊 Bài thuyết trình của Lan – trang “Sách tham khảo”</div><ul class="sl">${used.map(([t,k])=>`<li class="${k}">${k==='ok'?'✓':'✗'} ${t}</li>`).join('')}</ul>
      <div class="sys ${used.some(b=>b[1]!=='ok')?'warn':'okc'}">${used.some(b=>b[1]!=='ok')?'⚠ Bài của Lan có sách sai hoặc chưa phù hợp. Lan quyết định đưa vào nên Lan chịu trách nhiệm về bài của mình.':st.check==='co'&&books.some(b=>b[1]!=='ok')?'✓ Lan đối chiếu danh mục nên đã bỏ được gợi ý sai.':'✓ Danh sách sách phù hợp.'}</div>`;
    e.querySelector('.dn').textContent=seen.size;
  };
  _wireSeg(e,(n,v)=>{st[n]=v; seen.add(n); render();}); render(); return e;
},
/* 3. Cân trách nhiệm */
scale(){
  const CASES={
   A:{t:'Thẻ A – Ảnh giả mạo',tg:[['post','Bạn K đăng ảnh ghép lên nhóm lớp',1],['share','Các bạn khác chia sẻ tiếp ảnh',0],['warn','Ứng dụng có cảnh báo, chặn ghép mặt người thật khi chưa đồng ý',0]],
     w:s=>({'Bạn K (người sử dụng)':s.post?3:1,'Bạn chia sẻ tiếp (người sử dụng)':s.share?2:0,'Nhà cung cấp ứng dụng':s.warn?0:1}),harm:s=>(s.post?2:0)+(s.share?3:0)+(s.warn?0:1)},
   B:{t:'Thẻ B – Chatbot đưa tin sai',tg:[['verify','Nhà cung cấp mời bác sĩ kiểm tra nội dung trước khi đưa lên',0],['fix','Nhà cung cấp sửa ngay khi nhận phản ánh',0],['share','Người dùng chia sẻ lời khuyên cho người thân mà không hỏi bác sĩ',0]],
     w:s=>({'Nhà cung cấp chatbot':(s.verify?0:2)+(s.fix?0:2),'Người dùng chia sẻ tiếp':s.share?2:0}),harm:s=>(s.verify?0:2)+(s.fix?0:2)+(s.share?2:0)},
   C:{t:'Thẻ C – Ứng dụng làm lộ dữ liệu',tg:[['consent','Công ty thông báo, xin đồng ý trước khi lưu ảnh',0],['protect','Công ty mã hoá, bảo vệ dữ liệu',0],['school','Nhà trường rà soát ứng dụng trước khi cho học sinh dùng',0]],
     w:s=>({'Công ty (phát triển, cung cấp)':(s.consent?0:2)+(s.protect?0:3),'Nhà trường':s.school?0:1,'Học sinh dùng ứng dụng':0}),harm:s=>(s.consent?0:1)+(s.protect?0:4)+(s.school?0:1)}};
  const st={c:'A',A:{post:1,share:0,warn:0},B:{verify:0,fix:0,share:0},C:{consent:0,protect:0,school:0}};
  const e=_el(_shell('Cân trách nhiệm: thay đổi hành vi, cân thay đổi thế nào?',
   'Chọn một thẻ tình huống. Bật hoặc tắt từng hành vi và quan sát: cột của bên nào cao lên, thấp xuống? Mức hậu quả thay đổi ra sao? Còn cột của <b>công cụ AI</b> thì sao?',
   `<div class="tabs simtabs">${Object.keys(CASES).map(k=>`<button type="button" data-k="${k}">${CASES[k].t}</button>`).join('')}</div><div class="two" style="gap:14px"><div class="tgs"></div><div class="pans"></div></div>`));
  const render=()=>{const C=CASES[st.c], s=st[st.c];
    e.querySelectorAll('.simtabs button').forEach(b=>b.classList.toggle('on',b.dataset.k===st.c));
    e.querySelector('.tgs').innerHTML=C.tg.map(([k,l])=>`<label class="tgl"><input type="checkbox" data-k="${k}" ${s[k]?'checked':''}><span>${l}</span></label>`).join('');
    const w=C.w(s), mx=6, hm=C.harm(s);
    e.querySelector('.pans').innerHTML=`<div class="pan-h">Mức độ liên quan đến hậu quả (minh hoạ)</div>`+Object.entries(w).map(([n,v])=>`<div class="pan"><span>${n}</span><span class="tr"><i style="width:${v/mx*100}%"></i></span><b>${v}</b></div>`).join('')+
      `<div class="pan ai"><span>🤖 Công cụ AI</span><span class="tr"><i style="width:0"></i></span><b>0</b></div><p class="hint">Công cụ AI không có quyết định riêng nên không “chịu trách nhiệm”.</p>
      <div class="harm"><span>Mức hậu quả</span><span class="tr"><i style="width:${hm/6*100}%;background:${hm>=4?'#c2413b':hm>=2?'#e2932b':'#1f8a5b'}"></i></span><b>${hm>=4?'Nặng':hm>=2?'Vừa':'Nhẹ'}</b></div>`;
    e.querySelectorAll('.tgs input').forEach(i=>i.onchange=()=>{s[i.dataset.k]=i.checked?1:0; if(window.FX) FX.play('tick'); render();});
  };
  e.querySelectorAll('.simtabs button').forEach(b=>b.onclick=()=>{st.c=b.dataset.k; render();}); render(); return e;
},
/* 4. Máy đo minh bạch */
trans(){
  const IT=[['phan','Ghi dùng AI ở phần nào','Em dùng AI ở phần nào?','Dạ, em nhờ chatbot gợi ý dàn ý ạ.'],['cong','Ghi tên công cụ AI đã dùng','Em dùng công cụ gì?','Dạ, chatbot thầy cô hướng dẫn ạ.'],['nguon','Ghi nguồn đã kiểm tra','Số liệu năm xây dựng em kiểm tra ở đâu?','Dạ, em đối chiếu sách lịch sử địa phương trang 12 ạ.'],['tu','Ghi phần em tự làm','Phần nào là của em?','Dạ, em tự viết nội dung và chọn ảnh ạ.']];
  const st={phan:0,cong:0,nguon:0,tu:0,checked:0};
  const e=_el(_shell('Máy đo minh bạch: bản khai báo trả lời được câu hỏi nào?',
   'Đánh dấu những mục em ghi trong bản khai báo. Cô giáo sẽ hỏi 4 câu: bản khai báo trả lời được câu nào? Thử thêm trường hợp bài có số liệu sai mà chưa kiểm tra.',
   `<div class="two" style="gap:14px"><div><div class="tgs">${IT.map(([k,l])=>`<label class="tgl"><input type="checkbox" data-k="${k}"><span>${l}</span></label>`).join('')}</div>
     <label style="display:block;margin-top:10px;font-weight:600">Số liệu năm xây dựng do AI đưa ra</label>${_seg('checked',[['0','Chưa kiểm tra'],['1','Đã đối chiếu, sửa đúng']],'0')}
     <div class="gauge"><div class="gl">Mức minh bạch</div><div class="tr"><i></i></div><b class="gv">0/4</b></div></div>
     <div class="dlg"></div></div>`));
  const render=()=>{const n=IT.filter(([k])=>st[k]).length;
    e.querySelector('.gauge i').style.width=(n/4*100)+'%'; e.querySelector('.gauge i').style.background=n===4?'#1f8a5b':n>=2?'#e2932b':'#c2413b'; e.querySelector('.gv').textContent=n+'/4';
    e.querySelector('.dlg').innerHTML=IT.map(([k,,q,a])=>`<div class="bub t">👩‍🏫 ${q}</div><div class="bub ${st[k]?'u':'no'}">${st[k]?'📄 '+a:'😶 Bản khai báo không trả lời được câu này.'}</div>`).join('')+
      `<div class="sys ${st.checked==1&&n===4?'okc':'warn'}">${st.checked==1?(n===4?'✓ Bài minh bạch và chính xác: cô giáo tin tưởng.':'Bài đã đúng nhưng chưa minh bạch: cô chưa biết em dùng AI thế nào.'):'⚠ Bài vẫn còn số liệu sai. Dù có khai báo, em vẫn chịu trách nhiệm về sản phẩm cuối cùng.'}</div>`;};
  e.querySelectorAll('.tgs input').forEach(i=>i.onchange=()=>{st[i.dataset.k]=i.checked?1:0;render();});
  _wireSeg(e,(n,v)=>{st[n]=+v;render();}); render(); return e;
},
/* 5. Lan truyền video giả */
spread(){
  const N=48, W=620, H=300; const st={chk:10,td:'none',label:'off',busy:false,hist:[]};
  const pts=[...Array(N)].map((_,i)=>({x:40+(i%8)*77+((i*37)%19)-9,y:40+Math.floor(i/8)*45+((i*53)%15)-7}));
  const nb=pts.map((p,i)=>pts.map((q,j)=>[j,(p.x-q.x)**2+(p.y-q.y)**2]).filter(a=>a[0]!==i).sort((a,b)=>a[1]-b[1]).slice(0,4).map(a=>a[0]));
  const e=_el(_shell('Lan truyền video giả: điều gì làm tin giả dừng lại?',
   'Video giả giọng hiệu trưởng bắt đầu từ 1 tài khoản (viền đen). Mỗi vòng, người đã tin sẽ chia sẻ cho người quen. Thay đổi tỉ lệ người kiểm chứng trước khi chia sẻ, thời điểm trang mạng gỡ video, nhãn “nội dung do AI tạo” rồi bấm <b>Chạy</b>. So sánh các lần trong bảng.',
   `<div class="sim-ctl"><div><label>Người kiểm chứng trước khi chia sẻ: <b class="cv">10%</b></label><input type="range" min="0" max="90" step="10" value="10" class="rg"></div>
     <div><label>Trang mạng gỡ video</label>${_seg('td',[['none','Không gỡ'],['6','Sau 6 vòng'],['3','Sau 3 vòng']],'none')}</div>
     <div><label>Nhà cung cấp công cụ gắn nhãn “nội dung AI”</label>${_seg('label',[['off','Không'],['on','Có']],'off')}</div>
     <div style="align-self:end"><button type="button" class="btn acc run">▶ Chạy</button></div></div>
    <svg viewBox="0 0 ${W} ${H}" class="sim-svg net"><g class="ed"></g><g class="nd"></g><text class="rd" x="${W-10}" y="20" text-anchor="end" font-size="14" fill="#6b778c"></text><text class="tdn" x="${W/2}" y="${H/2}" text-anchor="middle" font-size="22" font-weight="800" fill="#1d4e89" opacity="0">🚫 Trang mạng đã gỡ video</text></svg>
    <div class="legend"><span><i style="background:#c2413b"></i>Tin và chia sẻ</span><span><i style="background:#1f8a5b"></i>Kiểm chứng, dừng lại</span><span><i style="background:#9aa8bc"></i>Đã xem, không tin</span><span><i style="background:#eef1f6;border:1px solid #c9d3e2"></i>Chưa xem</span></div>
    <div class="sim-cnt"><div><b class="s1">0</b>người đã xem</div><div class="bad"><b class="s2">0</b>người tin và chia sẻ</div><div><b class="s3">0</b>người kiểm chứng, dừng lại</div></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>% kiểm chứng</th><th>Gỡ video</th><th>Nhãn AI</th><th>Người đã xem</th><th>Tin & chia sẻ</th></tr><tr class="empty"><td colspan="6">Chưa chạy lần nào.</td></tr></table>`));
  const ns='http://www.w3.org/2000/svg', ed=e.querySelector('.ed'), nd=e.querySelector('.nd');
  nb.forEach((l,i)=>l.forEach(j=>{if(j>i){const L=document.createElementNS(ns,'line');L.setAttribute('x1',pts[i].x);L.setAttribute('y1',pts[i].y);L.setAttribute('x2',pts[j].x);L.setAttribute('y2',pts[j].y);L.setAttribute('stroke','#dfe4ec');ed.appendChild(L);}}));
  const C=pts.map(p=>{const c=document.createElementNS(ns,'circle');c.setAttribute('cx',p.x);c.setAttribute('cy',p.y);c.setAttribute('r',11);c.setAttribute('fill','#eef1f6');c.setAttribute('stroke','#c9d3e2');nd.appendChild(c);return c;});
  const col={u:'#eef1f6',sh:'#c2413b',ck:'#1f8a5b',no:'#9aa8bc'};
  const rg=e.querySelector('.rg'); rg.oninput=()=>{st.chk=+rg.value; e.querySelector('.cv').textContent=st.chk+'%';};
  _wireSeg(e,(n,v)=>{st[n]=v;});
  e.querySelector('.run').onclick=()=>{ if(st.busy) return; st.busy=true; if(window.FX) FX.play('whoosh');
    const S=pts.map(()=> 'u'); const src=27; S[src]='sh'; C.forEach((c,i)=>{c.setAttribute('fill',col[S[i]]);c.setAttribute('stroke',i===src?'#16233a':'#c9d3e2');c.setAttribute('stroke-width',i===src?3:1);});
    e.querySelector('.tdn').setAttribute('opacity',0);
    const pBel=st.label==='on'?.45:.85, pChk=st.chk/100, stopAt=st.td==='none'?99:+st.td; let round=0, frontier=[src];
    const upd=()=>{e.querySelector('.s1').textContent=S.filter(x=>x!=='u').length; e.querySelector('.s2').textContent=S.filter(x=>x==='sh').length; e.querySelector('.s3').textContent=S.filter(x=>x==='ck').length; e.querySelector('.rd').textContent='Vòng '+round;};
    upd();
    const step=()=>{ round++;
      if(round>stopAt||!frontier.length||round>8){ if(round>stopAt) e.querySelector('.tdn').setAttribute('opacity',1);
        const seen=S.filter(x=>x!=='u').length, sh=S.filter(x=>x==='sh').length;
        st.hist.unshift([st.chk+'%',st.td==='none'?'Không':'Sau '+st.td+' vòng',st.label==='on'?'Có':'Không',seen,sh]); st.hist=st.hist.slice(0,6);
        histTable(e,st.hist,(v,j)=>j===4?(v>15?'r':'g'):'');
        st.busy=false; upd(); if(window.FX) FX.play('ding'); return; }
      const nf=[]; frontier.forEach(i=>nb[i].forEach(j=>{ if(S[j]!=='u') return;
        if(Math.random()<pBel){ if(Math.random()<pChk) S[j]='ck'; else {S[j]='sh'; nf.push(j);} } else S[j]='no'; C[j].setAttribute('fill',col[S[j]]);}));
      frontier=nf; upd(); setTimeout(step,650);};
    setTimeout(step,500);
  };
  return e;
}};

// Mô phỏng tương tác (chỉ để minh hoạ, dữ liệu giả định)
const $=(h)=>{const d=document.createElement('div');d.innerHTML=h;return d.firstElementChild};
function logTable(el,cols){const t=$(`<table><tr><th>Lần</th>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></table>`);el.append(t);let n=0;
 return v=>{if(++n>6){t.rows[1].remove()}t.insertAdjacentHTML('beforeend',`<tr><td>${n}</td>${v.map(x=>`<td>${x}</td>`).join('')}</tr>`)}}

// Bộ xếp thẻ dùng chung: bấm thẻ để đổi nhóm, rồi Kiểm tra
function sorter(el,cats,items){
 const st=items.map(()=>-1);
 const box=$('<div class="chips"></div>');
 items.forEach((it,i)=>{const c=$(`<span class="chip">${it[0]} <small>—</small></span>`);
  c.onclick=()=>{st[i]=(st[i]+1)%cats.length;c.className='chip';c.querySelector('small').textContent='→ '+cats[st[i]]};box.append(c)});
 const r=$('<div></div>');const b=$('<button class="btn">✔ Kiểm tra</button>');
 b.onclick=()=>{let ok=0;[...box.children].forEach((c,i)=>{const g=st[i]===items[i][1];ok+=g;c.classList.add(g?'ok':'no')});
  r.innerHTML=`<div class="res ${ok==items.length?'ok':'no'}">Đúng ${ok}/${items.length}. ${ok<items.length?'Thẻ đỏ: thảo luận lại vì sao.':'Tuyệt vời!'}</div>`;
  items.forEach((it,i)=>it[2]&&st[i]!==it[1]&&r.insertAdjacentHTML('beforeend',`<div class="note">💡 ${it[0]}: ${it[2]}</div>`))};
 el.append($(`<p class="note">Bấm thẻ để chọn: ${cats.join(' / ')}</p>`),box,b,r)}

const SIMS={
robot:{t:'🤖 Robot phân loại quả',f(el){
 const fr=[['🍎','đỏ','tròn'],['🍓','đỏ','nhọn'],['🍋','vàng','bầu'],['🍌','vàng','dài'],['🍅','đỏ','tròn'],['🍐','xanh','bầu']];
 el.innerHTML=`<div class="row">Quy tắc: <select><option value="">(chưa có quy tắc)</option><option value="1|đỏ">Màu ĐỎ → rổ A</option><option value="1|vàng">Màu VÀNG → rổ A</option><option value="2|tròn">Hình TRÒN → rổ A</option></select>
 <button class="btn">▶ Chạy robot</button></div><p>Rổ A: <b class="a"></b> &nbsp; Rổ B: <b class="b"></b></p><p class="msg"></p>`;
 const log=logTable(el,['Quy tắc','Rổ A','Rổ B']);
 el.querySelector('button').onclick=()=>{const v=el.querySelector('select').value;const A=[],B=[];
  if(!v){el.querySelector('.msg').textContent='🤖 "Tôi không biết phải làm gì… Hãy cho tôi quy tắc!"';el.querySelector('.a').textContent=el.querySelector('.b').textContent='';log(['(không)','—','—']);return}
  const[k,x]=v.split('|');fr.forEach(f=>(f[k]===x?A:B).push(f[0]));
  el.querySelector('.a').textContent=A.join(' ');el.querySelector('.b').textContent=B.join(' ');
  el.querySelector('.msg').textContent='🤖 Tôi làm ĐÚNG theo quy tắc con người đặt. '+(A.includes('🍅')?'(Cà chua vào rổ A – con người cần kiểm tra lại!)':'');
  log([el.querySelector('select').selectedOptions[0].text,A.join(''),B.join('')])}}},

check:{t:'🔍 Kiểm chứng trợ lí ảo (giả lập)',f(el){
 const Q=[['Thủ đô Việt Nam là Hà Nội.',1,'Đúng – SGK Lịch sử & Địa lí 6.'],['Nước sôi ở 50°C.',0,'Sai – nước sôi ở 100°C (áp suất thường).'],['Trái Đất quay quanh Mặt Trời.',1,'Đúng – SGK KHTN 6.'],['Con nhện có 6 chân.',0,'Sai – nhện có 8 chân.'],['1 giờ có 60 phút.',1,'Đúng.'],['Sông dài nhất Việt Nam là sông Hồng.',0,'Cần kiểm chứng: hỏi thầy cô/nguồn tin cậy – không nên tin ngay.']];
 let caught=0;Q.forEach((q,i)=>{const r=$(`<div class="q">🤖 <i>${q[0]}</i><br><button class="btn g">✔ Tin</button><button class="btn g">✖ Nghi ngờ</button><button class="btn">📖 Tra SGK</button><div></div></div>`);
  const out=r.querySelector('div');const bs=r.querySelectorAll('button');
  bs[0].onclick=()=>{out.textContent='Em chọn: tin.';r.dataset.c=1};bs[1].onclick=()=>{out.textContent='Em chọn: nghi ngờ.';r.dataset.c=0};
  bs[2].onclick=()=>{const g=r.dataset.c!==undefined&&+r.dataset.c===q[1];out.innerHTML=`<div class="res ${q[1]?'ok':'no'}">📖 ${q[2]} ${r.dataset.c===undefined?'':(g?'– Em đoán đúng!':'– Em đoán chưa đúng.')}</div>`;if(!q[1]&&!r.dataset.d){caught++;r.dataset.d=1;sum.textContent=`Đã phát hiện ${caught}/3 câu AI trả lời sai/chưa chắc.`}};
  el.append(r)});const sum=$('<b></b>');el.append(sum)}},

doctor:{t:'🩺 Bác sĩ và AI gợi ý (giả lập)',f(el){
 el.innerHTML=`<div class="row">Triệu chứng: <label><input type="checkbox" value="sốt">Sốt</label><label><input type="checkbox" value="ho">Ho</label><label><input type="checkbox" value="ngứa">Phát ban</label><button class="btn">▶ AI gợi ý</button></div><div class="o"></div>`;
 const log=logTable(el,['Triệu chứng','AI gợi ý (độ tin cậy)','Bác sĩ']);
 el.querySelector('button').onclick=()=>{const s=[...el.querySelectorAll('input:checked')].map(x=>x.value);
  const g=s.includes('ngứa')?['Dị ứng',s.length>1?55:80]:s.includes('ho')?['Cảm cúm',s.includes('sốt')?85:60]:s.includes('sốt')?['Sốt virus',50]:['Chưa đủ dữ liệu',10];
  const o=el.querySelector('.o');o.innerHTML=`<p>🤖 AI gợi ý: <b>${g[0]}</b> – độ tin cậy ${g[1]}%</p><div class="bar"><i style="width:${g[1]}%"></i></div><p>👩‍⚕️ Bác sĩ: <button class="btn g">Đồng ý, khám thêm</button><button class="btn g">Không đồng ý, xét nghiệm</button></p><p class="d"></p>`;
  o.querySelectorAll('.btn').forEach((b,i)=>b.onclick=()=>{o.querySelector('.d').textContent='✅ Bác sĩ đã xem xét và QUYẾT ĐỊNH. AI chỉ gợi ý.';log([s.join(', ')||'—',`${g[0]} (${g[1]}%)`,b.textContent])})}}},

learn:{t:'📚 AI giúp em học hay làm thay em?',f(el){sorter(el,['Giúp học','Làm thay'],[['Luyện phát âm tiếng Anh',0],['Nhờ viết hộ bài văn',1],['Hỏi gợi ý rồi tự giải bài toán',0],['Chép nguyên đáp án bài tập',1],['Tra nghĩa từ mới rồi đặt câu',0],['Nhờ AI làm bài thu hoạch',1]])}},

photo:{t:'📸 Soi bức ảnh (giả định)',f(el){
 const H=[[18,20,'🏫 Biển tên trường'],[70,25,'🏠 Số nhà 25'],[45,60,'👕 Phù hiệu lớp 6A'],[82,72,'📍 Định vị trong ảnh'],[25,75,'🙂 Khuôn mặt bạn khác']];let f=0;
 const c=$(`<div style="position:relative;height:220px;border-radius:10px;background:linear-gradient(#bfe3ff 55%,#9bd28f 55%);font-size:2.4rem;user-select:none"></div>`);
 c.innerHTML=`<span style="position:absolute;left:12%;top:8%">🏫</span><span style="position:absolute;left:65%;top:14%">🏠</span><span style="position:absolute;left:40%;top:45%">🧒</span><span style="position:absolute;left:20%;top:60%">🧑</span><span style="position:absolute;left:78%;top:62%">📱</span><span style="position:absolute;left:3%;top:3%;font-size:.8rem">Ảnh giả định</span>`;
 const out=$('<div class="chips" style="margin-top:8px"></div>'),s=$('<b></b>');
 c.onclick=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;
  H.forEach(h=>{if(!h.f&&Math.hypot(h[0]-x,h[1]-y)<14){h.f=1;f++;out.append($(`<span class="chip no">${h[2]}</span>`));s.textContent=` Tìm được ${f}/5 chi tiết lộ thông tin.`}})};
 el.append($('<p class="note">Bấm vào chỗ em nghĩ làm lộ thông tin.</p>'),c,s,out)}},

traffic:{t:'🚦 Thẻ dữ liệu Xanh – Vàng – Đỏ',f(el){sorter(el,['🟢 Xanh','🟡 Vàng','🔴 Đỏ'],[['Môn học yêu thích',0],['Họ tên đầy đủ',1,'Phụ thuộc bối cảnh: chỉ khi cần và được phép'],['Địa chỉ nhà',2],['Mật khẩu',2],['Ảnh khuôn mặt',1,'Cân nhắc, hỏi bố mẹ'],['Màu sắc yêu thích',0],['Số điện thoại bố mẹ',2],['Ảnh của bạn khác',2,'Không phải dữ liệu của em – không tự ý chia sẻ']])}},

appcheck:{t:'🛡️ Kiểm tra ứng dụng "Đổi ảnh vui" (giả định)',f(el){sorter(el,['Nên hỏi','Không cần'],[['Ai làm ra ứng dụng này?',0],['Ứng dụng lấy dữ liệu gì?',0],['Biểu tượng có màu đẹp không?',1],['Có cần bố mẹ đồng ý không?',0],['Ứng dụng có giới hạn độ tuổi?',0],['Bạn bè có khen không?',1]])}},

feed:{t:'📺 Gợi ý video (giả lập)',f(el){
 const T=['⚽ Bóng đá','🎮 Trò chơi','🔬 Khoa học','🎵 Âm nhạc','🐶 Động vật'];
 el.innerHTML=`<div class="row">Loại em hay xem: <select>${T.map((t,i)=>`<option value=${i}>${t}</option>`).join('')}</select> Số video cùng loại đã xem: <input type="range" min="0" max="20" value="0"><b class="n">0</b> <button class="btn">▶ Xem gợi ý</button></div>
 <div class="chips fd" style="margin:8px 0"></div><p>Độ đa dạng: <span class="bar" style="display:inline-block;width:150px"><i class="dv"></i></span> &nbsp; Thời gian dự kiến: <b class="tm"></b></p>`;
 const log=logTable(el,['Đã xem','Đa dạng','Thời gian']);const r=el.querySelector('input');r.oninput=()=>el.querySelector('.n').textContent=r.value;
 el.querySelector('.btn').onclick=()=>{const k=+el.querySelector('select').value,n=+r.value,p=Math.min(.95,.2+n*.04);
  const fd=Array.from({length:10},()=>Math.random()<p?k:Math.floor(Math.random()*5));const dv=new Set(fd).size;
  el.querySelector('.fd').innerHTML=fd.map(i=>`<span class="chip">${T[i]}</span>`).join('');el.querySelector('.dv').style.width=dv*20+'%';
  const tm=15+n*4;el.querySelector('.tm').textContent=tm+' phút';log([n,dv+'/5 loại',tm+' phút'])}}},

who:{t:'🤝 AI hay con người phù hợp hơn?',f(el){sorter(el,['🤖 AI','🧑 Con người'],[['Tính tổng 1000 số',0],['An ủi bạn đang buồn',1,'Cần cảm xúc, thấu hiểu'],['Dịch nhanh một biển báo',0],['Quyết định phạt hay tha lỗi cho bạn',1],['Gợi ý đường đi tránh tắc',0],['Chọn quà sinh nhật cho mẹ',1]])}},

train:{t:'🍎🍋 Dạy máy phân loại (giả lập)',f(el){
 el.innerHTML=`<div class="row">Đang thêm: <button class="btn sel" data-l="0">🍎 Táo</button><button class="btn g" data-l="1">🍋 Chanh</button><button class="btn g x">🧹 Xoá</button><button class="btn t">▶ Kiểm tra 20 quả mới</button></div>
 <canvas width="360" height="260"></canvas><p class="note">Trục ngang: độ to → ; trục đứng: độ đỏ ↑. Bấm lên bảng để thêm ví dụ. Máy dùng thuật toán "giống ví dụ gần nhất".</p><b class="o"></b>`;
 const cv=el.querySelector('canvas'),g=cv.getContext('2d');let L=0,D=[];const log=logTable(el,['Số ví dụ','Đúng/20']);
 const truth=(x,y)=>y>130?1:0; // táo: đỏ (y nhỏ trên canvas)
 const draw=(T=[])=>{g.clearRect(0,0,360,260);g.font='18px serif';D.forEach(d=>g.fillText(d[2]?'🍋':'🍎',d[0]-9,d[1]+6));T.forEach(t=>{g.strokeStyle=t[2]?'#1f9d55':'#d64545';g.lineWidth=2;g.strokeRect(t[0]-6,t[1]-6,12,12)})};
 el.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{L=+b.dataset.l;el.querySelectorAll('[data-l]').forEach(c=>c.className='btn g');b.className='btn sel'});
 el.querySelector('.x').onclick=()=>{D=[];draw();el.querySelector('.o').textContent=''};
 cv.onclick=e=>{const r=cv.getBoundingClientRect();D.push([(e.clientX-r.left)*360/r.width,(e.clientY-r.top)*260/r.height,L]);draw()};
 el.querySelector('.t').onclick=()=>{if(!D.length){el.querySelector('.o').textContent='🤖 Chưa có dữ liệu – máy chưa học được gì!';return}
  let ok=0;const T=[];for(let i=0;i<20;i++){const x=Math.random()*340+10,y=Math.random()*240+10;let b=D[0];D.forEach(d=>{if(Math.hypot(d[0]-x,d[1]-y)<Math.hypot(b[0]-x,b[1]-y))b=d});const c=b[2]===truth(x,y);ok+=c;T.push([x,y,c])}
  draw(T);el.querySelector('.o').textContent=`Máy đoán đúng ${ok}/20 (ô xanh: đúng, ô đỏ: sai).`;log([D.length,ok])}}},

noise:{t:'🏷️ Dữ liệu dán nhãn sai',f(el){
 el.innerHTML=`<div class="row">% nhãn sai: <input type="range" min="0" max="50" step="10" value="0"><b class="n">0%</b> Số ví dụ: <select><option>10</option><option selected>40</option><option>100</option></select><button class="btn">▶ Huấn luyện & kiểm tra</button></div><p>Độ chính xác: <span class="bar" style="display:inline-block;width:200px"><i></i></span> <b class="o"></b></p>`;
 const log=logTable(el,['Số ví dụ','% nhãn sai','Chính xác']);const r=el.querySelector('input');r.oninput=()=>el.querySelector('.n').textContent=r.value+'%';
 el.querySelector('.btn').onclick=()=>{const n=+el.querySelector('select').value,e=+r.value/100,P=()=>[Math.random(),Math.random()],t=p=>p[1]>.5?1:0;
  const D=Array.from({length:n},()=>{const p=P();return[p,Math.random()<e?1-t(p):t(p)]});let ok=0;
  for(let i=0;i<200;i++){const p=P();const nb=D.map(d=>[Math.hypot(d[0][0]-p[0],d[0][1]-p[1]),d[1]]).sort((a,b)=>a[0]-b[0]).slice(0,3);ok+=((nb.reduce((s,d)=>s+d[1],0)>=2)?1:0)===t(p)}
  const a=Math.round(ok/2);el.querySelector('i').style.width=a+'%';el.querySelector('.o').textContent=a+'%';log([n,r.value+'%',a+'%'])}}},

match5:{t:'🔗 Công nghệ AI quanh em',f(el){sorter(el,['Nhận dạng ảnh','Giọng nói ↔ văn bản','Dịch','Gợi ý'],[['Mở khoá điện thoại bằng khuôn mặt',0],['Đọc tin nhắn thành tiếng',1],['Chụp biển báo tiếng Anh ra tiếng Việt',2],['Ứng dụng nhạc gợi ý bài hát',3],['Nói để soạn tin nhắn',1],['Ứng dụng nhận biết tên cây qua ảnh',0]])}},

sortai:{t:'📱 Có AI hay không AI?',f(el){sorter(el,['Có AI','Không AI'],[['Trợ lí ảo trên điện thoại',0],['Máy tính bỏ túi',1,'Tính theo công thức cố định'],['Bản đồ gợi ý đường tránh tắc',0],['Quạt điện hẹn giờ',1],['Ứng dụng dịch bằng camera',0],['Đèn bật khi có người đi qua',1,'Cảm biến đơn giản, không học từ dữ liệu'],['Gợi ý video trên mạng',0],['Máy giặt bấm nút chọn chế độ',1]])}},

should:{t:'🚦 Nên – Cân nhắc – Không nên dùng AI',f(el){sorter(el,['🟢 Nên','🟡 Cân nhắc','🔴 Không nên'],[['Luyện phát âm tiếng Anh',0],['Viết hộ bài văn tả mẹ',2,'Em cần tự luyện viết'],['Hỏi bản đồ đường đến nhà sách',0],['Tìm ý tưởng cho bài thuyết trình',1,'Được, nếu em tự chọn lọc và ghi rõ'],['Gửi ảnh bạn cho ứng dụng chỉnh mặt',2,'Dữ liệu của bạn khác'],['Kiểm tra chính tả rồi tự sửa',0],['Hỏi AI cách giải rồi tự làm lại',1]])}}
};

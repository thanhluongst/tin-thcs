/* Phòng thí nghiệm mô phỏng (kiểu PhET) – bài học. Mỗi mô phỏng chạy riêng trên từng máy. */
const SIMCACHE={};
function _el(h){const d=document.createElement('div'); d.innerHTML=h.trim(); return d.firstElementChild;}
function _seg(n,opts,v){return `<div class="sseg" data-n="${n}">${opts.map(([k,l])=>`<button type="button" data-v="${k}" class="${k===v?'on':''}">${l}</button>`).join('')}</div>`;}
function _wireSeg(root,cb){root.querySelectorAll('.sseg').forEach(g=>g.querySelectorAll('button').forEach(b=>b.onclick=()=>{g.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on'); if(window.FX) FX.play('tick'); cb(g.dataset.n,b.dataset.v);}));}
function _shell(t,guide,body){return `<div class="sim"><div class="sim-h"><span class="sim-tag">🔬 Phòng thí nghiệm mô phỏng</span><h3>${t}</h3></div><p class="sim-guide">${guide}</p>${body}<p class="sim-note">Mô phỏng chỉ để minh hoạ, các con số là giả định.</p></div>`;}
function histTable(e,hist,cls){const t=e.querySelector('.sim-hist'); const head=t.querySelector('tr').outerHTML;
  t.innerHTML=head+hist.map((h,k)=>`<tr><td>${hist.length-k}</td>${h.map((v,j)=>`<td class="${cls(v,j)}">${v}</td>`).join('')}</tr>`).join('');}
function mountSims(root){root.querySelectorAll('.simslot').forEach(s=>{const id=s.dataset.sim; if(!SIMS[id]) return; let e=SIMCACHE[id]; if(!e){e=SIMS[id](); SIMCACHE[id]=e;} s.replaceWith(e);});}

const SIMS=Object.assign({},window.SIMS_BAI||{});   /* mô phỏng của bài soạn lại (lop/bai/*.js) */

/* Phòng thí nghiệm mở rộng: mô phỏng trọn vẹn ở thư mục riêng của tin-thcs (cũng có trên GitHub Pages), mở ở tab mới */
const LABS={
 caytrong:{u:'/ai-cay-trong/',ic:'🌱',t:'AI Bác Sĩ Cây Trồng',d:'Tự tay dạy AI nhận biết lá cây khoẻ / bệnh, xem AI học từ dữ liệu, chạy băng chuyền kiểm tra và sửa lỗi thiên vị dữ liệu.',c1:'#16a34a',c2:'#65a30d'},
 canhsat:{u:'/ai-canh-sat-mang/',ic:'🚓',t:'AI Cảnh Sát Mạng',d:'Huấn luyện AI phát hiện tin nhắn lừa đảo, xem AI dựa vào dấu hiệu nào và mắc bẫy ra sao.',c1:'#2563eb',c2:'#7c3aed'},
 thamtu:{u:'/ai-tham-tu-tin-gia/',ic:'🕵️',t:'AI Thám Tử Tin Giả',d:'Phân biệt tin thật – tin giả, ảnh do AI tạo; phát hiện cái bẫy “nhiều lượt chia sẻ = thật”.',c1:'#db2777',c2:'#f97316'},
 gaccong:{u:'/ai-gac-cong-lenh-hoi/',ic:'🛡️',t:'AI Gác Cổng Lệnh Hỏi',d:'Luyện viết câu lệnh (prompt) tốt, an toàn, không lộ thông tin cá nhân; bẫy “lệnh càng dài càng tốt”.',c1:'#0891b2',c2:'#4f46e5'},
 camxuc:{u:'/ai-guong-cam-xuc/',ic:'🪞',t:'Gương Cảm Xúc AI',d:'Chỉnh khuôn mặt, xem AI quét 14 điểm mốc và đoán cảm xúc. 3 nhiệm vụ: cười gượng, khóc vì vui… AI có đúng không?',c1:'#f59e0b',c2:'#ec4899'},
 tuyenchon:{u:'/ai-may-tuyen-chon/',ic:'⚖️',t:'Máy Tuyển Chọn AI',d:'AI chọn đội tuyển từ hồ sơ các năm trước và bỏ sót bạn giỏi ở nông thôn. Tìm ra thiên vị, sửa dữ liệu, kiểm tra hồ sơ và giữ quyền quyết định.',c1:'#0e7490',c2:'#4f46e5'},
 thanhpho:{u:'/ai-thanh-pho/',ic:'🏙️',t:'Thành Phố AI',d:'Dạo quanh thành phố, tìm 12 đồ vật xem cái nào có AI; chọn khi nào nên dùng AI, tự làm hay hỏi người lớn; xếp mặt tốt – hạn chế của AI.',c1:'#0ea5e9',c2:'#22c55e'},
 xuong:{u:'/ai-xuong-du-an/',ic:'🏭',t:'Xưởng Dự Án AI',d:'4 trạm: săn vấn đề hợp với AI → xếp kế hoạch dự án → chạy thử máy phân loại rác trên băng chuyền, sửa lỗi dữ liệu → chấm phiếu đánh giá sản phẩm.',c1:'#ea580c',c2:'#ca8a04'},
 kiemduyet:{u:'/ai-hoi-dong-kiem-duyet/',ic:'🏛️',t:'Hội Đồng Kiểm Duyệt AI',d:'Em là thanh tra: đọc hồ sơ 6 ứng dụng AI, gắn cờ vi phạm, đối chiếu Bộ quy định rồi đóng dấu Cấp phép – Yêu cầu sửa – Cấm.',c1:'#b45309',c2:'#7c2d12'},
 nghenghiep:{u:'/ai-hanh-trinh-nghe-nghiep/',ic:'🚀',t:'Hành Trình Nghề Nghiệp',d:'Khám phá 4 nghề: việc nào AI làm tốt, việc nào người + AI cùng làm, việc nào con người giữ; đầu tư 3 kĩ năng và lập hồ sơ tương lai.',c1:'#6366f1',c2:'#db2777'},
 robot:{u:'/ai-nha-che-tao-robot/',ic:'🤖',t:'Nhà Chế Tạo Robot',d:'Robot chưa có quy tắc thì đứng yên. Em viết quy tắc cho robot phân loại quả, nhặt quả cà chua bị xếp nhầm và bấm nút DỪNG khẩn cấp.',c1:'#2563eb',c2:'#0891b2'}
};
Object.keys(LABS).forEach(k=>{const L=LABS[k]; SIMS['lab_'+k]=()=>{
  const e=_el(`<div class="labx" style="--l1:${L.c1};--l2:${L.c2}"><div class="labx-art"><span>${L.ic}</span><i></i><i></i><i></i></div>
   <div class="labx-b"><span class="labx-tag">🚀 Phòng thí nghiệm mở rộng</span><h3>${L.t}</h3><p>${L.d}</p>
   <a class="labx-go" href="${L.u}" target="_blank" rel="noopener">▶ Vào phòng thí nghiệm</a><small>${L.net?'Cần mạng Internet để hiện đúng giao diện.':'Chạy được cả khi không có Internet.'}</small></div></div>`);
  e.querySelector('a').onclick=()=>{if(window.FX) FX.play('whoosh');}; return e;};});

/* Tin học 7 · Bài 3. Quản lí dữ liệu trong máy tính · 1 tiết. Soạn lại cho lớp học LAN.
   Tình huống: ảnh chuyến du lịch của An lộn xộn trong một thư mục.
   Mô phỏng: "qlCayThuMuc" (sắp tệp vào thư mục, xem đường dẫn), "qlSaoLuu" (sự cố mất dữ liệu có/không sao lưu). */
const STEPS=[
 {t:'Ảnh du lịch lộn xộn',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p><b>An</b> có 12 ảnh, video chuyến du lịch Huế – Đà Nẵng nằm lẫn trong một thư mục. Tìm ảnh cầu Rồng mất cả phút! Em hãy <b>xếp các tệp vào thư mục</b> hợp lí trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'qlCayThuMuc'},
      {id:'q1',type:'single',q:'Sau khi xếp vào thư mục, đường dẫn của tệp <code>CauRong.jpg</code> có dạng nào?',opts:['CauRong.jpg\\DuLich\\DaNang','D:\\DuLich\\DaNang\\CauRong.jpg','D:\\CauRong.jpg\\DaNang','DaNang:CauRong.jpg'],ok:1},
      {id:'q2',type:'single',q:'Lợi ích chính của việc tổ chức thư mục theo cây là gì?',opts:['Tệp nhỏ hơn','Dễ tìm, dễ quản lí tệp','Máy chạy nhanh gấp đôi','Không cần đặt tên tệp'],ok:1}],
  key:['Tổ chức tệp trong <b>cây thư mục</b> giúp dễ tìm, dễ quản lí; <b>đường dẫn</b> chỉ vị trí tệp.']},
 {t:'Thao tác với tệp và thư mục',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Trong File Explorer em có thể <b>tạo, đổi tên, sao chép, di chuyển, xoá</b> tệp và thư mục.</p>',
  qs:[{id:'h1',type:'match',q:'Ghép thao tác với lệnh/phím tắt.',items:['Sao chép','Dán','Cắt (di chuyển)','Đổi tên','Tạo thư mục mới'],opts:['Ctrl+C','Ctrl+V','Ctrl+X','F2 / Rename','New folder (Ctrl+Shift+N)'],ok:[0,1,2,3,4]},
      {id:'h2',type:'tf',q:'Đúng hay sai?',items:[{t:'Sao chép tạo thêm bản sao, tệp gốc vẫn còn',a:'T'},{t:'Di chuyển làm tệp có ở cả hai nơi',a:'F'},{t:'Tệp xoá thường nằm trong Recycle Bin, có thể khôi phục',a:'T'},{t:'Trong cùng thư mục có thể có hai tệp trùng tên',a:'F'}]}],
  key:['<b>Sao chép</b> giữ tệp gốc; <b>di chuyển</b> chuyển tệp sang nơi mới.','Tệp xoá vào <b>Recycle Bin</b>, có thể khôi phục.']},
 {t:'Sao lưu và bảo vệ dữ liệu',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Máy tính của An bị hỏng ổ cứng ngay trước buổi nộp bài. Có sao lưu thì sao, không có thì sao? Chọn cách sao lưu rồi bấm <b>⚡ Gây sự cố</b>.</p>',
  qs:[{id:'s2',type:'sim',sim:'qlSaoLuu'},
      {id:'b1',type:'single',q:'Quan sát: Khi ổ cứng hỏng, dữ liệu còn lại khi nào?',opts:['Khi lưu nhiều bản trên cùng ổ cứng','Khi có bản sao trên thiết bị khác hoặc đám mây','Khi đặt tên tệp thật dài','Không bao giờ còn'],ok:1},
      {id:'b2',type:'multi',q:'Chọn các cách <b>bảo vệ</b> dữ liệu.',opts:['Sao lưu định kì ra USB/đám mây','Đặt mật khẩu cho máy','Cài, cập nhật phần mềm diệt virus','Cho bạn mượn mật khẩu','Mở mọi tệp đính kèm lạ'],ok:[0,1,2]}],
  key:['<b>Sao lưu</b> định kì ra thiết bị khác/đám mây; đặt <b>mật khẩu</b>, dùng phần mềm <b>diệt virus</b>.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ Trả lời nhanh 3 câu!</p>',
  qs:[{id:'l1',type:'single',q:'Thư mục <code>Lop7A</code> chứa <code>ToHop</code>, trong đó có <code>bao-cao.docx</code> ở ổ D. Đường dẫn là:',opts:['D:\\ToHop\\Lop7A\\bao-cao.docx','D:\\Lop7A\\ToHop\\bao-cao.docx','Lop7A\\D:\\bao-cao.docx','D:\\bao-cao.docx\\Lop7A'],ok:1},
      {id:'l2',type:'sort',q:'Việc nào làm dữ liệu an toàn hơn?',cols:{c0:'An toàn hơn',c1:'Rủi ro'},items:[{t:'Lưu một bản duy nhất trên máy',a:'c1'},{t:'Sao lưu lên Google Drive',a:'c0'},{t:'Tải phần mềm lạ trên mạng',a:'c1'},{t:'Khoá máy khi rời chỗ',a:'c0'}]}],
  key:['Đọc đường dẫn từ <b>ổ đĩa → thư mục → tệp</b>.']},
 {t:'Sắp xếp thư mục học tập',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Em lưu bài của nhiều môn, nhiều học kì.</p>',
  qs:[{id:'v1',type:'text',q:'Vẽ (bằng chữ) cây thư mục em sẽ tạo cho bài tập các môn, và em sẽ sao lưu ở đâu.',ans:'VD: D:\\HocTap\\Toan, \\Van, \\Tin\\HK1, \\Tin\\HK2. Sao lưu hằng tuần lên Google Drive hoặc USB.'}],
  key:['Cây thư mục <b>theo môn/học kì</b>, <b>sao lưu</b> định kì.']},
 {t:'Tổng kết',hd:'Tổng kết · 3 phút',code:'',phut:3,
  story:'<p>Tổ chức gọn – tìm nhanh – sao lưu thường xuyên.</p>',
  qs:[{id:'t1',type:'single',q:'Câu nào đúng?',opts:['Xoá tệp là mất vĩnh viễn ngay','Sao lưu là tạo bản sao ở nơi khác để phòng mất dữ liệu','Thư mục không thể chứa thư mục con','Đường dẫn không cần tên ổ đĩa'],ok:1}],
  key:['<b>Thư mục – đường dẫn – sao lưu – bảo vệ</b> dữ liệu.']}
];
STEPS.unshift({t:'Chào mừng',k:'wel'});
const GHIBAI={so:'Bài 3:',ten:'QUẢN LÍ DỮ LIỆU TRONG MÁY TÍNH',muc:[
 {step:1,h:'Cây thư mục',it:['Tệp xếp trong <b>thư mục</b>, thư mục con → <b>cây thư mục</b>.','<b>Đường dẫn</b>: D:\\DuLich\\DaNang\\CauRong.jpg']},
 {step:2,h:'Thao tác',it:['Tạo, đổi tên, <b>sao chép</b> (Ctrl+C/V), <b>di chuyển</b> (Ctrl+X/V), xoá (Recycle Bin).']},
 {step:3,h:'Bảo vệ dữ liệu',it:['<b>Sao lưu</b> định kì; đặt <b>mật khẩu</b>; <b>diệt virus</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.qlCayThuMuc=function(){
  const F=[['🖼️','CauRong.jpg','DaNang'],['🖼️','DaiNoi.jpg','Hue'],['🎬','BienMyKhe.mp4','DaNang'],['🖼️','ChuaThienMu.jpg','Hue'],['🖼️','BaNaHills.jpg','DaNang'],['🎬','SongHuong.mp4','Hue']];
  const e=_el(_shell('Xếp tệp vào cây thư mục','Bấm một <b>tệp</b> (sáng lên) rồi bấm <b>thư mục</b> để chuyển tệp vào. Bấm tệp đã xếp để xem <b>đường dẫn</b>.',
   `<style>.m-t7ql{display:grid;grid-template-columns:1fr 1fr;gap:12px}.m-t7ql .pool,.m-t7ql .dir{border:2px dashed #cbd5e1;border-radius:12px;padding:8px;min-height:90px}
   .m-t7ql .dir{border-style:solid;cursor:pointer;background:#fffbeb}.m-t7ql .dir h4{margin:0 0 6px}.m-t7ql .f{display:inline-block;margin:3px;padding:6px 10px;border-radius:999px;background:#e0f2fe;cursor:pointer;font-weight:600}
   .m-t7ql .f.on{background:#2563eb;color:#fff;transform:scale(1.08)}.m-t7ql .path{grid-column:1/-1;font:700 16px Consolas,monospace;background:#0f172a;color:#86efac;padding:10px;border-radius:10px}</style>
   <div class="m-t7ql"><div class="pool" style="grid-column:1/-1"><b>📂 D:\\DuLich (lộn xộn)</b><br></div>
   <div class="dir" data-d="Hue"><h4>📁 Hue</h4></div><div class="dir" data-d="DaNang"><h4>📁 DaNang</h4></div>
   <div class="path">D:\\DuLich\\…</div></div><p class="kq" style="text-align:center;font-weight:700">Đã xếp đúng: 0/6</p>`));
  const pool=e.querySelector('.pool'),path=e.querySelector('.path'); let sel=null;
  F.forEach((f,k)=>{const s=_el(`<span class="f" data-k="${k}">${f[0]} ${f[1]}</span>`); pool.appendChild(s);
    s.onclick=ev=>{ev.stopPropagation(); e.querySelectorAll('.f').forEach(x=>x.classList.remove('on')); s.classList.add('on'); sel=s; const d=s.parentElement.dataset.d; path.textContent='D:\\DuLich\\'+(d?d+'\\':'')+f[1]; FX.play('tick');};});
  const cnt=()=>{const n=[...e.querySelectorAll('.dir .f')].filter(s=>F[+s.dataset.k][2]===s.parentElement.dataset.d).length; e.querySelector('.kq').textContent='Đã xếp đúng: '+n+'/6'+(n===6?' 🎉':''); if(n===6) FX.play('win');};
  e.querySelectorAll('.dir').forEach(d=>d.onclick=()=>{if(!sel) return; d.appendChild(sel); const f=F[+sel.dataset.k]; path.textContent='D:\\DuLich\\'+d.dataset.d+'\\'+f[1];
    FX.play(f[2]===d.dataset.d?'ding':'whoosh'); sel.classList.remove('on'); sel=null; cnt();});
  return e;
};
SIMS_BAI.qlSaoLuu=function(){
  const e=_el(_shell('Sự cố ổ cứng','Chọn <b>cách lưu</b> bài báo cáo, rồi bấm <b>⚡ Gây sự cố</b>. Thử cả ba cách.',
   `<div class="sim-ctl"><div><b>Cách lưu</b> ${_seg('c',[['0','Chỉ trên ổ cứng máy'],['1','2 bản trên cùng ổ cứng'],['2','Ổ cứng + Google Drive'],['3','Ổ cứng + USB']],'0')}</div>
    <div><b>Sự cố</b> ${_seg('s',[['hdd','💥 Hỏng ổ cứng'],['vir','🦠 Virus xoá tệp']],'hdd')}</div><button type="button" class="btn acc run">⚡ Gây sự cố</button></div>
    <div class="kq" style="margin:12px 0;padding:16px;border-radius:12px;background:#f1f5f9;font-weight:700;text-align:center;font-size:18px">📄 bao-cao.docx đang an toàn</div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Cách lưu</th><th>Sự cố</th><th>Kết quả</th></tr></table>`));
  let c='0',s='hdd'; const hist=[],kq=e.querySelector('.kq'),N=['Chỉ ổ cứng','2 bản cùng ổ','Ổ cứng + Drive','Ổ cứng + USB'];
  _wireSeg(e,(n,v)=>{if(n==='c')c=v; else s=v;});
  e.querySelector('.run').onclick=()=>{FX.play('drum'); kq.textContent='⏳ …'; setTimeout(()=>{const ok=c>='2';
    kq.style.background=ok?'#dcfce7':'#fee2e2'; kq.innerHTML=ok?'✅ Ổ cứng mất bài, nhưng còn bản sao ở '+(c==='2'?'☁️ Google Drive':'💾 USB')+' → khôi phục được!':'❌ Mất hết! '+(c==='1'?'Hai bản cùng nằm trên ổ hỏng.':'Không có bản sao nào.');
    hist.unshift([N[+c],s==='hdd'?'Hỏng ổ cứng':'Virus',ok?'Còn dữ liệu':'Mất dữ liệu']); if(hist.length>6) hist.pop(); histTable(e,hist,(v,j)=>j===2?(ok?'g':'r'):''); FX.play(ok?'win':'tick');},800);};
  return e;
};

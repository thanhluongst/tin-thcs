/* Tin học 7 · Bài 5. Ứng xử trên mạng · 1 tiết. Soạn lại cho lớp học LAN.
   Mô phỏng: "uxBinhLuan" (chọn cách bình luận → cảm xúc người nhận), "uxNghien" (thanh trượt thời gian dùng mạng → sức khoẻ, học tập). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Bình luận dưới ảnh của Hoa',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p><b>Hoa</b> đăng ảnh bức tranh em vẽ cho cuộc thi. Mỗi bình luận có thể làm Hoa vui hoặc buồn. Em hãy chọn từng bình luận và quan sát cảm xúc của Hoa.</p>',
  qs:[{id:'s1',type:'sim',sim:'uxBinhLuan'},
      {id:'q1',type:'single',q:'Quan sát: Bình luận chê bai, chế giễu khiến người nhận thế nào?',opts:['Vui hơn','Buồn, tổn thương','Không ảnh hưởng','Muốn vẽ nhiều hơn'],ok:1},
      {id:'q2',type:'single',q:'Muốn góp ý cho Hoa, cách nào phù hợp?',opts:['Viết chữ in hoa, nhiều dấu chấm than','Lịch sự, khen điểm tốt rồi góp ý cụ thể','Chia sẻ ảnh kèm lời chế giễu','Không nói gì mà báo cáo bài'],ok:1}],
  key:['Trên mạng cũng cần <b>lịch sự, tôn trọng</b> như ngoài đời.']},
 {t:'Giao tiếp có văn hoá trên mạng',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Quy tắc ứng xử: <b>tôn trọng</b> người khác, <b>không</b> đăng tin sai sự thật, <b>không</b> dùng lời lẽ xúc phạm, <b>bảo vệ</b> thông tin cá nhân của mình và người khác.</p>',
  qs:[{id:'h1',type:'sort',q:'Hành vi nào có văn hoá?',cols:{c0:'Có văn hoá',c1:'Không có văn hoá'},items:[{t:'Chào hỏi, cảm ơn khi được giúp',a:'c0'},{t:'Đăng ảnh bạn khi chưa xin phép',a:'c1'},{t:'Dùng tên giả để nói xấu người khác',a:'c1'},{t:'Góp ý nhẹ nhàng, cụ thể',a:'c0'},{t:'Viết toàn chữ IN HOA để quát',a:'c1'},{t:'Trích dẫn nguồn khi dùng ảnh của người khác',a:'c0'}]},
      {id:'h2',type:'single',q:'Khi bị bắt nạt qua mạng, em nên làm gì <b>trước tiên</b>?',opts:['Đáp trả lại gay gắt','Giữ bằng chứng, báo bố mẹ/thầy cô','Xoá tài khoản ngay, không nói ai','Rủ bạn bè cùng chửi lại'],ok:1}],
  key:['<b>Tôn trọng, trung thực, bảo vệ thông tin</b>; bị bắt nạt → <b>giữ bằng chứng, báo người lớn</b>.']},
 {t:'Nghiện Internet',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p><b>Khoa</b> chơi game, lướt video tới khuya. Kéo thanh <b>giờ dùng mạng mỗi ngày</b> và quan sát giấc ngủ, mắt, kết quả học tập.</p>',
  qs:[{id:'s2',type:'sim',sim:'uxNghien'},
      {id:'n1',type:'multi',q:'Chọn các <b>dấu hiệu</b> nghiện Internet.',opts:['Bứt rứt khi không được lên mạng','Bỏ bữa, thức khuya để chơi','Dùng mạng tra cứu bài 30 phút','Kết quả học tập giảm sút','Ít trò chuyện với gia đình'],ok:[0,1,3,4]},
      {id:'n2',type:'single',q:'Cách phòng tránh nghiện Internet là:',opts:['Để điện thoại cạnh gối','Đặt giới hạn thời gian, tham gia thể thao, hoạt động ngoài trời','Chơi bù vào cuối tuần','Tắt thông báo của bố mẹ'],ok:1}],
  key:['Dùng mạng <b>có giới hạn</b>; cân bằng với <b>học tập, thể thao, gia đình</b>.']},
 {t:'Thử thách nhanh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>⏱ 3 phút!</p>',
  qs:[{id:'l1',type:'tf',q:'Đúng hay sai?',items:[{t:'Trên mạng không ai biết mình là ai nên nói gì cũng được',a:'F'},{t:'Đăng thông tin sai sự thật có thể bị xử phạt',a:'T'},{t:'Không nên gửi ảnh cá nhân cho người lạ',a:'T'}]},
      {id:'l2',type:'single',q:'Một người lạ nhắn tin xin địa chỉ nhà em để “gửi quà”. Em sẽ:',opts:['Gửi ngay','Không cung cấp, báo người lớn','Gửi địa chỉ trường','Hỏi tên rồi gửi'],ok:1}],
  key:['Nói không với <b>người lạ</b> xin thông tin.']},
 {t:'Thông điệp của lớp',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Lớp làm bảng tin “Ứng xử đẹp trên mạng”.</p>',
  qs:[{id:'v1',type:'text',q:'Viết một khẩu hiệu ngắn (≤15 chữ) về ứng xử có văn hoá trên mạng.',ans:'VD: “Nghĩ trước khi đăng – Tôn trọng trước khi bình luận.”'}],
  key:['Lan toả <b>hành vi đẹp</b> trên mạng.']},
 {t:'Tổng kết',hd:'Tổng kết · 3 phút',code:'',phut:3,
  story:'<p>Mỗi bình luận là một hành động thật, với người thật.</p>',
  qs:[{id:'t1',type:'single',q:'Câu nào đúng?',opts:['Ứng xử trên mạng không cần văn hoá','Cần tôn trọng người khác, bảo vệ thông tin và dùng mạng có giới hạn','Nên đăng mọi thứ mình nghĩ','Nghiện Internet không có hại'],ok:1}],
  key:['<b>Văn hoá – an toàn – điều độ</b> khi dùng mạng.']}
];
const GHIBAI={so:'Bài 5:',ten:'ỨNG XỬ TRÊN MẠNG',muc:[
 {step:2,h:'Giao tiếp có văn hoá',it:['<b>Tôn trọng</b>, lịch sự; không xúc phạm, không tin sai.','Bảo vệ <b>thông tin cá nhân</b>; bị bắt nạt → <b>báo người lớn</b>.']},
 {step:3,h:'Nghiện Internet',it:['Dấu hiệu: bứt rứt, thức khuya, học sút.','Phòng tránh: <b>giới hạn thời gian</b>, thể thao, gia đình.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.uxBinhLuan=function(){
  const C=[['Đẹp quá! Màu trời rất có hồn 😍',2],['Vẽ gì xấu thế, trẻ con à?',-2],['Bố cục đẹp. Mình nghĩ thêm bóng cây sẽ có chiều sâu hơn 👍',2],['HAHA NHÌN NHƯ TRANH CON NÍT!!!',-3],['Chúc bạn đạt giải nhé!',1],['Chép mạng chứ gì 🙄',-2]];
  const e=_el(_shell('Bình luận và cảm xúc','Bấm một <b>bình luận</b> để gửi tới Hoa. Quan sát khuôn mặt và thanh tâm trạng.',
   `<style>.m-t7ux{display:grid;grid-template-columns:150px 1fr;gap:14px;align-items:start}.m-t7ux .face{font-size:84px;text-align:center;transition:.3s}
   .m-t7ux .bar{height:16px;border-radius:9px;background:#e2e8f0;overflow:hidden}.m-t7ux .bar i{display:block;height:100%;transition:.4s}
   .m-t7ux .cm{display:block;width:100%;text-align:left;margin:5px 0;padding:10px;border-radius:12px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer;font-size:15px}
   @media(max-width:560px){.m-t7ux{grid-template-columns:1fr}}</style>
   <div class="m-t7ux"><div><div style="text-align:center;font-weight:700">🖼️ Tranh của Hoa</div><div class="face">🙂</div><div class="bar"><i></i></div><div class="lb" style="text-align:center;font-weight:700;margin-top:4px"></div></div>
   <div>${C.map((c,k)=>`<button type="button" class="cm" data-k="${k}">💬 ${c[0]}</button>`).join('')}</div></div>`));
  let m=5; const f=e.querySelector('.face'),bar=e.querySelector('.bar i'),lb=e.querySelector('.lb'),up=()=>{m=Math.max(0,Math.min(10,m));
    f.textContent=m>=8?'😄':m>=5?'🙂':m>=3?'😟':'😢'; bar.style.width=m*10+'%'; bar.style.background=m>=5?'#22c55e':'#ef4444'; lb.textContent='Tâm trạng: '+m+'/10';}; up();
  e.querySelectorAll('.cm').forEach(b=>b.onclick=()=>{const c=C[+b.dataset.k]; m+=c[1]; up(); b.style.background=c[1]>0?'#dcfce7':'#fee2e2'; FX.play(c[1]>0?'ding':'drum');});
  return e;
};
SIMS_BAI.uxNghien=function(){
  const e=_el(_shell('Một ngày của Khoa','Kéo thanh <b>số giờ dùng mạng để giải trí mỗi ngày</b>. Quan sát các chỉ số.',
   `<style>.m-t7ng .row{display:grid;grid-template-columns:150px 1fr 60px;gap:8px;align-items:center;margin:8px 0;font-weight:600}.m-t7ng .b{height:18px;border-radius:9px;background:#e2e8f0;overflow:hidden}.m-t7ng .b i{display:block;height:100%;transition:.3s}</style>
   <div style="text-align:center;font-size:20px;font-weight:800">📱 <span class="h">1</span> giờ/ngày <span class="ic"></span></div>
   <input type="range" min="0" max="10" value="1" style="width:100%;margin:10px 0">
   <div class="m-t7ng">${['😴 Giấc ngủ','👀 Sức khoẻ mắt','📚 Kết quả học','👨‍👩‍👧 Thời gian gia đình'].map((n,k)=>`<div class="row"><span>${n}</span><span class="b"><i data-k="${k}"></i></span><b data-v="${k}"></b></div>`).join('')}</div>
   <div class="kq" style="text-align:center;font-weight:700;padding:10px;border-radius:10px"></div>`));
  const r=e.querySelector('input'),go=()=>{const h=+r.value; e.querySelector('.h').textContent=h; e.querySelector('.ic').textContent=h<=2?'✅':h<=4?'⚠️':'🚨';
    const v=[100-Math.max(0,h-2)*12,100-h*8,100-Math.max(0,h-2)*11,100-h*9].map(x=>Math.max(5,x));
    e.querySelectorAll('.m-t7ng i').forEach((i,k)=>{i.style.width=v[k]+'%'; i.style.background=v[k]>70?'#22c55e':v[k]>40?'#f59e0b':'#ef4444'; e.querySelector(`[data-v="${k}"]`).textContent=v[k]+'%';});
    const kq=e.querySelector('.kq'); kq.style.background=h<=2?'#dcfce7':h<=4?'#fef9c3':'#fee2e2'; kq.textContent=h<=2?'Cân bằng tốt!':h<=4?'Bắt đầu ảnh hưởng – nên giảm bớt.':'Dấu hiệu nghiện Internet!';};
  r.oninput=()=>{go(); FX.play('tick');}; go();
  return e;
};

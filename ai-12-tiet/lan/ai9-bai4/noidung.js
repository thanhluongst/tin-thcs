/* Giáo dục AI lớp 9 · Bài 4 (1 tiết) – soạn theo KHBD-AI-LOP 9. Số liệu mô phỏng, giả định. */
const BAI={lop:9,so:4,ten:'Kiến tạo AI công bằng bằng dữ liệu đa dạng',yccd:'9.B3.1 · 9.B3.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Trợ lí giọng nói nhận sai',hd:'Hoạt động 1 · Mở đầu',code:'9.B3.1',ic:'chat',
  story:'Trợ lí giọng nói của trường (giả định) hiểu rất tốt giọng các bạn ở thành phố, nhưng hay nhận sai giọng các bạn từ vùng khác và giọng ông bà.',
  qs:[{id:'pred',type:'text',q:'Em đoán vì sao?',short:1,ans:'Có nhiều lí do (ồn, micro…); một nguyên nhân là dữ liệu huấn luyện thiếu giọng vùng miền, người lớn tuổi – sẽ kiểm tra bằng số liệu.'}],
  key:['Có nhiều lí do; ta sẽ <b>kiểm tra bằng số liệu</b>.']},
 {t:'Xem kết quả theo từng nhóm',hd:'Hoạt động 2 · Hình thành kiến thức',code:'9.B3.1',ic:'scale',
  story:'Mô phỏng: chọn cách thu thập 1 000 mẫu giọng nói để huấn luyện, rồi xem độ chính xác <b>theo từng nhóm người dùng</b>.',
  qs:[{id:'sim1',type:'sim',sim:'voice'},
   {id:'obs1',type:'single',q:'Thu "dữ liệu dễ lấy nhất" (học sinh thành phố) thì…',opts:['Mọi nhóm đều tốt như nhau','Nhóm bị bỏ sót bị nhận sai nhiều – AI không công bằng','Không ảnh hưởng'],ok:1},
   {id:'cb',type:'multi',q:'AI công bằng cần công bằng về…',opts:['Cơ hội: ai cũng được phục vụ','Kết quả: độ chính xác không chênh lệch lớn giữa các nhóm','Quy trình: cách thu thập, kiểm thử minh bạch','Chỉ cần đúng với đa số'],ok:[0,1,2]}],
  key:['Dữ liệu <b>"dễ lấy nhất"</b> thường <b>bỏ sót</b> nhóm cần phục vụ. AI cần công bằng về <b>cơ hội, kết quả, quy trình</b>.']},
 {t:'Thu thập dữ liệu công bằng',hd:'Hoạt động 3–4 · Luyện tập, vận dụng',code:'9.B3.2',ic:'paper',
  story:'Nhóm em lập kế hoạch thu thập dữ liệu giọng nói cho trợ lí của trường.',
  qs:[{id:'lab',type:'sim',sim:'lab_caytrong'},{id:'cach',type:'sort',q:'Cách làm này…',cols:{tot:'Bảo đảm công bằng',chua:'Dễ thiên vị, bỏ sót'},items:[
     {t:'Thu đủ các nhóm: vùng miền, tuổi, giới',a:'tot'},{t:'Chỉ thu giọng các bạn trong lớp mình cho nhanh',a:'chua'},{t:'Xin đồng ý trước khi ghi âm',a:'tot'},
     {t:'Kiểm thử độ chính xác riêng cho từng nhóm',a:'tot'},{t:'Lấy giọng nói trên mạng không hỏi ai',a:'chua'},{t:'Bổ sung mẫu cho nhóm đang bị nhận sai nhiều',a:'tot'}]},
   {id:'kh',type:'text',q:'Kế hoạch thu thập dữ liệu công bằng của nhóm (3 ý)',ans:'Ví dụ: (1) thu đủ học sinh 4 khối, phụ huynh, ông bà, giọng nhiều vùng; (2) xin đồng ý, không lưu tên; (3) kiểm thử theo từng nhóm, nhóm nào thấp thì thu thêm.'}],
  key:['<b>Đủ các nhóm – đa dạng – xin đồng ý – kiểm thử theo nhóm</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 4:',ten:'KIẾN TẠO AI CÔNG BẰNG BẰNG DỮ LIỆU ĐA DẠNG',muc:[
 {step:2,h:'Vì sao cần dữ liệu đa dạng',it:['Dữ liệu dễ lấy nhất thường bỏ sót nhóm cần phục vụ.','Công bằng về cơ hội, kết quả, quy trình.']},
 {step:3,h:'Thu thập công bằng',it:[],flow:['Đủ các nhóm','Đa dạng','Xin đồng ý','Kiểm thử theo nhóm']}]};
function renderGhiBai(){}
const QCODE={pred:'9.B3.1',obs1:'9.B3.1',cb:'9.B3.1',cach:'9.B3.2',kh:'9.B3.2'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}

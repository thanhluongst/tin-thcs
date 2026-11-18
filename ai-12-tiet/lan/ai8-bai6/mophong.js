/* Mô phỏng Bài 6 lớp 8 – chỉ để minh hoạ, số liệu giả định. Hàm tiện ích có sẵn trong khung lop/mophong.js; hàm phụ phải nằm TRONG SIMS. */
const SIMS={
/* Máy đoán cảm xúc: "Ừ, được thôi." */
emo(){
  const D={mat:{cuoi:['😊 Mỉm cười',2],nhiu:['😣 Nhíu mày',-2],an:['🙈 Không thấy mặt',0]},ngu:{vui:['🎵 Giọng cao, nhanh',1.5],tram:['🎻 Giọng trầm, đều',-1.5],an:['🔇 Không nghe giọng',0]},cu:{gat:['👍 Gật đầu',1],quay:['↩️ Quay đi',-1.5],an:['— Không thấy',0]}};
  const st={mat:'an',ngu:'an',cu:'an',guess:null,hist:[]};
  const e=_el(_shell('Máy đoán cảm xúc',
   'Câu chữ máy nhận được: <b>“Ừ, được thôi.”</b> (từ khoá trung tính). Chọn thêm các dấu hiệu máy <b>thấy được</b>, bấm <b>▶ Máy đoán</b>, rồi <b>💬 Hỏi Hùng</b>. Thử ít nhất 4 tổ hợp.',
   `<div class="sim-ctl">${Object.keys(D).map(k=>`<div><label>${{mat:'Nét mặt',ngu:'Ngữ điệu',cu:'Cử chỉ'}[k]}</label>${_seg(k,Object.keys(D[k]).map(v=>[v,D[k][v][0]]),'an')}</div>`).join('')}</div>
    <button type="button" class="btn acc run">▶ Máy đoán</button> <button type="button" class="btn ask">💬 Hỏi Hùng</button>
    <div class="out" style="margin:10px 0;font-size:18px;font-weight:700"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Số dấu hiệu</th><th>Máy đoán</th><th>Tự tin</th><th>Hùng nói</th></tr><tr class="empty"><td colspan="5">Chưa có.</td></tr></table>`));
  _wireSeg(e,(n,v)=>{st[n]=v;st.guess=null;});
  e.querySelector('.run').onclick=()=>{ if(window.FX) FX.play('whoosh');
    const s=['mat','ngu','cu'].reduce((t,k)=>t+D[k][st[k]][1],0), n=['mat','ngu','cu'].filter(k=>st[k]!=='an').length;
    const lab=s>0.5?'😊 Vui':s<-0.5?'😞 Không vui':'😐 Trung tính';
    const conf=Math.min(95,Math.round(40+Math.abs(s)*10+n*8));
    st.guess={lab,conf,n,s}; e.querySelector('.out').innerHTML=`🤖 Máy đoán: ${lab} – tự tin ${conf}%<div style="height:12px;background:#e5e7eb;border-radius:9px;overflow:hidden;max-width:360px"><i style="display:block;height:100%;width:${conf}%;background:#7c3aed"></i></div>`;
    if(window.FX) FX.play('ding');};
  e.querySelector('.ask').onclick=()=>{ const g=st.guess; if(!g){e.querySelector('.out').textContent='Hãy cho máy đoán trước.';return;}
    /* Hùng thật: phần lớn khớp dấu hiệu, nhưng đôi khi khác (Hùng hay cười khi lo lắng) */
    const r=Math.random(), truth=g.n===0?(r<.5?'😟 Hơi lo vì sợ nói trước lớp':'😊 Vui, thích được thuyết trình'):(r<(g.n>=2?.75:.55)?g.lab.replace('😐 Trung tính','😐 Bình thường'):(g.s>0?'😟 Hồi hộp, cười cho đỡ ngại':'😊 Ổn mà, chỉ đang mệt'));
    const ok=truth.slice(0,2)===g.lab.slice(0,2);
    e.querySelector('.out').insertAdjacentHTML('beforeend',`<p>💬 Hùng: “${truth}” – ${ok?'✅ máy đoán khớp':'❌ máy đoán sai dù tự tin '+g.conf+'%'}</p>`);
    st.hist.unshift([g.n,g.lab,g.conf+'%',truth]); st.hist=st.hist.slice(0,6); histTable(e,st.hist,(v,j)=>j===3?(ok?'g':'r'):'');
    st.guess=null; if(window.FX) FX.play(ok?'win':'tick');};
  return e;
}
};

/* Vào lớp bằng số căn cước: từng bạn ngồi máy này nhập số căn cước → xác minh đúng họ tên → thêm vào nhóm (tối đa 4 bạn). */
function joinView(){
  const MEM=[]; let pend=null;
  const draw=()=>{
    $('#app').innerHTML=`<section class="card hero"><div>
     <div class="eyebrow">Tin học ${esc(BAI.lop)} · Buổi ${esc(BAI.buoi)}</div><h1>${esc(BAI.ten)}</h1>
     <p class="lead">Thầy cô điều khiển bài học trên máy chiếu. Màn hình của em tự chuyển theo từng hoạt động. Em làm bài, bấm <b>Nộp</b>, rồi cùng cả lớp xem kết quả.</p></div>
     <div>${IC.scale||''}<form id="jf" autocomplete="off">
     ${MEM.length?`<label class="f">Các bạn ngồi máy này</label>${MEM.map((m,k)=>`<div class="sortrow"><span><b>${k+1}.</b> ${esc(m.ten)} – ${esc(m.lop)}</span><button type="button" class="btn ghost" data-x="${k}">Bỏ</button></div>`).join('')}`:''}
     ${pend?`<div class="key" style="margin-top:10px"><h3>Em có phải là bạn này không?</h3><p style="font-size:24px;font-weight:800;margin:6px 0">${esc(pend.ten)}</p><p>Lớp <b>${esc(pend.lop)}</b></p>
        <button type="button" class="btn acc" id="ok1" style="width:100%">Đúng là em</button><button type="button" class="btn ghost" id="no1" style="width:100%;margin-top:6px">Không phải em – nhập lại</button></div>`
     :MEM.length<4?`<label class="f">${MEM.length?'Bạn tiếp theo ngồi chung máy (nếu có): số căn cước':'Số căn cước của em (12 chữ số)'}</label>
        <input type="text" id="cc" inputmode="numeric" maxlength="12" placeholder="0xxxxxxxxxxx">
        <button type="button" class="btn ${MEM.length?'ghost':'acc'}" id="tra" style="width:100%;margin-top:8px">${MEM.length?'+ Thêm bạn ngồi chung máy':'Tiếp tục'}</button>`:''}
     ${MEM.length&&!pend?`<label class="f" style="margin-top:12px">Số máy (nếu có)</label><input type="text" id="may" placeholder="Ví dụ: 05">
        <button class="btn acc" style="width:100%;margin-top:10px">Vào lớp học →</button>`:''}
     <p class="hint" id="jmsg">Mỗi bạn tự nhập số căn cước của mình và kiểm tra đúng họ tên.</p></form></div></section>`;
    const cc=$('#cc'); if(cc){cc.oninput=()=>{cc.value=cc.value.replace(/\D/g,'').slice(0,12);}; cc.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('#tra').click();}}; cc.focus();}
    if($('#tra')) $('#tra').onclick=async()=>{const v=cc.value; if(!/^\d{12}$/.test(v)){$('#jmsg').textContent='Số căn cước phải đủ 12 chữ số.';return;}
      if(MEM.some(m=>m.cccd===v)){$('#jmsg').textContent='Bạn này đã có trong nhóm.';return;}
      try{const r=await fetch('/dn/tra',{method:'POST',body:JSON.stringify({cccd:v})}).then(r=>r.json()); if(!r.ok) throw new Error(r.error); pend={cccd:v,ten:r.ten,lop:r.lop}; draw();}
      catch(e){$('#jmsg').textContent=e.message;}};
    if($('#ok1')) {$('#ok1').onclick=()=>{MEM.push(pend); pend=null; draw();}; $('#ok1').focus();}
    if($('#no1')) $('#no1').onclick=()=>{pend=null; draw(); $('#jmsg').textContent='Em nhập lại số căn cước của mình cho đúng.';};
    document.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{MEM.splice(+b.dataset.x,1); draw();});
    $('#jf').onsubmit=async e=>{e.preventDefault(); if(!MEM.length||pend) return;
      const may=($('#may')||{}).value||'';
      try{const r=await api('api/join',{cccds:MEM.map(m=>m.cccd),may:may.trim()}); if(!r.id) throw new Error(r.err||'Không vào được lớp');
        ME={id:r.id,name:r.members.join(', '),cls:r.cls,may:may.trim(),members:r.members}; MEM.length=0;
        try{localStorage.setItem(ROOM+'-me',JSON.stringify(ME));}catch(_){}
        $('#who').textContent=whoText(); FX.unlock(); FX.play('join'); shown=''; poll();}
      catch(err){$('#jmsg').textContent=err.message||'Không kết nối được máy thầy cô.';}};
  };
  draw();
}
function logout(){ if(!confirm('Đăng xuất? Bài đã nộp vẫn lưu trên máy thầy cô; đăng nhập lại đúng nhóm là xem tiếp.')) return; ME={}; try{localStorage.removeItem(ROOM+'-me');}catch(_){} location.reload(); }

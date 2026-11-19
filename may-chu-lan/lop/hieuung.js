/* Hiệu ứng âm thanh (tự tổng hợp, không cần file, chạy offline) và đồ hoạ: linh vật, băng rôn, pháo giấy, bục vinh quang */
const FX=(()=>{
  let ctx=null, on=true; try{on=localStorage.getItem('ai-sound')!=='off';}catch(e){}
  function ac(){ if(!ctx){const A=window.AudioContext||window.webkitAudioContext; if(!A) return null; ctx=new A();} if(ctx.state==='suspended') ctx.resume(); return ctx;}
  function tone(f,t0,d,type,v,f2){const c=ac(); if(!c) return; const t=c.currentTime+t0, o=c.createOscillator(), g=c.createGain();
    o.type=type||'sine'; o.frequency.setValueAtTime(f,t); if(f2) o.frequency.exponentialRampToValueAtTime(f2,t+d);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(v||.15,t+.012); g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+d+.05);}
  function noise(t0,d,v,hp){const c=ac(); if(!c) return; const t=c.currentTime+t0, n=Math.floor(c.sampleRate*d), b=c.createBuffer(1,n,c.sampleRate), a=b.getChannelData(0);
    for(let i=0;i<n;i++) a[i]=(Math.random()*2-1)*(1-i/n); const s=c.createBufferSource(); s.buffer=b; const f=c.createBiquadFilter(); f.type='bandpass'; f.frequency.value=hp||1200;
    const g=c.createGain(); g.gain.value=v||.2; s.connect(f); f.connect(g); g.connect(c.destination); s.start(t);}
  const fan=(t)=>{[523,659,784,1047].forEach((f,k)=>tone(f,t+k*.11,.32,'triangle',.13)); tone(1047,t+.46,.6,'sine',.1); tone(1568,t+.46,.6,'sine',.05);};
  const S={
    tick:()=>tone(1100,0,.05,'triangle',.06),
    join:()=>{tone(523,0,.13,'triangle',.12);tone(659,.1,.13,'triangle',.12);tone(784,.2,.25,'triangle',.12);},
    bell:()=>{tone(1046,0,.9,'sine',.13);tone(2093,0,.5,'sine',.04);tone(1318,.18,.8,'sine',.08);},
    submit:()=>{noise(0,.18,.12,2500);tone(500,0,.16,'sine',.1,1200);tone(1320,.17,.12,'triangle',.08);},
    reveal:()=>{[392,523,659].forEach((f,k)=>tone(f,k*.1,.3,'triangle',.12));},
    win:()=>fan(0),
    sparkle:()=>{[1319,1568,1760,2093,2637,3136].forEach((f,k)=>tone(f,k*.055,.22,'sine',.06));},
    whoosh:()=>{noise(0,.35,.18,800);tone(300,0,.35,'sine',.05,900);},
    ding:()=>{tone(1568,0,.5,'sine',.1);tone(2093,.08,.4,'sine',.05);},
    vote:()=>{tone(784,0,.08,'square',.05);tone(1046,.07,.12,'square',.05);},
    drum:()=>{for(let k=0;k<14;k++) noise(k*.06,.05,.16+k*.01,180+k*10); fan(.9);}
  };
  return {play(n){ if(!on) return; try{S[n]&&S[n]();}catch(e){} }, unlock(){try{ac();}catch(e){}},
    get on(){return on;}, toggle(){on=!on; try{localStorage.setItem('ai-sound',on?'on':'off');}catch(e){} return on;}};
})();
document.addEventListener('pointerdown',()=>FX.unlock(),{once:true});

/* Pháo giấy / sao bay */
function confetti(kind,n){
  const cv=document.createElement('canvas'); cv.className='fxcanvas'; document.body.appendChild(cv);
  const W=cv.width=innerWidth, H=cv.height=innerHeight, g=cv.getContext('2d');
  const col=['#e2932b','#1d4e89','#1f8a5b','#c2413b','#6a4bc4','#0e8a8a','#f2c94c'];
  const P=[...Array(n||(kind==='star'?40:160))].map(()=>({x:W/2+(Math.random()-.5)*W*.5,y:H*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,r:Math.random()*6+4,c:col[Math.floor(Math.random()*col.length)],a:Math.random()*6,va:(Math.random()-.5)*.3}));
  const t0=performance.now();
  (function fr(t){const k=(t-t0)/2600; g.clearRect(0,0,W,H);
    P.forEach(p=>{p.vy+=.35; p.vx*=.99; p.x+=p.vx; p.y+=p.vy; p.a+=p.va; g.save(); g.globalAlpha=Math.max(0,1-k); g.translate(p.x,p.y); g.rotate(p.a);
      if(kind==='star'){g.font=(p.r*4)+'px serif'; g.fillText('⭐',-p.r*2,p.r*2);} else {g.fillStyle=p.c; g.fillRect(-p.r,-p.r/2,p.r*2,p.r);} g.restore();});
    if(k<1) requestAnimationFrame(fr); else cv.remove();})(t0);
}

/* Linh vật "Bé AI" */
function mascotSvg(sz){return `<svg class="bot" width="${sz||86}" height="${sz||86}" viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="26" ry="4" fill="#16233a" opacity=".12"/>
 <path d="M50 14v-6" stroke="#1d4e89" stroke-width="4" stroke-linecap="round"/><circle class="ant" cx="50" cy="7" r="5" fill="#e2932b"/>
 <rect x="18" y="16" width="64" height="50" rx="18" fill="#2f6fb5"/><rect x="25" y="23" width="50" height="34" rx="12" fill="#e7f1ff"/>
 <g class="eyes"><ellipse cx="40" cy="39" rx="5" ry="6.5" fill="#16233a"/><ellipse cx="60" cy="39" rx="5" ry="6.5" fill="#16233a"/><circle cx="42" cy="36.5" r="1.8" fill="#fff"/><circle cx="62" cy="36.5" r="1.8" fill="#fff"/></g>
 <path d="M42 49q8 6 16 0" stroke="#e2932b" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="31" cy="48" r="3.5" fill="#f7a8a8" opacity=".7"/><circle cx="69" cy="48" r="3.5" fill="#f7a8a8" opacity=".7"/>
 <rect x="30" y="66" width="40" height="22" rx="9" fill="#1d4e89"/><text x="50" y="82" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" font-family="Segoe UI,Arial">AI</text>
 <rect class="arm" x="8" y="62" width="20" height="8" rx="4" fill="#2f6fb5"/><rect x="72" y="62" width="20" height="8" rx="4" fill="#2f6fb5"/></svg>`;}
const TIPS=[];   /* bài Tin học: không dùng lời nhắc riêng của bài AI */
const THEME=[['#1d4e89','#2f6fb5','🎒'],['#e2932b','#f2b65a','🤔'],['#6a4bc4','#8f74e0','🤖'],['#1d4e89','#3f86d6','⚖️'],['#0e8a8a','#2fb3a6','📝'],['#c2413b','#e0716b','🎯'],['#1f8a5b','#3fb57f','✍️'],['#b7791f','#e2b04a','🌟']];
/* Băng rôn đầu mỗi hoạt động (thay cho tiêu đề cũ) */
function stepHead(i){const s=STEPS[i], p=phaseOf(s), n=STEPS.length-2, bc=(String(s.hd||'').match(/Bướcs*d+/i)||[''])[0];
  return `<div class="scene ph-${p.k}" style="--c1:var(--ph);--c2:color-mix(in srgb,var(--ph) 70%,#fff)"><div class="scene-deco"><i></i><i></i><i></i></div>
   <div class="scene-txt"><div class="sh-top"><span class="sh-ph">${p.ic} ${p.ten}</span>${bc?`<span class="sh-b">${bc}</span>`:''}${i>0&&i<=n?`<span class="sh-n">Hoạt động <b>${i}</b>/${n}</span>`:''}</div><h2>${s.t}</h2>${s.code?`<span class="scene-code">${s.code}</span>`:''}</div>
   <div class="scene-bot">${mascotSvg(92)}${TIPS[i]?`<div class="say">${TIPS[i]}</div>`:''}</div></div>`;}
/* Bục vinh quang trên bảng xếp hạng */
const _renderRank=renderRank;
renderRank=function(rows,myId){
  const top=rows.slice(0,3).filter(r=>r.pts>0); const ord=[1,0,2].filter(k=>top[k]);
  const pod=top.length?`<div class="podium">${ord.map(k=>`<div class="pd p${k+1} ${top[k].id===myId?'me':''}"><div class="pd-n">${esc(top[k].label)}</div><div class="pd-s">${top[k].pts} điểm</div><div class="pd-b"><span>${['🥇','🥈','🥉'][k]}</span></div></div>`).join('')}</div>`:'';
  return pod+_renderRank(rows,myId);
};
function soundBtn(){return `<button class="sndbtn" type="button" title="Bật/tắt âm thanh" onclick="this.textContent=FX.toggle()?'🔊':'🔇'">${FX.on?'🔊':'🔇'}</button>`;}

/* Đồng hồ đếm ngược dùng chung (giáo viên bấm, mọi máy cùng thấy) */
const CLOCK={end:0,id:null,iv:null,
  set(t){ if(!t){this.stop();return;} if(t.id===this.id) return; this.id=t.id; this.end=Date.now()+t.left*1000; this.run(); FX.play('ding');},
  stop(){this.id=null; this.end=0; clearInterval(this.iv); const e=document.getElementById('clock'); if(e) e.remove();},
  run(){ let e=document.getElementById('clock'); if(!e){e=document.createElement('div'); e.id='clock'; document.body.appendChild(e);}
    clearInterval(this.iv); const tick=()=>{const s=Math.max(0,Math.round((this.end-Date.now())/1000)); e.className=s<=10?'warn':''; e.innerHTML='⏱ '+Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
      if(s<=10&&s>0) FX.play('tick');
      if(s===0){clearInterval(this.iv); FX.play('bell'); e.className='end'; e.innerHTML='⏰ Hết giờ!'; setTimeout(()=>{if(e.className==='end') e.remove();},6000);}};
    tick(); this.iv=setInterval(tick,1000);}
};

/* Âm thanh + hiệu ứng tự động cho MỌI mô phỏng (không phải sửa từng bài) */
(()=>{if(typeof document==='undefined') return;
  document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('.sim button'); if(!b) return; const s=b.closest('.sim');
    if(b.matches('.run,.acc')){FX.play('whoosh'); s.classList.remove('scan'); void s.offsetWidth; s.classList.add('scan'); setTimeout(()=>s.classList.remove('scan'),950);}
    else if(!b.closest('.sseg')) FX.play('tick');},true);
  const seen=new WeakMap();
  new MutationObserver(ms=>ms.forEach(m=>{const t=m.target.closest&&m.target.closest('.sim-hist'); if(!t) return;
    const n=t.querySelectorAll('tr:not(.empty)').length, old=seen.has(t)?seen.get(t):1; seen.set(t,n); if(n<=old) return;
    const r=t.querySelector('tr:nth-child(2)'); if(!r) return; r.classList.add('fresh');
    const s=t.closest('.sim'); if(s){s.classList.remove('flash'); void s.offsetWidth; s.classList.add('flash');}
    setTimeout(()=>FX.play(r.querySelector('.r')?'vote':'ding'),350);}))
   .observe(document.documentElement,{childList:true,subtree:true});
})();

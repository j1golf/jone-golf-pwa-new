
const defaults={
 lessons:[
  {title:"기초 레슨",desc:"스윙의 기본기 완성"},
  {title:"스윙 분석",desc:"개인별 스윙 분석 및 교정"},
  {title:"퍼팅 마스터",desc:"조던 스타일 퍼팅 완성"},
  {title:"숏게임 & 어프로치",desc:"스코어를 줄이는 핵심 기술"},
  {title:"필드 & 코스 매니지먼트",desc:"실전 필드 전략과 멘탈 관리"},
  {title:"주니어/아동 레슨",desc:"성장 단계별 맞춤 지도"}
 ],
 tours:[
  {country:"한국",title:"Korea Golf",price:"상담"},
  {country:"중국",title:"China Golf",price:"상담"},
  {country:"태국",title:"Thailand Golf",price:"상담"},
  {country:"일본",title:"Japan Golf",price:"상담"},
  {country:"필리핀",title:"Philippines Golf",price:"상담"},
  {country:"말레이시아",title:"Malaysia Golf",price:"상담"},
  {country:"인도네시아",title:"Indonesia Golf",price:"상담"},
  {country:"베트남",title:"Vietnam Golf",price:"상담"}
 ]
};
function load(k,f){try{return JSON.parse(localStorage.getItem(k))||f}catch(e){return f}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
let lessons=load("jg_lessons",defaults.lessons),tours=load("jg_tours",defaults.tours),bookings=load("jg_bookings",[]);

function renderPublic(){
 const ll=document.getElementById("lesson-list");
 if(ll)ll.innerHTML=lessons.map((x,i)=>`<div class="lesson-card"><div class="lesson-icon">${i+1}</div><div><strong>${esc(x.title)}</strong><small>${esc(x.desc)}</small></div><div class="arrow">›</div></div>`).join("");
 const tl=document.getElementById("tour-list");
 if(tl)tl.innerHTML=tours.map(x=>`<div class="tour-card"><strong>${esc(x.country)}</strong><small>${esc(x.title)} · ${esc(x.price)}</small></div>`).join("");
}
renderPublic();

const params=new URLSearchParams(location.search);
const preset=params.get("type");
if(preset){
 document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.type===preset));
 const bt=document.getElementById("booking-type"); if(bt)bt.value=preset;
}
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 const t=document.getElementById("booking-type");if(t)t.value=btn.dataset.type;
}));
const bf=document.getElementById("booking-form");
if(bf)bf.addEventListener("submit",e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(bf).entries());
 d.id=Date.now();d.status="대기";d.createdAt=new Date().toISOString();bookings.unshift(d);save("jg_bookings",bookings);
 alert("예약 신청이 접수되었습니다.");bf.reset();document.getElementById("booking-type").value="lesson";
});

function renderAdmin(){
 const al=document.getElementById("admin-lessons"),at=document.getElementById("admin-tours"),ab=document.getElementById("admin-bookings");
 if(!al||!at||!ab)return;
 document.getElementById("booking-count").textContent=bookings.length;
 document.getElementById("tour-count").textContent=tours.length;
 const today=new Date().toISOString().slice(0,10);
 document.getElementById("today-count").textContent=bookings.filter(x=>(x.createdAt||"").slice(0,10)===today).length;
 al.innerHTML=lessons.map((x,i)=>`<div class="admin-row"><div><strong>${esc(x.title)}</strong><small>${esc(x.desc)}</small></div><button class="delete" onclick="deleteLesson(${i})">삭제</button></div>`).join("");
 at.innerHTML=tours.map((x,i)=>`<div class="admin-row"><div><strong>${esc(x.country)} · ${esc(x.title)}</strong><small>${esc(x.price)}</small></div><button class="delete" onclick="deleteTour(${i})">삭제</button></div>`).join("");
 ab.innerHTML=bookings.length?bookings.slice(0,20).map(x=>`<div class="admin-row"><div><strong>${esc(x.name)} · ${esc(x.type)}</strong><small>${esc(x.phone)} / ${esc(x.region||"-")} / ${esc(x.date||"-")}</small></div><span class="badge">${esc(x.status)}</span></div>`).join(""):`<p class="hint">아직 예약 신청이 없습니다.</p>`;
}
window.deleteLesson=i=>{lessons.splice(i,1);save("jg_lessons",lessons);renderAdmin();renderPublic()}
window.deleteTour=i=>{tours.splice(i,1);save("jg_tours",tours);renderAdmin();renderPublic()}
const lf=document.getElementById("lesson-add-form");if(lf)lf.addEventListener("submit",e=>{e.preventDefault();lessons.push(Object.fromEntries(new FormData(lf).entries()));save("jg_lessons",lessons);lf.reset();renderAdmin()});
const tf=document.getElementById("tour-add-form");if(tf)tf.addEventListener("submit",e=>{e.preventDefault();tours.push(Object.fromEntries(new FormData(tf).entries()));save("jg_tours",tours);tf.reset();renderAdmin()});
const login=document.getElementById("login-form");if(login)login.addEventListener("submit",e=>{e.preventDefault();document.getElementById("login-panel").classList.add("hidden");document.getElementById("dashboard").classList.remove("hidden");renderAdmin()});
if(document.getElementById("dashboard")&&!document.getElementById("dashboard").classList.contains("hidden"))renderAdmin();

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))}

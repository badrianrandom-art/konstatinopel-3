const canvas=document.getElementById('film'),ctx=canvas.getContext('2d');const W=1280,H=720,D=144;
const scenes=[
{n:'01',name:'KOTA DI PERSIMPANGAN DUNIA',title:'KOTA YANG TAK TERTAKLUKKAN',date:'KONSTANTINOPEL · ABAD KE-15',text:'Selama lebih dari seribu tahun, Konstantinopel berdiri sebagai jantung Kekaisaran Bizantium. Tembok raksasanya melindungi kota yang menguasai jalur perdagangan antara Eropa dan Asia.',bg:0},
{n:'02',name:'SANG PENAKLUK MUDA',title:'MEHMED II PUNYA SATU AMBISI',date:'EDIRNE · 1452–1453',text:'Pada usia dua puluh satu tahun, Sultan Mehmed II memusatkan seluruh kekuatannya pada satu tujuan: merebut kota yang selama berabad-abad menahan kepungan demi kepungan.',bg:1},
{n:'03',name:'TEMBOK DAN MERIAM RAKSASA',title:'BATU BERHADAPAN DENGAN MESIU',date:'6 APRIL 1453',text:'Pada 6 April 1453, pengepungan dimulai. Meriam besar—termasuk meriam yang dikaitkan dengan perancang Orban—menghantam pertahanan darat. Namun tembok berlapis itu tidak mudah runtuh.',bg:2},
{n:'04',name:'LAUTAN MENJADI MEDAN PERANG',title:'TANDUK EMAS HARUS DITEMBUS',date:'APRIL 1453',text:'Rantai besar menutup akses ke Tanduk Emas. Armada Ottoman menghadapi penghalang itu. Mehmed kemudian mengambil langkah berani: kapal-kapal dipindahkan melalui daratan menuju perairan di balik rantai.',bg:3},
{n:'05',name:'KOTA DIKEPUNG DARI SEGALA ARAH',title:'MALAM-MALAM TANPA TIDUR',date:'APRIL–MEI 1453',text:'Pengepungan berlangsung berminggu-minggu. Para pembela yang dipimpin Kaisar Konstantinus XI memperbaiki celah tembok, sementara pasukan Ottoman menggali, menembak, dan menyiapkan serangan berikutnya.',bg:4},
{n:'06',name:'SERANGAN TERAKHIR',title:'29 MEI 1453',date:'FAJAR · 29 MEI 1453',text:'Menjelang fajar, serangan besar dilancarkan dalam gelombang. Pertahanan kota kelelahan. Pasukan Ottoman menekan berbagai titik, dan pertempuran sengit pecah di sekitar tembok serta gerbang.',bg:5},
{n:'07',name:'KONSTANTINOPEL JATUH',title:'SEBUAH KEKAISARAN BERAKHIR',date:'29 MEI 1453',text:'Pertahanan akhirnya ditembus. Kaisar Konstantinus XI gugur dalam kekacauan pertempuran—nasib akhirnya tidak tercatat dengan pasti. Konstantinopel jatuh ke tangan Mehmed II.',bg:6},
{n:'08',name:'KOTA MEMASUKI ERA BARU',title:'SEJARAH BERUBAH ARAH',date:'SETELAH 1453',text:'Mehmed menjadikan Konstantinopel pusat kekuasaannya. Kota itu kelak dikenal sebagai Istanbul. Jatuhnya Konstantinopel menjadi salah satu titik balik besar dalam sejarah kawasan Mediterania dan dunia.',bg:7}
];
const duration=D/scenes.length;let start=performance.now(),paused=false,offset=0,lastScene=-1;
function ease(t){return t*t*(3-2*t)}function line(x,y,X,Y,c,w=4){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(X,Y);ctx.stroke()}function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h)}function circle(x,y,r,c){ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}
function text(t,x,y,size,c,align='left'){ctx.font=`800 ${size}px Arial`;ctx.fillStyle=c;ctx.textAlign=align;ctx.fillText(t,x,y)}
function person(x,y,s,kind,pose=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);let ott=kind==='ott';let skin='#d9a77c',coat=ott?'#b94a35':'#394c73';circle(0,-65,22,skin);rect(-25,-44,50,65,coat);line(-15,18,-26,65,'#25232a',9);line(15,18,28,65,'#25232a',9);line(-19,-30,-45,pose?'5':'-3','#d9a77c',8);line(19,-30,44,-48,'#d9a77c',8);circle(0,-91,25,ott?'#5b2630':'#262b3a');rect(-26,-91,52,7,ott?'#d6a84f':'#c7c1ae');ctx.restore()}
function draw(t,scene,p){let k=scene.bg;let sky=['#7297b8','#a7a2a0','#667b91','#67869a','#596a7c','#e0a66e','#bd886a','#7d9a9b'][k];let land=['#a9a18e','#77736d','#8a8275','#6f7776','#716e6a','#a48b75','#9b7869','#a59a81'][k];let cam=Math.sin(t*.55)*10;let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,sky);g.addColorStop(1,land);rect(0,0,W,H,'#182333');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 // sun, clouds, distant hills
 circle(1030+cam,130,68,'#f5d9a0');for(let i=0;i<5;i++){circle(100+i*260+Math.sin(t+i)*20,180+(i%2)*55,55,'#ffffff22')}
 ctx.fillStyle='#3e5664';ctx.beginPath();ctx.moveTo(0,460);ctx.lineTo(180,360);ctx.lineTo(380,440);ctx.lineTo(650,330);ctx.lineTo(920,435);ctx.lineTo(1120,350);ctx.lineTo(1280,420);ctx.lineTo(1280,720);ctx.lineTo(0,720);ctx.fill();
 // sea and walls
 rect(0,520,W,200,k===3?'#315e70':'#354e5b');rect(0,590,W,130,land);
 let wallY=360;for(let i=0;i<12;i++){let x=i*118-((t*18)%118);rect(x,wallY,92,180,'#b6a38a');rect(x-4,wallY-25,100,30,'#d1bda0');for(let j=0;j<3;j++)rect(x+j*34,wallY-45,20,24,'#c9b79c')}
 // towers
 for(let x of [170,530,900,1130]){rect(x,270,75,270,'#9b8a78');rect(x-9,245,93,36,'#c4b49a');rect(x+20,350,25,190,'#554f4d')}
 if(k===1||k===2||k===4||k===5){for(let i=0;i<26;i++){let x=(i*53+(t*45)%1280)%1280;person(x,590+(i%3)*22,.38,i%4===0?'byz':'ott',Math.sin(t*2+i)>0)}}
 if(k===0){person(950,590,1.5,'byz');text('BYZANTINE EMPIRE',640,110,25,'#fff','center')}
 if(k===1){person(880,555,1.8,'ott');text('MEHMED II',880,450,25,'#ffe0a0','center')}
 if(k===2||k===5){for(let i=0;i<3;i++){let x=180+i*430;rect(x,555,150,30,'#3c3028');circle(x+100,560,28,'#24242b');line(x+120,550,x+240,420,'#332c2a',18);circle(x+240,420,13,'#292b30')}for(let i=0;i<8;i++){circle((i*177+t*90)%1280,400+Math.sin(t*4+i)*70,18+i%3*8,'#b6a18a66')}}
 if(k===3){for(let i=0;i<5;i++){let x=80+i*240+Math.sin(t+i)*10;ctx.fillStyle='#332e32';ctx.beginPath();ctx.moveTo(x,570);ctx.lineTo(x+160,570);ctx.lineTo(x+130,610);ctx.lineTo(x+30,610);ctx.fill();line(x+80,570,x+80,390,'#392e2a',8);line(x+80,400,x+140,470,'#e4d9c2',5)}}
 if(k===6){for(let i=0;i<35;i++)circle((i*43+t*22)%1280,420+Math.sin(i*5)*100,5,'#352c2b');person(950,575,1.6,'ott');text('29 MAY 1453',640,160,45,'#fff','center')}
 if(k===7){person(900,575,1.5,'ott');text('A NEW IMPERIAL CAPITAL',640,140,32,'#fff','center')}
 // animated foreground particles
 for(let i=0;i<45;i++){let x=(i*83+t*25)%1280,y=(i*47+Math.sin(t+i)*35)%700;circle(x,y,1.5,'#f7dfb366')}
 // scene transition overlay
 if(p<.08){rect(0,0,W,H,`rgba(5,9,15,${1-p/.08})`)}
}
function updateUI(t){let idx=Math.min(7,Math.floor(t/duration)),p=(t-idx*duration)/duration,s=scenes[idx];if(idx!==lastScene){lastScene=idx;document.getElementById('chapterNo').textContent=s.n;document.getElementById('chapterName').textContent=s.name;document.getElementById('headline').textContent=s.title;document.getElementById('subtitle').textContent=s.text;document.getElementById('date').textContent=s.date;document.querySelectorAll('.chaptercard').forEach((c,i)=>c.classList.toggle('active',i===idx))}document.getElementById('elapsed').textContent=fmt(t);document.getElementById('seek').value=t/D*100;document.getElementById('subtitle').style.opacity=document.getElementById('captions').checked?1:0}
function fmt(t){return String(Math.floor(t/60)).padStart(2,'0')+':'+String(Math.floor(t%60)).padStart(2,'0')}
function frame(now){let t=paused?offset:Math.min(D,(now-start)/1000+offset);let idx=Math.min(7,Math.floor(t/duration)),p=(t-idx*duration)/duration;draw(t,scenes[idx],p);updateUI(t);if(t>=D&&!paused){paused=true;offset=D;document.getElementById('play').textContent='▶ Putar lagi'}requestAnimationFrame(frame)}
function jump(i){offset=i*duration;start=performance.now();paused=false;document.getElementById('play').textContent='Ⅱ Pause';lastScene=-1}
document.getElementById('play').onclick=()=>{if(paused){start=performance.now();paused=false;document.getElementById('play').textContent='Ⅱ Pause'}else{offset=(performance.now()-start)/1000+offset;paused=true;document.getElementById('play').textContent='▶ Lanjutkan'}};
document.getElementById('restart').onclick=()=>{offset=0;start=performance.now();paused=false;lastScene=-1;document.getElementById('play').textContent='Ⅱ Pause'};
document.getElementById('prev').onclick=()=>jump(Math.max(0,lastScene-1));document.getElementById('next').onclick=()=>jump(Math.min(7,lastScene+1));
document.getElementById('seek').oninput=e=>{offset=+e.target.value/100*D;start=performance.now();lastScene=-1;updateUI(offset)};
document.getElementById('captions').onchange=()=>document.getElementById('subtitle').style.opacity=document.getElementById('captions').checked?1:0;
scenes.forEach((s,i)=>{let b=document.createElement('button');b.className='chaptercard';b.innerHTML=`<b>${s.n} · ${s.date}</b><span>${s.name}</span>`;b.onclick=()=>jump(i);document.getElementById('chapters').appendChild(b);let p=document.createElement('p');p.textContent=s.text;document.getElementById('scriptText').appendChild(p)});
document.getElementById('copy').onclick=()=>{navigator.clipboard.writeText(scenes.map(s=>s.text).join('\n\n')).then(()=>document.getElementById('copy').textContent='Tersalin ✓')};
document.getElementById('duration').textContent=fmt(D);requestAnimationFrame(frame);
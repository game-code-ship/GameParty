// Party Games server: serves index.html + a tiny realtime document store over WebSocket.
const http=require('http'),fs=require('fs'),path=require('path'),os=require('os');
const {WebSocketServer}=require('ws');
const store=new Map();            // "rooms/ABCD/players/u1" -> object
<<<<<<< HEAD
const logs=new Map();             // "rooms/ABCD/log/chat" -> {n:seq,a:[items]}  append-only logs (drawing strokes, chat)
=======
>>>>>>> test
const touched=new Map();          // room code -> last activity
const par=p=>p.split('/').slice(0,-1).join('/');
const server=http.createServer((req,res)=>{
  if(req.url.split('?')[0]==='/'||req.url.startsWith('/#')){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    return fs.createReadStream(path.join(__dirname,'index.html')).pipe(res);
  }
  res.writeHead(404);res.end('Not found');
});
const wss=new WebSocketServer({server,maxPayload:150000});
const snapDoc=p=>({t:'snap',d:store.has(p)?store.get(p):null});
const snapCol=c=>({t:'snap',docs:[...store.keys()].filter(k=>par(k)===c).map(k=>({p:k,d:store.get(k)}))});
function notify(p){
  for(const ws of wss.clients)for(const [sid,s] of ws.subs||[]){
    if(s.k==='d'&&s.p===p)ws.send(JSON.stringify({...snapDoc(p),sid}));
    if(s.k==='c'&&s.p===par(p))ws.send(JSON.stringify({...snapCol(s.p),sid}));
  }
}
wss.on('connection',ws=>{
  ws.subs=new Map();
  ws.on('message',raw=>{
    let m;try{m=JSON.parse(raw)}catch{return}
    if(m.t==='unsub'){ws.subs.delete(m.sid);return}
    if(typeof m.p!=='string'||!/^rooms(\/[A-Za-z0-9_-]{1,40}){1,3}$/.test(m.p))return;
    const code=m.p.split('/')[1];
    const ack=o=>ws.send(JSON.stringify({t:'ack',rid:m.rid,...o}));
    if(m.t==='get')return ack({d:store.has(m.p)?store.get(m.p):null});
<<<<<<< HEAD
    if(m.t==='sub'){ws.subs.set(m.sid,{p:m.p,k:m.k});
      if(m.k==='l')return ws.send(JSON.stringify({t:'log',sid:m.sid,full:1,items:(logs.get(m.p)||{a:[]}).a}));
      return ws.send(JSON.stringify({...(m.k==='d'?snapDoc(m.p):snapCol(m.p)),sid:m.sid}))}
    if(m.t==='ladd'){ // append to a log and forward just the new item to subscribers
      if(!m.d||typeof m.d!=='object'||JSON.stringify(m.d).length>6000)return;
      let L=logs.get(m.p);if(!L){L={n:0,a:[]};logs.set(m.p,L)}
      const draw=m.p.endsWith('/draw');
      if(m.d.x)L.a.length=0;                      // clear marker resets the log
      else if(L.a.length>=(draw?8000:500)){if(draw)return;L.a.shift()}
      const it={...m.d,q:++L.n};L.a.push(it);touched.set(code,Date.now());
      for(const w of wss.clients)for(const [sid,s] of w.subs||[])if(s.k==='l'&&s.p===m.p)w.send(JSON.stringify({t:'log',sid,items:[it]}));
      return;
    }
    if(m.t==='set'||m.t==='upd'){
      if(!m.d||typeof m.d!=='object'||JSON.stringify(m.d).length>70000)return ack({});
      store.set(m.p,m.t==='set'?m.d:{...(store.get(m.p)||{}),...m.d});
=======
    if(m.t==='sub'){ws.subs.set(m.sid,{p:m.p,k:m.k});return ws.send(JSON.stringify({...(m.k==='d'?snapDoc(m.p):snapCol(m.p)),sid:m.sid}))}
    if(m.t==='set'||m.t==='upd'){
      if(!m.d||typeof m.d!=='object'||JSON.stringify(m.d).length>70000)return ack({});
      let d=m.d;if(/\/acts\/[^/]+$/.test(m.p))d={...d,_ts:Date.now()}; // server time = fair 'fastest finger' ordering
      store.set(m.p,m.t==='set'?d:{...(store.get(m.p)||{}),...d});
>>>>>>> test
    }else if(m.t==='del')store.delete(m.p);
    else return;
    touched.set(code,Date.now());notify(m.p);ack({});
  });
});
setInterval(()=>{ // drop rooms idle for 6 hours
  for(const [code,t] of touched)if(Date.now()-t>6*3600e3){
    for(const k of [...store.keys()])if(k.split('/')[1]===code)store.delete(k);
<<<<<<< HEAD
    for(const k of [...logs.keys()])if(k.split('/')[1]===code)logs.delete(k);
=======
>>>>>>> test
    touched.delete(code);
  }
},600e3);
const PORT=process.env.PORT||3000;
server.listen(PORT,'0.0.0.0',()=>{
  console.log(`\n🎮 Party Games running on port ${PORT}`);
  console.log(`   This computer:  http://localhost:${PORT}`);
  for(const l of Object.values(os.networkInterfaces()))for(const i of l)
    if(i.family==='IPv4'&&!i.internal)console.log(`   Same Wi-Fi:     http://${i.address}:${PORT}   <- open THIS on the host device so the QR works for phones\n`);
<<<<<<< HEAD
});
=======
});
>>>>>>> test

const fs = require('fs');
function load(p){return JSON.parse(fs.readFileSync(p,'utf8'));}
function pick(obj){
  const task=obj.tasks?.[0];
  const res=task?.result||[];
  const m=new Map();
  for(const r of res){
    m.set(r.keyword,{sv:r.search_volume??null, comp:r.competition_index??null, cpc:r.cpc??null});
  }
  return m;
}
const [,,nlPath,bePath]=process.argv;
if(!nlPath||!bePath){console.error('Usage: node extract.js nl.json be.json');process.exit(1);} 
const nl=pick(load(nlPath));
const be=pick(load(bePath));
const keys=[...new Set([...nl.keys(),...be.keys()])];
keys.sort((a,b)=>a.localeCompare(b,'nl'));
const out=[];
out.push('| Keyword | NL SV | BE SV | Ads comp idx | CPC | Intent | Titel suggestie |');
out.push('|---|---:|---:|---:|---:|---|---|');
for(const k of keys){
  const n=nl.get(k)||{}; const b=be.get(k)||{};
  const comp = (n.comp??b.comp??'');
  const cpc = (n.cpc??b.cpc??'');
  out.push(`| ${k} | ${n.sv??''} | ${b.sv??''} | ${comp??''} | ${cpc??''} |  |  |`);
}
process.stdout.write(out.join('\n')+'\n');

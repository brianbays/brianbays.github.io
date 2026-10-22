import {readFileSync,readdirSync,existsSync,statSync} from 'node:fs';
import {resolve,dirname,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Script} from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../site');let links=0;
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);}
const files=walk(root).filter(f=>f.endsWith('.html'));
for(const file of files){const source=readFileSync(file,'utf8');const html=source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');if((html.match(/<h1[ >]/g)||[]).length!==1)throw Error(relative(root,file)+': expected one h1');for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const url=m[1];if(/^(https?:|mailto:|data:)/.test(url))continue;const [pathAndQuery,hash]=url.split('#');const path=pathAndQuery.split('?')[0];let dest=path?resolve(path.startsWith('/')?root:dirname(file),path.replace(/^\//,'')):file;if(existsSync(dest)&&statSync(dest).isDirectory())dest=join(dest,'index.html');if(!existsSync(dest))throw Error(relative(root,file)+': missing '+url);if(hash&&!readFileSync(dest,'utf8').includes(`id="${hash}"`))throw Error(relative(root,file)+': missing anchor '+url);links++;}}
const quiz=readFileSync(join(root,'world-capitals-quiz/index.html'),'utf8');new Script(quiz.match(/<script>([\s\S]*?)<\/script>/)[1]);const data=JSON.parse(quiz.match(/\bDATA = (\[[^\n]+);/)[1]);if(data.length!==245||data.filter(d=>!d.isTerritory).length!==197)throw Error('Quiz scope counts changed');if(!/id="includeTerritories"/.test(quiz)||/id="includeTerritories"[^>]*checked/.test(quiz))throw Error('Territories must default off');for(const country of ['Saint Lucia','Micronesia'])if(!data.find(d=>d.country===country)?.inset)throw Error('Missing island inset: '+country);
console.log(`Passed: ${files.length} HTML pages, ${links} internal links/assets, fragment targets, quiz syntax and scope checks.`);

const states=JSON.parse(quiz.match(/US_DATA = (\[[^\n]+);/)[1]);const shapes=JSON.parse(quiz.match(/US_SHAPES = (\[[^\n]+);/)[1]);if(states.length!==50||new Set(states.map(s=>s.country)).size!==50||states.some(s=>!s.capitals.length||!shapes.find(p=>p.country===s.country)?.d)||shapes.length!==50)throw Error('U.S. data or map coverage changed');for(const type of ['capital','country','states','state-capitals'])if(!quiz.includes('value="'+type+'"'))throw Error('Missing quiz type '+type);console.log('Passed: 50 U.S. states, capitals, map shapes, and all four quiz options.');

const {execFileSync}=await import('node:child_process');execFileSync(process.execPath,[resolve(root,'../scripts/check-quiz.cjs'),join(root,'world-capitals-quiz/index.html')],{stdio:'inherit'});
execFileSync(process.execPath,[resolve(root,'../scripts/check-prayer.cjs')],{stdio:'inherit'});

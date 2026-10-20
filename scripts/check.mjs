import {readFileSync,readdirSync,existsSync,statSync} from 'node:fs';
import {resolve,dirname,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Script} from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../site');let links=0;
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);}
const files=walk(root).filter(f=>f.endsWith('.html'));
for(const file of files){const source=readFileSync(file,'utf8');const html=source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');if((html.match(/<h1[ >]/g)||[]).length!==1)throw Error(relative(root,file)+': expected one h1');for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const url=m[1];if(/^(https?:|mailto:|data:)/.test(url))continue;const [path,hash]=url.split('#');let dest=path?resolve(path.startsWith('/')?root:dirname(file),path.replace(/^\//,'')):file;if(existsSync(dest)&&statSync(dest).isDirectory())dest=join(dest,'index.html');if(!existsSync(dest))throw Error(relative(root,file)+': missing '+url);if(hash&&!readFileSync(dest,'utf8').includes(`id="${hash}"`))throw Error(relative(root,file)+': missing anchor '+url);links++;}}
const quiz=readFileSync(join(root,'world-capitals-quiz/index.html'),'utf8');new Script(quiz.match(/<script>([\s\S]*?)<\/script>/)[1]);const data=JSON.parse(quiz.match(/DATA = (\[[^\n]+);/)[1]);if(data.length!==245||data.filter(d=>!d.isTerritory).length!==197)throw Error('Quiz scope counts changed');if(!/id="includeTerritories"/.test(quiz)||/id="includeTerritories"[^>]*checked/.test(quiz))throw Error('Territories must default off');for(const country of ['Saint Lucia','Micronesia'])if(!data.find(d=>d.country===country)?.inset)throw Error('Missing island inset: '+country);
console.log(`Passed: ${files.length} HTML pages, ${links} internal links/assets, fragment targets, quiz syntax and scope checks.`);

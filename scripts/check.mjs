import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../site');let links=0;
for(const file of readdirSync(root).filter(x=>x.endsWith('.html'))){const html=readFileSync(resolve(root,file),'utf8');if((html.match(/<h1[ >]/g)||[]).length!==1)throw Error(file+': expected one h1');for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const url=m[1];if(/^(https?:|mailto:|data:)/.test(url))continue;const [path,hash]=url.split('#');const dest=path?resolve(root,path==='/'?'index.html':path.replace(/^\//,'')):resolve(root,file);if(!existsSync(dest))throw Error(file+': missing '+url);if(hash&&!readFileSync(dest,'utf8').includes(`id="${hash}"`))throw Error(file+': missing anchor '+url);links++;}}
console.log(`Passed: six HTML pages, ${links} internal links/assets, and fragment targets.`);

const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'../site/prayer-pending');
const source=fs.readFileSync(path.join(root,'inbox.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
const ctx={window:{},AbortController,setTimeout,clearTimeout,fetch:()=>{throw Error('Unexpected real request')}};vm.runInNewContext(source,ctx);
(async()=>{
 const inbox=ctx.window.PrayerInbox;assert(inbox.configured);
 let calls=0;const ok=async(url,options)=>{calls++;assert.equal(url,'https://formspree.io/f/xzednooa');assert.deepEqual(JSON.parse(options.body),{request:'Please find my keys'});assert.equal(options.credentials,'omit');return {ok:true,json:async()=>({ok:true})}};
 assert.equal((await inbox.save('  Please find my keys  ',ok)).status,'saved');assert.equal(calls,1);
 for(const text of ['', '   ', 'a'.repeat(601),null])assert.equal((await inbox.save(text,ok)).status,'invalid');assert.equal(calls,1);
 for(const send of [async()=>({ok:false}),async()=>({ok:true,json:async()=>({})}),async()=>{throw Error('offline')},async()=>({ok:true,json:async()=>{throw Error('not json')}})])assert.equal((await inbox.save('Test',send)).status,'unconfirmed');
 let timeouts=0;assert.equal((await inbox.save('Test',async(url,o)=>new Promise((resolve,reject)=>{timeouts++;o.signal.addEventListener('abort',()=>reject(Error('timeout')))}),5)).status,'unconfirmed');assert.equal(timeouts,1);
 assert(html.includes('saved in Brian’s private inbox'));assert(html.includes('if(submitting)return'));assert(html.includes('textContent=r.message'));assert(!source.includes('localStorage'));
 console.log('PASS: Prayer Pending validation, minimal payload, success, rejected/invalid responses, offline, timeout, and no automatic retries');
})().catch(e=>{console.error(e);process.exitCode=1});

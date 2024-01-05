function u(e){return e>1e9?`${(e/1e9).toPrecision(3)} GB`:e>1e6?`${(e/1e6).toPrecision(3)} MB`:e>1e3?`${(e/1e3).toPrecision(3)} kB`:e!==1?`${e} bytes`:"1 byte"}function x(e){let t=e.lastIndexOf(".");return t===-1?e:e.slice(0,t)}var k=new TextEncoder;function f({fileName:e=null,input:t,dropTarget:o,pasteTarget:l,onFile:r}){async function c(n){if(n===null||(n instanceof FileList?n:n.items).length===0)return;let d=n instanceof FileList?n[0]:n.items[0].kind==="string"?await new Promise(a=>n.items[0].getAsString(a)):n.items[0].getAsFile();if(d===null)return;let s=d instanceof File?`${d.name} \xB7 ${u(d.size)}`:`Plain text \xB7 ${u(k.encode(d).length)}`;try{(await r(d)??!0)&&e&&(e.textContent=s,e.classList.remove("file-error"))}catch(a){console.error(a),e&&(e.textContent=s+" \u2014 failed to load",e.classList.add("file-error"))}}t?.addEventListener("change",()=>{c(t.files),t.value=""}),o?.addEventListener("drop",async n=>{c(n.dataTransfer),o.classList.remove("drag-over"),n.preventDefault()}),o?.addEventListener("dragover",n=>{o.classList.add("drag-over"),n.preventDefault()}),o?.addEventListener("dragleave",()=>{o.classList.remove("drag-over")}),l&&document.addEventListener("paste",n=>{n.target instanceof HTMLTextAreaElement||n.target instanceof HTMLInputElement||c(n.clipboardData)})}function b(e,t){let o=t?.closest(".reform\\:io");t&&!(t instanceof HTMLInputElement)?(console.warn(t,"is not an <input> element"),t=null):t&&(t.dataset.ignore="true");let l=o?.querySelector(".input-controls");f({fileName:t?.parentElement?.querySelector(".file-name"),input:t,dropTarget:l instanceof HTMLElement?l:void 0,pasteTarget:t?.classList.contains("reform:paste-target"),onFile:async r=>{e.handleValue(r instanceof File?r:new File([r],"text.txt",{type:"text/plain"}))}})}function v(e,t){t&&!(t instanceof HTMLInputElement)?(console.warn(t,"is not an <input> element"),t=null):t&&(t.dataset.ignore="true");let o=t?.closest(".reform\\:io"),l=o?.querySelector(".input-content canvas");l&&!(l instanceof HTMLCanvasElement)&&(console.warn(l,"is not a <canvas> element"),l=null);let r=l??document.createElement("canvas"),c=r.getContext("2d");f({fileName:t?.parentElement?.querySelector(".file-name"),input:t,dropTarget:o instanceof HTMLElement?o:void 0,pasteTarget:t?.classList.contains("reform:paste-target"),onFile:async n=>{if(typeof n=="string")return!1;let d=URL.createObjectURL(n);try{let s=document.createElement("img");s.src=d,await new Promise((a,p)=>{s.addEventListener("load",a),s.addEventListener("error",p)}),r.dataset.name=x(n.name),r.width=s.width,r.height=s.height,c?.drawImage(s,0,0),e.handleValue(r)}finally{URL.revokeObjectURL(d)}}})}function w(e,t){let o=t?.closest(".reform\\:io");t&&!(t instanceof HTMLInputElement)?(console.warn(t,"is not an <input> element"),t=null):t&&(t.dataset.ignore="true");let l=o?.querySelector(".input-controls"),r=o?.querySelector(".input-content");f({fileName:t?.parentElement?.querySelector(".file-name"),input:t,dropTarget:l instanceof HTMLElement?l:void 0,pasteTarget:t?.classList.contains("reform:paste-target"),onFile:async c=>{let n=c instanceof File?await c.text():c;r instanceof HTMLTextAreaElement&&(r.value=n),e.handleValue(n)}})}var h=class e{#e=null;#t=null;#n;#o;constructor({fileName:t=null,downloadLink:o=null,copyButton:l,shareButton:r}){this.#n=t,this.#o=o,l?.addEventListener("click",()=>{this.#e&&navigator.clipboard.write([new ClipboardItem({[this.#e.type]:this.#e})])}),r?.addEventListener("click",async()=>{this.#e&&(this.#e.type==="text/plain"&&this.#e.size<4e3?navigator.share({text:await this.#e.text()}):navigator.share({files:[this.#e]}))})}handleFile(t){this.#e=t,this.#n&&(this.#n.textContent=`${t.name} \xB7 ${u(t.size)}`),this.#o&&(this.#t&&URL.revokeObjectURL(this.#t),this.#t=URL.createObjectURL(t),this.#o.href=this.#t,this.#o.download=t.name)}static fromOutputControls(t){let o=t?.querySelector(".download");return o&&!(o instanceof HTMLAnchorElement)&&(console.warn(o,"is not an <a> element"),o=null),new e({fileName:t?.querySelector(".file-name"),downloadLink:o,copyButton:t?.querySelector(".icon-copy"),shareButton:t?.querySelector(".icon-share")})}};var g=class{lastValue;dependents=[];handleValue(t){this.lastValue=t;for(let o of this.dependents)o(t)}};var i={};function m(e){if(!(e instanceof HTMLElement&&e.dataset.ignore))if(e instanceof HTMLInputElement)if(i[e.name]??=new g,e.type==="number"||e.type==="range"||e.inputMode==="numeric"){if(e.value==="")return;i[e.name].handleValue(+e.value);let t=e.closest(".range-wrapper");if(t){let o=e;if(e.type==="range"){let r=t.lastElementChild;r instanceof HTMLInputElement&&(r.value=e.step==="any"||e.step&&+e.step<.1?(+e.value).toFixed(2):e.value)}else{let r=t.querySelector('[type="range"]');if(r instanceof HTMLInputElement)o=r;else return;o.value=e.value}let l=(+e.value-+o.min)/(+o.max-+o.min);o.style.setProperty("--progress",`${l*100}%`)}}else e.type==="checkbox"?i[e.name].handleValue(e.checked):e.type==="file"?e.files&&e.files.length>0&&i[e.name].handleValue(Array.from(e.files)):e.type==="radio"?e.checked&&i[e.name].handleValue(e.value):i[e.name].handleValue(e.value);else(e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)&&(i[e.name]??=new g,i[e.name].handleValue(e.value))}for(let e of document.getElementsByClassName("reform:image-input"))e instanceof HTMLInputElement&&(i[e.name]??=new g,v(i[e.name],e));for(let e of document.getElementsByClassName("reform:text-input"))e instanceof HTMLInputElement&&(i[e.name]??=new g,w(i[e.name],e));for(let e of document.getElementsByClassName("reform:file-input"))e instanceof HTMLInputElement&&(i[e.name]??=new g,b(i[e.name],e));for(let e of document.forms)for(let t of e.elements)m(t);document.addEventListener("input",e=>m(e.target));document.addEventListener("change",e=>m(e.target));function V(e,t){i[e]??=new g;let o=document.getElementById(e);if(!o){let a=document.getElementsByName(e);a.length>1&&console.warn("More than one element with name",e,Array.from(a)),o=a[0]}let l=o?.dataset.deps?.split(" ")??[],r={},c=o instanceof HTMLCanvasElement?o.getContext("2d")??o:o,n=o.closest(".reform\\:io")?.querySelector(".output-controls");if(n){let a=h.fromOutputControls(n);i[e].dependents.push(p=>a.handleFile(p))}let d=async()=>{if(s.size===l.length){let a=await t(c,r);i[e].handleValue(a)}},s=new Set;for(let a of l)i[a]??=new g,i[a].lastValue!==void 0&&(r[a]=i[a].lastValue,s.add(a)),i[a].dependents.push(p=>{r[a]=p,s.add(a),d()});d()}export{V as on};

import{d as g,r as u,u as w,o as k,c as y,a as n,w as b,v as C,b as d,e as f,f as B,g as v}from"./index-bfed1039.js";import{_ as M}from"./PrimaryButton.vue_vue_type_script_setup_true_lang-90ce98a9.js";import{_ as V,m as _}from"./music.repository-3056144a.js";const E={class:"h-full p-2 space-y-2 flex flex-col"},N=n("div",{class:"text-2xl"}," Editor ",-1),R={class:"grow border rounded focus-within:shadow outline-1 overflow-x-hidden"},S={class:"flex justify-end space-x-2"},D=g({__name:"Editor",setup(T){const a=u(""),o=u(""),c=w(),m=()=>{c.back()},l=t=>{const e=o.value.split(`
`);if(e.length>t)return e[t]},p=()=>{var e;if(a.value=((e=c.currentRoute.value.params.id)==null?void 0:e.toString())??"",!a.value)return;const t=_.getById(a.value);o.value=(t==null?void 0:t.content)??""},h=()=>{var r;if(!o.value)return;const t=l(0),e=l(1),i=((r=l(2))==null?void 0:r.split(" ").map(s=>s==null?void 0:s.trim()).filter(s=>s))??[],x={id:a.value,title:t,artist:e,tags:i,content:o.value};_.save(x),c.back()};return k(()=>{p()}),(t,e)=>(B(),y("div",E,[N,n("div",R,[b(n("textarea",{class:"w-full h-full p-2 pt-1 -mb-1.5 outline-none resize-none font-mono text-gray-700","onUpdate:modelValue":e[0]||(e[0]=i=>o.value=i),placeholder:"Put your music here..."},null,512),[[C,o.value]])]),n("div",S,[d(M,{onClick:h},{default:f(()=>[v(" Save ")]),_:1}),d(V,{onClick:m},{default:f(()=>[v(" Cancel ")]),_:1})])]))}});export{D as default};

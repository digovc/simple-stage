import{d as g,r as d,u as w,o as y,c as k,a as n,w as C,v as b,b as f,e as v,f as B,g as p}from"./index-4b3fc332.js";import{_ as M,a as V,m as _}from"./music.repository-1da5c707.js";const E={class:"h-full p-2 space-y-2 flex flex-col"},N=n("div",{class:"text-2xl"}," Editor ",-1),R={class:"grow border rounded focus-within:shadow outline-1 overflow-x-hidden"},$={class:"flex justify-end space-x-2"},z=g({__name:"Editor",setup(S){const a=d(""),s=d(""),l=w(),m=()=>{l.back()},c=t=>{const e=s.value.split(`
`);if(e.length>t)return e[t]},h=()=>{var e;if(a.value=((e=l.currentRoute.value.params.id)==null?void 0:e.toString())??"",!a.value)return;const t=_.getById(a.value);s.value=(t==null?void 0:t.content)??""},x=()=>{var u;if(!s.value)return;const t=c(0),e=c(1),r=((u=c(2))==null?void 0:u.split(" ").map(o=>o==null?void 0:o.trim()).filter(o=>o))??[],i={id:a.value,title:t,artist:e,tags:r,content:s.value};_.save(i),l.replace(`/render/${i.id}`)};return y(()=>{h()}),(t,e)=>(B(),k("div",E,[N,n("div",R,[C(n("textarea",{class:"w-full h-full p-2 pt-1 -mb-1.5 outline-none resize-none font-mono text-gray-700","onUpdate:modelValue":e[0]||(e[0]=r=>s.value=r),placeholder:"Put your music here..."},null,512),[[b,s.value]])]),n("div",$,[f(M,{onClick:x},{default:v(()=>[p(" Save ")]),_:1}),f(V,{onClick:m},{default:v(()=>[p(" Cancel ")]),_:1})])]))}});export{z as default};
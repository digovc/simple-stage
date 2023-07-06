import{_ as V,f as c,c as u,h as D,d as x,a as i,t as b,r as y,u as P,i as M,o as L,b as d,e as _,F as h,j as H,k as R,g as v,l as j,w,v as g,m as U,n as A}from"./index-1e5ca8fe.js";import{p as k,_ as B}from"./Dialog.vue_vue_type_script_setup_true_lang-42269cb8.js";import{S as E,_ as C,a as S,m as I}from"./music.repository-b6071e4b.js";import{t as F}from"./takeUntil-68a49ee3.js";const T={},q={class:"p-2 border rounded cursor-pointer hover:shadow text-sm"};function J(m,a){return c(),u("div",q,[D(m.$slots,"default")])}const N=V(T,[["render",J]]),Q={class:"space-y-4"},z={class:"text-2xl"},G={class:"grid grid-cols-2 gap-4"},O=x({__name:"List",props:{title:{type:String,required:!0}},setup(m){return(a,s)=>(c(),u("div",Q,[i("div",z,b(m.title),1),i("div",G,[D(a.$slots,"default")])]))}}),K=x({__name:"Playlists",setup(m,{expose:a}){const s=y([]),l=new E,r=P(),o=n=>{for(const p of s.value??[]){const f=[p.title,p.tags].join(" ").toLowerCase();p.isHidden=f&&!f.includes(n)}},e=()=>{k.onCreated$.pipe(F(l)).subscribe(n=>{s.value.push(n)})},t=n=>{const p=n==null?void 0:n.id;p&&r.push(`/playlist/${p}`)};return M(()=>{l.next(),l.complete()}),L(async()=>{s.value=k.getAll(),e()}),a({filterPlaylists:o}),(n,p)=>(c(),u("div",null,[d(O,{title:"Playlists"},{default:_(()=>[(c(!0),u(h,null,H(s.value,f=>(c(),u(h,{key:f.id},[f.isHidden?j("",!0):(c(),R(N,{key:0,onClick:$=>t(f)},{default:_(()=>[v(b(f.title),1)]),_:2},1032,["onClick"]))],64))),128))]),_:1})]))}}),W={class:"space-y-8"},X=i("div",null," New playlist ",-1),Y={class:"flex flex-col space-y-2"},Z={class:"flex justify-end space-x-2"},ee=x({__name:"PlaylistForm",emits:{onClose:()=>!0},setup(m,{emit:a}){const s=y(""),l=y(""),r=()=>{const o={id:"",title:s.value,tags:l.value.split(",").map(e=>e.trim()).filter(e=>e),musicIds:[]};k.save(o),a("onClose")};return(o,e)=>(c(),u("div",null,[d(B,null,{default:_(()=>[i("div",W,[X,i("div",Y,[w(i("input",{type:"text",class:"border border-gray-300 rounded-md p-2",placeholder:"Playlist name","onUpdate:modelValue":e[0]||(e[0]=t=>s.value=t)},null,512),[[g,s.value]]),w(i("input",{type:"text",class:"border border-gray-300 rounded-md p-2",placeholder:"Tags","onUpdate:modelValue":e[1]||(e[1]=t=>l.value=t)},null,512),[[g,l.value]])]),i("div",Z,[d(C,{onClick:r},{default:_(()=>[v(" Create ")]),_:1}),d(S,{onClick:e[2]||(e[2]=t=>a("onClose"))},{default:_(()=>[v(" Cancel ")]),_:1})])])]),_:1})]))}}),te={class:"space-x-2 overflow-x-auto whitespace-nowrap pb-2"},se=x({__name:"HomeMenu",setup(m){const a=P(),s=y(!1),l=()=>{const o=JSON.stringify(localStorage),e=new Blob([o],{type:"text/plain"}),t=document.createElement("a");t.download="simple-stage-data.txt",t.href=window.URL.createObjectURL(e),t.dataset.downloadurl=["text/plain",t.download,t.href].join(":"),t.click()},r=()=>{const o=document.createElement("input");o.type="file",o.accept="text/plain",o.onchange=()=>{var n;const e=(n=o.files)==null?void 0:n[0];if(!e)return;const t=new FileReader;t.onload=()=>{const p=t.result,f=JSON.parse(p);Object.keys(f).forEach($=>{localStorage.setItem($,f[$])}),window.location.reload()},t.readAsText(e)},o.click()};return(o,e)=>(c(),u("div",null,[i("div",te,[d(C,{onClick:e[0]||(e[0]=t=>U(a).push("/editor"))},{default:_(()=>[v(" + Song ")]),_:1}),d(C,{onClick:e[1]||(e[1]=t=>s.value=!0)},{default:_(()=>[v(" + Playlist ")]),_:1}),d(S,{onClick:l},{default:_(()=>[v(" Export ")]),_:1}),d(S,{onClick:r},{default:_(()=>[v(" Import ")]),_:1})]),i("div",null,[s.value?(c(),R(ee,{key:0,onOnClose:e[2]||(e[2]=t=>s.value=!1)})):j("",!0)])]))}}),oe=x({__name:"Musics",setup(m,{expose:a}){const s=y([]),l=P(),r=e=>{for(const t of s.value??[]){const n=[t.title,t.tags,t.artist].join(" ").toLowerCase();t.isHidden=n&&!n.includes(e)}},o=e=>{l.push(`/render/${e.id}`)};return L(async()=>{s.value=I.getAll()}),a({filterMusics:r}),(e,t)=>(c(),u("div",null,[d(O,{title:"Songs"},{default:_(()=>[(c(!0),u(h,null,H(s.value,n=>(c(),u(h,{key:n.id},[n.isHidden?j("",!0):(c(),R(N,{key:0,onClick:p=>o(n)},{default:_(()=>[v(b(n.title),1)]),_:2},1032,["onClick"]))],64))),128))]),_:1})]))}}),ne={class:"flex"},le={class:"border rounded-full py-2 px-4 inline w-96 focus-within:shadow"},ae=x({__name:"HomeSearch",emits:["onSearch"],setup(m,{emit:a}){const s=y("");return A(s,l=>{const r=l==null?void 0:l.trim().toLowerCase();a("onSearch",r)}),(l,r)=>(c(),u("div",ne,[i("div",le,[w(i("input",{type:"text",placeholder:"Search",class:"w-full outline-none","onUpdate:modelValue":r[0]||(r[0]=o=>s.value=o)},null,512),[[g,s.value]])])]))}}),re={class:"h-full flex flex-col space-y-8 p-4"},ie=i("div",{class:"text-5xl"}," Simple Stage ",-1),ce={class:"space-y-12"},fe=x({__name:"Home",setup(m){const a=y(),s=y(),l=r=>{var o,e;(o=a.value)==null||o.filterPlaylists(r),(e=s.value)==null||e.filterMusics(r)};return(r,o)=>(c(),u("div",re,[ie,i("div",null,[d(se)]),i("div",ce,[d(ae,{onOnSearch:l}),d(K,{ref_key:"playlistsRef",ref:a},null,512),d(oe,{ref_key:"musicsRef",ref:s},null,512)])]))}});export{fe as default};

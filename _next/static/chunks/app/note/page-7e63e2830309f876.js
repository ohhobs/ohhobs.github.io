(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[980],{3407:function(e,t,n){Promise.resolve().then(n.bind(n,7448))},7448:function(e,t,n){"use strict";let r;n.r(t),n.d(t,{default:function(){return h}});var o=n(7437),i=n(2265),l=n(5250),a=n.n(l),c={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let u=new Uint8Array(16),d=[];for(let e=0;e<256;++e)d.push((e+256).toString(16).slice(1));var s=function(e,t,n){if(c.randomUUID&&!t&&!e)return c.randomUUID();let o=(e=e||{}).random||(e.rng||function(){if(!r&&!(r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(u)})();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=o[e];return t}return function(e,t=0){return d[e[t+0]]+d[e[t+1]]+d[e[t+2]]+d[e[t+3]]+"-"+d[e[t+4]]+d[e[t+5]]+"-"+d[e[t+6]]+d[e[t+7]]+"-"+d[e[t+8]]+d[e[t+9]]+"-"+d[e[t+10]]+d[e[t+11]]+d[e[t+12]]+d[e[t+13]]+d[e[t+14]]+d[e[t+15]]}(o)};let m="note-";function h(){let[e,t]=(0,i.useState)([]),[n,r]=(0,i.useState)(""),[l,c]=(0,i.useState)(null),[u,d]=(0,i.useState)("");function h(){t(function(){let e=[];for(let t=0;t<localStorage.length;t++){let n=localStorage.key(t);n&&e.push(n)}return e.filter(e=>e.includes("note-")).map(e=>JSON.parse(localStorage.getItem(e)))}())}return(0,i.useEffect)(()=>{h()},[]),(0,o.jsxs)("div",{children:[(0,o.jsx)("h1",{children:"Note"}),(0,o.jsx)("p",{children:"Keep your data only for you - no data tranferring through the internet. All data is saved to your machine only."}),(0,o.jsx)("div",{style:{marginBottom:"1rem"},children:(0,o.jsx)(a(),{href:"/",children:"Home"})}),(0,o.jsxs)("div",{style:{marginBottom:"1rem"},children:[(0,o.jsx)("h3",{children:"Your Notes"}),(0,o.jsxs)("div",{style:{marginBottom:"1rem"},children:[(0,o.jsx)("input",{type:"text",placeholder:"New note name",value:n,onChange:e=>r(e.target.value)}),(0,o.jsx)("button",{onClick:()=>{""===n?alert("Empty name"):(function(e){let t={...e,id:s()},n=JSON.stringify(t),r=t.id;localStorage.setItem("".concat(m).concat(r),n)}({id:"",name:n,content:""}),h())},children:"Create note"})]}),(0,o.jsx)("div",{children:e.map(e=>{var t;return(0,o.jsxs)("div",{style:(t=e.id,l&&t===l.id?{backgroundColor:"green",color:"white"}:{}),children:[(0,o.jsx)("div",{style:{display:"inline-block",marginRight:"0.5rem"},onClick:()=>{c(e),d(e.content)},children:e.name}),(0,o.jsx)("button",{onClick:()=>{confirm("Are you sure?")&&(function(e){let t="".concat(m).concat(e.id);localStorage.removeItem(t)}(e),h(),l&&e.id===l.id&&(c(null),d("")))},children:"delete"})]},e.id)})})]}),(0,o.jsx)("div",{style:{marginBottom:"1rem"},children:l&&(0,o.jsx)("textarea",{name:"note",id:"note",cols:30,rows:10,placeholder:"Write your note here...",value:u,onChange:function(e){let t=e.target.value,n={...l,content:t};d(t),function(e){let t=JSON.stringify(e),n=e.id;localStorage.setItem("".concat(m).concat(n),t)}(n),h()}})})]})}}},function(e){e.O(0,[250,971,69,744],function(){return e(e.s=3407)}),_N_E=e.O()}]);
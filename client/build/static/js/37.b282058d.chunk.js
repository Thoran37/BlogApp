"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[37],{37:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var l=a(43),s=a(858),n=a(561),r=a(3),c=a(216),o=a(579);function i(){let{register:e,handleSubmit:t}=(0,s.mN)(),{currentUser:a}=(0,r.d4)((e=>e.loginReducer)),i=(0,c.Zp)(),[m,d]=(0,l.useState)("");return(0,o.jsx)("div",{children:(0,o.jsxs)("form",{onSubmit:t((async function(e){e.articleId=Date.now(),e.dateOfCreation=new Date,e.dateOfModification=new Date,e.username=a.username,e.comments=[],e.status=!0,console.log(e);let t=await n.U.post("http://localhost:4000/author-api/article",e);console.log(t),"New Article created"===t.data.message?i("/author-profile/article-by-author/".concat(a.username)):d(t.data.payload)})),className:"container",children:[(0,o.jsx)("p",{className:"text-danger mb-1 mt-3",children:m}),(0,o.jsx)("h1",{children:"Add an article"}),(0,o.jsx)("label",{className:"form-label mb-0",children:"Title"}),(0,o.jsx)("input",{type:"text",className:"form-control mb-2",...e("title")}),(0,o.jsx)("label",{className:"form-label mb-0",children:"Category"}),(0,o.jsx)("input",{type:"text",className:"form-control mb-2",...e("category")}),(0,o.jsx)("label",{className:"form-label mb-0",children:"Content"}),(0,o.jsx)("textarea",{rows:"15",className:"form-control",...e("content")}),(0,o.jsx)("button",{className:"btn btn-success mt-2",children:"Save"})]})})}}}]);
//# sourceMappingURL=37.b282058d.chunk.js.map
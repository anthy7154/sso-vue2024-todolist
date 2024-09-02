import{a as F,u as I,s as x,r as i,i as $,j as V,c as u,b as t,t as g,k as r,w as A,v as M,n as y,d as L,F as P,l as j,g as d,o as h}from"./index-CtqmkTYu.js";const J={id:"todoListPage",class:"bg-half"},X=t("h1",null,[t("a",{href:"#"},"ONLINE TODO LIST")],-1),q={class:"todo_sm"},G={href:"#/todo"},H={class:"conatiner todoListPage vhContainer"},K={class:"todoList_Content"},Q={class:"inputBox"},W=t("i",{class:"fa fa-plus"},"+",-1),Y=[W],Z={class:"todoList_list"},ee={class:"todoList_tab"},te={class:"todoList_items"},se={key:0},oe={class:"todoList_item"},ae=["onClick"],ne=["checked"],le=["onClick"],ie=t("i",{class:"fa fa-times"},"X",-1),ce=[ie],ue={class:"todoList_statistics"},re={key:0},de={key:1},_e={__name:"TodoList",setup(he){const C=F(),f=I(),{token:n,userNickname:w}=x(f),c=f.api,k=i(""),p=i(""),b=async()=>{try{k.value=document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolTodo\s*=\s*([^;]*).*$)|^.*$/,"$1");const e=await d.get(`${c}/users/checkout`,{headers:{authorization:k.value}});p.value=`驗證成功, UID: ${e.data.uid}, Nickname: ${e.data.nickname}`,w.value=e.data.nickname,n.value=k.value,_()}catch(e){p.value=`驗證失敗, ${e.message}`,console.log(p.value),alert("驗證失敗，請重新登入"),C.push("/login")}},a=i([]),v=i(""),{todoActiveTab:l}=x(f),_=async()=>{try{const e=await d.get(`${c}/todos`,{headers:{authorization:n.value}});a.value=e.data.data,a.value.forEach((s,o)=>{a.value[o]={...s,createTime:new Date(s.createTime*1e3).toLocaleString()}})}catch(e){console.log(e)}},z=$(()=>a.value.filter(e=>l.value==="finished"?e.status===!0:l.value==="unfinished"?e.status===!1:e)),N=async()=>{if(v.value.trim()===""){alert("請輸入 Todo 內容，再進行提交");return}try{await d.post(`${c}/todos/`,{content:v.value},{headers:{authorization:n.value}}),v.value="",_()}catch(e){console.log(e)}},S=async e=>{try{await d.delete(`${c}/todos/${e}`,{headers:{authorization:n.value}}),_()}catch(s){console.log(s)}},D=async e=>{try{await d.patch(`${c}/todos/${e}/toggle`,{},{headers:{authorization:n.value}}),_()}catch(s){console.log(s)}},m=i(""),E=f.$reset,O=async()=>{try{const e=await d.post(`${c}/users/sign_out`,{},{headers:{authorization:n.value}});m.value=e.data.message,alert(m.value),n.value="",document.cookie="hexschoolTodo=; expires=Thu, 01 Jan 1970 00:00:00 UTC;",E(),setTimeout(()=>{C.push("/login")},3e3)}catch(e){console.log(e),m.value=`登出失敗, ${e.message}`}},B=$(()=>{const e=i(0);return a.value.forEach(s=>{s.status===!1&&e.value++}),e}),R=$(()=>{const e=i(0);return a.value.forEach(s=>{s.status===!0&&e.value++}),e}),T=e=>{l.value=e};return V(()=>{b(),n.value&&_()}),(e,s)=>(h(),u("div",J,[t("nav",null,[X,t("ul",null,[t("li",q,[t("a",G,[t("span",null,g(r(w))+" 的代辦",1)])]),t("li",null,[t("a",{href:"#",onClick:O},"登出")])])]),t("div",H,[t("div",K,[t("div",Q,[A(t("input",{type:"text",placeholder:"請輸入待辦事項","onUpdate:modelValue":s[0]||(s[0]=o=>v.value=o)},null,512),[[M,v.value]]),t("a",{href:"#/todo",onClick:N},Y)]),t("div",Z,[t("ul",ee,[t("li",null,[t("a",{href:"#/todo",class:y({active:r(l)==="all"}),onClick:s[1]||(s[1]=o=>T("all"))},"全部",2)]),t("li",null,[t("a",{href:"#/todo",class:y({active:r(l)==="unfinished"}),onClick:s[2]||(s[2]=o=>T("unfinished"))},"待完成",2)]),t("li",null,[t("a",{href:"#/todo",class:y({active:r(l)==="finished"}),onClick:s[3]||(s[3]=o=>T("finished"))},"已完成",2)])]),t("div",te,[a.value.length===0?(h(),u("p",se,"目前尚無待辦事項")):L("",!0),t("ul",oe,[(h(!0),u(P,null,j(z.value,o=>(h(),u("li",{key:o.id},[t("label",{class:"todoList_label",onClick:U=>D(o.id)},[t("input",{class:"todoList_input",type:"checkbox",value:"true",checked:o.status},null,8,ne),t("span",null,g(o.content),1)],8,ae),t("a",{href:"#/todo",onClick:U=>S(o.id)},ce,8,le)]))),128))]),t("div",ue,[a.value.length>0&&r(l)!=="finished"?(h(),u("p",re,g(B.value)+" 個待完成項目",1)):L("",!0),a.value.length>0&&r(l)==="finished"?(h(),u("p",de,g(R.value)+" 個已完成項目",1)):L("",!0)])])])])])]))}};export{_e as default};

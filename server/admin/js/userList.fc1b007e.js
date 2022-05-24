import{B as U,C as y,v as B,w as D,x as S,o as w,p as L,q as $,r as T}from"./element-plus.4d7ad4ec.js";import{_ as k}from"./Card.ae761133.js";import{k as Z}from"../assets/index.9e470d0b.js";import z from"./UserAdd.251db9d8.js";import{_ as N}from"./vue-count-to.713368f2.js";import{d as O,r as _,Z as P,x as j,Y as q,o as f,c as V,Q as e,H as l,R as G,af as H,O as s,P as h,G as M}from"./@vue.0f0518a1.js";import"./@vueuse.46304fe6.js";import"./@element-plus.7fac929b.js";import"./@ctrl.9375a141.js";import"./lodash-es.319b1c15.js";import"./async-validator.b44ce63a.js";import"./@popperjs.fd04dfd6.js";import"./escape-html.86960cf8.js";import"./normalize-wheel-es.118890a0.js";import"./pinia.54582b77.js";import"./vue-demi.6e7a88e9.js";import"./vue-router.00ec9ee4.js";import"./vue-draggable-next.7a01fd73.js";import"./axios.95ae4241.js";import"./baseData.1dffbeb6.js";const Q=[{key:"username",title:"\u7528\u6237\u540D"}],R=O({name:"userList",components:{Card:k,UserAdd:z},setup(){const o=_([]),t=_(!1),d=_(""),b=P({user:"",region:""});j(()=>{u()});const F=()=>{t.value=!0},C=()=>{d.value="",t.value=!1},u=async()=>{o.value=await Z()};return{uId:d,Column:Q,userList:o,formInline:b,userAddVisible:t,onSubmit:()=>{},handleEdit:m=>{t.value=!0,d.value=m._id},handleDelete:(m,c)=>{},handleAddUser:F,userAddVisibleClose:C,userAddSuccess:()=>{u()}}}}),Y={class:"good-list-box"},J=s("\u641C\u7D22"),K=s("\u91CD\u7F6E"),W=s("+ \u6DFB\u52A0"),X=s("\u7F16\u8F91");function x(o,t,d,b,F,C){const u=w,a=L,p=U,A=y,r=$,m=T,c=k,i=B,E=D,v=S,I=q("UserAdd");return f(),V("div",Y,[e(c,null,{default:l(()=>[e(m,{inline:!0,model:o.formInline,class:"demo-form-inline"},{default:l(()=>[e(a,{label:"\u7528\u6237\u540D\u79F0\uFF1A"},{default:l(()=>[e(u,{modelValue:o.formInline.user,"onUpdate:modelValue":t[0]||(t[0]=n=>o.formInline.user=n),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D\u79F0"},null,8,["modelValue"])]),_:1}),e(a,{label:"\u521B\u5EFA\u65F6\u95F4\uFF1A"},{default:l(()=>[e(A,{modelValue:o.formInline.region,"onUpdate:modelValue":t[1]||(t[1]=n=>o.formInline.region=n),placeholder:"\u8BF7\u521B\u5EFA\u65F6\u95F4\uFF1A"},{default:l(()=>[e(p,{label:"Zone one",value:"shanghai"}),e(p,{label:"Zone two",value:"beijing"})]),_:1},8,["modelValue"])]),_:1}),e(a,{label:"\u7528\u6237\u5730\u5740"},{default:l(()=>[e(u,{modelValue:o.formInline.user,"onUpdate:modelValue":t[2]||(t[2]=n=>o.formInline.user=n),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u5730\u5740"},null,8,["modelValue"])]),_:1}),e(a,null,{default:l(()=>[e(r,{type:"primary",onClick:o.onSubmit},{default:l(()=>[J]),_:1},8,["onClick"]),e(r,{onClick:o.onSubmit},{default:l(()=>[K]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])]),_:1}),e(c,null,{default:l(()=>[e(r,{type:"primary",style:{"margin-bottom":"10px"},onClick:o.handleAddUser},{default:l(()=>[W]),_:1},8,["onClick"]),e(E,{data:o.userList,columns:o.Column,fixed:"right",size:"large"},{default:l(()=>[e(i,{prop:"_id",label:"id"}),(f(!0),V(G,null,H(o.Column,(n,g)=>(f(),M(i,{prop:n.key,label:n.title,key:g},null,8,["prop","label"]))),128)),e(i,{label:"\u89D2\u8272"},{default:l(n=>[s(h(n.row.position.name),1)]),_:1}),e(i,{label:"\u63CF\u8FF0"},{default:l(n=>[s(h(n.row.position.describe),1)]),_:1}),e(i,{label:"\u64CD\u4F5C",width:"150",fixed:"right"},{default:l(n=>[e(r,{size:"small",onClick:g=>o.handleEdit(n.row)},{default:l(()=>[X]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data","columns"]),e(v,{style:{"margin-top":"20px"},background:"",layout:"->,prev, pager, next",total:1e3})]),_:1}),e(I,{userAddVisible:o.userAddVisible,uId:o.uId,onUserAddVisibleClose:o.userAddVisibleClose,onUserAddSuccess:o.userAddSuccess},null,8,["userAddVisible","uId","onUserAddVisibleClose","onUserAddSuccess"])])}var ge=N(R,[["render",x]]);export{ge as default};
import{r as c,w as P,e as W,s as x,f as R,g as I,h as L,u as m}from"./@vue.0f0518a1.js";var z=Object.defineProperty,A=Object.defineProperties,C=Object.getOwnPropertyDescriptors,E=Object.getOwnPropertySymbols,N=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable,S=(e,t,r)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,B=(e,t)=>{for(var r in t||(t={}))N.call(t,r)&&S(e,r,t[r]);if(E)for(var r of E(t))V.call(t,r)&&S(e,r,t[r]);return e},K=(e,t)=>A(e,C(t));function Z(e,t){var r;const n=x();return R(()=>{n.value=e()},K(B({},t),{flush:(r=t==null?void 0:t.flush)!=null?r:"sync"})),W(n)}function T(e){return I()?(L(e),!0):!1}var D;const b=typeof window!="undefined",k=e=>typeof e=="boolean",ee=e=>typeof e=="number",q=e=>typeof e=="string",h=()=>{};b&&((D=window==null?void 0:window.navigator)==null?void 0:D.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function G(e,t){function r(...n){e(()=>t.apply(this,n),{fn:t,thisArg:this,args:n})}return r}function H(e,t={}){let r,n;return i=>{const s=m(e),u=m(t.maxWait);if(r&&clearTimeout(r),s<=0||u!==void 0&&u<=0)return n&&(clearTimeout(n),n=null),i();u&&!n&&(n=setTimeout(()=>{r&&clearTimeout(r),n=null,i()},u)),r=setTimeout(()=>{n&&clearTimeout(n),n=null,i()},s)}}function J(e,t=200,r={}){return G(H(t,r),e)}function te(e,t=200,r={}){if(t<=0)return e;const n=c(e.value),o=J(()=>{n.value=e.value},t,r);return P(e,()=>o()),n}function ne(e,t,r={}){const{immediate:n=!0}=r,o=c(!1);let i=null;function s(){i&&(clearTimeout(i),i=null)}function u(){o.value=!1,s()}function l(...d){s(),o.value=!0,i=setTimeout(()=>{o.value=!1,i=null,e(...d)},m(t))}return n&&(o.value=!0,b&&l()),T(u),{isPending:o,start:l,stop:u}}function v(e){var t;const r=m(e);return(t=r==null?void 0:r.$el)!=null?t:r}const _=b?window:void 0,M=b?window.document:void 0;function p(...e){let t,r,n,o;if(q(e[0])?([r,n,o]=e,t=_):[t,r,n,o]=e,!t)return h;let i=h;const s=P(()=>v(t),l=>{i(),l&&(l.addEventListener(r,n,o),i=()=>{l.removeEventListener(r,n,o),i=h})},{immediate:!0,flush:"post"}),u=()=>{s(),i()};return T(u),u}function re(e,t,r={}){const{window:n=_,ignore:o,capture:i=!0}=r;if(!n)return;const s=c(!0);let u;const l=a=>{n.clearTimeout(u);const f=v(e),$=a.composedPath();!f||f===a.target||$.includes(f)||!s.value||o&&o.length>0&&o.some(F=>{const y=v(F);return y&&(a.target===y||$.includes(y))})||t(a)},d=[p(n,"click",l,{passive:!0,capture:i}),p(n,"pointerdown",a=>{const f=v(e);s.value=!!f&&!a.composedPath().includes(f)},{passive:!0}),p(n,"pointerup",a=>{u=n.setTimeout(()=>l(a),50)},{passive:!0})];return()=>d.forEach(a=>a())}const g=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},O="__vueuse_ssr_handlers__";g[O]=g[O]||{};g[O];function oe({document:e=M}={}){if(!e)return c("visible");const t=c(e.visibilityState);return p(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var j=Object.getOwnPropertySymbols,Q=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,X=(e,t)=>{var r={};for(var n in e)Q.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&j)for(var n of j(e))t.indexOf(n)<0&&U.call(e,n)&&(r[n]=e[n]);return r};function ie(e,t,r={}){const n=r,{window:o=_}=n,i=X(n,["window"]);let s;const u=o&&"ResizeObserver"in o,l=()=>{s&&(s.disconnect(),s=void 0)},d=P(()=>v(e),a=>{l(),u&&o&&a&&(s=new ResizeObserver(t),s.observe(a,i))},{immediate:!0,flush:"post"}),w=()=>{l(),d()};return T(w),{isSupported:u,stop:w}}function se({window:e=_}={}){if(!e)return c(!1);const t=c(e.document.hasFocus());return p(e,"blur",()=>{t.value=!1}),p(e,"focus",()=>{t.value=!0}),t}export{ee as a,k as b,ie as c,v as d,ne as e,oe as f,se as g,Z as h,b as i,re as o,te as r,T as t,p as u};

import{C as o}from"./vue-count-to.713368f2.js";function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(p){return Object.getOwnPropertyDescriptor(e,p).enumerable})),t.push.apply(t,n)}return t}o.unmounted=o.destroyed,Reflect.deleteProperty(o,"destroyed");var i=function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?c(Object(t),!0).forEach(function(n){a(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}({name:"CountTo",emits:["callback","mountedCallback"]},o);export{i as C};
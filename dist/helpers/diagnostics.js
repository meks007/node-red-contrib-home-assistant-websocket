"use strict";var h=Object.create;var t=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var D=(n,r)=>{for(var e in r)t(n,e,{get:r[e],enumerable:!0})},u=(n,r,e,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of l(r))!V.call(n,o)&&o!==e&&t(n,o,{get:()=>r[o],enumerable:!(s=$(r,o))||s.enumerable});return n};var i=(n,r,e)=>(e=n!=null?h(A(n)):{},u(r||!n||!n.__esModule?t(e,"default",{value:n,enumerable:!0}):e,n)),k=n=>u(t({},"__esModule",{value:!0}),n);var S={};D(S,{getEnvironmentData:()=>C});module.exports=k(S);var v=i(require("axios")),f=i(require("fs/promises")),c=i(require("os")),g=require("../globals"),m=require("../homeAssistant"),p=i(require("../version"));let a,d;async function y(){try{return await f.default.stat("/.dockerenv"),!0}catch{return!1}}async function H(){try{return(await f.default.readFile("/proc/self/cgroup","utf8")).includes("docker")}catch{return!1}}async function w(){return d??=await y()||await H(),d}function E(){const n=[];for(const[r,e]of m.homeAssistantConnections){const s={serverId:r,version:e.version,integrationVersion:e.integrationVersion};e.isConnected||(s.version="unknown"),e.isHomeAssistantRunning||(s.integrationVersion="unknown"),n.push(s)}return n}function I(){const n=E();if(n.length===0)return`No Home Assistant server configured
`;if(n.length===1){const e=n[0];return`Home Assistant version: ${e.version}
Companion version: ${e.integrationVersion}
`}let r=`Home Assistant instances: ${n.length}
`;for(const e of n)r+=`Server: ${e.serverId}
Home Assistant version: ${e.version}
Companion version: ${e.integrationVersion}
`;return r}async function R(){if(a||!process.env.SUPERVISOR_TOKEN)return a;try{return a=(await v.default.get("http://supervisor/addons/self/info",{headers:{Authorization:`Bearer ${process.env.SUPERVISOR_TOKEN}`}})).data.data.version,a}catch{return"error fetching version"}}async function C(){return`Version: ${p.default}

${I()}
Node-RED version: ${g.RED.version()}
Docker: ${await w()?"yes":"no"}
Add-on: ${await R()??"no"}

Node.js version: ${process.version} ${process.arch} ${process.platform}
OS: ${c.default.type()} ${c.default.release()} ${c.default.arch()}
`}0&&(module.exports={getEnvironmentData});

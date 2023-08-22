import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

function cyrb128(str:string){let h1=1779033703,h2=3144134277,h3=1013904242,h4=2773480762;for(let i=0,k;i<str.length;i++){k=str.charCodeAt(i);h1=h2^Math.imul(h1^k,597399067);h2=h3^Math.imul(h2^k,2869860233);h3=h4^Math.imul(h3^k,951274213);h4=h1^Math.imul(h4^k,2716044179);}h1=Math.imul(h3^(h1>>>18),597399067);h2=Math.imul(h4^(h2>>>22),2869860233);h3=Math.imul(h1^(h3>>>17),951274213);h4=Math.imul(h2^(h4>>>19),2716044179);h1^=(h2^h3^h4);h2^=h1;h3^=h1;h4^=h1;return [h1>>>0,h2>>>0,h3>>>0,h4>>>0];}
function sfc32(h:number[]){return function(){let a=h[0],b=h[1],c=h[2],d=h[3];a>>>=0;b>>>=0;c>>>=0;d>>>=0;let t=(a+b)|0;a=b^(b>>>9);b=c+(c<<3)|0;c=(c<<21)|(c>>>11);d=d+1|0;t=t+d|0;c=c+t|0;return (t>>>0)/4294967296;}}
function mix(a:any[],n:number){let m=a.length,t,i,r=sfc32(cyrb128(n.toString()));while(m){i=Math.floor(r()*m--);t=a[m];a[i]=t;}return a;}

const day = Math.floor(((new Date("August 14, 2023")).getTime()-(new Date("August 13, 2023")).getTime())/86400000); 
const l:string = mix([...Array(26)].map((val,i)=>String.fromCharCode(i+65)),Math.floor(day/26))[day%26];
const n:number = mix([...Array(199)].map((val,i)=>i-99),Math.floor(day/199))[day%199];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
      <App sponsors={[l,n]}/>
);
import{mkdirSync as A,readdirSync as B,readFileSync as C,writeFileSync as D}from"node:fs";
const W="01146:;?xxxxxxxx999999959995999x999xxxxxxxxxxxxx04400xxxxxxxxxxx58xxxxxxxxxxxxxx4414";
function R(p,g){
 const n=p.length,Z=new Int32Array(576),S=Z.subarray(0,256),K=Z.subarray(256,320),M=Z.subarray(320),O=new Uint8Array(65536);
 let s=0,k=0,l=0,t=0,c=0,d=0;
 const E=x=>({o:O.slice(0,l),c:x});
 for(;;){
  if(d==1e6)return E(10);
  if(c<0||c>=n)return E(9);
  const o=p[c],x=W.charCodeAt(o)-48;
  if(!(x>=0&&x<=15))return E(5);
  const u=x>>2,v=x&3,m=o==1?1:o==2?4:o>47&&o<52?2:0,q=c+1+m;
  if(c+m>=n)return E(9);
  d++;
  if(s<u)return E(2);
  if(s-u+v>256)return E(3);
  c=q;
  if(o==0)return E(0);
  else if(o==1)S[s++]=(p[q-1]<<24)>>24;
  else if(o==2)S[s++]=p[q-4]|p[q-3]<<8|p[q-2]<<16|p[q-1]<<24;
  else if(o==3)s--;
  else if(o==4){S[s]=S[s-1];s++;}
  else if(o==5){const t=S[s-1];S[s-1]=S[s-2];S[s-2]=t;}
  else if(o==6){S[s]=S[s-2];s++;}
  else if(o==7){const a=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=a;}
  else if(o==23)S[s-1]=-S[s-1]|0;
  else if(o==27)S[s-1]=~S[s-1];
  else if(o>15&&o<35){const b=S[s-1],a=S[s-2];let r;
   if(o==16)r=a+b|0;else if(o==17)r=a-b|0;else if(o==18)r=Math.imul(a,b);
   else if(o==19){if(!b)return E(4);r=a===-2147483648&&b===-1?a:(a/b)|0;}
   else if(o==20){if(!b)return E(4);r=b===-1?0:(a%b)|0;}
   else if(o==21){if(!b)return E(4);r=(a>>>0)/(b>>>0)|0;}
   else if(o==22){if(!b)return E(4);r=(a>>>0)%(b>>>0)|0;}
   else if(o==24)r=a&b;else if(o==25)r=a|b;else if(o==26)r=a^b;
   else if(o==28)r=a<<(b&31);else if(o==29)r=a>>(b&31);else if(o==30)r=(a>>>(b&31))|0;
   else if(o==32)r=a===b?1:0;else if(o==33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
   s-=2;S[s++]=r;}
  else if(o>47&&o<51){const e=(p[q-2]|p[q-1]<<8)<<16>>16;let z=o==48?0:S[--s];if(o==48||(o==49)===(z===0))c=q+e;}
  else if(o==51){if(k===64)return E(7);K[k++]=q;c=p[q-2]|p[q-1]<<8;}
  else if(o==52){if(!k)return E(8);c=K[--k];}
  else if(o==64){const a=S[s-1];if(a<0||a>255)return E(6);S[s-1]=M[a];}
  else if(o==65){const a=S[s-1],w=S[s-2];if(a<0||a>255)return E(6);s-=2;M[a]=w;}
  else if(o==80){const y=String(S[s-1]);if(l+y.length>65536)return E(11);s--;O.set(new TextEncoder().encode(y),l);l+=y.length;}
  else if(o==81){if(l+1>65536)return E(11);O[l++]=S[--s]&255;}
  else if(o==82)S[s++]=t<g.length?g[t++]:-1;
  else if(o==83)return E(S[--s]&255);
 }
}
const{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:F="/output"}=process.env;
for(const d of B(I).sort()){const j=I+"/"+d,k=F+"/"+d,r=R(new Uint8Array(C(j+"/program.bin")),new Uint8Array(C(j+"/input.bin")));A(k,{recursive:true});D(k+"/stdout.bin",r.o);D(k+"/exit.txt",r.c+"\n");}

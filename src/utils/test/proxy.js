let data=[];
let proxy=new Proxy(data,{
  get(target,p,receiver){
    const res=Reflect.get(target,p,receiver);
    console.log("[get]",res,target,p,receiver);
    return res;
  },
  set(target,p,newValue,receiver){
    const res=Reflect.set(target,p,newValue,receiver);
    console.log("[set]",res,target,p,newValue,receiver);
    return res;
  }
})
proxy.splice=new Proxy(proxy.splice,{
  apply(target,thisArg,argArray){
    console.log("[splice]",target,thisArg,argArray);
    const res=Reflect.apply(target,thisArg,argArray);
    console.log("[splice]",res,target,thisArg,argArray);
    return res;
  }
})

const v1={v:1};
const v2={v:2};
const v3={v:3};
proxy.splice(0,0,v1);
console.log(data,data.length);
proxy.splice(0,0,v2);
console.log(data,data.length);
proxy.splice(2,0,v3);
console.log(data,data.length);
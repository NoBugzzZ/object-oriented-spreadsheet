import { useState,useEffect } from "react";

export default function Select({get,getField,set,register,unRegister}){
  const [data,setData]=useState(get());
  console.log(getField())
  useEffect(()=>{
    register(setData);
    return ()=>{
      unRegister();
    }
  },[])

  return(
    <select
      value={data}
      onChange={(event)=>{
        set(event.target.value);
      }}
    >
      {/* <option value=""></option> */}
      {getField()["enum"].map(s=><option key={s} value={s}>{`${s}`}</option>)}
    </select>
  )
}
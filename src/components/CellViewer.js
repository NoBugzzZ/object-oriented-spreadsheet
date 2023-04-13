import { useState,useEffect } from "react";

export default function CellViewer({get,set,getField,register,unRegister}){
  const [value,setValue]=useState(get());

  useEffect(()=>{
    register(setValue);
    return ()=>{
      unRegister(setValue);
    }
  },[])

  return(
    <span>{value}</span>
  )
}
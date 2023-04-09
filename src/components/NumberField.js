import { useState,useEffect } from "react";

export default function NumberField({get,set,register,unRegister}){
  const [data,setData]=useState(get());

  useEffect(()=>{
    register(setData);
    // console.log("register");
    return ()=>{
      // console.log(setData);
      // unregister(setData);
      unRegister();
    }
  },[])

  return(
    <input
      type="number"
      value={data}
      onChange={(event)=>{
        set(+event.target.value);
        // console.log(+event.target.value)
      }}
    ></input>
  )
}
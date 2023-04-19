import { useState,useEffect } from "react";

export default function StringField({get,set,register,unRegister}){
  const [data,setData]=useState(get());

  useEffect(()=>{
    register(setData);
    // console.log("register");
    return ()=>{
      // console.log("unRegister");
      unRegister(setData);
      // unRegister();
    }
  },[])

  return(
    <input
      value={data}
      onChange={(event)=>{
        set(event.target.value);
        // console.log(+event.target.value)
      }}
    ></input>
  )
}
import React from "react";
import { useState,useEffect } from "react";
import Instance from "./SchemaParser";

function useValue(path="",schemas,callback){
  const ins=Instance();
  //path对应值
  const [state,setState]=useState();
  //path对应值的set
  const [func,setFunc]=useState();
  useEffect(()=>{
    const [insert,read,update,delete]=ins.getAccess(path);
  })
  return [state,func];
}
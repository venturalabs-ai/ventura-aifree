"use client";
import { useState } from "react";
import type { AITool } from "@/lib/types";
import { useAuthStore } from "@/store/auth";
import { useLeadsStore } from "@/store/leads";
import { sendLeadNotification } from "@/lib/email";

export function AICard({tool}:{tool:AITool}){
 const user=useAuthStore((s)=>s.user); const addLead=useLeadsStore((s)=>s.addLead); const [toast,setToast]=useState(false);
 async function choose(){
   if(!user)return;
   const lead=addLead({userEmail:user.email,userName:user.name,aiId:tool.id,aiName:tool.name,aiCompany:tool.company});
   setToast(true); setTimeout(()=>setToast(false),2800);
   try{await sendLeadNotification(lead)}catch(err){console.error(err)}
   window.open(tool.url,"_blank","noopener,noreferrer");
 }
 return <>
   <article className="card">
     <div className="aiTop"><div><h3>{tool.name}</h3><span className="badge">{tool.company}</span></div><span className="badge">{tool.category}</span></div>
     <p>{tool.description}</p><button className="button" onClick={choose}>Começar grátis ↗</button>
   </article>
   {toast&&<div className="toast">Interesse registrado: {tool.name}. Abrindo a ferramenta…</div>}
 </>
}

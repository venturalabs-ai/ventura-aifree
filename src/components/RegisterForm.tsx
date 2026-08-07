"use client";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { sendWelcomeEmail } from "@/lib/email";
import { pathFor } from "@/lib/constants";

export function RegisterForm(){
 const register=useAuthStore((s)=>s.register); const router=useRouter();
 const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [error,setError]=useState(""); const [sending,setSending]=useState(false);
 async function onSubmit(e:FormEvent){e.preventDefault();setError("");
   if(name.trim().length<2)return setError("Informe um nome válido.");
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return setError("Informe um email válido.");
   setSending(true); const user=register(name,email);
   try{await sendWelcomeEmail(user)}catch(err){console.error(err)}finally{setSending(false);router.push(pathFor("/mapa/"))}
 }
 return <form className="form card" onSubmit={onSubmit}>
   <label className="label">Nome<input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Seu nome" /></label>
   <label className="label">Email<input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="voce@email.com" /></label>
   {error&&<p style={{color:"var(--danger)"}}>{error}</p>}
   <button className="button" disabled={sending}>{sending?"Entrando…":"Explorar as IAs"}</button>
   <small className="muted">Sem senha. Para produção, substitua esta sessão local por autenticação real.</small>
 </form>
}

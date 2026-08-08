"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { pathFor } from "@/lib/constants";

export function AuthGate({children}:{children:React.ReactNode}){
 const user=useAuthStore((s)=>s.user); const [hydrated,setHydrated]=useState(false); const router=useRouter();
 useEffect(()=>{const unsub=useAuthStore.persist.onFinishHydration(()=>setHydrated(true)); if(useAuthStore.persist.hasHydrated())setHydrated(true); return unsub},[]);
 useEffect(()=>{if(hydrated&&!user)router.replace(pathFor("/cadastro/"))},[hydrated,user,router]);
 if(!hydrated||!user)return <main className="container section"><p className="muted">Validando sessão…</p></main>;
 return <>{children}</>;
}

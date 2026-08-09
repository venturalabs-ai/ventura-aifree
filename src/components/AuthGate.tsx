"use client";
import { useEffect,useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { pathFor } from "@/lib/constants";

export function AuthGate({children}:{children:React.ReactNode}){
 const user=useAuthStore((s)=>s.user);
 const hydrated=useSyncExternalStore(
  useAuthStore.persist.onFinishHydration,
  useAuthStore.persist.hasHydrated,
  ()=>false
 );
 const router=useRouter();
 useEffect(()=>{if(hydrated&&!user)router.replace(pathFor("/cadastro/"))},[hydrated,user,router]);
 if(!hydrated||!user)return <main className="container section"><p className="muted">Validando sessão…</p></main>;
 return <>{children}</>;
}

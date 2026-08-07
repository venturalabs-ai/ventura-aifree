"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { pathFor } from "@/lib/constants";

export function Nav(){
 const user=useAuthStore((s)=>s.user); const logout=useAuthStore((s)=>s.logout);
 return <nav className="nav container">
   <Link className="brand" href={pathFor("/")}>Ventura AI Free</Link>
   <div className="navlinks">
     <Link className="button secondary" href={pathFor("/mapa/")}>Mapa</Link>
     <Link className="button secondary" href={pathFor("/admin/")}>Admin</Link>
     {user?<button className="button danger" onClick={logout}>Sair</button>:<Link className="button" href={pathFor("/cadastro/")}>Começar grátis</Link>}
   </div>
 </nav>
}

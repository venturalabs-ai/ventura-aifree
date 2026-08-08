"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types";

type AuthState={user:User|null;register:(name:string,email:string)=>User;logout:()=>void};
export const useAuthStore=create<AuthState>()(persist((set)=>({
  user:null,
  register:(name,email)=>{
    const user={id:crypto.randomUUID(),name:name.trim(),email:email.trim().toLowerCase(),createdAt:new Date().toISOString()};
    set({user}); return user;
  },
  logout:()=>set({user:null})
}),{name:"ventura-aifree-auth"}));

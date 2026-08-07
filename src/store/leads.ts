"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lead } from "@/lib/types";

type LeadsState={leads:Lead[];addLead:(lead:Omit<Lead,"id"|"timestamp"|"source">)=>Lead;clear:()=>void};
export const useLeadsStore=create<LeadsState>()(persist((set)=>({
  leads:[],
  addLead:(payload)=>{
    const lead={...payload,id:crypto.randomUUID(),timestamp:new Date().toISOString(),source:"ventura-aifree" as const};
    set((state)=>({leads:[lead,...state.leads]})); return lead;
  },
  clear:()=>set({leads:[]})
}),{name:"ventura-aifree-leads"}));

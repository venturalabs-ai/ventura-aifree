"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AITool, LeadInteraction, SessionUser } from "@/types";

interface VenturaState {
  user: SessionUser | null;
  leads: LeadInteraction[];
  hydrated: boolean;
  registerUser: (name: string, email: string) => void;
  trackToolClick: (tool: AITool) => void;
  setHydrated: (hydrated: boolean) => void;
}

const source = "ventura-aifree" as const;

export const useVenturaStore = create<VenturaState>()(
  persist(
    (set, get) => ({
      user: null,
      leads: [],
      hydrated: false,
      registerUser: (name, email) =>
        set({
          user: {
            name,
            email,
            createdAt: new Date().toISOString(),
          },
        }),
      trackToolClick: (tool) => {
        const { user } = get();

        if (!user) {
          return;
        }

        const interaction: LeadInteraction = {
          id:
            typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
              ? crypto.randomUUID()
              : `${Date.now()}-${tool.id}`,
          userName: user.name,
          email: user.email,
          aiId: tool.id,
          aiName: tool.name,
          company: tool.company,
          timestamp: new Date().toISOString(),
          source,
        };

        set((state) => ({
          leads: [interaction, ...state.leads],
        }));
      },
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "ventura-aifree-storage",
      partialize: (state) => ({
        user: state.user,
        leads: state.leads,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { pathFor } from "@/lib/constants";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const [hydrated, setHydrated] = useState(() => useAuthStore.persist.hasHydrated());
  const router = useRouter();

  useEffect(() => {
    return useAuthStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace(pathFor("/cadastro/"));
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <main className="container section">
        <p className="muted">Validando sessão…</p>
      </main>
    );
  }

  return <>{children}</>;
}

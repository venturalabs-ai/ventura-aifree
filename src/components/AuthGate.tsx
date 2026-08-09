"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { pathFor } from "@/lib/constants";

function subscribeToHydration(onStoreChange: () => void) {
  const persistApi = useAuthStore.persist;
  if (!persistApi) return () => undefined;

  const unsubscribeHydrate = persistApi.onHydrate(onStoreChange);
  const unsubscribeFinish = persistApi.onFinishHydration(onStoreChange);

  return () => {
    unsubscribeHydrate();
    unsubscribeFinish();
  };
}

function getHydrationSnapshot() {
  return useAuthStore.persist?.hasHydrated() ?? false;
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const hydrated = useSyncExternalStore(subscribeToHydration, getHydrationSnapshot, () => false);
  const router = useRouter();

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

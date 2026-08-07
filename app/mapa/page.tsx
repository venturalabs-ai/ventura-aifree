"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AIToolCard } from "@/components/AIToolCard";
import { aiTools } from "@/data/aiTools";
import { useVenturaStore } from "@/store/useVenturaStore";

export default function MapaPage() {
  const router = useRouter();
  const user = useVenturaStore((state) => state.user);
  const hydrated = useVenturaStore((state) => state.hydrated);
  const trackToolClick = useVenturaStore((state) => state.trackToolClick);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/cadastro/");
    }
  }, [hydrated, router, user]);

  if (!hydrated || !user) {
    return (
      <main className="page-shell">
        <section className="panel">
          <p>Validando acesso ao mapa...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="panel panel--wide">
        <div className="panel__header">
          <div>
            <h1>Mapa de Ferramentas de IA</h1>
            <p>
              Olá, {user.name}. Explore opções e clique em <strong>Começar Grátis</strong>.
            </p>
          </div>
          <Link className="small-link" href="/admin/">
            Ver dashboard de leads
          </Link>
        </div>

        <div className="grid">
          {aiTools.map((tool) => (
            <AIToolCard key={tool.id} tool={tool} onClick={trackToolClick} />
          ))}
        </div>
      </section>
    </main>
  );
}

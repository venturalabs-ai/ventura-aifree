import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="hero-layout">
      <section className="hero">
        <span className="badge">Ventura Labs AI</span>
        <h1>Find the right AI faster.</h1>
        <p>
          Descubra as melhores ferramentas de IA em um mapa simples, curado e
          direto ao ponto para acelerar sua decisão.
        </p>
        <div className="hero__cta">
          <Link className="button" href="/cadastro/">
            Quero acessar o mapa
          </Link>
          <Link className="button button--ghost" href="/mapa/">
            Ver demonstração
          </Link>
        </div>
      </section>
      <section className="benefits">
        <article>
          <h2>Seleção confiável</h2>
          <p>10+ IAs líderes com links oficiais e foco em resultado.</p>
        </article>
        <article>
          <h2>Decisão rápida</h2>
          <p>Compare categoria, empresa e principal benefício em segundos.</p>
        </article>
        <article>
          <h2>Jornada inteligente</h2>
          <p>Cadastro, rastreamento de interesse e visão administrativa em um fluxo.</p>
        </article>
      </section>
    </main>
  );
}

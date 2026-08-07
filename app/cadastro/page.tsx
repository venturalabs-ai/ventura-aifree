"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { sendWelcomeEmail } from "@/lib/email";
import { useVenturaStore } from "@/store/useVenturaStore";

export default function CadastroPage() {
  const router = useRouter();
  const registerUser = useVenturaStore((state) => state.registerUser);
  const hydrated = useVenturaStore((state) => state.hydrated);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    registerUser(name.trim(), email.trim());

    if (sendEmail) {
      const sent = await sendWelcomeEmail({
        name: name.trim(),
        email: email.trim(),
      });
      setStatus(
        sent
          ? "Cadastro concluído e e-mail de boas-vindas enviado."
          : "Cadastro concluído. O e-mail opcional não foi enviado."
      );
    }

    router.push("/mapa/");
  }

  return (
    <main className="page-shell">
      <section className="panel">
        <h1>Acesse o mapa de IA</h1>
        <p>Cadastre-se para desbloquear o Ventura AI Free.</p>

        {!hydrated ? (
          <p>Carregando sessão...</p>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              autoComplete="name"
            />

            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />

            <label className="checkbox">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={(event) => setSendEmail(event.target.checked)}
              />
              Enviar e-mail de boas-vindas (opcional)
            </label>

            <button className="button" type="submit">
              Continuar para o mapa
            </button>
          </form>
        )}

        {status && <p className="status">{status}</p>}

        <p className="hint">
          Seus dados ficam no navegador (localStorage). Essa persistência é local e
          não substitui autenticação segura ou banco de dados centralizado.
        </p>

        <Link className="small-link" href="/">
          Voltar para a landing page
        </Link>
      </section>
    </main>
  );
}

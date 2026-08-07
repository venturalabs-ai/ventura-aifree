"use client";

import { ChangeEvent, useMemo, useState } from "react";

import { aiTools } from "@/data/aiTools";
import { useVenturaStore } from "@/store/useVenturaStore";
import type { LeadInteraction } from "@/types";

function toCsv(leads: LeadInteraction[]) {
  const headers = [
    "id",
    "userName",
    "email",
    "aiId",
    "aiName",
    "company",
    "timestamp",
    "source",
  ];

  const rows = leads.map((lead) =>
    headers
      .map((header) => {
        const value = String(lead[header as keyof LeadInteraction] ?? "");
        return `"${value.replaceAll('"', '""')}"`;
      })
      .join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

export default function AdminPage() {
  const leads = useVenturaStore((state) => state.leads);
  const hydrated = useVenturaStore((state) => state.hydrated);

  const [search, setSearch] = useState("");
  const [selectedAi, setSelectedAi] = useState("all");

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        `${lead.userName} ${lead.email}`
          .toLowerCase()
          .includes(search.trim().toLowerCase());
      const matchesAi = selectedAi === "all" || lead.aiId === selectedAi;
      return matchesSearch && matchesAi;
    });
  }, [leads, search, selectedAi]);

  const uniqueUsers = useMemo(() => new Set(leads.map((lead) => lead.email)).size, [leads]);

  const interestByAi = useMemo(() => {
    return aiTools
      .map((tool) => ({
        id: tool.id,
        name: tool.name,
        count: leads.filter((lead) => lead.aiId === tool.id).length,
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  function handleExportCsv() {
    const csv = toCsv(filteredLeads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.setAttribute("download", "ventura-aifree-leads.csv");
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (!hydrated) {
    return (
      <main className="page-shell">
        <section className="panel">
          <p>Carregando dados...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="panel panel--wide">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">Find the right AI faster.</p>

        <div className="stats">
          <article className="stat">
            <span>Total de leads</span>
            <strong>{leads.length}</strong>
          </article>
          <article className="stat">
            <span>Usuários únicos</span>
            <strong>{uniqueUsers}</strong>
          </article>
          <article className="stat">
            <span>Resultados filtrados</span>
            <strong>{filteredLeads.length}</strong>
          </article>
        </div>

        <div className="filters">
          <label>
            Buscar por nome ou e-mail
            <input
              type="text"
              value={search}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              placeholder="Ex.: maria@empresa.com"
            />
          </label>

          <label>
            Filtrar por IA
            <select
              value={selectedAi}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setSelectedAi(event.target.value)
              }
            >
              <option value="all">Todas</option>
              {aiTools.map((tool) => (
                <option key={tool.id} value={tool.id}>
                  {tool.name}
                </option>
              ))}
            </select>
          </label>

          <button className="button" type="button" onClick={handleExportCsv}>
            Exportar CSV
          </button>
        </div>

        <section className="interest">
          <h2>Interesse por IA</h2>
          {interestByAi.length === 0 ? (
            <p>Nenhuma interação registrada ainda.</p>
          ) : (
            <ul>
              {interestByAi.map((item) => (
                <li key={item.id}>
                  {item.name}: <strong>{item.count}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="table-wrap" role="region" aria-label="Tabela de leads">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>IA</th>
                <th>Empresa</th>
                <th>Data</th>
                <th>Origem</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.userName}</td>
                  <td>{lead.email}</td>
                  <td>{lead.aiName}</td>
                  <td>{lead.company}</td>
                  <td>{new Date(lead.timestamp).toLocaleString("pt-BR")}</td>
                  <td>{lead.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

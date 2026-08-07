"use client";

import type { AITool } from "@/types";

interface AIToolCardProps {
  tool: AITool;
  onClick: (tool: AITool) => void;
}

export function AIToolCard({ tool, onClick }: AIToolCardProps) {
  return (
    <article className="card">
      <div className="card__meta">{tool.category}</div>
      <h2>{tool.name}</h2>
      <p className="card__company">{tool.company}</p>
      <p className="card__benefit">{tool.benefit}</p>
      <a
        className="button button--full"
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onClick(tool)}
        aria-label={`Começar grátis com ${tool.name}`}
      >
        Começar Grátis
      </a>
    </article>
  );
}

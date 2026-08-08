# Ventura AI Free

Mapa de ferramentas de IA com cadastro, sessão client-side, tracking de interesse,
EmailJS e painel local de leads.

## Fluxo

1. Landing page → `/cadastro/`
2. Cadastro com nome + email
3. Sessão persistida no navegador
4. Email de boas-vindas via EmailJS, quando configurado
5. `/mapa/` exige sessão client-side
6. Clique em uma IA registra interesse
7. Lead é salvo no navegador e pode gerar notificação EmailJS
8. `/admin/` mostra os leads existentes **naquele navegador**

## Limites de segurança

Este projeto é estático para GitHub Pages. `localStorage` não é backend e não
centraliza leads de visitantes diferentes. A proteção de rotas é client-side,
não autenticação forte. Para produção, use backend e autenticação real.

## Desenvolvimento

```bash
npm install
npm run dev
```

## EmailJS

Copie `.env.example` para `.env.local` e configure as variáveis públicas do EmailJS.
Sem EmailJS o projeto continua funcionando e registra a intenção de envio no console.

## GitHub Pages

O workflow `.github/workflows/pages.yml` publica automaticamente o diretório `out/`.

## Licença

MIT

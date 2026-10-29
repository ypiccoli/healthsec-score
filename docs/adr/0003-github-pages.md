# ADR 0003: Hospedagem no GitHub Pages

- **Status:** aceita
- **Data:** 2026-10-28
- **Substitui:** a parte de hospedagem da [ADR 0001](0001-stack.md) (Cloudflare Pages)

## Contexto

A ADR 0001 previa o Cloudflare Pages. Isso exigia uma conta externa e uma integração a mais para o grupo manter. O código, o CI e o quadro já estão no GitHub.

## Decisão

Publicar no **GitHub Pages**, em `https://ypiccoli.github.io/healthsec-score/`, por um job `deploy` no próprio `ci.yml`:

- só roda em push na `main`, ou seja, depois de um PR aprovado;
- só roda depois que o job `ci` (lint, testes, build e checagem da CSP) passa;
- não usa token nem segredo: a autenticação é o OIDC do próprio GitHub Actions.

## Consequências

- **Tudo num lugar só:** código, revisão, publicação e quadro.
- **Sem cabeçalhos HTTP customizados.** O GitHub Pages não permite configurar cabeçalhos. Por isso:
  - a **CSP** vai numa `<meta http-equiv="Content-Security-Policy">` no `index.html`, e a política de referrer numa `<meta name="referrer">`;
  - **`frame-ancestors` e `X-Frame-Options` não funcionam** por `<meta>`, então o site pode ser embutido em iframe de outro domínio (clickjacking). **Risco aceito:** o site não tem login, sessão nem ação sensível, e um clique forçado não causa dano;
  - `Permissions-Policy` e `Cross-Origin-Opener-Policy` também ficam de fora, com impacto baixo para um site sem câmera, microfone ou janelas abertas.
- **HTTPS forçado** e HSTS já vêm do domínio `github.io`.
- **Caminho base:** o site fica em `/healthsec-score/`, então o Vite precisa de `base: "/healthsec-score/"`.
- **Sem fallback de SPA:** recarregar uma rota de URL dá 404. A navegação entre telas é por estado (ou `HashRouter`, se algum dia precisar de rota).
- Se a V2 tiver login, a falta de cabeçalhos passa a pesar, e esta decisão deve ser revista.

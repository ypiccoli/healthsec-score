# ADR 0001: Stack do MVP

- **Status:** aceita
- **Data:** 2026-10-28

## Contexto

O grupo tem níveis diferentes de experiência com programação, e várias pessoas vão aprender React durante o projeto. O MVP precisa caber em cerca de cinco semanas e ser publicado sem custo.

## Decisão

- **Uma linguagem só (TypeScript) e um projeto só (React + Vite).** Quem programa aprende um conjunto de ferramentas, e todo mundo pode ajudar todo mundo.
- **Mantine** para componentes. Escolhido em vez do shadcn/ui porque já vem pronto para usar, sem configuração extra, o que é melhor para quem está começando.
- **Zod** para validar o `questionario.json` e o arquivo de respostas carregado pelo usuário.
- **Recharts** para os gráficos do resultado (barras e radar).
- **Vitest** para os testes, principalmente do motor de scoring.
- ~~**Cloudflare Pages** para hospedagem~~. Substituída pela [ADR 0003](0003-github-pages.md): GitHub Pages.
- **GitHub Actions** para CI; **Gitleaks**, **Semgrep** e **Dependabot** para as verificações de segurança.

## Consequências

- Uma dependência nova exige uma ADR nova. Isso mantém o projeto pequeno e fácil de revisar.
- Domínio próprio é opcional e, se o grupo quiser, entra como custo na seção de Finanças do trabalho.

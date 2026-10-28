# HealthSec Score

Diagnóstico inicial de maturidade em segurança da informação para clínicas, laboratórios e hospitais de pequeno porte. A instituição responde a um questionário no navegador e vê, na hora, o score geral e por domínio, os pontos de atenção em ordem de prioridade e um relatório para salvar em PDF.

Projeto Integrador Institucional (FTEC/UNIFTEC), reunindo Engenharia de Produção, Análise e Desenvolvimento de Sistemas, Segurança da Informação e Administração de Empresas.

> O HealthSec Score é uma avaliação inicial. Não substitui auditoria, teste técnico ou serviço especializado de segurança.

## Como funciona

Tudo roda no navegador do cliente. Não há login, servidor nem banco de dados, e as respostas nunca saem do computador de quem responde.

```
Início → Dados da instituição → Questionário
                                     │ salva no navegador
                                     ▼
Perguntas e pesos (JSON) ──► Cálculo do score ◄── Respostas
                                     │
                                     ▼
                     Resultado e prioridades → Relatório em PDF
```

Detalhes em [docs/escopo-mvp.md](docs/escopo-mvp.md).

## Stack

| Para quê | Ferramenta |
|---|---|
| Linguagem | TypeScript |
| Aplicação | React + Vite |
| Componentes | Mantine |
| Validação do questionário | Zod |
| Gráficos | Recharts |
| Testes | Vitest |
| Publicação | GitHub Actions + Cloudflare Pages |
| Varreduras | Gitleaks, Semgrep, Dependabot |

Por que essa stack: [docs/adr/0001-stack.md](docs/adr/0001-stack.md).

## Rodando localmente

Pré-requisitos: Git e Node.js 24 (LTS). Quem usa `nvm` pode rodar `nvm use`.

```bash
git clone https://github.com/ypiccoli/healthsec-score.git
cd healthsec-score
npm install
npm run dev
```

> A aplicação ainda não foi criada. O primeiro PR de código cria o projeto Vite. Até lá, o repositório tem só a documentação e as verificações.

## Quem faz o quê

| Frente | Entrega |
|---|---|
| Front e UI/UX | Protótipo no Figma; telas de início, dados da instituição e questionário |
| Lógica e integração | Estrutura do projeto, navegação, salvar e carregar respostas, revisão de código |
| Dados do questionário | `questionario.json` com domínios, perguntas, pesos e recomendações |
| Motor de scoring | Funções de score, classificação e prioridades, com testes |
| Resultado e relatório | Tela de resultado com gráficos e página de relatório para PDF |
| Infra, DevSecOps e segurança | Repositório, publicação, varreduras; conteúdo do questionário |
| Gestão | Quadro de tarefas, cronograma e atas |
| Processos e qualidade | Fluxo do diagnóstico, regra de priorização, indicadores, PDCA |

## Contribuindo

Leia o [CONTRIBUTING.md](CONTRIBUTING.md) antes do primeiro PR. Quem usa IA (Claude, Codex, ChatGPT) para programar: as regras para o agente estão no [AGENTS.md](AGENTS.md).

## Documentação

- [Escopo do MVP](docs/escopo-mvp.md)
- [Formato do questionário](docs/questionario-formato.md)
- [Regra de scoring](docs/scoring-regra.md)
- [Segurança da aplicação](docs/seguranca.md)
- [Decisões (ADRs)](docs/adr/)

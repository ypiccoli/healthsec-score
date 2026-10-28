# AGENTS.md

Regras para agentes de IA (Codex, Claude e outros) que trabalham neste repositório. Elas valem para qualquer pessoa do grupo que use IA para gerar código ou texto aqui.

## O projeto em uma frase

Site estático em que uma instituição de saúde responde a um questionário de segurança da informação e recebe, no próprio navegador, um score geral e por domínio, pontos de atenção priorizados e um relatório para PDF.

## Limites do MVP (não negociáveis)

- **Só front-end.** Não criar backend, API, banco de dados, login, cadastro, analytics, telemetria nem qualquer chamada de rede para terceiros.
- **As respostas não saem do navegador.** Elas ficam em `localStorage` e em arquivo `.json` que o próprio usuário baixa e carrega. Não enviar a nenhum lugar.
- Login, histórico de avaliações, várias instituições e painel da consultoria ficam para a V2. Não adiantar nada disso.
- Se uma tarefa parecer exigir algo fora desses limites, pare e explique no PR ou na conversa, em vez de implementar.

## Stack fixa

TypeScript, React + Vite, Mantine, Zod, Recharts e Vitest. **Não adicionar dependência nova** sem uma ADR aprovada em `docs/adr/`. Prefira o que o Mantine já oferece antes de escrever CSS ou componente do zero.

## Estrutura esperada

O projeto Vite ainda vai ser criado. Quando existir, siga esta divisão:

```
src/
  app/            # rotas, layout, providers (Lógica e integração)
  telas/          # uma pasta por tela: inicio, instituicao, questionario, resultado, relatorio
  questionario/   # questionario.json + schema Zod + loader (Dados do questionário)
  scoring/        # funções puras de cálculo + testes *.test.ts (Motor de scoring)
  respostas/      # salvar/carregar localStorage e arquivo .json (Lógica e integração)
  componentes/    # componentes compartilhados entre telas
index.html        # contém a <meta> de CSP (docs/seguranca.md): não remover
vite.config.ts    # base: "/healthsec-score/" (endereço do GitHub Pages)
```

Ao rodar `npm create vite@latest` neste diretório, escolha **ignorar os arquivos existentes**. Não apagar `docs/` nem `.github/`.

O site é publicado no GitHub Pages em `https://ypiccoli.github.io/healthsec-score/`. Por isso:

- o `vite.config.ts` precisa de `base: "/healthsec-score/"`;
- o `index.html` precisa das `<meta>` de CSP e de referrer que estão em `docs/seguranca.md`. O CI falha sem elas;
- a navegação entre telas é por estado (ex.: `Stepper` do Mantine), sem rotas de URL. Se algum dia precisar de rota, use `HashRouter`, porque o Pages dá 404 ao recarregar uma rota de SPA.

## Regras de código

1. **O questionário vem só do `questionario.json`.** Nenhuma pergunta, peso ou recomendação escrita direto em componente. O arquivo é validado com Zod no carregamento. Formato em `docs/questionario-formato.md`.
2. **O scoring é feito por funções puras** em `src/scoring/`: recebem questionário + respostas e devolvem resultado, sem React, sem `localStorage` e sem efeito colateral. Toda função tem teste Vitest. A regra está em `docs/scoring-regra.md`.
3. **As telas não recalculam.** Resultado e relatório só exibem o que o scoring devolve.
4. **Valide com Zod todo dado que vem de fora:** o `questionario.json` e, principalmente, o arquivo de respostas que o usuário carrega. Arquivo inválido gera mensagem amigável, nunca tela quebrada.
5. TypeScript estrito. Não usar `any` nem `@ts-ignore` sem um comentário dizendo o motivo.
6. Nomes de domínio em português (`dominio`, `pergunta`, `resposta`, `score`). Código e comentários curtos e claros.

## Segurança

- Nunca usar `dangerouslySetInnerHTML`, `eval`, `new Function` nem montar HTML com string.
- Nunca inserir segredo, token, chave, senha ou URL interna no código, em teste ou em exemplo.
- Dados de exemplo e de teste são **sempre fictícios**. Nada de nome de instituição real, paciente, CPF, CNPJ ou e-mail real.
- Não adicionar script inline nem recurso de CDN externo. A CSP no `index.html` bloqueia, e afrouxar a CSP exige revisão de segurança.
- Não usar o `ColorSchemeScript` do Mantine (é script inline). Tema claro fixo no MVP.
- Este repositório é **público** e é um trabalho acadêmico. Não citar empresas, clientes ou ambientes reais de nenhum integrante.

## Fluxo de trabalho

- Uma branch por tarefa: `nome/tarefa` (ex.: `rael/score-por-dominio`). Nunca commitar direto na `main`, que é protegida.
- Commits pequenos, com mensagem em português no imperativo, dizendo o que mudou (ex.: `Adiciona cálculo do score por domínio`).
- Todo PR usa o template, passa no CI e tem aprovação. Revisão de código: Gabriel. Segurança, publicação e questionário: Ygor.
- **A pessoa que abre o PR precisa entender cada linha que a IA gerou.** Se não souber explicar um trecho, simplifique ou pergunte antes de pedir revisão.

## Comandos

Depois que o projeto Vite existir:

```bash
npm install        # instala dependências
npm run dev        # servidor local
npm run lint       # ESLint
npm run test       # Vitest
npm run build      # build de produção em dist/
```

Antes de dar uma tarefa por concluída, rode `lint`, `test` e `build`. O CI roda os mesmos três.

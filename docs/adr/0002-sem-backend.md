# ADR 0002: MVP sem backend

- **Status:** aceita
- **Data:** 2026-10-28

## Contexto

A primeira versão do escopo previa backend, API e banco de dados. O grupo enxugou o MVP para caber no prazo e no conhecimento disponível. Além disso, o modelo de negócio é consultivo: a equipe orienta o cliente, mas a gestão dos dados fica com o próprio cliente.

## Decisão

O MVP é um site estático. Tudo roda no navegador:

- o questionário vem de um arquivo JSON empacotado no build;
- as respostas ficam em `localStorage` e podem ser baixadas e carregadas como arquivo `.json`;
- o cálculo, o resultado e o relatório são gerados no navegador.

Nada é enviado para servidor, e não há login.

## Consequências

- **Privacidade por padrão.** As respostas nunca saem do computador do cliente, o que atende ao princípio da necessidade da LGPD (art. 6º, III) e dispensa tratar dados de terceiros.
- **Superfície de ataque menor.** Sem servidor, banco ou credenciais, os riscos principais passam a ser XSS e a cadeia de dependências. Eles são tratados com CSP, Semgrep e Dependabot.
- **Limitações aceitas.** Não há histórico entre dispositivos nem painel da consultoria. Isso fica para a V2, que vai exigir revisar esta ADR.

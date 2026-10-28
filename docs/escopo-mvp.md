# Escopo do MVP

## O que o site faz

1. Pede dados básicos da instituição: nome, tipo e porte.
2. Aplica o questionário por domínio de segurança, um domínio por vez, com barra de progresso.
3. Calcula o score geral e por domínio.
4. Mostra os pontos de atenção em ordem de prioridade, com recomendações.
5. Gera o relatório para salvar em PDF (página pensada para impressão, `window.print()`).
6. Permite baixar as respostas num arquivo `.json` e carregar de novo depois.

## Telas

| Tela | Frente |
|---|---|
| Início | Front e UI/UX |
| Dados da instituição | Front e UI/UX |
| Questionário | Front e UI/UX |
| Resultado e prioridades | Resultado e relatório |
| Relatório (PDF) | Resultado e relatório |

## Fica para a V2

- Login e cadastro
- Várias instituições por conta
- Histórico de avaliações e comparativo de evolução
- Painel da consultoria

## Por que só front-end

Além de ser mais simples para o grupo, as respostas nunca saem do computador do cliente. Isso combina com a decisão do grupo de não gerir os dados do cliente (a equipe atua de forma consultiva) e com o princípio da necessidade da LGPD (Lei nº 13.709/2018, art. 6º, III): o projeto não trata dado que não precisa tratar. Ver [ADR 0002](adr/0002-sem-backend.md).

## Fora de escopo

O HealthSec Score é uma avaliação inicial e autodeclarada. Não substitui auditoria, teste de intrusão, análise técnica de ambiente ou serviço especializado de segurança.

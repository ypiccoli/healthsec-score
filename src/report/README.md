# Relatório

Relatório consolidado para salvar em PDF, gerado no próprio navegador.

- O PDF sai pela impressão do navegador (`window.print()`), com estilo de impressão. Sem biblioteca nova e sem enviar dados para fora do computador do cliente.
- Gráfico por domínio com Recharts, já na stack.
- Hoje a tela de resultado e o relatório usam os dados fixos de `src/data/resultadoDemonstracao.ts`. Quando o motor de scoring existir, passam a exibir o que ele devolve, sem recalcular.

# Motor de scoring

Recebe o questionário e as respostas e devolve o score geral, o score por domínio e os pontos de atenção em ordem de prioridade. Funções puras, sem React, sem `localStorage` e sem efeito colateral, cada uma com teste Vitest.

A regra e o exemplo calculado à mão (primeiro caso de teste) estão em [docs/scoring-regra.md](../../docs/scoring-regra.md). Ainda em aberto lá:

- pergunta sem resposta;
- opção "Não se aplica";
- arredondamento (e se a classificação usa o valor exato ou o exibido);
- média geral simples ou ponderada.

O formato do resultado é combinado entre o scoring (Rael) e a tela de resultado e relatório (Marlon). As telas só exibem o que estas funções devolvem.

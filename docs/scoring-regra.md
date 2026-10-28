# Regra de scoring

> **Proposta, a validar com Rael (motor de scoring), Rafael (priorização) e Ygor (segurança).** Enquanto estiver marcada assim, a regra pode mudar. Mudou a regra, atualize este documento e os testes no mesmo PR.

O código fica em `src/scoring/`, em funções puras com teste Vitest. As telas só exibem o que essas funções devolvem.

## Cálculo

1. **Pontos da pergunta** = valor da opção escolhida × peso.
2. **Máximo da pergunta** = maior valor entre as opções × peso.
3. **Score do domínio** = soma dos pontos ÷ soma dos máximos × 100.
4. **Score geral** = média simples dos scores dos domínios.
5. **Classificação** (geral e por domínio):

| Score | Classificação |
|---|---|
| 0 a 39 | Crítico |
| 40 a 59 | Baixo |
| 60 a 79 | Médio |
| 80 a 100 | Alto |

6. **Pontos de atenção** = perguntas que não estão na melhor opção, ordenadas pelos **pontos perdidos** ((máximo − valor) × peso), do maior para o menor. No empate, vem primeiro o domínio com menor score. Cada ponto de atenção mostra a `recomendacao` da pergunta.

## Exemplo calculado à mão

Usa [exemplos/questionario.exemplo.json](exemplos/questionario.exemplo.json). Serve de primeiro caso de teste.

| Pergunta | Peso | Resposta | Valor | Pontos | Máximo | Perdidos |
|---|---|---|---|---|---|---|
| backup-01 | 3 | Às vezes | 1 | 3 | 6 | 3 |
| backup-02 | 2 | Sim | 2 | 4 | 4 | 0 |
| acessos-01 | 3 | Não | 0 | 0 | 6 | 6 |
| acessos-02 | 1 | Sim | 2 | 2 | 2 | 0 |

- **Backup e continuidade:** 7 ÷ 10 × 100 = **70 → Médio**
- **Controle de acesso:** 2 ÷ 8 × 100 = **25 → Crítico**
- **Geral:** (70 + 25) ÷ 2 = **47,5 → Baixo**
- **Pontos de atenção:** 1º `acessos-01` (6 perdidos), 2º `backup-01` (3 perdidos).

Em Vitest, algo como:

```ts
expect(resultado.dominios.backup.score).toBe(70);
expect(resultado.dominios.acessos.classificacao).toBe("critico");
expect(resultado.geral.score).toBe(47.5);
expect(resultado.pontosDeAtencao.map((p) => p.perguntaId)).toEqual(["acessos-01", "backup-01"]);
```

## Em aberto

- [ ] **Pergunta sem resposta:** bloquear o resultado até responder tudo, ou contar como valor 0? Proposta: exigir todas as respostas.
- [ ] **"Não se aplica":** se existir, a pergunta sai do numerador e do denominador do domínio.
- [ ] **Arredondamento:** calcular sem arredondar e exibir inteiro (47,5 aparece como 48)? A classificação usa o valor exato ou o exibido?
- [ ] **Média geral:** simples ou ponderada pelo número de perguntas ou pela importância do domínio?

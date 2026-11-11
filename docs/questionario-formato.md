# Formato do questionário

O questionário inteiro (domínios, perguntas, explicações, opções, pesos, recomendações e referências) vive num único arquivo, `src/data/questionario.json`. As telas e o scoring leem dele. Nenhuma pergunta é escrita direto no código.

Responsáveis: **Lucas** (arquivo e schema), com **Ygor** (conteúdo de segurança, com base em NIST CSF 2.0, CIS Controls v8 IG1 e LGPD).

## Estrutura

Pense no JSON como três tabelas encaixadas: **domínio → pergunta → opção**.

```json
{
  "dominios": [
    {
      "id": "backup",
      "nome": "Backup e continuidade",
      "perguntas": [
        {
          "id": "backup-01",
          "texto": "A instituição testa a restauração dos backups?",
          "explicacao": "Um backup só protege quando a equipe confirma que consegue restaurar os arquivos.",
          "peso": 3,
          "opcoes": [
            { "texto": "Não", "valor": 0 },
            { "texto": "Às vezes", "valor": 1 },
            { "texto": "Sim, com rotina definida", "valor": 2 }
          ],
          "recomendacao": "Testar a restauração ao menos uma vez por trimestre.",
          "referencia": "CIS 11.5, NIST CSF RC.RP"
        }
      ]
    }
  ]
}
```

Exemplo completo, com dados fictícios: [exemplos/questionario.exemplo.json](exemplos/questionario.exemplo.json).

## Regras dos campos

| Campo | Regra |
|---|---|
| `dominio.id`, `pergunta.id` | Texto curto, minúsculo, sem acento, com hífen. Único no arquivo. O id da pergunta começa com o id do domínio (`backup-01`). **Depois de publicado, não muda**, porque o arquivo de respostas salvo pelo usuário depende dele. |
| `nome`, `texto` | Linguagem simples, para gestor sem formação em TI. |
| `explicacao` | Texto do quadro "Por que isso importa" na tela da pergunta. Uma ou duas frases, com **no máximo 200 caracteres**, dizendo o risco que a pergunta avalia. |
| `peso` | Inteiro de 1 a 3: 1 = desejável, 2 = importante, 3 = essencial. |
| `opcoes` | De 2 a 5 opções, em ordem do pior para o melhor. |
| `valor` | Inteiro a partir de 0. A pior opção vale 0. |
| `recomendacao` | O que fazer para chegar à melhor opção, numa frase com ação concreta. |
| `referencia` | Controles e artigos que embasam a pergunta, sem ponto final (ex.: `CIS 11.5, NIST CSF RC.RP`, `LGPD art. 41`). Fica fora do limite da `explicacao`, e a tela decide como exibir. |

## Schema Zod

O schema está em [`src/schema/questionario.ts`](../src/schema/questionario.ts) e segue as regras acima. O `questionario.json` é validado com ele ao carregar. Mudou o schema, atualize este documento no mesmo PR.

O teste em `src/schema/questionario.test.ts` confere o formato, as 20 perguntas em 8 domínios e se o id de cada pergunta começa com o id do domínio. Mudou o `questionario.json`, ajuste o teste no mesmo PR.

## Arquivo de respostas

O arquivo que o usuário baixa também é validado com Zod ao ser carregado, porque vem de fora e pode ter sido editado à mão. Formato proposto (Gabriel define no PR de salvar/carregar):

```json
{
  "versao": 1,
  "instituicao": { "nome": "Clínica Exemplo", "tipo": "clinica", "porte": "pequeno" },
  "respostas": { "backup-01": 1, "backup-02": 2 }
}
```

`respostas` mapeia o id da pergunta para o **índice da opção escolhida**. Id que não existe no questionário é ignorado, e índice fora da faixa invalida o arquivo.

## Pendências

- [x] Lista final de domínios (Lucas + Ygor): 8 domínios e 20 perguntas em `src/data/questionario.json`, a validar com o Ygor no PR.
- [ ] Decidir se haverá opção "Não se aplica" e como ela entra no cálculo (ver [scoring-regra.md](scoring-regra.md)).

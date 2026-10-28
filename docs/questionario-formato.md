# Formato do questionário

O questionário inteiro (domínios, perguntas, opções, pesos e recomendações) vive num único arquivo, `src/questionario/questionario.json`. As telas e o scoring leem dele. Nenhuma pergunta é escrita direto no código.

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
          "peso": 3,
          "opcoes": [
            { "texto": "Não", "valor": 0 },
            { "texto": "Às vezes", "valor": 1 },
            { "texto": "Sim, com rotina definida", "valor": 2 }
          ],
          "recomendacao": "Testar a restauração ao menos uma vez por trimestre."
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
| `peso` | Inteiro de 1 a 3: 1 = desejável, 2 = importante, 3 = essencial. |
| `opcoes` | De 2 a 5 opções, em ordem do pior para o melhor. |
| `valor` | Inteiro a partir de 0. A pior opção vale 0. |
| `recomendacao` | O que fazer para chegar à melhor opção, numa frase com ação concreta. |

## Schema Zod de referência

Ponto de partida para `src/questionario/schema.ts`. O Lucas pode ajustar, desde que este documento seja atualizado junto.

```ts
import { z } from "zod";

const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "id inválido");

export const opcaoSchema = z.object({
  texto: z.string().min(1),
  valor: z.number().int().min(0),
});

export const perguntaSchema = z.object({
  id,
  texto: z.string().min(1),
  peso: z.number().int().min(1).max(3),
  opcoes: z.array(opcaoSchema).min(2).max(5),
  recomendacao: z.string().min(1),
});

export const dominioSchema = z.object({
  id,
  nome: z.string().min(1),
  perguntas: z.array(perguntaSchema).min(1),
});

export const questionarioSchema = z
  .object({ dominios: z.array(dominioSchema).min(1) })
  .superRefine((q, ctx) => {
    const ids = q.dominios.flatMap((d) => [d.id, ...d.perguntas.map((p) => p.id)]);
    const repetidos = ids.filter((v, i) => ids.indexOf(v) !== i);
    if (repetidos.length > 0) {
      ctx.addIssue({ code: "custom", message: `ids repetidos: ${repetidos.join(", ")}` });
    }
  });

export type Questionario = z.infer<typeof questionarioSchema>;
```

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

- [ ] Lista final de domínios (Lucas + Ygor).
- [ ] Decidir se haverá opção "Não se aplica" e como ela entra no cálculo (ver [scoring-regra.md](scoring-regra.md)).

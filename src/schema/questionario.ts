import { z } from 'zod';

// Formato do arquivo src/data/questionario.json, validado no carregamento.
export const OpcaoSchema = z.object({
  id: z.string(),
  texto: z.string(),
  valor: z.number().min(0).max(1),
});

export const PerguntaSchema = z.object({
  id: z.string(),
  texto: z.string(),
  peso: z.number().positive(),
  opcoes: z.array(OpcaoSchema).min(2),
  recomendacao: z.string(),
});

export const DominioSchema = z.object({
  id: z.string(),
  nome: z.string(),
  peso: z.number().positive(),
  perguntas: z.array(PerguntaSchema).min(1),
});

export const QuestionarioSchema = z.object({
  versao: z.string(),
  dominios: z.array(DominioSchema).min(1),
});

export type Opcao = z.infer<typeof OpcaoSchema>;
export type Pergunta = z.infer<typeof PerguntaSchema>;
export type Dominio = z.infer<typeof DominioSchema>;
export type Questionario = z.infer<typeof QuestionarioSchema>;

// Respostas: id da pergunta -> id da opção escolhida.
export type Respostas = Record<string, string>;

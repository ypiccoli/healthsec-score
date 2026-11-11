import { z } from 'zod';

const idSchema = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'O identificador deve usar letras minúsculas e hífens.');

export const opcaoSchema = z.object({
  texto: z.string().min(1),
  valor: z.number().int().min(0),
});

export const perguntaSchema = z.object({
  id: idSchema,
  texto: z.string().min(1),
  explicacao: z.string().min(1).max(200),
  peso: z.number().int().min(1).max(3),
  opcoes: z.array(opcaoSchema).min(2).max(5),
  recomendacao: z.string().min(1),
  referencia: z.string().min(1),
});

export const dominioSchema = z.object({
  id: idSchema,
  nome: z.string().min(1),
  perguntas: z.array(perguntaSchema).min(1),
});

export const questionarioSchema = z
  .object({
    dominios: z.array(dominioSchema).min(1),
  })
  .superRefine((questionario, contexto) => {
    const identificadores = questionario.dominios.flatMap((dominio) => [
      dominio.id,
      ...dominio.perguntas.map((pergunta) => pergunta.id),
    ]);
    const identificadoresRepetidos = identificadores.filter(
      (identificador, indice) => identificadores.indexOf(identificador) !== indice,
    );

    if (identificadoresRepetidos.length > 0) {
      contexto.addIssue({
        code: 'custom',
        message: `Identificadores repetidos: ${identificadoresRepetidos.join(', ')}`,
      });
    }
  });

export type Opcao = z.infer<typeof opcaoSchema>;
export type Pergunta = z.infer<typeof perguntaSchema>;
export type Dominio = z.infer<typeof dominioSchema>;
export type Questionario = z.infer<typeof questionarioSchema>;
export type Respostas = Record<string, number>;

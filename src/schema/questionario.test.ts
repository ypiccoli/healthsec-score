import { describe, expect, it } from 'vitest';
import dadosDoQuestionario from '../data/questionario.json';
import { questionarioSchema } from './questionario';

describe('questionario.json', () => {
  it('segue o formato esperado', () => {
    expect(() => questionarioSchema.parse(dadosDoQuestionario)).not.toThrow();
  });

  it('contém as quatro perguntas de exemplo', () => {
    const questionario = questionarioSchema.parse(dadosDoQuestionario);
    const quantidadeDePerguntas = questionario.dominios.reduce(
      (total, dominio) => total + dominio.perguntas.length,
      0,
    );

    expect(quantidadeDePerguntas).toBe(4);
  });
});

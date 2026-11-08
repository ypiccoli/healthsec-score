import { describe, expect, it } from 'vitest';
import dadosDoQuestionario from '../data/questionario.json';
import { questionarioSchema } from './questionario';

describe('questionario.json', () => {
  it('segue o formato esperado', () => {
    expect(() => questionarioSchema.parse(dadosDoQuestionario)).not.toThrow();
  });

  it('contém 20 perguntas em 8 domínios', () => {
    const questionario = questionarioSchema.parse(dadosDoQuestionario);
    const quantidadeDePerguntas = questionario.dominios.reduce(
      (total, dominio) => total + dominio.perguntas.length,
      0,
    );

    expect(questionario.dominios).toHaveLength(8);
    expect(quantidadeDePerguntas).toBe(20);
  });

  it('usa o id do domínio como prefixo do id de cada pergunta', () => {
    const questionario = questionarioSchema.parse(dadosDoQuestionario);

    for (const dominio of questionario.dominios) {
      for (const pergunta of dominio.perguntas) {
        expect(pergunta.id.startsWith(`${dominio.id}-`)).toBe(true);
      }
    }
  });
});

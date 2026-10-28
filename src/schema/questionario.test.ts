import { describe, it, expect } from 'vitest';
import { QuestionarioSchema } from './questionario';
import dados from '../data/questionario.json';

describe('questionario.json', () => {
  it('segue o schema', () => {
    expect(() => QuestionarioSchema.parse(dados)).not.toThrow();
  });
});

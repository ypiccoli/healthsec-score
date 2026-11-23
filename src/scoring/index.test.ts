import { describe, expect, it } from 'vitest';

import type { Questionario, Respostas } from '../schema/questionario';
import {
  arredondarScore,
  calcularScoring,
  classificarScore,
} from './index';

const questionarioTeste: Questionario = {
  dominios: [
    {
      id: 'backup',
      nome: 'Backup e continuidade',
      perguntas: [
        {
          id: 'backup-01',
          texto: 'A instituição testa a restauração dos backups?',
          peso: 3,
          opcoes: [
            { texto: 'Não', valor: 0 },
            { texto: 'Às vezes', valor: 1 },
            { texto: 'Sim', valor: 2 },
          ],
          recomendacao: 'Estabelecer testes periódicos de restauração.',
        },
        {
          id: 'backup-02',
          texto: 'Existe uma política de backup?',
          peso: 2,
          opcoes: [
            { texto: 'Não', valor: 0 },
            { texto: 'Parcialmente', valor: 1 },
            { texto: 'Sim', valor: 2 },
          ],
          recomendacao: 'Documentar uma política de backup.',
        },
      ],
    },
    {
      id: 'acessos',
      nome: 'Controle de acesso',
      perguntas: [
        {
          id: 'acessos-01',
          texto: 'Os acessos são revisados periodicamente?',
          peso: 3,
          opcoes: [
            { texto: 'Não', valor: 0 },
            { texto: 'Parcialmente', valor: 1 },
            { texto: 'Sim', valor: 2 },
          ],
          recomendacao: 'Implantar revisões periódicas de acesso.',
        },
      ],
    },
  ],
};

describe('classificarScore', () => {
  it('classifica corretamente os limites das faixas', () => {
    expect(classificarScore(0)).toBe('critico');
    expect(classificarScore(39.99)).toBe('critico');
    expect(classificarScore(40)).toBe('baixo');
    expect(classificarScore(59.99)).toBe('baixo');
    expect(classificarScore(60)).toBe('medio');
    expect(classificarScore(79.99)).toBe('medio');
    expect(classificarScore(80)).toBe('alto');
    expect(classificarScore(100)).toBe('alto');
  });

  it('rejeita valores fora do intervalo permitido', () => {
    expect(() => classificarScore(-1)).toThrow();
    expect(() => classificarScore(101)).toThrow();
    expect(() => classificarScore(Number.NaN)).toThrow();
  });
});

describe('arredondarScore', () => {
  it('arredonda apenas para exibição', () => {
    expect(arredondarScore(47.5)).toBe(48);
    expect(arredondarScore(47.4)).toBe(47);
  });
});

describe('calcularScoring', () => {
  it('calcula a pontuação ponderada dos domínios', () => {
    const respostas: Respostas = {
      'backup-01': 1,
      'backup-02': 2,
      'acessos-01': 1,
    };

    const resultado = calcularScoring(questionarioTeste, respostas);

    expect(resultado.dominios[0].score).toBe(70);
    expect(resultado.dominios[1].score).toBe(50);
    expect(resultado.scoreGeral).toBe(60);
    expect(resultado.classificacaoGeral).toBe('medio');
  });

  it('calcula a média simples dos domínios', () => {
    const respostas: Respostas = {
      'backup-01': 1,
      'backup-02': 2,
      'acessos-01': 1,
    };

    const resultado = calcularScoring(questionarioTeste, respostas);

    expect(resultado.scoreGeral).toBe(
      (resultado.dominios[0].score + resultado.dominios[1].score) / 2,
    );
  });

  it('bloqueia o cálculo quando falta uma resposta', () => {
    const respostas: Respostas = {
      'backup-01': 1,
      'backup-02': 2,
    };

    expect(() =>
      calcularScoring(questionarioTeste, respostas),
    ).toThrow('Responda à pergunta "acessos-01"');
  });

  it('rejeita índice de opção inexistente', () => {
    const respostas: Respostas = {
      'backup-01': 5,
      'backup-02': 2,
      'acessos-01': 1,
    };

    expect(() =>
      calcularScoring(questionarioTeste, respostas),
    ).toThrow('Responda à pergunta "backup-01"');
  });

  it('não gera pontos de atenção quando todas as respostas são máximas', () => {
    const respostas: Respostas = {
      'backup-01': 2,
      'backup-02': 2,
      'acessos-01': 2,
    };

    const resultado = calcularScoring(questionarioTeste, respostas);

    expect(resultado.scoreGeral).toBe(100);
    expect(resultado.classificacaoGeral).toBe('alto');
    expect(resultado.pontosDeAtencao).toHaveLength(0);
  });

  it('ordena os pontos de atenção pela maior perda de pontos', () => {
    const respostas: Respostas = {
      'backup-01': 1,
      'backup-02': 2,
      'acessos-01': 0,
    };

    const resultado = calcularScoring(questionarioTeste, respostas);

    expect(resultado.pontosDeAtencao[0].perguntaId).toBe('acessos-01');
    expect(resultado.pontosDeAtencao[0].pontosPerdidos).toBe(6);
    expect(resultado.pontosDeAtencao[1].perguntaId).toBe('backup-01');
    expect(resultado.pontosDeAtencao[1].pontosPerdidos).toBe(3);
  });

  it('usa o menor score do domínio como desempate', () => {
    const respostas: Respostas = {
      'backup-01': 1,
      'backup-02': 2,
      'acessos-01': 1,
    };

    const resultado = calcularScoring(questionarioTeste, respostas);

    expect(resultado.pontosDeAtencao[0].perguntaId).toBe('acessos-01');
    expect(resultado.pontosDeAtencao[1].perguntaId).toBe('backup-01');
  });

  it('inclui a recomendação correspondente à pergunta', () => {
    const respostas: Respostas = {
      'backup-01': 1,
      'backup-02': 2,
      'acessos-01': 1,
    };

    const resultado = calcularScoring(questionarioTeste, respostas);

    expect(resultado.pontosDeAtencao[0].recomendacao).toBe(
      'Implantar revisões periódicas de acesso.',
    );
  });

  it('mantém o score exato e arredonda somente o valor de exibição', () => {
    const questionario: Questionario = {
      dominios: [
        {
          id: 'teste',
          nome: 'Domínio de teste',
          perguntas: [
            {
              id: 'teste-01',
              texto: 'Pergunta de teste',
              peso: 1,
              opcoes: [
                { texto: 'Não', valor: 0 },
                { texto: 'Sim', valor: 2 },
              ],
              recomendacao: 'Melhorar o controle.',
            },
          ],
        },
      ],
    };

    const respostas: Respostas = { 'teste-01': 0 };

    const resultado = calcularScoring(questionario, respostas);

    expect(resultado.scoreGeral).toBe(0);
    expect(resultado.scoreGeralExibicao).toBe(0);
  });
});

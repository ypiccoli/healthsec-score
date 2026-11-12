import type {
  Dominio,
  Pergunta,
  Questionario,
  Respostas,
} from '../schema/questionario';

import type {
  Classificacao,
  PontoDeAtencao,
  ResultadoDominio,
  ResultadoScoring,
} from './tipos';

interface PontoDeAtencaoInterno extends PontoDeAtencao {
  indiceDaPergunta: number;
  scoreDominio: number;
}

export function classificarScore(score: number): Classificacao {
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error('O score deve ser um número entre 0 e 100.');
  }

  if (score < 40) return 'critico';
  if (score < 60) return 'baixo';
  if (score < 80) return 'medio';

  return 'alto';
}

export function arredondarScore(score: number): number {
  return Math.round(score);
}

function validarResposta(
  pergunta: Pergunta,
  respostas: Respostas,
): number {
  const indice = respostas[pergunta.id];

  if (
    !Number.isInteger(indice) ||
    indice < 0 ||
    indice >= pergunta.opcoes.length
  ) {
    throw new Error(
      `Responda à pergunta "${pergunta.id}" antes de calcular o resultado.`,
    );
  }

  return indice;
}

function calcularResultadoDominio(
  dominio: Dominio,
  respostas: Respostas,
  pontosDeAtencao: PontoDeAtencaoInterno[],
  indiceInicial: number,
): { resultado: ResultadoDominio; proximoIndice: number } {
  let pontosObtidos = 0;
  let pontosMaximos = 0;
  let indiceDaPergunta = indiceInicial;

  for (const pergunta of dominio.perguntas) {
    const indiceResposta = validarResposta(pergunta, respostas);
    const opcaoSelecionada = pergunta.opcoes[indiceResposta];

    const maiorValor = Math.max(
      ...pergunta.opcoes.map((opcao) => opcao.valor),
    );

    const pontosDaPergunta = opcaoSelecionada.valor * pergunta.peso;
    const maximoDaPergunta = maiorValor * pergunta.peso;
    const pontosPerdidos = maximoDaPergunta - pontosDaPergunta;

    pontosObtidos += pontosDaPergunta;
    pontosMaximos += maximoDaPergunta;

    if (pontosPerdidos > 0) {
      pontosDeAtencao.push({
        perguntaId: pergunta.id,
        pergunta: pergunta.texto,
        dominioId: dominio.id,
        dominioNome: dominio.nome,
        pontosPerdidos,
        recomendacao: pergunta.recomendacao,
        indiceDaPergunta,
        scoreDominio: 0,
      });
    }

    indiceDaPergunta += 1;
  }

  if (pontosMaximos <= 0) {
    throw new Error(
      `Não foi possível calcular o domínio "${dominio.nome}": pontuação máxima inválida.`,
    );
  }

  const score = (pontosObtidos / pontosMaximos) * 100;

  return {
    resultado: {
      dominioId: dominio.id,
      nome: dominio.nome,
      score,
      scoreExibicao: arredondarScore(score),
      classificacao: classificarScore(score),
      pontosObtidos,
      pontosMaximos,
      totalPerguntas: dominio.perguntas.length,
    },
    proximoIndice: indiceDaPergunta,
  };
}

export function calcularScoring(
  questionario: Questionario,
  respostas: Respostas,
): ResultadoScoring {
  const pontosDeAtencaoInternos: PontoDeAtencaoInterno[] = [];
  const resultadosDosDominios: ResultadoDominio[] = [];

  let indiceDaPergunta = 0;

  for (const dominio of questionario.dominios) {
    const { resultado, proximoIndice } = calcularResultadoDominio(
      dominio,
      respostas,
      pontosDeAtencaoInternos,
      indiceDaPergunta,
    );

    resultadosDosDominios.push(resultado);
    indiceDaPergunta = proximoIndice;
  }

  if (resultadosDosDominios.length === 0) {
    throw new Error('O questionário não possui domínios para calcular.');
  }

  const scoreGeral =
    resultadosDosDominios.reduce(
      (total, dominio) => total + dominio.score,
      0,
    ) / resultadosDosDominios.length;

  const scorePorDominio = new Map(
    resultadosDosDominios.map((dominio) => [
      dominio.dominioId,
      dominio.score,
    ]),
  );

  const pontosDeAtencao = pontosDeAtencaoInternos
    .sort((a, b) => {
      const diferencaDePontos = b.pontosPerdidos - a.pontosPerdidos;

      if (diferencaDePontos !== 0) {
        return diferencaDePontos;
      }

      const scoreA = scorePorDominio.get(a.dominioId) ?? 0;
      const scoreB = scorePorDominio.get(b.dominioId) ?? 0;

      if (scoreA !== scoreB) {
        return scoreA - scoreB;
      }

      return a.indiceDaPergunta - b.indiceDaPergunta;
    })
    .map(
      ({
        indiceDaPergunta: _indice,
        scoreDominio: _score,
        ...ponto
      }) => ponto,
    );

  return {
    scoreGeral,
    scoreGeralExibicao: arredondarScore(scoreGeral),
    classificacaoGeral: classificarScore(scoreGeral),
    dominios: resultadosDosDominios,
    pontosDeAtencao,
  };
}

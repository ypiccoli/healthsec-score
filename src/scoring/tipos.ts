export type Classificacao = 'critico' | 'baixo' | 'medio' | 'alto';

export interface ResultadoDominio {
  dominioId: string;
  nome: string;
  score: number;
  scoreExibicao: number;
  classificacao: Classificacao;
  pontosObtidos: number;
  pontosMaximos: number;
  totalPerguntas: number;
}

export interface PontoDeAtencao {
  perguntaId: string;
  pergunta: string;
  dominioId: string;
  dominioNome: string;
  pontosPerdidos: number;
  recomendacao: string;
}

export interface ResultadoScoring {
  scoreGeral: number;
  scoreGeralExibicao: number;
  classificacaoGeral: Classificacao;
  dominios: ResultadoDominio[];
  pontosDeAtencao: PontoDeAtencao[];
}

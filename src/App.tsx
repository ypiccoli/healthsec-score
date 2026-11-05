import { Alert, Container } from '@mantine/core';
import { useState } from 'react';
import { AlternadorDeTema } from './components/AlternadorDeTema';
import dadosDoQuestionario from './data/questionario.json';
import { PaginaConclusao } from './pages/PaginaConclusao';
import { PaginaInicial } from './pages/PaginaInicial';
import { PaginaQuestionario } from './pages/PaginaQuestionario';
import { questionarioSchema, type Respostas } from './schema/questionario';

type TelaAtual = 'inicio' | 'questionario' | 'conclusao';

// Impede que um arquivo de perguntas inválido chegue até as telas.
const questionarioValidado = questionarioSchema.safeParse(dadosDoQuestionario);

export function App() {
  const [telaAtual, setTelaAtual] = useState<TelaAtual>('inicio');
  const [indiceDaPergunta, setIndiceDaPergunta] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});

  let conteudoDaPagina;

  if (!questionarioValidado.success) {
    conteudoDaPagina = (
      <Container size="sm" py="xl">
        <Alert color="red" title="Não foi possível carregar o questionário">
          Verifique o arquivo de perguntas e tente novamente.
        </Alert>
      </Container>
    );

    return (
      <>
        <AlternadorDeTema />
        {conteudoDaPagina}
      </>
    );
  }

  const questionario = questionarioValidado.data;
  const perguntas = questionario.dominios.flatMap((dominio) => dominio.perguntas);
  const perguntaAtual = perguntas[indiceDaPergunta];

  function iniciarQuestionario() {
    setRespostas({});
    setIndiceDaPergunta(0);
    setTelaAtual('questionario');
  }

  function registrarResposta(indiceDaOpcao: number) {
    setRespostas((respostasAtuais) => ({
      ...respostasAtuais,
      [perguntaAtual.id]: indiceDaOpcao,
    }));
  }

  function avancarQuestionario() {
    const chegouNaUltimaPergunta = indiceDaPergunta === perguntas.length - 1;

    if (chegouNaUltimaPergunta) {
      setTelaAtual('conclusao');
      return;
    }

    setIndiceDaPergunta((indiceAtual) => indiceAtual + 1);
  }

  function voltarQuestionario() {
    if (indiceDaPergunta === 0) {
      setTelaAtual('inicio');
      return;
    }

    setIndiceDaPergunta((indiceAtual) => indiceAtual - 1);
  }

  if (telaAtual === 'inicio') {
    conteudoDaPagina = <PaginaInicial aoIniciar={iniciarQuestionario} />;
  } else if (telaAtual === 'conclusao') {
    conteudoDaPagina = (
      <PaginaConclusao
        quantidadeDeRespostas={Object.keys(respostas).length}
        aoReiniciar={iniciarQuestionario}
      />
    );
  } else {
    conteudoDaPagina = (
      <PaginaQuestionario
        questionario={questionario}
        indiceDaPergunta={indiceDaPergunta}
        respostaSelecionada={respostas[perguntaAtual.id]}
        aoResponder={registrarResposta}
        aoAvancar={avancarQuestionario}
        aoVoltar={voltarQuestionario}
      />
    );
  }

  return (
    <>
      <AlternadorDeTema />
      {conteudoDaPagina}
    </>
  );
}

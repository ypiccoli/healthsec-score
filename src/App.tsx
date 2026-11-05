import { Alert, Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import dadosDoQuestionario from './data/questionario.json';
import { PaginaInicial } from './pages/PaginaInicial';
import { PaginaPerfil } from './pages/PaginaPerfil';
import { PaginaQuestionario } from './pages/PaginaQuestionario';
import { PaginaRelatorio } from './pages/PaginaRelatorio';
import { PaginaResultado } from './pages/PaginaResultado';
import { questionarioSchema, type Respostas } from './schema/questionario';

type TelaAtual = 'inicio' | 'perfil' | 'questionario' | 'resultado' | 'relatorio';

// Impede que um arquivo de perguntas inválido chegue até as telas.
const questionarioValidado = questionarioSchema.safeParse(dadosDoQuestionario);

export function App() {
  const [telaAtual, setTelaAtual] = useState<TelaAtual>('inicio');
  const [indiceDaPergunta, setIndiceDaPergunta] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [telaAtual, indiceDaPergunta]);

  if (!questionarioValidado.success) {
    return (
      <Container size="sm" py="xl">
        <Alert color="red" title="Não foi possível carregar o questionário">
          Verifique o arquivo de perguntas e tente novamente.
        </Alert>
      </Container>
    );
  }

  const questionario = questionarioValidado.data;
  const perguntas = questionario.dominios.flatMap((dominio) => dominio.perguntas);
  const perguntaAtual = perguntas[indiceDaPergunta];

  function irParaInicio() {
    setTelaAtual('inicio');
  }

  function comecarAvaliacao() {
    setRespostas({});
    setIndiceDaPergunta(0);
    setTelaAtual('perfil');
  }

  function continuarAvaliacaoDemonstrativa() {
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
      setTelaAtual('resultado');
      return;
    }

    setIndiceDaPergunta((indiceAtual) => indiceAtual + 1);
  }

  function voltarQuestionario() {
    if (indiceDaPergunta === 0) {
      setTelaAtual('perfil');
      return;
    }

    setIndiceDaPergunta((indiceAtual) => indiceAtual - 1);
  }

  if (telaAtual === 'inicio') {
    return (
      <PaginaInicial
        aoComecar={comecarAvaliacao}
        aoContinuar={continuarAvaliacaoDemonstrativa}
      />
    );
  }

  if (telaAtual === 'perfil') {
    return <PaginaPerfil aoVoltar={irParaInicio} aoAvancar={() => setTelaAtual('questionario')} />;
  }

  if (telaAtual === 'resultado') {
    return (
      <PaginaResultado
        aoIrParaInicio={irParaInicio}
        aoRevisar={() => {
          setIndiceDaPergunta(0);
          setTelaAtual('questionario');
        }}
        aoVerRelatorio={() => setTelaAtual('relatorio')}
      />
    );
  }

  if (telaAtual === 'relatorio') {
    return (
      <PaginaRelatorio
        aoIrParaInicio={irParaInicio}
        aoVoltarParaResultado={() => setTelaAtual('resultado')}
      />
    );
  }

  return (
    <PaginaQuestionario
      questionario={questionario}
      indiceDaPergunta={indiceDaPergunta}
      respostaSelecionada={respostas[perguntaAtual.id]}
      aoResponder={registrarResposta}
      aoAvancar={avancarQuestionario}
      aoVoltar={voltarQuestionario}
      aoSalvar={irParaInicio}
      aoIrParaInicio={irParaInicio}
    />
  );
}

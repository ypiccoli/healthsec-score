import {
  Alert,
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Progress,
  Radio,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Cabecalho } from '../components/Cabecalho';
import { IconeInformacao } from '../components/Icones';
import type { Questionario } from '../schema/questionario';

interface PaginaQuestionarioProps {
  questionario: Questionario;
  indiceDaPergunta: number;
  respostaSelecionada: number | undefined;
  aoResponder: (indiceDaOpcao: number) => void;
  aoAvancar: () => void;
  aoVoltar: () => void;
  aoSalvar: () => void;
  aoIrParaInicio: () => void;
}

const explicacoesDasPerguntas: Record<string, string> = {
  'backup-01':
    'Um backup só protege a instituição quando a equipe confirma que os arquivos podem ser restaurados.',
  'backup-02':
    'Uma cópia separada reduz o risco de perder todos os dados em um ataque ou falha na rede principal.',
  'acessos-01':
    'O segundo fator dificulta acessos indevidos mesmo quando uma senha é descoberta.',
  'acessos-02':
    'Com login compartilhado não dá para saber quem acessou os dados de um paciente ou rastrear um incidente.',
};

export function PaginaQuestionario({
  questionario,
  indiceDaPergunta,
  respostaSelecionada,
  aoResponder,
  aoAvancar,
  aoVoltar,
  aoSalvar,
  aoIrParaInicio,
}: PaginaQuestionarioProps) {
  const [mostrarErro, setMostrarErro] = useState(false);
  const perguntasComDominio = questionario.dominios.flatMap((dominio, indiceDoDominio) =>
    dominio.perguntas.map((pergunta, indiceNoDominio) => ({
      pergunta,
      dominio,
      indiceDoDominio,
      indiceNoDominio,
    })),
  );
  const itemAtual = perguntasComDominio[indiceDaPergunta];
  const quantidadeDePerguntas = perguntasComDominio.length;
  const progresso = ((indiceDaPergunta + 1) / quantidadeDePerguntas) * 100;
  const ultimaPergunta = indiceDaPergunta === quantidadeDePerguntas - 1;

  useEffect(() => {
    setMostrarErro(false);
  }, [indiceDaPergunta]);

  function tentarAvancar() {
    if (respostaSelecionada === undefined) {
      setMostrarErro(true);
      return;
    }

    aoAvancar();
  }

  function selecionarResposta(indiceDaOpcao: number) {
    setMostrarErro(false);
    aoResponder(indiceDaOpcao);
  }

  let primeiroIndiceDoDominio = 0;

  return (
    <div className="pagina">
      <Cabecalho
        etapaAtual="questionario"
        aoIrParaInicio={aoIrParaInicio}
        aoSalvar={aoSalvar}
      />

      <Container size="xl" py={{ base: 24, sm: 48 }} className="questionario-container">
        <div className="grade-questionario">
          <Paper className="cartao-site painel-dominios" p="lg" radius="md">
            <Text fw={800} size="sm" className="texto-suave" mb="md">
              DOMÍNIOS
            </Text>
            <Stack gap={4}>
              {questionario.dominios.map((dominio) => {
                const ultimoIndiceDoDominio = primeiroIndiceDoDominio + dominio.perguntas.length - 1;
                const concluido = indiceDaPergunta > ultimoIndiceDoDominio;
                const atual =
                  indiceDaPergunta >= primeiroIndiceDoDominio &&
                  indiceDaPergunta <= ultimoIndiceDoDominio;
                const indiceInicial = primeiroIndiceDoDominio;
                primeiroIndiceDoDominio = ultimoIndiceDoDominio + 1;

                return (
                  <div
                    key={dominio.id}
                    className={`item-dominio ${atual ? 'item-dominio-atual' : ''} ${concluido ? 'item-dominio-concluido' : ''}`}
                  >
                    <span className="estado-dominio">{concluido ? '✓' : atual ? '•' : ''}</span>
                    <Text flex={1}>{dominio.nome}</Text>
                    {atual && (
                      <Text size="sm" fw={700}>
                        {indiceDaPergunta - indiceInicial + 1}/{dominio.perguntas.length}
                      </Text>
                    )}
                  </div>
                );
              })}
            </Stack>
            <Divider my="md" />
            <Anchor component="button" type="button" onClick={aoSalvar} c="teal.8">
              Salvar e continuar depois
            </Anchor>
          </Paper>

          <Stack gap="lg">
            <div className="progresso-questionario">
              <Group justify="space-between" mb="xs">
                <Text className="texto-suave">
                  Domínio {itemAtual.indiceDoDominio + 1} de {questionario.dominios.length} ·{' '}
                  {itemAtual.dominio.nome}
                </Text>
                <Text fw={800}>{Math.round(progresso)}%</Text>
              </Group>
              <Progress value={progresso} size="sm" aria-label="Progresso geral" />
            </div>

            <Paper className="cartao-site cartao-pergunta" radius="md">
              <Stack gap="xl">
                <Text c="teal.8" fw={800}>
                  {itemAtual.dominio.nome} · Pergunta {itemAtual.indiceNoDominio + 1} de{' '}
                  {itemAtual.dominio.perguntas.length}
                </Text>
                <Title order={1} className="titulo-principal">
                  {itemAtual.pergunta.texto}
                </Title>

                <Paper className="explicacao-pergunta" p="lg" radius="md">
                  <Group wrap="nowrap" align="flex-start">
                    <IconeInformacao />
                    <Text>
                      <strong>Por que isso importa:</strong>{' '}
                      {explicacoesDasPerguntas[itemAtual.pergunta.id]}
                    </Text>
                  </Group>
                </Paper>

                <Radio.Group
                  label="Resposta"
                  value={respostaSelecionada?.toString() ?? ''}
                  onChange={(valor) => selecionarResposta(Number(valor))}
                >
                  <Stack gap="sm" mt="sm">
                    {itemAtual.pergunta.opcoes.map((opcao, indiceDaOpcao) => (
                      <Paper
                        component="label"
                        key={`${itemAtual.pergunta.id}-${indiceDaOpcao}`}
                        className={`opcao-cartao opcao-resposta ${respostaSelecionada === indiceDaOpcao ? 'opcao-cartao-selecionada' : ''}`}
                      >
                        <Group wrap="nowrap">
                          <Radio value={indiceDaOpcao.toString()} />
                          <Text fw={respostaSelecionada === indiceDaOpcao ? 700 : 500}>
                            {opcao.texto}
                          </Text>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Radio.Group>
              </Stack>
            </Paper>

            <Group justify="space-between" className="acoes-questionario-desktop">
              <Button variant="outline" size="md" onClick={aoVoltar}>
                Anterior
              </Button>
              <Button size="md" onClick={tentarAvancar}>
                {ultimaPergunta ? 'Ver resultado' : 'Próxima pergunta'}
              </Button>
            </Group>

            {mostrarErro && (
              <Alert color="orange" title="Escolha uma resposta para avançar">
                Se não souber a resposta, escolha a opção mais próxima da situação atual.
              </Alert>
            )}
          </Stack>
        </div>
      </Container>

      <div className="espaco-barra-mobile" aria-hidden="true" />

      <div className="barra-acoes-mobile">
        <Button variant="outline" size="md" onClick={aoVoltar}>
          Anterior
        </Button>
        <Button size="md" onClick={tentarAvancar}>
          {ultimaPergunta ? 'Ver resultado' : 'Próxima'}
        </Button>
      </div>
    </div>
  );
}

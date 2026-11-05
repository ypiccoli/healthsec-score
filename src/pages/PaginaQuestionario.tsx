import {
  Button,
  Container,
  Group,
  Paper,
  Progress,
  Radio,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import type { Questionario } from '../schema/questionario';

interface PaginaQuestionarioProps {
  questionario: Questionario;
  indiceDaPergunta: number;
  respostaSelecionada: number | undefined;
  aoResponder: (indiceDaOpcao: number) => void;
  aoAvancar: () => void;
  aoVoltar: () => void;
}

export function PaginaQuestionario({
  questionario,
  indiceDaPergunta,
  respostaSelecionada,
  aoResponder,
  aoAvancar,
  aoVoltar,
}: PaginaQuestionarioProps) {
  // Mantém as perguntas em sequência sem perder o domínio exibido na tela.
  const perguntasComDominio = questionario.dominios.flatMap((dominio) =>
    dominio.perguntas.map((pergunta) => ({ pergunta, nomeDoDominio: dominio.nome })),
  );
  const { pergunta, nomeDoDominio } = perguntasComDominio[indiceDaPergunta];
  const quantidadeDePerguntas = perguntasComDominio.length;
  const progresso = ((indiceDaPergunta + 1) / quantidadeDePerguntas) * 100;
  const ultimaPergunta = indiceDaPergunta === quantidadeDePerguntas - 1;

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <div>
          <Group justify="space-between" mb="xs">
            <Text fw={600}>{nomeDoDominio}</Text>
            <Text c="dimmed" size="sm">
              Pergunta {indiceDaPergunta + 1} de {quantidadeDePerguntas}
            </Text>
          </Group>
          <Progress value={progresso} aria-label="Progresso do questionário" />
        </div>

        <Paper withBorder radius="md" p="xl">
          <Stack gap="lg">
            <Title order={2}>{pergunta.texto}</Title>

            <Radio.Group
              value={respostaSelecionada?.toString() ?? ''}
              onChange={(valor) => aoResponder(Number(valor))}
              aria-label={pergunta.texto}
            >
              <Stack gap="sm">
                {pergunta.opcoes.map((opcao, indiceDaOpcao) => (
                  <Radio
                    key={`${pergunta.id}-${indiceDaOpcao}`}
                    value={indiceDaOpcao.toString()}
                    label={opcao.texto}
                  />
                ))}
              </Stack>
            </Radio.Group>

            <Group justify="space-between">
              <Button variant="default" onClick={aoVoltar}>
                Voltar
              </Button>
              <Button onClick={aoAvancar} disabled={respostaSelecionada === undefined}>
                {ultimaPergunta ? 'Concluir' : 'Próxima'}
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

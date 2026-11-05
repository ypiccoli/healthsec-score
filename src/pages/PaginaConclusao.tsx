import { Button, Container, Paper, Stack, Text, Title } from '@mantine/core';

interface PaginaConclusaoProps {
  quantidadeDeRespostas: number;
  aoReiniciar: () => void;
}

export function PaginaConclusao({ quantidadeDeRespostas, aoReiniciar }: PaginaConclusaoProps) {
  return (
    <Container size="sm" py="xl">
      <Paper withBorder radius="md" p="xl">
        <Stack gap="lg">
          <Title order={1}>Questionário concluído</Title>
          <Text>
            Você respondeu {quantidadeDeRespostas} perguntas. A apresentação do resultado será
            adicionada nas próximas etapas do projeto.
          </Text>
          <Button onClick={aoReiniciar}>Responder novamente</Button>
        </Stack>
      </Paper>
    </Container>
  );
}

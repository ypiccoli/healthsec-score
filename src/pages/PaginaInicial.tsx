import { Button, Container, Paper, Stack, Text, Title } from '@mantine/core';

interface PaginaInicialProps {
  aoIniciar: () => void;
}

export function PaginaInicial({ aoIniciar }: PaginaInicialProps) {
  return (
    <Container size="sm" py="xl">
      <Paper withBorder radius="md" p="xl">
        <Stack gap="lg">
          <div>
            <Text c="blue" fw={700} mb="xs">
              HealthSec Score
            </Text>
            <Title order={1}>Avalie a segurança da sua instituição</Title>
          </div>

          <Text size="lg">
            Responda a um questionário rápido para conhecer os principais pontos de atenção em
            segurança da informação.
          </Text>

          <Text c="dimmed">
            Suas respostas ficam somente neste navegador e não são enviadas para terceiros.
          </Text>

          <Button size="md" onClick={aoIniciar}>
            Iniciar questionário
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

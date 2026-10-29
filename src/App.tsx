import { Container, Title, Text } from '@mantine/core';

// Fluxo previsto: Início -> Dados da instituição -> Questionário -> Resultado -> Relatório PDF.
export function App() {
  return (
    <Container size="sm" py="xl">
      <Title order={1}>HealthSec Score</Title>
      <Text mt="md">
        Diagnóstico inicial de maturidade em segurança da informação para instituições de saúde.
        As respostas ficam apenas no seu navegador.
      </Text>
    </Container>
  );
}

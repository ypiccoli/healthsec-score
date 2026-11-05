import { ActionIcon, Container, Group, Text, useMantineColorScheme } from '@mantine/core';

function IconeDeLua() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconeDeSol() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AlternadorDeTema() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const temaEscuroAtivo = colorScheme === 'dark';

  function alternarTema() {
    setColorScheme(temaEscuroAtivo ? 'light' : 'dark');
  }

  const nomeDaAcao = temaEscuroAtivo ? 'Ativar modo claro' : 'Ativar modo escuro';

  return (
    <Container size="sm" pt="md">
      <Group justify="space-between">
        <Text fw={700}>HealthSec Score</Text>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          aria-label={nomeDaAcao}
          title={nomeDaAcao}
          onClick={alternarTema}
        >
          {temaEscuroAtivo ? <IconeDeSol /> : <IconeDeLua />}
        </ActionIcon>
      </Group>
    </Container>
  );
}

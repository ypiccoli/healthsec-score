import { Button, Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Cabecalho } from '../components/Cabecalho';
import { IconeCadeado } from '../components/Icones';

interface PaginaInicialProps {
  aoComecar: () => void;
  aoContinuar: () => void;
}

const passos = [
  {
    titulo: 'Responda',
    descricao: 'Perguntas simples sobre acessos, backup, rede, LGPD e pessoas.',
  },
  {
    titulo: 'Veja sua nota',
    descricao: 'Nota geral, nota por área e o que corrigir primeiro.',
  },
  {
    titulo: 'Baixe o relatório',
    descricao: 'Leve o resultado para a diretoria em PDF.',
  },
];

export function PaginaInicial({ aoComecar, aoContinuar }: PaginaInicialProps) {
  return (
    <div className="pagina">
      <Cabecalho aoIrParaInicio={() => undefined} />

      <Container size="xl" className="hero-inicio">
        <Stack gap="xl">
          <Stack gap="md">
            <Text className="etiqueta-hero">AUTOAVALIAÇÃO GRATUITA PARA HOSPITAIS</Text>
            <Title order={1} className="titulo-principal titulo-hero">
              Avalie a segurança da informação do seu hospital
            </Title>
            <Text size="xl" className="texto-suave descricao-hero">
              Responda a um questionário guiado e receba uma visão geral das prioridades de
              melhoria para cada área.
            </Text>
            <Group mt="sm">
              <Button size="lg" onClick={aoComecar}>
                Começar avaliação
              </Button>
              <Button size="lg" variant="outline" onClick={aoContinuar}>
                Continuar avaliação salva
              </Button>
            </Group>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" id="como-funciona">
            {passos.map((passo, indice) => (
              <Paper key={passo.titulo} className="cartao-site passo-inicio" p="lg" radius="md">
                <Stack gap="sm">
                  <div className="numero-passo">{indice + 1}</div>
                  <Text fw={800} size="lg">
                    {passo.titulo}
                  </Text>
                  <Text className="texto-suave">{passo.descricao}</Text>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>

          <Paper className="faixa-privacidade" p="lg" radius="md">
            <Group wrap="nowrap" align="flex-start">
              <IconeCadeado />
              <Text>
                <strong>Seus dados ficam com você.</strong> Esta versão demonstra apenas as telas;
                nenhuma informação é enviada para servidor.
              </Text>
            </Group>
          </Paper>

          <Text ta="center" size="sm" className="texto-suave" mt="xl">
            Projeto acadêmico FTEC/UNIFTEC
          </Text>
        </Stack>
      </Container>
    </div>
  );
}

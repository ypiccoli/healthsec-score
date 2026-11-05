import {
  Badge,
  Button,
  Container,
  Group,
  Paper,
  Progress,
  RingProgress,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Cabecalho } from '../components/Cabecalho';
import { resultadoDemonstracao } from '../data/resultadoDemonstracao';

interface PaginaResultadoProps {
  aoRevisar: () => void;
  aoVerRelatorio: () => void;
  aoIrParaInicio: () => void;
}

export function PaginaResultado({
  aoRevisar,
  aoVerRelatorio,
  aoIrParaInicio,
}: PaginaResultadoProps) {
  return (
    <div className="pagina">
      <Cabecalho etapaAtual="resultado" aoIrParaInicio={aoIrParaInicio} />

      <Container size="xl" py={{ base: 32, sm: 52 }}>
        <Stack gap="xl">
          <Paper className="cartao-site" p={{ base: 'lg', sm: 38 }} radius="md">
            <div className="resumo-resultado">
              <Group justify="center">
                <RingProgress
                  size={190}
                  thickness={18}
                  roundCaps
                  sections={[{ value: resultadoDemonstracao.nota, color: 'yellow.7' }]}
                  label={
                    <div>
                      <Text ta="center" fw={900} fz={52} lh={1}>
                        {resultadoDemonstracao.nota}
                      </Text>
                      <Text ta="center" className="texto-suave">
                        de 100
                      </Text>
                    </div>
                  }
                />
              </Group>

              <Stack gap="md">
                <Group>
                  <Title order={1} className="titulo-principal">
                    {resultadoDemonstracao.instituicao}
                  </Title>
                  <span className="faixa-nota">Faixa: {resultadoDemonstracao.faixa}</span>
                </Group>
                <Text size="lg" className="texto-suave">
                  {resultadoDemonstracao.resumo}
                </Text>
                <Group gap="xs">
                  <Badge color="red" variant="light">
                    0-39 Crítico
                  </Badge>
                  <Badge color="orange" variant="light">
                    40-59 Baixo
                  </Badge>
                  <Badge color="yellow" variant="light">
                    60-79 Médio
                  </Badge>
                  <Badge color="green" variant="light">
                    80-100 Alto
                  </Badge>
                </Group>
              </Stack>
            </div>
          </Paper>

          <div className="grade-resultado">
            <Paper className="cartao-site" p="xl" radius="md">
              <Title order={2} mb="lg">
                Nota por domínio
              </Title>
              <Stack gap="lg">
                {resultadoDemonstracao.dominios.map((dominio) => (
                  <div key={dominio.nome} className="linha-dominio">
                    <Group justify="space-between">
                      <Text>{dominio.nome}</Text>
                      <Text fw={800}>
                        {dominio.nota} · {dominio.faixa}
                      </Text>
                    </Group>
                    <Progress value={dominio.nota} color={dominio.cor} size="sm" />
                  </div>
                ))}
              </Stack>
            </Paper>

            <Stack gap="md">
              <Title order={2}>O que fazer primeiro</Title>
              {resultadoDemonstracao.prioridades.map((prioridade, indice) => (
                <Paper key={prioridade.dominio} className="cartao-prioridade" p="lg" radius="md">
                  <Stack gap="xs">
                    <Group gap="sm">
                      <Badge color="dark">{indice + 1}</Badge>
                      <Text fw={700} c="orange.8">
                        {prioridade.dominio}
                      </Text>
                    </Group>
                    <Text fw={800} size="lg">
                      {prioridade.titulo}
                    </Text>
                    <Text className="texto-suave">{prioridade.descricao}</Text>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </div>

          <Group justify="space-between">
            <Button variant="outline" size="md" onClick={aoRevisar}>
              Revisar respostas
            </Button>
            <Button size="md" onClick={aoVerRelatorio}>
              Ver relatório e baixar
            </Button>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}

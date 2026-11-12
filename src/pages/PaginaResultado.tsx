
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
import type { Classificacao, ResultadoScoring } from '../scoring/tipos';

interface PaginaResultadoProps {
  resultado: ResultadoScoring;
  aoRevisar: () => void;
  aoVerRelatorio: () => void;
  aoIrParaInicio: () => void;
}

function obterNomeClassificacao(classificacao: Classificacao): string {
  const nomes: Record<Classificacao, string> = {
    critico: 'Crítico',
    baixo: 'Baixo',
    medio: 'Médio',
    alto: 'Alto',
  };

  return nomes[classificacao];
}

function obterCorClassificacao(classificacao: Classificacao): string {
  const cores: Record<Classificacao, string> = {
    critico: 'red',
    baixo: 'orange',
    medio: 'yellow',
    alto: 'green',
  };

  return cores[classificacao];
}

function obterResumo(classificacao: Classificacao): string {
  const resumos: Record<Classificacao, string> = {
    critico:
      'A avaliação identificou fragilidades importantes. É recomendável priorizar ações corretivas nos controles de segurança.',
    baixo:
      'A instituição possui oportunidades importantes de melhoria. Priorize os controles com maior perda de pontuação.',
    medio:
      'A instituição apresenta um nível intermediário de maturidade. Algumas práticas precisam ser fortalecidas.',
    alto:
      'A instituição apresenta um bom nível de maturidade nos controles avaliados. Mantenha as práticas e revise-as periodicamente.',
  };

  return resumos[classificacao];
}

export function PaginaResultado({
  resultado,
  aoRevisar,
  aoVerRelatorio,
  aoIrParaInicio,
}: PaginaResultadoProps) {
  const corGeral = obterCorClassificacao(resultado.classificacaoGeral);

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
                  sections={[
                    {
                      value: resultado.scoreGeralExibicao,
                      color: `${corGeral}.7`,
                    },
                  ]}
                  label={
                    <div>
                      <Text ta="center" fw={900} fz={52} lh={1}>
                        {resultado.scoreGeralExibicao}
                      </Text>
                      <Text ta="center" className="texto-suave">
                        de 100
                      </Text>
                    </div>
                  }
                />
              </Group>

              <Stack gap="md">
                <Title order={1} className="titulo-principal">
                  Resultado da autoavaliação
                </Title>

                <Group gap="sm">
                  <Text fw={700}>Classificação:</Text>
                  <Badge color={corGeral} size="lg">
                    {obterNomeClassificacao(resultado.classificacaoGeral)}
                  </Badge>
                </Group>

                <Text size="lg" className="texto-suave">
                  {obterResumo(resultado.classificacaoGeral)}
                </Text>

                <Group gap="xs">
                  <Badge color="red" variant="light">
                    0–39 Crítico
                  </Badge>
                  <Badge color="orange" variant="light">
                    40–59 Baixo
                  </Badge>
                  <Badge color="yellow" variant="light">
                    60–79 Médio
                  </Badge>
                  <Badge color="green" variant="light">
                    80–100 Alto
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
                {resultado.dominios.map((dominio) => (
                  <div key={dominio.dominioId} className="linha-dominio">
                    <Group justify="space-between">
                      <Text>{dominio.nome}</Text>
                      <Text fw={800}>
                        {dominio.scoreExibicao} ·{' '}
                        {obterNomeClassificacao(dominio.classificacao)}
                      </Text>
                    </Group>

                    <Progress
                      value={dominio.scoreExibicao}
                      color={obterCorClassificacao(dominio.classificacao)}
                      size="sm"
                    />
                  </div>
                ))}
              </Stack>
            </Paper>

            <Stack gap="md">
              <Title order={2}>O que fazer primeiro</Title>

              {resultado.pontosDeAtencao.length === 0 ? (
                <Paper className="cartao-prioridade" p="lg" radius="md">
                  <Text fw={700} c="green.8">
                    Excelente resultado!
                  </Text>
                  <Text className="texto-suave">
                    Todas as respostas receberam a pontuação máxima. Mantenha
                    os controles e continue revisando as práticas de segurança.
                  </Text>
                </Paper>
              ) : (
                resultado.pontosDeAtencao.map((ponto, indice) => (
                  <Paper
                    key={ponto.perguntaId}
                    className="cartao-prioridade"
                    p="lg"
                    radius="md"
                  >
                    <Stack gap="xs">
                      <Group gap="sm">
                        <Badge color="dark">{indice + 1}</Badge>
                        <Text fw={700} c="orange.8">
                          {ponto.dominioNome}
                        </Text>
                      </Group>

                      <Text fw={800} size="lg">
                        {ponto.pergunta}
                      </Text>

                      <Text className="texto-suave">
                        Recomendação: {ponto.recomendacao}
                      </Text>

                      <Text size="sm" fw={700}>
                        Pontos perdidos: {ponto.pontosPerdidos}
                      </Text>
                    </Stack>
                  </Paper>
                ))
              )}
            </Stack>
          </div>

          <Group justify="space-between">
            <Button variant="outline" size="md" onClick={aoRevisar}>
              Revisar respostas
            </Button>

            <Button size="md" onClick={aoVerRelatorio}>
              Ver relatório
            </Button>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}

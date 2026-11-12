
import {
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Cabecalho } from '../components/Cabecalho';
import type { Classificacao, ResultadoScoring } from '../scoring/tipos';

interface PaginaRelatorioProps {
  resultado: ResultadoScoring;
  aoVoltarParaResultado: () => void;
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

export function PaginaRelatorio({
  resultado,
  aoVoltarParaResultado,
  aoIrParaInicio,
}: PaginaRelatorioProps) {
  const [mensagemDeDemonstracao, setMensagemDeDemonstracao] = useState('');

  function demonstrarAcao(acao: string) {
    setMensagemDeDemonstracao(
      `${acao} será implementado em uma próxima etapa do projeto.`,
    );
  }

  return (
    <div className="pagina">
      <Cabecalho
        aoIrParaInicio={aoIrParaInicio}
        aoVoltarParaResultado={aoVoltarParaResultado}
      />

      <Container size="xl" py={{ base: 24, sm: 52 }} className="relatorio-container">
        <div className="grade-relatorio">
          <Paper className="cartao-site folha-relatorio" radius="md">
            <Stack gap="xl">
              <Group
                justify="space-between"
                align="flex-start"
                className="cabecalho-do-relatorio"
              >
                <div>
                  <Text className="etiqueta-hero">
                    RELATÓRIO DE AUTOAVALIAÇÃO
                  </Text>
                  <Title order={1} mt="xs" className="titulo-principal">
                    Resultado da avaliação
                  </Title>
                </div>

                <Text ta="right" className="texto-suave detalhes-relatorio">
                  Avaliação de segurança da informação
                </Text>
              </Group>

              <Divider size="md" color="dark" />

              <Group align="center" className="resumo-relatorio">
                <Text fw={900} fz={64} lh={1}>
                  {resultado.scoreGeralExibicao}
                  <Text component="span" fz={28} className="texto-suave">
                    /100
                  </Text>
                </Text>

                <Badge
                  color={obterCorClassificacao(resultado.classificacaoGeral)}
                  size="lg"
                >
                  {obterNomeClassificacao(resultado.classificacaoGeral)}
                </Badge>
              </Group>

              <div>
                <Title order={2} mb="md">
                  Resultado por domínio
                </Title>

                <Table.ScrollContainer
                  minWidth={520}
                  className="tabela-relatorio-desktop"
                >
                  <Table verticalSpacing="sm" horizontalSpacing="sm">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Domínio</Table.Th>
                        <Table.Th>Nota</Table.Th>
                        <Table.Th>Classificação</Table.Th>
                      </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                      {resultado.dominios.map((dominio) => (
                        <Table.Tr key={dominio.dominioId}>
                          <Table.Td>{dominio.nome}</Table.Td>
                          <Table.Td>{dominio.scoreExibicao}/100</Table.Td>
                          <Table.Td>
                            {obterNomeClassificacao(dominio.classificacao)}
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Table.ScrollContainer>

                <Stack gap="xs" className="lista-dominios-mobile">
                  {resultado.dominios.map((dominio) => (
                    <Paper
                      key={dominio.dominioId}
                      className="dominio-relatorio-mobile"
                      p="md"
                    >
                      <div>
                        <Text fw={700}>{dominio.nome}</Text>
                        <Text size="sm" className="texto-suave">
                          {obterNomeClassificacao(dominio.classificacao)}
                        </Text>
                      </div>

                      <Text fw={900} fz="xl" c="teal.7">
                        {dominio.scoreExibicao}
                      </Text>
                    </Paper>
                  ))}
                </Stack>
              </div>

              <div>
                <Title order={2} mb="md">
                  Recomendações e pontos de atenção
                </Title>

                {resultado.pontosDeAtencao.length === 0 ? (
                  <Paper className="explicacao-pergunta" p="md">
                    <Text fw={700} c="green.8">
                      Todas as respostas atingiram a pontuação máxima.
                    </Text>
                    <Text className="texto-suave">
                      Recomenda-se manter os controles existentes e realizar
                      revisões periódicas.
                    </Text>
                  </Paper>
                ) : (
                  <Stack gap="sm">
                    {resultado.pontosDeAtencao.map((ponto, indice) => (
                      <Paper
                        key={ponto.perguntaId}
                        className="explicacao-pergunta"
                        p="md"
                      >
                        <Stack gap="xs">
                          <Text fw={700}>
                            {indice + 1}. {ponto.dominioNome}
                          </Text>

                          <Text>{ponto.pergunta}</Text>

                          <Text className="texto-suave">
                            Recomendação: {ponto.recomendacao}
                          </Text>

                          <Text size="sm" fw={700}>
                            Pontos perdidos: {ponto.pontosPerdidos}
                          </Text>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </div>

              <Divider />

              <Text size="sm" className="texto-suave">
                Autoavaliação informativa. Não substitui auditoria ou consultoria
                especializada.
              </Text>
            </Stack>
          </Paper>

          <Stack gap="lg">
            <Paper className="cartao-site" p="xl" radius="md">
              <Title order={2} mb="md">
                Baixar
              </Title>

              <Stack>
                <Button
                  size="md"
                  onClick={() => demonstrarAcao('O relatório em PDF')}
                >
                  Baixar relatório em PDF
                </Button>

                <Button
                  size="md"
                  variant="outline"
                  onClick={() => demonstrarAcao('O arquivo de respostas')}
                >
                  Baixar respostas (.json)
                </Button>

                <Text className="texto-suave">
                  Os botões demonstram a interface; nenhum arquivo é gerado
                  nesta etapa.
                </Text>
              </Stack>
            </Paper>

            <Paper className="painel-consultoria" p="xl" radius="md">
              <Stack gap="md">
                <Title order={2} c="white">
                  Quer ajuda para melhorar a nota?
                </Title>

                <Text c="gray.2">
                  Este espaço poderá apresentar o contato da consultoria
                  responsável pelas recomendações.
                </Text>

                <Button
                  color="gray"
                  variant="white"
                  onClick={() => demonstrarAcao('O contato')}
                >
                  Falar com a consultoria
                </Button>
              </Stack>
            </Paper>

            <Paper className="faixa-privacidade" p="lg" radius="md">
              <Text>
                Nenhuma resposta é enviada para servidor nesta demonstração.
              </Text>
            </Paper>

            {mensagemDeDemonstracao && (
              <Text className="aviso-demonstracao">
                {mensagemDeDemonstracao}
              </Text>
            )}
          </Stack>
        </div>
      </Container>
    </div>
  );
}


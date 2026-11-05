import {
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
import { resultadoDemonstracao } from '../data/resultadoDemonstracao';

interface PaginaRelatorioProps {
  aoVoltarParaResultado: () => void;
  aoIrParaInicio: () => void;
}

export function PaginaRelatorio({
  aoVoltarParaResultado,
  aoIrParaInicio,
}: PaginaRelatorioProps) {
  const [mensagemDeDemonstracao, setMensagemDeDemonstracao] = useState('');

  function demonstrarAcao(acao: string) {
    setMensagemDeDemonstracao(`${acao} será implementado em uma próxima etapa do projeto.`);
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
              <Group justify="space-between" align="flex-start" className="cabecalho-do-relatorio">
                <div>
                  <Text className="etiqueta-hero">RELATÓRIO DE AUTOAVALIAÇÃO</Text>
                  <Title order={1} mt="xs" className="titulo-principal">
                    {resultadoDemonstracao.instituicao}
                  </Title>
                </div>
                <Text ta="right" className="texto-suave detalhes-relatorio">
                  Data: demonstração
                  <br />
                  Porte: Médio · TI terceirizada
                </Text>
              </Group>

              <Divider size="md" color="dark" />

              <Group align="center" className="resumo-relatorio">
                <Text fw={900} fz={64} lh={1}>
                  {resultadoDemonstracao.nota}
                  <Text component="span" fz={28} className="texto-suave">
                    /100
                  </Text>
                </Text>
                <span className="faixa-nota">Faixa: {resultadoDemonstracao.faixa}</span>
              </Group>

              <Table.ScrollContainer minWidth={520} className="tabela-relatorio-desktop">
                <Table verticalSpacing="sm" horizontalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Domínio</Table.Th>
                      <Table.Th>Nota</Table.Th>
                      <Table.Th>Faixa</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {resultadoDemonstracao.dominios.map((dominio) => (
                      <Table.Tr key={dominio.nome}>
                        <Table.Td>{dominio.nome}</Table.Td>
                        <Table.Td>{dominio.nota}</Table.Td>
                        <Table.Td>{dominio.faixa}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>

              <Stack gap="xs" className="lista-dominios-mobile">
                {resultadoDemonstracao.dominios.map((dominio) => (
                  <Paper key={dominio.nome} className="dominio-relatorio-mobile" p="md">
                    <div>
                      <Text fw={700}>{dominio.nome}</Text>
                      <Text size="sm" className="texto-suave">
                        {dominio.faixa}
                      </Text>
                    </div>
                    <Text fw={900} fz="xl" c="teal.7">
                      {dominio.nota}
                    </Text>
                  </Paper>
                ))}
              </Stack>

              <div>
                <Title order={2} mb="md">
                  Recomendações
                </Title>
                <Stack gap="sm">
                  {resultadoDemonstracao.prioridades.map((prioridade, indice) => (
                    <Paper key={prioridade.dominio} className="explicacao-pergunta" p="md">
                      <Text>
                        <strong>
                          {indice + 1}. {prioridade.dominio}.
                        </strong>{' '}
                        {prioridade.titulo}.{' '}
                        <span className="texto-suave">Referência demonstrativa.</span>
                      </Text>
                    </Paper>
                  ))}
                </Stack>
              </div>

              <Divider />
              <Text size="sm" className="texto-suave">
                Autoavaliação informativa. Não substitui auditoria ou consultoria especializada.
              </Text>
            </Stack>
          </Paper>

          <Stack gap="lg">
            <Paper className="cartao-site" p="xl" radius="md">
              <Title order={2} mb="md">
                Baixar
              </Title>
              <Stack>
                <Button size="md" onClick={() => demonstrarAcao('O relatório em PDF')}>
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
                  Os botões demonstram a interface; nenhum arquivo é gerado nesta etapa.
                </Text>
              </Stack>
            </Paper>

            <Paper className="painel-consultoria" p="xl" radius="md">
              <Stack gap="md">
                <Title order={2} c="white">
                  Quer ajuda para melhorar a nota?
                </Title>
                <Text c="gray.2">
                  Este espaço poderá apresentar o contato da consultoria responsável pelas
                  recomendações.
                </Text>
                <Button color="gray" variant="white" onClick={() => demonstrarAcao('O contato')}>
                  Falar com a consultoria
                </Button>
              </Stack>
            </Paper>

            <Paper className="faixa-privacidade" p="lg" radius="md">
              <Text>Nenhuma resposta é enviada para servidor nesta demonstração.</Text>
            </Paper>

            {mensagemDeDemonstracao && (
              <Text className="aviso-demonstracao">{mensagemDeDemonstracao}</Text>
            )}
          </Stack>
        </div>
      </Container>
    </div>
  );
}

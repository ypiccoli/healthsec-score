import { Anchor, Box, Container, Group, Text, UnstyledButton } from '@mantine/core';
import { AlternadorDeTema } from './AlternadorDeTema';
import { IconeEscudo } from './Icones';

type EtapaDoFluxo = 'perfil' | 'questionario' | 'resultado';

interface CabecalhoProps {
  etapaAtual?: EtapaDoFluxo;
  aoIrParaInicio: () => void;
  aoVoltarParaResultado?: () => void;
  aoSalvar?: () => void;
}

const etapas: Array<{ id: EtapaDoFluxo; rotulo: string }> = [
  { id: 'perfil', rotulo: 'Perfil' },
  { id: 'questionario', rotulo: 'Questionário' },
  { id: 'resultado', rotulo: 'Resultado' },
];

export function Cabecalho({
  etapaAtual,
  aoIrParaInicio,
  aoVoltarParaResultado,
  aoSalvar,
}: CabecalhoProps) {
  const indiceAtual = etapaAtual ? etapas.findIndex((etapa) => etapa.id === etapaAtual) : -1;

  return (
    <Box component="header" className="cabecalho-site">
      <Container
        size="xl"
        className={`cabecalho-conteudo ${aoVoltarParaResultado ? 'cabecalho-relatorio' : ''}`}
      >
        <UnstyledButton className="marca-site" onClick={aoIrParaInicio} aria-label="Ir para o início">
          <IconeEscudo />
          <Text fw={800} size="xl">
            HealthSec Score
          </Text>
        </UnstyledButton>

        <Group gap="md" wrap="nowrap">
          {etapaAtual && (
            <Group gap="xs" className="etapas-desktop" wrap="nowrap">
              {etapas.map((etapa, indice) => {
                const concluida = indice < indiceAtual;
                const atual = indice === indiceAtual;

                return (
                  <Text
                    key={etapa.id}
                    className={`etapa-fluxo ${atual ? 'etapa-atual' : ''} ${concluida ? 'etapa-concluida' : ''}`}
                  >
                    {indice + 1} {etapa.rotulo} {concluida ? '✓' : ''}
                  </Text>
                );
              })}
            </Group>
          )}

          {!etapaAtual && !aoVoltarParaResultado && (
            <Anchor href="#como-funciona" c="teal.8" className="link-cabecalho">
              Como funciona
            </Anchor>
          )}

          {aoVoltarParaResultado && (
            <Anchor
              component="button"
              type="button"
              onClick={aoVoltarParaResultado}
              c="teal.8"
              className="voltar-resultado"
            >
              <span className="voltar-texto-desktop">Voltar ao resultado</span>
              <span className="voltar-texto-mobile">Voltar</span>
            </Anchor>
          )}

          {aoSalvar && (
            <Anchor
              component="button"
              type="button"
              onClick={aoSalvar}
              c="teal.8"
              className="salvar-mobile"
            >
              Salvar
            </Anchor>
          )}

          <AlternadorDeTema />
        </Group>
      </Container>
    </Box>
  );
}

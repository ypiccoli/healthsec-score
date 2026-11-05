import {
  Button,
  Container,
  Group,
  Paper,
  Radio,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Cabecalho } from '../components/Cabecalho';

interface PaginaPerfilProps {
  aoVoltar: () => void;
  aoAvancar: () => void;
}

interface GrupoDeOpcoesProps {
  titulo: string;
  opcoes: string[];
  valor: string;
  aoMudar: (valor: string) => void;
}

function GrupoDeOpcoes({ titulo, opcoes, valor, aoMudar }: GrupoDeOpcoesProps) {
  return (
    <Radio.Group label={titulo} value={valor} onChange={aoMudar}>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mt="xs">
        {opcoes.map((opcao) => (
          <Paper
            component="label"
            key={opcao}
            className={`opcao-cartao ${valor === opcao ? 'opcao-cartao-selecionada' : ''}`}
          >
            <Group wrap="nowrap">
              <Radio value={opcao} />
              <Text fw={valor === opcao ? 700 : 500}>{opcao}</Text>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </Radio.Group>
  );
}

export function PaginaPerfil({ aoVoltar, aoAvancar }: PaginaPerfilProps) {
  const [nomeDaInstituicao, setNomeDaInstituicao] = useState('Hospital São Exemplo');
  const [porte, setPorte] = useState('Médio');
  const [responsavelPelaTi, setResponsavelPelaTi] = useState('Empresa terceirizada');
  const [usoDeProntuario, setUsoDeProntuario] = useState('Sim');

  return (
    <div className="pagina">
      <Cabecalho etapaAtual="perfil" aoIrParaInicio={aoVoltar} />

      <Container size="md" py={56}>
        <Stack gap="xl">
          <div>
            <Title order={1} className="titulo-principal">
              Conte um pouco sobre o hospital
            </Title>
            <Text size="lg" className="texto-suave" mt="xs">
              Isso ajuda a apresentar o protótipo de acordo com o porte. Leva menos de um minuto.
            </Text>
          </div>

          <Paper className="cartao-site formulario-perfil" radius="md">
            <Stack gap="xl">
              <TextInput
                label="Nome da instituição"
                description="Opcional, aparece apenas na demonstração do relatório"
                size="md"
                value={nomeDaInstituicao}
                onChange={(evento) => setNomeDaInstituicao(evento.currentTarget.value)}
              />

              <GrupoDeOpcoes
                titulo="Porte do hospital"
                opcoes={['Pequeno', 'Médio', 'Grande']}
                valor={porte}
                aoMudar={setPorte}
              />
              <GrupoDeOpcoes
                titulo="Quem cuida da TI?"
                opcoes={['Equipe própria', 'Empresa terceirizada', 'Não temos']}
                valor={responsavelPelaTi}
                aoMudar={setResponsavelPelaTi}
              />
              <GrupoDeOpcoes
                titulo="Usa prontuário eletrônico?"
                opcoes={['Sim', 'Parcialmente', 'Não']}
                valor={usoDeProntuario}
                aoMudar={setUsoDeProntuario}
              />
            </Stack>
          </Paper>

          <Group justify="space-between">
            <Button variant="outline" size="md" onClick={aoVoltar}>
              Voltar
            </Button>
            <Button size="md" onClick={aoAvancar}>
              Ir para o questionário
            </Button>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}

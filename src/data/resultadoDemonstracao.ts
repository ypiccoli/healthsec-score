export const resultadoDemonstracao = {
  instituicao: 'Hospital São Exemplo',
  nota: 62,
  faixa: 'Médio',
  resumo:
    'O hospital tem uma base razoável, mas três áreas estão abaixo de 60 e concentram o maior risco. Comece pelas prioridades abaixo.',
  dominios: [
    { nome: 'Governança e LGPD', nota: 80, faixa: 'Alto', cor: 'green' },
    { nome: 'Rede e dispositivos', nota: 75, faixa: 'Médio', cor: 'yellow' },
    { nome: 'Backup e continuidade', nota: 60, faixa: 'Médio', cor: 'yellow' },
    { nome: 'Controle de acesso', nota: 55, faixa: 'Baixo', cor: 'orange' },
    { nome: 'Resposta a incidentes', nota: 52, faixa: 'Baixo', cor: 'orange' },
    { nome: 'Conscientização', nota: 50, faixa: 'Baixo', cor: 'orange' },
  ],
  prioridades: [
    {
      dominio: 'Conscientização',
      titulo: 'Treinar a equipe para reconhecer e-mails falsos',
      descricao: 'Uma conversa curta por setor já reduz o risco de alguém clicar em link malicioso.',
    },
    {
      dominio: 'Resposta a incidentes',
      titulo: 'Definir quem chamar quando algo der errado',
      descricao: 'Uma lista de contatos e passos básicos, impressa e conhecida pela equipe.',
    },
    {
      dominio: 'Controle de acesso',
      titulo: 'Acabar com logins compartilhados no prontuário',
      descricao: 'Cada pessoa com o seu usuário permite saber quem acessou o quê.',
    },
  ],
} as const;

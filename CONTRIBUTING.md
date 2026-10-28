# Como contribuir

Regra principal: ninguém mexe direto na versão publicada. Toda mudança passa por um pull request (PR) que outra pessoa aprova. A `main` é protegida, e o GitHub recusa push direto nela.

## Antes de tudo

1. Instale o [VS Code](https://code.visualstudio.com), o [Git](https://git-scm.com) e o [Node.js 24 LTS](https://nodejs.org).
2. Aceite o convite do repositório no e-mail ou em github.com/notifications.
3. Configure seu nome no Git:
   ```bash
   git config --global user.name "Seu Nome"
   git config --global user.email "seu-email-do-github"
   ```
   O repositório é público. Se não quiser expor seu e-mail, use o endereço `noreply` que aparece em GitHub → Settings → Emails.
4. Clone o repositório:
   ```bash
   git clone https://github.com/ypiccoli/healthsec-score.git
   cd healthsec-score
   npm install
   ```

## O passo a passo de cada tarefa

1. **Pegue uma tarefa no quadro** (GitHub Projects) e mova para "Fazendo".
2. **Atualize a main e crie uma branch** com seu nome e a tarefa:
   ```bash
   git switch main
   git pull
   git switch -c thalia/tela-questionario
   ```
3. **Faça commits pequenos**, dizendo o que mudou:
   ```bash
   git add .
   git commit -m "Adiciona barra de progresso no questionário"
   ```
4. **Rode as verificações** antes de enviar: `npm run lint`, `npm run test` e `npm run build`.
5. **Envie e abra o PR:**
   ```bash
   git push -u origin thalia/tela-questionario
   ```
   O GitHub mostra um link para abrir o PR. Preencha o template e marque quem revisa:
   - **Gabriel:** código.
   - **Ygor:** segurança, publicação e conteúdo do questionário.
6. **Revisão.** Responda aos comentários com novos commits na mesma branch.
7. **Merge.** Com aprovação e verificações verdes, faça o merge (squash). O site atualiza sozinho.

## Travou?

Travou por mais de 30 minutos, pergunte no grupo. Pergunta de código vai para o Gabriel. Pergunta de segurança ou publicação vai para o Ygor.

## IA como apoio

Pode usar Claude, Codex ou ChatGPT para explicar um erro, um conceito ou um trecho de código. As regras que o agente deve seguir estão no [AGENTS.md](AGENTS.md). Dois cuidados:

- **Entenda o que vai no seu PR.** Se não souber explicar um trecho gerado, não envie.
- **Nunca cole senhas, chaves ou dados de alguém** na conversa com a IA.

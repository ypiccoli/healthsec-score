# Segurança da aplicação

Responsável: **Ygor** (infra, DevSecOps e segurança).

O MVP não tem servidor, banco nem login ([ADR 0002](adr/0002-sem-backend.md)). Os riscos que sobram são:

1. **XSS**: conteúdo malicioso executando no navegador, por exemplo via arquivo de respostas adulterado.
2. **Cadeia de dependências**: pacote npm comprometido ou vulnerável.
3. **Vazamento de segredo** no repositório, que é público.

## Controles

| Controle | Onde | O que faz |
|---|---|---|
| Proteção da `main` | Ruleset do GitHub | Exige PR com aprovação e verificações verdes. Bloqueia push direto e force push. |
| Gitleaks | `.github/workflows/security.yml` | Procura segredos em todo o histórico, a cada PR e push. |
| Secret scanning + push protection | Configuração do repo | O GitHub bloqueia o push que contém um token conhecido. |
| Semgrep | `.github/workflows/security.yml` | Análise estática (regras de JS/TS e React). Resultados na aba Security. |
| Dependabot | `.github/dependabot.yml` | Alerta e abre PR para dependências vulneráveis ou desatualizadas. |
| CSP e cabeçalhos | `public/_headers` | Restringem o que o navegador carrega e executa. |
| Validação com Zod | `src/questionario/`, `src/respostas/` | Rejeita JSON fora do formato antes de usar. |
| Regras de código | `AGENTS.md` | Proíbem `dangerouslySetInnerHTML`, `eval`, script inline e chamada de rede. |

## Cabeçalhos HTTP (`public/_headers`)

O Cloudflare Pages lê esse arquivo e aplica os cabeçalhos em todas as páginas.

| Cabeçalho | Valor | Por quê |
|---|---|---|
| `Content-Security-Policy` | `default-src 'self'`, `script-src 'self'`, `style-src 'self' 'unsafe-inline'`, `img-src 'self' data: blob:`, `connect-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'` | Só carrega o que vem do próprio site. Bloqueia script injetado e o uso do site dentro de iframe. |
| `X-Content-Type-Options` | `nosniff` | O navegador não "adivinha" o tipo de arquivo. |
| `Referrer-Policy` | `no-referrer` | Não vaza a URL para outros sites. |
| `Permissions-Policy` | câmera, microfone, geolocalização etc. desligados | O site não precisa desses recursos. |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isola a janela de outras origens. |

**Sobre `style-src 'unsafe-inline'`:** o Mantine e o Recharts aplicam estilos por atributo `style`. Liberar estilo inline é um risco baixo, já que scripts continuam bloqueados. Revisar se a stack mudar.

**Para não quebrar a CSP:**

- não use o `ColorSchemeScript` do Mantine (é script inline);
- não ative o Web Analytics do Cloudflare, que injeta script de terceiros e contradiz o escopo de não coletar dados;
- não carregue fonte ou biblioteca de CDN. Instale pelo npm.

## Checklist de revisão de segurança (PR)

- [ ] Nenhum segredo, token ou dado real (inclusive em teste e exemplo).
- [ ] Nenhuma chamada de rede nova (`fetch`, `axios`, `<script src>` externo).
- [ ] Nada de `dangerouslySetInnerHTML`, `eval` ou HTML montado com string.
- [ ] Dado vindo do usuário (arquivo de respostas) validado com Zod.
- [ ] Dependência nova tem ADR.
- [ ] `public/_headers` não foi afrouxado sem justificativa.

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
| Publicação controlada | Job `deploy` no `ci.yml` | Só publica a partir da `main` e depois do CI passar, sem token. |
| Gitleaks | `.github/workflows/security.yml` | Procura segredos em todo o histórico, a cada PR e push. |
| Secret scanning + push protection | Configuração do repo | O GitHub bloqueia o push que contém um token conhecido. |
| Semgrep | `.github/workflows/security.yml` | Análise estática (regras de JS/TS e React). Resultados na aba Security. |
| Dependabot | `.github/dependabot.yml` | Alerta e abre PR para dependências vulneráveis ou desatualizadas. |
| CSP | `<meta>` no `index.html` | Restringe o que o navegador carrega e executa. |
| Validação com Zod | `src/questionario/`, `src/respostas/` | Rejeita JSON fora do formato antes de usar. |
| Regras de código | `AGENTS.md` | Proíbem `dangerouslySetInnerHTML`, `eval`, script inline e chamada de rede. |

## CSP e cabeçalhos

O GitHub Pages não deixa configurar cabeçalhos HTTP ([ADR 0003](adr/0003-github-pages.md)). A proteção vai em `<meta>` dentro do `<head>` do `index.html`. Cole este bloco logo depois da `<meta charset>`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
/>
<meta name="referrer" content="no-referrer" />
```

O CI confere que a CSP está no `dist/index.html` e falha se alguém remover.

| Diretiva | Por quê |
|---|---|
| `default-src 'self'`, `script-src 'self'` | Só carrega e executa o que vem do próprio site. Script injetado não roda. |
| `style-src 'self' 'unsafe-inline'` | O Mantine e o Recharts aplicam estilos por atributo `style`. O risco é baixo, porque scripts continuam bloqueados. |
| `img-src 'self' data: blob:` | Ícones embutidos e gráficos exportados. |
| `connect-src 'self'` | Nenhuma chamada de rede para fora. |
| `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` | Fecham caminhos comuns de injeção. |
| `referrer: no-referrer` | Não vaza a URL para outros sites. |

**O que fica de fora, e por quê:** `frame-ancestors`/`X-Frame-Options` (proteção contra iframe), `Permissions-Policy` e `Cross-Origin-Opener-Policy` só funcionam como cabeçalho HTTP. O site pode ser embutido em iframe de outro domínio. Esse risco foi aceito porque o site não tem login nem ação sensível. HTTPS e HSTS já vêm do `github.io`.

**Para não quebrar a CSP:**

- não use o `ColorSchemeScript` do Mantine (é script inline);
- não adicione analytics nem script de terceiros, o que também contradiz o escopo de não coletar dados;
- não carregue fonte ou biblioteca de CDN. Instale pelo npm.

## Checklist de revisão de segurança (PR)

- [ ] Nenhum segredo, token ou dado real (inclusive em teste e exemplo).
- [ ] Nenhuma chamada de rede nova (`fetch`, `axios`, `<script src>` externo).
- [ ] Nada de `dangerouslySetInnerHTML`, `eval` ou HTML montado com string.
- [ ] Dado vindo do usuário (arquivo de respostas) validado com Zod.
- [ ] Dependência nova tem ADR.
- [ ] A CSP do `index.html` não foi afrouxada sem justificativa.

# Aulas de automação WEB com Playwright

Projeto para ensinar automação WEB com Playwright e JavaScript. Aplicação utilizada nas aulas: https://projeto-entra21.web.app/.

A estrutura inclui Page Objects, relatórios e execução no GitHub Actions.

Material da turma: [roteiro de aulas passo a passo](docs/roteiro-aulas-playwright.md) e [mapeamento dos cenários de teste](docs/mapeamento-testes-web.md).

## Instalação

Use Node.js 24 LTS ou uma versão compatível com o Playwright instalado.

```powershell
npm ci
npm run browsers:install
```

## Executar

```powershell
npm test                 # Chromium, Firefox e WebKit
npm run test:chromium    # Apenas Chromium
npm run test:ui          # Interface interativa do Playwright
npm run test:headed      # Navegadores visíveis
npm run test:debug       # Depuração
npm run test:smoke       # Testes marcados com @smoke
npm run typecheck       # Verificação de tipos
npm run report          # Último relatório HTML
```

O arquivo `Helpers/environment.js` define a URL das aulas e acompanha o projeto no repositório. Não é necessário criar `.env` para começar:

```javascript
export const BASE_URL = process.env.BASE_URL || 'https://projeto-entra21.web.app/';
```

O `playwright.config.js` importa essa variável. Nos testes WEB, use `await page.goto('/')` para acessar a aplicação sem repetir a URL. Opcionalmente, defina `BASE_URL` no terminal, no CI ou em `.env` para sobrescrever a URL padrão.


## Organização

```text
.github/workflows/      Execução contínua no GitHub Actions
.vscode/                Extensão recomendada
Helpers/                URL e configuração compartilhada das aulas
page/
  Login/                LoginPage: constructor, ações e validações
tests/
  Login/                Testes WEB que instanciam LoginPage
  e2e/                  Cenários de interface
  fixtures/             Objetos reutilizáveis por teste
.env.example            Modelo de variáveis de ambiente
playwright.config.js    Navegadores, timeouts e evidências
jsconfig.json           Configuração do JavaScript
```

## Criar os testes WEB das aulas

1. Confira a URL em `Helpers/environment.js`; ela já está configurada para as aulas.
2. Crie a classe da tela em `page/NomeDaTela/NomePage.js`, recebendo `page` no `constructor` e definindo os localizadores com `this`.
3. Adicione métodos de ação (`open`, `fillCredentials`, `submit`) e validação (`expectReady`) na classe.
4. Crie os cenários em `tests/NomeDaTela`, importe `test` de `@playwright/test` e instancie a classe dentro de cada teste.

Exemplo utilizado em `tests/Login/login.spec.js`:

```javascript
import { test } from '@playwright/test';
import { LoginPage } from '../../page/Login/LoginPage.js';

test('exibe a tela de acesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.expectReady();
});
```

Os testes coordenam o cenário; os Page Objects concentram os localizadores, ações e validações da tela. A fixture personalizada existente é opcional; os exemplos das aulas usam o construtor diretamente.

Os testes em `tests/Login` validam a tela WEB e o preenchimento sem enviar o formul?rio. A autentica??o e os fluxos ap?s o login ainda precisam de cen?rios pr?prios.

Para gerar ações iniciais com o gravador:

```powershell
npm run codegen -- https://projeto-entra21.web.app/
```

Prefira localizadores por papel, rótulo e identificador de teste. Use asserções do Playwright para aguardar estados; evite pausas fixas. Cada teste deve criar ou preparar seus próprios dados.

## Execução no GitHub Actions

O workflow `.github/workflows/playwright.yml` executa automaticamente a cada `push` e `pull_request`, em qualquer branch. Também pode ser iniciado pela aba **Actions → Testes WEB - Playwright → Run workflow** no GitHub.

Agendamento no horário de São Paulo: segunda-feira às **06:00** executa Chromium, Firefox e WebKit; de terça a sexta-feira às **06:00** executa somente Chromium. Não há agendamento aos sábados e domingos. Os crons são `0 9 * * 1` e `0 9 * * 2-5` em UTC. O arquivo precisa estar na branch padrão do repositório para o agendamento funcionar; o GitHub pode iniciar execuções agendadas com atraso.

A execução usa Ubuntu e Node.js 24. Instala as dependências com `npm ci` e somente os navegadores da execução, verifica JavaScript/JSDoc e executa `npm test` ou `npm run test:chromium`. Push, pull request e execução manual continuam usando os três navegadores. No CI, cada teste que falhar pode ser repetido até duas vezes. Uma nova execução na mesma referência cancela a anterior em andamento.

A URL das aulas está configurada no workflow; não é necessário enviar `.env` nem configurar secrets para os testes atuais. As contas de aula continuam disponíveis em `Helpers/environment.js`.

Para ativar, envie o projeto para um repositório no GitHub incluindo `.github/workflows/playwright.yml`, `package.json` e `package-lock.json`. As execuções aparecerão na aba **Actions**. Esta configuração local não cria nem publica o repositório.

Ao finalizar, baixe **playwright-results** na seção **Artifacts** da execução. O pacote contém o relatório HTML, o JUnit e as evidências das falhas, quando existirem, e fica disponível por 14 dias. Para abrir o relatório extraído, execute `npx playwright show-report caminho/para/playwright-report`.

Somente os cenários já implementados são executados. Os 96 cenários do mapeamento são um plano de cobertura; os exemplos locais de rotas e API ficam ignorados ao usar o site das aulas.

## Evidências e segurança

O relatório HTML fica em `playwright-report/`, e o JUnit em `test-results/junit.xml`. Falhas preservam screenshots, vídeos e traces. Esses arquivos podem conter dados da aplicação: controle o acesso aos artefatos no CI.

Não versione `.env`, credenciais ou sessões autenticadas. Use secrets do GitHub Actions para configurações privadas. O workflow instala os navegadores selecionados e publica as evidências por 14 dias.

Documentação oficial: [Playwright](https://playwright.dev/docs/intro).

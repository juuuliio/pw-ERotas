# Roteiro de aulas — automação WEB com Playwright

Este roteiro orienta a demonstração do instrutor e a prática da turma, desde baixar o projeto até revisar e aprovar um pull request no GitHub. O projeto usa JavaScript, Page Objects e GitHub Actions.

Aplicação das aulas: https://projeto-entra21.web.app/.

## 1. O que a turma vai aprender

Ao final, cada participante deverá conseguir:

- Clonar um repositório, instalar dependências e trabalhar em uma branch.
- Explorar o site e transformar comportamentos em cenários com resultado esperado.
- Identificar elementos com DevTools, Playwright Inspector e Codegen.
- Criar uma classe de página com `constructor`, localizadores, ações e validações.
- Escrever e executar testes `.spec.js`, analisar falhas e consultar relatórios.
- Enviar alterações ao GitHub, abrir pull request, solicitar revisão e corrigir comentários.
- Diferenciar teste aprovado na execução, aprovação do revisor e autorização para merge.

Sugestão de divisão: quatro encontros de aproximadamente duas horas. Ajuste o tempo à experiência da turma.

| Encontro | Conteúdo | Entrega prática |
| --- | --- | --- |
| 1 | GitHub, instalação, demonstração do site e leitura do projeto | Executar os testes existentes |
| 2 | Elementos, localizadores, Inspector e Page Objects | Identificar elementos e organizar a página |
| 3 | Criar cenários, executar e investigar falhas | Implementar um cenário com asserção |
| 4 | Commit, pull request, CI, revisão e aprovação | PR revisado com testes aprovados |

## 2. Preparação do instrutor

1. Publicar o projeto em um repositório do GitHub e compartilhar a URL com a turma.
2. Informar o nome da branch padrão. Os comandos deste roteiro usam `main`; substituir se necessário.
3. Garantir que os participantes tenham permissão para criar branches e PRs. Como alternativa, usar forks.
4. Definir os pares: uma pessoa implementa e outra revisa; depois inverter os papéis.
5. Confirmar que o site e as contas de aula estão disponíveis.
6. Preparar registros próprios para exercícios que alterem dados. Não modificar pedidos de colegas.
7. Se a aprovação precisar bloquear o merge, configurar a proteção da branch conforme a seção 15.

As senhas das contas didáticas estão em `Helpers/environment.js`, conforme a configuração da turma. Não copiar os valores para exemplos, descrições de PR ou capturas de relatório.

## 3. Baixar o projeto do GitHub

Instalar previamente Git, Node.js 24 e VS Code. Ter uma conta no GitHub e aceitar o convite ao repositório, quando houver.

No terminal do VS Code ou no PowerShell:

```powershell
git --version
node --version
npm --version
```

No GitHub, abrir o repositório, clicar **Code → HTTPS** e copiar a URL. Substituir `ORGANIZACAO` e `REPOSITORIO` abaixo pelos valores reais:

```powershell
git clone https://github.com/ORGANIZACAO/REPOSITORIO.git
cd REPOSITORIO
code .
```

No VS Code, abrir **Terminal → New Terminal**. Conferir se o terminal está na pasta que contém `package.json`.

```powershell
npm ci
npm run browsers:install
npm run typecheck
npm run test:chromium
```

Resultado esperado: dependências e navegadores instalados, verificação do JavaScript aprovada e testes do Chromium executados. Atualmente existem dois cenários WEB; nos três navegadores são seis execuções.

O projeto usa a URL de `Helpers/environment.js`. Não é necessário criar `.env` para começar. Instalar também a extensão **Playwright Test for VS Code**, da Microsoft, recomendada pelo projeto.

**Conferência do instrutor:** cada participante deve localizar um teste aprovado no terminal antes de continuar.

## 4. Demonstração do site

Primeiro executar o fluxo manualmente. Pedir à turma que descreva o que espera ver antes de clicar.

### Parte pública

1. Abrir a URL das aulas e observar o redirecionamento para `/auth/login`.
2. Identificar Email, Senha, controle de visibilidade, Lembrar-me e Login.
3. Enviar o login vazio e observar as mensagens dos campos obrigatórios.
4. Abrir **Crie uma conta** e identificar Nome, Sobrenome, Celular, Email e Senha. Não registrar conta durante esta demonstração.
5. Voltar ao login e abrir **Esqueceu a senha?**. Mostrar o campo Email sem enviar uma recuperação.
6. Abrir **Rastrear encomenda** e identificar o campo de código e o botão Rastrear.

### Parte autenticada

Usar uma sessão separada para cada perfil ou encerrar a sessão anterior antes de trocar de conta.

| Perfil | Demonstrar | Pergunta para a turma |
| --- | --- | --- |
| Usuário | Painel, Meus Pedidos, filtros e Conta | Como comprovar que aparecem somente os pedidos permitidos? |
| Motorista | Painel, Minhas Entregas, situações e Conta | Como preparar entregas atribuídas a motoristas diferentes? |
| Administrador | Painel, menus Usuários e Pedidos, Novo Pedido e Conta | Qual a diferença entre esconder um menu e bloquear acesso? |

Mostrar a URL e os estados de carregamento. Quantidades de pedidos podem variar em ambiente compartilhado. Os campos do formulário de Novo Pedido e a tela administrativa de Usuários ainda precisam de exploração adicional; não apresentar regras desses fluxos como confirmadas.

Abrir [mapeamento-testes-web.md](mapeamento-testes-web.md) e explicar prioridade, pré-condição, passos e resultado esperado. Os 96 cenários documentados são um plano de cobertura, não 96 testes já automatizados.

## 5. Apresentar a estrutura do projeto

| Arquivo ou pasta | O que ensinar |
| --- | --- |
| `Helpers/environment.js` | URL e contas utilizadas nas aulas |
| `page/Login/LoginPage.js` | Classe de página, construtor, localizadores, ações e validações |
| `tests/Login/login.spec.js` | Cenários que instanciam a página e chamam métodos |
| `playwright.config.js` | Navegadores, URL base, timeouts, evidências e retries no CI |
| `package.json` | Dependências e atalhos `npm run` |
| `package-lock.json` | Versões reproduzíveis instaladas com `npm ci` |
| `jsconfig.json` | Verificação de JavaScript e tipos declarados em JSDoc |
| `.gitignore` | Arquivos locais e gerados que não entram no commit |
| `.github/workflows/playwright.yml` | Execução automática e agendamento |
| `docs/` | Material das aulas e plano de testes |

Explicar `import`, `export`, `class`, `constructor`, `this`, `async` e `await` usando o código existente. Uma ação assíncrona precisa ser aguardada antes da próxima etapa.

## 6. Criar a branch do exercício

Começar com o trabalho local salvo e a branch padrão atualizada:

```powershell
git switch main
git pull --ff-only origin main
git switch -c teste/seu-nome-login-obrigatorio
```

Cada participante usa um nome de branch próprio. Em forks, criar a branch no fork e abrir o PR para o repositório combinado com o instrutor.

## 7. Como buscar informações dos elementos

### Pelo navegador: DevTools

1. Abrir a tela de login no Chrome ou Edge.
2. Pressionar **F12** ou clicar com o botão direito no campo e escolher **Inspecionar**.
3. Usar o seletor de elementos do DevTools (`Ctrl+Shift+C`) e apontar para o campo Email.
4. Observar a tag, `type`, `name`, `id`, `placeholder` e sua associação com o `label`.
5. Repetir com Senha, Login e as mensagens de erro após enviar o formulário vazio.
6. Verificar o nome acessível no painel de acessibilidade: o texto usado para localizar um controle pode vir de um rótulo ou `aria-label`, não apenas do conteúdo HTML.

Não copiar IDs gerados automaticamente ou caminhos CSS longos sem avaliar estabilidade. O input de senha normalmente não possui papel `textbox`; usar o rótulo quando disponível.

### Pelo Playwright Inspector e Codegen

```powershell
npm run codegen -- https://projeto-entra21.web.app/
```

1. Identificar as duas janelas: navegador de interação e Inspector.
2. Usar **Pick locator** para apontar para um elemento e conferir o localizador sugerido.
3. Digitar um email de exemplo e clicar no botão Login para observar ações geradas.
4. Conferir se o localizador identifica apenas o elemento desejado.
5. Copiar o localizador para o construtor do Page Object.
6. Encerrar as janelas ao terminar. O gravador ajuda a descobrir ações; o teste ainda precisa de intenção clara e asserções.

Para depurar um teste existente:

```powershell
npx playwright test tests/Login/login.spec.js --project=chromium --debug
```

Usar execução passo a passo, observar a linha atual e conferir o elemento realçado. No VS Code, a extensão também oferece seleção de localizadores e depuração. [Referências: Inspector](https://playwright.dev/docs/debug) e [Codegen](https://playwright.dev/docs/codegen).

### Escolher o localizador

| Necessidade | Exemplo |
| --- | --- |
| Botão pelo papel e nome | `page.getByRole('button', { name: 'Login', exact: true })` |
| Campo pelo rótulo | `page.getByLabel('Senha', { exact: true })` |
| Campo pelo papel e nome | `page.getByRole('textbox', { name: 'Email', exact: true })` |
| Mensagem de validação | `page.getByText('O email é obrigatório', { exact: true })` |
| Identificador de teste, quando existir no site | `page.getByTestId('identificador-confirmado-na-tela')` |

Priorizar significado e estabilidade. `getByTestId` só funciona se o atributo correspondente existir; não inventar identificadores. Se houver mais de um resultado, restringir ao formulário ou região correta em vez de adicionar `.first()` sem entender a duplicidade.

## 8. Definir o primeiro cenário da aula

Exercício baseado no LOG-03 do mapeamento:

| Item | Definição |
| --- | --- |
| Objetivo | Validar campos obrigatórios do login |
| Pré-condição | Tela de login aberta e sem sessão |
| Dados | Email e senha vazios |
| Ação | Clicar Login |
| Resultado esperado | Exibir “O email é obrigatório” e “A senha é obrigatória” |

Perguntar: um teste que apenas clica Login comprova esse resultado? A turma deve identificar que é necessário verificar as mensagens com `expect`.

## 9. Implementar o Page Object

Abrir `page/Login/LoginPage.js`. O construtor já recebe `page` e guarda os localizadores em `this`. Acrescentar **dentro do construtor**, após os localizadores existentes:

```javascript
this.emailRequiredMessage = page.getByText('O email é obrigatório', { exact: true });
this.passwordRequiredMessage = page.getByText('A senha é obrigatória', { exact: true });
```

Acrescentar o método abaixo **dentro da classe**, fora do construtor, antes da última chave:

```javascript
async expectRequiredMessages() {
  await expect(this.emailRequiredMessage).toBeVisible();
  await expect(this.passwordRequiredMessage).toBeVisible();
}
```

O `expect` já está importado no arquivo. Reutilizar `open()` e `submit()` existentes. Explicar a divisão: construtor identifica os elementos; métodos executam ações ou validam estados; o teste descreve a sequência do cenário.

## 10. Criar o teste chamando a página

Em `tests/Login/login.spec.js`, adicionar este cenário **dentro do `test.describe` existente**. Os imports de `test` e `LoginPage` já estão no arquivo:

```javascript
test('LOG-03 | valida os campos obrigatórios do login @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.submit();
  await loginPage.expectRequiredMessages();
});
```

Executar somente o novo cenário:

```powershell
npx playwright test tests/Login/login.spec.js --project=chromium --grep "LOG-03"
```

Resultado esperado: um teste aprovado. Se aparecer “No tests found”, conferir pasta, extensão `.spec.js`, título e filtro.

Este é um exercício para a turma implementar; os métodos e o terceiro cenário mostrados nesta seção não são adicionados automaticamente ao código por este documento.

## 11. Executar e analisar

```powershell
npm run typecheck
npm run test:chromium
npm test
npm run report
```

Após implementar o exercício, serão três cenários e nove execuções nos três navegadores, se todos forem incluídos sem filtros ou exclusões.

Para acompanhar visualmente ou depurar:

```powershell
npx playwright test tests/Login/login.spec.js --project=chromium --headed
npx playwright test tests/Login/login.spec.js --project=chromium --grep "LOG-03" --debug
npm run test:ui
```

No relatório, abrir o teste, conferir passos e comparar resultado esperado com recebido. Em falhas, examinar screenshot, vídeo e trace quando disponíveis. O projeto preserva essas evidências em falhas.

Para demonstrar uma falha de forma controlada, alterar temporariamente o texto esperado para um texto inexistente, executar apenas LOG-03 e mostrar a mensagem de erro. Restaurar o texto correto antes de validar e fazer commit.

Não resolver falha adicionando `waitForTimeout`, removendo `expect` ou aumentando timeouts sem investigar. As asserções do Playwright aguardam o estado esperado. Distinguir erro do teste, defeito do site, massa de dados e indisponibilidade do ambiente. Um retry que passa deve motivar análise de instabilidade.

## 12. Enviar as alterações ao GitHub

Conferir primeiro os arquivos alterados:

```powershell
git status
git diff
```

Adicionar somente os arquivos do exercício e criar o commit:

```powershell
git add page/Login/LoginPage.js tests/Login/login.spec.js
git diff --cached
git commit -m "test: valida campos obrigatorios do login"
git push -u origin teste/seu-nome-login-obrigatorio
```

O GitHub pode solicitar autenticação pelo gerenciador de credenciais ou navegador. Não colocar token ou senha no comando. Não enviar `.env`, `node_modules`, relatórios e evidências geradas; eles estão no `.gitignore`.

## 13. Abrir pull request e indicar o revisor

1. Abrir o repositório no GitHub.
2. Clicar **Compare & pull request**, ou **Pull requests → New pull request**.
3. Selecionar `base: main` e a branch do exercício em `compare`.
4. Conferir o diff e preencher título e descrição.
5. Criar o PR pronto para revisão; usar draft se ainda estiver incompleto.
6. Na área **Reviewers**, selecionar a pessoa revisora combinada com o instrutor. Ela precisa ter acesso apropriado ao repositório.
7. Acompanhar os checks e responder aos comentários.

Exemplo de descrição:

```text
Valida que o formulário de login apresenta as mensagens de email e senha
obrigatórios ao enviar os dois campos vazios.

Alterações:
- Localizadores e validação no LoginPage.
- Cenário LOG-03 chamando os métodos da página.

Validação:
- npm run typecheck
- Execução do LOG-03 no Chromium
- Suíte completa nos três navegadores

Informar os resultados reais e eventuais limitações.
```

O autor do PR não aprova o próprio PR. Se o campo Reviewers não permitir selecionar alguém, o instrutor deve conferir acesso e permissões. [Referência de aprovação](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews).

## 14. Aprovação automática e revisão humana

### Conferir os testes no GitHub Actions

1. No PR, abrir a área de checks ou a aba **Actions** do repositório.
2. Abrir **Testes WEB - Playwright** e conferir a execução referente ao último commit do PR.
3. Conferir instalação, verificação de JavaScript e execução dos testes.
4. Se falhar, abrir o log da etapa e baixar `playwright-results` quando disponível.
5. Corrigir localmente, executar novamente, fazer novo commit e push na mesma branch. O PR é atualizado automaticamente.

O workflow atual executa os três navegadores em push, pull request e execução manual. Na agenda, segunda-feira às 06:00 de São Paulo usa os três; terça a sexta às 06:00 usa somente Chromium. Não há execução agendada no fim de semana. Os artefatos ficam disponíveis por 14 dias.

### Checklist da pessoa revisora

- O cenário tem objetivo e resultado esperado claros?
- Os elementos foram confirmados na tela e os localizadores são estáveis?
- O construtor concentra os localizadores e o teste chama os métodos da página?
- As ações têm `await` e as validações usam asserções adequadas?
- O cenário funciona isoladamente e não depende da ordem dos testes?
- Não foram incluídos `test.only`, pausas fixas ou alterações em dados de colegas?
- O diff contém apenas alterações necessárias ao cenário?
- Os checks do último commit passaram e falhas intermitentes foram analisadas?

### Registrar a revisão

1. Abrir **Files changed** e ler as alterações.
2. Adicionar comentários específicos, indicando problema e melhoria esperada.
3. Clicar **Review changes** e escolher:
   - **Comment:** registra observações sem aprovar.
   - **Request changes:** solicita correções.
   - **Approve:** aprova as alterações revisadas.
4. O autor corrige comentários na mesma branch e pede nova revisão.
5. A pessoa revisora confere as mudanças e os checks mais recentes antes de aprovar.

Teste verde significa que as verificações implementadas passaram. A revisão avalia também a qualidade e a cobertura. O merge depende das regras configuradas no repositório; a aprovação humana e o CI precisam estar de acordo.

## 15. Configuração de aprovação obrigatória — instrutor

Esta seção orienta o administrador do repositório. O workflow local não configura proteção de branch nem revisores automaticamente. A disponibilidade dos recursos depende do plano, da visibilidade do repositório e das permissões.

Em **Settings → Branches** ou **Settings → Rules → Rulesets**, configurar uma regra para a branch padrão:

1. Exigir pull request antes do merge.
2. Exigir ao menos uma aprovação.
3. Exigir resolução das conversas de revisão.
4. Exigir status checks aprovados e selecionar o check real da execução de PR, exibido pelo job **Chromium, Firefox e WebKit**. Fazer uma primeira execução se o check ainda não estiver disponível para seleção.
5. Configurar a invalidação de aprovações antigas após novos commits, se esse for o processo da turma.
6. Conferir quem pode ignorar as regras e testar com um PR de exercício.

Solicitar um revisor no PR indica quem deve avaliar; a regra de aprovação obrigatória é o que impede merge sem a revisão exigida. [Referência de proteção de branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

Não usar o check da agenda reduzida de Chromium como substituto da execução de PR com os três navegadores.

## 16. Fazer merge e atualizar a máquina

Após aprovação e checks exigidos concluídos, a pessoa autorizada faz o merge conforme a política da equipe, por exemplo **Squash and merge**, e pode excluir a branch remota do exercício.

Na máquina do participante, com o trabalho salvo:

```powershell
git switch main
git pull --ff-only origin main
npm ci
npm run test:chromium
```

Se houver conflito, entender os dois lados da alteração, resolver na branch de trabalho e executar os testes novamente antes de solicitar aprovação.

## 17. Critério de conclusão da atividade

A atividade termina quando o participante apresenta o cenário no site, explica como encontrou os elementos, demonstra o teste aprovado, mostra o relatório e entrega um PR revisado com checks do último commit aprovados.

Para a próxima atividade, escolher um cenário de cadastro ou recuperação no mapeamento, repetir o processo com um novo Page Object e trocar o papel de autor e revisor. Evitar criação de contas ou envio de emails até preparar dados e combinar a limpeza do ambiente.

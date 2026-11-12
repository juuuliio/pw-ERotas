# Mapeamento de testes WEB — E-Rotas

Aplicação: https://projeto-entra21.web.app/

Exploração realizada em 12/11/2026, com Playwright e Chromium. A primeira etapa cobriu as telas públicas; a segunda acessou as contas de Usuário, Motorista e Administrador.

Este documento é um plano de testes, não um relatório de aprovação. As telas públicas foram acessadas e os formulários de autenticação foram submetidos vazios para observar validações. Na exploração dessas validações, requisições diferentes de GET, HEAD e OPTIONS foram bloqueadas. Não foram criadas contas, enviadas recuperações de senha ou alterados dados.

## Convenções

- **P0:** acesso, sessão e autorização; executar antes de uma entrega.
- **P1:** funcionalidades principais e validações; executar na regressão.
- **P2:** usabilidade, apresentação e compatibilidade complementar.
- **Observado:** elemento, navegação ou resposta identificados na exploração. Não significa que todas as variações do cenário foram executadas.
- **Proposto:** comportamento a testar e alinhar com os requisitos; ainda não confirmado.
- **Dependente:** exige credenciais, dados preparados ou acesso a serviço externo.

## Telas e elementos observados

| Caminho | Conteúdo observado |
| --- | --- |
| `/` | Redirecionou para `/auth/login` sem sessão. |
| `/auth/login` | Título “Acessar E-Rotas”, Email, Senha, botão de visibilidade da senha, Lembrar-me, Login e links para recuperação, cadastro e rastreio. |
| `/auth/register` | Título “Registre-se”, Nome, Sobrenome, (DDD) Celular, Email, Senha, botão de visibilidade da senha, Registrar e link Login. Não foi observado seletor de perfil no cadastro público. |
| `/auth/reset-password` | Título “Esqueceu sua senha?”, Email, Enviar e Voltar. |
| `/rastreio` | Título “Rastrear encomenda”, campo com placeholder “Código de rastreio, ex.: ER7K2M9QXP4A”, Rastrear e link Entrar. |

Links de referência: [Login](https://projeto-entra21.web.app/auth/login), [Cadastro](https://projeto-entra21.web.app/auth/register), [Recuperação](https://projeto-entra21.web.app/auth/reset-password), [Rastreio](https://projeto-entra21.web.app/rastreio).

## Login

| ID | Prioridade | Cenário / passos | Resultado a verificar | Base |
| --- | --- | --- | --- | --- |
| LOG-01 | P0 | Acessar `/` sem sessão. | Navega para `/auth/login` e apresenta o formulário. | Observado |
| LOG-02 | P1 | Abrir login. | Exibe título, campos, Lembrar-me e botão Login. | Observado |
| LOG-03 | P1 | Clicar Login com os dois campos vazios. | Exibe “O email é obrigatório” e “A senha é obrigatória”. | Observado |
| LOG-04 | P1 | Preencher apenas um campo e enviar; repetir com o outro. | Aponta o campo ausente; não autentica. | Proposto |
| LOG-05 | P1 | Informar email malformado. | Rejeita o formato e informa como corrigir; confirmar texto da mensagem. | Proposto |
| LOG-06 | P1 | Digitar senha e alternar sua visibilidade. | Inicia mascarada; alterna a exibição sem alterar o valor. | Observado: campo password e botão; alternância a validar |
| LOG-07 | P0 | Entrar com conta e senha válidas de cada perfil. | Abre a área apropriada e identifica a sessão correta. | Dependente |
| LOG-08 | P0 | Enviar credenciais inválidas. | Informa falha e mantém o usuário sem sessão. | Dependente |
| LOG-09 | P1 | Pressionar Enter após preencher credenciais. | Submete uma única vez, conforme regra do formulário. | Proposto |
| LOG-10 | P1 | Marcar e desmarcar Lembrar-me; reabrir o navegador. | Persistência da sessão segue a regra definida para cada opção. | Dependente; regra a confirmar |
| LOG-11 | P1 | Clicar Esqueceu a senha?, Crie uma conta e Rastrear encomenda. | Abre, respectivamente, recuperação, cadastro e rastreio. | Observado: destinos dos links |
| LOG-12 | P1 | Submeter durante demora ou falha da autenticação. | Indica processamento, evita envio duplicado e permite recuperação após erro. | Proposto |

## Cadastro

| ID | Prioridade | Cenário / passos | Resultado a verificar | Base |
| --- | --- | --- | --- | --- |
| CAD-01 | P1 | Abrir `/auth/register`. | Exibe os cinco campos e Registrar. | Observado |
| CAD-02 | P1 | Enviar formulário vazio. | Exibe “O nome é obrigatório”, “O sobrenome é obrigatório”, “O telefone é obrigatório”, “O email é obrigatório” e “A senha é obrigatória”. | Observado |
| CAD-03 | P1 | Deixar um campo vazio por vez. | Valida o campo ausente sem perder os demais valores. | Proposto |
| CAD-04 | P1 | Informar email malformado e corrigir. | Rejeita formato inválido e remove o erro após a correção conforme comportamento definido. | Proposto |
| CAD-05 | P1 | Informar celular com DDD, letras, tamanho insuficiente e excesso de dígitos. | Aplica máscara e validação conforme regra a confirmar. | Proposto |
| CAD-06 | P1 | Testar nomes com acentos, espaços e hífen, além de valores somente com espaços. | Aceita nomes válidos e rejeita valores sem conteúdo conforme requisito. | Proposto |
| CAD-07 | P1 | Testar limites de senha e alternância de visibilidade. | Aplica política de senha definida e preserva o valor ao alternar. | Proposto; política não identificada |
| CAD-08 | P0 | Registrar conta inédita com dados válidos. | Cria uma única conta e apresenta confirmação ou navegação esperada. | Dependente; cria dados |
| CAD-09 | P1 | Tentar cadastrar email já existente. | Trata duplicidade sem criar outra conta. | Dependente |
| CAD-10 | P1 | Clicar Registrar repetidamente ou simular indisponibilidade. | Evita duplicidade e apresenta erro recuperável. | Proposto |
| CAD-11 | P1 | Clicar Login. | Retorna para `/auth/login`. | Observado: destino do link |

## Recuperação de senha

| ID | Prioridade | Cenário / passos | Resultado a verificar | Base |
| --- | --- | --- | --- | --- |
| REC-01 | P1 | Abrir a recuperação. | Exibe explicação, Email, Enviar e Voltar. | Observado |
| REC-02 | P1 | Clicar Enviar sem email. | Exibe “O email é obrigatório”. | Observado |
| REC-03 | P1 | Enviar email malformado. | Aponta formato inválido sem iniciar recuperação. | Proposto |
| REC-04 | P0 | Solicitar recuperação para conta de teste existente. | Apresenta retorno adequado e entrega link na caixa de testes. | Dependente; envia email |
| REC-05 | P1 | Solicitar recuperação para email não cadastrado. | Retorno segue a regra de privacidade definida, sem revelar cadastro indevidamente. | Dependente; regra a confirmar |
| REC-06 | P0 | Abrir link válido e definir nova senha. | Nova senha autentica; senha anterior deixa de autenticar. | Dependente; altera credencial |
| REC-07 | P0 | Usar link expirado, adulterado ou já utilizado. | Rejeita o link e orienta a solicitar outro. | Dependente |
| REC-08 | P1 | Clicar Voltar. | Retorna para `/auth/login`. | Observado: destino do link |

## Rastreio público

| ID | Prioridade | Cenário / passos | Resultado a verificar | Base |
| --- | --- | --- | --- | --- |
| RAS-01 | P1 | Abrir `/rastreio` sem autenticação. | Exibe título, campo de código, Rastrear e Entrar. | Observado |
| RAS-02 | P1 | Enviar código vazio ou somente espaços. | Não realiza consulta útil; confirmar regra e feedback esperado. Na submissão vazia explorada não apareceu mensagem textual de validação. | Proposto; observação registrada |
| RAS-03 | P1 | Consultar código com formato inválido. | Informa erro compreensível sem quebrar a tela. | Proposto |
| RAS-04 | P1 | Consultar código bem formado inexistente. | Apresenta estado de encomenda não encontrada. | Dependente |
| RAS-05 | P0 | Consultar código válido de encomenda preparada. | Exibe os dados e o estado correspondentes à encomenda. | Dependente |
| RAS-06 | P1 | Consultar códigos de encomendas em estados diferentes. | Apresenta cada estado e histórico conforme dados preparados. Estados disponíveis ainda não mapeados. | Dependente |
| RAS-07 | P1 | Testar espaços antes/depois e letras minúsculas no código. | Normaliza ou rejeita conforme regra a confirmar. | Proposto |
| RAS-08 | P1 | Consultar outro código após resultado ou erro. | Atualiza a tela sem misturar dados da consulta anterior. | Dependente |
| RAS-09 | P0 | Examinar informações do resultado público. | Expõe somente os dados autorizados para consulta sem sessão. | Dependente; campos públicos a confirmar |
| RAS-10 | P1 | Clicar Entrar. | Abre `/auth/login`. | Observado: destino do link |

O código no placeholder é um exemplo de formato; não foi confirmado como encomenda existente.

## Sessão e perfis

As três contas de teste declaradas em `Helpers/environment.js` autenticaram com sucesso. As senhas das contas de aula est?o dispon?veis na propriedade `password` de `ACCOUNTS` em `Helpers/environment.js`, conforme configura??o solicitada para a turma. Os cenários de autorização abaixo continuam propostos: a visibilidade de um menu não comprova a proteção das operações no servidor.

| Perfil declarado | Email | Variável de senha |
| --- | --- | --- |
| Usuário | `qa.usuario@example.com` | `QA_USER_PASSWORD` |
| Motorista | `qa.motorista@example.com` | `QA_DRIVER_PASSWORD` |
| Administrador | `qa.admin@example.com` | `QA_ADMIN_PASSWORD` |

| ID | Prioridade | Cenário | Resultado a verificar | Pré-condição |
| --- | --- | --- | --- | --- |
| SES-01 | P0 | Autenticar cada perfil e listar menus, telas e ações disponíveis. | Inventário de permissões validado com as regras do sistema. | Contas válidas e matriz de permissões |
| SES-02 | P0 | Abrir URL interna conhecida sem sessão. | Bloqueia acesso ou redireciona para login. | Descobrir rotas internas |
| SES-03 | P0 | Abrir tela restrita com perfil sem permissão. | Nega acesso, inclusive por navegação direta. | Matriz de permissões e contas |
| SES-04 | P0 | Encerrar sessão e tentar retornar com Voltar ou URL direta. | Não recupera acesso autenticado. | Localizar ação de saída |
| SES-05 | P1 | Recarregar tela autenticada e abrir nova aba. | Mantém ou encerra sessão conforme regra definida. | Sessão válida |
| SES-06 | P0 | Expirar sessão durante navegação ou ação. | Trata expiração e impede operações sem autorização. | Controle da expiração em ambiente de teste |
| SES-07 | P0 | Comparar acesso a dados de contas diferentes. | Impede acesso indevido a dados de outro usuário. | Contas e registros isolados |

O inventário e os cenários específicos observados após autenticação estão nas seções seguintes. Não foram executadas operações de criação, edição, exclusão ou troca de senha.

## Inventário autenticado por perfil

| Tela / recurso | Usuário | Motorista | Administrador |
| --- | --- | --- | --- |
| Painel `/dashboard/app` | Boas-vindas e acompanhamento de pedidos | Boas-vindas e acompanhamento de entregas atribuídas | Boas-vindas e acompanhamento de pedidos |
| Menu de gerenciamento | Meus Pedidos | Minhas Entregas | Usuários e Pedidos |
| Atalho no painel | Ver Pedidos | Ver Entregas | Ver Pedidos |
| Listagem `/dashboard/request/list` | Meus Pedidos | Minhas Entregas | Pedidos |
| Novo Pedido | Botão observado | Não apareceu na listagem explorada | Botão observado; aponta para `/dashboard/request/new` |
| Filtros de situação | Todos, Pendente, A Caminho, Concluído | Mesmos filtros | Mesmos filtros |
| Colunas | Produto, Cod. Rastreio, Motorista, Tempo Estimado, Situação | Mesmas colunas | Mesmas colunas |
| Controles da tabela | Ordenação de Produto, Linhas por página e Denso | Mesmos controles | Mesmos controles |
| Conta `/dashboard/user/account` | Dados pessoais e senha | Dados pessoais e senha | Dados pessoais e senha |

Observações da massa de dados, que pode mudar: o Usuário apresentou 1 pedido pendente; Motorista e Administrador apresentaram 4 registros, com situações Pendente, A Caminho e Concluído. Isso ajuda a preparar cenários, mas não deve virar uma asserção fixa sobre quantidade em um ambiente compartilhado.

Os painéis exibiram cartões Total de pedidos, Pendentes, A caminho e Concluídos. Na primeira captura, os valores eram zero; em navegações posteriores as listagens carregaram registros. É necessário aguardar o término do carregamento e verificar a consistência dos totais antes de concluir se há divergência.

Limitações: algumas navegações apresentaram demora ou timeout. O caminho de Novo Pedido foi observado, mas seus campos não foram confirmados. O menu Usuários foi observado no Administrador, mas a tela de gerenciamento de usuários não foi confirmada. Nenhuma rota de edição ou detalhe foi inventada.

## Cenários do perfil Usuário

Pré-condição: conta `qa.usuario@example.com`, senha em `QA_USER_PASSWORD` e pedidos preparados para essa conta e outra conta de controle.

| ID | Prioridade | Cenário | Resultado a verificar | Base |
| --- | --- | --- | --- | --- |
| USR-01 | P0 | Autenticar como Usuário. | Abre o painel e identifica QA Usuário / Usuário. | Observado |
| USR-02 | P1 | Conferir o menu e clicar Ver Pedidos. | Exibe Meus Pedidos em `/dashboard/request/list`. | Observado |
| USR-03 | P0 | Comparar registros exibidos com os pedidos de duas contas preparadas. | Lista somente pedidos autorizados para o usuário autenticado. | Proposto; isolamento ainda não comprovado |
| USR-04 | P1 | Selecionar cada filtro de situação. | Exibe somente registros correspondentes e trata resultado vazio. | Observado: controles; filtragem a validar |
| USR-05 | P1 | Ordenar por Produto e alternar Linhas por página / Denso. | Ordenação, paginação e densidade funcionam sem perder o filtro. | Observado: controles; ações a validar |
| USR-06 | P1 | Conferir produto, código de rastreio, motorista, previsão e situação. | Dados correspondem à massa preparada e datas usam apresentação coerente. | Observado: colunas |
| USR-07 | P0 | Clicar Novo Pedido. | Abre o formulário permitido para o perfil. Mapear campos antes de automatizar seu preenchimento. | Observado: botão; formulário pendente |
| USR-08 | P1 | Criar um pedido válido e consultar novamente a lista e o painel. | Pedido criado uma única vez, vinculado ao usuário correto e totais atualizados. | Dependente; exige mapear formulário e limpar dados |
| USR-09 | P0 | Tentar acessar funções administrativas por URL ou operação conhecida. | Acesso negado conforme matriz de permissões. | Proposto; descobrir rotas e operações primeiro |
| USR-10 | P1 | Abrir Conta pelo cartão do perfil. | Exibe dados pessoais, permissão Usuário e seção de senha. | Observado |

## Cenários do perfil Motorista

Pré-condição: conta `qa.motorista@example.com`, senha em `QA_DRIVER_PASSWORD` e entregas preparadas para esse motorista e outro motorista.

| ID | Prioridade | Cenário | Resultado a verificar | Base |
| --- | --- | --- | --- | --- |
| MOT-01 | P0 | Autenticar como Motorista. | Abre o painel e identifica QA Motorista / Motorista. | Observado |
| MOT-02 | P1 | Clicar Ver Entregas. | Exibe Minhas Entregas em `/dashboard/request/list`. | Observado |
| MOT-03 | P0 | Comparar entregas listadas com atribuições preparadas para dois motoristas. | Exibe somente entregas autorizadas ao motorista. | Proposto; isolamento ainda não comprovado |
| MOT-04 | P1 | Alternar Todos, Pendente, A Caminho e Concluído. | Filtra corretamente e apresenta estado vazio quando necessário. | Observado: controles; filtragem a validar |
| MOT-05 | P1 | Conferir produto, rastreio, motorista, tempo estimado e situação. | Valores correspondem às entregas preparadas. | Observado: colunas |
| MOT-06 | P1 | Usar ordenação, paginação e Denso. | Controles mantêm a lista consistente e utilizável. | Observado: controles; ações a validar |
| MOT-07 | P0 | Explorar ações disponíveis em uma entrega. | Identificar como o motorista atualiza a situação, conforme texto do painel. Ainda não foram confirmados controles nem transições permitidas. | Dependente; ação a descobrir |
| MOT-08 | P0 | Após descobrir a atualização, testar transições de situação e entrega de outro motorista. | Aceita somente transições e registros autorizados. | Dependente |
| MOT-09 | P1 | Confirmar comportamento de criação de pedido para Motorista. | Alinhar com a regra do produto; Novo Pedido não apareceu na listagem observada. | Observado: ausência visual; permissão a confirmar |
| MOT-10 | P1 | Abrir Conta. | Exibe dados pessoais, permissão Motorista e seção de senha. | Observado |

## Cenários do perfil Administrador

Pré-condição: conta `qa.admin@example.com`, senha em `QA_ADMIN_PASSWORD`, usuários e pedidos de teste isolados.

| ID | Prioridade | Cenário | Resultado a verificar | Base |
| --- | --- | --- | --- | --- |
| ADM-01 | P0 | Autenticar como Administrador. | Abre o painel e identifica QA Administrador / Administrador. | Observado |
| ADM-02 | P0 | Conferir menu. | Apresenta Usuários e Pedidos. | Observado |
| ADM-03 | P1 | Abrir Pedidos pelo painel. | Exibe `/dashboard/request/list` com filtros e tabela de pedidos. | Observado |
| ADM-04 | P0 | Comparar pedidos administrativos com a massa preparada de usuários diferentes. | Abrangência da listagem corresponde à regra administrativa. | Proposto; abrangência a confirmar |
| ADM-05 | P1 | Filtrar, ordenar, paginar e alternar Denso. | Controles funcionam com registros em diferentes situações. | Observado: controles; ações a validar |
| ADM-06 | P0 | Clicar Novo Pedido. | Navega para `/dashboard/request/new`; aguardar formulário e mapear campos e regras. | Observado: botão e destino; formulário pendente |
| ADM-07 | P0 | Explorar Usuários. | Mapear URL, colunas, filtros e ações reais da tela. | Observado: menu; conteúdo pendente |
| ADM-08 | P0 | Verificar gestão de permissões na tela administrativa, se disponível. | Apenas administrador autorizado altera perfis; conferir impacto na sessão do usuário alterado. | Proposto; ação não confirmada na tela |
| ADM-09 | P1 | Investigar criação, edição, inativação ou exclusão de usuários e pedidos. | Adicionar cenários somente para operações que existirem e conforme as regras. | Proposto; controles não confirmados |
| ADM-10 | P1 | Abrir Conta. | Exibe dados pessoais, permissão Administrador e seção de senha. | Observado |

## Conta e senha — comum aos três perfis

Conteúdo observado em `/dashboard/user/account`: Nome, Sobrenome, Celular, E-mail, Permissão, Salvar Alterações, Senha atual, Esqueceu a senha atual?, Nova senha, Confirmar nova senha e Alterar Senha. A tela informa que o e-mail não pode ser alterado, a permissão é alterada somente por administrador e a nova senha exige no mínimo 6 caracteres. Essas mensagens não comprovam a validação no servidor.

| ID | Prioridade | Cenário | Resultado a verificar |
| --- | --- | --- | --- |
| CTA-01 | P1 | Abrir Conta com cada perfil. | Carrega os dados da conta autenticada e a permissão correspondente. |
| CTA-02 | P1 | Alterar nome, sobrenome e celular de conta exclusiva de teste. | Salva, persiste após recarga e permite restaurar os valores originais. |
| CTA-03 | P1 | Enviar dados pessoais vazios ou celular inválido. | Aplica validações sem apagar dados persistidos. |
| CTA-04 | P0 | Tentar alterar e-mail e permissão fora do fluxo autorizado. | Restrições também são aplicadas pelo servidor. |
| CTA-05 | P0 | Alterar senha informando a atual correta e confirmação correspondente. | Nova senha passa a autenticar e senha anterior deixa de funcionar; restaurar ao final. |
| CTA-06 | P0 | Informar senha atual incorreta. | Rejeita alteração sem modificar credenciais. |
| CTA-07 | P1 | Testar nova senha com menos de 6 caracteres, confirmação diferente e campos vazios. | Aplica validações coerentes com as mensagens da tela. |
| CTA-08 | P1 | Abrir Esqueceu a senha atual?. | Mapear destino e fluxo de recuperação sem disparar email durante exploração. |
| CTA-09 | P1 | Simular falha no salvamento. | Apresenta erro, encerra estado de processamento e permite tentar novamente. |

Esses cenários são propostos a partir dos controles observados. Nenhuma alteração de dados pessoais ou senha foi executada nesta exploração.

## Cenários transversais

| ID | Prioridade | Verificação | Resultado a verificar |
| --- | --- | --- | --- |
| TRA-01 | P1 | Executar fluxos em Chromium, Firefox e WebKit. | Comportamento funcional equivalente. |
| TRA-02 | P1 | Abrir telas em viewport de celular e desktop. | Campos e botões utilizáveis, sem sobreposição ou rolagem horizontal indevida. |
| TRA-03 | P1 | Navegar com Tab, Shift+Tab, Enter e Espaço. | Ordem de foco coerente, foco visível e controles operáveis. |
| TRA-04 | P1 | Verificar nomes acessíveis de campos e botões, inclusive ícone de senha. | Controles identificáveis por tecnologias assistivas. Na exploração, os botões de ícone de senha não tinham `aria-label` nem `title`; verificar o nome acessível completo antes de concluir defeito. |
| TRA-05 | P1 | Corrigir campos após erros de validação. | Mensagens claras, vinculadas ao campo e atualizadas após correção. |
| TRA-06 | P1 | Simular falhas de rede e respostas lentas nas chamadas identificadas. | Feedback adequado e possibilidade de tentar novamente. |
| TRA-07 | P2 | Recarregar e navegar pelo histórico nas rotas públicas. | Tela correta, sem erro de hospedagem ou estado inconsistente. |
| TRA-08 | P2 | Acompanhar erros de console e requisições da aplicação nos fluxos. | Identificar erros funcionais; avaliar chamadas externas separadamente. |
| TRA-09 | P1 | Examinar relatórios, logs e capturas dos testes autenticados. | Não expor senhas, tokens ou dados pessoais desnecessários nos artefatos compartilhados. |

## Organização sugerida para automação

Manter JavaScript e o padrão já adotado: localizadores no `constructor(page)`, ações e validações no Page Object e cenários nos arquivos `.spec.js`.

```text
Helpers/environment.js
page/
  Login/LoginPage.js                  # existente
  Cadastro/CadastroPage.js            # a criar
  Recuperacao/RecuperacaoPage.js      # a criar
  Rastreio/RastreioPage.js            # a criar
tests/
  Login/login.spec.js                 # existente
  Cadastro/cadastro.spec.js           # a criar
  Recuperacao/recuperacao.spec.js      # a criar
  Rastreio/rastreio.spec.js            # a criar
  Sessao/sessao.spec.js               # após explorar acesso autenticado
```

Os testes atuais de login verificam a apresentação da tela e o preenchimento com senha mascarada, sem enviar credenciais. Os exemplos locais de rotas e health check não representam funcionalidades observadas no site das aulas.

## Sequência sugerida para as aulas

1. Navegação e asserções: LOG-01, LOG-02, CAD-01, REC-01 e RAS-01.
2. Page Objects com construtor: separar localizadores, ações e validações.
3. Formulários e erros: LOG-03, CAD-02 e REC-02; depois explorar formatos inválidos.
4. Navegação entre telas e senha mascarada: LOG-06, LOG-11, CAD-11 e REC-08.
5. Dados de teste: usar `ACCOUNTS`, preparar códigos de rastreio e isolar registros.
6. Autenticação, sessão e permissões: executar somente após confirmar credenciais e regras.
7. Interceptação de rede, responsividade, acessibilidade, relatórios e execução no CI.

Para cenários que criam contas ou alteram senhas, usar dados exclusivos e definir limpeza e restauração. Guardar valores de senha no `.env` ou no ambiente do CI; `passwordEnv` contém o nome da variável, não a senha.

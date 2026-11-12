import { test } from '@playwright/test';
import { LoginPage } from '../../page/Login/LoginPage.js';
import { ACCOUNTS } from '../../Helpers/environment.js';

test.describe('WEB | Login', () => {

  test('exibe a tela de acesso @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.expectReady();
  });

  test('preenche email e mantém a senha mascarada', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const account = ACCOUNTS[0];
    // Valor didático: este cenário não envia o formulário nem autentica.
    const password = 'SenhaDidatica123!';

    await loginPage.open();
    await loginPage.fillCredentials(account.email, password);
    await loginPage.expectCredentials(account.email, password);
  });
});

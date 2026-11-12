import { expect } from '@playwright/test';

/** Page Object da tela de acesso ao E-Rotas utilizada nas aulas. */
export class LoginPage {
  /** @param {import("@playwright/test").Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.getByText('Acessar E-Rotas', { exact: true });
    this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
    this.passwordInput = page.getByLabel('Senha', { exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  }

  async open() {
    await this.page.goto('/');
  }

  /** @param {string} email @param {string} password */
  async fillCredentials(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  /** @param {string} email @param {string} password */
  async login(email, password) {
    await this.fillCredentials(email, password);
    await this.submit();
  }

  async expectReady() {
    await expect(this.title).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
  }

  /** @param {string} email @param {string} password */
  async expectCredentials(email, password) {
    await expect(this.emailInput).toHaveValue(email);
    await expect(this.passwordInput).toHaveValue(password);
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }
}

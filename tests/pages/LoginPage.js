import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page){
    super(page);
    this.emailTextbox = this.page.getByRole('textbox', {name: 'E-Mail Address'});
    this.passwordTextbox = this.page.getByRole('textbox', {name: 'Password'});
    this.loginButton = this.page.getByRole('button', {name: 'Login'});
    this.btnLogin = 'input.btn-primary';
  }

  async enterEmail(email){
    await this.enterText(this.emailTextbox, email);
  }

  async enterPassword(password){
    await this.enterText(this.passwordTextbox, password);
  }

  async performLogin(){
    await this.clickElement(this.loginButton);
    await this.page.waitForURL('**/account');
    
  }

  async isLoginPageDisplayed(){
    // await this.waitForSelectorVisible(this.btnLogin);
    return await this.isElementVisible(this.loginButton);
  }
}
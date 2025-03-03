import { BasePage } from "./BasePage";

export class LandingPage extends BasePage{
/**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page){
    super(page);
    this.myAccountLink = this.page.getByTitle('My Account');
    this.loginLink = this.page.getByText('Login', {exact: true});
  }

  async goToLoginPage(){
    await this.clickElement(this.myAccountLink);
    await this.clickElement(this.loginLink);
    await this.page.waitForURL('**/login');
  }
}
import { BasePage } from "./BasePage";

export class MyAccountPage extends BasePage{
    /**
   * @param {import('@playwright/test').Page} page
   */

    #accountBreadCrumb;
    #goToHomeLink;

  constructor(page){
    super(page);
    this.#accountBreadCrumb = this.page.locator('ul.breadcrumb li:nth-child(2) a');
    this.#goToHomeLink = this.page.getByTitle('naveenopencart');
  }

  async isAccountPageDisplayed(){
    return await this.getText(this.#accountBreadCrumb);
  }

  async goToHomePage(){
    await this.clickElement(this.#goToHomeLink);
  }
}
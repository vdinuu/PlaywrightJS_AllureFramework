import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
    /**
   * @param {import('@playwright/test').Page} page
   */

    #searchTextbox;
    #searchButton;

  constructor(page){
    super(page);
    this.#searchTextbox = this.page.getByRole('textbox', {name: 'Search', exact: true});
    this.#searchButton = this.page.locator('button.btn-lg').nth(0);

  }

  async searchProduct(productName){
    await this.enterText(this.#searchTextbox, productName);
    await this.clickElement(this.#searchButton);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
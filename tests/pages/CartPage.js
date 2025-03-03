import { BasePage } from "./BasePage";

export class CartPage extends BasePage{
      /**
   * @param {import('@playwright/test').Page} page
   */

    #checkoutButton;
    #header

  constructor(page){
    super(page);
    this.#checkoutButton = this.page.getByRole('link', { name: 'Checkout', exact: true });
    this.#header = this.page.getByRole('heading', {level: 1});
  }

  async checkoutProduct(){
    await this.clickElement(this.#checkoutButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isCartPageDisplayed(){
    await this.waitForElementVisible(this.#header);
    return await this.isElementVisible(this.#header);
  }
}
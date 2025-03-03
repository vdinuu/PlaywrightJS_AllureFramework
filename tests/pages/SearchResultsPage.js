import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage{
    /**
   * @param {import('@playwright/test').Page} page
   */

    #productList;
    #addToCartButtons;
    #alert;
    #addToWishListButton;
    #viewItemsButton;
    #viewCartButton;

  constructor(page){
    super(page);
    this.#productList = this.page.locator('div.product-thumb');
    this.#addToCartButtons = this.page.getByRole('button', {name: 'Add to Cart'});
    this.#alert = 'div.alert';
    this.#addToWishListButton = this.page.locator("button[data-original-title*='Wish List']");
    this.#viewItemsButton = this.page.locator('button.btn-lg').nth(1);
    this.#viewCartButton = this.page.locator(".dropdown-menu p a[href*='/cart']");
  }

  async getSearchResultSize(){
    return await this.getCount(this.#productList);
  }

  async addProductToCart(productNumber){
    await this.clickElement(this.#addToCartButtons.nth(productNumber-1));
    await this.page.waitForLoadState('load');
  }

  async getAlertText(){
    await this.waitForSelectorVisible('div.alert');
    return await this.getText(this.page.locator(this.#alert));
  }

  async addProductToWishList(productNumber){
    await this.clickElement(this.#addToWishListButton.nth(productNumber-1));
  }

  async viewProductsInCart(){
    await this.clickElement(this.#viewItemsButton);
    await this.clickElement(this.#viewCartButton);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
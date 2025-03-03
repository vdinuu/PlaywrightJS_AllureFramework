import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  #header;
  #newAddressRadioBtn;
  #firstNameTextbox;
  #lastNameTextbox;
  #companyTextbox;
  #addressTextbox;
  #cityTextbox;
  #postcodeTextbox;
  #countryDropdown;
  #stateDropdown;
  #continueButton;

  constructor(page){
    super(page);
    this.#header = this.page.getByRole('heading', {level:1});
    this.#newAddressRadioBtn = this.page.getByLabel('I want to use a new address');
    this.#firstNameTextbox = this.page.getByPlaceholder('First Name');
    this.#lastNameTextbox = this.page.getByPlaceholder('Last Name');
    this.#companyTextbox = this.page.getByPlaceholder('Company');
    this.#addressTextbox = this.page.getByPlaceholder('Address 1');
    this.#cityTextbox = this.page.getByPlaceholder('City');
    this.#postcodeTextbox = this.page.getByPlaceholder('Post Code');
    this.#countryDropdown = '#input-payment-country';
    this.#stateDropdown = '#input-payment-zone';
    this.#continueButton = this.page.getByRole('button', { name: 'Continue' });

  }

  async isCheckoutPageDisplayed(){
    await this.waitForElementVisible(this.#header);
    return await this.isElementVisible(this.#header);
  }

  async selectNewAddressOption(){
    await this.clickElement(this.#newAddressRadioBtn);
  }

  async enterFirstName(firstName){
    await this.enterText(this.#firstNameTextbox, firstName);
  }

  async enterLastName(lastName){
    await this.enterText(this.#lastNameTextbox, lastName);
  }

  async enterCompany(company){
    await this.enterText(this.#companyTextbox, company);
  }

  async enterAddress(address){
    await this.enterText(this.#addressTextbox, address);
  }

  async enterCity(city){
    await this.enterText(this.#cityTextbox, city);
  }

  async enterPostcode(postcode){
    await this.enterText(this.#postcodeTextbox, postcode);
  }

  async selectCountry(country){
    await this.selectDropdown(this.#countryDropdown, country);
  }

  async selectState(state){
    await this.selectDropdown(this.#stateDropdown, state);
  }

  async continue(){
    await this.clickElement(this.#continueButton);
  }
}

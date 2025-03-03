const fs = require("fs");

export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Navigate to an URL
  async navigateToUrl(url) {
    await this.page.goto(url);
  }

  //Click element
  async clickElement(element) {
    await element.click();
  }

  //Enter data in textbox
  async enterText(element, value) {
    await element.fill(value);
  }

  //getText from element
  async getText(element) {
    return element.innerText();
  }

  //wait for element visible
  async waitForSelectorVisible(selector) {
    await this.page.waitForSelector(selector, { state: "visible", timeout: 5000});
  }

  //wait for element visible
  async waitForElementVisible(element) {
    await element.waitFor({ state: "visible" });
  }

  //is element visible
  async isElementVisible(element) {
    return await element.isVisible();
  }

  //wait for element hidden
  async waitForElementHidden(element) {
    await element.waitFor({ state: "hidden" });
  }

  async enterTextSequentially(element, value) {
    await element.pressSequentially(value);
  }

  async writeOrderIdToJson(valueToUpdate) {
    const filePath = "tests/testData/dataFile.json";
    const jsonData = fs.readFileSync(filePath, "utf8");
    let data = JSON.parse(jsonData);
    const nodeToUpdate = data.productDetails;
    if (nodeToUpdate) {
      nodeToUpdate.orderId = valueToUpdate;
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  }

  async getCount(element){
    return await element.count();
  }

  async selectDropdown(selector, value){
    await this.page.selectOption(selector, value);
  }
}

import { test as baseTest } from "@playwright/test";
import { LandingPage } from "../tests/pages/LandingPage";
import { LoginPage } from "../tests/pages/LoginPage";
import { MyAccountPage } from "../tests/pages/MyAccountPage";
import { HomePage } from "../tests/pages/HomePage";
import { SearchResultsPage } from "../tests/pages/SearchResultsPage";
import { CartPage } from "../tests/pages/CartPage";
import { CheckoutPage } from "../tests/pages/CheckoutPage";

const testPage = baseTest.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
  // @ts-ignore
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  myAccountPage: async ({ page }, use) => {
    const myAccountPage = new MyAccountPage(page);
    await use(myAccountPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },
  cartPage: async({page}, use)=>{
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async({page}, use)=>{
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  }
})

export const test = testPage;

import { expect } from "@playwright/test";
import * as testData from "./testData/data.json";

import {test} from '../set-up/setup'
let data;

// @ts-ignore
test.beforeEach(async({landingPage, loginPage, page})=>{
  data = testData.userCredentials;
  await page.goto("https://naveenautomationlabs.com/opencart/");
  await page.waitForURL('**/opencart/');
  await landingPage.goToLoginPage();
  await page.waitForLoadState();
  expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  await loginPage.enterEmail(data.email);
  await loginPage.enterPassword(data.password);
  await loginPage.performLogin();
  await page.waitForLoadState('domcontentloaded');
});

// @ts-ignore
test("Search product @smoke", async ({myAccountPage, homePage, searchResultsPage }) => {
  expect(await myAccountPage.isAccountPageDisplayed()).toBe('Account');
  await myAccountPage.goToHomePage();
  await homePage.searchProduct("Macbook");
  expect(await searchResultsPage.getSearchResultSize()).toBeGreaterThan(0);
});

// @ts-ignore
test("Add to cart @smoke", async ({myAccountPage, homePage, searchResultsPage}) => {
  expect(await myAccountPage.isAccountPageDisplayed()).toBe('Account');
  await myAccountPage.goToHomePage();
  await homePage.searchProduct("Macbook");
  await searchResultsPage.addProductToCart(1);
  expect(await searchResultsPage.getAlertText()).toContain('Success');
});

// @ts-ignore
test("Add to wishlist @smoke", async ({myAccountPage, homePage, searchResultsPage }) => {
  expect(await myAccountPage.isAccountPageDisplayed()).toBe('Account');
  await myAccountPage.goToHomePage();
  await homePage.searchProduct("Macbook");
  await searchResultsPage.addProductToWishList(1);
  expect(await searchResultsPage.getAlertText()).toContain('Success');
});

// @ts-ignore
test("Checkout product @regression", async ({myAccountPage, homePage, searchResultsPage, cartPage, checkoutPage}) => {
  const purchaseData = testData.purchaseProduct;
  expect(await myAccountPage.isAccountPageDisplayed()).toBe('Account');
  await myAccountPage.goToHomePage();
  await homePage.searchProduct(purchaseData.productName);
  await searchResultsPage.addProductToCart(1);
  expect(await searchResultsPage.getAlertText()).toContain('Success');
  await searchResultsPage.viewProductsInCart();
  expect(await cartPage.isCartPageDisplayed()).toBeTruthy();
  await cartPage.checkoutProduct();
  expect(await checkoutPage.isCheckoutPageDisplayed()).toBeTruthy();
  await checkoutPage.selectNewAddressOption();
  await checkoutPage.enterFirstName(purchaseData.firstName);
  await checkoutPage.enterLastName(purchaseData.lastName);
  await checkoutPage.enterCompany(purchaseData.Company);
  await checkoutPage.enterAddress(purchaseData.Address);
  await checkoutPage.enterCity(purchaseData.City);
  await checkoutPage.enterPostcode(purchaseData.PostCode);
  await checkoutPage.selectCountry(purchaseData.Country);
  await checkoutPage.selectState(purchaseData.State)
  await checkoutPage.continue();
});

// @ts-ignore
test.afterEach(async({page})=>{
  await page.close();
});

import { browser, by, element } from 'protractor';

import { HomePage } from './pages/home.po';
import { LoginPage } from './pages/login.po';
import { RedeemPage } from './pages/redeem.po';

describe('When redeem', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let redeemPage: RedeemPage;

  beforeEach(() => {
    homePage = new HomePage();
    loginPage = new LoginPage();
    redeemPage = new RedeemPage();
  });

  it('should see the redeem link', () => {
    loginPage.navigateTo();
    loginPage.login(loginPage.credentials);
    expect(homePage.getRedeemCodeLink().isPresent()).toBeTruthy();
  });

  it('should not see the redeem field', () => {
    expect(redeemPage.getRedeemCodeField().isPresent()).toBeFalsy();
  });

  it('should be visible after click on redeem link', () => {
    homePage.getRedeemCodeLink().click();
    expect(redeemPage.getRedeemCodeField().isPresent()).toBeTruthy();
  });

  it('should be receive a message after redeem code ', () => {
    redeemPage.getRedeemCodeField().sendKeys(redeemPage.redeemKey);
    browser.waitForAngular();
    expect(element(by.css('*[data-e2e="notification"]')).isPresent()).toBeTruthy();
  });
});

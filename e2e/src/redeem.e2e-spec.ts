import { browser, by, element } from 'protractor';

import { HomePage } from './pages/home.po';
import { LoginPage } from './pages/login.po';

describe('When redeem', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  beforeEach(() => {
    homePage = new HomePage();
    loginPage = new LoginPage();
  });

  it('should display the redeem link', () => {
    loginPage.navigateTo();
    loginPage.login(loginPage.credentials);
    expect(homePage.getRedeemCodeLink().isPresent()).toBeTruthy();
  });

  it('should not display the redeem field', () => {
    expect(homePage.getRedeemCodeField().isPresent()).toBeFalsy();
  });

  it('should be visible after click on link', () => {
    homePage.getRedeemCodeLink().click();
    expect(homePage.getRedeemCodeField().isPresent()).toBeTruthy();
  });

  it('should receive a message after redeem', () => {
    homePage.getRedeemCodeField().sendKeys(homePage.redeemKey);
    browser.waitForAngular();
    expect(element(by.css('*[data-e2e="notification"]')).isPresent()).toBeTruthy();
  });
});

import { browser, by, element } from 'protractor';

import { HomePage } from './pages/home.po';
import { LoginPage } from './pages/login.po';

describe('When login', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  beforeEach(() => {
    homePage = new HomePage();
    loginPage = new LoginPage();
  });

  it('should display welcome promotion', () => {
    homePage.navigateTo();
    expect(homePage.getPromo().isPresent()).toBeTruthy();
  });

  it('should display just the login link', () => {
    expect(homePage.getLoginLink().isPresent()).toBeTruthy();
    expect(homePage.getLobbyLink().isPresent()).toBeFalsy();
    expect(homePage.getLogoutLink().isPresent()).toBeFalsy();
    expect(homePage.getRedeemCodeLink().isPresent()).toBeFalsy();
  });

  it('should navigate to login', () => {
    homePage.getLoginLink().click();
    browser.getCurrentUrl().then((actualUrl) => {
      expect(actualUrl).toContain('login');
    });
  });

  it('should display the login form', () => {
    expect(loginPage.getEmailInput().isPresent()).toBeTruthy();
    expect(loginPage.getLoginButton().isPresent()).toBeTruthy();
    expect(loginPage.getPasswordInput().isPresent()).toBeTruthy();
  });

  it('should show error messages', () => {
    loginPage.getEmailInput().sendKeys('');
    loginPage.getPasswordInput().sendKeys('');
    expect(loginPage.getEmailInputError().isPresent()).toBeTruthy();
    expect(loginPage.getEmailInputError().isPresent()).toBeTruthy();
  });

  it('should show wrong credentials message', () => {
    loginPage.login(loginPage.invalidCredentials);
    expect(element(by.css('*[data-e2e="notification"]')).isPresent()).toBeTruthy();
  });

  it('should navigate to home after login', () => {
    loginPage.login(loginPage.credentials);
    browser.waitForAngular();
    browser.getCurrentUrl().then((actualUrl) => {
      expect(actualUrl).not.toContain('login');
    });
  });

  it('should display all links', () => {
    expect(homePage.getLoginLink().isPresent()).toBeFalsy();
    expect(homePage.getLobbyLink().isPresent()).toBeTruthy();
    expect(homePage.getLogoutLink().isPresent()).toBeTruthy();
    expect(homePage.getRedeemCodeLink().isPresent()).toBeTruthy();
  });

  it('should not be able to navigate to login page', () => {
    loginPage.navigateTo();
    browser.getCurrentUrl().then((actualUrl) => {
      expect(actualUrl).not.toContain('login');
    });
  });

  it('should display just login link after logout', () => {
    homePage.getLogoutLink().click();
    expect(homePage.getLoginLink().isPresent()).toBeTruthy();
    expect(homePage.getLobbyLink().isPresent()).toBeFalsy();
    expect(homePage.getLogoutLink().isPresent()).toBeFalsy();
    expect(homePage.getRedeemCodeLink().isPresent()).toBeFalsy();
  });
});

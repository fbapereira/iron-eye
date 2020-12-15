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

  it('should display login link and no other header link', () => {
    expect(homePage.getLoginLink().isPresent()).toBeTruthy();
    expect(homePage.getLibraryLink().isPresent()).toBeFalsy();
    expect(homePage.getLogoutLink().isPresent()).toBeFalsy();
    expect(homePage.getRedeemCodeLink().isPresent()).toBeFalsy();
  });

  it('should navigate to login on click', () => {
    homePage.getLoginLink().click();
    browser.getCurrentUrl().then(function (actualUrl) {
      expect(actualUrl).toContain('login');
    });
  });

  it('should display email, password and login button', () => {
    expect(loginPage.getEmailInput().isPresent()).toBeTruthy();
    expect(loginPage.getLoginButton().isPresent()).toBeTruthy();
    expect(loginPage.getPasswordInput().isPresent()).toBeTruthy();
  });

  it('should show required message after focus', () => {
    loginPage.getEmailInput().sendKeys('');
    loginPage.getPasswordInput().sendKeys('');
    expect(loginPage.getEmailInputError().isPresent()).toBeTruthy();
    expect(loginPage.getEmailInputError().isPresent()).toBeTruthy();
  });

  it('should show message when wrong credentials', () => {
    loginPage.login(loginPage.invalidCredentials);
    expect(element(by.css('*[data-e2e="notification"]')).isPresent()).toBeTruthy();
  });

  it('should navigate to home when login successful', () => {
    loginPage.login(loginPage.credentials);
    browser.waitForAngular();
    browser.getCurrentUrl().then(function (actualUrl) {
      expect(actualUrl).not.toContain('login');
    });
  });


  it('should display all links but login link', () => {
    expect(homePage.getLoginLink().isPresent()).toBeFalsy();
    expect(homePage.getLibraryLink().isPresent()).toBeTruthy();
    expect(homePage.getLogoutLink().isPresent()).toBeTruthy();
    expect(homePage.getRedeemCodeLink().isPresent()).toBeTruthy();
  });

  it('should not be able to navigate to login', () => {
    loginPage.navigateTo();
    browser.getCurrentUrl().then(function (actualUrl) {
      expect(actualUrl).not.toContain('login');
    });
  });

  it('should display login link and no other header link after logout', () => {
    homePage.getLogoutLink().click();
    expect(homePage.getLoginLink().isPresent()).toBeTruthy();
    expect(homePage.getLibraryLink().isPresent()).toBeFalsy();
    expect(homePage.getLogoutLink().isPresent()).toBeFalsy();
    expect(homePage.getRedeemCodeLink().isPresent()).toBeFalsy();
  });
});

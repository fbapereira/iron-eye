import { browser, by, element, ElementFinder } from 'protractor';

export class LoginPage {
  public url = 'login';
  public credentials = {
    email: 'louis.foster@baz.com',
    password: 'qwerty',
  };

  public invalidCredentials = {
    email: 'louis.foster.fake@baz.com',
    password: 'qwerty',
  };

  login(credentials): void {
    this.getEmailInput().clear();
    this.getPasswordInput().clear();
    this.getEmailInput().sendKeys(credentials.email);
    this.getPasswordInput().sendKeys(credentials.password);
    this.getLoginButton().click();
  }

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/login') as Promise<unknown>;
  }

  getEmailInput(): ElementFinder {
    return element(by.css('*[data-e2e="login-email"]'));
  }

  getPasswordInput(): ElementFinder {
    return element(by.css('*[data-e2e="login-password"]'));
  }

  getLoginButton(): ElementFinder {
    return element(by.buttonText('Login'));
  }

  getEmailInputError(): ElementFinder {
    return element(by.css('*[data-e2e="login-email-error"]'));
  }

  getPasswordError(): ElementFinder {
    return element(by.css('*[data-e2e="login-password-error"]'));
  }
}

import { browser, by, element, ElementFinder } from 'protractor';

/**
 * Login page
 */
export class LoginPage {
  /**
   * page URL
   */
  public url = 'login';

  /**
   * credentials that are able to login
   */
  public credentials = {
    email: 'louis.foster@baz.com',
    password: 'qwerty',
  };

  /**
   * credentials that are not able to login
   */
  public invalidCredentials = {
    email: 'louis.foster.fake@baz.com',
    password: 'qwerty',
  };

  /**
   * Try to login in the system
   */
  public login(credentials): void {
    // we need to clean just in case there is some content on the field
    this.getEmailInput().clear();
    this.getPasswordInput().clear();
    this.getEmailInput().sendKeys(credentials.email);
    this.getPasswordInput().sendKeys(credentials.password);
    this.getLoginButton().click();
  }

  /**
   * navigate to the login page
   */
  public navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/login') as Promise<unknown>;
  }

  /**
   * return the email input
   */
  public getEmailInput(): ElementFinder {
    return element(by.css('*[data-e2e="login-email"]'));
  }

  /**
   * return the login input
   */
  public getPasswordInput(): ElementFinder {
    return element(by.css('*[data-e2e="login-password"]'));
  }

  /**
   * return the submit button
   */
  public getLoginButton(): ElementFinder {
    return element(by.buttonText('Login'));
  }

  /**
   * return the email input error
   */
  public getEmailInputError(): ElementFinder {
    return element(by.css('*[data-e2e="login-email-error"]'));
  }

  /**
   * return the password input errors
   */
  public getPasswordError(): ElementFinder {
    return element(by.css('*[data-e2e="login-password-error"]'));
  }
}

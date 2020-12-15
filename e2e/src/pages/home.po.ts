import { browser, by, element, ElementFinder } from 'protractor';

/**
 * Main page '/'
 */
export class HomePage {

  /**
   * Key to redeem a game
   */
  public redeemKey = 'key-key-key-0068';

  /**
   * navigate to the home page
   */
  public navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  /**
   * return the redeem input field
   */
  public getRedeemCodeField(): ElementFinder {
    return element(by.css('*[data-e2e="redeem-code-field"]'));
  }

  /**
   * return the promo div
   */
  public getPromo(): ElementFinder {
    return element(by.css('*[data-e2e="promotion"]'));
  }

  /**
   * return the login link
   */
  public getLoginLink(): ElementFinder {
    return element(by.css('*[data-e2e="login-link"]'));
  }

  /**
   * return the redeem code link
   */
  public getRedeemCodeLink(): ElementFinder {
    return element(by.css('*[data-e2e="redeem-code-link"]'));
  }

  /**
   * return the lobby link
   */
  public getLobbyLink(): ElementFinder {
    return element(by.css('*[data-e2e="lobby-link"]'));
  }

  /**
   * return the logout link
   */
  public getLogoutLink(): ElementFinder {
    return element(by.css('*[data-e2e="logout-link"]'));
  }
}

import { browser, by, element, ElementFinder } from 'protractor';

export class HomePage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getPromo(): ElementFinder {
    return element(by.css('*[data-e2e="promotion"]'));
  }

  getLoginLink(): ElementFinder {
    return element(by.css('*[data-e2e="login-link"]'));
  }

  getRedeemCodeLink(): ElementFinder {
    return element(by.css('*[data-e2e="redeem-code-link"]'));
  }

  getLibraryLink(): ElementFinder {
    return element(by.css('*[data-e2e="library-link"]'));
  }

  getLogoutLink(): ElementFinder {
    return element(by.css('*[data-e2e="logout-link"]'));
  }
}

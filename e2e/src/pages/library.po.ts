import { browser, by, element, ElementFinder } from 'protractor';

export class LibraryPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/games') as Promise<unknown>;
  }

  getLogoutLink(): ElementFinder {
    return element(by.css('*[data-e2e="games"]'));
  }

  getSearchField(): ElementFinder {
    return element(by.css('*[data-e2e="search"]'));
  }

  getGames() {
    return element(by.css('*[data-e2e="games"]')).all(by.tagName('div'));
  }
}

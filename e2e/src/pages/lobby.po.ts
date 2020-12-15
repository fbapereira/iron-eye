import { browser, by, element, ElementFinder } from 'protractor';
/**
 * Lobby page '/lobby'
 */
export class LobbyPage {
  /**
   * navigate to the lobby page
   */
  public navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/games') as Promise<unknown>;
  }

  /**
   * return the lobby
   */
  public getLogoutLink(): ElementFinder {
    return element(by.css('*[data-e2e="games"]'));
  }

  /**
   * return search field
   */
  public getSearchField(): ElementFinder {
    return element(by.css('*[data-e2e="search"]'));
  }

  /**
   * return the displaying games
   */
  public getGames() {
    return element(by.css('*[data-e2e="games"]')).all(by.tagName('div'));
  }
}

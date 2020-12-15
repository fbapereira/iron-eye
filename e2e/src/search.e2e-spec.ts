import { browser } from 'protractor';

import { LobbyPage } from './pages/lobby.po';

describe('When search', () => {
  let lobbyPage: LobbyPage;

  beforeEach(() => {
    lobbyPage = new LobbyPage();
  });

  it('should display games', () => {
    lobbyPage.navigateTo();
    browser.waitForAngular();
    lobbyPage.getGames().then((games) => {
      expect(games.length).toBeGreaterThan(0);
    });
  });

  it('should display filtered games', () => {
    browser.sleep(1000);
    lobbyPage.getSearchField().sendKeys('Assassin');
    browser.sleep(1000);
    lobbyPage.getGames().then((games) => {
      games.forEach((game) => expect(game.getAttribute('data-e2e')).toContain('Assassin'));
    });
  });
});

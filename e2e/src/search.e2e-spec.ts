import { browser, by, element } from 'protractor';

import { HomePage } from './pages/home.po';
import { LibraryPage } from './pages/library.po';

describe('When search', () => {
  let libraryPage: LibraryPage;

  beforeEach(() => {
    libraryPage = new LibraryPage();
  });

  it('should see games', () => {
    libraryPage.navigateTo();
    browser.waitForAngular();
    libraryPage.getGames().then((games) => {
      expect(games.length).toBeGreaterThan(0);
    });
  });

  it('should see filtered games', () => {
    libraryPage.getSearchField().sendKeys('Assassin');
    browser.sleep(1000);
    libraryPage.getGames().then((games) => {
      games.forEach((game) => expect(game.getAttribute('data-e2e')).toContain('Assassin'));
    });
  });
});

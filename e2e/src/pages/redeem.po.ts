import { element, by, ElementFinder } from 'protractor';

export class RedeemPage {
  redeemKey = 'key-key-key-0068';

  getRedeemCodeLink(): ElementFinder {
    return element(by.css('*[data-e2e="redeem-code-link"]'));
  }

  getRedeemCodeField(): ElementFinder {
    return element(by.css('*[data-e2e="redeem-code-field"]'));
  }
}
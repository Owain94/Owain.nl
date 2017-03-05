import { browser, element, by } from 'protractor';

export class OwainPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  getElement(el: string) {
    return element(by.css(el));
  }

  getElements(el: string) {
    return element.all(by.css(el));
  }
}

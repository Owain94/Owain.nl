import { OwainPage } from './app.po';

describe('Owain.nl', () => {
  let page: OwainPage;

  beforeEach(() => {
    page = new OwainPage();
  });

  it('should display correct title', () => {
    page.navigateTo();

    expect(page.getTitle()).toEqual('Owain.nl');
  });

  it('should have all components', () => {
    page.navigateTo();

    expect(page.getElement('app-menu').isPresent()).toBeTruthy();
    expect(page.getElement('app-header').isPresent()).toBeTruthy();
    expect(page.getElement('app-about').isPresent()).toBeTruthy();
    expect(page.getElement('app-diplomas').isPresent()).toBeTruthy();
    expect(page.getElement('app-stackexchange').isPresent()).toBeTruthy();
    expect(page.getElement('app-github').isPresent()).toBeTruthy();
    expect(page.getElement('app-contact').isPresent()).toBeTruthy();
    expect(page.getElement('app-footer').isPresent()).toBeTruthy();
  });

  it('should have google maps', () => {
    page.navigateTo();

    expect(page.getElement('sebm-google-map').isPresent()).toBeTruthy();
  });
});

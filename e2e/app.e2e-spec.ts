import { OwainPage } from './app.po';

describe('owain App', () => {
  let page: OwainPage;

  beforeEach(() => {
    page = new OwainPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

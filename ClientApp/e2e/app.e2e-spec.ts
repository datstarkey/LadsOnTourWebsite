import { LadsPage } from './app.po';

describe('lads App', function() {
  let page: LadsPage;

  beforeEach(() => {
    page = new LadsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

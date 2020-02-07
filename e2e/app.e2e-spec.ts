import { NotvAppPage } from './app.po';

describe('notv-app App', function() {
  let page: NotvAppPage;

  beforeEach(() => {
    page = new NotvAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

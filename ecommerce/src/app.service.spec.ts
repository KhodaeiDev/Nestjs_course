import { AppService } from './app.service';

describe('Sum Test', () => {
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
  });

  it('sum 1 , 2 = 3', () => {
    expect(appService.sum(1, 2)).toBe(3);
  });
});

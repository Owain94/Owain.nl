import { BetterDatePipe } from './better.date.pipe';

describe('the better date pipe', () => {
  let betterDatePipe: BetterDatePipe;

  beforeEach(() => {
    betterDatePipe = new BetterDatePipe();
  });

  describe('transform()', () => {
    it('should return the date formatted', () => {
      expect(
        betterDatePipe.transform(0)
      ).toBe('1-1-1970');
    });
  });
});

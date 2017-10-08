import { ThousandSeparatorPipe } from './thousand.separator.pipe';

describe('the thousand separator pipe', () => {
  let thousandSeparatorPipe: ThousandSeparatorPipe;

  beforeEach(() => {
    thousandSeparatorPipe = new ThousandSeparatorPipe();
  });

  describe('transform()', () => {
    it('should return the input formatted', () => {
      expect(
        thousandSeparatorPipe.transform('1234567')
      ).toBe('1.234.567');
    });
  });
});

import { ValuesPipe } from './values.pipe';

describe('the values pipe', () => {
  let valuesPipe: ValuesPipe;

  beforeEach(() => {
    valuesPipe = new ValuesPipe();
  });

  describe('transform()', () => {
    it('should return the values', () => {
      const values = valuesPipe.transform({
        'testKey': 'testValue',
        'testingKey': 'testingValue'
      })

      expect(values[0]).toBe('testValue');
      expect(values[1]).toBe('testingValue');
    });
  });
});

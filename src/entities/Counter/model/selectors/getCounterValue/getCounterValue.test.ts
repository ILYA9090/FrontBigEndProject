import { StateSchema } from 'app/providers/StoreProveder';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue.test', () => {
  test('', () => {
    const state: DeepPartial<StateSchema> = {
      counter: { value: 10 },
    };
    expect(getCounterValue(state as StateSchema)).toEqual(10);
  });
});

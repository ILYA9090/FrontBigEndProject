import { StateSchema } from 'app/providers/StoreProveder';
import { ValidateProfileError } from '../../consts/consts';

import { getProfileValidaErrors } from './getProfileValidaErrors';

describe('getProfileValidaErrors.test', () => {
  test('should return ERRORS', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.SERVER_ERROR,
          ValidateProfileError.NO_DATA,
        ],
      },
    };
    expect(getProfileValidaErrors(state as StateSchema)).toEqual([
      ValidateProfileError.SERVER_ERROR,
      ValidateProfileError.NO_DATA,
    ]);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidaErrors(state as StateSchema)).toEqual(undefined);
  });
});

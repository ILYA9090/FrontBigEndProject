import {
  TestAsyncThunk,
  ActionCreatorType,
} from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ThunkConfig } from 'app/providers/StoreProveder';
import { Profile } from 'entities/Profile';
import { fetchProfileData } from './fetchProfileData';

const data = {
  username: 'admin',
  age: 24,
  country: Country.Russia,
  lastname: 'Ovchinnikov',
  first: 'asd',
  city: 'asf',
  currency: Currency.USD,
};

describe('fetchProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(
      fetchProfileData as ActionCreatorType<
        Profile,
        string,
        ThunkConfig<string>
      >
    );
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProveder/config/StateSchema';

import { User, userActions } from 'entities/User';

export interface LoginByUsernameProps {
  username: string;
  password: string;
}
export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
  const { dispatch, extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post('/login', authData);
    if (!response.data) {
      throw new Error();
    }
    dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});

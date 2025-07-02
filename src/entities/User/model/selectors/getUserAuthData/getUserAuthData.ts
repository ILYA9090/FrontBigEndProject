import { StateSchema } from 'app/providers/StoreProveder';

export const getUserAuthData = (state: StateSchema) => state.user.authData;

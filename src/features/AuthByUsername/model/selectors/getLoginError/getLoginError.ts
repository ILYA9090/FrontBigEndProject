import { StateSchema } from 'app/providers/StoreProveder';

export const getLoginError = (state: StateSchema) => state?.loginForm?.error;

import { StateSchema } from 'app/providers/StoreProveder';

export const getLoginState = (state: StateSchema) => state?.loginForm;

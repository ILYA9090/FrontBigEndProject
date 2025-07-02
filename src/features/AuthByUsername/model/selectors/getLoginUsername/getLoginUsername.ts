import { StateSchema } from 'app/providers/StoreProveder';

export const getLoginUsername = (state: StateSchema) => state?.loginForm?.username || '';

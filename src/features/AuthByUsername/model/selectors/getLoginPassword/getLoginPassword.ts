import { StateSchema } from 'app/providers/StoreProveder';

export const getLoginPassword = (state: StateSchema) => state?.loginForm?.password || '';

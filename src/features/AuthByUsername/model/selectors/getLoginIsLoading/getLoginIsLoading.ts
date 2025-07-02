import { StateSchema } from 'app/providers/StoreProveder';

export const getLoginIsLoading = (state: StateSchema) => state?.loginForm?.isLoading || false;

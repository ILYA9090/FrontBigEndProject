import { StateSchema } from 'app/providers/StoreProveder';

export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading;

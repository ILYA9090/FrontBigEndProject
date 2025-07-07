import { StateSchema } from 'app/providers/StoreProveder';

export const getProfileError = (state: StateSchema) => state.profile?.error;

import { StateSchema } from 'app/providers/StoreProveder';

export const getProfileReadonly = (state: StateSchema) => state.profile?.readonly;

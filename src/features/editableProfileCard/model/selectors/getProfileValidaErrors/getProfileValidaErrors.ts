import { StateSchema } from 'app/providers/StoreProveder';

export const getProfileValidaErrors = (state: StateSchema) => state?.profile?.validateErrors;

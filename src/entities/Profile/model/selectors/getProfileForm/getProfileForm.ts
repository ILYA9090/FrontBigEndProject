import { StateSchema } from 'app/providers/StoreProveder';

export const getProfileForm = (state: StateSchema) => state.profile?.form;

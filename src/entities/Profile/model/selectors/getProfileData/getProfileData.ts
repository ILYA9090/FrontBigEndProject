import { StateSchema } from 'app/providers/StoreProveder';

export const getProfileData = (state: StateSchema) => state?.profile?.data;

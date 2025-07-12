import { StateSchema } from 'app/providers/StoreProveder';

export const getUserInited = (state: StateSchema) => state.user._inited;

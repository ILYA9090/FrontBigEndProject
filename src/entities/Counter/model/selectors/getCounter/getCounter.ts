import { StateSchema } from 'app/providers/StoreProveder';

export const getCounter = (state: StateSchema) => state.counter;

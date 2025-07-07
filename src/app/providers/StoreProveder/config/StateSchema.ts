import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername/model/types/LoginSchema';
import { CounterSchema } from 'entities/Counter';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { ReducersMapObject, Reducer, AnyAction, CombinedState } from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  // асинхронные редьюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}
export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValut: T;
  extra: ThunkExtraArg;
}

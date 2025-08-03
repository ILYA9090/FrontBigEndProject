import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername/model/types/LoginSchema';
import { CounterSchema } from 'entities/Counter';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import {
  ReducersMapObject,
  Reducer,
  AnyAction,
  CombinedState,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'features/editableProfileCard';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { articlePageSchema } from 'pages/ArticlesPage';
import { ScrollSafeSchema } from 'features/scrollSafe';
import { rtkApi } from 'shared/api/rtkApi';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollSafe: ScrollSafeSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  // асинхронные редьюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: articlePageSchema;
  articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - редьюсер вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers;
}
export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}

import { StateSchema } from 'app/providers/StoreProveder';

export const getArticleCommentsIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.comments.isLoading;
export const getArticleCommentsError = (state: StateSchema) =>
  state.articleDetailsPage?.comments?.error;

import { StateSchema } from 'app/providers/StoreProveder';

export const getArticleRecommendationsIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.comments?.isLoading;
export const getArticleRecommendationsError = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.error;

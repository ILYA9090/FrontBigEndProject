import { StateSchema } from 'app/providers/StoreProveder';

export const getArticleDetailsData = (state: StateSchema) => state?.articleDetails?.data;
export const getArticleDetailsIsLoading = (state: StateSchema) => state?.articleDetails?.isLoading;
export const getArticleDetailsError = (state: StateSchema) => state?.articleDetails?.error;

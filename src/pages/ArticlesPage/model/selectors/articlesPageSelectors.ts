import { StateSchema } from 'app/providers/StoreProveder';
import { ArticleView, ArticleSortField } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types/article';

export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlesPage?.isLoading || false;

export const getArticlesPageError = (state: StateSchema) =>
  state.articlesPage?.error;

export const getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageLimit = (state: StateSchema) =>
  state.articlesPage?.limit || 1;

export const getArticlesPageNum = (state: StateSchema) =>
  state.articlesPage?.page || 1;

export const getArticlesPageHasMore = (state: StateSchema) =>
  state.articlesPage?.hasMore;

export const getArticlesPageInited = (state: StateSchema) =>
  state.articlesPage?._inited;

export const getArticlesPageOrder = (state: StateSchema) =>
  state.articlesPage?.order || 'asc';

export const getArticlesPageSort = (state: StateSchema) =>
  state.articlesPage?.sort || ArticleSortField.CREATED;

export const getArticlesPageSearch = (state: StateSchema) =>
  state.articlesPage?.search ?? '';

export const getArticlesPageType = (state: StateSchema) =>
  state.articlesPage?.type ?? ArticleType.ALL;

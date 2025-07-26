/* eslint-disable operator-linebreak */
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Article } from 'entities/Article';
import { StateSchema } from 'app/providers/StoreProveder';
import { ArticleDetailsPageRecommendationsSchema } from '../types/ArticleDetailsPageRecommendationsSchema';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsPage?.recommendations ||
      recommendationsAdapter.getInitialState()
  );

const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendationsSlice',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
      }
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleRecommendations.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          recommendationsAdapter.setAll(state, action.payload);
        }
      )
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Неизвестная ошибка';
      });
  },
});

export const { reducer: articleDetailsRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice;

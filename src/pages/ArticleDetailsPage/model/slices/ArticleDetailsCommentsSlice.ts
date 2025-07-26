/* eslint-disable operator-linebreak */
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Comment } from 'entities/Article/Comment';
import { StateSchema } from 'app/providers/StoreProveder';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) =>
    state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
);

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false;
          commentsAdapter.setAll(state, action.payload);
        }
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Неизвестная ошибка';
      });
  },
});

export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;

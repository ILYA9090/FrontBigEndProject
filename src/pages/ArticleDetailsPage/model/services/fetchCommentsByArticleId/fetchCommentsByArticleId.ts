import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProveder';
import { Comment } from 'entities/Article/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
  'articleDetails/fetchCommentsByArticleId',
  async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    if (!articleId) {
      return rejectWithValue('error');
    }
    try {
      const response = await extra.api.get<Comment[]>('/comments', {
        params: {
          articleId,
          _expand: 'user',
        },
      });
      if (!response) {
        throw new Error('');
      }
      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);

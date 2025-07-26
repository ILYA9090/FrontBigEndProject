import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsCommentsReducer } from './ArticleDetailsCommentsSlice';
import { articleDetailsRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
  });

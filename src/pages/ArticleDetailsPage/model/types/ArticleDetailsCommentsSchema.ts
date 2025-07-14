import { EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Article/Comment';

export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
  isLoading?: boolean;
  error?: string;
}

import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { ArticleDetailsPageRecommendationsSchema } from './ArticleDetailsPageRecommendationsSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema;
  recommendations: ArticleDetailsPageRecommendationsSchema;
}

import { RatingSchema } from 'entities/Rating';
import { rtkApi } from 'shared/api/rtkApi';

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<
      RatingSchema[],
      { articleId: string; userId: string }
    >({
      query: ({ userId, articleId }) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId,
        },
      }),
    }),
    addArticleRating: build.mutation<
      void,
      { articleId: string; userId: string; rate: number; feedback: string }
    >({
      query: (arg) => ({
        url: '/article-ratings',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useAddArticleRating = articleRatingApi.useAddArticleRatingMutation;
